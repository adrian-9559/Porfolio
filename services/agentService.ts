import { apiFetch } from "./apiClient";

export interface Agent {
  id: string;
  name: string;
  description?: string;
  preset?: string;
  system_prompt: string;
  tools: string[];
  memory_enabled: boolean;
  created_at: string;
  user_id: string;
}

export interface AgentPreset {
  id: string;
  name: string;
  description: string;
  system_prompt: string;
  tools: string[];
}

export interface RunResult {
  output: string;
  tokens_used?: number;
  execution_time_ms?: number;
}

export const agentService = {
  list: () => apiFetch<Agent[]>("/api/tools/ai-agents"),
  create: (input: {
    name: string;
    system_prompt: string;
    tools: string[];
    memory_enabled: boolean;
    preset?: string;
  }) =>
    apiFetch<Agent>("/api/tools/ai-agents/create", {
      method: "POST",
      body: JSON.stringify(input),
    }),
  delete: (id: string) =>
    apiFetch<void>(`/api/tools/ai-agents/${id}`, { method: "DELETE" }),
  getPresets: () => apiFetch<AgentPreset[]>("/api/tools/ai-agents/presets"),
  run: (agentId: string, input: string) =>
    apiFetch<RunResult>("/api/tools/ai-agents/run", {
      method: "POST",
      body: JSON.stringify({ agent_id: agentId, input }),
    }),
};
