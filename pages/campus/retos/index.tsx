"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

import CampusLayout from "@/layouts/campus";
import { challenges } from "@/data/challenges";
import { DifficultyBadge } from "@/components/campus/DifficultyBadge";

// ── Challenge card ───────────────────────────────────────────────────────────

function ChallengeCard({
  challenge,
}: {
  challenge: (typeof challenges)[number];
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
      className={`p-4 rounded-xl border transition-all duration-200 ${s.border} ${s.classes} bg-[var(--bg-card)]`}
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

  if (isLocked) return cardContent;

  return (
    <Link
      className="group block no-underline"
      href={`/campus/retos/${challenge.planSlug}/${challenge.slug}`}
    >
      {cardContent}
    </Link>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function RetosPage() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "beginner" | "intermediate" | "advanced"
  >("all");
  const [showAll, setShowAll] = useState(false);

  const filteredChallenges = useMemo(() => {
    if (activeFilter === "all") return challenges;
    return challenges.filter((c) => c.difficulty === activeFilter);
  }, [activeFilter]);

  const displayed = showAll
    ? filteredChallenges
    : filteredChallenges.slice(0, 12);

  return (
    <CampusLayout
      seo={{
        title: "Retos - Campus",
        description:
          "Resuelve retos de programación y gana XP. Desde fundamentos hasta proyectos avanzados.",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8 md:py-12 space-y-8">
        <header className="space-y-2">
          <h1
            className="text-2xl md:text-3xl font-black text-[var(--text-primary)]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Retos
          </h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed">
            Resuelve retos, gana XP y sube de nivel
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-center">
            <p className="text-lg font-black text-[var(--accent)]">
              {challenges.length}
            </p>
            <p className="text-[10px] text-[var(--text-muted)] font-semibold">
              Retos
            </p>
          </div>
          <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-center">
            <p className="text-lg font-black text-[var(--accent)]">
              {challenges.filter((c) => c.status === "completed").length}
            </p>
            <p className="text-[10px] text-[var(--text-muted)] font-semibold">
              Completados
            </p>
          </div>
          <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-center">
            <p className="text-lg font-black text-[var(--accent)]">
              {challenges.reduce((acc, c) => acc + c.xpReward, 0)}
            </p>
            <p className="text-[10px] text-[var(--text-muted)] font-semibold">
              XP Total
            </p>
          </div>
        </div>

        {/* Difficulty filter */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: "all", label: "Todos" },
              { id: "beginner", label: "Fácil" },
              { id: "intermediate", label: "Medio" },
              { id: "advanced", label: "Difícil" },
            ] as const
          ).map((filter) => (
            <button
              aria-pressed={activeFilter === filter.id}
              key={filter.id}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeFilter === filter.id
                  ? "bg-[var(--accent-light)] text-[var(--accent)]"
                  : "bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--border-hover)]"
              }`}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
          <span className="self-center text-sm text-[var(--text-muted)] ml-auto">
            {filteredChallenges.length} retos
          </span>
        </div>

        {/* Challenges list */}
        <div className="space-y-2">
          {displayed.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>

        {!showAll && filteredChallenges.length > 12 && (
          <button
            className="w-full py-3 rounded-xl border border-[var(--border-default)] text-sm font-semibold text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
            onClick={() => setShowAll(true)}
            type="button"
          >
            Ver más retos ({filteredChallenges.length - 12} restantes)
          </button>
        )}

        {filteredChallenges.length === 0 && (
          <div className="text-center py-16">
            <span
              aria-hidden="true"
              className="text-4xl mb-3 block"
            >
              🎯
            </span>
            <p className="text-sm text-[var(--text-secondary)]">
              No hay retos en esta categoría
            </p>
          </div>
        )}
      </div>
    </CampusLayout>
  );
}
