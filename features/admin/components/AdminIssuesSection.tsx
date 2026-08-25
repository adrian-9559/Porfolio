import { useState, useEffect, useCallback } from "react";
import { SectionHeader, Card, Spinner, EmptyState, Badge, IconBtn, SearchInput, Btn, relativeTime, Icons } from "./AdminShared";
import { adminService, AdminIssueBoard, AdminIssueTicket, AdminIssueStats } from "@/services/adminService";
import { issueTrackerService } from "@/services/issueTrackerService";
import { useT } from "@/hooks/useT";

type Tab = "boards" | "tickets";

export function AdminIssuesSection() {
  const { t } = useT();
  const [tab, setTab] = useState<Tab>("boards");
  const [boards, setBoards] = useState<AdminIssueBoard[]>([]);
  const [tickets, setTickets] = useState<AdminIssueTicket[]>([]);
  const [stats, setStats] = useState<AdminIssueStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [showCreateTicket, setShowCreateTicket] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [b, tk, st] = await Promise.all([
        adminService.listIssueBoards(),
        adminService.listIssueTickets(),
        adminService.getIssueStats(),
      ]);
      setBoards(b);
      setTickets(tk);
      setStats(st);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: string, type: "board" | "ticket") => {
    if (type === "board") await adminService.deleteIssueBoard(id);
    else await adminService.deleteIssueTicket(id);
    setConfirmId(null);
    load();
  };

  const filteredBoards = boards.filter(
    (b) => b.name.toLowerCase().includes(search.toLowerCase()) || b.owner_email.toLowerCase().includes(search.toLowerCase())
  );
  const filteredTickets = tickets.filter((tk) => {
    if (search && !tk.title.toLowerCase().includes(search.toLowerCase()) && !tk.created_by.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && tk.status !== statusFilter) return false;
    if (priorityFilter !== "all" && tk.priority !== priorityFilter) return false;
    return true;
  });

  const statusBadge = (s: string) => {
    const m: Record<string, "blue" | "green" | "amber" | "red" | "gray"> = {
      open: "blue", in_progress: "amber", resolved: "green", closed: "gray", urgent: "red",
    };
    return <Badge label={s} color={m[s] ?? "gray"} />;
  };

  const priorityBadge = (p: string) => {
    const m: Record<string, "red" | "amber" | "blue" | "green" | "gray"> = { urgent: "red", high: "amber", medium: "blue", low: "green" };
    return <Badge label={p} color={m[p] ?? "gray"} />;
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        title={t("admin.issues")}
        desc={t("admin.issuesDesc")}
        action={
          <div className="flex gap-2">
            <Btn size="sm" variant="primary" onClick={() => setShowCreateBoard(true)}>
              + {t("admin.newBoard")}
            </Btn>
            <Btn size="sm" variant="ghost" onClick={() => setShowCreateTicket(true)}>
              + {t("admin.newTicket")}
            </Btn>
          </div>
        }
      />

      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: t("admin.totalBoards"), value: stats.totalBoards },
            { label: t("admin.totalTickets"), value: stats.totalTickets },
            { label: t("admin.openTickets"), value: stats.byStatus.open ?? 0 },
            { label: t("admin.urgentTickets"), value: stats.byPriority.urgent ?? 0 },
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

      <div className="flex gap-1 border-b border-border pb-0">
        {(["boards", "tickets"] as Tab[]).map((tb) => (
          <button
            key={tb}
            className={`px-4 py-2 text-sm font-medium -mb-px transition-colors ${
              tab === tb ? "border-b-2 border-accent text-accent" : "text-muted hover:text-foreground"
            }`}
            onClick={() => setTab(tb)}
          >
            {tb === "boards" ? t("admin.issueBoards") : t("admin.issueTickets")}
          </button>
        ))}
      </div>

      <SearchInput value={search} onChange={setSearch} placeholder={t("admin.searchIssues")} />

      {tab === "tickets" && (
        <div className="flex flex-wrap gap-2">
          <select className="px-3 py-1.5 rounded-xl border border-border/30 bg-default text-sm text-foreground" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">{t("admin.allStatuses")}</option>
            {["open", "in_progress", "resolved", "closed"].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="px-3 py-1.5 rounded-xl border border-border/30 bg-default text-sm text-foreground" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="all">{t("admin.allPriorities")}</option>
            {["urgent", "high", "medium", "low"].map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      )}

      <Card>
        {loading ? <Spinner /> : tab === "boards" ? (
          filteredBoards.length === 0 ? <EmptyState text={t("admin.noBoards")} /> : (
            <div className="divide-y divide-black/5 dark:divide-white/5">
              {filteredBoards.map((b) => (
                <div key={b.id} className="flex items-center gap-3 px-5 py-3.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{b.name}</p>
                    <p className="text-xs text-muted mt-0.5">
                      {b.owner_email} · {b.ticket_count} {t("admin.issueTickets").toLowerCase()} · {b.member_count} {t("admin.members").toLowerCase()} · {relativeTime(b.created_at)}
                    </p>
                  </div>
                  {confirmId === b.id ? (
                    <div className="flex items-center gap-1.5">
                      <Btn size="sm" variant="danger" onClick={() => handleDelete(b.id, "board")}>{t("admin.confirm")}</Btn>
                      <Btn size="sm" variant="ghost" onClick={() => setConfirmId(null)}>{t("admin.cancel")}</Btn>
                    </div>
                  ) : (
                    <IconBtn danger icon={Icons.trash} title={t("admin.delete")} onClick={() => setConfirmId(b.id)} />
                  )}
                </div>
              ))}
            </div>
          )
        ) : filteredTickets.length === 0 ? <EmptyState text={t("admin.noTickets")} /> : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filteredTickets.map((tk) => (
              <div key={tk.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-foreground truncate">{tk.title}</p>
                    {statusBadge(tk.status)}
                    {priorityBadge(tk.priority)}
                  </div>
                  <p className="text-xs text-muted mt-0.5">
                    {tk.board_name} · {tk.created_by} · {relativeTime(tk.created_at)}
                  </p>
                </div>
                {confirmId === tk.id ? (
                  <div className="flex items-center gap-1.5">
                    <Btn size="sm" variant="danger" onClick={() => handleDelete(tk.id, "ticket")}>{t("admin.confirm")}</Btn>
                    <Btn size="sm" variant="ghost" onClick={() => setConfirmId(null)}>{t("admin.cancel")}</Btn>
                  </div>
                ) : (
                  <IconBtn danger icon={Icons.trash} title={t("admin.delete")} onClick={() => setConfirmId(tk.id)} />
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
      <p className="text-xs text-center text-muted">
        {tab === "boards" ? `${filteredBoards.length} / ${boards.length}` : `${filteredTickets.length} / ${tickets.length}`}
      </p>

      {showCreateBoard && <CreateBoardModal onClose={() => setShowCreateBoard(false)} onCreated={() => { setShowCreateBoard(false); load(); }} />}
      {showCreateTicket && <CreateTicketModal boards={boards} onClose={() => setShowCreateTicket(false)} onCreated={() => { setShowCreateTicket(false); load(); }} />}
    </div>
  );
}

// ── Create Board Modal ────────────────────────────────────────────────────────

function CreateBoardModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const { t } = useT();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError("");
    try {
      await issueTrackerService.createBoard(name.trim(), description.trim());
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
            <h3 className="text-sm font-semibold text-foreground">{t("admin.newBoard")}</h3>
          </div>
          <div className="px-5 py-4 flex flex-col gap-3">
            <div>
              <label className="text-xs font-medium text-muted mb-1 block">{t("admin.boardName")} *</label>
              <input className="w-full px-3 py-2 rounded-xl border border-border/30 bg-default text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30" placeholder={t("admin.boardName")} value={name} onChange={(e) => setName(e.target.value)} maxLength={100} autoFocus />
            </div>
            <div>
              <label className="text-xs font-medium text-muted mb-1 block">{t("admin.boardDescription")}</label>
              <textarea className="w-full px-3 py-2 rounded-xl border border-border/30 bg-default text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 resize-none" placeholder={t("admin.boardDescription")} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={2000} />
            </div>
            {error && <p className="text-xs text-danger">{error}</p>}
          </div>
          <div className="px-5 py-3 border-t border-black/6 dark:border-white/6 flex justify-end gap-2">
            <Btn type="button" variant="ghost" onClick={onClose}>{t("admin.cancel")}</Btn>
            <Btn type="submit" variant="primary" disabled={!name.trim() || loading}>{loading ? "…" : t("admin.createBoard")}</Btn>
          </div>
        </form>
      </Card>
      </div>
    </div>
  );
}

// ── Create Ticket Modal ───────────────────────────────────────────────────────

function CreateTicketModal({ boards, onClose, onCreated }: { boards: AdminIssueBoard[]; onClose: () => void; onCreated: () => void }) {
  const { t } = useT();
  const [boardId, setBoardId] = useState(boards[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [assignedTo, setAssignedTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!boardId || !title.trim()) return;
    setLoading(true);
    setError("");
    try {
      await issueTrackerService.createTicket(boardId, title.trim(), description.trim(), priority, assignedTo.trim());
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
            <h3 className="text-sm font-semibold text-foreground">{t("admin.newTicket")}</h3>
          </div>
          <div className="px-5 py-4 flex flex-col gap-3">
            <div>
              <label className="text-xs font-medium text-muted mb-1 block">{t("admin.selectBoard")} *</label>
              <select className="w-full px-3 py-2 rounded-xl border border-border/30 bg-default text-sm text-foreground" value={boardId} onChange={(e) => setBoardId(e.target.value)}>
                {boards.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted mb-1 block">{t("admin.ticketTitle")} *</label>
              <input className="w-full px-3 py-2 rounded-xl border border-border/30 bg-default text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30" placeholder={t("admin.ticketTitle")} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} autoFocus />
            </div>
            <div>
              <label className="text-xs font-medium text-muted mb-1 block">{t("admin.ticketDescription")}</label>
              <textarea className="w-full px-3 py-2 rounded-xl border border-border/30 bg-default text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 resize-none" placeholder={t("admin.ticketDescription")} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={5000} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted mb-1 block">{t("admin.ticketPriority")}</label>
              <div className="flex gap-3">
                {["low", "medium", "high", "urgent"].map((p) => (
                  <label key={p} className="flex items-center gap-1.5 text-sm text-foreground cursor-pointer">
                    <input type="radio" name="priority" value={p} checked={priority === p} onChange={() => setPriority(p)} className="accent-accent" />
                    {p}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted mb-1 block">{t("admin.ticketAssignTo")}</label>
              <input className="w-full px-3 py-2 rounded-xl border border-border/30 bg-default text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30" placeholder="email@example.com" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} type="email" />
            </div>
            {error && <p className="text-xs text-danger">{error}</p>}
          </div>
          <div className="px-5 py-3 border-t border-black/6 dark:border-white/6 flex justify-end gap-2">
            <Btn type="button" variant="ghost" onClick={onClose}>{t("admin.cancel")}</Btn>
            <Btn type="submit" variant="primary" disabled={!boardId || !title.trim() || loading}>{loading ? "…" : t("admin.createTicket")}</Btn>
          </div>
        </form>
      </Card>
      </div>
    </div>
  );
}
