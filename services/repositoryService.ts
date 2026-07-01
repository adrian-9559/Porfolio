import { apiFetch } from "./apiClient";

export type Provider = "github" | "gitlab" | "bitbucket";

export interface GitRepository {
  id: string;
  user_id: string;
  name: string;
  provider: Provider;
  repository_url: string;
  default_branch: string;
  active: boolean;
  created_at: string;
}

export interface Branch {
  name: string;
  is_default: boolean;
  last_commit: {
    sha: string;
    message: string;
    author: string;
    date: string;
  } | null;
}

export interface Commit {
  sha: string;
  message: string;
  author: { name: string; email: string; avatar_url: string | null };
  date: string;
  branch: string;
  url: string;
}

export interface GraphCommit {
  sha: string;
  message: string;
  branch: string;
  parents: string[];
  author: string;
  date: string;
}

export interface GraphData {
  branches: string[];
  commits: GraphCommit[];
}

export interface Analytics {
  total_commits: number;
  active_branches: number;
  contributors: number;
  commits_by_day: Array<{ date: string; count: number }>;
  commits_by_week: Array<{ week: string; count: number }>;
  commits_by_month: Array<{ month: string; count: number }>;
}

export interface CreateRepoInput {
  name: string;
  provider: Provider;
  repository_url: string;
  default_branch?: string;
  access_token?: string;
}

const BASE = "/api/repositories";

export const repositoryService = {
  list: () => apiFetch<GitRepository[]>(BASE),

  create: (input: CreateRepoInput) =>
    apiFetch<GitRepository>(BASE, {
      method: "POST",
      body: JSON.stringify(input),
    }),

  getById: (id: string) => apiFetch<GitRepository>(`${BASE}/${id}`),

  delete: (id: string) =>
    apiFetch<{ message: string }>(`${BASE}/${id}`, { method: "DELETE" }),

  getBranches: (id: string) => apiFetch<Branch[]>(`${BASE}/${id}/branches`),

  getCommits: (id: string, branch?: string, per_page = 30, page = 1) => {
    const q = new URLSearchParams();

    if (branch) q.set("branch", branch);
    q.set("per_page", String(per_page));
    q.set("page", String(page));

    return apiFetch<Commit[]>(`${BASE}/${id}/commits?${q}`);
  },

  getGraph: (id: string) => apiFetch<GraphData>(`${BASE}/${id}/graph`),

  getAnalytics: (id: string) => apiFetch<Analytics>(`${BASE}/${id}/analytics`),
};
