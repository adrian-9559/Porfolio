import { apiFetch } from "./apiClient";

export interface Idea {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: "idea" | "planned" | "in_progress" | "done" | "archived";
  priority: "low" | "medium" | "high";
  category: string;
  tags: string[];
  votes: number;
  created_at: string;
  updated_at: string;
}

export interface CreateIdeaPayload {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  category?: string;
  tags?: string[];
}

export const ideasService = {
  getMyIdeas: () => apiFetch<Idea[]>("/api/ideas"),

  create: (data: CreateIdeaPayload) =>
    apiFetch<Idea>("/api/ideas", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<Idea>) =>
    apiFetch<Idea>(`/api/ideas/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiFetch<void>(`/api/ideas/${id}`, { method: "DELETE" }),

  vote: (id: string, direction: 1 | -1) =>
    apiFetch<Idea>(`/api/ideas/${id}/vote`, {
      method: "POST",
      body: JSON.stringify({ direction }),
    }),

  getPublic: () => apiFetch<Idea[]>("/api/ideas/public"),
};
