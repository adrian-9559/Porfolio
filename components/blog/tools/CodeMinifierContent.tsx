"use client";
import { useState } from "react";
import { useT } from "@/hooks/useT";
import { copyToClipboard } from "@/lib/clipboard";

type Language = "html" | "css" | "js";

function minifyHtml(code: string): string {
  return code
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/> </g, "><")
    .trim();
}

function minifyCss(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s*{\s*/g, "{")
    .replace(/\s*}\s*/g, "}")
    .replace(/\s*:\s*/g, ":")
    .replace(/\s*;\s*/g, ";")
    .replace(/\s*,\s*/g, ",")
    .replace(/\n/g, "")
    .trim();
}

function minifyJs(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "")
    .replace(/\s*([{}();,=+\-<>!&|?:])\s*/g, "$1")
    .replace(/\n/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

const minifiers: Record<Language, (code: string) => string> = {
  html: minifyHtml,
  css: minifyCss,
  js: minifyJs,
};

export default function CodeMinifierContent() {
  const { t } = useT();
  const [language, setLanguage] = useState<Language>("html");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const originalSize = new Blob([input]).size;
  const minifiedSize = new Blob([output]).size;
  const savings = originalSize > 0 ? Math.round((1 - minifiedSize / originalSize) * 100) : 0;

  const minify = () => {
    setOutput(minifiers[language](input));
  };

  const copy = async () => {
    if (await copyToClipboard(output)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const placeholders: Record<Language, string> = {
    html: '<!-- Comentario -->\n<div class="container">\n  <p>Hola mundo</p>\n</div>',
    css: "/* Comentario */\n.container {\n  margin: 0 auto;\n  padding: 20px;\n}",
    js: "// Comentario\nfunction hola() {\n  const x = 1;\n  return x;\n}",
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50">
            {t("blog.codeMinifier.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.codeMinifier.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.codeMinifier.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.codeMinifier.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            {(["html", "css", "js"] as Language[]).map((lang) => (
              <button
                key={lang}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-colors ${
                  language === lang
                    ? "bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-400"
                    : "bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/8 dark:hover:bg-white/8"
                }`}
                onClick={() => { setLanguage(lang); setOutput(""); }}
              >
                {lang}
              </button>
            ))}
          </div>
          <button
            className="ml-auto px-4 py-1.5 rounded-lg text-xs font-semibold bg-violet-500 hover:bg-violet-600 text-white transition-colors"
            onClick={minify}
          >
            {t("blog.codeMinifier.minify")}
          </button>
        </div>

        {/* Panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.codeMinifier.input")}
            </p>
            <textarea
              className="w-full h-64 p-3 text-xs font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:border-violet-400 dark:focus:border-violet-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
              placeholder={placeholders[language]}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
              {originalSize} {t("blog.codeMinifier.bytes")}
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {t("blog.codeMinifier.output")}
              </p>
              {output && (
                <button
                  className="text-xs text-violet-600 dark:text-violet-400 hover:underline"
                  onClick={copy}
                >
                  {copied ? t("blog.codeMinifier.copied") : t("blog.codeMinifier.copy")}
                </button>
              )}
            </div>
            <textarea
              readOnly
              className="w-full h-64 p-3 text-xs font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none"
              value={output}
            />
            {output && (
              <div className="flex items-center gap-3 text-xs">
                <span className="text-[#6e6e73] dark:text-[#86868b]">
                  {minifiedSize} {t("blog.codeMinifier.bytes")}
                </span>
                <span className="font-semibold text-violet-600 dark:text-violet-400">
                  −{savings}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
