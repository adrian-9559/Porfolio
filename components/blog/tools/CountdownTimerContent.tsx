"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useT } from "@/hooks/useT";

function playBeep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800;
    osc.type = "sine";
    gain.gain.value = 0.3;
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.stop(ctx.currentTime + 0.5);
  } catch {
    // AudioContext not available
  }
}

export default function CountdownTimerContent() {
  const { t } = useT();
  const [inputMinutes, setInputMinutes] = useState("05");
  const [inputSeconds, setInputSeconds] = useState("00");
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const circumference = 2 * Math.PI * 54;
  const progress = totalSeconds > 0 ? remaining / totalSeconds : 0;
  const dashOffset = circumference * (1 - progress);

  const displayMinutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const displaySeconds = String(remaining % 60).padStart(2, "0");

  const start = useCallback(() => {
    if (remaining <= 0) {
      const mins = parseInt(inputMinutes) || 0;
      const secs = parseInt(inputSeconds) || 0;
      const total = mins * 60 + secs;

      if (total <= 0) return;
      setTotalSeconds(total);
      setRemaining(total);
    }
    setRunning(true);
  }, [remaining, inputMinutes, inputSeconds]);

  const pause = useCallback(() => {
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    setRemaining(0);
    setTotalSeconds(0);
  }, []);

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            playBeep();
            setRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, remaining]);

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50">
            {t("blog.countdownTimer.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.countdownTimer.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.countdownTimer.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.countdownTimer.desc")}
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#1c1c1e] p-8 flex flex-col items-center gap-8">
          {/* SVG Circle */}
          <div className="relative w-40 h-40">
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
                className="text-orange-500 dark:text-orange-400 transition-[stroke-dashoffset] duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold font-mono text-[#1d1d1f] dark:text-white">
                {displayMinutes}:{displaySeconds}
              </span>
            </div>
          </div>

          {/* Time input */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              className="w-16 px-2 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white text-center text-xl font-mono focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 transition-colors"
              min="0"
              max="99"
              placeholder="MM"
              disabled={running}
            />
            <span className="text-xl font-bold text-[#6e6e73] dark:text-[#86868b]">:</span>
            <input
              type="number"
              value={inputSeconds}
              onChange={(e) => setInputSeconds(e.target.value)}
              className="w-16 px-2 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white text-center text-xl font-mono focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 transition-colors"
              min="0"
              max="59"
              placeholder="SS"
              disabled={running}
            />
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            {!running ? (
              <button
                onClick={start}
                className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors"
              >
                {t("blog.countdownTimer.start")}
              </button>
            ) : (
              <button
                onClick={pause}
                className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors"
              >
                {t("blog.countdownTimer.pause")}
              </button>
            )}
            <button
              onClick={reset}
              className="px-6 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#6e6e73] dark:text-[#86868b] hover:border-orange-500 dark:hover:border-orange-400 font-semibold transition-all"
            >
              {t("blog.countdownTimer.reset")}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
