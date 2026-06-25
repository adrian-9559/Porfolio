import { useEffect, useState } from "react";
import { adminService, AdminApiKey } from "@/services/adminService";
import { apiFetch } from "@/services/apiClient";
import { SectionHeader, Card, Spinner, EmptyState, IconBtn, SearchInput, Badge, Btn, Icons, relativeTime } from "./AdminShared";

// ── Create modal ───────────────────────────────────────────────────────────────

function CreateModal({ onClose, onCreated }: { onClose: () => void; onCreated: (key: AdminApiKey & { raw_key?: string }) => void }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError("El nombre es obligatorio."); return; }
    setLoading(true); setError(null);
    try {
      const result = await apiFetch<AdminApiKey & { raw_key?: string }>("/api-keys", {
        method: "POST",
        body: JSON.stringify({ name: name.trim() }),
      });
      onCreated(result);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al generar la API Key.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-sm bg-white dark:bg-[#111116] rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-black/8 dark:border-white/8">
          <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white">Generar API Key</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/8 dark:hover:bg-white/8 text-[#6e6e73]">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M3 3l10 10M13 3L3 13" strokeLinecap="round"/></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-5 py-4 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">Nombre de la key <span className="text-red-500">*</span></label>
            <input autoFocus value={name} onChange={e => setName(e.target.value)} placeholder="ej. Acceso producción"
              className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex gap-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2 rounded-xl border border-black/12 dark:border-white/12 text-sm text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2 rounded-xl bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-sm font-medium disabled:opacity-50">
              {loading ? "Generando…" : "Generar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Reveal modal ──────────────────────────────────────────────────────────────

function RevealModal({ rawKey, onClose }: { rawKey: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(rawKey).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#111116] rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-4 border-b border-black/8 dark:border-white/8">
          <div className="flex items-center gap-3 mb-1">
            <span className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M13.5 4.5L6 12 2.5 8.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white">API Key generada</h3>
          </div>
          <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">Cópiala ahora. No podrás volver a verla completa.</p>
        </div>
        <div className="px-5 py-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 rounded-xl px-3 py-2.5">
            <code className="flex-1 text-xs font-mono text-[#1d1d1f] dark:text-white break-all">{rawKey}</code>
            <button onClick={copy}
              className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors ${copied ? "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600" : "bg-black/8 dark:bg-white/10 text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white"}`}>
              {copied ? "✓" : "Copiar"}
            </button>
          </div>
          <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" strokeLinecap="round"><path d="M8 1L1.5 13.5h13L8 1z"/><path d="M8 6v3.5M8 11v.5"/></svg>
            <p className="text-xs text-amber-700 dark:text-amber-400">Guárdala en un lugar seguro. Por seguridad, solo se muestra una vez.</p>
          </div>
          <button onClick={onClose}
            className="w-full py-2 rounded-xl bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-sm font-medium">
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export function AdminApiKeysSection() {
  const [keys, setKeys] = useState<AdminApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "revoked">("all");
  const [showCreate, setShowCreate] = useState(false);
  const [rawKey, setRawKey] = useState<string | null>(null);

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
    try {
      const updated = await adminService.revokeApiKey(id);
      setKeys((ks) => ks.map((k) => k.id === id ? { ...k, ...updated } : k));
    } catch {}
  };

  const handleDelete = async (id: string) => {
    try { await adminService.deleteApiKey(id); setKeys((ks) => ks.filter((k) => k.id !== id)); } catch {}
  };

  function handleCreated(key: AdminApiKey & { raw_key?: string }) {
    setShowCreate(false);
    setKeys((ks) => [key, ...ks]);
    if (key.raw_key) setRawKey(key.raw_key);
  }

  const active = keys.filter((k) => k.is_active).length;

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        title="API Keys"
        desc={`${keys.length} total · ${active} activas`}
        action={
          <button onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-sm font-medium px-4 py-2 rounded-xl hover:opacity-80 transition-opacity">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
              <path d="M8 2v12M2 8h12"/>
            </svg>
            Generar API Key
          </button>
        }
      />

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
          <EmptyState text="Sin API Keys" sub={search ? "Sin resultados" : "Pulsa «Generar API Key» para crear la primera"} />
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((k) => (
              <div key={k.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${k.is_active ? "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400" : "bg-black/5 dark:bg-white/8 text-[#aeaeb2]"}`}>
                  {Icons.key}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">{k.name}</p>
                    <Badge label={k.is_active ? "Activa" : "Revocada"} color={k.is_active ? "green" : "red"} />
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <code className="text-xs font-mono text-[#6e6e73] dark:text-[#86868b] bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded">{k.key_prefix}••••••••</code>
                    <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">{k.profiles?.full_name ?? "Tú (admin)"}</span>
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

      {showCreate && <CreateModal onClose={() => setShowCreate(false)} onCreated={handleCreated} />}
      {rawKey && <RevealModal rawKey={rawKey} onClose={() => setRawKey(null)} />}
    </div>
  );
}
