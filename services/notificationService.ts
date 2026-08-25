import { apiFetch } from "./apiClient";

export interface AppNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: "info" | "admin" | "system";
  read: boolean;
  created_at: string;
}

export interface NotificationPreferences {
  sistema: boolean;
  agente: boolean;
  repositorio: boolean;
  admin: boolean;
  tricount: boolean;
  email_digest: boolean;
}

interface NotificationsResponse {
  notifications: AppNotification[];
  unread: number;
}

export const notificationService = {
  async getAll(): Promise<NotificationsResponse> {
    return apiFetch<NotificationsResponse>("/api/notifications");
  },

  async markRead(id: string): Promise<void> {
    await apiFetch(`/api/notifications/${id}/read`, { method: "PATCH" });
  },

  async markAllRead(): Promise<void> {
    await apiFetch("/api/notifications/read-all", { method: "PATCH" });
  },

  async deleteOne(id: string): Promise<void> {
    await apiFetch(`/api/notifications/${id}`, { method: "DELETE" });
  },

  async deleteAll(): Promise<void> {
    await apiFetch("/api/notifications", { method: "DELETE" });
  },
};

export const contactService = {
  async submit(payload: {
    name: string;
    email: string;
    message: string;
  }): Promise<void> {
    await apiFetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
