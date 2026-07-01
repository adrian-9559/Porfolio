import type { UserWithProfile, Role } from "@/types/auth";

import { useEffect, useState } from "react";
import { useT } from "@/hooks/useT";

import {
  SectionHeader,
  Card,
  Spinner,
  EmptyState,
  IconBtn,
  SearchInput,
  Icons,
  relativeTime,
} from "./AdminShared";
import { Avatar } from "./AdminDashboard";
import { AdminUserModal } from "./AdminUserModal";

import { roleService } from "@/services/roleService";
import { userService } from "@/services/userService";

export function AdminUsers() {
  const { t } = useT();
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserWithProfile | null>(
    null,
  );
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const load = async () => {
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
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();

    return (
      !q ||
      u.email.toLowerCase().includes(q) ||
      (u.profile?.full_name ?? "").toLowerCase().includes(q)
    );
  });

  const handleDelete = async (id: string) => {
    setConfirmDeleteId(null);
    try {
      await userService.delete(id);
      await load();
    } catch {}
  };

  const handleSaveName = async (id: string) => {
    try {
      await userService.updateProfile(id, { full_name: editName });
      setEditId(null);
      await load();
    } catch {}
  };

  const handleAssignRole = async (userId: string, roleId: number) => {
    try {
      await roleService.assign(userId, roleId);
      await load();
    } catch {}
  };

  const handleRemoveRole = async (userId: string, roleId: number) => {
    try {
      await roleService.remove(userId, roleId);
      await load();
    } catch {}
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        desc={t("admin.usersCount", { n: users.length, s: users.length !== 1 ? "s" : "" })}
        title={t("admin.users")}
      />

      <SearchInput
        placeholder={t("admin.searchByName")}
        value={search}
        onChange={setSearch}
      />

      <Card>
        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <EmptyState text={search ? t("common.noResults") : t("admin.noUsers")} />
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((u) => (
              <div key={u.id} className="flex items-center gap-3 px-5 py-3.5">
                <Avatar name={u.profile?.full_name ?? u.email} />
                <div className="flex-1 min-w-0">
                  {editId === u.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        autoFocus
                        className="text-sm px-2 py-1 rounded-lg border border-blue-500 bg-transparent text-[#1d1d1f] dark:text-white focus:outline-none"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveName(u.id);
                          if (e.key === "Escape") setEditId(null);
                        }}
                      />
                      <button
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        onClick={() => handleSaveName(u.id)}
                      >
                        {t("admin.saveUser")}
                      </button>
                      <button
                        className="text-xs text-[#6e6e73] hover:underline"
                        onClick={() => setEditId(null)}
                      >
                        {t("admin.cancel")}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-[#1d1d1f] dark:text-white truncate">
                        {u.profile?.full_name ?? t("admin.noName")}
                      </p>
                      <button
                        className="opacity-0 group-hover:opacity-100 text-[#aeaeb2] hover:text-blue-500 transition-colors"
                        onClick={() => {
                          setEditId(u.id);
                          setEditName(u.profile?.full_name ?? "");
                        }}
                      >
                        {Icons.edit}
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">
                    {u.email}
                  </p>
                </div>

                <div className="flex gap-1.5 flex-wrap justify-end items-center">
                  {u.roles.map((r) => (
                    <button
                      key={r.id}
                      className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-medium hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      title={t("admin.removeRole")}
                      onClick={() => handleRemoveRole(u.id, r.id)}
                    >
                      {r.name} ×
                    </button>
                  ))}
                  <select
                    className="text-xs px-2 py-0.5 rounded-full border border-black/12 dark:border-white/12 bg-transparent text-[#6e6e73] dark:text-[#86868b] cursor-pointer"
                    defaultValue=""
                    onChange={(e) => {
                      if (e.target.value)
                        handleAssignRole(u.id, Number(e.target.value));
                      e.target.value = "";
                    }}
                  >
                    <option disabled value="">
                      {t("admin.addRole")}
                    </option>
                    {roles
                      .filter((r) => !u.roles.some((ur) => ur.id === r.id))
                      .map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                  </select>
                </div>

                {u.profile?.created_at && (
                  <span className="text-xs text-[#aeaeb2] dark:text-[#636366] shrink-0 hidden sm:block">
                    {relativeTime(u.profile.created_at)}
                  </span>
                )}

                {confirmDeleteId === u.id ? (
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-[#6e6e73]">{t("admin.deleteUserConfirm")}</span>
                    <button
                      className="px-2 py-1 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 transition-colors"
                      onClick={() => handleDelete(u.id)}
                    >
                      {t("common.delete")}
                    </button>
                    <button
                      className="px-2 py-1 rounded-lg text-xs font-medium bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
                      onClick={() => setConfirmDeleteId(null)}
                    >
                      {t("common.cancel")}
                    </button>
                  </div>
                ) : (
                  <>
                    <IconBtn
                      icon={
                        <svg
                          fill="none"
                          height="16"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          viewBox="0 0 16 16"
                          width="16"
                        >
                          <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" />
                          <circle cx="8" cy="8" r="2" />
                        </svg>
                      }
                      title={t("admin.viewUser")}
                      onClick={() => setSelectedUser(u)}
                    />
                    <IconBtn
                      danger
                      icon={Icons.trash}
                      title={t("admin.deleteUser")}
                      onClick={() => setConfirmDeleteId(u.id)}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className="text-xs text-[#aeaeb2] dark:text-[#636366] text-center">
        {t("admin.showingOf", { filtered: filtered.length, total: users.length })}
      </div>

      {selectedUser && (
        <AdminUserModal
          open={!!selectedUser}
          user={selectedUser}
          onClose={() => {
            setSelectedUser(null);
            load();
          }}
        />
      )}
    </div>
  );
}
