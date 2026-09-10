"use client";

import { useState, useCallback } from "react";

import type { CampusExercise, ExerciseResult } from "@/services/campusService";
import { campusService } from "@/services/campusService";
import { useT } from "@/hooks/useT";

interface QuizExerciseProps {
  exercise: CampusExercise;
  result?: ExerciseResult;
  startedAt: string;
  onComplete: (result: ExerciseResult) => void;
}

export function QuizExercise({
  exercise,
  result,
  startedAt,
  onComplete,
}: QuizExerciseProps) {
  const { t } = useT();
  const config = exercise.config as {
    question?: string;
    options?: string[];
  };

  const [selected, setSelected] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (selected === null) return;
    setIsSubmitting(true);
    try {
      const res = await campusService.submitExercise(
        exercise.id,
        { type: "quiz", selectedOption: selected },
        startedAt,
      );
      onComplete(res);
    } catch {
      // error handled by parent
    } finally {
      setIsSubmitting(false);
    }
  }, [selected, exercise.id, startedAt, onComplete]);

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-[var(--text-primary)]">
        {config.question}
      </p>

      <div className="space-y-2">
        {(config.options ?? []).map((option, idx) => {
          const isSelected = selected === idx;
          const isCorrect = result?.details && (result.details as { correctIndex?: number }).correctIndex === idx;
          const showResult = !!result;

          return (
            <button
              key={idx}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all border ${
                showResult
                  ? isCorrect
                    ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-700 dark:text-emerald-300"
                    : isSelected
                      ? "bg-red-500/10 border-red-500/50 text-red-700 dark:text-red-300"
                      : "bg-[var(--bg-surface)] border-[var(--border-default)] text-[var(--text-muted)]"
                  : isSelected
                    ? "bg-[var(--accent-light)] border-[var(--accent)] text-[var(--accent)]"
                    : "bg-[var(--bg-surface)] border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--border-hover)]"
              }`}
              disabled={!!result}
              type="button"
              onClick={() => setSelected(idx)}
            >
              <span className="mr-2 font-bold text-xs opacity-50">
                {String.fromCharCode(65 + idx)}.
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {!result && (
        <button
          className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[var(--accent)] hover:opacity-90 transition-opacity disabled:opacity-50"
          disabled={selected === null || isSubmitting}
          type="button"
          onClick={handleSubmit}
        >
          {isSubmitting ? "Enviando..." : "Enviar respuesta"}
        </button>
      )}

      {result && (
        <div
          className={`p-3 rounded-lg text-xs font-semibold ${
            result.passed
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-red-500/10 text-red-600 dark:text-red-400"
          }`}
        >
          {result.passed
            ? `✓ ${t("campus.exercises.correct")} — +${result.xpEarned} XP`
            : `✗ ${t("campus.exercises.incorrect")} — ${result.score}%`}
        </div>
      )}
    </div>
  );
}
