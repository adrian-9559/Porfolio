export interface AIHubMCP {
  id: string;
  name: string;
  description: string | null;
  type: "mcp" | "npm" | "hook" | "custom";
  status: "active" | "inactive" | "error";
  config: Record<string, unknown>;
  details: string | null;
  icon: string | null;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface AIHubSkill {
  id: string;
  name: string;
  description: string | null;
  category: string;
  files: { path: string; scope: string }[];
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface AIHubModel {
  id: string;
  name: string;
  provider: string;
  model_id: string | null;
  type: "cloud" | "local" | "hybrid";
  status: "active" | "inactive" | "deprecated";
  capabilities: string[];
  context_window: number | null;
  pricing_input: number | null;
  pricing_output: number | null;
  is_default: boolean;
  config: Record<string, unknown>;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
