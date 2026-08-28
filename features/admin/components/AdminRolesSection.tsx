import type { Role } from "@/types/auth";
import type { RoleStat, RoleUser } from "@/services/roleService";

import { useEffect, useState, useCallback } from "react";

import { useT } from "@/hooks/useT";
import { roleService } from "@/services/roleService";

const SYSTEM_ROLES = ["admin", "editor", "user"];

const ROLE_ICONS: Record<string, { icon: React.ReactNode; gradient: string }> = {
  admin: {
    gradient: "from-rose-500 to-pink-500",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
    ),
  },
  editor: {
    gradient: "from-blue-500 to-cyan-500",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
    ),
  },
  user: {
    gradient: "from-emerald-500 to-teal-500",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    ),
  },
  author: {
    gradient: "from-amber-500 to-orange-500",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
    ),
  },
  moderator: {
    gradient: "from-violet-500 to-purple-500",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12h6M12 9v6"/></svg>
    ),
  },
};

const DEFAULT_ICON = {
  gradient: "from-purple-500 to-violet-600",
  icon: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
};

function getRoleIcon(name: string) {
  return ROLE_ICONS[name] ?? DEFAULT_ICON;
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

export function AdminRoles() {
  const { t } = useT();
  const [roles, setRoles] = useState<Role[]>([]);
  const [stats, setStats] = useState<RoleStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [expandedUsers, setExpandedUsers] = useState<RoleUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Create modal
  const [showCreate, setShowCreate] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createDesc, setCreateDesc] = useState("");
  const [creating, setCreating] = useState(false);

  // Edit state
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  // Delete confirmation
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [r, s] = await Promise.all([roleService.list(), roleService.stats()]);
      setRoles(r);
      setStats(s);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const getUserCount = (roleId: number) => stats.find((s) => s.id === roleId)?.userCount ?? 0;
  const totalAssignments = stats.reduce((sum, s) => sum + s.userCount, 0);

  const filtered = roles.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    (r.description ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createName.trim()) return;
    setCreating(true);
    try {
      await roleService.create(createName.trim(), createDesc.trim() || undefined);
      setCreateName("");
      setCreateDesc("");
      setShowCreate(false);
      await load();
    } catch {}
    setCreating(false);
  };

  const handleUpdate = async (id: number) => {
    if (!editName.trim()) return;
    try {
      await roleService.update(id, { name: editName.trim(), description: editDesc.trim() || undefined });
      setEditId(null);
      await load();
    } catch {}
  };

  const handleDelete = async (id: number) => {
    setConfirmDeleteId(null);
    try {
      await roleService.delete(id);
      await load();
    } catch {}
  };

  const toggleExpand = async (roleId: number) => {
    if (expandedId === roleId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(roleId);
    setLoadingUsers(true);
    try {
      const users = await roleService.usersByRole(roleId);
      setExpandedUsers(users);
    } catch {}
    setLoadingUsers(false);
  };

  return (
    <div className="relative flex flex-col gap-6">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/8 to-violet-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-20 w-56 h-56 rounded-full bg-gradient-to-br from-violet-500/6 to-pink-500/4 blur-3xl pointer-events-none" />

      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6e6e73] dark:text-[#86868b] mb-1">Admin</p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
          {t("admin.roles")}
        </h1>
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">{t("admin.rolesCount", { n: roles.length })}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: t("admin.roleStatTotal"), value: roles.length, gradient: "from-blue-500 to-indigo-500", icon: "total" },
          { label: t("admin.roleStatAssigned"), value: totalAssignments, gradient: "from-emerald-500 to-teal-500", icon: "users" },
          { label: t("admin.roleStatSystem"), value: roles.filter((r) => SYSTEM_ROLES.includes(r.name)).length, gradient: "from-amber-500 to-orange-500", icon: "shield" },
        ].map((s) => (
          <div key={s.label} className="relative rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/8 dark:hover:shadow-black/30 hover:border-black/15 dark:hover:border-white/15 group">
            <div className={`h-1 bg-gradient-to-r ${s.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />
            <div className="p-4 relative">
              <div className={`absolute -bottom-5 -right-5 w-20 h-20 rounded-full bg-gradient-to-br ${s.gradient} opacity-10 blur-2xl`} />
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white shadow-lg shrink-0`}>
                  {s.icon === "total" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  ) : s.icon === "users" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><circle cx="17" cy="7" r="4"/><path d="M21 21v-2a4 4 0 00-3-3.87"/></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
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

      {/* Search + Create */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2] dark:text-[#636366]" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
            placeholder={t("admin.searchRoles")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-md shadow-purple-500/20"
          onClick={() => setShowCreate(true)}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 16 16">
            <path d="M8 2v12M2 8h12" />
          </svg>
          {t("admin.createRole")}
        </button>
      </div>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowCreate(false)}>
          <div className="w-full max-w-md mx-4 bg-white dark:bg-[#111116] rounded-2xl shadow-2xl overflow-hidden border border-black/8 dark:border-white/8" onClick={(e) => e.stopPropagation()}>
            <div className="h-1 bg-gradient-to-r from-purple-500 to-violet-500" />
            <div className="px-6 pt-5 pb-4">
              <h3 className="text-base font-semibold text-[#1d1d1f] dark:text-white mb-4">{t("admin.createRole")}</h3>
              <form className="flex flex-col gap-3" onSubmit={handleCreate}>
                <input
                  className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={t("admin.roleNamePlaceholder")}
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                />
                <input
                  className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={t("admin.roleDescPlaceholder")}
                  value={createDesc}
                  onChange={(e) => setCreateDesc(e.target.value)}
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    className="px-4 py-2 rounded-xl border border-black/12 dark:border-white/12 text-sm text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
                    type="button"
                    onClick={() => setShowCreate(false)}
                  >
                    {t("common.cancel")}
                  </button>
                  <button
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 text-white text-sm font-medium disabled:opacity-50 shadow-md shadow-purple-500/20"
                    disabled={creating || !createName.trim()}
                    type="submit"
                  >
                    {t("admin.create")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Roles list */}
      <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
        <div className="h-1 bg-gradient-to-r from-purple-500 to-violet-500" />
        {loading ? (
          <div className="p-10 flex justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">{t("admin.noRoles")}</p>
            <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1">{t("admin.noRolesHint")}</p>
          </div>
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((r) => {
              const isSystem = SYSTEM_ROLES.includes(r.name);
              const isEditing = editId === r.id;
              const isExpanded = expandedId === r.id;
              const userCount = getUserCount(r.id);
              const { icon, gradient } = getRoleIcon(r.name);

              return (
                <div key={r.id} className="px-5 py-3.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                  {/* Main row */}
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shrink-0 shadow-md`}>
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            className="flex-1 rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-1.5 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder={t("admin.roleNamePlaceholder")}
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                          />
                          <input
                            className="flex-1 rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-1.5 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder={t("admin.roleDescPlaceholder")}
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                          />
                          <button
                            className="p-2 rounded-lg text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors"
                            title={t("common.save")}
                            onClick={() => handleUpdate(r.id)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                          </button>
                          <button
                            className="p-2 rounded-lg text-[#aeaeb2] hover:text-[#1d1d1f] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            title={t("common.cancel")}
                            onClick={() => setEditId(null)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <button
                              className="text-sm font-medium text-[#1d1d1f] dark:text-white hover:underline text-left"
                              onClick={() => toggleExpand(r.id)}
                            >
                              {r.name}
                            </button>
                            {isSystem && (
                              <span className="px-1.5 py-0.5 rounded-lg text-[10px] font-bold bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400">
                                {t("admin.systemBadge")}
                              </span>
                            )}
                          </div>
                          {r.description && (
                            <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">{r.description}</p>
                          )}
                        </>
                      )}
                    </div>

                    {!isEditing && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          className="text-xs text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                          onClick={() => toggleExpand(r.id)}
                        >
                          {userCount} {t("admin.roleUsers")}
                        </button>
                        <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">{relativeTime(r.created_at)}</span>
                        {!isSystem && (
                          <>
                            {confirmDeleteId === r.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  className="px-2.5 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold transition-colors"
                                  onClick={() => handleDelete(r.id)}
                                >
                                  {t("common.delete")}
                                </button>
                                <button
                                  className="px-2.5 py-1 rounded-lg border border-black/8 dark:border-white/8 hover:bg-black/5 dark:hover:bg-white/5 text-[10px] font-semibold transition-colors"
                                  onClick={() => setConfirmDeleteId(null)}
                                >
                                  {t("common.cancel")}
                                </button>
                              </div>
                            ) : (
                              <>
                                <button
                                  className="p-2 rounded-lg text-[#aeaeb2] dark:text-[#636366] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                                  title={t("admin.editRole")}
                                  onClick={() => { setEditId(r.id); setEditName(r.name); setEditDesc(r.description ?? ""); }}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                                </button>
                                <button
                                  className="p-2 rounded-lg text-[#aeaeb2] dark:text-[#636366] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                                  title={t("admin.deleteRole")}
                                  onClick={() => setConfirmDeleteId(r.id)}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Expanded users */}
                  {isExpanded && (
                    <div className="mt-3 ml-12 border-l-2 border-black/5 dark:border-white/5 pl-4">
                      {loadingUsers ? (
                        <div className="py-4 flex justify-center">
                          <div className="w-5 h-5 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
                        </div>
                      ) : expandedUsers.length === 0 ? (
                        <p className="text-xs text-[#6e6e73] dark:text-[#86868b] py-2">{t("admin.roleNoUsers")}</p>
                      ) : (
                        <div className="space-y-2 py-1">
                          {expandedUsers.map((u) => (
                            <div key={u.user_id} className="flex items-center gap-3 group">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-[10px] font-bold overflow-hidden shrink-0 shadow-md">
                                {u.avatar_url ? (
                                  <img alt="" className="w-full h-full object-cover" src={u.avatar_url} />
                                ) : (
                                  (u.full_name ?? u.email).charAt(0).toUpperCase()
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-[#1d1d1f] dark:text-white truncate">{u.full_name ?? u.email}</p>
                                <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] truncate">{u.email}</p>
                              </div>
                              {!isSystem && (
                                <button
                                  className="text-[10px] text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                  onClick={async () => {
                                    await roleService.remove(u.user_id, r.id);
                                    await toggleExpand(r.id);
                                    await load();
                                  }}
                                >
                                  {t("admin.roleRemoveUser")}
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
