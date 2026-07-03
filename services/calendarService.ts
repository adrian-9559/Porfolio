import { apiFetch } from "./apiClient";

export interface UserEvent {
  id: string;
  user_id: string;
  title: string;
  description: string;
  event_date: string;
  end_date: string | null;
  event_time: string | null;
  color: string;
  created_at: string;
}

export type CreateEventInput = {
  title: string;
  description?: string;
  event_date: string;
  end_date?: string | null;
  event_time?: string | null;
  color?: string;
};

export type UpdateEventInput = Partial<CreateEventInput>;

const BASE = "/api/calendar";

export const calendarService = {
  listEvents: (from: string, to: string) =>
    apiFetch<UserEvent[]>(`${BASE}/events?from=${from}&to=${to}`),

  getEvent: (id: string) => apiFetch<UserEvent>(`${BASE}/events/${id}`),

  createEvent: (data: CreateEventInput) =>
    apiFetch<UserEvent>(`${BASE}/events`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateEvent: (id: string, data: UpdateEventInput) =>
    apiFetch<UserEvent>(`${BASE}/events/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  deleteEvent: (id: string) =>
    apiFetch<{ message: string }>(`${BASE}/events/${id}`, { method: "DELETE" }),
};
