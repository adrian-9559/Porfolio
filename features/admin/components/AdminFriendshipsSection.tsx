import { useEffect, useState } from "react";
import { apiFetch } from "@/services/apiClient";
import { SectionHeader, Card, Spinner, EmptyState, Badge, relativeTime } from "./AdminShared";

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

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-5 flex flex-col gap-1">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">{label}</p>
      <p className="text-2xl font-semibold text-[#1d1d1f] dark:text-white">{value}</p>
    </div>
  );
}

export function AdminFriendshipsSection() {
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
        title="Amistades"
        desc="Gestión de amistades y solicitudes de amistad"
      />

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3">
        <MetricCard label="Total amistades" value={friendshipsAvailable ? friendships.length : "—"} />
        <MetricCard label="Solicitudes pendientes" value={requestsAvailable ? pendingCount : "—"} />
        <MetricCard label="Usuarios con amigos" value={friendshipsAvailable ? usersWithFriends : "—"} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-black/4 dark:bg-white/6 p-1 w-fit">
        {(["friendships", "requests"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              tab === t
                ? "bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white shadow-sm"
                : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
          >
            {t === "friendships" ? "Amistades" : "Solicitudes"}
          </button>
        ))}
      </div>

      {/* Amistades tab */}
      {tab === "friendships" && (
        <Card>
          {friendshipsLoading ? (
            <Spinner />
          ) : !friendshipsAvailable ? (
            <EmptyState text="No disponible" sub="El endpoint /admin/friendships no está disponible" />
          ) : friendships.length === 0 ? (
            <EmptyState text="Sin datos" />
          ) : (
            <>
              {/* Table header */}
              <div className="grid grid-cols-3 gap-4 px-5 py-2.5 border-b border-black/5 dark:border-white/5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Usuario A</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Usuario B</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Fecha</p>
              </div>
              <div className="divide-y divide-black/5 dark:divide-white/5">
                {friendships.map((f) => (
                  <div key={f.id} className="grid grid-cols-3 gap-4 px-5 py-3.5 items-center">
                    <p className="text-sm text-[#1d1d1f] dark:text-white truncate">{f.user_a_email}</p>
                    <p className="text-sm text-[#1d1d1f] dark:text-white truncate">{f.user_b_email}</p>
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">{relativeTime(f.created_at)}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      )}

      {/* Solicitudes tab */}
      {tab === "requests" && (
        <Card>
          {requestsLoading ? (
            <Spinner />
          ) : !requestsAvailable ? (
            <EmptyState text="No disponible" sub="El endpoint /admin/friendships/requests no está disponible" />
          ) : requests.length === 0 ? (
            <EmptyState text="Sin datos" />
          ) : (
            <>
              {/* Table header */}
              <div className="grid grid-cols-4 gap-4 px-5 py-2.5 border-b border-black/5 dark:border-white/5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Remitente</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Destinatario</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Estado</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Fecha</p>
              </div>
              <div className="divide-y divide-black/5 dark:divide-white/5">
                {requests.map((r) => (
                  <div key={r.id} className="grid grid-cols-4 gap-4 px-5 py-3.5 items-center">
                    <p className="text-sm text-[#1d1d1f] dark:text-white truncate">{r.sender_email}</p>
                    <p className="text-sm text-[#1d1d1f] dark:text-white truncate">{r.receiver_email}</p>
                    <div>
                      <Badge
                        label={r.status}
                        color={r.status === "pending" ? "amber" : r.status === "accepted" ? "green" : "gray"}
                      />
                    </div>
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">{relativeTime(r.created_at)}</p>
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
