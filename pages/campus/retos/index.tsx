"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

import CampusLayout from "@/layouts/campus";
import { useT } from "@/hooks/useT";
import { challenges } from "@/data/challenges";
import { DifficultyBadge } from "@/components/campus/DifficultyBadge";
import { IconLock, IconPlay, IconHourglass, IconArrowRight, IconTarget } from "@/components/ui/Icons";

// ── Challenge card ───────────────────────────────────────────────────────────

function ChallengeCard({
  challenge,
}: {
  challenge: (typeof challenges)[number];
}) {
  const statusConfig = {
    locked: {
      icon: <IconLock className="w-4 h-4" />,
      classes: "opacity-50 cursor-not-allowed",
    },
    available: {
      icon: <IconPlay className="w-4 h-4" />,
      classes: "hover:border-[var(--accent)] hover:shadow-md cursor-pointer",
    },
    in_progress: {
      icon: <IconHourglass className="w-4 h-4" />,
      classes: "border-[var(--color-warning)]/30 hover:border-[var(--color-warning)]",
    },
    completed: {
      icon: "✓",
      classes: "border-[var(--accent)]/30 bg-[var(--accent-light)]",
    },
  };
  const s = statusConfig[challenge.status];
  const isLocked = challenge.status === "locked";

  const cardContent = (
    <div
      className={`ds-card ds-card-compact ds-card-interactive ${s.classes}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold ${
            challenge.status === "completed"
              ? "bg-[var(--accent)] text-[var(--text-interactive)]"
              : challenge.status === "available"
                ? "bg-[var(--accent-light)] text-[var(--accent)]"
                : "bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-default)]"
          }`}
        >
          {challenge.status === "completed" ? (
            <svg
              className="w-5 h-5"
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
          ) : (
            <span>{challenge.order}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <DifficultyBadge level={challenge.difficulty} />
            <span className="text-[10px] text-[var(--text-muted)]">
              {challenge.estimatedMinutes} min
            </span>
            <span className="text-[10px] text-[var(--accent)] font-bold">
              +{challenge.xpReward} XP
            </span>
          </div>
          <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1 truncate">
            {challenge.title}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
            {challenge.description}
          </p>
        </div>
        {!isLocked && (
          <span className="text-[var(--accent)] text-sm flex-shrink-0 mt-2">
            <IconArrowRight className="w-4 h-4" />
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
  const { t } = useT();
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
        title: `${t("campus.challenges.title")} - Campus`,
        description: t("campus.challenges.desc"),
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8 md:py-12 space-y-8">
        <header className="space-y-2">
          <span className="ds-section-label">{t("campus.challenges.badge")}</span>
          <h1
            className="text-2xl md:text-3xl font-black text-[var(--text-primary)]"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t("campus.challenges.title")}
          </h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed">
            {t("campus.challenges.desc")}
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="ds-card p-4 text-center">
            <p className="text-xl font-black text-[var(--accent)]">
              {challenges.length}
            </p>
            <p className="text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wider">
              {t("campus.challenges.title")}
            </p>
          </div>
          <div className="ds-card p-4 text-center">
            <p className="text-xl font-black text-[var(--color-success)]">
              {challenges.filter((c) => c.status === "completed").length}
            </p>
            <p className="text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wider">
              {t("campus.challenges.completed")}
            </p>
          </div>
          <div className="ds-card p-4 text-center">
            <p className="text-xl font-black text-[var(--color-warning)]">
              {challenges.reduce((acc, c) => acc + c.xpReward, 0)}
            </p>
            <p className="text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wider">
              {t("campus.challenges.xpTotal")}
            </p>
          </div>
        </div>

        {/* Difficulty filter */}
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { id: "all", label: t("common.all") },
              { id: "beginner", label: t("blog.level.beginner") },
              { id: "intermediate", label: t("blog.level.intermediate") },
              { id: "advanced", label: t("blog.level.advanced") },
            ] as const
          ).map((filter) => (
            <button
              aria-pressed={activeFilter === filter.id}
              key={filter.id}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeFilter === filter.id
                  ? "bg-[var(--accent)] text-[var(--text-interactive)]"
                  : "ds-btn-secondary"
              }`}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
          <span className="self-center text-sm text-[var(--text-muted)] ml-auto">
            {t("campus.challenges.count", { n: filteredChallenges.length })}
          </span>
        </div>

        {/* Challenges list */}
        <div className="space-y-3">
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
            {t("campus.challenges.loadMore", { n: filteredChallenges.length - 12 })}
          </button>
        )}

        {filteredChallenges.length === 0 && (
          <div className="ds-empty">
            <IconTarget className="w-10 h-10 mb-3 text-[var(--text-muted)]" />
            <p className="text-sm text-[var(--text-secondary)]">
              {t("campus.challenges.empty")}
            </p>
          </div>
        )}
      </div>
    </CampusLayout>
  );
}
