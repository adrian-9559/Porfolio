"use client";
import { useState, useMemo } from "react";
import { useT } from "@/hooks/useT";

interface RegexToken {
  type: "anchor" | "quantifier" | "group" | "class" | "literal" | "alternation" | "escape" | "flag";
  value: string;
  description: string;
  children?: RegexToken[];
}

function parseRegex(pattern: string): RegexToken[] {
  const tokens: RegexToken[] = [];
  let i = 0;

  while (i < pattern.length) {
    const ch = pattern[i];

    if (ch === "^") {
      tokens.push({ type: "anchor", value: "^", description: "Start of string" });
      i++;
    } else if (ch === "$") {
      tokens.push({ type: "anchor", value: "$", description: "End of string" });
      i++;
    } else if (ch === "\\") {
      const next = pattern[i + 1] || "";
      const escapeMap: Record<string, string> = {
        d: "Digit [0-9]",
        D: "Non-digit",
        w: "Word character [a-zA-Z0-9_]",
        W: "Non-word character",
        s: "Whitespace",
        S: "Non-whitespace",
        b: "Word boundary",
        B: "Non-word boundary",
        n: "Newline",
        t: "Tab",
      };
      tokens.push({
        type: "escape",
        value: `\\${next}`,
        description: escapeMap[next] || `Escaped "${next}"`,
      });
      i += 2;
    } else if (ch === "[") {
      const end = pattern.indexOf("]", i + 1);
      if (end !== -1) {
        const content = pattern.slice(i, end + 1);
        const inner = content.slice(1, -1);
        const negated = inner.startsWith("^");
        tokens.push({
          type: "class",
          value: content,
          description: negated
            ? `Negated character class: ${inner.slice(1)}`
            : `Character class: ${inner}`,
        });
        i = end + 1;
      } else {
        tokens.push({ type: "literal", value: ch, description: `Literal "${ch}"` });
        i++;
      }
    } else if (ch === "(") {
      tokens.push({ type: "group", value: "(", description: "Group start" });
      i++;
    } else if (ch === ")") {
      tokens.push({ type: "group", value: ")", description: "Group end" });
      i++;
    } else if (ch === "|") {
      tokens.push({ type: "alternation", value: "|", description: "OR" });
      i++;
    } else if ("*+?".includes(ch)) {
      const qMap: Record<string, string> = {
        "*": "Zero or more",
        "+": "One or more",
        "?": "Optional (zero or one)",
      };
      tokens.push({ type: "quantifier", value: ch, description: qMap[ch] || ch });
      i++;
    } else if (ch === "{") {
      const end = pattern.indexOf("}", i + 1);
      if (end !== -1) {
        const quant = pattern.slice(i, end + 1);
        const inner = quant.slice(1, -1);
        const parts = inner.split(",");
        let desc: string;
        if (parts.length === 1) {
          desc = `Exactly ${parts[0]} times`;
        } else if (parts[1]) {
          desc = `Between ${parts[0]} and ${parts[1]} times`;
        } else {
          desc = `${parts[0]} or more times`;
        }
        tokens.push({ type: "quantifier", value: quant, description: desc });
        i = end + 1;
      } else {
        tokens.push({ type: "literal", value: ch, description: `Literal "${ch}"` });
        i++;
      }
    } else if (ch === ".") {
      tokens.push({ type: "class", value: ".", description: "Any character (except newline)" });
      i++;
    } else {
      tokens.push({ type: "literal", value: ch, description: `Literal "${ch}"` });
      i++;
    }
  }

  return tokens;
}

const TYPE_COLORS: Record<string, string> = {
  anchor: "bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-800/50",
  quantifier: "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50",
  group: "bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800/50",
  class: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50",
  literal: "bg-black/5 dark:bg-white/5 text-[#1d1d1f] dark:text-white border-black/8 dark:border-white/8",
  alternation: "bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/50",
  escape: "bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800/50",
};

