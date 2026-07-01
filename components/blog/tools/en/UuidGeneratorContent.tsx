"use client";
import { useState } from "react";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;

    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function uuidv7() {
  const now = Date.now();
  const hex = now.toString(16).padStart(12, "0");

  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-7xxx-${((Math.random() * 0x1000) | 0x8000).toString(16).slice(0, 4)}-${"xxxxxxxxxxxx".replace(/x/g, () => Math.floor(Math.random() * 16).toString(16))}`;
}

export default function UuidGeneratorContent() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [dashes, setDashes] = useState(true);
  const [version, setVersion] = useState<4 | 7>(4);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generate = () => {
    const fn = version === 4 ? uuidv4 : uuidv7;
    const list = Array.from({ length: count }, () => fn());

    setUuids(list);
  };

  const copy = (val: string, idx: number) => {
    navigator.clipboard.writeText(dashes ? val : val.replace(/-/g, ""));
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(
      uuids.map((u) => (dashes ? u : u.replace(/-/g, ""))).join("\n"),
    );
    setCopiedIdx(-1);
    setTimeout(() => setCopiedIdx(null), 1200);
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50">
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
          UUID Generator
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          Generate UUIDs v4 and v7. Copy individually or in batch, with or without dashes.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.04]">
            {([4, 7] as const).map((v) => (
              <button
                key={v}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${version === v ? "bg-white dark:bg-[#1c1c22] text-sky-600 dark:text-sky-400 shadow-sm" : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"}`}
                onClick={() => setVersion(v)}
              >
                {v === 4 ? "UUID v4 (random)" : "UUID v7 (sortable)"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.04]">
            <button
              className="px-2 py-1 rounded text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
              onClick={() => setCount(Math.max(1, count - 1))}
            >
              −
            </button>
            <span className="text-xs font-semibold text-[#1d1d1f] dark:text-white min-w-[2ch] text-center">
              {count}
            </span>
            <button
              className="px-2 py-1 rounded text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
              onClick={() => setCount(Math.min(50, count + 1))}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-sky-500 hover:bg-sky-600 text-white transition-colors"
            onClick={generate}
          >
            Generate
          </button>
          <button
            className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${dashes ? "border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-400" : "border-black/8 dark:border-white/8 text-[#6e6e73] dark:text-[#86868b]"}`}
            onClick={() => setDashes((d) => !d)}
          >
            {dashes ? "With dashes" : "Without dashes"}
          </button>
        </div>

        {uuids.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                UUID{uuids.length > 1 ? "s" : ""} generated
              </p>
              <button
                className="text-xs text-sky-600 dark:text-sky-400 hover:underline"
                onClick={copyAll}
              >
                {copiedIdx === -1 ? "Copied!" : "Copy all"}
              </button>
            </div>
            <div className="space-y-1">
              {uuids.map((u, i) => {
                const display = dashes ? u : u.replace(/-/g, "");

                return (
                  <div
                    key={i}
                    className="group flex items-center justify-between p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/8 dark:border-white/8 cursor-pointer hover:border-sky-300 dark:hover:border-sky-700 transition-colors"
                    onClick={() => copy(u, i)}
                  >
                    <code className="text-xs font-mono text-[#1d1d1f] dark:text-white break-all">
                      {display}
                    </code>
                    <span className="ml-2 text-[10px] text-sky-500 dark:text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      {copiedIdx === i ? "✓" : "Copy"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
