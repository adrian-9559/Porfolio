"use client";
import type { AppNotification } from "@/services/notificationService";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

import { useNotifications } from "@/hooks/useNotifications";

const TYPE_ICON: Record<AppNotification["type"], string> = {
  info: "💬",
  admin: "🛡️",
  system: "⚙️",
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);

  if (mins < 1) return "ahora";
  if (mins < 60) return `hace ${mins}m`;
  const hrs = Math.floor(mins / 60);

  if (hrs < 24) return `hace ${hrs}h`;

  return `hace ${Math.floor(hrs / 24)}d`;
}

export function NotificationBell() {
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
        aria-label="Notificaciones"
        className="relative w-8 h-8 flex items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/8 transition-colors"
        onClick={() => setOpen((o) => !o)}
      >
        <svg
          className="w-4.5 h-4.5 text-[#6e6e73] dark:text-[#86868b]"
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
        <div className="absolute right-0 top-10 w-80 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-black/8 dark:border-white/8">
            <span className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
              Notificaciones{" "}
              {unread > 0 && <span className="text-red-500">({unread})</span>}
            </span>
            {unread > 0 && (
              <button
                className="text-xs text-blue-500 hover:text-blue-600 font-medium"
                onClick={markAllRead}
              >
                Marcar todo leído
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {!loading && recent.length === 0 && (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="text-2xl mb-2">🔔</span>
                <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">
                  Sin notificaciones
                </p>
              </div>
            )}
            {!loading &&
              recent.map((n) => (
                <button
                  key={n.id}
                  className={`w-full flex gap-3 px-4 py-3 text-left border-b border-black/4 dark:border-white/4 last:border-0 hover:bg-black/3 dark:hover:bg-white/3 transition-colors ${!n.read ? "bg-blue-50/50 dark:bg-blue-950/10" : ""}`}
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
                        className={`text-xs font-medium truncate ${!n.read ? "text-[#1d1d1f] dark:text-white" : "text-[#6e6e73] dark:text-[#86868b]"}`}
                      >
                        {n.title}
                      </p>
                      <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366] shrink-0">
                        {timeAgo(n.created_at)}
                      </span>
                    </div>
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5 line-clamp-2">
                      {n.message}
                    </p>
                  </div>
                  {!n.read && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                  )}
                </button>
              ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-black/8 dark:border-white/8">
            <button
              className="w-full text-center text-xs text-blue-500 hover:text-blue-600 font-medium py-1"
              onClick={() => {
                router.push("/notifications");
                setOpen(false);
              }}
            >
              Ver todas las notificaciones →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
