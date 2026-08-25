"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useT } from "@/hooks/useT";

type Mode = "work" | "short" | "long";

interface ModeConfig {
  label: string;
  seconds: number;
  color: string;
}

const DEFAULTS: Record<Mode, number> = { work: 25, short: 5, long: 15 };

function playBeep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 600;
    osc.type = "sine";
    gain.gain.value = 0.3;
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.stop(ctx.currentTime + 0.4);
  } catch {
    // AudioContext not available
  }
}

function formatTime(totalSeconds: number) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");

  return `${m}:${s}`;
}

export default function PomodoroContent() {
  const { t } = useT();
  const [mode, setMode] = useState<Mode>("work");
  const [workMin, setWorkMin] = useState(DEFAULTS.work);
  const [shortMin, setShortMin] = useState(DEFAULTS.short);
  const [longMin, setLongMin] = useState(DEFAULTS.long);
  const [remaining, setRemaining] = useState(DEFAULTS.work * 60);
  const [totalSeconds, setTotalSeconds] = useState(DEFAULTS.work * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const circumference = 2 * Math.PI * 54;
  const progress = totalSeconds > 0 ? remaining / totalSeconds : 0;
  const dashOffset = circumference * (1 - progress);

  const applyMode = useCallback(
    (m: Mode) => {
      setMode(m);
      setRunning(false);
      const mins = m === "work" ? workMin : m === "short" ? shortMin : longMin;
      const total = mins * 60;

      setTotalSeconds(total);
      setRemaining(total);
    },
    [workMin, shortMin, longMin]
  );

  const start = useCallback(() => {
    if (remaining <= 0) {
      const mins = mode === "work" ? workMin : mode === "short" ? shortMin : longMin;
      const total = mins * 60;

      setTotalSeconds(total);
      setRemaining(total);
    }
    setRunning(true);
  }, [remaining, mode, workMin, shortMin, longMin]);

  const pause = useCallback(() => setRunning(false), []);

  const reset = useCallback(() => {
    setRunning(false);
    const mins = mode === "work" ? workMin : mode === "short" ? shortMin : longMin;
    const total = mins * 60;

    setTotalSeconds(total);
    setRemaining(total);
  }, [mode, workMin, shortMin, longMin]);

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            playBeep();
            setRunning(false);

            // Auto-advance mode
            setMode((currentMode) => {
              if (currentMode === "work") {
                setSessions((s) => {
                  const next = s + 1;
                  const nextMode: Mode = next % 4 === 0 ? "long" : "short";
                  const mins = nextMode === "long" ? longMin : shortMin;
                  const total = mins * 60;

                  setTotalSeconds(total);
                  setRemaining(total);
                  return next;
                });
              } else {
                setTotalSeconds(workMin * 60);
                setRemaining(workMin * 60);
              }
              return currentMode === "work" ? "short" : "work";
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, remaining, workMin, shortMin, longMin]);

  const modes: { key: Mode; label: string }[] = [
    { key: "work", label: t("blog.pomodoroTimer.work") },
    { key: "short", label: t("blog.pomodoroTimer.shortBreak") },
    { key: "long", label: t("blog.pomodoroTimer.longBreak") },
  ];

  const modeColors: Record<Mode, string> = {
    work: "bg-rose-500 hover:bg-rose-600",
    short: "bg-emerald-500 hover:bg-emerald-600",
    long: "bg-blue-500 hover:bg-blue-600",
  };

  const accentColors: Record<Mode, string> = {
    work: "text-rose-500 dark:text-rose-400",
    short: "text-emerald-500 dark:text-emerald-400",
    long: "text-blue-500 dark:text-blue-400",
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50">
            {t("blog.pomodoroTimer.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.pomodoroTimer.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.pomodoroTimer.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.pomodoroTimer.desc")}
        </p>
      </div>

      <div className="space-y-6">
        {/* Mode selector */}
        <div className="flex gap-2">
          {modes.map((m) => (
            <button
              key={m.key}
              onClick={() => applyMode(m.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                mode === m.key
                  ? `${modeColors[m.key]} text-white`
                  : "bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#6e6e73] dark:text-[#86868b]"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Timer */}
        <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#1c1c1e] p-8 flex flex-col items-center gap-6">
          <div className="relative w-44 h-44">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-black/5 dark:text-white/5"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className={`${accentColors[mode]} transition-[stroke-dashoffset] duration-1000`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-bold font-mono ${accentColors[mode]}`}>
                {formatTime(remaining)}
              </span>
              <span className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-1">
                {modes.find((m) => m.key === mode)?.label}
              </span>
            </div>
          </div>

          {/* Session counter */}
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(sessions, 8) }).map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-rose-500 dark:bg-rose-400"
              />
            ))}
            {sessions === 0 && (
              <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                {t("blog.pomodoroTimer.noSessions")}
              </span>
            )}
            <span className="text-xs text-[#6e6e73] dark:text-[#86868b] ml-1">
              {sessions > 0 ? `${sessions} ${t("blog.pomodoroTimer.sessions")}` : ""}
            </span>
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            {!running ? (
              <button
                onClick={start}
                className={`px-6 py-2.5 rounded-xl ${modeColors[mode]} text-white font-semibold transition-colors`}
              >
                {t("blog.pomodoroTimer.start")}
              </button>
            ) : (
              <button
                onClick={pause}
                className={`px-6 py-2.5 rounded-xl ${modeColors[mode]} text-white font-semibold transition-colors`}
              >
                {t("blog.pomodoroTimer.pause")}
              </button>
            )}
            <button
              onClick={reset}
              className="px-6 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#6e6e73] dark:text-[#86868b] hover:border-black/15 dark:hover:border-white/15 font-semibold transition-all"
            >
              {t("blog.pomodoroTimer.reset")}
            </button>
          </div>
        </div>

        {/* Config */}
        <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] p-5">
          <p className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-3">
            {t("blog.pomodoroTimer.config")}
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                {t("blog.pomodoroTimer.work")}
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={workMin}
                  onChange={(e) => setWorkMin(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white text-sm font-mono focus:outline-none focus:border-rose-500 dark:focus:border-rose-400 transition-colors"
                  min="1"
                  max="60"
                  disabled={running}
                />
                <span className="text-xs text-[#6e6e73] dark:text-[#86868b]">min</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                {t("blog.pomodoroTimer.shortBreak")}
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={shortMin}
                  onChange={(e) => setShortMin(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white text-sm font-mono focus:outline-none focus:border-rose-500 dark:focus:border-rose-400 transition-colors"
                  min="1"
                  max="30"
                  disabled={running}
                />
                <span className="text-xs text-[#6e6e73] dark:text-[#86868b]">min</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                {t("blog.pomodoroTimer.longBreak")}
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={longMin}
                  onChange={(e) => setLongMin(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white text-sm font-mono focus:outline-none focus:border-rose-500 dark:focus:border-rose-400 transition-colors"
                  min="1"
                  max="60"
                  disabled={running}
                />
                <span className="text-xs text-[#6e6e73] dark:text-[#86868b]">min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
