import type { UserWithProfile, Profile, UserPreferences } from "@/types/auth";

import { apiFetch } from "./apiClient";

export const userService = {
  list: () => apiFetch<UserWithProfile[]>("/api/users"),

  getById: (id: string) => apiFetch<UserWithProfile>(`/users/${id}`),

  updateProfile: (
    id: string,
    data: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>,
  ) =>
    apiFetch<Profile>(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  uploadAvatar: async (file: File): Promise<{ url: string }> => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/users/avatar", {
      method: "POST",
      body: form,
      credentials: "same-origin",
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error ?? "Upload failed");
    }
    const json = await res.json();
    return json.data;
  },

  getPreferences: () => apiFetch<UserPreferences>("/api/users/preferences/me"),

  updatePreferences: (data: Partial<Omit<UserPreferences, "id" | "user_id" | "created_at" | "updated_at">>) =>
    apiFetch<UserPreferences>("/api/users/preferences/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string) => apiFetch<void>(`/users/${id}`, { method: "DELETE" }),

  deleteSelf: (current_password: string) =>
    apiFetch<void>("/api/users/self", {
      method: "DELETE",
      body: JSON.stringify({ current_password }),
    }),
};
