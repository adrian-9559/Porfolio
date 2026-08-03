import Head from "next/head";
import Link from "next/link";

import DefaultLayout from "@/layouts/default";
import { useT } from "@/hooks/useT";

export default function Custom404() {
  const { t } = useT();

  return (
    <DefaultLayout
      seo={{
        title: t("meta.notFound.title"),
        description: t("meta.notFound.desc"),
      }}
    >
      <Head>
        <meta content="noindex" name="robots" />
      </Head>
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span
          aria-hidden="true"
          className="text-8xl font-black text-muted/60 select-none"
        >
          404
        </span>
        <h1 className="text-2xl font-bold text-foreground mt-4 mb-2">
          {t("errors.notFoundHeader")}
        </h1>
        <p className="text-sm text-muted max-w-md mb-8">
          {t("errors.notFoundDetail")}
        </p>
        <Link
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] font-semibold text-sm hover:opacity-90 transition-opacity no-underline"
          href="/"
        >
          {t("errors.goHome")}
        </Link>
      </div>
    </DefaultLayout>
  );
}
