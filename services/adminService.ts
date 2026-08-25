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
  uptime?: number;
  memory?: { rss?: number; heapTotal?: number; heapUsed?: number };
  nodeVersion?: string;
  db: {
    ok: boolean;
    tables: Record<string, boolean>;
    checkedAt: string;
    error?: string;
  } | null;
}

export interface ServiceHealth {
  key: string;
  name: string;
  icon: string;
  description: string;
  status: "active" | "warning" | "error" | "inactive";
  recordCount: number | null;
  details: {
    uptime?: number;
    memory?: { rss?: number; heapTotal?: number; heapUsed?: number };
    nodeVersion?: string;
    lastStartup?: string;
  } | null;
  healthError?: string;
  errorCount: number;
  lastErrors: Array<{ action: string; metadata: any; timestamp: string }>;
}

export interface AdminIssueBoard {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  created_at: string;
  owner_email: string;
  ticket_count: number;
  member_count: number;
}

export interface AdminIssueTicket {
  id: string;
  board_id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assigned_to: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  board_name: string;
}

export interface AdminIssueStats {
  totalBoards: number;
  totalTickets: number;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
}

export interface AdminIdea {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  tags: string[];
  votes: number;
  created_at: string;
  updated_at: string;
  owner_email: string;
}

export interface AdminIdeaStats {
  total: number;
  byStatus: Record<string, number>;
}

// ── Service ────────────────────────────────────────────────────────────────────

export const adminService = {
  // Stats
  getStats: () => apiFetch<AdminStats>("/api/admin/stats"),

  // Notifications
  listNotifications: () =>
    apiFetch<AdminNotification[]>("/api/admin/notifications"),
  sendNotification: (payload: {
    title: string;
    message: string;
    type?: "info" | "admin" | "system";
    userId?: string;
    toAll?: boolean;
  }) =>
    apiFetch<{ sent: number | string }>("/api/admin/notifications/send", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  deleteNotification: (id: string) =>
    apiFetch<void>(`/admin/notifications/${id}`, { method: "DELETE" }),

  // Contact
  listContact: () => apiFetch<ContactMessage[]>("/api/admin/contact"),
  updateContactStatus: (id: string, status: ContactMessage["status"]) =>
    apiFetch<ContactMessage>(`/admin/contact/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  deleteContact: (id: string) =>
    apiFetch<void>(`/admin/contact/${id}`, { method: "DELETE" }),

  // Contact Notification Recipients
  getContactRecipients: () =>
    apiFetch<string[]>("/api/admin/contact-recipients"),
  setContactRecipients: (userIds: string[]) =>
    apiFetch<{ message: string }>("/api/admin/contact-recipients", {
      method: "PUT",
      body: JSON.stringify({ userIds }),
    }),

  // API Keys
  listApiKeys: () => apiFetch<AdminApiKey[]>("/api/admin/api-keys"),
  revokeApiKey: (id: string) =>
    apiFetch<AdminApiKey>(`/admin/api-keys/${id}/revoke`, { method: "PATCH" }),
  deleteApiKey: (id: string) =>
    apiFetch<void>(`/admin/api-keys/${id}`, { method: "DELETE" }),

  // Agents
  listAgents: () => apiFetch<AdminAgent[]>("/api/admin/agents"),
  deleteAgent: (id: string) =>
    apiFetch<void>(`/admin/agents/${id}`, { method: "DELETE" }),

  // Workflows
  listWorkflows: () => apiFetch<AdminWorkflow[]>("/api/admin/workflows"),
  deleteWorkflow: (id: string) =>
    apiFetch<void>(`/admin/workflows/${id}`, { method: "DELETE" }),

  // Repositories
  listRepositories: () =>
    apiFetch<AdminRepository[]>("/api/admin/repositories"),
  deleteRepository: (id: string) =>
    apiFetch<void>(`/admin/repositories/${id}`, { method: "DELETE" }),

  // Friendships
  listFriendships: () => apiFetch<AdminFriendship[]>("/api/admin/friendships"),
  listFriendRequests: () =>
    apiFetch<AdminFriendRequest[]>("/api/admin/friendships/requests"),

  // Services health
  getServicesHealth: () =>
    apiFetch<ServiceHealth[]>("/api/admin/services/health"),

  // System health — public route, no auth required
  getHealth: () => apiFetch<SystemHealth>("/api/health"),

  // Issue Tracker (admin)
  listIssueBoards: () => apiFetch<AdminIssueBoard[]>("/api/admin/issues/boards"),
  listIssueTickets: (params?: { boardId?: string; status?: string; priority?: string }) => {
    const q = new URLSearchParams();
    if (params?.boardId) q.set("boardId", params.boardId);
    if (params?.status) q.set("status", params.status);
    if (params?.priority) q.set("priority", params.priority);
    const qs = q.toString();
    return apiFetch<AdminIssueTicket[]>(`/api/admin/issues/tickets${qs ? `?${qs}` : ""}`);
  },
  getIssueStats: () => apiFetch<AdminIssueStats>("/api/admin/issues/stats"),
  deleteIssueBoard: (id: string) =>
    apiFetch<void>(`/api/admin/issues/boards/${id}`, { method: "DELETE" }),
  deleteIssueTicket: (id: string) =>
    apiFetch<void>(`/api/admin/issues/tickets/${id}`, { method: "DELETE" }),
  deleteIssueComment: (id: string) =>
    apiFetch<void>(`/api/admin/issues/comments/${id}`, { method: "DELETE" }),

  // Ideas (admin)
  listAllIdeas: () => apiFetch<AdminIdea[]>("/api/admin/ideas"),
  getIdeaStats: () => apiFetch<AdminIdeaStats>("/api/admin/ideas/stats"),
  createIdea: (data: {
    title: string;
    description?: string;
    priority?: string;
    category?: string;
    tags?: string[];
  }) =>
    apiFetch<AdminIdea>("/api/ideas", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  deleteIdea: (id: string) =>
    apiFetch<void>(`/api/admin/ideas/${id}`, { method: "DELETE" }),
};
