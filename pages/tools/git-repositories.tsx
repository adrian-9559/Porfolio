import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

import {
  repositoryService,
  type Analytics,
  type Branch,
  type Commit,
  type CreateRepoInput,
  type GitRepository,
  type GraphData,
  type Provider,
} from "@/services/repositoryService";
import { useAuthStore } from "@/store/authStore";

// ── colour palette per provider ───────────────────────────────────────────────
const PROVIDER_COLOR: Record<Provider, string> = {
  github: "#24292e",
  gitlab: "#e24329",
  bitbucket: "#0052cc",
};

const PROVIDER_LABEL: Record<Provider, string> = {
  github: "GitHub",
  gitlab: "GitLab",
  bitbucket: "Bitbucket",
};

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);

  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);

  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);

  if (h < 24) return `${h}h ago`;

  return `${Math.floor(h / 24)}d ago`;
}

function shortSha(sha: string) {
  return sha.slice(0, 7);
}

// ── Branch colours for graph ──────────────────────────────────────────────────
const BRANCH_COLORS = [
  "#2f9eff",
  "#f47067",
  "#57ab5a",
  "#d29922",
  "#a371f7",
  "#f78166",
  "#39d353",
  "#e3b341",
  "#79c0ff",
];

// ── Git graph SVG ─────────────────────────────────────────────────────────────
function GitGraph({ data }: { data: GraphData }) {
  const ROW_H = 36;
  const COL_W = 18;
  const PAD_LEFT = 12;
  const PAD_TOP = 18;

  // Assign branch indices for columns
  const branchIndex: Record<string, number> = {};

  data.branches.forEach((b, i) => {
    branchIndex[b] = i;
  });

  const commitPositions: Record<string, { x: number; y: number; col: number }> =
    {};

  data.commits.forEach((c, i) => {
    const col = branchIndex[c.branch] ?? 0;

    commitPositions[c.sha] = {
      x: PAD_LEFT + col * COL_W,
      y: PAD_TOP + i * ROW_H,
      col,
    };
  });

  const maxCol = Math.max(0, ...Object.values(branchIndex));
  const width = PAD_LEFT + (maxCol + 1) * COL_W + 8;
  const height = PAD_TOP + data.commits.length * ROW_H;

  return (
    <svg className="flex-shrink-0" height={height} width={width}>
      {/* edges */}
      {data.commits.map((c) => {
        const pos = commitPositions[c.sha];

        if (!pos) return null;

        return c.parents.map((p) => {
          const ppos = commitPositions[p];

          if (!ppos) return null;
          const color = BRANCH_COLORS[pos.col % BRANCH_COLORS.length] ?? "#888";

          return (
            <path
              key={`${c.sha}-${p}`}
              d={
                pos.col === ppos.col
                  ? `M ${pos.x} ${pos.y} L ${ppos.x} ${ppos.y}`
                  : `M ${pos.x} ${pos.y} Q ${pos.x} ${(pos.y + ppos.y) / 2} ${ppos.x} ${ppos.y}`
              }
              fill="none"
              stroke={color}
              strokeWidth="2"
            />
          );
        });
      })}
      {/* commits */}
      {data.commits.map((c) => {
        const pos = commitPositions[c.sha];

        if (!pos) return null;
        const color = BRANCH_COLORS[pos.col % BRANCH_COLORS.length] ?? "#888";

        return (
          <circle
            key={c.sha}
            cx={pos.x}
            cy={pos.y}
            fill={color}
            r={5}
            stroke="var(--bg)"
            strokeWidth="2"
          />
        );
      })}
    </svg>
  );
}

// ── Avatar / initials ─────────────────────────────────────────────────────────
function Avatar({
  name,
  avatarUrl,
  size = 24,
}: {
  name: string;
  avatarUrl: string | null;
  size?: number;
}) {
  if (avatarUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        alt={name}
        className="rounded-full"
        height={size}
        src={avatarUrl}
        width={size}
      />
    );
  }
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center font-semibold flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  );
}

