import { useState, useEffect, useCallback } from "react";

import {
  adminService,
  AdminIdea,
  AdminIdeaStats,
} from "@/services/adminService";
import { useT } from "@/hooks/useT";
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

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id: string) => {
    await adminService.deleteIdea(id);
    setConfirmId(null);
    load();
  };

  const filtered = ideas.filter((i) => {
    if (
      search &&
      !i.title.toLowerCase().includes(search.toLowerCase()) &&
      !i.description.toLowerCase().includes(search.toLowerCase()) &&
      !i.owner_email.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    if (statusFilter !== "all" && i.status !== statusFilter) return false;
    if (priorityFilter !== "all" && i.priority !== priorityFilter) return false;
    if (categoryFilter !== "all" && i.category !== categoryFilter) return false;
    if (tagFilter && !i.tags.includes(tagFilter)) return false;

    return true;
  });

  const categories = [
    ...new Set(ideas.map((i) => i.category).filter(Boolean)),
  ].sort();
  const allTags = [...new Set(ideas.flatMap((i) => i.tags))].sort();

  const statusBadge = (s: string) => {
    const cls: Record<string, string> = {
      idea: "admin-badge-info",
      planned: "admin-badge-warning",
      in_progress: "admin-badge",
      done: "admin-badge-success",
      archived: "",
    };

    return (
      <span className={`admin-badge ${cls[s] ?? ""}`}>
        {s.replace("_", " ")}
      </span>
    );
  };

  const priorityBadge = (p: string) => {
    const cls: Record<string, string> = {
      high: "admin-badge-warning",
      medium: "admin-badge",
      low: "admin-badge-success",
    };

    return (
      <span className={`admin-badge ${cls[p] ?? ""}`}>{p}</span>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={t("admin.ideas")}
        description={t("admin.ideasDesc")}
        actions={
          <button
            className="ds-btn-primary"
            onClick={() => setShowCreate(true)}
          >
            {t("admin.newIdea")}
          </button>
        }
      />

      {stats && (
        <AdminStatGrid cols={4}>
          <AdminStat
            label={t("admin.totalIdeas")}
            value={stats.total}
            accent
          />
          <AdminStat
            label={t("admin.ideaCount")}
            value={stats.byStatus.idea ?? 0}
          />
          <AdminStat
            label={t("admin.plannedCount")}
            value={
              (stats.byStatus.planned ?? 0) +
              (stats.byStatus.in_progress ?? 0)
            }
          />
          <AdminStat
            label={t("admin.doneCount")}
            value={stats.byStatus.done ?? 0}
          />
        </AdminStatGrid>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <input
          className="ds-input"
          placeholder={t("admin.searchIdeas")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {(
          ["all", "idea", "planned", "in_progress", "done", "archived"] as const
        ).map((s) => (
          <AdminFilterChip
            key={s}
            active={statusFilter === s}
            onClick={() => setStatusFilter(s)}
          >
            {s === "all" ? t("admin.allStatuses") : s.replace("_", " ")}
          </AdminFilterChip>
        ))}
        <div className="w-px h-5" style={{ background: "var(--border-default)" }} />
        {(["all", "high", "medium", "low"] as const).map((p) => (
          <AdminFilterChip
            key={p}
            active={priorityFilter === p}
            onClick={() => setPriorityFilter(p)}
          >
            {p === "all" ? t("admin.allPriorities") : p}
          </AdminFilterChip>
        ))}
        <div className="w-px h-5" style={{ background: "var(--border-default)" }} />
        <select
          className="ds-input"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {tagFilter && (
          <AdminFilterChip active onClick={() => setTagFilter(null)}>
            #{tagFilter}
          </AdminFilterChip>
        )}
      </div>

      {loading ? (
        <AdminLoadingSkeleton rows={6} />
      ) : filtered.length === 0 ? (
        <AdminPanel>
          <AdminEmptyState
            title={t("admin.noIdeas")}
          />
        </AdminPanel>
      ) : (
        <AdminPanel>
          <div className="flex flex-col divide-y" style={{ borderColor: "var(--border-default)" }}>
            {filtered.map((i) => (
              <div key={i.id} className="px-4 py-3" style={{ borderColor: "var(--border-default)" }}>
                <div className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        className="truncate text-left text-sm font-semibold hover:underline"
                        style={{ color: "var(--text-primary)" }}
                        onClick={() =>
                          setExpandedId(expandedId === i.id ? null : i.id)
                        }
                      >
                        {i.title}
                      </button>
                      {statusBadge(i.status)}
                      {priorityBadge(i.priority)}
                      {i.category && (
                        <span className="admin-badge">
                          {i.category}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs" style={{ color: "var(--text-secondary)" }}>
                      {i.votes} votos · {i.owner_email} · {relativeTime(i.created_at)}
                    </p>
                    {i.tags.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {i.tags.map((tag) => (
                          <button
                            key={tag}
                            className={`admin-filter-chip text-[10px] ${tagFilter === tag ? "admin-filter-chip-active" : ""}`}
                            onClick={() =>
                              setTagFilter(tagFilter === tag ? null : tag)
                            }
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
                        className="ds-btn-danger text-xs"
                        onClick={() => handleDelete(i.id)}
                      >
                        {t("admin.confirm")}
                      </button>
                      <button
                        className="ds-btn-ghost text-xs"
                        onClick={() => setConfirmId(null)}
                      >
                        {t("admin.cancel")}
                      </button>
                    </div>
                  ) : (
                    <button
                      className="ds-btn-icon"
                      title={t("admin.delete")}
                      onClick={() => setConfirmId(i.id)}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                {i.description && (
                  <button
                    className="mt-2 w-full text-left rounded-lg p-3 text-xs leading-relaxed transition-colors hover:bg-[var(--bg-hover)]"
                    style={{ color: "var(--text-secondary)", background: "var(--bg-primary)" }}
                    onClick={() => setViewingDesc(i)}
                  >
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold mb-1" style={{ color: "var(--accent)" }}>
                      Ver descripción
                    </span>
                    <p>{i.description}</p>
                  </button>
                )}
              </div>
            ))}
          </div>
        </AdminPanel>
      )}

      <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
        {filtered.length} / {ideas.length}
      </p>

      {showCreate && (
        <CreateIdeaModal
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            setShowCreate(false);
            load();
          }}
        />
      )}

      {viewingDesc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setViewingDesc(null)}
        >
          <div
            className="admin-panel w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-panel-header">
              <div className="flex-1 min-w-0">
                <div className="admin-panel-title">{viewingDesc.title}</div>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  {statusBadge(viewingDesc.status)}
                  {priorityBadge(viewingDesc.priority)}
                  {viewingDesc.category && (
                    <span className="admin-badge">{viewingDesc.category}</span>
                  )}
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {viewingDesc.votes} votos · {viewingDesc.owner_email} ·{" "}
                    {relativeTime(viewingDesc.created_at)}
                  </span>
                </div>
              </div>
              <button
                className="ds-btn-icon"
                onClick={() => setViewingDesc(null)}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="admin-panel-body">
              <div className="whitespace-pre-wrap text-sm leading-relaxed rounded-lg p-4" style={{ color: "var(--text-primary)", background: "var(--bg-primary)" }}>
                {viewingDesc.description}
              </div>
              {viewingDesc.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {viewingDesc.tags.map((tag) => (
                    <span key={tag} className="admin-badge">
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

function CreateIdeaModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
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
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 5);

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div className="admin-panel w-full max-w-md mx-4">
          <form onSubmit={handleSubmit}>
            <div className="admin-panel-header">
              <h3 className="admin-panel-title">{t("admin.newIdea")}</h3>
            </div>
            <div className="admin-panel-body flex flex-col gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                  {t("admin.ideaTitle")} *
                </label>
                <input
                  autoFocus
                  className="ds-input"
                  maxLength={100}
                  placeholder={t("admin.ideaTitle")}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                  {t("admin.ideaDescription")}
                </label>
                <textarea
                  className="ds-input resize-none"
                  maxLength={2000}
                  placeholder={t("admin.ideaDescription")}
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                    {t("admin.ideaPriority")}
                  </label>
                  <select
                    className="ds-input"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                    {t("admin.ideaCategory")}
                  </label>
                  <input
                    className="ds-input"
                    maxLength={50}
                    placeholder="frontend, design…"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                  {t("admin.ideaTags")}
                </label>
                <input
                  className="ds-input"
                  placeholder="react, typescript, ui"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                />
              </div>
              {error && <p className="text-xs" style={{ color: "var(--color-danger)" }}>{error}</p>}
            </div>
            <div className="flex justify-end gap-2 px-5 py-3">
              <button
                className="ds-btn-secondary"
                type="button"
                onClick={onClose}
              >
                {t("admin.cancel")}
              </button>
              <button
                className="ds-btn-primary"
                disabled={!title.trim() || loading}
                type="submit"
              >
                {loading ? "…" : t("admin.createIdea")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
