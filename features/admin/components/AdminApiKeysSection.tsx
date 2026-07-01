import { useEffect, useState } from "react";
import { useT } from "@/hooks/useT";

import {
  SectionHeader,
  Card,
  Spinner,
  EmptyState,
  IconBtn,
  SearchInput,
  Badge,
  Icons,
  relativeTime,
} from "./AdminShared";

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
        "/api-keys",
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
        className="w-full max-w-sm bg-white dark:bg-[#111116] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
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
              className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="flex-1 py-2 rounded-xl bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-sm font-medium disabled:opacity-50"
              disabled={loading}
              type="submit"
            >
              {loading ? t("admin.apiKeyGenerating") : t("admin.apiKeyGenerateBtn")}
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
      <div className="w-full max-w-md bg-white dark:bg-[#111116] rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-4 border-b border-black/8 dark:border-white/8">
          <div className="flex items-center gap-3 mb-1">
            <span className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600">
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
            className="w-full py-2 rounded-xl bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-sm font-medium"
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
    <div className="flex flex-col gap-5">
      <SectionHeader
        action={
          <button
            className="flex items-center gap-2 bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-sm font-medium px-4 py-2 rounded-xl hover:opacity-80 transition-opacity"
            onClick={() => setShowCreate(true)}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              viewBox="0 0 16 16"
            >
              <path d="M8 2v12M2 8h12" />
            </svg>
            {t("admin.apiKeyGenerate")}
          </button>
        }
        desc={t("admin.apiKeysCount", { total: keys.length, active })}
        title={t("admin.apiKeysTitle")}
      />

      <div className="flex gap-2 flex-wrap items-center">
        <div className="flex-1">
          <SearchInput
            placeholder={t("admin.searchApiKey")}
            value={search}
            onChange={setSearch}
          />
        </div>
        <div className="flex gap-1">
          {(["all", "active", "revoked"] as const).map((f) => (
            <button
              key={f}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "border border-black/12 dark:border-white/12 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
              }`}
              onClick={() => setFilter(f)}
            >
              {t(`admin.apiKeyFilter${f.charAt(0).toUpperCase() + f.slice(1)}`)}
            </button>
          ))}
        </div>
      </div>

      <Card>
        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <EmptyState
            sub={search ? t("admin.apiKeyNoKeysSearch") : t("admin.apiKeyNoKeysHint")}
            text={t("admin.apiKeyNoKeys")}
          />
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((k) => (
              <div key={k.id} className="flex items-center gap-3 px-5 py-3.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${k.is_active ? "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400" : "bg-black/5 dark:bg-white/8 text-[#aeaeb2]"}`}
                >
                  {Icons.key}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">
                      {k.name}
                    </p>
                    <Badge
                      color={k.is_active ? "green" : "red"}
                      label={k.is_active ? t("admin.apiKeyBadgeActive") : t("admin.apiKeyBadgeRevoked")}
                    />
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
                        {copied === k.id ? t("admin.apiKeyCopiedPrefix") : t("admin.apiKeyCopyPrefix")}
                      </button>
                    )}
                    <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                      {k.profiles?.full_name ?? t("admin.apiKeyOwner")}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                    {t("admin.apiKeyCreated", { time: relativeTime(k.created_at) })}
                  </p>
                  {k.last_used_at ? (
                    <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                      {t("admin.apiKeyUsed", { time: relativeTime(k.last_used_at) })}
                    </p>
                  ) : (
                    <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                      {t("admin.apiKeyNoUsage")}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  <IconBtn
                    icon={
                      revealed.has(k.id) ? (
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          viewBox="0 0 14 14"
                        >
                          <path d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4z" />
                          <circle cx="7" cy="7" r="1.5" />
                          <path d="M1 1l12 12" />
                        </svg>
                      ) : (
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          viewBox="0 0 14 14"
                        >
                          <path d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4z" />
                          <circle cx="7" cy="7" r="1.5" />
                        </svg>
                      )
                    }
                    title={revealed.has(k.id) ? t("admin.apiKeyHide") : t("admin.apiKeyReveal")}
                    onClick={() => toggleReveal(k.id)}
                  />
                  {k.is_active && (
                    <IconBtn
                      icon={Icons.ban}
                      title={t("admin.apiKeyRevoke")}
                      onClick={() => handleRevoke(k.id)}
                    />
                  )}
                  <IconBtn
                    danger
                    icon={Icons.trash}
                    title="Eliminar"
                    onClick={() => handleDelete(k.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

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
