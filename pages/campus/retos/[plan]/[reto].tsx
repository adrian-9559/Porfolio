"use client";

import { GetStaticPaths, GetStaticProps } from "next";
import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import CampusLayout from "@/layouts/campus";
import { useT } from "@/hooks/useT";
import { challenges, getChallenge, getChallengesByPlan } from "@/data/challenges";
import { studyPlans, getStudyPlan } from "@/data/studyPlans";
import { DifficultyBadge } from "@/components/campus/DifficultyBadge";

// ── Code editor ──────────────────────────────────────────────────────────────

function CodeEditor({
  code,
  onChange,
  language,
}: {
  code: string;
  onChange: (value: string) => void;
  language: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border-default)] overflow-hidden">
      {/* Editor header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--bg-surface)] border-b border-[var(--border-default)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[10px] text-[var(--text-muted)] font-mono ml-2">
            {language}
          </span>
        </div>
        <button
          className="text-[10px] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-mono"
          onClick={() => navigator.clipboard.writeText(code)}
          type="button"
        >
          Copiar
        </button>
      </div>

      {/* Editor area */}
      <div className="relative">
        <textarea
          className="w-full min-h-[300px] p-4 bg-[var(--bg-card)] text-[var(--text-primary)] font-mono text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          value={code}
        />
      </div>
    </div>
  );
}

// ── Test results ─────────────────────────────────────────────────────────────

