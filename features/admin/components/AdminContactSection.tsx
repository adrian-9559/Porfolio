import { useEffect, useState } from "react";
import { useT } from "@/hooks/useT";

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

import { adminService, ContactMessage } from "@/services/adminService";

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

  const load = async () => {
    setLoading(true);
    try {
      setMessages(await adminService.listContact());
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    load();
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

  const FILTERS = [
    { key: "all", labelKey: "admin.filterAll" },
    { key: "pending", labelKey: "admin.filterPending" },
    { key: "reviewed", labelKey: "admin.filterReviewed" },
    { key: "replied", labelKey: "admin.filterResponded" },
  ] as const;

  const pending = messages.filter((m) => m.status === "pending").length;

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        desc={t("admin.messagesCount", { n: messages.length, pending, s: pending !== 1 ? "s" : "" })}
        title={t("admin.messages")}
      />

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
              <div key={m.id} className="px-5 py-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                    {m.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">
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
                        label={t(`admin.status${m.status.charAt(0).toUpperCase() + m.status.slice(1)}`)}
                      />
                      <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                        {relativeTime(m.created_at)}
                      </span>
                    </div>
                    <p
                      className={`text-xs text-[#6e6e73] dark:text-[#86868b] mt-1 ${expanded === m.id ? "" : "line-clamp-2"}`}
                    >
                      {m.message}
                    </p>
                    {m.message.length > 120 && (
                      <button
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-0.5"
                        onClick={() =>
                          setExpanded(expanded === m.id ? null : m.id)
                        }
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
        {t("admin.showingCount", { filtered: filtered.length, total: messages.length })}
      </p>
    </div>
  );
}
