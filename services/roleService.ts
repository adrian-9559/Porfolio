import type { Role } from "@/types/auth";

import { apiFetch } from "./apiClient";

export interface RoleStat {
  id: number;
  name: string;
  userCount: number;
}

export interface RoleUser {
  user_id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
}

export const roleService = {
  list: () => apiFetch<Role[]>("/api/roles"),

  stats: () => apiFetch<RoleStat[]>("/api/roles/stats"),

  usersByRole: (id: number) => apiFetch<RoleUser[]>(`/api/roles/${id}/users`),

  create: (name: string, description?: string) =>
    apiFetch<Role>("/api/roles", {
      method: "POST",
      body: JSON.stringify({ name, description }),
    }),

  update: (id: number, data: Partial<Pick<Role, "name" | "description">>) =>
    apiFetch<Role>(`/api/roles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: number) => apiFetch<void>(`/api/roles/${id}`, { method: "DELETE" }),

  assign: (user_id: string, role_id: number) =>
    apiFetch<void>("/api/roles/assign", {
      method: "POST",
      body: JSON.stringify({ user_id, role_id }),
    }),

  remove: (user_id: string, role_id: number) =>
    apiFetch<void>("/api/roles/remove", {
      method: "POST",
      body: JSON.stringify({ user_id, role_id }),
    }),
};
