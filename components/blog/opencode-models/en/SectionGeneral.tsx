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
      <BlogH2>Overview</BlogH2>

      <BlogP>
        OpenCode is not a closed product with a single model. It is built
        on <strong>AI SDK</strong> and <strong>Models.dev</strong>, giving it
        access to <strong>over 75 providers</strong> of language
        models. You can choose which model to use based on the task, your
        budget, and your preferences, switching on the fly with{" "}
        <BlogInlineCode>/models</BlogInlineCode>.
      </BlogP>

      <BlogCallout type="info">
        You are currently using <strong>DeepSeek V4 Flash Free</strong>. It is an
        excellent model for code, but you can explore others depending on the
        task. Use the tabs above to see each provider in detail.
      </BlogCallout>

      <BlogH3>How to choose a model?</BlogH3>
      <BlogP>
        There is no perfect model for everything. The decision depends on four
        factors:
      </BlogP>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {[
          {
            icon: "💻",
            title: "Task type",
            desc: "Is it pure code, creativity, analysis, or debugging?",
          },
          {
            icon: "💰",
            title: "Budget",
            desc: "Cloud models (pay per token) vs local models (free, hardware cost)",
          },
          {
            icon: "🔌",
            title: "Connectivity",
            desc: "Do you need to work offline? Do you have sensitive data?",
          },
          {
            icon: "⚡",
            title: "Speed vs quality",
            desc: "Small models respond faster; larger models reason better.",
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

      <BlogH3>Cloud vs local models</BlogH3>
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
                cloud: "✅ Multimodal models",
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

      <Divider />

      <BlogH2>Quick Comparison</BlogH2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div className="rounded-xl border border-blue-200 dark:border-blue-800/40 p-5 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20">
          <p className="text-lg mb-2">💻</p>
          <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">
            Best for code
          </p>
          <p className="text-xs text-blue-700/80 dark:text-blue-400/80 mb-1">
            DeepSeek Coder V2 / Claude Sonnet 4.5
          </p>
          <p className="text-xs text-blue-600/70 dark:text-blue-400/70">
            Reliable tool calling, understanding of large projects, precise
            generation. The <strong>GPT-5.1 Codex</strong> is also excellent.
          </p>
        </div>
        <div className="rounded-xl border border-orange-200 dark:border-orange-800/40 p-5 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
          <p className="text-lg mb-2">🎨</p>
          <p className="text-sm font-bold text-orange-800 dark:text-orange-300 mb-1">
            Best for design / creativity
          </p>
          <p className="text-xs text-orange-700/80 dark:text-orange-400/80 mb-1">
            GPT-5.2 / Claude Opus 4.5
          </p>
          <p className="text-xs text-orange-600/70 dark:text-orange-400/70">
            Best understanding of nuance, creativity, and long context. Ideal
            for UI, copywriting, and brainstorming.
          </p>
        </div>
        <div className="rounded-xl border border-violet-200 dark:border-violet-800/40 p-5 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
          <p className="text-lg mb-2">⚖️</p>
          <p className="text-sm font-bold text-violet-800 dark:text-violet-300 mb-1">
            Best overall balance
          </p>
          <p className="text-xs text-violet-700/80 dark:text-violet-400/80 mb-1">
            Claude Sonnet 4.5 / Minimax M2.1
          </p>
          <p className="text-xs text-violet-600/70 dark:text-violet-400/70">
            Optimal balance between speed, quality, and cost for day-to-day use.
            Recommended for most tasks.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/40 p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
          <p className="text-lg mb-2">🖥️</p>
          <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-1">
            Best local / offline
          </p>
          <p className="text-xs text-emerald-700/80 dark:text-emerald-400/80 mb-1">
            Qwen 3 Coder / DeepSeek Coder V2
          </p>
          <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70">
            Open-source with reliable tool calling. They work with 8–16 GB VRAM
            quantized. Ideal for offline work or sensitive data.
          </p>
        </div>
      </div>

      <BlogCallout type="done">
        Models recommended by the OpenCode team:{" "}
        <strong>
          GPT 5.2, GPT 5.1 Codex, Claude Opus 4.5, Claude Sonnet 4.5, Minimax
          M2.1, and Gemini 3 Pro
        </strong>
        .
      </BlogCallout>

      <div className="rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 p-5 my-6 text-white">
        <p className="text-sm font-bold mb-1">Explore each provider</p>
        <p className="text-xs text-white/80">
          Use the tabs above to see the complete guide for each
          provider: step-by-step integration, configuration, use cases, and
          capabilities.
        </p>
      </div>
    </>
  );
}
