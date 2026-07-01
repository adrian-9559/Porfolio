import { useState } from "react";

import { SectionHeader, Card } from "./AdminShared";

import { DatabaseDiagram } from "@/components/docs/DatabaseDiagram";
import { AppFlowDiagram } from "@/components/docs/AppFlowDiagram";

// ── Endpoint Explorer data ────────────────────────────────────────────────────

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

interface Endpoint {
  method: HttpMethod;
  path: string;
  summary: string;
  auth: boolean;
  roles?: string[];
  rateLimit?: string;
  module: string;
}

const ENDPOINTS: Endpoint[] = [
  // Health
  {
    method: "GET",
    path: "/health",
    summary: "Health check (status, env, timestamp)",
    auth: false,
    module: "health",
  },
  // Auth
  {
    method: "POST",
    path: "/auth/register",
    summary: "Register new user",
    auth: false,
    rateLimit: "20/15m",
    module: "auth",
  },
  {
    method: "POST",
    path: "/auth/login",
    summary: "Login with email + password",
    auth: false,
    rateLimit: "20/15m",
    module: "auth",
  },
  {
    method: "POST",
    path: "/auth/logout",
    summary: "Invalidate current session",
    auth: true,
    module: "auth",
  },
  {
    method: "GET",
    path: "/auth/me",
    summary: "Get own profile + roles",
    auth: true,
    module: "auth",
  },
  {
    method: "POST",
    path: "/auth/refresh",
    summary: "Refresh JWT access token",
    auth: false,
    module: "auth",
  },
  {
    method: "POST",
    path: "/auth/change-password",
    summary: "Change own password",
    auth: true,
    module: "auth",
  },
  {
    method: "POST",
    path: "/auth/admin-change-password",
    summary: "Admin changes any user password",
    auth: true,
    roles: ["admin"],
    module: "auth",
  },
  {
    method: "POST",
    path: "/auth/forgot-password",
    summary: "Request password reset email",
    auth: false,
    rateLimit: "20/15m",
    module: "auth",
  },
  {
    method: "POST",
    path: "/auth/reset-password",
    summary: "Reset password with token",
    auth: false,
    rateLimit: "20/15m",
    module: "auth",
  },
  {
    method: "POST",
    path: "/auth/resend-confirmation",
    summary: "Resend email confirmation",
    auth: true,
    roles: ["admin"],
    module: "auth",
  },
  {
    method: "POST",
    path: "/auth/confirm-email",
    summary: "Manually confirm user email",
    auth: true,
    roles: ["admin"],
    module: "auth",
  },
  // Users
  {
    method: "GET",
    path: "/users",
    summary: "List all users",
    auth: true,
    roles: ["admin"],
    module: "users",
  },
  {
    method: "GET",
    path: "/users/:id",
    summary: "Get user by ID",
    auth: true,
    roles: ["admin", "editor"],
    module: "users",
  },
  {
    method: "PATCH",
    path: "/users/:id",
    summary: "Update user profile",
    auth: true,
    module: "users",
  },
  {
    method: "DELETE",
    path: "/users/:id",
    summary: "Delete user permanently",
    auth: true,
    roles: ["admin"],
    module: "users",
  },
  // Roles
  {
    method: "GET",
    path: "/roles",
    summary: "List all roles",
    auth: true,
    module: "roles",
  },
  {
    method: "POST",
    path: "/roles",
    summary: "Create role",
    auth: true,
    roles: ["admin"],
    module: "roles",
  },
  {
    method: "PATCH",
    path: "/roles/:id",
    summary: "Update role",
    auth: true,
    roles: ["admin"],
    module: "roles",
  },
  {
    method: "DELETE",
    path: "/roles/:id",
    summary: "Delete role",
    auth: true,
    roles: ["admin"],
    module: "roles",
  },
  {
    method: "POST",
    path: "/roles/assign",
    summary: "Assign role to user",
    auth: true,
    roles: ["admin"],
    module: "roles",
  },
  {
    method: "POST",
    path: "/roles/remove",
    summary: "Remove role from user",
    auth: true,
    roles: ["admin"],
    module: "roles",
  },
  // API Keys
  {
    method: "GET",
    path: "/api-keys",
    summary: "List own API keys",
    auth: true,
    module: "api-keys",
  },
  {
    method: "POST",
    path: "/api-keys",
    summary: "Create API key (shown once)",
    auth: true,
    module: "api-keys",
  },
  {
    method: "PATCH",
    path: "/api-keys/:id/revoke",
    summary: "Revoke API key",
    auth: true,
    module: "api-keys",
  },
  {
    method: "DELETE",
    path: "/api-keys/:id",
    summary: "Delete API key",
    auth: true,
    module: "api-keys",
  },
  // Notifications
  {
    method: "GET",
    path: "/notifications",
    summary: "List own notifications",
    auth: true,
    module: "notifications",
  },
  {
    method: "PATCH",
    path: "/notifications/read-all",
    summary: "Mark all as read",
    auth: true,
    module: "notifications",
  },
  {
    method: "PATCH",
    path: "/notifications/:id/read",
    summary: "Mark one as read",
    auth: true,
    module: "notifications",
  },
  {
    method: "DELETE",
    path: "/notifications",
    summary: "Delete all notifications",
    auth: true,
    module: "notifications",
  },
  {
    method: "DELETE",
    path: "/notifications/:id",
    summary: "Delete notification",
    auth: true,
    module: "notifications",
  },
  // Contact
  {
    method: "POST",
    path: "/contact",
    summary: "Submit contact form",
    auth: false,
    rateLimit: "5/15m",
    module: "contact",
  },
  // Tools
  {
    method: "POST",
    path: "/tools/compress-prompt",
    summary: "Compress prompt text",
    auth: false,
    module: "tools",
  },
  {
    method: "POST",
    path: "/tools/optimize-tokens",
    summary: "Optimize token count",
    auth: false,
    module: "tools",
  },
  {
    method: "POST",
    path: "/tools/summarize-context",
    summary: "Summarize context to ratio",
    auth: false,
    module: "tools",
  },
  {
    method: "POST",
    path: "/tools/clean-instructions",
    summary: "Clean instruction text",
    auth: false,
    module: "tools",
  },
  {
    method: "POST",
    path: "/tools/format-json-prompt",
    summary: "Format as JSON prompt",
    auth: false,
    module: "tools",
  },
  // Agents
  {
    method: "GET",
    path: "/api/tools/ai-agents/presets",
    summary: "Get agent presets",
    auth: true,
    module: "agents",
  },
  {
    method: "POST",
    path: "/api/tools/ai-agents/from-preset",
    summary: "Create agent from preset",
    auth: true,
    module: "agents",
  },
  {
    method: "POST",
    path: "/api/tools/ai-agents/create",
    summary: "Create custom agent",
    auth: true,
    module: "agents",
  },
  {
    method: "GET",
    path: "/api/tools/ai-agents",
    summary: "List own agents",
    auth: true,
    module: "agents",
  },
  {
    method: "GET",
    path: "/api/tools/ai-agents/:id",
    summary: "Get agent by ID",
    auth: true,
    module: "agents",
  },
  {
    method: "PUT",
    path: "/api/tools/ai-agents/:id",
    summary: "Update agent",
    auth: true,
    module: "agents",
  },
  {
    method: "DELETE",
    path: "/api/tools/ai-agents/:id",
    summary: "Delete agent",
    auth: true,
    module: "agents",
  },
  {
    method: "POST",
    path: "/api/tools/ai-agents/run",
    summary: "Execute agent",
    auth: true,
    rateLimit: "20/min",
    module: "agents",
  },
  {
    method: "POST",
    path: "/api/tools/ai-agents/orchestrate",
    summary: "Orchestrate multiple agents",
    auth: true,
    rateLimit: "20/min",
    module: "agents",
  },
  {
    method: "GET",
    path: "/api/tools/ai-agents/:id/memory",
    summary: "Get agent memory",
    auth: true,
    module: "agents",
  },
  {
    method: "DELETE",
    path: "/api/tools/ai-agents/:id/memory",
    summary: "Clear agent memory",
    auth: true,
    module: "agents",
  },
  // Workflows
  {
    method: "POST",
    path: "/api/tools/ai-agents/workflows/create",
    summary: "Create workflow",
    auth: true,
    module: "workflows",
  },
  {
    method: "GET",
    path: "/api/tools/ai-agents/workflows",
    summary: "List workflows",
    auth: true,
    module: "workflows",
  },
  {
    method: "GET",
    path: "/api/tools/ai-agents/workflows/:id",
    summary: "Get workflow",
    auth: true,
    module: "workflows",
  },
  {
    method: "POST",
    path: "/api/tools/ai-agents/workflows/run",
    summary: "Execute workflow",
    auth: true,
    rateLimit: "20/min",
    module: "workflows",
  },
  {
    method: "DELETE",
    path: "/api/tools/ai-agents/workflows/:id",
    summary: "Delete workflow",
    auth: true,
    module: "workflows",
  },
  // Graphs
  {
    method: "POST",
    path: "/api/tools/ai-agents/graphs/create",
    summary: "Save graph layout",
    auth: true,
    module: "graphs",
  },
  {
    method: "GET",
    path: "/api/tools/ai-agents/graphs",
    summary: "List graphs",
    auth: true,
    module: "graphs",
  },
  {
    method: "GET",
    path: "/api/tools/ai-agents/graphs/:id",
    summary: "Get graph",
    auth: true,
    module: "graphs",
  },
  {
    method: "PUT",
    path: "/api/tools/ai-agents/graphs/:id",
    summary: "Update graph",
    auth: true,
    module: "graphs",
  },
  {
    method: "DELETE",
    path: "/api/tools/ai-agents/graphs/:id",
    summary: "Delete graph",
    auth: true,
    module: "graphs",
  },
  // Repositories
  {
    method: "GET",
    path: "/api/repositories",
    summary: "List own repositories",
    auth: true,
    module: "repositories",
  },
  {
    method: "POST",
    path: "/api/repositories",
    summary: "Connect repository",
    auth: true,
    module: "repositories",
  },
  {
    method: "GET",
    path: "/api/repositories/:id",
    summary: "Get repository",
    auth: true,
    module: "repositories",
  },
  {
    method: "DELETE",
    path: "/api/repositories/:id",
    summary: "Remove repository",
    auth: true,
    module: "repositories",
  },
  {
    method: "GET",
    path: "/api/repositories/:id/branches",
    summary: "List branches",
    auth: true,
    module: "repositories",
  },
  {
    method: "GET",
    path: "/api/repositories/:id/commits",
    summary: "List commits",
    auth: true,
    module: "repositories",
  },
  {
    method: "GET",
    path: "/api/repositories/:id/graph",
    summary: "Get branch graph data",
    auth: true,
    module: "repositories",
  },
  {
    method: "GET",
    path: "/api/repositories/:id/analytics",
    summary: "Get commit analytics",
    auth: true,
    module: "repositories",
  },
  // Friends
  {
    method: "GET",
    path: "/api/friends/search",
    summary: "Search users to add as friends",
    auth: true,
    module: "friends",
  },
  {
    method: "POST",
    path: "/api/friends/request",
    summary: "Send friend request",
    auth: true,
    module: "friends",
  },
  {
    method: "POST",
    path: "/api/friends/accept",
    summary: "Accept friend request",
    auth: true,
    module: "friends",
  },
  {
    method: "POST",
    path: "/api/friends/reject",
    summary: "Reject friend request",
    auth: true,
    module: "friends",
  },
  {
    method: "GET",
    path: "/api/friends/requests/received",
    summary: "Get received friend requests",
    auth: true,
    module: "friends",
  },
  {
    method: "GET",
    path: "/api/friends/requests/sent",
    summary: "Get sent friend requests",
    auth: true,
    module: "friends",
  },
  {
    method: "GET",
    path: "/api/friends",
    summary: "List friends",
    auth: true,
    module: "friends",
  },
  {
    method: "DELETE",
    path: "/api/friends/:friendUserId",
    summary: "Remove a friend",
    auth: true,
    module: "friends",
  },
  // Tricount
  {
    method: "GET",
    path: "/api/tricount/balance-summary",
    summary: "Overall balance across all groups",
    auth: true,
    module: "tricount",
  },
  {
    method: "GET",
    path: "/api/tricount/groups",
    summary: "List groups",
    auth: true,
    module: "tricount",
  },
  {
    method: "POST",
    path: "/api/tricount/groups",
    summary: "Create group",
    auth: true,
    module: "tricount",
  },
  {
    method: "PATCH",
    path: "/api/tricount/groups/:id",
    summary: "Update group",
    auth: true,
    module: "tricount",
  },
  {
    method: "DELETE",
    path: "/api/tricount/groups/:id",
    summary: "Delete group",
    auth: true,
    module: "tricount",
  },
  {
    method: "GET",
    path: "/api/tricount/groups/:id/members",
    summary: "List group members",
    auth: true,
    module: "tricount",
  },
  {
    method: "POST",
    path: "/api/tricount/groups/:id/members",
    summary: "Add member to group",
    auth: true,
    module: "tricount",
  },
  {
    method: "GET",
    path: "/api/tricount/groups/:id/expenses",
    summary: "List group expenses",
    auth: true,
    module: "tricount",
  },
  {
    method: "POST",
    path: "/api/tricount/groups/:id/expenses",
    summary: "Create expense",
    auth: true,
    module: "tricount",
  },
  {
    method: "PATCH",
    path: "/api/tricount/groups/:id/expenses/:expenseId",
    summary: "Update expense",
    auth: true,
    module: "tricount",
  },
  {
    method: "DELETE",
    path: "/api/tricount/groups/:id/expenses/:expenseId",
    summary: "Delete expense",
    auth: true,
    module: "tricount",
  },
  {
    method: "GET",
    path: "/api/tricount/groups/:id/categories",
    summary: "List expense categories",
    auth: true,
    module: "tricount",
  },
  {
    method: "POST",
    path: "/api/tricount/groups/:id/categories",
    summary: "Create expense category",
    auth: true,
    module: "tricount",
  },
  {
    method: "PATCH",
    path: "/api/tricount/expenses/:expenseId/category",
    summary: "Update expense category",
    auth: true,
    module: "tricount",
  },
  {
    method: "GET",
    path: "/api/tricount/groups/:id/settlements",
    summary: "List settlements",
    auth: true,
    module: "tricount",
  },
  {
    method: "POST",
    path: "/api/tricount/groups/:id/settlements",
    summary: "Create settlement",
    auth: true,
    module: "tricount",
  },
  {
    method: "GET",
    path: "/api/tricount/groups/:id/recurring",
    summary: "List recurring expenses",
    auth: true,
    module: "tricount",
  },
  {
    method: "POST",
    path: "/api/tricount/groups/:id/recurring",
    summary: "Create recurring expense",
    auth: true,
    module: "tricount",
  },
  {
    method: "POST",
    path: "/api/tricount/recurring/:id/trigger",
    summary: "Trigger recurring expense",
    auth: true,
    module: "tricount",
  },
  {
    method: "PATCH",
    path: "/api/tricount/recurring/:id/toggle",
    summary: "Toggle recurring expense",
    auth: true,
    module: "tricount",
  },
  {
    method: "GET",
    path: "/api/tricount/groups/:id/export",
    summary: "Export group data as CSV",
    auth: true,
    module: "tricount",
  },
  {
    method: "POST",
    path: "/api/tricount/expenses/:expenseId/receipt",
    summary: "Upload expense receipt image",
    auth: true,
    module: "tricount",
  },
  {
    method: "GET",
    path: "/api/tricount/expenses/:expenseId/receipt",
    summary: "Get expense receipt image",
    auth: true,
    module: "tricount",
  },
  {
    method: "GET",
    path: "/api/tricount/insights",
    summary: "Global spending insights",
    auth: true,
    module: "tricount",
  },
  {
    method: "GET",
    path: "/api/tricount/groups/:id/insights",
    summary: "Per-group spending insights",
    auth: true,
    module: "tricount",
  },
  // QR
  {
    method: "GET",
    path: "/api/qr/friend-token",
    summary: "Get QR friend token",
    auth: true,
    module: "qr",
  },
  {
    method: "POST",
    path: "/api/qr/friend-token/revoke",
    summary: "Revoke & regenerate QR friend token",
    auth: true,
    module: "qr",
  },
  {
    method: "POST",
    path: "/api/qr/friend-exchange",
    summary: "Exchange QR token to add friend",
    auth: true,
    module: "qr",
  },
  // Mobile App
  {
    method: "GET",
    path: "/api/mobile-app/public/download/:buildType",
    summary: "Public APK/AAB download (no login)",
    auth: false,
    module: "mobile",
  },
  {
    method: "GET",
    path: "/api/mobile-app/apps",
    summary: "List all mobile apps",
    auth: true,
    module: "mobile",
  },
  {
    method: "GET",
    path: "/api/mobile-app/apps/:slug",
    summary: "Get mobile app by slug",
    auth: true,
    module: "mobile",
  },
  {
    method: "POST",
    path: "/api/mobile-app/apps",
    summary: "Create mobile app entry",
    auth: true,
    roles: ["admin"],
    module: "mobile",
  },
  {
    method: "PATCH",
    path: "/api/mobile-app/apps/:id",
    summary: "Update mobile app",
    auth: true,
    roles: ["admin"],
    module: "mobile",
  },
  {
    method: "DELETE",
    path: "/api/mobile-app/apps/:id",
    summary: "Delete mobile app",
    auth: true,
    roles: ["admin"],
    module: "mobile",
  },
  {
    method: "GET",
    path: "/api/mobile-app/latest",
    summary: "Latest version across apps",
    auth: true,
    module: "mobile",
  },
  {
    method: "GET",
    path: "/api/mobile-app/versions",
    summary: "List all versions",
    auth: true,
    module: "mobile",
  },
  {
    method: "GET",
    path: "/api/mobile-app/download/version/:id",
    summary: "Download by version ID",
    auth: true,
    module: "mobile",
  },
  {
    method: "GET",
    path: "/api/mobile-app/download/:buildType",
    summary: "Download latest by build type",
    auth: true,
    module: "mobile",
  },
  {
    method: "POST",
    path: "/api/mobile-app/upload",
    summary: "Upload APK/AAB/IPA (multer)",
    auth: true,
    roles: ["admin"],
    module: "mobile",
  },
  {
    method: "DELETE",
    path: "/api/mobile-app/versions/:id",
    summary: "Delete version",
    auth: true,
    roles: ["admin"],
    module: "mobile",
  },
  {
    method: "PATCH",
    path: "/api/mobile-app/versions/:id/activate",
    summary: "Set version as active",
    auth: true,
    roles: ["admin"],
    module: "mobile",
  },
  {
    method: "GET",
    path: "/api/mobile-app/logs",
    summary: "Download logs (admin)",
    auth: true,
    roles: ["admin"],
    module: "mobile",
  },
  // Google Drive
  {
    method: "GET",
    path: "/api/admin/google-drive/auth-url",
    summary: "Get Google Drive OAuth URL",
    auth: true,
    roles: ["admin"],
    module: "google-drive",
  },
  {
    method: "GET",
    path: "/api/admin/google-drive/status",
    summary: "Google Drive connection status",
    auth: true,
    roles: ["admin"],
    module: "google-drive",
  },
  {
    method: "POST",
    path: "/api/admin/google-drive/folder",
    summary: "Set upload folder",
    auth: true,
    roles: ["admin"],
    module: "google-drive",
  },
  {
    method: "DELETE",
    path: "/api/admin/google-drive/disconnect",
    summary: "Disconnect Google Drive",
    auth: true,
    roles: ["admin"],
    module: "google-drive",
  },
  {
    method: "GET",
    path: "/api/google-drive/callback",
    summary: "Google OAuth callback handler",
    auth: false,
    module: "google-drive",
  },
  // Markets
  {
    method: "GET",
    path: "/api/markets/latest",
    summary: "Latest forex, BTC, ETH, gold, S&P 500, AAPL",
    auth: false,
    module: "markets",
  },
  // Orchestrator
  {
    method: "POST",
    path: "/api/orchestrator/tasks",
    summary: "Create orchestration task",
    auth: true,
    module: "orchestrator",
  },
  {
    method: "GET",
    path: "/api/orchestrator/tasks",
    summary: "List orchestration tasks",
    auth: true,
    module: "orchestrator",
  },
  {
    method: "GET",
    path: "/api/orchestrator/tasks/:id",
    summary: "Get task by ID",
    auth: true,
    module: "orchestrator",
  },
  {
    method: "GET",
    path: "/api/orchestrator/tasks/:id/logs",
    summary: "Get task execution logs",
    auth: true,
    module: "orchestrator",
  },
  {
    method: "POST",
    path: "/api/orchestrator/tasks/:id/run",
    summary: "Run a task",
    auth: true,
    module: "orchestrator",
  },
  {
    method: "POST",
    path: "/api/orchestrator/tasks/:id/cancel",
    summary: "Cancel a running task",
    auth: true,
    module: "orchestrator",
  },
  {
    method: "POST",
    path: "/api/orchestrator/run",
    summary: "Create + run task in one call",
    auth: true,
    module: "orchestrator",
  },
  {
    method: "GET",
    path: "/api/orchestrator/stats",
    summary: "Orchestrator statistics",
    auth: true,
    module: "orchestrator",
  },
  // Admin
  {
    method: "GET",
    path: "/admin/stats",
    summary: "Platform-wide metrics",
    auth: true,
    roles: ["admin"],
    module: "admin",
  },
  {
    method: "GET",
    path: "/admin/notifications",
    summary: "All notifications",
    auth: true,
    roles: ["admin"],
    module: "admin",
  },
  {
    method: "POST",
    path: "/admin/notifications/send",
    summary: "Send notification to users",
    auth: true,
    roles: ["admin"],
    module: "admin",
  },
  {
    method: "DELETE",
    path: "/admin/notifications/:id",
    summary: "Delete notification",
    auth: true,
    roles: ["admin"],
    module: "admin",
  },
  {
    method: "GET",
    path: "/admin/contact",
    summary: "All contact messages",
    auth: true,
    roles: ["admin"],
    module: "admin",
  },
  {
    method: "PATCH",
    path: "/admin/contact/:id/status",
    summary: "Update message status",
    auth: true,
    roles: ["admin"],
    module: "admin",
  },
  {
    method: "DELETE",
    path: "/admin/contact/:id",
    summary: "Delete message",
    auth: true,
    roles: ["admin"],
    module: "admin",
  },
  {
    method: "GET",
    path: "/admin/api-keys",
    summary: "All API keys",
    auth: true,
    roles: ["admin"],
    module: "admin",
  },
  {
    method: "PATCH",
    path: "/admin/api-keys/:id/revoke",
    summary: "Revoke any API key",
    auth: true,
    roles: ["admin"],
    module: "admin",
  },
  {
    method: "DELETE",
    path: "/admin/api-keys/:id",
    summary: "Delete any API key",
    auth: true,
    roles: ["admin"],
    module: "admin",
  },
  {
    method: "GET",
    path: "/admin/agents",
    summary: "All agents",
    auth: true,
    roles: ["admin"],
    module: "admin",
  },
  {
    method: "DELETE",
    path: "/admin/agents/:id",
    summary: "Delete any agent",
    auth: true,
    roles: ["admin"],
    module: "admin",
  },
  {
    method: "GET",
    path: "/admin/workflows",
    summary: "All workflows",
    auth: true,
    roles: ["admin"],
    module: "admin",
  },
  {
    method: "DELETE",
    path: "/admin/workflows/:id",
    summary: "Delete any workflow",
    auth: true,
    roles: ["admin"],
    module: "admin",
  },
  {
    method: "GET",
    path: "/admin/repositories",
    summary: "All repositories (any user)",
    auth: true,
    roles: ["admin"],
    module: "admin",
  },
  {
    method: "DELETE",
    path: "/admin/repositories/:id",
    summary: "Delete any repository",
    auth: true,
    roles: ["admin"],
    module: "admin",
  },
  {
    method: "GET",
    path: "/admin/friendships",
    summary: "All friendships (with emails)",
    auth: true,
    roles: ["admin"],
    module: "admin",
  },
  {
    method: "GET",
    path: "/admin/friendships/requests",
    summary: "All friend requests (with emails)",
    auth: true,
    roles: ["admin"],
    module: "admin",
  },
];

