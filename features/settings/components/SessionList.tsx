"use client";

import { useState, useEffect } from "react";

import { useT } from "@/hooks/useT";
import { apiFetch } from "@/services/apiClient";

interface Session {
  id: string;
  device_info: string;
  ip_address: string | null;
  last_active: string;
  created_at: string;
}

export function SessionList() {
  const { t } = useT();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSessions = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch<Session[]>("/api/sessions");
      setSessions(Array.isArray(data) ? data : []);
    } catch {
      setError(t("settings.sessionsError") || "Error al cargar sesiones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleDelete = async (sessionId: string) => {
    try {
      await apiFetch(`/api/sessions/${sessionId}`, { method: "DELETE" });
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    } catch {
      // silently fail
    }
  };

  const handleLogoutAll = async () => {
    try {
      await apiFetch("/api/sessions", { method: "DELETE" });
      setSessions((prev) => prev.slice(0, 1));
    } catch {
      // silently fail
    }
  };

  const formatRelativeTime = (iso: string): string => {
    const diff = Date.now() - new Date(iso).getTime();
    const minutes = Math.floor(diff / 60_000);
    if (minutes < 1) return t("settings.justNow") || "Ahora";
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  const getDeviceIcon = (device: string) => {
    if (device.includes("iOS") || device.includes("iPhone") || device.includes("iPad")) {
      return (
        <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <line x1="12" y1="18" x2="12" y2="18.01" strokeLinecap="round" />
        </svg>
      );
    }
    if (device.includes("Android")) {
      return (
        <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <line x1="12" y1="17" x2="12" y2="17.01" strokeLinecap="round" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect height="14" rx="2" strokeWidth="1.5" width="20" x="2" y="4" />
        <path d="M8 20h8M12 18v2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    );
  };

  return (
    <div>
      <h2 className="text-base font-bold text-foreground mb-1">
        {t("settings.activeSessions")}
      </h2>
      <p className="text-xs text-muted mb-4">{t("settings.sessionsDesc")}</p>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="ds-spinner" />
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-sm text-red-500 mb-2">{error}</p>
          <button onClick={fetchSessions} className="text-xs text-accent hover:underline">
            {t("common.retry") || "Reintentar"}
          </button>
        </div>
      ) : (
        <>
          <div className="rounded-xl border border-border divide-y divide-black/5 dark:divide-white/5">
            {sessions.map((s) => (
              <div key={s.id} className="flex items-center gap-4 px-4 py-3">
                <div className="w-8 h-8 rounded-lg bg-default flex items-center justify-center flex-shrink-0">
                  {getDeviceIcon(s.device_info)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {s.device_info}
                    </p>
                    {sessions.indexOf(s) === 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">
                        {t("settings.currentBadge")}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted/60">
                    {s.ip_address ? `${s.ip_address} · ` : ""}
                    {formatRelativeTime(s.last_active)}
                  </p>
                </div>
                {sessions.indexOf(s) !== 0 && (
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    {t("settings.closeSession")}
                  </button>
                )}
              </div>
            ))}
            {sessions.length === 0 && (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-muted">{t("settings.noSessions") || "No hay sesiones activas"}</p>
              </div>
            )}
          </div>

          {sessions.length > 1 && (
            <button
              onClick={handleLogoutAll}
              className="mt-3 w-full text-xs text-red-500 hover:underline py-2"
            >
              {t("settings.logoutAll") || "Cerrar todas las demás sesiones"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
