import { useEffect, useState } from "react";

import { useT } from "@/hooks/useT";
import { adminService, AdminApiKey } from "@/services/adminService";
import { apiFetch } from "@/services/apiClient";

// ── Create modal ───────────────────────────────────────────────────────────────

function CreateModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (key: AdminApiKey & { raw_key?: string }) => void;
}) {
  const { t } = useT();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError(t("admin.apiKeyNameRequired"));

      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await apiFetch<AdminApiKey & { raw_key?: string }>(
        "/api/api-keys",
        {
          method: "POST",
          body: JSON.stringify({ name: name.trim() }),
        },
      );

      onCreated(result);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t("admin.apiKeyGenerateError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white dark:bg-[#111116] rounded-2xl shadow-2xl overflow-hidden border border-black/8 dark:border-white/8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-black/8 dark:border-white/8">
          <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
            {t("admin.apiKeyGenerated")}
          </h3>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/8 dark:hover:bg-white/8 text-[#6e6e73]"
            onClick={onClose}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 16 16"
            >
              <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <form className="px-5 py-4 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-medium text-[#6e6e73] mb-1.5">
              {t("admin.apiKeyName")} <span className="text-red-500">*</span>
            </label>
            <input
              autoFocus
              className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder={t("admin.apiKeyNamePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex gap-2">
            <button
              className="flex-1 py-2 rounded-xl border border-black/12 dark:border-white/12 text-sm text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
              type="button"
              onClick={onClose}
            >
              {t("common.cancel")}
            </button>
            <button
              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium disabled:opacity-50 shadow-md shadow-cyan-500/20"
              disabled={loading}
              type="submit"
            >
              {loading
                ? t("admin.apiKeyGenerating")
                : t("admin.apiKeyGenerateBtn")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Reveal modal ──────────────────────────────────────────────────────────────

function RevealModal({
  rawKey,
  onClose,
}: {
  rawKey: string;
  onClose: () => void;
}) {
  const { t } = useT();
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(rawKey).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#111116] rounded-2xl shadow-2xl overflow-hidden border border-black/8 dark:border-white/8">
        <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
        <div className="px-5 pt-5 pb-4 border-b border-black/8 dark:border-white/8">
          <div className="flex items-center gap-3 mb-1">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 16 16"
              >
                <path
                  d="M13.5 4.5L6 12 2.5 8.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
              {t("admin.apiKeyGenerated")}
            </h3>
          </div>
          <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
            {t("admin.apiKeyCopyWarning")}
          </p>
        </div>
        <div className="px-5 py-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 rounded-xl px-3 py-2.5">
            <code className="flex-1 text-xs font-mono text-[#1d1d1f] dark:text-white break-all">
              {rawKey}
            </code>
            <button
              className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors ${copied ? "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600" : "bg-black/8 dark:bg-white/10 text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white"}`}
              onClick={copy}
            >
              {copied ? t("admin.apiKeyCopied") : t("admin.apiKeyCopy")}
            </button>
          </div>
          <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
            <svg
              className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              viewBox="0 0 16 16"
            >
              <path d="M8 1L1.5 13.5h13L8 1z" />
              <path d="M8 6v3.5M8 11v.5" />
            </svg>
            <p className="text-xs text-amber-700 dark:text-amber-400">
              {t("admin.apiKeySafeWarning")}
            </p>
          </div>
          <button
            className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium shadow-md shadow-cyan-500/20"
            onClick={onClose}
          >
            {t("admin.apiKeyUnderstood")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export function AdminApiKeysSection() {
  const { t } = useT();
  const [keys, setKeys] = useState<AdminApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "revoked">("all");
  const [showCreate, setShowCreate] = useState(false);
  const [rawKey, setRawKey] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  function toggleReveal(id: string) {
    setRevealed((prev) => {
      const next = new Set(prev);

      next.has(id) ? next.delete(id) : next.add(id);

      return next;
    });
  }

  function copyPrefix(id: string, prefix: string) {
    navigator.clipboard.writeText(prefix).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  const load = async () => {
    setLoading(true);
    try {
      setKeys(await adminService.listApiKeys());
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = keys.filter((k) => {
    if (filter === "active" && !k.is_active) return false;
    if (filter === "revoked" && k.is_active) return false;
    if (search) {
      const q = search.toLowerCase();

      return (
        k.name.toLowerCase().includes(q) ||
        (k.profiles?.full_name ?? "").toLowerCase().includes(q)
      );
    }

    return true;
  });

  const handleRevoke = async (id: string) => {
    try {
      const updated = await adminService.revokeApiKey(id);

      setKeys((ks) => ks.map((k) => (k.id === id ? { ...k, ...updated } : k)));
    } catch {}
  };

  const handleDelete = async (id: string) => {
    setConfirmDeleteId(null);
    try {
      await adminService.deleteApiKey(id);
      setKeys((ks) => ks.filter((k) => k.id !== id));
    } catch {}
  };

  function handleCreated(key: AdminApiKey & { raw_key?: string }) {
    setShowCreate(false);
    setKeys((ks) => [key, ...ks]);
    if (key.raw_key) setRawKey(key.raw_key);
  }

  const active = keys.filter((k) => k.is_active).length;

  return (
    <div className="relative flex flex-col gap-6">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-cyan-500/8 to-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-20 w-56 h-56 rounded-full bg-gradient-to-br from-blue-500/6 to-indigo-500/4 blur-3xl pointer-events-none" />

      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6e6e73] dark:text-[#86868b] mb-1">Seguridad</p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
          {t("admin.apiKeysTitle")}
        </h1>
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">{t("admin.apiKeysCount", { total: keys.length, active })}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: t("admin.apiKeyFilterAll"), value: keys.length, gradient: "from-cyan-500 to-blue-500", icon: "total" },
          { label: t("admin.apiKeyFilterActive"), value: active, gradient: "from-emerald-500 to-teal-500", icon: "active" },
          { label: t("admin.apiKeyFilterRevoked"), value: keys.length - active, gradient: "from-red-500 to-rose-500", icon: "revoked" },
        ].map((s) => (
          <div key={s.label} className="relative rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/8 dark:hover:shadow-black/30 hover:border-black/15 dark:hover:border-white/15 group">
            <div className={`h-1 bg-gradient-to-r ${s.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />
            <div className="p-4 relative">
              <div className={`absolute -bottom-5 -right-5 w-20 h-20 rounded-full bg-gradient-to-br ${s.gradient} opacity-10 blur-2xl`} />
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white shadow-lg shrink-0`}>
                  {s.icon === "total" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
                  ) : s.icon === "active" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
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

      {/* Search + Create + Filters */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2] dark:text-[#636366]" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all"
              placeholder={t("admin.searchApiKey")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-md shadow-cyan-500/20"
            onClick={() => setShowCreate(true)}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 16 16">
              <path d="M8 2v12M2 8h12" />
            </svg>
            {t("admin.apiKeyGenerate")}
          </button>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {(["all", "active", "revoked"] as const).map((f) => (
            <button
              key={f}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === f
                  ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-md"
                  : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white bg-black/5 dark:bg-white/5"
              }`}
              onClick={() => setFilter(f)}
            >
              {t(`admin.apiKeyFilter${f.charAt(0).toUpperCase() + f.slice(1)}`)}
            </button>
          ))}
        </div>
      </div>

      {/* API Keys list */}
      <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
        <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
        {loading ? (
          <div className="p-10 flex justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-cyan-500/30 border-t-cyan-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-[#6e6e73] dark:text-[#86868b]">
            {search ? t("admin.apiKeyNoKeysSearch") : t("admin.apiKeyNoKeysHint")}
          </div>
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((k) => (
              <div key={k.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md ${k.is_active ? "bg-gradient-to-br from-cyan-500 to-blue-500 text-white" : "bg-black/5 dark:bg-white/8 text-[#aeaeb2]"}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">
                      {k.name}
                    </p>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${k.is_active ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400" : "bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400"}`}>
                      {k.is_active ? t("admin.apiKeyBadgeActive") : t("admin.apiKeyBadgeRevoked")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <code className="text-xs font-mono text-[#6e6e73] dark:text-[#86868b] bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                      {revealed.has(k.id)
                        ? k.key_prefix
                        : `${k.key_prefix.slice(0, 6)}••••••••`}
                    </code>
                    {revealed.has(k.id) && (
                      <button
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded transition-colors ${copied === k.id ? "text-emerald-600 dark:text-emerald-400" : "text-[#aeaeb2] hover:text-[#6e6e73] dark:hover:text-[#86868b]"}`}
                        onClick={() => copyPrefix(k.id, k.key_prefix)}
                      >
                        {copied === k.id
                          ? t("admin.apiKeyCopiedPrefix")
                          : t("admin.apiKeyCopyPrefix")}
                      </button>
                    )}
                    <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                      {k.profiles?.full_name ?? t("admin.apiKeyOwner")}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                    {t("admin.apiKeyCreated", {
                      time: relativeTime(k.created_at),
                    })}
                  </p>
                  {k.last_used_at ? (
                    <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                      {t("admin.apiKeyUsed", {
                        time: relativeTime(k.last_used_at),
                      })}
                    </p>
                  ) : (
                    <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                      {t("admin.apiKeyNoUsage")}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    className="p-2 rounded-lg text-[#aeaeb2] dark:text-[#636366] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                    title={revealed.has(k.id) ? t("admin.apiKeyHide") : t("admin.apiKeyReveal")}
                    onClick={() => toggleReveal(k.id)}
                  >
                    {revealed.has(k.id) ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 14 14">
                        <path d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4z" />
                        <circle cx="7" cy="7" r="1.5" />
                        <path d="M1 1l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 14 14">
                        <path d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4z" />
                        <circle cx="7" cy="7" r="1.5" />
                      </svg>
                    )}
                  </button>
                  {k.is_active && (
                    <button
                      className="p-2 rounded-lg text-[#aeaeb2] dark:text-[#636366] hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all"
                      title={t("admin.apiKeyRevoke")}
                      onClick={() => handleRevoke(k.id)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                    </button>
                  )}
                  {confirmDeleteId === k.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        className="px-2.5 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold transition-colors"
                        onClick={() => handleDelete(k.id)}
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
                    <button
                      className="p-2 rounded-lg text-[#aeaeb2] dark:text-[#636366] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                      title="Eliminar"
                      onClick={() => setConfirmDeleteId(k.id)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreate && (
        <CreateModal
          onClose={() => setShowCreate(false)}
          onCreated={handleCreated}
        />
      )}
      {rawKey && (
        <RevealModal rawKey={rawKey} onClose={() => setRawKey(null)} />
      )}
    </div>
  );
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
