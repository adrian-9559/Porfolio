import type { AuthUser } from "@/types/auth";

import { create } from "zustand";

import { authService } from "@/services/authService";

const AUTH_CACHE_KEY = "auth_cache";
const AUTH_CACHE_MAX_AGE_MS = 30 * 60 * 1000; // 30 minutes

interface AuthCache {
  user: AuthUser;
  timestamp: number;
}

function readAuthCache(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_CACHE_KEY);
    if (!raw) return null;
    const cached: AuthCache = JSON.parse(raw);
    if (Date.now() - cached.timestamp > AUTH_CACHE_MAX_AGE_MS) {
      localStorage.removeItem(AUTH_CACHE_KEY);
      return null;
    }
    return cached.user;
  } catch {
    return null;
  }
}

function writeAuthCache(user: AuthUser): void {
  try {
    localStorage.setItem(AUTH_CACHE_KEY, JSON.stringify({ user, timestamp: Date.now() }));
  } catch {}
}

function clearAuthCache(): void {
  try {
    localStorage.removeItem(AUTH_CACHE_KEY);
  } catch {}
}

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
  /** Load user from localStorage instantly (no network). Returns true if cache was used. */
  hydrateFromCache: () => boolean;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  loadingAuth: true,
  isAuthenticated: false,
  isAdmin: false,

  login: async (email, password) => {
    const res = await authService.login(email, password);

    writeAuthCache(res.user);
    set({
      user: res.user,
      isAuthenticated: true,
      isAdmin: res.user.roles.includes("admin"),
    });
  },

  register: async (full_name, email, password) => {
    const res = await authService.register(full_name, email, password);

    writeAuthCache(res.user);
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
    clearAuthCache();
    set({ user: null, isAuthenticated: false, isAdmin: false });
  },

  hydrate: async () => {
    try {
      const me = await authService.me();

      writeAuthCache(me);
      set({
        user: me,
        isAuthenticated: true,
        isAdmin: me.roles.includes("admin"),
        loadingAuth: false,
      });
    } catch {
      clearAuthCache();
      set({
        user: null,
        isAuthenticated: false,
        isAdmin: false,
        loadingAuth: false,
      });
    }
  },

  hydrateFromCache: () => {
    const cached = readAuthCache();
    if (!cached) return false;

    set({
      user: cached,
      isAuthenticated: true,
      isAdmin: cached.roles.includes("admin"),
      loadingAuth: false,
    });
    return true;
  },
}));
