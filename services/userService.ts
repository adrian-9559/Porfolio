import type { UserWithProfile, Profile } from "@/types/auth";

import { apiFetch } from "./apiClient";

export const userService = {
  list: () => apiFetch<UserWithProfile[]>("/users"),

  getById: (id: string) => apiFetch<UserWithProfile>(`/users/${id}`),

  updateProfile: (
    id: string,
    data: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>,
  ) =>
    apiFetch<Profile>(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string) => apiFetch<void>(`/users/${id}`, { method: "DELETE" }),
};
