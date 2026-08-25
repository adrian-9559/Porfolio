"use client";
import { useState, useEffect, useRef } from "react";
import { useT } from "@/hooks/useT";

interface ClockEntry {
  id: string;
  timezone: string;
}

const TIMEZONES = [
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "New York (EST)" },
  { value: "America/Chicago", label: "Chicago (CST)" },
  { value: "America/Denver", label: "Denver (MST)" },
  { value: "America/Los_Angeles", label: "Los Angeles (PST)" },
  { value: "America/Sao_Paulo", label: "São Paulo (BRT)" },
  { value: "Europe/London", label: "London (GMT)" },
  { value: "Europe/Paris", label: "Paris (CET)" },
  { value: "Europe/Berlin", label: "Berlin (CET)" },
  { value: "Europe/Madrid", label: "Madrid (CET)" },
  { value: "Asia/Dubai", label: "Dubai (GST)" },
  { value: "Asia/Kolkata", label: "Mumbai (IST)" },
  { value: "Asia/Shanghai", label: "Shanghai (CST)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Asia/Seoul", label: "Seoul (KST)" },
  { value: "Australia/Sydney", label: "Sydney (AEST)" },
  { value: "Pacific/Auckland", label: "Auckland (NZST)" },
];

function formatTime(timezone: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return "--:--:--";
  }
}

function formatDate(timezone: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(new Date());
  } catch {
    return "";
  }
}

function getTimezoneOffset(timezone: string): string {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "shortOffset",
    });

    for (const part of formatter.formatToParts(now)) {
      if (part.type === "timeZoneName") return part.value;
    }
  } catch {
    // fallback
  }
  return "";
}

export default function WorldClockContent() {
  const { t } = useT();
  const [clocks, setClocks] = useState<ClockEntry[]>([
    { id: "1", timezone: "UTC" },
    { id: "2", timezone: "America/New_York" },
    { id: "3", timezone: "Asia/Tokyo" },
  ]);
  const [selectedTz, setSelectedTz] = useState("");
  const [tick, setTick] = useState(0);
  const idCounter = useRef(4);

  useEffect(() => {
    const interval = setInterval(() => setTick((p) => p + 1), 1000);

    return () => clearInterval(interval);
  }, []);

  const addClock = () => {
    if (!selectedTz) return;
    if (clocks.length >= 8) return;
    if (clocks.some((c) => c.timezone === selectedTz)) return;

    setClocks((prev) => [...prev, { id: String(idCounter.current++), timezone: selectedTz }]);
    setSelectedTz("");
  };

  const removeClock = (id: string) => {
    setClocks((prev) => prev.filter((c) => c.id !== id));
  };

  // Force re-render on tick
  void tick;

  const availableTimezones = TIMEZONES.filter(
    (tz) => !clocks.some((c) => c.timezone === tz.value)
  );

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
            {t("blog.worldClock.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.worldClock.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.worldClock.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.worldClock.desc")}
        </p>
      </div>

      <div className="space-y-6">
        {/* Add clock */}
        <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#1c1c1e] p-4 flex gap-3">
          <select
            value={selectedTz}
            onChange={(e) => setSelectedTz(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white text-sm focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
          >
            <option value="">{t("blog.worldClock.selectTimezone")}</option>
            {availableTimezones.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
          <button
            onClick={addClock}
            disabled={!selectedTz || clocks.length >= 8}
            className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 text-white font-semibold transition-colors text-sm"
          >
            {t("blog.worldClock.add")}
          </button>
        </div>

        {clocks.length >= 8 && (
          <p className="text-xs text-[#aeaeb2] dark:text-[#636366] text-center">
            {t("blog.worldClock.maxReached")}
          </p>
        )}

        {/* Clocks grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {clocks.map((clock) => (
            <div
              key={clock.id}
              className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#1c1c1e] p-5 relative group"
            >
              <button
                onClick={() => removeClock(clock.id)}
                className="absolute top-3 right-3 w-6 h-6 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#aeaeb2] dark:text-[#636366] hover:border-rose-500 dark:hover:border-rose-400 hover:text-rose-500 dark:hover:text-rose-400 transition-all text-xs flex items-center justify-center opacity-0 group-hover:opacity-100"
                aria-label="Remove clock"
              >
                ✕
              </button>

              <div className="space-y-1">
                <p className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">
                  {TIMEZONES.find((tz) => tz.value === clock.timezone)?.label ?? clock.timezone}
                </p>
                <p className="text-3xl font-bold font-mono text-[#1d1d1f] dark:text-white tracking-tight">
                  {formatTime(clock.timezone)}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                    {formatDate(clock.timezone)}
                  </p>
                  <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366] font-mono">
                    {getTimezoneOffset(clock.timezone)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {clocks.length === 0 && (
          <div className="rounded-2xl border border-dashed border-black/8 dark:border-white/8 p-12 text-center">
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">
              {t("blog.worldClock.empty")}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
