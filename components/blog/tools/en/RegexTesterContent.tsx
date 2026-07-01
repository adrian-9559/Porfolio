"use client";
import { useState, useMemo } from "react";

const EXAMPLES = [
  {
    label: "Email",
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    flags: "g",
    text: "Contact us at hello@example.com or info@company.org for more info.",
  },
  {
    label: "URL",
    pattern: "https?:\\/\\/[^\\s]+",
    flags: "g",
    text: "Visit https://google.com or http://example.org for more info.",
  },
  {
    label: "Phone ES",
    pattern: "(\\+34|0034)?[6-9]\\d{8}",
    flags: "g",
    text: "Call 612345678 or +34 987654321.",
  },
  {
    label: "Date DD/MM/YYYY",
    pattern: "\\d{2}\\/\\d{2}\\/\\d{4}",
    flags: "g",
    text: "Born on 15/03/1990, expires on 31/12/2025.",
  },
  {
    label: "Hex color",
    pattern: "#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})",
    flags: "g",
    text: "Colors: #fff, #3b82f6, #FF5733 and #abc.",
  },
];

export default function RegexTesterContent() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState(
    "Type text here to test your regular expression.",
  );
  const [error, setError] = useState("");

  const result = useMemo(() => {
    if (!pattern) return { highlighted: text, matches: [] };
    try {
      const re = new RegExp(pattern, flags);

      setError("");
      const matches: string[] = [];
      const highlighted = text.replace(re, (m) => {
        matches.push(m);

        return `__MATCH_START__${m}__MATCH_END__`;
      });

      return { highlighted, matches };
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid expression");

      return { highlighted: text, matches: [] };
    }
  }, [pattern, flags, text]);

  const loadExample = (ex: (typeof EXAMPLES)[0]) => {
    setPattern(ex.pattern);
    setFlags(ex.flags);
    setText(ex.text);
    setError("");
  };

  const toggleFlag = (f: string) => {
    setFlags((prev) => (prev.includes(f) ? prev.replace(f, "") : prev + f));
  };

  const renderHighlighted = () => {
    const parts = result.highlighted.split(/(__MATCH_START__|__MATCH_END__)/);
    let inMatch = false;

    return parts.map((part, i) => {
      if (part === "__MATCH_START__") {
        inMatch = true;

        return null;
      }
      if (part === "__MATCH_END__") {
        inMatch = false;

        return null;
      }

      return inMatch ? (
        <mark
          key={i}
          className="bg-amber-200 dark:bg-amber-800/60 text-amber-900 dark:text-amber-200 rounded px-0.5"
        >
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      );
    });
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50">
            Tool
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            Free to use
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          Regex Tester
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          Test regular expressions in real time. Highlights matches and
          shows the count.
        </p>
      </div>

      <div className="space-y-4">
        {/* Examples */}
        <div>
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider mb-2">
            Quick examples
          </p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-black/5 dark:bg-white/5 text-[#1d1d1f] dark:text-white hover:bg-rose-100 dark:hover:bg-rose-950/40 hover:text-rose-700 dark:hover:text-rose-400 transition-colors"
                onClick={() => loadExample(ex)}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pattern input */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            Regular expression
          </p>
          <div className="flex items-stretch rounded-xl border border-black/8 dark:border-white/8 overflow-hidden focus-within:border-rose-400 dark:focus-within:border-rose-600 transition-colors">
            <span className="flex items-center px-3 bg-black/3 dark:bg-white/3 text-[#6e6e73] dark:text-[#86868b] text-sm font-mono border-r border-black/8 dark:border-white/8">
              /
            </span>
            <input
              className="flex-1 px-3 py-2 text-sm font-mono bg-transparent text-[#1d1d1f] dark:text-white focus:outline-none placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
              placeholder="[a-z]+"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
            />
            <span className="flex items-center px-3 bg-black/3 dark:bg-white/3 text-[#6e6e73] dark:text-[#86868b] text-sm font-mono border-l border-black/8 dark:border-white/8">
              /
            </span>
            <div className="flex items-center gap-1 px-2 bg-black/3 dark:bg-white/3 border-l border-black/8 dark:border-white/8">
              {["g", "i", "m"].map((f) => (
                <button
                  key={f}
                  className={`w-6 h-6 rounded text-xs font-mono font-bold transition-colors ${flags.includes(f) ? "bg-rose-500 text-white" : "text-[#6e6e73] dark:text-[#86868b] hover:bg-black/8 dark:hover:bg-white/8"}`}
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

        {/* Test text */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            Test text
          </p>
          <textarea
            className="w-full h-28 p-3 text-sm rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:border-rose-400 dark:focus:border-rose-600 transition-colors"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Result preview */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              Matches
            </p>
            {result.matches.length > 0 && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400">
                {result.matches.length} found
              </span>
            )}
          </div>
          <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-sm leading-relaxed min-h-[60px]">
            {renderHighlighted()}
          </div>
        </div>

        {/* Matches list */}
        {result.matches.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              Match list
            </p>
            <div className="flex flex-wrap gap-2">
              {result.matches.map((m, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-lg text-xs font-mono bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
