"use client";
import type { QuizResult } from "@/types/campus";

import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

import CampusLayout from "@/layouts/campus";
import {
  getContentByType,
  getGuides,
  formatDate,
  ContentMeta,
  guideTotalMinutes,
  resolveCurriculumMeta,
  contentHref,
} from "@/lib/blog/registry";
import { getContentComponent } from "@/lib/blog/componentMap";
import { LEVELS } from "@/lib/blog/taxonomy";
import {
  IconClock,
  IconBook,
  IconChevronRight,
  IconChevronLeft,
} from "@/components/blog/shared";
import { IconArrowLeft, IconArrowRight } from "@/components/ui/Icons";
import { siteConfig } from "@/config/site";
import { useT } from "@/hooks/useT";
import { useAuth } from "@/hooks/useAuth";
import { useLocaleStore } from "@/store/localeStore";
import { campusService } from "@/services/campusService";
import { BookmarkButton } from "@/components/campus/BookmarkButton";
import { NotesPanel } from "@/components/campus/NotesPanel";
import { QuizModal } from "@/components/campus/QuizModal";
import { ExerciseEngine } from "@/components/campus/exercises/ExerciseEngine";
import type { CampusExercise } from "@/services/campusService";

// ── Helpers ──────────────────────────────────────────────────────────────────

function levelLabel(
  level: string | undefined,
  t: (k: string, p?: Record<string, string | number>) => string,
): string {
  if (!level) return "";
  const l = LEVELS.find((l) => l.id === level);

  return l ? t(l.labelKey) : level;
}

// ── Chapter accordion (TOC sidebar) ──────────────────────────────────────────

interface ChapterGroup {
  id: string;
  title: string;
  lessons: (ContentMeta & { idx: number; isCompleted: boolean })[];
}

function groupCurriculumByGuide(
  meta: ContentMeta,
  allTutorials: ContentMeta[],
  completedSlugs: Set<string>,
  t: (k: string, p?: Record<string, string | number>) => string,
): ChapterGroup[] {
  // Find all guides that include this tutorial
  const guides = getGuides();
  const ownerGuide = guides.find((g) =>
    g.curriculum.some((s) => s.slug === meta.slug),
  );

  if (!ownerGuide) {
    return [
      {
        id: "standalone",
        title: t("campus.tutorial.label"),
        lessons: [
          {
            ...meta,
            idx: 0,
            isCompleted: completedSlugs.has(meta.slug),
          },
        ],
      },
    ];
  }

  const idx = ownerGuide.curriculum.findIndex((s) => s.slug === meta.slug);

  // Use flat list with chapters split every ~3 lessons (heuristic)
  const lessons = ownerGuide.curriculum
    .map((step, i) => {
      const content = allTutorials.find((t) => t.slug === step.slug);

      return content
        ? {
            ...content,
            idx: i,
            isCompleted: completedSlugs.has(step.slug),
          }
        : null;
    })
    .filter((x): x is NonNullable<typeof x> => x != null);

  // Single chapter with all lessons (no sub-chapters in our data model)
  return [
    {
      id: ownerGuide.id,
      title: ownerGuide.title,
      lessons,
    },
  ];
}

// ── Tutorial TOC item ────────────────────────────────────────────────────────

function TutorialTOCItem({
  tutorial,
  isCurrent,
  isCompleted,
  isNext,
}: {
  tutorial: ContentMeta & { idx: number };
  isCurrent: boolean;
  isCompleted: boolean;
  isNext: boolean;
}) {
  const { t } = useT();
  const className = isCurrent
    ? "bg-[var(--accent-light)] border-l-2 border-[var(--accent)] text-[var(--text-primary)]"
    : isCompleted
      ? "border-l-2 border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
      : "border-l-2 border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]";

  return (
    <Link
      aria-current={isCurrent ? "page" : undefined}
      className={`flex items-center gap-3 px-3 py-2 rounded-r-lg transition-colors no-underline text-xs ${className}`}
      href={contentHref(tutorial.type, tutorial.slug)}
    >
      <span
        aria-hidden="true"
        className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[9px] font-bold"
        style={{
          background: isCurrent
            ? "var(--accent)"
            : isCompleted
              ? "var(--accent-light)"
              : "var(--bg-surface)",
          color: isCurrent
            ? "var(--text-interactive)"
            : isCompleted
              ? "var(--accent)"
              : "var(--text-muted)",
        }}
      >
        {isCompleted ? "✓" : tutorial.idx + 1}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{tutorial.title}</p>
      </div>
      {isNext && (
        <span
          aria-label={t("campus.tutorial.ariaNext")}
          className="text-[10px] font-bold text-[var(--accent)] flex-shrink-0"
        >
          NEXT
        </span>
      )}
    </Link>
  );
}

