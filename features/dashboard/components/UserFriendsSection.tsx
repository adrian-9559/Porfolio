import { useState, useEffect, useCallback } from "react";
import {
  friendsService,
  type Friend,
  type FriendRequest,
  type FriendSearchResult,
} from "../../../services/friendsService";

type Tab = "amigos" | "recibidas" | "enviadas" | "buscar";

const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-cyan-500",
  "bg-fuchsia-500",
  "bg-teal-500",
];

function avatarColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function formatDate(iso: string): string {
  const months = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  const d = new Date(iso);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function UserAvatar({
  avatarUrl,
  name,
  email,
  size = "md",
}: {
  avatarUrl: string | null;
  name: string | null;
  email: string;
  size?: "sm" | "md";
}) {
  const label = name ?? email;
  const letter = label[0]?.toUpperCase() ?? "?";
  const sz = size === "sm" ? "w-7 h-7 text-[10px]" : "w-9 h-9 text-sm";
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={label}
        className={`${sz} rounded-full object-cover flex-shrink-0`}
      />
    );
  }
  return (
    <span
      className={`${sz} ${avatarColor(email)} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
    >
      {letter}
    </span>
  );
}

function Spinner() {
  return (
    <div className="flex justify-center py-8">
      <div className="w-5 h-5 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin" />
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-8 text-center">
      <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">{text}</p>
    </div>
  );
}

function FriendsTab({
  friends,
  loading,
  onDelete,
}: {
  friends: Friend[];
  loading: boolean;
  onDelete: (friend: Friend) => Promise<void>;
}) {
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(friend: Friend) {
    setDeleting(friend.id);
    try {
      await onDelete(friend);
    } finally {
      setDeleting(null);
      setConfirmId(null);
    }
  }

  if (loading) return <Spinner />;
  if (friends.length === 0) return <EmptyState text="No tienes amigos aún. ¡Busca a alguien!" />;

  return (
    <div className="flex flex-col gap-2">
      {friends.map((f) => (
        <div
          key={f.id}
          className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-4 flex items-center gap-3"
        >
          <UserAvatar avatarUrl={f.avatar_url} name={f.full_name} email={f.email} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white truncate">
              {f.full_name ?? f.email}
            </p>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5 truncate">{f.email}</p>
            <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-0.5">
              Amigos desde {formatDate(f.created_at)}
            </p>
          </div>
          {confirmId === f.id ? (
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-[#6e6e73] dark:text-[#86868b]">¿Eliminar?</span>
              <button
                onClick={() => handleDelete(f)}
                disabled={deleting === f.id}
                className="bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
              >
                {deleting === f.id ? "…" : "Sí"}
              </button>
              <button
                onClick={() => setConfirmId(null)}
                className="border border-black/12 dark:border-white/12 hover:bg-black/5 dark:hover:bg-white/5 text-[#1d1d1f] dark:text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
              >
                No
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmId(f.id)}
              className="text-xs font-medium border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
            >
              Eliminar amigo
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function ReceivedTab({
  requests,
  loading,
  onAccept,
  onReject,
}: {
  requests: FriendRequest[];
  loading: boolean;
  onAccept: (req: FriendRequest) => Promise<void>;
  onReject: (req: FriendRequest) => Promise<void>;
}) {
  const [acting, setActing] = useState<string | null>(null);

  async function handleAccept(req: FriendRequest) {
    setActing(req.id);
    try { await onAccept(req); } finally { setActing(null); }
  }

  async function handleReject(req: FriendRequest) {
    setActing(req.id);
    try { await onReject(req); } finally { setActing(null); }
  }

  if (loading) return <Spinner />;
  if (requests.length === 0) return <EmptyState text="No tienes solicitudes pendientes." />;

  return (
    <div className="flex flex-col gap-2">
      {requests.map((req) => {
        const sender = req.sender;
        const name = sender?.full_name ?? sender?.email ?? req.sender_user_id;
        const email = sender?.email ?? "";
        return (
          <div
            key={req.id}
            className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-4 flex items-center gap-3"
          >
            <UserAvatar avatarUrl={sender?.avatar_url ?? null} name={sender?.full_name ?? null} email={email} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white truncate">{name}</p>
              {email && <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5 truncate">{email}</p>}
              <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-0.5">{formatDate(req.created_at)}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => handleAccept(req)}
                disabled={acting === req.id}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
              >
                {acting === req.id ? "…" : "Aceptar"}
              </button>
              <button
                onClick={() => handleReject(req)}
                disabled={acting === req.id}
                className="bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
              >
                Rechazar
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SentTab({ requests, loading }: { requests: FriendRequest[]; loading: boolean }) {
  if (loading) return <Spinner />;
  if (requests.length === 0) return <EmptyState text="No has enviado solicitudes." />;

  return (
    <div className="flex flex-col gap-2">
      {requests.map((req) => {
        const receiver = req.receiver;
        const name = receiver?.full_name ?? receiver?.email ?? req.receiver_user_id;
        const email = receiver?.email ?? "";
        return (
          <div
            key={req.id}
            className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-4 flex items-center gap-3"
          >
            <UserAvatar avatarUrl={receiver?.avatar_url ?? null} name={receiver?.full_name ?? null} email={email} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white truncate">{name}</p>
              {email && <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5 truncate">{email}</p>}
              <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-0.5">{formatDate(req.created_at)}</p>
            </div>
            <span className="flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
              Pendiente
            </span>
          </div>
        );
      })}
    </div>
  );
}

function SearchTab({ onRequestSent }: { onRequestSent: () => void }) {
  const [email, setEmail] = useState("");
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<FriendSearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = email.trim();
    if (!q) return;
    setSearching(true);
    setError(null);
    setResult(null);
    setSent(false);
    try {
      const res = await friendsService.search(q);
      setResult(res);
    } catch (err: any) {
      setError(err?.message ?? "Usuario no encontrado.");
    } finally {
      setSearching(false);
    }
  }

  async function handleSendRequest() {
    if (!result) return;
    setSending(true);
    try {
      await friendsService.sendRequest(result.id);
      setSent(true);
      setResult((prev) => prev ? { ...prev, relationship: "pending_sent" } : prev);
      onRequestSent();
    } catch (err: any) {
      setError(err?.message ?? "Error al enviar la solicitud.");
    } finally {
      setSending(false);
    }
  }

  const relationshipLabel: Record<FriendSearchResult["relationship"], string> = {
    none: "",
    pending_sent: "Solicitud enviada",
    pending_received: "Solicitud recibida",
    friends: "Ya sois amigos",
  };

  const isActionable = result?.relationship === "none" && !sent;

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="email"
          placeholder="Buscar por email…"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        />
        <button
          type="submit"
          disabled={searching}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors flex-shrink-0"
        >
          {searching ? (
            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            "Buscar"
          )}
        </button>
      </form>

      {error && (
        <div className="rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/20 p-4">
          <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
        </div>
      )}

      {result && (
        <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-4 flex items-center gap-3">
          <UserAvatar avatarUrl={result.avatar_url} name={result.full_name} email={result.email} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white truncate">
              {result.full_name ?? result.email}
            </p>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5 truncate">{result.email}</p>
          </div>
          {result.relationship !== "none" ? (
            <span className="flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/8 text-[#6e6e73] dark:text-[#86868b]">
              {relationshipLabel[result.relationship]}
            </span>
          ) : sent ? (
            <span className="flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              Solicitud enviada
            </span>
          ) : (
            <button
              onClick={handleSendRequest}
              disabled={!isActionable || sending}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
            >
              {sending ? "…" : "Enviar solicitud"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function UserFriendsSection() {
  const [tab, setTab] = useState<Tab>("amigos");
  const [friends, setFriends] = useState<Friend[]>([]);
  const [received, setReceived] = useState<FriendRequest[]>([]);
  const [sent, setSent] = useState<FriendRequest[]>([]);

  const [loadingFriends, setLoadingFriends] = useState(true);
  const [loadingReceived, setLoadingReceived] = useState(true);
  const [loadingSent, setLoadingSent] = useState(true);

  const [tabLoaded, setTabLoaded] = useState<Set<Tab>>(new Set(["amigos", "recibidas", "enviadas"]));

  const fetchAll = useCallback(async () => {
    const [fr, rec, snt] = await Promise.allSettled([
      friendsService.listFriends(),
      friendsService.getReceivedRequests(),
      friendsService.getSentRequests(),
    ]);
    if (fr.status === "fulfilled") setFriends(fr.value);
    setLoadingFriends(false);
    if (rec.status === "fulfilled") setReceived(rec.value);
    setLoadingReceived(false);
    if (snt.status === "fulfilled") setSent(snt.value);
    setLoadingSent(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  function handleTabClick(t: Tab) {
    setTab(t);
    if (!tabLoaded.has(t)) {
      setTabLoaded((prev) => new Set([...prev, t]));
    }
  }

  async function handleDelete(friend: Friend) {
    await friendsService.deleteFriend(friend.id);
    setFriends((prev) => prev.filter((f) => f.id !== friend.id));
  }

  async function handleAccept(req: FriendRequest) {
    await friendsService.acceptRequest(req.id);
    setReceived((prev) => prev.filter((r) => r.id !== req.id));
    fetchAll();
  }

  async function handleReject(req: FriendRequest) {
    await friendsService.rejectRequest(req.id);
    setReceived((prev) => prev.filter((r) => r.id !== req.id));
  }

  const TABS: { id: Tab; label: string }[] = [
    { id: "amigos", label: "Amigos" },
    { id: "recibidas", label: "Recibidas" },
    { id: "enviadas", label: "Enviadas" },
    { id: "buscar", label: "Buscar" },
  ];

  const metrics = [
    { label: "Amigos", value: loadingFriends ? "…" : String(friends.length) },
    { label: "Recibidas", value: loadingReceived ? "…" : String(received.length) },
    { label: "Enviadas", value: loadingSent ? "…" : String(sent.length) },
  ];

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-[#1d1d1f] dark:text-white">Amigos</h2>
          <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-0.5">
            Gestiona tus contactos y solicitudes de amistad
          </p>
        </div>
      </div>

      {/* Metrics bar */}
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-4 text-center"
          >
            <p className="text-2xl font-semibold text-[#1d1d1f] dark:text-white">{m.value}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mt-1">
              {m.label}
            </p>
          </div>
        ))}
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => handleTabClick(t.id)}
            className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              tab === t.id
                ? "bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white shadow-sm"
                : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "amigos" && (
        <FriendsTab friends={friends} loading={loadingFriends} onDelete={handleDelete} />
      )}
      {tab === "recibidas" && (
        <ReceivedTab
          requests={received}
          loading={loadingReceived}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
      {tab === "enviadas" && (
        <SentTab requests={sent} loading={loadingSent} />
      )}
      {tab === "buscar" && (
        <SearchTab onRequestSent={() => fetchAll()} />
      )}
    </section>
  );
}
