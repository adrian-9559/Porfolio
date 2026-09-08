"use client";

import Link from "next/link";

import CampusLayout from "@/layouts/campus";
import { useT } from "@/hooks/useT";
import { studyPlans } from "@/data/studyPlans";
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

// ── Plan card ────────────────────────────────────────────────────────────────

function PlanCard({
  plan,
}: {
  plan: (typeof studyPlans)[number];
}) {
  const planChallenges = getChallengesByPlan(plan.slug);
  const completed = planChallenges.filter(
    (c) => c.status === "completed",
  ).length;
  const progressPct =
    plan.totalChallenges > 0
      ? Math.round((completed / plan.totalChallenges) * 100)
      : 0;

  return (
    <Link
      className="group block no-underline"
      href={`/campus/plan-de-estudio/${plan.slug}`}
    >
      <div className="p-6 rounded-xl ds-card hover:border-[var(--accent)] hover:shadow-md transition-all duration-200">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-3xl">{plan.icon}</span>
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
              {plan.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <DifficultyBadge level={plan.level} />
              <span className="text-[10px] text-[var(--text-muted)]">
                ~{plan.estimatedHours}h de contenido
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
          {plan.description}
        </p>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[var(--text-muted)] font-semibold">
              Progreso
            </span>
            <span className="text-[10px] font-bold text-[var(--accent)]">
              {progressPct}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--bg-surface)] overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${plan.gradient} transition-all duration-500`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[var(--text-muted)]">
              {completed}/{plan.totalChallenges} retos
            </span>
            <span className="text-[10px] text-[var(--accent)] font-semibold group-hover:translate-x-0.5 transition-transform">
              Ver plan →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function StudyPlansIndexPage() {
  const { t } = useT();

  return (
    <CampusLayout
      seo={{
        title: "Planes de Estudio - Campus",
        description:
          "Elige un plan de estudio y aprende programación de forma estructurada.",
      }}
    >
      <div className="space-y-6 py-4">
        {/* Hero */}
        <header className="space-y-3">
          <Link
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            href="/campus/retos"
          >
            ← Retos
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-brand-from)] via-[var(--color-brand-via)] to-[var(--color-brand-to)] flex items-center justify-center shadow-lg shadow-[var(--accent)]/20">
              <span className="text-lg">📚</span>
            </div>
            <div>
              <h1
                className="text-2xl md:text-3xl font-black text-[var(--text-primary)]"
                style={{ letterSpacing: "-0.03em" }}
              >
                Planes de Estudio
              </h1>
              <p className="text-xs text-[var(--text-secondary)]">
                Aprende programación de forma estructurada y循序渐进
              </p>
            </div>
          </div>
        </header>

        {/* Plans grid */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
              Todos los Planes
            </h2>
            <span className="flex-1 h-px bg-[var(--border-default)]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studyPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center py-8">
          <p className="text-sm text-[var(--text-secondary)] mb-3">
            ¿No sabes por dónde empezar?
          </p>
          <Link
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--bg-interactive)] text-[var(--text-interactive)] text-sm font-bold hover:bg-[var(--bg-interactive-hover)] transition-all"
            href="/campus/retos/fundamentos-javascript/js-variables"
          >
            <span>Empezar por JavaScript</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </CampusLayout>
  );
}
