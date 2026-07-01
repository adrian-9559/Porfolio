"use client";
import { useState } from "react";

const cases = [
  { id: "lower", label: "lowercase", fn: (s: string) => s.toLowerCase() },
  { id: "upper", label: "UPPERCASE", fn: (s: string) => s.toUpperCase() },
  {
    id: "camel",
    label: "camelCase",
    fn: (s: string) =>
      s
        .replace(/[-_\s]+(.)/g, (_, c) => c.toUpperCase())
        .replace(/^[A-Z]/, (c) => c.toLowerCase()),
  },
  {
    id: "pascal",
    label: "PascalCase",
    fn: (s: string) =>
      s
        .replace(/[-_\s]+(.)/g, (_, c) => c.toUpperCase())
        .replace(/^./, (c) => c.toUpperCase()),
  },
  {
    id: "snake",
    label: "snake_case",
    fn: (s: string) => s.replace(/\s+/g, "_").replace(/-+/g, "_").toLowerCase(),
  },
  {
    id: "kebab",
    label: "kebab-case",
    fn: (s: string) => s.replace(/[\s_]+/g, "-").toLowerCase(),
  },
  {
    id: "title",
    label: "Title Case",
    fn: (s: string) =>
      s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()),
  },
  {
    id: "constant",
    label: "CONSTANT_CASE",
    fn: (s: string) => s.replace(/[\s-]+/g, "_").toUpperCase(),
  },
] as const;

export default function CaseConverterContent() {
  const [input, setInput] = useState("");
  const [active, setActive] = useState("camel");
  const [copied, setCopied] = useState(false);

  const current = cases.find((c) => c.id === active);
  const output = current ? current.fn(input) : input;

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50">
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
          Conversor de mayúsculas
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          Convierte textos entre camelCase, snake_case, kebab-case, PascalCase y
          más.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.04]">
          {cases.map((c) => (
            <button
              key={c.id}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${active === c.id ? "bg-white dark:bg-[#1c1c22] text-rose-600 dark:text-rose-400 shadow-sm" : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"}`}
              onClick={() => setActive(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            Texto original
          </p>
          <textarea
            className="w-full h-24 p-3 text-sm font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:border-rose-400 dark:focus:border-rose-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
            placeholder="mi texto de ejemplo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {input && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {current?.label}
              </p>
              <button
                className="text-xs text-rose-600 dark:text-rose-400 hover:underline"
                onClick={copy}
              >
                {copied ? "¡Copiado!" : "Copiar"}
              </button>
            </div>
            <div className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 font-mono text-sm text-[#1d1d1f] dark:text-white break-all">
              {output}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
