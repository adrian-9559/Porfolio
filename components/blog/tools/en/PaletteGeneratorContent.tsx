"use client";
import { useState, useCallback, useEffect } from "react";

// ── Color math ────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "");

  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;

  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((v) =>
        Math.max(0, Math.min(255, Math.round(v)))
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

function rgbToHsl(r: number, g: number, b: number) {
  const rn = r / 255,
    gn = g / 255,
    bn = b / 255;
  const max = Math.max(rn, gn, bn),
    min = Math.min(rn, gn, bn);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
        break;
      case gn:
        h = ((bn - rn) / d + 2) / 6;
        break;
      case bn:
        h = ((rn - gn) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return rgbToHex(f(0) * 255, f(8) * 255, f(4) * 255);
}

function luminance(r: number, g: number, b: number) {
  const toLinear = (c: number) => {
    const n = c / 255;

    return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
  };

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function contrastRatio(hex1: string, hex2: string): number {
  const a = hexToRgb(hex1),
    b = hexToRgb(hex2);

  if (!a || !b) return 1;
  const l1 = luminance(a.r, a.g, a.b);
  const l2 = luminance(b.r, b.g, b.b);
  const lighter = Math.max(l1, l2),
    darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

function textOnBg(hex: string): string {
  const rgb = hexToRgb(hex);

  if (!rgb) return "#000000";
  const l = luminance(rgb.r, rgb.g, rgb.b);

  return l > 0.179 ? "#1a1a1a" : "#ffffff";
}

// ── Palette generation ────────────────────────────────────────────────────────

type PaletteColor = {
  id: string;
  label: string;
  hex: string;
  role: "bg" | "surface" | "primary" | "secondary" | "accent" | "text";
};

function generatePalette(primary: string, secondary: string): PaletteColor[] {
  const pRgb = hexToRgb(primary);
  const sRgb = hexToRgb(secondary);

  if (!pRgb || !sRgb) return [];

  const p = rgbToHsl(pRgb.r, pRgb.g, pRgb.b);
  const s = rgbToHsl(sRgb.r, sRgb.g, sRgb.b);

  // Accent: complementary hue (180°)
  const accentH = (p.h + 150) % 360;

  return [
    // Background & surface (from primary hue, very desaturated)
    {
      id: "bg",
      label: "Background",
      hex: hslToHex(p.h, Math.min(p.s * 0.08, 8), 97),
      role: "bg",
    },
    {
      id: "surface",
      label: "Surface",
      hex: hslToHex(p.h, Math.min(p.s * 0.12, 12), 93),
      role: "surface",
    },
    // Primary scale
    {
      id: "pri-light",
      label: "Primary Light",
      hex: hslToHex(p.h, Math.min(p.s * 0.7, 70), Math.min(p.l + 20, 85)),
      role: "primary",
    },
    { id: "primary", label: "Primary", hex: primary, role: "primary" },
    {
      id: "pri-dark",
      label: "Primary Dark",
      hex: hslToHex(p.h, Math.min(p.s * 1.1, 100), Math.max(p.l - 18, 15)),
      role: "primary",
    },
    // Secondary scale
    {
      id: "sec-light",
      label: "Secondary Light",
      hex: hslToHex(s.h, Math.min(s.s * 0.7, 70), Math.min(s.l + 20, 85)),
      role: "secondary",
    },
    { id: "secondary", label: "Secondary", hex: secondary, role: "secondary" },
    // Accent
    {
      id: "accent",
      label: "Accent",
      hex: hslToHex(
        accentH,
        Math.min(p.s * 0.9, 85),
        Math.max(Math.min(p.l, 60), 40),
      ),
      role: "accent",
    },
    // Text
    {
      id: "text",
      label: "Text",
      hex: hslToHex(p.h, Math.min(p.s * 0.15, 15), 12),
      role: "text",
    },
  ];
}

// ── Score system ──────────────────────────────────────────────────────────────

type ScoreDetail = { label: string; score: number; max: number; note: string };

function evaluatePalette(colors: PaletteColor[]): {
  total: number;
  details: ScoreDetail[];
} {
  const get = (id: string) => colors.find((c) => c.id === id)?.hex ?? "#000000";

  // 1. Contrast — text over background (WCAG: 4.5 = AA, 7 = AAA)
  const textBgContrast = contrastRatio(get("text"), get("bg"));
  const textSurContrast = contrastRatio(get("text"), get("surface"));
  const primBgContrast = contrastRatio(get("primary"), get("bg"));
  const avgTextContrast = (textBgContrast + textSurContrast) / 2;
  const contrastScore = Math.min(
    100,
    Math.round((Math.min(avgTextContrast, 7) / 7) * 100),
  );
  const contrastNote =
    textBgContrast >= 7
      ? "AAA — excellent"
      : textBgContrast >= 4.5
        ? "AA — good"
        : "Insufficient contrast (< 4.5:1)";

  // 2. Harmony — angular relationship between colors on the wheel
  const hexColors = colors
    .filter((c) => c.role !== "bg" && c.role !== "surface" && c.role !== "text")
    .map((c) => c.hex);
  const hues = hexColors.map((h) => {
    const rgb = hexToRgb(h);

    return rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b).h : 0;
  });
  let harmonyScore = 50;

  if (hues.length >= 2) {
    const priH = hues[0],
      secH = hues[1];
    const angleDiff = Math.abs(priH - secH);
    const minAngle = Math.min(angleDiff, 360 - angleDiff);

    // Scoring by angle: complementary ~180, analogous ~30, triadic ~120
    if (minAngle >= 150 && minAngle <= 210)
      harmonyScore = 100; // Complementary
    else if (minAngle >= 100 && minAngle <= 140)
      harmonyScore = 90; // Triadic
    else if (minAngle >= 50 && minAngle <= 80)
      harmonyScore = 80; // Split complementary
    else if (minAngle >= 20 && minAngle <= 50)
      harmonyScore = 70; // Analogous
    else if (minAngle < 20)
      harmonyScore = 40; // Too similar
    else harmonyScore = 65;
  }
  const harmonyAngle = (() => {
    if (hues.length < 2) return 0;
    const d = Math.abs(hues[0] - hues[1]);

    return Math.min(d, 360 - d);
  })();
  const harmonyNote =
    harmonyScore >= 90
      ? "Ideal harmonic relationship"
      : harmonyScore >= 70
        ? `Acceptable harmony (${Math.round(harmonyAngle)}° difference)`
        : "Colors are too similar";

  // 3. Lightness range — should cover dark to light
  const allHex = colors.map((c) => c.hex);
  const lightnesses = allHex.map((h) => {
    const rgb = hexToRgb(h);

    return rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b).l : 50;
  });
  const lightRange = Math.max(...lightnesses) - Math.min(...lightnesses);
  const rangeScore = Math.min(100, Math.round((lightRange / 85) * 100));
  const rangeNote =
    lightRange >= 80
      ? "Excellent range"
      : lightRange >= 60
        ? "Good range"
        : "Narrow range — add lighter or darker tones";

  // 4. Primary accessibility over background
  const priAccessScore = Math.min(
    100,
    Math.round((Math.min(primBgContrast, 4.5) / 4.5) * 100),
  );
  const priAccessNote =
    primBgContrast >= 4.5
      ? `${primBgContrast.toFixed(1)}:1 — meets AA`
      : `${primBgContrast.toFixed(1)}:1 — does not meet AA (needs ≥ 4.5:1)`;

  // 5. Diversity — penalize very similar colors
  let dupPenalty = 0;

  for (let i = 0; i < colors.length; i++) {
    for (let j = i + 1; j < colors.length; j++) {
      const rA = hexToRgb(colors[i].hex),
        rB = hexToRgb(colors[j].hex);

      if (!rA || !rB) continue;
      const dist = Math.sqrt(
        (rA.r - rB.r) ** 2 + (rA.g - rB.g) ** 2 + (rA.b - rB.b) ** 2,
      );

      if (dist < 30) dupPenalty += 15;
      else if (dist < 60) dupPenalty += 5;
    }
  }
  const diversityScore = Math.max(0, Math.min(100, 100 - dupPenalty));
  const diversityNote =
    diversityScore >= 80
      ? "Good color diversity"
      : diversityScore >= 50
        ? "Some colors are similar"
        : "Too many similar colors";

  const details: ScoreDetail[] = [
    {
      label: "Text/background contrast",
      score: contrastScore,
      max: 100,
      note: contrastNote,
    },
    {
      label: "Color harmony",
      score: harmonyScore,
      max: 100,
      note: harmonyNote,
    },
    {
      label: "Lightness range",
      score: rangeScore,
      max: 100,
      note: rangeNote,
    },
    {
      label: "Primary accessibility",
      score: priAccessScore,
      max: 100,
      note: priAccessNote,
    },
    {
      label: "Color diversity",
      score: diversityScore,
      max: 100,
      note: diversityNote,
    },
  ];

  const weights = [0.3, 0.25, 0.2, 0.15, 0.1];
  const total = Math.round(
    details.reduce((acc, d, i) => acc + d.score * weights[i], 0),
  );

  return { total, details };
}

// ── Components ────────────────────────────────────────────────────────────────

function ScoreRing({ value }: { value: number }) {
  const radius = 52;
  const circ = 2 * Math.PI * radius;
  const dash = (value / 100) * circ;
  const color =
    value >= 80
      ? "#22c55e"
      : value >= 60
        ? "#f59e0b"
        : value >= 40
          ? "#f97316"
          : "#ef4444";
  const label =
    value >= 80
      ? "Excellent"
      : value >= 60
        ? "Good"
        : value >= 40
          ? "Fair"
          : "Needs improvement";

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            className="text-black/8 dark:text-white/8"
            cx="60"
            cy="60"
            fill="none"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            fill="none"
            r={radius}
            stroke={color}
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            strokeWidth="10"
            style={{ transition: "stroke-dasharray 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-3xl font-bold text-[#1d1d1f] dark:text-white"
            style={{ color }}
          >
            {value}
          </span>
          <span className="text-xs text-[#6e6e73]">/ 100</span>
        </div>
      </div>
      <span className="text-sm font-semibold" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

function ColorSwatch({
  color,
  onChange,
}: {
  color: PaletteColor;
  onChange: (hex: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [inputVal, setInputVal] = useState(color.hex);
  const [copied, setCopied] = useState(false);
  const textColor = textOnBg(color.hex);

  function commitInput(val: string) {
    const clean = val.startsWith("#") ? val : "#" + val;

    if (/^#[0-9a-fA-F]{6}$/.test(clean)) {
      onChange(clean);
      setInputVal(clean);
    } else {
      setInputVal(color.hex);
    }
    setEditing(false);
  }

  function copy() {
    navigator.clipboard.writeText(color.hex).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const roleBadge: Record<PaletteColor["role"], string> = {
    bg: "Bg",
    surface: "Surface",
    primary: "Primary",
    secondary: "Secondary",
    accent: "Accent",
    text: "Text",
  };

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-black/8 dark:border-white/8 group">
      {/* Color block */}
      <div
        className="relative h-24 flex items-end p-3 transition-all"
        style={{ backgroundColor: color.hex }}
      >
        {/* Native color picker hidden input */}
        <label className="absolute inset-0 cursor-pointer opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
          <input
            className="absolute opacity-0 w-full h-full cursor-pointer"
            type="color"
            value={color.hex}
            onChange={(e) => {
              onChange(e.target.value);
              setInputVal(e.target.value);
            }}
          />
          <div className="bg-black/20 backdrop-blur-sm rounded-xl px-3 py-1.5 pointer-events-none">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="white"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M15.232 5.232l3.536 3.536M9 11l6.243-6.243a2 2 0 012.828 2.828L11.828 13.83A4 4 0 019.5 14.5H9v-.5a4 4 0 011.172-2.829z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </label>
        {/* Role badge */}
        <span
          className="relative text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${textColor}22`, color: textColor }}
        >
          {roleBadge[color.role]}
        </span>
      </div>

      {/* Info */}
      <div className="p-3 bg-white dark:bg-[#111116] flex flex-col gap-1.5">
        <p className="text-xs font-medium text-[#1d1d1f] dark:text-white truncate">
          {color.label}
        </p>

        {editing ? (
          <input
            autoFocus
            className="text-xs font-mono w-full rounded-lg border border-blue-400 bg-transparent px-2 py-1 text-[#1d1d1f] dark:text-white outline-none"
            value={inputVal}
            onBlur={(e) => commitInput(e.target.value)}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitInput(inputVal);
              if (e.key === "Escape") {
                setEditing(false);
                setInputVal(color.hex);
              }
            }}
          />
        ) : (
          <button
            className="text-xs font-mono text-left text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
            onClick={() => {
              setEditing(true);
              setInputVal(color.hex);
            }}
          >
            {color.hex.toUpperCase()}
          </button>
        )}

        <button
          className="text-[10px] text-[#aeaeb2] hover:text-[#6e6e73] dark:hover:text-[#aeaeb2] transition-colors text-left"
          onClick={copy}
        >
          {copied ? "✓ Copied" : "Copy HEX"}
        </button>
      </div>
    </div>
  );
}

function PreviewUI({ colors }: { colors: PaletteColor[] }) {
  const get = (id: string) => colors.find((c) => c.id === id)?.hex ?? "#888";

  return (
    <div
      className="rounded-2xl overflow-hidden border border-black/8 dark:border-white/8 text-sm"
      style={{ backgroundColor: get("bg"), color: get("text") }}
    >
      {/* Navbar */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b"
        style={{
          backgroundColor: get("surface"),
          borderColor: `${get("text")}18`,
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: get("primary") }}
          >
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: get("bg") }}
            />
          </div>
          <span
            className="font-semibold text-sm"
            style={{ color: get("text") }}
          >
            My App
          </span>
        </div>
        <div
          className="flex gap-3 text-xs"
          style={{ color: get("text"), opacity: 0.6 }}
        >
          {["Home", "About", "Projects"].map((l) => (
            <span key={l} className="cursor-default">
              {l}
            </span>
          ))}
        </div>
        <div
          className="w-8 h-8 rounded-full"
          style={{ backgroundColor: get("secondary") }}
        />
      </div>

      {/* Hero */}
      <div className="px-5 py-6">
        <div
          className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3"
          style={{
            backgroundColor: `${get("accent")}25`,
            color: get("accent"),
          }}
        >
          New
        </div>
        <h2 className="text-lg font-bold mb-1" style={{ color: get("text") }}>
          Welcome to my portfolio
        </h2>
        <p
          className="text-xs leading-relaxed mb-4"
          style={{ color: get("text"), opacity: 0.65 }}
        >
          Designer and fullstack developer. Building digital products with
          attention to detail.
        </p>
        <div className="flex gap-2 flex-wrap">
          <button
            className="text-xs font-medium px-4 py-2 rounded-xl"
            style={{
              backgroundColor: get("primary"),
              color: textOnBg(get("primary")),
            }}
          >
            View projects
          </button>
          <button
            className="text-xs font-medium px-4 py-2 rounded-xl border"
            style={{ borderColor: `${get("text")}30`, color: get("text") }}
          >
            Contact
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="px-5 pb-5 grid grid-cols-3 gap-2">
        {[
          { label: "Projects", value: "12", color: get("primary") },
          { label: "Clients", value: "8", color: get("secondary") },
          { label: "Years exp.", value: "4", color: get("accent") },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-xl p-3 border"
            style={{
              backgroundColor: get("surface"),
              borderColor: `${get("text")}12`,
            }}
          >
            <div className="text-xl font-bold mb-0.5" style={{ color }}>
              {value}
            </div>
            <div
              className="text-[10px]"
              style={{ color: get("text"), opacity: 0.55 }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

const PRESETS: { label: string; primary: string; secondary: string }[] = [
  { label: "Ocean", primary: "#0ea5e9", secondary: "#6366f1" },
  { label: "Forest", primary: "#16a34a", secondary: "#ca8a04" },
  { label: "Sunset", primary: "#f97316", secondary: "#ec4899" },
  { label: "Night", primary: "#8b5cf6", secondary: "#06b6d4" },
  { label: "Cherry", primary: "#e11d48", secondary: "#7c3aed" },
  { label: "Mint", primary: "#14b8a6", secondary: "#f59e0b" },
];

export default function PaletteGeneratorContent() {
  const [primary, setPrimary] = useState("#6366f1");
  const [secondary, setSecondary] = useState("#f97316");
  const [colors, setColors] = useState<PaletteColor[]>([]);
  const [activeTab, setActiveTab] = useState<"palette" | "preview" | "score">(
    "palette",
  );

  const regenerate = useCallback((p: string, s: string) => {
    setColors(generatePalette(p, s));
  }, []);

  useEffect(() => {
    regenerate(primary, secondary);
  }, [primary, secondary]);

  const score =
    colors.length > 0 ? evaluatePalette(colors) : { total: 0, details: [] };

  function updateColor(id: string, hex: string) {
    setColors((prev) => prev.map((c) => (c.id === id ? { ...c, hex } : c)));
    if (id === "primary") setPrimary(hex);
    if (id === "secondary") setSecondary(hex);
  }

  const scoreColor =
    score.total >= 80
      ? "text-green-500"
      : score.total >= 60
        ? "text-amber-500"
        : score.total >= 40
          ? "text-orange-500"
          : "text-red-500";

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-5">
        <div className="flex flex-wrap gap-6 items-end">
          {/* Primary picker */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wide">
              Primary color
            </label>
            <div className="flex items-center gap-2">
              <label
                className="relative w-10 h-10 rounded-xl overflow-hidden cursor-pointer border-2 border-black/12 dark:border-white/12 hover:scale-105 transition-transform"
                style={{ backgroundColor: primary }}
              >
                <input
                  className="absolute opacity-0 inset-0 cursor-pointer w-full h-full"
                  type="color"
                  value={primary}
                  onChange={(e) => setPrimary(e.target.value)}
                />
              </label>
              <input
                className="w-24 text-xs font-mono rounded-xl border border-black/12 dark:border-white/12 bg-transparent px-2.5 py-2 text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={7}
                value={primary}
                onChange={(e) => {
                  const v = e.target.value.startsWith("#")
                    ? e.target.value
                    : "#" + e.target.value;

                  if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setPrimary(v);
                }}
              />
            </div>
          </div>

          {/* Secondary picker */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wide">
              Secondary color
            </label>
            <div className="flex items-center gap-2">
              <label
                className="relative w-10 h-10 rounded-xl overflow-hidden cursor-pointer border-2 border-black/12 dark:border-white/12 hover:scale-105 transition-transform"
                style={{ backgroundColor: secondary }}
              >
                <input
                  className="absolute opacity-0 inset-0 cursor-pointer w-full h-full"
                  type="color"
                  value={secondary}
                  onChange={(e) => setSecondary(e.target.value)}
                />
              </label>
              <input
                className="w-24 text-xs font-mono rounded-xl border border-black/12 dark:border-white/12 bg-transparent px-2.5 py-2 text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={7}
                value={secondary}
                onChange={(e) => {
                  const v = e.target.value.startsWith("#")
                    ? e.target.value
                    : "#" + e.target.value;

                  if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setSecondary(v);
                }}
              />
            </div>
          </div>

          {/* Score pill */}
          <div className="ml-auto flex flex-col items-end gap-0.5">
            <span className="text-xs text-[#6e6e73] dark:text-[#86868b]">
              Score
            </span>
            <span className={`text-3xl font-bold tabular-nums ${scoreColor}`}>
              {score.total}
              <span className="text-base font-normal text-[#aeaeb2]">/100</span>
            </span>
          </div>
        </div>

        {/* Presets */}
        <div className="mt-4 pt-4 border-t border-black/6 dark:border-white/6">
          <p className="text-xs font-medium text-[#aeaeb2] dark:text-[#636366] mb-2">
            Quick presets
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-colors text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
                onClick={() => {
                  setPrimary(preset.primary);
                  setSecondary(preset.secondary);
                }}
              >
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: preset.primary }}
                />
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: preset.secondary }}
                />
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5 w-fit">
        {(["palette", "preview", "score"] as const).map((tab) => (
          <button
            key={tab}
            className={`text-sm px-4 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === tab
                ? "bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white shadow-sm"
                : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "palette"
              ? "🎨 Palette"
              : tab === "preview"
                ? "👁 Preview"
                : "📊 Analysis"}
          </button>
        ))}
      </div>

      {/* Palette tab */}
      {activeTab === "palette" && (
        <div>
          <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mb-4">
            Click any color to change its value. Click the color block
            to open the native picker, or the HEX to edit manually.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {colors.map((c) => (
              <ColorSwatch
                key={c.id}
                color={c}
                onChange={(hex) => updateColor(c.id, hex)}
              />
            ))}
          </div>

          {/* CSS export */}
          <details className="mt-6">
            <summary className="text-sm font-medium text-[#6e6e73] dark:text-[#86868b] cursor-pointer hover:text-[#1d1d1f] dark:hover:text-white transition-colors select-none">
              Export as CSS variables →
            </summary>
            <pre className="mt-3 bg-[#0d1117] rounded-xl p-4 overflow-x-auto text-xs text-[#e6edf3] leading-relaxed">
              <code>{`:root {\n${colors.map((c) => `  --color-${c.id}: ${c.hex.toUpperCase()};`).join("\n")}\n}`}</code>
            </pre>
          </details>
        </div>
      )}

      {/* Preview tab */}
      {activeTab === "preview" && (
        <div className="space-y-4">
          <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            Preview of how the palette would look in a real interface.
          </p>
          <PreviewUI colors={colors} />
        </div>
      )}

      {/* Score tab */}
      {activeTab === "score" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-6 flex flex-col sm:flex-row gap-6 items-center">
            <ScoreRing value={score.total} />
            <div className="flex-1 space-y-3 w-full">
              {score.details.map((d) => {
                const pct = (d.score / d.max) * 100;
                const barColor =
                  pct >= 80
                    ? "#22c55e"
                    : pct >= 60
                      ? "#f59e0b"
                      : pct >= 40
                        ? "#f97316"
                        : "#ef4444";

                return (
                  <div key={d.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-[#1d1d1f] dark:text-white">
                        {d.label}
                      </span>
                      <span
                        className="text-xs font-bold tabular-nums"
                        style={{ color: barColor }}
                      >
                        {d.score}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-black/8 dark:bg-white/8 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: barColor }}
                      />
                    </div>
                    <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] mt-0.5">
                      {d.note}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* WCAG pairs */}
          <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-5">
            <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-3">
              Key pair contrast (WCAG)
            </h3>
            <div className="space-y-2">
              {[
                ["text", "bg", "Text on background"],
                ["text", "surface", "Text on surface"],
                ["primary", "bg", "Primary on background"],
                ["secondary", "bg", "Secondary on background"],
                ["accent", "bg", "Accent on background"],
              ].map(([a, b, label]) => {
                const hexA = colors.find((c) => c.id === a)?.hex ?? "#000";
                const hexB = colors.find((c) => c.id === b)?.hex ?? "#fff";
                const ratio = contrastRatio(hexA, hexB);
                const level =
                  ratio >= 7
                    ? "AAA"
                    : ratio >= 4.5
                      ? "AA"
                      : ratio >= 3
                        ? "AA Large"
                        : "Fail";
                const levelColor =
                  ratio >= 7
                    ? "#22c55e"
                    : ratio >= 4.5
                      ? "#84cc16"
                      : ratio >= 3
                        ? "#f59e0b"
                        : "#ef4444";

                return (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl p-2.5 border border-black/5 dark:border-white/5"
                  >
                    <div className="flex gap-1 shrink-0">
                      <div
                        className="w-5 h-5 rounded-md border border-black/10 dark:border-white/10"
                        style={{ backgroundColor: hexA }}
                      />
                      <div
                        className="w-5 h-5 rounded-md border border-black/10 dark:border-white/10"
                        style={{ backgroundColor: hexB }}
                      />
                    </div>
                    <span className="text-xs text-[#6e6e73] dark:text-[#86868b] flex-1">
                      {label}
                    </span>
                    <span className="text-xs font-mono text-[#1d1d1f] dark:text-white">
                      {ratio.toFixed(1)}:1
                    </span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        color: levelColor,
                        backgroundColor: `${levelColor}18`,
                      }}
                    >
                      {level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
