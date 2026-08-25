"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useT } from "@/hooks/useT";

const CANVAS_W = 1200;
const CANVAS_H = 630;
const PREVIEW_SCALE = 0.5;

export default function OgImageContent() {
  const { t } = useT();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [title, setTitle] = useState("My Blog Post");
  const [subtitle, setSubtitle] = useState("A short description of the article");
  const [bgColor, setBgColor] = useState("#6366f1");
  const [textColor, setTextColor] = useState("#ffffff");
  const [generating, setGenerating] = useState(false);

  const drawPreview = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Subtle pattern overlay
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    for (let i = 0; i < CANVAS_W; i += 40) {
      ctx.fillRect(i, 0, 1, CANVAS_H);
    }

    // Title
    ctx.fillStyle = textColor;
    ctx.font = "bold 72px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Word wrap title
    const maxWidth = CANVAS_W - 120;
    const words = title.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    const lineHeight = 90;
    const titleY = CANVAS_H / 2 - (lines.length > 1 ? 30 : 0) - (subtitle ? 20 : 0);

    lines.forEach((line, i) => {
      ctx.fillText(line, CANVAS_W / 2, titleY + i * lineHeight, maxWidth);
    });

    // Subtitle
    if (subtitle) {
      ctx.font = "32px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      ctx.fillStyle = textColor + "cc";
      const subtitleY = titleY + lines.length * lineHeight + 20;
      ctx.fillText(subtitle, CANVAS_W / 2, subtitleY, maxWidth);
    }
  }, [title, subtitle, bgColor, textColor]);

  useEffect(() => {
    drawPreview();
  }, [drawPreview]);

  const download = async () => {
    setGenerating(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), "image/png");
      });

      const a = document.createElement("a");

      a.href = URL.createObjectURL(blob);
      a.download = "og-image.png";
      a.click();
      URL.revokeObjectURL(a.href);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50">
            {t("blog.ogImage.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.ogImage.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.ogImage.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.ogImage.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Controls */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 space-y-5">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.ogImage.titleLabel")}
            </p>
            <input
              className="w-full px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white text-lg font-semibold focus:outline-none focus:border-red-400 dark:focus:border-red-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
              maxLength={80}
              placeholder={t("blog.ogImage.titlePlaceholder")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.ogImage.subtitleLabel")}
            </p>
            <input
              className="w-full px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white focus:outline-none focus:border-red-400 dark:focus:border-red-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
              maxLength={120}
              placeholder={t("blog.ogImage.subtitlePlaceholder")}
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {t("blog.ogImage.bgColor")}
              </p>
              <div className="flex items-center gap-3">
                <input
                  className="w-10 h-10 rounded-lg border border-black/8 dark:border-white/8 cursor-pointer bg-transparent"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
                <input
                  className="flex-1 px-3 py-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white font-mono text-sm focus:outline-none"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {t("blog.ogImage.textColor")}
              </p>
              <div className="flex items-center gap-3">
                <input
                  className="w-10 h-10 rounded-lg border border-black/8 dark:border-white/8 cursor-pointer bg-transparent"
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
                <input
                  className="flex-1 px-3 py-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white font-mono text-sm focus:outline-none"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live preview */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            {t("blog.ogImage.preview")}
          </p>
          <div className="rounded-xl overflow-hidden border border-black/8 dark:border-white/8">
            <canvas
              ref={canvasRef}
              height={CANVAS_H}
              style={{
                width: CANVAS_W * PREVIEW_SCALE,
                height: CANVAS_H * PREVIEW_SCALE,
              }}
              width={CANVAS_W}
            />
          </div>
          <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {CANVAS_W}×{CANVAS_H}px — {t("blog.ogImage.ogRecommended")}
          </p>
        </div>

        <button
          className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
          disabled={generating}
          onClick={download}
        >
          {generating ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : null}
          {t("blog.ogImage.download")}
        </button>

        {/* Preset colors */}
        <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/8 dark:border-white/8 space-y-2">
          <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
            {t("blog.ogImage.quickColors")}
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { bg: "#6366f1", text: "#ffffff", label: "Indigo" },
              { bg: "#0ea5e9", text: "#ffffff", label: "Sky" },
              { bg: "#1d1d1f", text: "#ffffff", label: "Dark" },
              { bg: "#ffffff", text: "#1d1d1f", label: "Light" },
              { bg: "#f97316", text: "#ffffff", label: "Orange" },
              { bg: "#10b981", text: "#ffffff", label: "Emerald" },
            ].map((preset) => (
              <button
                key={preset.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/8 dark:bg-white/8 text-[#1d1d1f] dark:text-white hover:bg-black/12 dark:hover:bg-white/12 transition-colors"
                onClick={() => {
                  setBgColor(preset.bg);
                  setTextColor(preset.text);
                }}
              >
                <span
                  className="w-3 h-3 rounded-full border border-black/10 dark:border-white/10"
                  style={{ backgroundColor: preset.bg }}
                />
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}