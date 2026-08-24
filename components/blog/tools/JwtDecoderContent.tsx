"use client";
import { useState, useMemo } from "react";
import { useT } from "@/hooks/useT";

interface JwtParts {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  expired: boolean;
}

function base64UrlDecode(str: string): string {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  return atob(padded);
}

function decodeJwt(token: string): JwtParts | null {
  const parts = token.trim().split(".");
  if (parts.length < 2 || parts.length > 3) return null;
  try {
    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    const signature = parts[2] || "";
    const now = Math.floor(Date.now() / 1000);
    const exp = payload.exp;
    const expired = typeof exp === "number" && exp < now;
    return { header, payload, signature, expired };
  } catch {
    return null;
  }
}

function formatDate(ts: number): string {
  return new Date(ts * 1000).toLocaleString(undefined, {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
}

function jsonStr(obj: Record<string, unknown>): string {
  return JSON.stringify(obj, null, 2);
}

const C = {
  header: { bg: "bg-blue-50 dark:bg-blue-950/20", border: "border-blue-200 dark:border-blue-800/40", label: "text-blue-700 dark:text-blue-400", text: "text-blue-900 dark:text-blue-300" },
  payload: { bg: "bg-emerald-50 dark:bg-emerald-950/20", border: "border-emerald-200 dark:border-emerald-800/40", label: "text-emerald-700 dark:text-emerald-400", text: "text-emerald-900 dark:text-emerald-300" },
  signature: { bg: "bg-rose-50 dark:bg-rose-950/20", border: "border-rose-200 dark:border-rose-800/40", label: "text-rose-700 dark:text-rose-400", text: "text-rose-900 dark:text-rose-300" },
} as const;

export default function JwtDecoderContent() {
  const { t } = useT();
  const [token, setToken] = useState("");
  const [copied, setCopied] = useState<"header" | "payload" | null>(null);

  const decoded = useMemo<JwtParts | null>(() => (token ? decodeJwt(token) : null), [token]);

  const copy = (text: string, key: "header" | "payload") => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const iss = decoded ? String(decoded.payload.iss ?? "") : "";
  const sub = decoded ? String(decoded.payload.sub ?? "") : "";
  const iat = decoded && typeof decoded.payload.iat === "number" ? decoded.payload.iat : null;
  const exp = decoded && typeof decoded.payload.exp === "number" ? decoded.payload.exp : null;
  const hasMeta = decoded && (iss || sub || iat !== null || exp !== null);

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/50">
            {t("blog.jwtDecoder.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.jwtDecoder.freeToUse")}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>
          {t("blog.jwtDecoder.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.jwtDecoder.desc")}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            {t("blog.jwtDecoder.pasteToken")}
          </p>
          <textarea
            className="w-full h-24 p-3 text-xs font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
            placeholder="eyJhbGciOiJIUzI1NiIs..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>

        {decoded && (
          <div className="space-y-3">
            {decoded.expired && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-sm text-red-700 dark:text-red-400 flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
                {t("blog.jwtDecoder.expired")}
              </div>
            )}

            {hasMeta && (
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 space-y-1.5 text-xs">
                {iss && (
                  <div className="flex gap-2">
                    <span className="font-semibold text-[#6e6e73] dark:text-[#86868b]">{t("blog.jwtDecoder.issuer")}:</span>
                    <span className="text-[#1d1d1f] dark:text-white font-mono">{iss}</span>
                  </div>
                )}
                {sub && (
                  <div className="flex gap-2">
                    <span className="font-semibold text-[#6e6e73] dark:text-[#86868b]">{t("blog.jwtDecoder.subject")}:</span>
                    <span className="text-[#1d1d1f] dark:text-white font-mono">{sub}</span>
                  </div>
                )}
                {iat !== null && (
                  <div className="flex gap-2">
                    <span className="font-semibold text-[#6e6e73] dark:text-[#86868b]">{t("blog.jwtDecoder.issuedAt")}:</span>
                    <span className="text-[#1d1d1f] dark:text-white font-mono">{formatDate(iat)}</span>
                  </div>
                )}
                {exp !== null && (
                  <div className="flex gap-2">
                    <span className="font-semibold text-[#6e6e73] dark:text-[#86868b]">{t("blog.jwtDecoder.expires")}:</span>
                    <span className={`font-mono ${decoded.expired ? "text-red-600 dark:text-red-400" : "text-[#1d1d1f] dark:text-white"}`}>
                      {formatDate(exp)}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className={`p-4 rounded-xl ${C.header.bg} border ${C.header.border}`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`text-xs font-semibold uppercase tracking-wider ${C.header.label}`}>{t("blog.jwtDecoder.header")}</p>
                <button className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline" onClick={() => copy(jsonStr(decoded.header), "header")}>
                  {copied === "header" ? t("blog.jwtDecoder.copied") : t("blog.jwtDecoder.copy")}
                </button>
              </div>
              <pre className={`text-xs font-mono whitespace-pre-wrap break-all ${C.header.text}`}>{jsonStr(decoded.header)}</pre>
            </div>

            <div className={`p-4 rounded-xl ${C.payload.bg} border ${C.payload.border}`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`text-xs font-semibold uppercase tracking-wider ${C.payload.label}`}>{t("blog.jwtDecoder.payload")}</p>
                <button className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline" onClick={() => copy(jsonStr(decoded.payload), "payload")}>
                  {copied === "payload" ? t("blog.jwtDecoder.copied") : t("blog.jwtDecoder.copy")}
                </button>
              </div>
              <pre className={`text-xs font-mono whitespace-pre-wrap break-all ${C.payload.text}`}>{jsonStr(decoded.payload)}</pre>
            </div>

            <div className={`p-4 rounded-xl ${C.signature.bg} border ${C.signature.border}`}>
              <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${C.signature.label}`}>{t("blog.jwtDecoder.signature")}</p>
              <p className={`text-xs font-mono break-all ${C.signature.text}`}>{decoded.signature || "\u2014"}</p>
            </div>
          </div>
        )}

        {token && !decoded && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-sm text-red-700 dark:text-red-400">
            {t("blog.jwtDecoder.invalid")}
          </div>
        )}
      </div>
    </article>
  );
}
