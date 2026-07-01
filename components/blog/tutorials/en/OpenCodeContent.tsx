"use client";
import {
  BlogCode,
  BlogInlineCode,
  BlogH2,
  BlogH3,
  BlogP,
  BlogCallout,
  BlogUl,
  BlogLi,
} from "@/components/blog/shared";

function Kbd({ children }: { children: string }) {
  return (
    <kbd className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-black/8 dark:bg-white/10 border border-black/10 dark:border-white/10 text-[10px] font-mono text-[#1d1d1f] dark:text-[#e6edf3]">
      {children}
    </kbd>
  );
}

function Divider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent my-8" />
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 my-5">
      <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-1.5">
          {title}
        </p>
        <div className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2] leading-relaxed [&>pre]:my-3">
          {children}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-black/8 dark:border-white/8 p-4 bg-white dark:bg-[#111116] hover:border-emerald-400/30 dark:hover:border-emerald-600/30 transition-colors">
      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3">
        {icon}
      </div>
      <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-1">
        {title}
      </p>
      <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function CmdGrid({ rows }: { rows: { cmd: string; desc: string }[] }) {
  return (
    <div className="not-prose my-4 rounded-xl border border-black/8 dark:border-white/8 overflow-hidden">
      {rows.map((r, i) => (
        <div
          key={i}
          className={`flex items-start gap-3 px-4 py-2.5 ${i < rows.length - 1 ? "border-b border-black/5 dark:border-white/5" : ""} hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors`}
        >
          <code className="text-xs font-mono text-emerald-600 dark:text-emerald-400 shrink-0 min-w-[140px] leading-relaxed">
            {r.cmd}
          </code>
          <span className="text-xs text-[#3a3a3c] dark:text-[#aeaeb2] leading-relaxed">
            {r.desc}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Sections ──────────────────────────────────────────────────────────────────

function SectionQueEs() {
  return (
    <>
      <BlogH2>What is OpenCode</BlogH2>

      <BlogP>
        <strong>OpenCode</strong> is an artificial intelligence assistant that
        works directly from your terminal. Unlike typical web interfaces,
        OpenCode runs in your command line, understands your
        project and can read, write and modify files autonomously.
      </BlogP>

      <BlogP>
        It is built on top of advanced language models and is specifically
        designed for <strong>software engineering tasks</strong>:
        from writing code to refactoring entire projects, including debugging,
        testing, documentation, and deployment.
      </BlogP>

      <BlogP>
        By default, OpenCode provides you with{" "}
        <strong>interactive modals</strong> in the terminal to approve
        changes, review diffs, select files, and confirm actions before
        executing them. It is not a blind chat: every modification goes through
        your approval.
      </BlogP>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
        <FeatureCard
          desc="OpenCode sees your entire project: structure, dependencies, Git history and file contents."
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          }
          title="Full context"
        />
        <FeatureCard
          desc="It can modify files, run commands, create tests, migrate code, and deploy."
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          }
          title="Real automation"
        />
        <FeatureCard
          desc="No GUIs, no web pages. It works where you already work: the command line."
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          }
          title="In your terminal"
        />
      </div>

      <BlogCallout type="info">
        OpenCode is <strong>open source</strong> — you can inspect its
        code, contribute, and adapt it to your needs. It is published under
        the Apache 2.0 license.
      </BlogCallout>
    </>
  );
}

function SectionParaQueSirve() {
  return (
    <>
      <BlogH2>What it is for</BlogH2>

      <BlogP>
        OpenCode is designed to{" "}
        <strong>accelerate your workflow as a developer</strong>. It is not
        a generic chat: it is an artificial software engineer that works
        inside your project.
      </BlogP>

      <div className="space-y-3 my-6">
        {[
          {
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            ),
            title: "Write and refactor code",
            desc: "Ask it to implement a function, refactor an entire module or migrate your code from JavaScript to TypeScript. OpenCode understands your project structure and makes precise changes.",
          },
          {
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            ),
            title: "Debug errors",
            desc: "Paste a stack trace and OpenCode analyzes your code, finds the root cause, and proposes a solution — sometimes even applies it directly.",
          },
          {
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            ),
            title: "Write tests",
            desc: "Generates unit, integration, and end-to-end tests for your existing code. Includes mocks, fixtures, and assertions.",
          },
          {
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            ),
            title: "Automate repetitive tasks",
            desc: "Rename variables across the project, update imports, migrate a deprecated API, batch format files — any task that follows a pattern.",
          },
          {
            icon: (
              <svg
                className="w-4 h-4"
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
            ),
            title: "Document your project",
            desc: "Generates README, API documentation, contribution guides, changelogs, and JS Docs. OpenCode reads your code and writes the documentation for you.",
          },
          {
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            ),
            title: "Analyze and review code",
            desc: "Ask it to review your PR, find security vulnerabilities, detect code smells, or suggest performance improvements.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex gap-3 rounded-xl border border-black/8 dark:border-white/8 p-4 hover:border-emerald-400/20 dark:hover:border-emerald-600/20 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-0.5">
                {item.title}
              </p>
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <BlogCallout type="tip">
        Think of OpenCode as a <strong>programming partner</strong>{" "}
        that is always ready to help, never gets tired, and works at whatever
        pace you set. It does not replace your judgment — it amplifies it.
      </BlogCallout>
    </>
  );
}

function SectionInstalacion() {
  return (
    <>
      <BlogH2>Installation</BlogH2>

      <BlogP>
        Installing OpenCode is quick and only requires Node.js 18+ on your
        system. Choose the method you prefer:
      </BlogP>

      <BlogH3>Prerequisites</BlogH3>
      <BlogP>Make sure you have Node.js installed. If you don't:</BlogP>
      <BlogCode>{`# Check if you already have Node.js
node --version    # Should show v18.0.0 or higher

# If not, install it from:
# https://nodejs.org/  (recommended: LTS)

# Or with nvm (version manager):
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install --lts`}</BlogCode>

      <BlogH3>Option 1: Global npm installation (recommended)</BlogH3>
      <BlogP>
        The simplest way and the one we recommend to get started:
      </BlogP>
      <BlogCode>{`npm install -g @opencode/cli`}</BlogCode>
      <BlogP>
        This installs OpenCode globally and adds the{" "}
        <BlogInlineCode>opencode</BlogInlineCode> command to your PATH. Once installed,
        verify it works:
      </BlogP>
      <BlogCode>{`opencode --version`}</BlogCode>

      <BlogH3>Option 2: Use npx (no installation)</BlogH3>
      <BlogP>
        If you prefer not to install it globally, you can run it directly
        with npx. The first time it will take a few seconds to download:
      </BlogP>
      <BlogCode>{`npx @opencode/cli`}</BlogCode>

      <BlogH3>Option 3: Clone from GitHub</BlogH3>
      <BlogP>
        If you want to explore the source code or contribute to the project:
      </BlogP>
      <BlogCode>{`git clone https://github.com/anomalyco/opencode.git
cd opencode
npm install
npm run build
npm link`}</BlogCode>

      <BlogH3>Initial configuration</BlogH3>
      <BlogP>
        The first time you run OpenCode, it will guide you through an
        assisted setup via modals in the terminal itself. It will ask for
        your API key from the provider you choose:
      </BlogP>
      <BlogCode>{`# Configuration is done through interactive modals
# Open opencode and follow the steps shown on screen:

opencode

# It will ask you for:
# 1. Model provider (by default the one built-in)
# 2. Your API key (if applicable)
# 3. Session preferences

# You can also configure environment variables if you prefer:
export OPENCODE_API_KEY="your-api-key-here"`}</BlogCode>

      <BlogCallout type="warn">
        <strong>Never share your API key.</strong> Do not commit it to Git, do not
        include it in source code, and do not publish it in public repositories.
      </BlogCallout>

      <BlogCallout type="info">
        <strong>Coming soon:</strong> OpenCode will support{" "}
        <strong>Ollama</strong> and local models, allowing you to
        run it completely offline without relying on external APIs.
      </BlogCallout>
    </>
  );
}

function SectionPrimerUso() {
  return (
    <>
      <BlogH2>First use</BlogH2>

      <BlogP>
        Once installed and configured, starting OpenCode is as simple as
        running a command from your project root.
      </BlogP>

      <BlogH3>Start OpenCode</BlogH3>
      <BlogCode>{`# Inside your project folder
cd my-project

# Start interactive session
opencode`}</BlogCode>

      <BlogP>
        Running <BlogInlineCode>opencode</BlogInlineCode> without arguments opens
        an <strong>interactive session</strong> in your terminal with modals
        to guide you. You will see something like:
      </BlogP>

      <BlogCode>{`✦ OpenCode
  Context: current folder with ~1,200 files
  Model: deepseek-v4-flash-free (configurable)

  > _`}</BlogCode>

      <BlogP>
        The cursor <BlogInlineCode>&gt; _</BlogInlineCode> indicates that OpenCode
        is ready to receive instructions. You can start typing what you need.
      </BlogP>

      <BlogH3>Your first workflow</BlogH3>
      <BlogP>
        Here is an end-to-end example. Open your terminal and try this flow:
      </BlogP>

      <Step number={1} title="Create a test project">
        <BlogCode>{`mkdir my-first-project
cd my-first-project
echo '{"name":"my-first-project","type":"module"}' > package.json`}</BlogCode>
      </Step>

      <Step number={2} title="Start OpenCode">
        <BlogCode>{`opencode`}</BlogCode>
      </Step>

      <Step number={3} title="Ask it something concrete">
        <BlogP>Write in the prompt:</BlogP>
        <BlogCode>{`> Create an index.js file that is a basic HTTP server.
  It should respond with "Hello from OpenCode" at the /
  route and listen on port 3000.`}</BlogCode>
        <BlogP>
          OpenCode will analyze your request, create the file, and show you the
          result.
        </BlogP>
      </Step>

      <Step number={4} title="Ask for more changes">
        <BlogP>Without leaving the session, you can ask for more:</BlogP>
        <BlogCode>{`> Add an /api/health route that returns JSON with
  { status: "ok", timestamp: Date.now() }`}</BlogCode>
        <BlogP>
          OpenCode will modify the existing file to add the new route.
        </BlogP>
      </Step>

      <Step number={5} title="Exit the session">
        <BlogCode>{`> /exit`}</BlogCode>
        <BlogP>
          Use <BlogInlineCode>/exit</BlogInlineCode> to close the session.
          OpenCode will ask if you want to save the context to resume it later.
        </BlogP>
      </Step>

      <BlogCallout type="done">
        You have completed your first full workflow with OpenCode! In less than 2
        minutes you created an HTTP server and modified it without writing a
        single line of code manually.
      </BlogCallout>

      <BlogH3>Quick flow (one-liner)</BlogH3>
      <BlogP>
        If you only need a one-off answer without opening an interactive
        session, use the <BlogInlineCode>-p</BlogInlineCode> flag:
      </BlogP>
      <BlogCode>{`opencode -p "Explain what this project does based on its folder structure"`}</BlogCode>
      <BlogP>
        This runs OpenCode, processes your request, and returns the result
        directly in the terminal, without entering interactive mode.
      </BlogP>

      <Divider />

      <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/40 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-5 my-6">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-200 dark:bg-emerald-800/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M17 8l4 4m0 0l-4 4m4-4H3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-1">
              Recommended daily workflow
            </p>
            <p className="text-xs text-emerald-700 dark:text-emerald-400/80 leading-relaxed">
              Open OpenCode at the start of your workday. Leave it running in
              one terminal while you work in another. This way you have
              immediate access to your assistant without wasting time starting
              it every time.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function SectionComandos() {
  return (
    <>
      <BlogH2>Main commands</BlogH2>

      <BlogP>
        OpenCode offers several commands and flags to adapt to different
        ways of working. These are the essentials:
      </BlogP>

      <BlogH3>Execution modes</BlogH3>
      <CmdGrid
        rows={[
          {
            cmd: "opencode",
            desc: "Starts an interactive session. The most used mode for continuous work.",
          },
          {
            cmd: 'opencode -p "..."',
            desc: "Executes a one-off instruction and exits. Ideal for quick questions.",
          },
          {
            cmd: "opencode --model <name>",
            desc: "Specifies the model to use (useful for choosing between speed and capability).",
          },
          {
            cmd: "opencode --print",
            desc: "Prints the result to stdout without interactive formatting (useful for pipelines).",
          },
          {
            cmd: "opencode --verbose",
            desc: "Shows the model's internal reasoning to understand how it arrived at the solution.",
          },
        ]}
      />

      <BlogH3>Commands inside the interactive session</BlogH3>
      <BlogP>
        Once inside a session with{" "}
        <BlogInlineCode>opencode</BlogInlineCode>, you can use these internal
        commands:
      </BlogP>
      <CmdGrid
        rows={[
          {
            cmd: "/help",
            desc: "Shows full help with all available commands.",
          },
          {
            cmd: "/exit",
            desc: "Closes the current session. OpenCode will ask if you want to save the context.",
          },
          {
            cmd: "/clear",
            desc: "Clears the current conversation history but keeps the context.",
          },
          {
            cmd: "/diff",
            desc: "Shows a summary of changes made in the session.",
          },
          {
            cmd: "/reset",
            desc: "Resets the session completely, losing accumulated context.",
          },
          {
            cmd: "/status",
            desc: "Shows session info: model, tokens used, modified files.",
          },
          {
            cmd: "/cost",
            desc: "Estimates the accumulated API cost of the current session.",
          },
        ]}
      />

      <BlogH3>Frequent usage examples</BlogH3>

      <BlogCode>{`# 1. Ask for an explanation of the project
opencode -p "Explain the architecture of this project in 3 paragraphs"

# 2. Generate tests
opencode -p "Generate unit tests with Jest for src/services/auth.ts"

# 3. Refactor a file
opencode -p "Refactor utils/helpers.js to use pure functions
  and split it into smaller modules"

# 4. Debug an error
opencode -p "Run npm test, capture the error and propose a solution"

# 5. Review security
opencode -p "Analyze this project for common security
  vulnerabilities (SQL injection, XSS, exposed secrets)"

# 6. Migrate to TypeScript
opencode -p "Migrate src/utils/ from JavaScript to TypeScript
  adding types and interfaces where appropriate"`}</BlogCode>

      <BlogCallout type="tip">
        <strong>Be specific in your instructions.</strong> The more context
        and detail you give OpenCode, the better the results. Include the
        tech stack, relevant file structure, and expected outcome.
      </BlogCallout>
    </>
  );
}

function SectionConsejos() {
  return (
    <>
      <BlogH2>Tips and best practices</BlogH2>

      <BlogP>
        To get the most out of OpenCode, here are some tips based on daily
        usage experience:
      </BlogP>

      <BlogH3>How to write good prompts</BlogH3>
      <div className="space-y-3 my-4">
        {[
          {
            bad: "Make a server",
            good: "Create an Express server with TypeScript that has CRUD routes for users with JWT authentication and PostgreSQL persistence using Prisma",
          },
          {
            bad: "Fix this code",
            good: "The following code fails with 'Cannot read properties of undefined'. The error occurs at src/users.ts line 45. I need you to validate if the user exists before accessing their properties. Here is the code:",
          },
          {
            bad: "Tell me what this project does",
            good: "Analyze the folder structure and package.json of this project. Describe its purpose, tech stack, and main dependencies",
          },
        ].map(({ bad, good }) => (
          <div
            key={bad}
            className="rounded-xl border border-black/8 dark:border-white/8 overflow-hidden"
          >
            <div className="px-4 py-2.5 bg-red-50/50 dark:bg-red-950/10 border-b border-red-200/50 dark:border-red-900/30">
              <div className="flex items-center gap-2 mb-1">
                <svg
                  className="w-3 h-3 text-red-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <span className="text-[10px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                  Avoid
                </span>
              </div>
              <code className="text-xs text-[#3a3a3c] dark:text-[#aeaeb2] italic">
                {bad}
              </code>
            </div>
            <div className="px-4 py-2.5 bg-emerald-50/50 dark:bg-emerald-950/10">
              <div className="flex items-center gap-2 mb-1">
                <svg
                  className="w-3 h-3 text-emerald-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Recommended
                </span>
              </div>
              <code className="text-xs text-[#1d1d1f] dark:text-[#e6edf3]">
                {good}
              </code>
            </div>
          </div>
        ))}
      </div>

      <BlogH3>General best practices</BlogH3>
      <BlogUl>
        <BlogLi>
          <strong>Be specific:</strong> Include file names, frameworks,
          versions, and the expected outcome.
        </BlogLi>
        <BlogLi>
          <strong>Divide large tasks:</strong> Instead of asking "create an
          e-commerce", do it piece by piece: "create the product model", then
          "create the CRUD routes", etc.
        </BlogLi>
        <BlogLi>
          <strong>Provide context:</strong> If there is an error, paste the stack
          trace. If you want a refactor, explain why.
        </BlogLi>
        <BlogLi>
          <strong>Use interactive mode for long tasks:</strong> For
          changes that require multiple iterations, open a session with{" "}
          <BlogInlineCode>opencode</BlogInlineCode> without flags.
        </BlogLi>
        <BlogLi>
          <strong>
            Use <BlogInlineCode>-p</BlogInlineCode> for one-off tasks:
          </strong>{" "}
          For quick questions, explanations, or small changes, the{" "}
          <BlogInlineCode>-p</BlogInlineCode> flag is more efficient.
        </BlogLi>
        <BlogLi>
          <strong>Always review changes:</strong> OpenCode is powerful,
          but you are responsible for the code. Review changes before
          committing.
        </BlogLi>
        <BlogLi>
          <strong>Leverage version control:</strong> Work on a separate
          branch when using OpenCode for large changes. This way you can
          review the full diff before merging.
        </BlogLi>
      </BlogUl>

      <BlogH3>What OpenCode should NOT do</BlogH3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {[
          {
            rule: "Run scripts without supervision",
            why: "Always review what command it will execute before approving it.",
          },
          {
            rule: "Access production without confirmation",
            why: "Set up alerts and permissions so it does not modify real data.",
          },
          {
            rule: "Upload secrets to repositories",
            why: "OpenCode can read .env, but should not upload them. Always review the diff.",
          },
          {
            rule: "Make architectural decisions without your approval",
            why: "Design decisions are yours. OpenCode proposes, you decide.",
          },
        ].map(({ rule, why }) => (
          <div
            key={rule}
            className="rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50/50 dark:bg-amber-950/10 p-4"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <svg
                className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                {rule}
              </span>
            </div>
            <p className="text-xs text-amber-600/80 dark:text-amber-400/70 leading-relaxed">
              {why}
            </p>
          </div>
        ))}
      </div>

      <BlogH3>Integrating into your workflow</BlogH3>
      <BlogP>
        Here is an example of how to integrate OpenCode into your daily
        routine as a developer:
      </BlogP>

      <div className="space-y-2 my-4">
        {[
          {
            time: "08:30",
            action: "Open OpenCode in your terminal while checking emails",
          },
          {
            time: "08:35",
            action:
              "Ask: Give me a summary of the changes in this branch since main",
          },
          {
            time: "08:40",
            action: "Review the summary and start coding",
          },
          {
            time: "09:00",
            action:
              "Stuck on a bug. Paste the error: Debug this stack trace",
          },
          {
            time: "09:05",
            action: "OpenCode finds the cause. You apply the fix",
          },
          {
            time: "11:00",
            action:
              "Need tests: Generate tests for the new payments module",
          },
          {
            time: "11:45",
            action: "Ask for a PR review: Review my changes and suggest improvements",
          },
          {
            time: "12:00",
            action:
              "Exit with /exit. OpenCode saves the context automatically",
          },
        ].map(({ time, action }) => (
          <div
            key={time}
            className="flex items-start gap-3 px-4 py-2 rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
          >
            <span className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 shrink-0 w-10 leading-5">
              {time}
            </span>
            <span className="text-xs text-[#3a3a3c] dark:text-[#aeaeb2] leading-5">
              {action}
            </span>
          </div>
        ))}
      </div>

      <Divider />

      <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 my-6 text-white text-center">
        <p className="text-base font-bold mb-1">
          You are ready to use OpenCode
        </p>
        <p className="text-sm text-white/80">
          Install it now and start coding faster. It takes less than 2
          minutes.
        </p>
        <code className="inline-block mt-3 px-4 py-2 rounded-lg bg-black/20 text-sm font-mono">
          npm install -g @opencode/cli
        </code>
      </div>

      <div className="rounded-xl border border-violet-200 dark:border-violet-800/40 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 p-5 my-6">
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white shrink-0 shadow-sm">
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
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-1">
              Next step
            </p>
            <p className="text-sm font-bold text-[#1d1d1f] dark:text-white mb-1">
              AI models in OpenCode
            </p>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-3">
              OpenCode works with over 75 AI providers. Learn how to configure
              OpenAI, Claude, GitHub Copilot, local models with Ollama, and pick
              the best model for each task.
            </p>
            <a
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
              href="/blog/tutoriales/opencode-models"
            >
              Read full guide
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function OpenCodeContent() {
  return (
    <div className="space-y-2">
      <SectionQueEs />
      <Divider />
      <SectionParaQueSirve />
      <Divider />
      <SectionInstalacion />
      <Divider />
      <SectionPrimerUso />
      <Divider />
      <SectionComandos />
      <Divider />
      <SectionConsejos />
    </div>
  );
}
