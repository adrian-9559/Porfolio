import type { UserWithProfile } from "@/types/auth";

import { useEffect, useState } from "react";

import { adminService, AdminNotification } from "@/services/adminService";
import { userService } from "@/services/userService";

const typeColors: Record<string, { gradient: string; badge: string }> = {
  info: { gradient: "from-blue-500 to-cyan-500", badge: "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400" },
  admin: { gradient: "from-purple-500 to-violet-600", badge: "bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400" },
  system: { gradient: "from-amber-500 to-orange-500", badge: "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400" },
};

export function AdminNotificationsSection() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "unread" | "info" | "admin" | "system"
  >("all");

  // Send form
  const [sendTitle, setSendTitle] = useState("");
  const [sendMsg, setSendMsg] = useState("");
  const [sendType, setSendType] = useState<"info" | "admin" | "system">(
    "admin",
  );
  const [sendTarget, setSendTarget] = useState<"admins" | "all" | "user">(
    "admins",
  );
  const [sendUserId, setSendUserId] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const [n, u] = await Promise.all([
        adminService.listNotifications(),
        userService.list(),
      ]);

      setNotifications(n);
      setUsers(u);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = notifications.filter((n) => {
    if (filter === "unread" && n.read) return false;
    if (filter !== "all" && filter !== "unread" && n.type !== filter)
      return false;
    if (search) {
      const q = search.toLowerCase();

      return (
        n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q)
      );
    }

    return true;
  });

  const handleDelete = async (id: string) => {
    setConfirmDeleteId(null);
    try {
      await adminService.deleteNotification(id);
      setNotifications((n) => n.filter((x) => x.id !== id));
    } catch {}
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sendTitle.trim() || !sendMsg.trim()) return;
    setSending(true);
    setSendResult("");
    try {
      const payload = {
        title: sendTitle,
        message: sendMsg,
        type: sendType,
        toAll: sendTarget === "all",
        ...(sendTarget === "user" && sendUserId ? { userId: sendUserId } : {}),
      };
      const { sent } = await adminService.sendNotification(payload);

      setSendResult(
        `✓ Enviado a ${sent} destinatario${typeof sent === "number" && sent !== 1 ? "s" : ""}`,
      );
      setSendTitle("");
      setSendMsg("");
      await load();
    } catch {
      setSendResult("Error al enviar");
    }
    setSending(false);
  };

  const FILTERS = [
    { key: "all", label: "Todas" },
    { key: "unread", label: "Sin leer" },
    { key: "info", label: "Info" },
    { key: "admin", label: "Admin" },
    { key: "system", label: "Sistema" },
  ] as const;

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative flex flex-col gap-6">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-blue-500/8 to-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-20 w-56 h-56 rounded-full bg-gradient-to-br from-cyan-500/6 to-blue-500/4 blur-3xl pointer-events-none" />

      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6e6e73] dark:text-[#86868b] mb-1">Comunicación</p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
          Notificaciones
        </h1>
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">
          {notifications.length} totales · {unread} sin leer
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Totales", value: notifications.length, gradient: "from-blue-500 to-cyan-500", icon: "total" },
          { label: "Sin leer", value: unread, gradient: "from-amber-500 to-orange-500", icon: "unread" },
          { label: "Leídas", value: notifications.length - unread, gradient: "from-emerald-500 to-teal-500", icon: "read" },
        ].map((s) => (
          <div key={s.label} className="relative rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/8 dark:hover:shadow-black/30 hover:border-black/15 dark:hover:border-white/15 group">
            <div className={`h-1 bg-gradient-to-r ${s.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />
            <div className="p-4 relative">
              <div className={`absolute -bottom-5 -right-5 w-20 h-20 rounded-full bg-gradient-to-br ${s.gradient} opacity-10 blur-2xl`} />
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white shadow-lg shrink-0`}>
                  {s.icon === "total" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
                  ) : s.icon === "unread" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                  )}
                </div>
                <div>
                  <p className="text-2xl font-black tabular-nums tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>{s.value}</p>
                  <p className="text-[11px] font-semibold text-[#1d1d1f] dark:text-white truncate">{s.label}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Send form */}
      <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
        <div className="px-5 py-5">
          <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-4">
            Enviar notificación
          </h3>
          <form className="flex flex-col gap-3" onSubmit={handleSend}>
            <div className="flex gap-3">
              <input
                className="flex-1 rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Título"
                value={sendTitle}
                onChange={(e) => setSendTitle(e.target.value)}
              />
              <select
                className="px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                value={sendType}
                onChange={(e) => setSendType(e.target.value as typeof sendType)}
              >
                <option value="info">Info</option>
                <option value="admin">Admin</option>
                <option value="system">Sistema</option>
              </select>
            </div>
            <textarea
              className="rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Mensaje…"
              rows={2}
              value={sendMsg}
              onChange={(e) => setSendMsg(e.target.value)}
            />
            <div className="flex items-center gap-3 flex-wrap">
              <select
                className="px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                value={sendTarget}
                onChange={(e) =>
                  setSendTarget(e.target.value as typeof sendTarget)
                }
              >
                <option value="admins">Solo admins</option>
                <option value="all">Todos los usuarios</option>
                <option value="user">Usuario específico</option>
              </select>
              {sendTarget === "user" && (
                <select
                  className="flex-1 px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  value={sendUserId}
                  onChange={(e) => setSendUserId(e.target.value)}
                >
                  <option value="">Seleccionar usuario…</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.profile?.full_name ?? u.email}
                    </option>
                  ))}
                </select>
              )}
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold disabled:opacity-50 shadow-md shadow-blue-500/20 transition-all hover:opacity-90"
                disabled={sending || !sendTitle.trim() || !sendMsg.trim()}
                type="submit"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                Enviar
              </button>
              {sendResult && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400">
                  {sendResult}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2] dark:text-[#636366]" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            placeholder="Buscar notificación…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === f.key
                  ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-md"
                  : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white bg-black/5 dark:bg-white/5"
              }`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications list */}
      <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
        {loading ? (
          <div className="p-10 flex justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-[#6e6e73] dark:text-[#86868b]">
            {search ? "Prueba con otro término" : "Sin notificaciones"}
          </div>
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((n) => (
              <div
                key={n.id}
                className={`flex items-start gap-3 px-5 py-3.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors ${!n.read ? "bg-blue-50/30 dark:bg-blue-950/10" : ""}`}
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${typeColors[n.type]?.gradient ?? "from-gray-500 to-gray-600"} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md`}>
                  {n.type === "info" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                  ) : n.type === "admin" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium text-[#1d1d1f] dark:text-white truncate">
                      {n.title}
                    </p>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${typeColors[n.type]?.badge ?? "bg-gray-100 text-gray-700"}`}>
                      {n.type}
                    </span>
                    {!n.read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-[#6e6e73] dark:text-[#86868b] line-clamp-2">
                    {n.message}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                      {relativeTime(n.created_at)}
                    </span>
                    {n.profiles?.full_name && (
                      <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                        → {n.profiles.full_name}
                      </span>
                    )}
                  </div>
                </div>
                {confirmDeleteId === n.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      className="px-2.5 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold transition-colors"
                      onClick={() => handleDelete(n.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="px-2.5 py-1 rounded-lg border border-black/8 dark:border-white/8 hover:bg-black/5 dark:hover:bg-white/5 text-[10px] font-semibold transition-colors"
                      onClick={() => setConfirmDeleteId(null)}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    className="p-2 rounded-lg text-[#aeaeb2] dark:text-[#636366] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all shrink-0"
                    title="Eliminar"
                    onClick={() => setConfirmDeleteId(n.id)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-center text-[#aeaeb2] dark:text-[#636366]">
        Mostrando {filtered.length} de {notifications.length}
      </p>
    </div>
  );
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "ahora";
  if (mins < 60) return `hace ${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `hace ${days}d`;
  return new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}
