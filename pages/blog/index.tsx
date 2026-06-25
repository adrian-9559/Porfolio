"use client";
import { useState, useMemo } from "react";
import BlogLayout from "@/layouts/blog";
import Link from "next/link";
import {
	allContent,
	searchContent,
	filterContent,
	getLatestContent,
	getContentByType,
	formatDate,
	typeSlug,
	ContentMeta,
	ContentType,
} from "@/lib/blog/registry";
import { LEVELS, LEARNING_PATHS, getLevel, type DifficultyLevel, type LearningPathId } from "@/lib/blog/taxonomy";
import { LevelBadge } from "@/components/blog/TaxonomyMeta";

const typeConfig: Record<ContentType, {
	label: string;
	icon: React.ReactNode;
	pill: string;
	cardAccent: string;
	iconBg: string;
	gradient: string;
	href: string;
	emoji: string;
}> = {
	article: {
		label: "Artículos",
		href: "/blog/articulos",
		emoji: "📖",
		pill: "text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/50",
		cardAccent: "from-amber-400 to-orange-400",
		iconBg: "bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400",
		gradient: "from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/20 dark:via-orange-950/15 dark:to-yellow-950/10",
		icon: (
			<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
			</svg>
		),
	},
	tutorial: {
		label: "Tutoriales",
		href: "/blog/tutoriales",
		emoji: "🎓",
		pill: "text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/50",
		cardAccent: "from-blue-400 to-cyan-400",
		iconBg: "bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400",
		gradient: "from-blue-50 via-cyan-50 to-sky-50 dark:from-blue-950/20 dark:via-cyan-950/15 dark:to-sky-950/10",
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
		emoji: "🔧",
		pill: "text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/50",
		cardAccent: "from-violet-400 to-purple-400",
		iconBg: "bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400",
		gradient: "from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-950/20 dark:via-purple-950/15 dark:to-fuchsia-950/10",
		icon: (
			<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
			</svg>
		),
	},
};

const categoryStats = [
	{
		label: "Artículos",
		href: "/blog/articulos",
		emoji: "📖",
		count: allContent.filter((c) => c.type === "article").length,
		gradient: "from-amber-400 to-orange-500",
		bg: "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20",
		border: "border-amber-200 dark:border-amber-800/40",
		text: "text-amber-700 dark:text-amber-300",
		sub: "Opinión y análisis",
	},
	{
		label: "Tutoriales",
		href: "/blog/tutoriales",
		emoji: "🎓",
		count: allContent.filter((c) => c.type === "tutorial").length,
		gradient: "from-blue-400 to-cyan-500",
		bg: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/20",
		border: "border-blue-200 dark:border-blue-800/40",
		text: "text-blue-700 dark:text-blue-300",
		sub: "Paso a paso",
	},
	{
		label: "Herramientas",
		href: "/blog/herramientas",
		emoji: "🔧",
		count: allContent.filter((c) => c.type === "tool").length,
		gradient: "from-violet-400 to-purple-500",
		bg: "from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20",
		border: "border-violet-200 dark:border-violet-800/40",
		text: "text-violet-700 dark:text-violet-300",
		sub: "Dev tools",
	},
];

