import type { UserWithProfile } from "@/types/auth";

import { useEffect, useState } from "react";

import { useT } from "@/hooks/useT";
import { adminService, ContactMessage } from "@/services/adminService";
import { userService } from "@/services/userService";

import {
  AdminPageHeader,
  AdminStatGrid,
  AdminStat,
  AdminPanel,
  AdminEmptyState,
  AdminLoadingSkeleton,
  AdminFilterChip,
} from "./AdminShell";
import { relativeTime, SearchInput, IconBtn, Icons, Btn } from "./AdminShared";

const statusBadgeClass: Record<string, string> = {
  pending: "admin-badge admin-badge-warning",
  reviewed: "admin-badge admin-badge-info",
  replied: "admin-badge admin-badge-success",
};

export function AdminContactSection() {
  const { t } = useT();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | ContactMessage["status"]>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

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
    userService
      .list()
      .then(setUsers)
      .catch(() => {});
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
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
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
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        description={t("admin.messagesCount", {
          n: messages.length,
          pending,
          s: pending !== 1 ? "s" : "",
        })}
        title={t("admin.messages")}
      />

      <AdminStatGrid cols={4}>
        <AdminStat
          label={t("admin.contactTotal")}
          value={messages.length}
        />
        <AdminStat
          label={t("admin.contactPending")}
          value={pending}
          sub={pending > 0 ? `${pending} ${t("admin.unread")}` : undefined}
        />
        <AdminStat
          label={t("admin.contactReviewed")}
          value={reviewed}
        />
        <AdminStat
          label={t("admin.contactReplied")}
          value={replied}
        />
      </AdminStatGrid>

      <AdminPanel
        title={t("admin.contactRecipientsTitle")}
        actions={
          <Btn
            onClick={handleSaveRecipients}
            disabled={savingRecipients}
          >
            {savingRecipients
              ? "..."
              : recipientSaved
                ? "✓"
                : t("admin.contactRecipientsSave")}
          </Btn>
        }
      >
        <p className="text-xs text-[var(--text-muted)] mb-3">
          {t("admin.contactRecipientsDesc")}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <button
            className={`ds-btn-ghost ${recipientMode === "all" ? "ds-btn-primary" : ""}`}
            onClick={() => setRecipientMode("all")}
            type="button"
          >
            {t("admin.contactRecipientsAll")}
          </button>
          <button
            className={`ds-btn-ghost ${recipientMode === "selected" ? "ds-btn-primary" : ""}`}
            onClick={() => setRecipientMode("selected")}
            type="button"
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
                  className={`admin-filter-chip ${selected ? "admin-filter-chip-active" : ""}`}
                  type="button"
                  onClick={() => toggleRecipient(u.id)}
                >
                  {selected && (
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                      />
                    </svg>
                  )}
                  {name}
                </button>
              );
            })}
          </div>
        )}

        <p className="text-[10px] text-[var(--text-muted)]">
          {t("admin.contactRecipientsNote")}
        </p>
      </AdminPanel>

      <div className="flex flex-col gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("admin.searchByName")}
        />
        <div className="flex gap-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <AdminFilterChip
              key={f.key}
              active={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {t(f.labelKey)}
            </AdminFilterChip>
          ))}
        </div>
      </div>

      <AdminPanel>
        {loading ? (
          <AdminLoadingSkeleton rows={5} />
        ) : filtered.length === 0 ? (
          <AdminEmptyState
            description={search ? t("admin.noMessagesSearch") : t("admin.noMessagesHint")}
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            }
            title={t("admin.noMessages")}
          />
        ) : (
          <div className="divide-y" style={{ borderColor: "var(--border-default)" }}>
            {filtered.map((m) => (
              <div
                key={m.id}
                className="flex items-start gap-3 px-5 py-4 transition-colors hover:bg-[var(--bg-hover)]"
                style={m.status === "pending" ? { borderLeft: "2px solid var(--color-warning)" } : undefined}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border-default)",
                  }}
                >
                  {m.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {m.name}
                    </p>
                    <a
                      className="text-xs text-[var(--accent)] hover:underline"
                      href={`mailto:${m.email}`}
                    >
                      {m.email}
                    </a>
                    <span className={statusBadgeClass[m.status]}>
                      {t(
                        `admin.status${m.status.charAt(0).toUpperCase() + m.status.slice(1)}`,
                      )}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      {relativeTime(m.created_at)}
                    </span>
                  </div>
                  <p
                    className={`text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed ${
                      expanded === m.id ? "" : "line-clamp-2"
                    }`}
                  >
                    {m.message}
                  </p>
                  {m.message.length > 120 && (
                    <button
                      className="text-xs text-[var(--accent)] hover:underline mt-1"
                      onClick={() =>
                        setExpanded(expanded === m.id ? null : m.id)
                      }
                    >
                      {expanded === m.id
                        ? t("admin.seeLess")
                        : t("admin.seeMore")}
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {m.status !== "reviewed" && (
                    <IconBtn
                      onClick={() => handleStatus(m.id, "reviewed")}
                      title={t("admin.markReviewed")}
                      icon={Icons.check}
                    />
                  )}
                  {m.status !== "replied" && (
                    <IconBtn
                      onClick={() => handleStatus(m.id, "replied")}
                      title={t("admin.markReplied")}
                      icon={Icons.mail}
                    />
                  )}
                  <a
                    className="ds-btn-icon"
                    href={`mailto:${m.email}?subject=Re: ${t("contact.mailSubject")}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={t("admin.replyByEmail")}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <line x1="22" x2="11" y1="2" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </a>
                  {confirmDeleteId === m.id ? (
                    <div className="flex items-center gap-1">
                      <Btn variant="danger" onClick={() => handleDelete(m.id)}>
                        {t("common.delete")}
                      </Btn>
                      <Btn variant="ghost" onClick={() => setConfirmDeleteId(null)}>
                        {t("common.cancel")}
                      </Btn>
                    </div>
                  ) : (
                    <IconBtn
                      onClick={() => setConfirmDeleteId(m.id)}
                      title={t("admin.delete")}
                      icon={Icons.trash}
                      danger
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminPanel>

      <p className="text-xs text-center text-[var(--text-muted)]">
        {t("admin.showingCount", {
          filtered: filtered.length,
          total: messages.length,
        })}
      </p>
    </div>
  );
}
