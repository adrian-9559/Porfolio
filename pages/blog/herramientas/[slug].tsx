"use client";
import { GetStaticPaths, GetStaticProps } from "next";
import BlogLayout from "@/layouts/blog";
import Link from "next/link";
import { getContentByType, formatDate, ContentMeta } from "@/lib/blog/registry";
import { componentMap } from "@/lib/blog/componentMap";
import { TaxonomyMetaStrip, ObjectivesBlock, RelatedContentBlock } from "@/components/blog/TaxonomyMeta";

interface Props {
	meta: ContentMeta;
	prevMeta: ContentMeta | null;
	nextMeta: ContentMeta | null;
}

export default function HerramientaPage({ meta, prevMeta, nextMeta }: Props) {
	const Component = componentMap[meta.id];

	return (
		<BlogLayout>
			<div className="max-w-3xl mx-auto space-y-10 py-4">
				{/* Breadcrumb */}
				<nav className="flex items-center gap-2 text-xs text-[#aeaeb2] dark:text-[#636366]">
					<Link href="/blog" className="hover:text-[#6e6e73] dark:hover:text-[#86868b] transition-colors no-underline">Blog</Link>
					<span>/</span>
					<Link href="/blog/herramientas" className="hover:text-[#6e6e73] dark:hover:text-[#86868b] transition-colors no-underline">Herramientas</Link>
					<span>/</span>
					<span className="text-[#6e6e73] dark:text-[#86868b] truncate max-w-[200px]">{meta.title}</span>
				</nav>

				{/* Header */}
				<div className="space-y-4">
					<div className="flex items-center gap-2 flex-wrap">
						<span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300">
							Herramienta interactiva
						</span>
						<span className="text-sm text-[#aeaeb2] dark:text-[#636366]">·</span>
						<span className="text-sm text-[#aeaeb2] dark:text-[#636366]">Disponible desde {formatDate(meta.publishedAt)}</span>
					</div>
					<TaxonomyMetaStrip meta={meta} />
					<h1 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
						{meta.title}
					</h1>
					<p className="text-base text-[#6e6e73] dark:text-[#86868b] leading-relaxed">{meta.description}</p>
					{meta.tags && (
						<div className="flex flex-wrap gap-2 pt-1">
							{meta.tags.map((tag) => (
								<span key={tag} className="tag-chip">{tag}</span>
							))}
						</div>
					)}
				</div>

				<ObjectivesBlock meta={meta} />

				<div className="h-px bg-black/8 dark:bg-white/8" />

				{Component ? <Component /> : (
					<div className="py-12 text-center text-[#6e6e73] dark:text-[#86868b]">Herramienta no disponible.</div>
				)}

				<RelatedContentBlock meta={meta} />

				{/* Footer nav */}
				<div className="pt-8 border-t border-black/8 dark:border-white/8 flex items-center justify-between gap-4 flex-wrap">
					<Link href="/blog/herramientas" className="inline-flex items-center gap-2 text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline">
						<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
						Todas las herramientas
					</Link>
					<div className="flex items-center gap-4">
						{prevMeta && (
							<Link href={`/blog/herramientas/${prevMeta.slug}`} className="text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline truncate max-w-[180px]">
								← {prevMeta.title}
							</Link>
						)}
						{nextMeta && (
							<Link href={`/blog/herramientas/${nextMeta.slug}`} className="text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors no-underline truncate max-w-[180px]">
								{nextMeta.title} →
							</Link>
						)}
					</div>
				</div>
			</div>
		</BlogLayout>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const tools = getContentByType("tool");
	return {
		paths: tools.map((t) => ({ params: { slug: t.slug } })),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const slug = params?.slug as string;
	const tools = getContentByType("tool");
	const idx = tools.findIndex((t) => t.slug === slug);
	if (idx === -1) return { notFound: true };
	return {
		props: {
			meta: tools[idx],
			prevMeta: tools[idx - 1] ?? null,
			nextMeta: tools[idx + 1] ?? null,
		},
	};
};
