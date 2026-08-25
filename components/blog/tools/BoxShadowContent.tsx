"use client";
import { useState } from "react";
import { useT } from "@/hooks/useT";
import { copyToClipboard } from "@/lib/clipboard";

interface Shadow {
  id: number;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

let nextId = 1;

function shadowToCss(s: Shadow): string {
  const inset = s.inset ? "inset " : "";
  return `${inset}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`;
}

export default function BoxShadowContent() {
  const { t } = useT();
  const [shadows, setShadows] = useState<Shadow[]>([
    { id: nextId++, x: 0, y: 4, blur: 6, spread: 0, color: "rgba(0,0,0,0.1)", inset: false },
  ]);
  const [copied, setCopied] = useState(false);

  const cssCode = shadows.map(shadowToCss).join(", ");

  const updateShadow = (id: number, patch: Partial<Shadow>) => {
    setShadows((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const addShadow = () => {
    setShadows((prev) => [
      ...prev,
      { id: nextId++, x: 0, y: 2, blur: 4, spread: 0, color: "rgba(0,0,0,0.15)", inset: false },
    ]);
  };

  const removeShadow = (id: number) => {
    setShadows((prev) => prev.filter((s) => s.id !== id));
  };

  const copy = async () => {
    if (await copyToClipboard(`box-shadow: ${cssCode};`)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-fuchsia-50 dark:bg-fuchsia-950/40 text-fuchsia-700 dark:text-fuchsia-400 border border-fuchsia-200 dark:border-fuchsia-800/50">
            {t("blog.boxShadow.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.boxShadow.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.boxShadow.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.boxShadow.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Preview */}
        <div className="flex items-center justify-center p-12 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8">
          <div
            className="w-32 h-32 rounded-xl bg-white dark:bg-[#1c1c1e] border border-black/5 dark:border-white/10"
            style={{ boxShadow: cssCode }}
          />
        </div>

        {/* Shadow layers */}
        {shadows.map((shadow, idx) => (
          <div
            key={shadow.id}
            className="p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {t("blog.boxShadow.layer")} {idx + 1}
              </p>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1.5 text-xs text-[#6e6e73] dark:text-[#86868b]">
                  <input
                    type="checkbox"
                    checked={shadow.inset}
                    onChange={(e) => updateShadow(shadow.id, { inset: e.target.checked })}
                    className="rounded"
                  />
                  {t("blog.boxShadow.inset")}
                </label>
                {shadows.length > 1 && (
                  <button
                    className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    onClick={() => removeShadow(shadow.id)}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(["x", "y", "blur", "spread"] as const).map((prop) => (
                <div key={prop} className="space-y-1">
                  <label className="text-xs text-[#6e6e73] dark:text-[#86868b] capitalize">
                    {prop}
                  </label>
                  <input
                    type="range"
                    min={-50}
                    max={50}
                    value={shadow[prop]}
                    onChange={(e) => updateShadow(shadow.id, { [prop]: Number(e.target.value) })}
                    className="w-full accent-fuchsia-500"
                  />
                  <p className="text-xs font-mono text-center text-[#1d1d1f] dark:text-white">
                    {shadow[prop]}px
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                {t("blog.boxShadow.color")}
              </label>
              <input
                type="color"
                value={shadow.color.startsWith("rgba") ? "#000000" : shadow.color}
                onChange={(e) => updateShadow(shadow.id, { color: e.target.value })}
                className="w-8 h-8 rounded-lg border border-black/8 dark:border-white/8 cursor-pointer"
              />
              <input
                type="text"
                value={shadow.color}
                onChange={(e) => updateShadow(shadow.id, { color: e.target.value })}
                className="flex-1 px-2 py-1 text-xs font-mono rounded-lg bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white focus:outline-none"
              />
            </div>
          </div>
        ))}

        {/* Add button */}
        <button
          className="w-full py-2 rounded-xl text-xs font-semibold border border-dashed border-black/12 dark:border-white/12 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/3 dark:hover:bg-white/3 transition-colors"
          onClick={addShadow}
        >
          + {t("blog.boxShadow.addLayer")}
        </button>

        {/* CSS output */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              CSS
            </p>
            <button
              className="text-xs text-fuchsia-600 dark:text-fuchsia-400 hover:underline"
              onClick={copy}
            >
              {copied ? t("blog.boxShadow.copied") : t("blog.boxShadow.copy")}
            </button>
          </div>
          <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-xs font-mono text-[#1d1d1f] dark:text-white break-all">
            box-shadow: {cssCode};
          </div>
        </div>
      </div>
    </article>
  );
}
