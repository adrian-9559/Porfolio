import type { DifficultyLevel, LearningPathId } from "./taxonomy";

export type ContentType = "article" | "tutorial" | "tool";

export interface ContentMeta {
  id: string;
  slug: string;
  type: ContentType;
  title: string;
  description: string;

  // ── Taxonomy fields ───────────────────────────────────────────────────────
  /** Taxonomy category id (maps to CATEGORIES in taxonomy.ts) */
  categoryId: string;
  /** Display label for the category */
  category: string;
  /** Tailwind bg class for the category badge */
  categoryColor: string;
  /** Difficulty level */
  level?: DifficultyLevel;
  /** Estimated reading / usage time (display string) */
  readTime: string;
  /** Estimated time in minutes (for sorting/filtering) */
  estimatedMinutes?: number;
  /** Learning paths this content belongs to */
  learningPaths?: LearningPathId[];
  /** Slugs of content that should be completed before this */
  prerequisites?: string[];
  /** What the reader will learn */
  objectives?: string[];
  /** Searchable tags */
  tags?: string[];
  /** Subcategory for grouping within a type (e.g. "languages" | "frameworks" for tutorials) */
  subcategory?: string;

  // ── Publication ───────────────────────────────────────────────────────────
  publishedAt: string; // ISO "YYYY-MM-DD"
  featured?: boolean;
}

