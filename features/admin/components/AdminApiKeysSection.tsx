import { useEffect, useState } from "react";

import { useT } from "@/hooks/useT";
import { adminService, AdminApiKey } from "@/services/adminService";
import { apiFetch } from "@/services/apiClient";
import { relativeTime } from "./AdminShared";
import {
  AdminPageHeader,
  AdminStatGrid,
  AdminStat,
  AdminPanel,
  AdminEmptyState,
  AdminLoadingSkeleton,
  AdminFilterChip,
} from "./AdminShell";

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
        className="w-full max-w-sm bg-[var(--bg-card)] rounded-2xl shadow-2xl overflow-hidden border border-[var(--border-default)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[var(--border-default)]">
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">
            {t("admin.apiKeyGenerated")}
          </h3>
          <button
            className="ds-btn-icon"
            onClick={onClose}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 16 16">
              <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <form className="px-5 py-4 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
              {t("admin.apiKeyName")} <span className="text-[var(--color-danger)]">*</span>
            </label>
            <input
              autoFocus
              className="ds-input w-full"
              placeholder={t("admin.apiKeyNamePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {error && <p className="text-xs text-[var(--color-danger)]">{error}</p>}
          <div className="flex gap-2">
            <button
              className="ds-btn-secondary flex-1"
              type="button"
              onClick={onClose}
            >
              {t("common.cancel")}
            </button>
            <button
              className="ds-btn-primary flex-1"
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
      <div className="w-full max-w-md bg-[var(--bg-card)] rounded-2xl shadow-2xl overflow-hidden border border-[var(--border-default)]">
        <div className="px-5 pt-5 pb-4 border-b border-[var(--border-default)]">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-success)]/10 flex items-center justify-center text-[var(--color-success)]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 16 16">
                <path d="M13.5 4.5L6 12 2.5 8.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              {t("admin.apiKeyGenerated")}
            </h3>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            {t("admin.apiKeyCopyWarning")}
          </p>
        </div>
        <div className="px-5 py-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 bg-[var(--bg-hover)] rounded-xl px-3 py-2.5">
            <code className="flex-1 text-xs font-mono text-[var(--text-primary)] break-all">
              {rawKey}
            </code>
            <button
              className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors ${copied ? "admin-badge-success" : "bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
              onClick={copy}
            >
              {copied ? t("admin.apiKeyCopied") : t("admin.apiKeyCopy")}
            </button>
          </div>
          <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-[var(--color-warning)]/5 border border-[var(--color-warning)]/20">
            <svg className="w-4 h-4 text-[var(--color-warning)] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 16 16">
              <path d="M8 1L1.5 13.5h13L8 1z" />
              <path d="M8 6v3.5M8 11v.5" />
            </svg>
            <p className="text-xs text-[var(--color-warning)]">
              {t("admin.apiKeySafeWarning")}
            </p>
          </div>
          <button className="ds-btn-primary w-full" onClick={onClose}>
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
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={t("admin.apiKeysTitle")}
        description={t("admin.apiKeysCount", { total: keys.length, active })}
      />

      <AdminStatGrid cols={3}>
        <AdminStat
          label={t("admin.apiKeyFilterAll")}
          value={keys.length}
        />
        <AdminStat
          label={t("admin.apiKeyFilterActive")}
          value={active}
        />
        <AdminStat
          label={t("admin.apiKeyFilterRevoked")}
          value={keys.length - active}
        />
      </AdminStatGrid>

      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] z-10"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              className="ds-input w-full pl-10"
              placeholder={t("admin.searchApiKey")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="ds-btn-primary"
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
            <AdminFilterChip
              key={f}
              active={filter === f}
              onClick={() => setFilter(f)}
            >
              {t(`admin.apiKeyFilter${f.charAt(0).toUpperCase() + f.slice(1)}`)}
            </AdminFilterChip>
          ))}
        </div>
      </div>

      <AdminPanel>
        {loading ? (
          <AdminLoadingSkeleton rows={5} />
        ) : filtered.length === 0 ? (
          <AdminEmptyState
            title={search ? t("admin.apiKeyNoKeysSearch") : t("admin.apiKeyNoKeysHint")}
          />
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {filtered.map((k) => (
              <div
                key={k.id}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-[var(--bg-hover)] transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${k.is_active ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "bg-[var(--bg-hover)] text-[var(--text-muted)]"}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                      {k.name}
                    </p>
                    <span className={`admin-badge ${k.is_active ? "admin-badge-success" : "admin-badge-danger"}`}>
                      {k.is_active
                        ? t("admin.apiKeyBadgeActive")
                        : t("admin.apiKeyBadgeRevoked")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <code className="text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-hover)] px-1.5 py-0.5 rounded">
                      {revealed.has(k.id)
                        ? k.key_prefix
                        : `${k.key_prefix.slice(0, 6)}••••••••`}
                    </code>
                    {revealed.has(k.id) && (
                      <button
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded transition-colors ${copied === k.id ? "text-[var(--color-success)]" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"}`}
                        onClick={() => copyPrefix(k.id, k.key_prefix)}
                      >
                        {copied === k.id
                          ? t("admin.apiKeyCopiedPrefix")
                          : t("admin.apiKeyCopyPrefix")}
                      </button>
                    )}
                    <span className="text-xs text-[var(--text-muted)]">
                      {k.profiles?.full_name ?? t("admin.apiKeyOwner")}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="text-xs text-[var(--text-muted)]">
                    {t("admin.apiKeyCreated", {
                      time: relativeTime(k.created_at),
                    })}
                  </p>
                  {k.last_used_at ? (
                    <p className="text-xs text-[var(--text-muted)]">
                      {t("admin.apiKeyUsed", {
                        time: relativeTime(k.last_used_at),
                      })}
                    </p>
                  ) : (
                    <p className="text-xs text-[var(--text-muted)]">
                      {t("admin.apiKeyNoUsage")}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    className="ds-btn-icon"
                    title={
                      revealed.has(k.id)
                        ? t("admin.apiKeyHide")
                        : t("admin.apiKeyReveal")
                    }
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
                      className="ds-btn-icon"
                      title={t("admin.apiKeyRevoke")}
                      onClick={() => handleRevoke(k.id)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="4.93" x2="19.07" y1="4.93" y2="19.07" />
                      </svg>
                    </button>
                  )}
                  {confirmDeleteId === k.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        className="ds-btn-danger text-[10px] px-2.5 py-1"
                        onClick={() => handleDelete(k.id)}
                      >
                        {t("common.delete")}
                      </button>
                      <button
                        className="ds-btn-secondary text-[10px] px-2.5 py-1"
                        onClick={() => setConfirmDeleteId(null)}
                      >
                        {t("common.cancel")}
                      </button>
                    </div>
                  ) : (
                    <button
                      className="ds-btn-icon ds-btn-danger"
                      title="Eliminar"
                      onClick={() => setConfirmDeleteId(k.id)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminPanel>

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
