"use client";
import { CapabilitiesCard, Divider, Step } from "./shared";

import {
  BlogCallout,
  BlogCode,
  BlogH3,
  BlogInlineCode,
  BlogLi,
  BlogP,
  BlogUl,
} from "@/components/blog/shared";

export function SectionAnthropic() {
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
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
            Anthropic (Claude)
          </p>
          <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
            Razonamiento profundo y escritura estructurada
          </p>
        </div>
      </div>

      <BlogH3>Qué es Claude</BlogH3>
      <BlogP>
        Anthropic es la empresa creadora de <strong>Claude</strong>, una familia
        de modelos conocidos por su excelente razonamiento, generación de código
        limpio y manejo de contexto largo. Claude destaca por su enfoque en{" "}
        <strong>seguridad y escritura estructurada</strong>, siendo la opción
        favorita de muchos desarrolladores para tareas complejas de ingeniería.
      </BlogP>

      <CapabilitiesCard
        items={[
          { label: "Razonamiento", value: "⭐⭐⭐⭐⭐", positive: true },
          { label: "Velocidad", value: "⭐⭐⭐ (Sonnet) / ⭐⭐ (Opus)" },
          { label: "Calidad de código", value: "⭐⭐⭐⭐⭐", positive: true },
          { label: "Contexto / Memoria", value: "200k tokens", positive: true },
          {
            label: "Visión",
            value: "⚠️ Parcial (Sonnet/Opus)",
            positive: false,
          },
          { label: "Thinking budget", value: "Configurable" },
        ]}
      />

      <Divider />

      <BlogH3>Integración en OpenCode</BlogH3>

      <Step number={1} title="Configura tu API Key">
        <BlogP>
          Ejecuta <BlogInlineCode>/connect</BlogInlineCode>, selecciona
          Anthropic y elige entre OAuth (Claude Pro/Max) o API key manual:
        </BlogP>
        <BlogCode>{`{
  "provider": {
    "anthropic": {
      "options": {
        "apiKey": "{env:ANTHROPIC_API_KEY}",
        "setCacheKey": true
      }
    }
  }
}`}</BlogCode>
      </Step>

      <Step number={2} title="Configura modelo principal y ligero">
        <BlogP>
          OpenCode permite usar un modelo{" "}
          <BlogInlineCode>small_model</BlogInlineCode> para tareas secundarias:
        </BlogP>
        <BlogCode>{`{
  "model": "anthropic/claude-sonnet-4-5",
  "small_model": "anthropic/claude-haiku-4-5"
}`}</BlogCode>
      </Step>

      <Step number={3} title="Ajusta el thinking budget">
        <BlogP>
          Claude soporta <strong>thinking extendido</strong> para razonamiento
          profundo. Configura el presupuesto de tokens:
        </BlogP>
        <BlogCode>{`{
  "provider": {
    "anthropic": {
      "models": {
        "claude-sonnet-4-5": {
          "options": {
            "thinking": {
              "type": "enabled",
              "budgetTokens": 16000
            }
          }
        }
      }
    }
  }
}`}</BlogCode>
      </Step>

      <Divider />

      <BlogH3>Casos de uso</BlogH3>
      <BlogUl>
        <BlogLi>
          <strong>Arquitectura de software:</strong> diseño de sistemas,
          planificación de proyectos, análisis de trade-offs y documentación
          técnica
        </BlogLi>
        <BlogLi>
          <strong>Debugging complejo:</strong> análisis de stack traces largos,
          detección de causas raíz en proyectos con múltiples capas de
          abstracción
        </BlogLi>
        <BlogLi>
          <strong>Documentación técnica:</strong> genera documentación de API,
          guías de contribución y JSDocs coherentes con el estilo del proyecto
        </BlogLi>
        <BlogLi>
          <strong>Refactorización:</strong> migrar entre lenguajes, dividir
          monolitos, aplicar patrones de diseño
        </BlogLi>
      </BlogUl>

      <BlogH3>Fortalezas clave</BlogH3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        {[
          {
            icon: "🧠",
            title: "Razonamiento profundo",
            desc: "Claude destaca en tareas que requieren pensar paso a paso: debugging complejo, análisis de código, planificación arquitectónica.",
          },
          {
            icon: "🧹",
            title: "Código limpio",
            desc: "Genera código bien estructurado, con naming coherente y siguiendo las convenciones del proyecto existente.",
          },
          {
            icon: "🔧",
            title: "Tool calling",
            desc: "Claude es el modelo más fiable en llamadas a herramientas. Rara vez alucina o se salta pasos en flujos complejos.",
          },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            className="rounded-xl border border-black/8 dark:border-white/8 p-4"
          >
            <p className="text-lg mb-2">{icon}</p>
            <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-1">
              {title}
            </p>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
              {desc}
            </p>
          </div>
        ))}
      </div>

      <BlogCallout type="tip">
        Para el día a día, empieza con <strong>Claude Sonnet 4.5</strong>. Usa{" "}
        <strong>Haiku</strong> como <BlogInlineCode>small_model</BlogInlineCode>{" "}
        y reserva <strong>Opus</strong> para los problemas más difíciles.
      </BlogCallout>
    </>
  );
}
