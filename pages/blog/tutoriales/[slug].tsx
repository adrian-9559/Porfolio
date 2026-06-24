"use client";
import { GetStaticPaths, GetStaticProps } from "next";
import BlogLayout from "@/layouts/blog";
import Link from "next/link";
import { getContentByType, formatDate, ContentMeta } from "@/lib/blog/registry";
import { componentMap } from "@/lib/blog/componentMap";
import { TaxonomyMetaStrip, PrerequisitesBlock, ObjectivesBlock, RelatedContentBlock } from "@/components/blog/TaxonomyMeta";

interface Props {
	meta: ContentMeta;
	prevMeta: ContentMeta | null;
	nextMeta: ContentMeta | null;
}

export default function TutorialPage({ meta, prevMeta, nextMeta }: Props) {
	const Component = componentMap[meta.id];

	return (
		<BlogLayout>
			<div className="max-w-3xl mx-auto space-y-10 py-4">
				{/* Breadcrumb */}
				<nav className="flex items-center gap-2 text-xs text-[#aeaeb2] dark:text-[#636366]">
					<Link href="/blog" className="hover:text-[#6e6e73] dark:hover:text-[#86868b] transition-colors no-underline">Blog</Link>
					<span>/</span>
					<Link href="/blog/tutoriales" className="hover:text-[#6e6e73] dark:hover:text-[#86868b] transition-colors no-underline">Tutoriales</Link>
					<span>/</span>
					<span className="text-[#6e6e73] dark:text-[#86868b] truncate max-w-[200px]">{meta.title}</span>
				</nav>

				{/* Header */}
				<div className="space-y-4">
					<div className="flex items-center gap-2 flex-wrap">
						<span className={`w-2.5 h-2.5 rounded-full ${meta.categoryColor}`} />
						<span className="text-sm font-semibold text-[#6e6e73] dark:text-[#86868b]">{meta.category}</span>
						<span className="text-sm text-[#aeaeb2] dark:text-[#636366]">·</span>
						<span className="text-sm text-[#aeaeb2] dark:text-[#636366]">{formatDate(meta.publishedAt)}</span>
						<span className="text-sm text-[#aeaeb2] dark:text-[#636366]">·</span>
						<span className="text-sm text-[#aeaeb2] dark:text-[#636366]">{meta.readTime} de lectura</span>
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

				<PrerequisitesBlock meta={meta} />
				<ObjectivesBlock meta={meta} />

				<div className="h-px bg-black/8 dark:bg-white/8" />

				{Component ? <Component /> : (
					<div className="py-12 text-center text-[#6e6e73] dark:text-[#86868b]">Contenido no disponible.</div>
				)}

				<RelatedContentBlock meta={meta} />

				{/* Footer nav */}
				<div className="pt-8 border-t border-black/8 dark:border-white/8 flex items-center justify-between gap-4 flex-wrap">
					<Link href="/blog/tutoriales" className="inline-flex items-center gap-2 text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline">
						<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
						Todos los tutoriales
					</Link>
					<div className="flex items-center gap-4">
						{prevMeta && (
							<Link href={`/blog/tutoriales/${prevMeta.slug}`} className="text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline truncate max-w-[180px]">
								← {prevMeta.title}
							</Link>
						)}
						{nextMeta && (
							<Link href={`/blog/tutoriales/${nextMeta.slug}`} className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors no-underline truncate max-w-[180px]">
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
	const tutorials = getContentByType("tutorial");
	return {
		paths: tutorials.map((t) => ({ params: { slug: t.slug } })),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const slug = params?.slug as string;
	const tutorials = getContentByType("tutorial");
	const idx = tutorials.findIndex((t) => t.slug === slug);
	if (idx === -1) return { notFound: true };
	return {
		props: {
			meta: tutorials[idx],
			prevMeta: tutorials[idx - 1] ?? null,
			nextMeta: tutorials[idx + 1] ?? null,
		},
	};
};
