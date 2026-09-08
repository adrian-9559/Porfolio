"use client";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

import CampusLayout from "@/layouts/campus";
import {
  getGuides,
  getGuideBySlug,
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
  IconChevronLeft,
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

// ── Outcome card (lo que aprenderás) ────────────────────────────────────────

function OutcomeCard({
  idx,
  title,
}: {
  idx: number;
  title: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[var(--border-hover)] transition-colors">
      <span
        aria-hidden="true"
        className="text-xl font-black text-[var(--accent)] flex-shrink-0 tabular-nums"
        style={{ letterSpacing: "-0.04em" }}
      >
        {String(idx + 1).padStart(2, "0")}
      </span>
      <p className="text-xs text-[var(--text-primary)] font-medium leading-relaxed pt-0.5">
        {title}
      </p>
    </div>
  );
}

// ── Chapter accordion ───────────────────────────────────────────────────────

function ChapterAccordion({
  title,
  lessons,
  currentSlug,
  completedSlugs,
  defaultOpen = true,
  t,
}: {
  title: string;
  lessons: (ContentMeta & { optional?: boolean })[];
  currentSlug?: string;
  completedSlugs: Set<string>;
  defaultOpen?: boolean;
  t: (k: string, p?: Record<string, string | number>) => string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const regionId = `chapter-${title.replace(/\s+/g, "-").toLowerCase()}`;
  const completedCount = lessons.filter((l) =>
    completedSlugs.has(l.slug),
  ).length;

  return (
    <div className="rounded-xl border border-[var(--border-default)] overflow-hidden">
      <button
        aria-controls={regionId}
        aria-expanded={open}
        className="flex items-center gap-3 w-full px-4 py-3 bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] transition-colors"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <IconChevronRight
          aria-hidden="true"
          className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform flex-shrink-0 ${open ? "rotate-90" : ""}`}
        />
        <span className="text-sm font-bold text-[var(--text-primary)] flex-1 text-left">
          {title}
        </span>
        <span className="text-[10px] font-bold text-[var(--text-muted)] tabular-nums">
          {completedCount}/{lessons.length}
        </span>
      </button>

      <div
        aria-label={title}
        className="overflow-hidden transition-all duration-300"
        id={regionId}
        role="region"
        style={{
          maxHeight: open ? `${lessons.length * 76 + 16}px` : "0px",
        }}
      >
        <div className="divide-y divide-[var(--border-default)]">
          {lessons.map((step, idx) => {
            const isCompleted = completedSlugs.has(step.slug);
            const isCurrent = step.slug === currentSlug;

            return (
              <Link
                key={step.slug}
                aria-current={isCurrent ? "page" : undefined}
                className={`flex items-center gap-3 px-4 py-3 transition-colors no-underline ${
                  isCurrent
                    ? "bg-[var(--accent-light)]"
                    : "hover:bg-[var(--bg-hover)]"
                }`}
                href={contentHref(step.type, step.slug)}
              >
                {/* Step indicator */}
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <div className="w-7 h-7 rounded-lg bg-[var(--accent)] text-[var(--text-interactive)] flex items-center justify-center">
                      <IconCheck className="w-4 h-4" />
                    </div>
                  ) : (
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                        isCurrent
                          ? "bg-[var(--accent)] text-[var(--text-interactive)]"
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
                        <span
                          aria-hidden="true"
                          className="text-[10px] text-[var(--text-muted)]"
                        >
                          ·
                        </span>
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
          })}
        </div>
      </div>
    </div>
  );
}

// ── Sticky sidebar ───────────────────────────────────────────────────────────

function CourseSidebar({
  guide,
  totalMinutes,
  curriculum,
  curriculumLength,
  completedCount,
  isAuthenticated,
  completedSlugs,
}: {
  guide: NonNullable<ReturnType<typeof getGuideBySlug>>;
  totalMinutes: number;
  curriculum: (ContentMeta & { optional?: boolean })[];
  curriculumLength: number;
  completedCount: number;
  isAuthenticated: boolean;
  completedSlugs: Set<string>;
}) {
  const { t } = useT();
  const completedPct =
    curriculumLength > 0
      ? Math.round((completedCount / curriculumLength) * 100)
      : 0;
  const isCompleted = completedPct === 100;
  const isStarted = completedCount > 0;

  // Determine start href — first uncompleted lesson, or first lesson if not started
  const startHref = isStarted
    ? (curriculum.find((s) => !completedSlugs.has(s.slug)) ?? curriculum[0])
    : curriculum[0];

  const finalHref = startHref
    ? contentHref(startHref.type, startHref.slug)
    : "/campus";

  return (
    <aside
      aria-label={t("campus.courseInfo")}
      className="space-y-4"
    >
      {/* El curso incluye */}
      <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] overflow-hidden">
        <div className="px-5 py-3 border-b border-[var(--border-default)]">
          <h2 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
            El curso incluye
          </h2>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--text-secondary)]">Duración</span>
            <span className="text-sm font-bold text-[var(--text-primary)] tabular-nums">
              {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--text-secondary)]">
              Tutoriales
            </span>
            <span className="text-sm font-bold text-[var(--text-primary)] tabular-nums">
              {curriculumLength}
            </span>
          </div>
          {guide.level && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-secondary)]">Nivel</span>
              <span className="text-sm font-bold text-[var(--text-primary)]">
                {levelLabel(guide.level, t)}
              </span>
            </div>
          )}
          {isAuthenticated && (
            <>
              <div className="pt-2 border-t border-[var(--border-default)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[var(--text-secondary)]">
                    Progreso
                  </span>
                  <span className="text-sm font-bold text-[var(--accent)] tabular-nums">
                    {completedPct}%
                  </span>
                </div>
                <ProgressBar
                  completed={completedCount}
                  size="md"
                  total={curriculumLength}
                />
              </div>
            </>
          )}

          {/* CTA principal */}
          <Link
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all mt-3 ${
              isCompleted
                ? "bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:bg-[var(--bg-hover)]"
                : "bg-[var(--bg-interactive)] text-[var(--text-interactive)] hover:bg-[var(--bg-interactive-hover)] shadow-lg shadow-[var(--accent)]/20"
            }`}
            href={finalHref}
          >
            {isCompleted
              ? "Revisar curso"
              : isStarted
                ? "Continuar ruta"
                : "Empezar ruta"}
            <IconChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stack (technologies) */}
      {guide.tags && guide.tags.length > 0 && (
        <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--border-default)]">
            <h2 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
              Stack
            </h2>
          </div>
          <div className="p-5 flex flex-wrap gap-1.5">
            {guide.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-default)] text-xs font-semibold text-[var(--text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Docente */}
      <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] overflow-hidden">
        <div className="px-5 py-3 border-b border-[var(--border-default)]">
          <h2 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
            Docente
          </h2>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div
              aria-hidden="true"
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-brand-from)] via-[var(--color-brand-via)] to-[var(--color-brand-to)] flex items-center justify-center text-white text-base font-black flex-shrink-0"
            >
              AE
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[var(--text-primary)] truncate">
                Adrián Escribano
              </p>
              <p className="text-[10px] text-[var(--text-muted)] truncate">
                Full Stack Developer
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Ingeniero de Software especializado en React, Next.js y Node.js.
            Creador de este campus.
          </p>
        </div>
      </div>
    </aside>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

