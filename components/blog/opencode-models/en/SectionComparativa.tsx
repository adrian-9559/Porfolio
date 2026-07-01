"use client";
import { Divider } from "./shared";

import { BlogH2, BlogP } from "@/components/blog/shared";

const providers = [
  {
    name: "OpenAI",
    color: "blue",
    badge: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    rows: {
      code: "⭐⭐⭐⭐⭐",
      design: "⭐⭐⭐⭐⭐",
      general: "⭐⭐⭐⭐⭐",
      local: "—",
      vision: "✅ Native",
      contexto: "128k tokens",
      velocidad: "⭐⭐⭐⭐",
      coste: "Medium–High",
    },
  },
  {
    name: "Anthropic",
    color: "orange",
    badge:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    rows: {
      code: "⭐⭐⭐⭐⭐",
      design: "⭐⭐⭐⭐",
      general: "⭐⭐⭐⭐⭐",
      local: "—",
      vision: "⚠️ Partial",
      contexto: "200k tokens",
      velocidad: "⭐⭐⭐",
      coste: "Medium–High",
    },
  },
  {
    name: "GitHub Copilot",
    color: "violet",
    badge:
      "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
    rows: {
      code: "⭐⭐⭐⭐",
      design: "⭐⭐⭐",
      general: "⭐⭐⭐",
      local: "—",
      vision: "⚠️ Depends on model",
      contexto: "Variable",
      velocidad: "⭐⭐⭐⭐",
      coste: "Included in subscription",
    },
  },
  {
    name: "Ollama (local)",
    color: "amber",
    badge:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    rows: {
      code: "⭐⭐⭐⭐",
      design: "⭐⭐⭐",
      general: "⭐⭐⭐",
      local: "✅ Yes",
      vision: "⚠️ Depends on model",
      contexto: "8k–128k tokens",
      velocidad: "⭐⭐⭐⭐⭐",
      coste: "Free (just HW)",
    },
  },
];

const labels = [
  { key: "code", label: "Code" },
  { key: "design", label: "Design / Creativity" },
  { key: "general", label: "Overall balance" },
  { key: "local", label: "Local / Offline" },
  { key: "vision", label: "Vision" },
  { key: "contexto", label: "Max context" },
  { key: "velocidad", label: "Speed" },
  { key: "coste", label: "Cost" },
] as const;

export function SectionComparativa() {
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
        <div>
          <p className="text-base font-bold text-[#1d1d1f] dark:text-white">
            Comparison
          </p>
          <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
            Cloud vs local, all options head to head
          </p>
        </div>
      </div>

      <BlogP>
        Each provider has different strengths. This table helps you
        quickly compare the options available in OpenCode.
      </BlogP>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <th className="text-left font-semibold py-3 px-3 text-[#1d1d1f] dark:text-white">
                Feature
              </th>
              {providers.map((p) => (
                <th
                  key={p.name}
                  className="text-left font-semibold py-3 px-3 text-[#1d1d1f] dark:text-white"
                >
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {labels.map(({ key, label }, i) => (
              <tr
                key={key}
                className={`${i < labels.length - 1 ? "border-b border-black/5 dark:border-white/5" : ""}`}
              >
                <td className="py-2.5 px-3 font-medium text-[#1d1d1f] dark:text-white text-xs whitespace-nowrap">
                  {label}
                </td>
                {providers.map((p) => {
                  const val = p.rows[key as keyof typeof p.rows];
                  const isPositive =
                    typeof val === "string" && val.startsWith("⭐⭐⭐⭐⭐");

                  return (
                    <td
                      key={p.name}
                      className={`py-2.5 px-3 text-xs ${isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-[#3a3a3c] dark:text-[#aeaeb2]"}`}
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <BlogH2>Cloud vs Local</BlogH2>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <th className="text-left font-semibold py-2 px-3 text-[#1d1d1f] dark:text-white" />
              <th className="text-left font-semibold py-2 px-3 text-[#1d1d1f] dark:text-white">
                Cloud (API)
              </th>
              <th className="text-left font-semibold py-2 px-3 text-[#1d1d1f] dark:text-white">
                Local (Ollama, etc.)
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                feature: "Model quality",
                cloud: "⭐⭐⭐⭐⭐",
                local: "⭐⭐⭐",
              },
              {
                feature: "Operating cost",
                cloud: "Per token",
                local: "Electricity + HW only",
              },
              {
                feature: "Privacy",
                cloud: "Your data goes to the provider",
                local: "100% offline",
              },
              {
                feature: "Latency",
                cloud: "Depends on network",
                local: "Instant",
              },
              {
                feature: "Max context",
                cloud: "Up to 200k tokens",
                local: "8k–128k depending on model",
              },
              {
                feature: "Vision",
                cloud: "✅ Full",
                local: "⚠️ Specific models only",
              },
            ].map(({ feature, cloud, local }) => (
              <tr
                key={feature}
                className="border-b border-black/5 dark:border-white/5"
              >
                <td className="py-2 px-3 font-medium text-[#1d1d1f] dark:text-white text-xs">
                  {feature}
                </td>
                <td className="py-2 px-3 text-[#3a3a3c] dark:text-[#aeaeb2] text-xs">
                  {cloud}
                </td>
                <td className="py-2 px-3 text-[#3a3a3c] dark:text-[#aeaeb2] text-xs">
                  {local}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
