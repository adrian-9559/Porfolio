"use client";

import { useCallback, useEffect, useState } from "react";
import { Input } from "@heroui/react";
import {
  financesService,
  type FinancialBudget,
  type FinancialGoal,
  type Subscription,
  type FinancesSummary,
  type CreateBudgetInput,
  type CreateGoalInput,
  type CreateSubscriptionInput,
} from "../../../services/financesService";

// ── Constants ─────────────────────────────────────────────────────────────────

type Tab = "overview" | "budgets" | "goals" | "subscriptions";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Resumen" },
  { id: "budgets", label: "Presupuestos" },
  { id: "goals", label: "Metas" },
  { id: "subscriptions", label: "Suscripciones" },
];

const MONTH_NAMES: Record<string, string> = {
  "01": "Ene",
  "02": "Feb",
  "03": "Mar",
  "04": "Abr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Ago",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dic",
};

function fmtMonth(month: string): string {
  const parts = month.split("-");
  return `${MONTH_NAMES[parts[1]] ?? parts[1]} ${parts[0]}`;
}

function fmtCurrency(amount: number): string {
  return amount.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function fmtPercent(part: number, total: number): number {
  if (total === 0) return 0;
  return Math.min(Math.round((part / total) * 100), 100);
}

const FREQ_LABELS: Record<string, string> = {
  weekly: "semanal",
  monthly: "mensual",
  quarterly: "trimestral",
  yearly: "anual",
};

const CATEGORY_COLORS: Record<string, string> = {
  streaming: "bg-purple-500",
  hosting: "bg-blue-500",
  productivity: "bg-emerald-500",
  cloud: "bg-cyan-500",
  finance: "bg-amber-500",
  other: "bg-gray-400",
};

const GOAL_ICONS: Record<string, string> = {
  target: "\u{1F3AF}",
  home: "\u{1F3E0}",
  car: "\u{1F697}",
  travel: "\u{2708}\u{FE0F}",
  education: "\u{1F393}",
  savings: "\u{1F4B0}",
  gift: "\u{1F381}",
  health: "\u{2764}\u{FE0F}",
};

// ── Component ─────────────────────────────────────────────────────────────────

export function UserFinancesSection() {
  const [tab, setTab] = useState<Tab>("overview");

  const [summary, setSummary] = useState<FinancesSummary | null>(null);
  const [budgets, setBudgets] = useState<FinancialBudget[]>([]);
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState<FinancialBudget | null>(null);
  const [editingGoal, setEditingGoal] = useState<FinancialGoal | null>(null);
  const [editingSub, setEditingSub] = useState<Subscription | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{
    type: "budget" | "goal" | "subscription";
    id: string;
  } | null>(null);

  // Form states
  const [bfName, setBfName] = useState("");
  const [bfAmount, setBfAmount] = useState("");
  const [bfPeriod, setBfPeriod] = useState<"monthly" | "yearly">("monthly");
  const [bfCategory, setBfCategory] = useState("");

  const [gfName, setGfName] = useState("");
  const [gfTarget, setGfTarget] = useState("");
  const [gfCurrent, setGfCurrent] = useState("0");
  const [gfDate, setGfDate] = useState("");
  const [gfIcon, setGfIcon] = useState("target");
  const [gfColor, setGfColor] = useState("#3b82f6");

  const [sfName, setSfName] = useState("");
  const [sfAmount, setSfAmount] = useState("");
  const [sfFreq, setSfFreq] = useState<"monthly" | "yearly" | "weekly" | "quarterly">("monthly");
  const [sfNext, setSfNext] = useState("");
  const [sfCategory, setSfCategory] = useState("other");
  const [sfProvider, setSfProvider] = useState("");

  // ── Data fetching ─────────────────────────────────────────────────────────

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [summaryData, budgetsData, goalsData, subsData] = await Promise.all([
        financesService.getSummary(),
        financesService.listBudgets(),
        financesService.listGoals(),
        financesService.listSubscriptions(),
      ]);
      setSummary(summaryData);
      setBudgets(budgetsData);
      setGoals(goalsData);
      setSubscriptions(subsData);
    } catch (err: any) {
      setError(err?.message ?? "Error al cargar datos financieros");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ── Budget form ───────────────────────────────────────────────────────────

  const openBudgetForm = (budget?: FinancialBudget) => {
    setEditingBudget(budget ?? null);
    setBfName(budget?.name ?? "");
    setBfAmount(budget ? String(budget.amount) : "");
    setBfPeriod(budget?.period ?? "monthly");
    setBfCategory(budget?.category_id ?? "");
    setShowBudgetModal(true);
  };

  const handleSaveBudget = async () => {
    if (!bfName.trim() || !bfAmount) return;
    setSubmitting(true);
    try {
      const payload: CreateBudgetInput = {
        name: bfName.trim(),
        amount: Number(bfAmount),
        period: bfPeriod,
        category_id: bfCategory || null,
      };
      if (editingBudget) {
        await financesService.updateBudget(editingBudget.id, payload);
      } else {
        await financesService.createBudget(payload);
      }
      setShowBudgetModal(false);
      setEditingBudget(null);
      await fetchAll();
    } catch (err: any) {
      setError(err?.message ?? "Error al guardar presupuesto");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBudget = (id: string) => {
    setConfirmDelete({ type: "budget", id });
  };

  // ── Goal form ─────────────────────────────────────────────────────────────

  const openGoalForm = (goal?: FinancialGoal) => {
    setEditingGoal(goal ?? null);
    setGfName(goal?.name ?? "");
    setGfTarget(goal ? String(goal.target_amount) : "");
    setGfCurrent(goal ? String(goal.current_amount) : "0");
    setGfDate(goal?.target_date ?? "");
    setGfIcon(goal?.icon ?? "target");
    setGfColor(goal?.color ?? "#3b82f6");
    setShowGoalModal(true);
  };

  const handleSaveGoal = async () => {
    if (!gfName.trim() || !gfTarget) return;
    setSubmitting(true);
    try {
      const payload: CreateGoalInput = {
        name: gfName.trim(),
        target_amount: Number(gfTarget),
        current_amount: Number(gfCurrent),
        target_date: gfDate || null,
        icon: gfIcon,
        color: gfColor,
      };
      if (editingGoal) {
        await financesService.updateGoal(editingGoal.id, payload);
      } else {
        await financesService.createGoal(payload);
      }
      setShowGoalModal(false);
      setEditingGoal(null);
      await fetchAll();
    } catch (err: any) {
      setError(err?.message ?? "Error al guardar meta");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteGoal = (id: string) => {
    setConfirmDelete({ type: "goal", id });
  };

  // ── Subscription form ─────────────────────────────────────────────────────

  const openSubForm = (sub?: Subscription) => {
    setEditingSub(sub ?? null);
    setSfName(sub?.name ?? "");
    setSfAmount(sub ? String(sub.amount) : "");
    setSfFreq(sub?.frequency ?? "monthly");
    setSfNext(sub?.next_billing ?? "");
    setSfCategory(sub?.category ?? "other");
    setSfProvider(sub?.provider ?? "");
    setShowSubModal(true);
  };

  const handleSaveSub = async () => {
    if (!sfName.trim() || !sfAmount || !sfNext) return;
    setSubmitting(true);
    try {
      const payload: CreateSubscriptionInput = {
        name: sfName.trim(),
        amount: Number(sfAmount),
        frequency: sfFreq,
        next_billing: sfNext,
        category: sfCategory,
        provider: sfProvider,
      };
      if (editingSub) {
        await financesService.updateSubscription(editingSub.id, payload);
      } else {
        await financesService.createSubscription(payload);
      }
      setShowSubModal(false);
      setEditingSub(null);
      await fetchAll();
    } catch (err: any) {
      setError(err?.message ?? "Error al guardar suscripción");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSub = (id: string) => {
    setConfirmDelete({ type: "subscription", id });
  };

  const toggleSubActive = async (sub: Subscription) => {
    try {
      await financesService.updateSubscription(sub.id, { active: !sub.active });
      await fetchAll();
    } catch {
      // ignore
    }
  };

  // ── Confirm delete handler ────────────────────────────────────────────────

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;
    const { id, type } = confirmDelete;
    setConfirmDelete(null);
    try {
      if (type === "budget") await financesService.deleteBudget(id);
      else if (type === "goal") await financesService.deleteGoal(id);
      else await financesService.deleteSubscription(id);
      await fetchAll();
    } catch {
      // ignore
    }
  };

  // ── Loading / Error ───────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-5 h-5 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-3">{error}</p>
        <button onClick={fetchAll} className="apple-btn-primary text-sm py-2 px-4">
          Reintentar
        </button>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white">
          Finanzas
        </h2>
      </div>

      {/* ── Tabs ───────────────────────────────────────────────────────────── */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl bg-black/5 dark:bg-white/5 w-fit">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              tab === t.id
                ? "bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-white shadow-sm"
                : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Overview tab ───────────────────────────────────────────────────── */}
      {tab === "overview" && (
        <OverviewTab summary={summary} budgets={budgets} goals={goals} subscriptions={subscriptions} />
      )}

      {/* ── Budgets tab ────────────────────────────────────────────────────── */}
      {tab === "budgets" && (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => openBudgetForm()}
              className="apple-btn-primary text-sm py-1.5 px-3"
            >
              + Presupuesto
            </button>
          </div>
          {budgets.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-[#6e6e73] dark:text-[#86868b]">
                No tienes presupuestos. Crea uno para empezar.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {budgets.map((b) => {
                const pct = fmtPercent(b.spent ?? 0, b.amount);
                const over = (b.spent ?? 0) > b.amount;
                return (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-[#1d1d1f] dark:text-white">
                          {b.name}
                        </div>
                        <div className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5">
                          {b.period === "monthly" ? "Mensual" : "Anual"}
                          {b.category_id ? " \u00B7 Categor\u00EDa" : ""}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => openBudgetForm(b)}
                          className="text-xs text-[#6e6e73] hover:text-blue-500 px-1.5 py-0.5"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteBudget(b.id)}
                          className="text-xs text-[#6e6e73] hover:text-red-500 px-1.5 py-0.5"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 dark:bg-[#1a1a1f] overflow-hidden mb-2">
                      <div
                        className={`h-full rounded-full transition-all ${
                          over
                            ? "bg-red-500"
                            : pct > 80
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                        }`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-[#6e6e73] dark:text-[#86868b]">
                      <span>
                        {fmtCurrency(b.spent ?? 0)} de {fmtCurrency(b.amount)}
                      </span>
                      <span className={over ? "text-red-500 font-semibold" : ""}>
                        {pct}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Goals tab ──────────────────────────────────────────────────────── */}
      {tab === "goals" && (
        <div>
          <div className="flex justify-end mb-4">
            <button onClick={() => openGoalForm()} className="apple-btn-primary text-sm py-1.5 px-3">
              + Meta
            </button>
          </div>
          {goals.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-[#6e6e73] dark:text-[#86868b]">
                No tienes metas de ahorro. Crea una para empezar.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((g) => {
                const pct = fmtPercent(g.current_amount, g.target_amount);
                const achieved = g.achieved || pct >= 100;
                return (
                  <div
                    key={g.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {GOAL_ICONS[g.icon] ?? "\u{1F3AF}"}
                        </span>
                        <div>
                          <div className="font-semibold text-[#1d1d1f] dark:text-white">
                            {g.name}
                          </div>
                          <div className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5">
                            {g.target_date
                              ? `Para ${new Date(g.target_date).toLocaleDateString("es-ES")}`
                              : "Sin fecha l\u00EDmite"}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => openGoalForm(g)}
                          className="text-xs text-[#6e6e73] hover:text-blue-500 px-1.5 py-0.5"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteGoal(g.id)}
                          className="text-xs text-[#6e6e73] hover:text-red-500 px-1.5 py-0.5"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                    <div className="h-2.5 rounded-full bg-gray-100 dark:bg-[#1a1a1f] overflow-hidden mb-2">
                      <div
                        className={`h-full rounded-full transition-all ${
                          achieved ? "bg-emerald-500" : "bg-blue-500"
                        }`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-[#6e6e73] dark:text-[#86868b]">
                      <span>
                        {fmtCurrency(g.current_amount)} de {fmtCurrency(g.target_amount)}
                      </span>
                      <span className={achieved ? "text-emerald-500 font-semibold" : ""}>
                        {achieved ? "\u2713 Completado" : `${pct}%`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Subscriptions tab ──────────────────────────────────────────────── */}
      {tab === "subscriptions" && (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => openSubForm()}
              className="apple-btn-primary text-sm py-1.5 px-3"
            >
              + Suscripci\u00F3n
            </button>
          </div>
          {subscriptions.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-[#6e6e73] dark:text-[#86868b]">
                No tienes suscripciones registradas.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {subscriptions.map((s) => {
                const catColor = CATEGORY_COLORS[s.category] ?? "bg-gray-400";
                const nextDate = new Date(s.next_billing + "T00:00:00");
                const daysUntil = Math.ceil(
                  (nextDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
                );
                return (
                  <div
                    key={s.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      s.active
                        ? "bg-white dark:bg-[#111116] border-black/8 dark:border-white/8"
                        : "bg-gray-50 dark:bg-[#0d0d11] border-black/4 dark:border-white/4 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold ${catColor}`}
                        >
                          {s.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-[#1d1d1f] dark:text-white">
                            {s.name}
                          </div>
                          <div className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5">
                            {s.provider && `${s.provider} \u00B7 `}
                            {fmtCurrency(s.amount)}/{FREQ_LABELS[s.frequency] ?? s.frequency}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                            Pr\u00F3ximo pago
                          </div>
                          <div
                            className={`text-sm font-medium ${
                              daysUntil <= 3 && s.active
                                ? "text-red-500"
                                : "text-[#1d1d1f] dark:text-white"
                            }`}
                          >
                            {daysUntil <= 0
                              ? "Hoy"
                              : daysUntil === 1
                                ? "Ma\u00F1ana"
                                : `${daysUntil} d\u00EDas`}
                          </div>
                        </div>
                        <button
                          onClick={() => toggleSubActive(s)}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                            s.active
                              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                              : "bg-gray-100 dark:bg-[#1a1a1f] text-[#6e6e73]"
                          }`}
                          title={s.active ? "Desactivar" : "Activar"}
                        >
                          {s.active ? "\u2713" : "\u2715"}
                        </button>
                        <button
                          onClick={() => openSubForm(s)}
                          className="text-xs text-[#6e6e73] hover:text-blue-500 px-1.5 py-0.5"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteSub(s.id)}
                          className="text-xs text-[#6e6e73] hover:text-red-500 px-1.5 py-0.5"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Budget Modal ───────────────────────────────────────────────────── */}
      {showBudgetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-[#1a1a1f] rounded-2xl p-6 max-w-md mx-4 shadow-2xl w-full">
            <h3 className="text-lg font-semibold text-[#1d1d1f] dark:text-white mb-4">
              {editingBudget ? "Editar presupuesto" : "Nuevo presupuesto"}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1">
                  Nombre
                </label>
                <Input
                  placeholder="Ej: Ocio mensual"
                  value={bfName}
                  onChange={(e) => setBfName(e.target.value)}
                  disabled={submitting}
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1">
                  Cantidad
                </label>
                <Input
                  placeholder="0.00"
                  type="number"
                  value={bfAmount}
                  onChange={(e) => setBfAmount(e.target.value)}
                  disabled={submitting}
                />
              </div>
              <select
                value={bfPeriod}
                onChange={(e) => setBfPeriod(e.target.value as "monthly" | "yearly")}
                className="w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-[#1d1d1f] dark:text-white text-sm"
                disabled={submitting}
              >
                <option value="monthly">Mensual</option>
                <option value="yearly">Anual</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowBudgetModal(false);
                  setEditingBudget(null);
                }}
                className="apple-btn-secondary text-sm py-2 px-4"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveBudget}
                disabled={submitting || !bfName.trim() || !bfAmount}
                className="apple-btn-primary text-sm py-2 px-4"
              >
                {submitting ? "Guardando..." : editingBudget ? "Guardar cambios" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Goal Modal ─────────────────────────────────────────────────────── */}
      {showGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-[#1a1a1f] rounded-2xl p-6 max-w-md mx-4 shadow-2xl w-full">
            <h3 className="text-lg font-semibold text-[#1d1d1f] dark:text-white mb-4">
              {editingGoal ? "Editar meta" : "Nueva meta"}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1">
                  Nombre
                </label>
                <Input
                  placeholder="Ej: Viaje a Jap\u00F3n"
                  value={gfName}
                  onChange={(e) => setGfName(e.target.value)}
                  disabled={submitting}
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1">
                  Cantidad objetivo
                </label>
                <Input
                  placeholder="0.00"
                  type="number"
                  value={gfTarget}
                  onChange={(e) => setGfTarget(e.target.value)}
                  disabled={submitting}
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1">
                  Ahorrado actualmente
                </label>
                <Input
                  placeholder="0.00"
                  type="number"
                  value={gfCurrent}
                  onChange={(e) => setGfCurrent(e.target.value)}
                  disabled={submitting}
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1">
                  Fecha l\u00EDmite (opcional)
                </label>
                <Input
                  type="date"
                  value={gfDate}
                  onChange={(e) => setGfDate(e.target.value)}
                  disabled={submitting}
                />
              </div>
              <div className="flex gap-2">
                {["target", "home", "car", "travel", "education", "savings", "gift", "health"].map(
                  (icon) => (
                    <button
                      key={icon}
                      onClick={() => setGfIcon(icon)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all ${
                        gfIcon === icon
                          ? "bg-blue-100 dark:bg-blue-900/30 ring-2 ring-blue-500"
                          : "bg-gray-100 dark:bg-[#1a1a1f] hover:bg-gray-200 dark:hover:bg-[#2a2a2f]"
                      }`}
                    >
                      {GOAL_ICONS[icon] ?? "\u{1F3AF}"}
                    </button>
                  ),
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowGoalModal(false);
                  setEditingGoal(null);
                }}
                className="apple-btn-secondary text-sm py-2 px-4"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveGoal}
                disabled={submitting || !gfName.trim() || !gfTarget}
                className="apple-btn-primary text-sm py-2 px-4"
              >
                {submitting ? "Guardando..." : editingGoal ? "Guardar cambios" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Subscription Modal ─────────────────────────────────────────────── */}
      {showSubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-[#1a1a1f] rounded-2xl p-6 max-w-md mx-4 shadow-2xl w-full">
            <h3 className="text-lg font-semibold text-[#1d1d1f] dark:text-white mb-4">
              {editingSub ? "Editar suscripci\u00F3n" : "Nueva suscripci\u00F3n"}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1">
                  Nombre
                </label>
                <Input
                  placeholder="Ej: Netflix"
                  value={sfName}
                  onChange={(e) => setSfName(e.target.value)}
                  disabled={submitting}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1">
                      Importe
                    </label>
                    <Input
                      placeholder="0.00"
                      type="number"
                      value={sfAmount}
                      onChange={(e) => setSfAmount(e.target.value)}
                      disabled={submitting}
                    />
                  </div>
                </div>
                <div className="w-1/3">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1">
                    Per\u00EDodo
                  </label>
                  <select
                    value={sfFreq}
                    onChange={(e) =>
                      setSfFreq(e.target.value as "monthly" | "yearly" | "weekly" | "quarterly")
                    }
                    className="w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-[#1d1d1f] dark:text-white text-sm"
                    disabled={submitting}
                  >
                    <option value="monthly">/mes</option>
                    <option value="yearly">/a\u00F1o</option>
                    <option value="quarterly">/trim</option>
                    <option value="weekly">/sem</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1">
                  Pr\u00F3ximo cobro
                </label>
                <Input
                  type="date"
                  value={sfNext}
                  onChange={(e) => setSfNext(e.target.value)}
                  disabled={submitting}
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1">
                  Proveedor (opcional)
                </label>
                <Input
                  placeholder="Spotify AB"
                  value={sfProvider}
                  onChange={(e) => setSfProvider(e.target.value)}
                  disabled={submitting}
                />
              </div>
              <select
                value={sfCategory}
                onChange={(e) => setSfCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-[#1d1d1f] dark:text-white text-sm"
                disabled={submitting}
              >
                <option value="streaming">Streaming</option>
                <option value="hosting">Hosting</option>
                <option value="productivity">Productividad</option>
                <option value="cloud">Cloud</option>
                <option value="finance">Finanzas</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowSubModal(false);
                  setEditingSub(null);
                }}
                className="apple-btn-secondary text-sm py-2 px-4"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveSub}
                disabled={submitting || !sfName.trim() || !sfAmount || !sfNext}
                className="apple-btn-primary text-sm py-2 px-4"
              >
                {submitting ? "Guardando..." : editingSub ? "Guardar cambios" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm delete dialog ──────────────────────────────────────────── */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-[#1a1a1f] rounded-2xl p-6 max-w-sm mx-4 shadow-2xl">
            <p className="text-sm font-medium text-[#1d1d1f] dark:text-white mb-4">
              {confirmDelete.type === "budget"
                ? "Eliminar este presupuesto?"
                : confirmDelete.type === "goal"
                  ? "Eliminar esta meta?"
                  : "Eliminar esta suscripci\u00F3n?"}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="apple-btn-secondary text-sm py-2 px-4"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="apple-btn-primary text-sm py-2 px-4 !bg-red-500 hover:!bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Overview tab sub-component ─────────────────────────────────────────────────

function OverviewTab({
  summary,
  budgets,
  goals,
  subscriptions,
}: {
  summary: FinancesSummary | null;
  budgets: FinancialBudget[];
  goals: FinancialGoal[];
  subscriptions: Subscription[];
}) {
  const totalMonthlySubs = summary?.totalMonthlySubscriptions ?? 0;
  const maxSpending = Math.max(
    ...(summary?.monthlySpending ?? []).map((m) => m.total),
    1,
  );

  const activeSubs = subscriptions.filter((s) => s.active).length;

  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <SummaryCard
          label="Presupuestos activos"
          value={String(summary?.activeBudgets ?? 0)}
          color="text-blue-500"
        />
        <SummaryCard
          label="Metas de ahorro"
          value={String(summary?.activeGoals ?? 0)}
          color="text-emerald-500"
        />
        <SummaryCard
          label="Suscripciones"
          value={`${activeSubs}${activeSubs < subscriptions.length ? `/${subscriptions.length}` : ""}`}
          color="text-purple-500"
        />
        <SummaryCard
          label="Suscripciones/mes"
          value={fmtCurrency(totalMonthlySubs)}
          color="text-amber-500"
        />
      </div>

      {/* Monthly spending chart */}
      {summary && summary.monthlySpending.length > 0 && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8">
          <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-4">
            Gasto mensual
          </h3>
          <div className="flex items-end gap-3 h-32">
            {summary.monthlySpending.map((m) => {
              const height = (m.total / maxSpending) * 100;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-[#6e6e73] dark:text-[#86868b]">
                    {fmtCurrency(m.total)}
                  </span>
                  <div className="w-full rounded-lg bg-blue-500/20 dark:bg-blue-400/10 relative overflow-hidden">
                    <div
                      className="w-full bg-blue-500 dark:bg-blue-400 rounded-lg transition-all"
                      style={{ height: `${Math.max(height, 2)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-[#6e6e73] dark:text-[#86868b]">
                    {fmtMonth(m.month)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Budget progress mini section */}
      {budgets.length > 0 && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 mt-4">
          <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-3">
            Presupuestos
          </h3>
          <div className="space-y-3">
            {budgets.slice(0, 4).map((b) => {
              const pct = fmtPercent(b.spent ?? 0, b.amount);
              const over = (b.spent ?? 0) > b.amount;
              return (
                <div key={b.id}>
                  <div className="flex justify-between text-xs text-[#1d1d1f] dark:text-white mb-1">
                    <span>{b.name}</span>
                    <span className={over ? "text-red-500" : ""}>
                      {fmtCurrency(b.spent ?? 0)} / {fmtCurrency(b.amount)}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 dark:bg-[#1a1a1f] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${over ? "bg-red-500" : pct > 80 ? "bg-amber-500" : "bg-emerald-500"}`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Goals mini section */}
      {goals.length > 0 && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 mt-4">
          <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-3">
            Metas de ahorro
          </h3>
          <div className="space-y-3">
            {goals.slice(0, 4).map((g) => {
              const pct = fmtPercent(g.current_amount, g.target_amount);
              return (
                <div key={g.id}>
                  <div className="flex justify-between text-xs text-[#1d1d1f] dark:text-white mb-1">
                    <span>{g.name}</span>
                    <span>
                      {fmtCurrency(g.current_amount)} / {fmtCurrency(g.target_amount)}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 dark:bg-[#1a1a1f] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8">
      <div className={`text-2xl font-bold ${color} mb-1`}>{value}</div>
      <div className="text-[11px] text-[#6e6e73] dark:text-[#86868b]">{label}</div>
    </div>
  );
}
