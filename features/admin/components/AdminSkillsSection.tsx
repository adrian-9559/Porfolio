import { useState } from "react";

import { useT } from "@/hooks/useT";

// ── Types ─────────────────────────────────────────────────────────────────────

type Category =
  | "design"
  | "frontend"
  | "mobile"
  | "backend"
  | "database"
  | "tools"
  | "plugins";

interface SkillFile {
  path: string;
  scope: string;
}

interface Skill {
  name: string;
  description: string;
  category: Category;
  files: SkillFile[];
}

interface Plugin {
  name: string;
  description: string;
  type: "mcp" | "npm" | "hook";
  details: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const SKILLS: Skill[] = [
  {
    name: "banner-design",
    description:
      "Design banners for social media, ads, website heroes, creative assets, and print. Multiple art direction options with AI-generated visuals.",
    category: "design",
    files: [
      { path: ".opencode/skills/banner-design/SKILL.md", scope: "global" },
      { path: ".claude/skills/banner-design/SKILL.md", scope: "claude" },
    ],
  },
  {
    name: "brand",
    description:
      "Brand voice, visual identity, messaging frameworks, asset management, brand consistency.",
    category: "design",
    files: [
      { path: ".opencode/skills/brand/SKILL.md", scope: "global" },
      { path: ".claude/skills/brand/SKILL.md", scope: "claude" },
    ],
  },
  {
    name: "design",
    description:
      "Comprehensive design skill: brand identity, design tokens, UI styling, logo generation (55 styles), corporate identity program, HTML presentations, banner design, icon design, social photos.",
    category: "design",
    files: [
      { path: ".opencode/skills/design/SKILL.md", scope: "global" },
      { path: ".claude/skills/design/SKILL.md", scope: "claude" },
    ],
  },
  {
    name: "design-system",
    description:
      "Token architecture, component specifications, and slide generation. Three-layer tokens (primitive → semantic → component).",
    category: "design",
    files: [
      { path: ".opencode/skills/design-system/SKILL.md", scope: "global" },
      { path: ".claude/skills/design-system/SKILL.md", scope: "claude" },
    ],
  },
  {
    name: "slides",
    description:
      "Create strategic HTML presentations with Chart.js, design tokens, responsive layouts, copywriting formulas, and contextual slide strategies.",
    category: "design",
    files: [
      { path: ".opencode/skills/slides/SKILL.md", scope: "global" },
      { path: ".claude/skills/slides/SKILL.md", scope: "claude" },
    ],
  },
  {
    name: "ui-styling",
    description:
      "Create beautiful, accessible user interfaces with Tailwind CSS, shadcn/ui components, and canvas-based visual designs.",
    category: "design",
    files: [
      { path: ".opencode/skills/ui-styling/SKILL.md", scope: "global" },
      { path: ".claude/skills/ui-styling/SKILL.md", scope: "claude" },
    ],
  },
  {
    name: "ui-ux-pro-max",
    description:
      "UI/UX design intelligence with searchable database — 67 styles, 161 color palettes, 57 font pairings, 99 UX guidelines, 25 chart types across 22 technology stacks.",
    category: "design",
    files: [
      { path: ".opencode/skills/ui-ux-pro-max/SKILL.md", scope: "global" },
      { path: ".claude/skills/ui-ux-pro-max/SKILL.md", scope: "claude" },
    ],
  },
  {
    name: "frontend-design",
    description:
      "Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one.",
    category: "frontend",
    files: [
      { path: ".agents/skills/frontend-design/SKILL.md", scope: "root" },
      {
        path: "frontend/apps/web/.agents/skills/frontend-design/SKILL.md",
        scope: "web",
      },
      {
        path: "frontend/apps/Partimos/.agents/skills/frontend-design/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "accessibility",
    description:
      "Audit and improve web accessibility following WCAG 2.2 guidelines.",
    category: "frontend",
    files: [
      {
        path: "frontend/apps/web/.agents/skills/accessibility/SKILL.md",
        scope: "web",
      },
      {
        path: "frontend/apps/Partimos/.agents/skills/accessibility/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "vercel-react-best-practices",
    description:
      "React and Next.js performance optimization guidelines from Vercel Engineering.",
    category: "frontend",
    files: [
      {
        path: "frontend/apps/web/.agents/skills/react-best-practices/SKILL.md",
        scope: "web",
      },
      {
        path: "frontend/apps/Partimos/.agents/skills/react-best-practices/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "vercel-composition-patterns",
    description:
      "React composition patterns that scale. Use when refactoring components with boolean prop proliferation.",
    category: "frontend",
    files: [
      {
        path: "frontend/apps/web/.agents/skills/composition-patterns/SKILL.md",
        scope: "web",
      },
      {
        path: "frontend/apps/Partimos/.agents/skills/composition-patterns/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "seo",
    description: "Optimize for search engine visibility and ranking.",
    category: "frontend",
    files: [
      { path: "frontend/apps/web/.agents/skills/seo/SKILL.md", scope: "web" },
      {
        path: "frontend/apps/Partimos/.agents/skills/seo/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "tailwind-css-patterns",
    description:
      "Comprehensive Tailwind CSS utility-first styling patterns including responsive design, layout utilities, flexbox, grid, spacing, typography, colors.",
    category: "frontend",
    files: [
      {
        path: "frontend/apps/web/.agents/skills/tailwind-css-patterns/SKILL.md",
        scope: "web",
      },
    ],
  },
  {
    name: "next-best-practices",
    description:
      "Next.js best practices — file conventions, RSC boundaries, data patterns, async APIs, metadata, error handling, route handlers, image/font optimization.",
    category: "frontend",
    files: [
      {
        path: "frontend/apps/web/.agents/skills/next-best-practices/SKILL.md",
        scope: "web",
      },
    ],
  },
  {
    name: "next-cache-components",
    description:
      "Next.js 16 Cache Components — PPR, use cache directive, cacheLife, cacheTag, updateTag.",
    category: "frontend",
    files: [
      {
        path: "frontend/apps/web/.agents/skills/next-cache-components/SKILL.md",
        scope: "web",
      },
    ],
  },
  {
    name: "next-upgrade",
    description:
      "Upgrade Next.js to the latest version following official migration guides and codemods.",
    category: "frontend",
    files: [
      {
        path: "frontend/apps/web/.agents/skills/next-upgrade/SKILL.md",
        scope: "web",
      },
    ],
  },
  {
    name: "building-native-ui",
    description:
      "Complete guide for building beautiful apps with Expo Router. Covers fundamentals, styling, components, navigation, animations, patterns, and native tabs.",
    category: "mobile",
    files: [
      {
        path: "frontend/apps/Partimos/.agents/skills/building-native-ui/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "sleek-design-mobile-apps",
    description:
      "Design mobile apps, create screens, build UI, and interact with Sleek projects.",
    category: "mobile",
    files: [
      {
        path: "frontend/apps/Partimos/.agents/skills/design-mobile-apps/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "expo-api-routes",
    description:
      "Guidelines for creating API routes in Expo Router with EAS Hosting.",
    category: "mobile",
    files: [
      {
        path: "frontend/apps/Partimos/.agents/skills/expo-api-routes/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "expo-cicd-workflows",
    description:
      "Helps understand and write EAS workflow YAML files for Expo projects.",
    category: "mobile",
    files: [
      {
        path: "frontend/apps/Partimos/.agents/skills/expo-cicd-workflows/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "expo-deployment",
    description:
      "Deploying Expo apps to iOS App Store, Android Play Store, web hosting, and API routes.",
    category: "mobile",
    files: [
      {
        path: "frontend/apps/Partimos/.agents/skills/expo-deployment/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "expo-dev-client",
    description:
      "Build and distribute Expo development clients locally or via TestFlight.",
    category: "mobile",
    files: [
      {
        path: "frontend/apps/Partimos/.agents/skills/expo-dev-client/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "expo-tailwind-setup",
    description:
      "Set up Tailwind CSS v4 in Expo with react-native-css and NativeWind v5 for universal styling.",
    category: "mobile",
    files: [
      {
        path: "frontend/apps/Partimos/.agents/skills/expo-tailwind-setup/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "native-data-fetching",
    description:
      "Implement and debug network requests, API calls, or data fetching. Covers fetch API, React Query, SWR, error handling, caching, offline support, and Expo Router data loaders.",
    category: "mobile",
    files: [
      {
        path: "frontend/apps/Partimos/.agents/skills/native-data-fetching/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "upgrading-expo",
    description:
      "Guidelines for upgrading Expo SDK versions and fixing dependency issues.",
    category: "mobile",
    files: [
      {
        path: "frontend/apps/Partimos/.agents/skills/upgrading-expo/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "use-dom",
    description:
      "Use Expo DOM components to run web code in a webview on native and as-is on web.",
    category: "mobile",
    files: [
      {
        path: "frontend/apps/Partimos/.agents/skills/use-dom/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "nodejs-backend-patterns",
    description:
      "Build production-ready Node.js backend services with Express/Fastify, implementing middleware patterns, error handling, authentication, database integration, and API design best practices.",
    category: "backend",
    files: [
      {
        path: "backend/.agents/skills/nodejs-backend-patterns/SKILL.md",
        scope: "backend",
      },
      {
        path: "frontend/apps/web/.agents/skills/nodejs-backend-patterns/SKILL.md",
        scope: "web",
      },
      {
        path: "frontend/apps/Partimos/.agents/skills/nodejs-backend-patterns/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "nodejs-best-practices",
    description:
      "Node.js development principles and decision-making. Framework selection, async patterns, security, and architecture.",
    category: "backend",
    files: [
      {
        path: "backend/.agents/skills/nodejs-best-practices/SKILL.md",
        scope: "backend",
      },
      {
        path: "frontend/apps/web/.agents/skills/nodejs-best-practices/SKILL.md",
        scope: "web",
      },
      {
        path: "frontend/apps/Partimos/.agents/skills/nodejs-best-practices/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "nodejs-express-server",
    description:
      "Build production-ready Express.js servers with middleware, authentication, routing, and database integration.",
    category: "backend",
    files: [
      {
        path: "backend/.agents/skills/nodejs-express-server/SKILL.md",
        scope: "backend",
      },
    ],
  },
  {
    name: "typescript-advanced-types",
    description:
      "Master TypeScript advanced type system including generics, conditional types, mapped types, template literals, and utility types.",
    category: "backend",
    files: [
      {
        path: "backend/.agents/skills/typescript-advanced-types/SKILL.md",
        scope: "backend",
      },
      {
        path: "frontend/apps/web/.agents/skills/typescript-advanced-types/SKILL.md",
        scope: "web",
      },
      {
        path: "frontend/apps/Partimos/.agents/skills/typescript-advanced-types/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "zod",
    description:
      "Zod schema validation best practices for type safety, parsing, and error handling.",
    category: "backend",
    files: [{ path: "backend/.agents/skills/zod/SKILL.md", scope: "backend" }],
  },
  {
    name: "supabase-postgres-best-practices",
    description:
      "Postgres performance optimization and best practices from Supabase.",
    category: "database",
    files: [
      {
        path: "backend/.agents/skills/supabase-postgres-best-practices/SKILL.md",
        scope: "backend",
      },
      {
        path: "frontend/apps/Partimos/.agents/skills/supabase-postgres-best-practices/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "bash-defensive-patterns",
    description:
      "Master defensive Bash programming techniques for production-grade scripts. Use when writing robust shell scripts, CI/CD pipelines, or system utilities requiring fault tolerance and safety.",
    category: "tools",
    files: [
      {
        path: ".agents/skills/bash-defensive-patterns/SKILL.md",
        scope: "root",
      },
      {
        path: "frontend/apps/Partimos/.agents/skills/bash-defensive-patterns/SKILL.md",
        scope: "mobile",
      },
    ],
  },
  {
    name: "graphify",
    description:
      "Use for any question about a codebase, its architecture, file relationships, or project content. Turns any input into a persistent knowledge graph with god nodes, community detection, and query/path/explain tools.",
    category: "tools",
    files: [{ path: ".claude/skills/graphify/SKILL.md", scope: "claude" }],
  },
];

const PLUGINS: Plugin[] = [
  {
    name: "@opencode-ai/plugin",
    description: "OpenCode plugin runtime",
    type: "npm",
    details: "v1.17.11 — instalado en .opencode/node_modules/",
  },
  {
    name: "@heroui/react-mcp",
    description: "HeroUI v3 React component documentation MCP server",
    type: "mcp",
    details:
      "Documentado en docs/heroui/web/guides/mcp-server.md — no configurado aún",
  },
  {
    name: "codegraph",
    description:
      "CodeGraph — SQLite knowledge graph indexer for code intelligence",
    type: "mcp",
    details:
      "Activo vía MCP. Indexa símbolos, edges y archivos del workspace en .codegraph/",
  },
  {
    name: "context7",
    description:
      "Context7 — up-to-date library/framework documentation fetcher",
    type: "mcp",
    details:
      "Activo vía MCP. Resuelve IDs de librerías y consulta docs actualizados",
  },
  {
    name: "heroui-react",
    description: "HeroUI v3 React MCP — documentación de componentes React",
    type: "mcp",
    details:
      "Activo vía MCP. get_docs, list_components, get_component_docs, get_theme_variables",
  },
  {
    name: "heroui-native",
    description:
      "HeroUI Native Beta MCP — documentación de componentes React Native",
    type: "mcp",
    details:
      "Activo vía MCP. get_docs, list_components, get_component_docs, get_theme_variables",
  },
  {
    name: "Claude Preview",
    description: "Claude Preview MCP — preview_start",
    type: "mcp",
    details:
      "Configurado en .claude/settings.local.json con permiso mcp__Claude_Preview__preview_start",
  },
  {
    name: "Supabase MCP",
    description: "Supabase migration MCP — apply_migration",
    type: "mcp",
    details: "Configurado en .claude/settings.local.json",
  },
  {
    name: "PreToolUse Hook (Bash guard)",
    description:
      "Intercepta llamadas Bash (grep/rg/find) y Read/Glob para redirigir a graphify query primero",
    type: "hook",
    details:
      "Configurado en .claude/settings.json — evita lectura directa cuando hay grafo disponible",
  },
];

// ── Config ─────────────────────────────────────────────────────────────────────

const CATEGORIES: { key: Category | "all"; label: string; icon: React.ReactElement }[] = [
  { key: "all", label: "Todas", icon: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
  ) },
  { key: "design", label: "Diseño", icon: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="15.5" r="2.5"/><circle cx="8.5" cy="15.5" r="2.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/></svg>
  ) },
  { key: "frontend", label: "Frontend", icon: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
  ) },
  { key: "mobile", label: "Mobile", icon: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
  ) },
  { key: "backend", label: "Backend", icon: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ) },
  { key: "database", label: "Base de Datos", icon: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
  ) },
  { key: "tools", label: "Herramientas", icon: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
  ) },
];

const CATEGORY_COLORS: Record<Category, string> = {
  design:
    "bg-fuchsia-50 dark:bg-fuchsia-950/30 text-fuchsia-700 dark:text-fuchsia-400 border-fuchsia-200 dark:border-fuchsia-800/40",
  frontend:
    "bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-800/40",
  mobile:
    "bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800/40",
  backend:
    "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40",
  database:
    "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800/40",
  tools:
    "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40",
  plugins:
    "bg-gray-50 dark:bg-gray-800/30 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700/40",
};

const SCOPE_LABELS: Record<string, string> = {
  global: "Global",
  claude: "Claude",
  root: "Raíz",
  web: "Web App",
  mobile: "App Móvil",
  backend: "Backend",
};

// ── Component ─────────────────────────────────────────────────────────────────

export function AdminSkillsSection() {
  const { t } = useT();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");

  const filtered = SKILLS.filter(
    (s) =>
      (cat === "all" || s.category === cat) &&
      (s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase())),
  );

  const catCounts = CATEGORIES.map((c) => ({
    ...c,
    count:
      c.key === "all"
        ? SKILLS.length
        : SKILLS.filter((s) => s.category === c.key).length,
  }));

  return (
    <div className="relative flex flex-col gap-6">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-fuchsia-500/8 to-pink-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-20 w-56 h-56 rounded-full bg-gradient-to-br from-pink-500/6 to-fuchsia-500/4 blur-3xl pointer-events-none" />

      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-fuchsia-600 dark:text-fuchsia-400 mb-1">Herramientas</p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
          Skills & Plugins
        </h1>
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">
          {SKILLS.length} skills · {PLUGINS.length} plugins/MCPs · inventario completo del agente
        </p>
      </div>

      {/* Category filter pills */}
      <div className="flex gap-1.5 flex-wrap">
        {catCounts.map((c) => (
          <button
            key={c.key}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              cat === c.key
                ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-md"
                : "text-[#6e6e73] dark:text-[#86868b] bg-black/5 dark:bg-white/5 hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
            onClick={() => setCat(c.key)}
          >
            {c.icon}
            {c.label}
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-black/10 dark:bg-white/10 text-[10px] font-mono">
              {c.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2] dark:text-[#636366]" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <input
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 focus:border-fuchsia-500 transition-all"
          placeholder="Buscar skill por nombre o descripción…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Skills grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 p-8 text-center transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
          <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">
            No skills match{" "}
            {search && (
              <span className="font-mono text-[#1d1d1f] dark:text-white">
                "{search}"
              </span>
            )}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((skill) => (
            <div
              key={skill.name}
              className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 group"
            >
              <div className="h-1 bg-gradient-to-r from-fuchsia-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="p-4 flex flex-col gap-2.5">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white truncate">
                      {skill.name}
                    </p>
                    <span
                      className={`inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[skill.category]}`}
                    >
                      {CATEGORIES.find((c) => c.key === skill.category)?.label}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed line-clamp-2">
                  {skill.description}
                </p>

                {/* File locations */}
                <div className="flex flex-col gap-1 mt-1">
                  <p className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">
                    Ubicaciones
                  </p>
                  {skill.files.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 text-[10px] font-mono text-[#6e6e73] dark:text-[#86868b]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 shrink-0" />
                      <span className="truncate">{f.path}</span>
                      <span className="shrink-0 text-[9px] px-1 py-0.5 rounded bg-black/5 dark:bg-white/5 text-[#aeaeb2] font-medium">
                        {SCOPE_LABELS[f.scope] ?? f.scope}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Plugins & MCP section */}
      <div className="mt-2">
        <h3 className="text-base font-semibold text-[#1d1d1f] dark:text-white mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-fuchsia-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
          Plugins & MCP Servers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PLUGINS.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 group"
            >
              <div className="h-1 bg-gradient-to-r from-fuchsia-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      p.type === "mcp"
                        ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                        : p.type === "npm"
                          ? "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400"
                          : "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {p.type.toUpperCase()}
                  </span>
                  <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                    {p.name}
                  </p>
                </div>
                <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
                  {p.description}
                </p>
                <p className="text-[10px] font-mono text-[#aeaeb2] dark:text-[#636366]">
                  {p.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
