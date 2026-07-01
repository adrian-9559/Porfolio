"use client";
import { Divider } from "./shared";

import { BlogCallout, BlogH2, BlogP } from "@/components/blog/shared";

const quickMatrix = [
  {
    task: "Write / refactor code",
    pick: "Claude Sonnet 4.5",
    alt: "GPT-5.1 Codex • Qwen 3 Coder",
    icon: "💻",
  },
  {
    task: "Debugging / complex analysis",
    pick: "Claude Opus 4.5",
    alt: "GPT-5.2 • DeepSeek R1",
    icon: "🔍",
  },
  {
    task: "UI design / creativity",
    pick: "GPT-5.2",
    alt: "Claude Opus 4.5",
    icon: "🎨",
  },
  {
    task: "Technical documentation",
    pick: "Claude Sonnet 4.5",
    alt: "GPT-5.2 • Qwen 3 32B",
    icon: "📝",
  },
  {
    task: "Fast IDE autocomplete",
    pick: "GitHub Copilot",
    alt: "—",
    icon: "⚡",
  },
  {
    task: "Total privacy / offline",
    pick: "Qwen 3 Coder 14B",
    alt: "DeepSeek Coder • Llama 3",
    icon: "🔒",
  },
  {
    task: "Varied tasks / day-to-day",
    pick: "Claude Sonnet 4.5",
    alt: "GPT-5 • Minimax M2.1",
    icon: "⚖️",
  },
  {
    task: "Large project analysis",
    pick: "Claude Opus 4.5",
    alt: "GPT-5.1 Codex",
    icon: "🏗️",
  },
];

const providers = [
  {
    id: "claude",
    name: "Claude (Anthropic)",
    color: "orange",
    border: "border-orange-200 dark:border-orange-800/40",
    bg: "from-orange-50/40 to-transparent dark:from-orange-950/10",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    pick: "Sonnet 4.5 (general) · Opus 4.5 (analysis)",
    desc: "The best for code and documentation. Deep reasoning, excellent tool calling, 200k context.",
    scores: [
      {
        label: "Code",
        score: 5,
        desc: "Reliable tool calling, understanding of large projects",
      },
      {
        label: "Documentation",
        score: 5,
        desc: "Impeccable technical writing, clear structure",
      },
      {
        label: "Debugging",
        score: 5,
        desc: "Step-by-step reasoning, long context",
      },
      {
        label: "Design / UI",
        score: 4,
        desc: "Good with Tailwind, less creative than GPT",
      },
      {
        label: "General",
        score: 5,
        desc: "Solid at almost everything, the most balanced",
      },
    ],
  },
  {
    id: "openai",
    name: "OpenAI (GPT)",
    color: "blue",
    border: "border-blue-200 dark:border-blue-800/40",
    bg: "from-blue-50/40 to-transparent dark:from-blue-950/10",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    pick: "GPT-5.2 (creative) · GPT-5.1 Codex (code)",
    desc: "Maximum creativity and versatility. The best for design and multimodal tasks.",
    scores: [
      { label: "Code", score: 5, desc: "GPT-5.1 Codex specialized" },
      {
        label: "Documentation",
        score: 4,
        desc: "Good, though sometimes verbose",
      },
      {
        label: "Debugging",
        score: 4,
        desc: "Solid, but Claude wins on step-by-step",
      },
      {
        label: "Design / UI",
        score: 5,
        desc: "The best for creativity and copywriting",
      },
      {
        label: "General",
        score: 5,
        desc: "Versatile, responds well to almost everything",
      },
    ],
  },
  {
    id: "local",
    name: "Local (Ollama)",
    color: "emerald",
    border: "border-emerald-200 dark:border-emerald-800/40",
    bg: "from-emerald-50/40 to-transparent dark:from-emerald-950/10",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    pick: "Qwen 3 Coder 14B (12–16GB) · DeepSeek Coder V2 (24GB)",
    desc: "Total privacy, no cost, offline. Ideal for sensitive data or offline work.",
    scores: [
      {
        label: "Code",
        score: 4,
        desc: "Qwen 3 and DeepSeek Coder deliver solid results",
      },
      {
        label: "Documentation",
        score: 3,
        desc: "Acceptable with 24GB+ models",
      },
      {
        label: "Debugging",
        score: 3,
        desc: "Simple bugs fine, complex ones better on cloud",
      },
      {
        label: "Design / UI",
        score: 2,
        desc: "Not recommended. Better to use cloud",
      },
      {
        label: "General",
        score: 3,
        desc: "Varies by model. 32B+ gets close to cloud",
      },
    ],
  },
];

