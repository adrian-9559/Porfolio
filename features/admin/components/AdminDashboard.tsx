import type { UserWithProfile } from "@/types/auth";

import { useEffect, useState, useMemo } from "react";

import { relativeTime } from "./AdminShared";
import { AdminBarChart, AdminDonutChart, AdminHorizontalBarChart } from "./AdminCharts";
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

const ACTIVITY_ICONS: Record<string, string> = {
  user: "👤",
  notification: "🔔",
  message: "✉️",
  issue: "🐛",
  idea: "💡",
};

const QUICK_ACTIONS = [
  { id: "users", labelKey: "admin.shortcutUsers" },
  { id: "notifications", labelKey: "admin.shortcutNotifications" },
  { id: "contact", labelKey: "admin.shortcutMessages" },
  { id: "issues", labelKey: "admin.shortcutIssues" },
  { id: "ideas", labelKey: "admin.shortcutIdeas" },
  { id: "traffic", labelKey: "admin.shortcutTraffic" },
] as const;

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

  const issueStatusColors: Record<string, string> = {
    open: "#8b5cf6",
    in_progress: "#f59e0b",
    resolved: "#10b981",
    closed: "#6b7280",
  };
  const ideaStatusColors: Record<string, string> = {
    idea: "#8b5cf6",
    planned: "#f59e0b",
    in_progress: "#3b82f6",
    done: "#10b981",
    archived: "#6b7280",
  };

  if (loading) {
    return (
      <div>
        <AdminPageHeader
          title={t("admin.dashboard")}
          description={t("admin.dashboardDesc")}
        />
        <div className="space-y-6">
          <AdminLoadingSkeleton rows={4} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AdminLoadingSkeleton rows={8} />
            <AdminLoadingSkeleton rows={8} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title={t("admin.dashboard")}
        description={t("admin.dashboardDesc")}
      />

      {/* Quick Actions */}
      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {QUICK_ACTIONS.map((sc) => (
            <button
              key={sc.id}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-hover)] transition-all text-[12px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] shrink-0"
              onClick={() => onNavigate(sc.id)}
            >
              {t(sc.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Stats */}
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
              sub={`${stats.workflows} workflows`}
            />
          </AdminStatGrid>
        </div>
      )}

      {/* Secondary Stats */}
      <div className="mb-6">
        <AdminStatGrid cols={3}>
          <AdminStat
            label={t("admin.issueBoards")}
            value={issueStats?.totalBoards ?? 0}
          />
          <AdminStat
            label={t("admin.issueTickets")}
            value={issueStats?.totalTickets ?? 0}
          />
          <AdminStat
            label={t("admin.ideas")}
            value={ideaStats?.total ?? 0}
          />
        </AdminStatGrid>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AdminPanel title={t("admin.trafficChart")}>
          <AdminBarChart data={trafficByDay} height={220} />
        </AdminPanel>

        <AdminPanel title={t("admin.topPages")}>
          <AdminHorizontalBarChart data={topPages} height={220} />
        </AdminPanel>
      </div>

      {/* Donut Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <AdminPanel title={t("admin.issuesByStatus")}>
          <AdminDonutChart
            data={issueStats?.byStatus ?? {}}
            colors={issueStatusColors}
            height={200}
          />
        </AdminPanel>

        <AdminPanel title={t("admin.ideasByStatus")}>
          <AdminDonutChart
            data={ideaStats?.byStatus ?? {}}
            colors={ideaStatusColors}
            height={200}
          />
        </AdminPanel>
      </div>

      {/* Bottom Row: Activity + Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminPanel title={t("admin.recentActivity")}>
          {activityFeed.length === 0 ? (
            <AdminEmptyState
              title={t("admin.noActivity")}
              description="No recent activity to display"
            />
          ) : (
            <div className="divide-y divide-[var(--border-default)]">
              {activityFeed.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-3 hover:bg-[var(--bg-hover)] transition-colors -mx-5 px-5"
                >
                  <span className="text-sm shrink-0 mt-0.5">
                    {ACTIVITY_ICONS[item.type] ?? "📋"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-[var(--text-primary)]">
                      {item.title}
                    </p>
                    <p className="text-[12px] text-[var(--text-muted)] truncate">
                      {item.detail}
                    </p>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] shrink-0 font-medium">
                    {relativeTime(item.date)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </AdminPanel>

        <AdminPanel title={t("admin.systemHealth")}>
          {healthError ? (
            <AdminEmptyState
              title={t("admin.healthUnavailable")}
              description="Unable to connect to the server"
            />
          ) : health ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span
                  className={`admin-badge ${health.status === "ok" && health.db?.ok !== false ? "admin-badge-success" : "admin-badge-danger"}`}
                >
                  {health.status === "ok" && health.db?.ok !== false
                    ? t("admin.healthOk")
                    : t("admin.healthDegraded")}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                    {health.memory ? formatMemory(health.memory.rss ?? 0) : "—"}
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
              {health.db?.tables && (
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                    DB Tables
                  </div>
                  <div className="flex flex-wrap gap-1.5">
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

      {/* Recent Users */}
      <div className="mt-6">
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
              description="No users registered yet"
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
    </div>
  );
}
