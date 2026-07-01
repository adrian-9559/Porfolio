import { useEffect, useState } from "react";

import { useT } from "@/hooks/useT";
import { useAuth } from "@/hooks/useAuth";
import { repositoryService } from "@/services/repositoryService";
import { agentService } from "@/services/agentService";
import {
  notificationService,
  AppNotification,
} from "@/services/notificationService";
import { tricountService } from "@/services/tricountService";

type Section =
  | "home"
  | "repositories"
  | "agents"
  | "notifications"
  | "tricount"
  | "settings-profile"
  | "settings-security"
  | "settings-session";

interface Props {
  onNavigate: (s: Section) => void;
}

interface Stats {
  repos: number;
  agents: number;
  groups: number;
  unread: number;
}

function relTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);

  if (m < 1) return "ahora";
  if (m < 60) return `hace ${m}m`;
  const h = Math.floor(m / 60);

  if (h < 24) return `hace ${h}h`;
  const d = Math.floor(h / 24);

  if (d < 30) return `hace ${d}d`;

  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });
}

function quickAccessItems(t: (k: string) => string): {
  id: Section;
  label: string;
  desc: string;
  color: string;
  icon: React.ReactNode;
}[] {
  return [
    {
      id: "repositories",
      label: t("dashboard.quickRepos"),
      desc: t("dashboard.quickReposDesc"),
      color: "from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800/40",
      icon: (
        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
        </svg>
      ),
    },
    {
      id: "agents",
      label: t("dashboard.quickAgents"),
      desc: t("dashboard.quickAgentsDesc"),
      color: "from-violet-50 to-violet-100 dark:from-violet-950/20 dark:to-violet-900/20 border-violet-200 dark:border-violet-800/40",
      icon: (
        <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect height="13" rx="2" strokeWidth={1.5} width="20" x="2" y="6" />
          <path d="M8 14h.01M16 14h.01M12 3v3M9 11h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
        </svg>
      ),
    },
    {
      id: "tricount",
      label: t("dashboard.quickTricount"),
      desc: t("dashboard.quickTricountDesc"),
      color: "from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20 border-emerald-200 dark:border-emerald-800/40",
      icon: (
        <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect height="14" rx="2" strokeWidth={1.5} width="22" x="1" y="6" />
          <path d="M1 10h22M7 15h.01M12 15h3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
        </svg>
      ),
    },
    {
      id: "notifications",
      label: t("dashboard.quickNotifications"),
      desc: t("dashboard.quickNotificationsDesc"),
      color: "from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 border-amber-200 dark:border-amber-800/40",
      icon: (
        <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M15 17H20L18 9.42A6 6 0 006 9.42L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
        </svg>
      ),
    },
  ];
}

const TYPE_COLOR: Record<string, string> = {
  admin: "bg-blue-500",
  sistema: "bg-violet-500",
  system: "bg-violet-500",
  info: "bg-amber-500",
  agente: "bg-violet-500",
  repositorio: "bg-blue-500",
  tricount: "bg-emerald-500",
};

export function UserDashboardHome({ onNavigate }: Props) {
  const { t } = useT();
  const { user } = useAuth();
  const name =
    (user as any)?.profile?.full_name ||
    (user as any)?.email?.split("@")[0] ||
    "Usuario";

  const hour = new Date().getHours();
  const greetingKey =
    hour < 13 ? "dashboard.greetingMorning" : hour < 20 ? "dashboard.greetingAfternoon" : "dashboard.greetingEvening";
  const greeting = t(greetingKey);
  const QUICK_ACCESS = quickAccessItems(t);

  const [stats, setStats] = useState<Stats>({
    repos: 0,
    agents: 0,
    groups: 0,
    unread: 0,
  });
  const [activity, setActivity] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.allSettled([
      repositoryService.list(),
      agentService.list(),
      tricountService.listGroups(),
      notificationService.getAll(),
    ]).then(([repos, agents, groups, notifs]) => {
      if (cancelled) return;

      setStats({
        repos: repos.status === "fulfilled" ? repos.value.length : 0,
        agents: agents.status === "fulfilled" ? agents.value.length : 0,
        groups: groups.status === "fulfilled" ? groups.value.length : 0,
        unread: notifs.status === "fulfilled" ? notifs.value.unread : 0,
      });

      if (notifs.status === "fulfilled") {
        setActivity(notifs.value.notifications.slice(0, 5));
      }

      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const statCards = [
    {
      label: t("dashboard.sidebarRepos"),
      value: stats.repos,
      sub: t("dashboard.reposConnected"),
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      label: t("dashboard.sidebarAgents"),
      value: stats.agents,
      sub: t("dashboard.agentsConfigured"),
      color: "text-violet-600 dark:text-violet-400",
    },
    {
      label: t("dashboard.sidebarTricount"),
      value: stats.groups,
      sub: t("dashboard.tricountActive"),
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: t("dashboard.sidebarNotifications"),
      value: stats.unread,
      sub: t("dashboard.notificationsUnread"),
      color: "text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 dark:from-blue-950/15 dark:via-indigo-950/10 dark:to-violet-950/15 p-6">
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mb-1">
          {t("dashboard.greeting", { greeting })}
        </p>
        <h2 className="text-2xl font-bold text-[#1d1d1f] dark:text-white capitalize">
          {name} 👋
        </h2>
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-2">
          {t("dashboard.activitySummary")}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-2">
              {stat.label}
            </p>
            {loading ? (
              <div className="w-8 h-7 rounded bg-black/5 dark:bg-white/5 animate-pulse" />
            ) : (
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            )}
            <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-0.5">
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Quick access */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-3">
          {t("dashboard.quickAccess")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {QUICK_ACCESS.map((item) => (
            <button
              key={item.id}
              className={`flex items-center gap-4 p-4 rounded-2xl border bg-gradient-to-br ${item.color} text-left hover:shadow-md transition-all duration-200 group`}
              onClick={() => onNavigate(item.id)}
            >
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#111116] flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                  {item.label}
                </p>
                <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                  {item.desc}
                </p>
              </div>
              <svg
                className="w-4 h-4 text-[#aeaeb2] ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Activity */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-3">
          {t("dashboard.recentActivity")}
        </p>
        <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] divide-y divide-black/5 dark:divide-white/5">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="w-5 h-5 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin" />
            </div>
          )}
          {!loading && activity.length === 0 && (
            <div className="py-10 text-center text-sm text-[#aeaeb2] dark:text-[#636366]">
              {t("dashboard.noRecentActivity")}
            </div>
          )}
          {!loading &&
            activity.map((n) => (
              <div key={n.id} className="flex items-center gap-3 px-4 py-3">
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${TYPE_COLOR[n.type] ?? "bg-gray-400"}`}
                />
                <span className="text-sm text-[#1d1d1f] dark:text-white flex-1 truncate">
                  {n.title}
                </span>
                <span className="text-xs text-[#aeaeb2] dark:text-[#636366] whitespace-nowrap">
                  {relTime(n.created_at)}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