export default function RegexVisualizerContent() {
  const { t } = useT();
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [error, setError] = useState("");

  const tokens = useMemo(() => {
    if (!pattern) return [];
    try {
      new RegExp(pattern, flags);
      setError("");

      return parseRegex(pattern);
    } catch {
      setError(t("blog.regexVisualizer.errorInvalid"));

      return [];
    }
  }, [pattern, flags, t]);

  const matches = useMemo(() => {
    if (!pattern || !testString) return [];
    try {
      const re = new RegExp(pattern, flags);
      const result: string[] = [];
      let m: RegExpExecArray | null;
      while ((m = re.exec(testString)) !== null) {
        result.push(m[0]);
        if (!flags.includes("g")) break;
      }

      return result;
    } catch {
      return [];
    }
  }, [pattern, flags, testString]);

  const toggleFlag = (f: string) => {
    setFlags((prev) => (prev.includes(f) ? prev.replace(f, "") : prev + f));
  };

  const renderHighlighted = () => {
    if (!testString || !pattern) return <span>{testString}</span>;
    try {
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const parts = testString.split(re);

      return parts.map((part, i) => (
        <span key={i}>
          {i > 0 && (
            <mark className="bg-indigo-200 dark:bg-indigo-800/60 text-indigo-900 dark:text-indigo-200 rounded px-0.5">
              {testString.match(re)?.[Math.floor(i / 2)] || ""}
            </mark>
          )}
          {part}
        </span>
      ));
    } catch {
      return <span>{testString}</span>;
    }
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
            {t("blog.regexVisualizer.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.regexVisualizer.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.regexVisualizer.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.regexVisualizer.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Pattern input */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            {t("blog.regexVisualizer.regexPattern")}
          </p>
          <div className="flex items-stretch rounded-xl border border-black/8 dark:border-white/8 overflow-hidden focus-within:border-indigo-400 dark:focus-within:border-indigo-600 transition-colors">
            <span className="flex items-center px-3 bg-black/3 dark:bg-white/3 text-[#6e6e73] dark:text-[#86868b] text-sm font-mono border-r border-black/8 dark:border-white/8">
              /
            </span>
            <input
              className="flex-1 px-3 py-2 text-sm font-mono bg-transparent text-[#1d1d1f] dark:text-white focus:outline-none placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
              placeholder="[a-z]+\\d{2,3}"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
            />
            <span className="flex items-center px-3 bg-black/3 dark:bg-white/3 text-[#6e6e73] dark:text-[#86868b] text-sm font-mono border-l border-black/8 dark:border-white/8">
              /
            </span>
            <div className="flex items-center gap-1 px-2 bg-black/3 dark:bg-white/3 border-l border-black/8 dark:border-white/8">
              {["g", "i", "m", "s", "u"].map((f) => (
                <button
                  key={f}
                  className={`w-6 h-6 rounded text-xs font-mono font-bold transition-colors ${flags.includes(f) ? "bg-indigo-500 text-white" : "text-[#6e6e73] dark:text-[#86868b] hover:bg-black/8 dark:hover:bg-white/8"}`}
                  onClick={() => toggleFlag(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          {error && (
            <p className="text-xs text-red-600 dark:text-red-400">⚠️ {error}</p>
          )}
        </div>

        {/* Visual breakdown */}
        {tokens.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.regexVisualizer.structure")}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tokens.map((token, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono font-semibold border ${TYPE_COLORS[token.type] || TYPE_COLORS.literal}`}
                  title={token.description}
                >
                  {token.value}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Breakdown list */}
        {tokens.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.regexVisualizer.breakdown")}
            </p>
            <div className="rounded-xl border border-black/8 dark:border-white/8 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-black/[0.03] dark:bg-white/[0.03]">
                    <th className="px-3 py-2 text-left text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                      {t("blog.regexVisualizer.token")}
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                      {t("blog.regexVisualizer.type")}
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                      {t("blog.regexVisualizer.meaning")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map((token, i) => (
                    <tr key={i} className="border-t border-black/5 dark:border-white/5">
                      <td className="px-3 py-1.5 font-mono font-semibold text-[#1d1d1f] dark:text-white">{token.value}</td>
                      <td className="px-3 py-1.5 text-[#6e6e73] dark:text-[#86868b] capitalize">{token.type}</td>
                      <td className="px-3 py-1.5 text-[#6e6e73] dark:text-[#86868b]">{token.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Test string */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            {t("blog.regexVisualizer.testString")}
          </p>
          <textarea
            className="w-full h-20 p-3 text-sm font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
            placeholder={t("blog.regexVisualizer.testPlaceholder")}
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
          />
        </div>

        {/* Highlighted matches */}
        {testString && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {t("blog.regexVisualizer.matches")}
              </p>
              {matches.length > 0 && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400">
                  {matches.length}
                </span>
              )}
            </div>
            <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-sm leading-relaxed min-h-[60px]">
              {renderHighlighted()}
            </div>
          </div>
        )}

        {/* Match list */}
        {matches.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {matches.map((m, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded-lg text-xs font-mono bg-indigo-100 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50"
              >
                {m}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
