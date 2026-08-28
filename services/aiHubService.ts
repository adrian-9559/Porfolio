import { apiFetch } from "./apiClient";
import type { AIHubMCP, AIHubSkill, AIHubModel } from "@/types/aiHub";

const API = "/api/ai-hub";

export const aiHubService = {
  // MCPs
  listMCPs: () => apiFetch<AIHubMCP[]>(`${API}/mcps`),
  createMCP: (input: Partial<AIHubMCP>) =>
    apiFetch<AIHubMCP>(`${API}/mcps`, { method: "POST", body: JSON.stringify(input) }),
  updateMCP: (id: string, input: Partial<AIHubMCP>) =>
    apiFetch<AIHubMCP>(`${API}/mcps/${id}`, { method: "PATCH", body: JSON.stringify(input) }),
  deleteMCP: (id: string) =>
    apiFetch<void>(`${API}/mcps/${id}`, { method: "DELETE" }),

  // Skills
  listSkills: () => apiFetch<AIHubSkill[]>(`${API}/skills`),
  createSkill: (input: Partial<AIHubSkill>) =>
    apiFetch<AIHubSkill>(`${API}/skills`, { method: "POST", body: JSON.stringify(input) }),
  updateSkill: (id: string, input: Partial<AIHubSkill>) =>
    apiFetch<AIHubSkill>(`${API}/skills/${id}`, { method: "PATCH", body: JSON.stringify(input) }),
  deleteSkill: (id: string) =>
    apiFetch<void>(`${API}/skills/${id}`, { method: "DELETE" }),

  // Models
  listModels: () => apiFetch<AIHubModel[]>(`${API}/models`),
  createModel: (input: Partial<AIHubModel>) =>
    apiFetch<AIHubModel>(`${API}/models`, { method: "POST", body: JSON.stringify(input) }),
  updateModel: (id: string, input: Partial<AIHubModel>) =>
    apiFetch<AIHubModel>(`${API}/models/${id}`, { method: "PATCH", body: JSON.stringify(input) }),
  deleteModel: (id: string) =>
    apiFetch<void>(`${API}/models/${id}`, { method: "DELETE" }),

  // Seed
  seed: () => apiFetch<{ skillsInserted: number; mcpsInserted: number }>(`${API}/seed`, { method: "POST" }),
};
