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
}

interface Tutorial {
  title: string;
  description: string;
  slug: string;
  category: string;
  readTime: string;
  tags: string[];
}

const FEATURED_GUIDES: Guide[] = [
  {
    title: "Desarrollo Web Full Stack",
    description:
      "Ruta completa para dominar el desarrollo web moderno con React, Next.js, Node.js y bases de datos.",
    slug: "ruta-frontend",
    category: "Frontend",
    level: "Nivel 1-4",
    tutorials: 13,
  },
  {
    title: "Backend y APIs",
    description:
      "Aprende a crear APIs robustas con Node.js, Express, autenticación JWT y bases de datos.",
    slug: "ruta-backend-js",
    category: "Backend",
    level: "Nivel 2-4",
    tutorials: 8,
  },
];

const FEATURED_TUTORIALS: Tutorial[] = [
  {
    title: "React Hooks: Guía completa",
    description:
      "Domina useState, useEffect, useContext y custom hooks con ejemplos prácticos y patrones avanzados.",
    slug: "react-framework",
    category: "Frontend",
    readTime: "15 min",
    tags: ["React", "Hooks", "JavaScript"],
  },
  {
    title: "TypeScript desde cero",
    description:
      "Aprende TypeScript desde los fundamentos hasta tipos avanzados, interfaces y genéricos.",
    slug: "typescript",
    category: "Lenguajes",
    readTime: "20 min",
    tags: ["TypeScript", "JavaScript"],
  },
];

export default function CampusHighlights() {
  const { t } = useT();

  return (
    <section className="relative w-full">
      <div className="space-y-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center space-y-3">
            <span className="ds-badge">{t("sections.campus.badge")}</span>
            <h2
              className="text-3xl md:text-4xl font-black"
              style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
            >
              {t("sections.campus.title")}
            </h2>
            <p
              className="max-w-xl mx-auto text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("sections.campus.desc")}
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Guides */}
        <div className="space-y-4">
          <ScrollReveal>
            <h3 className="ds-section-label">
              {t("sections.campus.featuredGuides")}
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURED_GUIDES.map((guide, idx) => (
              <ScrollReveal key={guide.slug} delay={idx * 100}>
                <Link
                  className="group block h-full no-underline"
                  href={`/campus/guias/${guide.slug}`}
                >
                  <div className="h-full ds-card ds-card-compact ds-card-interactive flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="ds-badge">{guide.category}</span>
                      <span
                        className="text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {guide.level}
                      </span>
                    </div>

                    <h3
                      className="text-lg font-bold mb-2 group-hover:text-[var(--accent)] transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {guide.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed flex-1"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {guide.description}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border-default)]">
                      <span
                        className="text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {guide.tutorials} tutoriales
                      </span>
                      <span className="text-xs font-semibold text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                        {t("sections.campus.startPath")} →
                      </span>
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
            <h3 className="ds-section-label">
              {t("sections.campus.featuredTutorials")}
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURED_TUTORIALS.map((tutorial, idx) => (
              <ScrollReveal key={tutorial.slug} delay={idx * 100}>
                <Link
                  className="group block h-full no-underline"
                  href={`/campus/tutoriales/${tutorial.slug}`}
                >
                  <div className="h-full ds-card ds-card-compact ds-card-interactive flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="ds-badge">{tutorial.category}</span>
                      <span
                        className="text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {tutorial.readTime}
                      </span>
                    </div>

                    <h3
                      className="text-lg font-bold mb-2 group-hover:text-[var(--accent)] transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {tutorial.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed flex-1"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {tutorial.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-[var(--border-default)]">
                      {tutorial.tags.map((tag) => (
                        <span key={tag} className="ds-badge">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-end mt-3">
                      <span className="text-xs font-semibold text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
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
            <Link className="ds-btn-secondary no-underline" href="/campus">
              {t("sections.campus.viewAll")} →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
