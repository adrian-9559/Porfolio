import { useEffect, useState, useCallback } from "react";

import { relativeTime } from "./AdminShared";

import { adminService } from "@/services/adminService";
import { apiFetch } from "@/services/apiClient";

// ── Types ─────────────────────────────────────────────────────────────────────

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

// ── Category config ───────────────────────────────────────────────────────────

const CAT_CONFIG: Record<
  LogCategory,
  { label: string; bg: string; dot: string; gradient: string }
> = {
  api_key: {
    label: "API Keys",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    dot: "bg-cyan-500",
    gradient: "from-cyan-500 to-blue-500",
  },
  notification: {
    label: "Notificaciones",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    dot: "bg-violet-500",
    gradient: "from-violet-500 to-purple-500",
  },
  contact: {
    label: "Contacto",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    dot: "bg-amber-500",
    gradient: "from-amber-500 to-orange-500",
  },
  mobile: {
    label: "App móvil",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    dot: "bg-emerald-500",
    gradient: "from-emerald-500 to-green-500",
  },
  user: {
    label: "Usuarios",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    dot: "bg-blue-500",
    gradient: "from-blue-500 to-indigo-500",
  },
};

// ── Data fetching ─────────────────────────────────────────────────────────────

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

  // API Keys
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
          ? {
              label: "Activa",
              color:
                "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400",
            }
          : {
              label: "Revocada",
              color: "bg-red-100 dark:bg-red-950/30 text-red-500",
            },
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

  // Notifications
  if (results[1].status === "fulfilled") {
    for (const n of results[1].value.slice(0, 30)) {
      events.push({
        id: `notif-${n.id}`,
        category: "notification",
        icon: n.type === "admin" ? "megaphone" : n.type === "system" ? "settings" : "bell",
        title: n.title,
        subtitle: n.message.slice(0, 80) + (n.message.length > 80 ? "…" : ""),
        date: n.created_at,
        badge: !n.read
          ? {
              label: "Sin leer",
              color:
                "bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
            }
          : undefined,
      });
    }
  }

  // Contact messages
  if (results[2].status === "fulfilled") {
    for (const c of results[2].value) {
      const badgeMap: Record<string, { label: string; color: string }> = {
        pending: {
          label: "Pendiente",
          color:
            "bg-amber-100 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400",
        },
        reviewed: {
          label: "Revisado",
          color: "bg-blue-100 dark:bg-blue-950/30 text-blue-600",
        },
        replied: {
          label: "Respondido",
          color: "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600",
        },
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

  // Mobile downloads
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

  // Sort all events by date desc
  return events.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

function LogIcon({ icon, gradient }: { icon: string; gradient: string }) {
  const svg = {
    key: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
    zap: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    megaphone: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 11l18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 11-5.8-1.6"/></svg>,
    settings: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
    bell: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    mail: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    smartphone: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  }[icon] ?? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;

  return (
    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-md shrink-0 mt-0.5`}>
      {svg}
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

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
    <div className="relative flex flex-col gap-6">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-cyan-500/8 to-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-20 w-56 h-56 rounded-full bg-gradient-to-br from-blue-500/6 to-cyan-500/4 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-1">Sistema</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
            Logs y Actividad
          </h1>
          <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">
            {events.length} eventos · Actualizado {lastRefresh.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <button
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-black/12 dark:border-white/12 text-[#6e6e73] hover:text-[#1d1d1f] dark:text-[#86868b] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-50 shrink-0"
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
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2">
        <button
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${
            activeCategory === "all"
              ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-md"
              : "bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
          }`}
          onClick={() => setActiveCategory("all")}
        >
          Todos
          <span className="px-1.5 py-0.5 rounded-full bg-white/20 dark:bg-black/20 tabular-nums">
            {events.length}
          </span>
        </button>
        {(
          Object.entries(CAT_CONFIG) as [
            LogCategory,
            (typeof CAT_CONFIG)[LogCategory],
          ][]
        ).map(([cat, cfg]) => (
          <button
            key={cat}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${
              activeCategory === cat
                ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-md"
                : "bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
            <span className="tabular-nums">{counts[cat]}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2] dark:text-[#636366]" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <input
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all"
          placeholder="Buscar en los logs…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Timeline */}
      <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
        <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-md mx-auto mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </div>
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">
              Sin eventos con esos filtros
            </p>
          </div>
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((event) => {
              const cfg = CAT_CONFIG[event.category];

              return (
                <div
                  key={event.id}
                  className="flex items-start gap-3 px-5 py-3.5 hover:bg-black/[0.015] dark:hover:bg-white/[0.015] transition-colors"
                >
                  {/* Icon */}
                  <LogIcon icon={event.icon} gradient={cfg.gradient} />
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-[#1d1d1f] dark:text-white leading-tight">
                        {event.title}
                      </p>
                      {event.badge && (
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${event.badge.color}`}
                        >
                          {event.badge.label}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5 truncate">
                      {event.subtitle}
                    </p>
                  </div>
                  {/* Time + category */}
                  <div className="text-right shrink-0">
                    <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                      {relativeTime(event.date)}
                    </p>
                    <span
                      className={`inline-block mt-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${cfg.bg}`}
                    >
                      {cfg.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p className="text-xs text-[#aeaeb2] dark:text-[#636366] text-center">
        Mostrando {filtered.length} de {events.length} eventos · Datos obtenidos
        de API Keys, Notificaciones, Contacto y Descargas de la app
      </p>
    </div>
  );
}
