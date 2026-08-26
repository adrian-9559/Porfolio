import type { Role } from "@/types/auth";
import type { RoleStat, RoleUser } from "@/services/roleService";

import { useEffect, useState, useCallback } from "react";

import {
  SectionHeader,
  Card,
  Spinner,
  EmptyState,
  IconBtn,
  SearchInput,
  Input,
  Btn,
  Icons,
} from "./AdminShared";

import { useT } from "@/hooks/useT";
import { roleService } from "@/services/roleService";

const SYSTEM_ROLES = ["admin", "editor", "user"];

const ROLE_ICONS: Record<string, { icon: React.ReactNode; color: string }> = {
  admin: {
    color: "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400",
    icon: (
      <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 18 18" width="18">
        <path d="M9 1.5L3 4v3.5c0 3.5 2.7 6.5 6 7.5 3.3-1 6-4 6-7.5V4L9 1.5z" />
        <path d="M6.5 9l2 2 3-3.5" />
      </svg>
    ),
  },
  editor: {
    color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
    icon: (
      <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 18 18" width="18">
        <path d="M12.5 2l3.5 3.5-9 9H3.5v-3.5l9-9z" />
        <path d="M10 4.5l3.5 3.5" />
      </svg>
    ),
  },
  user: {
    color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400",
    icon: (
      <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 18 18" width="18">
        <circle cx="9" cy="6" r="3" />
        <path d="M3 16.5c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5" />
      </svg>
    ),
  },
  author: {
    color: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400",
    icon: (
      <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 18 18" width="18">
        <path d="M13.5 2.5l2 2-9 9H4.5v-2l9-9z" />
        <path d="M11 5l2 2" />
        <path d="M3 16h12" />
      </svg>
    ),
  },
  moderator: {
    color: "bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400",
    icon: (
      <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 18 18" width="18">
        <path d="M9 1.5l-6 3v4c0 3.5 2.5 6.5 6 7.5 3.5-1 6-4 6-7.5v-4l-6-3z" />
        <path d="M6 9h6M9 6v6" />
      </svg>
    ),
  },
};

const DEFAULT_ICON = {
  color: "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400",
  icon: (
    <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 18 18" width="18">
      <path d="M9 1.5L3 4v3.5c0 3.5 2.7 6.5 6 7.5 3.3-1 6-4 6-7.5V4L9 1.5z" />
    </svg>
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
    <div className="flex flex-col gap-5">
      <SectionHeader
        desc={t("admin.rolesCount", { n: roles.length })}
        title={t("admin.roles")}
        action={<Btn onClick={() => setShowCreate(true)}>{t("admin.createRole")}</Btn>}
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: t("admin.roleStatTotal"), value: roles.length, accent: "from-blue-500 to-indigo-500" },
          { label: t("admin.roleStatAssigned"), value: totalAssignments, accent: "from-emerald-500 to-teal-500" },
          { label: t("admin.roleStatSystem"), value: roles.filter((r) => SYSTEM_ROLES.includes(r.name)).length, accent: "from-amber-500 to-orange-500" },
        ].map((s) => (
          <Card key={s.label} className="px-4 py-3">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.accent} flex items-center justify-center text-white text-sm font-bold`}>
                {s.value}
              </div>
              <p className="text-xs text-muted font-medium">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Search */}
      <SearchInput value={search} onChange={setSearch} placeholder={t("admin.searchRoles")} />

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowCreate(false)}>
          <Card className="w-full max-w-md mx-4 p-6" >
            <h3 className="text-base font-semibold text-foreground mb-4">{t("admin.createRole")}</h3>
            <form className="flex flex-col gap-3" onSubmit={handleCreate}>
              <Input placeholder={t("admin.roleNamePlaceholder")} value={createName} onChange={setCreateName} />
              <Input placeholder={t("admin.roleDescPlaceholder")} value={createDesc} onChange={setCreateDesc} />
              <div className="flex justify-end gap-2 mt-2">
                <Btn variant="ghost" onClick={() => setShowCreate(false)}>{t("common.cancel")}</Btn>
                <Btn disabled={creating || !createName.trim()} type="submit">{t("admin.create")}</Btn>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Roles list */}
      <Card>
        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <EmptyState sub={t("admin.noRolesHint")} text={t("admin.noRoles")} />
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((r) => {
              const isSystem = SYSTEM_ROLES.includes(r.name);
              const isEditing = editId === r.id;
              const isExpanded = expandedId === r.id;
              const userCount = getUserCount(r.id);
              const { icon, color } = getRoleIcon(r.name);

              return (
                <div key={r.id} className="px-5 py-3.5">
                  {/* Main row */}
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <Input placeholder={t("admin.roleNamePlaceholder")} value={editName} onChange={setEditName} />
                          <Input placeholder={t("admin.roleDescPlaceholder")} value={editDesc} onChange={setEditDesc} />
                          <IconBtn icon={Icons.check} title={t("common.save")} onClick={() => handleUpdate(r.id)} />
                          <IconBtn icon={Icons.ban} title={t("common.cancel")} onClick={() => setEditId(null)} />
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <button
                              className="text-sm font-medium text-foreground hover:underline text-left"
                              onClick={() => toggleExpand(r.id)}
                            >
                              {r.name}
                            </button>
                            {isSystem && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 font-medium">
                                {t("admin.systemBadge")}
                              </span>
                            )}
                          </div>
                          {r.description && (
                            <p className="text-xs text-muted truncate">{r.description}</p>
                          )}
                        </>
                      )}
                    </div>

                    {!isEditing && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          className="text-xs text-muted hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                          onClick={() => toggleExpand(r.id)}
                        >
                          {userCount} {t("admin.roleUsers")}
                        </button>
                        <span className="text-[10px] text-muted/50">{relativeTime(r.created_at)}</span>
                        {!isSystem && (
                          <>
                            {confirmDeleteId === r.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  className="px-2 py-1 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 transition-colors"
                                  onClick={() => handleDelete(r.id)}
                                >
                                  {t("common.delete")}
                                </button>
                                <button
                                  className="px-2 py-1 rounded-lg text-xs font-medium bg-black/5 text-muted hover:text-foreground transition-colors"
                                  onClick={() => setConfirmDeleteId(null)}
                                >
                                  {t("common.cancel")}
                                </button>
                              </div>
                            ) : (
                              <>
                                <IconBtn
                                  icon={Icons.edit}
                                  title={t("admin.editRole")}
                                  onClick={() => { setEditId(r.id); setEditName(r.name); setEditDesc(r.description ?? ""); }}
                                />
                                <IconBtn
                                  danger
                                  icon={Icons.trash}
                                  title={t("admin.deleteRole")}
                                  onClick={() => setConfirmDeleteId(r.id)}
                                />
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
                        <Spinner />
                      ) : expandedUsers.length === 0 ? (
                        <p className="text-xs text-muted py-2">{t("admin.roleNoUsers")}</p>
                      ) : (
                        <div className="space-y-2 py-1">
                          {expandedUsers.map((u) => (
                            <div key={u.user_id} className="flex items-center gap-3 group">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-[10px] font-bold overflow-hidden shrink-0">
                                {u.avatar_url ? (
                                  <img alt="" className="w-full h-full object-cover" src={u.avatar_url} />
                                ) : (
                                  (u.full_name ?? u.email).charAt(0).toUpperCase()
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-foreground truncate">{u.full_name ?? u.email}</p>
                                <p className="text-[10px] text-muted truncate">{u.email}</p>
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
      </Card>
    </div>
  );
}