const firstSteps: { icon: string; title: string; subtitle: string }[] = [
  {
    icon: "1",
    title: "Starting from scratch?",
    subtitle: "Connect GitHub Copilot — no API key needed",
  },
  {
    icon: "2",
    title: "Already have an API key?",
    subtitle: "Claude Sonnet 4.5 as the main model",
  },
  {
    icon: "3",
    title: "Maximum privacy?",
    subtitle: "Install Ollama + Qwen 3 Coder",
  },
];

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <div
          key={s}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            s <= score
              ? "bg-violet-500 dark:bg-violet-400"
              : "bg-black/8 dark:bg-white/8"
          } ${s === score ? "w-4" : "w-3"}`}
        />
      ))}
    </div>
  );
}

function ProviderScores({
  provider,
}: {
  provider: (typeof providers)[number];
}) {
  return (
    <div
      className={`rounded-2xl border ${provider.border} p-5 bg-gradient-to-br ${provider.bg}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-xl ${provider.iconBg} flex items-center justify-center ${provider.iconColor}`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-[#1d1d1f] dark:text-white">
            {provider.name}
          </p>
          <p className="text-[11px] text-[#6e6e73] dark:text-[#86868b]">
            {provider.desc}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {provider.pick.split("·").map((part) => (
          <span
            key={part.trim()}
            className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/60 dark:bg-white/10 text-[10px] font-semibold text-[#1d1d1f] dark:text-white/80"
          >
            {part.trim()}
          </span>
        ))}
      </div>
      <div className="space-y-3">
        {provider.scores.map((s) => (
          <div key={s.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-medium text-[#1d1d1f] dark:text-white">
                {s.label}
              </span>
              <div className="flex items-center gap-2">
                <ScoreBar score={s.score} />
              </div>
            </div>
            <p className="text-[10px] text-[#6e6e73] dark:text-[#86868b] leading-tight pl-0">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SectionRecomendaciones() {
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
        <div>
          <p className="text-base font-bold text-[#1d1d1f] dark:text-white">
            Recommendations
          </p>
          <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
            Choose the best model for your use case and budget
          </p>
        </div>
      </div>

      <BlogP>
        There is no perfect model for everything. Each provider excels in
        different areas. This visual guide helps you find what you need in
        seconds.
      </BlogP>

      <Divider />

      <BlogH2>Quick guide: what to use for each task</BlogH2>
      <BlogP>Find your case in the table and use the recommended model:</BlogP>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <th className="text-left font-semibold py-2.5 px-3 text-[#1d1d1f] dark:text-white w-8" />
              <th className="text-left font-semibold py-2.5 px-3 text-[#1d1d1f] dark:text-white">
                Task
              </th>
              <th className="text-left font-semibold py-2.5 px-3 text-[#1d1d1f] dark:text-white w-52">
                Recommended
              </th>
              <th className="text-left font-semibold py-2.5 px-3 text-[#1d1d1f] dark:text-white text-[10px] text-[#6e6e73]">
                Alternatives
              </th>
            </tr>
          </thead>
          <tbody>
            {quickMatrix.map((row, i) => (
              <tr
                key={row.task}
                className={`${i < quickMatrix.length - 1 ? "border-b border-black/5 dark:border-white/5" : ""} hover:bg-black/[0.02] dark:hover:bg-white/[0.02]`}
              >
                <td className="py-2 px-3 text-sm">{row.icon}</td>
                <td className="py-2 px-3 text-[#1d1d1f] dark:text-white font-medium">
                  {row.task}
                </td>
                <td className="py-2 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 text-[10px] font-semibold">
                    {row.pick}
                  </span>
                </td>
                <td className="py-2 px-3 text-[10px] text-[#6e6e73] dark:text-[#86868b]">
                  {row.alt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <BlogH2>Provider scores</BlogH2>
      <BlogP>
        Each provider evaluated across 5 key areas. More colored bars
        means better performance:
      </BlogP>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 my-6">
        {providers.map((p) => (
          <ProviderScores key={p.id} provider={p} />
        ))}
      </div>

      <Divider />

      <BlogH2>First steps</BlogH2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        {firstSteps.map((step) => (
          <div
            key={step.title}
            className="flex items-start gap-3 rounded-xl border border-black/8 dark:border-white/8 p-4 hover:border-rose-200 dark:hover:border-rose-800/40 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400 text-xs font-bold shrink-0">
              {step.icon}
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
                {step.title}
              </p>
              <p className="text-[11px] text-[#6e6e73] dark:text-[#86868b]">
                {step.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      <BlogCallout type="done">
        Models recommended by the OpenCode team:{" "}
        <strong>
          GPT-5.2, GPT-5.1 Codex, Claude Opus 4.5, Claude Sonnet 4.5, Minimax
          M2.1, and Gemini 3 Pro
        </strong>
        .
      </BlogCallout>
    </>
  );
}
