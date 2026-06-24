"use client";
import { useState, useMemo } from "react";
import BlogLayout from "@/layouts/blog";
import Link from "next/link";
import {
	allContent,
	searchContent,
	filterContent,
	getLatestContent,
	getFeaturedContent,
	getContentByType,
	formatDate,
	typeSlug,
	ContentMeta,
	ContentType,
} from "@/lib/blog/registry";
import { LEVELS, LEARNING_PATHS, CATEGORY_GROUPS, CATEGORIES, getLevel, type DifficultyLevel, type LearningPathId } from "@/lib/blog/taxonomy";
import { LevelBadge } from "@/components/blog/TaxonomyMeta";

const stats = [
	{ label: "Artículos", count: allContent.filter((c) => c.type === "article").length, href: "/blog/articulos", color: "from-amber-500 to-orange-400" },
	{ label: "Tutoriales", count: allContent.filter((c) => c.type === "tutorial").length, href: "/blog/tutoriales", color: "from-blue-500 to-cyan-400" },
	{ label: "Herramientas", count: allContent.filter((c) => c.type === "tool").length, href: "/blog/herramientas", color: "from-violet-500 to-purple-400" },
];

const typeConfig: Record<ContentType, { label: string; icon: React.ReactNode; color: string; href: string }> = {
	article: {
		label: "Artículos",
		href: "/blog/articulos",
		color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30",
		icon: (
			<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
			</svg>
		),
	},
	tutorial: {
		label: "Tutoriales",
		href: "/blog/tutoriales",
		color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30",
		icon: (
			<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path d="M12 14l9-5-9-5-9 5 9 5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
				<path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
			</svg>
		),
	},
	tool: {
		label: "Herramientas",
		href: "/blog/herramientas",
		color: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30",
		icon: (
			<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
			</svg>
		),
	},
};

function ContentCard({ item, showType = false }: { item: ContentMeta; showType?: boolean }) {
	const cfg = typeConfig[item.type];
	return (
		<Link
			href={`/blog/${typeSlug(item.type)}/${item.slug}`}
			className="block group p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-200 no-underline"
		>
			<div className="flex items-start justify-between gap-3 mb-3">
				<div className="flex items-center gap-2 flex-wrap">
					{showType && (
						<span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.color}`}>
							{cfg.icon}
							{cfg.label}
						</span>
					)}
					<span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.categoryColor}`} />
					<span className="text-xs text-[#aeaeb2] dark:text-[#636366] font-medium">{item.category}</span>
					<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">· {item.readTime}</span>
				</div>
				{item.level && <LevelBadge level={item.level} size="xs" />}
			</div>
			<h3 className="font-semibold text-sm text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-2">
				{item.title}
			</h3>
			<p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed line-clamp-2 mb-3">
				{item.description}
			</p>
			<div className="flex items-center justify-between">
				<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">{formatDate(item.publishedAt)}</span>
				<span className="text-xs font-medium text-blue-600 dark:text-blue-400">
					{item.type === "tool" ? "Usar →" : "Leer →"}
				</span>
			</div>
		</Link>
	);
}

