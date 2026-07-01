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
    tier: "Basic",
    ram: "8 GB RAM",
    icon: "💻",
    color: "emerald",
    models: [
      {
        name: "Phi-4 Mini",
        size: "3.8B",
        desc: "Light, fast, ideal for basic chat",
      },
      {
        name: "Qwen 3 7B",
        size: "7B",
        desc: "Good balance between size and capability",
      },
      {
        name: "Gemma 3 4B",
        size: "4B",
        desc: "Efficient on CPU, good for simple assistance",
      },
    ],
    use: "basic chat, light tasks, simple assistance",
  },
  {
    tier: "Standard",
    ram: "12–16 GB RAM",
    icon: "💻",
    color: "blue",
    models: [
      {
        name: "Mistral Small 3",
        size: "7B",
        desc: "Fast and capable, excellent for development",
      },
      {
        name: "Qwen 3 14B",
        size: "14B",
        desc: "Solid reasoning, good code understanding",
      },
      {
        name: "DeepSeek Coder 14B",
        size: "14B (quantized)",
        desc: "Specialized in code, reliable tool calling",
      },
    ],
    use: "programming, debugging, real development assistance",
  },
  {
    tier: "Advanced",
    ram: "24 GB VRAM",
    icon: "🖥️",
    color: "purple",
    models: [
      {
        name: "Qwen 3 32B",
        size: "32B",
        desc: "Deep reasoning, close to GPT-4 in quality",
      },
      {
        name: "DeepSeek R1 Distill 32B",
        size: "32B",
        desc: "Step-by-step reasoning, excellent for analysis",
      },
      {
        name: "Llama 3/4 70B",
        size: "70B (quantized)",
        desc: "Large model with superior general capabilities",
      },
    ],
    use: "software architecture, complex analysis, advanced reasoning",
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
        desc: "Meta's open-source frontier model",
      },
      {
        name: "DeepSeek R1 full",
        size: ">100B",
        desc: "Full reasoning without distillation",
      },
      {
        name: "MoE models",
        size: ">100B",
        desc: "Qwen, GLM and Mixture of Experts variants",
      },
    ],
    use: "advanced research, massive code analysis, complex systems",
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
            Use:
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
            Local Models
          </p>
          <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
            Open-source ecosystem: download, hardware, and alternatives
          </p>
        </div>
      </div>

      <BlogP>
        <strong>Don't confuse the runtime with the model.</strong> Ollama runs
        models, but the models are independent files. Here is everything
        you need to know about the local model ecosystem.
      </BlogP>

      <Divider />

      <BlogH3>Where to download models</BlogH3>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 my-4">
        {[
          {
            name: "Ollama Registry",
            url: "ollama.com/library",
            desc: "Official catalog. Single command to download and run.",
          },
          {
            name: "HuggingFace",
            url: "huggingface.co/models",
            desc: "The largest repository. Millions of open-source models.",
          },
          {
            name: "LM Studio",
            url: "lmstudio.ai",
            desc: "Graphical interface to explore and download models.",
          },
          {
            name: "Official repos",
            url: "Meta / Mistral / DeepSeek / Google",
            desc: "Direct download from model creators.",
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

      <BlogH3>Most used models in 2026 by hardware</BlogH3>
      <BlogP>
        Choose according to your machine's capability. Each tier gives you
        access to more capable models:
      </BlogP>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        {hardwareTiers.map((tier) => (
          <TierCard key={tier.tier} {...tier} />
        ))}
      </div>

      <Divider />

      <BlogH3>Model types</BlogH3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {[
          {
            name: "💻 Code",
            desc: "DeepSeek Coder, Code Llama — specialized in code generation and understanding",
            color: "emerald",
          },
          {
            name: "🧠 Reasoning",
            desc: "DeepSeek R1 — models with chain-of-thought for deep analysis",
            color: "purple",
          },
          {
            name: "🌐 General Purpose",
            desc: "Llama, Mistral — versatile for varied tasks",
            color: "blue",
          },
          {
            name: "🖼️ Multimodal",
            desc: "LLaVA, Gemma Vision — image support in addition to text",
            color: "violet",
          },
          {
            name: "⚡ Lightweight",
            desc: "Phi series — small models that run on CPU without GPU",
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

      <BlogH3>Memory, context, and quantization</BlogH3>
      <BlogUl>
        <BlogLi>
          <strong>Context:</strong> local models support 8k–128k tokens.
          More context requires more VRAM. Qwen 3 Coder reaches 128k
          but consumes significant memory
        </BlogLi>
        <BlogLi>
          <strong>Quantization (Q4, Q8):</strong> reduces model size by
          50–75% with minimal quality loss. Ollama downloads quantized
          versions automatically
        </BlogLi>
        <BlogLi>
          <strong>Tool calling:</strong> not all local models call
          tools correctly. The best: Qwen 3 Coder, DeepSeek Coder,
          Llama 3
        </BlogLi>
        <BlogLi>
          <strong>Persistence:</strong> OpenCode manages the conversation
          history locally. When exceeding the context limit, it automatically
          compacts the session
        </BlogLi>
      </BlogUl>

      <Divider />

      <BlogH3>Vision support</BlogH3>
      <BlogP>
        Not all local models support images. Only specific
        versions marked as <strong>"Vision"</strong> or{" "}
        <strong>"Multimodal"</strong>:
      </BlogP>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {[
          {
            name: "Llama 3.2 Vision",
            vision: "✅ 11B, supports images",
            type: "multimodal",
          },
          {
            name: "LLaVA / BakLLaVA",
            vision: "✅ Specialized in vision",
            type: "multimodal",
          },
          {
            name: "Gemma 3n",
            vision: "⚠️ Multimodal version exists",
            type: "limited",
          },
          { name: "Qwen 3 Coder", vision: "❌ Text only", type: "text" },
          { name: "DeepSeek Coder", vision: "❌ Text only", type: "text" },
          { name: "Mistral", vision: "❌ Text only", type: "text" },
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
        For reliable tool-calling locally, choose <strong>Qwen 3 Coder</strong> or{" "}
        <strong>DeepSeek Coder</strong>. Both work quantized on GPUs with
        8 GB VRAM.
      </BlogCallout>
    </>
  );
}
