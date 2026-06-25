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
		title: "Lenguaje C desde cero hasta avanzado",
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
		title: "C++ moderno desde cero hasta avanzado",
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
		title: "Mejores páginas para encontrar SVG",
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
		title: "Plataformas para hostear bases de datos",
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
		title: "Mejores plataformas para hostear frontend",
		description: "Vercel, Netlify, Cloudflare Pages y más. Análisis honesto con pros, contras y cuándo usar cada una.",
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
		title: "Mejores plataformas para hostear backend",
		description: "Railway, Render, Fly.io, Koyeb y más. Guía completa para elegir dónde alojar tu API o servidor en 2026.",
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
		tags: ["Backend", "Hosting", "Railway", "Render", "Fly.io", "deploy", "servidor"],
	},
	// ── Tools ─────────────────────────────────────────────────────────────────────
	{
		id: "palette-generator",
		slug: "palette-generator",
		type: "tool",
		title: "Generador de paletas de color",
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
		id: "prompt-compressor",
		slug: "prompt-compressor",
		type: "tool",
		title: "Prompt Compressor",
		description:
			"Elimina frases redundantes y simplifica tu prompt sin perder el significado original.",
		categoryId: "ia-tools",
		category: "IA / Tokens",
		categoryColor: "bg-fuchsia-500",
		level: "beginner",
		readTime: "Uso libre",
		estimatedMinutes: 0,
		learningPaths: ["ai-engineer"],
		prerequisites: [],
		objectives: ["Comprimir prompts manteniendo el significado", "Reducir coste de tokens en APIs de IA"],
		publishedAt: "2026-06-23",
		featured: true,
		tags: ["IA", "Tokens", "Prompts", "Optimización", "inteligencia artificial"],
	},
	{
		id: "token-optimizer",
		slug: "token-optimizer",
		type: "tool",
		title: "Token Optimizer",
		description:
			"Reescribe tu texto de forma más compacta usando contracciones y sustituciones semánticas.",
		categoryId: "ia-tools",
		category: "IA / Tokens",
		categoryColor: "bg-fuchsia-500",
		level: "beginner",
		readTime: "Uso libre",
		estimatedMinutes: 0,
		learningPaths: ["ai-engineer"],
		prerequisites: ["prompt-compressor"],
		objectives: ["Optimizar el recuento de tokens en textos", "Aplicar compresión semántica automática"],
		publishedAt: "2026-06-23",
		tags: ["IA", "Tokens", "Compresión", "inteligencia artificial"],
	},
	{
		id: "context-summarizer",
		slug: "context-summarizer",
		type: "tool",
		title: "Context Summarizer",
		description:
			"Resume textos largos o conversaciones extensas manteniendo los puntos clave.",
		categoryId: "ia-tools",
		category: "IA / Tokens",
		categoryColor: "bg-fuchsia-500",
		level: "beginner",
		readTime: "Uso libre",
		estimatedMinutes: 0,
		learningPaths: ["ai-engineer"],
		prerequisites: [],
		objectives: ["Resumir conversaciones largas para APIs de IA", "Mantener el contexto dentro del límite de tokens"],
		publishedAt: "2026-06-23",
		tags: ["IA", "Resumen", "Contexto", "inteligencia artificial"],
	},
	{
		id: "instruction-cleaner",
		slug: "instruction-cleaner",
		type: "tool",
		title: "Instruction Cleaner",
		description:
			"Convierte prompts en prosa a instrucciones estructuradas en lista, listas para la IA.",
		categoryId: "ia-tools",
		category: "IA / Tokens",
		categoryColor: "bg-fuchsia-500",
		level: "beginner",
		readTime: "Uso libre",
		estimatedMinutes: 0,
		learningPaths: ["ai-engineer"],
		prerequisites: [],
		objectives: ["Estructurar instrucciones en formato lista", "Mejorar la claridad de los prompts"],
		publishedAt: "2026-06-23",
		tags: ["IA", "Instrucciones", "Formato", "prompts"],
	},
	{
		id: "json-prompt-formatter",
		slug: "json-prompt-formatter",
		type: "tool",
		title: "JSON Prompt Formatter",
		description:
			"Convierte un prompt en texto libre a un esquema JSON estructurado optimizado para APIs de IA.",
		categoryId: "ia-tools",
		category: "IA / Tokens",
		categoryColor: "bg-fuchsia-500",
		level: "intermediate",
		readTime: "Uso libre",
		estimatedMinutes: 0,
		learningPaths: ["ai-engineer"],
		prerequisites: ["instruction-cleaner"],
		objectives: ["Formatear prompts como JSON estructurado", "Optimizar prompts para la API de Anthropic/OpenAI"],
		publishedAt: "2026-06-23",
		tags: ["IA", "JSON", "API", "Formato", "prompts"],
	},
	{
		id: "git",
		slug: "git",
		type: "tutorial",
		title: "Git completo: de cero a resolución de conflictos",
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
		tags: ["Git", "Control de versiones", "Conflictos", "Ramas", "GitHub", "DevOps"],
	},
	// ── New language tutorials ─────────────────────────────────────────────────
	{
		id: "javascript",
		slug: "javascript",
		type: "tutorial",
		title: "JavaScript desde cero hasta avanzado",
		description: "Tutorial completo de JavaScript: fundamentos, funciones, arrays, DOM, asincronía con Promises y async/await, ES6+ y 5 ejercicios prácticos.",
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
		title: "Python desde cero hasta avanzado",
		description: "Tutorial completo de Python: sintaxis, estructuras de datos, POO, módulos, automatización y 5 ejercicios prácticos.",
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
		title: "Java desde cero hasta avanzado",
		description: "Tutorial completo de Java: fundamentos, POO, colecciones, manejo de errores, Streams y un proyecto backend real.",
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
	// ── Framework tutorials ────────────────────────────────────────────────────
	{
		id: "react-framework",
		slug: "react-framework",
		type: "tutorial",
		title: "React: de componentes a aplicaciones completas",
		description: "Aprende React moderno con hooks, routing, Context API y optimización de rendimiento. Incluye proyecto dashboard completo.",
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
		title: "Node.js + Express: APIs REST profesionales",
		description: "Construye APIs REST completas con Node.js y Express: routing, middlewares, JWT, validación y arquitectura por capas.",
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
		title: "Next.js: aplicaciones fullstack modernas",
		description: "Domina Next.js con App Router, SSR, SSG, ISR, API Routes y optimización avanzada de rendimiento.",
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
		description: "Formatea, minifica y valida JSON al instante. Sin servidores, todo en tu navegador.",
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
		description: "Codifica y decodifica texto en Base64 al instante. Útil para tokens, imágenes y APIs.",
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
		description: "Prueba expresiones regulares en tiempo real con resaltado de coincidencias y ejemplos predefinidos.",
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
		description: "Convierte entre HEX, RGB y HSL. Selector interactivo, sliders y paletas predefinidas.",
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
		objectives: ["Generar contraseñas seguras configurables", "Entender los requisitos de una contraseña robusta"],
		publishedAt: "2026-06-23",
		featured: true,
		tags: ["Seguridad", "Privacidad", "Contraseñas", "seguridad"],
	},
];

