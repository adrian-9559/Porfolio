import { apiFetch } from "./apiClient";

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
    apiFetch<OrchestratorTask>("/api/orchestrator/run", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  createTask: (input: CreateTaskInput) =>
    apiFetch<OrchestratorTask>("/api/orchestrator/tasks", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  runTask: (id: string) =>
    apiFetch<OrchestratorTask>(`/api/orchestrator/tasks/${id}/run`, {
      method: "POST",
    }),

  cancelTask: (id: string) =>
    apiFetch<{ cancelled: boolean }>(`/api/orchestrator/tasks/${id}/cancel`, {
      method: "POST",
    }),

  listTasks: (limit = 50) =>
    apiFetch<OrchestratorTask[]>(`/api/orchestrator/tasks?limit=${limit}`),

  getTask: (id: string) =>
    apiFetch<OrchestratorTask>(`/api/orchestrator/tasks/${id}`),

  getTaskLogs: (id: string) =>
    apiFetch<OrchestratorLog[]>(`/api/orchestrator/tasks/${id}/logs`),

  getStats: () =>
    apiFetch<{
      total: number;
      active: number;
      completed: number;
      failed: number;
      avgExecutionSec: number;
    }>("/api/orchestrator/stats"),
};
