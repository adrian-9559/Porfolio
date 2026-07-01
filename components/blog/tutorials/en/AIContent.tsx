"use client";
import { useState } from "react";
import { Button, Modal } from "@heroui/react";

import {
  BlogCallout,
  BlogCode,
  BlogH2,
  BlogH3,
  BlogLi,
  BlogOl,
  BlogP,
  BlogUl,
} from "@/components/blog/shared";

const fileDetails = [
  {
    id: "agents",
    name: "AGENTS.md / CLAUDE.md",
    icon: "📋",
    desc: "Persistent instructions for the AI assistant. Defines rules, stack, key routes and architecture decisions.",
    use: "Always — the most important file",
    color: "sky",
    detail:
      "This is the file that every AI (OpenCode, Claude Code, Cursor) looks for automatically when starting a session. It contains the project rules that the assistant must always follow.",
    sections: [
      {
        title: "Project header",
        content: "Name, description, tech stack with versions",
      },
      {
        title: "Folder structure",
        content: "Key project paths organized by module or layer",
      },
      {
        title: "Global rules",
        content:
          "Mandatory rules: code format, imports, conventions, errors to avoid",
      },
      {
        title: "Architecture decisions",
        content:
          "Why each library or pattern was chosen. Prevents the AI from suggesting incorrect alternatives",
      },
      {
        title: "Implemented modules",
        content: "List of what is already built, with paths and owners",
      },
    ],
    example: `# Portfolio — AI Context

## Stack
- Frontend: Next.js 16 (pages-router), React, TypeScript, TailwindCSS
- Backend: Node.js, Express, TypeScript
- Database: Supabase (PostgreSQL + Auth)

## Global rules
1. Minimal changes — only patches, never rewrite full files
2. Reuse first — search for existing before creating
3. Strict TypeScript — no \`any\` without justification`,
    prompt: `You are an expert in AI-assisted projects. Analyze my project (stack, structure, dependencies) and generate a complete AGENTS.md (or CLAUDE.md) file that includes:

1. **Project header** — name, description, and stack with exact versions
2. **Folder structure** — key paths in my project
3. **Global rules** — rules the AI assistant must always follow (code conventions, imports, errors to avoid)
4. **Architecture decisions** — why each library or pattern was chosen
5. **Implemented modules** — what is already built with paths

Examine my code and extract real patterns you use. The rules should be specific to my project, not generic.`,
  },
  {
    id: "design",
    name: "DESIGN.md",
    icon: "🎨",
    desc: "Unified design system: color palette, typography, spacing, components and CSS tokens.",
    use: "Projects with a frontend or visual identity",
    color: "pink",
    detail:
      "Unifies the project's visual identity so the AI generates code consistent with the brand. Without this file, the AI invents colors and styles every time.",
    sections: [
      {
        title: "Colors",
        content:
          "Primary, secondary, background, text, success/warning/error. Include HEX/RGB values for light and dark mode",
      },
      {
        title: "Typography",
        content:
          "Fonts (Google Fonts / system), sizes by hierarchy (h1→small), weights, line-height",
      },
      {
        title: "Spacing",
        content:
          "Base scale (4px), component margins, gap between sections",
      },
      {
        title: "Borders and shadows",
        content:
          "Radii (sm/md/lg/xl), border colors light/dark, card and modal elevations",
      },
      {
        title: "Components",
        content:
          "Button variants, inputs, cards, modals with Tailwind class examples",
      },
    ],
    example: `# Design System

## Colors
- primary: #8B5CF6 (Violet)
- background: #FAFAFA (light) / #0A0A0A (dark)
- text: #1D1D1F (light) / #F5F5F7 (dark)

## Typography
- Font: Inter, system sans-serif
- h1: 36px bold, h2: 24px bold, body: 14px regular

## Components
- Button: filled (primary), outline (secondary), ghost`,
    prompt: `You are a design system designer. Analyze my frontend project and generate a complete DESIGN.md file that includes:

1. **Colors** — extract the actual colors I use in my code (Tailwind classes, CSS variables, HEX values). Include light and dark mode
2. **Typography** — fonts, sizes by hierarchy, weights. Check my tailwind.config or CSS
3. **Spacing** — the scale I actually use in components and layouts
4. **Borders and shadows** — corner radii, card elevations, border colors
5. **Components** — button variants, inputs, cards as they appear in my codebase

Review my .tsx and .css files to extract the actual values. Nothing made up.`,
  },
  {
    id: "memory",
    name: "MEMORY.md / project-state.md",
    icon: "🧠",
    desc: "Current project state, completed and pending tasks. Prevents the AI from losing context between sessions.",
    use: "Large projects with frequent AI collaboration",
    color: "amber",
    detail:
      "The AI does not remember previous sessions. MEMORY.md is the project's 'save state': what was done, what is missing, what decisions were made.",
    sections: [
      {
        title: "Current state",
        content:
          "Summary phrase: 'The project is in early stage, with authentication implemented and user CRUD working'",
      },
      {
        title: "Completed tasks",
        content:
          "Checkmarked list of what already works. Include relevant file paths",
      },
      {
        title: "Pending tasks",
        content:
          "Next steps ordered by priority. The AI will use them to know what comes next",
      },
      {
        title: "Recent decisions",
        content:
          "Architecture or design decisions made in the last session. Prevents the AI from proposing the opposite",
      },
      {
        title: "Known issues",
        content:
          "Bugs, technical debt, things you know are wrong but haven't fixed",
      },
    ],
    example: `# Project State — 07/01/2026

## Status: Active development (backend complete, frontend in progress)

## Completed
- ✅ Auth with Supabase (email + Google OAuth)
- ✅ User CRUD (profiles table)
- ✅ REST API with Express (routes, controllers, services)

## Pending
- [ ] Frontend: Dashboard page (components/dashboard/)
- [ ] Tests: Unit tests for backend services`,
    prompt: `You are a technical project manager. Analyze my project and generate a MEMORY.md file with the current state including:

1. **General status** — one-sentence summary of the project's current moment
2. **Completed tasks** — everything that already works, with key file paths
3. **Pending tasks** — what remains to be done, ordered by priority
4. **Recent decisions** — architecture or design changes from the last session
5. **Known issues** — bugs, technical debt, things pending to fix

Review the project files, recent commits, and any TODO/FIXME to generate an accurate picture.`,
  },
  {
    id: "architecture",
    name: "ARCHITECTURE.md",
    icon: "🏗️",
    desc: "Architecture diagrams and decisions: folder structure, patterns, data flow.",
    use: "Projects with backend or complex systems",
    color: "purple",
    detail:
      "Describes how the project is organized at a high level. The AI uses it to know where to put things and what pattern to follow.",
    sections: [
      {
        title: "Folder structure",
        content:
          "Project tree with description of each main directory",
      },
      {
        title: "Design patterns",
        content:
          "Controllers/Services/Repository, Server Actions, component composition, etc.",
      },
      {
        title: "Data flow",
        content:
          "How information travels: request → middleware → controller → service → DB → response",
      },
      {
        title: "Database",
        content:
          "Main schema, key tables, relationships, security policies (RLS)",
      },
      {
        title: "Authentication",
        content:
          "Login flow, refresh tokens, route protection, roles and permissions",
      },
    ],
    example: `# Architecture

## Structure
 frontend/apps/web/
 ├── pages/       # Next.js Pages Router
 ├── components/  # UI components (reusable)
 ├── features/    # Feature-based modules
 ├── lib/         # Utilities, config, API client
 └── layouts/     # Page layouts

## Backend pattern
 Route → Middleware → Controller → Service → Repository → DB`,
    prompt: `You are a software architect. Analyze my project and generate an ARCHITECTURE.md file that documents:

1. **Folder structure** — complete directory tree with description of each one
2. **Design patterns** — what patterns I actually use (controllers/services, server actions, composition, etc.)
3. **Data flow** — how information travels from request to response
4. **Database** — schema, main tables, relationships, and security policies
5. **Authentication** — complete login flow, refresh, route protection

Examine my real codebase to extract the architecture as it is implemented, not as it should be.`,
  },
  {
    id: "api",
    name: "API.md",
    icon: "🔌",
    desc: "API contract: endpoints, request/response formats, authentication.",
    use: "Projects with a backend API",
    color: "emerald",
    detail:
      "Documents the complete API contract so the AI consumes the endpoints correctly without having to guess routes or formats.",
    sections: [
      {
        title: "Endpoints",
        content:
          "Full list: HTTP method, path, description, parameters (path/query/body)",
      },
      {
        title: "Response format",
        content:
          "Unified structure: { success, data, error }. Examples of each response",
      },
      {
        title: "Authentication",
        content:
          "Auth type (Bearer JWT), how to get the token, required headers",
      },
      {
        title: "Errors",
        content:
          "Common error codes, error format, expected messages",
      },
      {
        title: "Examples",
        content:
          "curl or fetch for each endpoint. The AI will use them to write tests or integrate the frontend",
      },
    ],
    example: `# API Contract

## Format
 { success: boolean, data?: T, error?: string }

## Endpoints
 GET  /api/users        → list users
 POST /api/auth/login   → { email, password } → { accessToken, refreshToken }
 GET  /api/users/:id    → user by ID (requires auth)

## Auth
 Authorization: Bearer <accessToken>
 Refresh: POST /api/auth/refresh { refresh_token }`,
    prompt: `You are an API documenter. Analyze my backend and generate a complete API.md file that includes:

1. **Endpoints** — list of all routes with HTTP method, path, description, and parameters
2. **Response format** — unified structure my API uses
3. **Authentication** — how requests are authenticated, token format, refresh
4. **Errors** — error codes, format, messages
5. **Examples** — curl or fetch for each endpoint

Review my route and controller files to extract the actual endpoints. Include TypeScript types if present.`,
  },
];

