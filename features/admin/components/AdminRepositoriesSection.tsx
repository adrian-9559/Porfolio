import { useEffect, useState } from "react";
import { apiFetch } from "@/services/apiClient";
import { SectionHeader, Card, Spinner, EmptyState, IconBtn, Badge, Icons } from "./AdminShared";
import type { Provider } from "@/services/repositoryService";

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
  const [repos, setRepos] = useState<AdminRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Provider | "all">("all");

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiFetch<AdminRepo[]>("/admin/repositories");
      setRepos(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this repository registration?")) return;
    try {
      await apiFetch(`/admin/repositories/${id}`, { method: "DELETE" });
      setRepos((prev) => prev.filter((r) => r.id !== id));
    } catch {}
  };

  const filtered = repos.filter((r) =>
    (filter === "all" || r.provider === filter) &&
    (r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.user_id.includes(search))
  );

  const byProvider = repos.reduce<Record<string, number>>((acc, r) => {
    acc[r.provider] = (acc[r.provider] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        title="Repositorios Git"
        desc={`${repos.length} repositorio${repos.length !== 1 ? "s" : ""} registrados`}
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {(["github", "gitlab", "bitbucket"] as Provider[]).map((p) => (
          <Card key={p} className="px-4 py-3 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: PROVIDER_COLOR[p] }} />
            <div>
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b] capitalize">{p}</p>
              <p className="text-lg font-semibold text-[#1d1d1f] dark:text-white">{byProvider[p] ?? 0}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aeaeb2]" width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" /></svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar repositorio…"
            className="w-full pl-8 pr-3 py-1.5 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Provider | "all")}
          className="px-3 py-1.5 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white"
        >
          <option value="all">Todos</option>
          <option value="github">GitHub</option>
          <option value="gitlab">GitLab</option>
          <option value="bitbucket">Bitbucket</option>
        </select>
      </div>

      <Card>
        {loading ? <Spinner /> : filtered.length === 0 ? (
          <EmptyState text="Sin repositorios" sub={search ? "Ninguno coincide con la búsqueda" : "Los usuarios aún no han conectado repositorios"} />
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
                    <p className="text-sm font-medium text-[#1d1d1f] dark:text-white truncate">{r.name}</p>
                    <Badge>{r.provider}</Badge>
                  </div>
                  <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">{r.repository_url}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">{r.default_branch}</p>
                  <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">{relativeTime(r.created_at)} ago</p>
                </div>
                <IconBtn onClick={() => handleDelete(r.id)} title="Eliminar" icon={Icons.trash} danger />
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