function TestResults({
  tests,
  results,
}: {
  tests: { name: string; hidden: boolean }[];
  results: { passed: boolean; message: string }[] | null;
}) {
  if (!results) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
        Resultados
      </h3>
      <div className="space-y-1">
        {results.map((result, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
              result.passed
                ? "bg-[var(--accent-light)] text-[var(--accent)]"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            <span>{result.passed ? "✓" : "✗"}</span>
            <span className="flex-1">{tests[i]?.name ?? `Test ${i + 1}`}</span>
            {tests[i]?.hidden && (
              <span className="text-[10px] opacity-60">oculto</span>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-[var(--text-secondary)]">
        {results.filter((r) => r.passed).length}/{results.length} tests pasados
      </p>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function ChallengePage() {
  const { t } = useT();
  const router = useRouter();
  const { plan: planSlug, reto: challengeSlug } = router.query;

  const challenge = useMemo(
    () =>
      typeof challengeSlug === "string"
        ? getChallenge(challengeSlug)
        : undefined,
    [challengeSlug],
  );

  const plan = useMemo(
    () =>
      typeof planSlug === "string" ? getStudyPlan(planSlug) : undefined,
    [planSlug],
  );

  const siblingChallenges = useMemo(
    () =>
      typeof planSlug === "string" ? getChallengesByPlan(planSlug) : [],
    [planSlug],
  );

  const [code, setCode] = useState(challenge?.starterCode ?? "");
  const [testResults, setTestResults] = useState<
    { passed: boolean; message: string }[] | null
  >(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // Find prev/next challenges
  const currentIndex = siblingChallenges.findIndex(
    (c) => c.slug === challengeSlug,
  );
  const prevChallenge =
    currentIndex > 0 ? siblingChallenges[currentIndex - 1] : null;
  const nextChallenge =
    currentIndex < siblingChallenges.length - 1
      ? siblingChallenges[currentIndex + 1]
      : null;

  const handleRun = useCallback(() => {
    if (!challenge) return;
    setIsRunning(true);

    // Simulate test execution
    setTimeout(() => {
      const results = challenge.tests.map((test) => ({
        passed: Math.random() > 0.3, // Simulated for demo
        message: test.hidden ? "Test oculto" : `Entrada: ${test.input}`,
      }));
      setTestResults(results);
      setIsRunning(false);
    }, 1500);
  }, [challenge]);

  const handleSubmit = useCallback(() => {
    if (!challenge) return;
    setIsRunning(true);

    // Simulate submission
    setTimeout(() => {
      const allPassed = challenge.tests.every(() => Math.random() > 0.2);
      const results = challenge.tests.map(() => ({
        passed: allPassed,
        message: allPassed ? "Test pasado" : "Test fallido",
      }));
      setTestResults(results);
      setIsRunning(false);

      if (allPassed) {
        // Show success feedback
        alert(
          `🎉 ¡Felicidades! Has completado el reto y ganado ${challenge.xpReward} XP`,
        );
      }
    }, 2000);
  }, [challenge]);

  if (!challenge || !plan) {
    return (
      <CampusLayout seo={{ title: "Reto no encontrado" }}>
        <div className="text-center py-20">
          <span className="text-4xl mb-3 block">🎯</span>
          <p className="text-sm text-[var(--text-secondary)]">
            Reto no encontrado
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

  return (
    <CampusLayout
      seo={{
        title: `${challenge.title} - Campus`,
        description: challenge.description,
      }}
    >
      <div className="space-y-4 py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Link className="hover:text-[var(--accent)] transition-colors" href="/campus/retos">
            Retos
          </Link>
          <span>/</span>
          <span className="text-[var(--text-primary)]">{challenge.title}</span>
        </nav>

        {/* Challenge header */}
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-purple-500 flex items-center justify-center shadow-lg shadow-[var(--accent)]/20 text-sm font-bold text-white">
              {challenge.order}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <DifficultyBadge level={challenge.difficulty} />
                <span className="text-[10px] text-[var(--text-muted)]">
                  {challenge.estimatedMinutes} min
                </span>
                <span className="text-[10px] text-[var(--accent)] font-semibold">
                  +{challenge.xpReward} XP
                </span>
              </div>
              <h1
                className="text-xl md:text-2xl font-black text-[var(--text-primary)]"
                style={{ letterSpacing: "-0.02em" }}
              >
                {challenge.title}
              </h1>
            </div>
          </div>
        </header>

        {/* Narrative */}
        <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
            &ldquo;{challenge.narrative}&rdquo;
          </p>
        </div>

        {/* Objective */}
        <div className="p-4 rounded-xl bg-[var(--accent-light)] border border-[var(--accent)]/20">
          <h3 className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1">
            Objetivo
          </h3>
          <p className="text-sm text-[var(--text-primary)]">
            {challenge.objective}
          </p>
        </div>

        {/* Code editor */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
              Tu Código
            </h2>
            <div className="flex gap-2">
              <button
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                onClick={() => setCode(challenge.starterCode)}
                type="button"
              >
                Reiniciar
              </button>
              <button
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                onClick={() => setShowSolution(!showSolution)}
                type="button"
              >
                {showSolution ? "Ocultar solución" : "Ver solución"}
              </button>
            </div>
          </div>

          <CodeEditor
            code={code}
            language="javascript"
            onChange={setCode}
          />

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              className="flex-1 py-3 rounded-xl text-sm font-bold bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all disabled:opacity-50"
              disabled={isRunning}
              onClick={handleRun}
              type="button"
            >
              {isRunning ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Ejecutando...
                </span>
              ) : (
                "▶ Ejecutar tests"
              )}
            </button>
            <button
              className="flex-1 py-3 rounded-xl text-sm font-bold bg-[var(--bg-interactive)] text-[var(--text-interactive)] hover:bg-[var(--bg-interactive-hover)] transition-all disabled:opacity-50"
              disabled={isRunning}
              onClick={handleSubmit}
              type="button"
            >
              {isRunning ? "Enviando..." : "Enviar solución"}
            </button>
          </div>
        </section>

        {/* Test results */}
        <TestResults results={testResults} tests={challenge.tests} />

        {/* Solution */}
        {showSolution && challenge.solution && (
          <section className="space-y-3">
            <h2 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
              Solución
            </h2>
            <div className="rounded-xl border border-[var(--border-default)] overflow-hidden">
              <pre className="p-4 bg-[var(--bg-card)] text-sm text-[var(--text-primary)] font-mono overflow-x-auto">
                {challenge.solution}
              </pre>
            </div>
          </section>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-default)]">
          {prevChallenge ? (
            <Link
              className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors no-underline"
              href={`/campus/retos/${plan.slug}/${prevChallenge.slug}`}
            >
              <span>←</span>
              <span>{prevChallenge.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {nextChallenge ? (
            <Link
              className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors no-underline"
              href={`/campus/retos/${plan.slug}/${nextChallenge.slug}`}
            >
              <span>{nextChallenge.title}</span>
              <span>→</span>
            </Link>
          ) : (
            <Link
              className="flex items-center gap-2 text-xs text-[var(--accent)] font-semibold no-underline"
              href="/campus/retos"
            >
              <span>Ver todos los retos</span>
              <span>→</span>
            </Link>
          )}
        </div>
      </div>
    </CampusLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = challenges.map((c) => ({
    params: { plan: c.planSlug, reto: c.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

// Empty getStaticProps — page reads params from useRouter at runtime
export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