export const allContent: ContentMeta[] = [
  // ── Tutorials ────────────────────────────────────────────────────────────────
  {
    id: "c-lang",
    slug: "c-lang",
    type: "tutorial",
    title: "C: de cero a avanzado",
    description:
      "Tutorial completo de C: variables, operadores, control de flujo, funciones, arrays, strings, punteros y structs. Con 25 ejercicios.",
    categoryId: "c",
    category: "C",
    categoryColor: "bg-blue-700",
    level: "beginner",
    readTime: "75 min",
    estimatedMinutes: 75,
    learningPaths: ["fullstack"],
    prerequisites: [],
    objectives: [
      "Entender variables, tipos y operadores en C",
      "Dominar estructuras de control y funciones",
      "Comprender punteros y gestión manual de memoria",
      "Trabajar con arrays, strings y structs",
    ],
    subcategory: "languages",
    publishedAt: "2026-06-23",
    featured: true,
    tags: ["C", "Punteros", "Sistemas", "Memoria", "Programación"],
  },
  {
    id: "cpp-lang",
    slug: "cpp-lang",
    type: "tutorial",
    title: "C++ moderno: cero a avanzado",
    description:
      "Tutorial completo de C++ moderno: POO, herencia, polimorfismo, constructores, STL, smart pointers, move semantics y E/S de archivos.",
    categoryId: "cpp",
    category: "C++",
    categoryColor: "bg-cyan-600",
    level: "intermediate",
    readTime: "80 min",
    estimatedMinutes: 80,
    learningPaths: ["fullstack"],
    prerequisites: ["c-lang"],
    objectives: [
      "Aplicar POO: clases, herencia y polimorfismo",
      "Usar la STL: vectores, maps, algoritmos",
      "Gestionar memoria con smart pointers",
      "Dominar move semantics y rvalue references",
    ],
    subcategory: "languages",
    publishedAt: "2026-06-23",
    featured: true,
    tags: ["C++", "POO", "STL", "Smart Pointers", "Moderno"],
  },
  {
    id: "typescript",
    slug: "typescript",
    type: "tutorial",
    title: "Introducción a TypeScript",
    description:
      "Aprende TypeScript desde tipos básicos hasta genéricos y Utility Types. Con 5 ejercicios prácticos.",
    categoryId: "typescript",
    category: "TypeScript",
    categoryColor: "bg-blue-500",
    level: "beginner",
    readTime: "35 min",
    estimatedMinutes: 35,
    learningPaths: ["fullstack", "frontend", "backend"],
    prerequisites: [],
    objectives: [
      "Entender el sistema de tipos de TypeScript",
      "Configurar un proyecto con tsconfig.json",
      "Usar interfaces, types y generics básicos",
      "Integrar TypeScript en un proyecto existente",
    ],
    subcategory: "languages",
    publishedAt: "2026-06-21",
    featured: true,
    tags: ["TypeScript", "JavaScript", "Programación", "tipado"],
  },
  // ── Articles ─────────────────────────────────────────────────────────────────
  {
    id: "svg",
    slug: "svg",
    type: "article",
    title: "Mejores webs de SVG",
    description:
      "Una selección de plataformas con SVGs gratuitos y de alta calidad para tus proyectos.",
    categoryId: "resources",
    category: "Recursos",
    categoryColor: "bg-amber-400",
    level: "beginner",
    readTime: "5 min",
    estimatedMinutes: 5,
    learningPaths: ["frontend"],
    prerequisites: [],
    objectives: [
      "Conocer las mejores fuentes de SVGs gratuitos",
      "Saber cuándo usar cada plataforma",
    ],
    publishedAt: "2026-06-21",
    tags: ["SVG", "Recursos", "Diseño", "frontend"],
  },
  {
    id: "database",
    slug: "database",
    type: "article",
    title: "Hosting de bases de datos",
    description:
      "Las mejores opciones en la nube para alojar tu base de datos, con planes gratuitos incluidos.",
    categoryId: "supabase",
    category: "Backend",
    categoryColor: "bg-emerald-400",
    level: "beginner",
    readTime: "5 min",
    estimatedMinutes: 5,
    learningPaths: ["fullstack", "backend"],
    prerequisites: [],
    objectives: [
      "Comparar las principales plataformas de hosting de bases de datos",
      "Elegir la opción más adecuada según el proyecto",
    ],
    publishedAt: "2026-06-21",
    featured: true,
    tags: ["Base de datos", "Cloud", "Backend", "bases de datos"],
  },
  {
    id: "frontend-hosting",
    slug: "frontend-hosting",
    type: "article",
    title: "Mejor hosting frontend",
    description:
      "Vercel, Netlify, Cloudflare Pages y más. Análisis honesto con pros, contras y cuándo usar cada una.",
    categoryId: "resources",
    category: "Recursos",
    categoryColor: "bg-violet-400",
    level: "beginner",
    readTime: "8 min",
    estimatedMinutes: 8,
    learningPaths: ["frontend", "fullstack"],
    prerequisites: [],
    objectives: [
      "Conocer las mejores plataformas de hosting frontend",
      "Elegir la opción adecuada según el proyecto y framework",
    ],
    publishedAt: "2026-06-25",
    featured: true,
    tags: ["Frontend", "Hosting", "Vercel", "Netlify", "Cloudflare", "deploy"],
  },
  {
    id: "backend-hosting",
    slug: "backend-hosting",
    type: "article",
    title: "Mejor hosting backend",
    description:
      "Railway, Render, Fly.io, Koyeb y más. Guía completa para elegir dónde alojar tu API o servidor en 2026.",
    categoryId: "supabase",
    category: "Backend",
    categoryColor: "bg-emerald-500",
    level: "beginner",
    readTime: "8 min",
    estimatedMinutes: 8,
    learningPaths: ["backend", "fullstack"],
    prerequisites: [],
    objectives: [
      "Comparar las principales plataformas de hosting backend",
      "Elegir la mejor opción según el caso de uso y presupuesto",
    ],
    publishedAt: "2026-06-25",
    featured: true,
    tags: [
      "Backend",
      "Hosting",
      "Railway",
      "Render",
      "Fly.io",
      "deploy",
      "servidor",
    ],
  },
  // ── Tools ─────────────────────────────────────────────────────────────────────
  {
    id: "palette-generator",
    slug: "palette-generator",
    type: "tool",
    title: "Generador de paletas",
    description:
      "Elige un color primario y secundario y genera automáticamente una paleta de 9 colores. Edita cada tono individualmente y obtén una puntuación de armonía, contraste y accesibilidad.",
    categoryId: "design",
    category: "Diseño",
    categoryColor: "bg-pink-500",
    level: "beginner",
    readTime: "Uso libre",
    estimatedMinutes: 0,
    learningPaths: ["frontend"],
    prerequisites: [],
    objectives: [
      "Generar paletas de color coherentes a partir de dos colores base",
      "Evaluar accesibilidad WCAG de la paleta",
      "Exportar los colores como variables CSS",
    ],
    publishedAt: "2026-06-25",
    featured: true,
    tags: ["Color", "Paleta", "Diseño", "CSS", "Accesibilidad", "WCAG", "UI"],
  },
  {
    id: "qr-generator",
    slug: "qr-generator",
    type: "tool",
    title: "Generador de QR",
    description:
      "Genera códigos QR a partir de texto o URLs. Descarga como PNG o copia al instante.",
    categoryId: "dev-tools",
    category: "Dev Tools",
    categoryColor: "bg-amber-500",
    level: "beginner",
    readTime: "Uso libre",
    estimatedMinutes: 0,
    learningPaths: [],
    prerequisites: [],
    publishedAt: "2026-07-01",
    featured: true,
    tags: ["QR", "Código", "Compartir", "URL", "Herramienta"],
  },
  {
    id: "uuid-generator",
    slug: "uuid-generator",
    type: "tool",
    title: "Generador de UUIDs",
    description:
      "Genera UUIDs v4 y v7 al instante. Copia individual o en lote, con o sin guiones.",
    categoryId: "dev-tools",
    category: "Dev Tools",
    categoryColor: "bg-sky-500",
    level: "beginner",
    readTime: "Uso libre",
    estimatedMinutes: 0,
    learningPaths: [],
    prerequisites: [],
    publishedAt: "2026-07-01",
    featured: true,
    tags: ["UUID", "Identificador", "API", "Base de datos", "Herramienta"],
  },
  {
    id: "timestamp-converter",
    slug: "timestamp-converter",
    type: "tool",
    title: "Conversor de timestamps",
    description:
      "Convierte timestamps Unix a fecha legible y viceversa. Soporta segundos, milisegundos y formatos ISO.",
    categoryId: "dev-tools",
    category: "Dev Tools",
    categoryColor: "bg-teal-500",
    level: "beginner",
    readTime: "Uso libre",
    estimatedMinutes: 0,
    learningPaths: [],
    prerequisites: [],
    publishedAt: "2026-07-01",
    featured: true,
    tags: ["Timestamp", "Unix", "Fecha", "Conversión", "Herramienta"],
  },
  {
    id: "case-converter",
    slug: "case-converter",
    type: "tool",
    title: "Conversor de mayúsculas",
    description:
      "Convierte texto entre camelCase, snake_case, kebab-case, PascalCase, UPPER_CASE y más.",
    categoryId: "dev-tools",
    category: "Dev Tools",
    categoryColor: "bg-rose-500",
    level: "beginner",
    readTime: "Uso libre",
    estimatedMinutes: 0,
    learningPaths: [],
    prerequisites: [],
    publishedAt: "2026-07-01",
    featured: false,
    tags: [
      "Texto",
      "Case",
      "camelCase",
      "snake_case",
      "kebab-case",
      "Herramienta",
    ],
  },
  {
    id: "diff-checker",
    slug: "diff-checker",
    type: "tool",
    title: "Comparador de texto",
    description:
      "Compara dos textos lado a lado y resalta las diferencias línea por línea.",
    categoryId: "dev-tools",
    category: "Dev Tools",
    categoryColor: "bg-indigo-500",
    level: "beginner",
    readTime: "Uso libre",
    estimatedMinutes: 0,
    learningPaths: [],
    prerequisites: [],
    publishedAt: "2026-07-01",
    featured: false,
    tags: ["Diff", "Comparar", "Texto", "Código", "Herramienta"],
  },
  {
    id: "pdf-editor",
    slug: "pdf-editor",
    type: "tool",
    title: "Editor de PDF",
    description:
      "Sube, edita y descarga PDFs desde el navegador. Rota, reordena y elimina páginas, o combina varios PDFs en uno.",
    categoryId: "dev-tools",
    category: "Dev Tools",
    categoryColor: "bg-red-500",
    level: "beginner",
    readTime: "Uso libre",
    estimatedMinutes: 0,
    learningPaths: [],
    prerequisites: [],
    publishedAt: "2026-07-01",
    featured: true,
    tags: ["PDF", "Edición", "Combinar", "Rotar", "Herramienta"],
  },
  {
    id: "git",
    slug: "git",
    type: "tutorial",
    title: "Git: de cero a conflictos",
    description:
      "Guía exhaustiva de Git: configuración, comandos esenciales, ramas, remotos, resolución de conflictos paso a paso, comandos avanzados y flujos de trabajo en equipo.",
    categoryId: "git",
    category: "Git",
    categoryColor: "bg-orange-600",
    level: "beginner",
    readTime: "60 min",
    estimatedMinutes: 60,
    subcategory: "tools",
    learningPaths: ["fullstack", "frontend", "backend"],
    prerequisites: [],
    objectives: [
      "Entender el modelo de datos de Git (commits, ramas, HEAD)",
      "Dominar los comandos del día a día",
      "Resolver conflictos de merge y rebase con confianza",
      "Usar comandos avanzados: bisect, reflog, cherry-pick",
      "Conocer los flujos de trabajo más usados en equipos",
    ],
    publishedAt: "2026-06-25",
    featured: true,
    tags: [
      "Git",
      "Control de versiones",
      "Conflictos",
      "Ramas",
      "GitHub",
      "DevOps",
    ],
  },
  // ── OpenCode Models (deepdive) ───────────────────────────────────────────────
  {
    id: "opencode-models",
    slug: "opencode-models",
    type: "tutorial",
    title:
      "Modelos de IA en OpenCode: guía completa (OpenAI, Claude, Copilot, Ollama y locales)",
    description:
      "Guía completa de todos los proveedores y modelos compatibles con OpenCode: OpenAI, Anthropic, GitHub Copilot, Ollama, modelos locales y comparativa para elegir el mejor según tu caso de uso.",
    categoryId: "opencode",
    category: "OpenCode",
    categoryColor: "bg-emerald-500",
    level: "intermediate",
    readTime: "15 min",
    estimatedMinutes: 15,
    subcategory: "tools",
    learningPaths: [],
    prerequisites: ["opencode"],
    objectives: [
      "Conocer los más de 75 proveedores compatibles con OpenCode",
      "Configurar OpenAI, Anthropic, GitHub Copilot y Ollama paso a paso",
      "Entender el soporte de visión y cuándo usarlo",
      "Ejecutar modelos locales con Ollama, LM Studio y llama.cpp",
      "Elegir el modelo adecuado según la tarea: código, diseño, equilibrio u offline",
    ],
    publishedAt: "2026-07-01",
    featured: true,
    tags: [
      "OpenCode",
      "OpenAI",
      "Claude",
      "Ollama",
      "Modelos locales",
      "LLM",
      "IA",
      "GPT",
      "Copilot",
    ],
  },
  // ── OpenCode tutorial ────────────────────────────────────────────────────────
  {
    id: "opencode",
    slug: "opencode",
    type: "tutorial",
    title: "Qué es OpenCode y cómo empezar a usarlo",
    description:
      "Aprende qué es OpenCode, para qué sirve, cómo instalarlo y usarlo como asistente de IA en tu terminal. Desde cero en menos de 5 minutos.",
    categoryId: "opencode",
    category: "OpenCode",
    categoryColor: "bg-emerald-500",
    level: "beginner",
    readTime: "10 min",
    estimatedMinutes: 10,
    subcategory: "tools",
    learningPaths: [],
    prerequisites: [],
    objectives: [
      "Entender qué es OpenCode y cómo funciona",
      "Conocer sus casos de uso principales",
      "Instalar y configurar OpenCode en tu sistema",
      "Ejecutar tu primer flujo de trabajo con OpenCode",
      "Dominar los comandos esenciales del día a día",
    ],
    publishedAt: "2026-07-01",
    featured: true,
    tags: ["OpenCode", "IA", "Terminal", "CLI", "Asistente", "Productividad"],
  },
  {
    id: "ai-project",
    slug: "ai-project",
    type: "tutorial",
    title: "Cómo empezar un proyecto con IA",
    description:
      "Guía práctica para construir proyectos asistidos por IA: crea un AGENTS.md, un DESIGN.md, estructura los archivos de contexto y establece un flujo de trabajo que maximice la productividad con asistentes como Claude, GPT y OpenCode.",
    categoryId: "opencode",
    category: "OpenCode",
    categoryColor: "bg-emerald-500",
    level: "beginner",
    readTime: "20 min",
    estimatedMinutes: 20,
    subcategory: "tools",
    learningPaths: [],
    prerequisites: ["opencode"],
    objectives: [
      "Crear un AGENTS.md o CLAUDE.md con reglas y stack del proyecto",
      "Diseñar un DESIGN.md que unifique colores, tipografía y estilos",
      "Estructurar archivos de contexto complementarios (MEMORY.md, ARCHITECTURE.md, API.md)",
      "Dar instrucciones efectivas a la IA para obtener resultados consistentes",
      "Establecer un flujo de trabajo diario con gestión de contexto",
    ],
    publishedAt: "2026-07-01",
    featured: true,
    tags: [
      "IA",
      "OpenCode",
      "CLAUDE.md",
      "AGENTS.md",
      "DESIGN.md",
      "Contexto",
      "Tutorial",
      "Productividad",
      "Workflow",
    ],
  },
  // ── Skills ─────────────────────────────────────────────────────────
  {
    id: "skills-tutorial",
    slug: "skills-tutorial",
    type: "tutorial",
    title: "Cómo usar Skills en OpenCode",
    description:
      "Guía completa del sistema de Skills de OpenCode: qué son, cómo cargarlos, cómo crearlos y cómo sacarles el máximo partido en tus proyectos. Incluye catálogo de skills disponibles.",
    categoryId: "opencode",
    category: "OpenCode",
    categoryColor: "bg-violet-500",
    level: "beginner",
    readTime: "12 min",
    estimatedMinutes: 12,
    subcategory: "tools",
    learningPaths: ["ai-engineer"],
    prerequisites: ["opencode"],
    objectives: [
      "Entender qué son los Skills y cómo funcionan",
      "Aprender a cargar skills desde el chat o desde AGENTS.md",
      "Conocer la estructura de un SKILL.md",
      "Crear skills personalizados para tus proyectos",
      "Saber dónde guardar skills (global vs local)",
    ],
    publishedAt: "2026-07-01",
    featured: true,
    tags: [
      "Skills",
      "OpenCode",
      "AGENTS.md",
      "CLAUDE.md",
      "Instrucciones",
      "Personalización",
    ],
  },
  {
    id: "skills-catalog",
    slug: "skills-catalog",
    type: "article",
    title: "Skills disponibles para OpenCode",
    description:
      "Catálogo completo de todos los Skills de OpenCode: diseño, desarrollo, herramientas, base de datos, inteligencia de código y contenido. Cada skill con su descripción, caso de uso y cómo activarlo.",
    categoryId: "opencode",
    category: "OpenCode",
    categoryColor: "bg-violet-500",
    level: "beginner",
    readTime: "8 min",
    estimatedMinutes: 8,
    learningPaths: ["ai-engineer"],
    prerequisites: ["skills-tutorial"],
    objectives: [
      "Conocer los 16 skills disponibles en OpenCode",
      "Entender qué hace cada skill y cuándo usarlo",
      "Saber cómo activar cada skill",
      "Identificar qué skills aplicar según la tarea",
    ],
    publishedAt: "2026-07-01",
    featured: true,
    tags: [
      "Skills",
      "OpenCode",
      "skills",
      "Catálogo",
      "Diseño",
      "Desarrollo",
      "Herramientas",
      "BD",
      "Presentaciones",
    ],
  },
  // ── MCP ─────────────────────────────────────────────────────────────
  {
    id: "instalar-mcp",
    slug: "instalar-mcp",
    type: "tutorial",
    title: "Cómo instalar MCP para agentes de IA",
    description:
      "Guía completa del Model Context Protocol (MCP): qué es, cómo funciona y cómo configurar servidores MCP en OpenCode, Claude Code y Cursor.",
    categoryId: "opencode",
    category: "OpenCode",
    categoryColor: "bg-violet-500",
    level: "intermediate",
    readTime: "15 min",
    estimatedMinutes: 15,
    subcategory: "tools",
    learningPaths: ["ai-engineer"],
    prerequisites: ["opencode"],
    objectives: [
      "Entender qué es MCP y cómo funciona (cliente-servidor, JSON-RPC)",
      "Configurar servidores MCP en OpenCode, Claude Code y Cursor",
      "Conocer los tipos de servidores (stdio vs HTTP+SSE)",
      "Aplicar buenas prácticas de seguridad con tokens y permisos",
      "Verificar que los MCPs funcionan correctamente",
    ],
    publishedAt: "2026-07-01",
    featured: true,
    tags: [
      "MCP",
      "OpenCode",
      "Claude",
      "Cursor",
      "IA",
      "Herramientas",
      "Protocolo",
      "Integración",
    ],
  },
  {
    id: "mcp-servers",
    slug: "mcp-servers",
    type: "article",
    title: "Servidores MCP para potenciar tu IA",
    description:
      "Catálogo completo de los servidores MCP más usados en 2026: Filesystem, GitHub, Playwright, PostgreSQL, Supabase, Stripe, Slack y 13 más. Cada uno con su paquete npm, configuración y caso de uso.",
    categoryId: "opencode",
    category: "OpenCode",
    categoryColor: "bg-violet-500",
    level: "intermediate",
    readTime: "10 min",
    estimatedMinutes: 10,
    learningPaths: ["ai-engineer"],
    prerequisites: ["instalar-mcp"],
    objectives: [
      "Conocer los servidores MCP más importantes del ecosistema",
      "Saber qué comando npm usar para instalar cada uno",
      "Entender qué casos de uso cubre cada servidor",
      "Identificar qué variables de entorno necesita cada MCP",
    ],
    publishedAt: "2026-07-01",
    featured: true,
    tags: [
      "MCP",
      "Servidores",
      "Filesystem",
      "GitHub",
      "Playwright",
      "PostgreSQL",
      "Supabase",
      "Stripe",
      "Slack",
      "Herramientas",
    ],
  },
  // ── Crear MCP ──────────────────────────────────────────────────────────
  {
    id: "crear-mcp",
    slug: "crear-mcp",
    type: "tutorial",
    title: "Cómo crear tu propio servidor MCP",
    description:
      "Guía práctica para construir servidores MCP desde cero con TypeScript y el SDK oficial. Aprende a crear tools, resources y prompts, probarlos con MCP Inspector y desplegarlos.",
    categoryId: "opencode",
    category: "OpenCode",
    categoryColor: "bg-violet-500",
    level: "advanced",
    readTime: "15 min",
    estimatedMinutes: 15,
    subcategory: "tools",
    learningPaths: ["ai-engineer"],
    prerequisites: ["instalar-mcp"],
    objectives: [
      "Crear un servidor MCP desde cero con TypeScript y @modelcontextprotocol/sdk",
      "Definir tools con esquemas Zod para validación de parámetros",
      "Exponer resources y resource templates",
      "Probar el servidor con MCP Inspector",
      "Configurar el servidor en OpenCode y publicarlo",
    ],
    publishedAt: "2026-07-01",
    featured: true,
    tags: [
      "MCP",
      "Tutorial",
      "Node.js",
      "TypeScript",
      "Servidor",
      "Desarrollo",
      "SDK",
    ],
  },
  // ── Clientes MCP ──────────────────────────────────────────────────────
  {
    id: "clientes-mcp",
    slug: "clientes-mcp",
    type: "article",
    title: "Elige tu cliente MCP: comparativa de agentes compatibles",
    description:
      "Comparativa de OpenCode, Claude Code, Cursor, Windsurf, Continue.dev y Cline. Formato de configuración, pros/cons y matriz de decisión según tu stack.",
    categoryId: "opencode",
    category: "OpenCode",
    categoryColor: "bg-violet-500",
    level: "intermediate",
    readTime: "10 min",
    estimatedMinutes: 10,
    learningPaths: ["ai-engineer"],
    prerequisites: ["instalar-mcp"],
    objectives: [
      "Conocer los 6 clientes MCP principales del ecosistema",
      "Entender las diferencias entre clientes CLI y de IDE",
      "Saber qué formato de configuración usa cada uno",
      "Elegir el cliente adecuado según tu stack y necesidades",
    ],
    publishedAt: "2026-07-01",
    featured: true,
    tags: [
      "MCP",
      "Comparativa",
      "OpenCode",
      "Claude Code",
      "Cursor",
      "Windsurf",
      "Continue.dev",
      "Cline",
      "Herramientas",
    ],
  },
  // ── Seguridad MCP ─────────────────────────────────────────────────────
  {
    id: "seguridad-mcp",
    slug: "seguridad-mcp",
    type: "article",
    title: "Seguridad en MCP: cómo auditar y proteger tus servidores",
    description:
      "Guía de seguridad para servidores MCP: modelo de amenazas, auditoría de código, buenas prácticas de configuración, sandboxing y lista de verificación.",
    categoryId: "opencode",
    category: "OpenCode",
    categoryColor: "bg-violet-500",
    level: "intermediate",
    readTime: "10 min",
    estimatedMinutes: 10,
    learningPaths: ["ai-engineer"],
    prerequisites: ["instalar-mcp"],
    objectives: [
      "Entender el modelo de amenazas de los servidores MCP",
      "Aprender a auditar un servidor MCP antes de instalarlo",
      "Aplicar buenas prácticas de configuración y tokens mínimos",
      "Aislar servidores con sandboxing (Docker, Deno)",
    ],
    publishedAt: "2026-07-01",
    featured: true,
    tags: ["MCP", "Seguridad", "Tokens", "Permisos", "Auditoría", "Sandbox"],
  },
  // ── Frameworks de agentes ─────────────────────────────────────────────
  {
    id: "frameworks-agentes",
    slug: "frameworks-agentes",
    type: "article",
    title:
      "Frameworks de agentes de IA: LangChain, CrewAI, OpenAI Agents SDK y más",
    description:
      "Comparativa de los 6 principales frameworks para construir agentes de IA: LangChain/LangGraph, CrewAI, OpenAI Agents SDK, Anthropic Claude Agent, AutoGPT y Phidata. Código mínimo de cada uno.",
    categoryId: "opencode",
    category: "OpenCode",
    categoryColor: "bg-violet-500",
    level: "intermediate",
    readTime: "12 min",
    estimatedMinutes: 12,
    learningPaths: ["ai-engineer"],
    prerequisites: ["ai-project"],
    objectives: [
      "Conocer los 6 frameworks principales para agentes de IA",
      "Entender cuándo usar un framework vs raw LLM",
      "Ver código mínimo de cada framework",
      "Elegir el framework adecuado según el caso de uso",
    ],
    publishedAt: "2026-07-01",
    featured: true,
    tags: [
      "Agentes",
      "Frameworks",
      "LangChain",
      "CrewAI",
      "OpenAI",
      "Anthropic",
      "Orquestación",
      "IA",
    ],
  },
  // ── Plugins de editor ─────────────────────────────────────────────────
  {
    id: "plugins-ia-editor",
    slug: "plugins-ia-editor",
    type: "article",
    title: "Plugins de editor para IA: VS Code, JetBrains y más",
    description:
      "Catálogo de plugins de IA para editores de código: GitHub Copilot, Supermaven, Continue.dev, Cody, Cline, Tabnine y Codeium. Comparativa de precios, modelos y compatibilidad MCP.",
    categoryId: "opencode",
    category: "OpenCode",
    categoryColor: "bg-violet-500",
    level: "beginner",
    readTime: "10 min",
    estimatedMinutes: 10,
    learningPaths: ["ai-engineer"],
    prerequisites: ["opencode"],
    objectives: [
      "Conocer los plugins de IA más populares para editores",
      "Entender las categorías: autocompletado, chat, agentes, review",
      "Saber qué plugins soportan MCP",
      "Elegir el plugin adecuado según perfil y presupuesto",
    ],
    publishedAt: "2026-07-01",
    featured: true,
    tags: [
      "Plugins",
      "VS Code",
      "Editor",
      "Cursor",
      "Continue.dev",
      "Cody",
      "Copilot",
      "Herramientas",
    ],
  },
  // ── Ollama MCP ────────────────────────────────────────────────────────
  {
    id: "ollama-mcp",
    slug: "ollama-mcp",
    type: "tutorial",
    title: "Ollama + MCP: modelos locales con herramientas",
    description:
      "Guía para usar Ollama con el ecosistema MCP. Configura modelos locales en OpenCode, Continue.dev y Cline, y ejecuta herramientas sin depender de la nube.",
    categoryId: "opencode",
    category: "OpenCode",
    categoryColor: "bg-violet-500",
    level: "intermediate",
    readTime: "8 min",
    estimatedMinutes: 8,
    learningPaths: ["ai-engineer"],
    prerequisites: ["instalar-mcp"],
    objectives: [
      "Configurar Ollama como backend de modelos locales",
      "Conectar Ollama con OpenCode, Continue.dev y Cline",
      "Ejecutar MCPs con modelos locales",
      "Conocer los mejores modelos para tool calling local",
    ],
    publishedAt: "2026-07-01",
    featured: true,
    tags: [
      "Ollama",
      "MCP",
      "Local",
      "Modelos",
      "OpenCode",
      "Continue.dev",
      "Cline",
      "Tutorial",
    ],
  },
  // ── RAG con MCP ─────────────────────────────────────────────────────
  {
    id: "rag-con-mcp",
    slug: "rag-con-mcp",
    type: "tutorial",
    title: "RAG con MCP: recuperación de información para tu IA",
    description:
      "Implementa Retrieval Augmented Generation usando servidores MCP. Aprende a ingestar documentación con Filesystem MCP, persistir contexto con Memory MCP y construir un asistente que conoce tu código.",
    categoryId: "opencode",
    category: "OpenCode",
    categoryColor: "bg-violet-500",
    level: "advanced",
    readTime: "10 min",
    estimatedMinutes: 10,
    learningPaths: ["ai-engineer"],
    prerequisites: ["instalar-mcp", "ai-project"],
    objectives: [
      "Entender el pipeline RAG: ingest, store, retrieve, generate",
      "Usar Filesystem MCP y Memory MCP para RAG",
      "Construir un asistente que analiza documentación y responde preguntas",
      "Conocer estrategias de chunking y limitaciones",
    ],
    publishedAt: "2026-07-01",
    featured: true,
    tags: [
      "RAG",
      "MCP",
      "Memoria",
      "Filesystem",
      "Búsqueda",
      "Documentación",
      "Asistente",
      "Tutorial",
    ],
  },
  // ── Agentes en paralelo ──────────────────────────────────────────────
  {
    id: "agentes-paralelo",
    slug: "agentes-paralelo",
    type: "tutorial",
    title: "Cómo lanzar varios agentes en paralelo",
    description:
      "Aprende a dividir tareas complejas entre múltiples agentes que trabajan simultáneamente. Multiplica la velocidad de desarrollo sin sacrificar calidad.",
    categoryId: "opencode",
    category: "OpenCode",
    categoryColor: "bg-violet-500",
    level: "intermediate",
    readTime: "12 min",
    estimatedMinutes: 12,
    learningPaths: ["ai-engineer"],
    prerequisites: ["opencode"],
    objectives: [
      "Entender cuándo y cómo usar agentes en paralelo",
      "Aprender a dividir el trabajo sin conflictos entre archivos",
      "Escribir prompts efectivos para subagentes",
      "Conocer los 3 patrones principales: componentes, refactor, feature completa",
      "Evitar errores comunes del paralelismo",
    ],
    publishedAt: "2026-07-01",
    featured: true,
    tags: [
      "Agentes",
      "Paralelo",
      "Task",
      "OpenCode",
      "Productividad",
      "Orquestación",
      "Tutorial",
    ],
  },
  // ── New language tutorials ─────────────────────────────────────────────────
  {
    id: "javascript",
    slug: "javascript",
    type: "tutorial",
    title: "JavaScript: cero a avanzado",
    description:
      "Tutorial completo de JavaScript: fundamentos, funciones, arrays, DOM, asincronía con Promises y async/await, ES6+ y 5 ejercicios prácticos.",
    categoryId: "javascript",
    category: "JavaScript",
    categoryColor: "bg-yellow-500",
    level: "beginner",
    readTime: "90 min",
    estimatedMinutes: 90,
    subcategory: "languages",
    learningPaths: ["fullstack", "frontend", "backend"],
    prerequisites: [],
    objectives: [
      "Dominar variables, tipos y operadores de JavaScript",
      "Usar funciones, closures y scope correctamente",
      "Manipular arrays y objetos con métodos avanzados",
      "Manejar el DOM y eventos del navegador",
      "Trabajar con Promises y async/await",
      "Usar características modernas de ES6+",
    ],
    publishedAt: "2026-06-24",
    featured: true,
    tags: ["JavaScript", "frontend", "backend", "fullstack", "async", "DOM"],
  },
  {
    id: "python",
    slug: "python",
    type: "tutorial",
    title: "Python: cero a avanzado",
    description:
      "Tutorial completo de Python: sintaxis, estructuras de datos, POO, módulos, automatización y 5 ejercicios prácticos.",
    categoryId: "python",
    category: "Python",
    categoryColor: "bg-sky-500",
    level: "beginner",
    readTime: "85 min",
    estimatedMinutes: 85,
    subcategory: "languages",
    learningPaths: ["backend", "ai-engineer"],
    prerequisites: [],
    objectives: [
      "Manejar variables, tipos y control de flujo en Python",
      "Usar listas, diccionarios, sets y tuples",
      "Aplicar programación orientada a objetos",
      "Importar y usar módulos de la librería estándar",
      "Crear scripts de automatización reales",
    ],
    publishedAt: "2026-06-24",
    featured: true,
    tags: ["Python", "backend", "automatización", "POO", "scripts"],
  },
  {
    id: "java",
    slug: "java",
    type: "tutorial",
    title: "Java: cero a avanzado",
    description:
      "Tutorial completo de Java: fundamentos, POO, colecciones, manejo de errores, Streams y un proyecto backend real.",
    categoryId: "java",
    category: "Java",
    categoryColor: "bg-orange-600",
    level: "beginner",
    readTime: "80 min",
    estimatedMinutes: 80,
    subcategory: "languages",
    learningPaths: ["backend"],
    prerequisites: [],
    objectives: [
      "Entender la sintaxis y tipos de Java",
      "Aplicar POO: encapsulación, herencia e interfaces",
      "Usar colecciones: ArrayList, HashMap y HashSet",
      "Manejar excepciones correctamente",
      "Programación funcional básica con Streams",
    ],
    publishedAt: "2026-06-24",
    featured: true,
    tags: ["Java", "backend", "POO", "Streams", "colecciones"],
  },
  // ── Java POO deep dive ─────────────────────────────────────────────────────
  {
    id: "java-poo",
    slug: "java-poo",
    type: "tutorial",
    title: "Java POO: objetos, herencia e interfaces",
    description:
      "Profundiza en la programación orientada a objetos de Java: encapsulación, herencia, interfaces funcionales, records, clases selladas, polimorfismo y patrones de diseño con ejemplos prácticos.",
    categoryId: "java",
    category: "Java",
    categoryColor: "bg-orange-600",
    level: "intermediate",
    readTime: "40 min",
    estimatedMinutes: 40,
    subcategory: "languages",
    learningPaths: ["backend"],
    prerequisites: ["java"],
    objectives: [
      "Dominar encapsulación con getters y copias defensivas",
      "Aplicar herencia y polimorfismo correctamente",
      "Usar interfaces funcionales con lambdas",
      "Modelar datos inmutables con records",
      "Restringir jerarquías con clases selladas",
    ],
    publishedAt: "2026-07-01",
    featured: true,
    tags: [
      "Java",
      "POO",
      "Herencia",
      "Records",
      "Sealed",
      "Polimorfismo",
      "Backend",
    ],
  },
  // ── Spring Boot ────────────────────────────────────────────────────────────
  {
    id: "java-spring",
    slug: "java-spring",
    type: "tutorial",
    title: "Spring Boot: APIs REST con Java",
    description:
      "Crea APIs REST profesionales con Spring Boot 3: controladores, servicios, JPA, repositorios, DTOs, validación, configuración por perfiles y manejo global de errores.",
    categoryId: "java",
    category: "Java",
    categoryColor: "bg-orange-600",
    level: "advanced",
    readTime: "50 min",
    estimatedMinutes: 50,
    subcategory: "frameworks",
    learningPaths: ["backend"],
    prerequisites: ["java", "java-poo"],
    objectives: [
      "Crear proyectos Spring Boot con Initializr",
      "Implementar REST controllers con validación",
      "Diseñar la capa de servicios con inyección de dependencias",
      "Usar Spring Data JPA con repositorios y entidades",
      "Aplicar DTOs y manejador global de errores",
    ],
    publishedAt: "2026-07-01",
    featured: true,
    tags: ["Java", "Spring Boot", "REST", "JPA", "Backend", "API", "DTO"],
  },
  // ── HTML y CSS ─────────────────────────────────────────────────────────────
  {
    id: "html-css",
    slug: "html-css",
    type: "tutorial",
    title: "HTML y CSS: fundamentos del desarrollo web",
    description:
      "Aprende los pilares de la web: HTML semántico, CSS selectores, Box Model, Flexbox, CSS Grid, diseño responsive con media queries y un proyecto práctico de tarjeta de perfil.",
    categoryId: "html-css",
    category: "HTML y CSS",
    categoryColor: "bg-orange-500",
    level: "beginner",
    readTime: "55 min",
    estimatedMinutes: 55,
    subcategory: "languages",
    learningPaths: ["frontend"],
    prerequisites: [],
    objectives: [
      "Escribir HTML semántico y accesible",
      "Aplicar CSS con selectores y cascada",
      "Maquetar con Flexbox y CSS Grid",
      "Diseñar interfaces responsive sin frameworks",
      "Construir un proyecto web completo desde cero",
    ],
    publishedAt: "2026-07-01",
    featured: true,
    tags: ["HTML", "CSS", "Frontend", "Flexbox", "Grid", "Responsive", "Web"],
  },
  // ── Testing Frontend ───────────────────────────────────────────────────────
  {
    id: "testing-frontend",
    slug: "testing-frontend",
    type: "tutorial",
    title: "Testing frontend con Vitest, Testing Library y Playwright",
    description:
      "Aprende a testear aplicaciones frontend: tests unitarios con Vitest, tests de componentes con Testing Library, mocks, tests de integración, E2E con Playwright y cobertura de código.",
    categoryId: "testing",
    category: "Testing",
    categoryColor: "bg-rose-500",
    level: "intermediate",
    readTime: "50 min",
    estimatedMinutes: 50,
    subcategory: "tools",
    learningPaths: ["frontend"],
    prerequisites: ["javascript", "react-framework"],
    objectives: [
      "Escribir tests unitarios con Vitest",
      "Testear componentes React con Testing Library",
      "Mockear APIs y módulos externos",
      "Crear tests de integración de flujos completos",
      "Automatizar tests E2E con Playwright",
    ],
    publishedAt: "2026-07-01",
    featured: true,
    tags: [
      "Testing",
      "Vitest",
      "Testing Library",
      "Playwright",
      "Frontend",
      "Calidad",
      "E2E",
    ],
  },
  // ── Framework tutorials ────────────────────────────────────────────────────
  {
    id: "react-framework",
    slug: "react-framework",
    type: "tutorial",
    title: "React: componentes a apps",
    description:
      "Aprende React moderno con hooks, routing, Context API y optimización de rendimiento. Incluye proyecto dashboard completo.",
    categoryId: "react",
    category: "React",
    categoryColor: "bg-cyan-500",
    level: "intermediate",
    readTime: "70 min",
    estimatedMinutes: 70,
    subcategory: "frameworks",
    learningPaths: ["fullstack", "frontend"],
    prerequisites: ["javascript"],
    objectives: [
      "Crear componentes funcionales con props y children",
      "Usar hooks: useState, useEffect, useMemo, useCallback",
      "Implementar routing con React Router",
      "Gestionar estado global con Context API",
      "Optimizar rendimiento con memoización",
    ],
    publishedAt: "2026-06-24",
    featured: true,
    tags: ["React", "frontend", "hooks", "Context API", "rendimiento"],
  },
  {
    id: "node-express",
    slug: "node-express",
    type: "tutorial",
    title: "Node.js + Express: APIs REST",
    description:
      "Construye APIs REST completas con Node.js y Express: routing, middlewares, JWT, validación y arquitectura por capas.",
    categoryId: "nodejs",
    category: "Node.js",
    categoryColor: "bg-green-600",
    level: "intermediate",
    readTime: "75 min",
    estimatedMinutes: 75,
    subcategory: "frameworks",
    learningPaths: ["fullstack", "backend"],
    prerequisites: ["javascript"],
    objectives: [
      "Configurar un servidor Express con routing modular",
      "Implementar middlewares de seguridad y validación",
      "Crear APIs REST completas (GET/POST/PUT/DELETE)",
      "Añadir autenticación JWT",
      "Estructurar el proyecto con controllers y services",
    ],
    publishedAt: "2026-06-24",
    featured: true,
    tags: ["Node.js", "Express", "backend", "APIs", "JWT", "arquitectura"],
  },
  {
    id: "nextjs-framework",
    slug: "nextjs-framework",
    type: "tutorial",
    title: "Next.js: apps fullstack",
    description:
      "Domina Next.js con App Router, SSR, SSG, ISR, API Routes y optimización avanzada de rendimiento.",
    categoryId: "nextjs",
    category: "Next.js",
    categoryColor: "bg-black",
    level: "advanced",
    readTime: "80 min",
    estimatedMinutes: 80,
    subcategory: "frameworks",
    learningPaths: ["fullstack", "frontend"],
    prerequisites: ["react-framework"],
    objectives: [
      "Entender SSR, CSR, SSG e ISR en profundidad",
      "Usar App Router con layouts y páginas dinámicas",
      "Crear API Routes integradas en el proyecto",
      "Optimizar performance con caching y lazy loading",
      "Construir una aplicación fullstack completa",
    ],
    publishedAt: "2026-06-24",
    featured: true,
    tags: ["Next.js", "fullstack", "SSR", "SSG", "rendimiento", "frontend"],
  },
  {
    id: "json-formatter",
    slug: "json-formatter",
    type: "tool",
    title: "Formateador de JSON",
    description:
      "Formatea, minifica y valida JSON al instante. Sin servidores, todo en tu navegador.",
    categoryId: "dev-tools",
    category: "Dev Tools",
    categoryColor: "bg-amber-500",
    level: "beginner",
    readTime: "Uso libre",
    estimatedMinutes: 0,
    learningPaths: ["fullstack", "backend", "frontend"],
    prerequisites: [],
    publishedAt: "2026-06-25",
    featured: true,
    tags: ["JSON", "Formato", "Validación", "Herramienta"],
  },
  {
    id: "base64",
    slug: "base64",
    type: "tool",
    title: "Codificador Base64",
    description:
      "Codifica y decodifica texto en Base64 al instante. Útil para tokens, imágenes y APIs.",
    categoryId: "dev-tools",
    category: "Dev Tools",
    categoryColor: "bg-sky-500",
    level: "beginner",
    readTime: "Uso libre",
    estimatedMinutes: 0,
    learningPaths: ["fullstack", "backend"],
    prerequisites: [],
    publishedAt: "2026-06-25",
    featured: false,
    tags: ["Base64", "Encoding", "JWT", "API", "Herramienta"],
  },
  {
    id: "regex-tester",
    slug: "regex-tester",
    type: "tool",
    title: "Tester de Regex",
    description:
      "Prueba expresiones regulares en tiempo real con resaltado de coincidencias y ejemplos predefinidos.",
    categoryId: "dev-tools",
    category: "Dev Tools",
    categoryColor: "bg-rose-500",
    level: "intermediate",
    readTime: "Uso libre",
    estimatedMinutes: 0,
    learningPaths: ["fullstack", "backend", "frontend"],
    prerequisites: [],
    publishedAt: "2026-06-25",
    featured: true,
    tags: ["Regex", "Expresiones regulares", "Herramienta", "Validación"],
  },
  {
    id: "color-tool",
    slug: "color-tool",
    type: "tool",
    title: "Conversor de colores",
    description:
      "Convierte entre HEX, RGB y HSL. Selector interactivo, sliders y paletas predefinidas.",
    categoryId: "design",
    category: "Diseño",
    categoryColor: "bg-pink-500",
    level: "beginner",
    readTime: "Uso libre",
    estimatedMinutes: 0,
    learningPaths: ["frontend"],
    prerequisites: [],
    publishedAt: "2026-06-25",
    featured: false,
    tags: ["Color", "CSS", "Diseño", "HEX", "RGB", "HSL", "Herramienta"],
  },
  {
    id: "password",
    slug: "password",
    type: "tool",
    title: "Generador de contraseñas",
    description:
      "Crea contraseñas seguras y aleatorias con control total sobre longitud y tipos de caracteres.",
    categoryId: "security",
    category: "Seguridad",
    categoryColor: "bg-violet-500",
    level: "beginner",
    readTime: "Uso libre",
    estimatedMinutes: 0,
    learningPaths: ["backend"],
    prerequisites: [],
    objectives: [
      "Generar contraseñas seguras configurables",
      "Entender los requisitos de una contraseña robusta",
    ],
    publishedAt: "2026-06-23",
    featured: true,
    tags: ["Seguridad", "Privacidad", "Contraseñas", "seguridad"],
  },
];

