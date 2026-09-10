import type { UserWithProfile, Role } from "@/types/auth";

import { useEffect, useState, useMemo, useCallback } from "react";

import { AdminUserModal } from "./AdminUserModal";
import {
  AdminPageHeader,
  AdminStatGrid,
  AdminStat,
  AdminPanel,
  AdminEmptyState,
  AdminLoadingSkeleton,
  AdminFilterChip,
} from "./AdminShell";

import { useT } from "@/hooks/useT";
import { roleService } from "@/services/roleService";
import { userService } from "@/services/userService";
import { SearchInput, Badge, IconBtn, Icons } from "./AdminShared";

const PER_PAGE = 10;

export function AdminUsers() {
  const { t } = useT();
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserWithProfile | null>(
    null,
  );
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [u, r] = await Promise.all([
        userService.list(),
        roleService.list(),
      ]);

      setUsers(u);
      setRoles(r);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(() => {
    const total = users.length;
    const admins = users.filter((u) =>
      u.roles.some((r) => r.name === "admin"),
    ).length;
    const confirmed = users.filter((u) => u.email_confirmed).length;
    const unconfirmed = total - confirmed;

    return { total, admins, confirmed, unconfirmed, roles: roles.length };
  }, [users, roles]);

  const filtered = useMemo(() => {
    let result = users;

    if (search) {
      const q = search.toLowerCase();

      result = result.filter(
        (u) =>
          u.email.toLowerCase().includes(q) ||
          u.profile?.full_name?.toLowerCase().includes(q),
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

  useEffect(() => {
    setPage(1);
  }, [search, roleFilter]);

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
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={t("admin.users")}
        description={t("admin.dashboardDesc")}
        actions={
          <button className="ds-btn-primary" onClick={load}>
            {t("admin.refresh")}
          </button>
        }
      />

      <AdminStatGrid cols={4}>
        <AdminStat label={t("admin.userStatsTotal")} value={stats.total} accent />
        <AdminStat label={t("admin.userStatsAdmins")} value={stats.admins} />
        <AdminStat label={t("admin.userStatsConfirmed")} value={stats.confirmed} />
        <AdminStat label={t("admin.userStatsUnconfirmed")} value={stats.unconfirmed} />
      </AdminStatGrid>

      <div className="flex flex-col gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={`${t("admin.tableEmail")} / ${t("admin.tableName")}...`}
        />
        <div className="flex gap-1.5 flex-wrap">
          <AdminFilterChip
            active={roleFilter === null}
            onClick={() => setRoleFilter(null)}
          >
            {t("admin.allRoles")}
          </AdminFilterChip>
          {roles.map((r) => (
            <AdminFilterChip
              key={r.id}
              active={roleFilter === r.name}
              onClick={() => setRoleFilter(roleFilter === r.name ? null : r.name)}
            >
              {r.name}
            </AdminFilterChip>
          ))}
        </div>
      </div>

      <AdminPanel compact>
        {loading ? (
          <div className="p-6">
            <AdminLoadingSkeleton rows={5} />
          </div>
        ) : paginated.length === 0 ? (
          <AdminEmptyState
            title={t("admin.noUsersMatch")}
            description={t("admin.noUsersMatchHint")}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t("admin.tableName")}</th>
                  <th>{t("admin.tableEmail")}</th>
                  <th>{t("admin.tableRoles")}</th>
                  <th className="text-right">{t("admin.tableActions")}</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] text-[11px] font-bold shrink-0">
                          {(u.profile?.full_name ?? u.email)
                            .split(" ")
                            .map((w) => w[0] ?? "")
                            .join("")
                            .slice(0, 2)
                            .toUpperCase() || "?"}
                        </div>
                        <button
                          className="text-[13px] font-medium text-[var(--text-primary)] hover:underline text-left truncate"
                          onClick={() => setSelectedUser(u)}
                        >
                          {u.profile?.full_name ?? "—"}
                        </button>
                      </div>
                    </td>
                    <td>
                      <span className="text-[13px] text-[var(--text-muted)] truncate">
                        {u.email}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 flex-wrap">
                        {u.roles.map((r) => (
                          <span
                            key={r.id}
                            className="group/role inline-flex items-center gap-0.5 admin-badge admin-badge-info"
                          >
                            {r.name}
                            <button
                              className="opacity-0 group-hover/role:opacity-100 transition-opacity text-[var(--accent)] hover:text-[var(--color-danger)] ml-0.5 leading-none"
                              title={t("admin.removeRole")}
                              onClick={() => handleRemoveRole(u.id, r.id)}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                        <select
                          className="text-[10px] font-semibold border border-[var(--border-default)] rounded px-1.5 py-0.5 bg-[var(--bg-card)] text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
                          value=""
                          onChange={(e) => {
                            if (e.target.value)
                              handleAssignRole(u.id, Number(e.target.value));
                          }}
                        >
                          <option value="">+</option>
                          {roles
                            .filter((r) => !u.roles.some((ur) => ur.id === r.id))
                            .map((r) => (
                              <option key={r.id} value={r.id}>
                                {r.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 justify-end">
                        <IconBtn
                          onClick={() => setSelectedUser(u)}
                          title={t("admin.viewUser")}
                          icon={Icons.check}
                        />
                        {confirmDelete === u.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              className="ds-btn-danger !px-2.5 !py-1 !text-[10px]"
                              onClick={() => handleDelete(u.id)}
                            >
                              {t("admin.confirm")}
                            </button>
                            <button
                              className="ds-btn-ghost !px-2.5 !py-1 !text-[10px]"
                              onClick={() => setConfirmDelete(null)}
                            >
                              {t("admin.cancel")}
                            </button>
                          </div>
                        ) : (
                          <IconBtn
                            onClick={() => setConfirmDelete(u.id)}
                            title={t("admin.delete")}
                            icon={Icons.trash}
                            danger
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminPanel>

      {filtered.length > PER_PAGE && (
        <div className="flex items-center justify-between text-[12px] text-[var(--text-muted)]">
          <span>
            {(safePage - 1) * PER_PAGE + 1}–
            {Math.min(safePage * PER_PAGE, filtered.length)} {t("admin.pageOf")}{" "}
            {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              className="ds-btn-ghost !px-3 !py-1.5 !text-[12px]"
              disabled={safePage <= 1}
              onClick={() => setPage(safePage - 1)}
            >
              {t("admin.prev")}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`w-8 h-8 rounded-lg font-semibold text-[12px] transition-all ${p === safePage ? "bg-[var(--accent)] text-[var(--accent-text)]" : "text-[var(--text-muted)] hover:bg-[var(--bg-hover)]"}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className="ds-btn-ghost !px-3 !py-1.5 !text-[12px]"
              disabled={safePage >= totalPages}
              onClick={() => setPage(safePage + 1)}
            >
              {t("admin.next")}
            </button>
          </div>
        </div>
      )}

      {selectedUser && (
        <AdminUserModal
          open={!!selectedUser}
          roles={roles}
          user={selectedUser}
          onAssignRole={handleAssignRole}
          onClose={() => {
            setSelectedUser(null);
            load();
          }}
          onRemoveRole={handleRemoveRole}
        />
      )}
    </div>
  );
}
