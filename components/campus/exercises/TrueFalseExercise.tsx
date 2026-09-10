"use client";

import { useState, useCallback } from "react";

import type { CampusExercise, ExerciseResult } from "@/services/campusService";
import { campusService } from "@/services/campusService";
import { useT } from "@/hooks/useT";

interface TrueFalseExerciseProps {
  exercise: CampusExercise;
  result?: ExerciseResult;
  startedAt: string;
  onComplete: (result: ExerciseResult) => void;
}

export function TrueFalseExercise({
  exercise,
  result,
  startedAt,
  onComplete,
}: TrueFalseExerciseProps) {
  const { t } = useT();
  const config = exercise.config as {
    statements?: { text: string; explanation?: string }[];
  };

  const statements = config.statements ?? [];
  const [answers, setAnswers] = useState<(boolean | null)[]>(
    () => new Array(statements.length).fill(null),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswer = useCallback(
    (idx: number, value: boolean) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[idx] = value;
        return next;
      });
    },
    [],
  );

  const allAnswered = answers.every((a) => a !== null);

  const handleSubmit = useCallback(async () => {
    if (!allAnswered) return;
    setIsSubmitting(true);
    try {
      const res = await campusService.submitExercise(
        exercise.id,
        {
          type: "true_false",
          answers: answers as boolean[],
        },
        startedAt,
      );
      onComplete(res);
    } catch {
      // error handled by parent
    } finally {
      setIsSubmitting(false);
    }
  }, [answers, allAnswered, exercise.id, startedAt, onComplete]);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {statements.map((stmt, idx) => {
          const userAnswer = answers[idx];
          const showResult = !!result;

          return (
            <div
              key={idx}
              className="p-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)]"
            >
              <p className="text-sm text-[var(--text-primary)] mb-2">
                <span className="font-bold text-xs text-[var(--text-muted)] mr-1">
                  {idx + 1}.
                </span>
                {stmt.text}
              </p>
              <div className="flex gap-2">
                <button
                  className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    showResult
                      ? userAnswer === true
                        ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-600"
                        : "bg-red-500/10 border-red-500/50 text-red-600"
                      : userAnswer === true
                        ? "bg-[var(--accent-light)] border-[var(--accent)] text-[var(--accent)]"
                        : "bg-[var(--bg-card)] border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
                  }`}
                  disabled={showResult}
                  type="button"
                  onClick={() => handleAnswer(idx, true)}
                >
                  {t("campus.exercises.true")}
                </button>
                <button
                  className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    showResult
                      ? userAnswer === false
                        ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-600"
                        : "bg-red-500/10 border-red-500/50 text-red-600"
                      : userAnswer === false
                        ? "bg-[var(--accent-light)] border-[var(--accent)] text-[var(--accent)]"
                        : "bg-[var(--bg-card)] border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
                  }`}
                  disabled={showResult}
                  type="button"
                  onClick={() => handleAnswer(idx, false)}
                >
                  {t("campus.exercises.false")}
                </button>
              </div>
              {showResult && stmt.explanation && (
                <p className="mt-2 text-[10px] text-[var(--text-muted)] italic">
                  {stmt.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {!result && (
        <button
          className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[var(--accent)] hover:opacity-90 transition-opacity disabled:opacity-50"
          disabled={!allAnswered || isSubmitting}
          type="button"
          onClick={handleSubmit}
        >
          {isSubmitting ? "Enviando..." : "Enviar respuestas"}
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
            ? `✓ Aprobado — +${result.xpEarned} XP`
            : `✗ No aprobado — Score: ${result.score}%`}
        </div>
      )}
    </div>
  );
}
