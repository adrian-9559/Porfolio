"use client";
import type { AppNotification } from "@/services/notificationService";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { useRouter } from "next/router";

import { useNotifications } from "@/hooks/useNotifications";
import { useT } from "@/hooks/useT";

const TYPE_ICON: Record<AppNotification["type"], ReactNode> = {
  info: (
    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  admin: (
    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  system: (
    <svg className="w-4 h-4 text-[#6e6e73] dark:text-[#86868b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

function timeAgo(iso: string, t: (k: string, params?: Record<string, string | number>) => string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);

  if (mins < 1) return t("notifications.time.now");
  if (mins < 60) return t("notifications.time.minutesAgo", { count: mins });
  const hrs = Math.floor(mins / 60);

  if (hrs < 24) return t("notifications.time.hoursAgo", { count: hrs });

  return t("notifications.time.daysAgo", { count: Math.floor(hrs / 24) });
}

export function NotificationBell() {
  const { t } = useT();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { notifications, unread, loading, markRead, markAllRead } =
    useNotifications();

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handle);

    return () => document.removeEventListener("mousedown", handle);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [router.pathname]);

  const recent = notifications.slice(0, 8);

  return (
    <div ref={ref} className="relative">
      <button
        aria-label={t("notifications.title")}
        className="relative w-8 h-8 flex items-center justify-center rounded-xl hover:bg-default transition-colors"
        onClick={() => setOpen((o) => !o)}
      >
        <svg
          className="w-4.5 h-4.5 text-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          viewBox="0 0 24 24"
        >
          <path
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center leading-none">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-80 rounded-2xl bg-surface border border-border shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="text-sm font-semibold text-foreground">
              {t("notifications.title")}{" "}
              {unread > 0 && <span className="text-red-500">({unread})</span>}
            </span>
            {unread > 0 && (
              <button
                className="text-xs text-accent hover:text-accent-hover font-medium"
                onClick={markAllRead}
              >
                {t("notifications.markAllRead")}
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {!loading && recent.length === 0 && (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="mb-2">
                  <svg className="w-8 h-8 text-muted/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </span>
                <p className="text-sm text-muted">{t("notifications.empty")}</p>
              </div>
            )}
            {!loading &&
              recent.map((n) => (
                <button
                  key={n.id}
                  className={`w-full flex gap-3 px-4 py-3 text-left border-b border-border/20 last:border-0 hover:bg-default transition-colors ${!n.read ? "bg-accent/5" : ""}`}
                  onClick={() => {
                    if (!n.read) markRead(n.id);
                  }}
                >
                  <span className="text-base shrink-0 mt-0.5">
                    {TYPE_ICON[n.type]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-xs font-medium truncate ${!n.read ? "text-foreground" : "text-muted"}`}
                      >
                        {n.title}
                      </p>
                      <span className="text-[10px] text-muted/60 shrink-0">
                        {timeAgo(n.created_at, t)}
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-0.5 line-clamp-2">
                      {n.message}
                    </p>
                  </div>
                  {!n.read && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                  )}
                </button>
              ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-border">
            <button
              className="w-full text-center text-xs text-accent hover:text-accent-hover font-medium py-1"
              onClick={() => {
                router.push("/dashboard?section=notifications");
                setOpen(false);
              }}
            >
              {t("notifications.title")} →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
