const API = (process.env.NEXT_PUBLIC_API_URL as string) || "";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const json = await res.json();

  if (!json.ok) throw new Error(json.error ?? "Request failed");

  return json.data as T;
}

export type TaskType =
  | "single"
  | "pipeline"
  | "parallel"
  | "conditional"
  | "autogpt";
export type TaskStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "cancelled";

export interface OrchestratorTask {
  id: string;
  name: string;
  type: TaskType;
  status: TaskStatus;
  input: string;
  result?: string;
  error?: string;
  agentIds: string[];
  maxRetries: number;
  retryCount: number;
  tokensUsed?: number;
  executionTimeMs?: number;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
}

export interface OrchestratorLog {
  id: string;
  taskId: string;
  agentName: string;
  stepIndex: number;
  status: string;
  input?: string;
  output?: string;
  error?: string;
  tokensUsed?: number;
  executionTimeMs?: number;
  createdAt: string;
}

export interface CreateTaskInput {
  name?: string;
  type?: TaskType;
  input: string;
  agentIds?: string[];
  workflowConfig?: {
    steps?: { agentId: string; inputMapping?: string; customPrompt?: string }[];
    parallelAgents?: string[];
    maxAgents?: number;
    mergeStrategy?: string;
  };
  maxRetries?: number;
}

export const orchestratorService = {
  createAndRun: (input: CreateTaskInput) =>
    request<OrchestratorTask>("/api/orchestrator/run", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  createTask: (input: CreateTaskInput) =>
    request<OrchestratorTask>("/api/orchestrator/tasks", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  runTask: (id: string) =>
    request<OrchestratorTask>(`/api/orchestrator/tasks/${id}/run`, {
      method: "POST",
    }),

  cancelTask: (id: string) =>
    request<{ cancelled: boolean }>(`/api/orchestrator/tasks/${id}/cancel`, {
      method: "POST",
    }),

  listTasks: (limit = 50) =>
    request<OrchestratorTask[]>(`/api/orchestrator/tasks?limit=${limit}`),

  getTask: (id: string) =>
    request<OrchestratorTask>(`/api/orchestrator/tasks/${id}`),

  getTaskLogs: (id: string) =>
    request<OrchestratorLog[]>(`/api/orchestrator/tasks/${id}/logs`),

  getStats: () =>
    request<{
      total: number;
      active: number;
      completed: number;
      failed: number;
      avgExecutionSec: number;
    }>("/api/orchestrator/stats"),
};
