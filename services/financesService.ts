import { apiFetch } from "./apiClient";

export interface FinancialBudget {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  period: "monthly" | "yearly";
  category_id: string | null;
  month: string | null;
  year: number | null;
  created_at: string;
  spent?: number;
}

export interface FinancialGoal {
  id: string;
  user_id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  target_date: string | null;
  icon: string;
  color: string;
  notes: string;
  achieved: boolean;
  achieved_at: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  currency: string;
  frequency: "weekly" | "monthly" | "quarterly" | "yearly";
  next_billing: string;
  category: string;
  provider: string;
  logo_url: string;
  active: boolean;
  notes: string;
  created_at: string;
}

export interface MonthlySpending {
  month: string;
  total: number;
}

export interface FinancesSummary {
  monthlySpending: MonthlySpending[];
  totalMonthlySubscriptions: number;
  activeBudgets: number;
  activeGoals: number;
}

export type CreateBudgetInput = {
  name: string;
  amount: number;
  period?: "monthly" | "yearly";
  category_id?: string | null;
  month?: string | null;
};

export type CreateGoalInput = {
  name: string;
  target_amount: number;
  current_amount?: number;
  target_date?: string | null;
  icon?: string;
  color?: string;
  notes?: string;
};

export type CreateSubscriptionInput = {
  name: string;
  amount: number;
  currency?: string;
  frequency?: "weekly" | "monthly" | "quarterly" | "yearly";
  next_billing: string;
  category?: string;
  provider?: string;
  notes?: string;
};

const BASE = "/api/finances";

export const financesService = {
  getSummary: () => apiFetch<FinancesSummary>(`${BASE}/summary`),

  listBudgets: () => apiFetch<FinancialBudget[]>(`${BASE}/budgets`),
  getBudget: (id: string) => apiFetch<FinancialBudget>(`${BASE}/budgets/${id}`),
  createBudget: (data: CreateBudgetInput) =>
    apiFetch<FinancialBudget>(`${BASE}/budgets`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateBudget: (id: string, data: Partial<CreateBudgetInput>) =>
    apiFetch<FinancialBudget>(`${BASE}/budgets/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteBudget: (id: string) =>
    apiFetch<{ message: string }>(`${BASE}/budgets/${id}`, { method: "DELETE" }),

  listGoals: () => apiFetch<FinancialGoal[]>(`${BASE}/goals`),
  getGoal: (id: string) => apiFetch<FinancialGoal>(`${BASE}/goals/${id}`),
  createGoal: (data: CreateGoalInput) =>
    apiFetch<FinancialGoal>(`${BASE}/goals`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateGoal: (id: string, data: Partial<CreateGoalInput & { achieved: boolean }>) =>
    apiFetch<FinancialGoal>(`${BASE}/goals/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteGoal: (id: string) =>
    apiFetch<{ message: string }>(`${BASE}/goals/${id}`, { method: "DELETE" }),

  listSubscriptions: () => apiFetch<Subscription[]>(`${BASE}/subscriptions`),
  getSubscription: (id: string) => apiFetch<Subscription>(`${BASE}/subscriptions/${id}`),
  createSubscription: (data: CreateSubscriptionInput) =>
    apiFetch<Subscription>(`${BASE}/subscriptions`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateSubscription: (id: string, data: Partial<CreateSubscriptionInput & { active: boolean }>) =>
    apiFetch<Subscription>(`${BASE}/subscriptions/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteSubscription: (id: string) =>
    apiFetch<{ message: string }>(`${BASE}/subscriptions/${id}`, { method: "DELETE" }),
};