interface Props {
  guide: NonNullable<ReturnType<typeof getGuideBySlug>>;
  curriculum: (ContentMeta & { optional?: boolean })[];
  totalMinutes: number;
  prevGuide: { slug: string; title: string } | null;
  nextGuide: { slug: string; title: string } | null;
}

export default function GuidePage({
  guide,
  curriculum,
  totalMinutes,
  prevGuide,
  nextGuide,
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

  // Slice curriculum into chapters of ~3 lessons (heuristic for our data)
  const chapters = useMemo(() => {
    const CHUNK_SIZE = 3;
    const chunks: { title: string; lessons: typeof curriculum }[] = [];

    for (let i = 0; i < curriculum.length; i += CHUNK_SIZE) {
      chunks.push({
        title: `Capítulo ${Math.floor(i / CHUNK_SIZE) + 1}`,
        lessons: curriculum.slice(i, i + CHUNK_SIZE),
      });
    }

    return chunks;
  }, [curriculum]);

  // Sample outcomes for "Lo que aprenderás" (first N unique categories)
  const outcomes = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(curriculum.map((c) => c.category)),
    ).slice(0, 8);

    return uniqueCategories.map((cat, idx) => ({
      idx,
      title: `Dominar ${cat}`,
    }));
  }, [curriculum]);

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
                "@id": `${siteConfig.url}/campus/guias/${guide.slug}`,
              },
            }),
          }}
          type="application/ld+json"
        />
      </Head>

      <div className="max-w-7xl mx-auto py-4">
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
            href="/campus/guias"
          >
            {t("nav.campusGuides")}
          </Link>
          <span aria-hidden="true">/</span>
          <span
            aria-current="page"
            className="text-[var(--text-secondary)] truncate max-w-[280px] font-medium"
          >
            {guide.title}
          </span>
        </nav>

        <div className="flex gap-8">
          {/* Main */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* Cover header */}
            <header>
              <div
                aria-hidden="true"
                className="relative overflow-hidden rounded-2xl mb-6 p-6 md:p-8"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-brand-from), var(--color-brand-via), var(--color-brand-to))",
                }}
              >
                {/* Teacher overlay */}
                <div className="flex items-end justify-between gap-4 mb-6">
                  <span
                    aria-hidden="true"
                    className={`w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm ${guide.categoryColor} flex items-center justify-center`}
                  >
                    <IconBook className="w-6 h-6 text-white" />
                  </span>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                    Ruta de aprendizaje
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                    {guide.category}
                  </span>
                  {guide.level && (
                    <>
                      <span aria-hidden="true" className="text-white/60">
                        ·
                      </span>
                      <span className="text-xs text-white/80">
                        {levelLabel(guide.level, t)}
                      </span>
                    </>
                  )}
                </div>
                <h1
                  className="text-3xl md:text-4xl font-black text-white leading-tight mb-3"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  {guide.title}
                </h1>
                <p className="text-sm md:text-base text-white/85 leading-relaxed max-w-2xl">
                  {guide.description}
                </p>

                {/* Mini stats on cover */}
                <div className="flex flex-wrap items-center gap-4 mt-5 text-xs text-white/85">
                  <span className="flex items-center gap-1.5">
                    <IconBook className="w-3.5 h-3.5" />
                    {curriculum.length} tutoriales
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1.5">
                    <IconClock className="w-3.5 h-3.5" />
                    {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m total
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
            </header>

            {/* Lo que aprenderás */}
            {outcomes.length > 0 && (
              <section aria-labelledby="outcomes-heading" className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <h2
                    className="text-xl font-bold text-[var(--text-primary)]"
                    id="outcomes-heading"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    Lo que aprenderás
                  </h2>
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                    {outcomes.length} objetivos
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {outcomes.map((o) => (
                    <OutcomeCard key={o.idx} idx={o.idx} title={o.title} />
                  ))}
                </div>
              </section>
            )}

            {/* Contenido del curso — chapters accordion */}
            <section aria-labelledby="curriculum-heading" className="space-y-4">
              <div className="flex items-baseline justify-between">
                <h2
                  className="text-xl font-bold text-[var(--text-primary)]"
                  id="curriculum-heading"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Contenido del curso
                </h2>
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                  {chapters.length} capítulos · {curriculum.length} clases
                </span>
              </div>
              <div className="space-y-2">
                {chapters.map((chapter, idx) => (
                  <ChapterAccordion
                    key={`${chapter.title}-${idx}`}
                    completedSlugs={completedSlugs}
                    defaultOpen={idx === 0}
                    lessons={chapter.lessons}
                    t={t}
                    title={chapter.title}
                  />
                ))}
              </div>
            </section>

            {/* Footer nav */}
            <nav
              aria-label={t("blog.guideTutorials")}
              className="pt-6 border-t border-[var(--border-default)] flex items-center justify-between gap-4 flex-wrap"
            >
              {prevGuide ? (
                <Link
                  className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline"
                  href={`/campus/guias/${prevGuide.slug}`}
                >
                  <IconChevronLeft className="w-4 h-4" />
                  <span className="truncate max-w-[200px]">{prevGuide.title}</span>
                </Link>
              ) : (
                <Link
                  className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline"
                  href="/campus/guias"
                >
                  <IconChevronLeft className="w-4 h-4" />
                  {t("blog.allGuides")}
                </Link>
              )}
              {nextGuide && (
                <Link
                  className="flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors no-underline"
                  href={`/campus/guias/${nextGuide.slug}`}
                >
                  <span className="truncate max-w-[200px]">{nextGuide.title}</span>
                  <IconChevronRight className="w-4 h-4" />
                </Link>
              )}
            </nav>
          </div>

          {/* Sidebar (desktop only) */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-24">
              <CourseSidebar
                completedCount={completedCount}
                completedSlugs={completedSlugs}
                curriculum={curriculum}
                curriculumLength={curriculum.length}
                guide={guide}
                isAuthenticated={isAuthenticated}
                totalMinutes={totalMinutes}
              />
            </div>
          </aside>
        </div>

        {/* Mobile CTA (bottom sticky) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-[var(--bg-card)] border-t border-[var(--border-default)] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                {curriculum.length} clases · {Math.floor(totalMinutes / 60)}h{" "}
                {totalMinutes % 60}m
              </p>
              {isAuthenticated && completedCount > 0 && (
                <p className="text-xs font-bold text-[var(--text-primary)] truncate">
                  {completedCount}/{curriculum.length} completadas
                </p>
              )}
            </div>
            <Link
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg-interactive)] text-[var(--text-interactive)] text-sm font-bold hover:bg-[var(--bg-interactive-hover)] transition-colors"
              href={
                completedCount > 0 && curriculum[completedCount]
                  ? contentHref(
                      curriculum[completedCount].type,
                      curriculum[completedCount].slug,
                    )
                  : curriculum[0]
                    ? contentHref(
                        curriculum[0].type,
                        curriculum[0].slug,
                      )
                    : "/campus"
              }
            >
              {completedCount > 0 ? "Continuar" : "Empezar"}
              <IconChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        {/* Spacer for mobile sticky */}
        <div className="lg:hidden h-20" />
      </div>
    </CampusLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const guides = getGuides();

  return {
    paths: guides.map((g) => ({ params: { slug: g.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const guide = getGuideBySlug(slug);

  if (!guide) return { notFound: true };

  const guides = getGuides();
  const guideIdx = guides.findIndex((g) => g.slug === slug);
  const prevGuide =
    guideIdx > 0
      ? { slug: guides[guideIdx - 1].slug, title: guides[guideIdx - 1].title }
      : null;
  const nextGuide =
    guideIdx < guides.length - 1
      ? { slug: guides[guideIdx + 1].slug, title: guides[guideIdx + 1].title }
      : null;

  return {
    props: {
      guide,
      curriculum: resolveCurriculumMeta(guide),
      totalMinutes: guideTotalMinutes(guide),
      prevGuide,
      nextGuide,
    },
  };
};
