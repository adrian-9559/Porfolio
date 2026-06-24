import { useEffect, useState } from "react";
import { roleService } from "@/services/roleService";
import type { Role } from "@/types/auth";
import { SectionHeader, Card, Spinner, EmptyState, IconBtn, Input, Btn, Icons } from "./AdminShared";

export function AdminRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [creating, setCreating] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const load = async () => {
    setLoading(true);
    try { setRoles(await roleService.list()); } catch {}
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true);
    try { await roleService.create(newName.trim(), newDesc.trim() || undefined); setNewName(""); setNewDesc(""); await load(); } catch {}
    setCreating(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este rol?")) return;
    try { await roleService.delete(id); await load(); } catch {}
  };

  const handleUpdate = async (id: number) => {
    if (!editName.trim()) return;
    try {
      await roleService.update(id, { name: editName.trim(), description: editDesc.trim() || undefined });
      setEditId(null);
      await load();
    } catch {}
  };

  const systemRoles = ["admin", "editor", "user"];

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader title="Roles" desc={`${roles.length} roles configurados`} />

      <Card className="px-5 py-5">
        <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-4">Crear nuevo rol</h3>
        <form onSubmit={handleCreate} className="flex gap-3">
          <Input value={newName} onChange={setNewName} placeholder="nombre_rol (ej: moderator)" />
          <Input value={newDesc} onChange={setNewDesc} placeholder="Descripción (opcional)" />
          <Btn type="submit" disabled={creating || !newName.trim()}>Crear</Btn>
        </form>
      </Card>

      <Card>
        {loading ? <Spinner /> : roles.length === 0 ? (
          <EmptyState text="Sin roles" sub="Crea el primer rol arriba" />
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {roles.map((r) => {
              const isSystem = systemRoles.includes(r.name);
              return (
                <div key={r.id} className="flex items-center gap-3 px-5 py-3.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 1.5L2 4v3c0 3 2.5 5.5 6 6.5 3.5-1 6-3.5 6-6.5V4L8 1.5z" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">{r.name}</p>
                      {isSystem && <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 font-medium">sistema</span>}
                    </div>
                    {r.description && <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">{r.description}</p>}
                  </div>
                  <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">ID: {r.id}</span>
                  {!isSystem && (
                    <IconBtn onClick={() => handleDelete(r.id)} title="Eliminar rol" icon={Icons.trash} danger />
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
