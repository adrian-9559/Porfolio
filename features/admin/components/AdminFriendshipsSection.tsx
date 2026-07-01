import { useEffect, useState } from "react";
import { useT } from "@/hooks/useT";

import {
  SectionHeader,
  Card,
  Spinner,
  EmptyState,
  Badge,
  relativeTime,
} from "./AdminShared";

import { apiFetch } from "@/services/apiClient";

interface AdminFriendship {
  id: string;
  user_a_email: string;
  user_b_email: string;
  created_at: string;
}

interface AdminFriendRequest {
  id: string;
  sender_email: string;
  receiver_email: string;
  status: string;
  created_at: string;
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-5 flex flex-col gap-1">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">
        {label}
      </p>
      <p className="text-2xl font-semibold text-[#1d1d1f] dark:text-white">
        {value}
      </p>
    </div>
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
    apiFetch<AdminFriendship[]>("/admin/friendships")
      .then(setFriendships)
      .catch(() => setFriendshipsAvailable(false))
      .finally(() => setFriendshipsLoading(false));

    setRequestsLoading(true);
    apiFetch<AdminFriendRequest[]>("/admin/friendships/requests")
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
    <div className="flex flex-col gap-5">
      <SectionHeader
        desc={t("admin.friendshipsDesc")}
        title={t("admin.friendshipsTitle")}
      />

      <div className="grid grid-cols-3 gap-3">
        <MetricCard
          label={t("admin.totalFriendships")}
          value={friendshipsAvailable ? friendships.length : "—"}
        />
        <MetricCard
          label={t("admin.pendingRequests")}
          value={requestsAvailable ? pendingCount : "—"}
        />
        <MetricCard
          label={t("admin.usersWithFriends")}
          value={friendshipsAvailable ? usersWithFriends : "—"}
        />
      </div>

      <div className="flex gap-1 rounded-xl bg-black/4 dark:bg-white/6 p-1 w-fit">
        {(["friendships", "requests"] as const).map((tabKey) => (
          <button
            key={tabKey}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              tab === tabKey
                ? "bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white shadow-sm"
                : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
            onClick={() => setTab(tabKey)}
          >
            {tabKey === "friendships" ? t("admin.tabFriendships") : t("admin.tabRequests")}
          </button>
        ))}
      </div>

      {tab === "friendships" && (
        <Card>
          {friendshipsLoading ? (
            <Spinner />
          ) : !friendshipsAvailable ? (
            <EmptyState
              sub={t("admin.notAvailableHint")}
              text={t("admin.notAvailable")}
            />
          ) : friendships.length === 0 ? (
            <EmptyState text={t("admin.noData")} />
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 px-5 py-2.5 border-b border-black/5 dark:border-white/5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">
                  {t("admin.userA")}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">
                  {t("admin.userB")}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">
                  {t("admin.dateCol")}
                </p>
              </div>
              <div className="divide-y divide-black/5 dark:divide-white/5">
                {friendships.map((f) => (
                  <div
                    key={f.id}
                    className="grid grid-cols-3 gap-4 px-5 py-3.5 items-center"
                  >
                    <p className="text-sm text-[#1d1d1f] dark:text-white truncate">
                      {f.user_a_email}
                    </p>
                    <p className="text-sm text-[#1d1d1f] dark:text-white truncate">
                      {f.user_b_email}
                    </p>
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                      {relativeTime(f.created_at)}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      )}

      {tab === "requests" && (
        <Card>
          {requestsLoading ? (
            <Spinner />
          ) : !requestsAvailable ? (
            <EmptyState
              sub={t("admin.notAvailableHint")}
              text={t("admin.notAvailable")}
            />
          ) : requests.length === 0 ? (
            <EmptyState text={t("admin.noData")} />
          ) : (
            <>
              <div className="grid grid-cols-4 gap-4 px-5 py-2.5 border-b border-black/5 dark:border-white/5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">
                  {t("admin.sender")}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">
                  {t("admin.recipient")}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">
                  {t("admin.statusCol")}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">
                  {t("admin.dateCol")}
                </p>
              </div>
              <div className="divide-y divide-black/5 dark:divide-white/5">
                {requests.map((r) => (
                  <div
                    key={r.id}
                    className="grid grid-cols-4 gap-4 px-5 py-3.5 items-center"
                  >
                    <p className="text-sm text-[#1d1d1f] dark:text-white truncate">
                      {r.sender_email}
                    </p>
                    <p className="text-sm text-[#1d1d1f] dark:text-white truncate">
                      {r.receiver_email}
                    </p>
                    <div>
                      <Badge
                        color={
                          r.status === "pending"
                            ? "amber"
                            : r.status === "accepted"
                              ? "green"
                              : "gray"
                        }
                        label={r.status}
                      />
                    </div>
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                      {relativeTime(r.created_at)}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  );
}
