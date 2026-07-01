"use client";
import { useMemo, useState } from "react";

import { BlogCode, BlogInlineCode, BlogP } from "@/components/blog/shared";

type Category =
  | "files-storage"
  | "source-control"
  | "browsers"
  | "databases"
  | "payments"
  | "communication"
  | "search"
  | "memory"
  | "project-management"
  | "cloud-devops"
  | "monitoring"
  | "design"
  | "media"
  | "utilities";

interface McpEntry {
  name: string;
  pkg: string;
  desc: string;
  use: string;
  args: string;
  icon: string;
  category: Category;
  env?: string;
}

const categoryMeta: Record<Category, { label: string; color: string }> = {
  "files-storage": { label: "Files Archivos y Storage Storage", color: "bg-amber-500" },
  "source-control": { label: "Version Control", color: "bg-blue-600" },
  browsers: { label: "Browsers Navegadores y Automatización Automation", color: "bg-green-600" },
  databases: { label: "Databases", color: "bg-purple-500" },
  payments: { label: "Payments", color: "bg-indigo-500" },
  communication: { label: "Communication", color: "bg-sky-500" },
  search: { label: "Search Búsqueda y Contenido Web Web Content", color: "bg-teal-500" },
  memory: { label: "Memory Memoria y Contexto Context", color: "bg-pink-500" },
  "project-management": {
    label: "Project Management",
    color: "bg-orange-500",
  },
  "cloud-devops": { label: "Cloud Cloud y DevOps DevOps", color: "bg-cyan-600" },
  monitoring: { label: "Monitoring", color: "bg-rose-500" },
  design: { label: "Design", color: "bg-violet-500" },
  media: { label: "Audio Audio y Medios Media", color: "bg-emerald-600" },
  utilities: { label: "Utilities", color: "bg-stone-500" },
};

