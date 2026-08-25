"use client";

import { useState, useMemo } from "react";

import { useNotifications } from "@/hooks/useNotifications";
import { useT } from "@/hooks/useT";
import type { AppNotification } from "@/services/notificationService";

type FilterType = "all" | "unread" | "sistema" | "agente" | "repositorio" | "admin" | "tricount";

const TYPE_META: Record<
  string,
  { color: string; dot: string; icon: (props: { className?: string }) => React.ReactNode }
> = {
  sistema: {
    color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
    icon: ({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  agente: {
    color: "bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400",
    dot: "bg-violet-500",
    icon: ({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-1.341 4.023a2.25 2.25 0 01-2.134 1.477H8.475a2.25 2.25 0 01-2.134-1.477L5 14.5m14 0H5" />
      </svg>
    ),
  },
  repositorio: {
    color: "bg-slate-50 dark:bg-slate-950/30 text-slate-600 dark:text-slate-400",
    dot: "bg-slate-500",
    icon: ({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v12M18 9a3 3 0 01-3 3m3-3a3 3 0 00-3 3M3 9a3 3 0 003 3m3-3a3 3 0 01-3 3m3 3c0 3 3 6 3 6s3-3 3-6M3 15s3-3 3-6" />
      </svg>
    ),
  },
  admin: {
    color: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
    icon: ({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  tricount: {
    color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    icon: ({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
};

function mapApiType(apiType: string): string {
  if (apiType === "admin") return "admin";
  if (apiType === "system") return "sistema";
  return "sistema";
}

const GROUP_LABELS: Record<string, string> = {
  today: "notifications.group.today",
  yesterday: "notifications.group.yesterday",
  thisWeek: "notifications.group.thisWeek",
  thisMonth: "notifications.group.thisMonth",
  older: "notifications.group.older",
};

function NotifSkeleton() {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl animate-pulse">
      <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 mt-0.5" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-16 rounded-full bg-black/5 dark:bg-white/5" />
        <div className="h-3.5 w-3/4 rounded bg-black/5 dark:bg-white/5" />
        <div className="h-3 w-1/2 rounded bg-black/5 dark:bg-white/5" />
      </div>
    </div>
  );
}

export function UserNotificationsSection() {
  const { t } = useT();
  const {
    notifications,
    unread,
    loading,
    markRead,
    markAllRead,
    deleteOne,
    preferences,
    updatePreferences,
    groups,
  } = useNotifications();

  const [filter, setFilter] = useState<FilterType>("all");
  const [prefsOpen, setPrefsOpen] = useState(false);

  const filteredGroups = useMemo(() => {
    return groups
      .map((g) => ({
        ...g,
        notifications: g.notifications.filter((n) => {
          if (filter === "unread") return !n.read;
          if (filter === "all") return true;
          return mapApiType(n.type) === filter;
        }),
      }))
      .filter((g) => g.notifications.length > 0);
  }, [groups, filter]);

  const filteredCount = filteredGroups.reduce(
    (acc, g) => acc + g.notifications.length,
    0,
  );

  const FILTERS: { id: FilterType; label: string; count?: number }[] = [
    { id: "all", label: t("notifications.filter.all") },
    { id: "unread", label: t("notifications.filter.unread", { count: unread }), count: unread },
    { id: "sistema", label: t("notifications.type.sistema") },
    { id: "agente", label: t("notifications.type.agente") },
    { id: "repositorio", label: t("notifications.type.repositorio") },
    { id: "admin", label: t("notifications.type.admin") },
    { id: "tricount", label: t("notifications.type.tricount") },
  ];

  const TYPE_KEYS: Record<string, string> = {
    sistema: "notifications.type.sistema",
    agente: "notifications.type.agente",
    repositorio: "notifications.type.repositorio",
    admin: "notifications.type.admin",
    tricount: "notifications.type.tricount",
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            {t("notifications.title")}
          </h2>
          <p className="text-sm text-muted mt-0.5">
            {unread > 0
              ? t("notifications.subtitle", { count: unread })
              : t("notifications.allRead")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-xl border border-border/30 hover:bg-default text-muted hover:text-foreground transition-colors"
            onClick={() => setPrefsOpen(!prefsOpen)}
            title={t("notifications.preferences")}
            type="button"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          {unread > 0 && (
            <button
              className="px-4 py-2 rounded-xl border border-border/30 hover:bg-default text-foreground text-sm font-medium transition-colors"
              onClick={markAllRead}
              type="button"
            >
              {t("notifications.markAllRead")}
            </button>
          )}
        </div>
      </div>

      {/* Preferences panel */}
      {prefsOpen && preferences && (
        <div className="rounded-2xl border border-border bg-surface p-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">
            {t("notifications.preferences")}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(["sistema", "agente", "repositorio", "admin", "tricount"] as const).map((key) => (
              <label
                key={key}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-border/30 hover:bg-default cursor-pointer transition-colors"
              >
                <input
                  checked={preferences[key]}
                  className="w-4 h-4 rounded border-border/40 text-accent focus:ring-accent"
                  onChange={(e) => updatePreferences({ [key]: e.target.checked })}
                  type="checkbox"
                />
                <span className="text-sm text-foreground">{t(`notifications.type.${key}`)}</span>
              </label>
            ))}
            <label className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-border/30 hover:bg-default cursor-pointer transition-colors">
              <input
                checked={preferences.email_digest}
                className="w-4 h-4 rounded border-border/40 text-accent focus:ring-accent"
                onChange={(e) => updatePreferences({ email_digest: e.target.checked })}
                type="checkbox"
              />
              <span className="text-sm text-foreground">{t("notifications.preferencesSection.emailDigest")}</span>
            </label>
          </div>
        </div>
      )}

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === f.id
                ? "bg-accent text-accent-foreground"
                : "border border-border/30 text-muted hover:bg-default"
            }`}
            onClick={() => setFilter(f.id)}
            type="button"
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="space-y-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <NotifSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredCount === 0 && (
        <div className="rounded-2xl border border-border bg-surface py-16 text-center">
          <svg className="w-10 h-10 mx-auto mb-3 text-muted/40" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <p className="text-sm text-muted">{t("notifications.empty")}</p>
        </div>
      )}

      {/* Timeline */}
      {!loading && filteredGroups.length > 0 && (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

          {filteredGroups.map((group) => (
            <div key={group.label} className="mb-6 last:mb-0">
              {/* Group header */}
              <div className="flex items-center gap-3 mb-3 relative">
                <span className="w-2.5 h-2.5 rounded-full bg-border border-2 border-surface shrink-0 z-10" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {t(GROUP_LABELS[group.label] ?? group.label)}
                </h4>
                <span className="text-[10px] text-muted/50 font-medium">
                  {group.notifications.length}
                </span>
              </div>

              {/* Notifications in group */}
              <div className="space-y-1 ml-[9px]">
                {group.notifications.map((n) => (
                  <NotificationRow
                    key={n.id}
                    notification={n}
                    typeKeys={TYPE_KEYS}
                    onMarkRead={markRead}
                    onDelete={deleteOne}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NotificationRow({
  notification: n,
  typeKeys,
  onMarkRead,
  onDelete,
}: {
  notification: AppNotification;
  typeKeys: Record<string, string>;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const { t } = useT();
  const notifType = mapApiType(n.type);
  const meta = TYPE_META[notifType] ?? TYPE_META.sistema;
  const Icon = meta.icon;

  function relTime(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);

    if (m < 1) return t("notifications.time.now");
    if (m < 60) return t("notifications.time.minutesAgo", { count: m });
    const h = Math.floor(m / 60);

    if (h < 24) return t("notifications.time.hoursAgo", { count: h });

    return t("notifications.time.daysAgo", { count: Math.floor(h / 24) });
  }

  return (
    <div
      className={`group flex items-start gap-3 p-3 rounded-xl transition-colors ${
        n.read
          ? "hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
          : "bg-accent/[0.03] dark:bg-accent/[0.05] hover:bg-accent/[0.06]"
      }`}
    >
      {/* Type icon */}
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${meta.color}`}
      >
        <Icon className="w-4 h-4" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`text-[10px] font-semibold ${meta.color}`}>
            {t(typeKeys[notifType] ?? typeKeys.sistema)}
          </span>
          <span className="text-[10px] text-muted/50">{relTime(n.created_at)}</span>
          {!n.read && (
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
          )}
        </div>
        <p className="text-sm font-medium text-foreground leading-snug">
          {n.title}
        </p>
        <p className="text-xs text-muted mt-0.5 line-clamp-2">{n.message}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {!n.read && (
          <button
            className="p-1.5 rounded-lg text-muted/50 hover:text-accent hover:bg-accent/10 transition-colors"
            onClick={() => onMarkRead(n.id)}
            title={t("notifications.action.markRead")}
            type="button"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </button>
        )}
        <button
          className="p-1.5 rounded-lg text-muted/50 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
          onClick={() => onDelete(n.id)}
          title={t("notifications.action.delete")}
          type="button"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
