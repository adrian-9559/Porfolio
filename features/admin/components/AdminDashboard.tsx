import type { UserWithProfile } from "@/types/auth";

import { useEffect, useState, useMemo } from "react";

import { relativeTime } from "./AdminShared";
import { AdminBarChart, AdminHorizontalBarChart } from "./AdminCharts";
import {
  AdminPageHeader,
  AdminStatGrid,
  AdminStat,
  AdminPanel,
  AdminEmptyState,
  AdminLoadingSkeleton,
} from "./AdminShell";

import { useT } from "@/hooks/useT";
import {
  adminService,
  AdminStats,
  SystemHealth,
} from "@/services/adminService";
import { analyticsService } from "@/services/analyticsService";
import { userService } from "@/services/userService";

export { SectionHeader } from "./AdminShared";

interface ActivityItem {
  type: "user" | "notification" | "message" | "issue" | "idea";
  title: string;
  detail: string;
  date: string;
}

const ACTIVITY_BORDER_COLORS: Record<ActivityItem["type"], string> = {
  user: "border-l-[var(--accent)]",
  notification: "border-l-amber-500",
  message: "border-l-blue-500",
  issue: "border-l-purple-500",
  idea: "border-l-emerald-500",
};

const QUICK_ACTIONS = [
  { id: "users", labelKey: "admin.shortcutUsers" },
  { id: "notifications", labelKey: "admin.shortcutNotifications" },
  { id: "contact", labelKey: "admin.shortcutMessages" },
  { id: "issues", labelKey: "admin.shortcutIssues" },
  { id: "ideas", labelKey: "admin.shortcutIdeas" },
  { id: "traffic", labelKey: "admin.shortcutTraffic" },
] as const;

const ISSUE_STATUS_COLORS: Record<string, string> = {
  open: "#8b5cf6",
  in_progress: "#f59e0b",
  resolved: "#10b981",
  closed: "#6b7280",
};

const IDEA_STATUS_COLORS: Record<string, string> = {
  idea: "#8b5cf6",
  planned: "#f59e0b",
  in_progress: "#3b82f6",
  done: "#10b981",
  archived: "#6b7280",
};

