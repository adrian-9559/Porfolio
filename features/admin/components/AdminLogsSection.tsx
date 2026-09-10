import { useEffect, useState, useCallback } from "react";

import { relativeTime } from "./AdminShared";
import {
  AdminPageHeader,
  AdminStatGrid,
  AdminStat,
  AdminPanel,
  AdminEmptyState,
  AdminLoadingSkeleton,
  AdminFilterChip,
} from "./AdminShell";

import { adminService } from "@/services/adminService";
import { apiFetch } from "@/services/apiClient";

type LogCategory = "api_key" | "notification" | "contact" | "mobile" | "user";

interface LogEvent {
  id: string;
  category: LogCategory;
  icon: string;
  title: string;
  subtitle: string;
  date: string;
  badge?: { label: string; color: string };
}

const CAT_CONFIG: Record<LogCategory, { label: string; dot: string }> = {
  api_key: { label: "API Keys", dot: "bg-cyan-500" },
  notification: { label: "Notificaciones", dot: "bg-violet-500" },
  contact: { label: "Contacto", dot: "bg-amber-500" },
  mobile: { label: "App móvil", dot: "bg-emerald-500" },
  user: { label: "Usuarios", dot: "bg-blue-500" },
};

async function fetchLogs(): Promise<LogEvent[]> {
  const events: LogEvent[] = [];

  const results = await Promise.allSettled([
    adminService.listApiKeys(),
    adminService.listNotifications(),
    adminService.listContact(),
    apiFetch<
      {
        user_id: string;
        version_id: string;
        platform: string;
        downloaded_at: string;
        mobile_app_versions: {
          version: string;
          platform: string;
          build_type: string;
        } | null;
      }[]
    >("/api/mobile-app/logs"),
  ]);

  if (results[0].status === "fulfilled") {
    for (const k of results[0].value) {
      events.push({
        id: `apikey-created-${k.id}`,
        category: "api_key",
        icon: "key",
        title: `API Key "${k.name}" creada`,
        subtitle: k.profiles?.full_name
          ? `Por ${k.profiles.full_name}`
          : "Por el administrador",
        date: k.created_at,
        badge: k.is_active
          ? { label: "Activa", color: "admin-badge-success" }
          : { label: "Revocada", color: "admin-badge-danger" },
      });
      if (k.last_used_at) {
        events.push({
          id: `apikey-used-${k.id}`,
          category: "api_key",
          icon: "zap",
          title: `API Key "${k.name}" utilizada`,
          subtitle: `Prefijo: ${k.key_prefix}••••`,
          date: k.last_used_at,
        });
      }
    }
  }

  if (results[1].status === "fulfilled") {
    for (const n of results[1].value.slice(0, 30)) {
      events.push({
        id: `notif-${n.id}`,
        category: "notification",
        icon:
          n.type === "admin"
            ? "megaphone"
            : n.type === "system"
              ? "settings"
              : "bell",
        title: n.title,
        subtitle: n.message.slice(0, 80) + (n.message.length > 80 ? "…" : ""),
        date: n.created_at,
        badge: !n.read
          ? { label: "Sin leer", color: "admin-badge-info" }
          : undefined,
      });
    }
  }

  if (results[2].status === "fulfilled") {
    for (const c of results[2].value) {
      const badgeMap: Record<string, { label: string; color: string }> = {
        pending: { label: "Pendiente", color: "admin-badge-warning" },
        reviewed: { label: "Revisado", color: "admin-badge-info" },
        replied: { label: "Respondido", color: "admin-badge-success" },
      };

      events.push({
        id: `contact-${c.id}`,
        category: "contact",
        icon: "mail",
        title: `Mensaje de ${c.name}`,
        subtitle: c.message.slice(0, 80) + (c.message.length > 80 ? "…" : ""),
        date: c.created_at,
        badge: badgeMap[c.status],
      });
    }
  }

  if (results[3].status === "fulfilled") {
    for (const d of results[3].value) {
      const ver = d.mobile_app_versions;

      events.push({
        id: `mobile-${d.version_id}-${d.downloaded_at}`,
        category: "mobile",
        icon: "smartphone",
        title: `Descarga de ${ver ? `v${ver.version} (${ver.build_type.toUpperCase()})` : "app móvil"}`,
        subtitle: `Plataforma: ${d.platform}`,
        date: d.downloaded_at,
      });
    }
  }

  return events.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

function LogIcon({ icon }: { icon: string }) {
  const svg = {
    key: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
      </svg>
    ),
    zap: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    megaphone: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 11l18-5v12L3 13v-2z" />
        <path d="M11.6 16.8a3 3 0 11-5.8-1.6" />
      </svg>
    ),
    settings: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
    bell: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
    mail: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    smartphone: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
        <rect height="20" rx="2" ry="2" width="14" x="5" y="2" />
        <line x1="12" x2="12.01" y1="18" y2="18" />
      </svg>
    ),
  }[icon] ?? (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );

  return (
    <div className="w-8 h-8 rounded-lg bg-[var(--bg-hover)] flex items-center justify-center text-[var(--text-secondary)] shrink-0">
      {svg}
    </div>
  );
}

