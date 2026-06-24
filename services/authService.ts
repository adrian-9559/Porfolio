import { apiFetch } from "./apiClient";
import type { AuthUser } from "@/types/auth";

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

interface LoginResponse extends TokenPair {
  user: AuthUser;
}

export const authService = {
  login: (email: string, password: string) =>
    apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (full_name: string, email: string, password: string) =>
    apiFetch<LoginResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ full_name, email, password }),
    }),

  logout: () => apiFetch<void>("/auth/logout", { method: "POST" }),

  me: () => apiFetch<AuthUser>("/auth/me"),

  refresh: (refresh_token: string) =>
    apiFetch<TokenPair>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refresh_token }),
    }),
};
