"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

import CampusLayout from "@/layouts/campus";
import { useT } from "@/hooks/useT";
import { useAuth } from "@/hooks/useAuth";
import { campusService } from "@/services/campusService";
import {
  getContentByType,
  getGuides,
  guideTotalMinutes,
  contentHref,
  type ContentMeta,
} from "@/lib/blog/registry";
import { challenges } from "@/data/challenges";

// ── Continue learning card ────────────────────────────────────────────────────

function ContinueLearning({
  lastTutorial,
  guideTitle,
  progressPct,
}: {
  lastTutorial: ContentMeta;
  guideTitle: string;
  progressPct: number;
}) {
  return (
    <Link
      className="group block no-underline"
      href={contentHref(lastTutorial.type, lastTutorial.slug)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[var(--border-hover)] hover:shadow-lg transition-all duration-200 p-6 md:p-8">
        {/* Gradient accent bar */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-brand-from)] via-[var(--color-brand-via)] to-[var(--color-brand-to)]"
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest mb-2">
              Continuar aprendiendo
            </p>
            <h2 className="text-lg md:text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-tight mb-1">
              {lastTutorial.title}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {guideTitle}
            </p>

            {/* Progress bar */}
            <div className="mt-4 flex items-center gap-3">
              <div
                aria-label={`Progreso: ${progressPct}%`}
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={progressPct}
                className="flex-1 h-1.5 rounded-full bg-[var(--bg-surface)] overflow-hidden"
                role="progressbar"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--color-brand-from)] to-[var(--color-brand-via)] transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="text-xs font-bold text-[var(--accent)] tabular-nums">
                {progressPct}%
              </span>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="w-10 h-10 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M13 7l5 5m0 0l-5 5m5-5H6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Course card ───────────────────────────────────────────────────────────────

function CourseCard({
  title,
  description,
  meta,
  href,
  seed,
}: {
  title: string;
  description: string;
  meta: string;
  href: string;
  seed: number;
}) {
  const GRADIENTS: [string, string][] = [
    ["#7c3aed", "#06b6d4"],
    ["#06b6d4", "#8b5cf6"],
    ["#ec4899", "#7c3aed"],
    ["#8b5cf6", "#06b6d4"],
    ["#00f5ff", "#7c3aed"],
    ["#ec4899", "#06b6d4"],
  ];
  const [from, to] = GRADIENTS[Math.abs(seed) % GRADIENTS.length];

  return (
    <Link className="group block no-underline" href={href}>
      <div className="flex flex-col h-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] hover:shadow-md transition-all duration-200 overflow-hidden">
        {/* Thumbnail */}
        <div
          className="aspect-video flex items-center justify-center px-4"
          style={{
            background: `linear-gradient(135deg, ${from}20 0%, var(--bg-card) 55%, ${to}20 100%)`,
          }}
        >
          <span className="text-center text-base md:text-lg font-black text-[var(--text-primary)] leading-tight line-clamp-2" style={{ letterSpacing: "-0.02em" }}>
            {title}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4">
          <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug mb-1">
            {title}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3 flex-1">
            {description}
          </p>
          <p className="text-[10px] text-[var(--text-muted)] font-medium">
            {meta}
          </p>
        </div>
      </div>
    </Link>
  );
}

// ── Challenge card (compact) ──────────────────────────────────────────────────