// ── Guide types ───────────────────────────────────────────────────────────────

export interface GuideStep {
  /** Slug of the tutorial included in this guide */
  slug: string;
  /** Whether this step is optional/supplementary */
  optional?: boolean;
}

export interface GuideMeta {
  id: string;
  slug: string;
  title: string;
  description: string;
  categoryId: string;
  category: string;
  categoryColor: string;
  level?: DifficultyLevel;
  readTime: string;
  estimatedMinutes?: number;
  publishedAt: string;
  featured?: boolean;
  tags?: string[];
  /** Ordered list of tutorials in this guide */
  curriculum: GuideStep[];
}

export const allGuides: GuideMeta[] = [
  {
    id: "ruta-opencode",
    slug: "ruta-opencode",
    title: "Ruta OpenCode",
    description:
      "Domina OpenCode de principio a fin: instalación, modelos, MCP, Skills, agentes en paralelo, RAG, frameworks de IA y plugins de editor.",
    categoryId: "opencode",
    category: "OpenCode",
    categoryColor: "bg-emerald-500",
    level: "beginner",
    readTime: "—",
    estimatedMinutes: 0,
    publishedAt: "2026-07-01",
    featured: true,
    tags: ["OpenCode", "MCP", "Skills", "IA", "Guía"],
    curriculum: [
      { slug: "opencode" },
      { slug: "opencode-models" },
      { slug: "instalar-mcp" },
      { slug: "mcp-servers" },
      { slug: "skills-tutorial" },
      { slug: "skills-catalog" },
      { slug: "crear-mcp" },
      { slug: "clientes-mcp" },
      { slug: "seguridad-mcp" },
      { slug: "ollama-mcp" },
      { slug: "rag-con-mcp" },
      { slug: "frameworks-agentes" },
      { slug: "plugins-ia-editor" },
      { slug: "agentes-paralelo" },
      { slug: "ai-project" },
    ],
  },
  {
    id: "ruta-java",
    slug: "ruta-java",
    title: "Ruta Java",
    description:
      "Aprende Java desde cero hasta nivel avanzado: sintaxis, POO, colecciones, Streams, Spring Boot y APIs REST. Ruta completa para desarrolladores backend empresariales.",
    categoryId: "java",
    category: "Java",
    categoryColor: "bg-orange-600",
    level: "beginner",
    readTime: "—",
    estimatedMinutes: 0,
    publishedAt: "2026-07-01",
    featured: true,
    tags: ["Java", "Backend", "POO", "Spring", "API", "Guía"],
    curriculum: [
      { slug: "java" },
      { slug: "java-poo" },
      { slug: "java-spring" },
    ],
  },
  {
    id: "ruta-frontend",
    slug: "ruta-frontend",
    title: "Ruta Frontend Web",
    description:
      "De cero a frontend moderno: HTML y CSS, JavaScript, TypeScript, React, Next.js y testing. Ruta completa para dominar el desarrollo web desde los fundamentos hasta producción.",
    categoryId: "html-css",
    category: "HTML y CSS",
    categoryColor: "bg-orange-500",
    level: "beginner",
    readTime: "—",
    estimatedMinutes: 0,
    publishedAt: "2026-07-01",
    featured: true,
    tags: [
      "Frontend",
      "Web",
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
      "Testing",
      "Guía",
    ],
    curriculum: [
      { slug: "html-css" },
      { slug: "javascript" },
      { slug: "typescript" },
      { slug: "react-framework" },
      { slug: "nextjs-framework" },
      { slug: "testing-frontend" },
    ],
  },
  {
    id: "ruta-c",
    slug: "ruta-c",
    title: "Ruta C",
    description:
      "Aprende C desde cero: variables, punteros, gestión manual de memoria, structs y programación de sistemas. Ideal para entender cómo funciona realmente un ordenador.",
    categoryId: "c",
    category: "C",
    categoryColor: "bg-cyan-600",
    level: "beginner",
    readTime: "—",
    estimatedMinutes: 0,
    publishedAt: "2026-07-01",
    featured: true,
    tags: ["C", "Sistemas", "Punteros", "Memoria", "Guía"],
    curriculum: [{ slug: "c-lang" }],
  },
  {
    id: "ruta-cpp",
    slug: "ruta-cpp",
    title: "Ruta C++",
    description:
      "Domina C++ moderno: POO, STL, smart pointers, move semantics y programación de alto rendimiento. Construye sobre los fundamentos de C.",
    categoryId: "cpp",
    category: "C++",
    categoryColor: "bg-cyan-600",
    level: "intermediate",
    readTime: "—",
    estimatedMinutes: 0,
    publishedAt: "2026-07-01",
    featured: true,
    tags: ["C++", "POO", "STL", "Rendimiento", "Guía"],
    curriculum: [{ slug: "c-lang" }, { slug: "cpp-lang" }],
  },
];