export default function BlogHome() {
	const [query, setQuery] = useState("");
	const [activeLevel, setActiveLevel] = useState<DifficultyLevel | "all">("all");
	const [activePath, setActivePath] = useState<LearningPathId | "all">("all");
	const latest = getLatestContent();

	const searchResults = useMemo(() => {
		if (!query.trim()) return [];
		return searchContent(query);
	}, [query]);

	const isSearching = query.trim().length > 0;
	const isFiltering = activeLevel !== "all" || activePath !== "all";

	const filteredContent = useMemo(() => {
		if (!isFiltering) return null;
		return filterContent({
			level: activeLevel !== "all" ? activeLevel : undefined,
			learningPath: activePath !== "all" ? activePath : undefined,
		});
	}, [activeLevel, activePath, isFiltering]);

	const articles = getContentByType("article").slice(0, 4);
	const tutorials = getContentByType("tutorial").slice(0, 4);
	const tools = getContentByType("tool").slice(0, 4);

	return (
		<BlogLayout>
			<div className="space-y-16 py-4">
				{/* ── Hero ── */}
				<div className="relative overflow-clip">
					<div className="blob absolute -top-16 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-blue-400/8 via-violet-400/5 to-transparent -z-10" />
					<div className="blob absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-cyan-400/6 to-transparent -z-10" />

					<div className="text-center space-y-6 py-8">
						<p className="section-label">Blog</p>
						<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ letterSpacing: "-0.03em" }}>
							Centro de <span className="gradient-text">conocimiento</span>
						</h1>
						<p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] max-w-xl mx-auto leading-relaxed">
							Artículos, tutoriales y herramientas sobre desarrollo web, tecnología y programación.
						</p>

						{/* Stats */}
						<div className="flex items-center justify-center gap-6 flex-wrap pt-2">
							{stats.map((s) => (
								<Link
									key={s.label}
									href={s.href}
									className="flex items-center gap-2 group no-underline"
								>
									<span className={`w-2 h-2 rounded-full bg-gradient-to-r ${s.color}`} />
									<span className="text-sm font-semibold text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
										{s.count}
									</span>
									<span className="text-sm text-[#6e6e73] dark:text-[#86868b]">{s.label}</span>
								</Link>
							))}
						</div>
					</div>
				</div>

				{/* ── Global search ── */}
				<div className="max-w-2xl mx-auto">
					<div className="relative">
						<svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
						<input
							type="text"
							placeholder="Buscar artículos, tutoriales y herramientas..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#111116] border border-black/10 dark:border-white/10 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] dark:placeholder-[#636366] focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20 transition-all"
						/>
						{query && (
							<button
								onClick={() => setQuery("")}
								className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aeaeb2] hover:text-[#6e6e73] transition-colors"
							>
								<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						)}
					</div>

					{/* Taxonomy filters */}
					{!isSearching && (
						<div className="mt-4 flex flex-col gap-2">
							<div className="flex items-center gap-1.5 flex-wrap">
								<span className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider w-14">Nivel</span>
								<button onClick={() => setActiveLevel("all")} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${activeLevel === "all" ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f]" : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}>Todos</button>
								{LEVELS.map((l) => (
									<button key={l.id} onClick={() => setActiveLevel(activeLevel === l.id ? "all" : l.id)} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${activeLevel === l.id ? `${l.bgColor} ${l.color} ring-1 ring-current ring-offset-0` : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}>
										{l.labelEs}
									</button>
								))}
							</div>
							<div className="flex items-center gap-1.5 flex-wrap">
								<span className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider w-14">Ruta</span>
								<button onClick={() => setActivePath("all")} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${activePath === "all" ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f]" : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}>Todas</button>
								{LEARNING_PATHS.map((p) => (
									<button key={p.id} onClick={() => setActivePath(activePath === p.id ? "all" : p.id)} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${activePath === p.id ? "bg-blue-600 text-white" : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}>
										{p.icon} {p.title}
									</button>
								))}
							</div>
						</div>
					)}

					{/* Search results */}
					{isSearching && (
						<div className="mt-3 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/20">
							{searchResults.length === 0 ? (
								<div className="px-5 py-8 text-center">
									<svg className="w-8 h-8 text-[#aeaeb2] mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									<p className="text-sm text-[#6e6e73] dark:text-[#86868b]">
										Sin resultados para <span className="font-semibold text-[#1d1d1f] dark:text-white">&quot;{query}&quot;</span>
									</p>
								</div>
							) : (
								<div className="divide-y divide-black/6 dark:divide-white/6">
									{searchResults.map((item) => {
										const cfg = typeConfig[item.type];
										return (
											<Link
												key={item.id}
												href={`/blog/${typeSlug(item.type)}/${item.slug}`}
												onClick={() => setQuery("")}
												className="flex items-start gap-4 px-5 py-4 hover:bg-black/3 dark:hover:bg-white/3 transition-colors no-underline group"
											>
												<div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${cfg.color}`}>
													{cfg.icon}
												</div>
												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-2 mb-0.5">
														<span className="text-xs font-semibold text-[#aeaeb2] dark:text-[#636366]">{cfg.label}</span>
														<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">·</span>
														<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">{item.category}</span>
													</div>
													<p className="text-sm font-medium text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
														{item.title}
													</p>
												</div>
												<svg className="w-4 h-4 text-[#aeaeb2] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
												</svg>
											</Link>
										);
									})}
								</div>
							)}
						</div>
					)}
				</div>

				{/* ── Below fold (hidden during search) ── */}
				{!isSearching && (
					<div className="space-y-16">
						{/* Filtered results */}
						{isFiltering && filteredContent && (
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									<span className="text-xs font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest">
										{filteredContent.length} resultado{filteredContent.length !== 1 ? "s" : ""}
									</span>
									<span className="flex-1 h-px bg-black/8 dark:bg-white/8" />
									<button onClick={() => { setActiveLevel("all"); setActivePath("all"); }} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
										Limpiar filtros
									</button>
								</div>
								{filteredContent.length === 0 ? (
									<div className="py-12 text-center text-[#6e6e73] dark:text-[#86868b] text-sm">
										No hay contenido con los filtros seleccionados.
									</div>
								) : (
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
										{filteredContent.map((item) => (
											<ContentCard key={item.id} item={item} showType />
										))}
									</div>
								)}
							</div>
						)}

						{/* Latest published */}
						{!isFiltering && (
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<span className="text-xs font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest">Último publicado</span>
								<span className="flex-1 h-px bg-black/8 dark:bg-white/8" />
							</div>
							<Link
								href={`/blog/${typeSlug(latest.type)}/${latest.slug}`}
								className="block group p-6 md:p-8 rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 dark:from-blue-950/20 dark:via-indigo-950/15 dark:to-violet-950/20 border border-blue-100 dark:border-blue-900/40 hover:border-blue-200 dark:hover:border-blue-800/60 hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300 no-underline"
							>
								<div className="flex items-start justify-between gap-6">
									<div className="space-y-3 flex-1">
										<div className="flex items-center gap-2 flex-wrap">
											<span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${typeConfig[latest.type].color}`}>
												{typeConfig[latest.type].icon}
												{typeConfig[latest.type].label}
											</span>
											<span className={`w-2 h-2 rounded-full ${latest.categoryColor}`} />
											<span className="text-xs font-medium text-[#6e6e73] dark:text-[#86868b]">{latest.category}</span>
											<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">·</span>
											<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">{formatDate(latest.publishedAt)}</span>
											<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">·</span>
											<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">{latest.readTime}</span>
										</div>
										<h2 className="text-xl md:text-2xl font-bold text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" style={{ letterSpacing: "-0.02em" }}>
											{latest.title}
										</h2>
										<p className="text-sm text-[#6e6e73] dark:text-[#86868b] leading-relaxed max-w-lg">
											{latest.description}
										</p>
										{latest.tags && (
											<div className="flex flex-wrap gap-1.5 pt-1">
												{latest.tags.map((tag) => (
													<span key={tag} className="tag-chip">{tag}</span>
												))}
											</div>
										)}
									</div>
									<div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 shadow-sm flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 group-hover:border-blue-600 transition-all duration-300">
										<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
										</svg>
									</div>
								</div>
							</Link>
						</div>
						)}

						{/* Section: Articles */}
						{!isFiltering && articles.length > 0 && (
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
											{typeConfig.article.icon}
										</div>
										<h2 className="text-lg font-bold text-[#1d1d1f] dark:text-white">Artículos</h2>
										<span className="text-xs text-[#aeaeb2] dark:text-[#636366] font-medium">
											{allContent.filter(c => c.type === "article").length} publicados
										</span>
									</div>
									<Link href="/blog/articulos" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors no-underline">
										Ver todos →
									</Link>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
									{articles.map((item) => <ContentCard key={item.id} item={item} />)}
								</div>
							</div>
						)}

						{/* Section: Tutorials */}
						{!isFiltering && tutorials.length > 0 && (
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
											{typeConfig.tutorial.icon}
										</div>
										<h2 className="text-lg font-bold text-[#1d1d1f] dark:text-white">Tutoriales</h2>
										<span className="text-xs text-[#aeaeb2] dark:text-[#636366] font-medium">
											{allContent.filter(c => c.type === "tutorial").length} publicados
										</span>
									</div>
									<Link href="/blog/tutoriales" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors no-underline">
										Ver todos →
									</Link>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
									{tutorials.map((item) => <ContentCard key={item.id} item={item} />)}
								</div>
							</div>
						)}

						{/* Section: Tools */}
						{!isFiltering && tools.length > 0 && (
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="w-7 h-7 rounded-lg bg-violet-100 dark:bg-violet-950/40 flex items-center justify-center text-violet-600 dark:text-violet-400">
											{typeConfig.tool.icon}
										</div>
										<h2 className="text-lg font-bold text-[#1d1d1f] dark:text-white">Herramientas</h2>
										<span className="text-xs text-[#aeaeb2] dark:text-[#636366] font-medium">
											{allContent.filter(c => c.type === "tool").length} disponibles
										</span>
									</div>
									<Link href="/blog/herramientas" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors no-underline">
										Ver todas →
									</Link>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
									{tools.map((item) => <ContentCard key={item.id} item={item} />)}
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</BlogLayout>
	);
}