function ChallengeCard({
  challenge,
}: {
  challenge: (typeof challenges)[number];
}) {
  const statusIcon = {
    locked: "🔒",
    available: "▶",
    in_progress: "⏳",
    completed: "✓",
  };

  const statusBorder = {
    locked: "border-[var(--border-default)] opacity-50",
    available: "border-[var(--border-default)] hover:border-[var(--accent)]",
    in_progress: "border-amber-500/30",
    completed: "border-[var(--accent)]/30 bg-[var(--accent-light)]",
  };

  const card = (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${statusBorder[challenge.status]}`}
    >
      <span className="text-sm flex-shrink-0" aria-hidden="true">
        {statusIcon[challenge.status]}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
          {challenge.title}
        </p>
        <p className="text-[10px] text-[var(--text-muted)]">
          {challenge.estimatedMinutes} min · +{challenge.xpReward} XP
        </p>
      </div>
      {challenge.status !== "locked" && (
        <span className="text-[var(--accent)] text-xs flex-shrink-0">→</span>
      )}
    </div>
  );

  if (challenge.status === "locked") return card;

  return (
    <Link
      className="group block no-underline"
      href={`/campus/retos/${challenge.planSlug}/${challenge.slug}`}
    >
      {card}
    </Link>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function CampusPage() {
  const { t } = useT();
  const { isAuthenticated } = useAuth();
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());
  const [hasLoaded, setHasLoaded] = useState(false);

  const allGuides = useMemo(() => getGuides(), []);
  const allTutorials = useMemo(() => getContentByType("tutorial"), []);

  useEffect(() => {
    if (!isAuthenticated) {
      setHasLoaded(true);
      return;
    }
    campusService
      .getAllGuideProgress()
      .then((progress) => {
        const slugs = new Set(Object.keys(progress));
        setCompletedSlugs(slugs);
        setHasLoaded(true);
      })
      .catch(() => setHasLoaded(true));
  }, [isAuthenticated]);

  // Find the last in-progress tutorial
  const continueData = useMemo(() => {
    if (!isAuthenticated || completedSlugs.size === 0) return null;

    // Find the first guide with progress
    for (const guide of allGuides) {
      const guideProgress = guide.curriculum.filter((s) =>
        completedSlugs.has(s.slug),
      );
      if (guideProgress.length === 0) continue;

      // Find first uncompleted tutorial in this guide
      const nextTutorial = guide.curriculum.find(
        (s) => !completedSlugs.has(s.slug),
      );
      const lastCompleted = guideProgress[guideProgress.length - 1];
      const target = nextTutorial ?? lastCompleted;
      const meta = allTutorials.find((t) => t.slug === target.slug);
      if (!meta) continue;

      const progressPct = Math.round(
        (guideProgress.length / guide.curriculum.length) * 100,
      );

      return {
        lastTutorial: meta,
        guideTitle: guide.title,
        progressPct,
      };
    }

    return null;
  }, [isAuthenticated, completedSlugs, allGuides, allTutorials]);

  // Featured courses (first 6 guides)
  const featuredCourses = useMemo(() => {
    return allGuides.slice(0, 6).map((guide, idx) => ({
      title: guide.title,
      description: guide.description,
      meta: `${guide.curriculum.length} tutoriales · ~${guideTotalMinutes(guide)} min`,
      href: `/campus/cursos/${guide.slug}`,
      seed: idx,
    }));
  }, [allGuides]);

  // Available challenges (not locked, first 6)
  const availableChallenges = useMemo(() => {
    return challenges
      .filter((c) => c.status !== "locked")
      .slice(0, 6);
  }, []);

  return (
    <CampusLayout
      seo={{
        title: t("meta.campus.title"),
        description: t("meta.campus.desc"),
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8 md:py-12 space-y-12 md:space-y-16">
        {/* Hero */}
        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-light)] text-[var(--accent)] text-[10px] font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            Campus abierto — Empieza gratis
          </span>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-primary)] leading-tight"
            style={{ letterSpacing: "-0.04em" }}
          >
            Aprende{" "}
            <span className="bg-gradient-to-r from-[var(--color-brand-from)] via-[var(--color-brand-via)] to-[var(--color-brand-to)] bg-clip-text text-transparent">
              Programación
            </span>{" "}
            sin saltar entre mil recursos
          </h1>
          <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
            Guías estructuradas, retos prácticos y progreso. Todo en español,
            directo y sin relleno.
          </p>
        </header>

        {/* Continue learning (authenticated only) */}
        {isAuthenticated && hasLoaded && continueData && (
          <section aria-label="Continuar aprendiendo">
            <ContinueLearning
              guideTitle={continueData.guideTitle}
              lastTutorial={continueData.lastTutorial}
              progressPct={continueData.progressPct}
            />
          </section>
        )}

        {/* Stats */}
        <section aria-label="Estadísticas del campus">
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-center">
              <p className="text-xl md:text-2xl font-black text-[var(--accent)]">
                {allGuides.length}
              </p>
              <p className="text-[10px] md:text-xs text-[var(--text-muted)] font-semibold mt-1">
                Rutas de aprendizaje
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-center">
              <p className="text-xl md:text-2xl font-black text-[var(--accent)]">
                {allTutorials.length}
              </p>
              <p className="text-[10px] md:text-xs text-[var(--text-muted)] font-semibold mt-1">
                Tutoriales
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-center">
              <p className="text-xl md:text-2xl font-black text-[var(--accent)]">
                {challenges.length}
              </p>
              <p className="text-[10px] md:text-xs text-[var(--text-muted)] font-semibold mt-1">
                Retos prácticos
              </p>
            </div>
          </div>
        </section>

        {/* Courses grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2
              className="text-xl md:text-2xl font-black text-[var(--text-primary)]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Cursos para subir de nivel
            </h2>
            <Link
              className="text-xs font-semibold text-[var(--accent)] hover:underline no-underline"
              href="/campus/cursos"
            >
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.href} {...course} />
            ))}
          </div>
        </section>

        {/* Challenges */}
        {availableChallenges.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2
                className="text-xl md:text-2xl font-black text-[var(--text-primary)]"
                style={{ letterSpacing: "-0.03em" }}
              >
                Retos prácticos
              </h2>
              <Link
                className="text-xs font-semibold text-[var(--accent)] hover:underline no-underline"
                href="/campus/retos"
              >
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
              {availableChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </section>
        )}
      </div>
    </CampusLayout>
  );
}
