"use client";
import { useState, useCallback } from "react";

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");

  if (clean.length !== 6) return null;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;

  return { r, g, b };
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

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

function hslToRgb(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return {
    r: Math.round(f(0) * 255),
    g: Math.round(f(8) * 255),
    b: Math.round(f(4) * 255),
  };
}

const PALETTES = [
  {
    name: "Azul océano",
    colors: ["#0ea5e9", "#38bdf8", "#7dd3fc", "#bae6fd", "#e0f2fe"],
  },
  {
    name: "Violeta",
    colors: ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"],
  },
  {
    name: "Emerald",
    colors: ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#d1fae5"],
  },
  {
    name: "Rosa",
    colors: ["#f43f5e", "#fb7185", "#fda4af", "#fecdd3", "#fff1f2"],
  },
  {
    name: "Amber",
    colors: ["#f59e0b", "#fbbf24", "#fcd34d", "#fde68a", "#fef3c7"],
  },
];

export default function ColorToolContent() {
  const [hex, setHex] = useState("#3b82f6");
  const [hexInput, setHexInput] = useState("#3b82f6");
  const [copied, setCopied] = useState("");

  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const applyHex = useCallback((val: string) => {
    const clean = val.startsWith("#") ? val : "#" + val;

    setHexInput(clean);
    if (/^#[0-9a-fA-F]{6}$/.test(clean)) {
      setHex(clean);
    }
  }, []);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  };

  const CopyBtn = ({ val, label }: { val: string; label: string }) => (
    <button
      className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 transition-all group w-full text-left"
      onClick={() => copy(val, label)}
    >
      <div>
        <p className="text-[10px] font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm font-mono text-[#1d1d1f] dark:text-white">
          {val}
        </p>
      </div>
      <span className="text-[10px] text-[#6e6e73] dark:text-[#86868b] opacity-0 group-hover:opacity-100 transition-opacity">
        {copied === label ? "✓" : "Copiar"}
      </span>
    </button>
  );

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-400 border border-pink-200 dark:border-pink-800/50">
            Herramienta
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            Uso libre
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          Conversor de colores
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          Convierte entre HEX, RGB y HSL. Selecciona del picker o escribe el
          valor directamente.
        </p>
      </div>

      <div className="space-y-6">
        {/* Picker + color box */}
        <div className="flex items-start gap-5 flex-wrap">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden"
              style={{ backgroundColor: hex }}
            >
              <input
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                type="color"
                value={hex}
                onChange={(e) => {
                  setHex(e.target.value);
                  setHexInput(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <div>
              <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                HEX
              </label>
              <input
                className="mt-1 w-full px-3 py-2 rounded-xl text-sm font-mono bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white focus:outline-none focus:border-pink-400 dark:focus:border-pink-600 transition-colors"
                value={hexInput}
                onChange={(e) => applyHex(e.target.value)}
              />
            </div>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
              Haz clic en el cuadro de color para abrir el selector
            </p>
          </div>
        </div>

        {/* Converted values */}
        {rgb && hsl && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <CopyBtn label="HEX" val={hex.toUpperCase()} />
            <CopyBtn label="RGB" val={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
            <CopyBtn label="HSL" val={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
          </div>
        )}

        {/* Sliders for RGB */}
        {rgb && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              Ajustar RGB
            </p>
            {(["r", "g", "b"] as const).map((ch, idx) => {
              const colors = ["#ef4444", "#22c55e", "#3b82f6"];
              const labels = ["Rojo", "Verde", "Azul"];

              return (
                <div key={ch} className="flex items-center gap-3">
                  <span
                    className="text-xs font-mono font-bold w-12 text-[#1d1d1f] dark:text-white"
                    style={{ color: colors[idx] }}
                  >
                    {labels[idx]}
                  </span>
                  <input
                    className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
                    max={255}
                    min={0}
                    type="range"
                    value={rgb[ch]}
                    onChange={(e) => {
                      const newRgb = { ...rgb, [ch]: +e.target.value };
                      const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);

                      setHex(newHex);
                      setHexInput(newHex);
                    }}
                  />
                  <span className="text-xs font-mono w-8 text-right text-[#6e6e73] dark:text-[#86868b]">
                    {rgb[ch]}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Palettes */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            Paletas predefinidas
          </p>
          {PALETTES.map((pal) => (
            <div key={pal.name}>
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mb-1.5">
                {pal.name}
              </p>
              <div className="flex gap-1.5">
                {pal.colors.map((c) => (
                  <button
                    key={c}
                    className={`h-8 flex-1 rounded-lg border-2 transition-all ${hex === c ? "border-black/30 dark:border-white/30 scale-110" : "border-transparent hover:scale-105"}`}
                    style={{ backgroundColor: c }}
                    title={c}
                    onClick={() => {
                      setHex(c);
                      setHexInput(c);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
