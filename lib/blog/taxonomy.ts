// Centralized educational taxonomy for the entire platform.
// All content in the registry must reference slugs defined here.

// ── Difficulty levels ─────────────────────────────────────────────────────────

export type DifficultyLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface LevelMeta {
  id: DifficultyLevel;
  label: string;
  labelEs: string;
  color: string;
  bgColor: string;
  description: string;
}

export const LEVELS: LevelMeta[] = [
  {
    id: "beginner",
    label: "Beginner",
    labelEs: "Principiante",
    color: "text-emerald-700 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    description: "Sin experiencia previa requerida",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    labelEs: "Intermedio",
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    description: "Conocimientos básicos ya adquiridos",
  },
  {
    id: "advanced",
    label: "Advanced",
    labelEs: "Avanzado",
    color: "text-amber-700 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    description: "Experiencia práctica previa",
  },
  {
    id: "expert",
    label: "Expert",
    labelEs: "Experto",
    color: "text-red-700 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    description: "Temas especializados y de alto nivel",
  },
];

export function getLevel(id: DifficultyLevel): LevelMeta {
  return LEVELS.find((l) => l.id === id) ?? LEVELS[0]!;
}

// ── Categories ────────────────────────────────────────────────────────────────

export interface CategoryMeta {
  id: string;
  label: string;
  color: string;        // Tailwind bg class
  textColor: string;    // Tailwind text class
  group: string;        // which main group this belongs to
  subcategoryOf?: string; // parent category id if this is a subcategory
}

export interface CategoryGroup {
  id: string;
  label: string;
  categories: string[]; // category ids
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: "programming",
    label: "Programación",
    categories: ["c", "cpp", "csharp", "java", "javascript", "typescript", "python", "php", "go", "rust"],
  },
  {
    id: "web",
    label: "Desarrollo Web",
    categories: ["html", "css", "tailwind", "react", "nextjs", "vue", "angular"],
  },
  {
    id: "backend",
    label: "Backend",
    categories: ["nodejs", "express", "nestjs", "spring-boot", "aspnet", "rest-api", "graphql"],
  },
  {
    id: "databases",
    label: "Bases de Datos",
    categories: ["sql", "postgresql", "mysql", "mongodb", "supabase"],
  },
  {
    id: "devops",
    label: "DevOps",
    categories: ["docker", "kubernetes", "ci-cd", "linux", "git"],
  },
  {
    id: "ai",
    label: "Inteligencia Artificial",
    categories: ["prompt-engineering", "llms", "ai-agents", "machine-learning", "deep-learning"],
  },
  {
    id: "architecture",
    label: "Arquitectura de Software",
    categories: ["clean-architecture", "ddd", "microservices", "design-patterns"],
  },
  {
    id: "resources",
    label: "Recursos",
    categories: ["resources", "security", "ia-tools"],
  },
];

