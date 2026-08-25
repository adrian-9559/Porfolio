"use client";
import { useState } from "react";
import { useT } from "@/hooks/useT";

type Category = "length" | "weight" | "temperature" | "volume" | "speed";

interface UnitDef {
  label: string;
  factor: number;
}

const CATEGORIES: Record<Category, { label: string; units: Record<string, UnitDef> }> = {
  length: {
    label: "Length",
    units: {
      m: { label: "Meters", factor: 1 },
      km: { label: "Kilometers", factor: 1000 },
      cm: { label: "Centimeters", factor: 0.01 },
      mm: { label: "Millimeters", factor: 0.001 },
      mi: { label: "Miles", factor: 1609.344 },
      yd: { label: "Yards", factor: 0.9144 },
      ft: { label: "Feet", factor: 0.3048 },
      in: { label: "Inches", factor: 0.0254 },
    },
  },
  weight: {
    label: "Weight",
    units: {
      kg: { label: "Kilograms", factor: 1 },
      g: { label: "Grams", factor: 0.001 },
      mg: { label: "Milligrams", factor: 0.000001 },
      lb: { label: "Pounds", factor: 0.453592 },
      oz: { label: "Ounces", factor: 0.0283495 },
      t: { label: "Metric Tons", factor: 1000 },
    },
  },
  temperature: {
    label: "Temperature",
    units: {
      c: { label: "Celsius", factor: 0 },
      f: { label: "Fahrenheit", factor: 0 },
      k: { label: "Kelvin", factor: 0 },
    },
  },
  volume: {
    label: "Volume",
    units: {
      l: { label: "Liters", factor: 1 },
      ml: { label: "Milliliters", factor: 0.001 },
      gal: { label: "Gallons (US)", factor: 3.78541 },
      qt: { label: "Quarts (US)", factor: 0.946353 },
      pt: { label: "Pints (US)", factor: 0.473176 },
      cup: { label: "Cups (US)", factor: 0.236588 },
      floz: { label: "Fluid Ounces", factor: 0.0295735 },
    },
  },
  speed: {
    label: "Speed",
    units: {
      ms: { label: "m/s", factor: 1 },
      kmh: { label: "km/h", factor: 0.277778 },
      mph: { label: "mph", factor: 0.44704 },
      kn: { label: "Knots", factor: 0.514444 },
    },
  },
};

function convertTemperature(value: number, from: string, to: string): number {
  let celsius: number;

  switch (from) {
    case "c":
      celsius = value;
      break;
    case "f":
      celsius = (value - 32) * (5 / 9);
      break;
    case "k":
      celsius = value - 273.15;
      break;
    default:
      return value;
  }

  switch (to) {
    case "c":
      return celsius;
    case "f":
      return celsius * (9 / 5) + 32;
    case "k":
      return celsius + 273.15;
    default:
      return celsius;
  }
}

function convert(value: number, from: string, to: string, category: Category): number {
  if (category === "temperature") return convertTemperature(value, from, to);

  const units = CATEGORIES[category].units;
  const fromFactor = units[from]?.factor ?? 1;
  const toFactor = units[to]?.factor ?? 1;

  return (value * fromFactor) / toFactor;
}

export default function UnitConverterContent() {
  const { t } = useT();
  const [category, setCategory] = useState<Category>("length");
  const keys = Object.keys(CATEGORIES[category].units);
  const [fromUnit, setFromUnit] = useState(keys[0]);
  const [toUnit, setToUnit] = useState(keys[1] ?? keys[0]);
  const [input, setInput] = useState("1");

  const numValue = parseFloat(input) || 0;
  const result = convert(numValue, fromUnit, toUnit, category);

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    const unitKeys = Object.keys(CATEGORIES[cat].units);

    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1] ?? unitKeys[0]);
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const unitOptions = (exclude?: string) =>
    Object.entries(CATEGORIES[category].units)
      .filter(([k]) => k !== exclude)
      .map(([k, u]) => (
        <option key={k} value={k}>
          {u.label}
        </option>
      ));

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800/50">
            {t("blog.unitConverter.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.unitConverter.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.unitConverter.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.unitConverter.desc")}
        </p>
      </div>

      <div className="space-y-6">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(CATEGORIES) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                category === cat
                  ? "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300"
                  : "bg-black/[0.03] dark:bg-white/[0.03] text-[#6e6e73] dark:text-[#86868b] hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
              }`}
            >
              {t(`blog.unitConverter.${cat}`)}
            </button>
          ))}
        </div>

        {/* Converter */}
        <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#1c1c1e] p-6 space-y-5">
          {/* From */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">
              {t("blog.unitConverter.from")}
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white text-lg font-mono focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 transition-colors"
                placeholder="0"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="px-3 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white text-sm focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 transition-colors min-w-[120px]"
              >
                {unitOptions(toUnit)}
              </select>
            </div>
          </div>

          {/* Swap button */}
          <div className="flex justify-center">
            <button
              onClick={swap}
              className="p-2 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#6e6e73] dark:text-[#86868b] hover:border-teal-500 dark:hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-all"
              aria-label={t("blog.unitConverter.swap")}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* To */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">
              {t("blog.unitConverter.to")}
            </label>
            <div className="flex gap-3">
              <div className="flex-1 px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white text-lg font-mono">
                {Number.isFinite(result) ? result.toFixed(6).replace(/\.?0+$/, "") : "—"}
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="px-3 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white text-sm focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 transition-colors min-w-[120px]"
              >
                {unitOptions(fromUnit)}
              </select>
            </div>
          </div>
        </div>

        {/* Quick formulas */}
        <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] p-4">
          <p className="text-xs text-[#aeaeb2] dark:text-[#636366] font-mono text-center">
            {numValue} {CATEGORIES[category].units[fromUnit]?.label} = {Number.isFinite(result) ? result.toFixed(6).replace(/\.?0+$/, "") : "—"} {CATEGORIES[category].units[toUnit]?.label}
          </p>
        </div>
      </div>
    </article>
  );
}
