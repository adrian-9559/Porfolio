// Centralized educational taxonomy for the entire platform.
// All content in the registry must reference slugs defined here.

// ── Difficulty levels ─────────────────────────────────────────────────────────

export type DifficultyLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert";

export interface LevelMeta {
  id: DifficultyLevel;
  label: string;
  labelEs: string;
  labelKey: string;
  descKey: string;
  color: string;
  bgColor: string;
  description: string;
}

export const LEVELS: LevelMeta[] = [
  {
    id: "beginner",
    label: "Beginner",
    labelEs: "Principiante",
    labelKey: "blog.level.beginner",
    descKey: "blog.level.beginnerDesc",
    color: "text-emerald-700 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    description: "Sin experiencia previa requerida",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    labelEs: "Intermedio",
    labelKey: "blog.level.intermediate",
    descKey: "blog.level.intermediateDesc",
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    description: "Conocimientos básicos ya adquiridos",
  },
  {
    id: "advanced",
    label: "Advanced",
    labelEs: "Avanzado",
    labelKey: "blog.level.advanced",
    descKey: "blog.level.advancedDesc",
    color: "text-amber-700 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    description: "Experiencia práctica previa",
  },
  {
    id: "expert",
    label: "Expert",
    labelEs: "Experto",
    labelKey: "blog.level.expert",
    descKey: "blog.level.expertDesc",
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
  labelKey: string;
  color: string; // Tailwind bg class
  textColor: string; // Tailwind text class
  group: string; // which main group this belongs to
  subcategoryOf?: string; // parent category id if this is a subcategory
}

export interface CategoryGroup {
  id: string;
  label: string;
  labelKey: string;
  categories: string[]; // category ids
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: "programming",
    label: "Programación",
    labelKey: "blog.categoryGroup.programming",
    categories: [
      "c",
      "cpp",
      "csharp",
      "java",
      "javascript",
      "typescript",
      "python",
      "php",
      "go",
      "rust",
    ],
  },
  {
    id: "web",
    label: "Desarrollo Web",
    labelKey: "blog.categoryGroup.webDev",
    categories: [
      "html",
      "css",
      "tailwind",
      "react",
      "nextjs",
      "vue",
      "angular",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    labelKey: "blog.categoryGroup.backend",
    categories: [
      "nodejs",
      "express",
      "nestjs",
      "spring-boot",
      "aspnet",
      "rest-api",
      "graphql",
    ],
  },
  {
    id: "databases",
    label: "Bases de Datos",
    labelKey: "blog.categoryGroup.databases",
    categories: ["sql", "postgresql", "mysql", "mongodb", "supabase"],
  },
  {
    id: "devops",
    label: "DevOps",
    labelKey: "blog.categoryGroup.devops",
    categories: ["docker", "kubernetes", "ci-cd", "linux", "git"],
  },
  {
    id: "ai",
    label: "Inteligencia Artificial",
    labelKey: "blog.categoryGroup.ai",
    categories: [
      "opencode",
      "prompt-engineering",
      "llms",
      "ai-agents",
      "machine-learning",
      "deep-learning",
    ],
  },
  {
    id: "architecture",
    label: "Arquitectura de Software",
    labelKey: "blog.categoryGroup.architecture",
    categories: [
      "clean-architecture",
      "ddd",
      "microservices",
      "design-patterns",
    ],
  },
  {
    id: "resources",
    label: "Recursos",
    labelKey: "blog.categoryGroup.resources",
    categories: ["resources", "security", "ia-tools"],
  },
];

export const CATEGORIES: CategoryMeta[] = [
  // ── Programación ──────────────────────────────────────────────────────────
  {
    id: "c",
    label: "C",
    labelKey: "blog.category.c",
    color: "bg-blue-700",
    textColor: "text-blue-700 dark:text-blue-400",
    group: "programming",
  },
  {
    id: "cpp",
    label: "C++",
    labelKey: "blog.category.cpp",
    color: "bg-cyan-600",
    textColor: "text-cyan-600 dark:text-cyan-400",
    group: "programming",
  },
  {
    id: "csharp",
    label: "C#",
    labelKey: "blog.category.csharp",
    color: "bg-purple-600",
    textColor: "text-purple-600 dark:text-purple-400",
    group: "programming",
  },
  {
    id: "java",
    label: "Java",
    labelKey: "blog.category.java",
    color: "bg-orange-600",
    textColor: "text-orange-600 dark:text-orange-400",
    group: "programming",
  },
  {
    id: "javascript",
    label: "JavaScript",
    labelKey: "blog.category.javascript",
    color: "bg-yellow-500",
    textColor: "text-yellow-600 dark:text-yellow-400",
    group: "programming",
  },
  {
    id: "typescript",
    label: "TypeScript",
    labelKey: "blog.category.typescript",
    color: "bg-blue-500",
    textColor: "text-blue-500 dark:text-blue-400",
    group: "programming",
  },
  {
    id: "python",
    label: "Python",
    labelKey: "blog.category.python",
    color: "bg-sky-500",
    textColor: "text-sky-600 dark:text-sky-400",
    group: "programming",
  },
  {
    id: "php",
    label: "PHP",
    labelKey: "blog.category.php",
    color: "bg-indigo-500",
    textColor: "text-indigo-500 dark:text-indigo-400",
    group: "programming",
  },
  {
    id: "go",
    label: "Go",
    labelKey: "blog.category.go",
    color: "bg-cyan-500",
    textColor: "text-cyan-500 dark:text-cyan-400",
    group: "programming",
  },
  {
    id: "rust",
    label: "Rust",
    labelKey: "blog.category.rust",
    color: "bg-orange-700",
    textColor: "text-orange-700 dark:text-orange-400",
    group: "programming",
  },
  // ── Desarrollo Web ────────────────────────────────────────────────────────
  {
    id: "html",
    label: "HTML",
    labelKey: "blog.category.html",
    color: "bg-orange-500",
    textColor: "text-orange-500 dark:text-orange-400",
    group: "web",
  },
  {
    id: "css",
    label: "CSS",
    labelKey: "blog.category.css",
    color: "bg-blue-400",
    textColor: "text-blue-400 dark:text-blue-300",
    group: "web",
  },
  {
    id: "html-css",
    label: "HTML y CSS",
    labelKey: "blog.category.html-css",
    color: "bg-orange-500",
    textColor: "text-orange-500 dark:text-orange-400",
    group: "web",
  },
  {
    id: "testing",
    label: "Testing",
    labelKey: "blog.category.testing",
    color: "bg-rose-500",
    textColor: "text-rose-500 dark:text-rose-400",
    group: "web",
  },
  {
    id: "tailwind",
    label: "Tailwind CSS",
    labelKey: "blog.category.tailwind",
    color: "bg-teal-500",
    textColor: "text-teal-500 dark:text-teal-400",
    group: "web",
  },
  {
    id: "react",
    label: "React",
    labelKey: "blog.category.react",
    color: "bg-cyan-500",
    textColor: "text-cyan-500 dark:text-cyan-400",
    group: "web",
  },
  {
    id: "nextjs",
    label: "Next.js",
    labelKey: "blog.category.nextjs",
    color: "bg-black",
    textColor: "text-gray-700 dark:text-gray-300",
    group: "web",
  },
  {
    id: "vue",
    label: "Vue",
    labelKey: "blog.category.vue",
    color: "bg-emerald-500",
    textColor: "text-emerald-500 dark:text-emerald-400",
    group: "web",
  },
  {
    id: "angular",
    label: "Angular",
    labelKey: "blog.category.angular",
    color: "bg-red-600",
    textColor: "text-red-600 dark:text-red-400",
    group: "web",
  },
  // ── Backend ───────────────────────────────────────────────────────────────
  {
    id: "nodejs",
    label: "Node.js",
    labelKey: "blog.category.nodejs",
    color: "bg-green-600",
    textColor: "text-green-600 dark:text-green-400",
    group: "backend",
  },
  {
    id: "express",
    label: "Express",
    labelKey: "blog.category.express",
    color: "bg-gray-600",
    textColor: "text-gray-600 dark:text-gray-400",
    group: "backend",
  },
  {
    id: "nestjs",
    label: "NestJS",
    labelKey: "blog.category.nestjs",
    color: "bg-red-500",
    textColor: "text-red-500 dark:text-red-400",
    group: "backend",
  },
  {
    id: "spring-boot",
    label: "Spring Boot",
    labelKey: "blog.category.spring",
    color: "bg-green-500",
    textColor: "text-green-500 dark:text-green-400",
    group: "backend",
  },
  {
    id: "aspnet",
    label: "ASP.NET",
    labelKey: "blog.category.aspnet",
    color: "bg-purple-700",
    textColor: "text-purple-700 dark:text-purple-400",
    group: "backend",
  },
  {
    id: "rest-api",
    label: "APIs REST",
    labelKey: "blog.category.rest-apis",
    color: "bg-emerald-400",
    textColor: "text-emerald-400 dark:text-emerald-300",
    group: "backend",
  },
  {
    id: "graphql",
    label: "GraphQL",
    labelKey: "blog.category.graphql",
    color: "bg-pink-600",
    textColor: "text-pink-600 dark:text-pink-400",
    group: "backend",
  },
  // ── Bases de Datos ────────────────────────────────────────────────────────
  {
    id: "sql",
    label: "SQL",
    labelKey: "blog.category.sql",
    color: "bg-blue-600",
    textColor: "text-blue-600 dark:text-blue-400",
    group: "databases",
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    labelKey: "blog.category.postgresql",
    color: "bg-blue-800",
    textColor: "text-blue-800 dark:text-blue-300",
    group: "databases",
  },
  {
    id: "mysql",
    label: "MySQL",
    labelKey: "blog.category.mysql",
    color: "bg-orange-500",
    textColor: "text-orange-500 dark:text-orange-400",
    group: "databases",
  },
  {
    id: "mongodb",
    label: "MongoDB",
    labelKey: "blog.category.mongodb",
    color: "bg-green-600",
    textColor: "text-green-600 dark:text-green-400",
    group: "databases",
  },
  {
    id: "supabase",
    label: "Supabase",
    labelKey: "blog.category.supabase",
    color: "bg-emerald-500",
    textColor: "text-emerald-500 dark:text-emerald-400",
    group: "databases",
  },
  // ── DevOps ────────────────────────────────────────────────────────────────
  {
    id: "docker",
    label: "Docker",
    labelKey: "blog.category.docker",
    color: "bg-blue-600",
    textColor: "text-blue-600 dark:text-blue-400",
    group: "devops",
  },
  {
    id: "kubernetes",
    label: "Kubernetes",
    labelKey: "blog.category.kubernetes",
    color: "bg-blue-700",
    textColor: "text-blue-700 dark:text-blue-400",
    group: "devops",
  },
  {
    id: "ci-cd",
    label: "CI/CD",
    labelKey: "blog.category.cicd",
    color: "bg-violet-600",
    textColor: "text-violet-600 dark:text-violet-400",
    group: "devops",
  },
  {
    id: "linux",
    label: "Linux",
    labelKey: "blog.category.linux",
    color: "bg-yellow-600",
    textColor: "text-yellow-600 dark:text-yellow-400",
    group: "devops",
  },
  {
    id: "git",
    label: "Git",
    labelKey: "blog.category.git",
    color: "bg-orange-600",
    textColor: "text-orange-600 dark:text-orange-400",
    group: "devops",
  },
  // ── Inteligencia Artificial ───────────────────────────────────────────────
  {
    id: "prompt-engineering",
    label: "Prompt Engineering",
    labelKey: "blog.category.prompt-engineering",
    color: "bg-fuchsia-600",
    textColor: "text-fuchsia-600 dark:text-fuchsia-400",
    group: "ai",
  },
  {
    id: "llms",
    label: "LLMs",
    labelKey: "blog.category.llms",
    color: "bg-purple-600",
    textColor: "text-purple-600 dark:text-purple-400",
    group: "ai",
  },
  {
    id: "ai-agents",
    label: "AI Agents",
    labelKey: "blog.category.ai-agents",
    color: "bg-indigo-600",
    textColor: "text-indigo-600 dark:text-indigo-400",
    group: "ai",
  },
  {
    id: "machine-learning",
    label: "Machine Learning",
    labelKey: "blog.category.machine-learning",
    color: "bg-blue-600",
    textColor: "text-blue-600 dark:text-blue-400",
    group: "ai",
  },
  {
    id: "deep-learning",
    label: "Deep Learning",
    labelKey: "blog.category.deep-learning",
    color: "bg-violet-700",
    textColor: "text-violet-700 dark:text-violet-400",
    group: "ai",
  },
  // ── Arquitectura ─────────────────────────────────────────────────────────
  {
    id: "clean-architecture",
    label: "Clean Architecture",
    labelKey: "blog.category.clean-architecture",
    color: "bg-slate-600",
    textColor: "text-slate-600 dark:text-slate-400",
    group: "architecture",
  },
  {
    id: "ddd",
    label: "DDD",
    labelKey: "blog.category.ddd",
    color: "bg-slate-700",
    textColor: "text-slate-700 dark:text-slate-400",
    group: "architecture",
  },
  {
    id: "microservices",
    label: "Microservicios",
    labelKey: "blog.category.microservices",
    color: "bg-teal-600",
    textColor: "text-teal-600 dark:text-teal-400",
    group: "architecture",
  },
  {
    id: "design-patterns",
    label: "Patrones de Diseño",
    labelKey: "blog.category.design-patterns",
    color: "bg-purple-500",
    textColor: "text-purple-500 dark:text-purple-400",
    group: "architecture",
  },
  // ── Recursos ──────────────────────────────────────────────────────────────
  {
    id: "resources",
    label: "Recursos",
    labelKey: "blog.category.resources",
    color: "bg-amber-400",
    textColor: "text-amber-600 dark:text-amber-400",
    group: "resources",
  },
  {
    id: "security",
    label: "Seguridad",
    labelKey: "blog.category.security",
    color: "bg-violet-500",
    textColor: "text-violet-500 dark:text-violet-400",
    group: "resources",
  },
  {
    id: "ia-tools",
    label: "IA / Tokens",
    labelKey: "blog.category.ia-tokens",
    color: "bg-fuchsia-500",
    textColor: "text-fuchsia-500 dark:text-fuchsia-400",
    group: "resources",
  },
  // ── Herramientas ─────────────────────────────────────────────────────────────
  {
    id: "opencode",
    label: "OpenCode",
    labelKey: "blog.category.opencode",
    color: "bg-violet-600",
    textColor: "text-violet-600 dark:text-violet-400",
    group: "ai",
  },
];

export function getCategory(id: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getCategoryGroup(groupId: string): CategoryGroup | undefined {
  return CATEGORY_GROUPS.find((g) => g.id === groupId);
}

// ── Tags ──────────────────────────────────────────────────────────────────────

export const STANDARD_TAGS = [
  "frontend",
  "backend",
  "fullstack",
  "seguridad",
  "optimización",
  "testing",
  "arquitectura",
  "rendimiento",
  "APIs",
  "bases de datos",
  "cloud",
  "inteligencia artificial",
  "punteros",
  "memoria",
  "sistemas",
  "POO",
  "patrones",
  "async",
  "tipado",
  "generics",
  "módulos",
  "tokens",
  "prompts",
  "automatización",
  "recursos",
  "diseño",
  "herramientas",
] as const;

// ── Learning Paths ────────────────────────────────────────────────────────────

export type LearningPathId =
  | "fullstack"
  | "frontend"
  | "backend"
  | "ai-engineer"
  | "devops";

export interface LearningPathStep {
  categoryId: string; // maps to a CATEGORIES entry
  label: string; // display override if different from category label
  labelKey: string;
  optional?: boolean;
}

export interface LearningPath {
  id: LearningPathId;
  title: string;
  titleKey: string;
  description: string;
  descKey: string;
  icon: string; // emoji
  color: string; // tailwind gradient class
  steps: LearningPathStep[];
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: "fullstack",
    title: "Full Stack Developer",
    titleKey: "blog.learningPath.fullstack",
    description:
      "De cero a desarrollador completo — frontend, backend y bases de datos",
    descKey: "blog.learningPath.fullstackDesc",
    icon: "⚡",
    color: "from-blue-500 to-purple-600",
    steps: [
      { categoryId: "html", label: "HTML", labelKey: "blog.category.html" },
      { categoryId: "css", label: "CSS", labelKey: "blog.category.css" },
      { categoryId: "javascript", label: "JavaScript", labelKey: "blog.category.javascript" },
      { categoryId: "typescript", label: "TypeScript", labelKey: "blog.category.typescript" },
      { categoryId: "react", label: "React", labelKey: "blog.category.react" },
      { categoryId: "nodejs", label: "Node.js", labelKey: "blog.category.nodejs" },
      { categoryId: "sql", label: "SQL", labelKey: "blog.category.sql" },
      { categoryId: "rest-api", label: "APIs REST", labelKey: "blog.category.rest-apis" },
      { categoryId: "clean-architecture", label: "Arquitectura", labelKey: "blog.category.clean-architecture" },
    ],
  },
  {
    id: "backend",
    title: "Backend Developer",
    titleKey: "blog.learningPath.backend",
    description: "Servidores, APIs, bases de datos y arquitectura profesional",
    descKey: "blog.learningPath.backendDesc",
    icon: "🔧",
    color: "from-emerald-500 to-teal-600",
    steps: [
      { categoryId: "javascript", label: "JavaScript", labelKey: "blog.category.javascript" },
      { categoryId: "typescript", label: "TypeScript", labelKey: "blog.category.typescript" },
      { categoryId: "nodejs", label: "Node.js", labelKey: "blog.category.nodejs" },
      { categoryId: "express", label: "Express", labelKey: "blog.category.express" },
      { categoryId: "sql", label: "SQL", labelKey: "blog.category.sql" },
      { categoryId: "supabase", label: "Supabase", labelKey: "blog.category.supabase" },
      { categoryId: "security", label: "Seguridad", labelKey: "blog.category.security" },
      { categoryId: "clean-architecture", label: "Arquitectura", labelKey: "blog.category.clean-architecture" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Developer",
    titleKey: "blog.learningPath.frontend",
    description: "Interfaces modernas, rendimiento y experiencia de usuario",
    descKey: "blog.learningPath.frontendDesc",
    icon: "🎨",
    color: "from-pink-500 to-rose-600",
    steps: [
      { categoryId: "html", label: "HTML", labelKey: "blog.category.html" },
      { categoryId: "css", label: "CSS", labelKey: "blog.category.css" },
      { categoryId: "javascript", label: "JavaScript", labelKey: "blog.category.javascript" },
      { categoryId: "typescript", label: "TypeScript", labelKey: "blog.category.typescript" },
      { categoryId: "react", label: "React", labelKey: "blog.category.react" },
      { categoryId: "optimización", label: "Optimización", labelKey: "blog.step.optimization", optional: true },
    ],
  },
  {
    id: "ai-engineer",
    title: "IA Engineer",
    titleKey: "blog.learningPath.ai",
    description: "Agentes de IA, LLMs, prompt engineering y automatización",
    descKey: "blog.learningPath.aiDesc",
    icon: "🤖",
    color: "from-fuchsia-500 to-purple-600",
    steps: [
      { categoryId: "python", label: "Python", labelKey: "blog.category.python" },
      { categoryId: "rest-api", label: "APIs", labelKey: "blog.step.apis" },
      { categoryId: "prompt-engineering", label: "Prompt Engineering", labelKey: "blog.category.prompt-engineering" },
      { categoryId: "ai-agents", label: "AI Agents", labelKey: "blog.category.ai-agents" },
      { categoryId: "llms", label: "LLMs", labelKey: "blog.category.llms" },
      { categoryId: "automatización", label: "Automatización", labelKey: "blog.step.automation", optional: true },
    ],
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    titleKey: "blog.learningPath.devops",
    description: "Infraestructura, contenedores, CI/CD y automatización",
    descKey: "blog.learningPath.devopsDesc",
    icon: "🚀",
    color: "from-orange-500 to-amber-600",
    steps: [
      { categoryId: "linux", label: "Linux", labelKey: "blog.category.linux" },
      { categoryId: "git", label: "Git", labelKey: "blog.category.git" },
      { categoryId: "docker", label: "Docker", labelKey: "blog.category.docker" },
      { categoryId: "kubernetes", label: "Kubernetes", labelKey: "blog.category.kubernetes" },
      { categoryId: "ci-cd", label: "CI/CD", labelKey: "blog.category.cicd" },
    ],
  },
];

export function getLearningPath(id: LearningPathId): LearningPath | undefined {
  return LEARNING_PATHS.find((p) => p.id === id);
}

export function getLevelLabelKey(level: DifficultyLevel): string {
  return LEVELS.find((l) => l.id === level)?.labelKey ?? "blog.level.beginner";
}
export function getLevelDescKey(level: DifficultyLevel): string {
  return LEVELS.find((l) => l.id === level)?.descKey ?? "blog.level.beginnerDesc";
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
  { fromSlug: "c-lang", toSlug: "cpp-lang", type: "next" },
  { fromSlug: "cpp-lang", toSlug: "c-lang", type: "prerequisite" },
  { fromSlug: "typescript", toSlug: "javascript", type: "prerequisite" },
  { fromSlug: "java-poo", toSlug: "java", type: "next" },
  { fromSlug: "java-poo", toSlug: "java", type: "prerequisite" },
  { fromSlug: "java-spring", toSlug: "java", type: "prerequisite" },
  { fromSlug: "java-spring", toSlug: "java-poo", type: "prerequisite" },
  { fromSlug: "html-css", toSlug: "javascript", type: "prerequisite" },
  {
    fromSlug: "testing-frontend",
    toSlug: "react-framework",
    type: "prerequisite",
  },

  // AI tools cluster

  // OpenCode deepdive
  { fromSlug: "opencode", toSlug: "opencode-models", type: "deepdive" },

  // Skills cluster
  { fromSlug: "skills-tutorial", toSlug: "skills-catalog", type: "deepdive" },

  // MCP cluster
  { fromSlug: "instalar-mcp", toSlug: "mcp-servers", type: "deepdive" },
  { fromSlug: "instalar-mcp", toSlug: "crear-mcp", type: "next" },
  { fromSlug: "instalar-mcp", toSlug: "clientes-mcp", type: "related" },
  { fromSlug: "instalar-mcp", toSlug: "seguridad-mcp", type: "related" },
  { fromSlug: "instalar-mcp", toSlug: "ollama-mcp", type: "related" },
  { fromSlug: "instalar-mcp", toSlug: "rag-con-mcp", type: "related" },
  { fromSlug: "crear-mcp", toSlug: "mcp-servers", type: "related" },
  { fromSlug: "ai-project", toSlug: "frameworks-agentes", type: "related" },
  { fromSlug: "skills-tutorial", toSlug: "plugins-ia-editor", type: "related" },
  { fromSlug: "opencode", toSlug: "agentes-paralelo", type: "deepdive" },

  // Article relationships
  { fromSlug: "database", toSlug: "typescript", type: "related" },
  { fromSlug: "svg", toSlug: "database", type: "related" },

  // Guide relationships
  { fromSlug: "ruta-opencode", toSlug: "opencode", type: "deepdive" },
  { fromSlug: "ruta-opencode", toSlug: "instalar-mcp", type: "deepdive" },
  { fromSlug: "ruta-opencode", toSlug: "skills-tutorial", type: "deepdive" },
  { fromSlug: "ruta-opencode", toSlug: "agentes-paralelo", type: "deepdive" },
  { fromSlug: "ruta-java", toSlug: "java", type: "deepdive" },
  { fromSlug: "ruta-java", toSlug: "java-poo", type: "deepdive" },
  { fromSlug: "ruta-java", toSlug: "java-spring", type: "deepdive" },
  { fromSlug: "ruta-frontend", toSlug: "html-css", type: "deepdive" },
  { fromSlug: "ruta-frontend", toSlug: "javascript", type: "deepdive" },
  { fromSlug: "ruta-frontend", toSlug: "typescript", type: "deepdive" },
  { fromSlug: "ruta-frontend", toSlug: "react-framework", type: "deepdive" },
  { fromSlug: "ruta-frontend", toSlug: "nextjs-framework", type: "deepdive" },
  { fromSlug: "ruta-frontend", toSlug: "testing-frontend", type: "deepdive" },
  { fromSlug: "ruta-c", toSlug: "c-lang", type: "deepdive" },
  { fromSlug: "ruta-cpp", toSlug: "c-lang", type: "prerequisite" },
  { fromSlug: "ruta-cpp", toSlug: "cpp-lang", type: "deepdive" },
];

export function getRelatedContent(
  slug: string,
): { slug: string; type: RelationType }[] {
  return CONTENT_RELATIONSHIPS.filter((r) => r.fromSlug === slug).map((r) => ({
    slug: r.toSlug,
    type: r.type,
  }));
}
