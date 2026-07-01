import type { AuthUser } from "@/types/auth";

import { create } from "zustand";

import { env } from "@/config/env";
import { authService } from "@/services/authService";

export interface AuthState {
  user: AuthUser | null;
  loadingAuth: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    full_name: string,
    email: string,
    password: string,
  ) => Promise<void>;
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

    set({
      user: res.user,
      isAuthenticated: true,
      isAdmin: res.user.roles.includes("admin"),
    });
  },

  register: async (full_name, email, password) => {
    const res = await authService.register(full_name, email, password);

    set({
      user: res.user,
      isAuthenticated: true,
      isAdmin: res.user.roles.includes("admin"),
    });
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch {}
    set({ user: null, isAuthenticated: false, isAdmin: false });
  },

  hydrate: async () => {
    try {
      const res = await fetch(`${env.apiUrl}/auth/me`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const body = await res.json();
        const me = body.data as AuthUser;

        set({
          user: me,
          isAuthenticated: true,
          isAdmin: me.roles.includes("admin"),
          loadingAuth: false,
        });

        return;
      }

      if (res.status === 401) {
        const rRes = await fetch(`${env.apiUrl}/auth/refresh`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (rRes.ok) {
          const me2Res = await fetch(`${env.apiUrl}/auth/me`, {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });

          if (me2Res.ok) {
            const me2Body = await me2Res.json();
            const me2 = me2Body.data as AuthUser;

            set({
              user: me2,
              isAuthenticated: true,
              isAdmin: me2.roles.includes("admin"),
              loadingAuth: false,
            });

            return;
          }
        }
      }

      set({
        user: null,
        isAuthenticated: false,
        isAdmin: false,
        loadingAuth: false,
      });
    } catch {
      set({ loadingAuth: false });
    }
  },
}));
