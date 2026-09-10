import Head from "next/head";
import Link from "next/link";

import DefaultLayout from "@/layouts/default";
import { useT } from "@/hooks/useT";
import { getContentBySlug } from "@/lib/blog/registry";
import { getToolIcon } from "@/components/blog/tools/ToolIcons";
import { ToolRenderer } from "@/components/blog/tools/ToolRenderer";

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const meta = getContentBySlug(params.slug);

  if (!meta || meta.type !== "tool") return { notFound: true };

  return { props: { meta } };
}

export default function ToolPage({
  meta,
}: {
  meta: {
    slug: string;
    title: string;
    description: string;
    category: string;
    readTime: string;
    tags?: string[];
  };
}) {
  const { t } = useT();
  const Icon = getToolIcon(meta.slug);

  return (
    <DefaultLayout>
      <Head>
        <title>{meta.title} | Herramientas</title>
        <meta content={meta.description} name="description" />
        <meta content={meta.title} property="og:title" />
        <meta content={meta.description} property="og:description" />
      </Head>

      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
          <Link
            className="hover:text-[var(--accent)] transition-colors no-underline text-[var(--text-muted)]"
            href="/tools"
          >
            {t("tools.header")}
          </Link>
          <span>/</span>
          <span className="text-[var(--text-primary)]">{meta.title}</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          {Icon && (
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-brand-from)] to-[var(--color-brand-via)] flex items-center justify-center text-white">
              <Icon className="w-6 h-6" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              {meta.title}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {meta.description}
            </p>
          </div>
        </div>

        {/* Tags */}
        {meta.tags && meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {meta.tags.map((tag) => (
              <span key={tag} className="ds-badge">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Tool content */}
        <ToolRenderer slug={meta.slug} />
      </div>
    </DefaultLayout>
  );
}