export function AdminDashboard({
  onNavigate,
}: {
  onNavigate: (section: string) => void;
}) {
  const { t } = useT();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<UserWithProfile[]>([]);
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [healthError, setHealthError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [trafficByDay, setTrafficByDay] = useState<
    { date: string; visits: number }[]
  >([]);
  const [topPages, setTopPages] = useState<{ path: string; visits: number }[]>(
    [],
  );
  const [issueStats, setIssueStats] = useState<{
    totalBoards: number;
    totalTickets: number;
    byStatus: Record<string, number>;
    byPriority: Record<string, number>;
  } | null>(null);
  const [ideaStats, setIdeaStats] = useState<{
    total: number;
    byStatus: Record<string, number>;
  } | null>(null);

  const [recentNotifications, setRecentNotifications] = useState<any[]>([]);
  const [recentContacts, setRecentContacts] = useState<any[]>([]);
  const [recentIssues, setRecentIssues] = useState<any[]>([]);
  const [recentIdeas, setRecentIdeas] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      adminService
        .getStats()
        .then(setStats)
        .catch(() => {}),
      userService
        .list()
        .then((u) => setRecentUsers(u.filter((u) => u.profile).slice(0, 6)))
        .catch(() => {}),
      adminService
        .getHealth()
        .then(setHealth)
        .catch(() => setHealthError(true)),
      analyticsService
        .getTrafficByDay(30)
        .then(setTrafficByDay)
        .catch(() => {}),
      analyticsService
        .getTrafficByPage()
        .then((p) => setTopPages(p.slice(0, 5)))
        .catch(() => {}),
      adminService
        .getIssueStats()
        .then(setIssueStats)
        .catch(() => {}),
      adminService
        .getIdeaStats()
        .then(setIdeaStats)
        .catch(() => {}),
      adminService
        .listNotifications()
        .then((n) => setRecentNotifications(n.slice(0, 5)))
        .catch(() => {}),
      adminService
        .listContact()
        .then((c) => setRecentContacts(c.slice(0, 5)))
        .catch(() => {}),
      adminService
        .listIssueTickets()
        .then((tk) => setRecentIssues(tk.slice(0, 5)))
        .catch(() => {}),
      adminService
        .listAllIdeas()
        .then((i) => setRecentIdeas(i.slice(0, 5)))
        .catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  const activityFeed = useMemo(() => {
    const items: ActivityItem[] = [];

    for (const u of recentUsers) {
      if (!u.profile) continue;
      items.push({
        type: "user",
        title: t("admin.activityUser"),
        detail: u.profile?.full_name ?? u.email,
        date: u.profile?.created_at ?? new Date().toISOString(),
      });
    }
    for (const n of recentNotifications) {
      items.push({
        type: "notification",
        title: t("admin.activityNotification"),
        detail: n.title,
        date: n.created_at,
      });
    }
    for (const c of recentContacts) {
      items.push({
        type: "message",
        title: t("admin.activityMessage"),
        detail: `${c.name}: ${c.message.slice(0, 60)}${c.message.length > 60 ? "…" : ""}`,
        date: c.created_at,
      });
    }
    for (const tk of recentIssues) {
      items.push({
        type: "issue",
        title: t("admin.activityIssue"),
        detail: tk.title,
        date: tk.created_at,
      });
    }
    for (const i of recentIdeas) {
      items.push({
        type: "idea",
        title: t("admin.activityIdea"),
        detail: i.title,
        date: i.created_at,
      });
    }
    items.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return items.slice(0, 10);
  }, [
    recentUsers,
    recentNotifications,
    recentContacts,
    recentIssues,
    recentIdeas,
    t,
  ]);

  const formatUptime = (seconds: number) => {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);

    if (d > 0) return `${d}d ${h}h ${m}m`;
    if (h > 0) return `${h}h ${m}m`;

    return `${m}m`;
  };
  const formatMemory = (bytes: number) =>
    `${Math.round(bytes / 1024 / 1024)} MB`;

  /* ── Loading ──────────────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div>
        <AdminPageHeader
          title={t("admin.dashboard")}
          description={t("admin.dashboardDesc")}
        />
        <div className="space-y-6">
          <AdminStatGrid cols={4}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="admin-skeleton h-24 w-full rounded-xl" />
            ))}
          </AdminStatGrid>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <AdminLoadingSkeleton rows={8} />
            </div>
            <div className="lg:col-span-2">
              <AdminLoadingSkeleton rows={8} />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <AdminLoadingSkeleton rows={6} />
            </div>
            <div className="lg:col-span-3">
              <AdminLoadingSkeleton rows={6} />
            </div>
          </div>
          <AdminLoadingSkeleton rows={5} />
        </div>
      </div>
    );
  }

  /* ── Dashboard ────────────────────────────────────────────────────────── */
  return (
    <div>
      <AdminPageHeader
        title={t("admin.dashboard")}
        description={t("admin.dashboardDesc")}
      />

      {/* Row 1 — Primary Stats */}
      {stats && (
        <div className="mb-6">
          <AdminStatGrid cols={4}>
            <AdminStat
              label={t("admin.users")}
              value={stats.users}
              sub={t("admin.subAdmin", { n: stats.admins })}
              accent
            />
            <AdminStat
              label={t("admin.notifications")}
              value={stats.notifications}
              sub={t("admin.subUnread", { n: stats.notificationsUnread })}
            />
            <AdminStat
              label={t("admin.messages")}
              value={stats.contactMessages}
              sub={t("admin.subPending", { n: stats.contactUnread })}
            />
            <AdminStat
              label={t("admin.agents")}
              value={stats.agents}
              sub={`${stats.workflows} ${t("admin.subWorkflows", { n: stats.workflows }).split(" ")[1] ?? "workflows"}`}
            />
          </AdminStatGrid>
        </div>
      )}

      {/* Row 2 — Traffic Chart + Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <div className="lg:col-span-3">
          <AdminPanel title={t("admin.trafficChart")}>
            <AdminBarChart data={trafficByDay} height={240} />
          </AdminPanel>
        </div>
        <div className="lg:col-span-2">
          <AdminPanel title={t("admin.topPages")}>
            <AdminHorizontalBarChart data={topPages} height={240} />
          </AdminPanel>
        </div>
      </div>

      {/* Row 3 — Issues · Ideas · System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        {/* Issues panel */}
        <div className="lg:col-span-2">
          <AdminPanel title={t("admin.issues")}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <AdminStat
                  label={t("admin.issueBoards")}
                  value={issueStats?.totalBoards ?? 0}
                />
                <AdminStat
                  label={t("admin.issueTickets")}
                  value={issueStats?.totalTickets ?? 0}
                />
              </div>
              {/* Status breakdown — only rendered if there's data */}
              {issueStats &&
                Object.keys(issueStats.byStatus).length > 0 && (
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                      {t("admin.issuesByStatus")}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(issueStats.byStatus).map(
                        ([status, count]) => (
                          <span
                            key={status}
                            className="admin-badge"
                            style={{
                              borderLeft: `3px solid ${ISSUE_STATUS_COLORS[status] ?? "var(--text-muted)"}`,
                            }}
                          >
                            {status}: {count}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                )}
            </div>
          </AdminPanel>
        </div>

        {/* Ideas panel */}
        <div className="lg:col-span-1">
          <AdminPanel title={t("admin.ideas")}>
            <AdminStat
              label={t("admin.ideas")}
              value={ideaStats?.total ?? 0}
            />
            {ideaStats && Object.keys(ideaStats.byStatus).length > 0 && (
              <div className="mt-3 space-y-1.5">
                {Object.entries(ideaStats.byStatus).map(([status, count]) => (
                  <div
                    key={status}
                    className="flex items-center justify-between text-[11px]"
                  >
                    <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{
                          backgroundColor:
                            IDEA_STATUS_COLORS[status] ?? "var(--text-muted)",
                        }}
                      />
                      {status}
                    </span>
                    <span className="font-medium text-[var(--text-primary)]">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </AdminPanel>
        </div>

        {/* System Health — wider */}
        <div className="lg:col-span-2">
          <AdminPanel title={t("admin.systemHealth")}>
            {healthError ? (
              <AdminEmptyState
                title={t("admin.healthUnavailable")}
                description={t("admin.healthConnectionError")}
              />
            ) : health ? (
              <div className="space-y-3">
                {/* Status badge */}
                <div className="flex items-center gap-2">
                  <span
                    className={`admin-badge ${health.status === "ok" && health.db?.ok !== false ? "admin-badge-success" : "admin-badge-danger"}`}
                  >
                    {health.status === "ok" && health.db?.ok !== false
                      ? t("admin.healthOk")
                      : t("admin.healthDegraded")}
                  </span>
                </div>

                {/* Core metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      {t("admin.healthEnv")}
                    </div>
                    <div className="text-[13px] font-medium text-[var(--text-primary)] mt-0.5">
                      {health.env}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      {t("admin.serverUptime")}
                    </div>
                    <div className="text-[13px] font-medium text-[var(--text-primary)] mt-0.5">
                      {formatUptime(health.uptime ?? 0)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      {t("admin.serverMemory")}
                    </div>
                    <div className="text-[13px] font-medium text-[var(--text-primary)] mt-0.5">
                      {health.memory
                        ? formatMemory(health.memory.rss ?? 0)
                        : "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      {t("admin.healthDbChecked")}
                    </div>
                    <div className="text-[13px] font-medium text-[var(--text-primary)] mt-0.5">
                      {health.db ? relativeTime(health.db.checkedAt) : "—"}
                    </div>
                  </div>
                </div>

                {/* DB Tables */}
                {health.db?.tables && (
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                      {t("admin.dbTables")}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(health.db.tables).map(([table, ok]) => (
                        <span
                          key={table}
                          className={`admin-badge ${ok ? "admin-badge-success" : "admin-badge-danger"}`}
                        >
                          {table}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <AdminLoadingSkeleton rows={3} />
            )}
          </AdminPanel>
        </div>
      </div>

      {/* Row 4 — Activity Feed + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <div className="lg:col-span-3">
          <AdminPanel title={t("admin.recentActivity")}>
            {activityFeed.length === 0 ? (
              <AdminEmptyState
                title={t("admin.noActivity")}
                description={t("admin.noActivityHint")}
              />
            ) : (
              <div className="space-y-0.5">
                {activityFeed.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 py-2.5 px-3 -mx-3 rounded-md border-l-2 hover:bg-[var(--bg-hover)] transition-colors ${ACTIVITY_BORDER_COLORS[item.type]}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[12px] font-medium text-[var(--text-primary)]">
                          {item.title}
                        </p>
                        <span className="text-[10px] text-[var(--text-muted)] font-medium">
                          {relativeTime(item.date)}
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] truncate">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </AdminPanel>
        </div>

        <div className="lg:col-span-2">
          <AdminPanel title={t("admin.quickActions")}>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_ACTIONS.map((sc) => (
                <button
                  key={sc.id}
                  className="flex items-center justify-center px-3 py-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-hover)] transition-all text-[12px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  onClick={() => onNavigate(sc.id)}
                >
                  {t(sc.labelKey)}
                </button>
              ))}
            </div>
          </AdminPanel>
        </div>
      </div>

      {/* Row 5 — Recent Users */}
      <AdminPanel
        title={t("admin.recentUsers")}
        actions={
          <span className="text-[11px] text-[var(--text-muted)]">
            {t("admin.usersShown", { n: recentUsers.length })}
          </span>
        }
      >
        {recentUsers.length === 0 ? (
          <AdminEmptyState
            title={t("admin.noUsers")}
            description={t("admin.noUsersHint")}
          />
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {recentUsers.map((u) => (
              <div
                key={u.id}
                className="flex items-center gap-3 py-3 hover:bg-[var(--bg-hover)] transition-colors -mx-5 px-5"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] text-[11px] font-bold shrink-0">
                  {(u.profile?.full_name ?? u.email)
                    .split(" ")
                    .map((w) => w[0] ?? "")
                    .join("")
                    .slice(0, 2)
                    .toUpperCase() || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[var(--text-primary)] truncate">
                    {u.profile?.full_name ?? "—"}
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)] truncate">
                    {u.email}
                  </p>
                </div>
                <div className="flex gap-1 flex-wrap justify-end">
                  {u.roles.map((r) => (
                    <span
                      key={r.id}
                      className="admin-badge admin-badge-info"
                    >
                      {r.name}
                    </span>
                  ))}
                </div>
                {u.profile?.created_at && (
                  <span className="text-[10px] text-[var(--text-muted)] shrink-0 font-medium">
                    {relativeTime(u.profile.created_at)}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </AdminPanel>
    </div>
  );
}
