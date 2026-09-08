"use client";

import { GetStaticPaths, GetStaticProps } from "next";
import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import CampusLayout from "@/layouts/campus";
import { useT } from "@/hooks/useT";
import { getStudyPlan, studyPlans } from "@/data/studyPlans";
import { getChallengesByPlan } from "@/data/challenges";
import type { DifficultyLevel } from "@/types/challenges";

// ── Difficulty badge ─────────────────────────────────────────────────────────

function DifficultyBadge({ level }: { level: DifficultyLevel }) {
  const config = {
    beginner: {
      label: "Fácil",
      bg: "var(--state-success-bg)",
      fg: "var(--state-success-fg)",
      border: "var(--state-success-border)",
    },
    intermediate: {
      label: "Medio",
      bg: "var(--state-warning-bg)",
      fg: "var(--state-warning-fg)",
      border: "var(--state-warning-border)",
    },
    advanced: {
      label: "Difícil",
      bg: "var(--state-danger-bg)",
      fg: "var(--state-danger-fg)",
      border: "var(--state-danger-border)",
    },
  };
  const c = config[level];

  return (
    <span
      className="px-2 py-0.5 rounded-full text-[10px] font-semibold border"
      style={{
        background: c.bg,
        color: c.fg,
        borderColor: c.border,
      }}
    >
      {c.label}
    </span>
  );
}

// ── Plan detail page ─────────────────────────────────────────────────────────

export default function StudyPlanPage() {
  const { t } = useT();
  const router = useRouter();
  const { plan: planSlug } = router.query;

  const plan = useMemo(
    () => (typeof planSlug === "string" ? getStudyPlan(planSlug) : undefined),
    [planSlug],
  );

  const planChallenges = useMemo(
    () => (typeof planSlug === "string" ? getChallengesByPlan(planSlug) : []),
    [planSlug],
  );

  if (!plan) {
    return (
      <CampusLayout seo={{ title: "Plan no encontrado" }}>
        <div className="text-center py-20">
          <span className="text-4xl mb-3 block">🔍</span>
          <p className="text-sm text-[var(--text-secondary)]">
            Plan de estudio no encontrado
          </p>
          <Link
            className="text-xs text-[var(--accent)] hover:underline mt-2 inline-block"
            href="/campus/retos"
          >
            ← Volver a retos
          </Link>
        </div>
      </CampusLayout>
    );
  }

  const completedCount = planChallenges.filter(
    (c) => c.status === "completed",
  ).length;
  const progressPct =
    plan.totalChallenges > 0
      ? Math.round((completedCount / plan.totalChallenges) * 100)
      : 0;

  return (
    <CampusLayout
      seo={{
        title: `${plan.title} - Campus`,
        description: plan.description,
      }}
    >
      <div className="space-y-6 py-4">
        {/* Back link */}
        <Link
          className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          href="/campus/retos"
        >
          ← Retos
        </Link>

        {/* Plan header */}
        <header className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{plan.icon}</span>
            <div>
              <h1
                className="text-2xl md:text-3xl font-black text-[var(--text-primary)]"
                style={{ letterSpacing: "-0.03em" }}
              >
                {plan.title}
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <DifficultyBadge level={plan.level} />
                <span className="text-xs text-[var(--text-muted)]">
                  ~{plan.estimatedHours}h de contenido
                </span>
                <span className="text-xs text-[var(--accent)] font-semibold">
                  {plan.totalChallenges} retos
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
            {plan.description}
          </p>

          {/* Progress */}
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Progreso
              </span>
              <span className="text-sm font-bold text-[var(--accent)]">
                {progressPct}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-[var(--bg-surface)] overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${plan.gradient} transition-all duration-500`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-[10px] text-[var(--text-muted)] mt-1">
              {completedCount}/{plan.totalChallenges} retos completados
            </p>
          </div>
        </header>

        {/* Challenges list */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
              Retos del Plan
            </h2>
            <span className="flex-1 h-px bg-[var(--border-default)]" />
          </div>

          <div className="space-y-2">
            {planChallenges.map((challenge, index) => {
              const isLocked = challenge.status === "locked";
              const isCompleted = challenge.status === "completed";

              return (
                <div key={challenge.id}>
                  {isLocked ? (
                    <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] opacity-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-muted)] text-sm flex-shrink-0">
                          🔒
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-[var(--text-primary)] truncate">
                            {challenge.title}
                          </h3>
                          <p className="text-xs text-[var(--text-muted)]">
                            {challenge.estimatedMinutes} min · +{challenge.xpReward} XP
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      className="group block no-underline"
                      href={`/campus/retos/${plan.slug}/${challenge.slug}`}
                    >
                      <div
                        className={`p-4 rounded-xl border transition-all duration-200 ${
                          isCompleted
                            ? "border-[var(--accent)]/50 bg-[var(--accent-light)]"
                            : "border-[var(--border-default)] ds-card hover:border-[var(--accent)] hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${
                              isCompleted
                                ? "bg-[var(--accent-light)] text-[var(--accent)]"
                                : "bg-[var(--accent-light)] text-[var(--accent)]"
                            }`}
                          >
                            {isCompleted ? (
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M5 13l4 4L19 7"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                />
                              </svg>
                            ) : (
                              <span>{challenge.order}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <DifficultyBadge level={challenge.difficulty} />
                              <span className="text-[10px] text-[var(--text-muted)]">
                                {challenge.estimatedMinutes} min
                              </span>
                              <span className="text-[10px] text-[var(--accent)] font-semibold">
                                +{challenge.xpReward} XP
                              </span>
                            </div>
                            <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                              {challenge.title}
                            </h3>
                            <p className="text-xs text-[var(--text-secondary)] line-clamp-1">
                              {challenge.description}
                            </p>
                          </div>
                          <span className="text-[var(--accent)] text-sm flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
                            →
                          </span>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Other plans */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
              Otros Planes
            </h2>
            <span className="flex-1 h-px bg-[var(--border-default)]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {studyPlans
              .filter((p) => p.slug !== plan.slug)
              .slice(0, 4)
              .map((otherPlan) => (
                <Link
                  key={otherPlan.id}
                  className="group block no-underline"
                  href={`/campus/plan-de-estudio/${otherPlan.slug}`}
                >
                  <div className="p-4 rounded-xl border border-[var(--border-default)] ds-card hover:border-[var(--accent)] transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{otherPlan.icon}</span>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {otherPlan.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[var(--text-muted)]">
                      {otherPlan.totalChallenges} retos · ~{otherPlan.estimatedHours}h
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </CampusLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: studyPlans.map((p) => ({ params: { plan: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
