import { apiFetch } from "./apiClient";
import type { Role } from "@/types/auth";

export const roleService = {
  list: () => apiFetch<Role[]>("/roles"),

  create: (name: string, description?: string) =>
    apiFetch<Role>("/roles", {
      method: "POST",
      body: JSON.stringify({ name, description }),
    }),

  update: (id: number, data: Partial<Pick<Role, "name" | "description">>) =>
    apiFetch<Role>(`/roles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: number) => apiFetch<void>(`/roles/${id}`, { method: "DELETE" }),

  assign: (user_id: string, role_id: number) =>
    apiFetch<void>("/roles/assign", {
      method: "POST",
      body: JSON.stringify({ user_id, role_id }),
    }),

  remove: (user_id: string, role_id: number) =>
    apiFetch<void>("/roles/remove", {
      method: "POST",
      body: JSON.stringify({ user_id, role_id }),
    }),
};
