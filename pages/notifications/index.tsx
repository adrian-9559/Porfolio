"use client";
import type { AppNotification } from "@/services/notificationService";

import { useState } from "react";
import Head from "next/head";

import { useT } from "@/hooks/useT";
import { useNotifications } from "@/hooks/useNotifications";
import { useRequireAuth } from "@/hooks/useRequireAuth";

type Filter = "all" | "unread" | "read";

const TYPE_ICON: Record<AppNotification["type"], string> = {
  info: "💬",
  admin: "🛡️",
  system: "⚙️",
};

const FILTER_KEYS: Record<Filter, string> = {
  all: "notifications.filterAll",
  unread: "notifications.filterUnread",
  read: "notifications.filterRead",
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);

  if (mins < 1) return "Ahora mismo";
  if (mins < 60) return `Hace ${mins} minuto${mins !== 1 ? "s" : ""}`;
  const hrs = Math.floor(mins / 60);

  if (hrs < 24) return `Hace ${hrs} hora${hrs !== 1 ? "s" : ""}`;
  const days = Math.floor(hrs / 24);

  return `Hace ${days} día${days !== 1 ? "s" : ""}`;
}

export default function NotificationsPage() {
  const { t } = useT();
  useRequireAuth();
  const [filter, setFilter] = useState<Filter>("all");
  const {
    notifications,
    unread,
    loading,
    markRead,
    markAllRead,
    deleteOne,
    deleteAll,
  } = useNotifications();

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;

    return true;
  });

  return (
    <>
      <Head>
        <title>{t("meta.notifications.title")}</title>
        <meta
          content={t("meta.notifications.desc")}
          name="description"
        />
        <meta content={t("meta.notifications.title")} property="og:title" />
        <meta
          content={t("meta.notifications.desc")}
          property="og:description"
        />
      </Head>

      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {t("notifications.title")}
              </h1>
              {unread > 0 && (
                <p className="text-sm text-muted mt-1">
                  {t("notifications.filterUnread", { n: unread })}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              {unread > 0 && (
                <button
                  className="px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 text-sm text-foreground hover:bg-default transition-colors"
                  onClick={markAllRead}
                >
                  {t("notifications.markAllRead")}
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  className="px-3 py-2 rounded-xl border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                  onClick={deleteAll}
                >
                  {t("notifications.clearAll")}
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-1 p-1 rounded-2xl bg-default mb-6 w-fit">
            {(["all", "unread", "read"] as Filter[]).map((f) => (
              <button
                key={f}
                className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-white dark:bg-[#1c1c1e] text-foreground shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
                onClick={() => setFilter(f)}
              >
                {t(FILTER_KEYS[f])}
              </button>
            ))}
          </div>

          {/* List */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center py-20 text-center">
              <span className="text-5xl mb-4">🔔</span>
              <p className="text-lg font-medium text-foreground mb-1">
                {filter === "all"
                  ? t("notifications.empty")
                  : filter === "unread"
                    ? t("notifications.allRead")
                    : t("notifications.noReadNotifications")}
              </p>
              <p className="text-sm text-muted">
                {t("notifications.noNotificationsHint")}
              </p>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="space-y-2">
              {filtered.map((n) => (
                <div
                  key={n.id}
                  className={`relative flex gap-4 px-5 py-4 rounded-2xl border transition-colors ${
                    !n.read
                      ? "bg-blue-50/60 dark:bg-blue-950/10 border-blue-200 dark:border-blue-900/30"
                      : "bg-surface border-border"
                  }`}
                >
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-xl bg-default flex items-center justify-center text-lg shrink-0">
                    {TYPE_ICON[n.type]}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <p
                        className={`text-sm font-medium ${!n.read ? "text-foreground" : "text-[#3a3a3c] dark:text-[#aeaeb2]"}`}
                      >
                        {n.title}
                      </p>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-muted/60">
                          {timeAgo(n.created_at)}
                        </span>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted mt-0.5">
                      {n.message}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-muted/60 bg-default px-2 py-0.5 rounded-full">
                        {t(`notifications.type${n.type.charAt(0).toUpperCase() + n.type.slice(1)}`)}
                      </span>
                      {!n.read && (
                        <button
                          className="text-xs text-accent hover:text-accent-hover font-medium"
                          onClick={() => markRead(n.id)}
                        >
                          {t("notifications.markRead")}
                        </button>
                      )}
                      <button
                        className="text-xs text-red-500 hover:text-red-600 font-medium"
                        onClick={() => deleteOne(n.id)}
                      >
                        {t("common.delete")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