const mcpServers: McpEntry[] = [
  {
    name: "Filesystem",
    pkg: "@modelcontextprotocol/server-filesystem",
    desc: "Full filesystem access: leer, escribir, mover, buscar archivos y directorios.",
    use: "Code reading/analysis, project search, file editing",
    args: "<directorio>",
    icon: "📁",
    category: "files-storage",
  },
  {
    name: "Google Drive",
    pkg: "@kukapay/mcp-google-drive",
    desc: "Google Drive: listar, leer, crear y buscar archivos y carpetas.",
    use: "Document management, backup, AI sync",
    args: "",
    icon: "📂",
    category: "files-storage",
    env: "GOOGLE_DRIVE_TOKEN",
  },
  {
    name: "AWS S3",
    pkg: "@kukapay/mcp-aws-s3",
    desc: "Amazon S3: buckets, objetos, subida/descarga, gestión de permisos.",
    use: "Cloud storage, backups, asset hosting",
    args: "",
    icon: "☁️",
    category: "files-storage",
    env: "AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY",
  },
  {
    name: "GitHub",
    pkg: "@modelcontextprotocol/server-github",
    desc: "Repository management: issues, PRs, código, búsqueda, revisión de cambios.",
    use: "PR automation, code review, issue management",
    args: "",
    icon: "🐙",
    category: "source-control",
    env: "GITHUB_TOKEN",
  },
  {
    name: "GitLab",
    pkg: "@modelcontextprotocol/server-gitlab",
    desc: "Gestión de proyectos GitLab: repos, MRs, issues, pipelines, CI/CD.",
    use: "Automatización de CI/CD, revisión de MRs, gestión de proyectos",
    args: "",
    icon: "🦊",
    category: "source-control",
    env: "GITLAB_TOKEN",
  },
  {
    name: "Playwright",
    pkg: "@executeautomation/playwright-mcp-server",
    desc: "Automated web navigation: clics, formularios, screenshots, extracción de datos.",
    use: "E2E testing, scraping, browser automation",
    args: "",
    icon: "🎭",
    category: "browsers",
  },
  {
    name: "Puppeteer",
    pkg: "@modelcontextprotocol/server-puppeteer",
    desc: "Automatización de Chrome/Chromium: navegación, PDFs, screenshots, evaluación JS.",
    use: "Scraping, generación de PDFs, pruebas visuales",
    args: "",
    icon: "🤖",
    category: "browsers",
  },
  {
    name: "PostgreSQL",
    pkg: "@anthropic/mcp-server-postgres",
    desc: "Direct PostgreSQL database connection: queries, esquemas, análisis de datos.",
    use: "SQL queries, DB analysis, assisted migrations",
    args: "postgresql://...",
    icon: "🐘",
    category: "databases",
  },
  {
    name: "SQLite",
    pkg: "@modelcontextprotocol/server-sqlite",
    desc: "Local SQLite database: queries CRUD, análisis, importación/exportación.",
    use: "Local data analysis, prototypes, embedded apps",
    args: "<archivo.db>",
    icon: "🗄️",
    category: "databases",
  },
  {
    name: "Supabase",
    pkg: "@kukapay/mcp-supabase",
    desc: "Supabase project management: queries, esquemas, policies RLS, migraciones.",
    use: "Desarrollo backend con Supabase, gestión de BD en cloud",
    args: "",
    icon: "⚡",
    category: "databases",
    env: "SUPABASE_URL + SUPABASE_SERVICE_KEY",
  },
  {
    name: "MongoDB",
    pkg: "@kukapay/mcp-mongodb",
    desc: "Conexión a MongoDB: colecciones, documentos, agregaciones, índices y schemas.",
    use: "Consultas NoSQL, migraciones de datos, análisis de documentos",
    args: "mongodb://...",
    icon: "🍃",
    category: "databases",
  },
  {
    name: "Elasticsearch",
    pkg: "@kukapay/mcp-elasticsearch",
    desc: "Motor de búsqueda Elasticsearch: índices, búsquedas, agregaciones, monitoreo.",
    use: "Búsqueda avanzada, análisis de logs, dashboards",
    args: "",
    icon: "🔍",
    category: "databases",
    env: "ELASTICSEARCH_URL",
  },
  {
    name: "MySQL",
    pkg: "@kukapay/mcp-mysql",
    desc: "Conexión a MySQL/MariaDB: queries, esquemas, tablas, procedimientos almacenados.",
    use: "Consultas SQL, administración de BD, migraciones",
    args: "mysql://...",
    icon: "🐬",
    category: "databases",
  },
  {
    name: "Redis",
    pkg: "@kukapay/mcp-redis",
    desc: "Conexión a Redis: operaciones key-value, gestión de caché, análisis de rendimiento.",
    use: "Gestión de caché, sesiones, colas, monitoreo de Redis",
    args: "redis://...",
    icon: "🔴",
    category: "databases",
  },
  {
    name: "Stripe",
    pkg: "@kukapay/stripe-mcp-server",
    desc: "API de Stripe: productos, precios, suscripciones, pagos, clientes.",
    use: "Configuración de pagos, debugging de transacciones, reportes",
    args: "",
    icon: "💳",
    category: "payments",
    env: "STRIPE_API_KEY",
  },
  {
    name: "Slack",
    pkg: "@anthropic/mcp-server-slack",
    desc: "Mensajería Slack: leer canales, enviar mensajes, buscar historial, gestionar usuarios.",
    use: "Notificaciones automatizadas, búsqueda en conversaciones, bots",
    args: "",
    icon: "💬",
    category: "communication",
    env: "SLACK_TOKEN",
  },
  {
    name: "Discord",
    pkg: "@kukapay/mcp-discord",
    desc: "Discord: canales, mensajes, búsqueda en historial, gestión de servidores.",
    use: "Bots de moderación, notificaciones, búsqueda en conversaciones",
    args: "",
    icon: "💎",
    category: "communication",
    env: "DISCORD_TOKEN",
  },
  {
    name: "Gmail",
    pkg: "@kukapay/mcp-gmail",
    desc: "Gmail: leer, buscar, enviar y gestionar correos electrónicos.",
    use: "Automatización de correo, búsqueda en inbox, respuestas automáticas",
    args: "",
    icon: "📧",
    category: "communication",
    env: "GMAIL_TOKEN",
  },
  {
    name: "Brave Search",
    pkg: "@modelcontextprotocol/server-brave-search",
    desc: "Búsqueda web y local con Brave Search API: resultados actualizados con fuentes.",
    use: "Búsqueda de información actual, investigación, verificación de datos",
    args: "",
    icon: "🌐",
    category: "search",
    env: "BRAVE_API_KEY",
  },
  {
    name: "Fetch",
    pkg: "@modelcontextprotocol/server-fetch",
    desc: "Descarga de contenido web: fetching de URLs, extracción de texto y metadatos.",
    use: "Lectura de documentación online, APIs externas, web scraping simple",
    args: "",
    icon: "📡",
    category: "search",
  },
  {
    name: "Memory",
    pkg: "@modelcontextprotocol/server-memory",
    desc: "Memoria persistente basada en grafo de conocimiento. La IA recuerda hechos entre sesiones.",
    use: "Proyectos grandes donde la IA necesita recordar contexto entre sesiones",
    args: "",
    icon: "🧠",
    category: "memory",
  },
  {
    name: "Linear",
    pkg: "@anthropic/mcp-server-linear",
    desc: "Gestión de proyectos Linear: issues, sprints, equipos, búsqueda y actualización.",
    use: "Gestión de tareas desde la terminal, actualización masiva de issues",
    args: "",
    icon: "📋",
    category: "project-management",
    env: "LINEAR_API_KEY",
  },
  {
    name: "Notion",
    pkg: "@kukapay/mcp-notion",
    desc: "API de Notion: leer/escribir páginas, bases de datos, bloques, búsqueda.",
    use: "Documentación automatizada, extracción de contenido, CRUD de notas",
    args: "",
    icon: "📝",
    category: "project-management",
    env: "NOTION_TOKEN",
  },
  {
    name: "Jira",
    pkg: "@kukapay/mcp-jira",
    desc: "Jira: issues, sprints, epics, proyectos, búsqueda y transiciones.",
    use: "Gestión de incidencias, reportes, automatización de flujos",
    args: "",
    icon: "🎯",
    category: "project-management",
    env: "JIRA_TOKEN + JIRA_URL",
  },
  {
    name: "Confluence",
    pkg: "@kukapay/mcp-confluence",
    desc: "Confluence: páginas, espacios, blogs, búsqueda y edición de documentación.",
    use: "Documentación técnica, wikis, knowledge base management",
    args: "",
    icon: "📖",
    category: "project-management",
    env: "CONFLUENCE_TOKEN + CONFLUENCE_URL",
  },
  {
    name: "Docker",
    pkg: "@kukapay/mcp-docker",
    desc: "Gestión de contenedores Docker: listar, iniciar, detener, logs, inspección.",
    use: "Gestión de infraestructura, debugging de contenedores, despliegues",
    args: "",
    icon: "🐳",
    category: "cloud-devops",
  },
  {
    name: "Kubernetes",
    pkg: "@kukapay/mcp-kubernetes",
    desc: "Kubernetes: pods, services, deployments, logs, configmaps, namespaces.",
    use: "Gestión de clusters, debugging de contenedores, despliegues",
    args: "",
    icon: "☸️",
    category: "cloud-devops",
  },
  {
    name: "Terraform",
    pkg: "@kukapay/mcp-terraform",
    desc: "Terraform: state, plans, apply, resources, outputs y modules.",
    use: "Infraestructura como código, planificación de cambios, revisión de state",
    args: "",
    icon: "🏗️",
    category: "cloud-devops",
  },
  {
    name: "Cloudflare",
    pkg: "@cloudflare/mcp-server-cloudflare",
    desc: "Gestión de Cloudflare: Workers, KV, R2, D1, DNS, caching.",
    use: "Despliegue de Workers, gestión de DNS, configuración de CDN",
    args: "",
    icon: "☁️",
    category: "cloud-devops",
    env: "CLOUDFLARE_API_TOKEN",
  },
  {
    name: "Vercel",
    pkg: "@kukapay/mcp-vercel",
    desc: "Vercel: deployments, domains, env vars, logs, teams.",
    use: "Despliegues automatizados, gestión de proyectos, monitoreo",
    args: "",
    icon: "▲",
    category: "cloud-devops",
    env: "VERCEL_TOKEN",
  },
  {
    name: "Sentry",
    pkg: "@kukapay/mcp-sentry",
    desc: "Monitoreo de errores Sentry: issues, eventos, rendimiento, releases.",
    use: "Debugging de errores en producción, análisis de rendimiento",
    args: "",
    icon: "⚠️",
    category: "monitoring",
    env: "SENTRY_TOKEN",
  },
  {
    name: "PagerDuty",
    pkg: "@kukapay/mcp-pagerduty",
    desc: "PagerDuty: incidentes, on-call, servicios, escalaciones y alertas.",
    use: "Gestión de incidentes, alertas, reportes de uptime",
    args: "",
    icon: "🆘",
    category: "monitoring",
    env: "PAGERDUTY_TOKEN",
  },
  {
    name: "Grafana",
    pkg: "@kukapay/mcp-grafana",
    desc: "Grafana: dashboards, alertas, datasources, paneles y métricas.",
    use: "Monitoreo visual, consultas de métricas, dashboards automatizados",
    args: "",
    icon: "📊",
    category: "monitoring",
    env: "GRAFANA_TOKEN + GRAFANA_URL",
  },
  {
    name: "Figma",
    pkg: "@anthropic/mcp-server-figma",
    desc: "API de Figma: leer archivos de diseño, componentes, estilos, comentarios.",
    use: "Extracción de diseño a código, revisión de componentes, documentación visual",
    args: "",
    icon: "🎨",
    category: "design",
    env: "FIGMA_ACCESS_TOKEN",
  },
  {
    name: "ElevenLabs",
    pkg: "@kukapay/mcp-elevenlabs",
    desc: "ElevenLabs: síntesis de voz, clonación, efectos de audio, multi-idioma.",
    use: "Generación de audio, voiceovers, asistencia por voz",
    args: "",
    icon: "🎙️",
    category: "media",
    env: "ELEVENLABS_API_KEY",
  },
  {
    name: "Weather",
    pkg: "@modelcontextprotocol/server-weather",
    desc: "Clima en tiempo real: temperatura, pronóstico, alerts, humedad, viento.",
    use: "Información meteorológica automatizada, alerts climáticos",
    args: "",
    icon: "🌤️",
    category: "utilities",
  },
  {
    name: "UUID",
    pkg: "@modelcontextprotocol/server-uuid",
    desc: "Generación de UUIDs v4 y v7. Simple, rápido, sin dependencias externas.",
    use: "Generación de IDs únicos para entidades, tests y simulación",
    args: "",
    icon: "🔑",
    category: "utilities",
  },
  {
    name: "Google Calendar",
    pkg: "@kukapay/mcp-google-calendar",
    desc: "Google Calendar: eventos, recordatorios, disponibilidad, gestión de calendarios.",
    use: "Programación de reuniones, check de disponibilidad, agenda automática",
    args: "",
    icon: "📅",
    category: "utilities",
    env: "GOOGLE_CALENDAR_TOKEN",
  },
];

