import { useCallback, useEffect, useState } from "react";
import { friendsService, type Friend } from "../../../services/friendsService";
import { mobileService, type MobileLatest } from "../../../services/mobileService";
import {
	tricountService,
	type TricountExpense,
	type TricountGroup,
	type TricountMember,
} from "../../../services/tricountService";

// ─── Local view types ──────────────────────────────────────────────────────────
// The balance/debt logic works with member names, so we keep a denormalised
// view that maps API data → the same shape the original component used.

interface Expense {
  id: string;
  desc: string;
  amount: number;
  paidBy: string;       // member name
  split: string[];      // member names
  date: string;
  // kept for API calls
  _memberIds?: { name: string; id: string }[];
}

interface Group {
  id: string;
  name: string;
  currency: string;
  members: string[];                // names
  memberObjects: TricountMember[];  // full objects (need IDs for expense splits)
  expenses: Expense[];
  expensesLoaded: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatAmount(n: number): string {
  return `€${n.toFixed(2).replace(".", ",")}`;
}

function formatDate(iso: string): string {
  const months = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  const [, m, d] = iso.split("-");
  return `${parseInt(d!)} ${months[parseInt(m!) - 1]}`;
}

// ─── Balance calculation ──────────────────────────────────────────────────────

interface BalanceEntry { member: string; net: number }
interface DebtLine { from: string; to: string; amount: number }

function computeBalances(group: Group): { balances: BalanceEntry[]; debts: DebtLine[] } {
  const ledger: Record<string, number> = {};
  group.members.forEach((m) => (ledger[m] = 0));

  for (const expense of group.expenses) {
    const share = expense.amount / expense.split.length;
    if (ledger[expense.paidBy] !== undefined) ledger[expense.paidBy] += expense.amount;
    for (const m of expense.split) {
      if (ledger[m] !== undefined) ledger[m] -= share;
    }
  }

  const balances: BalanceEntry[] = group.members.map((m) => ({ member: m, net: ledger[m]! }));

  const creditors = balances.filter((b) => b.net > 0.005).map((b) => ({ ...b })).sort((a, b) => b.net - a.net);
  const debtors  = balances.filter((b) => b.net < -0.005).map((b) => ({ ...b })).sort((a, b) => a.net - b.net);

  const debts: DebtLine[] = [];
  let ci = 0, di = 0;
  while (ci < creditors.length && di < debtors.length) {
    const credit = creditors[ci]!;
    const debt   = debtors[di]!;
    const amount = Math.min(credit.net, -debt.net);
    debts.push({ from: debt.member, to: credit.member, amount });
    credit.net -= amount;
    debt.net   += amount;
    if (Math.abs(credit.net) < 0.005) ci++;
    if (Math.abs(debt.net)   < 0.005) di++;
  }

  return { balances, debts };
}

// ─── Mapping API → local ───────────────────────────────────────────────────────

function mapApiExpense(e: TricountExpense, members: TricountMember[]): Expense {
  const memberById: Record<string, string> = {};
  members.forEach((m) => (memberById[m.id] = m.name));

  const splitNames = (e.splits ?? []).map((s) => memberById[s.member_id] ?? s.member_id);

  return {
    id: e.id,
    desc: e.description,
    amount: e.amount,
    paidBy: memberById[e.paid_by] ?? e.paid_by,
    split: splitNames.length > 0 ? splitNames : members.map((m) => m.name),
    date: e.date,
    _memberIds: members.map((m) => ({ name: m.name, id: m.id })),
  };
}

function mapApiGroup(g: TricountGroup, members: TricountMember[] = [], expenses: TricountExpense[] = []): Group {
  return {
    id: g.id,
    name: g.name,
    currency: g.currency,
    members: members.map((m) => m.name),
    memberObjects: members,
    expenses: expenses.map((e) => mapApiExpense(e, members)),
    expensesLoaded: expenses.length > 0 || true, // true when we've fetched
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Avatar({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const sz = size === "sm" ? "w-7 h-7 text-[10px]" : "w-9 h-9 text-xs";
  return (
    <span className={`${sz} ${avatarColor(name)} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {initials(name)}
    </span>
  );
}

function BalanceBadge({ net }: { net: number }) {
  if (Math.abs(net) < 0.005) {
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/8 text-[#6e6e73] dark:text-[#86868b]">
        Saldado
      </span>
    );
  }
  if (net > 0) {
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        Te deben {formatAmount(net)}
      </span>
    );
  }
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400">
      Debes {formatAmount(-net)}
    </span>
  );
}

// ─── New Group Modal ──────────────────────────────────────────────────────────

interface SelectedFriend { id: string; name: string }

function NewGroupModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (name: string, currency: string, friends: SelectedFriend[]) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendsLoading, setFriendsLoading] = useState(true);
  const [friendsError, setFriendsError] = useState<string | null>(null);
  const [friendSearch, setFriendSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setFriendsLoading(true);
    friendsService.listFriends()
      .then(setFriends)
      .catch(() => setFriendsError("No se pudieron cargar los amigos"))
      .finally(() => setFriendsLoading(false));
  }, []);

  const filteredFriends = friends.filter((f) => {
    const q = friendSearch.toLowerCase();
    return !q
      || (f.full_name ?? "").toLowerCase().includes(q)
      || f.email.toLowerCase().includes(q);
  });

  function toggleFriend(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;
    setLoading(true);
    setError(null);
    try {
      const selected = friends
        .filter((f) => selectedIds.has(f.id))
        .map((f) => ({ id: f.id, name: f.full_name || f.email }));
      await onCreate(trimmedName, currency, selected);
    } catch (err: any) {
      setError(err?.message ?? "Error al crear el grupo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-6 w-full max-w-sm mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-[#1d1d1f] dark:text-white mb-4">Nuevo grupo</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">
              Nombre del grupo
            </label>
            <input
              className="px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              placeholder="Ej: Viaje a Madrid"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">
              Moneda
            </label>
            <input
              className="px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              placeholder="EUR"
              value={currency}
              onChange={(e) => setCurrency(e.target.value.toUpperCase())}
              maxLength={10}
            />
          </div>

          {/* Friend picker */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">
              Invitar amigos
            </label>
            {friendsLoading ? (
              <p className="text-xs text-[#aeaeb2] py-2">Cargando amigos…</p>
            ) : friendsError ? (
              <p className="text-xs text-amber-500 py-1">{friendsError}</p>
            ) : friends.length === 0 ? (
              <div className="rounded-xl border border-black/8 dark:border-white/8 p-3 text-center">
                <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">Añade amigos desde la sección Amigos para invitarlos a grupos</p>
              </div>
            ) : (
              <>
                <input
                  className="px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  placeholder="Buscar por nombre o email…"
                  value={friendSearch}
                  onChange={(e) => setFriendSearch(e.target.value)}
                />
                <div className="flex flex-col gap-1 max-h-36 overflow-y-auto rounded-xl border border-black/8 dark:border-white/8">
                  {filteredFriends.length === 0 ? (
                    <p className="text-xs text-[#aeaeb2] px-3 py-2">Sin resultados</p>
                  ) : filteredFriends.map((f) => {
                    const checked = selectedIds.has(f.id);
                    const label = f.full_name || f.email;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => toggleFriend(f.id)}
                        className={`flex items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors ${
                          checked
                            ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                            : "text-[#1d1d1f] dark:text-white hover:bg-black/4 dark:hover:bg-white/5"
                        }`}
                      >
                        <span className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                          checked
                            ? "bg-blue-600 border-blue-600"
                            : "border-black/20 dark:border-white/20"
                        }`}>
                          {checked && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                              <path d="M2 6l3 3 5-5" />
                            </svg>
                          )}
                        </span>
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${avatarColor(label)}`}>
                          {initials(label)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{label}</p>
                          {f.full_name && <p className="text-[11px] text-[#6e6e73] dark:text-[#86868b] truncate">{f.email}</p>}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {selectedIds.size > 0 && (
                  <p className="text-[11px] text-[#6e6e73] dark:text-[#86868b]">
                    {selectedIds.size} amigo{selectedIds.size !== 1 ? "s" : ""} seleccionado{selectedIds.size !== 1 ? "s" : ""}
                  </p>
                )}
              </>
            )}
          </div>

          {error && <p className="text-xs text-rose-500">{error}</p>}
          <div className="flex gap-2 justify-end pt-1">
            <button
              type="button"
              onClick={onClose}
              className="border border-black/12 dark:border-white/12 hover:bg-black/5 dark:hover:bg-white/5 text-[#1d1d1f] dark:text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
              {loading ? "Creando…" : "Crear grupo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Add Expense Form ─────────────────────────────────────────────────────────

function AddExpenseForm({
  members,
  onAdd,
  onCancel,
}: {
  members: string[];
  onAdd: (desc: string, amount: number, paidBy: string, splitWith: string[]) => Promise<void>;
  onCancel: () => void;
}) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(members[0] ?? "");
  const [splitWith, setSplitWith] = useState<string[]>([...members]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleMember(m: string) {
    setSplitWith((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amt = parseFloat(amount.replace(",", "."));
    if (!desc.trim() || isNaN(amt) || amt <= 0 || splitWith.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      await onAdd(desc.trim(), amt, paidBy, splitWith);
    } catch (err: any) {
      setError(err?.message ?? "Error al añadir el gasto.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-blue-500/20 bg-blue-50/30 dark:bg-blue-500/5 p-4 flex flex-col gap-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">
        Nuevo gasto
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Descripción</label>
          <input
            className="px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            placeholder="Ej: Cena"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Importe (€)</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            className="px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            placeholder="0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Pagado por</label>
        <select
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
          className="px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        >
          {members.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Dividir entre</label>
        <div className="flex flex-wrap gap-2">
          {members.map((m) => {
            const checked = splitWith.includes(m);
            return (
              <button
                key={m}
                type="button"
                onClick={() => toggleMember(m)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium transition-colors ${
                  checked
                    ? "bg-blue-600 text-white"
                    : "border border-black/12 dark:border-white/12 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${avatarColor(m)} text-white`}>
                  {initials(m).slice(0, 1)}
                </span>
                {m}
              </button>
            );
          })}
        </div>
      </div>
      {error && <p className="text-xs text-rose-500">{error}</p>}
      <div className="flex gap-2 justify-end pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="border border-black/12 dark:border-white/12 hover:bg-black/5 dark:hover:bg-white/5 text-[#1d1d1f] dark:text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
        >
          {loading ? "Guardando…" : "Añadir gasto"}
        </button>
      </div>
    </form>
  );
}

