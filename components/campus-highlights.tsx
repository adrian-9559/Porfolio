"use client";
import Link from "next/link";

import { useT } from "@/hooks/useT";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ThumbCard from "@/components/campus/ThumbCard";
import {
  getContentByType,
  getGuides,
  guideTotalMinutes,
} from "@/lib/blog/registry";

const featuredGuides = getGuides()
  .filter((g) => g.featured)
  .slice(0, 3);

const featuredTutorials = getContentByType("tutorial")
  .slice()
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .slice(0, 3);

export default function CampusHighlights() {
  const { t } = useT();

  return (
    <section className="relative w-full">
      <div className="space-y-10">
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

        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGuides.map((guide, idx) => (
              <ThumbCard
                key={guide.id}
                href={`/campus/cursos/${guide.slug}`}
                meta={`${guide.curriculum.length} tutoriales · ~${guideTotalMinutes(guide)} min`}
                seed={idx}
                title={guide.title}
              />
            ))}
            {featuredTutorials.map((tutorial, idx) => (
              <ThumbCard
                key={tutorial.id}
                href={`/campus/tutoriales/${tutorial.slug}`}
                meta={`${tutorial.category} · ${tutorial.readTime}`}
                seed={idx + featuredGuides.length}
                title={tutorial.title}
              />
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex justify-center">
            <Link
              className="text-sm font-semibold text-[var(--accent)] hover:underline no-underline"
              href="/campus"
            >
              {t("sections.campus.viewAll")} →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
