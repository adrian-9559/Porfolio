"use client";
import { Divider } from "./shared";

import {
  BlogCallout,
  BlogH3,
  BlogLi,
  BlogP,
  BlogUl,
} from "@/components/blog/shared";

const hardwareTiers = [
  {
    tier: "Básico",
    ram: "8 GB RAM",
    icon: "💻",
    color: "emerald",
    models: [
      {
        name: "Phi-4 Mini",
        size: "3.8B",
        desc: "Ligero, rápido, ideal para chat básico",
      },
      {
        name: "Qwen 3 7B",
        size: "7B",
        desc: "Buen equilibrio entre tamaño y capacidad",
      },
      {
        name: "Gemma 3 4B",
        size: "4B",
        desc: "Eficiente en CPU, buena para asistencia simple",
      },
    ],
    use: "chat básico, tareas ligeras, asistencia simple",
  },
  {
    tier: "Estándar",
    ram: "12–16 GB RAM",
    icon: "💻",
    color: "blue",
    models: [
      {
        name: "Mistral Small 3",
        size: "7B",
        desc: "Rápido y capaz, excelente para desarrollo",
      },
      {
        name: "Qwen 3 14B",
        size: "14B",
        desc: "Razonamiento sólido, buena comprensión de código",
      },
      {
        name: "DeepSeek Coder 14B",
        size: "14B (quantized)",
        desc: "Especializado en código, tool calling fiable",
      },
    ],
    use: "programación, debugging, asistencia real de desarrollo",
  },
  {
    tier: "Avanzado",
    ram: "24 GB VRAM",
    icon: "🖥️",
    color: "purple",
    models: [
      {
        name: "Qwen 3 32B",
        size: "32B",
        desc: "Razonamiento profundo, cerca de GPT-4 en calidad",
      },
      {
        name: "DeepSeek R1 Distill 32B",
        size: "32B",
        desc: "Razonamiento paso a paso, excelente para análisis",
      },
      {
        name: "Llama 3/4 70B",
        size: "70B (quantized)",
        desc: "Modelo grande con capacidad generalista superior",
      },
    ],
    use: "arquitectura software, análisis complejo, reasoning avanzado",
  },
  {
    tier: "Workstation",
    ram: "48+ GB VRAM",
    icon: "🖥️",
    color: "amber",
    models: [
      {
        name: "Llama 4 Maverick",
        size: ">100B",
        desc: "Modelo frontier open-source de Meta",
      },
      {
        name: "DeepSeek R1 full",
        size: ">100B",
        desc: "Razonamiento completo sin destilar",
      },
      {
        name: "MoE models",
        size: ">100B",
        desc: "Qwen, GLM y variantes Mixture of Experts",
      },
    ],
    use: "investigación avanzada, análisis masivo de código, sistemas complejos",
  },
];

