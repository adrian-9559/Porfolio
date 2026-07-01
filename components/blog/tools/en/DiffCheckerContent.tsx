"use client";
import { useState } from "react";

function diffLines(a: string, b: string) {
  const la = a.split("\n");
  const lb = b.split("\n");
  const max = Math.max(la.length, lb.length);
  const result: { type: "same" | "added" | "removed"; text: string }[] = [];

  for (let i = 0; i < max; i++) {
    const l = la[i] ?? "";
    const r = lb[i] ?? "";

    if (l === r && l !== undefined) {
      result.push({ type: "same", text: l });
    } else {
      if (l !== undefined) result.push({ type: "removed", text: l });
      if (r !== undefined) result.push({ type: "added", text: r });
    }
  }

  return result;
}

export default function DiffCheckerContent() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const diffs = diffLines(left, right);

  return (
    <article className="max-w-5xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
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
          Text Diff Checker
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          Compare two texts side by side. Added and removed lines are
          highlighted instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            Original
          </p>
          <textarea
            className="w-full h-64 p-3 text-sm font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
            placeholder="Text A..."
            value={left}
            onChange={(e) => setLeft(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            Modified
          </p>
          <textarea
            className="w-full h-64 p-3 text-sm font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
            placeholder="Text B..."
            value={right}
            onChange={(e) => setRight(e.target.value)}
          />
        </div>
      </div>

      {(left || right) && (
        <div className="mt-4 space-y-1.5">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            Differences
          </p>
          <div className="rounded-xl border border-black/8 dark:border-white/8 overflow-hidden">
            {diffs.map((d, i) => (
              <div
                key={i}
                className={`px-3 py-1.5 font-mono text-sm leading-relaxed border-b border-black/4 dark:border-white/4 last:border-b-0 ${
                  d.type === "added"
                    ? "bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-300"
                    : d.type === "removed"
                      ? "bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300"
                      : "text-[#1d1d1f] dark:text-white bg-transparent"
                }`}
              >
                <span className="select-none mr-2 opacity-40">
                  {d.type === "added" ? "+" : d.type === "removed" ? "−" : " "}
                </span>
                {d.text || " "}
              </div>
            ))}
            {diffs.length === 0 && (
              <div className="px-3 py-6 text-center text-xs text-[#aeaeb2] dark:text-[#636366]">
                No differences
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
