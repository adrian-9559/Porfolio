"use client";
import { useState } from "react";
import { useT } from "@/hooks/useT";

const TIP_PRESETS = [10, 15, 18, 20, 25];

export default function TipCalculatorContent() {
  const { t } = useT();
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState(20);
  const [customTip, setCustomTip] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [people, setPeople] = useState(1);

  const effectiveTip = useCustom ? (parseFloat(customTip) || 0) : tipPct;
  const billNum = parseFloat(bill) || 0;
  const tipAmount = billNum * (effectiveTip / 100);
  const total = billNum + tipAmount;
  const perPerson = people > 0 ? total / people : total;

  const fmt = (n: number) => n.toFixed(2);

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
            {t("blog.tipCalculator.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.tipCalculator.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.tipCalculator.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.tipCalculator.desc")}
        </p>
      </div>

      <div className="space-y-6">
        {/* Inputs */}
        <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#1c1c1e] p-6 space-y-5">
          {/* Bill amount */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">
              {t("blog.tipCalculator.billAmount")}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6e6e73] dark:text-[#86868b] font-medium">
                $
              </span>
              <input
                type="number"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                className="w-full pl-8 pr-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white text-lg font-mono focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Tip percentage */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">
              {t("blog.tipCalculator.tipPercent")}
            </label>
            <div className="flex flex-wrap gap-2">
              {TIP_PRESETS.map((pct) => (
                <button
                  key={pct}
                  onClick={() => {
                    setTipPct(pct);
                    setUseCustom(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    !useCustom && tipPct === pct
                      ? "bg-emerald-500 text-white"
                      : "bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#6e6e73] dark:text-[#86868b] hover:border-emerald-500 dark:hover:border-emerald-400"
                  }`}
                >
                  {pct}%
                </button>
              ))}
              <button
                onClick={() => setUseCustom(true)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  useCustom
                    ? "bg-emerald-500 text-white"
                    : "bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#6e6e73] dark:text-[#86868b] hover:border-emerald-500 dark:hover:border-emerald-400"
                }`}
              >
                {t("blog.tipCalculator.custom")}
              </button>
            </div>
            {useCustom && (
              <div className="relative">
                <input
                  type="number"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white text-lg font-mono focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors"
                  placeholder="0"
                  min="0"
                  max="100"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6e6e73] dark:text-[#86868b] font-medium">
                  %
                </span>
              </div>
            )}
          </div>

          {/* Split */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">
              {t("blog.tipCalculator.splitBetween")}
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPeople(Math.max(1, people - 1))}
                className="w-10 h-10 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#6e6e73] dark:text-[#86868b] hover:border-emerald-500 dark:hover:border-emerald-400 transition-all text-lg font-bold flex items-center justify-center"
              >
                −
              </button>
              <span className="text-2xl font-bold text-[#1d1d1f] dark:text-white w-12 text-center">
                {people}
              </span>
              <button
                onClick={() => setPeople(people + 1)}
                className="w-10 h-10 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#6e6e73] dark:text-[#86868b] hover:border-emerald-500 dark:hover:border-emerald-400 transition-all text-lg font-bold flex items-center justify-center"
              >
                +
              </button>
              <span className="text-sm text-[#6e6e73] dark:text-[#86868b]">
                {t("blog.tipCalculator.people")}
              </span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#1c1c1e] p-5 text-center">
            <p className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-1">
              {t("blog.tipCalculator.tipAmount")}
            </p>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              ${fmt(tipAmount)}
            </p>
          </div>
          <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#1c1c1e] p-5 text-center">
            <p className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-1">
              {t("blog.tipCalculator.total")}
            </p>
            <p className="text-3xl font-bold text-[#1d1d1f] dark:text-white font-mono">
              ${fmt(total)}
            </p>
          </div>
          <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#1c1c1e] p-5 text-center">
            <p className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-1">
              {t("blog.tipCalculator.perPerson")}
            </p>
            <p className="text-3xl font-bold text-[#1d1d1f] dark:text-white font-mono">
              ${fmt(perPerson)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
