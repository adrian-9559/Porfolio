"use client";
import { CapabilitiesCard, Divider, Step } from "./shared";

import {
  BlogCallout,
  BlogCode,
  BlogH3,
  BlogInlineCode,
  BlogP,
} from "@/components/blog/shared";

export function SectionCopilot() {
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/30 flex items-center justify-center text-violet-600 dark:text-violet-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
        <div>
          <p className="text-base font-bold text-[#1d1d1f] dark:text-white">
            GitHub Copilot
          </p>
          <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
            Autocompletado en IDE + agente conversacional en OpenCode
          </p>
        </div>
      </div>

      <BlogH3>Qué es GitHub Copilot en OpenCode</BlogH3>
      <BlogP>
        GitHub Copilot es conocido como el autocompletado de código en el IDE.
        OpenCode va un paso más allá: te permite usar tu{" "}
        <strong>suscripción de Copilot</strong> como proveedor de modelos para
        el agente conversacional. No necesitas API keys adicionales — solo tu
        cuenta de GitHub.
      </BlogP>

      <BlogCallout type="info">
        <strong>Diferencia clave:</strong> Copilot en el IDE te da
        autocompletado en tiempo real. Copilot como proveedor en OpenCode te da
        un agente conversacional que entiende todo tu proyecto.
      </BlogCallout>

      <CapabilitiesCard
        items={[
          { label: "Razonamiento", value: "⭐⭐⭐" },
          { label: "Velocidad", value: "⭐⭐⭐⭐", positive: true },
          { label: "Calidad de código", value: "⭐⭐⭐⭐", positive: true },
          { label: "Contexto / Memoria", value: "Variable según modelo" },
          { label: "Visión", value: "⚠️ Según modelo base" },
          { label: "Coste", value: "Incluido en suscripción", positive: true },
        ]}
      />

      <Divider />

      <BlogH3>Integración en OpenCode</BlogH3>

      <Step number={1} title="Conecta con GitHub">
        <BlogP>
          Ejecuta <BlogInlineCode>/connect</BlogInlineCode>, busca{" "}
          <strong>GitHub Copilot</strong> y sigue la autenticación por
          dispositivo:
        </BlogP>
        <BlogCode>{`# ┌ Login with GitHub Copilot
# │ https://github.com/login/device
# │ Enter code: 8F43-6FCF
# └ Waiting for authorization...`}</BlogCode>
      </Step>

      <Step number={2} title="Autoriza en GitHub">
        <BlogP>
          Abre la URL, introduce el código y autoriza OpenCode. No necesitas
          generar ninguna API key.
        </BlogP>
      </Step>

      <Step number={3} title="Selecciona un modelo">
        <BlogP>
          Ejecuta <BlogInlineCode>/models</BlogInlineCode> y elige entre los
          modelos disponibles en tu plan. Algunos avanzados requieren Copilot{" "}
          <strong>Pro+</strong>.
        </BlogP>
      </Step>

      <Divider />

      <BlogH3>Uso paralelo: IDE + OpenCode</BlogH3>
      <BlogP>
        La combinación más potente es usar <strong>Copilot en tu IDE</strong>{" "}
        (autocompletado) junto con <strong>OpenCode</strong> (agente):
      </BlogP>

      <div className="space-y-3 my-4">
        {[
          {
            step: "1",
            title: "Escribes código en tu IDE",
            desc: "Copilot te sugiere líneas y funciones mientras escribes. El autocompletado es la forma más rápida de escribir código nuevo.",
          },
          {
            step: "2",
            title: "Abres OpenCode para tareas grandes",
            desc: "Refactorizar un módulo, depurar un error complejo, generar tests o documentar una API.",
          },
          {
            step: "3",
            title: "Usas el mismo contexto",
            desc: "Ambos entienden tu proyecto. Pídele a OpenCode que revise lo que acabas de escribir.",
          },
          {
            step: "4",
            title: "Revisas y commiteas",
            desc: "OpenCode aplica los cambios y tú revisas el diff antes de hacer commit.",
          },
        ].map(({ step, title, desc }) => (
          <div
            key={step}
            className="flex gap-3 rounded-xl border border-black/8 dark:border-white/8 p-4"
          >
            <div className="w-6 h-6 rounded-lg bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              {step}
            </div>
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

      <BlogCallout type="tip">
        Usa Copilot como <BlogInlineCode>small_model</BlogInlineCode> y
        configura otro proveedor (OpenAI, Anthropic) como modelo principal. Así
        aprovechas la suscripción para tareas ligeras sin coste extra.
      </BlogCallout>
    </>
  );
}
