import { useEffect, useState } from "react";
import { adminService, AdminApiKey } from "@/services/adminService";
import { SectionHeader, Card, Spinner, EmptyState, IconBtn, SearchInput, Badge, Btn, Icons, relativeTime } from "./AdminShared";

export function AdminApiKeysSection() {
  const [keys, setKeys] = useState<AdminApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "revoked">("all");

  const load = async () => {
    setLoading(true);
    try { setKeys(await adminService.listApiKeys()); } catch {}
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const filtered = keys.filter((k) => {
    if (filter === "active" && !k.is_active) return false;
    if (filter === "revoked" && k.is_active) return false;
    if (search) {
      const q = search.toLowerCase();
      return k.name.toLowerCase().includes(q) || (k.profiles?.full_name ?? "").toLowerCase().includes(q);
    }
    return true;
  });

  const handleRevoke = async (id: string) => {
    if (!confirm("¿Revocar esta API Key?")) return;
    try {
      const updated = await adminService.revokeApiKey(id);
      setKeys((ks) => ks.map((k) => k.id === id ? { ...k, ...updated } : k));
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar esta API Key?")) return;
    try { await adminService.deleteApiKey(id); setKeys((ks) => ks.filter((k) => k.id !== id)); } catch {}
  };

  const active = keys.filter((k) => k.is_active).length;

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader title="API Keys" desc={`${keys.length} total · ${active} activas`} />

      <div className="flex gap-2 flex-wrap items-center">
        <div className="flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="Buscar por nombre o propietario…" />
        </div>
        <div className="flex gap-1">
          {(["all", "active", "revoked"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${filter === f
                ? "bg-blue-600 text-white"
                : "border border-black/12 dark:border-white/12 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
              }`}>
              {f === "all" ? "Todas" : f === "active" ? "Activas" : "Revocadas"}
            </button>
          ))}
        </div>
      </div>

      <Card>
        {loading ? <Spinner /> : filtered.length === 0 ? (
          <EmptyState text="Sin API Keys" sub={search ? "Sin resultados" : "Ningún usuario tiene API Keys"} />
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((k) => (
              <div key={k.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${k.is_active ? "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400" : "bg-black/5 dark:bg-white/8 text-[#aeaeb2]"}`}>
                  {Icons.key}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">{k.name}</p>
                    <Badge label={k.is_active ? "Activa" : "Revocada"} color={k.is_active ? "green" : "red"} />
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <code className="text-xs font-mono text-[#6e6e73] dark:text-[#86868b] bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded">{k.key_prefix}••••••••</code>
                    <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">{k.profiles?.full_name ?? "Usuario desconocido"}</span>
                  </div>
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">Creada {relativeTime(k.created_at)}</p>
                  {k.last_used_at ? (
                    <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">Usada {relativeTime(k.last_used_at)}</p>
                  ) : (
                    <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">Sin uso</p>
                  )}
                </div>
                <div className="flex gap-1">
                  {k.is_active && (
                    <IconBtn onClick={() => handleRevoke(k.id)} title="Revocar" icon={Icons.ban} />
                  )}
                  <IconBtn onClick={() => handleDelete(k.id)} title="Eliminar" icon={Icons.trash} danger />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
