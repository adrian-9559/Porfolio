import { env } from "@/config/env";
import { tokenStore } from "@/services/apiClient";
import { authService } from "@/services/authService";
import type { AuthUser } from "@/types/auth";
import { create } from "zustand";

export interface AuthState {
  user: AuthUser | null;
  loadingAuth: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (full_name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  loadingAuth: true,
  isAuthenticated: false,
  isAdmin: false,

  login: async (email, password) => {
    const res = await authService.login(email, password);
    tokenStore.set(res.accessToken);
    tokenStore.setRefresh(res.refreshToken);
    set({ user: res.user, isAuthenticated: true, isAdmin: res.user.roles.includes("admin") });
  },

  register: async (full_name, email, password) => {
    const res = await authService.register(full_name, email, password);
    tokenStore.set(res.accessToken);
    tokenStore.setRefresh(res.refreshToken);
    set({ user: res.user, isAuthenticated: true, isAdmin: res.user.roles.includes("admin") });
  },

  logout: async () => {
    try { await authService.logout(); } catch {}
    tokenStore.clear();
    set({ user: null, isAuthenticated: false, isAdmin: false });
  },

  hydrate: async () => {
    // Snapshot the token at start — used later to detect if login() replaced it
    const startToken = tokenStore.get();
    if (!startToken) {
      set({ loadingAuth: false });
      return;
    }

    // Use fetch directly (not apiFetch) — hydration must never fire auth:expired
    // because that event clears auth state globally and can corrupt a concurrent login.
    try {
      const res = await fetch(`${env.apiUrl}/auth/me`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${startToken}` },
      });

      if (res.ok) {
        const body = await res.json();
        const me = body.data as AuthUser;
        set({ user: me, isAuthenticated: true, isAdmin: me.roles.includes("admin"), loadingAuth: false });
        return;
      }

      if (res.status === 401) {
        const rt = tokenStore.getRefresh();
        if (rt) {
          const rRes = await fetch(`${env.apiUrl}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: rt }),
          });
          if (rRes.ok) {
            const rBody = await rRes.json();
            const newToken: string = rBody?.data?.accessToken;
            const newRefresh: string = rBody?.data?.refreshToken;
            if (newToken) {
              // Only store the refreshed token if login() hasn't replaced it meanwhile
              if (tokenStore.get() === startToken) {
                tokenStore.set(newToken);
                if (newRefresh) tokenStore.setRefresh(newRefresh);
              }
              const activeToken = tokenStore.get() ?? newToken;
              const me2Res = await fetch(`${env.apiUrl}/auth/me`, {
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${activeToken}` },
              });
              if (me2Res.ok) {
                const me2Body = await me2Res.json();
                const me2 = me2Body.data as AuthUser;
                set({ user: me2, isAuthenticated: true, isAdmin: me2.roles.includes("admin"), loadingAuth: false });
                return;
              }
            }
          }
        }

        // Token expired and refresh failed.
        // ONLY clear if login() hasn't stored a fresh token in the meantime.
        if (tokenStore.get() === startToken) {
          tokenStore.clear();
          set({ user: null, isAuthenticated: false, isAdmin: false, loadingAuth: false });
        } else {
          // login() ran concurrently and already set a valid token — keep that state
          set({ loadingAuth: false });
        }
        return;
      }

      // 5xx / network error — preserve existing auth state
      set({ loadingAuth: false });
    } catch {
      // Network unreachable — preserve existing auth state
      set({ loadingAuth: false });
    }
  },
}));