// ── TOC Sidebar ──────────────────────────────────────────────────────────────

function TutorialTOCSidebar({
  chapters,
  currentSlug,
  onClose,
}: {
  chapters: ChapterGroup[];
  currentSlug: string;
  onClose?: () => void;
}) {
  const { t } = useT();
  return (
    <aside
      aria-label={t("campus.tutorial.content")}
      className="flex flex-col gap-3 w-full"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
          {t("campus.tutorial.content")}
        </h2>
        {onClose && (
          <button
            aria-label={t("campus.tutorial.ariaCloseIndex")}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[var(--bg-hover)] transition-colors text-[var(--text-muted)]"
            type="button"
            onClick={onClose}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>
        )}
      </div>

      {chapters.map((chapter) => (
        <div
          key={chapter.id}
          className="rounded-xl border border-[var(--border-default)] overflow-hidden"
        >
          <div className="px-3 py-2 bg-[var(--bg-surface)] border-b border-[var(--border-default)]">
            <p className="text-[10px] font-bold text-[var(--text-primary)] uppercase tracking-wider truncate">
              {chapter.title}
            </p>
          </div>
          <div className="py-1">
            {chapter.lessons.map((lesson) => (
              <TutorialTOCItem
                key={lesson.slug}
                isCompleted={lesson.isCompleted}
                isCurrent={lesson.slug === currentSlug}
                isNext={
                  chapter.lessons[lesson.idx + 1]?.slug === currentSlug
                }
                tutorial={lesson}
              />
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

interface Props {
  meta: ContentMeta;
  prevMeta: ContentMeta | null;
  nextMeta: ContentMeta | null;
  ownerGuide: ReturnType<typeof getGuides>[number] | null;
}

export default function TutorialPage({
  meta,
  prevMeta,
  nextMeta,
  ownerGuide,
}: Props) {
  const { t } = useT();
  const { isAuthenticated } = useAuth();
  const locale = useLocaleStore((s) => s.locale);
  const Component = meta ? getContentComponent(meta.id, locale) : null;
  const [completed, setCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [xpEarned, setXpEarned] = useState<number | null>(null);
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());
  const [tocOpenMobile, setTocOpenMobile] = useState(false);
  const [exercises, setExercises] = useState<CampusExercise[]>([]);

  const allTutorials = useMemo(() => getContentByType("tutorial"), []);
  const totalTutorials = allTutorials.length;

  // ── Build TOC chapters ──
  const chapters = useMemo(
    () =>
      meta ? groupCurriculumByGuide(meta, allTutorials, completedSlugs, t) : [],
    [meta, allTutorials, completedSlugs, t],
  );

  // Determine current position in guide
  const currentPosition = useMemo(() => {
    if (!ownerGuide || !meta) return null;
    const idx = ownerGuide.curriculum.findIndex((s) => s.slug === meta.slug);

    return { current: idx + 1, total: ownerGuide.curriculum.length };
  }, [ownerGuide, meta?.slug]);

  useEffect(() => {
    if (!isAuthenticated || !meta) return;
    campusService
      .getProgress()
      .then((progress) => {
        const slugs = new Set(progress.map((p) => p.tutorial_slug));

        setCompletedSlugs(slugs);
        setCompleted(slugs.has(meta.slug));
      })
      .catch(() => {});
  }, [isAuthenticated, meta?.slug]);

  // Fetch exercises for this tutorial (public — no auth required for viewing)
  useEffect(() => {
    if (!meta) return;
    campusService
      .getExercises(meta.slug)
      .then(setExercises)
      .catch(() => {});
  }, [meta?.slug]);

  const handleMarkComplete = async () => {
    if (!meta) return;
    try {
      const result = await campusService.markComplete(meta.slug, undefined, 0);

      setCompleted(true);
      setXpEarned(result.xpEarned);
      setCompletedSlugs((prev) => new Set([...prev, meta.slug]));
    } catch {}
  };

  const handleQuizComplete = (result: QuizResult) => {
    setShowQuiz(false);
    if (result.passed) setXpEarned((prev) => (prev ?? 0) + result.xpEarned);
  };

  if (!meta) {
    return (
      <CampusLayout seo={{ title: t("campus.tutorial.label"), description: "", ogType: "article" }}>
        <div className="max-w-7xl mx-auto py-4 text-center text-[var(--text-secondary)]">
          {t("campus.tutorial.notFound")}
        </div>
      </CampusLayout>
    );
  }

  return (
    <CampusLayout
      seo={{
        title: meta.title,
        description: meta.description,
        ogType: "article",
      }}
    >
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              headline: meta.title,
              description: meta.description,
              datePublished: meta.publishedAt,
              author: {
                "@type": "Person",
                name: "Adrián Escribano Pérez",
                url: siteConfig.url,
              },
              publisher: { "@type": "Person", name: "Adrián Escribano Pérez" },
              keywords: meta.tags?.join(", "),
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${siteConfig.url}/campus/tutoriales/${meta.slug}`,
              },
            }),
          }}
          type="application/ld+json"
        />
      </Head>

      <div className="max-w-7xl mx-auto py-4">
        {/* ── Breadcrumb completo: Home > Ruta > Tutorial ── */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-6 flex-wrap"
        >
          <Link
            className="hover:text-[var(--text-primary)] transition-colors no-underline"
            href="/campus"
          >
            Campus
          </Link>
          <span aria-hidden="true">/</span>
          {ownerGuide && (
            <>
              <Link
                className="hover:text-[var(--text-primary)] transition-colors no-underline truncate max-w-[200px]"
                href={`/campus/cursos/${ownerGuide.slug}`}
              >
                {ownerGuide.title}
              </Link>
              <span aria-hidden="true">/</span>
            </>
          )}
          <span
            aria-current="page"
            className="text-[var(--text-secondary)] truncate max-w-[240px] font-medium"
          >
            {meta.title}
          </span>
        </nav>

        <div className="flex gap-8">
          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">
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
                {/* Number badge */}
                {currentPosition && (
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest">
                      {t("campus.tutorial.lesson")} {currentPosition.current} / {currentPosition.total}
                    </span>
                    {ownerGuide && (
                      <Link
                        className="text-white/80 text-xs font-medium hover:text-white transition-colors no-underline"
                        href={`/campus/cursos/${ownerGuide.slug}`}
                      >
                        <IconArrowLeft className="w-3 h-3 inline mr-1" /> {t("campus.tutorial.backToPath")}
                      </Link>
                    )}
                  </div>
                )}

                {/* Title + meta */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    aria-hidden="true"
                    className="w-2.5 h-2.5 rounded-full bg-white/90"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                    {meta.category}
                  </span>
                  {meta.level && (
                    <>
                      <span aria-hidden="true" className="text-white/60">
                        ·
                      </span>
                      <span className="text-xs text-white/80">
                        {levelLabel(meta.level, t)}
                      </span>
                    </>
                  )}
                </div>
                <h1
                  className="text-2xl md:text-3xl font-black text-white leading-tight"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {meta.title}
                </h1>
                <p className="text-sm text-white/80 mt-2 leading-relaxed max-w-2xl">
                  {meta.description}
                </p>
              </div>

              {/* Tags + metadata */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5">
                  <IconClock className="w-3.5 h-3.5" />
                  {meta.readTime}
                  {t("blog.readTimeSuffix")}
                </span>
                <span aria-hidden="true">·</span>
                <span>{formatDate(meta.publishedAt)}</span>
                {meta.tags && meta.tags.length > 0 && (
                  <>
                    <span aria-hidden="true">·</span>
                    <div className="flex flex-wrap gap-1.5">
                      {meta.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-secondary)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </header>

            {/* Prerequisites / Objectives (compact) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Prerequisites if any */}
              {meta.prerequisites && meta.prerequisites.length > 0 && (
                <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)]">
                  <h3 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
                    {t("blog.taxonomy.prerequisites")}
                  </h3>
                  <ul className="space-y-1.5">
                    {meta.prerequisites.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2 text-xs text-[var(--text-secondary)]"
                      >
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 flex-shrink-0"
                        />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Objectives */}
              {meta.objectives && meta.objectives.length > 0 && (
                <div className="p-4 rounded-xl bg-[var(--accent-light)] border border-[var(--border-hover)]">
                  <h3 className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest mb-2">
                    {t("blog.taxonomy.objectives")}
                  </h3>
                  <ul className="space-y-1.5">
                    {meta.objectives.map((o) => (
                      <li
                        key={o}
                        className="flex items-start gap-2 text-xs text-[var(--text-primary)]"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-3 h-3 text-[var(--accent)] mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                          />
                        </svg>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Content */}
            <article className="mb-12">
              {Component ? (
                <Component />
              ) : (
                <div className="py-12 text-center text-[var(--text-secondary)]">
                  {t("blog.contentUnavailable")}
                </div>
              )}
            </article>

            {/* Action bar (mark complete, quiz) */}
            {isAuthenticated && (
              <div className="mb-8 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] flex flex-wrap items-center gap-3">
                <button
                  aria-pressed={completed}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    completed
                      ? "bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--border-hover)] cursor-default"
                      : "bg-[var(--bg-interactive)] text-[var(--text-interactive)] hover:bg-[var(--bg-interactive-hover)]"
                  }`}
                  disabled={completed}
                  type="button"
                  onClick={completed ? undefined : handleMarkComplete}
                >
                  {completed ? (
                    <>
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                        />
                      </svg>
                      {t("campus.progress.alreadyCompleted")}
                    </>
                  ) : (
                    <>
                      <IconChevronRight className="w-4 h-4" />
                      {t("campus.progress.markComplete")}
                    </>
                  )}
                </button>
                {completed && (
                  <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors border border-[var(--border-default)]"
                    type="button"
                    onClick={() => setShowQuiz(true)}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    {t("campus.quiz.start")}
                  </button>
                )}
                <BookmarkButton tutorialSlug={meta.slug} />
                {xpEarned !== null && (
                  <span className="ml-auto text-sm font-black text-[var(--accent)]">
                    +{xpEarned} XP
                  </span>
                )}
              </div>
            )}

            {/* Notes panel (logged-in only) */}
            {isAuthenticated && (
              <div className="mb-8">
                <NotesPanel tutorialSlug={meta.slug} />
              </div>
            )}

            {/* Exercises section */}
            {exercises.length > 0 && (
              <div className="mb-8">
                <ExerciseEngine
                  exercises={exercises}
                  tutorialSlug={meta.slug}
                  guideSlug={ownerGuide?.slug ?? meta.slug}
                  guideTitle={ownerGuide?.title ?? meta.title}
                />
              </div>
            )}

            {/* SIGUIENTE LECCIÓN — prominent card */}
            {nextMeta && (
              <Link
                className="group block no-underline mb-8"
                href={`/campus/tutoriales/${nextMeta.slug}`}
              >
                <div className="relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[var(--border-hover)] hover:shadow-lg transition-all p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest mb-1.5">
                        <IconArrowRight className="w-3 h-3 inline mr-1" /> {t("campus.tutorial.nextLesson")}
                      </p>
                      <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                        {nextMeta.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] line-clamp-1 mt-0.5">
                        {nextMeta.description}
                      </p>
                    </div>
                    <div
                      aria-hidden="true"
                      className="w-10 h-10 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform"
                    >
                      <IconChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Footer nav (back + prev) */}
            <nav
              aria-label={t("blog.navTutorials")}
              className="pt-6 border-t border-[var(--border-default)] flex items-center justify-between gap-4 flex-wrap"
            >
              <Link
                className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline"
                href={ownerGuide ? `/campus/cursos/${ownerGuide.slug}` : "/campus"}
              >
                <IconChevronLeft className="w-4 h-4" />
                {ownerGuide
                  ? `${t("common.back")} "${ownerGuide.title}"`
                  : t("blog.allTutorials")}
              </Link>
              {prevMeta && (
                <Link
                  className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline"
                  href={`/campus/tutoriales/${prevMeta.slug}`}
                >
                  <IconChevronLeft className="w-4 h-4" />
                  <span className="truncate max-w-[240px]">
                    {prevMeta.title}
                  </span>
                </Link>
              )}
            </nav>
          </div>

          {/* ── TOC Sidebar (desktop) ── */}
          {chapters[0]?.lessons.length > 1 && (
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24">
                <TutorialTOCSidebar
                  chapters={chapters}
                  currentSlug={meta.slug}
                />
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* ── Mobile TOC button ── */}
      {chapters[0]?.lessons.length > 1 && (
        <button
          aria-controls="tutorial-toc-mobile"
          aria-expanded={tocOpenMobile}
          aria-label={t("campus.tutorial.ariaOpenIndex")}
          className="lg:hidden fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-[var(--bg-interactive)] text-[var(--text-interactive)] shadow-lg flex items-center justify-center hover:bg-[var(--bg-interactive-hover)] transition-colors"
          type="button"
          onClick={() => setTocOpenMobile(true)}
        >
          <IconBook className="w-5 h-5" />
        </button>
      )}

      {/* ── Mobile TOC sheet ── */}
      {tocOpenMobile && (
        <div
          aria-modal="true"
          className="lg:hidden fixed inset-0 z-50 flex flex-col"
          id="tutorial-toc-mobile"
          role="dialog"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[var(--bg-overlay)] backdrop-blur-sm"
            onClick={() => setTocOpenMobile(false)}
          />
          <div className="relative mt-auto max-h-[80vh] bg-[var(--bg-card)] rounded-t-2xl border-t border-[var(--border-default)] p-4 overflow-y-auto">
            <div className="w-10 h-1 bg-[var(--border-default)] rounded-full mx-auto mb-4" />
            <TutorialTOCSidebar
              chapters={chapters}
              currentSlug={meta.slug}
              onClose={() => setTocOpenMobile(false)}
            />
          </div>
        </div>
      )}

      {/* ── Quiz modal ── */}
      {showQuiz && (
        <QuizModal
          tutorialSlug={meta.slug}
          onClose={() => setShowQuiz(false)}
          onComplete={handleQuizComplete}
        />
      )}
    </CampusLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tutorials = getContentByType("tutorial");

  return {
    paths: tutorials.map((t) => ({ params: { slug: t.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const tutorials = getContentByType("tutorial");
  const meta = tutorials.find((t) => t.slug === slug);

  if (!meta) return { notFound: true };

  // Find owning guide for breadcrumb + position
  const guides = getGuides();
  const ownerGuide =
    guides.find((g) => g.curriculum.some((s) => s.slug === slug)) ?? null;

  // Compute prev/next within the guide's curriculum, not the global list
  let prevMeta: ContentMeta | null = null;
  let nextMeta: ContentMeta | null = null;

  if (ownerGuide) {
    const guideIdx = ownerGuide.curriculum.findIndex((s) => s.slug === slug);
    const prevSlug = guideIdx > 0 ? ownerGuide.curriculum[guideIdx - 1]?.slug : null;
    const nextSlug =
      guideIdx < ownerGuide.curriculum.length - 1
        ? ownerGuide.curriculum[guideIdx + 1]?.slug
        : null;

    if (prevSlug) prevMeta = tutorials.find((t) => t.slug === prevSlug) ?? null;
    if (nextSlug) nextMeta = tutorials.find((t) => t.slug === nextSlug) ?? null;
  } else {
    // Standalone tutorial — fall back to global list
    const idx = tutorials.findIndex((t) => t.slug === slug);
    prevMeta = tutorials[idx - 1] ?? null;
    nextMeta = tutorials[idx + 1] ?? null;
  }

  return {
    props: {
      meta,
      prevMeta,
      nextMeta,
      ownerGuide,
    },
  };
};
