"use client";
import { useState } from "react";
import { useT } from "@/hooks/useT";
import { copyToClipboard } from "@/lib/clipboard";

interface RegexEntry {
  pattern: string;
  description: string;
}

interface Category {
  id: string;
  label: string;
  entries: RegexEntry[];
}

const CATEGORIES: Category[] = [
  {
    id: "characters",
    label: "Characters",
    entries: [
      { pattern: ".", description: "Any character except newline" },
      { pattern: "\\d", description: "Digit (0-9)" },
      { pattern: "\\D", description: "Non-digit" },
      { pattern: "\\w", description: "Word character (a-z, A-Z, 0-9, _)" },
      { pattern: "\\W", description: "Non-word character" },
      { pattern: "\\s", description: "Whitespace" },
      { pattern: "\\S", description: "Non-whitespace" },
    ],
  },
  {
    id: "quantifiers",
    label: "Quantifiers",
    entries: [
      { pattern: "*", description: "Zero or more" },
      { pattern: "+", description: "One or more" },
      { pattern: "?", description: "Zero or one (optional)" },
      { pattern: "{n}", description: "Exactly n times" },
      { pattern: "{n,}", description: "n or more times" },
      { pattern: "{n,m}", description: "Between n and m times" },
      { pattern: "*?", description: "Zero or more (lazy)" },
      { pattern: "+?", description: "One or more (lazy)" },
    ],
  },
  {
    id: "anchors",
    label: "Anchors",
    entries: [
      { pattern: "^", description: "Start of string/line" },
      { pattern: "$", description: "End of string/line" },
      { pattern: "\\b", description: "Word boundary" },
      { pattern: "\\B", description: "Non-word boundary" },
    ],
  },
  {
    id: "groups",
    label: "Groups & Alternation",
    entries: [
      { pattern: "(abc)", description: "Capture group" },
      { pattern: "(?:abc)", description: "Non-capturing group" },
      { pattern: "(?<name>abc)", description: "Named capture group" },
      { pattern: "\\1", description: "Backreference to group 1" },
      { pattern: "a|b", description: "Alternation (a or b)" },
      { pattern: "(?=abc)", description: "Positive lookahead" },
      { pattern: "(?!abc)", description: "Negative lookahead" },
      { pattern: "(?<=abc)", description: "Positive lookbehind" },
      { pattern: "(?<!abc)", description: "Negative lookbehind" },
    ],
  },
  {
    id: "classes",
    label: "Character Classes",
    entries: [
      { pattern: "[abc]", description: "Match a, b, or c" },
      { pattern: "[^abc]", description: "Not a, b, or c" },
      { pattern: "[a-z]", description: "Range: a to z" },
      { pattern: "[A-Z]", description: "Range: A to Z" },
      { pattern: "[0-9]", description: "Range: 0 to 9" },
      { pattern: "[a-zA-Z]", description: "All letters" },
    ],
  },
  {
    id: "flags",
    label: "Flags",
    entries: [
      { pattern: "g", description: "Global (all matches)" },
      { pattern: "i", description: "Case-insensitive" },
      { pattern: "m", description: "Multiline (^/$ per line)" },
      { pattern: "s", description: "Dotall (. matches \\n)" },
      { pattern: "u", description: "Unicode support" },
    ],
  },
];

export default function RegexCheatsheetContent() {
  const { t } = useT();
  const [search, setSearch] = useState("");
  const [copiedPattern, setCopiedPattern] = useState<string | null>(null);

  const filtered = CATEGORIES.map((cat) => ({
    ...cat,
    entries: cat.entries.filter(
      (e) =>
        e.pattern.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.entries.length > 0);

  const copy = async (pattern: string) => {
    if (await copyToClipboard(pattern)) {
      setCopiedPattern(pattern);
      setTimeout(() => setCopiedPattern(null), 1500);
    }
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
            {t("blog.regexCheatsheet.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.regexCheatsheet.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.regexCheatsheet.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.regexCheatsheet.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-2.5 pl-10 text-sm rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
            placeholder={t("blog.regexCheatsheet.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2] dark:text-[#636366]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Categories */}
        {filtered.length === 0 && (
          <p className="text-sm text-[#6e6e73] dark:text-[#86868b] text-center py-8">
            {t("blog.regexCheatsheet.noResults")}
          </p>
        )}

        {filtered.map((cat) => (
          <div key={cat.id} className="space-y-2">
            <h2 className="text-sm font-bold text-[#1d1d1f] dark:text-white uppercase tracking-wider">
              {cat.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cat.entries.map((entry) => (
                <button
                  key={entry.pattern}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors text-left group"
                  onClick={() => copy(entry.pattern)}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <code className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                      {entry.pattern}
                    </code>
                    <span className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">
                      {entry.description}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366] group-hover:text-indigo-500 dark:group-hover:text-indigo-400 shrink-0 ml-2">
                    {copiedPattern === entry.pattern
                      ? t("blog.regexCheatsheet.copied")
                      : t("blog.regexCheatsheet.copy")}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
