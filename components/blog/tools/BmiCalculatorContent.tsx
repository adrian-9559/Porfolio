"use client";
import { useState } from "react";
import { useT } from "@/hooks/useT";

interface BmiResult {
  value: number;
  classification: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

function classifyBmi(bmi: number): BmiResult {
  if (bmi < 18.5) {
    return {
      value: bmi,
      classification: "Underweight",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/40",
      borderColor: "border-blue-200 dark:border-blue-800/50",
    };
  }
  if (bmi < 25) {
    return {
      value: bmi,
      classification: "Normal",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
      borderColor: "border-emerald-200 dark:border-emerald-800/50",
    };
  }
  if (bmi < 30) {
    return {
      value: bmi,
      classification: "Overweight",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/40",
      borderColor: "border-amber-200 dark:border-amber-800/50",
    };
  }
  return {
    value: bmi,
    classification: "Obese",
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-50 dark:bg-rose-950/40",
    borderColor: "border-rose-200 dark:border-rose-800/50",
  };
}

export default function BmiCalculatorContent() {
  const { t } = useT();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<BmiResult | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!w || !h || w <= 0 || h <= 0) return;

    const bmi = w / Math.pow(h / 100, 2);

    setResult(classifyBmi(bmi));
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
            {t("blog.bmiCalculator.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.bmiCalculator.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.bmiCalculator.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.bmiCalculator.desc")}
        </p>
      </div>

      <div className="space-y-6">
        {/* Inputs */}
        <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#1c1c1e] p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">
                {t("blog.bmiCalculator.weight")}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white text-lg font-mono focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                  placeholder="70"
                  min="1"
                  max="500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6e6e73] dark:text-[#86868b]">
                  kg
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">
                {t("blog.bmiCalculator.height")}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white text-lg font-mono focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                  placeholder="175"
                  min="1"
                  max="300"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6e6e73] dark:text-[#86868b]">
                  cm
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors"
          >
            {t("blog.bmiCalculator.calculate")}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div
            className={`rounded-2xl border ${result.borderColor} ${result.bgColor} p-8 text-center space-y-3`}
          >
            <p className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">
              {t("blog.bmiCalculator.yourBmi")}
            </p>
            <p className={`text-6xl font-bold font-mono ${result.color}`}>
              {result.value.toFixed(1)}
            </p>
            <p className={`text-xl font-semibold ${result.color}`}>
              {result.classification}
            </p>
          </div>
        )}

        {/* Scale reference */}
        <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] p-5">
          <p className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-3">
            {t("blog.bmiCalculator.scale")}
          </p>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="space-y-1">
              <div className="h-1.5 rounded-full bg-blue-500" />
              <p className="text-[10px] font-medium text-[#6e6e73] dark:text-[#86868b]">
                &lt;18.5
              </p>
              <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
                {t("blog.bmiCalculator.underweight")}
              </p>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 rounded-full bg-emerald-500" />
              <p className="text-[10px] font-medium text-[#6e6e73] dark:text-[#86868b]">
                18.5–24.9
              </p>
              <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
                {t("blog.bmiCalculator.normal")}
              </p>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 rounded-full bg-amber-500" />
              <p className="text-[10px] font-medium text-[#6e6e73] dark:text-[#86868b]">
                25–29.9
              </p>
              <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
                {t("blog.bmiCalculator.overweight")}
              </p>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 rounded-full bg-rose-500" />
              <p className="text-[10px] font-medium text-[#6e6e73] dark:text-[#86868b]">
                ≥30
              </p>
              <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
                {t("blog.bmiCalculator.obese")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