export function getGuides(): GuideMeta[] {
  return [...allGuides];
}

export function getGuideBySlug(slug: string): GuideMeta | undefined {
  return allGuides.find((g) => g.slug === slug);
}

export function resolveCurriculumMeta(
  guide: GuideMeta,
): (ContentMeta & { optional?: boolean })[] {
  return guide.curriculum
    .map((step) => {
      const meta = allContent.find((c) => c.slug === step.slug);

      return meta ? { ...meta, optional: step.optional ?? false } : null;
    })
    .filter(Boolean) as (ContentMeta & { optional?: boolean })[];
}

export function guideTotalMinutes(guide: GuideMeta): number {
  const steps = resolveCurriculumMeta(guide);

  return steps.reduce((sum, s) => sum + (s.estimatedMinutes ?? 0), 0);
}

// ── Query helpers ─────────────────────────────────────────────────────────────

export function getContentByType(type: ContentType): ContentMeta[] {
  return [...allContent]
    .filter((c) => c.type === type)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getContentBySlug(
  slug: string,
  type?: ContentType,
): ContentMeta | undefined {
  return allContent.find((c) => c.slug === slug && (!type || c.type === type));
}

export function getContentByCategory(categoryId: string): ContentMeta[] {
  return allContent.filter((c) => c.categoryId === categoryId);
}

export function getContentByLevel(level: DifficultyLevel): ContentMeta[] {
  return allContent.filter((c) => c.level === level);
}

export function getContentByLearningPath(
  pathId: LearningPathId,
): ContentMeta[] {
  return allContent.filter((c) => c.learningPaths?.includes(pathId));
}

export function getCategoriesByType(type: ContentType): string[] {
  return [...new Set(getContentByType(type).map((c) => c.categoryId))];
}

export function getTagsByType(type: ContentType): string[] {
  return [
    ...new Set(getContentByType(type).flatMap((c) => c.tags ?? [])),
  ].sort();
}

export function getSubcategoriesByType(type: ContentType): string[] {
  return [
    ...new Set(
      getContentByType(type)
        .map((c) => c.subcategory)
        .filter(Boolean),
    ),
  ] as string[];
}

export function getLatestContent(): ContentMeta {
  return allContent.reduce((latest, item) =>
    item.publishedAt > latest.publishedAt ? item : latest,
  );
}

export function getFeaturedContent(): ContentMeta[] {
  return allContent.filter((c) => c.featured);
}

export function getContentByTag(tag: string): ContentMeta[] {
  return allContent.filter((c) =>
    c.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}

export function searchContent(
  query: string,
  type?: ContentType,
): ContentMeta[] {
  const q = query.toLowerCase().trim();

  if (!q) return type ? getContentByType(type) : [...allContent];

  return allContent.filter((c) => {
    if (type && c.type !== type) return false;

    return (
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.categoryId.toLowerCase().includes(q) ||
      c.tags?.some((t) => t.toLowerCase().includes(q))
    );
  });
}

export function filterContent(opts: {
  type?: ContentType;
  categoryId?: string;
  level?: DifficultyLevel;
  tag?: string;
  learningPath?: LearningPathId;
  query?: string;
}): ContentMeta[] {
  return allContent.filter((c) => {
    if (opts.type && c.type !== opts.type) return false;
    if (opts.categoryId && c.categoryId !== opts.categoryId) return false;
    if (opts.level && c.level !== opts.level) return false;
    if (
      opts.tag &&
      !c.tags?.some((t) => t.toLowerCase() === opts.tag!.toLowerCase())
    )
      return false;
    if (opts.learningPath && !c.learningPaths?.includes(opts.learningPath))
      return false;
    if (opts.query) {
      const q = opts.query.toLowerCase();
      const match =
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.categoryId.includes(q) ||
        c.tags?.some((t) => t.toLowerCase().includes(q));

      if (!match) return false;
    }

    return true;
  });
}

export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function typeLabel(type: ContentType): string {
  const map: Record<ContentType, string> = {
    article: "blog.type.article",
    tutorial: "blog.type.tutorial",
    tool: "blog.type.tool",
  };
  return map[type];
}

export function typeLabelPlural(type: ContentType): string {
  const map: Record<ContentType, string> = {
    article: "blog.type.articles",
    tutorial: "blog.type.tutorials",
    tool: "blog.type.tools",
  };
  return map[type];
}

export function typeSlug(type: ContentType): string {
  return { article: "articulos", tutorial: "tutoriales", tool: "herramientas" }[
    type
  ];
}
