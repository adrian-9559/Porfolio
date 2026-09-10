"use client";

import { useState, useCallback } from "react";

import type { CampusExercise, ExerciseResult } from "@/services/campusService";
import { campusService } from "@/services/campusService";
import { useT } from "@/hooks/useT";

interface FillBlankExerciseProps {
  exercise: CampusExercise;
  result?: ExerciseResult;
  startedAt: string;
  onComplete: (result: ExerciseResult) => void;
}

export function FillBlankExercise({
  exercise,
  result,
  startedAt,
  onComplete,
}: FillBlankExerciseProps) {
  const { t } = useT();
  const config = exercise.config as {
    codeTemplate?: string;
    blanks?: { position: number; hint?: string }[];
  };

  const blanks = config.blanks ?? [];
  const [answers, setAnswers] = useState<string[]>(() => new Array(blanks.length).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswer = useCallback((idx: number, value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  }, []);

  const allFilled = answers.every((a) => a.trim().length > 0);

  const handleSubmit = useCallback(async () => {
    if (!allFilled) return;
    setIsSubmitting(true);
    try {
      const res = await campusService.submitExercise(
        exercise.id,
        { type: "fill_blank", answers },
        startedAt,
      );
      onComplete(res);
    } catch {
      // error handled by parent
    } finally {
      setIsSubmitting(false);
    }
  }, [answers, allFilled, exercise.id, startedAt, onComplete]);

  // Render code template with blanks
  const renderTemplate = () => {
    if (!config.codeTemplate) return null;

    const parts = config.codeTemplate.split("____");
    return (
      <div className="p-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-default)] font-mono text-sm text-[var(--text-primary)]">
        {parts.map((part, idx) => (
          <span key={idx}>
            {part}
            {idx < blanks.length && (
              <input
                aria-label={`Hueco ${idx + 1}${blanks[idx]?.hint ? `: ${blanks[idx].hint}` : ""}`}
                className={`inline-block w-24 mx-0.5 px-2 py-0.5 rounded border text-xs font-mono bg-[var(--bg-card)] focus:outline-none focus:border-[var(--accent)] ${
                  result
                    ? (result.details as { correct?: number })?.correct !== undefined
                      ? "border-emerald-500/50"
                      : "border-red-500/50"
                    : "border-[var(--border-default)]"
                }`}
                disabled={!!result}
                placeholder={blanks[idx]?.hint ?? `#${idx + 1}`}
                type="text"
                value={answers[idx]}
                onChange={(e) => handleAnswer(idx, e.target.value)}
              />
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {renderTemplate()}

      {!config.codeTemplate && (
        <div className="space-y-2">
          {blanks.map((blank, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <label className="text-xs text-[var(--text-muted)] w-20">
                Hueco {idx + 1}:
              </label>
              <input
                aria-label={`Hueco ${idx + 1}`}
                className="flex-1 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                disabled={!!result}
                placeholder={blank.hint ?? `${t("campus.exercises.typeHere")} ${idx + 1}`}
                type="text"
                value={answers[idx]}
                onChange={(e) => handleAnswer(idx, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      {!result && (
        <button
          className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[var(--accent)] hover:opacity-90 transition-opacity disabled:opacity-50"
          disabled={!allFilled || isSubmitting}
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
