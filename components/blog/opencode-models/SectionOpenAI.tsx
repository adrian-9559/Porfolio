"use client";
import { CapabilitiesCard, Divider, Step, UseCaseCard } from "./shared";

import {
  BlogCallout,
  BlogCode,
  BlogH3,
  BlogInlineCode,
  BlogP,
} from "@/components/blog/shared";

export function SectionOpenAI() {
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M13 10V3L4 14h7v7l9-11h-7z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
        <div>
          <p className="text-base font-bold text-[#1d1d1f] dark:text-white">
            OpenAI (GPT)
          </p>
          <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
            Modelos multimodales con razonamiento y creatividad
          </p>
        </div>
      </div>

      <BlogH3>Qué es OpenAI</BlogH3>
      <BlogP>
        OpenAI es la empresa creadora de los modelos <strong>GPT</strong>{" "}
        (Generative Pre-trained Transformer). Sus modelos son multimodales
        (texto + imágenes), con capacidades avanzadas de razonamiento,
        generación de código y comprensión de contexto largo. Son la opción más
        popular para tareas que requieren equilibrio entre creatividad y
        precisión.
      </BlogP>

      <BlogH3>Tipos de modelos</BlogH3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        {[
          {
            icon: "🧠",
            title: "Generalistas",
            desc: "GPT-5, GPT-5.2 — ideales para el día a día, conversación general, análisis y razonamiento versátil.",
            color: "blue",
          },
          {
            icon: "💻",
            title: "Código",
            desc: "GPT-5.1 Codex — optimizado para generación, comprensión y depuración de código con tool calling avanzado.",
            color: "violet",
          },
          {
            icon: "🖼️",
            title: "Multimodales",
            desc: "Todos los modelos GPT soportan imágenes de forma nativa. Ideales para análisis de capturas, diagramas y documentos.",
            color: "teal",
          },
        ].map(({ icon, title, desc, color }) => {
          const border =
            color === "teal"
              ? "border-teal-200 dark:border-teal-800/40"
              : `border-${color}-200 dark:border-${color}-800/40`;

          return (
            <div key={title} className={`rounded-xl border ${border} p-4`}>
              <p className="text-lg mb-2">{icon}</p>
              <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-1">
                {title}
              </p>
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
                {desc}
              </p>
            </div>
          );
        })}
      </div>

      <CapabilitiesCard
        items={[
          { label: "Razonamiento", value: "⭐⭐⭐⭐⭐", positive: true },
          { label: "Velocidad", value: "⭐⭐⭐⭐", positive: true },
          { label: "Calidad de código", value: "⭐⭐⭐⭐⭐", positive: true },
          { label: "Contexto / Memoria", value: "128k tokens", positive: true },
          { label: "Visión", value: "✅ Sí (nativo)", positive: true },
          { label: "Coste", value: "Medio–Alto" },
        ]}
      />

      <Divider />

      <BlogH3>Integración en OpenCode</BlogH3>

      <Step number={1} title="Configura tu API Key">
        <BlogP>
          OpenCode se conecta a OpenAI mediante API key o autenticación OAuth
          con ChatGPT Plus/Pro:
        </BlogP>
        <BlogCode>{`{
  "provider": {
    "openai": {
      "options": {
        "apiKey": "{env:OPENAI_API_KEY}"
      }
    }
  }
}`}</BlogCode>
      </Step>

      <Step number={2} title="Selecciona un modelo">
        <BlogP>
          Ejecuta <BlogInlineCode>/connect</BlogInlineCode> para autenticarte,
          luego <BlogInlineCode>/models</BlogInlineCode> para ver los modelos
          disponibles.
        </BlogP>
      </Step>

      <Step number={3} title="Ajusta el razonamiento">
        <BlogP>
          OpenAI soporta niveles de{" "}
          <BlogInlineCode>reasoningEffort</BlogInlineCode> que puedes ajustar
          según la tarea:
        </BlogP>
        <BlogCode>{`{
  "provider": {
    "openai": {
      "models": {
        "gpt-5": {
          "options": {
            "reasoningEffort": "high",
            "textVerbosity": "low"
          }
        }
      }
    }
  }
}`}</BlogCode>
      </Step>

      <Divider />

      <BlogH3>Casos de uso</BlogH3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        <UseCaseCard
          desc="Generación de código, refactorización, debugging y code review con GPT-5.1 Codex."
          icon="💻"
          title="Programación"
        />
        <UseCaseCard
          desc="UI/UX copywriting, naming, brainstorming y contenido multimedia con GPT-5.2."
          icon="🎨"
          title="Diseño / Creatividad"
        />
        <UseCaseCard
          desc="Scripts, pipelines, migraciones y tareas repetitivas con razonamiento fuerte."
          icon="⚡"
          title="Automatización"
        />
      </div>

      <BlogCallout type="tip">
        Para programación pura, usa <strong>GPT-5.1 Codex</strong>. Para tareas
        creativas o análisis complejo, <strong>GPT-5.2</strong> ofrece mejor
        razonamiento.
      </BlogCallout>
    </>
  );
}
