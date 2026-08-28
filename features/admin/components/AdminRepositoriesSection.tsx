import type { Provider } from "@/services/repositoryService";
import type { AdminRepository } from "@/services/adminService";

import { useEffect, useState } from "react";

import { useT } from "@/hooks/useT";
import { adminService } from "@/services/adminService";

type AdminRepo = AdminRepository;

const PROVIDER_COLOR: Record<Provider, string> = {
  github: "#24292e",
  gitlab: "#e24329",
  bitbucket: "#0052cc",
};

const GRADIENT = {
  from: "#3b82f6",
  mid: "#6366f1",
  to: "#8b5cf6",
  light: "from-blue-500 to-indigo-500",
  text: "text-blue-500 dark:text-blue-400",
  badge: "bg-blue-500/10 dark:bg-blue-400/15 text-blue-600 dark:text-blue-400",
  icon: "bg-gradient-to-br from-blue-500 to-indigo-500",
};

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

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
    <div className="relative flex flex-col gap-6 overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full bg-blue-500/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/6 blur-3xl" />

      {/* Header */}
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${GRADIENT.badge}`}>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            Repositories
          </span>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#1d1d1f] dark:text-white">
            {t("admin.reposTitle")}
          </h1>
          <p className="mt-1 text-sm text-[#6e6e73] dark:text-[#86868b]">
            {t("admin.reposCount", {
              n: repos.length,
              s: repos.length !== 1 ? "s" : "",
            })}
          </p>
        </div>
      </div>

      {/* Provider summary cards */}
      <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-3">
        {(["github", "gitlab", "bitbucket"] as Provider[]).map((p) => (
          <div
            key={p}
            className="group relative overflow-hidden rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-5 transition-all hover:shadow-xl hover:shadow-blue-500/5"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 blur-2xl" />
            <div className="relative flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20">
                {p[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-medium capitalize text-[#6e6e73] dark:text-[#86868b]">{p}</p>
                <p className="text-2xl font-bold text-[#1d1d1f] dark:text-white">{byProvider[p] ?? 0}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="relative flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#aeaeb2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>
          <input
            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] py-2 pl-10 pr-4 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            placeholder={t("admin.searchRepo")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {(["all", "github", "gitlab", "bitbucket"] as const).map((p) => (
            <button
              key={p}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                filter === p
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-500/25"
                  : "bg-black/5 dark:bg-white/8 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/8 dark:hover:bg-white/12"
              }`}
              onClick={() => setFilter(p)}
            >
              {p === "all" ? t("admin.filterAllProviders") : p}
            </button>
          ))}
        </div>
      </div>

      {/* Repository list */}
      <div className="relative overflow-hidden rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116]">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 opacity-0 transition-opacity hover:opacity-100" style={{ pointerEvents: "none" }} />
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-6 w-6 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <svg className="h-10 w-10 text-[#d1d1d6] dark:text-[#424245]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">
              {t("admin.noRepos")}
            </p>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
              {search ? t("admin.noReposSearch") : t("admin.noReposHint")}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((r) => (
              <div key={r.id} className="group/item relative flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 transition-opacity group-hover/item:opacity-100" />
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white shadow-md"
                  style={{ background: PROVIDER_COLOR[r.provider] }}
                >
                  {r.provider[0]?.toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-[#1d1d1f] dark:text-white">{r.name}</p>
                    <span className="inline-flex items-center rounded-full bg-black/5 dark:bg-white/8 px-2 py-0.5 text-[10px] font-medium text-[#6e6e73] dark:text-[#86868b] capitalize">
                      {r.provider}
                    </span>
                  </div>
                  <p className="truncate text-xs text-[#6e6e73] dark:text-[#86868b]">{r.repository_url}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">{r.default_branch}</p>
                  <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">{relativeTime(r.created_at)} ago</p>
                </div>
                {confirmDeleteId === r.id ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white shadow-md shadow-red-500/25 transition-colors hover:bg-red-600"
                      onClick={() => handleDelete(r.id)}
                    >
                      {t("common.delete")}
                    </button>
                    <button
                      className="rounded-lg bg-black/5 px-3 py-1.5 text-xs font-medium text-[#6e6e73] transition-colors hover:text-[#1d1d1f] dark:bg-white/8 dark:text-[#86868b] dark:hover:text-white"
                      onClick={() => setConfirmDeleteId(null)}
                    >
                      {t("common.cancel")}
                    </button>
                  </div>
                ) : (
                  <button
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-[#aeaeb2] transition-all hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500"
                    title={t("admin.delete")}
                    onClick={() => setConfirmDeleteId(r.id)}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
