import { useEffect, useState } from "react";

import { useT } from "@/hooks/useT";
import { adminService, ContactMessage } from "@/services/adminService";
import { userService } from "@/services/userService";
import type { UserWithProfile } from "@/types/auth";

const statusBadge: Record<string, string> = {
  pending: "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400",
  reviewed: "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400",
  replied: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400",
};

const statusGradient: Record<string, string> = {
  pending: "from-amber-500 to-orange-500",
  reviewed: "from-blue-500 to-cyan-500",
  replied: "from-emerald-500 to-teal-500",
};

export function AdminContactSection() {
  const { t } = useT();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | ContactMessage["status"]>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Recipient selector state
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [recipients, setRecipients] = useState<string[]>([]);
  const [recipientMode, setRecipientMode] = useState<"all" | "selected">("all");
  const [savingRecipients, setSavingRecipients] = useState(false);
  const [recipientSaved, setRecipientSaved] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [msgs, recips] = await Promise.all([
        adminService.listContact(),
        adminService.getContactRecipients(),
      ]);
      setMessages(msgs);
      setRecipients(recips);
      setRecipientMode(recips.length > 0 ? "selected" : "all");
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    load();
    userService.list().then(setUsers).catch(() => {});
  }, []);

  const filtered = messages.filter((m) => {
    if (filter !== "all" && m.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();

      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    }

    return true;
  });

  const handleStatus = async (id: string, status: ContactMessage["status"]) => {
    try {
      const updated = await adminService.updateContactStatus(id, status);

      setMessages((ms) => ms.map((m) => (m.id === id ? updated : m)));
    } catch {}
  };

  const handleDelete = async (id: string) => {
    setConfirmDeleteId(null);
    try {
      await adminService.deleteContact(id);
      setMessages((ms) => ms.filter((m) => m.id !== id));
    } catch {}
  };

  const toggleRecipient = (userId: string) => {
    setRecipients((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
    setRecipientMode("selected");
  };

  const handleSaveRecipients = async () => {
    setSavingRecipients(true);
    try {
      const toSave = recipientMode === "all" ? [] : recipients;
      await adminService.setContactRecipients(toSave);
      setRecipientSaved(true);
      setTimeout(() => setRecipientSaved(false), 2000);
    } catch {}
    setSavingRecipients(false);
  };

  const FILTERS = [
    { key: "all", labelKey: "admin.filterAll" },
    { key: "pending", labelKey: "admin.filterPending" },
    { key: "reviewed", labelKey: "admin.filterReviewed" },
    { key: "replied", labelKey: "admin.filterResponded" },
  ] as const;

  const pending = messages.filter((m) => m.status === "pending").length;
  const reviewed = messages.filter((m) => m.status === "reviewed").length;
  const replied = messages.filter((m) => m.status === "replied").length;

  return (
    <div className="relative flex flex-col gap-6">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-violet-500/8 to-pink-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-20 w-56 h-56 rounded-full bg-gradient-to-br from-pink-500/6 to-violet-500/4 blur-3xl pointer-events-none" />

      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6e6e73] dark:text-[#86868b] mb-1">Comunicación</p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
          {t("admin.messages")}
        </h1>
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">
          {t("admin.messagesCount", {
            n: messages.length,
            pending,
            s: pending !== 1 ? "s" : "",
          })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: t("admin.contactTotal"), value: messages.length, gradient: "from-violet-500 to-pink-500", icon: "total" },
          { label: t("admin.contactPending"), value: pending, gradient: "from-amber-500 to-orange-500", icon: "pending" },
          { label: t("admin.contactReviewed"), value: reviewed, gradient: "from-blue-500 to-cyan-500", icon: "reviewed" },
          { label: t("admin.contactReplied"), value: replied, gradient: "from-emerald-500 to-teal-500", icon: "replied" },
        ].map((s) => (
          <div key={s.label} className="relative rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/8 dark:hover:shadow-black/30 hover:border-black/15 dark:hover:border-white/15 group">
            <div className={`h-1 bg-gradient-to-r ${s.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />
            <div className="p-4 relative">
              <div className={`absolute -bottom-5 -right-5 w-20 h-20 rounded-full bg-gradient-to-br ${s.gradient} opacity-10 blur-2xl`} />
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white shadow-lg shrink-0`}>
                  {s.icon === "total" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  ) : s.icon === "pending" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  ) : s.icon === "reviewed" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  )}
                </div>
                <div>
                  <p className="text-2xl font-black tabular-nums tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>{s.value}</p>
                  <p className="text-[11px] font-semibold text-[#1d1d1f] dark:text-white truncate">{s.label}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipient selector */}
      <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
        <div className="h-1 bg-gradient-to-r from-violet-500 to-pink-500" />
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                {t("admin.contactRecipientsTitle")}
              </p>
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                {t("admin.contactRecipientsDesc")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <button
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                recipientMode === "all"
                  ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-md"
                  : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white bg-black/5 dark:bg-white/5"
              }`}
              onClick={() => setRecipientMode("all")}
            >
              {t("admin.contactRecipientsAll")}
            </button>
            <button
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                recipientMode === "selected"
                  ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-md"
                  : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white bg-black/5 dark:bg-white/5"
              }`}
              onClick={() => setRecipientMode("selected")}
            >
              {t("admin.contactRecipientsSelect")}
            </button>
          </div>

          {recipientMode === "selected" && (
            <div className="flex flex-wrap gap-2 mb-3">
              {users.map((u) => {
                const name = u.profile?.full_name ?? u.email;
                const selected = recipients.includes(u.id);

                return (
                  <button
                    key={u.id}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      selected
                        ? "bg-violet-100 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 border border-violet-300 dark:border-violet-700 shadow-sm"
                        : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white bg-black/5 dark:bg-white/5"
                    }`}
                    onClick={() => toggleRecipient(u.id)}
                    type="button"
                  >
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-[9px] font-bold shadow-sm">
                      {name[0]?.toUpperCase()}
                    </span>
                    {name}
                    {selected && (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white text-xs font-semibold shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300 disabled:opacity-50"
              disabled={savingRecipients}
              onClick={handleSaveRecipients}
              type="button"
            >
              {savingRecipients ? "..." : recipientSaved ? "✓" : t("admin.contactRecipientsSave")}
            </button>
            <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
              {t("admin.contactRecipientsNote")}
            </p>
          </div>
        </div>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2] dark:text-[#636366]" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
            placeholder={t("admin.searchByName")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === f.key
                  ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-md"
                  : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white bg-black/5 dark:bg-white/5"
              }`}
              onClick={() => setFilter(f.key)}
            >
              {t(f.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Messages list */}
      <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
        <div className="h-1 bg-gradient-to-r from-violet-500 to-pink-500" />
        {loading ? (
          <div className="p-10 flex justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">{t("admin.noMessages")}</p>
            <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1">
              {search ? t("admin.noMessagesSearch") : t("admin.noMessagesHint")}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((m) => (
              <div
                key={m.id}
                className={`px-5 py-4 transition-colors duration-200 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] ${
                  m.status === "pending" ? "border-l-2 border-l-amber-400" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${statusGradient[m.status]} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md`}>
                    {m.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                        {m.name}
                      </p>
                      <a
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        href={`mailto:${m.email}`}
                      >
                        {m.email}
                      </a>
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${statusBadge[m.status]}`}>
                        {t(`admin.status${m.status.charAt(0).toUpperCase() + m.status.slice(1)}`)}
                      </span>
                      <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                        {relativeTime(m.created_at)}
                      </span>
                    </div>
                    <p
                      className={`text-xs text-[#6e6e73] dark:text-[#86868b] mt-1.5 leading-relaxed ${
                        expanded === m.id ? "" : "line-clamp-2"
                      }`}
                    >
                      {m.message}
                    </p>
                    {m.message.length > 120 && (
                      <button
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1"
                        onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                      >
                        {expanded === m.id ? t("admin.seeLess") : t("admin.seeMore")}
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {m.status !== "reviewed" && (
                      <button
                        className="p-1.5 rounded-lg text-[#aeaeb2] dark:text-[#636366] hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                        title={t("admin.markReviewed")}
                        onClick={() => handleStatus(m.id, "reviewed")}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                      </button>
                    )}
                    {m.status !== "replied" && (
                      <button
                        className="p-1.5 rounded-lg text-[#aeaeb2] dark:text-[#636366] hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors"
                        title={t("admin.markReplied")}
                        onClick={() => handleStatus(m.id, "replied")}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      </button>
                    )}
                    <a
                      className="p-1.5 rounded-lg text-[#aeaeb2] dark:text-[#636366] hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                      href={`mailto:${m.email}?subject=Re: ${t("contact.mailSubject")}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      title={t("admin.replyByEmail")}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </a>
                    {confirmDeleteId === m.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          className="px-2.5 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold transition-colors"
                          onClick={() => handleDelete(m.id)}
                        >
                          {t("common.delete")}
                        </button>
                        <button
                          className="px-2.5 py-1 rounded-lg border border-black/8 dark:border-white/8 hover:bg-black/5 dark:hover:bg-white/5 text-[10px] font-semibold transition-colors"
                          onClick={() => setConfirmDeleteId(null)}
                        >
                          {t("common.cancel")}
                        </button>
                      </div>
                    ) : (
                      <button
                        className="p-1.5 rounded-lg text-[#aeaeb2] dark:text-[#636366] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                        title={t("admin.delete")}
                        onClick={() => setConfirmDeleteId(m.id)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-center text-[#aeaeb2] dark:text-[#636366]">
        {t("admin.showingCount", {
          filtered: filtered.length,
          total: messages.length,
        })}
      </p>
    </div>
  );
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "ahora";
  if (mins < 60) return `hace ${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `hace ${days}d`;
  return new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}