function CategoryPills({
  categories,
  active,
  onSelect,
  serverCountPerCategory,
}: {
  categories: [Category, number][];
  active: Category | null;
  onSelect: (c: Category | null) => void;
  serverCountPerCategory: Record<Category, number>;
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
        All ({mcpServers.length})
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

export default function MCPServersContent() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [openMCPs, setOpenMCPs] = useState<Set<string>>(new Set());

  const grouped = useMemo(() => {
    const categories = new Set(mcpServers.map((m) => m.category));

    return [...categories]
      .map((cat) => ({
        category: cat,
        meta: categoryMeta[cat],
        servers: mcpServers.filter(
          (m) =>
            m.category === cat &&
            (activeCategory === null || m.category === activeCategory),
        ),
      }))
      .filter((g) => g.servers.length > 0);
  }, [activeCategory]);

  const serverCountPerCategory = useMemo(() => {
    const counts: Record<string, number> = {};

    for (const m of mcpServers) {
      counts[m.category] = (counts[m.category] || 0) + 1;
    }

    return counts as Record<Category, number>;
  }, []);

  const categoryEntries = useMemo(
    () =>
      Object.entries(serverCountPerCategory).sort((a, b) => b[1] - a[1]) as [
        Category,
        number,
      ][],
    [serverCountPerCategory],
  );

  const toggleMCP = (name: string) => {
    setOpenMCPs((prev) => {
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
          10 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-4"
        style={{ letterSpacing: "-0.03em" }}
      >
        {mcpServers.length} MCP servers to supercharge your AI
      </h1>
      <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-8">
        Catalog of MCP servers grouped by category. Cada uno con su
        paquete npm, descripción, caso de uso y configuración.
      </p>

      <div className="h-px bg-black/8 dark:bg-white/8 mb-8" />

      <BlogP>
        All estos servidores se instalan añadiéndolos al{" "}
        <BlogInlineCode>opencode.json</BlogInlineCode> o{" "}
        <BlogInlineCode>claude.json</BlogInlineCode> de tu proyecto. La mayoría
        solo necesita <BlogInlineCode>npx -y @xxx/server-xxx</BlogInlineCode> y
        opcionalmente algunas variables de entorno.
      </BlogP>

      <CategoryPills
        active={activeCategory}
        categories={categoryEntries}
        serverCountPerCategory={serverCountPerCategory}
        onSelect={setActiveCategory}
      />

      <div className="space-y-10">
        {grouped.map(({ category, meta, servers }) => (
          <section key={category}>
            <div className="flex items-center gap-3 mb-3 sticky top-0 bg-white/90 dark:bg-[#1d1d1f]/90 backdrop-blur-md z-10 py-2 -mx-4 px-4">
              <div className={`w-2 h-2 rounded-full ${meta.color}`} />
              <h2 className="text-sm font-bold text-[#1d1d1f] dark:text-white">
                {meta.label}
              </h2>
              <span className="text-[11px] text-[#aeaeb2] dark:text-[#636366] font-mono">
                {servers.length}
              </span>
            </div>
            <div className="space-y-1.5">
              {servers.map((mcp) => {
                const isOpen = openMCPs.has(mcp.name);

                return (
                  <div
                    key={mcp.name}
                    className="group rounded-xl border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-200"
                  >
                    <button
                      className="flex items-center gap-3 w-full px-4 py-3 text-left cursor-pointer"
                      onClick={() => toggleMCP(mcp.name)}
                    >
                      <span className="relative">
                        <span className="text-lg shrink-0 block">
                          {mcp.icon}
                        </span>
                        <span
                          className={`absolute -inset-1 rounded-full opacity-0 transition-opacity duration-200 ${meta.color} ${
                            isOpen ? "opacity-10" : "group-hover:opacity-8"
                          }`}
                        />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                          {mcp.name}
                        </p>
                        <p className="text-xs text-[#6e6e73] dark:text-[#86868b] line-clamp-1">
                          {mcp.desc}
                        </p>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 shrink-0">
                        {mcp.env && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-[9px] font-mono font-semibold border border-amber-200/50 dark:border-amber-800/30">
                            {mcp.env.split(" + ").length > 1
                              ? `${mcp.env.split(" + ").length} vars`
                              : mcp.env.length > 18
                                ? `${mcp.env.slice(0, 16)}…`
                                : mcp.env}
                          </span>
                        )}
                      </div>
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
                        isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-4 pb-4 border-t border-black/8 dark:border-white/8 pt-3 space-y-3">
                        <div className="flex flex-wrap gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-1">
                              Package
                            </p>
                            <BlogCode>{`npx -y ${mcp.pkg} ${mcp.args}`}</BlogCode>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <p className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-1">
                              Recommended use
                            </p>
                            <p className="text-xs text-[#3a3a3c] dark:text-[#aeaeb2]">
                              {mcp.use}
                            </p>
                          </div>
                          {mcp.env && (
                            <div>
                              <p className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-1">
                                Environment variables
                              </p>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-[10px] font-mono font-semibold">
                                {mcp.env}
                              </span>
                            </div>
                          )}
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
