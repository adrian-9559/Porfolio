import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { allContent } from "@/lib/blog/registry";

const toolsMeta = allContent.filter((c) => c.type === "tool");

const TOOLS_INFO: Record<string, { endpoint: string; example: string; category: string; color: string }> = {
  "prompt-compressor": {
    endpoint: "POST /tools/compress-prompt",
    example: '"Necesito que me ayudes con algo, si puedes, por favor, a ser posible…" → "Ayúdame con…"',
    category: "Prompts",
    color: "bg-fuchsia-500",
  },
  "token-optimizer": {
    endpoint: "POST /tools/optimize-tokens",
    example: '"You should not use" → "Don\'t use" — aplica contracciones y compresión semántica.',
    category: "Tokens",
    color: "bg-violet-500",
  },
  "context-summarizer": {
    endpoint: "POST /tools/summarize-context",
    example: 'Conversación de 2000 palabras → resumen de 400 palabras con los puntos clave.',
    category: "Contexto",
    color: "bg-indigo-500",
  },
  "instruction-cleaner": {
    endpoint: "POST /tools/clean-instructions",
    example: '"Necesito que... y también que... y además..." → bullet list estructurado.',
    category: "Instrucciones",
    color: "bg-blue-500",
  },
  "json-prompt-formatter": {
    endpoint: "POST /tools/format-json-prompt",
    example: '"Eres un asistente de cocina, sé conciso…" → { system, constraints, format }',
    category: "JSON / API",
    color: "bg-cyan-500",
  },
  "password": {
    endpoint: "(client-side)",
    example: 'Genera contraseñas con longitud y tipos de caracteres configurables.',
    category: "Seguridad",
    color: "bg-violet-500",
  },
};

const CATEGORIES = ["Todas", ...Array.from(new Set(Object.values(TOOLS_INFO).map((t) => t.category)))];

export default function ToolsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");

  const filtered = useMemo(() => {
    return toolsMeta.filter((t) => {
      const info = TOOLS_INFO[t.slug];
      const matchCat = category === "Todas" || info?.category === category;
      const q = search.toLowerCase();
      const matchSearch = !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || info?.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, category]);

  return (
    <>
      <Head>
        <title>Herramientas IA | Adrián</title>
        <meta name="description" content="Herramientas para optimización de tokens y prompts de IA" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-12">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fuchsia-50 dark:bg-fuchsia-950/30 border border-fuchsia-200 dark:border-fuchsia-800 mb-4">
              <span className="text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400">IA / Tokens</span>
            </div>
            <h1 className="text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3">Herramientas</h1>
            <p className="text-lg text-[#6e6e73] dark:text-[#86868b] max-w-xl">
              Herramientas interactivas para optimizar prompts, reducir tokens y estructurar instrucciones para APIs de IA.
            </p>
          </div>

          {/* Search + filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar herramienta…"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-black/12 dark:border-white/12 bg-white dark:bg-[#111116] text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] dark:placeholder-[#636366] focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
              />
            </div>
            <div className="flex gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    category === cat
                      ? "bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white shadow-sm"
                      : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#6e6e73] dark:text-[#86868b]">No se encontraron herramientas para &quot;{search}&quot;</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((tool) => {
              const info = TOOLS_INFO[tool.slug];
              return (
                <button
                  key={tool.slug}
                  onClick={() => router.push(`/blog/herramientas/${tool.slug}`)}
                  className="group text-left border border-black/8 dark:border-white/8 rounded-2xl p-5 hover:border-fuchsia-300 dark:hover:border-fuchsia-700 hover:shadow-lg hover:shadow-fuchsia-500/5 transition-all bg-white dark:bg-[#111116]"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-xl ${info?.color ?? "bg-fuchsia-500"} flex items-center justify-center text-white text-sm font-bold`}>
                      {tool.title[0]}
                    </div>
                    <span className="text-xs text-[#aeaeb2] dark:text-[#636366] bg-black/5 dark:bg-white/8 px-2 py-0.5 rounded-full">
                      {info?.category}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-[#1d1d1f] dark:text-white mb-1 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mb-4 leading-relaxed">
                    {tool.description}
                  </p>

                  {info?.endpoint && (
                    <div className="mb-3">
                      <p className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-1">Endpoint backend</p>
                      <code className="text-xs bg-black/5 dark:bg-white/5 px-2 py-1 rounded-lg text-[#1d1d1f] dark:text-[#e5e5ea] font-mono">
                        {info.endpoint}
                      </code>
                    </div>
                  )}

                  {info?.example && (
                    <div>
                      <p className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-1">Ejemplo</p>
                      <p className="text-xs text-[#6e6e73] dark:text-[#86868b] italic">{info.example}</p>
                    </div>
                  )}

                  <div className="mt-4 flex items-center text-xs text-fuchsia-500 font-medium group-hover:gap-1.5 gap-1 transition-all">
                    Usar herramienta <span>→</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Git Repositories CTA */}
          <div className="mt-8 flex items-center gap-4 p-5 rounded-2xl border border-black/8 dark:border-white/8 bg-[#0d1117] dark:bg-[#0d1117]">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">Git Repository Manager</p>
              <p className="text-xs text-white/60 mt-0.5">Conecta tus repositorios de GitHub, GitLab o Bitbucket. Visualiza ramas, commits y grafos.</p>
            </div>
            <Link href="/tools/git-repositories" className="flex-shrink-0 px-4 py-2 rounded-xl bg-white text-[#0d1117] text-sm font-medium hover:bg-white/90 transition-colors">
              Abrir →
            </Link>
          </div>

          {/* API Info */}
          <div className="mt-6 p-6 rounded-2xl bg-black/3 dark:bg-white/3 border border-black/8 dark:border-white/8">
            <h3 className="text-base font-semibold text-[#1d1d1f] dark:text-white mb-2">API de herramientas</h3>
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mb-4">
              Las herramientas están disponibles como endpoints REST. Todas aceptan <code>{"{ text: string }"}</code> y devuelven:
            </p>
            <pre className="bg-[#0d1117] rounded-xl p-4 text-xs text-[#e6edf3] overflow-x-auto">
              <code>{`{
  "original":      "texto original",
  "result":        "texto procesado",
  "originalTokens": 45,
  "resultTokens":   28,
  "savedPercent":  37.8
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
