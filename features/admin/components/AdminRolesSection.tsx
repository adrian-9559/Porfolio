import type { Role } from "@/types/auth";

import { useEffect, useState } from "react";
import { useT } from "@/hooks/useT";

import {
  SectionHeader,
  Card,
  Spinner,
  EmptyState,
  IconBtn,
  Input,
  Btn,
  Icons,
} from "./AdminShared";

import { roleService } from "@/services/roleService";

export function AdminRoles() {
  const { t } = useT();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [creating, setCreating] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      setRoles(await roleService.list());
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true);
    try {
      await roleService.create(newName.trim(), newDesc.trim() || undefined);
      setNewName("");
      setNewDesc("");
      await load();
    } catch {}
    setCreating(false);
  };

  const handleDelete = async (id: number) => {
    setConfirmDeleteId(null);
    try {
      await roleService.delete(id);
      await load();
    } catch {}
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

  const systemRoles = ["admin", "editor", "user"];

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        desc={t("admin.rolesCount", { n: roles.length })}
        title={t("admin.roles")}
      />

      <Card className="px-5 py-5">
        <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-4">
          {t("admin.createRole")}
        </h3>
        <form className="flex gap-3" onSubmit={handleCreate}>
          <Input
            placeholder={t("admin.roleNamePlaceholder")}
            value={newName}
            onChange={setNewName}
          />
          <Input
            placeholder={t("admin.roleDescPlaceholder")}
            value={newDesc}
            onChange={setNewDesc}
          />
          <Btn disabled={creating || !newName.trim()} type="submit">
            {t("admin.create")}
          </Btn>
        </form>
      </Card>

      <Card>
        {loading ? (
          <Spinner />
        ) : roles.length === 0 ? (
          <EmptyState sub={t("admin.noRolesHint")} text={t("admin.noRoles")} />
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {roles.map((r) => {
              const isSystem = systemRoles.includes(r.name);

              return (
                <div key={r.id} className="flex items-center gap-3 px-5 py-3.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <svg
                      fill="none"
                      height="16"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 16 16"
                      width="16"
                    >
                      <path d="M8 1.5L2 4v3c0 3 2.5 5.5 6 6.5 3.5-1 6-3.5 6-6.5V4L8 1.5z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">
                        {r.name}
                      </p>
                      {isSystem && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 font-medium">
                          {t("admin.systemBadge")}
                        </span>
                      )}
                    </div>
                    {r.description && (
                      <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                        {r.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                    ID: {r.id}
                  </span>
                  {!isSystem && (
                    <>
                      {confirmDeleteId === r.id ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-[#6e6e73]">{t("admin.deleteRoleConfirm")}</span>
                          <button
                            className="px-2 py-1 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 transition-colors"
                            onClick={() => handleDelete(r.id)}
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
                        <IconBtn
                          danger
                          icon={Icons.trash}
                          title={t("admin.deleteRole")}
                          onClick={() => setConfirmDeleteId(r.id)}
                        />
                      )}
                    </>
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
