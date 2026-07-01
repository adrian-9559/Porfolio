"use client";
import { BlogP } from "@/components/blog/shared";

const restrictions = [
  {
    name: "Visión / Multimodal",
    desc: "No todos los modelos ven imágenes. Los que sí (GPT-5, Claude Opus, Llama 3.2 Vision) entienden screenshots, diagramas o fotos. Los que no (DeepSeek Coder, Mistral), solo texto.",
  },
  {
    name: "Tool calling",
    desc: "Capacidad de ejecutar herramientas (leer archivos, buscar web, ejecutar código). OpenAI, Anthropic y Qwen 3 Coder son fiables. Modelos pequeños o antiguos fallan aquí.",
  },
  {
    name: "Contexto máximo",
    desc: "Ventana de tokens que el modelo procesa de una vez. Claude Opus llega a 200k tokens (~150k palabras). Modelos locales suelen quedarse en 8k–32k. Superarlo corta la conversación.",
  },
  {
    name: "Estructura de salida",
    desc: "OpenCode pide respuestas estructuradas (JSON, listas, código). Algunos modelos no siguen bien estos formatos. GPT y Claude son los mejores; modelos pequeños pueden ignorar instrucciones.",
  },
  {
    name: "Idioma",
    desc: "Modelos entrenados mayoritariamente en inglés funcionan peor en español. Claude, GPT y Llama tienen buen soporte multilingüe. Modelos más pequeños o especializados pueden alucinar más en español.",
  },
];

export function SectionIntro() {
  return (
    <div className="space-y-5 mb-8">
      <div className="rounded-2xl border border-black/8 dark:border-white/8 p-6 bg-gradient-to-b from-transparent via-violet-50/30 to-transparent dark:via-violet-950/10">
        <BlogP>
          <strong>Los modelos de lenguaje</strong> (LLMs) son el cerebro de
          OpenCode. Son redes neuronales entrenadas con grandes volúmenes de
          texto y código que entienden instrucciones, razonan, generan código y
          ejecutan tareas complejas. OpenCode actúa como el{" "}
          <strong>orquestador</strong>: tú eliges qué modelo usar según tus
          necesidades y presupuesto.
        </BlogP>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-blue-200 dark:border-blue-800/40 p-4 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <svg
                className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <p className="text-sm font-bold text-[#1d1d1f] dark:text-white">
              Cloud (API)
            </p>
          </div>
          <ul className="space-y-1">
            {[
              "Modelos más potentes y grandes (LLaMA 4 de 100B+ parámetros)",
              "Sin límite de hardware — el servidor del proveedor lo ejecuta",
              "Pago por uso (por token) — ideal si no tienes GPU potente",
              "Requiere conexión a internet y una API key",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-1.5 text-xs text-[#3a3a3c] dark:text-[#aeaeb2]"
              >
                <span className="text-blue-500 shrink-0 mt-0.5">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/40 p-4 bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-950/10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <svg
                className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <p className="text-sm font-bold text-[#1d1d1f] dark:text-white">
              Local (Ollama)
            </p>
          </div>
          <ul className="space-y-1">
            {[
              "Ejecutas el modelo en tu máquina — sin enviar datos a terceros",
              "Gratis (solo electricidad + coste del hardware)",
              "Modelos más pequeños (3.8B – 70B parámetros cuantizados)",
              "Limitado por tu GPU/VRAM — rendimiento según tu equipo",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-1.5 text-xs text-[#3a3a3c] dark:text-[#aeaeb2]"
              >
                <span className="text-emerald-500 shrink-0 mt-0.5">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <p className="text-sm font-bold text-[#1d1d1f] dark:text-white mb-3">
          Restricciones a tener en cuenta
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {restrictions.map((r) => (
            <div
              key={r.name}
              className="rounded-xl border border-black/8 dark:border-white/8 p-3"
            >
              <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white mb-0.5">
                {r.name}
              </p>
              <p className="text-[11px] text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
