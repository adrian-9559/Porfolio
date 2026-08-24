"use client";
import { useState } from "react";
import { useT } from "@/hooks/useT";

export default function Base64Content() {
  const { t } = useT();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const process = () => {
    setError("");
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch {
      setError(
        mode === "decode"
          ? t("blog.base64.errorInvalid")
          : t("blog.base64.errorEncode"),
      );
      setOutput("");
    }
  };

  const swap = () => {
    setInput(output);
    setOutput("");
    setError("");
    setMode((m) => (m === "encode" ? "decode" : "encode"));
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
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50">
            {t("blog.base64.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.base64.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.base64.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.base64.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Mode toggle */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] w-fit">
          {(["encode", "decode"] as const).map((m) => (
            <button
              key={m}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${mode === m ? "bg-white dark:bg-[#1c1c22] text-sky-600 dark:text-sky-400 shadow-sm" : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"}`}
              onClick={() => {
                setMode(m);
                setOutput("");
                setError("");
              }}
            >
              {m === "encode" ? t("blog.base64.encode") : t("blog.base64.decode")}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            {mode === "encode" ? t("blog.base64.originalText") : t("blog.base64.base64String")}
          </p>
          <textarea
            className="w-full h-36 p-3 text-sm font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:border-sky-400 dark:focus:border-sky-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
            placeholder={
              mode === "encode" ? t("blog.base64.placeholderEncode") : t("blog.base64.placeholderDecode")
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-sky-500 hover:bg-sky-600 text-white transition-colors"
            onClick={process}
          >
            {mode === "encode" ? t("blog.base64.encodeBtn") : t("blog.base64.decodeBtn")}
          </button>
          <button
            className="px-3 py-2 rounded-lg text-sm font-semibold bg-black/8 dark:bg-white/8 text-[#1d1d1f] dark:text-white hover:bg-black/12 dark:hover:bg-white/12 transition-colors disabled:opacity-40"
            disabled={!output}
            onClick={swap}
          >
            {t("blog.base64.swap")}
          </button>
          <button
            className="px-3 py-2 rounded-lg text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            onClick={clear}
          >
            {t("blog.base64.clear")}
          </button>
        </div>

        {/* Output */}
        {output && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {mode === "encode" ? "Base64" : t("blog.base64.decodedText")}
              </p>
              <button
                className="text-xs text-sky-600 dark:text-sky-400 hover:underline"
                onClick={copy}
              >
                {copied ? t("blog.base64.copied") : t("blog.base64.copy")}
              </button>
            </div>
            <div className="p-3 rounded-xl bg-sky-50/60 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800/40 font-mono text-sm text-[#1d1d1f] dark:text-white break-all">
              {output}
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-sm text-red-700 dark:text-red-400">
            ⚠️ {error}
          </div>
        )}

        {/* Info */}
        <div className="mt-6 p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/8 dark:border-white/8 space-y-1.5">
          <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
            {t("blog.base64.infoTitle")}
          </p>
          <ul className="text-xs text-[#6e6e73] dark:text-[#86868b] space-y-1">
            <li>
              • {t("blog.base64.infoItem1")} (
              <code className="font-mono">Authorization: Basic ...</code>)
            </li>
            <li>
              • {t("blog.base64.infoItem2")}{" "}
              <code className="font-mono">data:image/png;base64,...</code>
            </li>
            <li>
              • {t("blog.base64.infoItem3")}
            </li>
            <li>• {t("blog.base64.infoItem4")}</li>
          </ul>
        </div>
      </div>
    </article>
  );
}
