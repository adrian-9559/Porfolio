import type { Role } from "@/types/auth";
import type { RoleStat, RoleUser } from "@/services/roleService";

import { useEffect, useState, useCallback } from "react";

import { relativeTime } from "./AdminShared";
import {
  AdminPageHeader,
  AdminStatGrid,
  AdminStat,
  AdminPanel,
  AdminEmptyState,
  AdminLoadingSkeleton,
} from "./AdminShell";

import { useT } from "@/hooks/useT";
import { roleService } from "@/services/roleService";

const SYSTEM_ROLES = ["admin", "editor", "user"];

const ROLE_COLORS: Record<string, string> = {
  admin: "var(--color-danger)",
  editor: "var(--color-info)",
  user: "var(--color-success)",
  author: "var(--color-warning)",
  moderator: "var(--accent)",
};

function getRoleColor(name: string) {
  return ROLE_COLORS[name] ?? "var(--accent)";
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

  const [showCreate, setShowCreate] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createDesc, setCreateDesc] = useState("");
  const [creating, setCreating] = useState(false);

  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [r, s] = await Promise.all([
        roleService.list(),
        roleService.stats(),
      ]);

      setRoles(r);
      setStats(s);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const getUserCount = (roleId: number) =>
    stats.find((s) => s.id === roleId)?.userCount ?? 0;
  const totalAssignments = stats.reduce((sum, s) => sum + s.userCount, 0);

  const filtered = roles.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.description ?? "").toLowerCase().includes(search.toLowerCase()),
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createName.trim()) return;
    setCreating(true);
    try {
      await roleService.create(
        createName.trim(),
        createDesc.trim() || undefined,
      );
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
      await roleService.update(id, {
        name: editName.trim(),
        description: editDesc.trim() || undefined,
      });
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
    <div>
      <AdminPageHeader
        title={t("admin.roles")}
        description={t("admin.rolesCount", { n: roles.length })}
        actions={
          <button className="ds-btn-primary" onClick={() => setShowCreate(true)}>
            {t("admin.createRole")}
          </button>
        }
      />

      {/* Stats */}
      <div className="mb-6">
        <AdminStatGrid cols={3}>
          <AdminStat label={t("admin.roleStatTotal")} value={roles.length} accent />
          <AdminStat label={t("admin.roleStatAssigned")} value={totalAssignments} />
          <AdminStat
            label={t("admin.roleStatSystem")}
            value={roles.filter((r) => SYSTEM_ROLES.includes(r.name)).length}
          />
        </AdminStatGrid>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          className="ds-input max-w-sm"
          placeholder={t("admin.searchRoles")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Create modal */}
      {showCreate && (
        <div
          className="ds-modal-overlay"
          onClick={() => setShowCreate(false)}
        >
          <div
            className="ds-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[15px] font-semibold text-[var(--text-primary)] mb-4">
              {t("admin.createRole")}
            </h3>
            <form className="flex flex-col gap-3" onSubmit={handleCreate}>
              <input
                className="ds-input"
                placeholder={t("admin.roleNamePlaceholder")}
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
              />
              <input
                className="ds-input"
                placeholder={t("admin.roleDescPlaceholder")}
                value={createDesc}
                onChange={(e) => setCreateDesc(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  className="ds-btn-secondary"
                  type="button"
                  onClick={() => setShowCreate(false)}
                >
                  {t("common.cancel")}
                </button>
                <button
                  className="ds-btn-primary"
                  disabled={creating || !createName.trim()}
                  type="submit"
                >
                  {t("admin.create")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Roles list */}
      <AdminPanel compact>
        {loading ? (
          <div className="p-6">
            <AdminLoadingSkeleton rows={4} />
          </div>
        ) : filtered.length === 0 ? (
          <AdminEmptyState
            title={t("admin.noRoles")}
            description={t("admin.noRolesHint")}
          />
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {filtered.map((r) => {
              const isSystem = SYSTEM_ROLES.includes(r.name);
              const isEditing = editId === r.id;
              const isExpanded = expandedId === r.id;
              const userCount = getUserCount(r.id);
              const color = getRoleColor(r.name);

              return (
                <div key={r.id} className="px-5 py-3.5 hover:bg-[var(--bg-hover)] transition-colors">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                      style={{ background: color }}
                    >
                      {r.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            className="ds-input !py-1.5 flex-1"
                            placeholder={t("admin.roleNamePlaceholder")}
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                          />
                          <input
                            className="ds-input !py-1.5 flex-1"
                            placeholder={t("admin.roleDescPlaceholder")}
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                          />
                          <button
                            className="ds-btn-icon !text-[var(--color-success)]"
                            title={t("common.save")}
                            onClick={() => handleUpdate(r.id)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                              <path d="M22 4L12 14.01l-3-3" />
                            </svg>
                          </button>
                          <button
                            className="ds-btn-icon"
                            title={t("common.cancel")}
                            onClick={() => setEditId(null)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24">
                              <line x1="18" x2="6" y1="6" y2="18" />
                              <line x1="6" x2="18" y1="6" y2="18" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <button
                              className="text-[13px] font-medium text-[var(--text-primary)] hover:underline text-left"
                              onClick={() => toggleExpand(r.id)}
                            >
                              {r.name}
                            </button>
                            {isSystem && (
                              <span className="admin-badge admin-badge-warning">
                                {t("admin.systemBadge")}
                              </span>
                            )}
                          </div>
                          {r.description && (
                            <p className="text-[11px] text-[var(--text-muted)] truncate">
                              {r.description}
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    {!isEditing && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors px-2 py-1 rounded hover:bg-[var(--bg-hover)]"
                          onClick={() => toggleExpand(r.id)}
                        >
                          {userCount} {t("admin.roleUsers")}
                        </button>
                        <span className="text-[10px] text-[var(--text-muted)]">
                          {relativeTime(r.created_at)}
                        </span>
                        {!isSystem && (
                          <>
                            {confirmDeleteId === r.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  className="ds-btn-danger !px-2.5 !py-1 !text-[10px]"
                                  onClick={() => handleDelete(r.id)}
                                >
                                  {t("common.delete")}
                                </button>
                                <button
                                  className="ds-btn-ghost !px-2.5 !py-1 !text-[10px]"
                                  onClick={() => setConfirmDeleteId(null)}
                                >
                                  {t("common.cancel")}
                                </button>
                              </div>
                            ) : (
                              <>
                                <button
                                  className="ds-btn-icon !w-7 !h-7"
                                  title={t("admin.editRole")}
                                  onClick={() => {
                                    setEditId(r.id);
                                    setEditName(r.name);
                                    setEditDesc(r.description ?? "");
                                  }}
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                                  </svg>
                                </button>
                                <button
                                  className="ds-btn-icon !w-7 !h-7 hover:!text-[var(--color-danger)]"
                                  title={t("admin.deleteRole")}
                                  onClick={() => setConfirmDeleteId(r.id)}
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                  </svg>
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {isExpanded && (
                    <div className="mt-3 ml-11 border-l-2 border-[var(--border-default)] pl-4">
                      {loadingUsers ? (
                        <div className="py-4">
                          <AdminLoadingSkeleton rows={2} />
                        </div>
                      ) : expandedUsers.length === 0 ? (
                        <p className="text-[11px] text-[var(--text-muted)] py-2">
                          {t("admin.roleNoUsers")}
                        </p>
                      ) : (
                        <div className="space-y-2 py-1">
                          {expandedUsers.map((u) => (
                            <div key={u.user_id} className="flex items-center gap-3 group">
                              <div className="w-6 h-6 rounded-full bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] text-[9px] font-bold shrink-0">
                                {u.avatar_url ? (
                                  <img alt="" className="w-full h-full rounded-full object-cover" src={u.avatar_url} />
                                ) : (
                                  (u.full_name ?? u.email).charAt(0).toUpperCase()
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-medium text-[var(--text-primary)] truncate">
                                  {u.full_name ?? u.email}
                                </p>
                                <p className="text-[10px] text-[var(--text-muted)] truncate">
                                  {u.email}
                                </p>
                              </div>
                              {!isSystem && (
                                <button
                                  className="text-[10px] text-[var(--color-danger)] opacity-0 group-hover:opacity-100 transition-all"
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
      </AdminPanel>
    </div>
  );
}
