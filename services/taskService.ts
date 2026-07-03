import { apiFetch } from "./apiClient";

export interface TaskList {
  id: string;
  group_id: string;
  name: string;
  created_by: string;
  created_at: string;
  task_counts?: {
    pending: number;
    in_progress: number;
    done: number;
    cancelled: number;
  };
}

export interface Task {
  id: string;
  task_list_id: string;
  title: string;
  description: string;
  assigned_to: string | null;
  created_by: string;
  due_date: string | null;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in_progress" | "done" | "cancelled";
  sort_order: number;
  completed_at: string | null;
  created_at: string;
  assigned_member?: { id: string; name: string } | null;
  comment_count?: number;
}

export interface TaskComment {
  id: string;
  task_id: string;
  user_id: string;
  content: string;
  created_at: string;
  author?: { full_name: string; avatar_url: string | null } | null;
}

export type TaskStatus = "pending" | "in_progress" | "done";

const BASE = "/api/tricount";

export const taskService = {
  // ── Lists ──────────────────────────────────────────────────────────────────

  listLists: (groupId: string) =>
    apiFetch<TaskList[]>(`${BASE}/groups/${groupId}/task-lists`),

  createList: (groupId: string, name: string) =>
    apiFetch<TaskList>(`${BASE}/groups/${groupId}/task-lists`, {
      method: "POST",
      body: JSON.stringify({ name }),
    }),

  updateList: (listId: string, name: string) =>
    apiFetch<TaskList>(`${BASE}/task-lists/${listId}`, {
      method: "PATCH",
      body: JSON.stringify({ name }),
    }),

  deleteList: (listId: string) =>
    apiFetch<void>(`${BASE}/task-lists/${listId}`, { method: "DELETE" }),

  // ── Tasks ──────────────────────────────────────────────────────────────────

  listTasks: (listId: string) =>
    apiFetch<Task[]>(`${BASE}/task-lists/${listId}/tasks`),

  getTask: (taskId: string) =>
    apiFetch<Task>(`${BASE}/tasks/${taskId}`),

  createTask: (
    listId: string,
    data: {
      title: string;
      description?: string;
      assigned_to?: string | null;
      due_date?: string | null;
      priority?: string;
    },
  ) =>
    apiFetch<Task>(`${BASE}/task-lists/${listId}/tasks`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateTask: (
    taskId: string,
    updates: Partial<{
      title: string;
      description: string;
      assigned_to: string | null;
      due_date: string | null;
      priority: string;
      status: string;
    }>,
  ) =>
    apiFetch<Task>(`${BASE}/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),

  deleteTask: (taskId: string) =>
    apiFetch<void>(`${BASE}/tasks/${taskId}`, { method: "DELETE" }),

  reorderTasks: (listId: string, taskIds: string[]) =>
    apiFetch<void>(`${BASE}/tasks/reorder`, {
      method: "PUT",
      body: JSON.stringify({ listId, taskIds }),
    }),

  // ── Comments ───────────────────────────────────────────────────────────────

  addComment: (taskId: string, content: string) =>
    apiFetch<TaskComment>(`${BASE}/tasks/${taskId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    }),

  listComments: (taskId: string) =>
    apiFetch<TaskComment[]>(`${BASE}/tasks/${taskId}/comments`),

  deleteComment: (commentId: string) =>
    apiFetch<void>(`${BASE}/tasks/comments/${commentId}`, { method: "DELETE" }),
};
