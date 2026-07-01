"use client";
import { BlogP } from "@/components/blog/shared";

const restrictions = [
  {
    name: "Vision / Multimodal",
    desc: "Not all models can see images. Those that can (GPT-5, Claude Opus, Llama 3.2 Vision) understand screenshots, diagrams, or photos. Those that can't (DeepSeek Coder, Mistral) only handle text.",
  },
  {
    name: "Tool calling",
    desc: "Ability to execute tools (read files, search the web, run code). OpenAI, Anthropic, and Qwen 3 Coder are reliable. Small or older models fail here.",
  },
  {
    name: "Maximum context",
    desc: "The token window the model processes at once. Claude Opus reaches 200k tokens (~150k words). Local models usually stay at 8k–32k. Exceeding it truncates the conversation.",
  },
  {
    name: "Output structure",
    desc: "OpenCode expects structured responses (JSON, lists, code). Some models don't follow these formats well. GPT and Claude are the best; small models may ignore instructions.",
  },
  {
    name: "Language",
    desc: "Models trained mostly in English perform worse in other languages. Claude, GPT, and Llama have good multilingual support. Smaller or specialized models may hallucinate more in non-English languages.",
  },
];

export function SectionIntro() {
  return (
    <div className="space-y-5 mb-8">
      <div className="rounded-2xl border border-black/8 dark:border-white/8 p-6 bg-gradient-to-b from-transparent via-violet-50/30 to-transparent dark:via-violet-950/10">
        <BlogP>
          <strong>Language models</strong> (LLMs) are the brain of
          OpenCode. They are neural networks trained on large volumes of
          text and code that understand instructions, reason, generate code, and
          execute complex tasks. OpenCode acts as the{" "}
          <strong>orchestrator</strong>: you choose which model to use based on your
          needs and budget.
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
              "More powerful and larger models (LLaMA 4 with 100B+ parameters)",
              "No hardware limits — the provider's server runs it",
              "Pay per use (per token) — ideal if you don't have a powerful GPU",
              "Requires internet connection and an API key",
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
              "You run the model on your machine — no data sent to third parties",
              "Free (just electricity + hardware cost)",
              "Smaller models (3.8B – 70B quantized parameters)",
              "Limited by your GPU/VRAM — performance depends on your setup",
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
          Restrictions to keep in mind
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
