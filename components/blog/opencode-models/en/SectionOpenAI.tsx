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
            Multimodal models with reasoning and creativity
          </p>
        </div>
      </div>

      <BlogH3>What is OpenAI</BlogH3>
      <BlogP>
        OpenAI is the company behind the <strong>GPT</strong>{" "}
        (Generative Pre-trained Transformer) models. Their models are multimodal
        (text + images), with advanced reasoning capabilities,
        code generation, and long context understanding. They are the most
        popular choice for tasks requiring a balance between creativity and
        precision.
      </BlogP>

      <BlogH3>Model types</BlogH3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        {[
          {
            icon: "🧠",
            title: "General Purpose",
            desc: "GPT-5, GPT-5.2 — ideal for day-to-day tasks, general conversation, analysis, and versatile reasoning.",
            color: "blue",
          },
          {
            icon: "💻",
            title: "Code",
            desc: "GPT-5.1 Codex — optimized for code generation, understanding, and debugging with advanced tool calling.",
            color: "violet",
          },
          {
            icon: "🖼️",
            title: "Multimodal",
            desc: "All GPT models natively support images. Ideal for analyzing screenshots, diagrams, and documents.",
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
          { label: "Reasoning", value: "⭐⭐⭐⭐⭐", positive: true },
          { label: "Speed", value: "⭐⭐⭐⭐", positive: true },
          { label: "Code quality", value: "⭐⭐⭐⭐⭐", positive: true },
          { label: "Context / Memory", value: "128k tokens", positive: true },
          { label: "Vision", value: "✅ Yes (native)", positive: true },
          { label: "Cost", value: "Medium–High" },
        ]}
      />

      <Divider />

      <BlogH3>Integration with OpenCode</BlogH3>

      <Step number={1} title="Configure your API Key">
        <BlogP>
          OpenCode connects to OpenAI via API key or OAuth authentication
          with ChatGPT Plus/Pro:
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

      <Step number={2} title="Select a model">
        <BlogP>
          Run <BlogInlineCode>/connect</BlogInlineCode> to authenticate,
          then <BlogInlineCode>/models</BlogInlineCode> to see the available
          models.
        </BlogP>
      </Step>

      <Step number={3} title="Adjust reasoning">
        <BlogP>
          OpenAI supports <BlogInlineCode>reasoningEffort</BlogInlineCode> levels,
          which you can adjust depending on the task:
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

      <BlogH3>Use cases</BlogH3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        <UseCaseCard
          desc="Code generation, refactoring, debugging, and code review with GPT-5.1 Codex."
          icon="💻"
          title="Programming"
        />
        <UseCaseCard
          desc="UI/UX copywriting, naming, brainstorming, and multimedia content with GPT-5.2."
          icon="🎨"
          title="Design / Creativity"
        />
        <UseCaseCard
          desc="Scripts, pipelines, migrations, and repetitive tasks with strong reasoning."
          icon="⚡"
          title="Automation"
        />
      </div>

      <BlogCallout type="tip">
        For pure programming, use <strong>GPT-5.1 Codex</strong>. For creative
        tasks or complex analysis, <strong>GPT-5.2</strong> offers better
        reasoning.
      </BlogCallout>
    </>
  );
}
