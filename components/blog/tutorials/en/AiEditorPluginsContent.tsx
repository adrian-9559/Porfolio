"use client";
import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogInlineCode,
  BlogUl,
  BlogLi,
  BlogCallout,
} from "@/components/blog/shared";

export default function AiEditorPluginsContent() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 text-xs text-[#aeaeb2] dark:text-[#636366] mb-4">
        <span className="flex items-center gap-1">
          <svg
            aria-hidden="true"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          Article
        </span>
        <span className="w-1 h-1 rounded-full bg-[#aeaeb2]" />
        <span className="flex items-center gap-1">
          <svg
            aria-hidden="true"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          10 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        AI Editor Plugins: VS Code, JetBrains and More
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Complete guide to AI-powered extensions and editors.
        Comparison, pricing, features, and recommendations based on
        your profile.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="categories">Plugin Categories</BlogH2>

      <BlogP>
        The AI plugin ecosystem for code editors can be divided
        into four main categories based on their core functionality. Understanding
        these categories helps you choose the right tool for each workflow.
      </BlogP>

      <BlogH3>Autocomplete</BlogH3>
      <BlogP>
        The most established category. They analyze the context of the open file and
        project to suggest the next line or block of code in real
        time. They use small language models (SLMs) specifically trained
        for code, making them extremely fast.
        Examples: GitHub Copilot, Tabnine, Supermaven, Codeium.
      </BlogP>

      <BlogH3>Chat in Editor</BlogH3>
      <BlogP>
        Add a chat panel inside the IDE where you can ask questions
        about your codebase, request refactors, or get explanations. They usually
        integrate with large models like GPT-4, Claude, or Gemini and often
        can read files, selections, and the project tree. Examples:
        Continue.dev, Cody, GitHub Copilot Chat.
      </BlogP>

      <BlogH3>Autonomous Agents</BlogH3>
      <BlogP>
        The most recent and powerful category. These plugins don't just suggest
        code — they can run commands, read and write files,
        manage terminals, and orchestrate multi-step workflows on their own.
        They use the MCP (Model Context Protocol) to connect to
        external tools. Examples: Cline, GitHub Copilot Agent Mode,
        Claude Code.
      </BlogP>

      <BlogH3>Code Review</BlogH3>
      <BlogP>
        They integrate with pull request workflows and review code
        automatically. They detect bugs, code smells, security issues, and
        style problems. Some work as local assistants and others as CI/CD
        actions. Examples: Cody Review, CodeRabbit, Copilot Code Review.
      </BlogP>

      <BlogH2 id="comparison-table">Comparison Table</BlogH2>

      <BlogP>
        Quick overview of the main AI plugins and editors currently on the
        market. The table includes tool type, backend model, and MCP
        support.
      </BlogP>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <th className="text-left py-3 px-3 font-semibold text-[#1d1d1f] dark:text-white">
                Plugin
              </th>
              <th className="text-left py-3 px-3 font-semibold text-[#1d1d1f] dark:text-white">
                Type
              </th>
              <th className="text-left py-3 px-3 font-semibold text-[#1d1d1f] dark:text-white">
                Price
              </th>
              <th className="text-left py-3 px-3 font-semibold text-[#1d1d1f] dark:text-white">
                Backend Model
              </th>
              <th className="text-center py-3 px-3 font-semibold text-[#1d1d1f] dark:text-white">
                MCP
              </th>
              <th className="text-left py-3 px-3 font-semibold text-[#1d1d1f] dark:text-white">
                Platform
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "GitHub Copilot",
                "Autocomplete + Chat + Agent",
                "$10/mo (Pro)",
                "GPT-4 / Claude",
                "Yes (preview)",
                "VS Code, JetBrains, Xcode, Neovim",
              ],
              [
                "Supermaven",
                "Autocomplete",
                "$7/mo (Pro)",
                "Proprietary",
                "No",
                "VS Code, JetBrains",
              ],
              [
                "Continue.dev",
                "Chat + Autocomplete",
                "Free (OSS)",
                "BYO LLM",
                "Yes",
                "VS Code, JetBrains",
              ],
              [
                "Cody (Sourcegraph)",
                "Chat + Autocomplete + Review",
                "$9/mo (Pro)",
                "Claude / GPT-4",
                "No",
                "VS Code, JetBrains, Web",
              ],
              [
                "Cline",
                "Autonomous Agent",
                "Free (OSS)",
                "BYO LLM",
                "Yes",
                "VS Code",
              ],
              [
                "Tabnine",
                "Autocomplete + Chat",
                "$12/mo (Pro)",
                "Proprietary + BYO",
                "No",
                "VS Code, JetBrains, Eclipse",
              ],
              [
                "Codeium",
                "Autocomplete + Chat",
                "Free (Individual)",
                "Proprietary",
                "No",
                "VS Code, JetBrains, Vim",
              ],
              [
                "Cursor",
                "Complete Editor (IA-first)",
                "$20/mo (Pro)",
                "GPT-4 / Claude",
                "Yes",
                "Custom editor (VS Code fork)",
              ],
            ].map(([plugin, tipo, precio, modelo, mcp, plataforma]) => (
              <tr
                key={plugin}
                className="border-b border-black/6 dark:border-white/6 hover:bg-black/2 dark:hover:bg-white/2"
              >
                <td className="py-2.5 px-3 font-medium text-[#1d1d1f] dark:text-white">
                  {plugin}
                </td>
                <td className="py-2.5 px-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                  {tipo}
                </td>
                <td className="py-2.5 px-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                  {precio}
                </td>
                <td className="py-2.5 px-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                  {modelo}
                </td>
                <td className="py-2.5 px-3 text-center">
                  {mcp.startsWith("Yes") ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {mcp}
                    </span>
                  ) : (
                    <span className="text-[#aeaeb2] dark:text-[#636366]">
                      {mcp}
                    </span>
                  )}
                </td>
                <td className="py-2.5 px-3 text-[#3a3a3c] dark:text-[#aeaeb2] text-xs">
                  {plataforma}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogCallout type="info">
        <strong>BYO LLM</strong> stands for "Bring Your Own LLM" — you can
        connect your own model (Ollama, OpenAI, Anthropic, etc.) and pay only
        for API usage.
      </BlogCallout>

      <BlogH2 id="continue">Continue.dev</BlogH2>

      <BlogP>
        Continue.dev is the leading open-source reference in the AI plugin
        space for editors. Unlike closed solutions, it lets you
        choose exactly which model you want to use and how it connects to your
        environment. It runs locally or against external APIs.
      </BlogP>

      <BlogP>
        Its strength is native MCP support: you can add any MCP
        server to your configuration and Continue will automatically use it
        in chat and agent flows. The configuration lives in{" "}
        <BlogInlineCode>~/.continue/config.json</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`{
  "models": [
    {
      "title": "Claude Sonnet",
      "provider": "anthropic",
      "model": "claude-sonnet-4-20250514"
    },
    {
      "title": "Local Ollama",
      "provider": "ollama",
      "model": "codellama:7b"
    }
  ],
  "experimental": {
    "mcpServers": [
      {
        "name": "filesystem",
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
      }
    ]
  }
}`}</BlogCode>

      <BlogP>
        It is compatible with Ollama, OpenAI, Anthropic, Google Gemini, Azure
        OpenAI, and dozens more providers. The community maintains a
        growing collection of ready-to-use MCPs.
      </BlogP>

      <BlogH2 id="cline">Cline</BlogH2>

      <BlogP>
        Cline (formerly Claude Dev) brought the autonomous agent concept to VS Code.
        Unlike a traditional chat, Cline can plan and execute complex
        tasks: read files, write modifications, run tests, make commits, and even deploy.
      </BlogP>

      <BlogP>
        Its architecture has been MCP-based from day one. Every tool
        Cline needs (filesystem, terminal, browser, database)
        is configured as an independent MCP server. The configuration
        is defined in{" "}
        <BlogInlineCode>.vscode/cline_mcp_settings.json</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@anthropic/mcp-playwright"],
      "env": {}
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "$GITHUB_PAT"
      }
    }
  }
}`}</BlogCode>

      <BlogP>
        Cline uses whatever model you configure (recommended Claude Sonnet or
        GPT-4) and spends tokens based on task complexity. It is ideal for
        automating complete workflows without leaving the editor.
      </BlogP>

      <BlogCallout type="warn">
        <strong>Watch out for costs.</strong> Being an autonomous agent,
        Cline can consume many tokens in a single session if you don't limit
        the model or set a budget. Always review changes before
        accepting them.
      </BlogCallout>

      <BlogH2 id="copilot">GitHub Copilot</BlogH2>

      <BlogP>
        GitHub Copilot is the most widely used AI plugin for editors in the world.
        It started as an autocomplete based on Codex (OpenAI) and has evolved
        to include chat, code review and, since 2025, an agent mode with
        MCP support in preview.
      </BlogP>

      <BlogP>
        Its main advantage is deep integration with the GitHub
        ecosystem: it understands issues, pull requests, Actions, and the full
        repository context. It works on VS Code, JetBrains, Xcode, Neovim, and Azure
        Data Studio.
      </BlogP>

      <BlogP>
        Copilot's Agent Mode (VS Code Insiders) is the direct response to
        Cline: it allows Copilot to run terminals, read/write files, and
        orchestrate multi-step tasks. It is currently in public preview with
        limited MCP support.
      </BlogP>

      <BlogH3>Editions</BlogH3>
      <BlogUl>
        <BlogLi>
          <strong>Copilot Free</strong> — 2,000 completions and 50 chats per
          month, GPT-4o and Claude Sonnet models.
        </BlogLi>
        <BlogLi>
          <strong>Copilot Pro</strong> — $10/mo, unlimited access, agent, and
          code review.
        </BlogLi>
        <BlogLi>
          <strong>Copilot Business/Enterprise</strong> — $19 and
          $39/user/month, security policies, IP indemnity.
        </BlogLi>
      </BlogUl>

      <BlogH2 id="supermaven">Supermaven</BlogH2>

      <BlogP>
        Supermaven is the fastest autocomplete plugin on the market. Its
        proprietary model is optimized for minimal latency and a context of up
        to 1 million tokens, allowing it to understand all the code
        in a large project without losing performance.
      </BlogP>

      <BlogP>
        Unlike Copilot, Supermaven has no chat or agent mode. It is a
        pure autocomplete tool, but it does it exceptionally well:
        suggestions appear in milliseconds, even in huge monorepos.
      </BlogP>

      <BlogP>
        It is available for VS Code, JetBrains, and soon Neovim. Its price
        is $7/mo for the Pro plan and $19/mo for the Teams plan. It does not support
        MCP or external models.
      </BlogP>

      <BlogCallout type="tip">
        If you already use Copilot or Continue for chat and agent, Supermaven as
        an autocomplete add-on is an unbeatable combination. Both
        coexist without conflicts in VS Code.
      </BlogCallout>

      <BlogH2 id="which-to-choose">Which one to choose?</BlogH2>

      <BlogP>
        There is no single answer. The choice depends on your profile,
        budget, and workflow. Here is a quick guide:
      </BlogP>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <th className="text-left py-3 px-3 font-semibold text-[#1d1d1f] dark:text-white">
                Profile
              </th>
              <th className="text-left py-3 px-3 font-semibold text-[#1d1d1f] dark:text-white">
                Recommendation
              </th>
              <th className="text-left py-3 px-3 font-semibold text-[#1d1d1f] dark:text-white">
                Why
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "Full-stack (JS/TS, Python)",
                "Copilot Pro + Supermaven",
                "Ultra-fast autocomplete + integrated agent and review",
              ],
              [
                "Data Science / ML",
                "Continue.dev + Ollama",
                "Local models, data privacy, compatible notebooks",
              ],
              [
                "Mobile (Swift, Kotlin)",
                "Copilot Pro + Cursor",
                "Native Xcode/Android Studio support, AI-first editor",
              ],
              [
                "Open-source / hobby",
                "Continue.dev + Cline",
                "100% free, you control the models and costs",
              ],
              [
                "Enterprise / compliance",
                "Copilot Enterprise",
                "IP indemnity, security policies, audit",
              ],
              [
                "Small team (startup)",
                "Codeium + Cline",
                "Free for individual, powerful agent for automation",
              ],
            ].map(([perfil, rec, why]) => (
              <tr
                key={perfil}
                className="border-b border-black/6 dark:border-white/6 hover:bg-black/2 dark:hover:bg-white/2"
              >
                <td className="py-2.5 px-3 font-medium text-[#1d1d1f] dark:text-white">
                  {perfil}
                </td>
                <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-medium">
                  {rec}
                </td>
                <td className="py-2.5 px-3 text-[#3a3a3c] dark:text-[#aeaeb2] text-xs">
                  {why}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogCallout type="tip">
        <strong>Personal recommendation:</strong> start with{" "}
        <strong>Continue.dev + Ollama</strong> (free, local, private). If
        you need more autocomplete speed, add{" "}
        <strong>Supermaven</strong>. If you work on a team with GitHub,{" "}
        <strong>Copilot Pro</strong> is the undisputed standard. And for
        heavy automation, <strong>Cline</strong> has no rival. All
        coexist in VS Code without issues.
      </BlogCallout>
    </article>
  );
}
