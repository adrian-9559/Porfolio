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
  diseno: { label: "Diseño", color: "bg-violet-500" },
  desarrollo: { label: "Desarrollo", color: "bg-blue-500" },
  herramientas: { label: "Herramientas", color: "bg-amber-500" },
  "base-de-datos": { label: "Base de Datos", color: "bg-emerald-500" },
  inteligencia: { label: "Inteligencia de Código", color: "bg-cyan-500" },
  contenido: { label: "Contenido y Presentaciones", color: "bg-rose-500" },
  seguridad: { label: "Seguridad", color: "bg-red-500" },
};

const skills: SkillEntry[] = [
  {
    name: "UI/UX Pro Max",
    desc: "Base de datos de inteligencia de diseño UI/UX con búsqueda BM25. Patterns, stacks, principios de diseño.",
    use: "Consultar patrones de UI/UX, encontrar mejores prácticas por stack tecnológico",
    action: "Usa el skill de ui-ux-pro-max",
    icon: "🎨",
    category: "diseno",
    location: ".claude/skills/ui-ux-pro-max/",
    origin: "claudekit — diseño UI/UX",
    install:
      "Viene incluido en el proyecto. Si falta, copia la carpeta .claude/skills/ui-ux-pro-max/ desde el repo raíz.",
  },
  {
    name: "Design",
    desc: "Diseño integral: identidad de marca, tokens de diseño, estilado UI, generación de logos (55 estilos, Gemini AI).",
    use: "Crear identidad visual, logos, mockups, sistema de diseño completo",
    action: "Usa el skill de design",
    icon: "✏️",
    category: "diseno",
    location: ".claude/skills/design/",
    origin: "claudekit — diseño integral",
    install:
      "Viene incluido en el proyecto. Si falta, copia la carpeta .claude/skills/design/ desde el repo raíz.",
  },
  {
    name: "Design System",
    desc: "Arquitectura de tokens en tres capas (primitivo → semántico → componente). Especificaciones de componentes y presentaciones.",
    use: "Definir tokens de diseño, crear especificaciones de componentes, slides estratégicos",
    action: "Usa el skill de design-system",
    icon: "🧩",
    category: "diseno",
    location: ".claude/skills/design-system/",
    origin: "claudekit — tokens y componentes",
    install:
      "Viene incluido en el proyecto. Si falta, copia la carpeta .claude/skills/design-system/ desde el repo raíz.",
  },
  {
    name: "Frontend Design",
    desc: "Traduce decisiones de diseño UI/UX Pro Max a código frontend con TailwindCSS y HeroUI (web + native).",
    use: "Convertir diseños a código implementando las guías de UI/UX Pro Max",
    action: "Usa el skill de frontend-design",
    icon: "💻",
    category: "diseno",
    location: ".agents/skills/frontend-design/",
    origin: "adrian_9559 — propio",
    install:
      "Copia la carpeta .agents/skills/frontend-design/ desde el repo raíz o créala manualmente con el contenido del tutorial.",
  },
  {
    name: "Banner Design",
    desc: "Diseño de banners para redes sociales, anuncios, heroes de web y print. 22 estilos con IA generativa.",
    use: "Crear banners para Facebook, Twitter, LinkedIn, YouTube, Instagram, Google Display",
    action: "Usa el skill de banner-design",
    icon: "🖼️",
    category: "diseno",
    location: ".claude/skills/banner-design/",
    origin: "claudekit — banners",
    install:
      "Viene incluido en el proyecto. Si falta, copia .claude/skills/banner-design/ desde el repo raíz.",
  },
  {
    name: "UI Styling",
    desc: "Interfaces de usuario accesibles con shadcn/ui (Radix UI + Tailwind), Tailwind CSS utility-first y diseño visual con canvas.",
    use: "Construir componentes accesibles, temas modo oscuro, posters, layouts responsive",
    action: "Usa el skill de ui-styling",
    icon: "✨",
    category: "diseno",
    location: ".claude/skills/ui-styling/",
    origin: "claudekit — interfaces",
    install:
      "Viene incluido en el proyecto. Si falta, copia .claude/skills/ui-styling/ desde el repo raíz.",
  },
  {
    name: "Brand",
    desc: "Voz de marca, identidad visual, frameworks de mensajería, gestión de activos, consistencia de marca.",
    use: "Crear contenido alineado con la marca, revisar consistencia, generar guías de estilo",
    action: "Usa el skill de brand",
    icon: "🏷️",
    category: "diseno",
    location: ".claude/skills/brand/",
    origin: "claudekit — marca",
    install:
      "Viene incluido en el proyecto. Si falta, copia .claude/skills/brand/ desde el repo raíz.",
  },
  {
    name: "Node.js Backend Patterns",
    desc: "Patrones de backend production-ready con Express/Fastify: middlewares, auth, integración de BD, APIs REST.",
    use: "Construir servidores Node.js, REST APIs, microservicios, backend con Express",
    action: "Usa el skill de nodejs-backend-patterns",
    icon: "⚙️",
    category: "desarrollo",
    location: ".agents/skills/nodejs-backend-patterns/",
    origin: "Comunidad OpenCode",
    install:
      "Clona el repo comunitario de skills: git clone https://github.com/opencode/skills ~/.agents/skills/",
  },
  {
    name: "Vercel React Best Practices",
    desc: "Guías de optimización de rendimiento React y Next.js de Vercel Engineering. Data fetching, bundles, rendering.",
    use: "Optimizar rendimiento de apps React/Next.js, revisar patrones de data fetching",
    action: "Usa el skill de vercel-react-best-practices",
    icon: "⚡",
    category: "desarrollo",
    location: ".agents/skills/vercel-react-best-practices/",
    origin: "Vercel — oficial",
    install: "npx opencode@latest skill add vercel-react-best-practices",
  },
  {
    name: "Supabase",
    desc: "Guía experta de Supabase: Auth, Database, RLS, Edge Functions, Realtime, Storage, CLI, MCP, migraciones.",
    use: "Configurar Supabase, escribir RLS policies, migraciones, Edge Functions, integración SSR",
    action: "Usa el skill de supabase",
    icon: "🔥",
    category: "base-de-datos",
    location: ".agents/skills/supabase/",
    origin: "Supabase — oficial",
    install: "npx opencode@latest skill add supabase",
  },
  {
    name: "Graphify",
    desc: "Grafo de conocimiento del código fuente. Consultas sobre arquitectura, relaciones entre archivos, impacto de cambios.",
    use: "Entender arquitectura del código, encontrar dependencias, trazar impacto de cambios",
    action: "Usa el skill de graphify",
    icon: "🔮",
    category: "inteligencia",
    location: ".claude/skills/graphify/",
    origin: "Graphify",
    install:
      "Instala CodeGraph en el proyecto (codegraph init) y añade .claude/skills/graphify/ desde el repo raíz.",
  },
  {
    name: "Context7 MCP",
    desc: "Recuperación de documentación actualizada de librerías y frameworks via Context7 MCP.",
    use: "Obtener docs actualizados de React, Next.js, Prisma, Express, Tailwind, etc.",
    action: "Usa el skill de context7-mcp",
    icon: "📚",
    category: "herramientas",
    location: ".agents/skills/context7-mcp/",
    origin: "Comunidad OpenCode",
    install: "npx opencode@latest skill add context7-mcp",
  },
  {
    name: "Find Docs",
    desc: "Búsqueda de documentación, API references y ejemplos de código para cualquier tecnología de desarrollo.",
    use: "Buscar documentación de librerías, APIs, SDKs y herramientas CLI",
    action: "Usa el skill de find-docs",
    icon: "🔍",
    category: "herramientas",
    location: ".agents/skills/find-docs/",
    origin: "Comunidad OpenCode",
    install: "npx opencode@latest skill add find-docs",
  },
  {
    name: "Find Skills",
    desc: "Ayuda a descubrir e instalar skills cuando el usuario pregunta cómo hacer algo o busca funcionalidad específica.",
    use: "Encontrar skills disponibles para una tarea concreta",
    action: "Usa el skill de find-skills",
    icon: "🧭",
    category: "herramientas",
    location: ".agents/skills/find-skills/",
    origin: "Comunidad OpenCode",
    install: "npx opencode@latest skill add find-skills",
  },
  {
    name: "Customize OpenCode",
    desc: "Configuración de OpenCode: opencode.json, archivos .opencode/, skills, plugins, MCP servers, reglas de permiso.",
    use: "Editar configuración de OpenCode, crear skills y plugins",
    action: "Usa el skill de customize-opencode",
    icon: "🔧",
    category: "herramientas",
    location: ".opencode/skills/customize-opencode/",
    origin: "OpenCode — built-in",
    install:
      "Viene incluido con OpenCode. Si no aparece, actualiza a la última versión: npx opencode@latest upgrade",
  },
  {
    name: "Slides",
    desc: "Creación de presentaciones HTML estratégicas con Chart.js, tokens de diseño, layouts responsive, fórmulas de copywriting.",
    use: "Generar presentaciones con gráficos, slides de estrategia, storytelling visual",
    action: "Usa el skill de slides",
    icon: "📊",
    category: "contenido",
    location: ".claude/skills/slides/",
    origin: "claudekit — presentaciones",
    install:
      "Viene incluido en el proyecto. Si falta, copia .claude/skills/slides/ desde el repo raíz.",
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
        Todos ({skills.length})
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
          Artículo
        </span>
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
          8 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-4"
        style={{ letterSpacing: "-0.03em" }}
      >
        {skills.length} Skills para potenciar tu IA
      </h1>
      <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-8">
        Catálogo de skills de OpenCode agrupados por categoría. Cada skill
        incluye descripción, caso de uso y cómo activarlo.
      </p>

      <div className="h-px bg-black/8 dark:bg-white/8 mb-8" />

      <BlogP>
        Los skills se activan mencionándolos en el chat o referenciándolos en{" "}
        <code>AGENTS.md</code>. No necesitas instalarlos — con que existan en la
        carpeta correspondiente, la IA los encuentra.
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
                              Cómo activarlo
                            </p>
                            <p className="text-xs text-[#3a3a3c] dark:text-[#aeaeb2] font-mono">
                              {skill.action}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-1">
                              Ubicación
                            </p>
                            <p className="text-xs text-[#3a3a3c] dark:text-[#aeaeb2] font-mono">
                              {skill.location}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-1">
                            Uso recomendado
                          </p>
                          <p className="text-xs text-[#3a3a3c] dark:text-[#aeaeb2]">
                            {skill.use}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
                          <div>
                            <p className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-1">
                              Origen
                            </p>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-mono font-semibold">
                              {skill.origin}
                            </span>
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-1">
                              Cómo descargarlo
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