export const CATEGORIES: CategoryMeta[] = [
  // ── Programación ──────────────────────────────────────────────────────────
  { id: "c",           label: "C",             color: "bg-blue-700",       textColor: "text-blue-700 dark:text-blue-400",       group: "programming" },
  { id: "cpp",         label: "C++",           color: "bg-cyan-600",       textColor: "text-cyan-600 dark:text-cyan-400",       group: "programming" },
  { id: "csharp",      label: "C#",            color: "bg-purple-600",     textColor: "text-purple-600 dark:text-purple-400",   group: "programming" },
  { id: "java",        label: "Java",          color: "bg-orange-600",     textColor: "text-orange-600 dark:text-orange-400",   group: "programming" },
  { id: "javascript",  label: "JavaScript",    color: "bg-yellow-500",     textColor: "text-yellow-600 dark:text-yellow-400",   group: "programming" },
  { id: "typescript",  label: "TypeScript",    color: "bg-blue-500",       textColor: "text-blue-500 dark:text-blue-400",       group: "programming" },
  { id: "python",      label: "Python",        color: "bg-sky-500",        textColor: "text-sky-600 dark:text-sky-400",         group: "programming" },
  { id: "php",         label: "PHP",           color: "bg-indigo-500",     textColor: "text-indigo-500 dark:text-indigo-400",   group: "programming" },
  { id: "go",          label: "Go",            color: "bg-cyan-500",       textColor: "text-cyan-500 dark:text-cyan-400",       group: "programming" },
  { id: "rust",        label: "Rust",          color: "bg-orange-700",     textColor: "text-orange-700 dark:text-orange-400",   group: "programming" },
  // ── Desarrollo Web ────────────────────────────────────────────────────────
  { id: "html",        label: "HTML",          color: "bg-orange-500",     textColor: "text-orange-500 dark:text-orange-400",   group: "web" },
  { id: "css",         label: "CSS",           color: "bg-blue-400",       textColor: "text-blue-400 dark:text-blue-300",       group: "web" },
  { id: "tailwind",    label: "Tailwind CSS",  color: "bg-teal-500",       textColor: "text-teal-500 dark:text-teal-400",       group: "web" },
  { id: "react",       label: "React",         color: "bg-cyan-500",       textColor: "text-cyan-500 dark:text-cyan-400",       group: "web" },
  { id: "nextjs",      label: "Next.js",       color: "bg-black",          textColor: "text-gray-700 dark:text-gray-300",       group: "web" },
  { id: "vue",         label: "Vue",           color: "bg-emerald-500",    textColor: "text-emerald-500 dark:text-emerald-400", group: "web" },
  { id: "angular",     label: "Angular",       color: "bg-red-600",        textColor: "text-red-600 dark:text-red-400",         group: "web" },
  // ── Backend ───────────────────────────────────────────────────────────────
  { id: "nodejs",      label: "Node.js",       color: "bg-green-600",      textColor: "text-green-600 dark:text-green-400",     group: "backend" },
  { id: "express",     label: "Express",       color: "bg-gray-600",       textColor: "text-gray-600 dark:text-gray-400",       group: "backend" },
  { id: "nestjs",      label: "NestJS",        color: "bg-red-500",        textColor: "text-red-500 dark:text-red-400",         group: "backend" },
  { id: "spring-boot", label: "Spring Boot",   color: "bg-green-500",      textColor: "text-green-500 dark:text-green-400",     group: "backend" },
  { id: "aspnet",      label: "ASP.NET",       color: "bg-purple-700",     textColor: "text-purple-700 dark:text-purple-400",   group: "backend" },
  { id: "rest-api",    label: "APIs REST",     color: "bg-emerald-400",    textColor: "text-emerald-400 dark:text-emerald-300", group: "backend" },
  { id: "graphql",     label: "GraphQL",       color: "bg-pink-600",       textColor: "text-pink-600 dark:text-pink-400",       group: "backend" },
  // ── Bases de Datos ────────────────────────────────────────────────────────
  { id: "sql",         label: "SQL",           color: "bg-blue-600",       textColor: "text-blue-600 dark:text-blue-400",       group: "databases" },
  { id: "postgresql",  label: "PostgreSQL",    color: "bg-blue-800",       textColor: "text-blue-800 dark:text-blue-300",       group: "databases" },
  { id: "mysql",       label: "MySQL",         color: "bg-orange-500",     textColor: "text-orange-500 dark:text-orange-400",   group: "databases" },
  { id: "mongodb",     label: "MongoDB",       color: "bg-green-600",      textColor: "text-green-600 dark:text-green-400",     group: "databases" },
  { id: "supabase",    label: "Supabase",      color: "bg-emerald-500",    textColor: "text-emerald-500 dark:text-emerald-400", group: "databases" },
  // ── DevOps ────────────────────────────────────────────────────────────────
  { id: "docker",      label: "Docker",        color: "bg-blue-600",       textColor: "text-blue-600 dark:text-blue-400",       group: "devops" },
  { id: "kubernetes",  label: "Kubernetes",    color: "bg-blue-700",       textColor: "text-blue-700 dark:text-blue-400",       group: "devops" },
  { id: "ci-cd",       label: "CI/CD",         color: "bg-violet-600",     textColor: "text-violet-600 dark:text-violet-400",   group: "devops" },
  { id: "linux",       label: "Linux",         color: "bg-yellow-600",     textColor: "text-yellow-600 dark:text-yellow-400",   group: "devops" },
  { id: "git",         label: "Git",           color: "bg-orange-600",     textColor: "text-orange-600 dark:text-orange-400",   group: "devops" },
  // ── Inteligencia Artificial ───────────────────────────────────────────────
  { id: "prompt-engineering", label: "Prompt Engineering", color: "bg-fuchsia-600", textColor: "text-fuchsia-600 dark:text-fuchsia-400", group: "ai" },
  { id: "llms",        label: "LLMs",          color: "bg-purple-600",     textColor: "text-purple-600 dark:text-purple-400",   group: "ai" },
  { id: "ai-agents",   label: "AI Agents",     color: "bg-indigo-600",     textColor: "text-indigo-600 dark:text-indigo-400",   group: "ai" },
  { id: "machine-learning", label: "Machine Learning", color: "bg-blue-600", textColor: "text-blue-600 dark:text-blue-400",    group: "ai" },
  { id: "deep-learning", label: "Deep Learning", color: "bg-violet-700",   textColor: "text-violet-700 dark:text-violet-400",  group: "ai" },
  // ── Arquitectura ─────────────────────────────────────────────────────────
  { id: "clean-architecture", label: "Clean Architecture", color: "bg-slate-600", textColor: "text-slate-600 dark:text-slate-400", group: "architecture" },
  { id: "ddd",         label: "DDD",           color: "bg-slate-700",      textColor: "text-slate-700 dark:text-slate-400",     group: "architecture" },
  { id: "microservices", label: "Microservicios", color: "bg-teal-600",    textColor: "text-teal-600 dark:text-teal-400",       group: "architecture" },
  { id: "design-patterns", label: "Patrones de Diseño", color: "bg-purple-500", textColor: "text-purple-500 dark:text-purple-400", group: "architecture" },
  // ── Recursos ──────────────────────────────────────────────────────────────
  { id: "resources",   label: "Recursos",      color: "bg-amber-400",      textColor: "text-amber-600 dark:text-amber-400",     group: "resources" },
  { id: "security",    label: "Seguridad",     color: "bg-violet-500",     textColor: "text-violet-500 dark:text-violet-400",   group: "resources" },
  { id: "ia-tools",    label: "IA / Tokens",   color: "bg-fuchsia-500",    textColor: "text-fuchsia-500 dark:text-fuchsia-400", group: "resources" },
];

