"use client";
import { useState } from "react";

export default function JsonFormatterContent() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const format = () => {
    try {
      const parsed = JSON.parse(input);

      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);

      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const validate = () => {
    try {
      JSON.parse(input);
      setError("");
      setOutput("✅ Valid JSON");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
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
          JSON Formatter
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          Format, minify, and validate JSON instantly. No servers, all in your
          browser.
        </p>
      </div>

      <div className="space-y-4">
        {/* Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-[#6e6e73] dark:text-[#86868b]">
              Indentation:
            </label>
            {[2, 4].map((n) => (
              <button
                key={n}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${indent === n ? "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400" : "bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/8 dark:hover:bg-white/8"}`}
                onClick={() => setIndent(n)}
              >
                {n} spaces
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors"
              onClick={format}
            >
              Format
            </button>
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/8 dark:bg-white/8 text-[#1d1d1f] dark:text-white hover:bg-black/12 dark:hover:bg-white/12 transition-colors"
              onClick={minify}
            >
              Minify
            </button>
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/8 dark:bg-white/8 text-[#1d1d1f] dark:text-white hover:bg-black/12 dark:hover:bg-white/12 transition-colors"
              onClick={validate}
            >
              Validate
            </button>
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              onClick={clear}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Editors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              Input
            </p>
            <textarea
              className="w-full h-64 p-3 text-xs font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:border-amber-400 dark:focus:border-amber-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
              placeholder='{"name": "John", "age": 30}'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                Output
              </p>
              {output && !output.startsWith("✅") && (
                <button
                  className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
                  onClick={copy}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
            <textarea
              readOnly
              className="w-full h-64 p-3 text-xs font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none"
              value={output}
            />
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-sm text-red-700 dark:text-red-400">
            ⚠️ {error}
          </div>
        )}
      </div>
    </article>
  );
}
