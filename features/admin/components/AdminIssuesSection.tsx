import { useState, useEffect, useCallback } from "react";
import { adminService, AdminIssueBoard, AdminIssueTicket, AdminIssueStats } from "@/services/adminService";
import { issueTrackerService } from "@/services/issueTrackerService";
import { useT } from "@/hooks/useT";

type Tab = "boards" | "tickets";

const GRADIENT = {
  badge: "bg-indigo-500/10 dark:bg-indigo-400/15 text-indigo-600 dark:text-indigo-400",
  icon: "bg-gradient-to-br from-indigo-500 to-violet-500",
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
    const colors: Record<string, string> = {
      open: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      in_progress: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      resolved: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      closed: "bg-black/5 text-[#6e6e73] dark:bg-white/8 dark:text-[#86868b]",
      urgent: "bg-red-500/10 text-red-600 dark:text-red-400",
    };
    return (
      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${colors[s] ?? colors.closed}`}>
        {s}
      </span>
    );
  };

  const priorityBadge = (p: string) => {
    const colors: Record<string, string> = {
      urgent: "bg-red-500/10 text-red-600 dark:text-red-400",
      high: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      medium: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
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
      <div className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full bg-indigo-500/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-violet-500/6 blur-3xl" />

      {/* Header */}
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${GRADIENT.badge}`}>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Issue Tracker
          </span>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#1d1d1f] dark:text-white">
            {t("admin.issues")}
          </h1>
          <p className="mt-1 text-sm text-[#6e6e73] dark:text-[#86868b]">
            {t("admin.issuesDesc")}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30"
            onClick={() => setShowCreateBoard(true)}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {t("admin.newBoard")}
          </button>
          <button
            className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 dark:border-white/10 px-4 py-2 text-sm font-semibold text-[#1d1d1f] dark:text-white transition-all hover:bg-black/5 dark:hover:bg-white/8"
            onClick={() => setShowCreateTicket(true)}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {t("admin.newTicket")}
          </button>
        </div>
      </div>

      {/* Stat cards */}
      {stats && (
        <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: t("admin.totalBoards"), value: stats.totalBoards, icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
            { label: t("admin.totalTickets"), value: stats.totalTickets, icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
            { label: t("admin.openTickets"), value: stats.byStatus.open ?? 0, icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
            { label: t("admin.urgentTickets"), value: stats.byPriority.urgent ?? 0, icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg> },
          ].map((s) => (
            <div key={s.label} className="group relative overflow-hidden rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-5 transition-all hover:shadow-xl hover:shadow-indigo-500/5">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500/10 to-violet-500/10 blur-2xl" />
              <div className="relative flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20">
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

      {/* Tabs */}
      <div className="relative flex gap-1 rounded-full bg-black/4 dark:bg-white/6 p-1 w-fit">
        {(["boards", "tickets"] as Tab[]).map((tb) => (
          <button
            key={tb}
            className={`rounded-full px-5 py-1.5 text-sm font-medium transition-all ${
              tab === tb
                ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/25"
                : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
            onClick={() => setTab(tb)}
          >
            {tb === "boards" ? t("admin.issueBoards") : t("admin.issueTickets")}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#aeaeb2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8" />
          <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
        </svg>
        <input
          className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] py-2 pl-10 pr-4 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          placeholder={t("admin.searchIssues")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Ticket filters */}
      {tab === "tickets" && (
        <div className="flex flex-wrap gap-2">
          {["all", "open", "in_progress", "resolved", "closed"].map((s) => (
            <button
              key={s}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                statusFilter === s
                  ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/25"
                  : "bg-black/5 dark:bg-white/8 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/8 dark:hover:bg-white/12"
              }`}
              onClick={() => setStatusFilter(s)}
            >
              {s === "all" ? t("admin.allStatuses") : s}
            </button>
          ))}
          <div className="w-px bg-black/8 dark:bg-white/8" />
          {["all", "urgent", "high", "medium", "low"].map((p) => (
            <button
              key={p}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                priorityFilter === p
                  ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/25"
                  : "bg-black/5 dark:bg-white/8 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/8 dark:hover:bg-white/12"
              }`}
              onClick={() => setPriorityFilter(p)}
            >
              {p === "all" ? t("admin.allPriorities") : p}
            </button>
          ))}
        </div>
      )}

      {/* Content card */}
      <div className="relative overflow-hidden rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116]">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 transition-opacity hover:opacity-100" style={{ pointerEvents: "none" }} />
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-6 w-6 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
          </div>
        ) : tab === "boards" ? (
          filteredBoards.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <svg className="h-10 w-10 text-[#d1d1d6] dark:text-[#424245]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">{t("admin.noBoards")}</p>
            </div>
          ) : (
            <div className="divide-y divide-black/5 dark:divide-white/5">
              {filteredBoards.map((b) => (
                <div key={b.id} className="group/item relative flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent opacity-0 transition-opacity group-hover/item:opacity-100" />
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/20">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#1d1d1f] dark:text-white">{b.name}</p>
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                      {b.owner_email} · {b.ticket_count} {t("admin.issueTickets").toLowerCase()} · {b.member_count} {t("admin.members").toLowerCase()} · {relativeTime(b.created_at)}
                    </p>
                  </div>
                  {confirmId === b.id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white shadow-md shadow-red-500/25 transition-colors hover:bg-red-600"
                        onClick={() => handleDelete(b.id, "board")}
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
                      onClick={() => setConfirmId(b.id)}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )
        ) : filteredTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <svg className="h-10 w-10 text-[#d1d1d6] dark:text-[#424245]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">{t("admin.noTickets")}</p>
          </div>
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filteredTickets.map((tk) => (
              <div key={tk.id} className="group/item relative flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent opacity-0 transition-opacity group-hover/item:opacity-100" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="truncate text-sm font-medium text-[#1d1d1f] dark:text-white">{tk.title}</p>
                    {statusBadge(tk.status)}
                    {priorityBadge(tk.priority)}
                  </div>
                  <p className="mt-0.5 text-xs text-[#6e6e73] dark:text-[#86868b]">
                    {tk.board_name} · {tk.created_by} · {relativeTime(tk.created_at)}
                  </p>
                </div>
                {confirmId === tk.id ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white shadow-md shadow-red-500/25 transition-colors hover:bg-red-600"
                      onClick={() => handleDelete(tk.id, "ticket")}
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
                    onClick={() => setConfirmId(tk.id)}
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

      <p className="text-xs text-center text-[#aeaeb2] dark:text-[#636366]">
        {tab === "boards" ? `${filteredBoards.length} / ${boards.length}` : `${filteredTickets.length} / ${tickets.length}`}
      </p>

      {/* Modals */}
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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full max-w-md mx-4 overflow-hidden rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
          <form onSubmit={handleSubmit}>
            <div className="border-b border-black/6 dark:border-white/6 px-5 py-4">
              <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white">{t("admin.newBoard")}</h3>
            </div>
            <div className="flex flex-col gap-3 px-5 py-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-[#6e6e73] dark:text-[#86868b]">{t("admin.boardName")} *</label>
                <input className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] px-3 py-2 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-indigo-500/30" placeholder={t("admin.boardName")} value={name} onChange={(e) => setName(e.target.value)} maxLength={100} autoFocus />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#6e6e73] dark:text-[#86868b]">{t("admin.boardDescription")}</label>
                <textarea className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] px-3 py-2 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-indigo-500/30" placeholder={t("admin.boardDescription")} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={2000} />
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
            <div className="flex justify-end gap-2 border-t border-black/6 dark:border-white/6 px-5 py-3">
              <button type="button" className="rounded-xl px-4 py-2 text-sm font-medium text-[#6e6e73] dark:text-[#86868b] transition-colors hover:bg-black/5 dark:hover:bg-white/8" onClick={onClose}>
                {t("admin.cancel")}
              </button>
              <button type="submit" disabled={!name.trim() || loading} className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 disabled:opacity-50">
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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full max-w-md mx-4 overflow-hidden rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
          <form onSubmit={handleSubmit}>
            <div className="border-b border-black/6 dark:border-white/6 px-5 py-4">
              <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white">{t("admin.newTicket")}</h3>
            </div>
            <div className="flex flex-col gap-3 px-5 py-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-[#6e6e73] dark:text-[#86868b]">{t("admin.selectBoard")} *</label>
                <select className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] px-3 py-2 text-sm text-[#1d1d1f] dark:text-white" value={boardId} onChange={(e) => setBoardId(e.target.value)}>
                  {boards.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#6e6e73] dark:text-[#86868b]">{t("admin.ticketTitle")} *</label>
                <input className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] px-3 py-2 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-indigo-500/30" placeholder={t("admin.ticketTitle")} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} autoFocus />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#6e6e73] dark:text-[#86868b]">{t("admin.ticketDescription")}</label>
                <textarea className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] px-3 py-2 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-indigo-500/30" placeholder={t("admin.ticketDescription")} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={5000} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#6e6e73] dark:text-[#86868b]">{t("admin.ticketPriority")}</label>
                <div className="flex gap-3">
                  {["low", "medium", "high", "urgent"].map((p) => (
                    <label key={p} className="flex cursor-pointer items-center gap-1.5 text-sm text-[#1d1d1f] dark:text-white">
                      <input type="radio" name="priority" value={p} checked={priority === p} onChange={() => setPriority(p)} className="accent-indigo-500" />
                      {p}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#6e6e73] dark:text-[#86868b]">{t("admin.ticketAssignTo")}</label>
                <input className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1c1c1e] px-3 py-2 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-indigo-500/30" placeholder="email@example.com" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} type="email" />
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
            <div className="flex justify-end gap-2 border-t border-black/6 dark:border-white/6 px-5 py-3">
              <button type="button" className="rounded-xl px-4 py-2 text-sm font-medium text-[#6e6e73] dark:text-[#86868b] transition-colors hover:bg-black/5 dark:hover:bg-white/8" onClick={onClose}>
                {t("admin.cancel")}
              </button>
              <button type="submit" disabled={!boardId || !title.trim() || loading} className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 disabled:opacity-50">
                {loading ? "…" : t("admin.createTicket")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
