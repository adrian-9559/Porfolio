import { useEffect, useState } from "react";
import { adminService, AdminStats } from "@/services/adminService";
import { userService } from "@/services/userService";
import type { UserWithProfile } from "@/types/auth";
import { SectionHeader, Card, Spinner, relativeTime } from "./AdminShared";

export { SectionHeader };

// ── Dashboard ─────────────────────────────────────────────────────────────────

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<UserWithProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminService.getStats().then(setStats).catch(() => {}),
      userService.list().then((u) => setRecentUsers(u.slice(0, 6))).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  const metrics: { label: string; value: number; sub?: string; color: string }[] = stats
    ? [
        { label: "Usuarios", value: stats.users, sub: `${stats.admins} admin`, color: "text-blue-600 dark:text-blue-400" },
        { label: "Roles", value: stats.roles, color: "text-purple-600 dark:text-purple-400" },
        { label: "Agentes IA", value: stats.agents, sub: `${stats.workflows} workflows`, color: "text-emerald-600 dark:text-emerald-400" },
        { label: "Notificaciones", value: stats.notifications, sub: `${stats.notificationsUnread} sin leer`, color: "text-amber-600 dark:text-amber-400" },
        { label: "Mensajes", value: stats.contactMessages, sub: `${stats.contactUnread} pendientes`, color: "text-red-600 dark:text-red-400" },
        { label: "API Keys", value: stats.apiKeys, color: "text-cyan-600 dark:text-cyan-400" },
      ]
    : [];

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader title="Dashboard" desc="Vista general de la plataforma" />

      {loading ? (
        <Card><Spinner /></Card>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {metrics.map((m) => (
              <Card key={m.label} className="px-5 py-4">
                <p className={`text-3xl font-bold tabular-nums ${m.color}`}>{m.value}</p>
                <p className="text-sm font-medium text-[#1d1d1f] dark:text-white mt-0.5">{m.label}</p>
                {m.sub && <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">{m.sub}</p>}
              </Card>
            ))}
          </div>

          <Card>
            <div className="px-5 py-3.5 border-b border-black/6 dark:border-white/6 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white">Usuarios recientes</h3>
              <span className="text-xs text-[#6e6e73] dark:text-[#86868b]">{recentUsers.length} mostrados</span>
            </div>
            <div className="divide-y divide-black/5 dark:divide-white/5">
              {recentUsers.length === 0 ? (
                <div className="px-5 py-6 text-center text-sm text-[#6e6e73] dark:text-[#86868b]">Sin usuarios</div>
              ) : recentUsers.map((u) => (
                <div key={u.id} className="flex items-center gap-3 px-5 py-3">
                  <Avatar name={u.profile?.full_name ?? u.email} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1d1d1f] dark:text-white truncate">{u.profile?.full_name ?? "—"}</p>
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">{u.email}</p>
                  </div>
                  <div className="flex gap-1 flex-wrap justify-end">
                    {u.roles.map((r) => (
                      <span key={r.id} className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-medium">{r.name}</span>
                    ))}
                  </div>
                  {u.profile?.created_at && (
                    <span className="text-xs text-[#aeaeb2] dark:text-[#636366] shrink-0">{relativeTime(u.profile.created_at)}</span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function Avatar({ name, size = 8 }: { name: string; size?: number }) {
  const initials = name
    .split(" ").map((w) => w[0] ?? "").join("").slice(0, 2).toUpperCase() || "?";
  return (
    <div className={`w-${size} h-${size} rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs font-semibold shrink-0`}>
      {initials}
    </div>
  );
}
