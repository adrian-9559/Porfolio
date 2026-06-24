"use client";
import { useState, useMemo } from "react";
import BlogLayout from "@/layouts/blog";
import Link from "next/link";
import { getContentByType, searchContent, formatDate, ContentMeta } from "@/lib/blog/registry";

const allTools = getContentByType("tool");

function ToolCard({ item }: { item: ContentMeta }) {
	return (
		<Link
			href={`/blog/herramientas/${item.slug}`}
			className="block group p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-200 no-underline"
		>
			<div className="flex items-start justify-between gap-3 mb-4">
				<div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.categoryColor} bg-opacity-15`}>
					<svg className={`w-5 h-5 ${item.categoryColor.replace("bg-", "text-").replace("-400", "-600").replace("-500", "-600")}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				</div>
				<span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300">
					Herramienta
				</span>
			</div>
			<h2 className="font-bold text-base text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-2">
				{item.title}
			</h2>
			<p className="text-sm text-[#6e6e73] dark:text-[#86868b] leading-relaxed line-clamp-3 mb-4">
				{item.description}
			</p>
			{item.tags && (
				<div className="flex flex-wrap gap-1.5 mb-4">
					{item.tags.map((tag) => (
						<span key={tag} className="tag-chip">{tag}</span>
					))}
				</div>
			)}
			<div className="flex items-center justify-between pt-3 border-t border-black/6 dark:border-white/6">
				<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">{formatDate(item.publishedAt)}</span>
				<span className="text-xs font-semibold text-violet-600 dark:text-violet-400 group-hover:translate-x-0.5 transition-transform">Usar herramienta →</span>
			</div>
		</Link>
	);
}

export default function HerramientasPage() {
	const [query, setQuery] = useState("");

	const results = useMemo(() => {
		if (!query.trim()) return allTools;
		return searchContent(query, "tool");
	}, [query]);

	return (
		<BlogLayout>
			<div className="space-y-10 py-4">
				{/* Header */}
				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<Link href="/blog" className="text-xs text-[#aeaeb2] dark:text-[#636366] hover:text-[#6e6e73] dark:hover:text-[#86868b] transition-colors no-underline">Blog</Link>
						<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">/</span>
						<span className="text-xs font-medium text-[#1d1d1f] dark:text-white">Herramientas</span>
					</div>
					<div className="flex items-center gap-4">
						<div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/40 flex items-center justify-center text-violet-600 dark:text-violet-400">
							<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</div>
						<div>
							<p className="section-label">Blog</p>
							<h1 className="text-3xl md:text-4xl font-bold" style={{ letterSpacing: "-0.03em" }}>Herramientas</h1>
						</div>
					</div>
					<p className="text-[#6e6e73] dark:text-[#86868b] max-w-xl leading-relaxed">
						Utilidades interactivas para el día a día del desarrollo. Úsalas directamente en el navegador, sin instalación.
					</p>
				</div>

				{/* Search */}
				<div className="relative max-w-xl">
					<svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					<input
						type="text"
						placeholder="Buscar herramientas..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-[#111116] border border-black/10 dark:border-white/10 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] dark:placeholder-[#636366] focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-400/20 transition-all"
					/>
					{query && (
						<button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aeaeb2] hover:text-[#6e6e73]">
							<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					)}
				</div>

				<p className="text-sm text-[#aeaeb2] dark:text-[#636366]">
					{results.length} {results.length === 1 ? "herramienta" : "herramientas"}
					{query && <span> para &quot;<span className="text-[#6e6e73] dark:text-[#86868b] font-medium">{query}</span>&quot;</span>}
				</p>

				{results.length === 0 ? (
					<div className="text-center py-20">
						<svg className="w-12 h-12 text-[#aeaeb2] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<p className="text-[#6e6e73] dark:text-[#86868b] font-medium">No hay herramientas para &quot;{query}&quot;</p>
						<button onClick={() => setQuery("")} className="mt-3 text-sm text-violet-600 dark:text-violet-400 hover:underline">
							Limpiar búsqueda
						</button>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{results.map((item) => <ToolCard key={item.id} item={item} />)}
					</div>
				)}
			</div>
		</BlogLayout>
	);
}
