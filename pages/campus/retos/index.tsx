"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

import CampusLayout from "@/layouts/campus";
import { useT } from "@/hooks/useT";
import {
  studyPlans,
  getFeaturedPlans,
} from "@/data/studyPlans";
import { challenges, getChallengesByPlan } from "@/data/challenges";
import type { StudyPlan, DifficultyLevel } from "@/types/challenges";

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

// ── Challenge card ───────────────────────────────────────────────────────────

function ChallengeCard({
  challenge,
  planSlug,
}: {
  challenge: (typeof challenges)[number];
  planSlug: string;
}) {
  const statusConfig = {
    locked: {
      icon: "🔒",
      classes: "opacity-50 cursor-not-allowed",
      border: "border-[var(--border-default)]",
    },
    available: {
      icon: "▶",
      classes: "hover:border-[var(--accent)] hover:shadow-md cursor-pointer",
      border: "border-[var(--border-default)]",
    },
    in_progress: {
      icon: "⏳",
      classes: "border-amber-500/50 hover:border-amber-400",
      border: "border-amber-500/50",
    },
    completed: {
      icon: "✓",
      classes: "border-[var(--accent)]/50 bg-[var(--accent-light)]",
      border: "border-[var(--accent)]/50",
    },
  };
  const s = statusConfig[challenge.status];
  const isLocked = challenge.status === "locked";

  const cardContent = (
    <div
      className={`p-4 rounded-xl border transition-all duration-200 ${s.border} ${s.classes} ${
        !isLocked ? "ds-card" : "bg-[var(--bg-card)]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm ${
            challenge.status === "completed"
              ? "bg-[var(--accent-light)] text-[var(--accent)]"
              : challenge.status === "available"
                ? "bg-[var(--accent-light)] text-[var(--accent)]"
                : "bg-[var(--bg-surface)] text-[var(--text-muted)]"
          }`}
        >
          {challenge.status === "completed" ? (
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
          <div className="flex items-center gap-2 mb-1">
            <DifficultyBadge level={challenge.difficulty} />
            <span className="text-[10px] text-[var(--text-muted)]">
              {challenge.estimatedMinutes} min
            </span>
            <span className="text-[10px] text-[var(--accent)] font-semibold">
              +{challenge.xpReward} XP
            </span>
          </div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1 truncate">
            {challenge.title}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
            {challenge.description}
          </p>
        </div>
        {!isLocked && (
          <span className="text-[var(--accent)] text-sm flex-shrink-0 mt-1">
            →
          </span>
        )}
      </div>
    </div>
  );

  if (isLocked) {
    return cardContent;
  }

  return (
    <Link
      className="group block no-underline"
      href={`/campus/retos/${planSlug}/${challenge.slug}`}
    >
      {cardContent}
    </Link>
  );
}

// ── Plan card ────────────────────────────────────────────────────────────────

function PlanCard({ plan }: { plan: StudyPlan }) {
  const planChallenges = getChallengesByPlan(plan.slug);
  const completed = planChallenges.filter(
    (c) => c.status === "completed",
  ).length;

  return (
    <Link
      className="group block no-underline"
      href={`/campus/plan-de-estudio/${plan.slug}`}
    >
      <div className="p-5 rounded-xl ds-card hover:border-[var(--accent)] hover:shadow-md transition-all duration-200">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{plan.icon}</span>
          <div>
            <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
              {plan.title}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <DifficultyBadge level={plan.level} />
              <span className="text-[10px] text-[var(--text-muted)]">
                ~{plan.estimatedHours}h
              </span>
            </div>
          </div>
        </div>
        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3">
          {plan.description}
        </p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-[var(--bg-surface)] overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${plan.gradient} transition-all duration-500`}
              style={{
                width: `${plan.totalChallenges > 0 ? (completed / plan.totalChallenges) * 100 : 0}%`,
              }}
            />
          </div>
          <span className="text-[10px] text-[var(--text-muted)] font-semibold">
            {completed}/{plan.totalChallenges}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function RetosPage() {
  const { t } = useT();
  const [activeFilter, setActiveFilter] = useState<
    "all" | "beginner" | "intermediate" | "advanced"
  >("all");
  const [showAllChallenges, setShowAllChallenges] = useState(false);

  const featuredPlans = useMemo(() => getFeaturedPlans(), []);

  const filteredChallenges = useMemo(() => {
    let filtered = challenges;
    if (activeFilter !== "all") {
      filtered = filtered.filter((c) => c.difficulty === activeFilter);
    }
    return filtered;
  }, [activeFilter]);

  const displayedChallenges = showAllChallenges
    ? filteredChallenges
    : filteredChallenges.slice(0, 9);

  return (
    <CampusLayout
      seo={{
        title: "Retos - Campus",
        description:
          "Resuelve retos de programación y gana XP. Desde fundamentos hasta proyectos avanzados.",
      }}
    >
      <div className="space-y-6 py-4">
        {/* Hero */}
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-purple-500 flex items-center justify-center shadow-lg shadow-[var(--accent)]/20">
              <span className="text-lg">⚡</span>
            </div>
            <div>
              <h1
                className="text-2xl md:text-3xl font-black text-[var(--text-primary)]"
                style={{ letterSpacing: "-0.03em" }}
              >
                Retos
              </h1>
              <p className="text-xs text-[var(--text-secondary)]">
                Resuelve retos, gana XP y sube de nivel
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 text-center">
            <div className="flex-1 p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)]">
              <p className="text-lg font-black text-[var(--accent)]">
                {challenges.length}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] font-semibold">
                Retos
              </p>
            </div>
            <div className="flex-1 p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)]">
              <p className="text-lg font-black text-[var(--accent)]">
                {studyPlans.length}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] font-semibold">
                Planes
              </p>
            </div>
            <div className="flex-1 p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)]">
              <p className="text-lg font-black text-[var(--accent)]">
                {challenges.reduce((acc, c) => acc + c.xpReward, 0)}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] font-semibold">
                XP Total
              </p>
            </div>
          </div>
        </header>

        {/* Featured Plans */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
              Planes de Estudio
            </h2>
            <span className="flex-1 h-px bg-[var(--border-default)]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {featuredPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
          <Link
            className="text-[10px] font-semibold text-[var(--accent)] hover:underline"
            href="/campus/plan-de-estudio"
          >
            Ver todos los planes →
          </Link>
        </section>

        {/* All Challenges */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
              Todos los Retos
            </h2>
            <span className="flex-1 h-px bg-[var(--border-default)]" />
          </div>

          {/* Difficulty filter */}
          <div className="ds-tabs !p-0.5">
            {[
              { id: "all", label: "Todos" },
              { id: "beginner", label: "Fácil" },
              { id: "intermediate", label: "Medio" },
              { id: "advanced", label: "Difícil" },
            ].map((filter) => (
              <button
                key={filter.id}
                className={`ds-tab ${activeFilter === filter.id ? "ds-tab-active" : ""}`}
                type="button"
                onClick={() =>
                  setActiveFilter(
                    filter.id as "all" | "beginner" | "intermediate" | "advanced",
                  )
                }
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {displayedChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                planSlug={challenge.planSlug}
              />
            ))}
          </div>

          {!showAllChallenges && filteredChallenges.length > 9 && (
            <button
              className="w-full py-3 rounded-xl border border-[var(--border-default)] text-sm font-semibold text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
              onClick={() => setShowAllChallenges(true)}
              type="button"
            >
              Ver más retos ({filteredChallenges.length - 9} restantes)
            </button>
          )}

          {filteredChallenges.length === 0 && (
            <div className="text-center py-12">
              <span className="text-4xl mb-3 block">🎯</span>
              <p className="text-sm text-[var(--text-secondary)]">
                No hay retos en esta categoría
              </p>
            </div>
          )}
        </section>
      </div>
    </CampusLayout>
  );
}
