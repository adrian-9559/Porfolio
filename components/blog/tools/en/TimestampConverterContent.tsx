"use client";
import { useState } from "react";

export default function TimestampConverterContent() {
  const [mode, setMode] = useState<"ts2date" | "date2ts">("ts2date");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    setError("");
    setOutput("");
    if (!input.trim()) return;

    try {
      if (mode === "ts2date") {
        const num = Number(input.trim());

        if (isNaN(num)) throw new Error("Invalid number");
        const ms = num > 1e12 ? num : num * 1000;
        const d = new Date(ms);

        if (isNaN(d.getTime())) throw new Error("Invalid date");
        setOutput(d.toISOString().replace("T", " ") + " (ISO)");
      } else {
        const d = new Date(input.trim());

        if (isNaN(d.getTime()))
          throw new Error(
            "Invalid date. Use ISO format (2026-07-01) or similar.",
          );
        const secs = Math.floor(d.getTime() / 1000);
        const ms = d.getTime();

        setOutput(`${secs} (seconds)\n${ms} (milliseconds)`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion error");
    }
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800/50">
            Tool
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            Free to use
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          Timestamp Converter
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          Convert between Unix timestamp and human-readable date. Supports
          seconds, milliseconds, and ISO.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] w-fit">
          {(["ts2date", "date2ts"] as const).map((m) => (
            <button
              key={m}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${mode === m ? "bg-white dark:bg-[#1c1c22] text-teal-600 dark:text-teal-400 shadow-sm" : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"}`}
              onClick={() => {
                setMode(m);
                setOutput("");
                setError("");
              }}
            >
              {m === "ts2date" ? "Timestamp → Date" : "Date → Timestamp"}
            </button>
          ))}
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            {mode === "ts2date"
              ? "Unix timestamp (seconds or milliseconds)"
              : "Date (ISO or natural)"}
          </p>
          <input
            className="w-full p-3 text-sm font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white focus:outline-none focus:border-teal-400 dark:focus:border-teal-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
            placeholder={
              mode === "ts2date" ? "1769827200" : "2026-07-01T12:00:00Z"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <button
          className="px-4 py-2 rounded-lg text-sm font-semibold bg-teal-500 hover:bg-teal-600 text-white transition-colors disabled:opacity-40"
          disabled={!input.trim()}
          onClick={convert}
        >
          Convert
        </button>

        {output && (
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              Result
            </p>
            <div className="p-3 rounded-xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/40 font-mono text-sm text-[#1d1d1f] dark:text-white whitespace-pre-wrap">
              {output}
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}
      </div>
    </article>
  );
}
