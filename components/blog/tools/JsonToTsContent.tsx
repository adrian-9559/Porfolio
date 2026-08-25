"use client";
import { useState, useMemo } from "react";
import { useT } from "@/hooks/useT";
import { copyToClipboard } from "@/lib/clipboard";

function jsonToTs(
  obj: unknown,
  indent = 0,
  useType = false,
  rootName = "Root",
): string {
  const pad = "  ".repeat(indent);
  const padInner = "  ".repeat(indent + 1);

  if (obj === null) return "null";
  if (obj === undefined) return "undefined";
  if (typeof obj === "string") return "string";
  if (typeof obj === "number") return Number.isInteger(obj) ? "number" : "number";
  if (typeof obj === "boolean") return "boolean";
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "unknown[]";
    const itemType = jsonToTs(obj[0], indent, useType);

    return `${itemType}[]`;
  }
  if (typeof obj === "object") {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    const lines = entries.map(([key, val]) => {
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
      const valType = jsonToTs(val, indent + 1, useType);

      return `${padInner}${safeKey}: ${valType};`;
    });
    const keyword = useType ? "type" : "interface";

    if (indent === 0) {
      return `${keyword} ${rootName} {\n${lines.join("\n")}\n}`;
    }

    return `{\n${lines.join("\n")}\n${pad}}`;
  }

  return "unknown";
}

function mergeObjects(arr: Record<string, unknown>[]): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  for (const obj of arr) {
    for (const [k, v] of Object.entries(obj)) {
      if (!(k in merged)) merged[k] = v;
    }
  }

  return merged;
}

function tryParseJson(input: string): unknown {
  const trimmed = input.trim();
  if (!trimmed) return undefined;

  return JSON.parse(trimmed);
}

export default function JsonToTsContent() {
  const { t } = useT();
  const [input, setInput] = useState("");
  const [useType, setUseType] = useState(false);
  const [rootName, setRootName] = useState("Root");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const output = useMemo(() => {
    if (!input.trim()) return "";
    try {
      const parsed = tryParseJson(input);
      setError("");
      if (parsed === undefined) return "";
      if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === "object" && parsed[0] !== null) {
        const merged = mergeObjects(parsed as Record<string, unknown>[]);

        return jsonToTs(merged, 0, useType, rootName);
      }

      return jsonToTs(parsed, 0, useType, rootName);
    } catch {
      setError(t("blog.jsonToTs.errorInvalid"));

      return "";
    }
  }, [input, useType, rootName, t]);

  const copy = async () => {
    if (await copyToClipboard(output)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/50">
            {t("blog.jsonToTs.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.jsonToTs.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.jsonToTs.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.jsonToTs.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Options */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.jsonToTs.typeName")}
            </label>
            <input
              className="px-2.5 py-1 text-sm rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-600 transition-colors w-28"
              value={rootName}
              onChange={(e) => setRootName(e.target.value)}
            />
          </div>
          <div className="flex gap-1 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.04]">
            <button
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${!useType ? "bg-white dark:bg-[#1c1c22] text-cyan-600 dark:text-cyan-400 shadow-sm" : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"}`}
              onClick={() => setUseType(false)}
            >
              interface
            </button>
            <button
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${useType ? "bg-white dark:bg-[#1c1c22] text-cyan-600 dark:text-cyan-400 shadow-sm" : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"}`}
              onClick={() => setUseType(true)}
            >
              type
            </button>
          </div>
        </div>

        {/* Input / Output split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.jsonToTs.jsonInput")}
            </p>
            <textarea
              className="w-full h-64 p-3 text-sm font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
              placeholder='{"name": "Adrián", "age": 29, "tags": ["dev"]}'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                TypeScript
              </p>
              {output && (
                <button
                  className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline"
                  onClick={copy}
                >
                  {copied ? t("blog.jsonToTs.copied") : t("blog.jsonToTs.copy")}
                </button>
              )}
            </div>
            <div className="h-64 p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 overflow-auto">
              {error ? (
                <p className="text-sm text-red-600 dark:text-red-400">⚠️ {error}</p>
              ) : output ? (
                <pre className="text-sm font-mono text-[#1d1d1f] dark:text-white whitespace-pre-wrap break-all">
                  {output}
                </pre>
              ) : (
                <p className="text-sm text-[#aeaeb2] dark:text-[#636366]">
                  {t("blog.jsonToTs.placeholder")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
