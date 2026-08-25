"use client";
import { useState, useMemo } from "react";
import { useT } from "@/hooks/useT";

function parseHex(hex: string): [number, number, number] | null {
  const clean = hex.replace("#", "");
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return [r, g, b];
  }
  if (clean.length === 6) {
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return [r, g, b];
  }
  return null;
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

interface WcagResult {
  ratio: number;
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  aaaLarge: boolean;
}

function getWcag(fg: string, bg: string): WcagResult | null {
  const fgRgb = parseHex(fg);
  const bgRgb = parseHex(bg);
  if (!fgRgb || !bgRgb) return null;

  const fgL = relativeLuminance(...fgRgb);
  const bgL = relativeLuminance(...bgRgb);
  const ratio = contrastRatio(fgL, bgL);

  return {
    ratio,
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaaNormal: ratio >= 7,
    aaaLarge: ratio >= 4.5,
  };
}

function PassFail({ pass }: { pass: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
        pass
          ? "bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400"
          : "bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400"
      }`}
    >
      {pass ? "✓ Pass" : "✕ Fail"}
    </span>
  );
}

export default function ContrastCheckerContent() {
  const { t } = useT();
  const [fg, setFg] = useState("#1d1d1f");
  const [bg, setBg] = useState("#ffffff");

  const result = useMemo(() => getWcag(fg, bg), [fg, bg]);

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
            {t("blog.contrastChecker.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.contrastChecker.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.contrastChecker.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.contrastChecker.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Color pickers */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.contrastChecker.foreground")}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={fg}
                onChange={(e) => setFg(e.target.value)}
                className="w-10 h-10 rounded-lg border border-black/8 dark:border-white/8 cursor-pointer"
              />
              <input
                type="text"
                value={fg}
                onChange={(e) => setFg(e.target.value)}
                className="flex-1 px-2 py-1.5 text-xs font-mono rounded-lg bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white focus:outline-none focus:border-amber-400 dark:focus:border-amber-600"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.contrastChecker.background")}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="w-10 h-10 rounded-lg border border-black/8 dark:border-white/8 cursor-pointer"
              />
              <input
                type="text"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="flex-1 px-2 py-1.5 text-xs font-mono rounded-lg bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white focus:outline-none focus:border-amber-400 dark:focus:border-amber-600"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div
          className="p-6 rounded-2xl border border-black/8 dark:border-white/8"
          style={{ backgroundColor: bg }}
        >
          <p className="text-2xl font-bold mb-2" style={{ color: fg }}>
            {t("blog.contrastChecker.previewLarge")}
          </p>
          <p className="text-sm" style={{ color: fg }}>
            {t("blog.contrastChecker.previewNormal")}
          </p>
        </div>

        {/* WCAG results */}
        {result && (
          <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 space-y-3">
            <div className="flex items-center gap-3">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {t("blog.contrastChecker.contrastRatio")}
              </p>
              <span className="text-2xl font-bold text-[#1d1d1f] dark:text-white">
                {result.ratio.toFixed(2)}:1
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b]">AA</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                    {t("blog.contrastChecker.normalText")} (4.5:1)
                  </span>
                  <PassFail pass={result.aaNormal} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                    {t("blog.contrastChecker.largeText")} (3:1)
                  </span>
                  <PassFail pass={result.aaLarge} />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b]">AAA</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                    {t("blog.contrastChecker.normalText")} (7:1)
                  </span>
                  <PassFail pass={result.aaaNormal} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                    {t("blog.contrastChecker.largeText")} (4.5:1)
                  </span>
                  <PassFail pass={result.aaaLarge} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
