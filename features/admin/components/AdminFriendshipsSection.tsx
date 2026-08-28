import type {
  AdminFriendship,
  AdminFriendRequest,
} from "@/services/adminService";

import { useEffect, useState } from "react";

import { useT } from "@/hooks/useT";
import { adminService } from "@/services/adminService";

const GRADIENT = {
  badge: "bg-emerald-500/10 dark:bg-emerald-400/15 text-emerald-600 dark:text-emerald-400",
  icon: "bg-gradient-to-br from-emerald-500 to-green-500",
};

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-5 transition-all hover:shadow-xl hover:shadow-emerald-500/5">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-500/10 to-green-500/10 blur-2xl" />
      <div className="relative flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/20">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">{label}</p>
          <p className="text-2xl font-bold text-[#1d1d1f] dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    accepted: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    rejected: "bg-black/5 text-[#6e6e73] dark:bg-white/8 dark:text-[#86868b]",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${colors[status] ?? colors.rejected}`}>
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
    <div className="relative flex flex-col gap-6 overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full bg-emerald-500/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-green-500/6 blur-3xl" />

      {/* Header */}
      <div className="relative">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${GRADIENT.badge}`}>
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Friendships
        </span>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-[#1d1d1f] dark:text-white">
          {t("admin.friendshipsTitle")}
        </h1>
        <p className="mt-1 text-sm text-[#6e6e73] dark:text-[#86868b]">
          {t("admin.friendshipsDesc")}
        </p>
      </div>

      {/* Metric cards */}
      <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-3">
        <MetricCard
          label={t("admin.totalFriendships")}
          value={friendshipsAvailable ? friendships.length : "—"}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
        <MetricCard
          label={t("admin.pendingRequests")}
          value={requestsAvailable ? pendingCount : "—"}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <MetricCard
          label={t("admin.usersWithFriends")}
          value={friendshipsAvailable ? usersWithFriends : "—"}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
      </div>

      {/* Tab switcher */}
      <div className="relative flex gap-1 rounded-full bg-black/4 dark:bg-white/6 p-1 w-fit">
        {(["friendships", "requests"] as const).map((tabKey) => (
          <button
            key={tabKey}
            className={`rounded-full px-5 py-1.5 text-sm font-medium transition-all ${
              tab === tabKey
                ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md shadow-emerald-500/25"
                : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
            onClick={() => setTab(tabKey)}
          >
            {tabKey === "friendships" ? t("admin.tabFriendships") : t("admin.tabRequests")}
          </button>
        ))}
      </div>

      {/* Friendships table */}
      {tab === "friendships" && (
        <div className="relative overflow-hidden rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116]">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 transition-opacity hover:opacity-100" style={{ pointerEvents: "none" }} />
          {friendshipsLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-6 w-6 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin" />
            </div>
          ) : !friendshipsAvailable ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <svg className="h-10 w-10 text-[#d1d1d6] dark:text-[#424245]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">{t("admin.notAvailable")}</p>
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">{t("admin.notAvailableHint")}</p>
            </div>
          ) : friendships.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">{t("admin.noData")}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 border-b border-black/5 dark:border-white/5 px-5 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">{t("admin.userA")}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">{t("admin.userB")}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">{t("admin.dateCol")}</p>
              </div>
              <div className="divide-y divide-black/5 dark:divide-white/5">
                {friendships.map((f) => (
                  <div key={f.id} className="group/item relative grid grid-cols-3 gap-4 px-5 py-3.5 items-center transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 transition-opacity group-hover/item:opacity-100" />
                    <p className="truncate text-sm text-[#1d1d1f] dark:text-white">{f.user_a_email}</p>
                    <p className="truncate text-sm text-[#1d1d1f] dark:text-white">{f.user_b_email}</p>
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">{relativeTime(f.created_at)}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Requests table */}
      {tab === "requests" && (
        <div className="relative overflow-hidden rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116]">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 transition-opacity hover:opacity-100" style={{ pointerEvents: "none" }} />
          {requestsLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-6 w-6 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin" />
            </div>
          ) : !requestsAvailable ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <svg className="h-10 w-10 text-[#d1d1d6] dark:text-[#424245]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">{t("admin.notAvailable")}</p>
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">{t("admin.notAvailableHint")}</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <p className="text-sm font-medium text-[#1d1d1f] dark:text-white">{t("admin.noData")}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-4 border-b border-black/5 dark:border-white/5 px-5 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">{t("admin.sender")}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">{t("admin.recipient")}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">{t("admin.statusCol")}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">{t("admin.dateCol")}</p>
              </div>
              <div className="divide-y divide-black/5 dark:divide-white/5">
                {requests.map((r) => (
                  <div key={r.id} className="group/item relative grid grid-cols-4 gap-4 px-5 py-3.5 items-center transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 transition-opacity group-hover/item:opacity-100" />
                    <p className="truncate text-sm text-[#1d1d1f] dark:text-white">{r.sender_email}</p>
                    <p className="truncate text-sm text-[#1d1d1f] dark:text-white">{r.receiver_email}</p>
                    <div>
                      <StatusBadge status={r.status} />
                    </div>
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">{relativeTime(r.created_at)}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

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