function TierCard({
  tier,
  ram,
  icon,
  models,
  use,
}: (typeof hardwareTiers)[number]) {
  return (
    <div className="rounded-xl border border-black/8 dark:border-white/8 p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <div>
          <p className="text-sm font-bold text-[#1d1d1f] dark:text-white">
            {tier}
          </p>
          <p className="text-[10px] font-mono text-[#6e6e73] dark:text-[#86868b]">
            {ram}
          </p>
        </div>
      </div>
      <div className="space-y-2 mb-3">
        {models.map((m) => (
          <div key={m.name} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0 mt-1.5" />
            <div>
              <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
                {m.name}{" "}
                <span className="text-[10px] font-mono text-[#6e6e73]">
                  ({m.size})
                </span>
              </p>
              <p className="text-[11px] text-[#6e6e73] dark:text-[#86868b]">
                {m.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-2 border-t border-black/5 dark:border-white/5">
        <p className="text-[10px] text-[#6e6e73] dark:text-[#86868b]">
          <span className="font-semibold text-[#1d1d1f] dark:text-white">
            Uso:
          </span>{" "}
          {use}
        </p>
      </div>
    </div>
  );
}

export function SectionLocalModels() {
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <svg
            className="w-5 h-5"
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
        <div>
          <p className="text-base font-bold text-[#1d1d1f] dark:text-white">
            Modelos Locales
          </p>
          <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
            Ecosistema open-source: descarga, hardware y alternativas
          </p>
        </div>
      </div>

      <BlogP>
        <strong>No confundas el runtime con el modelo.</strong> Ollama ejecuta
        modelos, pero los modelos son archivos independientes. Aquí tienes todo
        lo que necesitas saber sobre el ecosistema de modelos locales.
      </BlogP>

      <Divider />

      <BlogH3>Dónde descargar modelos</BlogH3>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 my-4">
        {[
          {
            name: "Ollama Registry",
            url: "ollama.com/library",
            desc: "Catálogo oficial. Un solo comando para descargar y ejecutar.",
          },
          {
            name: "HuggingFace",
            url: "huggingface.co/models",
            desc: "El repositorio más grande. Millones de modelos open-source.",
          },
          {
            name: "LM Studio",
            url: "lmstudio.ai",
            desc: "Interfaz gráfica para explorar y descargar modelos.",
          },
          {
            name: "Repos oficiales",
            url: "Meta / Mistral / DeepSeek / Google",
            desc: "Descarga directa de los creadores de los modelos.",
          },
        ].map(({ name, url, desc }) => (
          <div
            key={name}
            className="rounded-xl border border-black/8 dark:border-white/8 p-4"
          >
            <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-1">
              {name}
            </p>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mb-2">
              {desc}
            </p>
            <p className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
              {url}
            </p>
          </div>
        ))}
      </div>

      <Divider />

      <BlogH3>Modelos más usados en 2026 según hardware</BlogH3>
      <BlogP>
        Elige según la capacidad de tu equipo. Cada escalón te da acceso a
        modelos más capaces:
      </BlogP>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        {hardwareTiers.map((tier) => (
          <TierCard key={tier.tier} {...tier} />
        ))}
      </div>

      <Divider />

      <BlogH3>Tipos de modelos</BlogH3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {[
          {
            name: "💻 Código",
            desc: "DeepSeek Coder, Code Llama — especializados en generación y comprensión de código",
            color: "emerald",
          },
          {
            name: "🧠 Razonamiento",
            desc: "DeepSeek R1 — modelos con chain-of-thought para análisis profundo",
            color: "purple",
          },
          {
            name: "🌐 Generalistas",
            desc: "Llama, Mistral — versátiles para tareas variadas",
            color: "blue",
          },
          {
            name: "🖼️ Multimodales",
            desc: "LLaVA, Gemma Vision — soporte de imágenes además de texto",
            color: "violet",
          },
          {
            name: "⚡ Ligeros",
            desc: "Phi series — modelos pequeños que funcionan en CPU sin GPU",
            color: "amber",
          },
        ].map(({ name, desc }) => (
          <div
            key={name}
            className="rounded-xl border border-black/8 dark:border-white/8 p-4"
          >
            <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-1">
              {name}
            </p>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">{desc}</p>
          </div>
        ))}
      </div>

      <Divider />

      <BlogH3>Memoria, contexto y cuantización</BlogH3>
      <BlogUl>
        <BlogLi>
          <strong>Contexto:</strong> los modelos locales soportan 8k–128k
          tokens. A más contexto, más VRAM necesitas. Qwen 3 Coder llega a 128k
          pero consume mucha memoria
        </BlogLi>
        <BlogLi>
          <strong>Cuantización (Q4, Q8):</strong> reduce el tamaño del modelo
          50–75% con pérdida mínima de calidad. Ollama descarga versiones
          cuantizadas automáticamente
        </BlogLi>
        <BlogLi>
          <strong>Tool calling:</strong> no todos los modelos locales llaman
          herramientas correctamente. Los mejores: Qwen 3 Coder, DeepSeek Coder,
          Llama 3
        </BlogLi>
        <BlogLi>
          <strong>Persistencia:</strong> OpenCode gestiona la historia
          localmente. Al superar el límite de contexto, compacta la sesión
          automáticamente
        </BlogLi>
      </BlogUl>

      <Divider />

      <BlogH3>Soporte de visión</BlogH3>
      <BlogP>
        No todos los modelos locales soportan imágenes. Solo versiones
        específicas marcadas como <strong>"Vision"</strong> o{" "}
        <strong>"Multimodal"</strong>:
      </BlogP>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {[
          {
            name: "Llama 3.2 Vision",
            vision: "✅ 11B, soporta imágenes",
            type: "multimodal",
          },
          {
            name: "LLaVA / BakLLaVA",
            vision: "✅ Especializados en visión",
            type: "multimodal",
          },
          {
            name: "Gemma 3n",
            vision: "⚠️ Versión multimodal existe",
            type: "limited",
          },
          { name: "Qwen 3 Coder", vision: "❌ Solo texto", type: "text" },
          { name: "DeepSeek Coder", vision: "❌ Solo texto", type: "text" },
          { name: "Mistral", vision: "❌ Solo texto", type: "text" },
        ].map(({ name, vision, type }) => (
          <div
            key={name}
            className={`rounded-xl border p-4 ${type === "multimodal" ? "border-emerald-200 dark:border-emerald-800/40" : "border-black/8 dark:border-white/8"}`}
          >
            <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white mb-1">
              {name}
            </p>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
              {vision}
            </p>
          </div>
        ))}
      </div>

      <BlogCallout type="warn">
        Para tool-calling fiable en local, elige <strong>Qwen 3 Coder</strong> o{" "}
        <strong>DeepSeek Coder</strong>. Ambos funcionan cuantizados en GPUs de
        8 GB VRAM.
      </BlogCallout>
    </>
  );
}
