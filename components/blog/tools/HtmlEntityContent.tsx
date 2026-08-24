"use client";
import { useState } from "react";
import { useT } from "@/hooks/useT";

const ENCODE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;",
  "\u00A0": "&nbsp;",
};

const REVERSE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(ENCODE_MAP).map(([k, v]) => [v, k]),
);

const COMMON_ENTITIES = [
  { char: "&", entity: "&amp;", name: "ampersand" },
  { char: "<", entity: "&lt;", name: "less-than" },
  { char: ">", entity: "&gt;", name: "greater-than" },
  { char: '"', entity: "&quot;", name: "quotation mark" },
  { char: "'", entity: "&#x27;", name: "apostrophe" },
  { char: "`", entity: "&#x60;", name: "grave accent" },
  { char: "\u00A0", entity: "&nbsp;", name: "non-breaking space" },
  { char: "\u00E9", entity: "&eacute;", name: "e acute" },
  { char: "\u00F1", entity: "&ntilde;", name: "n tilde" },
  { char: "\u00FC", entity: "&uuml;", name: "u umlaut" },
  { char: "\u20AC", entity: "&euro;", name: "euro sign" },
  { char: "\u00A9", entity: "&copy;", name: "copyright" },
];

function encodeToEntities(input: string): string {
  return Array.from(input)
    .map((ch) => {
      if (ENCODE_MAP[ch]) return ENCODE_MAP[ch];
      const code = ch.charCodeAt(0);
      if (code > 127) return `&#x${code.toString(16).toUpperCase()};`;
      return ch;
    })
    .join("");
}

function decodeFromEntities(input: string): string {
  return input.replace(
    /(&#x([0-9a-fA-F]+);|&([a-zA-Z]+);)/g,
    (_, _hex, hexVal, named) => {
      if (hexVal) return String.fromCodePoint(parseInt(hexVal, 16));
      if (named && REVERSE_MAP[`&${named};`]) return REVERSE_MAP[`&${named};`];
      if (named) {
        try {
          const el = document.createElement("span");
          el.innerHTML = `&${named};`;
          return el.textContent || _;
        } catch {
          return _;
        }
      }
      return _;
    },
  );
}

export default function HtmlEntityContent() {
  const { t } = useT();
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const output = mode === "encode" ? encodeToEntities(input) : decodeFromEntities(input);

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
            {t("blog.htmlEntity.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.htmlEntity.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.htmlEntity.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.htmlEntity.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Mode toggle */}
        <div className="flex gap-1 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.04]">
          <button
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${mode === "encode" ? "bg-white dark:bg-[#1c1c22] text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"}`}
            onClick={() => setMode("encode")}
          >
            {t("blog.htmlEntity.encode")}
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${mode === "decode" ? "bg-white dark:bg-[#1c1c22] text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"}`}
            onClick={() => setMode("decode")}
          >
            {t("blog.htmlEntity.decode")}
          </button>
        </div>

        {/* Input */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            {mode === "encode" ? t("blog.htmlEntity.originalText") : t("blog.htmlEntity.encodedText")}
          </p>
          <textarea
            className="w-full h-28 p-3 text-sm font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
            placeholder={mode === "encode" ? '<h1>Hola & "mundo"</h1>' : "&lt;h1&gt;Hola &amp; &quot;mundo&quot;&lt;/h1&gt;"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Output */}
        {input && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {mode === "encode" ? t("blog.htmlEntity.encodedText") : t("blog.htmlEntity.originalText")}
              </p>
              <button
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                onClick={copy}
              >
                {copied ? t("blog.htmlEntity.copied") : t("blog.htmlEntity.copy")}
              </button>
            </div>
            <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/40 font-mono text-sm text-[#1d1d1f] dark:text-white break-all min-h-[60px]">
              {output}
            </div>
          </div>
        )}

        {/* Reference table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            {t("blog.htmlEntity.reference")}
          </p>
          <div className="rounded-xl border border-black/8 dark:border-white/8 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-black/[0.03] dark:bg-white/[0.03]">
                  <th className="px-3 py-2 text-left text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                    {t("blog.htmlEntity.character")}
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                    {t("blog.htmlEntity.entityCode")}
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                    {t("blog.htmlEntity.name")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMMON_ENTITIES.map((e) => (
                  <tr key={e.entity} className="border-t border-black/5 dark:border-white/5">
                    <td className="px-3 py-1.5 font-mono text-[#1d1d1f] dark:text-white">{e.char}</td>
                    <td className="px-3 py-1.5 font-mono text-indigo-600 dark:text-indigo-400">{e.entity}</td>
                    <td className="px-3 py-1.5 text-[#6e6e73] dark:text-[#86868b]">{e.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </article>
  );
}
