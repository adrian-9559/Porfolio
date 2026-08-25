"use client";
import { useState } from "react";
import { useT } from "@/hooks/useT";
import { copyToClipboard } from "@/lib/clipboard";

type Mode = "jsonToCsv" | "csvToJson";

function escapeCsvField(val: string, sep: string): string {
  if (val.includes(sep) || val.includes('"') || val.includes("\n")) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

function parseCsvLine(line: string, sep: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === sep) {
        fields.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
  }
  fields.push(current);
  return fields;
}

export default function JsonCsvContent() {
  const { t } = useT();
  const [mode, setMode] = useState<Mode>("jsonToCsv");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [separator, setSeparator] = useState(",");

  const convert = () => {
    try {
      if (mode === "jsonToCsv") {
        const data = JSON.parse(input);
        const arr = Array.isArray(data) ? data : [data];
        if (arr.length === 0) {
          setOutput("");
          setError(t("blog.jsonCsv.emptyArray"));
          return;
        }

        const headers: string[] = Array.from(
          arr.reduce((set: Set<string>, obj: Record<string, unknown>) => {
            Object.keys(obj).forEach((k) => set.add(k));
            return set;
          }, new Set<string>())
        );

        const rows = [
          headers.map((h) => escapeCsvField(h, separator)).join(separator),
          ...arr.map((obj: Record<string, unknown>) =>
            headers
              .map((h) => {
                const val = obj[h];
                if (val === null || val === undefined) return "";
                if (typeof val === "object") return escapeCsvField(JSON.stringify(val), separator);
                return escapeCsvField(String(val), separator);
              })
              .join(separator)
          ),
        ];

        setOutput(rows.join("\n"));
        setError("");
      } else {
        const lines = input.trim().split("\n");
        if (lines.length < 2) {
          setError(t("blog.jsonCsv.needHeadersAndRows"));
          setOutput("");
          return;
        }

        const headers = parseCsvLine(lines[0], separator);
        const result = lines.slice(1).map((line) => {
          const values = parseCsvLine(line, separator);
          const obj: Record<string, string> = {};
          headers.forEach((h, i) => {
            obj[h] = values[i] ?? "";
          });
          return obj;
        });

        setOutput(JSON.stringify(result, null, 2));
        setError("");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t("blog.jsonCsv.errorInvalid"));
      setOutput("");
    }
  };

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
            {t("blog.jsonCsv.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.jsonCsv.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.jsonCsv.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.jsonCsv.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                mode === "jsonToCsv"
                  ? "bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-400"
                  : "bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/8 dark:hover:bg-white/8"
              }`}
              onClick={() => { setMode("jsonToCsv"); setOutput(""); setError(""); }}
            >
              JSON → CSV
            </button>
            <button
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                mode === "csvToJson"
                  ? "bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-400"
                  : "bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/8 dark:hover:bg-white/8"
              }`}
              onClick={() => { setMode("csvToJson"); setOutput(""); setError(""); }}
            >
              CSV → JSON
            </button>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-[#6e6e73] dark:text-[#86868b]">
              {t("blog.jsonCsv.separator")}
            </label>
            <select
              className="px-2 py-1 rounded-lg text-xs font-mono bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white focus:outline-none"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
            >
              <option value=",">, (comma)</option>
              <option value=";">; (semicolon)</option>
              <option value="&#9;">Tab</option>
              <option value="|">| (pipe)</option>
            </select>
          </div>
          <button
            className="ml-auto px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-600 text-white transition-colors"
            onClick={convert}
          >
            {t("blog.jsonCsv.convert")}
          </button>
        </div>

        {/* Panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {mode === "jsonToCsv" ? "JSON" : "CSV"}
            </p>
            <textarea
              className="w-full h-64 p-3 text-xs font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
              placeholder={
                mode === "jsonToCsv"
                  ? '[\n  { "name": "Ana", "age": 25 },\n  { "name": "Luis", "age": 30 }\n]'
                  : "name,age\nAna,25\nLuis,30"
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {mode === "jsonToCsv" ? "CSV" : "JSON"}
              </p>
              {output && (
                <button
                  className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline"
                  onClick={copy}
                >
                  {copied ? t("blog.jsonCsv.copied") : t("blog.jsonCsv.copy")}
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
