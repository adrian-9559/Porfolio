import type { UserWithProfile } from "@/types/auth";
import { useEffect, useState, useMemo } from "react";
import { relativeTime } from "./AdminShared";
import { useT } from "@/hooks/useT";
import { adminService, AdminStats, SystemHealth } from "@/services/adminService";
import { analyticsService } from "@/services/analyticsService";
import { userService } from "@/services/userService";

export { SectionHeader } from "./AdminShared";

interface ActivityItem {
  type: "user" | "notification" | "message" | "issue" | "idea";
  title: string;
  detail: string;
  date: string;
}

const SHORTCUTS = [
  { id: "users", gradient: "from-blue-500 to-blue-600", iconBg: "from-blue-500 to-indigo-600" },
  { id: "notifications", gradient: "from-amber-500 to-orange-500", iconBg: "from-amber-500 to-orange-500" },
  { id: "contact", gradient: "from-red-500 to-rose-600", iconBg: "from-red-500 to-rose-600" },
  { id: "issues", gradient: "from-purple-500 to-violet-600", iconBg: "from-purple-500 to-violet-600" },
  { id: "ideas", gradient: "from-emerald-500 to-teal-500", iconBg: "from-emerald-500 to-teal-500" },
  { id: "skills", gradient: "from-cyan-500 to-blue-500", iconBg: "from-cyan-500 to-blue-500" },
  { id: "repositories", gradient: "from-orange-500 to-amber-500", iconBg: "from-orange-500 to-amber-500" },
  { id: "traffic", gradient: "from-violet-500 to-purple-600", iconBg: "from-violet-500 to-purple-600" },
] as const;

const SHORTCUT_LABELS: Record<string, string> = {
  users: "admin.shortcutUsers",
  notifications: "admin.shortcutNotifications",
  contact: "admin.shortcutMessages",
  issues: "admin.shortcutIssues",
  ideas: "admin.shortcutIdeas",
  skills: "admin.shortcutAgents",
  repositories: "admin.shortcutRepos",
  traffic: "admin.shortcutTraffic",
};

