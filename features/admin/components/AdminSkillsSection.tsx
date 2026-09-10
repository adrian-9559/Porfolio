import { useState, useMemo } from "react";

import { useT } from "@/hooks/useT";
import {
  AdminPageHeader,
  AdminStatGrid,
  AdminStat,
  AdminPanel,
  AdminEmptyState,
  AdminFilterChip,
} from "./AdminShell";
import { SearchInput } from "./AdminShared";

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
      { path: "frontend/apps/web/.agents/skills/frontend-design/SKILL.md", scope: "web" },
      { path: "frontend/apps/Partimos/.agents/skills/frontend-design/SKILL.md", scope: "mobile" },
    ],
  },
  {
    name: "accessibility",
    description:
      "Audit and improve web accessibility following WCAG 2.2 guidelines.",
    category: "frontend",
    files: [
      { path: "frontend/apps/web/.agents/skills/accessibility/SKILL.md", scope: "web" },
      { path: "frontend/apps/Partimos/.agents/skills/accessibility/SKILL.md", scope: "mobile" },
    ],
  },
  {
    name: "vercel-react-best-practices",
    description:
      "React and Next.js performance optimization guidelines from Vercel Engineering.",
    category: "frontend",
    files: [
      { path: "frontend/apps/web/.agents/skills/react-best-practices/SKILL.md", scope: "web" },
      { path: "frontend/apps/Partimos/.agents/skills/react-best-practices/SKILL.md", scope: "mobile" },
    ],
  },
  {
    name: "seo",
    description: "Optimize for search engine visibility and ranking.",
    category: "frontend",
    files: [
      { path: "frontend/apps/web/.agents/skills/seo/SKILL.md", scope: "web" },
      { path: "frontend/apps/Partimos/.agents/skills/seo/SKILL.md", scope: "mobile" },
    ],
  },
  {
    name: "next-best-practices",
    description:
      "Next.js best practices — file conventions, RSC boundaries, data patterns, async APIs, metadata, error handling, route handlers, image/font optimization.",
    category: "frontend",
    files: [
      { path: "frontend/apps/web/.agents/skills/next-best-practices/SKILL.md", scope: "web" },
    ],
  },
  {
    name: "building-native-ui",
    description:
      "Complete guide for building beautiful apps with Expo Router. Covers fundamentals, styling, components, navigation, animations, patterns, and native tabs.",
    category: "mobile",
    files: [
      { path: "frontend/apps/Partimos/.agents/skills/building-native-ui/SKILL.md", scope: "mobile" },
    ],
  },
  {
    name: "expo-deployment",
    description:
      "Deploying Expo apps to iOS App Store, Android Play Store, web hosting, and API routes.",
    category: "mobile",
    files: [
      { path: "frontend/apps/Partimos/.agents/skills/expo-deployment/SKILL.md", scope: "mobile" },
    ],
  },
  {
    name: "nodejs-backend-patterns",
    description:
      "Build production-ready Node.js backend services with Express/Fastify, implementing middleware patterns, error handling, authentication, database integration, and API design best practices.",
    category: "backend",
    files: [
      { path: "backend/.agents/skills/nodejs-backend-patterns/SKILL.md", scope: "backend" },
      { path: "frontend/apps/web/.agents/skills/nodejs-backend-patterns/SKILL.md", scope: "web" },
      { path: "frontend/apps/Partimos/.agents/skills/nodejs-backend-patterns/SKILL.md", scope: "mobile" },
    ],
  },
  {
    name: "supabase-postgres-best-practices",
    description:
      "Postgres performance optimization and best practices from Supabase.",
    category: "database",
    files: [
      { path: "backend/.agents/skills/supabase-postgres-best-practices/SKILL.md", scope: "backend" },
      { path: "frontend/apps/Partimos/.agents/skills/supabase-postgres-best-practices/SKILL.md", scope: "mobile" },
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
    details: "v1.17.11",
  },
  {
    name: "codegraph",
    description: "SQLite knowledge graph indexer for code intelligence",
    type: "mcp",
    details: "Indexa símbolos, edges y archivos del workspace",
  },
  {
    name: "context7",
    description: "Up-to-date library/framework documentation fetcher",
    type: "mcp",
    details: "Resuelve IDs de librerías y consulta docs actualizados",
  },
  {
    name: "heroui-react",
    description: "HeroUI v3 React component documentation",
    type: "mcp",
    details: "get_docs, list_components, get_component_docs",
  },
  {
    name: "heroui-native",
    description: "HeroUI Native component documentation",
    type: "mcp",
    details: "get_docs, list_components, get_component_docs",
  },
  {
    name: "Supabase MCP",
    description: "Supabase migration & management",
    type: "mcp",
    details: "apply_migration, execute_sql, list_tables",
  },
];

const CATEGORIES: {
  key: Category | "all";
  label: string;
  color: string;
  count?: number;
}[] = [
  { key: "all", label: "All", color: "var(--text-muted)" },
  { key: "design", label: "Design", color: "#ec4899" },
  { key: "frontend", label: "Frontend", color: "#3b82f6" },
  { key: "mobile", label: "Mobile", color: "#f59e0b" },
  { key: "backend", label: "Backend", color: "#10b981" },
  { key: "database", label: "Database", color: "#8b5cf6" },
  { key: "tools", label: "Tools", color: "#6b7280" },
];

