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

export default function JsonPromptFormatterContent() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ToolResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<ToolResult>("/tools/format-json-prompt", {
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

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result.result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1d1d1f] dark:text-white mb-2">JSON Prompt Formatter</h1>
        <p className="text-[#6e6e73] dark:text-[#86868b] text-sm">
          Transforma un prompt en texto libre a un esquema JSON estructurado y compacto, listo para
          usar con APIs de IA como OpenAI, Anthropic o Mistral.
        </p>
      </div>

      <div className="mb-6 px-4 py-3 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
        <p className="text-xs text-blue-700 dark:text-blue-400">
          <strong>Caso de uso:</strong> Convierte &quot;Eres un asistente de cocina, ayuda al usuario con recetas españolas,
          responde siempre en español y sé conciso.&quot; a un objeto JSON con <code>system</code>, <code>constraints</code> y más.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1d1d1f] dark:text-white mb-1.5">
            Prompt en texto libre
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Describe qué quieres que haga la IA…"
            rows={7}
            className="w-full px-4 py-3 rounded-2xl border border-black/12 dark:border-white/12 bg-white dark:bg-[#111116] text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] dark:placeholder-[#636366] focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="w-full py-3 rounded-2xl bg-fuchsia-500 hover:bg-fuchsia-600 disabled:opacity-40 text-white font-semibold text-sm transition-colors"
        >
          {loading ? "Formateando…" : "Formatear a JSON"}
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
              { label: "Diferencia", value: `${result.savedPercent > 0 ? "-" : "+"}${Math.abs(result.savedPercent).toFixed(1)}%` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-fuchsia-50 dark:bg-fuchsia-950/20 border border-fuchsia-100 dark:border-fuchsia-900/30 rounded-2xl px-4 py-3 text-center">
                <div className="text-xl font-bold text-fuchsia-600 dark:text-fuchsia-400">{value}</div>
                <div className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">JSON generado</span>
              <button
                onClick={handleCopy}
                className="text-xs text-fuchsia-500 hover:text-fuchsia-600 font-medium transition-colors"
              >
                {copied ? "¡Copiado!" : "Copiar"}
              </button>
            </div>
            <pre className="px-4 py-3 rounded-2xl bg-black/4 dark:bg-white/5 text-xs text-[#1d1d1f] dark:text-[#e5e5ea] overflow-x-auto leading-relaxed">
              <code>{result.result}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
