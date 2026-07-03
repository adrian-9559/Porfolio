import { apiFetch } from "./apiClient";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface AdminStats {
  users: number;
  admins: number;
  roles: number;
  notifications: number;
  notificationsUnread: number;
  contactMessages: number;
  contactUnread: number;
  agents: number;
  workflows: number;
  apiKeys: number;
}

export interface AdminNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: "info" | "admin" | "system";
  read: boolean;
  created_at: string;
  profiles?: { full_name: string | null; avatar_url?: string | null } | null;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: "pending" | "reviewed" | "replied";
  created_at: string;
}

export interface AdminApiKey {
  id: string;
  user_id: string;
  name: string;
  key_prefix: string;
  is_active: boolean;
  last_used_at: string | null;
  created_at: string;
  profiles?: { full_name: string | null } | null;
}

export interface AdminAgent {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  preset_type: string | null;
  capabilities: string[];
  memory_enabled: boolean;
  is_public: boolean;
  created_at: string;
  profiles?: { full_name: string | null } | null;
}

export interface AdminWorkflow {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  steps: unknown[];
  created_at: string;
  profiles?: { full_name: string | null } | null;
}

export interface AdminRepository {
  id: string;
  user_id: string;
  name: string;
  provider: "github" | "gitlab" | "bitbucket";
  repository_url: string;
  default_branch: string;
  active: boolean;
  created_at: string;
}

export interface AdminFriendship {
  id: string;
  user_a_email: string;
  user_b_email: string;
  created_at: string;
}

export interface AdminFriendRequest {
  id: string;
  sender_email: string;
  receiver_email: string;
  status: string;
  created_at: string;
}

export interface SystemHealth {
  status: string;
  env: string;
  ts: string;
  db: { ok: boolean; tables: Record<string, boolean>; checkedAt: string; error?: string } | null;
}

export interface ServiceHealth {
  key: string;
  name: string;
  icon: string;
  description: string;
  status: "active" | "warning" | "error" | "inactive";
  recordCount: number | null;
  details: { uptime?: number; memory?: { rss?: number; heapTotal?: number; heapUsed?: number }; nodeVersion?: string; lastStartup?: string } | null;
  healthError?: string;
  errorCount: number;
  lastErrors: Array<{ action: string; metadata: any; timestamp: string }>;
}

// ── Service ────────────────────────────────────────────────────────────────────

export const adminService = {
  // Stats
  getStats: () => apiFetch<AdminStats>("/admin/stats"),

  // Notifications
  listNotifications: () =>
    apiFetch<AdminNotification[]>("/admin/notifications"),
  sendNotification: (payload: {
    title: string;
    message: string;
    type?: "info" | "admin" | "system";
    userId?: string;
    toAll?: boolean;
  }) =>
    apiFetch<{ sent: number | string }>("/admin/notifications/send", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  deleteNotification: (id: string) =>
    apiFetch<void>(`/admin/notifications/${id}`, { method: "DELETE" }),

  // Contact
  listContact: () => apiFetch<ContactMessage[]>("/admin/contact"),
  updateContactStatus: (id: string, status: ContactMessage["status"]) =>
    apiFetch<ContactMessage>(`/admin/contact/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  deleteContact: (id: string) =>
    apiFetch<void>(`/admin/contact/${id}`, { method: "DELETE" }),

  // API Keys
  listApiKeys: () => apiFetch<AdminApiKey[]>("/admin/api-keys"),
  revokeApiKey: (id: string) =>
    apiFetch<AdminApiKey>(`/admin/api-keys/${id}/revoke`, { method: "PATCH" }),
  deleteApiKey: (id: string) =>
    apiFetch<void>(`/admin/api-keys/${id}`, { method: "DELETE" }),

  // Agents
  listAgents: () => apiFetch<AdminAgent[]>("/admin/agents"),
  deleteAgent: (id: string) =>
    apiFetch<void>(`/admin/agents/${id}`, { method: "DELETE" }),

  // Workflows
  listWorkflows: () => apiFetch<AdminWorkflow[]>("/admin/workflows"),
  deleteWorkflow: (id: string) =>
    apiFetch<void>(`/admin/workflows/${id}`, { method: "DELETE" }),

  // Repositories
  listRepositories: () => apiFetch<AdminRepository[]>("/admin/repositories"),
  deleteRepository: (id: string) =>
    apiFetch<void>(`/admin/repositories/${id}`, { method: "DELETE" }),

  // Friendships
  listFriendships: () => apiFetch<AdminFriendship[]>("/admin/friendships"),
  listFriendRequests: () =>
    apiFetch<AdminFriendRequest[]>("/admin/friendships/requests"),

  // Services health
  getServicesHealth: () => apiFetch<ServiceHealth[]>("/admin/services/health"),

  // System health — public route, no auth required
  getHealth: () => apiFetch<SystemHealth>("/health"),
};