const SCOPE_COLORS: Record<string, string> = {
  global: "bg-blue-500/10 text-blue-400",
  claude: "bg-amber-500/10 text-amber-400",
  root: "bg-gray-500/10 text-gray-400",
  web: "bg-cyan-500/10 text-cyan-400",
  mobile: "bg-orange-500/10 text-orange-400",
  backend: "bg-green-500/10 text-green-400",
};

const PLUGIN_TYPE_COLORS: Record<string, string> = {
  mcp: "bg-[var(--accent-light)] text-[var(--accent)]",
  npm: "bg-emerald-500/10 text-emerald-400",
  hook: "bg-amber-500/10 text-amber-400",
};

export function AdminSkillsSection() {
  const { t } = useT();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      SKILLS.filter(
        (s) =>
          (cat === "all" || s.category === cat) &&
          (s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.description.toLowerCase().includes(search.toLowerCase())),
      ),
    [search, cat],
  );

  const catCounts = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        ...c,
        count:
          c.key === "all"
            ? SKILLS.length
            : SKILLS.filter((s) => s.category === c.key).length,
      })),
    [],
  );

  const totalLocations = useMemo(
    () => SKILLS.reduce((acc, s) => acc + s.files.length, 0),
    [],
  );

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={t("admin.skills")}
        description={`${SKILLS.length} skills · ${PLUGINS.length} plugins/MCPs · ${totalLocations} ubicaciones`}
      />

      {/* Stats */}
      <AdminStatGrid cols={4}>
        <AdminStat label="Skills" value={SKILLS.length} accent />
        <AdminStat label="Plugins" value={PLUGINS.length} />
        <AdminStat label="Categorías" value={CATEGORIES.length - 1} />
        <AdminStat label="Ubicaciones" value={totalLocations} />
      </AdminStatGrid>

      {/* Category Filter */}
      <div className="flex gap-1.5 flex-wrap">
        {catCounts.map((c) => (
          <AdminFilterChip
            key={c.key}
            active={cat === c.key}
            onClick={() => setCat(c.key as Category | "all")}
          >
            {c.key !== "all" && (
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: c.color }}
              />
            )}
            {c.label}
            <span className="text-[10px] font-mono opacity-50">
              {c.count}
            </span>
          </AdminFilterChip>
        ))}
      </div>

      {/* Search */}
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Buscar skill por nombre o descripción…"
      />

      {/* Skills Grid */}
      {filtered.length === 0 ? (
        <AdminEmptyState
          title={`No skills match${search ? ` "${search}"` : ""}`}
          description="Intenta con otros términos de búsqueda"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((skill) => {
            const isExpanded = expandedSkill === skill.name;
            const catInfo = CATEGORIES.find((c) => c.key === skill.category);

            return (
              <AdminPanel key={skill.name} compact>
                <div className="flex flex-col gap-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: catInfo?.color ?? "var(--text-muted)" }}
                      />
                      <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                        {skill.name}
                      </p>
                    </div>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[var(--bg-hover)] text-[var(--text-muted)] shrink-0">
                      {skill.files.length} {skill.files.length === 1 ? "file" : "files"}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Files - Expandable */}
                  <button
                    className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--accent)] hover:underline cursor-pointer bg-transparent border-0 p-0 text-left"
                    onClick={() => setExpandedSkill(isExpanded ? null : skill.name)}
                  >
                    <svg
                      className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                    {skill.files.length} ubicaciones
                  </button>

                  {isExpanded && (
                    <div className="flex flex-col gap-1.5 pl-1 border-l-2 border-[var(--border-default)]">
                      {skill.files.map((f, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-secondary)]"
                        >
                          <span className="truncate flex-1">{f.path}</span>
                          <span
                            className={`shrink-0 text-[9px] px-1.5 py-0.5 rounded font-medium ${SCOPE_COLORS[f.scope] ?? "bg-[var(--bg-hover)] text-[var(--text-muted)]"}`}
                          >
                            {f.scope}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </AdminPanel>
            );
          })}
        </div>
      )}

      {/* Plugins Section */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.556a4.5 4.5 0 00-6.364-6.364L4.757 8.25a4.5 4.5 0 006.364 6.364l4.5-4.5z" />
          </svg>
          Plugins & MCP Servers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PLUGINS.map((p) => (
            <AdminPanel key={p.name} compact>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${PLUGIN_TYPE_COLORS[p.type] ?? "bg-[var(--bg-hover)] text-[var(--text-muted)]"}`}
                  >
                    {p.type.toUpperCase()}
                  </span>
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                    {p.name}
                  </p>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {p.description}
                </p>
                <p className="text-[10px] font-mono text-[var(--text-muted)]">
                  {p.details}
                </p>
              </div>
            </AdminPanel>
          ))}
        </div>
      </div>
    </div>
  );
}
