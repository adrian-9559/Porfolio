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
            Deep reasoning and structured writing
          </p>
        </div>
      </div>

      <BlogH3>What is Claude</BlogH3>
      <BlogP>
        Anthropic is the company behind <strong>Claude</strong>, a family
        of models known for excellent reasoning, clean code generation, and
        long context handling. Claude stands out for its focus on{" "}
        <strong>safety and structured writing</strong>, making it the
        favorite choice for many developers in complex engineering tasks.
      </BlogP>

      <CapabilitiesCard
        items={[
          { label: "Reasoning", value: "⭐⭐⭐⭐⭐", positive: true },
          { label: "Speed", value: "⭐⭐⭐ (Sonnet) / ⭐⭐ (Opus)" },
          { label: "Code quality", value: "⭐⭐⭐⭐⭐", positive: true },
          { label: "Context / Memory", value: "200k tokens", positive: true },
          {
            label: "Vision",
            value: "⚠️ Partial (Sonnet/Opus)",
            positive: false,
          },
          { label: "Thinking budget", value: "Configurable" },
        ]}
      />

      <Divider />

      <BlogH3>Integration with OpenCode</BlogH3>

      <Step number={1} title="Configure your API Key">
        <BlogP>
          Run <BlogInlineCode>/connect</BlogInlineCode>, select
          Anthropic, and choose between OAuth (Claude Pro/Max) or manual API key:
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

      <Step number={2} title="Configure main and small model">
        <BlogP>
          OpenCode allows using a{" "}
          <BlogInlineCode>small_model</BlogInlineCode> for secondary tasks:
        </BlogP>
        <BlogCode>{`{
  "model": "anthropic/claude-sonnet-4-5",
  "small_model": "anthropic/claude-haiku-4-5"
}`}</BlogCode>
      </Step>

      <Step number={3} title="Adjust the thinking budget">
        <BlogP>
          Claude supports <strong>extended thinking</strong> for deep
          reasoning. Configure the token budget:
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

      <BlogH3>Use cases</BlogH3>
      <BlogUl>
        <BlogLi>
          <strong>Software architecture:</strong> system design,
          project planning, trade-off analysis, and technical
          documentation
        </BlogLi>
        <BlogLi>
          <strong>Complex debugging:</strong> analysis of long stack traces,
          root cause detection in projects with multiple abstraction
          layers
        </BlogLi>
        <BlogLi>
          <strong>Technical documentation:</strong> generates API docs,
          contribution guides, and JSDocs consistent with the project style
        </BlogLi>
        <BlogLi>
          <strong>Refactoring:</strong> migrating between languages, splitting
          monoliths, applying design patterns
        </BlogLi>
      </BlogUl>

      <BlogH3>Key strengths</BlogH3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        {[
          {
            icon: "🧠",
            title: "Deep reasoning",
            desc: "Claude excels at tasks that require step-by-step thinking: complex debugging, code analysis, architectural planning.",
          },
          {
            icon: "🧹",
            title: "Clean code",
            desc: "Generates well-structured code with consistent naming and following existing project conventions.",
          },
          {
            icon: "🔧",
            title: "Tool calling",
            desc: "Claude is the most reliable model for tool calls. It rarely hallucinates or skips steps in complex flows.",
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
        For day-to-day use, start with <strong>Claude Sonnet 4.5</strong>. Use{" "}
        <strong>Haiku</strong> as <BlogInlineCode>small_model</BlogInlineCode>{" "}
        and save <strong>Opus</strong> for the hardest problems.
      </BlogCallout>
    </>
  );
}
