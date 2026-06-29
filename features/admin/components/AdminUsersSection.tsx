import { useEffect, useState } from "react";
import { userService } from "@/services/userService";
import { roleService } from "@/services/roleService";
import type { UserWithProfile, Role } from "@/types/auth";
import { SectionHeader, Card, Spinner, EmptyState, IconBtn, SearchInput, Badge, Icons, relativeTime } from "./AdminShared";
import { Avatar } from "./AdminDashboard";
import { AdminUserModal } from "./AdminUserModal";

export function AdminUsers() {
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserWithProfile | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const [u, r] = await Promise.all([userService.list(), roleService.list()]);
      setUsers(u); setRoles(r);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return !q || u.email.toLowerCase().includes(q) || (u.profile?.full_name ?? "").toLowerCase().includes(q);
  });

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este usuario? Esta acción es irreversible.")) return;
    try { await userService.delete(id); await load(); } catch {}
  };

  const handleSaveName = async (id: string) => {
    try { await userService.updateProfile(id, { full_name: editName }); setEditId(null); await load(); } catch {}
  };

  const handleAssignRole = async (userId: string, roleId: number) => {
    try { await roleService.assign(userId, roleId); await load(); } catch {}
  };

  const handleRemoveRole = async (userId: string, roleId: number) => {
    try { await roleService.remove(userId, roleId); await load(); } catch {}
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader title="Usuarios" desc={`${users.length} usuario${users.length !== 1 ? "s" : ""} registrados`} />

      <SearchInput value={search} onChange={setSearch} placeholder="Buscar por nombre o email…" />

      <Card>
        {loading ? <Spinner /> : filtered.length === 0 ? (
          <EmptyState text={search ? "Sin resultados" : "Sin usuarios"} />
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((u) => (
              <div key={u.id} className="flex items-center gap-3 px-5 py-3.5">
                <Avatar name={u.profile?.full_name ?? u.email} />
                <div className="flex-1 min-w-0">
                  {editId === u.id ? (
                    <div className="flex items-center gap-2">
                      <input value={editName} onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSaveName(u.id); if (e.key === "Escape") setEditId(null); }}
                        className="text-sm px-2 py-1 rounded-lg border border-blue-500 bg-transparent text-[#1d1d1f] dark:text-white focus:outline-none" autoFocus />
                      <button onClick={() => handleSaveName(u.id)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Guardar</button>
                      <button onClick={() => setEditId(null)} className="text-xs text-[#6e6e73] hover:underline">Cancelar</button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-[#1d1d1f] dark:text-white truncate">{u.profile?.full_name ?? "Sin nombre"}</p>
                      <button onClick={() => { setEditId(u.id); setEditName(u.profile?.full_name ?? ""); }} className="opacity-0 group-hover:opacity-100 text-[#aeaeb2] hover:text-blue-500 transition-colors">
                        {Icons.edit}
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">{u.email}</p>
                </div>

                {/* Roles */}
                <div className="flex gap-1.5 flex-wrap justify-end items-center">
                  {u.roles.map((r) => (
                    <button key={r.id} onClick={() => handleRemoveRole(u.id, r.id)} title="Quitar rol"
                      className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-medium hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                      {r.name} ×
                    </button>
                  ))}
                  <select onChange={(e) => { if (e.target.value) handleAssignRole(u.id, Number(e.target.value)); e.target.value = ""; }} defaultValue=""
                    className="text-xs px-2 py-0.5 rounded-full border border-black/12 dark:border-white/12 bg-transparent text-[#6e6e73] dark:text-[#86868b] cursor-pointer">
                    <option value="" disabled>+ rol</option>
                    {roles.filter((r) => !u.roles.some((ur) => ur.id === r.id)).map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
                </div>

                {u.profile?.created_at && (
                  <span className="text-xs text-[#aeaeb2] dark:text-[#636366] shrink-0 hidden sm:block">{relativeTime(u.profile.created_at)}</span>
                )}

                <IconBtn onClick={() => setSelectedUser(u)} title="Ver usuario" icon={
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"/>
                    <circle cx="8" cy="8" r="2"/>
                  </svg>
                } />
                <IconBtn onClick={() => handleDelete(u.id)} title="Eliminar usuario" icon={Icons.trash} danger />
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className="text-xs text-[#aeaeb2] dark:text-[#636366] text-center">
        Mostrando {filtered.length} de {users.length} usuarios
      </div>

      {selectedUser && (
        <AdminUserModal
          user={selectedUser}
          open={!!selectedUser}
          onClose={() => { setSelectedUser(null); load(); }}
        />
      )}
    </div>
  );
}
