"use client";
import { useState } from "react";
import { LogoGithub, ArrowUpRightFromSquare } from "@gravity-ui/icons";
import Link from "next/link";

import { useT } from "@/hooks/useT";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  IconDumbbell,
  IconCode,
  IconTerminal,
  IconCube,
  IconBriefcase,
  IconGamepad,
} from "@/components/ui/Icons";

interface Project {
  title: string;
  descKey: string;
  tags: string[];
  github?: string;
  demo?: string;
  icon: React.ReactNode;
  category: string;
}

const ALL_PROJECTS: Project[] = [
  {
    title: "GymGO",
    descKey: "gymgoDesc",
    tags: ["React", "Node.js", "Supabase", "React Native"],
    icon: <IconDumbbell className="w-5 h-5" />,
    category: "react",
  },
  {
    title: "CodeXplore",
    descKey: "codexploreDesc",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "HeroUI"],
    icon: <IconCode className="w-5 h-5" />,
    category: "next",
  },
  {
    title: "ft_irc",
    descKey: "ftircDesc",
    tags: ["C++", "Sockets", "Linux", "Redes"],
    github: "https://github.com/adrigar25/ft_irc",
    icon: <IconTerminal className="w-5 h-5" />,
    category: "cplusplus",
  },
  {
    title: "cub3D",
    descKey: "cub3dDesc",
    tags: ["C", "Graphics", "MLX", "Algoritmos"],
    github: "https://github.com/adrigar25/cub3D",
    icon: <IconCube className="w-5 h-5" />,
    category: "cplusplus",
  },
  {
    title: "Portfolio",
    descKey: "portfolioDesc",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    demo: "https://adrianescribano.dev",
    icon: <IconBriefcase className="w-5 h-5" />,
    category: "next",
  },
  {
    title: "Partimos",
    descKey: "partimosDesc",
    tags: ["React Native", "Expo", "Zustand", "TypeScript"],
    icon: <IconGamepad className="w-5 h-5" />,
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

  const filtered =
    filter === "all"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === filter);

  return (
    <section className="relative w-full" id="projects">
      <div className="space-y-10">
        <ScrollReveal>
          <div className="text-center space-y-2">
            <p className="ds-section-label">{t("sections.projects.badge")}</p>
            <h2
              className="text-3xl md:text-4xl font-black"
              style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
            >
              {t("sections.projects.title")}
            </h2>
            <p
              className="max-w-xl mx-auto text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("sections.projects.desc")}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={`ds-tab ${filter === f.id ? "ds-tab-active" : ""}`}
                type="button"
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project, idx) => (
            <ScrollReveal key={project.title} delay={idx * 80}>
              <div className="group ds-card ds-card-compact ds-card-interactive flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                    {project.icon}
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <Link
                        className="w-8 h-8 rounded-lg bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline"
                        href={project.github}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <LogoGithub className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    {project.demo && (
                      <Link
                        className="w-8 h-8 rounded-lg bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline"
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
                  <h3
                    className="text-lg font-bold"
                    style={{
                      letterSpacing: "-0.02em",
                      color: "var(--text-primary)",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t(`sections.projects.${project.descKey}`)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-[var(--border-default)]">
                  {project.tags.map((tag) => (
                    <span key={tag} className="ds-badge">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="flex justify-center">
            <Link
              className="ds-btn-primary no-underline"
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
