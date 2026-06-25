"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Head } from "./head";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { allContent, typeSlug } from "@/lib/blog/registry";

// ── Sidebar data model ────────────────────────────────────────────────────────

interface NavItem {
	id: string;
	label: string;
	href: string;
	color?: string;
}

interface NavGroup {
	id: string;
	label: string;
	href?: string;        // optional listing link
	icon: React.ReactNode;
	color: string;
	items?: NavItem[];
	children?: NavGroup[]; // nested sub-groups
	defaultOpen?: boolean;
}

// ── Build the nav tree from registry ─────────────────────────────────────────

function buildNav(): NavGroup[] {
	const articles = allContent.filter((c) => c.type === "article");
	const tutorials = allContent.filter((c) => c.type === "tutorial");
	const tools = allContent.filter((c) => c.type === "tool");

	const langTutorials = tutorials.filter((c) => c.subcategory === "languages" || !c.subcategory);
	const frameworkTutorials = tutorials.filter((c) => c.subcategory === "frameworks");

	return [
		{
			id: "articulos",
			label: "Artículos",
			href: "/blog/articulos",
			color: "text-amber-500",
			icon: (
				<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
				</svg>
			),
			items: articles.map((c) => ({
				id: c.id,
				label: c.title,
				href: `/blog/${typeSlug(c.type)}/${c.slug}`,
				color: c.categoryColor,
			})),
			defaultOpen: true,
		},
		{
			id: "tutoriales",
			label: "Tutoriales",
			href: "/blog/tutoriales",
			color: "text-blue-500",
			icon: (
				<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path d="M12 14l9-5-9-5-9 5 9 5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
					<path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
				</svg>
			),
			defaultOpen: true,
			children: [
				{
					id: "tutoriales-lenguajes",
					label: "Lenguajes",
					color: "text-blue-400",
					icon: (
						<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
						</svg>
					),
					defaultOpen: true,
					items: langTutorials.map((c) => ({
						id: c.id,
						label: c.title,
						href: `/blog/${typeSlug(c.type)}/${c.slug}`,
						color: c.categoryColor,
					})),
				},
				{
					id: "tutoriales-frameworks",
					label: "Frameworks",
					color: "text-indigo-400",
					icon: (
						<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
						</svg>
					),
					defaultOpen: true,
					items: frameworkTutorials.map((c) => ({
						id: c.id,
						label: c.title,
						href: `/blog/${typeSlug(c.type)}/${c.slug}`,
						color: c.categoryColor,
					})),
				},
			],
		},
		{
			id: "herramientas",
			label: "Herramientas",
			href: "/blog/herramientas",
			color: "text-violet-500",
			icon: (
				<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
			),
			defaultOpen: false,
			items: tools.map((c) => ({
				id: c.id,
				label: c.title,
				href: `/blog/${typeSlug(c.type)}/${c.slug}`,
				color: c.categoryColor,
			})),
		},
	];
}

// ── Collapse state persistence ────────────────────────────────────────────────

function useCollapseState(key: string, defaultOpen: boolean) {
	const [open, setOpen] = useState(defaultOpen);

	useEffect(() => {
		try {
			const stored = localStorage.getItem(`blog-nav-${key}`);
			if (stored !== null) setOpen(stored === "true");
		} catch {}
	}, [key]);

	const toggle = useCallback(() => {
		setOpen((prev) => {
			const next = !prev;
			try { localStorage.setItem(`blog-nav-${key}`, String(next)); } catch {}
			return next;
		});
	}, [key]);

	return [open, toggle] as const;
}

// ── Group accent config ───────────────────────────────────────────────────────

const groupAccent: Record<string, {
	pill: string;
	activeBg: string;
	activeText: string;
	border: string;
	subBorder: string;
	emoji: string;
}> = {
	articulos: {
		emoji: "📖",
		pill: "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300",
		activeBg: "bg-amber-50 dark:bg-amber-950/30",
		activeText: "text-amber-700 dark:text-amber-300",
		border: "border-amber-200 dark:border-amber-800/50",
		subBorder: "border-amber-200/60 dark:border-amber-800/30",
	},
	tutoriales: {
		emoji: "🎓",
		pill: "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300",
		activeBg: "bg-blue-50 dark:bg-blue-950/30",
		activeText: "text-blue-700 dark:text-blue-300",
		border: "border-blue-200 dark:border-blue-800/50",
		subBorder: "border-blue-200/60 dark:border-blue-800/30",
	},
	"tutoriales-lenguajes": {
		emoji: "💻",
		pill: "bg-sky-100 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300",
		activeBg: "bg-sky-50 dark:bg-sky-950/30",
		activeText: "text-sky-700 dark:text-sky-300",
		border: "border-sky-200 dark:border-sky-800/50",
		subBorder: "border-sky-200/60 dark:border-sky-800/30",
	},
	"tutoriales-frameworks": {
		emoji: "🧩",
		pill: "bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300",
		activeBg: "bg-indigo-50 dark:bg-indigo-950/30",
		activeText: "text-indigo-700 dark:text-indigo-300",
		border: "border-indigo-200 dark:border-indigo-800/50",
		subBorder: "border-indigo-200/60 dark:border-indigo-800/30",
	},
	herramientas: {
		emoji: "🔧",
		pill: "bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300",
		activeBg: "bg-violet-50 dark:bg-violet-950/30",
		activeText: "text-violet-700 dark:text-violet-300",
		border: "border-violet-200 dark:border-violet-800/50",
		subBorder: "border-violet-200/60 dark:border-violet-800/30",
	},
};