export function AdminDashboard({ onNavigate }: { onNavigate: (section: string) => void }) {
  const { t } = useT();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<UserWithProfile[]>([]);
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [healthError, setHealthError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [trafficByDay, setTrafficByDay] = useState<{ date: string; visits: number }[]>([]);
  const [topPages, setTopPages] = useState<{ path: string; visits: number }[]>([]);
  const [issueStats, setIssueStats] = useState<{ totalBoards: number; totalTickets: number; byStatus: Record<string, number>; byPriority: Record<string, number> } | null>(null);
  const [ideaStats, setIdeaStats] = useState<{ total: number; byStatus: Record<string, number> } | null>(null);

  const [recentNotifications, setRecentNotifications] = useState<any[]>([]);
  const [recentContacts, setRecentContacts] = useState<any[]>([]);
  const [recentIssues, setRecentIssues] = useState<any[]>([]);
  const [recentIdeas, setRecentIdeas] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      adminService.getStats().then(setStats).catch(() => {}),
      userService.list().then((u) => setRecentUsers(u.filter((u) => u.profile).slice(0, 6))).catch(() => {}),
      adminService.getHealth().then(setHealth).catch(() => setHealthError(true)),
      analyticsService.getTrafficByDay(30).then(setTrafficByDay).catch(() => {}),
      analyticsService.getTrafficByPage().then((p) => setTopPages(p.slice(0, 5))).catch(() => {}),
      adminService.getIssueStats().then(setIssueStats).catch(() => {}),
      adminService.getIdeaStats().then(setIdeaStats).catch(() => {}),
      adminService.listNotifications().then((n) => setRecentNotifications(n.slice(0, 5))).catch(() => {}),
      adminService.listContact().then((c) => setRecentContacts(c.slice(0, 5))).catch(() => {}),
      adminService.listIssueTickets().then((tk) => setRecentIssues(tk.slice(0, 5))).catch(() => {}),
      adminService.listAllIdeas().then((i) => setRecentIdeas(i.slice(0, 5))).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  const activityFeed = useMemo(() => {
    const items: ActivityItem[] = [];
    for (const u of recentUsers) {
      if (!u.profile) continue;
      items.push({ type: "user", title: t("admin.activityUser"), detail: u.profile?.full_name ?? u.email, date: u.profile?.created_at ?? new Date().toISOString() });
    }
    for (const n of recentNotifications) {
      items.push({ type: "notification", title: t("admin.activityNotification"), detail: n.title, date: n.created_at });
    }
    for (const c of recentContacts) {
      items.push({ type: "message", title: t("admin.activityMessage"), detail: `${c.name}: ${c.message.slice(0, 60)}${c.message.length > 60 ? "…" : ""}`, date: c.created_at });
    }
    for (const tk of recentIssues) {
      items.push({ type: "issue", title: t("admin.activityIssue"), detail: tk.title, date: tk.created_at });
    }
    for (const i of recentIdeas) {
      items.push({ type: "idea", title: t("admin.activityIdea"), detail: i.title, date: i.created_at });
    }
    items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return items.slice(0, 10);
  }, [recentUsers, recentNotifications, recentContacts, recentIssues, recentIdeas, t]);

  const maxDayVisits = useMemo(() => Math.max(...trafficByDay.map((d) => d.visits), 1), [trafficByDay]);
  const maxPageVisits = useMemo(() => Math.max(...topPages.map((p) => p.visits), 1), [topPages]);

  const donutGradient = (data: Record<string, number>, colors: Record<string, string>) => {
    const total = Object.values(data).reduce((a, b) => a + b, 0);
    if (total === 0) return "conic-gradient(#888 0% 100%)";
    const segments: string[] = [];
    let acc = 0;
    for (const [key, count] of Object.entries(data)) {
      const start = (acc / total) * 100;
      acc += count;
      const end = (acc / total) * 100;
      segments.push(`${colors[key] ?? "#888"} ${start}% ${end}%`);
    }
    return `conic-gradient(${segments.join(", ")})`;
  };

  const issueStatusColors: Record<string, string> = { open: "#3b82f6", in_progress: "#f59e0b", resolved: "#10b981", closed: "#9ca3af" };
  const ideaStatusColors: Record<string, string> = { idea: "#3b82f6", planned: "#f59e0b", in_progress: "#a855f7", done: "#10b981", archived: "#9ca3af" };

  const formatUptime = (seconds: number) => {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (d > 0) return `${d}d ${h}h ${m}m`;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  };
  const formatMemory = (bytes: number) => `${Math.round(bytes / 1024 / 1024)} MB`;

  return (
    <div className="relative flex flex-col gap-6">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-violet-500/8 to-pink-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-br from-cyan-500/8 to-blue-500/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6e6e73] dark:text-[#86868b] mb-1">{t("admin.adminBadge")}</p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
          {t("admin.dashboard")}
        </h1>
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">{t("admin.dashboardDesc")}</p>
      </div>

      {loading ? (
        <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 p-10 flex justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-violet-600/30 border-t-violet-600 animate-spin" />
        </div>
      ) : (
        <>
          {/* ── Quick Actions ───────────────────────────────────── */}
          <div className="backdrop-blur-xl rounded-2xl p-2 bg-white/60 dark:bg-[#111116]/60 border border-black/8 dark:border-white/8">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {SHORTCUTS.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => onNavigate(sc.id)}
                  className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shrink-0 min-w-[76px]"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${sc.iconBg} flex items-center justify-center text-white shadow-lg`}>
                    <ShortcutIcon id={sc.id} />
                  </div>
                  <span className="text-xs font-semibold text-[#1d1d1f] dark:text-white truncate max-w-[68px]">{t(SHORTCUT_LABELS[sc.id])}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Stats Row 1: Platform ───────────────────────────── */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: t("admin.users"), value: stats.users, sub: t("admin.subAdmin", { n: stats.admins }), gradient: "from-blue-500 to-indigo-600", iconBg: "from-blue-500 to-indigo-600", icon: "users" },
                { label: t("admin.notifications"), value: stats.notifications, sub: t("admin.subUnread", { n: stats.notificationsUnread }), gradient: "from-amber-500 to-orange-500", iconBg: "from-amber-500 to-orange-500", icon: "bell" },
                { label: t("admin.messages"), value: stats.contactMessages, sub: t("admin.subPending", { n: stats.contactUnread }), gradient: "from-red-500 to-rose-600", iconBg: "from-red-500 to-rose-600", icon: "mail" },
                { label: t("admin.agents"), value: stats.agents, gradient: "from-cyan-500 to-blue-500", iconBg: "from-cyan-500 to-blue-500", icon: "bot" },
                { label: t("admin.apiKeys"), value: stats.apiKeys, gradient: "from-orange-500 to-amber-500", iconBg: "from-orange-500 to-amber-500", icon: "key" },
                { label: t("admin.roles"), value: stats.roles, gradient: "from-purple-500 to-violet-600", iconBg: "from-purple-500 to-violet-600", icon: "shield" },
              ].map((m) => (
                <div key={m.label} className="relative rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/8 dark:hover:shadow-black/30 hover:border-black/15 dark:hover:border-white/15 group">
                  <div className={`h-1 bg-gradient-to-r ${m.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />
                  <div className="p-4 relative">
                    <div className={`absolute -bottom-5 -right-5 w-20 h-20 rounded-full bg-gradient-to-br ${m.gradient} opacity-10 blur-2xl`} />
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${m.iconBg} flex items-center justify-center text-white shadow-lg shrink-0`}>
                        <StatIcon name={m.icon} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-2xl font-black tabular-nums tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>{m.value}</p>
                        <p className="text-[11px] font-semibold text-[#1d1d1f] dark:text-white truncate">{m.label}</p>
                      </div>
                    </div>
                    {m.sub && <p className="text-[10px] text-[#6e6e73] dark:text-[#86868b] mt-1.5">{m.sub}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Stats Row 2: Projects ───────────────────────────── */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: t("admin.issueBoards"), value: issueStats?.totalBoards ?? 0, gradient: "from-indigo-500 to-violet-600", icon: "board" },
              { label: t("admin.issueTickets"), value: issueStats?.totalTickets ?? 0, gradient: "from-purple-500 to-fuchsia-500", icon: "ticket" },
              { label: t("admin.ideas"), value: ideaStats?.total ?? 0, gradient: "from-emerald-500 to-teal-500", icon: "lightbulb" },
            ].map((m) => (
              <div key={m.label} className="relative rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/8 dark:hover:shadow-black/30 hover:border-black/15 dark:hover:border-white/15 group">
                <div className={`h-1 bg-gradient-to-r ${m.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />
                <div className="p-4 relative">
                  <div className={`absolute -bottom-5 -right-5 w-20 h-20 rounded-full bg-gradient-to-br ${m.gradient} opacity-10 blur-2xl`} />
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center text-white shadow-lg shrink-0`}>
                      <ProjectIcon name={m.icon} />
                    </div>
                    <div>
                      <p className="text-2xl font-black tabular-nums tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>{m.value}</p>
                      <p className="text-[11px] font-semibold text-[#1d1d1f] dark:text-white">{m.label}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Charts Row 1: Traffic + Top Pages ────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Visits bar chart */}
            <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
              <div className="h-1 bg-gradient-to-r from-violet-500 to-purple-600" />
              <div className="p-5">
                <h3 className="text-sm font-bold tracking-tight text-[#1d1d1f] dark:text-white mb-4" style={{ letterSpacing: "-0.02em" }}>{t("admin.trafficChart")}</h3>
                {trafficByDay.length === 0 ? (
                  <div className="h-32 flex items-center justify-center text-xs text-[#6e6e73] dark:text-[#86868b]">{t("admin.trafficNoData")}</div>
                ) : (
                  <div className="flex items-end gap-px h-32">
                    {trafficByDay.map((day, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-violet-600 to-violet-400 rounded-md transition-all duration-300 hover:from-violet-700 hover:to-violet-500 hover:shadow-lg"
                        style={{ height: `${(day.visits / maxDayVisits) * 100}%`, minHeight: day.visits > 0 ? "4px" : "0" }}
                        title={`${day.date}: ${day.visits}`}
                      />
                    ))}
                  </div>
                )}
                {trafficByDay.length > 0 && (
                  <div className="flex justify-between mt-2 text-[10px] text-[#aeaeb2] dark:text-[#636366] font-medium">
                    <span>{trafficByDay[0]?.date}</span>
                    <span>{trafficByDay[trafficByDay.length - 1]?.date}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Top pages horizontal bars */}
            <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
              <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
              <div className="p-5">
                <h3 className="text-sm font-bold tracking-tight text-[#1d1d1f] dark:text-white mb-4" style={{ letterSpacing: "-0.02em" }}>{t("admin.topPages")}</h3>
                {topPages.length === 0 ? (
                  <div className="h-32 flex items-center justify-center text-xs text-[#6e6e73] dark:text-[#86868b]">{t("admin.trafficNoData")}</div>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    {topPages.map((p, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xs text-[#6e6e73] dark:text-[#86868b] w-28 truncate shrink-0 font-medium" title={p.path}>{p.path}</span>
                        <div className="flex-1 h-5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${(p.visits / maxPageVisits) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-[#1d1d1f] dark:text-white tabular-nums w-8 text-right">{p.visits}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Charts Row 2: Donuts ─────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Issues by status donut */}
            <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
              <div className="h-1 bg-gradient-to-r from-purple-500 to-violet-600" />
              <div className="p-5">
                <h3 className="text-sm font-bold tracking-tight text-[#1d1d1f] dark:text-white mb-4" style={{ letterSpacing: "-0.02em" }}>{t("admin.issuesByStatus")}</h3>
                {issueStats && Object.keys(issueStats.byStatus).length > 0 ? (
                  <div className="flex items-center gap-5">
                    <div
                      className="w-28 h-28 rounded-full shrink-0 shadow-lg"
                      style={{
                        background: donutGradient(issueStats.byStatus, issueStatusColors),
                        boxShadow: "inset 0 0 0 10px var(--heroui-background, #fff), 0 4px 20px rgba(0,0,0,0.1)",
                      }}
                    />
                    <div className="flex flex-col gap-1.5">
                      {Object.entries(issueStats.byStatus).map(([status, count]) => (
                        <div key={status} className="flex items-center gap-2.5 text-xs">
                          <span className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ background: issueStatusColors[status] ?? "#888" }} />
                          <span className="text-[#6e6e73] dark:text-[#86868b] font-medium">{status}</span>
                          <span className="font-bold text-[#1d1d1f] dark:text-white ml-auto tabular-nums">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-28 flex items-center justify-center text-xs text-[#6e6e73] dark:text-[#86868b]">{t("admin.noTickets")}</div>
                )}
              </div>
            </div>

            {/* Ideas by status donut */}
            <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
              <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
              <div className="p-5">
                <h3 className="text-sm font-bold tracking-tight text-[#1d1d1f] dark:text-white mb-4" style={{ letterSpacing: "-0.02em" }}>{t("admin.ideasByStatus")}</h3>
                {ideaStats && Object.keys(ideaStats.byStatus).length > 0 ? (
                  <div className="flex items-center gap-5">
                    <div
                      className="w-28 h-28 rounded-full shrink-0 shadow-lg"
                      style={{
                        background: donutGradient(ideaStats.byStatus, ideaStatusColors),
                        boxShadow: "inset 0 0 0 10px var(--heroui-background, #fff), 0 4px 20px rgba(0,0,0,0.1)",
                      }}
                    />
                    <div className="flex flex-col gap-1.5">
                      {Object.entries(ideaStats.byStatus).map(([status, count]) => (
                        <div key={status} className="flex items-center gap-2.5 text-xs">
                          <span className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ background: ideaStatusColors[status] ?? "#888" }} />
                          <span className="text-[#6e6e73] dark:text-[#86868b] font-medium">{status.replace("_", " ")}</span>
                          <span className="font-bold text-[#1d1d1f] dark:text-white ml-auto tabular-nums">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-28 flex items-center justify-center text-xs text-[#6e6e73] dark:text-[#86868b]">{t("admin.noIdeas")}</div>
                )}
              </div>
            </div>
          </div>

          {/* ── Bottom row: Activity + Health ────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Activity Feed */}
            <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
              <div className="h-1 bg-gradient-to-r from-indigo-500 to-cyan-500" />
              <div className="px-5 py-4 border-b border-black/6 dark:border-white/6">
                <h3 className="text-sm font-bold tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>{t("admin.recentActivity")}</h3>
              </div>
              {activityFeed.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-[#6e6e73] dark:text-[#86868b]">{t("admin.noActivity")}</div>
              ) : (
                <div className="divide-y divide-black/5 dark:divide-white/5 max-h-96 overflow-y-auto">
                  {activityFeed.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 px-5 py-3 hover:bg-black/2 dark:hover:bg-white/2 transition-colors">
                      <ActivityIcon type={item.type} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#1d1d1f] dark:text-white">{item.title}</p>
                        <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">{item.detail}</p>
                      </div>
                      <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366] shrink-0 font-medium">{relativeTime(item.date)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* System Health */}
            <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
              <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
              <div className="px-5 py-4 border-b border-black/6 dark:border-white/6 flex items-center justify-between">
                <h3 className="text-sm font-bold tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>{t("admin.systemHealth")}</h3>
                {health && (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${health.status === "ok" && health.db?.ok !== false ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-gradient-to-r from-red-500 to-rose-500"}`}>
                    {health.status === "ok" && health.db?.ok !== false ? t("admin.healthOk") : t("admin.healthDegraded")}
                  </span>
                )}
              </div>
              <div className="px-5 py-5">
                {healthError ? (
                  <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">{t("admin.healthUnavailable")}</p>
                ) : health ? (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: t("admin.healthEnv"), value: health.env },
                        { label: t("admin.healthDbChecked"), value: health.db ? relativeTime(health.db.checkedAt) : "—" },
                        { label: t("admin.serverUptime"), value: formatUptime(health.uptime ?? 0) },
                        { label: t("admin.serverMemory"), value: health.memory ? formatMemory(health.memory.rss ?? 0) : "—" },
                      ].map((item) => (
                        <div key={item.label}>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">{item.label}</p>
                          <p className="text-sm font-bold text-[#1d1d1f] dark:text-white mt-0.5">{item.value}</p>
                        </div>
                      ))}
                    </div>
                    {health.db?.tables && (
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-2">DB Tables</p>
                        <div className="flex flex-wrap gap-1.5">
                          {Object.entries(health.db.tables).map(([table, ok]) => (
                            <span
                              key={table}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-sm ${ok ? "bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/40 dark:to-teal-950/30 text-emerald-700 dark:text-emerald-400" : "bg-gradient-to-br from-red-100 to-rose-100 dark:from-red-950/40 dark:to-rose-950/30 text-red-700 dark:text-red-400"}`}
                              title={table}
                            >
                              {table}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-center py-6">
                    <div className="w-5 h-5 rounded-full border-2 border-violet-600/30 border-t-violet-600 animate-spin" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Recent Users ─────────────────────────────────────── */}
          <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
            <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
            <div className="px-5 py-4 border-b border-black/6 dark:border-white/6 flex items-center justify-between">
              <h3 className="text-sm font-bold tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>{t("admin.recentUsers")}</h3>
              <span className="text-xs text-[#aeaeb2] dark:text-[#636366] font-medium bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-full">{t("admin.usersShown", { n: recentUsers.length })}</span>
            </div>
            <div className="divide-y divide-black/5 dark:divide-white/5">
              {recentUsers.length === 0 ? (
                <div className="px-5 py-8 text-center text-sm text-[#6e6e73] dark:text-[#86868b]">{t("admin.noUsers")}</div>
              ) : (
                recentUsers.map((u) => (
                  <div key={u.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-black/2 dark:hover:bg-white/2 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md">
                      {(u.profile?.full_name ?? u.email).split(" ").map((w) => w[0] ?? "").join("").slice(0, 2).toUpperCase() || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#1d1d1f] dark:text-white truncate">{u.profile?.full_name ?? "—"}</p>
                      <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">{u.email}</p>
                    </div>
                    <div className="flex gap-1 flex-wrap justify-end">
                      {u.roles.map((r) => (
                        <span key={r.id} className="px-2.5 py-0.5 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-950/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold">
                          {r.name}
                        </span>
                      ))}
                    </div>
                    {u.profile?.created_at && (
                      <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366] shrink-0 font-medium">{relativeTime(u.profile.created_at)}</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── SVG Icons ─────────────────────────────────────────────────────────────────

function ShortcutIcon({ id }: { id: string }) {
  const s = "w-5 h-5";
  switch (id) {
    case "users": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><circle cx="17" cy="7" r="4"/><path d="M21 21v-2a4 4 0 00-3-3.87"/></svg>;
    case "notifications": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>;
    case "contact": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>;
    case "issues": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12l2 2 4-4"/></svg>;
    case "ideas": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2a7 7 0 00-2 13.7V18h4v-2.3A7 7 0 0012 2z"/><path d="M9 21h6"/></svg>;
    case "skills": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M8 11V7a4 4 0 118 0v4"/><circle cx="12" cy="16" r="1"/></svg>;
    case "repositories": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>;
    case "traffic": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
    default: return null;
  }
}

function StatIcon({ name }: { name: string }) {
  const s = "w-4 h-4";
  switch (name) {
    case "users": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><circle cx="17" cy="7" r="4"/><path d="M21 21v-2a4 4 0 00-3-3.87"/></svg>;
    case "bell": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>;
    case "mail": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>;
    case "bot": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M8 11V7a4 4 0 118 0v4"/><circle cx="12" cy="16" r="1"/></svg>;
    case "key": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>;
    case "shield": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
    default: return null;
  }
}

function ProjectIcon({ name }: { name: string }) {
  const s = "w-4 h-4";
  switch (name) {
    case "board": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18"/></svg>;
    case "ticket": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 5v2m0 4v2m0 4v2M5 5h14a2 2 0 012 2v3a2 2 0 000 4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 000-4V7a2 2 0 012-2z"/></svg>;
    case "lightbulb": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a7 7 0 00-2 13.7V18h4v-2.3A7 7 0 0012 2z"/><path d="M9 21h6"/></svg>;
    default: return null;
  }
}

function ActivityIcon({ type }: { type: string }) {
  const gradients: Record<string, string> = {
    user: "from-blue-500 to-indigo-600",
    notification: "from-amber-500 to-orange-500",
    message: "from-red-500 to-rose-600",
    issue: "from-purple-500 to-violet-600",
    idea: "from-emerald-500 to-teal-500",
  };
  const icons: Record<string, React.ReactNode> = {
    user: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg>,
    notification: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    message: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>,
    issue: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12l2 2 4-4"/></svg>,
    idea: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a7 7 0 00-2 13.7V18h4v-2.3A7 7 0 0012 2z"/><path d="M9 21h6"/></svg>,
  };
  return (
    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradients[type] ?? gradients.user} flex items-center justify-center text-white shadow-md shrink-0`}>
      {icons[type] ?? icons.user}
    </div>
  );
}

export function Avatar({ name, size = 8 }: { name: string; size?: number }) {
  const initials = name.split(" ").map((w) => w[0] ?? "").join("").slice(0, 2).toUpperCase() || "?";
  return (
    <div className={`w-${size} h-${size} rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs font-semibold shrink-0`}>
      {initials}
    </div>
  );
}
