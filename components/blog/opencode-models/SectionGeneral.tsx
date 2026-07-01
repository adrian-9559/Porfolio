"use client";
import { Divider } from "./shared";

import {
  BlogCallout,
  BlogH2,
  BlogH3,
  BlogInlineCode,
  BlogP,
} from "@/components/blog/shared";

export function SectionGeneral() {
  return (
    <>
      <BlogH2>Vista general</BlogH2>

      <BlogP>
        OpenCode no es un producto cerrado con un solo modelo. Está construido
        sobre <strong>AI SDK</strong> y <strong>Models.dev</strong>, lo que le
        da acceso a <strong>más de 75 proveedores</strong> de modelos de
        lenguaje. Puedes elegir qué modelo usar según la tarea, tu presupuesto y
        tus preferencias, cambiando sobre la marcha con{" "}
        <BlogInlineCode>/models</BlogInlineCode>.
      </BlogP>

      <BlogCallout type="info">
        Actualmente usas <strong>DeepSeek V4 Flash Free</strong>. Es un modelo
        excelente para código, pero puedes explorar otros según la tarea. Usa
        las pestañas de arriba para ver cada proveedor en detalle.
      </BlogCallout>

      <BlogH3>¿Cómo elegir un modelo?</BlogH3>
      <BlogP>
        No hay un modelo perfecto para todo. La decisión depende de cuatro
        factores:
      </BlogP>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {[
          {
            icon: "💻",
            title: "Tipo de tarea",
            desc: "¿Es código puro, creatividad, análisis o debugging?",
          },
          {
            icon: "💰",
            title: "Presupuesto",
            desc: "Modelos cloud (pago por token) vs modelos locales (gratis, coste de hardware)",
          },
          {
            icon: "🔌",
            title: "Conectividad",
            desc: "¿Necesitas trabajar offline? ¿Tienes datos sensibles?",
          },
          {
            icon: "⚡",
            title: "Velocidad vs calidad",
            desc: "Modelos pequeños responden más rápido; los grandes razonan mejor.",
          },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            className="flex gap-3 rounded-xl border border-black/8 dark:border-white/8 p-4"
          >
            <p className="text-lg shrink-0">{icon}</p>
            <div>
              <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-0.5">
                {title}
              </p>
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <BlogH3>Modelos cloud vs locales</BlogH3>
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
                cloud: "✅ Modelos multimodales",
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

      <Divider />

      <BlogH2>Comparativa rápida</BlogH2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div className="rounded-xl border border-blue-200 dark:border-blue-800/40 p-5 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20">
          <p className="text-lg mb-2">💻</p>
          <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">
            Mejor para código
          </p>
          <p className="text-xs text-blue-700/80 dark:text-blue-400/80 mb-1">
            DeepSeek Coder V2 / Claude Sonnet 4.5
          </p>
          <p className="text-xs text-blue-600/70 dark:text-blue-400/70">
            Tool calling fiable, comprensión de proyectos grandes, generación
            precisa. El <strong>GPT-5.1 Codex</strong> también es excelente.
          </p>
        </div>
        <div className="rounded-xl border border-orange-200 dark:border-orange-800/40 p-5 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
          <p className="text-lg mb-2">🎨</p>
          <p className="text-sm font-bold text-orange-800 dark:text-orange-300 mb-1">
            Mejor diseño / creatividad
          </p>
          <p className="text-xs text-orange-700/80 dark:text-orange-400/80 mb-1">
            GPT-5.2 / Claude Opus 4.5
          </p>
          <p className="text-xs text-orange-600/70 dark:text-orange-400/70">
            Mejor comprensión de matices, creatividad y contexto largo. Ideales
            para UI, copywriting y lluvia de ideas.
          </p>
        </div>
        <div className="rounded-xl border border-violet-200 dark:border-violet-800/40 p-5 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
          <p className="text-lg mb-2">⚖️</p>
          <p className="text-sm font-bold text-violet-800 dark:text-violet-300 mb-1">
            Mejor equilibrio general
          </p>
          <p className="text-xs text-violet-700/80 dark:text-violet-400/80 mb-1">
            Claude Sonnet 4.5 / Minimax M2.1
          </p>
          <p className="text-xs text-violet-600/70 dark:text-violet-400/70">
            Balance óptimo entre velocidad, calidad y coste para el día a día.
            Recomendado para la mayoría de tareas.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/40 p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
          <p className="text-lg mb-2">🖥️</p>
          <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-1">
            Mejor local / offline
          </p>
          <p className="text-xs text-emerald-700/80 dark:text-emerald-400/80 mb-1">
            Qwen 3 Coder / DeepSeek Coder V2
          </p>
          <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70">
            Open-source con tool calling fiable. Funcionan con 8–16 GB VRAM
            cuantizados. Ideal para trabajo offline o datos sensibles.
          </p>
        </div>
      </div>

      <BlogCallout type="done">
        Los modelos recomendados por el equipo de OpenCode:{" "}
        <strong>
          GPT 5.2, GPT 5.1 Codex, Claude Opus 4.5, Claude Sonnet 4.5, Minimax
          M2.1 y Gemini 3 Pro
        </strong>
        .
      </BlogCallout>

      <div className="rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 p-5 my-6 text-white">
        <p className="text-sm font-bold mb-1">Explora cada proveedor</p>
        <p className="text-xs text-white/80">
          Usa las pestañas de arriba para ver la guía completa de cada
          proveedor: integración paso a paso, configuración, casos de uso y
          capacidades.
        </p>
      </div>
    </>
  );
}