// ── Query helpers ─────────────────────────────────────────────────────────────

export function getContentByType(type: ContentType): ContentMeta[] {
	return [...allContent]
		.filter((c) => c.type === type)
		.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getContentBySlug(slug: string, type?: ContentType): ContentMeta | undefined {
	return allContent.find((c) => c.slug === slug && (!type || c.type === type));
}

export function getContentByCategory(categoryId: string): ContentMeta[] {
	return allContent.filter((c) => c.categoryId === categoryId);
}

export function getContentByLevel(level: DifficultyLevel): ContentMeta[] {
	return allContent.filter((c) => c.level === level);
}

export function getContentByLearningPath(pathId: LearningPathId): ContentMeta[] {
	return allContent.filter((c) => c.learningPaths?.includes(pathId));
}

export function getLatestContent(): ContentMeta {
	return allContent.reduce((latest, item) =>
		item.publishedAt > latest.publishedAt ? item : latest
	);
}

export function getFeaturedContent(): ContentMeta[] {
	return allContent.filter((c) => c.featured);
}

export function searchContent(query: string, type?: ContentType): ContentMeta[] {
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
		if (opts.tag && !c.tags?.some((t) => t.toLowerCase() === opts.tag!.toLowerCase())) return false;
		if (opts.learningPath && !c.learningPaths?.includes(opts.learningPath)) return false;
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
	return { article: "Artículos", tutorial: "Tutoriales", tool: "Herramientas" }[type];
}

export function typeSlug(type: ContentType): string {
	return { article: "articulos", tutorial: "tutoriales", tool: "herramientas" }[type];
}
