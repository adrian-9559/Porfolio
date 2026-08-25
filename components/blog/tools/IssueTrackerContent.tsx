"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { useT } from "@/hooks/useT";
import { useAuth } from "@/hooks/useAuth";
import {
  issueTrackerService,
  type IssueBoard,
  type IssueTicket,
  type BoardMember,
  type TicketComment,
} from "@/services/issueTrackerService";

// ── Types ──────────────────────────────────────────────────────────────────────

type View = "boards" | "board";
type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
type TicketPriority = "low" | "medium" | "high" | "urgent";
type MemberRole = "owner" | "admin" | "member";

interface ActivityEntry {
  id: string;
  action: string;
  detail: string;
  timestamp: number;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const STATUS_ORDER: TicketStatus[] = ["open", "in_progress", "resolved", "closed"];

const STATUS_COLORS: Record<TicketStatus, string> = {
  open: "bg-blue-500",
  in_progress: "bg-amber-500",
  resolved: "bg-emerald-500",
  closed: "bg-gray-400",
};

const STATUS_TRANSITIONS: Record<TicketStatus, TicketStatus[]> = {
  open: ["in_progress"],
  in_progress: ["resolved", "open"],
  resolved: ["closed", "in_progress"],
  closed: ["open"],
};

const PRIORITY_COLORS: Record<TicketPriority, string> = {
  low: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  medium: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  high: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  urgent: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const INPUT_CLASS =
  "w-full p-2.5 rounded-lg text-sm bg-white dark:bg-[#1c1c22] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] dark:placeholder-[#636366] outline-none focus:border-teal-400 dark:focus:border-teal-600 transition-colors";

// ── Helpers ────────────────────────────────────────────────────────────────────

function getStatusTransitions(status: TicketStatus): TicketStatus[] {
  return STATUS_TRANSITIONS[status];
}

function activityLogKey(boardId: string): string {
  return `issue-tracker-activity-${boardId}`;
}

function loadActivity(boardId: string): ActivityEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(activityLogKey(boardId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveActivity(boardId: string, entries: ActivityEntry[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(activityLogKey(boardId), JSON.stringify(entries.slice(-200)));
}

function currentUserEmail(user: { email?: string } | null): string {
  return user?.email ?? "";
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function LoadingSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="p-4 rounded-xl border border-black/8 dark:border-white/8 animate-pulse">
          <div className="h-4 w-1/3 rounded bg-black/8 dark:bg-white/8 mb-2" />
          <div className="h-3 w-2/3 rounded bg-black/5 dark:bg-white/5" />
        </div>
      ))}
    </div>
  );
}

function KanbanSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {STATUS_ORDER.map((s) => (
        <div key={s} className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-black/10 dark:bg-white/10 animate-pulse" />
            <div className="h-3 w-16 rounded bg-black/8 dark:bg-white/8 animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-xl border border-black/8 dark:border-white/8 h-20 animate-pulse bg-black/[0.02] dark:bg-white/[0.02]" />
            <div className="p-3 rounded-xl border border-black/8 dark:border-white/8 h-16 animate-pulse bg-black/[0.02] dark:bg-white/[0.02]" />
          </div>
        </div>
      ))}
    </div>
  );
}

function DroppableColumn({
  id,
  children,
  isOver,
}: {
  id: string;
  children: React.ReactNode;
  isOver: boolean;
}) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`space-y-2 min-h-[120px] rounded-xl transition-colors duration-150 ${
        isOver ? "bg-teal-500/10 ring-2 ring-teal-500/30" : ""
      }`}
    >
      {children}
    </div>
  );
}

function DraggableTicket({
  ticket,
  onClick,
  t,
  canDrag,
}: {
  ticket: IssueTicket;
  onClick: () => void;
  t: (k: string) => string;
  canDrag: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: ticket.id,
    disabled: !canDrag,
  });
  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`p-3 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#1c1c22] hover:border-teal-300 dark:hover:border-teal-700 cursor-pointer transition-all duration-150 ${
        isDragging ? "opacity-50 shadow-lg" : ""
      }`}
    >
      <p className="text-sm font-medium text-[#1d1d1f] dark:text-white mb-1">{ticket.title}</p>
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${PRIORITY_COLORS[ticket.priority]}`}>
          {t(`blog.issueTracker.priority.${ticket.priority}`)}
        </span>
        {ticket.assigned_to && (
          <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
            @{ticket.assigned_to.split("@")[0]}
          </span>
        )}
      </div>
    </div>
  );
}

function DragOverlayCard({ ticket, t }: { ticket: IssueTicket; t: (k: string) => string }) {
  return (
    <div className="p-3 rounded-xl border border-teal-400 dark:border-teal-600 bg-white dark:bg-[#1c1c22] shadow-2xl opacity-90 rotate-2 max-w-xs">
      <p className="text-sm font-medium text-[#1d1d1f] dark:text-white mb-1">{ticket.title}</p>
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${PRIORITY_COLORS[ticket.priority]}`}>
          {t(`blog.issueTracker.priority.${ticket.priority}`)}
        </span>
        {ticket.assigned_to && (
          <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
            @{ticket.assigned_to.split("@")[0]}
          </span>
        )}
      </div>
    </div>
  );
}

