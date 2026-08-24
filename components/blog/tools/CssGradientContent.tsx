"use client";
import { useState } from "react";
import { useT } from "@/hooks/useT";

interface ColorStop {
  color: string;
  position: number;
}

interface Preset {
  id: string;
  label: string;
  stops: ColorStop[];
  direction: number;
  type: "linear" | "radial";
}

const presets: Preset[] = [
  { id: "sunset", label: "Sunset", stops: [{ color: "#ff512f", position: 0 }, { color: "#dd2476", position: 100 }], direction: 135, type: "linear" },
  { id: "ocean", label: "Ocean", stops: [{ color: "#2193b0", position: 0 }, { color: "#6dd5ed", position: 100 }], direction: 180, type: "linear" },
  { id: "forest", label: "Forest", stops: [{ color: "#134e5e", position: 0 }, { color: "#71b280", position: 100 }], direction: 135, type: "linear" },
  { id: "fire", label: "Fire", stops: [{ color: "#f12711", position: 0 }, { color: "#f5af19", position: 100 }], direction: 0, type: "linear" },
  { id: "purpleHaze", label: "Purple Haze", stops: [{ color: "#7b2ff7", position: 0 }, { color: "#c471f5", position: 50 }, { color: "#fa71cd", position: 100 }], direction: 135, type: "linear" },
];

function buildCSS(stops: ColorStop[], type: "linear" | "radial", direction: number): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const stopsStr = sorted.map((s) => `${s.color} ${s.position}%`).join(", ");
  if (type === "radial") return `radial-gradient(circle, ${stopsStr})`;
  return `linear-gradient(${direction}deg, ${stopsStr})`;
}

export default function CssGradientContent() {
  const { t } = useT();
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [direction, setDirection] = useState(135);
  const [stops, setStops] = useState<ColorStop[]>([
    { color: "#667eea", position: 0 },
    { color: "#764ba2", position: 100 },
  ]);
  const [copied, setCopied] = useState(false);

  const css = buildCSS(stops, type, direction);

  const addStop = () => {
    const maxPos = Math.max(...stops.map((s) => s.position));
    const newPos = Math.min(maxPos + 10, 100);
    setStops([...stops, { color: "#ffffff", position: newPos }].sort((a, b) => a.position - b.position));
  };

  const removeStop = (idx: number) => {
    if (stops.length <= 2) return;
    setStops(stops.filter((_, i) => i !== idx));
  };

  const updateStop = (idx: number, field: "color" | "position", value: string | number) => {
    setStops(stops.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));
  };

  const applyPreset = (preset: Preset) => {
    setType(preset.type);
    setDirection(preset.direction);
    setStops(preset.stops);
  };

  const copy = () => {
    navigator.clipboard.writeText(`background: ${css};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-fuchsia-50 dark:bg-fuchsia-950/40 text-fuchsia-700 dark:text-fuchsia-400 border border-fuchsia-200 dark:border-fuchsia-800/50">
            {t("blog.cssGradient.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.cssGradient.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.cssGradient.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.cssGradient.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Presets */}
        <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.04]">
          {presets.map((p) => (
            <button
              key={p.id}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
              onClick={() => applyPreset(p)}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Preview */}
        <div
          className="w-full h-40 rounded-xl border border-black/8 dark:border-white/8"
          style={{ background: css }}
        />

        {/* Type & direction */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.04]">
            {(["linear", "radial"] as const).map((tp) => (
              <button
                key={tp}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${type === tp ? "bg-white dark:bg-[#1c1c22] text-fuchsia-600 dark:text-fuchsia-400 shadow-sm" : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"}`}
                onClick={() => setType(tp)}
              >
                {tp === "linear" ? "Linear" : "Radial"}
              </button>
            ))}
          </div>
          {type === "linear" && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6e6e73] dark:text-[#86868b]">{direction}°</span>
              <input
                type="range"
                min={0}
                max={360}
                value={direction}
                onChange={(e) => setDirection(Number(e.target.value))}
                className="w-32 accent-fuchsia-500"
              />
            </div>
          )}
        </div>

        {/* Color stops */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.cssGradient.colorStops")}
            </p>
            <button
              className="text-xs text-fuchsia-600 dark:text-fuchsia-400 hover:underline"
              onClick={addStop}
            >
              + {t("blog.cssGradient.addStop")}
            </button>
          </div>
          <div className="space-y-2">
            {stops.map((stop, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => updateStop(idx, "color", e.target.value)}
                  className="w-8 h-8 rounded-lg border border-black/8 dark:border-white/8 cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={stop.color}
                  onChange={(e) => updateStop(idx, "color", e.target.value)}
                  className="flex-1 h-8 px-2 text-xs font-mono rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white focus:outline-none focus:border-fuchsia-400 dark:focus:border-fuchsia-600 transition-colors"
                />
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={stop.position}
                  onChange={(e) => updateStop(idx, "position", Number(e.target.value))}
                  className="w-16 h-8 px-2 text-xs font-mono rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white text-center focus:outline-none focus:border-fuchsia-400 dark:focus:border-fuchsia-600 transition-colors"
                />
                <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">%</span>
                {stops.length > 2 && (
                  <button
                    className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 px-1"
                    onClick={() => removeStop(idx)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

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
              {copied ? t("blog.cssGradient.copied") : t("blog.cssGradient.copy")}
            </button>
          </div>
          <div className="p-3 rounded-xl bg-fuchsia-50/60 dark:bg-fuchsia-950/20 border border-fuchsia-200 dark:border-fuchsia-800/40 font-mono text-sm text-[#1d1d1f] dark:text-white break-all">
            background: {css};
          </div>
        </div>
      </div>
    </article>
  );
}
