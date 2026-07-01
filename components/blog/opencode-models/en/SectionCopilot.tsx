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
            IDE autocomplete + conversational agent in OpenCode
          </p>
        </div>
      </div>

      <BlogH3>What is GitHub Copilot in OpenCode</BlogH3>
      <BlogP>
        GitHub Copilot is known as the code autocomplete in the IDE.
        OpenCode goes a step further: it allows you to use your{" "}
        <strong>Copilot subscription</strong> as a model provider for
        the conversational agent. You don't need additional API keys — just your
        GitHub account.
      </BlogP>

      <BlogCallout type="info">
        <strong>Key difference:</strong> Copilot in the IDE gives you
        real-time autocomplete. Copilot as a provider in OpenCode gives you
        a conversational agent that understands your entire project.
      </BlogCallout>

      <CapabilitiesCard
        items={[
          { label: "Reasoning", value: "⭐⭐⭐" },
          { label: "Speed", value: "⭐⭐⭐⭐", positive: true },
          { label: "Code quality", value: "⭐⭐⭐⭐", positive: true },
          { label: "Context / Memory", value: "Varies by model" },
          { label: "Vision", value: "⚠️ Depends on base model" },
          { label: "Cost", value: "Included in subscription", positive: true },
        ]}
      />

      <Divider />

      <BlogH3>Integration with OpenCode</BlogH3>

      <Step number={1} title="Connect with GitHub">
        <BlogP>
          Run <BlogInlineCode>/connect</BlogInlineCode>, look for{" "}
          <strong>GitHub Copilot</strong> and follow the device
          authentication flow:
        </BlogP>
        <BlogCode>{`# ┌ Login with GitHub Copilot
# │ https://github.com/login/device
# │ Enter code: 8F43-6FCF
# └ Waiting for authorization...`}</BlogCode>
      </Step>

      <Step number={2} title="Authorize on GitHub">
        <BlogP>
          Open the URL, enter the code, and authorize OpenCode. You don't need
          to generate any API key.
        </BlogP>
      </Step>

      <Step number={3} title="Select a model">
        <BlogP>
          Run <BlogInlineCode>/models</BlogInlineCode> and choose from the
          available models in your plan. Some advanced ones require Copilot{" "}
          <strong>Pro+</strong>.
        </BlogP>
      </Step>

      <Divider />

      <BlogH3>Parallel use: IDE + OpenCode</BlogH3>
      <BlogP>
        The most powerful combination is using <strong>Copilot in your IDE</strong>{" "}
        (autocomplete) together with <strong>OpenCode</strong> (agent):
      </BlogP>

      <div className="space-y-3 my-4">
        {[
          {
            step: "1",
            title: "Write code in your IDE",
            desc: "Copilot suggests lines and functions as you type. Autocomplete is the fastest way to write new code.",
          },
          {
            step: "2",
            title: "Open OpenCode for larger tasks",
            desc: "Refactor a module, debug a complex error, generate tests, or document an API.",
          },
          {
            step: "3",
            title: "Use the same context",
            desc: "Both understand your project. Ask OpenCode to review what you just wrote.",
          },
          {
            step: "4",
            title: "Review and commit",
            desc: "OpenCode applies the changes and you review the diff before committing.",
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
        Use Copilot as <BlogInlineCode>small_model</BlogInlineCode> and
        configure another provider (OpenAI, Anthropic) as the main model. This
        way you leverage your subscription for light tasks at no extra cost.
      </BlogCallout>
    </>
  );
}
