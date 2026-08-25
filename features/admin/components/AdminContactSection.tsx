import { useEffect, useState } from "react";

import {
  SectionHeader,
  Card,
  Spinner,
  EmptyState,
  IconBtn,
  SearchInput,
  Badge,
  Icons,
  relativeTime,
} from "./AdminShared";

import { useT } from "@/hooks/useT";
import { adminService, ContactMessage } from "@/services/adminService";
import { userService } from "@/services/userService";
import type { UserWithProfile } from "@/types/auth";

const statusColor = {
  pending: "amber" as const,
  reviewed: "blue" as const,
  replied: "green" as const,
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
    <div className="flex flex-col gap-5">
      <SectionHeader
        desc={t("admin.messagesCount", {
          n: messages.length,
          pending,
          s: pending !== 1 ? "s" : "",
        })}
        title={t("admin.messages")}
      />

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label={t("admin.contactTotal")}
          value={messages.length}
          color="from-violet-500 to-pink-500"
        />
        <StatCard
          label={t("admin.contactPending")}
          value={pending}
          color="from-amber-500 to-orange-500"
        />
        <StatCard
          label={t("admin.contactReviewed")}
          value={reviewed}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          label={t("admin.contactReplied")}
          value={replied}
          color="from-emerald-500 to-teal-500"
        />
      </div>

      {/* Recipient selector */}
      <Card>
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                recipientMode === "all"
                  ? "bg-violet-600 text-white"
                  : "border border-black/12 dark:border-white/12 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
              }`}
              onClick={() => setRecipientMode("all")}
            >
              {t("admin.contactRecipientsAll")}
            </button>
            <button
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                recipientMode === "selected"
                  ? "bg-violet-600 text-white"
                  : "border border-black/12 dark:border-white/12 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
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
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                      selected
                        ? "bg-violet-100 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 border border-violet-300 dark:border-violet-700"
                        : "border border-black/12 dark:border-white/12 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                    onClick={() => toggleRecipient(u.id)}
                    type="button"
                  >
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-[9px] font-bold">
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
      </Card>

      {/* Search + filters */}
      <div className="flex gap-2 flex-wrap items-center">
        <div className="flex-1">
          <SearchInput
            placeholder={t("admin.searchByName")}
            value={search}
            onChange={setSearch}
          />
        </div>
        <div className="flex gap-1">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                filter === f.key
                  ? "bg-blue-600 text-white"
                  : "border border-black/12 dark:border-white/12 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
              }`}
              onClick={() => setFilter(f.key)}
            >
              {t(f.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Messages list */}
      <Card>
        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <EmptyState
            sub={search ? t("admin.noMessagesSearch") : t("admin.noMessagesHint")}
            text={t("admin.noMessages")}
          />
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
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md shadow-amber-500/20">
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
                      <Badge
                        color={statusColor[m.status]}
                        label={t(
                          `admin.status${m.status.charAt(0).toUpperCase() + m.status.slice(1)}`
                        )}
                      />
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
                        className="p-1.5 rounded-lg text-[#aeaeb2] hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                        title={t("admin.markReviewed")}
                        onClick={() => handleStatus(m.id, "reviewed")}
                      >
                        {Icons.check}
                      </button>
                    )}
                    {m.status !== "replied" && (
                      <button
                        className="p-1.5 rounded-lg text-[#aeaeb2] hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors"
                        title={t("admin.markReplied")}
                        onClick={() => handleStatus(m.id, "replied")}
                      >
                        {Icons.mail}
                      </button>
                    )}
                    <a
                      className="p-1.5 rounded-lg text-[#aeaeb2] hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                      href={`mailto:${m.email}?subject=Re: ${t("contact.mailSubject")}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      title={t("admin.replyByEmail")}
                    >
                      {Icons.send}
                    </a>
                    {confirmDeleteId === m.id ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          className="px-2 py-1 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 transition-colors"
                          onClick={() => handleDelete(m.id)}
                        >
                          {t("common.delete")}
                        </button>
                        <button
                          className="px-2 py-1 rounded-lg text-xs font-medium bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
                          onClick={() => setConfirmDeleteId(null)}
                        >
                          {t("common.cancel")}
                        </button>
                      </div>
                    ) : (
                      <IconBtn
                        danger
                        icon={Icons.trash}
                        title={t("admin.delete")}
                        onClick={() => setConfirmDeleteId(m.id)}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <p className="text-xs text-center text-[#aeaeb2] dark:text-[#636366]">
        {t("admin.showingCount", {
          filtered: filtered.length,
          total: messages.length,
        })}
      </p>
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-4 group hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-300">
      <div className={`absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br ${color} opacity-10 blur-xl group-hover:opacity-20 transition-opacity`} />
      <p className="text-2xl font-bold text-[#1d1d1f] dark:text-white">{value}</p>
      <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5">{label}</p>
    </div>
  );
}
