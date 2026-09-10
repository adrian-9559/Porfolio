"use client";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

import CampusLayout from "@/layouts/campus";
import {
  getGuides,
  getGuideBySlug,
  getContentBySlug,
  getContentByType,
  resolveCurriculumMeta,
  guideTotalMinutes,
  contentHref,
  ContentMeta,
} from "@/lib/blog/registry";
import { LEVELS } from "@/lib/blog/taxonomy";
import {
  IconBook,
  IconClock,
  IconChevronRight,
  IconCheck,
} from "@/components/blog/shared";
import { siteConfig } from "@/config/site";
import { useT } from "@/hooks/useT";
import { useAuth } from "@/hooks/useAuth";
import { campusService } from "@/services/campusService";
import { ProgressBar } from "@/components/campus/ProgressBar";

// ── Helpers ──────────────────────────────────────────────────────────────────

function levelLabel(
  level: string | undefined,
  t: (k: string, p?: Record<string, string | number>) => string,
): string {
  if (!level) return "";
  const l = LEVELS.find((l) => l.id === level);

  return l ? t(l.labelKey) : level;
}

// ── Lesson row ───────────────────────────────────────────────────────────────

function LessonRow({
  step,
  idx,
  isCompleted,
  isCurrent,
  t,
}: {
  step: ContentMeta & { optional?: boolean };
  idx: number;
  isCompleted: boolean;
  isCurrent: boolean;
  t: (k: string, p?: Record<string, string | number>) => string;
}) {
  return (
    <Link
      aria-current={isCurrent ? "page" : undefined}
      className={`flex items-center gap-3 px-4 py-3 transition-colors no-underline rounded-lg ${
        isCurrent
          ? "bg-[var(--accent-light)]"
          : "hover:bg-[var(--bg-hover)]"
      }`}
      href={contentHref(step.type, step.slug)}
    >
      {/* Step indicator */}
      <div className="flex-shrink-0">
        {isCompleted ? (
          <div className="w-7 h-7 rounded-lg bg-[var(--accent)] text-[var(--accent-text)] flex items-center justify-center">
            <IconCheck className="w-4 h-4" />
          </div>
        ) : (
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold ${
              isCurrent
                ? "bg-[var(--accent)] text-[var(--accent-text)]"
                : "bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-default)]"
            }`}
          >
            {idx + 1}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span
            aria-hidden="true"
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${step.categoryColor}`}
          />
          <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            {step.category}
          </span>
          {step.level && (
            <>
              <span aria-hidden="true" className="text-[10px] text-[var(--text-muted)]">·</span>
              <span className="text-[10px] text-[var(--text-muted)]">
                {levelLabel(step.level, t)}
              </span>
            </>
          )}
          {step.optional && (
            <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded uppercase">
              Opcional
            </span>
          )}
        </div>
        <p
          className={`text-sm font-semibold truncate ${
            isCompleted
              ? "text-[var(--text-secondary)] line-through decoration-[var(--accent)]"
              : "text-[var(--text-primary)]"
          }`}
        >
          {step.title}
        </p>
      </div>

      {/* Time */}
      <span className="text-[10px] text-[var(--text-muted)] flex-shrink-0 flex items-center gap-1 tabular-nums">
        <IconClock className="w-3 h-3" />
        {step.readTime}
      </span>
    </Link>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

interface Props {
  guide: NonNullable<ReturnType<typeof getGuideBySlug>>;
  curriculum: (ContentMeta & { optional?: boolean })[];
  totalMinutes: number;
}

export default function CursoPage({
  guide,
  curriculum,
  totalMinutes,
}: Props) {
  const { t } = useT();
  const { isAuthenticated } = useAuth();
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isAuthenticated) return;
    campusService
      .getGuideProgress(guide.slug)
      .then((progress) => {
        setCompletedSlugs(new Set(progress.map((p) => p.tutorial_slug)));
      })
      .catch(() => {});
  }, [isAuthenticated, guide.slug]);

  const completedCount = useMemo(
    () => curriculum.filter((step) => completedSlugs.has(step.slug)).length,
    [curriculum, completedSlugs],
  );

  const completedPct =
    curriculum.length > 0
      ? Math.round((completedCount / curriculum.length) * 100)
      : 0;

  const isStarted = completedCount > 0;
  const isCompleted = completedPct === 100;

  // Determine CTA href
  const ctaHref = useMemo(() => {
    if (isStarted) {
      const next = curriculum.find((s) => !completedSlugs.has(s.slug));
      if (next) return contentHref(next.type, next.slug);
    }
    return curriculum[0]
      ? contentHref(curriculum[0].type, curriculum[0].slug)
      : "/campus";
  }, [isStarted, curriculum, completedSlugs]);

  return (
    <CampusLayout
      seo={{
        title: guide.title,
        description: guide.description,
        ogType: "article",
      }}
    >
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              headline: guide.title,
              description: guide.description,
              datePublished: guide.publishedAt,
              author: {
                "@type": "Person",
                name: "Adrián Escribano Pérez",
                url: siteConfig.url,
              },
              publisher: { "@type": "Person", name: "Adrián Escribano Pérez" },
              keywords: guide.tags?.join(", "),
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${siteConfig.url}/campus/cursos/${guide.slug}`,
              },
            }),
          }}
          type="application/ld+json"
        />
      </Head>

      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-6 md:py-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-6"
        >
          <Link
            className="hover:text-[var(--text-primary)] transition-colors no-underline"
            href="/campus"
          >
            Campus
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            className="hover:text-[var(--text-primary)] transition-colors no-underline"
            href="/campus/cursos"
          >
            Cursos
          </Link>
          <span aria-hidden="true">/</span>
          <span
            aria-current="page"
            className="text-[var(--text-secondary)] truncate max-w-[280px] font-medium"
          >
            {guide.title}
          </span>
        </nav>

        {/* Cover header */}
        <header className="mb-8">
          <div
            aria-hidden="true"
            className="relative overflow-hidden rounded-2xl mb-6 p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, var(--color-brand-from), var(--color-brand-via), var(--color-brand-to))",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                {guide.category}
              </span>
              {guide.level && (
                <>
                  <span aria-hidden="true" className="text-white/60">·</span>
                  <span className="text-xs text-white/80">
                    {levelLabel(guide.level, t)}
                  </span>
                </>
              )}
            </div>
            <h1
              className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-3"
              style={{ letterSpacing: "-0.04em" }}
            >
              {guide.title}
            </h1>
            <p className="text-sm md:text-base text-white/85 leading-relaxed max-w-2xl">
              {guide.description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mt-5 text-xs text-white/85">
              <span className="flex items-center gap-1.5">
                <IconBook className="w-3.5 h-3.5" />
                {curriculum.length} tutoriales
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <IconClock className="w-3.5 h-3.5" />
                {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
              </span>
              {isAuthenticated && completedCount > 0 && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-bold text-white">
                    {completedCount} completados
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Progress + CTA */}
          {isAuthenticated && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)]">
              <div className="flex-1 min-w-0 w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[var(--text-muted)]">
                    Progreso
                  </span>
                  <span className="text-sm font-bold text-[var(--accent)] tabular-nums">
                    {completedPct}%
                  </span>
                </div>
                <ProgressBar completed={completedCount} size="md" total={curriculum.length} />
                <p className="text-[10px] text-[var(--text-muted)] mt-1">
                  {completedCount}/{curriculum.length} lecciones completadas
                </p>
              </div>
              <Link
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex-shrink-0 ${
                  isCompleted
                    ? "bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:bg-[var(--bg-hover)]"
                    : "bg-[var(--bg-interactive)] text-[var(--text-interactive)] hover:bg-[var(--bg-interactive-hover)]"
                }`}
                href={ctaHref}
              >
                {isCompleted
                  ? "Revisar curso"
                  : isStarted
                    ? "Continuar"
                    : "Empezar"}
                <IconChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* CTA for non-authenticated */}
          {!isAuthenticated && curriculum.length > 0 && (
            <Link
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--bg-interactive)] text-[var(--text-interactive)] text-sm font-bold hover:bg-[var(--bg-interactive-hover)] transition-all"
              href={contentHref(curriculum[0].type, curriculum[0].slug)}
            >
              Empezar curso
              <IconChevronRight className="w-4 h-4" />
            </Link>
          )}
        </header>

        {/* Lessons list */}
        <section aria-labelledby="curriculum-heading" className="space-y-4">
          <h2
            className="text-lg font-bold text-[var(--text-primary)]"
            id="curriculum-heading"
            style={{ letterSpacing: "-0.02em" }}
          >
            Contenido del curso
          </h2>
          <div className="space-y-1">
            {curriculum.map((step, idx) => (
              <LessonRow
                key={step.slug}
                idx={idx}
                isCompleted={completedSlugs.has(step.slug)}
                isCurrent={false}
                step={step}
                t={t}
              />
            ))}
          </div>
        </section>

        {/* Tags */}
        {guide.tags && guide.tags.length > 0 && (
          <section className="mt-8 pt-6 border-t border-[var(--border-default)]">
            <h3 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-3">
              Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {guide.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-default)] text-xs font-semibold text-[var(--text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </CampusLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const guides = getGuides();
  const tutorials = getContentByType("tutorial");

  const paths = [
    ...guides.map((g) => ({ params: { slug: g.slug } })),
    ...tutorials.map((t) => ({ params: { slug: t.slug } })),
  ];

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  // Try guide first
  const guide = getGuideBySlug(slug);
  if (guide) {
    return {
      props: {
        guide,
        curriculum: resolveCurriculumMeta(guide),
        totalMinutes: guideTotalMinutes(guide),
      },
    };
  }

  // Fallback to any content (tutorial, article)
  const content = getContentBySlug(slug);
  if (!content) return { notFound: true };

  // Wrap single content as a mini-guide
  return {
    props: {
      guide: {
        slug: content.slug,
        title: content.title,
        description: content.description,
        type: content.type,
        level: content.level,
        category: content.category,
        categoryColor: content.categoryColor,
        tags: content.tags ?? [],
        publishedAt: content.publishedAt,
        estimatedMinutes: content.estimatedMinutes,
        steps: [content],
      },
      curriculum: [content],
      totalMinutes: content.estimatedMinutes ?? 5,
    },
  };
};