export function AdminLogsSection() {
  const [events, setEvents] = useState<LogEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<LogCategory | "all">(
    "all",
  );
  const [search, setSearch] = useState("");
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchLogs();
      setEvents(data);
      setLastRefresh(new Date());
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = events.filter((e) => {
    if (activeCategory !== "all" && e.category !== activeCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        e.title.toLowerCase().includes(q) ||
        e.subtitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const counts: Record<LogCategory, number> = {
    api_key: 0,
    notification: 0,
    contact: 0,
    mobile: 0,
    user: 0,
  };

  events.forEach((e) => {
    counts[e.category]++;
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Logs y Actividad"
        description={`${events.length} eventos · Actualizado ${lastRefresh.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`}
        actions={
          <button
            className="ds-btn-secondary"
            disabled={loading}
            onClick={load}
          >
            <svg
              className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              viewBox="0 0 16 16"
            >
              <path d="M13.5 8A5.5 5.5 0 112.5 5M13.5 2v3h-3" />
            </svg>
            Actualizar
          </button>
        }
      />

      <div className="flex flex-wrap gap-2">
        <AdminFilterChip
          active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        >
          Todos <span className="tabular-nums">{events.length}</span>
        </AdminFilterChip>
        {(
          Object.entries(CAT_CONFIG) as [
            LogCategory,
            (typeof CAT_CONFIG)[LogCategory],
          ][]
        ).map(([cat, cfg]) => (
          <AdminFilterChip
            key={cat}
            active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          >
            <span className={`w-1.5 h-1.5 rounded-full inline-block ${cfg.dot}`} />
            {cfg.label}
            <span className="tabular-nums">{counts[cat]}</span>
          </AdminFilterChip>
        ))}
      </div>

      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] z-10"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          className="ds-input w-full pl-10"
          placeholder="Buscar en los logs…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <AdminPanel>
        {loading ? (
          <AdminLoadingSkeleton rows={6} />
        ) : filtered.length === 0 ? (
          <AdminEmptyState
            title="Sin eventos con esos filtros"
          />
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {filtered.map((event) => {
              const cfg = CAT_CONFIG[event.category];

              return (
                <div
                  key={event.id}
                  className="flex items-start gap-3 px-5 py-3.5 hover:bg-[var(--bg-hover)] transition-colors"
                >
                  <LogIcon icon={event.icon} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-[var(--text-primary)] leading-tight">
                        {event.title}
                      </p>
                      {event.badge && (
                        <span className={`admin-badge ${event.badge.color}`}>
                          {event.badge.label}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">
                      {event.subtitle}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-[var(--text-muted)]">
                      {relativeTime(event.date)}
                    </p>
                    <span className="admin-badge admin-badge-info mt-1 inline-block">
                      {cfg.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </AdminPanel>

      <p className="text-xs text-[var(--text-muted)] text-center">
        Mostrando {filtered.length} de {events.length} eventos · Datos obtenidos
        de API Keys, Notificaciones, Contacto y Descargas de la app
      </p>
    </div>
  );
}