function ContentCard({ item, showType = false }: { item: ContentMeta; showType?: boolean }) {
	const cfg = typeConfig[item.type];
	return (
		<Link
			href={`/blog/${typeSlug(item.type)}/${item.slug}`}
			className="block group relative overflow-hidden rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/12 hover:shadow-lg hover:shadow-black/8 dark:hover:shadow-black/30 transition-all duration-300 no-underline"
		>
			{/* Color accent top bar */}
			<div className={`h-1 w-full bg-gradient-to-r ${cfg.cardAccent}`} />

			<div className="p-5">
				<div className="flex items-start justify-between gap-3 mb-3">
					<div className="flex items-center gap-2 flex-wrap">
						{showType && (
							<span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.pill}`}>
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

				<h3 className="font-bold text-sm text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-2">
					{item.title}
				</h3>
				<p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed line-clamp-2 mb-4">
					{item.description}
				</p>
				<div className="flex items-center justify-between">
					<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">{formatDate(item.publishedAt)}</span>
					<span className={`text-xs font-semibold ${item.type === "article" ? "text-amber-600 dark:text-amber-400" : item.type === "tutorial" ? "text-blue-600 dark:text-blue-400" : "text-violet-600 dark:text-violet-400"} group-hover:translate-x-0.5 transition-transform inline-block`}>
						{item.type === "tool" ? "Explorar →" : "Leer →"}
					</span>
				</div>
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
			<div className="space-y-14 py-4">

				{/* ── Hero ── */}
				<div className="relative overflow-clip">
					{/* Background blobs */}
					<div className="blob absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-violet-400/12 via-pink-400/8 to-transparent -z-10" />
					<div className="blob absolute top-0 right-0 w-[250px] h-[250px] bg-gradient-to-bl from-amber-400/10 to-transparent -z-10" />
					<div className="blob absolute top-10 left-0 w-[200px] h-[200px] bg-gradient-to-br from-cyan-400/10 to-transparent -z-10" />

					<div className="text-center space-y-5 py-8">
						<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-300/40 dark:border-violet-700/40">
							<span className="text-base">✍️</span>
							<span className="text-xs font-bold tracking-widest uppercase text-violet-700 dark:text-violet-300">Blog & Conocimiento</span>
						</div>

						<h1 className="text-4xl sm:text-5xl md:text-6xl font-black" style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}>
							Aprende, explora
							<span className="block hero-gradient-text">y construye</span>
						</h1>
						<p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] max-w-lg mx-auto leading-relaxed">
							Artículos, tutoriales y herramientas sobre desarrollo web, tecnología y programación. Todo en un lugar.
						</p>
					</div>
				</div>

				{/* ── Category stat cards ── */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					{categoryStats.map((s) => (
						<Link
							key={s.label}
							href={s.href}
							className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${s.bg} border ${s.border} hover:shadow-lg hover:scale-[1.02] transition-all duration-300 no-underline p-5`}
						>
							<div className="flex items-start justify-between mb-3">
								<span className="text-3xl">{s.emoji}</span>
								<span className={`text-3xl font-black bg-gradient-to-br ${s.gradient} bg-clip-text text-transparent`}>
									{s.count}
								</span>
							</div>
							<p className={`font-bold text-base ${s.text}`}>{s.label}</p>
							<p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-0.5">{s.sub}</p>
							<div className="mt-3 flex items-center gap-1">
								<span className={`text-xs font-semibold ${s.text} group-hover:translate-x-0.5 transition-transform inline-block`}>
									Ver todos →
								</span>
							</div>
							{/* Decorative gradient orb */}
							<div className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${s.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
						</Link>
					))}
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
							className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#111116] border border-black/10 dark:border-white/10 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] dark:placeholder-[#636366] focus:outline-none focus:border-violet-400 dark:focus:border-violet-500 focus:ring-2 focus:ring-violet-400/20 dark:focus:ring-violet-500/20 transition-all shadow-sm"
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
								<span className="text-[10px] font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider w-14">Nivel</span>
								<button onClick={() => setActiveLevel("all")} className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${activeLevel === "all" ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f]" : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}>Todos</button>
								{LEVELS.map((l) => (
									<button key={l.id} onClick={() => setActiveLevel(activeLevel === l.id ? "all" : l.id)} className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${activeLevel === l.id ? `${l.bgColor} ${l.color} ring-1 ring-current` : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}>
										{l.labelEs}
									</button>
								))}
							</div>
							<div className="flex items-center gap-1.5 flex-wrap">
								<span className="text-[10px] font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider w-14">Ruta</span>
								<button onClick={() => setActivePath("all")} className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${activePath === "all" ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f]" : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}>Todas</button>
								{LEARNING_PATHS.map((p) => (
									<button key={p.id} onClick={() => setActivePath(activePath === p.id ? "all" : p.id)} className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${activePath === p.id ? "bg-violet-600 text-white" : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}>
										{p.icon} {p.title}
									</button>
								))}
							</div>
						</div>
					)}

					{/* Search results */}
					{isSearching && (
						<div className="mt-3 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden shadow-xl shadow-black/8 dark:shadow-black/30">
							{searchResults.length === 0 ? (
								<div className="px-5 py-10 text-center">
									<div className="text-4xl mb-3">🔍</div>
									<p className="text-sm text-[#6e6e73] dark:text-[#86868b]">
										Sin resultados para <span className="font-bold text-[#1d1d1f] dark:text-white">&quot;{query}&quot;</span>
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
												<div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${cfg.iconBg}`}>
													{cfg.icon}
												</div>
												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-2 mb-0.5">
														<span className={`text-xs font-bold ${cfg.pill.split(" ").filter(c => c.startsWith("text-")).join(" ")}`}>{cfg.label}</span>
														<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">·</span>
														<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">{item.category}</span>
													</div>
													<p className="text-sm font-semibold text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
														{item.title}
													</p>
												</div>
												<svg className="w-4 h-4 text-[#aeaeb2] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

				{/* ── Below fold ── */}
				{!isSearching && (
					<div className="space-y-14">
						{/* Filtered results */}
						{isFiltering && filteredContent && (
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									<span className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest">
										{filteredContent.length} resultado{filteredContent.length !== 1 ? "s" : ""}
									</span>
									<span className="flex-1 h-px bg-black/8 dark:bg-white/8" />
									<button onClick={() => { setActiveLevel("all"); setActivePath("all"); }} className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline">
										Limpiar filtros
									</button>
								</div>
								{filteredContent.length === 0 ? (
									<div className="py-16 text-center">
										<div className="text-5xl mb-4">🤷</div>
										<p className="text-sm text-[#6e6e73] dark:text-[#86868b]">No hay contenido con los filtros seleccionados.</p>
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

						{/* Latest published — big feature card */}
						{!isFiltering && (
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									<span className="text-xs font-bold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-widest">✨ Último publicado</span>
									<span className="flex-1 h-px bg-black/8 dark:bg-white/8" />
								</div>
								<Link
									href={`/blog/${typeSlug(latest.type)}/${latest.slug}`}
									className={`block group relative overflow-hidden rounded-3xl bg-gradient-to-br ${typeConfig[latest.type].gradient} border ${
										latest.type === "article"
											? "border-amber-200 dark:border-amber-800/40"
											: latest.type === "tutorial"
											? "border-blue-200 dark:border-blue-800/40"
											: "border-violet-200 dark:border-violet-800/40"
									} hover:shadow-2xl hover:scale-[1.005] transition-all duration-300 no-underline`}
								>
									{/* Animated top bar */}
									<div className={`h-1.5 w-full bg-gradient-to-r ${typeConfig[latest.type].cardAccent}`} />

									<div className="p-7 md:p-9">
										<div className="flex items-start justify-between gap-6">
											<div className="space-y-4 flex-1">
												<div className="flex items-center gap-2 flex-wrap">
													<span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${typeConfig[latest.type].pill}`}>
														<span>{typeConfig[latest.type].emoji}</span>
														{typeConfig[latest.type].label}
													</span>
													<span className={`w-2 h-2 rounded-full ${latest.categoryColor}`} />
													<span className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b]">{latest.category}</span>
													<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">·</span>
													<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">{formatDate(latest.publishedAt)}</span>
													<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">·</span>
													<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">{latest.readTime}</span>
												</div>
												<h2 className="text-2xl md:text-3xl font-black text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" style={{ letterSpacing: "-0.03em" }}>
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
											<div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${typeConfig[latest.type].iconBg} border ${
												latest.type === "article"
													? "border-amber-200 dark:border-amber-800/40"
													: latest.type === "tutorial"
													? "border-blue-200 dark:border-blue-800/40"
													: "border-violet-200 dark:border-violet-800/40"
											} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
												{typeConfig[latest.type].emoji}
											</div>
										</div>
									</div>
								</Link>
							</div>
						)}

						{/* Section: Articles */}
						{!isFiltering && articles.length > 0 && (
							<ContentSection
								title="Artículos"
								emoji="📖"
								href="/blog/articulos"
								iconBg={typeConfig.article.iconBg}
								icon={typeConfig.article.icon}
								total={allContent.filter(c => c.type === "article").length}
								items={articles}
								accentColor="amber"
							/>
						)}

						{/* Section: Tutorials */}
						{!isFiltering && tutorials.length > 0 && (
							<ContentSection
								title="Tutoriales"
								emoji="🎓"
								href="/blog/tutoriales"
								iconBg={typeConfig.tutorial.iconBg}
								icon={typeConfig.tutorial.icon}
								total={allContent.filter(c => c.type === "tutorial").length}
								items={tutorials}
								accentColor="blue"
							/>
						)}

						{/* Section: Tools */}
						{!isFiltering && tools.length > 0 && (
							<ContentSection
								title="Herramientas"
								emoji="🔧"
								href="/blog/herramientas"
								iconBg={typeConfig.tool.iconBg}
								icon={typeConfig.tool.icon}
								total={allContent.filter(c => c.type === "tool").length}
								items={tools}
								accentColor="violet"
							/>
						)}
					</div>
				)}
			</div>
		</BlogLayout>
	);
}

function ContentSection({
	title, emoji, href, iconBg, icon, total, items, accentColor,
}: {
	title: string;
	emoji: string;
	href: string;
	iconBg: string;
	icon: React.ReactNode;
	total: number;
	items: ContentMeta[];
	accentColor: "amber" | "blue" | "violet";
}) {
	const seeAllColor = {
		amber: "text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300",
		blue: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
		violet: "text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300",
	}[accentColor];

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center shadow-sm`}>
						{icon}
					</div>
					<div>
						<h2 className="text-lg font-black text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>
							{emoji} {title}
						</h2>
					</div>
					<span className="text-xs text-[#aeaeb2] dark:text-[#636366] font-medium bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-full">
						{total}
					</span>
				</div>
				<Link href={href} className={`text-sm font-bold ${seeAllColor} transition-colors no-underline`}>
					Ver todos →
				</Link>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				{items.map((item) => <ContentCard key={item.id} item={item} />)}
			</div>
		</div>
	);
}