// ── Chevron icon ──────────────────────────────────────────────────────────────

function Chevron({ open }: { open: boolean }) {
	return (
		<svg
			className={`w-3 h-3 text-[#aeaeb2] transition-transform duration-200 flex-shrink-0 ${open ? "rotate-90" : ""}`}
			fill="none" viewBox="0 0 24 24" stroke="currentColor"
		>
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
		</svg>
	);
}

// ── Sidebar item ──────────────────────────────────────────────────────────────

function SidebarItem({ item, active, groupId }: { item: NavItem; active: boolean; groupId?: string }) {
	const accent = groupId ? groupAccent[groupId] : null;
	return (
		<Link
			href={item.href}
			className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all duration-150 no-underline group ${
				active
					? `${accent?.activeBg ?? "bg-blue-50 dark:bg-blue-950/30"} ${accent?.activeText ?? "text-blue-600 dark:text-blue-400"} font-semibold`
					: "text-[#3a3a3c] dark:text-[#aeaeb2] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:text-[#1d1d1f] dark:hover:text-white"
			}`}
		>
			{item.color && (
				<span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.color}`} />
			)}
			<span className="flex-1 min-w-0 truncate leading-snug">{item.label}</span>
			{active && (
				<span className="flex-shrink-0 w-1 h-1 rounded-full bg-current opacity-60" />
			)}
		</Link>
	);
}

// ── Sub-group (e.g. Lenguajes / Frameworks) ───────────────────────────────────

