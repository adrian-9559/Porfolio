"use client";
import { useState } from "react";
import { LogoGithub, ArrowUpRightFromSquare } from "@gravity-ui/icons";
import Link from "next/link";

import { useT } from "@/hooks/useT";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Project {
  title: string;
  descKey: string;
  tags: string[];
  github?: string;
  demo?: string;
  gradient: string;
  accentBg: string;
  letter: string;
  category: string;
}

const ALL_PROJECTS: Project[] = [
  {
    title: "GymGO",
    descKey: "gymgoDesc",
    tags: ["React", "Node.js", "Supabase", "React Native"],
    gradient: "from-violet-500 to-purple-600",
    accentBg: "from-violet-500/10 to-purple-500/5",
    letter: "G",
    category: "react",
  },
  {
    title: "CodeXplore",
    descKey: "codexploreDesc",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "HeroUI"],
    gradient: "from-emerald-500 to-teal-600",
    accentBg: "from-emerald-500/10 to-teal-500/5",
    letter: "X",
    category: "next",
  },
  {
    title: "ft_irc",
    descKey: "ftircDesc",
    tags: ["C++", "Sockets", "Linux", "Redes"],
    github: "https://github.com/adrigar25/ft_irc",
    gradient: "from-pink-500 to-rose-600",
    accentBg: "from-pink-500/10 to-rose-500/5",
    letter: "I",
    category: "cplusplus",
  },
  {
    title: "cub3D",
    descKey: "cub3dDesc",
    tags: ["C", "Graphics", "MLX", "Algoritmos"],
    github: "https://github.com/adrigar25/cub3D",
    gradient: "from-orange-500 to-amber-600",
    accentBg: "from-orange-500/10 to-amber-500/5",
    letter: "C",
    category: "cplusplus",
  },
  {
    title: "Portfolio",
    descKey: "portfolioDesc",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    demo: "https://adrianescribano.dev",
    gradient: "from-blue-500 to-indigo-600",
    accentBg: "from-blue-500/10 to-indigo-500/5",
    letter: "P",
    category: "next",
  },
  {
    title: "Partimos",
    descKey: "partimosDesc",
    tags: ["React Native", "Expo", "Zustand", "TypeScript"],
    gradient: "from-cyan-500 to-blue-600",
    accentBg: "from-cyan-500/10 to-blue-500/5",
    letter: "M",
    category: "react",
  },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "react", label: "React" },
  { id: "next", label: "Next.js" },
  { id: "cplusplus", label: "C/C++" },
];

export default function Projects() {
  const { t } = useT();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.category === filter);

  return (
    <section className="relative w-full" id="projects">
      <div className="blob absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-violet-400/6 to-transparent -z-10" />

      <div className="space-y-10">
        <ScrollReveal>
          <div className="text-center space-y-2">
            <p className="section-label">{t("sections.projects.badge")}</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ letterSpacing: "-0.03em" }}>
              {t("sections.projects.title")}
            </h2>
            <p className="text-[#6e6e73] dark:text-[#86868b] max-w-xl mx-auto text-sm">
              {t("sections.projects.desc")}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="flex justify-center">
            <div className="inline-flex gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    filter === f.id
                      ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-md"
                      : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
                  }`}
                  type="button"
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project, idx) => (
            <ScrollReveal key={project.title} delay={idx * 80}>
              <div
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${project.accentBg} border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-2xl hover:shadow-black/8 dark:hover:shadow-black/30 transition-all duration-300 flex flex-col overflow-hidden h-full`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} opacity-80`} />
                <div className={`absolute -top-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-br ${project.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />

                <div className="relative flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}
                    >
                      {project.letter}
                    </div>
                    <div className="flex gap-2">
                      {project.github && (
                        <Link
                          className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline"
                          href={project.github}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <LogoGithub className="w-3.5 h-3.5" />
                        </Link>
                      )}
                      {project.demo && (
                        <Link
                          className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors no-underline"
                          href={project.demo}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <ArrowUpRightFromSquare className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
                      {t(`sections.projects.${project.descKey}`)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-black/6 dark:border-white/6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/70 dark:bg-white/8 text-[#3d3d3d] dark:text-[#c0c0c5] border border-black/8 dark:border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="flex justify-center">
            <Link
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] font-semibold text-sm hover:opacity-90 transition-opacity no-underline"
              href="https://github.com/adrian-9559"
              rel="noopener noreferrer"
              target="_blank"
            >
              <LogoGithub className="w-4 h-4" />
              {t("sections.projects.viewAll")}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
