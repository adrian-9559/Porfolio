"use client";
import { useMemo, useState } from "react";

import { BlogP } from "@/components/blog/shared";

type Category =
  | "diseno"
  | "desarrollo"
  | "herramientas"
  | "base-de-datos"
  | "inteligencia"
  | "contenido"
  | "seguridad";

interface SkillEntry {
  name: string;
  desc: string;
  use: string;
  action: string;
  icon: string;
  category: Category;
  location: string;
  origin: string;
  install: string;
}

const categoryMeta: Record<Category, { label: string; color: string }> = {
  diseno: { label: "Design", color: "bg-violet-500" },
  desarrollo: { label: "Development", color: "bg-blue-500" },
  herramientas: { label: "Tools", color: "bg-amber-500" },
  "base-de-datos": { label: "Database", color: "bg-emerald-500" },
  inteligencia: { label: "Code Intelligence", color: "bg-cyan-500" },
  contenido: { label: "Content & Presentations", color: "bg-rose-500" },
  seguridad: { label: "Security", color: "bg-red-500" },
};

const skills: SkillEntry[] = [
  {
    name: "UI/UX Pro Max",
    desc: "UI/UX design intelligence database with BM25 search. Patterns, stacks, design principles.",
    use: "Look up UI/UX patterns, find best practices by tech stack",
    action: "Use the ui-ux-pro-max skill",
    icon: "🎨",
    category: "diseno",
    location: ".claude/skills/ui-ux-pro-max/",
    origin: "claudekit — UI/UX design",
    install:
      "Comes included in the project. If missing, copy the .claude/skills/ui-ux-pro-max/ folder from the root repo.",
  },
  {
    name: "Design",
    desc: "Comprehensive design: brand identity, design tokens, UI styling, logo generation (55 styles, Gemini AI).",
    use: "Create visual identity, logos, mockups, complete design system",
    action: "Use the design skill",
    icon: "✏️",
    category: "diseno",
    location: ".claude/skills/design/",
    origin: "claudekit — comprehensive design",
    install:
      "Comes included in the project. If missing, copy the .claude/skills/design/ folder from the root repo.",
  },
  {
    name: "Design System",
    desc: "Three-layer token architecture (primitive → semantic → component). Component specifications and presentations.",
    use: "Define design tokens, create component specifications, strategic slides",
    action: "Use the design-system skill",
    icon: "🧩",
    category: "diseno",
    location: ".claude/skills/design-system/",
    origin: "claudekit — tokens and components",
    install:
      "Comes included in the project. If missing, copy the .claude/skills/design-system/ folder from the root repo.",
  },
  {
    name: "Frontend Design",
    desc: "Translate UI/UX Pro Max design decisions into frontend code with TailwindCSS and HeroUI (web + native).",
    use: "Convert designs to code implementing UI/UX Pro Max guidelines",
    action: "Use the frontend-design skill",
    icon: "💻",
    category: "diseno",
    location: ".agents/skills/frontend-design/",
    origin: "adrian_9559 — custom",
    install:
      "Copy the .agents/skills/frontend-design/ folder from the root repo or create it manually with the tutorial content.",
  },
  {
    name: "Banner Design",
    desc: "Banner design for social media, ads, website heroes, and print. 22 styles with generative AI.",
    use: "Create banners for Facebook, Twitter, LinkedIn, YouTube, Instagram, Google Display",
    action: "Use the banner-design skill",
    icon: "🖼️",
    category: "diseno",
    location: ".claude/skills/banner-design/",
    origin: "claudekit — banners",
    install:
      "Comes included in the project. If missing, copy .claude/skills/banner-design/ from the root repo.",
  },
  {
    name: "UI Styling",
    desc: "Accessible user interfaces with shadcn/ui (Radix UI + Tailwind), Tailwind CSS utility-first, and canvas-based visual design.",
    use: "Build accessible components, dark mode themes, posters, responsive layouts",
    action: "Use the ui-styling skill",
    icon: "✨",
    category: "diseno",
    location: ".claude/skills/ui-styling/",
    origin: "claudekit — interfaces",
    install:
      "Comes included in the project. If missing, copy .claude/skills/ui-styling/ from the root repo.",
  },
  {
    name: "Brand",
    desc: "Brand voice, visual identity, messaging frameworks, asset management, brand consistency.",
    use: "Create brand-aligned content, review consistency, generate style guides",
    action: "Use the brand skill",
    icon: "🏷️",
    category: "diseno",
    location: ".claude/skills/brand/",
    origin: "claudekit — brand",
    install:
      "Comes included in the project. If missing, copy .claude/skills/brand/ from the root repo.",
  },
  {
    name: "Node.js Backend Patterns",
    desc: "Production-ready backend patterns with Express/Fastify: middlewares, auth, database integration, REST APIs.",
    use: "Build Node.js servers, REST APIs, microservices, Express backend",
    action: "Use the nodejs-backend-patterns skill",
    icon: "⚙️",
    category: "desarrollo",
    location: ".agents/skills/nodejs-backend-patterns/",
    origin: "OpenCode Community",
    install:
      "Clone the community skills repo: git clone https://github.com/opencode/skills ~/.agents/skills/",
  },
  {
    name: "Vercel React Best Practices",
    desc: "React and Next.js performance optimization guides from Vercel Engineering. Data fetching, bundles, rendering.",
    use: "Optimize React/Next.js app performance, review data fetching patterns",
    action: "Use the vercel-react-best-practices skill",
    icon: "⚡",
    category: "desarrollo",
    location: ".agents/skills/vercel-react-best-practices/",
    origin: "Vercel — official",
    install: "npx opencode@latest skill add vercel-react-best-practices",
  },
  {
    name: "Supabase",
    desc: "Expert Supabase guide: Auth, Database, RLS, Edge Functions, Realtime, Storage, CLI, MCP, migrations.",
    use: "Configure Supabase, write RLS policies, migrations, Edge Functions, SSR integration",
    action: "Use the supabase skill",
    icon: "🔥",
    category: "base-de-datos",
    location: ".agents/skills/supabase/",
    origin: "Supabase — official",
    install: "npx opencode@latest skill add supabase",
  },
  {
    name: "Graphify",
    desc: "Knowledge graph of the source code. Queries about architecture, file relationships, change impact.",
    use: "Understand code architecture, find dependencies, trace change impact",
    action: "Use the graphify skill",
    icon: "🔮",
    category: "inteligencia",
    location: ".claude/skills/graphify/",
    origin: "Graphify",
    install:
      "Install CodeGraph in the project (codegraph init) and add .claude/skills/graphify/ from the root repo.",
  },
  {
    name: "Context7 MCP",
    desc: "Retrieves up-to-date library and framework documentation via Context7 MCP.",
    use: "Get current docs for React, Next.js, Prisma, Express, Tailwind, etc.",
    action: "Use the context7-mcp skill",
    icon: "📚",
    category: "herramientas",
    location: ".agents/skills/context7-mcp/",
    origin: "OpenCode Community",
    install: "npx opencode@latest skill add context7-mcp",
  },
  {
    name: "Find Docs",
    desc: "Documentation lookup, API references, and code examples for any development technology.",
    use: "Search for library docs, APIs, SDKs, and CLI tool documentation",
    action: "Use the find-docs skill",
    icon: "🔍",
    category: "herramientas",
    location: ".agents/skills/find-docs/",
    origin: "OpenCode Community",
    install: "npx opencode@latest skill add find-docs",
  },
  {
    name: "Find Skills",
    desc: "Helps discover and install skills when the user asks how to do something or looks for specific functionality.",
    use: "Find available skills for a specific task",
    action: "Use the find-skills skill",
    icon: "🧭",
    category: "herramientas",
    location: ".agents/skills/find-skills/",
    origin: "OpenCode Community",
    install: "npx opencode@latest skill add find-skills",
  },
  {
    name: "Customize OpenCode",
    desc: "OpenCode configuration: opencode.json, .opencode/ files, skills, plugins, MCP servers, permission rules.",
    use: "Edit OpenCode configuration, create skills and plugins",
    action: "Use the customize-opencode skill",
    icon: "🔧",
    category: "herramientas",
    location: ".opencode/skills/customize-opencode/",
    origin: "OpenCode — built-in",
    install:
      "Comes included with OpenCode. If missing, update to the latest version: npx opencode@latest upgrade",
  },
  {
    name: "Slides",
    desc: "Strategic HTML presentation creation with Chart.js, design tokens, responsive layouts, copywriting formulas.",
    use: "Generate presentations with charts, strategy slides, visual storytelling",
    action: "Use the slides skill",
    icon: "📊",
    category: "contenido",
    location: ".claude/skills/slides/",
    origin: "claudekit — presentations",
    install:
      "Comes included in the project. If missing, copy .claude/skills/slides/ from the root repo.",
  },
];

