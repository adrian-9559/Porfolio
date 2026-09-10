import type {
  AdminFriendship,
  AdminFriendRequest,
} from "@/services/adminService";

import { useEffect, useState } from "react";

import { useT } from "@/hooks/useT";
import { adminService } from "@/services/adminService";
import { relativeTime } from "./AdminShared";
import {
  AdminPageHeader,
  AdminStatGrid,
  AdminStat,
  AdminPanel,
  AdminEmptyState,
  AdminLoadingSkeleton,
} from "./AdminShell";

function StatusBadge({ status }: { status: string }) {
  const cls: Record<string, string> = {
    pending: "admin-badge-warning",
    accepted: "admin-badge-success",
    rejected: "admin-badge-danger",
  };

  return (
    <span className={`admin-badge ${cls[status] ?? cls.rejected} capitalize`}>
      {status}
    </span>
  );
}

export function AdminFriendshipsSection() {
  const { t } = useT();
  const [tab, setTab] = useState<"friendships" | "requests">("friendships");

  const [friendships, setFriendships] = useState<AdminFriendship[]>([]);
  const [friendshipsLoading, setFriendshipsLoading] = useState(true);
  const [friendshipsAvailable, setFriendshipsAvailable] = useState(true);

  const [requests, setRequests] = useState<AdminFriendRequest[]>([]);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [requestsAvailable, setRequestsAvailable] = useState(true);

  useEffect(() => {
    setFriendshipsLoading(true);
    adminService
      .listFriendships()
      .then(setFriendships)
      .catch(() => setFriendshipsAvailable(false))
      .finally(() => setFriendshipsLoading(false));

    setRequestsLoading(true);
    adminService
      .listFriendRequests()
      .then(setRequests)
      .catch(() => setRequestsAvailable(false))
      .finally(() => setRequestsLoading(false));
  }, []);

  const usersWithFriends = new Set([
    ...friendships.map((f) => f.user_a_email),
    ...friendships.map((f) => f.user_b_email),
  ]).size;

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={t("admin.friendshipsTitle")}
        description={t("admin.friendshipsDesc")}
      />

      <AdminStatGrid cols={3}>
        <AdminStat
          label={t("admin.totalFriendships")}
          value={friendshipsAvailable ? friendships.length : "—"}
        />
        <AdminStat
          label={t("admin.pendingRequests")}
          value={requestsAvailable ? pendingCount : "—"}
        />
        <AdminStat
          label={t("admin.usersWithFriends")}
          value={friendshipsAvailable ? usersWithFriends : "—"}
        />
      </AdminStatGrid>

      <div className="admin-tabs w-fit">
        {(["friendships", "requests"] as const).map((tabKey) => (
          <button
            key={tabKey}
            className={`admin-tab ${tab === tabKey ? "admin-tab-active" : ""}`}
            onClick={() => setTab(tabKey)}
          >
            {tabKey === "friendships"
              ? t("admin.tabFriendships")
              : t("admin.tabRequests")}
          </button>
        ))}
      </div>

      {tab === "friendships" && (
        <AdminPanel>
          {friendshipsLoading ? (
            <AdminLoadingSkeleton rows={5} />
          ) : !friendshipsAvailable ? (
            <AdminEmptyState
              title={t("admin.notAvailable")}
              description={t("admin.notAvailableHint")}
            />
          ) : friendships.length === 0 ? (
            <AdminEmptyState title={t("admin.noData")} />
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 border-b border-[var(--border-default)] px-5 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  {t("admin.userA")}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  {t("admin.userB")}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  {t("admin.dateCol")}
                </p>
              </div>
              <div className="divide-y divide-[var(--border-default)]">
                {friendships.map((f) => (
                  <div
                    key={f.id}
                    className="grid grid-cols-3 gap-4 px-5 py-3.5 items-center transition-colors hover:bg-[var(--bg-hover)]"
                  >
                    <p className="truncate text-sm text-[var(--text-primary)]">
                      {f.user_a_email}
                    </p>
                    <p className="truncate text-sm text-[var(--text-primary)]">
                      {f.user_b_email}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {relativeTime(f.created_at)}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </AdminPanel>
      )}

      {tab === "requests" && (
        <AdminPanel>
          {requestsLoading ? (
            <AdminLoadingSkeleton rows={5} />
          ) : !requestsAvailable ? (
            <AdminEmptyState
              title={t("admin.notAvailable")}
              description={t("admin.notAvailableHint")}
            />
          ) : requests.length === 0 ? (
            <AdminEmptyState title={t("admin.noData")} />
          ) : (
            <>
              <div className="grid grid-cols-4 gap-4 border-b border-[var(--border-default)] px-5 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  {t("admin.sender")}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  {t("admin.recipient")}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  {t("admin.statusCol")}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  {t("admin.dateCol")}
                </p>
              </div>
              <div className="divide-y divide-[var(--border-default)]">
                {requests.map((r) => (
                  <div
                    key={r.id}
                    className="grid grid-cols-4 gap-4 px-5 py-3.5 items-center transition-colors hover:bg-[var(--bg-hover)]"
                  >
                    <p className="truncate text-sm text-[var(--text-primary)]">
                      {r.sender_email}
                    </p>
                    <p className="truncate text-sm text-[var(--text-primary)]">
                      {r.receiver_email}
                    </p>
                    <div>
                      <StatusBadge status={r.status} />
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {relativeTime(r.created_at)}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </AdminPanel>
      )}
    </div>
  );
}