const rulesExamples = [
  "No confirm(), use React state for inline confirmations",
  "Prefer server actions over API routes in Next.js",
  "All new files include strict TypeScript",
  "DB queries always use supabaseAdmin (bypass RLS)",
  "Colors always from CSS variables, never hardcoded values",
  "Error messages in English, code in English",
  "DB migrations in separate SQL files, not in code",
];

function FolderIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4"
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
  );
}

export default function AIContent() {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const file = fileDetails.find((f) => f.id === activeFile);

  const copyPrompt = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback: manual selection
    }
  };

  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 mb-8">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50">
          Tutorial
        </span>
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
          20 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-4"
        style={{ letterSpacing: "-0.03em" }}
      >
        How to start a project with AI
      </h1>
      <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-8">
        Practical guide to building AI-assisted projects: from context files to
        daily workflow. Learn to create an AGENTS.md, a DESIGN.md, and how to
        direct the AI as if it were your best junior developer.
      </p>

      <div className="h-px bg-black/8 dark:bg-white/8 mb-8" />

      <BlogP>
        The difference between an AI that saves you time and one that gives you a
        headache lies in how you communicate what you want. Just like a human
        developer needs context —knowing what project they are working on,
        what libraries you use, what conventions you follow— the AI needs it too.
      </BlogP>
      <BlogP>
        This tutorial teaches you to create context files that all AI respects,
        define a design system that stays consistent, and establish a workflow
        that maximizes productivity.
      </BlogP>

      <BlogH2>Why context files?</BlogH2>
      <BlogP>
        Every time you talk to an AI (Claude, GPT, OpenCode, Cursor), you start
        with a blank slate. The AI does not know what stack you use, whether you
        prefer camelCase or snake_case, or what colors your brand has.
      </BlogP>
      <BlogP>
        Context files (CLAUDE.md, AGENTS.md) solve this: they are
        persistent instructions that the AI reads at the start of each session.
        Once written, you do not have to repeat the same explanations every time.
      </BlogP>

      <BlogCallout type="tip">
        Most AI assistants (OpenCode, Claude Code, Cursor) automatically
        read <strong>CLAUDE.md</strong> or <strong>AGENTS.md</strong>{" "}
        from the project root. Just create the file and write the rules.
      </BlogCallout>

      <BlogH2>Step 1: The rules file (AGENTS.md / CLAUDE.md)</BlogH2>
      <BlogP>
        This is the most important file. It defines <strong>how</strong> you want
        the AI to work: what stack you use, what patterns you follow, what it
        should not do.
      </BlogP>

      <BlogH3>Recommended structure</BlogH3>
      <BlogOl>
        <BlogLi>
          <strong>Project header</strong> — name, description, purpose
        </BlogLi>
        <BlogLi>
          <strong>Tech stack</strong> — frameworks, libraries, versions
        </BlogLi>
        <BlogLi>
          <strong>Folder structure</strong> — key paths, where everything is
        </BlogLi>
        <BlogLi>
          <strong>Global rules</strong> — rules the assistant must always follow
        </BlogLi>
        <BlogLi>
          <strong>Architecture decisions</strong> — why one solution was chosen over another
        </BlogLi>
        <BlogLi>
          <strong>Implemented modules</strong> — what is done and how it is organized
        </BlogLi>
      </BlogOl>

      <BlogH3>Real example</BlogH3>
      <BlogCode>{`# Portfolio — AI Context

## Stack
- Frontend: Next.js 16 (pages-router), React, TypeScript, TailwindCSS, HeroUI
- Backend: Node.js, Express, TypeScript
- Database: Supabase (PostgreSQL + Auth)

## Global rules (MANDATORY)
1. Minimal changes — only patches, never rewrite full files
2. Reuse first — search for existing before creating
3. Strict TypeScript — no \`any\` without justification
4. API format: { success, data, error } — use ok() in controllers
5. No confirm() — inline confirmations with React state
6. No obvious comments — only non-obvious WHY`}</BlogCode>

      <BlogCallout type="info">
        The more specific the rules, the better. "Use Tailwind" is worse
        than "Colors always from CSS variables, never hardcoded values".
      </BlogCallout>

      <BlogH3>Best practices for rules</BlogH3>
      <BlogUl>
        {rulesExamples.map((rule) => (
          <BlogLi key={rule}>{rule}</BlogLi>
        ))}
      </BlogUl>

      <BlogH3>How to update it</BlogH3>
      <BlogP>
        The AGENTS.md is not static. Every time the AI does something you do not
        like —an incorrect pattern, a library it does not use— add a rule.
        Over time, the file grows and the AI becomes more precise.
      </BlogP>
      <BlogCallout type="done">
        Keep AGENTS.md updated. It is an investment: each new rule
        prevents future errors.
      </BlogCallout>

      <BlogH2>Step 2: The design system (DESIGN.md)</BlogH2>
      <BlogP>
        If your project has a user interface, you need a DESIGN.md. This
        file unifies the color palette, typography, spacing, and
        components so the AI generates visually coherent code.
      </BlogP>

      <BlogH3>What to include</BlogH3>
      <BlogUl>
        <BlogLi>
          <strong>Colors</strong> — primary, secondary, background, text, states
          (hover, active, disabled), dark mode
        </BlogLi>
        <BlogLi>
          <strong>Typography</strong> — fonts, sizes, weights, hierarchy (h1,
          h2, body, small)
        </BlogLi>
        <BlogLi>
          <strong>Spacing</strong> — scale (4, 8, 12, 16, 24, 32, 48, 64),
          margins, paddings
        </BlogLi>
        <BlogLi>
          <strong>Borders and shadows</strong> — radii, elevations, border
          colors
        </BlogLi>
        <BlogLi>
          <strong>Components</strong> — buttons, inputs, cards, modals with
          their variants
        </BlogLi>
        <BlogLi>
          <strong>Icons</strong> — style (outline, solid), standard size,
          library
        </BlogLi>
      </BlogUl>

      <BlogH3>DESIGN.md example</BlogH3>
      <BlogCode>{`# Design System

## Colors
- primary: #8B5CF6 (Violet)
- secondary: #06B6D4 (Cyan)
- background: #FAFAFA (light) / #0A0A0A (dark)
- text: #1D1D1F (light) / #F5F5F7 (dark)
- muted: #6E6E73 (light) / #86868B (dark)
- success: #10B981, warning: #F59E0B, error: #EF4444

## Typography
- Font: Inter, system sans-serif
- h1: 36px bold, h2: 24px bold, h3: 18px semibold
- body: 14px regular, small: 12px, caption: 11px

## Spacing
- Scale: 2, 4, 8, 12, 16, 24, 32, 48, 64
- Cards: p-4/p-6, gap between sections: 24px

## Borders
- radius: 8px (sm), 12px (md), 16px (lg), 24px (xl)
- border color: black/8 (light), white/8 (dark)

## Components
- Button: filled (primary), outline (secondary), ghost (tertiary)
- Input: border-0 bg-black/5 rounded-xl p-3
- Card: rounded-2xl border p-4 bg-white dark:bg-[#111116]`}</BlogCode>

      <BlogCallout type="tip">
        Use <strong>CSS variables</strong> for design tokens. This way the AI
        can reference them by name and change the entire theme by editing a
        single file.
      </BlogCallout>

      <BlogH3>Relationship between DESIGN.md and components</BlogH3>
      <BlogP>
        The DESIGN.md does not replace Tailwind or your UI framework. It is an{" "}
        <strong>abstraction layer</strong> that tells the AI what design
        decisions to make. If you use Tailwind, the rules would be something
        like: "use bg-violet-500 for primary, text-zinc-900 dark:text-zinc-100
        for text".
      </BlogP>
      <BlogP>
        If you change your mind about a color later, update the DESIGN.md
        and ask the AI to apply the change across all components.
      </BlogP>

      <BlogH2>Step 3: Supplementary files</BlogH2>
      <BlogP>
        Depending on the size of your project, you can add more context files.
        Here are the most useful ones. Click each one to see the details:
      </BlogP>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {fileDetails.map((f) => (
          <button
            key={f.id}
            className="text-left rounded-xl border border-black/8 dark:border-white/8 p-4 hover:border-sky-200 dark:hover:border-sky-800/40 transition-colors cursor-pointer bg-transparent w-full"
            type="button"
            onClick={() => setActiveFile(f.id)}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-base">{f.icon}</span>
              <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                {f.name}
              </p>
            </div>
            <p className="text-xs text-[#3a3a3c] dark:text-[#aeaeb2] mb-2 leading-relaxed">
              {f.desc}
            </p>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-[10px] font-semibold">
                {f.use}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-violet-600 dark:text-violet-400">
                View details
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* File detail modal */}
      {file && (
        <Modal.Backdrop
          isOpen={!!activeFile}
          onOpenChange={(open) => {
            if (!open) setActiveFile(null);
          }}
        >
          <Modal.Container scroll="inside" size="cover">
            <Modal.Dialog>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <span className="text-lg">{file.icon}</span>
                </Modal.Icon>
                <Modal.Heading>{file.name}</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2] leading-relaxed">
                      {file.detail}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white uppercase tracking-wider mb-3">
                      Recommended sections
                    </p>
                    <div className="space-y-2">
                      {file.sections.map((s) => (
                        <div
                          key={s.title}
                          className="rounded-lg border border-black/8 dark:border-white/8 p-3"
                        >
                          <p className="text-xs font-bold text-[#1d1d1f] dark:text-white mb-0.5">
                            {s.title}
                          </p>
                          <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                            {s.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white uppercase tracking-wider mb-2">
                      Example
                    </p>
                    <pre className="bg-[#0d1117] rounded-xl p-4 overflow-x-auto text-xs leading-relaxed [&>code]:text-[#e6edf3]">
                      <code>{file.example.trimEnd()}</code>
                    </pre>
                  </div>

                  <div className="rounded-xl border-2 border-violet-200 dark:border-violet-800/40 p-4 bg-gradient-to-br from-violet-50/40 to-transparent dark:from-violet-950/10">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-violet-800 dark:text-violet-300 uppercase tracking-wider">
                        Prompt for your AI
                      </p>
                      <button
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold transition-colors bg-violet-200/60 dark:bg-violet-800/30 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-700/40"
                        type="button"
                        onClick={() => copyPrompt(file.id, file.prompt)}
                      >
                        {copiedId === file.id ? (
                          <>✅ Copied</>
                        ) : (
                          <>
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                              />
                            </svg>
                            Copy prompt
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-[#1d1d1f] dark:text-white/90 leading-relaxed">
                      Copy this prompt and paste it into your AI assistant to
                      generate the <strong>{file.name}</strong> file by analyzing
                      your real project:
                    </p>
                    <div className="relative mt-3">
                      <pre className="bg-[#0d1117] rounded-xl p-4 overflow-x-auto text-xs leading-relaxed [&>code]:text-[#e6edf3] pr-12">
                        <code>{file.prompt}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  Close
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      )}

      <BlogH2>Step 4: How to talk to the AI</BlogH2>
      <BlogP>
        Context files are the <strong>what</strong>, but you also need
        the <strong>how</strong>. The way you ask things of the AI
        determines the quality of the result.
      </BlogP>

      <BlogH3>Basic principles</BlogH3>
      <BlogUl>
        <BlogLi>
          <strong>Be specific</strong> — "Add a save button" ← "Add
          a save button in the top right corner of the form, primary color,
          check icon, disabled while submitting"
        </BlogLi>
        <BlogLi>
          <strong>One thing at a time</strong> — AIs work better with
          atomic tasks. "Create the login form" is better than "Build the
          whole app"
        </BlogLi>
        <BlogLi>
          <strong>Give context</strong> — "Create a ProductCard component
          receiving title, price, image, and onClick. Follow the existing card
          design in components/ui/"
        </BlogLi>
        <BlogLi>
          <strong>Correct and refine</strong> — If the AI generates something
          incorrect, tell it. "The button should be outline, not primary" —
          the AI learns from each correction
        </BlogLi>
        <BlogLi>
          <strong>Use references</strong> — "Look at the file
          components/Layout.tsx and do something similar for the dashboard page"
        </BlogLi>
      </BlogUl>

      <BlogH3>What to avoid</BlogH3>
      <BlogUl>
        <BlogLi>
          <strong>Open-ended tasks</strong> — "Make the app look better"
          gives no useful direction
        </BlogLi>
        <BlogLi>
          <strong>Conflicting instructions</strong> — "Be creative but
          follow the rules to the letter" confuses the AI
        </BlogLi>
        <BlogLi>
          <strong>Changing topic constantly</strong> — Each new topic
          partially resets the context. Finish one task before starting
          another
        </BlogLi>
        <BlogLi>
          <strong>Assuming it remembers</strong> — The AI has no memory
          between sessions. Everything it needs to know must be in the
          context files or the current message
        </BlogLi>
      </BlogUl>

      <BlogCallout type="warn">
        The AI does not remember previous conversations. If you work on a
        project for days, context files are the only way to maintain
        consistency.
      </BlogCallout>

      <BlogH2>Step 5: Daily workflow</BlogH2>
      <BlogP>
        With context files in place, the workflow becomes predictable:
      </BlogP>

      <BlogOl>
        <BlogLi>
          <strong>Open the project</strong> — the AI reads AGENTS.md and DESIGN.md
          automatically
        </BlogLi>
        <BlogLi>
          <strong>Give a concrete task</strong> — "Create the Navbar component
          in components/layout/"
        </BlogLi>
        <BlogLi>
          <strong>Review the result</strong> — the AI generates the code, you
          review it
        </BlogLi>
        <BlogLi>
          <strong>Correct if needed</strong> — "Change the hover color
          to primary-600"
        </BlogLi>
        <BlogLi>
          <strong>Update the state</strong> — mark the task as completed
          in MEMORY.md
        </BlogLi>
        <BlogLi>
          <strong>Repeat</strong> — next task
        </BlogLi>
      </BlogOl>

      <BlogH3>Context management</BlogH3>
      <BlogP>
        Each AI session has a token limit (typically 100k–200k). If
        you work on a large project, the context fills up quickly. Strategies
        to manage it:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Divide work into thematic sessions</strong> — one session
          for backend, another for frontend
        </BlogLi>
        <BlogLi>
          <strong>Keep a MEMORY.md</strong> — summary of current state for
          the AI to catch up quickly
        </BlogLi>
        <BlogLi>
          <strong>Use AGENTS.md for stable rules</strong> — only rules that do
          not change. Volatile things (pending tasks) go in MEMORY.md
        </BlogLi>
        <BlogLi>
          <strong>Prioritize</strong> — If the context fills up, ask the AI to
          focus on the most important things and discard the secondary
        </BlogLi>
      </BlogUl>

      <BlogH2>Complete example: real project</BlogH2>
      <BlogP>
        This very portfolio where you are reading this tutorial uses the system
        I just described. It has:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>CLAUDE.md</strong> — stack, global rules, folder structure,
          implemented modules
        </BlogLi>
        <BlogLi>
          <strong>AGENTS.md</strong> — memories the AI loads based on the task
          (backend, frontend, database, auth...)
        </BlogLi>
        <BlogLi>
          <strong>Design system</strong> — defined in TailwindCSS with
          consistent tokens and dark mode
        </BlogLi>
        <BlogLi>
          <strong>State files</strong> — project-state.md with completed
          and pending tasks
        </BlogLi>
      </BlogUl>

      <BlogP>
        Every time I start a new session with the AI, it already knows what
        stack I use, how I structure the code, and what colors the brand has.
        I do not have to repeat anything.
      </BlogP>

      <BlogCallout type="done">
        The key is not having the most powerful AI, but knowing how to
        direct it. With good context files, even a small model delivers
        excellent results. Without context, even the largest model gets it
        wrong.
      </BlogCallout>

      <BlogH2>Summary</BlogH2>
      <BlogUl>
        <BlogLi>
          Create an <strong>AGENTS.md</strong> or <strong>CLAUDE.md</strong> with
          the project rules and stack
        </BlogLi>
        <BlogLi>
          Create a <strong>DESIGN.md</strong> with design tokens (colors,
          typography, spacing, components)
        </BlogLi>
        <BlogLi>
          Add supplementary files based on project size
          (MEMORY.md, ARCHITECTURE.md, API.md)
        </BlogLi>
        <BlogLi>
          Be specific in your instructions: a concrete task, enough
          context, references to existing files
        </BlogLi>
        <BlogLi>
          Update context files constantly — each new rule
          prevents future errors
        </BlogLi>
        <BlogLi>
          Divide work into thematic sessions and manage the token limit
        </BlogLi>
      </BlogUl>
    </article>
  );
}
