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
      vision: "✅ Nativo",
      contexto: "128k tokens",
      velocidad: "⭐⭐⭐⭐",
      coste: "Medio–Alto",
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
      vision: "⚠️ Parcial",
      contexto: "200k tokens",
      velocidad: "⭐⭐⭐",
      coste: "Medio–Alto",
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
      vision: "⚠️ Según modelo",
      contexto: "Variable",
      velocidad: "⭐⭐⭐⭐",
      coste: "Incluido suscripción",
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
      local: "✅ Sí",
      vision: "⚠️ Según modelo",
      contexto: "8k–128k tokens",
      velocidad: "⭐⭐⭐⭐⭐",
      coste: "Gratis (solo HW)",
    },
  },
];

const labels = [
  { key: "code", label: "Código" },
  { key: "design", label: "Diseño / Creatividad" },
  { key: "general", label: "Equilibrio general" },
  { key: "local", label: "Local / Offline" },
  { key: "vision", label: "Visión" },
  { key: "contexto", label: "Contexto máximo" },
  { key: "velocidad", label: "Velocidad" },
  { key: "coste", label: "Coste" },
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
            Comparativa
          </p>
          <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
            Cloud vs local, todas las opciones cara a cara
          </p>
        </div>
      </div>

      <BlogP>
        Cada proveedor tiene fortalezas distintas. Esta tabla te ayuda a
        comparar rápida las opciones disponibles en OpenCode.
      </BlogP>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <th className="text-left font-semibold py-3 px-3 text-[#1d1d1f] dark:text-white">
                Característica
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
                feature: "Calidad del modelo",
                cloud: "⭐⭐⭐⭐⭐",
                local: "⭐⭐⭐",
              },
              {
                feature: "Coste operativo",
                cloud: "Por token",
                local: "Solo electricidad + HW",
              },
              {
                feature: "Privacidad",
                cloud: "Tus datos van al proveedor",
                local: "100% offline",
              },
              {
                feature: "Latencia",
                cloud: "Depende de red",
                local: "Instantáneo",
              },
              {
                feature: "Contexto máximo",
                cloud: "Hasta 200k tokens",
                local: "8k–128k según modelo",
              },
              {
                feature: "Visión",
                cloud: "✅ Completa",
                local: "⚠️ Solo modelos específicos",
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
