import { useState } from "react";

import { SectionHeader, Card, SearchInput, Badge } from "./AdminShared";

import { allContent, ContentType } from "@/lib/blog/registry";

const typeColor: Record<ContentType, "blue" | "green" | "purple"> = {
  article: "blue",
  tutorial: "green",
  tool: "purple",
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
    <div className="flex flex-col gap-5">
      <SectionHeader
        desc={`${allContent.length} elementos · ${counts.articles} artículos · ${counts.tutorials} tutoriales · ${counts.tools} herramientas`}
        title="Contenido del Blog"
      />

      <div className="rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 px-4 py-3">
        <p className="text-xs text-amber-700 dark:text-amber-400">
          <strong>Nota:</strong> El contenido del blog está gestionado desde el
          código fuente en{" "}
          <code className="font-mono">lib/blog/registry.ts</code>. Aquí puedes
          visualizar el inventario actual.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap items-center">
        <div className="flex-1">
          <SearchInput
            placeholder="Buscar contenido…"
            value={search}
            onChange={setSearch}
          />
        </div>
        <div className="flex gap-1">
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
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                filter === f.key
                  ? "bg-blue-600 text-white"
                  : "border border-black/12 dark:border-white/12 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
              }`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <div className="divide-y divide-black/5 dark:divide-white/5">
          {filtered.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-[#6e6e73] dark:text-[#86868b]">
              Sin resultados
            </div>
          ) : (
            filtered.map((c) => (
              <div key={c.id} className="flex items-center gap-3 px-5 py-3.5">
                <div
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold ${c.categoryColor} text-white shrink-0`}
                >
                  {c.category}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#1d1d1f] dark:text-white truncate">
                      {c.title}
                    </p>
                    <Badge
                      color={typeColor[c.type]}
                      label={typeLabel[c.type]}
                    />
                    {c.featured && <Badge color="amber" label="destacado" />}
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
                  className="text-[#aeaeb2] hover:text-blue-500 transition-colors p-1.5"
                  href={`/blog/${c.slug}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    fill="none"
                    height="14"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 14 14"
                    width="14"
                  >
                    <path d="M5.5 2.5h6v6M11.5 2.5l-8 8" />
                  </svg>
                </a>
              </div>
            ))
          )}
        </div>
      </Card>

      <p className="text-xs text-center text-[#aeaeb2] dark:text-[#636366]">
        Mostrando {filtered.length} de {allContent.length} elementos
      </p>
    </div>
  );
}
