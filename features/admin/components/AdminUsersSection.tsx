import type { UserWithProfile, Role } from "@/types/auth";
import { useEffect, useState, useMemo, useCallback } from "react";
import { relativeTime } from "./AdminShared";
import { Avatar } from "./AdminDashboard";
import { AdminUserModal } from "./AdminUserModal";
import { useT } from "@/hooks/useT";
import { roleService } from "@/services/roleService";
import { userService } from "@/services/userService";

const PER_PAGE = 10;
const SYSTEM_ROLES = ["admin", "editor", "user"];

export function AdminUsers() {
  const { t } = useT();
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserWithProfile | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [u, r] = await Promise.all([userService.list(), roleService.list()]);
      setUsers(u);
      setRoles(r);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const stats = useMemo(() => {
    const total = users.length;
    const admins = users.filter((u) => u.roles.some((r) => r.name === "admin")).length;
    const confirmed = users.filter((u) => u.email_confirmed).length;
    const unconfirmed = total - confirmed;
    return { total, admins, confirmed, unconfirmed, roles: roles.length };
  }, [users, roles]);

  const filtered = useMemo(() => {
    let result = users;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (u) => u.email.toLowerCase().includes(q) || u.profile?.full_name?.toLowerCase().includes(q)
      );
    }
    if (roleFilter) {
      result = result.filter((u) => u.roles.some((r) => r.name === roleFilter));
    }
    return result;
  }, [users, search, roleFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    const start = (safePage - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, safePage]);

  useEffect(() => { setPage(1); }, [search, roleFilter]);

  const handleAssignRole = async (userId: string, roleId: number) => {
    await roleService.assign(userId, roleId);
    load();
  };

  const handleRemoveRole = async (userId: string, roleId: number) => {
    await roleService.remove(userId, roleId);
    load();
  };

  const handleDelete = async (userId: string) => {
    await userService.delete(userId);
    setConfirmDelete(null);
    load();
  };

  return (
    <div className="relative flex flex-col gap-6">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-blue-500/8 to-indigo-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-br from-violet-500/8 to-purple-500/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6e6e73] dark:text-[#86868b] mb-1">{t("admin.adminBadge")}</p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
          {t("admin.users")}
        </h1>
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">{t("admin.dashboardDesc")}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: t("admin.userStatsTotal"), value: stats.total, gradient: "from-blue-500 to-indigo-600", icon: "users" },
          { label: t("admin.userStatsAdmins"), value: stats.admins, gradient: "from-purple-500 to-violet-600", icon: "shield" },
          { label: t("admin.userStatsConfirmed"), value: stats.confirmed, gradient: "from-emerald-500 to-teal-500", icon: "check" },
          { label: t("admin.userStatsUnconfirmed"), value: stats.unconfirmed, gradient: "from-amber-500 to-orange-500", icon: "alert" },
          { label: t("admin.userStatsRoles"), value: stats.roles, gradient: "from-cyan-500 to-blue-500", icon: "key" },
        ].map((m) => (
          <div key={m.label} className="relative rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/8 dark:hover:shadow-black/30 hover:border-black/15 dark:hover:border-white/15 group">
            <div className={`h-1 bg-gradient-to-r ${m.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />
            <div className="p-4 relative">
              <div className={`absolute -bottom-5 -right-5 w-20 h-20 rounded-full bg-gradient-to-br ${m.gradient} opacity-10 blur-2xl`} />
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center text-white shadow-lg shrink-0`}>
                  <UserStatIcon name={m.icon} />
                </div>
                <div>
                  <p className="text-2xl font-black tabular-nums tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>{m.value}</p>
                  <p className="text-[11px] font-semibold text-[#1d1d1f] dark:text-white truncate">{m.label}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Role filter */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2] dark:text-[#636366]" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
              placeholder={`${t("admin.tableEmail")} / ${t("admin.tableName")}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={load}
            className="px-3 py-2.5 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white hover:border-black/15 dark:hover:border-white/15 transition-all"
            title="Refresh"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
          </button>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <button
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${roleFilter === null ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-md" : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white bg-black/5 dark:bg-white/5"}`}
            onClick={() => setRoleFilter(null)}
          >
            {t("admin.allRoles")}
          </button>
          {roles.map((r) => (
            <button
              key={r.id}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${roleFilter === r.name ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-md" : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white bg-black/5 dark:bg-white/5"}`}
              onClick={() => setRoleFilter(roleFilter === r.name ? null : r.name)}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>

      {/* Users table */}
      <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
        {loading ? (
          <div className="p-10 flex justify-center">
            <div className="w-5 h-5 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin" />
          </div>
        ) : paginated.length === 0 ? (
          <div className="p-10 text-center text-sm text-[#6e6e73] dark:text-[#86868b]">{t("admin.noUsersMatch")}</div>
        ) : (
          <>
            {/* Table header */}
            <div className="hidden md:grid grid-cols-[1fr_1.5fr_1.2fr_0.8fr] gap-4 px-5 py-3 border-b border-black/6 dark:border-white/6 text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">
              <span>{t("admin.tableName")}</span>
              <span>{t("admin.tableEmail")}</span>
              <span>{t("admin.tableRoles")}</span>
              <span className="text-right">{t("admin.tableActions")}</span>
            </div>
            {/* Rows */}
            <div className="divide-y divide-black/5 dark:divide-white/5">
              {paginated.map((u) => (
                <div key={u.id} className="group grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1.2fr_0.8fr] gap-2 md:gap-4 items-center px-5 py-3.5 hover:bg-black/2 dark:hover:bg-white/2 transition-colors">
                  {/* Name + Avatar */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md">
                      {(u.profile?.full_name ?? u.email).split(" ").map((w) => w[0] ?? "").join("").slice(0, 2).toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0">
                      <button
                        className="text-sm font-bold text-[#1d1d1f] dark:text-white truncate hover:underline text-left block max-w-full"
                        onClick={() => setSelectedUser(u)}
                      >
                        {u.profile?.full_name ?? "—"}
                      </button>
                      <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] md:hidden truncate">{u.email}</p>
                    </div>
                  </div>
                  {/* Email (desktop) */}
                  <span className="hidden md:block text-sm text-[#6e6e73] dark:text-[#86868b] truncate">{u.email}</span>
                  {/* Roles */}
                  <div className="flex items-center gap-1 flex-wrap">
                    {u.roles.map((r) => (
                      <span
                        key={r.id}
                        className="group/role inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-950/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold"
                      >
                        {r.name}
                        <button
                          className="opacity-0 group-hover/role:opacity-100 transition-opacity text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100 ml-0.5 leading-none"
                          onClick={() => handleRemoveRole(u.id, r.id)}
                          title={`Remove ${r.name}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <select
                      className="text-[10px] font-semibold border border-black/8 dark:border-white/8 rounded-lg px-1.5 py-0.5 bg-white dark:bg-[#111116] text-[#6e6e73] dark:text-[#86868b] opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
                      value=""
                      onChange={(e) => { if (e.target.value) handleAssignRole(u.id, Number(e.target.value)); }}
                    >
                      <option value="">+</option>
                      {roles.filter((r) => !u.roles.some((ur) => ur.id === r.id)).map((r) => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </div>
                  {/* Actions */}
                  <div className="flex items-center gap-1 justify-end">
                    <button
                      className="p-2 rounded-lg text-[#aeaeb2] dark:text-[#636366] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                      onClick={() => setSelectedUser(u)}
                      title="View"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                    {confirmDelete === u.id ? (
                      <div className="flex items-center gap-1">
                        <button className="px-2.5 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold transition-colors" onClick={() => handleDelete(u.id)}>{t("admin.confirm")}</button>
                        <button className="px-2.5 py-1 rounded-lg border border-black/8 dark:border-white/8 hover:bg-black/5 dark:hover:bg-white/5 text-[10px] font-semibold transition-colors" onClick={() => setConfirmDelete(null)}>{t("admin.cancel")}</button>
                      </div>
                    ) : (
                      <button
                        className="p-2 rounded-lg text-[#aeaeb2] dark:text-[#636366] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                        onClick={() => setConfirmDelete(u.id)}
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      {filtered.length > PER_PAGE && (
        <div className="flex items-center justify-between text-xs text-[#6e6e73] dark:text-[#86868b]">
          <span>
            {(safePage - 1) * PER_PAGE + 1}–{Math.min(safePage * PER_PAGE, filtered.length)} {t("admin.pageOf")} {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              className="px-3 py-1.5 rounded-lg border border-black/8 dark:border-white/8 hover:bg-black/5 dark:hover:bg-white/5 font-semibold transition-all disabled:opacity-40"
              disabled={safePage <= 1}
              onClick={() => setPage(safePage - 1)}
            >
              {t("admin.prev")}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`w-8 h-8 rounded-lg font-semibold transition-all ${p === safePage ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-md" : "hover:bg-black/5 dark:hover:bg-white/5"}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className="px-3 py-1.5 rounded-lg border border-black/8 dark:border-white/8 hover:bg-black/5 dark:hover:bg-white/5 font-semibold transition-all disabled:opacity-40"
              disabled={safePage >= totalPages}
              onClick={() => setPage(safePage + 1)}
            >
              {t("admin.next")}
            </button>
          </div>
        </div>
      )}

      {/* User detail modal */}
      {selectedUser && (
        <AdminUserModal
          user={selectedUser}
          open={!!selectedUser}
          onClose={() => { setSelectedUser(null); load(); }}
          roles={roles}
          onAssignRole={handleAssignRole}
          onRemoveRole={handleRemoveRole}
        />
      )}
    </div>
  );
}

function UserStatIcon({ name }: { name: string }) {
  const s = "w-4 h-4";
  switch (name) {
    case "users": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><circle cx="17" cy="7" r="4"/><path d="M21 21v-2a4 4 0 00-3-3.87"/></svg>;
    case "shield": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
    case "check": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>;
    case "alert": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
    case "key": return <svg className={s} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>;
    default: return null;
  }
}
