import Head from "next/head";
import Link from "next/link";
import DefaultLayout from "@/layouts/default";
import { useT } from "@/hooks/useT";

export default function Custom500() {
  const { t } = useT();

  return (
    <DefaultLayout
      seo={{
        title: t("meta.serverError.title"),
        description: t("meta.serverError.desc"),
      }}
    >
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="text-8xl font-black text-[#aeaeb2] dark:text-[#636366] select-none" aria-hidden="true">
          500
        </span>
        <h1 className="text-2xl font-bold text-[#1d1d1f] dark:text-white mt-4 mb-2">
          {t("errors.serverErrorHeader")}
        </h1>
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] max-w-md mb-8">
          {t("errors.serverErrorDetail")}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] font-semibold text-sm hover:opacity-90 transition-opacity no-underline"
        >
          {t("errors.goHome")}
        </Link>
      </div>
    </DefaultLayout>
  );
}
