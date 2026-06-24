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

// ── Chevron icon ──────────────────────────────────────────────────────────────

function Chevron({ open }: { open: boolean }) {
	return (
		<svg
			className={`w-3 h-3 text-[#aeaeb2] transition-transform duration-200 ${open ? "rotate-90" : ""}`}
			fill="none" viewBox="0 0 24 24" stroke="currentColor"
		>
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
		</svg>
	);
}

// ── Sidebar item ──────────────────────────────────────────────────────────────

function SidebarItem({ item, active }: { item: NavItem; active: boolean }) {
	return (
		<Link
			href={item.href}
			className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-150 no-underline group ${
				active
					? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-semibold"
					: "text-[#3a3a3c] dark:text-[#aeaeb2] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:text-[#1d1d1f] dark:hover:text-white"
			}`}
		>
			{item.color && (
				<span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.color}`} />
			)}
			<span className="flex-1 min-w-0 truncate leading-snug">{item.label}</span>
		</Link>
	);
}

// ── Sub-group (e.g. Lenguajes / Frameworks) ───────────────────────────────────

function SubGroup({ group, currentPath }: { group: NavGroup; currentPath: string }) {
	const [open, toggle] = useCollapseState(group.id, group.defaultOpen ?? true);

	return (
		<div className="mt-1">
			<button
				onClick={toggle}
				className="flex items-center gap-1.5 w-full px-3 py-1 rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors group"
			>
				<Chevron open={open} />
				<span className={`${group.color} flex-shrink-0`}>{group.icon}</span>
				<span className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] group-hover:text-[#6e6e73] dark:group-hover:text-[#86868b] transition-colors">
					{group.label}
				</span>
				<span className="ml-auto text-[9px] text-[#aeaeb2] dark:text-[#636366]">{group.items?.length}</span>
			</button>

			<div
				className="overflow-hidden transition-all duration-200"
				style={{ maxHeight: open ? `${(group.items?.length ?? 0) * 36 + 8}px` : "0px" }}
			>
				<div className="ml-4 pl-2 border-l border-black/8 dark:border-white/8 mt-0.5 space-y-0.5 pb-1">
					{group.items?.map((item) => (
						<SidebarItem key={item.id} item={item} active={currentPath === item.href} />
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

	return (
		<div className="mt-4">
			{/* Group header */}
			<button
				onClick={toggle}
				className={`flex items-center gap-2 w-full px-3 py-1.5 rounded-lg transition-colors group ${
					isGroupActive ? "opacity-100" : ""
				}`}
			>
				<Chevron open={open} />
				<span className={group.color}>{group.icon}</span>
				<span
					className={`text-[10px] font-semibold uppercase tracking-wider transition-colors ${
						isGroupActive
							? "text-[#1d1d1f] dark:text-white"
							: "text-[#aeaeb2] dark:text-[#636366] group-hover:text-[#6e6e73] dark:group-hover:text-[#86868b]"
					}`}
				>
					{group.label}
				</span>
				{group.href && (
					<Link
						href={group.href}
						onClick={(e) => e.stopPropagation()}
						className="ml-auto text-[9px] text-[#aeaeb2] dark:text-[#636366] hover:text-blue-500 no-underline"
					>
						ver todos
					</Link>
				)}
			</button>

			{/* Content */}
			<div
				className="overflow-hidden transition-all duration-200"
				style={{
					maxHeight: open
						? `${allItems.length * 36 + (hasChildren ? (group.children?.length ?? 0) * 40 : 0) + 40}px`
						: "0px",
				}}
			>
				{/* Direct items */}
				{hasItems && (
					<div className="ml-4 pl-2 border-l border-black/8 dark:border-white/8 mt-0.5 space-y-0.5 pb-1">
						{group.items!.map((item) => (
							<SidebarItem key={item.id} item={item} active={currentPath === item.href} />
						))}
					</div>
				)}

				{/* Nested sub-groups */}
				{hasChildren && (
					<div className="ml-4 pl-2 border-l border-black/8 dark:border-white/8 mt-0.5 pb-1">
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
		<div className="relative px-1 mb-4">
			<div className="relative">
				<svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#aeaeb2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
				<input
					type="text"
					placeholder="Buscar..."
					value={q}
					onChange={(e) => setQ(e.target.value)}
					className="w-full pl-7 pr-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/8 dark:border-white/8 text-xs text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] dark:placeholder-[#636366] focus:outline-none focus:ring-1 focus:ring-blue-400/40"
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
						return (
							<Link
								key={item.id}
								href={href}
								onClick={() => setQ("")}
								className={`flex items-center gap-2 px-3 py-2 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] no-underline ${currentPath === href ? "bg-blue-50 dark:bg-blue-950/20" : ""}`}
							>
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
					<div className="px-3 mb-4">
						<p className="text-[10px] font-semibold uppercase tracking-widest text-[#aeaeb2] dark:text-[#636366]">Blog</p>
						<Link href="/blog" className="block text-base font-bold text-[#1d1d1f] dark:text-white mt-0.5 no-underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
							Contenido
						</Link>
					</div>

					{/* Search */}
					<SidebarSearch currentPath={currentPath} />

					{/* Home link */}
					<Link
						href="/blog"
						className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all no-underline mb-1 ${
							currentPath === "/blog"
								? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-semibold"
								: "text-[#3a3a3c] dark:text-[#aeaeb2] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
						}`}
					>
						<svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
						</svg>
						Inicio del blog
					</Link>

					{/* Nav groups */}
					{nav.map((group) => (
						<TopGroup key={group.id} group={group} currentPath={currentPath} />
					))}
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
										<div className="flex items-center justify-between px-3 mb-4">
											<div>
												<p className="text-[10px] font-semibold uppercase tracking-widest text-[#aeaeb2]">Blog</p>
												<p className="text-base font-bold text-[#1d1d1f] dark:text-white mt-0.5">Contenido</p>
											</div>
											<button onClick={() => setMobileOpen(false)} className="p-1 text-[#aeaeb2] hover:text-[#6e6e73]">
												<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
												</svg>
											</button>
										</div>

										<SidebarSearch currentPath={currentPath} />

										<Link
											href="/blog"
											onClick={() => setMobileOpen(false)}
											className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs no-underline mb-1 ${currentPath === "/blog" ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-semibold" : "text-[#3a3a3c] dark:text-[#aeaeb2]"}`}
										>
											<svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
											</svg>
											Inicio del blog
										</Link>

										{nav.map((group) => (
											<TopGroup key={group.id} group={group} currentPath={currentPath} />
										))}
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
									<div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">A</div>
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
