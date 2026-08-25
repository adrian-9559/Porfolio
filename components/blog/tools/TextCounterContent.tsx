"use client";
import { useState, useMemo } from "react";
import { useT } from "@/hooks/useT";

function analyzeText(text: string) {
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter((s) => s.trim()).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
  const lines = text ? text.split("\n").length : 0;
  const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));

  return { chars, charsNoSpaces, words, sentences, paragraphs, lines, readingTimeMinutes };
}

interface StatItemProps {
  label: string;
  value: number | string;
  accent?: boolean;
}

function StatItem({ label, value, accent }: StatItemProps) {
  return (
    <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] text-center">
      <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mb-1">{label}</p>
      <p
        className={`text-lg font-bold tabular-nums ${accent ? "text-indigo-600 dark:text-indigo-400" : "text-[#1d1d1f] dark:text-white"}`}
      >
        {value}
      </p>
    </div>
  );
}

export default function TextCounterContent() {
  const { t } = useT();
  const [text, setText] = useState("");

  const stats = useMemo(() => analyzeText(text), [text]);

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
            {t("blog.textCounter.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.textCounter.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.textCounter.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.textCounter.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Textarea */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.textCounter.input")}
            </p>
            {text && (
              <button
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                onClick={() => setText("")}
              >
                {t("blog.textCounter.clear")}
              </button>
            )}
          </div>
          <textarea
            className="w-full h-48 p-4 text-sm rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
            placeholder={t("blog.textCounter.placeholder")}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3">
          <StatItem label={t("blog.textCounter.characters")} value={stats.chars} />
          <StatItem label={t("blog.textCounter.words")} value={stats.words} accent />
          <StatItem label={t("blog.textCounter.sentences")} value={stats.sentences} />
          <StatItem label={t("blog.textCounter.paragraphs")} value={stats.paragraphs} />
          <StatItem label={t("blog.textCounter.lines")} value={stats.lines} />
          <StatItem
            label={t("blog.textCounter.readingTime")}
            value={`${stats.readingTimeMinutes} min`}
            accent
          />
        </div>

        {/* Characters without spaces */}
        <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/8 dark:border-white/8 flex items-center justify-between">
          <span className="text-sm text-[#6e6e73] dark:text-[#86868b]">
            {t("blog.textCounter.charsNoSpaces")}
          </span>
          <span className="text-sm font-bold text-[#1d1d1f] dark:text-white tabular-nums">
            {stats.charsNoSpaces}
          </span>
        </div>
      </div>
    </article>
  );
}