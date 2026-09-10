import { useState, useEffect, useCallback } from "react";

import {
  adminService,
  AdminIssueBoard,
  AdminIssueTicket,
  AdminIssueStats,
} from "@/services/adminService";
import { issueTrackerService } from "@/services/issueTrackerService";
import { useT } from "@/hooks/useT";
import {
  AdminPageHeader,
  AdminStatGrid,
  AdminStat,
  AdminPanel,
  AdminEmptyState,
  AdminLoadingSkeleton,
  AdminFilterChip,
} from "./AdminShell";

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

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id: string, type: "board" | "ticket") => {
    if (type === "board") await adminService.deleteIssueBoard(id);
    else await adminService.deleteIssueTicket(id);
    setConfirmId(null);
    load();
  };

  const filteredBoards = boards.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.owner_email.toLowerCase().includes(search.toLowerCase()),
  );
  const filteredTickets = tickets.filter((tk) => {
    if (
      search &&
      !tk.title.toLowerCase().includes(search.toLowerCase()) &&
      !tk.created_by.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    if (statusFilter !== "all" && tk.status !== statusFilter) return false;
    if (priorityFilter !== "all" && tk.priority !== priorityFilter)
      return false;

    return true;
  });

  const statusBadge = (s: string) => {
    const cls: Record<string, string> = {
      open: "admin-badge-info",
      in_progress: "admin-badge-warning",
      resolved: "admin-badge-success",
      closed: "admin-badge",
      urgent: "admin-badge-danger",
    };

    return (
      <span className={`admin-badge ${cls[s] ?? "admin-badge"}`}>
        {s}
      </span>
    );
  };

  const priorityBadge = (p: string) => {
    const cls: Record<string, string> = {
      urgent: "admin-badge-danger",
      high: "admin-badge-warning",
      medium: "admin-badge-info",
      low: "admin-badge-success",
    };

    return (
      <span className={`admin-badge ${cls[p] ?? "admin-badge"}`}>
        {p}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={t("admin.issues")}
        description={t("admin.issuesDesc")}
        actions={
          <>
            <button
              className="ds-btn-primary"
              onClick={() => setShowCreateBoard(true)}
            >
              {t("admin.newBoard")}
            </button>
            <button
              className="ds-btn-secondary"
              onClick={() => setShowCreateTicket(true)}
            >
              {t("admin.newTicket")}
            </button>
          </>
        }
      />

      {stats && (
        <AdminStatGrid cols={4}>
          <AdminStat
            label={t("admin.totalBoards")}
            value={stats.totalBoards}
          />
          <AdminStat
            label={t("admin.totalTickets")}
            value={stats.totalTickets}
          />
          <AdminStat
            label={t("admin.openTickets")}
            value={stats.byStatus.open ?? 0}
          />
          <AdminStat
            label={t("admin.urgentTickets")}
            value={stats.byPriority.urgent ?? 0}
          />
        </AdminStatGrid>
      )}

      <div className="admin-tabs">
        {(["boards", "tickets"] as Tab[]).map((tb) => (
          <button
            key={tb}
            className={`admin-tab ${tab === tb ? "admin-tab-active" : ""}`}
            onClick={() => setTab(tb)}
          >
            {tb === "boards" ? t("admin.issueBoards") : t("admin.issueTickets")}
          </button>
        ))}
      </div>

      <input
        className="ds-input"
        placeholder={t("admin.searchIssues")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {tab === "tickets" && (
        <div className="flex flex-wrap gap-2">
          {["all", "open", "in_progress", "resolved", "closed"].map((s) => (
            <AdminFilterChip
              key={s}
              active={statusFilter === s}
              onClick={() => setStatusFilter(s)}
            >
              {s === "all" ? t("admin.allStatuses") : s}
            </AdminFilterChip>
          ))}
          <div className="w-px bg-[var(--border-default)]" />
          {["all", "urgent", "high", "medium", "low"].map((p) => (
            <AdminFilterChip
              key={p}
              active={priorityFilter === p}
              onClick={() => setPriorityFilter(p)}
            >
              {p === "all" ? t("admin.allPriorities") : p}
            </AdminFilterChip>
          ))}
        </div>
      )}

      <AdminPanel compact>
        {loading ? (
          <AdminLoadingSkeleton rows={5} />
        ) : tab === "boards" ? (
          filteredBoards.length === 0 ? (
            <AdminEmptyState
              icon={
                <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              title={t("admin.noBoards")}
            />
          ) : (
            <div className="flex flex-col">
              {filteredBoards.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-default)] last:border-b-0 hover:bg-[var(--bg-hover)] transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                      {b.name}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {b.owner_email} · {b.ticket_count}{" "}
                      {t("admin.issueTickets").toLowerCase()} · {b.member_count}{" "}
                      {t("admin.members").toLowerCase()}
                    </p>
                  </div>
                  {confirmId === b.id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        className="ds-btn-danger text-xs"
                        onClick={() => handleDelete(b.id, "board")}
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
                      className="ds-btn-icon text-[var(--text-muted)] hover:text-[var(--color-danger)]"
                      title={t("admin.delete")}
                      onClick={() => setConfirmId(b.id)}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )
        ) : filteredTickets.length === 0 ? (
          <AdminEmptyState
            icon={
              <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            title={t("admin.noTickets")}
          />
        ) : (
          <div className="flex flex-col">
            {filteredTickets.map((tk) => (
              <div
                key={tk.id}
                className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-default)] last:border-b-0 hover:bg-[var(--bg-hover)] transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                      {tk.title}
                    </p>
                    {statusBadge(tk.status)}
                    {priorityBadge(tk.priority)}
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                    {tk.board_name} · {tk.created_by}
                  </p>
                </div>
                {confirmId === tk.id ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      className="ds-btn-danger text-xs"
                      onClick={() => handleDelete(tk.id, "ticket")}
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
                    className="ds-btn-icon text-[var(--text-muted)] hover:text-[var(--color-danger)]"
                    title={t("admin.delete")}
                    onClick={() => setConfirmId(tk.id)}
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

      <p className="text-xs text-center text-[var(--text-muted)]">
        {tab === "boards"
          ? `${filteredBoards.length} / ${boards.length}`
          : `${filteredTickets.length} / ${tickets.length}`}
      </p>

      {showCreateBoard && (
        <CreateBoardModal
          onClose={() => setShowCreateBoard(false)}
          onCreated={() => {
            setShowCreateBoard(false);
            load();
          }}
        />
      )}
      {showCreateTicket && (
        <CreateTicketModal
          boards={boards}
          onClose={() => setShowCreateTicket(false)}
          onCreated={() => {
            setShowCreateTicket(false);
            load();
          }}
        />
      )}
    </div>
  );
}

// ── Create Board Modal ────────────────────────────────────────────────────────

function CreateBoardModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
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
        <div className="w-full max-w-md mx-4 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="border-b border-[var(--border-default)] px-5 py-4">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                {t("admin.newBoard")}
              </h3>
            </div>
            <div className="flex flex-col gap-3 px-5 py-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">
                  {t("admin.boardName")} *
                </label>
                <input
                  autoFocus
                  className="ds-input"
                  maxLength={100}
                  placeholder={t("admin.boardName")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">
                  {t("admin.boardDescription")}
                </label>
                <textarea
                  className="ds-input resize-none"
                  maxLength={2000}
                  placeholder={t("admin.boardDescription")}
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {error && <p className="text-xs text-[var(--color-danger)]">{error}</p>}
            </div>
            <div className="flex justify-end gap-2 border-t border-[var(--border-default)] px-5 py-3">
              <button
                className="ds-btn-ghost"
                type="button"
                onClick={onClose}
              >
                {t("admin.cancel")}
              </button>
              <button
                className="ds-btn-primary"
                disabled={!name.trim() || loading}
                type="submit"
              >
                {loading ? "…" : t("admin.createBoard")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ── Create Ticket Modal ───────────────────────────────────────────────────────

function CreateTicketModal({
  boards,
  onClose,
  onCreated,
}: {
  boards: AdminIssueBoard[];
  onClose: () => void;
  onCreated: () => void;
}) {
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
      await issueTrackerService.createTicket(
        boardId,
        title.trim(),
        description.trim(),
        priority,
        assignedTo.trim(),
      );
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
        <div className="w-full max-w-md mx-4 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="border-b border-[var(--border-default)] px-5 py-4">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                {t("admin.newTicket")}
              </h3>
            </div>
            <div className="flex flex-col gap-3 px-5 py-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">
                  {t("admin.selectBoard")} *
                </label>
                <select
                  className="ds-input"
                  value={boardId}
                  onChange={(e) => setBoardId(e.target.value)}
                >
                  {boards.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">
                  {t("admin.ticketTitle")} *
                </label>
                <input
                  autoFocus
                  className="ds-input"
                  maxLength={200}
                  placeholder={t("admin.ticketTitle")}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">
                  {t("admin.ticketDescription")}
                </label>
                <textarea
                  className="ds-input resize-none"
                  maxLength={5000}
                  placeholder={t("admin.ticketDescription")}
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">
                  {t("admin.ticketPriority")}
                </label>
                <div className="flex gap-3">
                  {["low", "medium", "high", "urgent"].map((p) => (
                    <label
                      key={p}
                      className="flex cursor-pointer items-center gap-1.5 text-sm text-[var(--text-primary)]"
                    >
                      <input
                        checked={priority === p}
                        className="accent-[var(--accent)]"
                        name="priority"
                        type="radio"
                        value={p}
                        onChange={() => setPriority(p)}
                      />
                      {p}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">
                  {t("admin.ticketAssignTo")}
                </label>
                <input
                  className="ds-input"
                  placeholder="email@example.com"
                  type="email"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                />
              </div>
              {error && <p className="text-xs text-[var(--color-danger)]">{error}</p>}
            </div>
            <div className="flex justify-end gap-2 border-t border-[var(--border-default)] px-5 py-3">
              <button
                className="ds-btn-ghost"
                type="button"
                onClick={onClose}
              >
                {t("admin.cancel")}
              </button>
              <button
                className="ds-btn-primary"
                disabled={!boardId || !title.trim() || loading}
                type="submit"
              >
                {loading ? "…" : t("admin.createTicket")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