// ─── Group Card ───────────────────────────────────────────────────────────────

function GroupCard({
  group,
  onClick,
  onDelete,
}: {
  group: Group;
  onClick: () => void;
  onDelete: () => void;
}) {
  const { balances } = computeBalances(group);
  const myBalance = balances[0]?.net ?? 0; // first member is the owner / "me"
  const totalExpenses = group.expenses.reduce((s, e) => s + e.amount, 0);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="w-full rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] flex flex-col">
      <div className="flex items-center">
        <button
          onClick={onClick}
          className="flex-1 text-left p-4 hover:bg-black/2 dark:hover:bg-white/3 transition-colors flex items-center gap-4 rounded-2xl min-w-0"
        >
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${avatarColor(group.name)}`}>
            {group.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white truncate">{group.name}</p>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5">
              {group.members.length} miembros · {group.expenses.length} gastos · {formatAmount(totalExpenses)} total
            </p>
          </div>
          <div className="flex-shrink-0">
            <BalanceBadge net={myBalance} />
          </div>
          <svg className="w-4 h-4 text-[#aeaeb2] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setConfirmDelete(true); }}
          className="text-[#aeaeb2] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 p-1.5 rounded-lg transition-colors mr-3 flex-shrink-0"
          title="Eliminar grupo"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      {confirmDelete && (
        <div className="px-4 pb-3 flex items-center gap-2 border-t border-black/5 dark:border-white/5 pt-3">
          <p className="text-xs text-[#6e6e73] dark:text-[#86868b] flex-1">¿Eliminar el grupo <span className="font-semibold text-[#1d1d1f] dark:text-white">{group.name}</span>? Esta acción no se puede deshacer.</p>
          <button onClick={() => setConfirmDelete(false)} className="text-xs px-3 py-1.5 rounded-lg border border-black/12 dark:border-white/12 hover:bg-black/5 dark:hover:bg-white/5 text-[#6e6e73] dark:text-[#86868b] transition-colors">Cancelar</button>
          <button onClick={onDelete} className="text-xs px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors">Eliminar</button>
        </div>
      )}
    </div>
  );
}

// ─── Group Detail View ────────────────────────────────────────────────────────

function AddMemberModal({
  group,
  onClose,
  onAdded,
}: {
  group: Group;
  onClose: () => void;
  onAdded: (member: TricountMember) => void;
}) {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    friendsService.listFriends()
      .then(setFriends)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Exclude already-added members (match by user_id)
  const existingUserIds = new Set(group.memberObjects.map(m => m.user_id).filter(Boolean));
  const available = friends.filter(f => !existingUserIds.has(f.id) && (
    !search || (f.full_name ?? "").toLowerCase().includes(search.toLowerCase()) || f.email.toLowerCase().includes(search.toLowerCase())
  ));

  async function handleAdd(friend: Friend) {
    setAdding(friend.id);
    try {
      const name = friend.full_name || friend.email;
      const member = await tricountService.addMember(group.id, name);
      onAdded(member);
    } catch {
      // silent
    } finally {
      setAdding(null);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-6 w-full max-w-sm mx-4 shadow-xl" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-[#1d1d1f] dark:text-white mb-4">Añadir amigo al grupo</h3>
        <input
          className="w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30 mb-3"
          placeholder="Buscar amigo…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          autoFocus
        />
        <div className="flex flex-col gap-1 max-h-56 overflow-y-auto rounded-xl border border-black/8 dark:border-white/8">
          {loading ? (
            <div className="flex justify-center py-6">
              <div className="w-4 h-4 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin" />
            </div>
          ) : available.length === 0 ? (
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b] text-center py-6">
              {friends.length === 0 ? "No tienes amigos añadidos aún" : "Todos tus amigos ya están en el grupo"}
            </p>
          ) : available.map(f => {
            const label = f.full_name || f.email;
            const isAdding = adding === f.id;
            return (
              <div key={f.id} className="flex items-center gap-3 px-3 py-2.5">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${avatarColor(label)}`}>
                  {initials(label)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1d1d1f] dark:text-white truncate">{label}</p>
                  <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">{f.email}</p>
                </div>
                <button
                  onClick={() => handleAdd(f)}
                  disabled={isAdding}
                  className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  {isAdding && <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />}
                  Añadir
                </button>
              </div>
            );
          })}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full border border-black/12 dark:border-white/12 hover:bg-black/5 dark:hover:bg-white/5 text-[#1d1d1f] dark:text-white text-sm font-medium py-2 rounded-xl transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

function GroupDetail({
  group,
  onBack,
  onUpdateGroup,
}: {
  group: Group;
  onBack: () => void;
  onUpdateGroup: (g: Group) => void;
}) {
  const [tab, setTab] = useState<"gastos" | "saldos">("gastos");
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [confirmDeleteExpenseId, setConfirmDeleteExpenseId] = useState<string | null>(null);
  const [showAddMember, setShowAddMember] = useState(false);

  const { balances, debts } = computeBalances(group);

  async function handleAddExpense(desc: string, amount: number, paidBy: string, splitWith: string[]) {
    // Find member IDs for split
    const memberByName: Record<string, TricountMember> = {};
    group.memberObjects.forEach((m) => (memberByName[m.name] = m));

    const paidByMember = memberByName[paidBy];
    if (!paidByMember) throw new Error("Miembro pagador no encontrado.");

    const splitMembers = splitWith
      .map((name) => memberByName[name])
      .filter((m): m is TricountMember => Boolean(m));

    const share = parseFloat((amount / splitMembers.length).toFixed(2));
    const splits = splitMembers.map((m) => ({ member_id: m.id, share }));

    const created = await tricountService.createExpense(group.id, {
      description: desc,
      amount,
      paid_by: paidByMember.id,
      date: new Date().toISOString().slice(0, 10),
      splits,
    });

    const localExpense: Expense = {
      id: created.id,
      desc: created.description,
      amount: created.amount,
      paidBy,
      split: splitWith,
      date: created.date,
    };

    onUpdateGroup({ ...group, expenses: [...group.expenses, localExpense] });
    setShowAddExpense(false);
  }

  async function handleDeleteExpense(expenseId: string) {
    await tricountService.deleteExpense(group.id, expenseId);
    onUpdateGroup({ ...group, expenses: group.expenses.filter((e) => e.id !== expenseId) });
    setConfirmDeleteExpenseId(null);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="border border-black/12 dark:border-white/12 hover:bg-black/5 dark:hover:bg-white/5 text-[#1d1d1f] dark:text-white text-sm font-medium px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Grupos
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-[#1d1d1f] dark:text-white truncate">{group.name}</h2>
        </div>
      </div>

      {/* Members */}
      <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Miembros</p>
          <button
            onClick={() => setShowAddMember(true)}
            className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Añadir amigo
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {group.members.map((m) => (
            <div key={m} className="flex items-center gap-2">
              <Avatar name={m} />
              <span className="text-sm text-[#1d1d1f] dark:text-white">{m}</span>
            </div>
          ))}
        </div>
      </div>

      {showAddMember && (
        <AddMemberModal
          group={group}
          onClose={() => setShowAddMember(false)}
          onAdded={(member) => {
            onUpdateGroup({
              ...group,
              members: [...group.members, member.name],
              memberObjects: [...group.memberObjects, member],
            });
          }}
        />
      )}

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-black/4 dark:bg-white/6 p-1">
        {(["gastos", "saldos"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-colors capitalize ${
              tab === t
                ? "bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white shadow-sm"
                : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "gastos" && (
        <div className="flex flex-col gap-3">
          {group.expenses.length === 0 && !showAddExpense && (
            <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-8 text-center">
              <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">No hay gastos aún</p>
            </div>
          )}
          {group.expenses.map((expense) => {
            const myShare = expense.split.includes(group.members[0] ?? "")
              ? expense.amount / expense.split.length
              : 0;
            const isConfirming = confirmDeleteExpenseId === expense.id;
            return (
              <div key={expense.id} className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] flex flex-col">
                <div className="p-4 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0 ${avatarColor(expense.desc)}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">{expense.desc}</p>
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5">
                      Pagó <span className="font-medium text-[#1d1d1f] dark:text-white">{expense.paidBy}</span>{" "}
                      · {formatDate(expense.date)} · dividido entre {expense.split.length}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">{formatAmount(expense.amount)}</p>
                    {myShare > 0 && (
                      <p className="text-[11px] text-[#6e6e73] dark:text-[#86868b]">Tu parte: {formatAmount(myShare)}</p>
                    )}
                  </div>
                  <button
                    onClick={() => setConfirmDeleteExpenseId(isConfirming ? null : expense.id)}
                    className="text-[#aeaeb2] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 p-1.5 rounded-lg transition-colors flex-shrink-0"
                    title="Eliminar gasto"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                {isConfirming && (
                  <div className="px-4 pb-3 flex items-center gap-2 border-t border-black/5 dark:border-white/5 pt-3">
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b] flex-1">¿Eliminar <span className="font-semibold text-[#1d1d1f] dark:text-white">{expense.desc}</span>?</p>
                    <button onClick={() => setConfirmDeleteExpenseId(null)} className="text-xs px-3 py-1.5 rounded-lg border border-black/12 dark:border-white/12 hover:bg-black/5 dark:hover:bg-white/5 text-[#6e6e73] dark:text-[#86868b] transition-colors">Cancelar</button>
                    <button onClick={() => handleDeleteExpense(expense.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors">Eliminar</button>
                  </div>
                )}
              </div>
            );
          })}

          {showAddExpense ? (
            <AddExpenseForm
              members={group.members}
              onAdd={handleAddExpense}
              onCancel={() => setShowAddExpense(false)}
            />
          ) : (
            <button
              onClick={() => setShowAddExpense(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors w-full flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Añadir gasto
            </button>
          )}
        </div>
      )}

      {tab === "saldos" && (
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-3">Balance por persona</p>
            <div className="flex flex-col gap-2">
              {balances.map((b) => (
                <div key={b.member} className="flex items-center gap-3">
                  <Avatar name={b.member} />
                  <span className="text-sm text-[#1d1d1f] dark:text-white flex-1">{b.member}</span>
                  <BalanceBadge net={b.net} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-3">Transferencias simplificadas</p>
            {debts.length === 0 ? (
              <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">Todo saldado ✓</p>
            ) : (
              <div className="flex flex-col gap-2">
                {debts.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5 border-b border-black/5 dark:border-white/5 last:border-0">
                    <Avatar name={d.from} size="sm" />
                    <span className="text-sm text-[#1d1d1f] dark:text-white font-medium">{d.from}</span>
                    <div className="flex items-center gap-1 text-[#aeaeb2]">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                    <Avatar name={d.to} size="sm" />
                    <span className="text-sm text-[#1d1d1f] dark:text-white font-medium">{d.to}</span>
                    <span className="ml-auto text-sm font-semibold text-rose-600 dark:text-rose-400">{formatAmount(d.amount)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── App Download Card ────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function AppDownloadCard() {
  const [latest, setLatest] = useState<MobileLatest | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mobileService.getLatest()
      .then(setLatest)
      .catch(() => setLatest(null))
      .finally(() => setLoading(false));
  }, []);

  async function handleDownload(buildType: "apk" | "aab" | "ipa") {
    setDownloading(buildType);
    setError(null);
    try {
      await mobileService.download(buildType);
    } catch {
      setError("No se pudo descargar. Inténtalo de nuevo.");
    } finally {
      setDownloading(null);
    }
  }

  const apk = latest?.android;
  const ipa = latest?.ios;
  const hasAny = apk != null || ipa != null;
  const latestVersion = apk?.version ?? ipa?.version ?? "";

  return (
    <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">App móvil de Tricount</p>
          <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
            {loading
              ? "Comprobando versión…"
              : hasAny
              ? `v${latestVersion} disponible`
              : "Sin versiones publicadas"}
          </p>
        </div>
      </div>

      {error && (
        <p className="text-xs text-rose-500 -mt-1">{error}</p>
      )}

      {!loading && hasAny && (
        <div className="flex flex-wrap gap-2">
          {/* Android APK */}
          {latest?.android && (
            <button
              onClick={() => handleDownload("apk")}
              disabled={downloading === "apk"}
              className="flex items-center gap-2 bg-[#34c759] hover:bg-[#30b350] disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
              {downloading === "apk" ? (
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              )}
              Android APK
              {latest.android.file_size && (
                <span className="text-white/70 text-[11px]">({formatBytes(latest.android.file_size)})</span>
              )}
            </button>
          )}
          {/* Android AAB */}
          {latest?.android_aab && (
            <button
              onClick={() => handleDownload("aab")}
              disabled={downloading === "aab"}
              className="flex items-center gap-2 border border-black/12 dark:border-white/12 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-60 text-[#1d1d1f] dark:text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
              {downloading === "aab" ? (
                <span className="w-4 h-4 rounded-full border-2 border-current/30 border-t-current animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              )}
              Android AAB
            </button>
          )}
          {/* iOS IPA */}
          {latest?.ios && (
            <button
              onClick={() => handleDownload("ipa")}
              disabled={downloading === "ipa"}
              className="flex items-center gap-2 bg-[#007aff] hover:bg-[#006de0] disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
              {downloading === "ipa" ? (
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              )}
              iOS IPA
              {latest.ios.file_size && (
                <span className="text-white/70 text-[11px]">({formatBytes(latest.ios.file_size)})</span>
              )}
            </button>
          )}
        </div>
      )}

      {!loading && !hasAny && (
        <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
          Próximamente. Construye la app con <code className="font-mono text-blue-500">pnpm build:local</code> en la carpeta del proyecto.
        </p>
      )}

      {apk && (
        <p className="text-[11px] text-[#aeaeb2] dark:text-[#636366] -mt-1">
          Publicado el {new Date(apk.created_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
          {apk.release_notes && ` · ${apk.release_notes}`}
        </p>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function UserTricountSection() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedGroup = groups.find((g) => g.id === selectedGroupId) ?? null;

  // Load groups on mount
  const fetchGroups = useCallback(async () => {
    setLoadingGroups(true);
    setError(null);
    try {
      const apiGroups = await tricountService.listGroups();
      // For the group list view we only need the group metadata — members/expenses
      // are loaded when the user opens a group.
      setGroups(apiGroups.map((g) => mapApiGroup(g, [], [])));
    } catch (err: any) {
      setError(err?.message ?? "Error al cargar los grupos.");
    } finally {
      setLoadingGroups(false);
    }
  }, []);

  useEffect(() => { fetchGroups(); }, [fetchGroups]);

  // When selecting a group, load its members and expenses
  async function handleSelectGroup(groupId: string) {
    setSelectedGroupId(groupId);
    const existing = groups.find((g) => g.id === groupId);
    if (existing && existing.expensesLoaded && existing.memberObjects.length > 0) return;

    try {
      const [members, expenses] = await Promise.all([
        tricountService.listMembers(groupId),
        tricountService.listExpenses(groupId),
      ]);

      setGroups((prev) =>
        prev.map((g) => {
          if (g.id !== groupId) return g;
          const apiGroup: TricountGroup = {
            id: g.id,
            name: g.name,
            currency: g.currency,
            owner_id: "",
            created_at: "",
          };
          return mapApiGroup(apiGroup, members, expenses);
        })
      );
    } catch {
      // Non-fatal — group detail will show empty state
    }
  }

  async function handleCreateGroup(name: string, currency: string, friends: { id: string; name: string }[]) {
    const group = await tricountService.createGroup(name, currency);
    // Add each selected friend as a member
    const memberObjects: TricountMember[] = [];
    for (const friend of friends) {
      const member = await tricountService.addMember(group.id, friend.name);
      memberObjects.push(member);
    }
    const localGroup = mapApiGroup(group, memberObjects, []);
    setGroups((prev) => [localGroup, ...prev]);
    setShowNewGroup(false);
  }

  function handleUpdateGroup(updated: Group) {
    setGroups((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
    setSelectedGroupId(updated.id);
  }

  async function handleDeleteGroup(groupId: string) {
    await tricountService.deleteGroup(groupId);
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
    if (selectedGroupId === groupId) setSelectedGroupId(null);
  }

  const totalMyBalance = groups.reduce((sum, group) => {
    if (!group.expensesLoaded || group.expenses.length === 0) return sum;
    const { balances } = computeBalances(group);
    return sum + (balances[0]?.net ?? 0);
  }, 0);

  return (
    <section className="flex flex-col gap-4">
      {/* Section header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-[#1d1d1f] dark:text-white">Gastos compartidos</h2>
          <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-0.5">
            {loadingGroups
              ? "Cargando…"
              : `${groups.length} ${groups.length === 1 ? "grupo" : "grupos"} · ${
                  totalMyBalance > 0.005
                    ? `Te deben ${formatAmount(totalMyBalance)}`
                    : totalMyBalance < -0.005
                    ? `Debes ${formatAmount(-totalMyBalance)}`
                    : "Todo saldado"
                }`}
          </p>
        </div>
        {!selectedGroupId && (
          <button
            onClick={() => setShowNewGroup(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors flex items-center gap-2 flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nuevo grupo
          </button>
        )}
      </div>

      {error && (
        <div className="rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/20 p-4">
          <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
        </div>
      )}

      {/* Content */}
      {loadingGroups ? (
        <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-8 text-center">
          <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">Cargando grupos…</p>
        </div>
      ) : selectedGroup ? (
        <GroupDetail
          group={selectedGroup}
          onBack={() => setSelectedGroupId(null)}
          onUpdateGroup={handleUpdateGroup}
        />
      ) : (
        <div className="flex flex-col gap-2">
          {groups.length === 0 && (
            <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-8 text-center">
              <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">No tienes grupos aún. ¡Crea el primero!</p>
            </div>
          )}
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onClick={() => handleSelectGroup(group.id)}
              onDelete={() => handleDeleteGroup(group.id)}
            />
          ))}
        </div>
      )}

      {/* App download */}
      {!selectedGroupId && <AppDownloadCard />}

      {/* New group modal */}
      {showNewGroup && (
        <NewGroupModal
          onClose={() => setShowNewGroup(false)}
          onCreate={handleCreateGroup}
        />
      )}
    </section>
  );
}
