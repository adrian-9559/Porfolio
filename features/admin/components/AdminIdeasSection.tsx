import { useState, useEffect, useCallback } from "react";
import { SectionHeader, Card, Spinner, EmptyState, Badge, IconBtn, SearchInput, Btn, relativeTime, Icons } from "./AdminShared";
import { adminService, AdminIdea, AdminIdeaStats } from "@/services/adminService";
import { useT } from "@/hooks/useT";

export function AdminIdeasSection() {
  const { t } = useT();
  const [ideas, setIdeas] = useState<AdminIdea[]>([]);
  const [stats, setStats] = useState<AdminIdeaStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
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
    return true;
  });

  const statusBadge = (s: string) => {
    const m: Record<string, "blue" | "amber" | "green" | "gray" | "purple"> = {
      idea: "blue", planned: "amber", in_progress: "purple", done: "green", archived: "gray",
    };
    return <Badge label={s.replace("_", " ")} color={m[s] ?? "gray"} />;
  };

  const priorityBadge = (p: string) => {
    const m: Record<string, "red" | "amber" | "green"> = { high: "red", medium: "amber", low: "green" };
    return <Badge label={p} color={m[p] ?? "gray"} />;
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        title={t("admin.ideas")}
        desc={t("admin.ideasDesc")}
        action={
          <Btn size="sm" variant="primary" onClick={() => setShowCreate(true)}>
            + {t("admin.newIdea")}
          </Btn>
        }
      />

      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: t("admin.totalIdeas"), value: stats.total },
            { label: t("admin.ideaCount"), value: stats.byStatus.idea ?? 0 },
            { label: t("admin.plannedCount"), value: (stats.byStatus.planned ?? 0) + (stats.byStatus.in_progress ?? 0) },
            { label: t("admin.doneCount"), value: stats.byStatus.done ?? 0 },
          ].map((s) => (
            <Card key={s.label}>
              <div className="px-4 py-3 text-center">
                <p className="text-2xl font-semibold text-foreground">{s.value}</p>
                <p className="text-xs text-muted mt-0.5">{s.label}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <SearchInput value={search} onChange={setSearch} placeholder={t("admin.searchIdeas")} />
        <select className="px-3 py-1.5 rounded-xl border border-border/30 bg-default text-sm text-foreground" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">{t("admin.allStatuses")}</option>
          {["idea", "planned", "in_progress", "done", "archived"].map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
        </select>
        <select className="px-3 py-1.5 rounded-xl border border-border/30 bg-default text-sm text-foreground" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="all">{t("admin.allPriorities")}</option>
          {["high", "medium", "low"].map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <Card>
        {loading ? <Spinner /> : filtered.length === 0 ? (
          <EmptyState text={t("admin.noIdeas")} />
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((i) => (
              <div key={i.id} className="px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        className="text-sm font-medium text-foreground truncate hover:underline text-left"
                        onClick={() => setExpandedId(expandedId === i.id ? null : i.id)}
                      >
                        {i.title}
                      </button>
                      {statusBadge(i.status)}
                      {priorityBadge(i.priority)}
                      {i.category && <Badge label={i.category} color="gray" />}
                    </div>
                    <p className="text-xs text-muted mt-0.5">
                      🗳 {i.votes} · {i.owner_email} · {relativeTime(i.created_at)}
                    </p>
                    {i.tags.length > 0 && (
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {i.tags.map((tag) => (
                          <span key={tag} className="px-1.5 py-0.5 rounded bg-default text-[10px] text-muted">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  {confirmId === i.id ? (
                    <div className="flex items-center gap-1.5">
                      <Btn size="sm" variant="danger" onClick={() => handleDelete(i.id)}>{t("admin.confirm")}</Btn>
                      <Btn size="sm" variant="ghost" onClick={() => setConfirmId(null)}>{t("admin.cancel")}</Btn>
                    </div>
                  ) : (
                    <IconBtn danger icon={Icons.trash} title={t("admin.delete")} onClick={() => setConfirmId(i.id)} />
                  )}
                </div>
                {expandedId === i.id && i.description && (
                  <div className="mt-2 p-3 rounded-xl bg-default text-sm text-foreground/80 whitespace-pre-wrap">
                    {i.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
      <p className="text-xs text-center text-muted">
        {filtered.length} / {ideas.length}
      </p>

      {showCreate && <CreateIdeaModal onClose={() => setShowCreate(false)} onCreated={() => { setShowCreate(false); load(); }} />}
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
    } catch (err: any) {
      setError(err.message || "Error");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
      <Card className="w-full max-w-md mx-4 p-0">
        <form onSubmit={handleSubmit}>
          <div className="px-5 py-4 border-b border-black/6 dark:border-white/6">
            <h3 className="text-sm font-semibold text-foreground">{t("admin.newIdea")}</h3>
          </div>
          <div className="px-5 py-4 flex flex-col gap-3">
            <div>
              <label className="text-xs font-medium text-muted mb-1 block">{t("admin.ideaTitle")} *</label>
              <input className="w-full px-3 py-2 rounded-xl border border-border/30 bg-default text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30" placeholder={t("admin.ideaTitle")} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} autoFocus />
            </div>
            <div>
              <label className="text-xs font-medium text-muted mb-1 block">{t("admin.ideaDescription")}</label>
              <textarea className="w-full px-3 py-2 rounded-xl border border-border/30 bg-default text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 resize-none" placeholder={t("admin.ideaDescription")} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={2000} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted mb-1 block">{t("admin.ideaPriority")}</label>
                <select className="w-full px-3 py-2 rounded-xl border border-border/30 bg-default text-sm text-foreground" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted mb-1 block">{t("admin.ideaCategory")}</label>
                <input className="w-full px-3 py-2 rounded-xl border border-border/30 bg-default text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30" placeholder="frontend, design…" value={category} onChange={(e) => setCategory(e.target.value)} maxLength={50} />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted mb-1 block">{t("admin.ideaTags")}</label>
              <input className="w-full px-3 py-2 rounded-xl border border-border/30 bg-default text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30" placeholder="react, typescript, ui" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} />
            </div>
            {error && <p className="text-xs text-danger">{error}</p>}
          </div>
          <div className="px-5 py-3 border-t border-black/6 dark:border-white/6 flex justify-end gap-2">
            <Btn type="button" variant="ghost" onClick={onClose}>{t("admin.cancel")}</Btn>
            <Btn type="submit" variant="primary" disabled={!title.trim() || loading}>{loading ? "…" : t("admin.createIdea")}</Btn>
          </div>
        </form>
      </Card>
      </div>
    </div>
  );
}
