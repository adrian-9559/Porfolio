"use client";
import { CapabilitiesCard, Divider, Step } from "./shared";

import {
  BlogCallout,
  BlogCode,
  BlogH3,
  BlogInlineCode,
  BlogP,
} from "@/components/blog/shared";

export function SectionOllama() {
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
        <div>
          <p className="text-base font-bold text-[#1d1d1f] dark:text-white">
            Ollama
          </p>
          <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
            Runtime local para modelos open-source
          </p>
        </div>
      </div>

      <BlogH3>Qué es Ollama</BlogH3>
      <BlogP>
        <strong>Ollama</strong> es el runtime que ejecuta modelos de lenguaje en
        tu máquina. No debes confundirlo con los modelos en sí — Ollama es el
        programa, los modelos son archivos que descargas y ejecutas con él.
        OpenCode se conecta a Ollama a través de su API compatible con OpenAI.
      </BlogP>

      <CapabilitiesCard
        items={[
          { label: "Razonamiento", value: "⭐⭐⭐ (según modelo)" },
          { label: "Velocidad", value: "⭐⭐⭐⭐⭐ (local)", positive: true },
          { label: "Calidad de código", value: "⭐⭐⭐⭐ (coder models)" },
          { label: "Contexto / Memoria", value: "8k–128k tokens" },
          { label: "Visión", value: "⚠️ Según modelo" },
          { label: "Coste", value: "Gratis (solo HW)", positive: true },
        ]}
      />

      <Divider />

      <BlogH3>Instalación</BlogH3>
      <BlogCode>{`# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows
# Descarga el instalador desde https://ollama.com/download

# Verifica que funciona
ollama --version

# Descarga y ejecuta tu primer modelo
ollama run llama3`}</BlogCode>

      <BlogP>
        Este bloque instala Ollama, verifica la instalación y ejecuta Llama 3.
        Una vez que veas el prompt de Ollama, ya está listo.
      </BlogP>

      <Divider />

      <BlogH3>Integración en OpenCode</BlogH3>

      <Step number={1} title="Asegúrate de que Ollama esté ejecutándose">
        <BlogP>
          Ollama debe estar corriendo en segundo plano. Ejecuta{" "}
          <BlogInlineCode>ollama serve</BlogInlineCode> o tenlo iniciado como
          servicio.
        </BlogP>
      </Step>

      <Step number={2} title="Configura el provider en opencode.jsonc">
        <BlogCode>{`{
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama (local)",
      "options": {
        "baseURL": "http://localhost:11434/v1"
      },
      "models": {
        "qwen3-coder": {
          "name": "Qwen3-Coder (local)"
        }
      }
    }
  }
}`}</BlogCode>
      </Step>

      <Step number={3} title="Selecciona el modelo en OpenCode">
        <BlogP>
          Ejecuta <BlogInlineCode>/models</BlogInlineCode> y elige tu modelo
          local. El nombre aparecerá como{" "}
          <BlogInlineCode>ollama/qwen3-coder</BlogInlineCode>.
        </BlogP>
      </Step>

      <Divider />

      <BlogH3>Ventajas de Ollama</BlogH3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        {[
          {
            icon: "🔒",
            title: "100% Offline",
            desc: " Tus datos nunca salen de tu máquina. Ideal para código sensible, proyectos privados o trabajar sin internet.",
          },
          {
            icon: "🛡️",
            title: "Privacidad total",
            desc: "No envías código a servidores externos. Cada instrucción se procesa localmente.",
          },
          {
            icon: "⚡",
            title: "Baja latencia",
            desc: "Sin dependencia de red. Las respuestas son instantáneas una vez que el modelo está cargado en memoria.",
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

      <BlogCallout type="info">
        Ollama puede configurarse automáticamente para OpenCode. Consulta las{" "}
        <a
          className="underline"
          href="https://docs.ollama.com/integrations/opencode"
          rel="noopener noreferrer"
          target="_blank"
        >
          integrations docs
        </a>
        .
      </BlogCallout>
    </>
  );
}