function CategoryPills({
  categories,
  active,
  onSelect,
  skillCountPerCategory,
}: {
  categories: [Category, number][];
  active: Category | null;
  onSelect: (c: Category | null) => void;
  skillCountPerCategory: Record<Category, number>;
}) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-8">
      <button
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
          active === null
            ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-sm"
            : "bg-black/5 dark:bg-white/8 text-[#6e6e73] dark:text-[#aeaeb2] hover:bg-black/10 dark:hover:bg-white/12"
        }`}
        onClick={() => onSelect(null)}
      >
        All ({skills.length})
      </button>
      {categories.map(([cat, count]) => (
        <button
          key={cat}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
            active === cat
              ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-sm"
              : "bg-black/5 dark:bg-white/8 text-[#6e6e73] dark:text-[#aeaeb2] hover:bg-black/10 dark:hover:bg-white/12"
          }`}
          onClick={() => onSelect(active === cat ? null : cat)}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${categoryMeta[cat].color}`}
          />
          {categoryMeta[cat].label}
          <span className="text-[10px] opacity-60">({count})</span>
        </button>
      ))}
    </div>
  );
}

export default function SkillsCatalogContent() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [openSkills, setOpenSkills] = useState<Set<string>>(new Set());

  const grouped = useMemo(() => {
    const categories = new Set(skills.map((s) => s.category));

    return [...categories]
      .map((cat) => ({
        category: cat,
        meta: categoryMeta[cat],
        items: skills.filter(
          (s) =>
            s.category === cat &&
            (activeCategory === null || s.category === activeCategory),
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [activeCategory]);

  const skillCountPerCategory = useMemo(() => {
    const counts: Record<string, number> = {};

    for (const s of skills) {
      counts[s.category] = (counts[s.category] || 0) + 1;
    }

    return counts as Record<Category, number>;
  }, []);

  const categoryEntries = useMemo(
    () =>
      Object.entries(skillCountPerCategory).sort((a, b) => b[1] - a[1]) as [
        Category,
        number,
      ][],
    [skillCountPerCategory],
  );

  const toggle = (name: string) => {
    setOpenSkills((prev) => {
      const next = new Set(prev);

      if (next.has(name)) next.delete(name);
      else next.add(name);

      return next;
    });
  };

  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 mb-8">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50">
          Article
        </span>
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
          8 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-4"
        style={{ letterSpacing: "-0.03em" }}
      >
        {skills.length} Skills to supercharge your AI
      </h1>
      <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-8">
        Catalog of OpenCode skills grouped by category. Each skill
        includes description, use case, and how to activate it.
      </p>

      <div className="h-px bg-black/8 dark:bg-white/8 mb-8" />

      <BlogP>
        Skills are activated by mentioning them in chat or referencing them in
        <code>AGENTS.md</code>. You don't need to install them — as long as they
        exist in the corresponding folder, the AI will find them.
      </BlogP>

      <CategoryPills
        active={activeCategory}
        categories={categoryEntries}
        skillCountPerCategory={skillCountPerCategory}
        onSelect={setActiveCategory}
      />

      <div className="space-y-10">
        {grouped.map(({ category, meta, items }) => (
          <section key={category}>
            <div className="flex items-center gap-3 mb-3 sticky top-0 bg-white/90 dark:bg-[#1d1d1f]/90 backdrop-blur-md z-10 py-2 -mx-4 px-4">
              <div className={`w-2 h-2 rounded-full ${meta.color}`} />
              <h2 className="text-sm font-bold text-[#1d1d1f] dark:text-white">
                {meta.label}
              </h2>
              <span className="text-[11px] text-[#aeaeb2] dark:text-[#636366] font-mono">
                {items.length}
              </span>
            </div>
            <div className="space-y-1.5">
              {items.map((skill) => {
                const isOpen = openSkills.has(skill.name);

                return (
                  <div
                    key={skill.name}
                    className="group rounded-xl border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-200"
                  >
                    <button
                      className="flex items-center gap-3 w-full px-4 py-3 text-left cursor-pointer"
                      onClick={() => toggle(skill.name)}
                    >
                      <span className="relative">
                        <span className="text-lg shrink-0 block">
                          {skill.icon}
                        </span>
                        <span
                          className={`absolute -inset-1 rounded-full opacity-0 transition-opacity duration-200 ${meta.color} ${
                            isOpen ? "opacity-10" : "group-hover:opacity-8"
                          }`}
                        />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                          {skill.name}
                        </p>
                        <p className="text-xs text-[#6e6e73] dark:text-[#86868b] line-clamp-1">
                          {skill.desc}
                        </p>
                      </div>
                      <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/8 text-[9px] font-mono font-semibold text-[#6e6e73] dark:text-[#aeaeb2] shrink-0">
                        {skill.location.split("/")[0]}
                      </span>
                      <svg
                        className={`w-4 h-4 text-[#aeaeb2] dark:text-[#636366] transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19 9l-7 7-7-7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen
                          ? "max-h-[30rem] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-4 pb-4 border-t border-black/8 dark:border-white/8 pt-3 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <p className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-1">
                              How to activate
                            </p>
                            <p className="text-xs text-[#3a3a3c] dark:text-[#aeaeb2] font-mono">
                              {skill.action}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-1">
                              Location
                            </p>
                            <p className="text-xs text-[#3a3a3c] dark:text-[#aeaeb2] font-mono">
                              {skill.location}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-1">
                            Recommended use
                          </p>
                          <p className="text-xs text-[#3a3a3c] dark:text-[#aeaeb2]">
                            {skill.use}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
                          <div>
                            <p className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-1">
                              Origin
                            </p>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-mono font-semibold">
                              {skill.origin}
                            </span>
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-1">
                              How to download
                            </p>
                            <p className="text-xs text-[#3a3a3c] dark:text-[#aeaeb2] leading-relaxed">
                              {skill.install}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
