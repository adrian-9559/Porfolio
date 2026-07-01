import type { Provider } from "@/services/repositoryService";

import { useEffect, useState } from "react";
import { useT } from "@/hooks/useT";

import {
  Badge,
  Card,
  EmptyState,
  IconBtn,
  Icons,
  SectionHeader,
  Spinner,
} from "./AdminShared";

import { apiFetch } from "@/services/apiClient";

interface AdminRepo {
  id: string;
  user_id: string;
  name: string;
  provider: Provider;
  repository_url: string;
  default_branch: string;
  active: boolean;
  created_at: string;
}

const PROVIDER_COLOR: Record<Provider, string> = {
  github: "#24292e",
  gitlab: "#e24329",
  bitbucket: "#0052cc",
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
      const data = await apiFetch<AdminRepo[]>("/admin/repositories");

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
      await apiFetch(`/admin/repositories/${id}`, { method: "DELETE" });
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
    <div className="flex flex-col gap-5">
      <SectionHeader
        desc={t("admin.reposCount", { n: repos.length, s: repos.length !== 1 ? "s" : "" })}
        title={t("admin.reposTitle")}
      />

      <div className="grid grid-cols-3 gap-3">
        {(["github", "gitlab", "bitbucket"] as Provider[]).map((p) => (
          <Card key={p} className="px-4 py-3 flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: PROVIDER_COLOR[p] }}
            />
            <div>
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b] capitalize">
                {p}
              </p>
              <p className="text-lg font-semibold text-[#1d1d1f] dark:text-white">
                {byProvider[p] ?? 0}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-xs">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aeaeb2]"
            fill="none"
            height="13"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            viewBox="0 0 16 16"
            width="13"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5L14 14" />
          </svg>
          <input
            className="w-full pl-8 pr-3 py-1.5 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white"
            placeholder={t("admin.searchRepo")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-1.5 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value as Provider | "all")}
        >
          <option value="all">{t("admin.filterAllProviders")}</option>
          <option value="github">GitHub</option>
          <option value="gitlab">GitLab</option>
          <option value="bitbucket">Bitbucket</option>
        </select>
      </div>

      <Card>
        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <EmptyState
            sub={search ? t("admin.noReposSearch") : t("admin.noReposHint")}
            text={t("admin.noRepos")}
          />
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((r) => (
              <div key={r.id} className="flex items-center gap-3 px-5 py-3.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                  style={{ background: PROVIDER_COLOR[r.provider] }}
                >
                  {r.provider[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#1d1d1f] dark:text-white truncate">
                      {r.name}
                    </p>
                    <Badge label={r.provider} />
                  </div>
                  <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">
                    {r.repository_url}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
                    {r.default_branch}
                  </p>
                  <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
                    {relativeTime(r.created_at)} ago
                  </p>
                </div>
                {confirmDeleteId === r.id ? (
                  <div className="flex items-center gap-1.5">
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
                    title={t("admin.delete")}
                    onClick={() => setConfirmDeleteId(r.id)}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
