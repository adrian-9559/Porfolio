"use client";
import Link from "next/link";

import { useT } from "@/hooks/useT";
import { IconGraduation, IconChevronRight } from "@/components/blog/shared";

export function CampusPromoBanner() {
  const { t } = useT();

  return (
    <section aria-labelledby="campus-promo-title">
      <Link
        className="group relative block overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-green-950/20 border border-emerald-200 dark:border-emerald-800/40 hover:shadow-xl hover:shadow-emerald-500/5 hover:scale-[1.005] transition-all duration-300 no-underline motion-safe:transition-all"
        href="/campus"
      >
        <div
          aria-hidden="true"
          className="h-1.5 w-full bg-gradient-to-r from-emerald-400 to-teal-400"
        />
        <div className="p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 motion-safe:transition-transform">
            <IconGraduation className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              {t("blog.campusPromoBadge")}
            </p>
            <h2
              className="text-lg md:text-xl font-black text-[#1d1d1f] dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mt-0.5"
              id="campus-promo-title"
              style={{ letterSpacing: "-0.02em" }}
            >
              {t("blog.campusPromoTitle")}
            </h2>
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b] leading-relaxed mt-1">
              {t("blog.campusPromoDesc")}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 flex-shrink-0 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white text-sm font-semibold rounded-full px-4 py-2 transition-colors duration-200 motion-safe:transition-colors">
            {t("blog.campusPromoCta")}
            <IconChevronRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </section>
  );
}
