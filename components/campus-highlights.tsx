"use client";
import Link from "next/link";
import { useT } from "@/hooks/useT";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Guide {
  title: string;
  description: string;
  slug: string;
  category: string;
  level: string;
  tutorials: number;
  gradient: string;
}

interface Tutorial {
  title: string;
  description: string;
  slug: string;
  category: string;
  readTime: string;
  tags: string[];
  gradient: string;
}

const FEATURED_GUIDES: Guide[] = [
  {
    title: "Desarrollo Web Full Stack",
    description: "Ruta completa para dominar el desarrollo web moderno con React, Next.js, Node.js y bases de datos.",
    slug: "ruta-frontend",
    category: "Frontend",
    level: "Nivel 1-4",
    tutorials: 13,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Backend y APIs",
    description: "Aprende a crear APIs robustas con Node.js, Express, autenticación JWT y bases de datos.",
    slug: "ruta-backend-js",
    category: "Backend",
    level: "Nivel 2-4",
    tutorials: 8,
    gradient: "from-teal-500 to-green-500",
  },
];

const FEATURED_TUTORIALS: Tutorial[] = [
  {
    title: "React Hooks: Guía completa",
    description: "Domina useState, useEffect, useContext y custom hooks con ejemplos prácticos y patrones avanzados.",
    slug: "react-framework",
    category: "Frontend",
    readTime: "15 min",
    tags: ["React", "Hooks", "JavaScript"],
    gradient: "from-emerald-400 to-teal-400",
  },
  {
    title: "TypeScript desde cero",
    description: "Aprende TypeScript desde los fundamentos hasta tipos avanzados, interfaces y genéricos.",
    slug: "typescript",
    category: "Lenguajes",
    readTime: "20 min",
    tags: ["TypeScript", "JavaScript"],
    gradient: "from-teal-400 to-green-400",
  },
];

export default function CampusHighlights() {
  const { t } = useT();

  return (
    <section className="relative w-full">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="blob absolute top-[-80px] right-[10%] w-[350px] h-[350px] bg-gradient-radial from-emerald-500/10 via-teal-400/5 to-transparent" />
        <div className="blob absolute bottom-[-40px] left-[15%] w-[300px] h-[250px] bg-gradient-to-tr from-green-400/8 to-transparent" />
      </div>

      <div className="space-y-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-300/40 dark:border-emerald-700/40 text-emerald-700 dark:text-emerald-300 backdrop-blur-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
              {t("sections.campus.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
              {t("sections.campus.title")}
            </h2>
            <p className="text-[#6e6e73] dark:text-[#86868b] max-w-xl mx-auto text-sm">
              {t("sections.campus.desc")}
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Guides */}
        <div className="space-y-4">
          <ScrollReveal>
            <h3 className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest">
              {t("sections.campus.featuredGuides")}
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURED_GUIDES.map((guide, idx) => (
              <ScrollReveal key={guide.slug} delay={idx * 100}>
                <Link
                  href={`/campus/guias/${guide.slug}`}
                  className="group block h-full no-underline"
                >
                  <div className="h-full p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-emerald-300/60 dark:hover:border-emerald-700/60 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${guide.gradient} opacity-80`} />
                    <div className={`absolute -top-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-br ${guide.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />

                    <div className="relative flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          {guide.category}
                        </span>
                        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                          {guide.level}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-[#6e6e73] dark:text-[#86868b] leading-relaxed flex-1">
                        {guide.description}
                      </p>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/6 dark:border-white/6">
                        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                          {guide.tutorials} tutoriales
                        </span>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                          {t("sections.campus.startPath")} →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Featured Tutorials */}
        <div className="space-y-4">
          <ScrollReveal>
            <h3 className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest">
              {t("sections.campus.featuredTutorials")}
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURED_TUTORIALS.map((tutorial, idx) => (
              <ScrollReveal key={tutorial.slug} delay={idx * 100}>
                <Link
                  href={`/campus/tutoriales/${tutorial.slug}`}
                  className="group block h-full no-underline"
                >
                  <div className="h-full p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className={`w-full h-1 rounded-full bg-gradient-to-r ${tutorial.gradient} mb-5 opacity-80`} />

                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {tutorial.category}
                      </span>
                      <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                        {tutorial.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {tutorial.title}
                    </h3>
                    <p className="text-sm text-[#6e6e73] dark:text-[#86868b] leading-relaxed flex-1">
                      {tutorial.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-black/6 dark:border-white/6">
                      {tutorial.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/5 dark:bg-white/10 text-[#3d3d3d] dark:text-[#c0c0c5]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-end mt-3">
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                        {t("sections.campus.startTutorial")} →
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="flex justify-center">
            <Link
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white font-semibold text-sm transition-all duration-200 hover:scale-105 no-underline"
              href="/campus"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              {t("sections.campus.viewAll")} →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
