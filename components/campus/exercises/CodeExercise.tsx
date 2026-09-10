"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import type { CampusExercise } from "@/services/campusService";
import { campusService } from "@/services/campusService";
import { useT } from "@/hooks/useT";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] flex items-center justify-center bg-[var(--bg-surface)] rounded-xl border border-[var(--border-default)]">
      <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

interface CodeExerciseProps {
  exercise: CampusExercise;
  onResult: (correct: boolean, score: number) => void;
}

interface TestCase {
  input: string;
  expected: string;
}

export function CodeExercise({ exercise, onResult }: CodeExerciseProps) {
  const { t } = useT();
  const config = exercise.config as {
    language?: string;
    initialCode?: string;
    testCases?: TestCase[];
  };
  const language = config.language ?? "javascript";
  const testCases: TestCase[] = config.testCases ?? [];

  const [code, setCode] = useState(config.initialCode ?? "");
  const [output, setOutput] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<
    Array<{ input: string; expected: string; passed: boolean; actual: string }> | null
  >(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput(null);
    setTestResults(null);

    try {
      const result = await campusService.runCode(code, language);
      const out = [result.stdout, result.stderr].filter(Boolean).join("\n");
      setOutput(out || "(sin salida)");

      // Run all test cases
      const results: Array<{ input: string; expected: string; passed: boolean; actual: string }> = [];
      for (const tc of testCases) {
        const testResult = await campusService.runCode(code, language);
        const actual = [testResult.stdout, testResult.stderr].filter(Boolean).join("\n").trim();
        const expected = tc.expected.trim();
        results.push({
          input: tc.input,
          expected,
          passed: actual === expected,
          actual,
        });
      }
      setTestResults(results);
    } catch {
      setOutput(t("campus.certificates.error"));
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Reuse existing test results if available, otherwise run tests
      let results = testResults;
      if (!results || results.length !== testCases.length) {
        results = [];
        for (const tc of testCases) {
          const result = await campusService.runCode(code, language);
          const actual = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
          const expected = tc.expected.trim();
          results.push({
            input: tc.input,
            expected,
            passed: actual === expected,
            actual,
          });
        }
        setTestResults(results);
      }

      const passed = results.filter((r) => r.passed).length;
      const score = testCases.length > 0 ? Math.round((passed / testCases.length) * 100) : 0;
      onResult(score === 100, score);
    } catch {
      onResult(false, 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const passedCount = testResults?.filter((r) => r.passed).length ?? 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-[var(--accent)] px-2 py-0.5 rounded bg-[var(--accent-light)]">
          {language}
        </span>
        {testCases.length > 0 && (
          <span className="text-xs text-[var(--text-muted)]">
            {testCases.length} caso{testCases.length !== 1 ? "s" : ""} de prueba
          </span>
        )}
      </div>

      {exercise.description && (
        <p className="text-sm text-[var(--text-secondary)]">{exercise.description}</p>
      )}

      <div className="rounded-xl border border-[var(--border-default)] overflow-hidden">
        <MonacoEditor
          defaultLanguage={language}
          height="300px"
          theme="vs-dark"
          value={code}
          onChange={(v) => setCode(v ?? "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            wordWrap: "on",
            automaticLayout: true,
            tabSize: 2,
          }}
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors border border-[var(--border-default)] disabled:opacity-50"
          disabled={isRunning || isSubmitting}
          type="button"
          onClick={handleRun}
        >
          {isRunning ? (
            <div className="w-4 h-4 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          ) : (
            <span aria-hidden="true">▶</span>
          )}
          {t("campus.exercises.run")}
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[var(--accent)] text-white hover:opacity-90 transition-opacity disabled:opacity-50"
          disabled={isRunning || isSubmitting}
          type="button"
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <span aria-hidden="true">✓</span>
          )}
          {t("campus.exercises.submit")}
        </button>
        {testResults && (
          <span className="text-sm text-[var(--text-secondary)]">
            {passedCount}/{testCases.length} {t("campus.exercises.passed")}
          </span>
        )}
      </div>

      {output && (
        <div className="rounded-xl bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm p-4 overflow-x-auto whitespace-pre-wrap max-h-40 overflow-y-auto">
          {output}
        </div>
      )}

      {testResults && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
            {t("campus.exercises.testResults")}
          </p>
          {testResults.map((r, i) => (
            <div
              key={`test-${String(i)}`}
              className={`p-3 rounded-xl border ${
                r.passed
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                  : "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span aria-hidden="true">{r.passed ? "✓" : "✗"}</span>
                <span className="text-xs font-bold">{t("campus.exercises.test", { n: i + 1 })}</span>
              </div>
              <p className="text-xs font-mono opacity-70">{t("campus.exercises.input")}: {r.input}</p>
              <p className="text-xs font-mono opacity-70">{t("campus.exercises.expected")}: {r.expected}</p>
              {!r.passed && <p className="text-xs font-mono opacity-70">{t("campus.exercises.obtained")}: {r.actual}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
