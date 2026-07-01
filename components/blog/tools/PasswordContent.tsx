"use client";
import { useState, useCallback } from "react";

const CHARS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?",
};

function generatePassword(
  length: number,
  opts: {
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    symbols: boolean;
  },
): string {
  let charset = "";
  const guaranteed: string[] = [];

  if (opts.lowercase) {
    charset += CHARS.lowercase;
    guaranteed.push(
      CHARS.lowercase[Math.floor(Math.random() * CHARS.lowercase.length)],
    );
  }
  if (opts.uppercase) {
    charset += CHARS.uppercase;
    guaranteed.push(
      CHARS.uppercase[Math.floor(Math.random() * CHARS.uppercase.length)],
    );
  }
  if (opts.numbers) {
    charset += CHARS.numbers;
    guaranteed.push(
      CHARS.numbers[Math.floor(Math.random() * CHARS.numbers.length)],
    );
  }
  if (opts.symbols) {
    charset += CHARS.symbols;
    guaranteed.push(
      CHARS.symbols[Math.floor(Math.random() * CHARS.symbols.length)],
    );
  }

  if (!charset) return "";

  const arr = new Uint32Array(length);

  crypto.getRandomValues(arr);
  const rest = Array.from(arr).map((n) => charset[n % charset.length]);

  // Fill guaranteed chars into random positions
  const result = [...rest];

  guaranteed.forEach((ch, i) => {
    result[i % length] = ch;
  });

  // Shuffle
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join("");
}

function getStrength(
  pw: string,
  opts: {
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    symbols: boolean;
  },
) {
  if (!pw) return { label: "", score: 0, color: "" };
  let score = 0;

  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (pw.length >= 20) score++;
  if (opts.uppercase && opts.lowercase) score++;
  if (opts.numbers) score++;
  if (opts.symbols) score++;

  if (score <= 2) return { label: "Débil", score: 1, color: "bg-red-500" };
  if (score <= 3) return { label: "Regular", score: 2, color: "bg-amber-500" };
  if (score <= 4) return { label: "Buena", score: 3, color: "bg-emerald-500" };

  return { label: "Fuerte", score: 4, color: "bg-blue-500" };
}

const CheckOption = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <label className="flex items-center gap-3 cursor-pointer group select-none">
    <div
      className={`w-10 h-6 rounded-full transition-colors duration-200 flex-shrink-0 relative cursor-pointer ${
        checked ? "bg-blue-500" : "bg-black/10 dark:bg-white/15"
      }`}
      onClick={() => onChange(!checked)}
    >
      <div
        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${
          checked ? "left-5" : "left-1"
        }`}
      />
    </div>
    <span className="text-sm font-medium text-[#3d3d3d] dark:text-[#c0c0c5] group-hover:text-[#1d1d1f] dark:group-hover:text-white transition-colors">
      {label}
    </span>
  </label>
);

export default function PasswordContent() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: false,
  });
  const [password, setPassword] = useState(() =>
    generatePassword(16, {
      lowercase: true,
      uppercase: true,
      numbers: true,
      symbols: false,
    }),
  );
  const [copied, setCopied] = useState(false);

  const activeCount = Object.values(opts).filter(Boolean).length;

  const generate = useCallback(() => {
    setPassword(generatePassword(length, opts));
    setCopied(false);
  }, [length, opts]);

  const handleOpt = (key: keyof typeof opts, value: boolean) => {
    const next = { ...opts, [key]: value };
    const active = Object.values(next).filter(Boolean).length;

    if (active === 0) return; // keep at least 1 option
    setOpts(next);
    setPassword(generatePassword(length, next));
    setCopied(false);
  };

  const handleLength = (v: number) => {
    setLength(v);
    setPassword(generatePassword(v, opts));
    setCopied(false);
  };

  const copy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = getStrength(password, opts);

  return (
    <article className="max-w-2xl">
      {/* Header */}
      <div className="space-y-3 mb-10">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50">
            Herramienta
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            Uso libre
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          Generador de contraseñas
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          Crea contraseñas seguras y aleatorias al instante. Personaliza la
          longitud y los tipos de caracteres.
        </p>
      </div>

      {/* Generator card */}
      <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 space-y-6">
        {/* Password display */}
        <div className="relative">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#f5f5f7] dark:bg-[#1c1c22] border border-black/6 dark:border-white/8">
            <p
              className={`flex-1 font-mono text-base tracking-widest break-all ${password ? "text-[#1d1d1f] dark:text-white" : "text-[#aeaeb2]"}`}
            >
              {password || "—"}
            </p>
            <button
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                copied
                  ? "bg-emerald-500 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
              disabled={!password}
              onClick={copy}
            >
              {copied ? (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                    />
                  </svg>
                  Copiado
                </>
              ) : (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  Copiar
                </>
              )}
            </button>
          </div>
        </div>

        {/* Strength indicator */}
        {password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest">
                Fortaleza
              </p>
              <p
                className={`text-xs font-semibold ${
                  strength.score === 1
                    ? "text-red-500"
                    : strength.score === 2
                      ? "text-amber-500"
                      : strength.score === 3
                        ? "text-emerald-500"
                        : "text-blue-500"
                }`}
              >
                {strength.label}
              </p>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    s <= strength.score
                      ? strength.color
                      : "bg-black/8 dark:bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-black/6 dark:border-white/6" />

        {/* Length slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
              Longitud
            </p>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 tabular-nums">
              {length}
            </span>
          </div>
          <input
            className="w-full h-1.5 appearance-none bg-black/10 dark:bg-white/15 rounded-full outline-none cursor-pointer accent-blue-500"
            max={64}
            min={6}
            type="range"
            value={length}
            onChange={(e) => handleLength(Number(e.target.value))}
          />
          <div className="flex justify-between text-xs text-[#aeaeb2] dark:text-[#636366]">
            <span>6</span>
            <span>64</span>
          </div>
        </div>

        {/* Character options */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
            Incluir
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CheckOption
              checked={opts.lowercase}
              label="Minúsculas (a-z)"
              onChange={(v) => handleOpt("lowercase", v)}
            />
            <CheckOption
              checked={opts.uppercase}
              label="Mayúsculas (A-Z)"
              onChange={(v) => handleOpt("uppercase", v)}
            />
            <CheckOption
              checked={opts.numbers}
              label="Números (0-9)"
              onChange={(v) => handleOpt("numbers", v)}
            />
            <CheckOption
              checked={opts.symbols}
              label="Símbolos (!@#...)"
              onChange={(v) => handleOpt("symbols", v)}
            />
          </div>
        </div>

        {/* Generate button */}
        <button
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-semibold text-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
          onClick={generate}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          Generar nueva contraseña
        </button>
      </div>

      {/* Tips */}
      <div className="mt-8 p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-3">
        <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 uppercase tracking-wider">
          Consejos de seguridad
        </p>
        <ul className="space-y-2">
          {[
            "Usa contraseñas de al menos 12 caracteres para mayor seguridad.",
            "Combina mayúsculas, minúsculas, números y símbolos.",
            "Nunca uses la misma contraseña en varios servicios.",
            "Usa un gestor de contraseñas como Bitwarden o 1Password.",
          ].map((tip, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-xs text-blue-700 dark:text-blue-400"
            >
              <svg
                className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                />
              </svg>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
