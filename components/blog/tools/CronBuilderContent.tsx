"use client";
import { useState, useMemo } from "react";
import { useT } from "@/hooks/useT";

interface CronField {
  label: string;
  values: string[];
}

const FIELDS: CronField[] = [
  {
    label: "Minute",
    values: ["*", "0", "15", "30", "45", "*/5", "*/10", "*/15", "*/30"],
  },
  {
    label: "Hour",
    values: ["*", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "*/2", "*/4", "*/6", "*/8", "*/12"],
  },
  {
    label: "Day (Month)",
    values: ["*", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "15", "20", "25", "28", "30", "31"],
  },
  {
    label: "Month",
    values: ["*", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  },
  {
    label: "Day (Week)",
    values: ["*", "0", "1", "2", "3", "4", "5", "6"],
  },
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PRESETS = [
  { label: "Every minute", expr: "* * * * *" },
  { label: "Every 5 minutes", expr: "*/5 * * * *" },
  { label: "Every 15 minutes", expr: "*/15 * * * *" },
  { label: "Every 30 minutes", expr: "*/30 * * * *" },
  { label: "Every hour", expr: "0 * * * *" },
  { label: "Every day at 9am", expr: "0 9 * * *" },
  { label: "Every day at midnight", expr: "0 0 * * *" },
  { label: "Every Monday", expr: "0 0 * * 1" },
  { label: "Every Friday at 5pm", expr: "0 17 * * 5" },
  { label: "First of month", expr: "0 0 1 * *" },
  { label: "Every Sunday at noon", expr: "0 12 * * 0" },
] as const;

function getNextExecutions(expr: string, count: number): Date[] {
  const parts = expr.trim().split(/\s+/);

  if (parts.length !== 5) return [];

  const [minP, hourP, dayP, monthP, dowP] = parts;
  const dates: Date[] = [];
  const now = new Date();

  const check = (d: Date): boolean => {
    const m = d.getMinutes();
    const h = d.getHours();
    const dom = d.getDate();
    const mon = d.getMonth() + 1;
    const dow = d.getDay();

    const matchField = (val: number, pattern: string): boolean => {
      if (pattern === "*") return true;
      if (pattern.startsWith("*/")) {
        const step = parseInt(pattern.slice(2), 10);

        return val % step === 0;
      }

      return pattern.split(",").some((p) => parseInt(p, 10) === val);
    };

    return matchField(m, minP) && matchField(h, hourP) && matchField(dom, dayP) && matchField(mon, monthP) && matchField(dow, dowP);
  };

  const d = new Date(now);

  d.setSeconds(0);
  d.setMilliseconds(0);
  d.setMinutes(d.getMinutes() + 1);

  for (let i = 0; i < 366 * 24 * 60 && dates.length < count; i++) {
    if (check(d)) dates.push(new Date(d));

    d.setMinutes(d.getMinutes() + 1);
  }

  return dates;
}

function formatCronField(val: string, fieldIdx: number): string {
  if (fieldIdx === 4 && val !== "*" && !val.includes("/")) {
    return val.split(",").map((v) => DAY_NAMES[parseInt(v, 10)] || v).join(",");
  }

  return val;
}

export default function CronBuilderContent() {
  const { t } = useT();
  const [fields, setFields] = useState(["*", "*", "*", "*", "*"]);
  const [manualExpr, setManualExpr] = useState("* * * * *");
  const [isManual, setIsManual] = useState(false);
  const [copied, setCopied] = useState(false);

  const expression = isManual ? manualExpr : fields.join(" ");
  const nextDates = useMemo(() => getNextExecutions(expression, 5), [expression]);

  const setField = (index: number, value: string) => {
    const next = [...fields];

    next[index] = value;
    setFields(next);
    setManualExpr(next.join(" "));
    setIsManual(false);
  };

  const handleManualChange = (value: string) => {
    setManualExpr(value);
    setIsManual(true);
  };

  const applyPreset = (expr: string) => {
    setManualExpr(expr);
    const parts = expr.split(" ");

    if (parts.length === 5) {
      setFields(parts);
      setIsManual(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(expression);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
            {t("blog.cronBuilder.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.cronBuilder.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.cronBuilder.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.cronBuilder.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Presets */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            {t("blog.cronBuilder.presets")}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p.expr}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${expression === p.expr ? "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400" : "bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/8 dark:hover:bg-white/8"}`}
                onClick={() => applyPreset(p.expr)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Field selectors */}
        <div className="p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 space-y-3">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            {t("blog.cronBuilder.fields")}
          </p>
          <div className="grid grid-cols-5 gap-2">
            {FIELDS.map((field, i) => (
              <div key={field.label} className="space-y-1">
                <p className="text-[10px] font-medium text-[#aeaeb2] dark:text-[#636366] truncate">
                  {field.label}
                </p>
                <select
                  className="w-full px-1.5 py-1.5 text-xs font-mono rounded-lg bg-white dark:bg-[#1c1c22] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white focus:outline-none focus:border-amber-400 dark:focus:border-amber-600 truncate"
                  value={isManual ? manualExpr.split(" ")[i] || "*" : fields[i]}
                  onChange={(e) => setField(i, e.target.value)}
                >
                  {field.values.map((v) => (
                    <option key={v} value={v}>
                      {formatCronField(v, i)}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Manual expression */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.cronBuilder.expression")}
            </p>
            <button
              className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
              onClick={copy}
            >
              {copied ? t("blog.cronBuilder.copied") : t("blog.cronBuilder.copy")}
            </button>
          </div>
          <div className="relative">
            <input
              className="w-full p-3 pr-12 text-sm font-mono rounded-xl bg-[#f5f5f7] dark:bg-[#1c1c22] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white focus:outline-none focus:border-amber-400 dark:focus:border-amber-600 transition-colors"
              value={expression}
              onChange={(e) => handleManualChange(e.target.value)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#aeaeb2] dark:text-[#636366]">
              cron
            </span>
          </div>
        </div>

        {/* Next executions */}
        {nextDates.length > 0 && (
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 space-y-2">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              {t("blog.cronBuilder.nextExecutions")}
            </p>
            <div className="space-y-1.5">
              {nextDates.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-mono text-amber-900 dark:text-amber-300">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50 text-[10px] font-bold text-amber-700 dark:text-amber-400">
                    {i + 1}
                  </span>
                  {d.toLocaleString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {expression !== "* * * * *" && nextDates.length === 0 && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-sm text-red-700 dark:text-red-400">
            {t("blog.cronBuilder.invalid")}
          </div>
        )}
      </div>
    </article>
  );
}
