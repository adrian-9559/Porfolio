import { useEffect, useState, useCallback } from "react";
import { adminService } from "@/services/adminService";
import { apiFetch } from "@/services/apiClient";
import { SectionHeader, Spinner, relativeTime } from "./AdminShared";

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

const CAT_CONFIG: Record<LogCategory, { label: string; bg: string; dot: string }> = {
  api_key:      { label: "API Keys",      bg: "bg-cyan-50 dark:bg-cyan-950/30",    dot: "bg-cyan-500" },
  notification: { label: "Notificaciones",bg: "bg-violet-50 dark:bg-violet-950/30", dot: "bg-violet-500" },
  contact:      { label: "Contacto",       bg: "bg-amber-50 dark:bg-amber-950/30",  dot: "bg-amber-500" },
  mobile:       { label: "App móvil",      bg: "bg-emerald-50 dark:bg-emerald-950/30", dot: "bg-emerald-500" },
  user:         { label: "Usuarios",       bg: "bg-blue-50 dark:bg-blue-950/30",    dot: "bg-blue-500" },
};

// ── Data fetching ─────────────────────────────────────────────────────────────

async function fetchLogs(): Promise<LogEvent[]> {
  const events: LogEvent[] = [];

  const results = await Promise.allSettled([
    adminService.listApiKeys(),
    adminService.listNotifications(),
    adminService.listContact(),
    apiFetch<{ user_id: string; version_id: string; platform: string; downloaded_at: string; mobile_app_versions: { version: string; platform: string; build_type: string } | null }[]>("/api/mobile-app/logs"),
  ]);

  // API Keys
  if (results[0].status === "fulfilled") {
    for (const k of results[0].value) {
      events.push({
        id: `apikey-created-${k.id}`,
        category: "api_key",
        icon: "🔑",
        title: `API Key "${k.name}" creada`,
        subtitle: k.profiles?.full_name ? `Por ${k.profiles.full_name}` : "Por el administrador",
        date: k.created_at,
        badge: k.is_active ? { label: "Activa", color: "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400" } : { label: "Revocada", color: "bg-red-100 dark:bg-red-950/30 text-red-500" },
      });
      if (k.last_used_at) {
        events.push({
          id: `apikey-used-${k.id}`,
          category: "api_key",
          icon: "⚡",
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
        icon: n.type === "admin" ? "📢" : n.type === "system" ? "⚙️" : "🔔",
        title: n.title,
        subtitle: n.message.slice(0, 80) + (n.message.length > 80 ? "…" : ""),
        date: n.created_at,
        badge: !n.read ? { label: "Sin leer", color: "bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400" } : undefined,
      });
    }
  }

  // Contact messages
  if (results[2].status === "fulfilled") {
    for (const c of results[2].value) {
      const badgeMap: Record<string, { label: string; color: string }> = {
        pending:  { label: "Pendiente", color: "bg-amber-100 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400" },
        reviewed: { label: "Revisado",  color: "bg-blue-100 dark:bg-blue-950/30 text-blue-600" },
        replied:  { label: "Respondido",color: "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600" },
      };
      events.push({
        id: `contact-${c.id}`,
        category: "contact",
        icon: "✉️",
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
        icon: "📱",
        title: `Descarga de ${ver ? `v${ver.version} (${ver.build_type.toUpperCase()})` : "app móvil"}`,
        subtitle: `Plataforma: ${d.platform}`,
        date: d.downloaded_at,
      });
    }
  }

  // Sort all events by date desc
  return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ── Component ─────────────────────────────────────────────────────────────────

export function AdminLogsSection() {
  const [events, setEvents] = useState<LogEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<LogCategory | "all">("all");
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

  useEffect(() => { load(); }, [load]);

  const filtered = events.filter(e => {
    if (activeCategory !== "all" && e.category !== activeCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return e.title.toLowerCase().includes(q) || e.subtitle.toLowerCase().includes(q);
    }
    return true;
  });

  const counts: Record<LogCategory, number> = { api_key: 0, notification: 0, contact: 0, mobile: 0, user: 0 };
  events.forEach(e => { counts[e.category]++; });

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        title="Logs y Actividad"
        desc={`${events.length} eventos · Actualizado ${lastRefresh.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`}
        action={
          <button onClick={load} disabled={loading}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-black/12 dark:border-white/12 text-[#6e6e73] hover:text-[#1d1d1f] dark:text-[#86868b] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-50">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}>
              <path d="M13.5 8A5.5 5.5 0 112.5 5M13.5 2v3h-3"/>
            </svg>
            Actualizar
          </button>
        }
      />

      {/* Summary chips */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveCategory("all")}
          className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl border transition-colors ${activeCategory === "all" ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] border-transparent" : "border-black/12 dark:border-white/12 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}>
          Todos
          <span className="px-1.5 py-0.5 rounded-full bg-white/20 dark:bg-black/20 tabular-nums">{events.length}</span>
        </button>
        {(Object.entries(CAT_CONFIG) as [LogCategory, typeof CAT_CONFIG[LogCategory]][]).map(([cat, cfg]) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl border transition-colors ${activeCategory === cat ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] border-transparent" : "border-black/12 dark:border-white/12 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
            <span className="tabular-nums">{counts[cat]}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#aeaeb2]" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="6" cy="6" r="4"/><path d="M10 10l2.5 2.5"/>
        </svg>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar en los logs…"
          className="w-full pl-8 pr-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all" />
      </div>

      {/* Timeline */}
      <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-hidden">
        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="text-2xl mb-2">🔍</p>
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">Sin eventos con esos filtros</p>
          </div>
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((event) => {
              const cfg = CAT_CONFIG[event.category];
              return (
                <div key={event.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-black/[0.015] dark:hover:bg-white/[0.015] transition-colors">
                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 mt-0.5 ${cfg.bg}`}>
                    {event.icon}
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-[#1d1d1f] dark:text-white leading-tight">{event.title}</p>
                      {event.badge && (
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${event.badge.color}`}>{event.badge.label}</span>
                      )}
                    </div>
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5 truncate">{event.subtitle}</p>
                  </div>
                  {/* Time + category */}
                  <div className="text-right shrink-0">
                    <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">{relativeTime(event.date)}</p>
                    <span className={`inline-block mt-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${cfg.bg}`} style={{ color: "inherit", opacity: 0.7 }}>
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
        Mostrando {filtered.length} de {events.length} eventos · Datos obtenidos de API Keys, Notificaciones, Contacto y Descargas de la app
      </p>
    </div>
  );
}