function ActivityLogPanel({
  entries,
  t,
}: {
  entries: ActivityEntry[];
  t: (k: string) => string;
}) {
  if (entries.length === 0) return null;
  return (
    <div className="p-4 rounded-xl border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] mb-4 max-h-48 overflow-y-auto">
      <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-2">
        {t("blog.issueTracker.activity")}
      </h3>
      <div className="space-y-2">
        {entries
          .slice()
          .reverse()
          .slice(0, 30)
          .map((e) => (
            <div key={e.id} className="flex items-start gap-2 text-xs">
              <span className="text-[#aeaeb2] dark:text-[#636366] whitespace-nowrap tabular-nums">
                {new Date(e.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
              <span className="text-[#1d1d1f] dark:text-white">
                <span className="font-medium">{e.action}</span>
                {e.detail && (
                  <span className="text-[#6e6e73] dark:text-[#86868b] ml-1">{e.detail}</span>
                )}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function IssueTrackerContent() {
  const { t } = useT();
  const { user, isAuthenticated } = useAuth();

  // ── State ──────────────────────────────────────────────────────────────────

  const [view, setView] = useState<View>("boards");
  const [boards, setBoards] = useState<IssueBoard[]>([]);
  const [activeBoard, setActiveBoard] = useState<IssueBoard | null>(null);
  const [tickets, setTickets] = useState<IssueTicket[]>([]);
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Board form
  const [boardName, setBoardName] = useState("");
  const [boardDesc, setBoardDesc] = useState("");
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [editingBoard, setEditingBoard] = useState<string | null>(null);
  const [editBoardName, setEditBoardName] = useState("");
  const [editBoardDesc, setEditBoardDesc] = useState("");

  // Ticket form
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDesc, setTicketDesc] = useState("");
  const [ticketPriority, setTicketPriority] = useState<TicketPriority>("medium");
  const [ticketAssignee, setTicketAssignee] = useState("");
  const [showTicketForm, setShowTicketForm] = useState(false);

  // Member form
  const [memberEmail, setMemberEmail] = useState("");
  const [showMembers, setShowMembers] = useState(false);

  // Ticket detail
  const [selectedTicket, setSelectedTicket] = useState<IssueTicket | null>(null);
  const [comments, setComments] = useState<TicketComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingTicket, setEditingTicket] = useState(false);
  const [editTicketTitle, setEditTicketTitle] = useState("");
  const [editTicketDesc, setEditTicketDesc] = useState("");
  const [editTicketPriority, setEditTicketPriority] = useState<TicketPriority>("medium");
  const [editTicketAssignee, setEditTicketAssignee] = useState("");

  // Filters
  const [filterStatus, setFilterStatus] = useState<TicketStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<TicketPriority | "all">("all");
  const [filterAssignee, setFilterAssignee] = useState<string>("all");

  // Delete confirmations
  const [confirmDeleteBoard, setConfirmDeleteBoard] = useState<string | null>(null);
  const [confirmDeleteTicket, setConfirmDeleteTicket] = useState<string | null>(null);

  // Drag & drop
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [overColumn, setOverColumn] = useState<string | null>(null);

  // Activity log
  const [activityLog, setActivityLog] = useState<ActivityEntry[]>([]);

  // ── Refs ─────────────────────────────────────────────────────────────────

  const ticketFormRef = useRef<HTMLDivElement>(null);
  const boardFormRef = useRef<HTMLDivElement>(null);

  // ── Derived ──────────────────────────────────────────────────────────────

  const email = currentUserEmail(user);

  const currentRole = useMemo(() => {
    if (!activeBoard || !email) return "member" as MemberRole;
    if (activeBoard.owner_id === email) return "owner" as MemberRole;
    const me = members.find((m) => m.email === email);
    return (me?.role ?? "member") as MemberRole;
  }, [activeBoard, email, members]);

  const canManageBoard = currentRole === "owner";
  const canCreateTickets = currentRole === "owner" || currentRole === "admin";
  const canDeleteTickets = currentRole === "owner" || currentRole === "admin";
  const canEditTickets = currentRole === "owner" || currentRole === "admin";
  const canManageMembers = currentRole === "owner";

  const filteredTickets = useMemo(() => {
    let result = tickets;
    if (filterStatus !== "all") result = result.filter((t) => t.status === filterStatus);
    if (filterPriority !== "all") result = result.filter((t) => t.priority === filterPriority);
    if (filterAssignee !== "all") result = result.filter((t) => t.assigned_to === filterAssignee);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q),
      );
    }
    return result;
  }, [tickets, filterStatus, filterPriority, filterAssignee, searchQuery]);

  const ticketsByStatus = useMemo(() => {
    const map: Record<TicketStatus, IssueTicket[]> = {
      open: [],
      in_progress: [],
      resolved: [],
      closed: [],
    };
    for (const ticket of filteredTickets) {
      map[ticket.status].push(ticket);
    }
    return map;
  }, [filteredTickets]);

  const allTicketCounts = useMemo(() => {
    const map: Record<TicketStatus, number> = {
      open: 0,
      in_progress: 0,
      resolved: 0,
      closed: 0,
    };
    for (const ticket of tickets) {
      map[ticket.status]++;
    }
    return map;
  }, [tickets]);

  // ── Effects ──────────────────────────────────────────────────────────────

  // Error auto-clear
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  // Load boards on auth
  useEffect(() => {
    if (isAuthenticated) loadBoards();
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load activity when board changes
  useEffect(() => {
    if (activeBoard) setActivityLog(loadActivity(activeBoard.id));
  }, [activeBoard]);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (selectedTicket) {
          setSelectedTicket(null);
          setComments([]);
          setEditingTicket(false);
        } else if (showTicketForm) {
          setShowTicketForm(false);
        } else if (showBoardForm) {
          setShowBoardForm(false);
        } else if (showMembers) {
          setShowMembers(false);
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedTicket, showTicketForm, showBoardForm, showMembers]);

  // ── Activity helpers ─────────────────────────────────────────────────────

  const logActivity = useCallback(
    (action: string, detail: string) => {
      if (!activeBoard) return;
      const entry: ActivityEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        action,
        detail,
        timestamp: Date.now(),
      };
      setActivityLog((prev) => {
        const next = [...prev, entry];
        saveActivity(activeBoard.id, next);
        return next;
      });
    },
    [activeBoard],
  );

  // ── Handlers ─────────────────────────────────────────────────────────────

  const loadBoards = useCallback(async () => {
    try {
      setLoading(true);
      const data = await issueTrackerService.getBoards();
      setBoards(data);
    } catch {
      setError("Error loading boards");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadBoardData = useCallback(async (board: IssueBoard) => {
    try {
      setLoading(true);
      const [tix, mems] = await Promise.all([
        issueTrackerService.getTickets(board.id),
        issueTrackerService.getMembers(board.id),
      ]);
      setTickets(tix);
      setMembers(mems);
      setActiveBoard(board);
      setView("board");
      setFilterStatus("all");
      setSearchQuery("");
      setFilterPriority("all");
      setFilterAssignee("all");
    } catch {
      setError("Error loading board data");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateBoard = useCallback(async () => {
    if (!boardName.trim()) return;
    try {
      const board = await issueTrackerService.createBoard(boardName, boardDesc);
      setBoards((prev) => [...prev, board]);
      setBoardName("");
      setBoardDesc("");
      setShowBoardForm(false);
      logActivity(t("blog.issueTracker.createBoard"), board.name);
    } catch {
      setError("Error creating board");
    }
  }, [boardName, boardDesc, logActivity, t]);

  const handleUpdateBoard = useCallback(
    async (boardId: string) => {
      if (!editBoardName.trim()) return;
      try {
        const updated = await issueTrackerService.updateBoard(boardId, editBoardName, editBoardDesc);
        setBoards((prev) => prev.map((b) => (b.id === boardId ? updated : b)));
        if (activeBoard?.id === boardId) setActiveBoard(updated);
        setEditingBoard(null);
        logActivity(t("blog.issueTracker.ticketEdited"), updated.name);
      } catch {
        setError("Error updating board");
      }
    },
    [editBoardName, editBoardDesc, activeBoard, logActivity, t],
  );

  const handleDeleteBoard = useCallback(
    async (boardId: string) => {
      try {
        await issueTrackerService.deleteBoard(boardId);
        setBoards((prev) => prev.filter((b) => b.id !== boardId));
        if (activeBoard?.id === boardId) {
          setActiveBoard(null);
          setView("boards");
        }
        setConfirmDeleteBoard(null);
        logActivity(t("blog.issueTracker.confirmDelete"), "");
      } catch {
        setError("Error deleting board");
      }
    },
    [activeBoard, logActivity, t],
  );

  const handleCreateTicket = useCallback(async () => {
    if (!ticketTitle.trim() || !activeBoard) return;
    try {
      const ticket = await issueTrackerService.createTicket(
        activeBoard.id,
        ticketTitle,
        ticketDesc,
        ticketPriority,
        ticketAssignee,
      );
      setTickets((prev) => [...prev, ticket]);
      setTicketTitle("");
      setTicketDesc("");
      setTicketPriority("medium");
      setTicketAssignee("");
      setShowTicketForm(false);
      logActivity(t("blog.issueTracker.ticketCreated"), ticket.title);
    } catch {
      setError("Error creating ticket");
    }
  }, [ticketTitle, ticketDesc, ticketPriority, ticketAssignee, activeBoard, logActivity, t]);

  const handleUpdateTicketStatus = useCallback(
    async (ticketId: string, status: TicketStatus) => {
      try {
        const updated = await issueTrackerService.updateTicket(ticketId, { status });
        setTickets((prev) => prev.map((tk) => (tk.id === ticketId ? updated : tk)));
        if (selectedTicket?.id === ticketId) setSelectedTicket(updated);
        logActivity(t("blog.issueTracker.statusChanged"), `${updated.title} → ${t(`blog.issueTracker.status.${status}`)}`);
      } catch {
        setError("Error updating ticket");
      }
    },
    [selectedTicket, logActivity, t],
  );

  const handleUpdateTicket = useCallback(async () => {
    if (!selectedTicket) return;
    try {
      const updated = await issueTrackerService.updateTicket(selectedTicket.id, {
        title: editTicketTitle,
        description: editTicketDesc,
        priority: editTicketPriority,
        assigned_to: editTicketAssignee,
      });
      setTickets((prev) => prev.map((tk) => (tk.id === selectedTicket.id ? updated : tk)));
      setSelectedTicket(updated);
      setEditingTicket(false);
      logActivity(t("blog.issueTracker.ticketEdited"), updated.title);
    } catch {
      setError("Error updating ticket");
    }
  }, [selectedTicket, editTicketTitle, editTicketDesc, editTicketPriority, editTicketAssignee, logActivity, t]);

  const handleDeleteTicket = useCallback(
    async (ticketId: string) => {
      try {
        await issueTrackerService.deleteTicket(ticketId);
        setTickets((prev) => prev.filter((tk) => tk.id !== ticketId));
        if (selectedTicket?.id === ticketId) {
          setSelectedTicket(null);
          setComments([]);
        }
        setConfirmDeleteTicket(null);
        logActivity(t("blog.issueTracker.confirmDelete"), "");
      } catch {
        setError("Error deleting ticket");
      }
    },
    [selectedTicket, logActivity, t],
  );

  const handleAddMember = useCallback(async () => {
    if (!memberEmail.trim() || !activeBoard) return;
    try {
      const member = await issueTrackerService.addMember(activeBoard.id, memberEmail);
      setMembers((prev) => [...prev, member]);
      setMemberEmail("");
      logActivity(t("blog.issueTracker.memberAdded"), memberEmail);
    } catch {
      setError("Error adding member");
    }
  }, [memberEmail, activeBoard, logActivity, t]);

  const handleRemoveMember = useCallback(
    async (memberEmail: string) => {
      if (!activeBoard) return;
      try {
        await issueTrackerService.removeMember(activeBoard.id, memberEmail);
        setMembers((prev) => prev.filter((m) => m.email !== memberEmail));
        logActivity(t("blog.issueTracker.memberRemoved"), memberEmail);
      } catch {
        setError("Error removing member");
      }
    },
    [activeBoard, logActivity, t],
  );

  const handleLoadComments = useCallback(
    async (ticket: IssueTicket) => {
      try {
        const data = await issueTrackerService.getComments(ticket.id);
        setComments(data);
        setSelectedTicket(ticket);
        setEditingTicket(false);
      } catch {
        setError("Error loading comments");
      }
    },
    [],
  );

  const handleAddComment = useCallback(async () => {
    if (!newComment.trim() || !selectedTicket) return;
    try {
      const comment = await issueTrackerService.addComment(selectedTicket.id, newComment);
      setComments((prev) => [...prev, comment]);
      setNewComment("");
      logActivity(t("blog.issueTracker.commentAdded"), selectedTicket.title);
    } catch {
      setError("Error adding comment");
    }
  }, [newComment, selectedTicket, logActivity, t]);

  // ── Drag handlers ────────────────────────────────────────────────────────

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveDragId(String(event.active.id));
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    setOverColumn(event.over ? String(event.over.id) : null);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveDragId(null);
      setOverColumn(null);
      const { active, over } = event;
      if (!over) return;
      const ticketId = String(active.id);
      const newStatus = String(over.id) as TicketStatus;
      const ticket = tickets.find((tk) => tk.id === ticketId);
      if (!ticket || ticket.status === newStatus) return;
      handleUpdateTicketStatus(ticketId, newStatus);
    },
    [tickets, handleUpdateTicketStatus],
  );

  const handleDragCancel = useCallback(() => {
    setActiveDragId(null);
    setOverColumn(null);
  }, []);

  // ── Start editing ticket ─────────────────────────────────────────────────

  const startEditTicket = useCallback(() => {
    if (!selectedTicket) return;
    setEditTicketTitle(selectedTicket.title);
    setEditTicketDesc(selectedTicket.description);
    setEditTicketPriority(selectedTicket.priority);
    setEditTicketAssignee(selectedTicket.assigned_to);
    setEditingTicket(true);
  }, [selectedTicket]);

  const activeDragTicket = tickets.find((tk) => tk.id === activeDragId);

  // ── Not logged in ────────────────────────────────────────────────────────

  if (!isAuthenticated) {
    return (
      <article className="max-w-3xl">
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800/50">
              {t("blog.issueTracker.tool")}
            </span>
            <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
              {t("blog.issueTracker.freeToUse")}
            </span>
          </div>
          <h1
            className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
            style={{ letterSpacing: "-0.02em" }}
          >
            {t("blog.issueTracker.title")}
          </h1>
          <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
            {t("blog.issueTracker.desc")}
          </p>
        </div>
        <div className="p-8 rounded-2xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/20 text-center">
          <svg
            className="w-10 h-10 mx-auto mb-3 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            {t("blog.issueTracker.loginRequired")}
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
            {t("blog.issueTracker.loginHint")}
          </p>
        </div>
      </article>
    );
  }

  // ── Boards list ──────────────────────────────────────────────────────────

  if (view === "boards") {
    return (
      <article className="max-w-3xl">
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800/50">
              {t("blog.issueTracker.tool")}
            </span>
            <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
              {t("blog.issueTracker.freeToUse")}
            </span>
          </div>
          <h1
            className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
            style={{ letterSpacing: "-0.02em" }}
          >
            {t("blog.issueTracker.title")}
          </h1>
          <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
            {t("blog.issueTracker.desc")}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-sm text-red-700 dark:text-red-400 mb-4 flex items-center justify-between">
            <span>{error}</span>
            <button className="text-red-500 hover:text-red-700" onClick={() => setError("")}>
              ✕
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#1d1d1f] dark:text-white">
            {t("blog.issueTracker.yourBoards")}
          </h2>
          <button
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-teal-500 hover:bg-teal-600 text-white transition-colors shadow-sm"
            onClick={() => setShowBoardForm(!showBoardForm)}
          >
            {t("blog.issueTracker.createBoard")}
          </button>
        </div>

        {showBoardForm && (
          <div
            ref={boardFormRef}
            className="p-4 rounded-xl border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] mb-4 space-y-3"
          >
            <input
              className={INPUT_CLASS}
              placeholder={t("blog.issueTracker.boardName")}
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateBoard();
              }}
              autoFocus
            />
            <input
              className={INPUT_CLASS}
              placeholder={t("blog.issueTracker.boardDesc")}
              value={boardDesc}
              onChange={(e) => setBoardDesc(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateBoard();
              }}
            />
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-teal-500 hover:bg-teal-600 text-white transition-colors"
                onClick={handleCreateBoard}
              >
                {t("blog.issueTracker.create")}
              </button>
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
                onClick={() => setShowBoardForm(false)}
              >
                {t("blog.issueTracker.cancel")}
              </button>
            </div>
          </div>
        )}

        {loading && <LoadingSkeleton rows={4} />}

        {!loading && boards.length === 0 && (
          <div className="p-12 rounded-2xl border border-black/8 dark:border-white/8 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-teal-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
              </svg>
            </div>
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">{t("blog.issueTracker.noBoards")}</p>
          </div>
        )}

        <div className="space-y-2">
          {boards.map((board) => (
            <div
              key={board.id}
              className="group relative flex items-center justify-between p-4 rounded-xl border border-black/8 dark:border-white/8 hover:border-teal-300 dark:hover:border-teal-700 cursor-pointer transition-colors"
              onClick={() => {
                if (editingBoard !== board.id) loadBoardData(board);
              }}
            >
              {editingBoard === board.id ? (
                <div className="flex-1 space-y-2 mr-2" onClick={(e) => e.stopPropagation()}>
                  <input
                    className={INPUT_CLASS}
                    value={editBoardName}
                    onChange={(e) => setEditBoardName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleUpdateBoard(board.id);
                      if (e.key === "Escape") setEditingBoard(null);
                    }}
                    autoFocus
                  />
                  <input
                    className={INPUT_CLASS}
                    value={editBoardDesc}
                    onChange={(e) => setEditBoardDesc(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleUpdateBoard(board.id);
                      if (e.key === "Escape") setEditingBoard(null);
                    }}
                  />
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-500 hover:bg-teal-600 text-white transition-colors"
                      onClick={() => handleUpdateBoard(board.id)}
                    >
                      {t("blog.issueTracker.save")}
                    </button>
                    <button
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#6e6e73] dark:text-[#86868b]"
                      onClick={() => setEditingBoard(null)}
                    >
                      {t("blog.issueTracker.cancel")}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white truncate">
                    {board.name}
                  </p>
                  {board.description && (
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5 truncate">
                      {board.description}
                    </p>
                  )}
                </div>
              )}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {board.owner_id === email && (
                  <button
                    className="p-1.5 rounded-lg text-[#aeaeb2] hover:text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950/20 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingBoard(board.id);
                      setEditBoardName(board.name);
                      setEditBoardDesc(board.description);
                    }}
                    title={t("blog.issueTracker.edit")}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                )}
                {confirmDeleteBoard === board.id ? (
                  <div
                    className="flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-[10px] text-red-600 dark:text-red-400 mr-1">
                      {t("blog.issueTracker.confirmDelete")}
                    </span>
                    <button
                      className="px-2 py-1 rounded text-[10px] font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors"
                      onClick={() => handleDeleteBoard(board.id)}
                    >
                      {t("blog.issueTracker.yes")}
                    </button>
                    <button
                      className="px-2 py-1 rounded text-[10px] font-medium text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
                      onClick={() => setConfirmDeleteBoard(null)}
                    >
                      {t("blog.issueTracker.no")}
                    </button>
                  </div>
                ) : (
                  <button
                    className="p-1.5 rounded-lg text-[#aeaeb2] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmDeleteBoard(board.id);
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </article>
    );
  }

  // ── Board view (Kanban) ──────────────────────────────────────────────────

  return (
    <article className="max-w-6xl">
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800/50">
            {t("blog.issueTracker.tool")}
          </span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-[#1d1d1f] dark:text-white">{activeBoard?.name}</h1>
            {activeBoard?.description && (
              <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">{activeBoard.description}</p>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-black/8 dark:border-white/8 text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
              onClick={() => setShowMembers(!showMembers)}
            >
              {t("blog.issueTracker.members")} ({members.length})
            </button>
            {canCreateTickets && (
              <button
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-teal-500 hover:bg-teal-600 text-white transition-colors shadow-sm"
                onClick={() => setShowTicketForm(!showTicketForm)}
              >
                + {t("blog.issueTracker.newTicket")}
              </button>
            )}
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
              onClick={() => {
                setView("boards");
                setActiveBoard(null);
              }}
            >
              ← {t("blog.issueTracker.back")}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-sm text-red-700 dark:text-red-400 mb-4 flex items-center justify-between">
          <span>{error}</span>
          <button className="text-red-500 hover:text-red-700" onClick={() => setError("")}>
            ✕
          </button>
        </div>
      )}

      {/* Members panel */}
      <MembersPanel
        show={showMembers}
        members={members}
        memberEmail={memberEmail}
        setMemberEmail={setMemberEmail}
        onAdd={handleAddMember}
        onRemove={handleRemoveMember}
        canManage={canManageMembers}
        currentEmail={email}
        t={t}
      />

      {/* Activity log */}
      <ActivityLogPanel entries={activityLog} t={t} />

      {/* New ticket form */}
      {showTicketForm && canCreateTickets && (
        <div
          ref={ticketFormRef}
          className="p-4 rounded-xl border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] mb-4 space-y-3"
        >
          <input
            className={INPUT_CLASS}
            placeholder={t("blog.issueTracker.ticketTitle")}
            value={ticketTitle}
            onChange={(e) => setTicketTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateTicket();
            }}
            autoFocus
          />
          <textarea
            className={`${INPUT_CLASS} resize-none h-20`}
            placeholder={t("blog.issueTracker.ticketDesc")}
            value={ticketDesc}
            onChange={(e) => setTicketDesc(e.target.value)}
          />
          <div className="flex gap-3 flex-wrap">
            <select
              className="p-2 rounded-lg text-sm bg-white dark:bg-[#1c1c22] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white"
              value={ticketPriority}
              onChange={(e) => setTicketPriority(e.target.value as TicketPriority)}
            >
              <option value="low">{t("blog.issueTracker.priority.low")}</option>
              <option value="medium">{t("blog.issueTracker.priority.medium")}</option>
              <option value="high">{t("blog.issueTracker.priority.high")}</option>
              <option value="urgent">{t("blog.issueTracker.priority.urgent")}</option>
            </select>
            <select
              className="p-2 rounded-lg text-sm bg-white dark:bg-[#1c1c22] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white"
              value={ticketAssignee}
              onChange={(e) => setTicketAssignee(e.target.value)}
            >
              <option value="">{t("blog.issueTracker.unassigned")}</option>
              {members.map((m) => (
                <option key={m.email} value={m.email}>
                  {m.email}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-teal-500 hover:bg-teal-600 text-white transition-colors"
              onClick={handleCreateTicket}
            >
              {t("blog.issueTracker.create")}
            </button>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium text-[#6e6e73] dark:text-[#86868b]"
              onClick={() => setShowTicketForm(false)}
            >
              {t("blog.issueTracker.cancel")}
            </button>
          </div>
        </div>
      )}

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2] dark:text-[#636366]"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            className={`${INPUT_CLASS} pl-8`}
            placeholder={t("blog.issueTracker.search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="p-2 rounded-lg text-xs bg-white dark:bg-[#1c1c22] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value as TicketPriority | "all")}
        >
          <option value="all">{t("blog.issueTracker.filterPriority")}: {t("blog.issueTracker.all")}</option>
          <option value="low">{t("blog.issueTracker.priority.low")}</option>
          <option value="medium">{t("blog.issueTracker.priority.medium")}</option>
          <option value="high">{t("blog.issueTracker.priority.high")}</option>
          <option value="urgent">{t("blog.issueTracker.priority.urgent")}</option>
        </select>
        <select
          className="p-2 rounded-lg text-xs bg-white dark:bg-[#1c1c22] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white"
          value={filterAssignee}
          onChange={(e) => setFilterAssignee(e.target.value)}
        >
          <option value="all">{t("blog.issueTracker.filterAssignee")}: {t("blog.issueTracker.allMembers")}</option>
          {members.map((m) => (
            <option key={m.email} value={m.email}>
              {m.email}
            </option>
          ))}
        </select>
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366] tabular-nums">
          {filteredTickets.length} / {tickets.length}
        </span>
      </div>

      {/* Status filter chips */}
      <div className="flex gap-1 mb-4 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] w-fit">
        {(["all", ...STATUS_ORDER] as const).map((s) => (
          <button
            key={s}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterStatus === s
                ? "bg-white dark:bg-[#1c1c22] text-[#1d1d1f] dark:text-white shadow-sm"
                : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
            onClick={() => setFilterStatus(s)}
          >
            {s === "all" ? t("blog.issueTracker.all") : t(`blog.issueTracker.status.${s}`)}
            {s !== "all" && (
              <span className="ml-1 text-[10px] text-[#aeaeb2] dark:text-[#636366]">
                {allTicketCounts[s]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Drag hint */}
      <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] mb-2">
        {t("blog.issueTracker.dragHint")}
      </p>

      {/* Kanban columns */}
      {loading ? (
        <KanbanSkeleton />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {STATUS_ORDER.map((status) => {
              const statusTickets = ticketsByStatus[status];
              return (
                <div key={status} className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${STATUS_COLORS[status]}`} />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6e6e73] dark:text-[#86868b]">
                      {t(`blog.issueTracker.status.${status}`)}
                    </h3>
                    <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366] tabular-nums">
                      {statusTickets.length}
                    </span>
                  </div>
                  <DroppableColumn id={status} isOver={overColumn === status}>
                    {statusTickets.length === 0 ? (
                      <div className="p-4 rounded-xl border border-dashed border-black/8 dark:border-white/8 text-center">
                        <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
                          {t("blog.issueTracker.noResults")}
                        </p>
                      </div>
                    ) : (
                      statusTickets.map((ticket) => (
                        <DraggableTicket
                          key={ticket.id}
                          ticket={ticket}
                          onClick={() => handleLoadComments(ticket)}
                          t={t}
                          canDrag={canEditTickets || ticket.assigned_to === email}
                        />
                      ))
                    )}
                    {status !== "closed" &&
                      statusTickets.length > 0 &&
                      statusTickets.every((tk) => {
                        const transitions = getStatusTransitions(status);
                        return transitions.length > 0;
                      }) && (
                        <div className="flex gap-1 pt-1 flex-wrap">
                          {getStatusTransitions(status).map((s) => (
                            <button
                              key={s}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/10 dark:hover:bg-white/15 transition-colors"
                              onClick={() => {
                                const firstTicket = statusTickets[0];
                                if (firstTicket) handleUpdateTicketStatus(firstTicket.id, s);
                              }}
                            >
                              → {t(`blog.issueTracker.status.${s}`)}
                            </button>
                          ))}
                        </div>
                      )}
                  </DroppableColumn>
                </div>
              );
            })}
          </div>

          <DragOverlay dropAnimation={null}>
            {activeDragTicket ? <DragOverlayCard ticket={activeDragTicket} t={t} /> : null}
          </DragOverlay>
        </DndContext>
      )}

      {/* Ticket detail modal */}
      {selectedTicket && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => {
            setSelectedTicket(null);
            setComments([]);
            setEditingTicket(false);
          }}
        >
          <div
            className="w-full max-w-2xl mb-16 rounded-2xl bg-white dark:bg-[#1c1c22] border border-black/8 dark:border-white/8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/8 dark:border-white/8">
              <div className="flex-1 min-w-0">
                {editingTicket ? (
                  <input
                    className={`${INPUT_CLASS} font-bold text-lg mb-1`}
                    value={editTicketTitle}
                    onChange={(e) => setEditTicketTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleUpdateTicket();
                      if (e.key === "Escape") setEditingTicket(false);
                    }}
                    autoFocus
                  />
                ) : (
                  <h2 className="text-lg font-bold text-[#1d1d1f] dark:text-white truncate">
                    {selectedTicket.title}
                  </h2>
                )}
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {editingTicket ? (
                    <>
                      <select
                        className="text-[10px] px-1.5 py-0.5 rounded border border-black/8 dark:border-white/8 bg-transparent text-[#6e6e73] dark:text-[#86868b]"
                        value={editTicketPriority}
                        onChange={(e) => setEditTicketPriority(e.target.value as TicketPriority)}
                      >
                        <option value="low">{t("blog.issueTracker.priority.low")}</option>
                        <option value="medium">{t("blog.issueTracker.priority.medium")}</option>
                        <option value="high">{t("blog.issueTracker.priority.high")}</option>
                        <option value="urgent">{t("blog.issueTracker.priority.urgent")}</option>
                      </select>
                      <select
                        className="text-[10px] px-1.5 py-0.5 rounded border border-black/8 dark:border-white/8 bg-transparent text-[#6e6e73] dark:text-[#86868b]"
                        value={editTicketAssignee}
                        onChange={(e) => setEditTicketAssignee(e.target.value)}
                      >
                        <option value="">{t("blog.issueTracker.unassigned")}</option>
                        {members.map((m) => (
                          <option key={m.email} value={m.email}>
                            {m.email}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${PRIORITY_COLORS[selectedTicket.priority]}`}
                      >
                        {t(`blog.issueTracker.priority.${selectedTicket.priority}`)}
                      </span>
                      <select
                        className="text-[10px] px-1.5 py-0.5 rounded border border-black/8 dark:border-white/8 bg-transparent text-[#6e6e73] dark:text-[#86868b]"
                        value={selectedTicket.status}
                        onChange={(e) =>
                          handleUpdateTicketStatus(selectedTicket.id, e.target.value as TicketStatus)
                        }
                      >
                        {STATUS_ORDER.map((s) => (
                          <option key={s} value={s}>
                            {t(`blog.issueTracker.status.${s}`)}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-3 shrink-0">
                {editingTicket ? (
                  <>
                    <button
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-500 hover:bg-teal-600 text-white transition-colors"
                      onClick={handleUpdateTicket}
                    >
                      {t("blog.issueTracker.save")}
                    </button>
                    <button
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
                      onClick={() => setEditingTicket(false)}
                    >
                      {t("blog.issueTracker.cancel")}
                    </button>
                  </>
                ) : (
                  <>
                    {canEditTickets && (
                      <button
                        className="p-1.5 rounded-lg text-[#aeaeb2] hover:text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950/20 transition-colors"
                        onClick={startEditTicket}
                        title={t("blog.issueTracker.edit")}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>
                    )}
                    {canDeleteTickets && (
                      <>
                        {confirmDeleteTicket === selectedTicket.id ? (
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-red-600 dark:text-red-400 mr-1">
                              {t("blog.issueTracker.confirmDelete")}
                            </span>
                            <button
                              className="px-2 py-1 rounded text-[10px] font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors"
                              onClick={() => handleDeleteTicket(selectedTicket.id)}
                            >
                              {t("blog.issueTracker.yes")}
                            </button>
                            <button
                              className="px-2 py-1 rounded text-[10px] font-medium text-[#6e6e73] dark:text-[#86868b]"
                              onClick={() => setConfirmDeleteTicket(null)}
                            >
                              {t("blog.issueTracker.no")}
                            </button>
                          </div>
                        ) : (
                          <button
                            className="p-1.5 rounded-lg text-[#aeaeb2] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                            onClick={() => setConfirmDeleteTicket(selectedTicket.id)}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        )}
                      </>
                    )}
                    <button
                      className="p-1.5 rounded-lg text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
                      onClick={() => {
                        setSelectedTicket(null);
                        setComments([]);
                      }}
                    >
                      ✕
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Description / edit */}
            <div className="px-6 py-3 border-b border-black/8 dark:border-white/8">
              {editingTicket ? (
                <textarea
                  className={`${INPUT_CLASS} resize-none h-20`}
                  value={editTicketDesc}
                  onChange={(e) => setEditTicketDesc(e.target.value)}
                />
              ) : selectedTicket.description ? (
                <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">{selectedTicket.description}</p>
              ) : (
                <p className="text-xs text-[#aeaeb2] dark:text-[#636366] italic">
                  {t("blog.issueTracker.ticketDesc")}
                </p>
              )}
              <div className="mt-2 text-[10px] text-[#aeaeb2] dark:text-[#636366] flex gap-4">
                <span>
                  {t("blog.issueTracker.dueDate")}: {selectedTicket.updated_at ? new Date(selectedTicket.updated_at).toLocaleDateString() : t("blog.issueTracker.noDueDate")}
                </span>
                <span>
                  {t("blog.issueTracker.created")}: {new Date(selectedTicket.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Comments */}
            <div className="px-6 py-4 max-h-60 overflow-y-auto">
              {comments.length === 0 && (
                <p className="text-xs text-[#aeaeb2] dark:text-[#636366] text-center py-4">
                  {t("blog.issueTracker.noComments")}
                </p>
              )}
              {comments.map((c) => (
                <div key={c.id} className="mb-3 last:mb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
                      {c.author_email}
                    </span>
                    <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
                      {new Date(c.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">{c.content}</p>
                </div>
              ))}
            </div>

            {/* Add comment */}
            <div className="px-6 py-3 border-t border-black/8 dark:border-white/8 flex gap-2">
              <input
                className={`${INPUT_CLASS} flex-1`}
                placeholder={t("blog.issueTracker.addComment")}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) handleAddComment();
                }}
              />
              <button
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-teal-500 hover:bg-teal-600 text-white transition-colors"
                onClick={handleAddComment}
              >
                {t("blog.issueTracker.send")}
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

// ── Members Panel ────────────────────────────────────────────────────────────

function MembersPanel({
  show,
  members,
  memberEmail,
  setMemberEmail,
  onAdd,
  onRemove,
  canManage,
  currentEmail,
  t,
}: {
  show: boolean;
  members: BoardMember[];
  memberEmail: string;
  setMemberEmail: (v: string) => void;
  onAdd: () => void;
  onRemove: (email: string) => void;
  canManage: boolean;
  currentEmail: string;
  t: (k: string) => string;
}) {
  if (!show) return null;
  return (
    <div className="p-4 rounded-xl border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] mb-4">
      <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-3">
        {t("blog.issueTracker.manageMembers")}
      </h3>
      {canManage && (
        <div className="flex gap-2 mb-3">
          <input
            className={`${INPUT_CLASS} flex-1`}
            placeholder={t("blog.issueTracker.emailPlaceholder")}
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onAdd();
            }}
          />
          <button
            className="px-3 py-2 rounded-lg text-xs font-semibold bg-teal-500 hover:bg-teal-600 text-white transition-colors"
            onClick={onAdd}
          >
            {t("blog.issueTracker.invite")}
          </button>
        </div>
      )}
      <div className="space-y-1">
        {members.map((m) => (
          <div key={m.id} className="flex items-center justify-between py-1.5">
            <span className="text-xs text-[#1d1d1f] dark:text-white">
              {m.email}
              {m.email === currentEmail && (
                <span className="ml-1 text-[10px] text-[#aeaeb2] dark:text-[#636366]">(you)</span>
              )}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#6e6e73] dark:text-[#86868b]">
                {m.role}
              </span>
              {canManage && m.email !== currentEmail && (
                <button
                  className="text-[10px] text-red-500 hover:text-red-700 transition-colors"
                  onClick={() => onRemove(m.email)}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {members.length === 0 && (
        <p className="text-xs text-[#aeaeb2] dark:text-[#636366] text-center py-2">
          {t("blog.issueTracker.noMembers")}
        </p>
      )}
    </div>
  );
}
