"use client";

import { useT } from "@/hooks/useT";

const SESSIONS = [
  { device: "Chrome en macOS", location: "Madrid, España", current: true, date: "Ahora" },
  { device: "Safari en iPhone", location: "Madrid, España", current: false, date: "hace 2h" },
  { device: "Firefox en Windows", location: "Barcelona, España", current: false, date: "hace 3d" },
];

export function SessionList() {
  const { t } = useT();

  return (
    <div>
      <h2 className="text-base font-bold text-foreground mb-1">
        {t("settings.activeSessions")}
      </h2>
      <p className="text-xs text-muted mb-4">{t("settings.sessionsDesc")}</p>
      <div className="rounded-xl border border-border divide-y divide-black/5 dark:divide-white/5">
        {SESSIONS.map((s, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-default flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect height="14" rx="2" strokeWidth="1.5" width="20" x="2" y="4" />
                <path d="M8 20h8M12 18v2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">{s.device}</p>
                {s.current && (
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">
                    {t("settings.currentBadge")}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted/60">{s.location} · {s.date}</p>
            </div>
            {!s.current && (
              <button className="text-xs text-red-500 hover:underline">
                {t("settings.closeSession")}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
