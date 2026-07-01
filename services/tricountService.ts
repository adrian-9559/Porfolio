import { apiFetch } from "./apiClient";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface TricountGroup {
  id: string;
  name: string;
  currency: string;
  owner_id: string;
  member_count?: number;
  created_at: string;
}

export interface TricountMember {
  id: string;
  group_id: string;
  name: string;
  user_id?: string | null;
}

export interface TricountExpenseSplit {
  member_id: string;
  share: number;
}

export interface TricountExpense {
  id: string;
  group_id: string;
  description: string;
  amount: number;
  paid_by: string;
  date: string;
  created_at: string;
  splits?: TricountExpenseSplit[];
}

export type CreateExpenseInput = Omit<
  TricountExpense,
  "id" | "group_id" | "created_at" | "splits"
> & {
  splits?: TricountExpenseSplit[];
};

// ── Service ────────────────────────────────────────────────────────────────────

const BASE = "/api/tricount";

export const tricountService = {
  listGroups: () => apiFetch<TricountGroup[]>(`${BASE}/groups`),

  createGroup: (name: string, currency = "EUR") =>
    apiFetch<TricountGroup>(`${BASE}/groups`, {
      method: "POST",
      body: JSON.stringify({ name, currency }),
    }),

  deleteGroup: (id: string) =>
    apiFetch<{ message: string }>(`${BASE}/groups/${id}`, { method: "DELETE" }),

  listMembers: (groupId: string) =>
    apiFetch<TricountMember[]>(`${BASE}/groups/${groupId}/members`),

  addMember: (groupId: string, name: string) =>
    apiFetch<TricountMember>(`${BASE}/groups/${groupId}/members`, {
      method: "POST",
      body: JSON.stringify({ name }),
    }),

  listExpenses: (groupId: string) =>
    apiFetch<TricountExpense[]>(`${BASE}/groups/${groupId}/expenses`),

  createExpense: (groupId: string, data: CreateExpenseInput) =>
    apiFetch<TricountExpense>(`${BASE}/groups/${groupId}/expenses`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  deleteExpense: (groupId: string, expenseId: string) =>
    apiFetch<{ message: string }>(
      `${BASE}/groups/${groupId}/expenses/${expenseId}`,
      {
        method: "DELETE",
      },
    ),
};
