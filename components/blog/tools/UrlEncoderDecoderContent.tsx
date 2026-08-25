"use client";
import { useState, useMemo } from "react";
import { useT } from "@/hooks/useT";
import { copyToClipboard } from "@/lib/clipboard";

type Mode = "encode" | "decode";

function encodeUrl(input: string, double: boolean): string {
  let result = encodeURIComponent(input);
  if (double) result = encodeURIComponent(result);

  return result;
}

function encodeComponent(input: string, double: boolean): string {
  let result = encodeURI(input);
  if (double) result = encodeURI(result);

  return result;
}

function decodeUrl(input: string): string {
  try {
    return decodeURIComponent(input);
  } catch {
    try {
      return decodeURI(input);
    } catch {
      return input;
    }
  }
}

function isEncoded(input: string): boolean {
  return /%[0-9A-Fa-f]{2}/.test(input);
}

export default function UrlEncoderDecoderContent() {
  const { t } = useT();
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("encode");
  const [encodeType, setEncodeType] = useState<"full" | "component">("full");
  const [doubleEncode, setDoubleEncode] = useState(false);
  const [copied, setCopied] = useState(false);

  const autoDetected = useMemo(() => (input ? isEncoded(input) : null), [input]);

  const result = useMemo(() => {
    if (!input) return "";
    if (mode === "decode") return decodeUrl(input);

    return encodeType === "full" ? encodeUrl(input, doubleEncode) : encodeComponent(input, doubleEncode);
  }, [input, mode, encodeType, doubleEncode]);

  const copy = async () => {
    if (await copyToClipboard(result)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/50">
            {t("blog.urlEncoderDecoder.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.urlEncoderDecoder.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.urlEncoderDecoder.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.urlEncoderDecoder.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Mode tabs */}
        <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.04]">
          {(["encode", "decode"] as const).map((m) => (
            <button
              key={m}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${mode === m ? "bg-white dark:bg-[#1c1c22] text-cyan-600 dark:text-cyan-400 shadow-sm" : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"}`}
              onClick={() => setMode(m)}
            >
              {t(`blog.urlEncoderDecoder.${m}`)}
            </button>
          ))}
        </div>

        {/* Encode options */}
        {mode === "encode" && (
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-[#6e6e73] dark:text-[#86868b]">
                {t("blog.urlEncoderDecoder.type")}:
              </label>
              <select
                className="px-2 py-1 text-xs font-mono rounded-lg bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white focus:outline-none"
                value={encodeType}
                onChange={(e) => setEncodeType(e.target.value as "full" | "component")}
              >
                <option value="full">{t("blog.urlEncoderDecoder.fullEncode")}</option>
                <option value="component">{t("blog.urlEncoderDecoder.componentEncode")}</option>
              </select>
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-4 h-4 rounded accent-cyan-500"
                checked={doubleEncode}
                onChange={(e) => setDoubleEncode(e.target.checked)}
              />
              <span className="text-xs font-medium text-[#6e6e73] dark:text-[#86868b]">
                {t("blog.urlEncoderDecoder.double")}
              </span>
            </label>
          </div>
        )}

        {/* Auto-detect badge */}
        {autoDetected !== null && (
          <div className={`p-2 rounded-lg text-xs font-medium ${autoDetected ? "bg-cyan-50 dark:bg-cyan-950/20 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/40" : "bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b]"}`}>
            {autoDetected ? t("blog.urlEncoderDecoder.detectedEncoded") : t("blog.urlEncoderDecoder.detectedPlain")}
          </div>
        )}

        {/* Input */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            {t("blog.urlEncoderDecoder.input")}
          </p>
          <textarea
            className="w-full h-24 p-3 text-xs font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
            placeholder={mode === "encode" ? "Hello World! https://example.com" : "Hello%20World%21%20https%3A%2F%2Fexample.com"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Output */}
        {input && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {mode === "encode" ? t("blog.urlEncoderDecoder.encoded") : t("blog.urlEncoderDecoder.decoded")}
              </p>
              <button
                className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline"
                onClick={copy}
              >
                {copied ? t("blog.urlEncoderDecoder.copied") : t("blog.urlEncoderDecoder.copy")}
              </button>
            </div>
            <div className="p-3 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800/40 font-mono text-xs text-[#1d1d1f] dark:text-white break-all">
              {result}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
