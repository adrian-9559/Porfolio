import type { Provider } from "@/services/repositoryService";
import type { AdminRepository } from "@/services/adminService";

import { useEffect, useState } from "react";

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

import { useT } from "@/hooks/useT";
import { adminService } from "@/services/adminService";

type AdminRepo = AdminRepository;

const PROVIDER_COLOR: Record<Provider, string> = {
  github: "#24292e",
  gitlab: "#e24329",
  bitbucket: "#0052cc",
};

export function AdminRepositoriesSection() {
  const { t } = useT();
  const [repos, setRepos] = useState<AdminRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Provider | "all">("all");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminService.listRepositories();
      setRepos(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    setConfirmDeleteId(null);
    try {
      await adminService.deleteRepository(id);
      setRepos((prev) => prev.filter((r) => r.id !== id));
    } catch {}
  };

  const filtered = repos.filter(
    (r) =>
      (filter === "all" || r.provider === filter) &&
      (r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.user_id.includes(search)),
  );

  const byProvider = repos.reduce<Record<string, number>>((acc, r) => {
    acc[r.provider] = (acc[r.provider] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <AdminPageHeader
        title={t("admin.reposTitle")}
        description={t("admin.reposCount", {
          n: repos.length,
          s: repos.length !== 1 ? "s" : "",
        })}
      />

      {/* Provider stats */}
      <div className="mb-6">
        <AdminStatGrid cols={3}>
          {(["github", "gitlab", "bitbucket"] as Provider[]).map((p) => (
            <AdminStat
              key={p}
              label={p}
              value={byProvider[p] ?? 0}
            />
          ))}
        </AdminStatGrid>
      </div>

      {/* Search + filter */}
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          className="ds-input max-w-sm flex-1 min-w-[180px]"
          placeholder={t("admin.searchRepo")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-1.5">
          {(["all", "github", "gitlab", "bitbucket"] as const).map((p) => (
            <AdminFilterChip
              key={p}
              active={filter === p}
              onClick={() => setFilter(p)}
            >
              {p === "all" ? t("admin.filterAllProviders") : p}
            </AdminFilterChip>
          ))}
        </div>
      </div>

      {/* Repository list */}
      <AdminPanel compact>
        {loading ? (
          <div className="p-6">
            <AdminLoadingSkeleton rows={4} />
          </div>
        ) : filtered.length === 0 ? (
          <AdminEmptyState
            title={t("admin.noRepos")}
            description={search ? t("admin.noReposSearch") : t("admin.noReposHint")}
          />
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {filtered.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-[var(--bg-hover)] transition-colors"
              >
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white"
                  style={{ background: PROVIDER_COLOR[r.provider] }}
                >
                  {r.provider[0]?.toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-[13px] font-medium text-[var(--text-primary)]">
                      {r.name}
                    </p>
                    <span className="admin-badge">
                      {r.provider}
                    </span>
                  </div>
                  <p className="truncate text-[11px] text-[var(--text-muted)]">
                    {r.repository_url}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-[10px] text-[var(--text-muted)]">
                    {r.default_branch}
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)]">
                    {relativeTime(r.created_at)}
                  </p>
                </div>
                {confirmDeleteId === r.id ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      className="ds-btn-danger !px-3 !py-1.5 !text-[11px]"
                      onClick={() => handleDelete(r.id)}
                    >
                      {t("common.delete")}
                    </button>
                    <button
                      className="ds-btn-ghost !px-3 !py-1.5 !text-[11px]"
                      onClick={() => setConfirmDeleteId(null)}
                    >
                      {t("common.cancel")}
                    </button>
                  </div>
                ) : (
                  <button
                    className="ds-btn-icon !w-8 !h-8 hover:!text-[var(--color-danger)]"
                    title={t("admin.delete")}
                    onClick={() => setConfirmDeleteId(r.id)}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </AdminPanel>
    </div>
  );
}
