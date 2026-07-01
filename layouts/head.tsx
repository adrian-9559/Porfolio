import { useRouter } from "next/router";
import NextHead from "next/head";

import { useT } from "@/hooks/useT";
import { siteConfig } from "@/config/site";

export interface HeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

interface MetaKeys {
  titleKey: string;
  descKey: string;
  params?: Record<string, string>;
}

/**
 * Route-based meta key resolution when no explicit props are passed.
 * Returns translation keys instead of hardcoded strings.
 */
function resolvePageMetaKeys(
  pathname: string,
): MetaKeys {
  const p = pathname;

  const exact: Record<string, MetaKeys> = {
    "/": { titleKey: "meta.home.title", descKey: "meta.home.desc" },
    "/about": { titleKey: "meta.about.title", descKey: "meta.about.desc" },
    "/CV": { titleKey: "meta.cv.title", descKey: "meta.cv.desc" },
    "/contact": { titleKey: "meta.contact.title", descKey: "meta.contact.desc" },
    "/dashboard": { titleKey: "meta.dashboard.title", descKey: "meta.dashboard.desc" },
    "/admin": { titleKey: "meta.admin.title", descKey: "meta.admin.desc" },
    "/configuracion": { titleKey: "meta.config.title", descKey: "meta.config.desc" },
    "/perfil": { titleKey: "meta.perfil.title", descKey: "meta.perfil.desc" },
    "/settings": { titleKey: "meta.settings.title", descKey: "meta.settings.desc" },
    "/docs": { titleKey: "meta.docs.title", descKey: "meta.docs.desc" },
    "/docs/database": { titleKey: "meta.docsDatabase.title", descKey: "meta.docsDatabase.desc" },
    "/blog": { titleKey: "meta.blog.title", descKey: "meta.blog.desc" },
    "/blog/articulos": { titleKey: "meta.blogArticles.title", descKey: "meta.blogArticles.desc" },
    "/blog/tutoriales": { titleKey: "meta.blogTutorials.title", descKey: "meta.blogTutorials.desc" },
    "/blog/herramientas": { titleKey: "meta.blogTools.title", descKey: "meta.blogTools.desc" },
    "/blog/tutoriales/guias": { titleKey: "meta.blogGuides.title", descKey: "meta.blogGuides.desc" },
  };

  if (exact[p]) return exact[p];

  if (p.startsWith("/blog/articulos/"))
    return { titleKey: "meta.blogArticleSlug.title", descKey: "meta.blogArticleSlug.desc", params: { description: siteConfig.description } };
  if (p.startsWith("/blog/tutoriales/guias/"))
    return { titleKey: "meta.blogGuideSlug.title", descKey: "meta.blogGuideSlug.desc", params: { description: siteConfig.description } };
  if (p.startsWith("/blog/tutoriales/"))
    return { titleKey: "meta.blogTutorialSlug.title", descKey: "meta.blogTutorialSlug.desc", params: { description: siteConfig.description } };
  if (p.startsWith("/blog/herramientas/"))
    return { titleKey: "meta.blogToolSlug.title", descKey: "meta.blogToolSlug.desc", params: { description: siteConfig.description } };
  if (p.startsWith("/CV/formacion/"))
    return { titleKey: "meta.cvFormation.title", descKey: "meta.cvFormation.desc", params: { description: siteConfig.description } };

  return { titleKey: "meta.defaultTitle", descKey: "meta.defaultDesc" };
}

export const Head = ({
  title,
  description,
  ogImage,
  ogType,
  canonical,
}: HeadProps) => {
  const { t } = useT();
  const router = useRouter();

  let pageTitle: string;
  let pageDescription: string;

  if (title) {
    pageTitle = title;
    pageDescription = description ?? siteConfig.description;
  } else {
    const metaKeys = resolvePageMetaKeys(router.pathname);
    pageTitle = t(metaKeys.titleKey, metaKeys.params);
    pageDescription = t(metaKeys.descKey, metaKeys.params);
  }
  const pageOgImage = ogImage;
  const pageOgType = ogType || "website";
  const pageCanonical = canonical || siteConfig.url;

  const noindexPaths = ["/dashboard", "/admin", "/configuracion", "/perfil", "/settings", "/notifications", "/tools/git-repositories"];
  const isNoindex = noindexPaths.some((p) => router.pathname === p || router.pathname.startsWith(p + "/") || router.pathname.startsWith("/admin/"));

  return (
    <NextHead>
      <title>{pageTitle}</title>
      <meta key="description" content={pageDescription} name="description" />
      {isNoindex && <meta key="robots" content="noindex, nofollow" name="robots" />}
      <meta key="og:title" content={pageTitle} property="og:title" />
      <meta
        key="og:description"
        content={pageDescription}
        property="og:description"
      />
      <meta key="og:locale" content={siteConfig.locale} property="og:locale" />
      <link key="hreflang" href={pageCanonical} hrefLang="es" rel="alternate" />
      <link key="hreflang-x" href={pageCanonical} hrefLang="x-default" rel="alternate" />
      <meta key="og:type" content={pageOgType} property="og:type" />
      <meta key="og:url" content={pageCanonical} property="og:url" />
      {pageOgImage && (
        <>
          <meta key="og:image" content={pageOgImage} property="og:image" />
          <meta key="og:image:width" content="1200" property="og:image:width" />
          <meta key="og:image:height" content="630" property="og:image:height" />
          <meta key="twitter:image" content={pageOgImage} name="twitter:image" />
        </>
      )}
      <meta
        key="twitter:card"
        content="summary_large_image"
        name="twitter:card"
      />
      <meta
        key="twitter:site"
        content={siteConfig.twitterHandle}
        name="twitter:site"
      />
      <meta key="twitter:title" content={pageTitle} name="twitter:title" />
      <meta
        key="twitter:description"
        content={pageDescription}
        name="twitter:description"
      />
      <meta
        key="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0"
        name="viewport"
      />
      <link href="/favicon.ico" rel="icon" />
      {canonical && <link key="canonical" href={canonical} rel="canonical" />}
    </NextHead>
  );
};
