"use client";
import { useState, useMemo } from "react";
import { useT } from "@/hooks/useT";

interface Analysis {
  length: number;
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
  entropy: number;
  crackTime: string;
  strength: number;
  suggestions: string[];
}

const COMMON_PASSWORDS = [
  "password", "123456", "12345678", "qwerty", "abc123", "monkey", "master",
  "dragon", "letmein", "login", "princess", "football", "shadow", "sunshine",
  "trustno1", "iloveyou", "batman", "access", "hello", "charlie", "password1",
];

const COMMON_PATTERNS = [
  /^(.)\1+$/,
  /^(012|123|234|345|456|567|678|789|890)+/,
  /^(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)+/i,
  /^(qwerty|asdf|zxcv|wasd)/i,
];

function analyzePassword(pw: string): Analysis {
  const length = pw.length;
  const hasLowercase = /[a-z]/.test(pw);
  const hasUppercase = /[A-Z]/.test(pw);
  const hasNumbers = /[0-9]/.test(pw);
  const hasSymbols = /[^a-zA-Z0-9]/.test(pw);

  // Entropy calculation
  let charsetSize = 0;

  if (hasLowercase) charsetSize += 26;
  if (hasUppercase) charsetSize += 26;
  if (hasNumbers) charsetSize += 10;
  if (hasSymbols) charsetSize += 33;
  if (charsetSize === 0) charsetSize = 26;

  const entropy = Math.round(length * Math.log2(charsetSize));

  // Crack time estimation (10 billion guesses/sec)
  const combinations = Math.pow(charsetSize, length);
  const seconds = combinations / 10_000_000_000;

  let crackTime: string;

  if (seconds < 1) crackTime = "< 1 second";
  else if (seconds < 60) crackTime = `${Math.round(seconds)} seconds`;
  else if (seconds < 3600) crackTime = `${Math.round(seconds / 60)} minutes`;
  else if (seconds < 86400) crackTime = `${Math.round(seconds / 3600)} hours`;
  else if (seconds < 31536000) crackTime = `${Math.round(seconds / 86400)} days`;
  else if (seconds < 31536000 * 1000) crackTime = `${Math.round(seconds / 31536000)} years`;
  else if (seconds < 31536000 * 1_000_000) crackTime = `${Math.round(seconds / 31536000 / 1000)}k years`;
  else if (seconds < 31536000 * 1_000_000_000) crackTime = `${Math.round(seconds / 31536000 / 1_000_000)}M years`;
  else crackTime = "centuries+";

  // Strength score
  let score = 0;

  if (length >= 8) score++;
  if (length >= 12) score++;
  if (length >= 16) score++;
  if (hasLowercase && hasUppercase) score++;
  if (hasNumbers) score++;
  if (hasSymbols) score++;
  if (entropy >= 50) score++;
  if (entropy >= 70) score++;

  // Penalties
  if (COMMON_PASSWORDS.includes(pw.toLowerCase())) score = Math.min(score, 1);
  if (COMMON_PATTERNS.some((p) => p.test(pw))) score--;
  if (/^[a-zA-Z]+$/.test(pw) && length < 12) score--;

  const strength = Math.max(0, Math.min(4, Math.round(score / 2)));

  // Suggestions
  const suggestions: string[] = [];

  if (length < 12) suggestions.push("blog.passwordAnalyzer.suggestLength");
  if (!hasLowercase) suggestions.push("blog.passwordAnalyzer.suggestLowercase");
  if (!hasUppercase) suggestions.push("blog.passwordAnalyzer.suggestUppercase");
  if (!hasNumbers) suggestions.push("blog.passwordAnalyzer.suggestNumbers");
  if (!hasSymbols) suggestions.push("blog.passwordAnalyzer.suggestSymbols");
  if (COMMON_PASSWORDS.includes(pw.toLowerCase())) {
    suggestions.push("blog.passwordAnalyzer.suggestCommon");
  }
  if (COMMON_PATTERNS.some((p) => p.test(pw))) {
    suggestions.push("blog.passwordAnalyzer.suggestPattern");
  }

  return { length, hasLowercase, hasUppercase, hasNumbers, hasSymbols, entropy, crackTime, strength, suggestions };
}