// ── Add Repository modal ──────────────────────────────────────────────────────
function AddRepoModal({
  onClose,
  onAdded,
}: {
  onClose: () => void;
  onAdded: (r: GitRepository) => void;
}) {
  const [form, setForm] = useState<CreateRepoInput>({
    name: "",
    provider: "github",
    repository_url: "",
    default_branch: "main",
    access_token: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const repo = await repositoryService.create({
        ...form,
        access_token: form.access_token || undefined,
        default_branch: form.default_branch || "main",
      });

      onAdded(repo);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error adding repository");
    } finally {
      setSaving(false);
    }
  };

  const field = (label: string, children: React.ReactNode) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-[#6e6e73] dark:text-[#86868b]">
        {label}
      </label>
      {children}
    </div>
  );

  const inputCls =
    "w-full px-3 py-2 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-2xl p-6">
        <h2 className="text-base font-semibold text-[#1d1d1f] dark:text-white mb-5">
          Connect Repository
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {field(
            "Repository name",
            <input
              required
              className={inputCls}
              placeholder="my-portfolio"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />,
          )}
          {field(
            "Provider",
            <select
              className={inputCls}
              value={form.provider}
              onChange={(e) =>
                setForm((f) => ({ ...f, provider: e.target.value as Provider }))
              }
            >
              <option value="github">GitHub</option>
              <option value="gitlab">GitLab</option>
              <option value="bitbucket">Bitbucket</option>
            </select>,
          )}
          {field(
            "Repository URL",
            <input
              required
              className={inputCls}
              placeholder="https://github.com/user/repo"
              type="url"
              value={form.repository_url}
              onChange={(e) =>
                setForm((f) => ({ ...f, repository_url: e.target.value }))
              }
            />,
          )}
          {field(
            "Default branch",
            <input
              className={inputCls}
              placeholder="main"
              value={form.default_branch}
              onChange={(e) =>
                setForm((f) => ({ ...f, default_branch: e.target.value }))
              }
            />,
          )}
          {field(
            "Access token (optional — for private repos)",
            <input
              autoComplete="off"
              className={inputCls}
              placeholder="ghp_..."
              type="password"
              value={form.access_token}
              onChange={(e) =>
                setForm((f) => ({ ...f, access_token: e.target.value }))
              }
            />,
          )}
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex gap-3 mt-1">
            <button
              className="flex-1 py-2 rounded-xl text-sm border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex-1 py-2 rounded-xl text-sm bg-blue-500 hover:bg-blue-600 text-white font-medium disabled:opacity-50 transition-colors"
              disabled={saving}
              type="submit"
            >
              {saving ? "Connecting…" : "Connect"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Repository Dashboard ──────────────────────────────────────────────────────
type DashTab = "overview" | "branches" | "commits" | "graph" | "analytics";

function RepoDashboard({
  repo,
  onBack,
}: {
  repo: GitRepository;
  onBack: () => void;
}) {
  const [tab, setTab] = useState<DashTab>("overview");
  const [branches, setBranches] = useState<Branch[]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [graph, setGraph] = useState<GraphData | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [selectedBranch, setSelectedBranch] = useState(repo.default_branch);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(
    async (t: DashTab) => {
      setLoading(true);
      setError("");
      try {
        if (t === "overview" || t === "branches") {
          const b = await repositoryService.getBranches(repo.id);

          setBranches(b);
        }
        if (t === "overview" || t === "commits") {
          const c = await repositoryService.getCommits(
            repo.id,
            selectedBranch,
            30,
            1,
          );

          setCommits(c);
        }
        if (t === "graph") {
          const g = await repositoryService.getGraph(repo.id);

          setGraph(g);
        }
        if (t === "analytics") {
          const a = await repositoryService.getAnalytics(repo.id);

          setAnalytics(a);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    },
    [repo.id, selectedBranch],
  );

  useEffect(() => {
    load(tab);
  }, [tab, load]);

  const tabs: { id: DashTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "branches", label: "Branches" },
    { id: "commits", label: "Commits" },
    { id: "graph", label: "Graph" },
    { id: "analytics", label: "Analytics" },
  ];

  const tabCls = (t: DashTab) =>
    `px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
      tab === t
        ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f]"
        : "text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
    }`;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-[#6e6e73] dark:text-[#86868b]"
          onClick={onBack}
        >
          <svg
            fill="none"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 16 16"
            width="16"
          >
            <path d="M10 12L6 8l4-4" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: PROVIDER_COLOR[repo.provider] }}
          />
          <h2 className="text-base font-semibold text-[#1d1d1f] dark:text-white">
            {repo.name}
          </h2>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/5 dark:bg-white/10 text-[#6e6e73] dark:text-[#86868b]">
            {PROVIDER_LABEL[repo.provider]}
          </span>
        </div>
        <a
          className="ml-auto text-xs text-blue-500 hover:underline flex items-center gap-1"
          href={repo.repository_url}
          rel="noopener noreferrer"
          target="_blank"
        >
          Open ↗
        </a>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-black/[0.04] dark:bg-white/[0.04] p-1 rounded-2xl w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={tabCls(t.id)}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 px-4 py-3 rounded-xl">
          {error}
        </p>
      )}
      {loading && (
        <div className="flex items-center gap-2 text-sm text-[#6e6e73] dark:text-[#86868b]">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading…
        </div>
      )}

      {/* Overview */}
      {tab === "overview" && !loading && (
        <div className="flex flex-col gap-5">
          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Branches", value: branches.length },
              { label: "Default branch", value: repo.default_branch },
              { label: "Provider", value: PROVIDER_LABEL[repo.provider] },
              { label: "Added", value: relativeTime(repo.created_at) },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl px-4 py-4"
              >
                <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mb-1">
                  {s.label}
                </p>
                <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
          {/* Recent commits */}
          <div className="bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-black/[0.06] dark:border-white/[0.06]">
              <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                Recent commits
              </p>
            </div>
            {commits.slice(0, 5).map((c) => (
              <div
                key={c.sha}
                className="flex items-start gap-3 px-5 py-3 border-b border-black/[0.04] dark:border-white/[0.04] last:border-0"
              >
                <Avatar
                  avatarUrl={c.author.avatar_url}
                  name={c.author.name}
                  size={28}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1d1d1f] dark:text-white truncate">
                    {c.message}
                  </p>
                  <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                    {c.author.name} · {relativeTime(c.date)}
                  </p>
                </div>
                <code className="text-[10px] font-mono text-[#aeaeb2] dark:text-[#636366] flex-shrink-0">
                  {shortSha(c.sha)}
                </code>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Branches */}
      {tab === "branches" && !loading && (
        <div className="bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl overflow-hidden">
          {branches.length === 0 ? (
            <p className="px-5 py-8 text-sm text-center text-[#6e6e73] dark:text-[#86868b]">
              No branches found
            </p>
          ) : (
            branches.map((b) => (
              <div
                key={b.name}
                className="flex items-center gap-3 px-5 py-3.5 border-b border-black/[0.04] dark:border-white/[0.04] last:border-0"
              >
                <svg
                  className="text-[#86868b]"
                  fill="none"
                  height="14"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 16 16"
                  width="14"
                >
                  <path d="M5 3v7a3 3 0 0 0 6 0V7a2 2 0 1 1 2 0" />
                  <circle cx="5" cy="3" r="1.5" />
                  <circle cx="5" cy="13" r="1.5" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">
                      {b.name}
                    </p>
                    {b.is_default && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-blue-50 dark:bg-blue-950/30 text-blue-600 font-medium">
                        default
                      </span>
                    )}
                  </div>
                  {b.last_commit && (
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">
                      {b.last_commit.message} · {b.last_commit.author} ·{" "}
                      {relativeTime(b.last_commit.date)}
                    </p>
                  )}
                </div>
                {b.last_commit && (
                  <code className="text-[10px] font-mono text-[#aeaeb2] dark:text-[#636366]">
                    {shortSha(b.last_commit.sha)}
                  </code>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Commits */}
      {tab === "commits" && !loading && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <select
              className="px-3 py-2 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              {branches.map((b) => (
                <option key={b.name} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
            <button
              className="px-3 py-2 text-sm rounded-xl border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
              onClick={() => load("commits")}
            >
              Reload
            </button>
          </div>
          <div className="bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl overflow-hidden">
            {commits.length === 0 ? (
              <p className="px-5 py-8 text-sm text-center text-[#6e6e73] dark:text-[#86868b]">
                No commits
              </p>
            ) : (
              commits.map((c) => (
                <a
                  key={c.sha}
                  className="flex items-start gap-3 px-5 py-3.5 border-b border-black/[0.04] dark:border-white/[0.04] last:border-0 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group"
                  href={c.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Avatar
                    avatarUrl={c.author.avatar_url}
                    name={c.author.name}
                    size={32}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#1d1d1f] dark:text-white group-hover:text-blue-500 transition-colors">
                      {c.message}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                        {c.author.name} &lt;{c.author.email}&gt;
                      </p>
                      <span className="text-[#aeaeb2] dark:text-[#636366]">
                        ·
                      </span>
                      <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                        {relativeTime(c.date)}
                      </p>
                    </div>
                  </div>
                  <code className="text-[10px] font-mono text-[#aeaeb2] dark:text-[#636366] flex-shrink-0 pt-0.5">
                    {shortSha(c.sha)}
                  </code>
                </a>
              ))
            )}
          </div>
        </div>
      )}

      {/* Graph */}
      {tab === "graph" && !loading && graph && (
        <div className="bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-black/[0.06] dark:border-white/[0.06] flex items-center gap-3">
            <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
              Branch graph
            </p>
            <div className="flex items-center gap-3 ml-auto flex-wrap">
              {graph.branches.slice(0, 5).map((b, i) => (
                <span
                  key={b}
                  className="flex items-center gap-1 text-xs text-[#6e6e73] dark:text-[#86868b]"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: BRANCH_COLORS[i % BRANCH_COLORS.length],
                    }}
                  />
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-auto p-4">
            <div className="flex gap-0">
              <GitGraph data={graph} />
              <div className="flex-1 min-w-0">
                {graph.commits.map((c, i) => (
                  <div
                    key={c.sha}
                    className="flex items-center gap-3 px-3"
                    style={{ height: 36, marginTop: i === 0 ? 0 : 0 }}
                  >
                    <p className="text-sm text-[#1d1d1f] dark:text-white truncate flex-1">
                      {c.message}
                    </p>
                    <span className="text-xs text-[#6e6e73] dark:text-[#86868b] flex-shrink-0">
                      {c.author}
                    </span>
                    <code className="text-[10px] font-mono text-[#aeaeb2] dark:text-[#636366] flex-shrink-0">
                      {shortSha(c.sha)}
                    </code>
                    <span className="text-xs text-[#aeaeb2] dark:text-[#636366] flex-shrink-0">
                      {relativeTime(c.date)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics */}
      {tab === "analytics" && !loading && analytics && (
        <div className="flex flex-col gap-5">
          {/* Summary stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total commits", value: analytics.total_commits },
              { label: "Active branches", value: analytics.active_branches },
              { label: "Contributors", value: analytics.contributors },
              {
                label: "Commits (30d)",
                value: analytics.commits_by_day
                  .slice(-30)
                  .reduce((s, d) => s + d.count, 0),
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl px-4 py-4"
              >
                <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mb-1">
                  {s.label}
                </p>
                <p className="text-2xl font-semibold text-[#1d1d1f] dark:text-white">
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          {/* Commit activity bar chart */}
          <div className="bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-5">
            <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-4">
              Commit activity (last 30 days)
            </p>
            {(() => {
              const days = analytics.commits_by_day.slice(-30);
              const maxVal = Math.max(1, ...days.map((d) => d.count));

              return (
                <div className="flex items-end gap-1 h-20">
                  {days.map((d) => (
                    <div
                      key={d.date}
                      className="flex-1 flex flex-col items-center gap-1 group relative"
                    >
                      <div
                        className="w-full rounded-sm bg-blue-500/70 hover:bg-blue-500 transition-colors cursor-default"
                        style={{
                          height: `${(d.count / maxVal) * 64}px`,
                          minHeight: d.count > 0 ? 2 : 0,
                        }}
                      />
                      <div className="absolute bottom-full mb-1 hidden group-hover:block z-10 bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-[10px] px-2 py-1 rounded whitespace-nowrap">
                        {d.date}: {d.count}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* Monthly breakdown */}
          <div className="bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-black/[0.06] dark:border-white/[0.06]">
              <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                Monthly activity
              </p>
            </div>
            {analytics.commits_by_month
              .slice(-6)
              .reverse()
              .map((m) => {
                const maxM = Math.max(
                  1,
                  ...analytics.commits_by_month.map((x) => x.count),
                );

                return (
                  <div
                    key={m.month}
                    className="flex items-center gap-4 px-5 py-3 border-b border-black/[0.04] dark:border-white/[0.04] last:border-0"
                  >
                    <p className="text-sm text-[#6e6e73] dark:text-[#86868b] w-20">
                      {m.month}
                    </p>
                    <div className="flex-1 h-1.5 rounded-full bg-black/5 dark:bg-white/5">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${(m.count / maxM) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm font-medium text-[#1d1d1f] dark:text-white w-8 text-right">
                      {m.count}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Repository list card ──────────────────────────────────────────────────────
function RepoCard({
  repo,
  onSelect,
  onDelete,
}: {
  repo: GitRepository;
  onSelect: () => void;
  onDelete: () => void;
}) {
  return (
    <button
      className="w-full text-left bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-5 hover:border-blue-500/40 hover:shadow-sm transition-all group"
      onClick={onSelect}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ background: PROVIDER_COLOR[repo.provider] }}
        >
          {repo.provider[0]?.toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white group-hover:text-blue-500 transition-colors">
            {repo.name}
          </p>
          <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate mt-0.5">
            {repo.repository_url}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-black/[0.04] dark:bg-white/[0.04] text-[#6e6e73] dark:text-[#86868b]">
              {PROVIDER_LABEL[repo.provider]}
            </span>
            <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
              {repo.default_branch}
            </span>
            <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
              Added {relativeTime(repo.created_at)}
            </span>
          </div>
        </div>
        <button
          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-[#aeaeb2] hover:text-red-500 transition-all"
          title="Remove repository"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <svg
            fill="none"
            height="14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 16 16"
            width="14"
          >
            <path d="M2 4h12M6 4V2h4v2M5 4l1 10h4l1-10" />
          </svg>
        </button>
      </div>
    </button>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function GitRepositoriesPage() {
  const { isAuthenticated, loadingAuth } = useAuthStore();
  const [repos, setRepos] = useState<GitRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<GitRepository | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [filterProvider, setFilterProvider] = useState<Provider | "all">("all");

  useEffect(() => {
    if (!isAuthenticated) return;
    repositoryService
      .list()
      .then(setRepos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const filtered = repos.filter(
    (r) =>
      (filterProvider === "all" || r.provider === filterProvider) &&
      r.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this repository from your account?")) return;
    try {
      await repositoryService.delete(id);
      setRepos((prev) => prev.filter((r) => r.id !== id));
    } catch {}
  };

  if (!isAuthenticated && !loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">
          Sign in to manage your repositories.
        </p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Git Repositories | Adrián Escribano</title>
        <meta
          content="Conecta y visualiza tus repositorios de GitHub, GitLab o Bitbucket. Ramas, commits, grafos y analíticas."
          name="description"
        />
        <meta
          content="Git Repositories | Adrián Escribano"
          property="og:title"
        />
        <meta
          content="Conecta y visualiza tus repositorios de GitHub, GitLab o Bitbucket. Ramas, commits, grafos y analíticas."
          property="og:description"
        />
        <meta content="summary_large_image" name="twitter:card" />
      </Head>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {selected ? (
          <RepoDashboard repo={selected} onBack={() => setSelected(null)} />
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-[#1d1d1f] dark:text-white">
                  Git Repositories
                </h1>
                <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">
                  Connect and visualize your repositories from GitHub, GitLab,
                  or Bitbucket.
                </p>
              </div>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-sm font-medium hover:opacity-90 transition-opacity"
                onClick={() => setShowAdd(true)}
              >
                <svg
                  fill="none"
                  height="14"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  viewBox="0 0 16 16"
                  width="14"
                >
                  <path d="M8 2v12M2 8h12" />
                </svg>
                Connect repo
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex-1 max-w-xs">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aeaeb2]"
                  fill="none"
                  height="14"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  viewBox="0 0 16 16"
                  width="14"
                >
                  <circle cx="7" cy="7" r="4.5" />
                  <path d="M10.5 10.5L14 14" />
                </svg>
                <input
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2]"
                  placeholder="Search repositories…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-2 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white"
                value={filterProvider}
                onChange={(e) =>
                  setFilterProvider(e.target.value as Provider | "all")
                }
              >
                <option value="all">All providers</option>
                <option value="github">GitHub</option>
                <option value="gitlab">GitLab</option>
                <option value="bitbucket">Bitbucket</option>
              </select>
            </div>

            {/* List */}
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-[#6e6e73] dark:text-[#86868b] py-8">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Loading repositories…
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <svg
                  className="text-[#aeaeb2]"
                  fill="none"
                  height="40"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                  width="40"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">
                  {search || filterProvider !== "all"
                    ? "No matching repositories"
                    : "No repositories connected"}
                </p>
                {!search && filterProvider === "all" && (
                  <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={() => setShowAdd(true)}
                  >
                    Connect your first repository →
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {filtered.map((r) => (
                  <RepoCard
                    key={r.id}
                    repo={r}
                    onDelete={() => handleDelete(r.id)}
                    onSelect={() => setSelected(r)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {showAdd && (
        <AddRepoModal
          onAdded={(r) => {
            setRepos((prev) => [r, ...prev]);
            setShowAdd(false);
            setSelected(r);
          }}
          onClose={() => setShowAdd(false)}
        />
      )}
    </>
  );
}
