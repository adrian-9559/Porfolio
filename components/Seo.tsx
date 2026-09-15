import Head from "next/head";
import { useRouter } from "next/router";
import { siteConfig } from "@/config/site";

type Props = {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export default function Seo({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  noindex,
  jsonLd,
}: Props) {
  const router = useRouter();
  const url = canonical ?? `${siteConfig.url}${router.asPath.split("?")[0]}`;
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const metaDesc = description ?? siteConfig.description;
  const image = ogImage ?? `${siteConfig.url}/og-default.png`;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={siteConfig.locale} />
      <meta property="og:site_name" content={siteConfig.name} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={image} />
      {siteConfig.twitterHandle && <meta name="twitter:creator" content={siteConfig.twitterHandle} />}
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
    </Head>
  );
}