const MODULES = [
  "all",
  "health",
  "auth",
  "users",
  "roles",
  "api-keys",
  "notifications",
  "contact",
  "tools",
  "agents",
  "workflows",
  "graphs",
  "repositories",
  "friends",
  "tricount",
  "qr",
  "mobile",
  "google-drive",
  "markets",
  "orchestrator",
  "admin",
] as const;

type Module = (typeof MODULES)[number];

const METHOD_COLOR: Record<HttpMethod, string> = {
  GET: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400",
  POST: "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400",
  PATCH: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
  PUT: "bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400",
  DELETE: "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400",
};

// ── Architecture docs ─────────────────────────────────────────────────────────

interface DocSection {
  id: string;
  title: string;
  content: { heading: string; items: string[] }[];
}

const docs: DocSection[] = [
  {
    id: "backend",
    title: "Backend",
    content: [
      {
        heading: "Arquitectura",
        items: [
          "Express.js + TypeScript strict con exactOptionalPropertyTypes",
          "Clean architecture: controllers → services → Supabase (bypass RLS con supabaseAdmin)",
          "Middlewares: apiKeyAuth, authenticate, requireRole, requireAnyRole, validate (Zod)",
          "Rate limiting: global (100/15m) + auth (20/15m) + contact (5/15m) + AI (20/min) + create (10/min)",
          "~140 endpoints REST con formato { success, data, error }",
        ],
      },
      {
        heading: "API Key Gate",
        items: [
          "X-API-Key requerido en TODOS los endpoints excepto /health y /auth/* y /api/markets/*",
          "Dos tipos: estático en env (para web) + dinámico en tabla api_keys (programáticas)",
          "Keys almacenadas con hash SHA-256, prefix visible, raw key mostrada una vez al crear",
          "Si API_KEY env vacía → modo desarrollo sin gating",
        ],
      },
      {
        heading: "Seguridad",
        items: [
          "Supabase Auth con JWT — tokens verificados en cada request autenticado",
          "RBAC vía tabla user_roles + middlewares requireRole('admin'|'editor')",
          "Helmet + CORS con lista blanca + rate limiting + Zod input validation",
          "Row Level Security (RLS) en todas las tablas Supabase",
          "CORS dinámico con wildcards para preview deployments",
        ],
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    content: [
      {
        heading: "Stack",
        items: [
          "Next.js 16.2.6 (pages router) + React 19 + TypeScript strict",
          "HeroUI v3 — sistema de componentes UI",
          "Tailwind CSS v4 con @import 'tailwindcss'",
          "Zustand para estado global (useShallow para React 19 compat)",
        ],
      },
      {
        heading: "Arquitectura",
        items: [
          "Feature-based: features/auth/, features/admin/, features/notifications/, features/settings/",
          "Services layer: apiClient, authService, userService, adminService, repositoryService…",
          "Hooks: useAuth, useNotifications, useRequireAuth, useRequireAdmin",
          "apiFetch wrapper con interceptor de refresh automático en 401",
        ],
      },
      {
        heading: "Rutas principales",
        items: [
          "/ — Portfolio principal",
          "/blog/[slug] — Artículos, tutoriales, herramientas",
          "/tools/git-repositories — Git Repository Manager",
          "/dashboard — Panel de usuario autenticado (7 secciones)",
          "/admin — Panel de administración (rol admin, 16 secciones)",
          "/notifications — Centro de notificaciones",
          "/contact — Formulario de contacto",
        ],
      },
    ],
  },
  {
    id: "modules",
    title: "Módulos",
    content: [
      {
        heading: "Auth (11 endpoints)",
        items: [
          "Register, login, logout, refresh, me, change-password",
          "Admin: change-password, confirm-email, resend-confirmation",
          "Forgot/reset password con rate limiting dedicado",
          "JWT accessToken (~1h) + refreshToken rotativo",
        ],
      },
      {
        heading: "Usuarios y Roles (10 endpoints)",
        items: [
          "CRUD completo de usuarios (admin) + roles RBAC",
          "Asignar/remover roles con validaciones de sistema",
          "Editor role para acceso parcial a datos de usuarios",
        ],
      },
      {
        heading: "Repositorios Git (8 endpoints)",
        items: [
          "Conectar repos GitHub/GitLab/Bitbucket con token cifrado",
          "Commits por rama, grafo SVG, analytics de actividad",
          "Soporta múltiples proveedores con API REST",
        ],
      },
      {
        heading: "Agentes IA (22 endpoints)",
        items: [
          "6 presets + creación custom con system prompt y schemas",
          "Memoria persistente en Supabase (max 20 turnos)",
          "Provider abstraction: Mock → Anthropic → OpenAI",
          "Rate limit 20 req/min en ejecución",
        ],
      },
      {
        heading: "Workflows y Grafos",
        items: [
          "Pipelines multi-agente con inputMapping y contexto compartido",
          "Grafos no lineales con nodos, aristas y condiciones",
          "Detección de loops (max 3 veces mismo agente), max 20 pasos",
        ],
      },
      {
        heading: "Orquestador (8 endpoints)",
        items: [
          "Orquestación tipo single, pipeline, parallel, conditional, autogpt",
          "Logs detallados por paso con métricas de tokens",
          "Tasks con reintentos, cancelación y estadísticas",
        ],
      },
      {
        heading: "Tricount (28 endpoints)",
        items: [
          "Grupos de gasto compartido con miembros y splits",
          "Gastos, splits, categorías, liquidaciones (settlements)",
          "Gastos recurrentes, recibos (imágenes), export CSV",
          "Insights globales y por grupo de gasto",
        ],
      },
      {
        heading: "Amigos (8 endpoints)",
        items: [
          "Sistema bidireccional con solicitudes pendientes",
          "Búsqueda de usuarios, QR exchange para add rápido",
          "Notificaciones automáticas en solicitud/aceptación",
        ],
      },
      {
        heading: "App Móvil (14 endpoints)",
        items: [
          "Distribución de APK/AAB/IPA con versionado semántico",
          "Descarga pública sin login + descarga autenticada",
          "Upload con multer, logs de descargas, activate/deactivate",
          "Google Drive como backend de storage opcional",
        ],
      },
      {
        heading: "QR y Markets",
        items: [
          "QR tokens para intercambio rápido de amistad",
          "Markets: forex, BTC, ETH, gold, S&P 500, AAPL (público, cache 30s)",
        ],
      },
    ],
  },
  {
    id: "admin",
    title: "Administración",
    content: [
      {
        heading: "Acceso",
        items: [
          "Rol 'admin' requerido — asignable desde panel Usuarios",
          "Middleware requireRole('admin') protege todas las rutas /admin/*",
          "Frontend /admin protegida por useRequireAdmin() hook",
          "Sidebar con grupos: general, contenido, IA, comunicación, herramientas, sistema",
        ],
      },
      {
        heading: "16 secciones del panel",
        items: [
          "Dashboard — métricas globales (10 queries: usuarios, roles, API keys, agents, notifs, contact, descargas)",
          "Usuarios — tabla con búsqueda, edición de nombre, roles, eliminación",
          "Roles — CRUD completo, protección de roles sistema (admin no borrable)",
          "API Keys — todas las claves del sistema, revocar, eliminar",
          "Blog — inventario de contenido del sistema de registry (sin backend CRUD)",
          "Taxonomía — categorías, tags y rutas de aprendizaje (sin backend CRUD)",
          "Agentes IA — todos los agentes de cualquier usuario, eliminar cualquiera",
          "Workflows — todos los workflows del sistema",
          "Orquestador — panel de control de orquestación (mock actualmente)",
          "Notificaciones — bandeja global + envío a usuarios/todos/admins",
          "Mensajes — formularios de contacto con estados pending/reviewed/replied",
          "Repositorios — todos los repos conectados por usuarios",
          "Amistades — gestión del sistema social con emails",
          "Apps — distribución de app móvil con versiones y upload",
          "Logs — aggregación client-side de endpoints (pendiente endpoint dedicado)",
          "Docs — esta sección + explorador de ~140 endpoints",
        ],
      },
      {
        heading: "Discrepancias conocidas",
        items: [
          "AdminRepositoriesSection y AdminFriendshipsSection usan apiFetch directo (no adminService)",
          "AdminOrchestratorSection es 100% mock (sin backend)",
          "AdminLogsSection hace aggregación client-side (sin endpoint /admin/logs)",
          "AdminBlogSection y AdminTaxonomySection sin backend CRUD (dependen de archivos locales)",
          "No hay endpoint admin para editar perfil de otro usuario",
        ],
      },
    ],
  },
  {
    id: "mobile",
    title: "App Móvil",
    content: [
      {
        heading: "Stack",
        items: [
          "React Native + Expo SDK 54",
          "Expo Router 4 (tabs + screens)",
          "Zustand + React Query para estado y cache",
          "Tema dark #04050A, 9 accents, tipografía mono en balances",
        ],
      },
      {
        heading: "Tabs",
        items: [
          "Inicio — resumen y accesos rápidos",
          "Grupos — gestión de grupos Tricount",
          "Insights — estadísticas de gasto (mock actualmente)",
          "Amigos — sistema social móvil",
          "Avisos — notificaciones push",
          "Perfil — configuración y preferencias",
        ],
      },
      {
        heading: "Distribución",
        items: [
          "APK/AAB build con pnpm build:local",
          "Download: Accept application/json → redirect a raw URL",
          "Upload destination: gdrive | supabase | external_url",
          "Google Drive OAuth para upload automático",
        ],
      },
    ],
  },
  {
    id: "database",
    title: "Base de Datos",
    content: [
      {
        heading: "Infraestructura",
        items: [
          "Supabase (PostgreSQL 15) en región eu-west-1 (Ireland)",
          "Proyecto ID: vujibqrmlpcmrtktdanw",
          "Backend usa supabaseAdmin (service role) → bypass RLS",
          "Frontend usa cliente anon + JWT → RLS activo (datos del usuario)",
        ],
      },
      {
        heading: "Grupos de tablas",
        items: [
          "Auth: auth.users, profiles, roles, user_roles, users_preferences, audit_logs",
          "IA: ai_agents, agent_memory, agent_workflows, agent_graphs, orchestrator_tasks, orchestrator_logs",
          "Blog: blog_categories, blog_tags, learning_paths, learning_path_steps, content_relationships",
          "Tricount: tricount_groups, tricount_members, tricount_expenses, tricount_expense_splits",
          "Social: friend_requests, friendships",
          "Mobile: mobile_app_versions, mobile_download_logs",
          "API: api_keys, git_repositories, git_repository_tokens",
        ],
      },
      {
        heading: "Seguridad datos",
        items: [
          "RLS activo en todas las tablas public",
          "Passwords hasheadas por Supabase Auth (bcrypt)",
          "API keys: solo SHA-256 hash, nunca en claro",
          "Access tokens cifrados con crypto.subtle o similar",
          "Migraciones versionadas con nombres descriptivos",
        ],
      },
    ],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

type View = "endpoints" | "architecture" | "database" | "flowchart";

export function AdminDocsSection() {
  const [view, setView] = useState<View>("endpoints");
  const [activeModule, setActiveModule] = useState<Module>("all");
  const [search, setSearch] = useState("");
  const [activeDoc, setActiveDoc] = useState("backend");

  const filtered = ENDPOINTS.filter(
    (e) =>
      (activeModule === "all" || e.module === activeModule) &&
      (e.path.toLowerCase().includes(search.toLowerCase()) ||
        e.summary.toLowerCase().includes(search.toLowerCase())),
  );

  const currentDoc = docs.find((d) => d.id === activeDoc)!;

  const tabCls = (v: View) =>
    `px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
      view === v
        ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f]"
        : "text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
    }`;

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        desc={`${ENDPOINTS.length} endpoints · 20 módulos · referencia técnica completa`}
        title="Documentación"
      />

      {/* View toggle */}
      <div className="flex gap-1 bg-black/[0.04] dark:bg-white/[0.04] p-1 rounded-2xl w-fit">
        <button
          className={tabCls("endpoints")}
          onClick={() => setView("endpoints")}
        >
          Endpoint Explorer
        </button>
        <button
          className={tabCls("architecture")}
          onClick={() => setView("architecture")}
        >
          Arquitectura
        </button>
        <button
          className={tabCls("database")}
          onClick={() => setView("database")}
        >
          Base de datos
        </button>
        <button
          className={tabCls("flowchart")}
          onClick={() => setView("flowchart")}
        >
          Flujo de aplicación
        </button>
      </div>

      {/* Endpoint Explorer */}
      {view === "endpoints" && (
        <div className="flex flex-col gap-4">
          {/* Search + filter */}
          <div className="flex gap-3 flex-wrap">
            <div className="relative flex-1 min-w-48">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aeaeb2]"
                fill="none"
                height="13"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
                viewBox="0 0 16 16"
                width="13"
              >
                <circle cx="7" cy="7" r="4.5" />
                <path d="M10.5 10.5L14 14" />
              </svg>
              <input
                className="w-full pl-8 pr-3 py-2 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2]"
                placeholder="Buscar endpoint o ruta…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-1 flex-wrap">
              {MODULES.map((m) => (
                <button
                  key={m}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    activeModule === m
                      ? "bg-blue-600 text-white"
                      : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                  onClick={() => setActiveModule(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {filtered.length} endpoint{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Endpoint list */}
          <div className="bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl overflow-hidden">
            {filtered.length === 0 ? (
              <p className="px-5 py-8 text-sm text-center text-[#6e6e73] dark:text-[#86868b]">
                No endpoints match
              </p>
            ) : (
              <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                {filtered.map((e, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold font-mono w-14 text-center flex-shrink-0 ${METHOD_COLOR[e.method]}`}
                    >
                      {e.method}
                    </span>
                    <code className="text-xs font-mono text-[#1d1d1f] dark:text-white flex-1 truncate">
                      {e.path}
                    </code>
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b] flex-1 min-w-0 truncate hidden sm:block">
                      {e.summary}
                    </p>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {e.auth ? (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-50 dark:bg-amber-950/30 text-amber-600 font-medium">
                          auth
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-green-50 dark:bg-green-950/30 text-green-600 font-medium">
                          public
                        </span>
                      )}
                      {e.roles?.map((r) => (
                        <span
                          key={r}
                          className="px-1.5 py-0.5 rounded text-[9px] bg-purple-50 dark:bg-purple-950/30 text-purple-600 font-medium"
                        >
                          {r}
                        </span>
                      ))}
                      {e.rateLimit && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-black/[0.04] dark:bg-white/[0.04] text-[#6e6e73] dark:text-[#86868b] font-mono">
                          {e.rateLimit}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Database diagram */}
      {view === "database" && (
        <div className="flex flex-col gap-4">
          <DatabaseDiagram />
        </div>
      )}

      {/* Flow diagram */}
      {view === "flowchart" && (
        <div className="flex flex-col gap-4">
          <AppFlowDiagram />
        </div>
      )}

      {/* Architecture docs */}
      {view === "architecture" && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-1 flex-wrap">
            {docs.map((d) => (
              <button
                key={d.id}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  activeDoc === d.id
                    ? "bg-blue-600 text-white"
                    : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
                }`}
                onClick={() => setActiveDoc(d.id)}
              >
                {d.title}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {currentDoc.content.map((section) => (
              <Card key={section.heading} className="px-5 py-4">
                <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-3">
                  {section.heading}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[#6e6e73] dark:text-[#86868b]"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
