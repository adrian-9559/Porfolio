import { useState, useEffect, type ReactElement } from "react";

import { useT } from "@/hooks/useT";
import {
  repositoryService,
  GitRepository,
  Branch,
  Commit,
} from "@/services/repositoryService";

// ─── Graph types ───────────────────────────────────────────────────────────────

interface GraphCommit {
  sha: string;
  message: string;
  author: string;
  date: string;
  branches: string[];
}

// ─── Graph component ───────────────────────────────────────────────────────────

const LANE_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
];

function GraphView({
  commits,
  branches,
  loading,
}: {
  commits: GraphCommit[];
  branches: Branch[];
  loading: boolean;
}) {
  const { t } = useT();
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-5 h-5 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin" />
      </div>
    );
  }
  if (commits.length === 0) {
    return (
      <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] py-16 text-center">
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">
          {t("repositories.graphNoData")}
        </p>
      </div>
    );
  }

  const branchNames = branches.map((b) => b.name);
  const laneCount = Math.max(branchNames.length, 1);
  const LANE_W = 20;
  const ROW_H = 44;
  const LEFT_PAD = laneCount * LANE_W + 10;
  const SVG_W = 700;
  const SVG_H = commits.length * ROW_H + 10;

  // Map branch name -> lane index
  const laneIndex: Record<string, number> = {};

  branchNames.forEach((name, i) => {
    laneIndex[name] = i;
  });

  // For each commit, determine its primary lane (first branch alphabetically or by index)
  function commitLane(c: GraphCommit): number {
    for (const b of c.branches) {
      if (laneIndex[b] !== undefined) return laneIndex[b];
    }

    return 0;
  }

  // Which lanes are "active" at each row (have commits above and below)
  // Simplified: a lane is active from its first commit appearance to its last
  const laneFirstRow: Record<number, number> = {};
  const laneLastRow: Record<number, number> = {};

  commits.forEach((c, row) => {
    const lane = commitLane(c);

    if (laneFirstRow[lane] === undefined) laneFirstRow[lane] = row;
    laneLastRow[lane] = row;
  });

  return (
    <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-x-auto">
      <svg
        style={{ minWidth: "400px", display: "block" }}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
      >
        {commits.map((commit, row) => {
          const cy = row * ROW_H + ROW_H / 2;
          const lane = commitLane(commit);
          const cx = lane * LANE_W + LANE_W / 2;
          const color = LANE_COLORS[lane % LANE_COLORS.length];

          // Draw vertical lines for all active lanes at this row
          const laneLines: ReactElement[] = [];

          for (let l = 0; l < laneCount; l++) {
            if (laneFirstRow[l] === undefined) continue;
            const lc = LANE_COLORS[l % LANE_COLORS.length];
            const lx = l * LANE_W + LANE_W / 2;
            const isActive = laneFirstRow[l] <= row && row <= laneLastRow[l];

            if (!isActive) continue;
            // line from top of row to bottom
            const y1 = row === laneFirstRow[l] ? cy : cy - ROW_H / 2;
            const y2 = row === laneLastRow[l] ? cy : cy + ROW_H / 2;

            laneLines.push(
              <line
                key={`vl-${l}-${row}`}
                opacity="0.5"
                stroke={lc}
                strokeWidth="2"
                x1={lx}
                x2={lx}
                y1={y1}
                y2={y2}
              />,
            );
          }

          const shortSha = commit.sha.slice(0, 7);
          const msg =
            commit.message.length > 55
              ? commit.message.slice(0, 55) + "…"
              : commit.message;
          const textX = LEFT_PAD + 8;

          return (
            <g key={commit.sha}>
              {laneLines}
              {/* Dot */}
              <circle cx={cx} cy={cy} fill={color} r={5} />
              {/* Branch head labels */}
              {commit.branches.map((b) => {
                // only show label if this is the first commit for that branch (branch HEAD)
                const bLane = laneIndex[b] ?? 0;

                if (laneFirstRow[bLane] !== row) return null;
                const bx = bLane * LANE_W + LANE_W / 2;

                return (
                  <rect
                    key={`badge-${b}`}
                    fill={LANE_COLORS[bLane % LANE_COLORS.length]}
                    height={13}
                    opacity="0.15"
                    rx="3"
                    width={b.length * 6.5 + 8}
                    x={bx - 6}
                    y={cy - 18}
                  />
                );
              })}
              {/* SHA */}
              <text
                fill="#6e6e73"
                fontFamily="monospace"
                fontSize="10"
                x={textX}
                y={cy - 6}
              >
                {shortSha}
              </text>
              {/* Message */}
              <text
                fill="#1d1d1f"
                fontFamily="system-ui, sans-serif"
                fontSize="11"
                x={textX + 52}
                y={cy - 6}
              >
                {msg}
              </text>
              {/* Author + time */}
              <text
                fill="#aeaeb2"
                fontFamily="system-ui, sans-serif"
                fontSize="10"
                x={textX}
                y={cy + 8}
              >
                {commit.author} · {relTime(commit.date)}
                {commit.branches.length > 0
                  ? ` · ${commit.branches.join(", ")}`
                  : ""}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Provider = "github" | "gitlab" | "bitbucket";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function relTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);

  if (m < 1) return "ahora";
  if (m < 60) return `hace ${m}m`;
  const h = Math.floor(m / 60);

  if (h < 24) return `hace ${h}h`;
  const d = Math.floor(h / 24);

  if (d < 30) return `hace ${d}d`;

  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });
}

const PROVIDER_COLORS: Record<Provider, string> = {
  github:
    "bg-slate-100 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300",
  gitlab:
    "bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400",
  bitbucket: "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400",
};

const PROVIDER_LABELS: Record<Provider, string> = {
  github: "GitHub",
  gitlab: "GitLab",
  bitbucket: "Bitbucket",
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function BranchIcon() {
  return (
    <svg
      fill="none"
      height="13"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="13"
    >
      <line x1="6" x2="6" y1="3" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="14"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function UserRepositoriesSection() {
  const { t } = useT();
  const [repos, setRepos] = useState<GitRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState<"list" | "add" | "detail">("list");
  const [selected, setSelected] = useState<GitRepository | null>(null);

  // Detail view state
  const [branches, setBranches] = useState<Branch[]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [detailTab, setDetailTab] = useState<"commits" | "branches" | "graph">(
    "commits",
  );
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [commitsLoading, setCommitsLoading] = useState(false);

  // Graph state
  const [graphData, setGraphData] = useState<GraphCommit[]>([]);
  const [graphLoading, setGraphLoading] = useState(false);
  const [graphLoaded, setGraphLoaded] = useState(false);

  // Add form state
  const [form, setForm] = useState({
    name: "",
    provider: "github" as Provider,
    repository_url: "",
    default_branch: "main",
    access_token: "",
  });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");

  useEffect(() => {
    repositoryService
      .list()
      .then(setRepos)
      .catch(() => setError("No se pudieron cargar los repositorios"))
      .finally(() => setLoading(false));
  }, []);

  async function openDetail(repo: GitRepository) {
    setSelected(repo);
    setView("detail");
    setDetailLoading(true);
    setDetailTab("commits");
    setDetailError("");
    setBranches([]);
    setCommits([]);
    setSelectedBranch(repo.default_branch);
    setGraphData([]);
    setGraphLoaded(false);
    try {
      const [b, c] = await Promise.all([
        repositoryService.getBranches(repo.id),
        repositoryService.getCommits(repo.id, repo.default_branch),
      ]);

      setBranches(b);
      setCommits(c);
    } catch (err) {
      setDetailError(
        err instanceof Error
          ? err.message
          : t("common.error"),
      );
    } finally {
      setDetailLoading(false);
    }
  }

  async function loadGraph(repoId: string, branchList: Branch[]) {
    if (graphLoaded) return;
    setGraphLoading(true);
    try {
      const results = await Promise.all(
        branchList.map((b) => repositoryService.getCommits(repoId, b.name, 20)),
      );
      // Merge: map sha -> GraphCommit
      const map = new Map<string, GraphCommit>();

      results.forEach((commits, bi) => {
        const branchName = branchList[bi].name;

        commits.forEach((c) => {
          const existing = map.get(c.sha);

          if (existing) {
            if (!existing.branches.includes(branchName))
              existing.branches.push(branchName);
          } else {
            map.set(c.sha, {
              sha: c.sha,
              message: c.message,
              author: c.author.name,
              date: c.date,
              branches: [branchName],
            });
          }
        });
      });
      const sorted = Array.from(map.values()).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      setGraphData(sorted);
      setGraphLoaded(true);
    } catch {
      setGraphData([]);
    } finally {
      setGraphLoading(false);
    }
  }

  async function switchBranch(branch: string) {
    if (!selected || branch === selectedBranch) return;
    setSelectedBranch(branch);
    setCommitsLoading(true);
    try {
      const c = await repositoryService.getCommits(selected.id, branch);

      setCommits(c);
    } catch {
      setCommits([]);
    } finally {
      setCommitsLoading(false);
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);
    setAddError("");
    try {
      const repo = await repositoryService.create(form);

      setRepos((prev) => [repo, ...prev]);
      setView("list");
      setForm({
        name: "",
        provider: "github",
        repository_url: "",
        default_branch: "main",
        access_token: "",
      });
    } catch (err) {
      setAddError(
        err instanceof Error ? err.message : "Error al añadir repositorio",
      );
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string) {
    await repositoryService.delete(id);
    setRepos((prev) => prev.filter((r) => r.id !== id));
    if (selected?.id === id) setView("list");
  }

  // ── Detail view ──────────────────────────────────────────────────────────────

  if (view === "detail" && selected) {
    return (
      <section>
        <button
          className="border border-black/12 dark:border-white/12 hover:bg-black/5 dark:hover:bg-white/5 text-[#1d1d1f] dark:text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors mb-4 flex items-center gap-1.5"
          onClick={() => setView("list")}
        >
          <span>←</span>
          <span>{t("repositories.title")}</span>
        </button>

        {/* Header card */}
        <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-5 mb-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2 className="text-lg font-semibold text-[#1d1d1f] dark:text-white">
                  {selected.name}
                </h2>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-lg ${PROVIDER_COLORS[selected.provider]}`}
                >
                  {PROVIDER_LABELS[selected.provider]}
                </span>
              </div>
              <a
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-mono truncate block max-w-sm"
                href={selected.repository_url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {selected.repository_url}
              </a>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-[#6e6e73] dark:text-[#86868b]">
                <BranchIcon />
                <span className="font-mono bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                  {selected.default_branch}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab switcher + branch selector */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="flex gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5">
            {(["commits", "branches", "graph"] as const).map((tab) => (
              <button
                key={tab}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  detailTab === tab
                    ? "bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white shadow-sm"
                    : "text-[#6e6e73] dark:text-[#86868b]"
                }`}
                onClick={() => {
                  setDetailTab(tab);
                  if (tab === "graph" && !graphLoaded && selected) {
                    loadGraph(selected.id, branches);
                  }
                }}
              >
                {tab === "commits"
                  ? t("repositories.tabsCommits")
                  : tab === "branches"
                    ? `${t("repositories.tabsBranches")}${branches.length > 0 ? ` (${branches.length})` : ""}`
                    : t("repositories.tabsGraph")}
              </button>
            ))}
          </div>

          {/* Branch selector — only visible on commits tab */}
          {detailTab === "commits" && branches.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-[#6e6e73] dark:text-[#86868b] flex-shrink-0">
                <BranchIcon />
              </span>
              <select
                className="text-sm font-mono bg-white dark:bg-[#1c1c1e] border border-black/12 dark:border-white/12 text-[#1d1d1f] dark:text-white rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                value={selectedBranch}
                onChange={(e) => switchBranch(e.target.value)}
              >
                {branches.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name}
                    {b.is_default ? " (default)" : ""}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {detailLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-5 h-5 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin" />
          </div>
        ) : detailError ? (
          <div className="rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 p-5 text-center">
            <p className="text-sm text-red-600 dark:text-red-400">
              {detailError}
            </p>
          </div>
        ) : detailTab === "graph" ? (
          <GraphView
            branches={branches}
            commits={graphData}
            loading={graphLoading}
          />
        ) : detailTab === "commits" ? (
          <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] divide-y divide-black/5 dark:divide-white/5 relative">
            {commitsLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-[#111116]/70 rounded-2xl z-10">
                <div className="w-5 h-5 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin" />
              </div>
            )}
            {commits.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">
                  No hay commits en esta rama.
                </p>
              </div>
            ) : (
              commits.map((commit, i) => (
                <div key={commit.sha} className="p-4 flex items-start gap-3">
                  <div className="flex flex-col items-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    {i < commits.length - 1 && (
                      <div className="w-px flex-1 bg-black/8 dark:bg-white/8 mt-1 min-h-[1.5rem]" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-[#1d1d1f] dark:text-white font-medium">
                      {commit.message}
                    </p>
                    <div className="mt-1 flex items-center gap-2 flex-wrap">
                      <a
                        className="hover:underline"
                        href={commit.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <code className="text-[10px] font-mono bg-black/5 dark:bg-white/8 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400">
                          {commit.sha.slice(0, 7)}
                        </code>
                      </a>
                      <span className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                        {commit.author.name}
                      </span>
                      <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                        {relTime(commit.date)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] divide-y divide-black/5 dark:divide-white/5">
            {branches.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">
                  No hay ramas disponibles.
                </p>
              </div>
            ) : (
              branches.map((branch) => (
                <div key={branch.name} className="p-4 flex items-center gap-3">
                  <span className="text-[#6e6e73] dark:text-[#86868b] flex-shrink-0">
                    <BranchIcon />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-[#1d1d1f] dark:text-white font-mono">
                        {branch.name}
                      </span>
                      {branch.is_default && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded">
                          default
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5">
                      <code className="text-[10px] font-mono bg-black/5 dark:bg-white/8 px-1.5 py-0.5 rounded text-[#6e6e73] dark:text-[#86868b]">
                        {branch.last_commit?.sha.slice(0, 7) ?? "—"}
                      </code>
                    </div>
                  </div>
                  <button
                    className="flex-shrink-0 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    onClick={() => {
                      setSelectedBranch(branch.name);
                      setDetailTab("commits");
                      switchBranch(branch.name);
                    }}
                  >
                    Ver commits
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Delete button */}
        <div className="mt-6 pt-4 border-t border-black/8 dark:border-white/8">
          <button
            className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors"
            onClick={() => handleDelete(selected.id)}
          >
            <TrashIcon />
            Eliminar repositorio
          </button>
        </div>
      </section>
    );
  }

  // ── Add form view ─────────────────────────────────────────────────────────────

  if (view === "add") {
    return (
      <section>
        <button
          className="border border-black/12 dark:border-white/12 hover:bg-black/5 dark:hover:bg-white/5 text-[#1d1d1f] dark:text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors mb-4 flex items-center gap-1.5"
          onClick={() => {
            setView("list");
            setAddError("");
          }}
        >
                  <span>←</span>
                  <span>{t("repositories.title")}</span>
                </button>

                <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-4">
                    {t("repositories.add")}
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleAdd}>
            {/* Nombre */}
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] block mb-1.5">
                Nombre
              </label>
              <input
                required
                className="w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                placeholder="mi-repositorio"
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>

            {/* Proveedor */}
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] block mb-1.5">
                Proveedor
              </label>
              <div className="flex gap-2 flex-wrap">
                {(["github", "gitlab", "bitbucket"] as Provider[]).map((p) => (
                  <button
                    key={p}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                      form.provider === p
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-black/12 dark:border-white/12 hover:bg-black/5 dark:hover:bg-white/5 text-[#1d1d1f] dark:text-white"
                    }`}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, provider: p }))}
                  >
                    {PROVIDER_LABELS[p]}
                  </button>
                ))}
              </div>
            </div>

            {/* URL */}
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] block mb-1.5">
                URL del repositorio
              </label>
              <input
                required
                className="w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                placeholder="https://github.com/usuario/repo"
                type="url"
                value={form.repository_url}
                onChange={(e) =>
                  setForm((f) => ({ ...f, repository_url: e.target.value }))
                }
              />
            </div>

            {/* Rama principal */}
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] block mb-1.5">
                Rama principal
              </label>
              <input
                className="w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                placeholder="main"
                type="text"
                value={form.default_branch}
                onChange={(e) =>
                  setForm((f) => ({ ...f, default_branch: e.target.value }))
                }
              />
            </div>

            {/* Token */}
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] block mb-1.5">
                Token de acceso (opcional)
              </label>
              <input
                className="w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                placeholder="ghp_..."
                type="password"
                value={form.access_token}
                onChange={(e) =>
                  setForm((f) => ({ ...f, access_token: e.target.value }))
                }
              />
              <p className="mt-1 text-xs text-[#6e6e73] dark:text-[#86868b]">
                Necesario para repositorios privados
              </p>
            </div>

            {addError && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {addError}
              </p>
            )}

            <div className="flex gap-2 pt-1">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-60"
                disabled={adding}
                type="submit"
              >
                {adding && (
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                )}
                Añadir repositorio
              </button>
              <button
                className="border border-black/12 dark:border-white/12 hover:bg-black/5 dark:hover:bg-white/5 text-[#1d1d1f] dark:text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
                type="button"
                onClick={() => {
                  setView("list");
                  setAddError("");
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }

  // ── List view ─────────────────────────────────────────────────────────────────

  return (
    <section>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-0.5">
            Repositorios
          </p>
          <h2 className="text-lg font-semibold text-[#1d1d1f] dark:text-white">
            Git Repositories
          </h2>
        </div>
        {!loading && !error && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            onClick={() => setView("add")}
          >
            + Añadir repositorio
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-16">
          <div className="w-5 h-5 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin" />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-5">
          <p className="text-sm text-red-600 dark:text-red-400 mb-3">{error}</p>
          <button
            className="border border-black/12 dark:border-white/12 hover:bg-black/5 dark:hover:bg-white/5 text-[#1d1d1f] dark:text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            onClick={() => {
              setError("");
              setLoading(true);
              repositoryService
                .list()
                .then(setRepos)
      .catch(() => setError(t("repositories.loading")))
                .finally(() => setLoading(false));
            }}
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && repos.length === 0 && (
        <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] py-16 text-center">
          <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mb-3">
            No tienes repositorios añadidos
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            onClick={() => setView("add")}
          >
            Añadir primero
          </button>
        </div>
      )}

      {/* Repo list */}
      {!loading && !error && repos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-5"
            >
              {/* Name + provider */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white truncate">
                  {repo.name}
                </h3>
                <span
                  className={`flex-shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-lg ${PROVIDER_COLORS[repo.provider]}`}
                >
                  {PROVIDER_LABELS[repo.provider]}
                </span>
              </div>

              {/* URL */}
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b] font-mono truncate mb-2">
                {repo.repository_url}
              </p>

              {/* Branch + date */}
              <div className="flex items-center gap-3 text-xs text-[#6e6e73] dark:text-[#86868b] mb-4">
                <span className="flex items-center gap-1">
                  <BranchIcon />
                  <span className="font-mono">{repo.default_branch}</span>
                </span>
                <span className="text-[#aeaeb2] dark:text-[#636366]">
                  {relTime(repo.created_at)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  className="border border-black/12 dark:border-white/12 hover:bg-black/5 dark:hover:bg-white/5 text-[#1d1d1f] dark:text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
                  onClick={() => openDetail(repo)}
                >
                  Ver detalle
                </button>
                <button
                  aria-label="Eliminar repositorio"
                  className="ml-auto p-2 rounded-xl border border-black/12 dark:border-white/12 hover:bg-red-50 dark:hover:bg-red-950/20 text-[#6e6e73] dark:text-[#86868b] hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  onClick={() => handleDelete(repo.id)}
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
