import type { UserWithProfile } from "@/types/auth";

import { useEffect, useState } from "react";

import { adminService, AdminNotification } from "@/services/adminService";
import { userService } from "@/services/userService";
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
import { relativeTime, Icons, SearchInput, IconBtn, Btn, Badge, Input, Textarea } from "./AdminShared";

const TYPE_BADGE: Record<string, string> = {
  info: "admin-badge-info",
  admin: "admin-badge",
  system: "admin-badge",
};

const TYPE_ICON: Record<string, React.ReactNode> = {
  info: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="16" y2="12" />
      <line x1="12" x2="12.01" y1="8" y2="8" />
    </svg>
  ),
  admin: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  system: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  ),
};

export function AdminNotificationsSection() {
  const { t } = useT();
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "info" | "admin" | "system">("all");

  const [sendTitle, setSendTitle] = useState("");
  const [sendMsg, setSendMsg] = useState("");
  const [sendType, setSendType] = useState<"info" | "admin" | "system">("admin");
  const [sendTarget, setSendTarget] = useState<"admins" | "all" | "user">("admins");
  const [sendUserId, setSendUserId] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const [n, u] = await Promise.all([
        adminService.listNotifications(),
        userService.list(),
      ]);
      setNotifications(n);
      setUsers(u);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = notifications.filter((n) => {
    if (filter === "unread" && n.read) return false;
    if (filter !== "all" && filter !== "unread" && n.type !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q);
    }
    return true;
  });

  const handleDelete = async (id: string) => {
    setConfirmDeleteId(null);
    try {
      await adminService.deleteNotification(id);
      setNotifications((n) => n.filter((x) => x.id !== id));
    } catch {}
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sendTitle.trim() || !sendMsg.trim()) return;
    setSending(true);
    setSendResult("");
    try {
      const payload = {
        title: sendTitle,
        message: sendMsg,
        type: sendType,
        toAll: sendTarget === "all",
        ...(sendTarget === "user" && sendUserId ? { userId: sendUserId } : {}),
      };
      const { sent } = await adminService.sendNotification(payload);
      setSendResult(`Enviado a ${sent} destinatario${typeof sent === "number" && sent !== 1 ? "s" : ""}`);
      setSendTitle("");
      setSendMsg("");
      await load();
    } catch {
      setSendResult("Error al enviar");
    }
    setSending(false);
  };

  const FILTERS = [
    { key: "all", label: t("admin.filterAll") },
    { key: "unread", label: t("admin.unread") },
    { key: "info", label: "Info" },
    { key: "admin", label: "Admin" },
    { key: "system", label: t("admin.systemBadge") },
  ] as const;

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={t("admin.notifications")}
        description={`${notifications.length} ${t("admin.total").toLowerCase()} · ${unread} ${t("admin.unread").toLowerCase()}`}
      />

      <AdminStatGrid cols={3}>
        <AdminStat label={t("admin.total")} value={notifications.length} accent />
        <AdminStat label={t("admin.unread")} value={unread} />
        <AdminStat label={t("admin.read")} value={notifications.length - unread} />
      </AdminStatGrid>

      <AdminPanel title={t("admin.sendNotification")}>
        <form className="flex flex-col gap-3" onSubmit={handleSend}>
          <div className="flex gap-3">
            <Input
              value={sendTitle}
              onChange={setSendTitle}
              placeholder={t("admin.title")}
            />
            <select
              className="ds-input w-auto"
              value={sendType}
              onChange={(e) => setSendType(e.target.value as typeof sendType)}
            >
              <option value="info">Info</option>
              <option value="admin">Admin</option>
              <option value="system">{t("admin.systemBadge")}</option>
            </select>
          </div>
          <Textarea
            value={sendMsg}
            onChange={setSendMsg}
            placeholder={t("admin.messagePlaceholder")}
            rows={2}
          />
          <div className="flex items-center gap-3 flex-wrap">
            <select
              className="ds-input w-auto"
              value={sendTarget}
              onChange={(e) => setSendTarget(e.target.value as typeof sendTarget)}
            >
              <option value="admins">{t("admin.onlyAdmins")}</option>
              <option value="all">{t("admin.allUsers")}</option>
              <option value="user">{t("admin.specificUser")}</option>
            </select>
            {sendTarget === "user" && (
              <select
                className="ds-input flex-1"
                value={sendUserId}
                onChange={(e) => setSendUserId(e.target.value)}
              >
                <option value="">{t("admin.selectUser")}</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.profile?.full_name ?? u.email}
                  </option>
                ))}
              </select>
            )}
            <Btn
              onClick={() => handleSend(new Event('submit') as any)}
              disabled={sending || !sendTitle.trim() || !sendMsg.trim()}
            >
              {Icons.send} {t("admin.send")}
            </Btn>
            {sendResult && (
              <span className="text-xs" style={{ color: "var(--color-success)" }}>
                {sendResult}
              </span>
            )}
          </div>
        </form>
      </AdminPanel>

      <div className="flex flex-col gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("admin.searchNotifications")}
        />
        <div className="flex gap-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <AdminFilterChip
              key={f.key}
              active={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </AdminFilterChip>
          ))}
        </div>
      </div>

      <AdminPanel>
        {loading ? (
          <AdminLoadingSkeleton rows={5} />
        ) : filtered.length === 0 ? (
          <AdminEmptyState
            icon={Icons.bell}
            title={search ? t("admin.noMessagesSearch") : t("admin.noNotifications")}
          />
        ) : (
          <div className="divide-y" style={{ borderColor: "var(--border-default)" }}>
            {filtered.map((n) => (
              <div
                key={n.id}
                className="flex items-start gap-3 px-5 py-3.5 transition-colors"
                style={{
                  backgroundColor: !n.read ? "var(--accent-light)" : "transparent",
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "var(--bg-hover)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {TYPE_ICON[n.type] ?? TYPE_ICON.info}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                      {n.title}
                    </p>
                    <span className={`admin-badge ${TYPE_BADGE[n.type] ?? "admin-badge"}`}>
                      {n.type}
                    </span>
                    {!n.read && (
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: "var(--accent)" }}
                      />
                    )}
                  </div>
                  <p className="text-xs line-clamp-2" style={{ color: "var(--text-muted)" }}>
                    {n.message}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {relativeTime(n.created_at)}
                    </span>
                    {n.profiles?.full_name && (
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                        → {n.profiles.full_name}
                      </span>
                    )}
                  </div>
                </div>
                {confirmDeleteId === n.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      className="ds-btn-danger px-2.5 py-1 text-[10px]"
                      onClick={() => handleDelete(n.id)}
                    >
                      {t("admin.delete")}
                    </button>
                    <button
                      className="ds-btn-ghost px-2.5 py-1 text-[10px]"
                      onClick={() => setConfirmDeleteId(null)}
                    >
                      {t("admin.cancel")}
                    </button>
                  </div>
                ) : (
                  <IconBtn
                    onClick={() => setConfirmDeleteId(n.id)}
                    title={t("admin.delete")}
                    icon={Icons.trash}
                    danger
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </AdminPanel>

      <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
        {t("admin.showingCount", { filtered: filtered.length, total: notifications.length })}
      </p>
    </div>
  );
}