const STRENGTH_CONFIG = [
  { label: "blog.passwordAnalyzer.veryWeak", color: "bg-red-500", textColor: "text-red-500" },
  { label: "blog.passwordAnalyzer.weak", color: "bg-orange-500", textColor: "text-orange-500" },
  { label: "blog.passwordAnalyzer.fair", color: "bg-amber-500", textColor: "text-amber-500" },
  { label: "blog.passwordAnalyzer.strong", color: "bg-emerald-500", textColor: "text-emerald-500" },
  { label: "blog.passwordAnalyzer.veryStrong", color: "bg-blue-500", textColor: "text-blue-500" },
];

export default function PasswordAnalyzerContent() {
  const { t } = useT();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const analysis = useMemo(() => analyzePassword(password), [password]);
  const config = STRENGTH_CONFIG[analysis.strength];

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
            {t("blog.passwordAnalyzer.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.passwordAnalyzer.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.passwordAnalyzer.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.passwordAnalyzer.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Password input */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 space-y-5">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.passwordAnalyzer.enterPassword")}
            </p>
            <div className="relative">
              <input
                className="w-full px-4 py-3 pr-12 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white font-mono text-lg focus:outline-none focus:border-amber-400 dark:focus:border-amber-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
                placeholder={t("blog.passwordAnalyzer.placeholder")}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aeaeb2] dark:text-[#636366] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                    <path
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Strength meter */}
          {password && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest">
                  {t("blog.passwordAnalyzer.strength")}
                </p>
                <p className={`text-xs font-semibold ${config.textColor}`}>
                  {t(config.label)}
                </p>
              </div>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                      s <= analysis.strength ? config.color : "bg-black/8 dark:bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          {password && (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03]">
                <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mb-1">
                  {t("blog.passwordAnalyzer.entropy")}
                </p>
                <p className="text-lg font-bold text-[#1d1d1f] dark:text-white tabular-nums">
                  {analysis.entropy} bits
                </p>
              </div>
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03]">
                <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mb-1">
                  {t("blog.passwordAnalyzer.crackTime")}
                </p>
                <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                  {analysis.crackTime}
                </p>
              </div>
            </div>
          )}

          {/* Character type badges */}
          {password && (
            <div className="flex flex-wrap gap-2">
              {[
                { active: analysis.hasLowercase, label: "a-z" },
                { active: analysis.hasUppercase, label: "A-Z" },
                { active: analysis.hasNumbers, label: "0-9" },
                { active: analysis.hasSymbols, label: "!@#" },
              ].map((badge) => (
                <span
                  key={badge.label}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    badge.active
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50"
                      : "bg-black/[0.03] dark:bg-white/[0.03] text-[#aeaeb2] dark:text-[#636366] border border-black/8 dark:border-white/8"
                  }`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Suggestions */}
        {password && analysis.suggestions.length > 0 && (
          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 space-y-3">
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
              {t("blog.passwordAnalyzer.suggestions")}
            </p>
            <ul className="space-y-2">
              {analysis.suggestions.map((key, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400"
                >
                  <svg
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tips */}
        <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/8 dark:border-white/8 space-y-1.5">
          <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
            {t("blog.passwordAnalyzer.tipsTitle")}
          </p>
          <ul className="text-xs text-[#6e6e73] dark:text-[#86868b] space-y-1">
            <li>• {t("blog.passwordAnalyzer.tip1")}</li>
            <li>• {t("blog.passwordAnalyzer.tip2")}</li>
            <li>• {t("blog.passwordAnalyzer.tip3")}</li>
          </ul>
        </div>
      </div>
    </article>
  );
}