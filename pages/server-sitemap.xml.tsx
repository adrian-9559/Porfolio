import { GetServerSideProps } from "next";

import { allContent, contentHref, getGuides } from "@/lib/blog/registry";

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const staticPages = [
    "/",
    "/about",
    "/CV",
    "/contact",
    "/blog",
    "/blog/articulos",
    "/blog/herramientas",
    "/campus",
    "/campus/guias",
    "/tools",
    "/tools/git-repositories",
  ];

  const blogPages = allContent.map((c) => contentHref(c.type, c.slug));

  // Las guías no viven en allContent (no cubiertas por contentHref) → se añaden
  // sus URLs manualmente para no perder su indexación al migrar de /blog/tutoriales/guias.
  const guidePages = getGuides().map((g) => `/campus/guias/${g.slug}`);

  const allUrls = [...staticPages, ...blogPages, ...guidePages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${allUrls
    .map(
      (url) => `
	<url>
		<loc>https://porfolio.dev${url}</loc>
		<lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>${url === "/" ? "1.0" : "0.8"}</priority>
	</url>`,
    )
    .join("")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default Sitemap;
