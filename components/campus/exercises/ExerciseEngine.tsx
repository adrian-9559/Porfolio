"use client";

import { useState, useCallback, useMemo } from "react";

import type { CampusExercise, ExerciseResult } from "@/services/campusService";
import { useAuth } from "@/hooks/useAuth";
import { useT } from "@/hooks/useT";
import { CodeExercise } from "./CodeExercise";
import { QuizExercise } from "./QuizExercise";
import { TrueFalseExercise } from "./TrueFalseExercise";
import { FillBlankExercise } from "./FillBlankExercise";
import { DragDropExercise } from "./DragDropExercise";
import { CertificateModal } from "../CertificateModal";

interface ExerciseEngineProps {
  exercises: CampusExercise[];
  tutorialSlug: string;
  guideSlug: string;
  guideTitle: string;
  onAllComplete?: () => void;
}

interface ExerciseState {
  currentIdx: number;
  results: Map<string, ExerciseResult>;
  startedAt: string;
}

export function ExerciseEngine({
  exercises,
  tutorialSlug,
  guideSlug,
  guideTitle,
  onAllComplete,
}: ExerciseEngineProps) {
  const { isAuthenticated } = useAuth();
  const { t } = useT();
  const [state, setState] = useState<ExerciseState>({
    currentIdx: 0,
    results: new Map(),
    startedAt: new Date().toISOString(),
  });
  const [showCertificate, setShowCertificate] = useState(false);

  const currentExercise = exercises[state.currentIdx];
  const currentResult = currentExercise
    ? state.results.get(currentExercise.id)
    : undefined;

  const passedCount = useMemo(
    () => [...state.results.values()].filter((r) => r.passed).length,
    [state.results],
  );

  const allPassed = passedCount === exercises.length;

  const handleComplete = useCallback(
    async (result: ExerciseResult) => {
      if (!currentExercise) return;

      setState((prev) => {
        const next = new Map(prev.results);
        next.set(currentExercise.id, result);
        return {
          ...prev,
          results: next,
        };
      });
    },
    [currentExercise],
  );

  const handleNext = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentIdx: Math.min(prev.currentIdx + 1, exercises.length - 1),
      startedAt: new Date().toISOString(),
    }));
  }, [exercises.length]);

  const handlePrev = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentIdx: Math.max(prev.currentIdx - 1, 0),
    }));
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-8 text-center">
        <span className="text-3xl mb-3 block" aria-hidden="true">
          🔒
        </span>
        <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
          {t("campus.certificates.loginRequired")}
        </p>
        <p className="text-xs text-[var(--text-secondary)]">
          {t("campus.certificates.loginHint")}
        </p>
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-8 text-center">
        <span className="text-3xl mb-3 block" aria-hidden="true">
          📝
        </span>
        <p className="text-sm font-semibold text-[var(--text-primary)]">
          {t("campus.exercises.title")} — próximamente
        </p>
        <p className="text-xs text-[var(--text-secondary)]">
          Estamos preparando ejercicios para este tutorial.
        </p>
      </div>
    );
  }

  const typeLabels: Record<string, string> = {
    code: "Código",
    quiz: "Quiz",
    true_false: "Verdadero / Falso",
    fill_blank: "Rellena huecos",
    drag_drop: "Ordena / Empareja",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            {t("campus.exercises.title")}
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            {passedCount}/{exercises.length} completados
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-32 rounded-full bg-[var(--bg-surface)] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--color-brand-from)] to-[var(--color-brand-via)] transition-all duration-500"
              style={{ width: `${(passedCount / exercises.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-bold text-[var(--accent)] tabular-nums">
            {Math.round((passedCount / exercises.length) * 100)}%
          </span>
        </div>
      </div>

      {/* Exercise tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {exercises.map((ex, idx) => {
          const result = state.results.get(ex.id);
          const isActive = idx === state.currentIdx;
          return (
            <button
              key={ex.id}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? "bg-[var(--accent)] text-white"
                  : result?.passed
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    : "bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-default)] hover:border-[var(--border-hover)]"
              }`}
              type="button"
              onClick={() =>
                setState((prev) => ({ ...prev, currentIdx: idx }))
              }
            >
              {result?.passed ? "✓" : idx + 1}
            </button>
          );
        })}
      </div>

      {/* Current exercise */}
      {currentExercise && (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border-default)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--accent-light)] text-[var(--accent)]">
                {typeLabels[currentExercise.type]}
              </span>
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                {currentExercise.title}
              </span>
            </div>
            <span className="text-[10px] font-bold text-[var(--accent)]">
              +{currentExercise.xp_reward} XP
            </span>
          </div>

          <div className="p-4">
            {currentExercise.type === "code" && (
              <CodeExercise
                exercise={currentExercise}
                onResult={(correct, score) => {
                  void handleComplete({
                    score,
                    passed: correct,
                    xpEarned: correct ? currentExercise.xp_reward : 0,
                    details: {},
                  });
                }}
              />
            )}
            {currentExercise.type === "quiz" && (
              <QuizExercise
                exercise={currentExercise}
                result={currentResult}
                startedAt={state.startedAt}
                onComplete={handleComplete}
              />
            )}
            {currentExercise.type === "true_false" && (
              <TrueFalseExercise
                exercise={currentExercise}
                result={currentResult}
                startedAt={state.startedAt}
                onComplete={handleComplete}
              />
            )}
            {currentExercise.type === "fill_blank" && (
              <FillBlankExercise
                exercise={currentExercise}
                result={currentResult}
                startedAt={state.startedAt}
                onComplete={handleComplete}
              />
            )}
            {currentExercise.type === "drag_drop" && (
              <DragDropExercise
                exercise={currentExercise}
                result={currentResult}
                startedAt={state.startedAt}
                onComplete={handleComplete}
              />
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          className="px-4 py-2 rounded-lg text-xs font-semibold text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--border-hover)] transition-colors disabled:opacity-50"
          disabled={state.currentIdx === 0}
          type="button"
          onClick={handlePrev}
        >
          ← {t("campus.exercises.prevExercise")}
        </button>
        <span className="text-xs text-[var(--text-muted)]">
          {t("campus.exercises.exerciseOf", { current: state.currentIdx + 1, total: exercises.length })}
        </span>
        {state.currentIdx < exercises.length - 1 ? (
          <button
            className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[var(--accent)] hover:opacity-90 transition-opacity"
            type="button"
            onClick={handleNext}
          >
            {t("campus.exercises.nextExercise")} →
          </button>
        ) : allPassed ? (
          <button
            className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:opacity-90 transition-opacity"
            type="button"
            onClick={() => setShowCertificate(true)}
          >
            🎓 {t("campus.certificates.title")}
          </button>
        ) : (
          <div className="text-xs text-[var(--text-muted)]">
            {passedCount}/{exercises.length} {t("campus.exercises.passed")}
          </div>
        )}
      </div>

      {/* Certificate modal */}
      {showCertificate && (
        <CertificateModal
          guideSlug={guideSlug}
          guideTitle={guideTitle}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
}
