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
            Local runtime for open-source models
          </p>
        </div>
      </div>

      <BlogH3>What is Ollama</BlogH3>
      <BlogP>
        <strong>Ollama</strong> is the runtime that runs language models on
        your machine. Don't confuse it with the models themselves — Ollama is the
        program, the models are files you download and run with it.
        OpenCode connects to Ollama via its OpenAI-compatible API.
      </BlogP>

      <CapabilitiesCard
        items={[
          { label: "Reasoning", value: "⭐⭐⭐ (depends on model)" },
          { label: "Speed", value: "⭐⭐⭐⭐⭐ (local)", positive: true },
          { label: "Code quality", value: "⭐⭐⭐⭐ (coder models)" },
          { label: "Context / Memory", value: "8k–128k tokens" },
          { label: "Vision", value: "⚠️ Depends on model" },
          { label: "Cost", value: "Free (just HW)", positive: true },
        ]}
      />

      <Divider />

      <BlogH3>Installation</BlogH3>
      <BlogCode>{`# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows
# Download the installer from https://ollama.com/download

# Verify it works
ollama --version

# Download and run your first model
ollama run llama3`}</BlogCode>

      <BlogP>
        This block installs Ollama, verifies the installation, and runs Llama 3.
        Once you see the Ollama prompt, it is ready.
      </BlogP>

      <Divider />

      <BlogH3>Integration with OpenCode</BlogH3>

      <Step number={1} title="Make sure Ollama is running">
        <BlogP>
          Ollama must be running in the background. Run{" "}
          <BlogInlineCode>ollama serve</BlogInlineCode> or have it started as a
          service.
        </BlogP>
      </Step>

      <Step number={2} title="Configure the provider in opencode.jsonc">
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

      <Step number={3} title="Select the model in OpenCode">
        <BlogP>
          Run <BlogInlineCode>/models</BlogInlineCode> and choose your local
          model. The name will appear as{" "}
          <BlogInlineCode>ollama/qwen3-coder</BlogInlineCode>.
        </BlogP>
      </Step>

      <Divider />

      <BlogH3>Ollama advantages</BlogH3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        {[
          {
            icon: "🔒",
            title: "100% Offline",
            desc: " Your data never leaves your machine. Ideal for sensitive code, private projects, or working without internet.",
          },
          {
            icon: "🛡️",
            title: "Total privacy",
            desc: "You don't send code to external servers. Every instruction is processed locally.",
          },
          {
            icon: "⚡",
            title: "Low latency",
            desc: "No network dependency. Responses are instant once the model is loaded in memory.",
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
        Ollama can be configured automatically for OpenCode. Check the{" "}
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
