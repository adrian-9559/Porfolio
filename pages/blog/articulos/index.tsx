"use client";
import { useState, useMemo } from "react";
import BlogLayout from "@/layouts/blog";
import Link from "next/link";
import { getContentByType, searchContent, formatDate, ContentMeta } from "@/lib/blog/registry";

const allArticles = getContentByType("article");

function ArticleCard({ item }: { item: ContentMeta }) {
	return (
		<Link
			href={`/blog/articulos/${item.slug}`}
			className="block group p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-200 no-underline"
		>
			<div className="flex items-center gap-2 mb-3">
				<span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.categoryColor}`} />
				<span className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b]">{item.category}</span>
				<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">· {item.readTime}</span>
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
				<span className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">Leer →</span>
			</div>
		</Link>
	);
}

export default function ArticulosPage() {
	const [query, setQuery] = useState("");

	const results = useMemo(() => {
		if (!query.trim()) return allArticles;
		return searchContent(query, "article");
	}, [query]);

	return (
		<BlogLayout>
			<div className="space-y-10 py-4">
				{/* Header */}
				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<Link href="/blog" className="text-xs text-[#aeaeb2] dark:text-[#636366] hover:text-[#6e6e73] dark:hover:text-[#86868b] transition-colors no-underline">
							Blog
						</Link>
						<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">/</span>
						<span className="text-xs font-medium text-[#1d1d1f] dark:text-white">Artículos</span>
					</div>
					<div className="flex items-center gap-4">
						<div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
							<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
							</svg>
						</div>
						<div>
							<p className="section-label">Blog</p>
							<h1 className="text-3xl md:text-4xl font-bold" style={{ letterSpacing: "-0.03em" }}>Artículos</h1>
						</div>
					</div>
					<p className="text-[#6e6e73] dark:text-[#86868b] max-w-xl leading-relaxed">
						Recursos, herramientas y referencias sobre tecnología y desarrollo web. Lecturas breves y directas.
					</p>
				</div>

				{/* Search */}
				<div className="relative max-w-xl">
					<svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					<input
						type="text"
						placeholder="Buscar en artículos..."
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

				{/* Count */}
				<p className="text-sm text-[#aeaeb2] dark:text-[#636366]">
					{results.length} {results.length === 1 ? "artículo" : "artículos"}
					{query && <span> para &quot;<span className="text-[#6e6e73] dark:text-[#86868b] font-medium">{query}</span>&quot;</span>}
				</p>

				{/* Results */}
				{results.length === 0 ? (
					<div className="text-center py-20">
						<svg className="w-12 h-12 text-[#aeaeb2] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<p className="text-[#6e6e73] dark:text-[#86868b] font-medium">No hay artículos para &quot;{query}&quot;</p>
						<button onClick={() => setQuery("")} className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline">
							Limpiar búsqueda
						</button>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{results.map((item) => <ArticleCard key={item.id} item={item} />)}
					</div>
				)}
			</div>
		</BlogLayout>
	);
}