export function getCategory(id: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getCategoryGroup(groupId: string): CategoryGroup | undefined {
  return CATEGORY_GROUPS.find((g) => g.id === groupId);
}

// ── Tags ──────────────────────────────────────────────────────────────────────

export const STANDARD_TAGS = [
  "frontend", "backend", "fullstack",
  "seguridad", "optimización", "testing",
  "arquitectura", "rendimiento", "APIs",
  "bases de datos", "cloud", "inteligencia artificial",
  "punteros", "memoria", "sistemas",
  "POO", "patrones", "async",
  "tipado", "generics", "módulos",
  "tokens", "prompts", "automatización",
  "recursos", "diseño", "herramientas",
] as const;

// ── Learning Paths ────────────────────────────────────────────────────────────

export type LearningPathId =
  | "fullstack"
  | "frontend"
  | "backend"
  | "ai-engineer"
  | "devops";

export interface LearningPathStep {
  categoryId: string;   // maps to a CATEGORIES entry
  label: string;        // display override if different from category label
  optional?: boolean;
}

export interface LearningPath {
  id: LearningPathId;
  title: string;
  description: string;
  icon: string;         // emoji
  color: string;        // tailwind gradient class
  steps: LearningPathStep[];
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: "fullstack",
    title: "Full Stack Developer",
    description: "De cero a desarrollador completo — frontend, backend y bases de datos",
    icon: "⚡",
    color: "from-blue-500 to-purple-600",
    steps: [
      { categoryId: "html",       label: "HTML" },
      { categoryId: "css",        label: "CSS" },
      { categoryId: "javascript", label: "JavaScript" },
      { categoryId: "typescript", label: "TypeScript" },
      { categoryId: "react",      label: "React" },
      { categoryId: "nodejs",     label: "Node.js" },
      { categoryId: "sql",        label: "SQL" },
      { categoryId: "rest-api",   label: "APIs REST" },
      { categoryId: "clean-architecture", label: "Arquitectura" },
    ],
  },
  {
    id: "backend",
    title: "Backend Developer",
    description: "Servidores, APIs, bases de datos y arquitectura profesional",
    icon: "🔧",
    color: "from-emerald-500 to-teal-600",
    steps: [
      { categoryId: "javascript", label: "JavaScript" },
      { categoryId: "typescript", label: "TypeScript" },
      { categoryId: "nodejs",     label: "Node.js" },
      { categoryId: "express",    label: "Express" },
      { categoryId: "sql",        label: "SQL" },
      { categoryId: "supabase",   label: "Supabase" },
      { categoryId: "security",   label: "Seguridad" },
      { categoryId: "clean-architecture", label: "Arquitectura" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Developer",
    description: "Interfaces modernas, rendimiento y experiencia de usuario",
    icon: "🎨",
    color: "from-pink-500 to-rose-600",
    steps: [
      { categoryId: "html",       label: "HTML" },
      { categoryId: "css",        label: "CSS" },
      { categoryId: "javascript", label: "JavaScript" },
      { categoryId: "typescript", label: "TypeScript" },
      { categoryId: "react",      label: "React" },
      { categoryId: "optimización", label: "Optimización", optional: true },
    ],
  },
  {
    id: "ai-engineer",
    title: "IA Engineer",
    description: "Agentes de IA, LLMs, prompt engineering y automatización",
    icon: "🤖",
    color: "from-fuchsia-500 to-purple-600",
    steps: [
      { categoryId: "python",             label: "Python" },
      { categoryId: "rest-api",           label: "APIs" },
      { categoryId: "prompt-engineering", label: "Prompt Engineering" },
      { categoryId: "ai-agents",          label: "AI Agents" },
      { categoryId: "llms",               label: "LLMs" },
      { categoryId: "automatización",     label: "Automatización", optional: true },
    ],
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    description: "Infraestructura, contenedores, CI/CD y automatización",
    icon: "🚀",
    color: "from-orange-500 to-amber-600",
    steps: [
      { categoryId: "linux",      label: "Linux" },
      { categoryId: "git",        label: "Git" },
      { categoryId: "docker",     label: "Docker" },
      { categoryId: "kubernetes", label: "Kubernetes" },
      { categoryId: "ci-cd",      label: "CI/CD" },
    ],
  },
];

export function getLearningPath(id: LearningPathId): LearningPath | undefined {
  return LEARNING_PATHS.find((p) => p.id === id);
}

// ── Content relationship types ────────────────────────────────────────────────

export type RelationType = "prerequisite" | "related" | "next" | "deepdive";

export interface ContentRelationship {
  fromSlug: string;
  toSlug: string;
  type: RelationType;
}

// Relationships between existing content
export const CONTENT_RELATIONSHIPS: ContentRelationship[] = [
  { fromSlug: "c-lang",    toSlug: "cpp-lang",    type: "next" },
  { fromSlug: "cpp-lang",  toSlug: "c-lang",      type: "prerequisite" },
  { fromSlug: "typescript", toSlug: "javascript",  type: "prerequisite" },

  // AI tools cluster
  { fromSlug: "prompt-compressor",    toSlug: "token-optimizer",         type: "related" },
  { fromSlug: "prompt-compressor",    toSlug: "context-summarizer",      type: "related" },
  { fromSlug: "token-optimizer",      toSlug: "instruction-cleaner",     type: "related" },
  { fromSlug: "instruction-cleaner",  toSlug: "json-prompt-formatter",   type: "next" },
  { fromSlug: "json-prompt-formatter", toSlug: "prompt-compressor",      type: "related" },

  // Article relationships
  { fromSlug: "database", toSlug: "typescript",  type: "related" },
  { fromSlug: "svg",      toSlug: "database",    type: "related" },
];

export function getRelatedContent(slug: string): { slug: string; type: RelationType }[] {
  return CONTENT_RELATIONSHIPS
    .filter((r) => r.fromSlug === slug)
    .map((r) => ({ slug: r.toSlug, type: r.type }));
}