function SubGroup({ group, currentPath }: { group: NavGroup; currentPath: string }) {
	const [open, toggle] = useCollapseState(group.id, group.defaultOpen ?? true);
	const accent = groupAccent[group.id] ?? groupAccent["tutoriales-lenguajes"];

	return (
		<div className="mt-2">
			<button
				onClick={toggle}
				className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors group"
			>
				<Chevron open={open} />
				<span className="text-sm flex-shrink-0">{accent.emoji}</span>
				<span className="text-[10px] font-bold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] group-hover:text-[#6e6e73] dark:group-hover:text-[#86868b] transition-colors flex-1 text-left">
					{group.label}
				</span>
				<span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${accent.pill}`}>
					{group.items?.length}
				</span>
			</button>

			<div
				className="overflow-hidden transition-all duration-200"
				style={{ maxHeight: open ? `${(group.items?.length ?? 0) * 36 + 8}px` : "0px" }}
			>
				<div className={`ml-4 pl-2 border-l ${accent.subBorder} mt-0.5 space-y-0.5 pb-1`}>
					{group.items?.map((item) => (
						<SidebarItem key={item.id} item={item} active={currentPath === item.href} groupId={group.id} />
					))}
				</div>
			</div>
		</div>
	);
}

// ── Top-level group ───────────────────────────────────────────────────────────

function TopGroup({ group, currentPath }: { group: NavGroup; currentPath: string }) {
	const hasChildren = Boolean(group.children?.length);
	const hasItems = Boolean(group.items?.length);
	const allItems = [
		...(group.items ?? []),
		...(group.children?.flatMap((c) => c.items ?? []) ?? []),
	];
	const isGroupActive = allItems.some((i) => currentPath === i.href) ||
		(group.href && currentPath === group.href);

	const [open, toggle] = useCollapseState(group.id, group.defaultOpen ?? false);
	const accent = groupAccent[group.id] ?? { emoji: "📄", pill: "bg-gray-100 text-gray-600", activeBg: "bg-gray-50", activeText: "text-gray-700", border: "border-gray-200", subBorder: "border-gray-200/60" };

	return (
		<div className="mt-1">
			{/* Group header pill-style */}
			<button
				onClick={toggle}
				className={`flex items-center gap-2 w-full px-2.5 py-2 rounded-xl transition-all duration-150 group ${
					isGroupActive
						? `${accent.activeBg} border ${accent.border}`
						: "hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
				}`}
			>
				<Chevron open={open} />
				<span className="text-base flex-shrink-0">{accent.emoji}</span>
				<span
					className={`text-xs font-bold transition-colors flex-1 text-left ${
						isGroupActive
							? accent.activeText
							: "text-[#3a3a3c] dark:text-[#aeaeb2] group-hover:text-[#1d1d1f] dark:group-hover:text-white"
					}`}
				>
					{group.label}
				</span>
				<div className="flex items-center gap-1.5">
					<span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${accent.pill}`}>
						{allItems.length}
					</span>
					{group.href && (
						<Link
							href={group.href}
							onClick={(e) => e.stopPropagation()}
							className={`text-[9px] font-semibold no-underline opacity-0 group-hover:opacity-100 transition-opacity ${accent.activeText}`}
						>
							ver →
						</Link>
					)}
				</div>
			</button>

			{/* Content */}
			<div
				className="overflow-hidden transition-all duration-200"
				style={{
					maxHeight: open
						? `${allItems.length * 36 + (hasChildren ? (group.children?.length ?? 0) * 48 : 0) + 60}px`
						: "0px",
				}}
			>
				{/* Direct items */}
				{hasItems && (
					<div className={`ml-3 pl-2 border-l ${accent.subBorder} mt-1 space-y-0.5 pb-1`}>
						{group.items!.map((item) => (
							<SidebarItem key={item.id} item={item} active={currentPath === item.href} groupId={group.id} />
						))}
					</div>
				)}

				{/* Nested sub-groups */}
				{hasChildren && (
					<div className={`ml-3 pl-2 border-l ${accent.subBorder} mt-1 pb-1`}>
						{group.children!.map((child) => (
							<SubGroup key={child.id} group={child} currentPath={currentPath} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}

// ── Sidebar search ────────────────────────────────────────────────────────────

function SidebarSearch({ currentPath }: { currentPath: string }) {
	const [q, setQ] = useState("");
	const results = q.trim().length > 0
		? allContent.filter((c) =>
			c.title.toLowerCase().includes(q.toLowerCase()) ||
			c.category.toLowerCase().includes(q.toLowerCase())
		).slice(0, 8)
		: [];

	return (
		<div className="relative px-1 mb-3">
			<div className="relative">
				<svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#aeaeb2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
				<input
					type="text"
					placeholder="Buscar contenido..."
					value={q}
					onChange={(e) => setQ(e.target.value)}
					className="w-full pl-7 pr-3 py-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/8 dark:border-white/8 text-xs text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] dark:placeholder-[#636366] focus:outline-none focus:ring-2 focus:ring-violet-400/30 focus:border-violet-300 dark:focus:border-violet-600 transition-all"
				/>
				{q && (
					<button onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#aeaeb2] hover:text-[#6e6e73]">
						<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				)}
			</div>

			{results.length > 0 && (
				<div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-[#111116] border border-black/10 dark:border-white/10 rounded-xl shadow-xl overflow-hidden">
					{results.map((item) => {
						const href = `/blog/${typeSlug(item.type)}/${item.slug}`;
						const typeEmoji = item.type === "article" ? "📖" : item.type === "tutorial" ? "🎓" : "🔧";
						return (
							<Link
								key={item.id}
								href={href}
								onClick={() => setQ("")}
								className={`flex items-center gap-2 px-3 py-2 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] no-underline ${currentPath === href ? "bg-violet-50 dark:bg-violet-950/20" : ""}`}
							>
								<span className="text-sm flex-shrink-0">{typeEmoji}</span>
								<span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.categoryColor}`} />
								<span className="text-xs text-[#1d1d1f] dark:text-white truncate">{item.title}</span>
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
}

// ── Main layout ───────────────────────────────────────────────────────────────

interface BlogLayoutProps {
	children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
	const router = useRouter();
	const [mobileOpen, setMobileOpen] = useState(false);
	const currentPath = router.asPath.split("?")[0] ?? router.asPath;

	const nav = buildNav();

	const activeItem = allContent.find(
		(c) => currentPath === `/blog/${typeSlug(c.type)}/${c.slug}`
	);
	const mobileLabel = activeItem?.title ?? (currentPath === "/blog" ? "Inicio del blog" : "Blog");

	return (
		<div className="relative flex flex-col min-h-screen bg-white dark:bg-[#0a0a0f] overflow-x-hidden">
			<Head />
			<Navbar />

			<div className="flex flex-1">
				{/* ── Sidebar (desktop) ── */}
				<aside className="hidden md:flex flex-col w-64 lg:w-72 flex-shrink-0 border-r border-black/8 dark:border-white/8 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto sidebar-scroll px-3 py-6">
					{/* Header */}
					<div className="px-2 mb-5">
						<div className="flex items-center gap-2.5 mb-3">
							<div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-sm font-black shadow-md shadow-violet-500/30">
								✍️
							</div>
							<div>
								<p className="text-[9px] font-bold uppercase tracking-widest text-[#aeaeb2] dark:text-[#636366]">Adrián Escribano</p>
								<p className="text-sm font-black text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>Blog</p>
							</div>
						</div>

						{/* Stat pills */}
						<div className="flex items-center gap-1.5 flex-wrap">
							{[
								{ label: `${allContent.filter(c => c.type === "article").length} art.`, color: "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300" },
								{ label: `${allContent.filter(c => c.type === "tutorial").length} tut.`, color: "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300" },
								{ label: `${allContent.filter(c => c.type === "tool").length} her.`, color: "bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300" },
							].map((s) => (
								<span key={s.label} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.color}`}>{s.label}</span>
							))}
						</div>
					</div>

					{/* Search */}
					<SidebarSearch currentPath={currentPath} />

					{/* Home link */}
					<Link
						href="/blog"
						className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all no-underline mb-3 ${
							currentPath === "/blog"
								? "bg-gradient-to-r from-violet-50 to-pink-50 dark:from-violet-950/30 dark:to-pink-950/20 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/40"
								: "text-[#3a3a3c] dark:text-[#aeaeb2] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:text-[#1d1d1f] dark:hover:text-white"
						}`}
					>
						<span className="text-base flex-shrink-0">🏠</span>
						Inicio del blog
					</Link>

					{/* Divider */}
					<div className="border-t border-black/6 dark:border-white/6 mb-3" />

					{/* Nav groups */}
					<div className="space-y-1">
						{nav.map((group) => (
							<TopGroup key={group.id} group={group} currentPath={currentPath} />
						))}
					</div>
				</aside>

				{/* ── Main ── */}
				<div className="flex-1 flex flex-col min-w-0">
					<main className="flex-1 px-5 sm:px-8 md:px-10 lg:px-14 py-8">
						{/* Mobile nav drawer trigger */}
						<div className="md:hidden mb-8">
							<button
								onClick={() => setMobileOpen(!mobileOpen)}
								className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 text-sm font-medium text-[#1d1d1f] dark:text-white"
							>
								<span className="flex items-center gap-2 truncate">
									<svg className="w-4 h-4 text-[#6e6e73] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
									</svg>
									<span className="truncate">{mobileLabel}</span>
								</span>
								<svg className={`w-4 h-4 text-[#aeaeb2] flex-shrink-0 transition-transform ${mobileOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
								</svg>
							</button>

							{/* Mobile drawer */}
							{mobileOpen && (
								<div className="fixed inset-0 z-40" onClick={() => setMobileOpen(false)}>
									<div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
									<div
										className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-[#0a0a0f] border-r border-black/8 dark:border-white/8 overflow-y-auto px-3 py-6 shadow-2xl"
										onClick={(e) => e.stopPropagation()}
									>
										<div className="flex items-center justify-between px-2 mb-5">
											<div className="flex items-center gap-2.5">
												<div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-sm font-black shadow-md shadow-violet-500/30">
													✍️
												</div>
												<div>
													<p className="text-[9px] font-bold uppercase tracking-widest text-[#aeaeb2]">Adrián Escribano</p>
													<p className="text-sm font-black text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>Blog</p>
												</div>
											</div>
											<button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg text-[#aeaeb2] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#6e6e73]">
												<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
												</svg>
											</button>
										</div>

										<SidebarSearch currentPath={currentPath} />

										<Link
											href="/blog"
											onClick={() => setMobileOpen(false)}
											className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold no-underline mb-3 ${currentPath === "/blog" ? "bg-gradient-to-r from-violet-50 to-pink-50 dark:from-violet-950/30 dark:to-pink-950/20 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/40" : "text-[#3a3a3c] dark:text-[#aeaeb2] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"}`}
										>
											<span className="text-base">🏠</span>
											Inicio del blog
										</Link>

										<div className="border-t border-black/6 dark:border-white/6 mb-3" />

										<div className="space-y-1">
											{nav.map((group) => (
												<TopGroup key={group.id} group={group} currentPath={currentPath} />
											))}
										</div>
									</div>
								</div>
							)}
						</div>

						{children}
					</main>

					{/* Footer */}
					<footer className="mt-auto border-t border-black/8 dark:border-white/8">
						<div className="px-5 sm:px-8 md:px-10 lg:px-14 py-8">
							<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
								<div className="flex items-center gap-2.5">
									<div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">A</div>
									<span className="text-sm font-medium text-[#1d1d1f] dark:text-white">Adrián Escribano</span>
								</div>
								<div className="flex items-center gap-5">
									<a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline">GitHub</a>
									<a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline">LinkedIn</a>
									<a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline">Email</a>
								</div>
								<p className="text-xs text-[#aeaeb2] dark:text-[#636366]">© {new Date().getFullYear()} Adrián Escribano</p>
							</div>
						</div>
					</footer>
				</div>
			</div>
		</div>
	);
}
