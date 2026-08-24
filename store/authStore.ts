import type { AuthUser } from "@/types/auth";

import { create } from "zustand";

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
      const me = await authService.me();

      set({
        user: me,
        isAuthenticated: true,
        isAdmin: me.roles.includes("admin"),
        loadingAuth: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isAdmin: false,
        loadingAuth: false,
      });
    }
  },
}));
