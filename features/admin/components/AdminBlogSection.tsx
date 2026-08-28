import { useState } from "react";

import { allContent, ContentType, contentHref } from "@/lib/blog/registry";

const typeColor: Record<ContentType, string> = {
  article: "from-blue-500 to-indigo-600",
  tutorial: "from-emerald-500 to-teal-500",
  tool: "from-purple-500 to-violet-600",
};

const typeBadge: Record<ContentType, string> = {
  article: "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400",
  tutorial: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400",
  tool: "bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400",
};

const typeLabel: Record<ContentType, string> = {
  article: "Artículo",
  tutorial: "Tutorial",
  tool: "Herramienta",
};

export function AdminBlogSection() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | ContentType>("all");

  const filtered = allContent.filter((c) => {
    if (filter !== "all" && c.type !== filter) return false;
    if (search) {
      const q = search.toLowerCase();

      return (
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }

    return true;
  });

  const counts = {
    articles: allContent.filter((c) => c.type === "article").length,
    tutorials: allContent.filter((c) => c.type === "tutorial").length,
    tools: allContent.filter((c) => c.type === "tool").length,
  };

  return (
    <div className="relative flex flex-col gap-6">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-amber-500/8 to-orange-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-20 w-56 h-56 rounded-full bg-gradient-to-br from-orange-500/6 to-amber-500/4 blur-3xl pointer-events-none" />

      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6e6e73] dark:text-[#86868b] mb-1">Contenido</p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
          Blog & Herramientas
        </h1>
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">
          {allContent.length} elementos · {counts.articles} artículos · {counts.tutorials} tutoriales · {counts.tools} herramientas
        </p>
      </div>

      {/* Note banner */}
      <div className="rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 px-4 py-3">
        <p className="text-xs text-amber-700 dark:text-amber-400">
          <strong>Nota:</strong> El contenido del blog está gestionado desde el
          código fuente en{" "}
          <code className="font-mono">lib/blog/registry.ts</code>. Aquí puedes
          visualizar el inventario actual.
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2] dark:text-[#636366]" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
            placeholder="Buscar contenido…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {(
            [
              { key: "all", label: "Todo" },
              { key: "article", label: "Artículos" },
              { key: "tutorial", label: "Tutoriales" },
              { key: "tool", label: "Herramientas" },
            ] as const
          ).map((f) => (
            <button
              key={f.key}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === f.key
                  ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] shadow-md"
                  : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white bg-black/5 dark:bg-white/5"
              }`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content list */}
      <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20">
        <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-[#6e6e73] dark:text-[#86868b]">
            Sin resultados
          </div>
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((c) => (
              <div key={c.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${typeColor[c.type]} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md`}>
                  {c.type === "article" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  ) : c.type === "tutorial" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#1d1d1f] dark:text-white truncate">
                      {c.title}
                    </p>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${typeBadge[c.type]}`}>
                      {typeLabel[c.type]}
                    </span>
                    {c.featured && (
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400">
                        destacado
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">
                    {c.description}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                    {c.readTime}
                  </p>
                  <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                    {c.publishedAt}
                  </p>
                </div>
                <a
                  className="p-2 rounded-lg text-[#aeaeb2] dark:text-[#636366] hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all"
                  href={contentHref(c.type, c.slug)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-center text-[#aeaeb2] dark:text-[#636366]">
        Mostrando {filtered.length} de {allContent.length} elementos
      </p>
    </div>
  );
}
