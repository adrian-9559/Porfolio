"use client";
import { allContent, typeSlug } from "@/lib/blog/registry";
import {
	CATEGORIES,
	CATEGORY_GROUPS,
	CONTENT_RELATIONSHIPS,
	LEARNING_PATHS,
	LEVELS,
	STANDARD_TAGS,
	type RelationType
} from "@/lib/blog/taxonomy";
import Link from "next/link";
import { useState } from "react";

type Tab = "categories" | "levels" | "paths" | "relationships" | "tags";

const RELATION_LABEL: Record<RelationType, string> = {
	prerequisite: "Requisito previo",
	related: "Relacionado",
	next: "Siguiente paso",
	deepdive: "Profundiza",
};

const RELATION_COLOR: Record<RelationType, string> = {
	prerequisite: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30",
	related: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30",
	next: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
	deepdive: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30",
};

function TabBtn({ id, label, active, onClick }: { id: Tab; label: string; active: boolean; onClick: () => void }) {
	return (
		<button
			onClick={onClick}
			className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
				active
					? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f]"
					: "text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
			}`}
		>
			{label}
		</button>
	);
}

function CategoriesView() {
	const [search, setSearch] = useState("");
	const [activeGroup, setActiveGroup] = useState<string>("all");

	const filtered = CATEGORIES.filter((c) => {
		if (activeGroup !== "all" && c.group !== activeGroup) return false;
		if (search && !c.label.toLowerCase().includes(search.toLowerCase()) && !c.id.includes(search.toLowerCase())) return false;
		return true;
	});

	const contentCountByCategory: Record<string, number> = {};
	allContent.forEach((item) => {
		if (item.categoryId) contentCountByCategory[item.categoryId] = (contentCountByCategory[item.categoryId] ?? 0) + 1;
	});

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-3 flex-wrap">
				<input
					type="text"
					placeholder="Buscar categoría..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="flex-1 min-w-[180px] px-3 py-2 rounded-xl bg-white dark:bg-[#111116] border border-black/10 dark:border-white/10 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-400/20"
				/>
				<div className="flex items-center gap-1.5 flex-wrap">
					<button
						onClick={() => setActiveGroup("all")}
						className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${activeGroup === "all" ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f]" : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5"}`}
					>
						Todos
					</button>
					{CATEGORY_GROUPS.map((g) => (
						<button
							key={g.id}
							onClick={() => setActiveGroup(g.id)}
							className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${activeGroup === g.id ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f]" : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5"}`}
						>
							{g.label}
						</button>
					))}
				</div>
			</div>

			<div className="rounded-2xl border border-black/8 dark:border-white/8 overflow-hidden">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02]">
							<th className="text-left px-4 py-2.5 text-xs font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">ID / Etiqueta</th>
							<th className="text-left px-4 py-2.5 text-xs font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">Grupo</th>
							<th className="text-right px-4 py-2.5 text-xs font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">Contenido</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
						{filtered.map((cat) => (
							<tr key={cat.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
								<td className="px-4 py-3">
									<div className="flex items-center gap-2">
										<span className={`w-2 h-2 rounded-full ${cat.color.replace("text-", "bg-").split(" ")[0]}`} />
										<div>
											<p className={`text-xs font-semibold ${cat.color}`}>{cat.label}</p>
											<p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] font-mono">{cat.id}</p>
										</div>
									</div>
								</td>
								<td className="px-4 py-3">
									<span className="text-xs text-[#6e6e73] dark:text-[#86868b]">
										{CATEGORY_GROUPS.find((g) => g.id === cat.group)?.label ?? cat.group}
									</span>
								</td>
								<td className="px-4 py-3 text-right">
									<span className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
										{contentCountByCategory[cat.id] ?? 0}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{filtered.length === 0 && (
					<div className="py-8 text-center text-sm text-[#6e6e73] dark:text-[#86868b]">Sin resultados.</div>
				)}
			</div>
			<p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
				{filtered.length} de {CATEGORIES.length} categorías · Definidas en <code className="font-mono bg-black/5 dark:bg-white/5 px-1 rounded">lib/blog/taxonomy.ts</code>
			</p>
		</div>
	);
}

function LevelsView() {
	const contentCountByLevel: Record<string, number> = {};
	allContent.forEach((item) => {
		if (item.level) contentCountByLevel[item.level] = (contentCountByLevel[item.level] ?? 0) + 1;
	});

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				{LEVELS.map((lvl) => {
					const count = contentCountByLevel[lvl.id] ?? 0;
					return (
						<div key={lvl.id} className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-5 flex items-center gap-4">
							<div className={`w-10 h-10 rounded-xl flex items-center justify-center ${lvl.bgColor}`}>
								<span className={`text-sm font-bold ${lvl.color}`}>{lvl.id[0].toUpperCase()}</span>
							</div>
							<div className="flex-1 min-w-0">
								<p className={`text-sm font-semibold ${lvl.color}`}>{lvl.labelEs}</p>
								<p className="text-xs text-[#aeaeb2] dark:text-[#636366] font-mono">{lvl.id}</p>
							</div>
							<div className="text-right">
								<p className="text-xl font-bold text-[#1d1d1f] dark:text-white">{count}</p>
								<p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">contenidos</p>
							</div>
						</div>
					);
				})}
			</div>
			<p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
				{allContent.filter((c) => !c.level).length} contenidos sin nivel asignado de {allContent.length} totales.
			</p>
		</div>
	);
}

function PathsView() {
	const contentCountByPath: Record<string, number> = {};
	allContent.forEach((item) => {
		item.learningPaths?.forEach((p) => {
			contentCountByPath[p] = (contentCountByPath[p] ?? 0) + 1;
		});
	});

	return (
		<div className="space-y-3">
			{LEARNING_PATHS.map((path) => {
				const count = contentCountByPath[path.id] ?? 0;
				const steps = path.steps ?? [];
				return (
					<div key={path.id} className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-hidden">
						<div className="flex items-center gap-4 px-5 py-4">
							<span className="text-2xl">{path.icon}</span>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">{path.title}</p>
								<p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">{path.description}</p>
							</div>
							<div className="text-right flex-shrink-0">
								<p className="text-lg font-bold text-[#1d1d1f] dark:text-white">{count}</p>
								<p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">contenidos</p>
							</div>
						</div>
						{steps.length > 0 && (
							<div className="border-t border-black/8 dark:border-white/8 px-5 py-3">
								<p className="text-[10px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-2">Pasos ({steps.length})</p>
								<div className="flex flex-wrap gap-1.5">
									{steps.map((step, i) => (
										<span key={step.categoryId} className="px-2 py-0.5 rounded-full text-[10px] bg-black/5 dark:bg-white/5 text-[#6e6e73] dark:text-[#86868b]">
											{i + 1}. {step.label}
										</span>
									))}
								</div>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}

function RelationshipsView() {
	const [search, setSearch] = useState("");
	const [typeFilter, setTypeFilter] = useState<RelationType | "all">("all");

	const filtered = CONTENT_RELATIONSHIPS.filter((r) => {
		if (typeFilter !== "all" && r.type !== typeFilter) return false;
		if (search && !r.fromSlug.includes(search) && !r.toSlug.includes(search)) return false;
		return true;
	});

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-3 flex-wrap">
				<input
					type="text"
					placeholder="Filtrar por slug..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="flex-1 min-w-[180px] px-3 py-2 rounded-xl bg-white dark:bg-[#111116] border border-black/10 dark:border-white/10 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-400/20"
				/>
				<div className="flex items-center gap-1.5">
					<button
						onClick={() => setTypeFilter("all")}
						className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${typeFilter === "all" ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f]" : "border border-black/10 dark:border-white/10 text-[#6e6e73]"}`}
					>
						Todos
					</button>
					{(["prerequisite", "related", "next", "deepdive"] as RelationType[]).map((t) => (
						<button
							key={t}
							onClick={() => setTypeFilter(t)}
							className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${typeFilter === t ? `${RELATION_COLOR[t]}` : "border border-black/10 dark:border-white/10 text-[#6e6e73] dark:text-[#86868b]"}`}
						>
							{RELATION_LABEL[t]}
						</button>
					))}
				</div>
			</div>

			<div className="rounded-2xl border border-black/8 dark:border-white/8 overflow-hidden">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02]">
							<th className="text-left px-4 py-2.5 text-xs font-semibold text-[#aeaeb2] uppercase tracking-wider">Desde</th>
							<th className="text-left px-4 py-2.5 text-xs font-semibold text-[#aeaeb2] uppercase tracking-wider">Tipo</th>
							<th className="text-left px-4 py-2.5 text-xs font-semibold text-[#aeaeb2] uppercase tracking-wider">Hacia</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
						{filtered.map((rel, i) => {
							const fromContent = allContent.find((c) => c.slug === rel.fromSlug);
							const toContent = allContent.find((c) => c.slug === rel.toSlug);
							return (
								<tr key={i} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
									<td className="px-4 py-3">
										{fromContent ? (
											<Link href={`/blog/${typeSlug(fromContent.type)}/${fromContent.slug}`} className="text-xs text-blue-600 dark:text-blue-400 hover:underline no-underline">
												{fromContent.title}
											</Link>
										) : (
											<span className="text-xs font-mono text-[#aeaeb2]">{rel.fromSlug}</span>
										)}
									</td>
									<td className="px-4 py-3">
										<span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${RELATION_COLOR[rel.type]}`}>
											{RELATION_LABEL[rel.type]}
										</span>
									</td>
									<td className="px-4 py-3">
										{toContent ? (
											<Link href={`/blog/${typeSlug(toContent.type)}/${toContent.slug}`} className="text-xs text-blue-600 dark:text-blue-400 hover:underline no-underline">
												{toContent.title}
											</Link>
										) : (
											<span className="text-xs font-mono text-[#aeaeb2]">{rel.toSlug}</span>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				{filtered.length === 0 && (
					<div className="py-8 text-center text-sm text-[#6e6e73] dark:text-[#86868b]">Sin relaciones con esos filtros.</div>
				)}
			</div>
			<p className="text-xs text-[#aeaeb2] dark:text-[#636366]">{filtered.length} de {CONTENT_RELATIONSHIPS.length} relaciones</p>
		</div>
	);
}

function TagsView() {
	const [search, setSearch] = useState("");

	const tagCounts: Record<string, number> = {};
	allContent.forEach((item) => {
		item.tags?.forEach((tag) => {
			tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
		});
	});

	const allTags = Array.from(new Set([...STANDARD_TAGS, ...Object.keys(tagCounts)])).sort();
	const filtered = allTags.filter((t) => !search || t.toLowerCase().includes(search.toLowerCase()));

	return (
		<div className="space-y-4">
			<input
				type="text"
				placeholder="Buscar tag..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="w-full max-w-sm px-3 py-2 rounded-xl bg-white dark:bg-[#111116] border border-black/10 dark:border-white/10 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-400/20"
			/>
			<div className="flex flex-wrap gap-2">
				{filtered.map((tag) => {
					const count = tagCounts[tag] ?? 0;
					const isStandard = STANDARD_TAGS.includes(tag as (typeof STANDARD_TAGS)[number]);
					return (
						<div
							key={tag}
							className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-colors ${
								isStandard
									? "border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300"
									: "border-black/10 dark:border-white/10 bg-white dark:bg-[#111116] text-[#6e6e73] dark:text-[#86868b]"
							}`}
						>
							<span className="font-medium">{tag}</span>
							{count > 0 && (
								<span className={`font-bold ${isStandard ? "text-blue-500" : "text-[#aeaeb2]"}`}>{count}</span>
							)}
						</div>
					);
				})}
			</div>
			<p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
				{filtered.length} tags · <span className="text-blue-600 dark:text-blue-400">{STANDARD_TAGS.filter((t) => filtered.includes(t)).length} estándar</span> · {filtered.filter((t) => !(STANDARD_TAGS as readonly string[]).includes(t) && tagCounts[t] > 0).length} personalizados
			</p>
		</div>
	);
}

export default function AdminTaxonomySection() {
	const [tab, setTab] = useState<Tab>("categories");

	const tabs: { id: Tab; label: string }[] = [
		{ id: "categories", label: "Categorías" },
		{ id: "levels", label: "Niveles" },
		{ id: "paths", label: "Rutas de aprendizaje" },
		{ id: "relationships", label: "Relaciones" },
		{ id: "tags", label: "Tags" },
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between flex-wrap gap-3">
				<div>
					<h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white">Taxonomía educativa</h2>
					<p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-0.5">
						Categorías, niveles, rutas de aprendizaje, relaciones y tags del blog.
					</p>
				</div>
				<div className="flex items-center gap-3 text-xs text-[#aeaeb2] dark:text-[#636366]">
					<span className="font-mono bg-black/5 dark:bg-white/5 px-2 py-1 rounded-lg">{CATEGORIES.length} categorías</span>
					<span className="font-mono bg-black/5 dark:bg-white/5 px-2 py-1 rounded-lg">{LEARNING_PATHS.length} rutas</span>
					<span className="font-mono bg-black/5 dark:bg-white/5 px-2 py-1 rounded-lg">{allContent.length} contenidos</span>
				</div>
			</div>

			<div className="flex items-center gap-1 p-1 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] w-fit">
				{tabs.map((t) => (
					<TabBtn key={t.id} id={t.id} label={t.label} active={tab === t.id} onClick={() => setTab(t.id)} />
				))}
			</div>

			{tab === "categories" && <CategoriesView />}
			{tab === "levels" && <LevelsView />}
			{tab === "paths" && <PathsView />}
			{tab === "relationships" && <RelationshipsView />}
			{tab === "tags" && <TagsView />}
		</div>
	);
}
