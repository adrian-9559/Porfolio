"use client";
import { useState } from "react";
import { apiFetch } from "../../services/apiClient";

interface ToolResult {
  original: string;
  result: string;
  originalTokens: number;
  resultTokens: number;
  savedPercent: number;
}

export default function TokenOptimizerContent() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ToolResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<ToolResult>("/tools/optimize-tokens", {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1d1d1f] dark:text-white mb-2">Token Optimizer</h1>
        <p className="text-[#6e6e73] dark:text-[#86868b] text-sm">
          Reescribe tu texto aplicando contracciones y sustituciones semánticas para obtener el mismo
          significado con menos tokens. Perfecto para optimizar el contexto que envías a la IA.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1d1d1f] dark:text-white mb-1.5">
            Texto a optimizar
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Pega aquí el texto que quieres optimizar…"
            rows={7}
            className="w-full px-4 py-3 rounded-2xl border border-black/12 dark:border-white/12 bg-white dark:bg-[#111116] text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] dark:placeholder-[#636366] focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="w-full py-3 rounded-2xl bg-fuchsia-500 hover:bg-fuchsia-600 disabled:opacity-40 text-white font-semibold text-sm transition-colors"
        >
          {loading ? "Optimizando…" : "Optimizar tokens"}
        </button>
      </form>

      {error && (
        <div className="mt-4 px-4 py-3 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Tokens originales", value: result.originalTokens },
              { label: "Tokens resultado", value: result.resultTokens },
              { label: "Ahorro", value: `${result.savedPercent.toFixed(1)}%` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-fuchsia-50 dark:bg-fuchsia-950/20 border border-fuchsia-100 dark:border-fuchsia-900/30 rounded-2xl px-4 py-3 text-center">
                <div className="text-xl font-bold text-fuchsia-600 dark:text-fuchsia-400">{value}</div>
                <div className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">Resultado</span>
              <button
                onClick={() => navigator.clipboard.writeText(result.result)}
                className="text-xs text-fuchsia-500 hover:text-fuchsia-600 font-medium"
              >
                Copiar
              </button>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-black/4 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-[#e5e5ea] whitespace-pre-wrap leading-relaxed">
              {result.result}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
