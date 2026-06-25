import { useEffect, useState } from "react";
import { adminService, AdminNotification } from "@/services/adminService";
import { userService } from "@/services/userService";
import type { UserWithProfile } from "@/types/auth";
import { SectionHeader, Card, Spinner, EmptyState, IconBtn, SearchInput, Badge, Input, Textarea, Btn, Icons, relativeTime } from "./AdminShared";

const typeColors = {
  info:   "blue" as const,
  admin:  "purple" as const,
  system: "amber" as const,
};

export function AdminNotificationsSection() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "info" | "admin" | "system">("all");

  // Send form
  const [sendTitle, setSendTitle] = useState("");
  const [sendMsg, setSendMsg] = useState("");
  const [sendType, setSendType] = useState<"info" | "admin" | "system">("admin");
  const [sendTarget, setSendTarget] = useState<"admins" | "all" | "user">("admins");
  const [sendUserId, setSendUserId] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [n, u] = await Promise.all([adminService.listNotifications(), userService.list()]);
      setNotifications(n); setUsers(u);
    } catch {}
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const filtered = notifications.filter((n) => {
    if (filter === "unread" && n.read) return false;
    if (filter !== "all" && filter !== "unread" && n.type !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q);
    }
    return true;
  });

  const handleDelete = async (id: string) => {
    try { await adminService.deleteNotification(id); setNotifications((n) => n.filter((x) => x.id !== id)); } catch {}
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sendTitle.trim() || !sendMsg.trim()) return;
    setSending(true); setSendResult("");
    try {
      const payload = {
        title: sendTitle,
        message: sendMsg,
        type: sendType,
        toAll: sendTarget === "all",
        ...(sendTarget === "user" && sendUserId ? { userId: sendUserId } : {}),
      };
      const { sent } = await adminService.sendNotification(payload);
      setSendResult(`✓ Enviado a ${sent} destinatario${typeof sent === "number" && sent !== 1 ? "s" : ""}`);
      setSendTitle(""); setSendMsg("");
      await load();
    } catch { setSendResult("Error al enviar"); }
    setSending(false);
  };

  const FILTERS = [
    { key: "all", label: "Todas" }, { key: "unread", label: "Sin leer" },
    { key: "info", label: "Info" }, { key: "admin", label: "Admin" }, { key: "system", label: "Sistema" },
  ] as const;

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader title="Notificaciones" desc={`${notifications.length} totales · ${notifications.filter((n) => !n.read).length} sin leer`} />

      {/* Send form */}
      <Card className="px-5 py-5">
        <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-4">Enviar notificación</h3>
        <form onSubmit={handleSend} className="flex flex-col gap-3">
          <div className="flex gap-3">
            <Input value={sendTitle} onChange={setSendTitle} placeholder="Título" />
            <select value={sendType} onChange={(e) => setSendType(e.target.value as typeof sendType)}
              className="px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30">
              <option value="info">Info</option>
              <option value="admin">Admin</option>
              <option value="system">Sistema</option>
            </select>
          </div>
          <Textarea value={sendMsg} onChange={setSendMsg} placeholder="Mensaje…" rows={2} />
          <div className="flex items-center gap-3 flex-wrap">
            <select value={sendTarget} onChange={(e) => setSendTarget(e.target.value as typeof sendTarget)}
              className="px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30">
              <option value="admins">Solo admins</option>
              <option value="all">Todos los usuarios</option>
              <option value="user">Usuario específico</option>
            </select>
            {sendTarget === "user" && (
              <select value={sendUserId} onChange={(e) => setSendUserId(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                <option value="">Seleccionar usuario…</option>
                {users.map((u) => <option key={u.id} value={u.id}>{u.profile?.full_name ?? u.email}</option>)}
              </select>
            )}
            <Btn type="submit" disabled={sending || !sendTitle.trim() || !sendMsg.trim()}>
              {Icons.send} Enviar
            </Btn>
            {sendResult && <span className="text-xs text-emerald-600 dark:text-emerald-400">{sendResult}</span>}
          </div>
        </form>
      </Card>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <SearchInput value={search} onChange={setSearch} placeholder="Buscar notificación…" />
        <div className="flex gap-1">
          {FILTERS.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${filter === f.key
                ? "bg-blue-600 text-white"
                : "border border-black/12 dark:border-white/12 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
              }`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <Card>
        {loading ? <Spinner /> : filtered.length === 0 ? (
          <EmptyState text="Sin notificaciones" sub={search ? "Prueba con otro término" : undefined} />
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((n) => (
              <div key={n.id} className={`flex items-start gap-3 px-5 py-3.5 ${!n.read ? "bg-blue-50/30 dark:bg-blue-950/10" : ""}`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium text-[#1d1d1f] dark:text-white truncate">{n.title}</p>
                    <Badge label={n.type} color={typeColors[n.type]} />
                    {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />}
                  </div>
                  <p className="text-xs text-[#6e6e73] dark:text-[#86868b] line-clamp-2">{n.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">{relativeTime(n.created_at)}</span>
                    {n.profiles?.full_name && (
                      <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">→ {n.profiles.full_name}</span>
                    )}
                  </div>
                </div>
                <IconBtn onClick={() => handleDelete(n.id)} title="Eliminar" icon={Icons.trash} danger />
              </div>
            ))}
          </div>
        )}
      </Card>

      <p className="text-xs text-center text-[#aeaeb2] dark:text-[#636366]">
        Mostrando {filtered.length} de {notifications.length}
      </p>
    </div>
  );
}
