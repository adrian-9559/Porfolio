"use client";
import { useState } from "react";
import { useT } from "@/hooks/useT";
import { copyToClipboard } from "@/lib/clipboard";

type Mode = "jsonToYaml" | "yamlToJson";

/* ── Minimal YAML serializer (JSON → YAML) ── */
function jsonToYaml(value: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);

  if (value === null || value === undefined) return "null";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);
  if (typeof value === "string") {
    if (value.includes("\n")) {
      const lines = value.split("\n");
      return "|\n" + lines.map((l) => pad + "  " + l).join("\n");
    }
    if (
      /[:{}\[\],&*?|>!%@`#'"]/.test(value) ||
      value.trim() !== value ||
      value === "" ||
      /^\d/.test(value) ||
      /^(true|false|null|yes|no)$/i.test(value)
    ) {
      return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
    }
    return value;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return (
      "\n" +
      value
        .map((item) => {
          const rendered = jsonToYaml(item, indent + 1);
          if (typeof item === "object" && item !== null && !Array.isArray(item)) {
            return pad + "-\n" + rendered;
          }
          return pad + "- " + rendered.trimStart();
        })
        .join("\n")
    );
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    return (
      "\n" +
      entries
        .map(([k, v]) => {
          const child = jsonToYaml(v, indent + 1);
          if (typeof v === "object" && v !== null && !Array.isArray(v) && Object.keys(v as Record<string, unknown>).length > 0) {
            return pad + k + ":" + child;
          }
          if (Array.isArray(v) && v.length > 0) {
            return pad + k + ":" + child;
          }
          return pad + k + ": " + child.trim();
        })
        .join("\n")
    );
  }
  return String(value);
}

/* ── Minimal YAML parser (YAML → JSON) ── */
function parseYamlLine(line: string): { indent: number; key: string | null; value: string } {
  const trimmed = line.replace(/\t/g, "  ");
  const indent = trimmed.length - trimmed.replace(/^ +/, "").length;
  const content = trimmed.trimStart();

  if (content === "" || content.startsWith("#")) {
    return { indent, key: null, value: "" };
  }

  const dashMatch = content.match(/^- (.*)/);
  if (dashMatch) {
    return { indent, key: "__list__", value: dashMatch[1].trim() };
  }

  const colonIdx = content.indexOf(":");
  if (colonIdx === -1) {
    return { indent, key: null, value: content };
  }

  const beforeColon = content.slice(0, colonIdx).trim();
  const afterColon = content.slice(colonIdx + 1).trim();

  if (beforeColon.includes(" ") || beforeColon === "") {
    return { indent, key: null, value: content };
  }

  return { indent, key: beforeColon, value: afterColon };
}

function parseScalar(val: string): unknown {
  const trimmed = val.trim();
  if (trimmed === "" || trimmed === "null") return null;
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  if (trimmed.startsWith("|")) {
    return trimmed.slice(1).trim();
  }
  return trimmed;
}

function yamlToJson(yaml: string): unknown {
  const lines = yaml.split("\n");
  const root: Record<string, unknown> = {};
  const stack: { indent: number; obj: Record<string, unknown>; list?: unknown[] }[] = [
    { indent: -1, obj: root },
  ];

  for (const rawLine of lines) {
    const { indent, key, value } = parseYamlLine(rawLine);
    if (key === null && value === "") continue;

    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];

    if (key === "__list__") {
      const currentList = parent.list || (parent.list = (parent.obj[parent.list ? "__list_pending__" : Object.keys(parent.obj).pop() || ""] as unknown[]));
      const parsed = parseScalar(value);
      if (typeof parsed === "string" && (parsed.startsWith("{") || parsed.startsWith("["))) {
        try { currentList.push(JSON.parse(parsed)); continue; } catch { void 0; }
      }
      currentList.push(parsed);
    } else if (key !== null) {
      if (value === "" || value.startsWith("|")) {
        const childObj: Record<string, unknown> = {};
        parent.obj[key] = childObj;
        stack.push({ indent, obj: childObj });
      } else if (value === "" && indent > stack[stack.length - 1].indent) {
        const list: unknown[] = [];
        parent.obj[key] = list;
        stack.push({ indent, obj: parent.obj, list });
      } else {
        parent.obj[key] = parseScalar(value);
      }
    }
  }

  return root;
}

function yamlToJsonSimple(yaml: string): unknown {
  const lines = yaml.split("\n");
  const result: Record<string, unknown> = {};
  let currentKey: string | null = null;
  let currentList: unknown[] | null = null;

  for (const rawLine of lines) {
    const { indent, key, value } = parseYamlLine(rawLine);
    if (key === null && value === "") continue;

    if (key === "__list__") {
      if (currentList) {
        currentList.push(parseScalar(value));
      }
      continue;
    }

    currentList = null;

    if (key !== null) {
      currentKey = key;
      if (value === "" || value === "|" || value === ">") {
        result[key] = [];
        currentList = result[key] as unknown[];
      } else if (value.startsWith("[")) {
        try {
          result[key] = JSON.parse(value);
        } catch {
          result[key] = parseScalar(value);
        }
      } else {
        result[key] = parseScalar(value);
      }
    }
  }

  return result;
}

/* ── Component ── */
export default function JsonYamlContent() {
  const { t } = useT();
  const [mode, setMode] = useState<Mode>("jsonToYaml");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      if (mode === "jsonToYaml") {
        const parsed = JSON.parse(input);
        setOutput(jsonToYaml(parsed).trim());
      } else {
        const parsed = yamlToJsonSimple(input);
        setOutput(JSON.stringify(parsed, null, 2));
      }
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t("blog.jsonYaml.errorInvalid"));
      setOutput("");
    }
  };

  const copy = async () => {
    if (await copyToClipboard(output)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const swap = () => {
    setMode((m) => (m === "jsonToYaml" ? "yamlToJson" : "jsonToYaml"));
    setInput(output);
    setOutput("");
    setError("");
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/50">
            {t("blog.jsonYaml.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.jsonYaml.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.jsonYaml.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.jsonYaml.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                mode === "jsonToYaml"
                  ? "bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-400"
                  : "bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/8 dark:hover:bg-white/8"
              }`}
              onClick={() => { setMode("jsonToYaml"); setOutput(""); setError(""); }}
            >
              JSON → YAML
            </button>
            <button
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                mode === "yamlToJson"
                  ? "bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-400"
                  : "bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/8 dark:hover:bg-white/8"
              }`}
              onClick={() => { setMode("yamlToJson"); setOutput(""); setError(""); }}
            >
              YAML → JSON
            </button>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/8 dark:hover:bg-white/8 transition-colors"
              onClick={swap}
            >
              ⇄ {t("blog.jsonYaml.swap")}
            </button>
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-600 text-white transition-colors"
              onClick={convert}
            >
              {t("blog.jsonYaml.convert")}
            </button>
          </div>
        </div>

        {/* Panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {mode === "jsonToYaml" ? "JSON" : "YAML"}
            </p>
            <textarea
              className="w-full h-64 p-3 text-xs font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
              placeholder={mode === "jsonToYaml" ? '{\n  "key": "value"\n}' : "key: value"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {mode === "jsonToYaml" ? "YAML" : "JSON"}
              </p>
              {output && (
                <button
                  className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline"
                  onClick={copy}
                >
                  {copied ? t("blog.jsonYaml.copied") : t("blog.jsonYaml.copy")}
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
