import type { AuthUser } from "@/types/auth";

import { apiFetch } from "./apiClient";

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

interface LoginResponse extends TokenPair {
  user: AuthUser;
}

export const authService = {
  login: (email: string, password: string) =>
    apiFetch<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (full_name: string, email: string, password: string) =>
    apiFetch<LoginResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ full_name, email, password }),
    }),

  logout: () => apiFetch<void>("/api/auth/logout", { method: "POST" }),

  me: () => apiFetch<AuthUser>("/api/auth/me"),

  refresh: (refresh_token: string) =>
    apiFetch<TokenPair>("/api/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refresh_token }),
    }),

  forgotPassword: (email: string) =>
    apiFetch<{ message: string }>("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  resetPassword: (email: string, code: string, newPassword: string) =>
    apiFetch<{ message: string }>("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email, code, new_password: newPassword }),
    }),

  adminChangePassword: (userId: string, newPassword: string) =>
    apiFetch<{ message: string }>("/api/auth/admin-change-password", {
      method: "POST",
      body: JSON.stringify({ user_id: userId, new_password: newPassword }),
    }),

  resendConfirmation: (userId: string) =>
    apiFetch<{ message: string }>("/api/auth/resend-confirmation", {
      method: "POST",
      body: JSON.stringify({ user_id: userId }),
    }),

  adminConfirmEmail: (userId: string) =>
    apiFetch<{ message: string }>("/api/auth/confirm-email", {
      method: "POST",
      body: JSON.stringify({ user_id: userId }),
    }),
};
