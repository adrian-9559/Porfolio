import { useState, useEffect, useCallback } from "react";
import { adminService, AdminIdea, AdminIdeaStats } from "@/services/adminService";
import { useT } from "@/hooks/useT";

const GRADIENT = {
  badge: "bg-emerald-500/10 dark:bg-emerald-400/15 text-emerald-600 dark:text-emerald-400",
  icon: "bg-gradient-to-br from-emerald-500 to-teal-500",
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

export function AdminIdeasSection() {
  const { t } = useT();
  const [ideas, setIdeas] = useState<AdminIdea[]>([]);
  const [stats, setStats] = useState<AdminIdeaStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [viewingDesc, setViewingDesc] = useState<AdminIdea | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [ideasData, statsData] = await Promise.all([
        adminService.listAllIdeas(),
        adminService.getIdeaStats(),
      ]);
      setIdeas(ideasData);
      setStats(statsData);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: string) => {
    await adminService.deleteIdea(id);
    setConfirmId(null);
    load();
  };

  const filtered = ideas.filter((i) => {
    if (search && !i.title.toLowerCase().includes(search.toLowerCase()) && !i.description.toLowerCase().includes(search.toLowerCase()) && !i.owner_email.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && i.status !== statusFilter) return false;
    if (priorityFilter !== "all" && i.priority !== priorityFilter) return false;
    if (categoryFilter !== "all" && i.category !== categoryFilter) return false;
    if (tagFilter && !i.tags.includes(tagFilter)) return false;
    return true;
  });

  const categories = [...new Set(ideas.map((i) => i.category).filter(Boolean))].sort();
  const allTags = [...new Set(ideas.flatMap((i) => i.tags))].sort();

  const statusBadge = (s: string) => {
    const colors: Record<string, string> = {
      idea: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      planned: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      in_progress: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      done: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      archived: "bg-black/5 text-[#6e6e73] dark:bg-white/8 dark:text-[#86868b]",
    };
    return (
      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${colors[s] ?? colors.archived}`}>
        {s.replace("_", " ")}
      </span>
    );
  };

  const priorityBadge = (p: string) => {
    const colors: Record<string, string> = {
      high: "bg-red-500/10 text-red-600 dark:text-red-400",
      medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      low: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    };
    return (
      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${colors[p] ?? "bg-black/5 text-[#6e6e73] dark:bg-white/8 dark:text-[#86868b]"}`}>
        {p}
      </span>
    );
  };

  return (
    <div className="relative flex flex-col gap-6 overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full bg-emerald-500/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-teal-500/6 blur-3xl" />

      {/* Header */}
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${GRADIENT.badge}`}>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Ideas
          </span>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#1d1d1f] dark:text-white">
            {t("admin.ideas")}
          </h1>
          <p className="mt-1 text-sm text-[#6e6e73] dark:text-[#86868b]">
            {t("admin.ideasDesc")}
          </p>
        </div>
        <button
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30"
          onClick={() => setShowCreate(true)}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {t("admin.newIdea")}
        </button>
      </div>

      {/* Stat cards */}
      {stats && (
        <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: t("admin.totalIdeas"), value: stats.total, icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> },
            { label: t("admin.ideaCount"), value: stats.byStatus.idea ?? 0, icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> },
            { label: t("admin.plannedCount"), value: (stats.byStatus.planned ?? 0) + (stats.byStatus.in_progress ?? 0), icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
            { label: t("admin.doneCount"), value: stats.byStatus.done ?? 0, icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
          ].map((s) => (
            <div key={s.label} className="group relative overflow-hidden rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-5 transition-all hover:shadow-xl hover:shadow-emerald-500/5">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 blur-2xl" />
              <div className="relative flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20">
                  {s.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1d1d1f] dark:text-white">{s.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search + filters */}
      <div className="relative flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#aeaeb2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>
          <input
            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] py-2 pl-10 pr-4 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            placeholder={t("admin.searchIdeas")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {(["all", "idea", "planned", "in_progress", "done", "archived"] as const).map((s) => (
          <button
            key={s}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
              statusFilter === s
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/25"
                : "bg-black/5 dark:bg-white/8 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/8 dark:hover:bg-white/12"
            }`}
            onClick={() => setStatusFilter(s)}
          >
            {s === "all" ? t("admin.allStatuses") : s.replace("_", " ")}
          </button>
        ))}
        <div className="w-px bg-black/8 dark:bg-white/8" />
        {(["all", "high", "medium", "low"] as const).map((p) => (
          <button
            key={p}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
              priorityFilter === p
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/25"
                : "bg-black/5 dark:bg-white/8 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/8 dark:hover:bg-white/12"
            }`}
            onClick={() => setPriorityFilter(p)}
          >
            {p === "all" ? t("admin.allPriorities") : p}
          </button>
        ))}
        <div className="w-px bg-black/8 dark:bg-white/8" />
        <select
          className="rounded-full border border-black/10 dark:border-white/10 bg-white px-3 py-1 text-xs font-medium text-[#6e6e73] dark:bg-[#1c1c1e] dark:text-[#86868b]"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {tagFilter && (
          <button
            className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400"
            onClick={() => setTagFilter(null)}
          >
            #{tagFilter}
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Ideas list */}
      <div className="relative overflow-hidden rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116]">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 transition-opacity hover:opacity-100" style={{ pointerEvents: "none" }} />
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-6 w-6 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <svg className="h-10 w-10 text-[#d1d1d6] dark:text-[#424245]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">{t("admin.noIdeas")}</p>
          </div>
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((i) => (
              <div key={i.id} className="group/item px-5 py-3.5 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                <div className="relative flex items-center gap-3">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 transition-opacity group-hover/item:opacity-100" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        className="truncate text-left text-sm font-semibold text-[#1d1d1f] dark:text-white hover:underline"
                        onClick={() => setExpandedId(expandedId === i.id ? null : i.id)}
                      >
                        {i.title}
                      </button>
                      {statusBadge(i.status)}
                      {priorityBadge(i.priority)}
                      {i.category && (
                        <span className="inline-flex items-center rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-medium text-[#6e6e73] dark:bg-white/8 dark:text-[#86868b]">
                          {i.category}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-[#6e6e73] dark:text-[#86868b]">
                      <span className="inline-flex items-center gap-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                        {i.votes}
                      </span>
                      {" · "}{i.owner_email} · {relativeTime(i.created_at)}
                    </p>
                    {i.tags.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {i.tags.map((tag) => (
                          <button
                            key={tag}
                            className={`rounded-md px-1.5 py-0.5 text-[10px] transition-colors ${
                              tagFilter === tag
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "bg-black/5 text-[#6e6e73] dark:bg-white/8 dark:text-[#86868b] hover:bg-black/8 dark:hover:bg-white/12"
                            }`}
                            onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {confirmId === i.id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white shadow-md shadow-red-500/25 transition-colors hover:bg-red-600"
                        onClick={() => handleDelete(i.id)}
                      >
                        {t("admin.confirm")}
                      </button>
                      <button
                        className="rounded-lg bg-black/5 px-3 py-1.5 text-xs font-medium text-[#6e6e73] transition-colors hover:text-[#1d1d1f] dark:bg-white/8 dark:text-[#86868b] dark:hover:text-white"
                        onClick={() => setConfirmId(null)}
                      >
                        {t("admin.cancel")}
                      </button>
                    </div>
                  ) : (
                    <button
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-[#aeaeb2] transition-all hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500"
                      title={t("admin.delete")}
                      onClick={() => setConfirmId(i.id)}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
                {i.description && (
                  <button
                    className="mt-2 w-full text-left rounded-xl bg-black/[0.03] p-3 text-xs leading-relaxed text-[#6e6e73] dark:bg-white/[0.03] dark:text-[#86868b] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors line-clamp-2"
                    onClick={() => setViewingDesc(i)}
                  >
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Ver descripción
                    </span>
                    <p>{i.description}</p>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-center text-[#aeaeb2] dark:text-[#636366]">
        {filtered.length} / {ideas.length}
      </p>

      {showCreate && <CreateIdeaModal onClose={() => setShowCreate(false)} onCreated={() => { setShowCreate(false); load(); }} />}

      {/* Description Modal */}
      {viewingDesc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setViewingDesc(null)}>
          <div
            className="w-full max-w-lg bg-white dark:bg-[#111116] rounded-2xl border border-black/8 dark:border-white/8 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-6">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white">{viewingDesc.title}</h3>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    {statusBadge(viewingDesc.status)}
                    {priorityBadge(viewingDesc.priority)}
                    {viewingDesc.category && (
                      <span className="inline-flex items-center rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-medium text-[#6e6e73] dark:bg-white/8 dark:text-[#86868b]">
                        {viewingDesc.category}
                      </span>
                    )}
                    <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                      {viewingDesc.votes} votos · {viewingDesc.owner_email} · {relativeTime(viewingDesc.created_at)}
                    </span>
                  </div>
                </div>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#aeaeb2] hover:bg-black/5 dark:hover:bg-white/8 hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
                  onClick={() => setViewingDesc(null)}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-[#1d1d1f]/80 dark:text-white/80 bg-black/[0.03] dark:bg-white/[0.03] rounded-xl p-4">
                {viewingDesc.description}
              </div>
              {viewingDesc.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {viewingDesc.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Create Idea Modal ─────────────────────────────────────────────────────────

function CreateIdeaModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const { t } = useT();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    setError("");
    try {
      const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 5);
      await adminService.createIdea({
        title: title.trim(),
        description: description.trim(),
        priority,
        category: category.trim(),
        tags,
      });
      onCreated();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full max-w-md mx-4 overflow-hidden rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
          <form onSubmit={handleSubmit}>
            <div className="border-b border-black/6 dark:border-white/6 px-5 py-4">
              <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white">{t("admin.newIdea")}</h3>
            </div>
            <div className="flex flex-col gap-3 px-5 py-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-[#6e6e73] dark:text-[#86868b]">{t("admin.ideaTitle")} *</label>
                <input className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] px-3 py-2 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-emerald-500/30" placeholder={t("admin.ideaTitle")} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} autoFocus />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#6e6e73] dark:text-[#86868b]">{t("admin.ideaDescription")}</label>
                <textarea className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] px-3 py-2 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-emerald-500/30" placeholder={t("admin.ideaDescription")} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={2000} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#6e6e73] dark:text-[#86868b]">{t("admin.ideaPriority")}</label>
                  <select className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] px-3 py-2 text-sm text-[#1d1d1f] dark:text-white" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#6e6e73] dark:text-[#86868b]">{t("admin.ideaCategory")}</label>
                  <input className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] px-3 py-2 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-emerald-500/30" placeholder="frontend, design…" value={category} onChange={(e) => setCategory(e.target.value)} maxLength={50} />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#6e6e73] dark:text-[#86868b]">{t("admin.ideaTags")}</label>
                <input className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] px-3 py-2 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-emerald-500/30" placeholder="react, typescript, ui" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} />
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
            <div className="flex justify-end gap-2 border-t border-black/6 dark:border-white/6 px-5 py-3">
              <button type="button" className="rounded-xl px-4 py-2 text-sm font-medium text-[#6e6e73] dark:text-[#86868b] transition-colors hover:bg-black/5 dark:hover:bg-white/8" onClick={onClose}>
                {t("admin.cancel")}
              </button>
              <button type="submit" disabled={!title.trim() || loading} className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30 disabled:opacity-50">
                {loading ? "…" : t("admin.createIdea")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
