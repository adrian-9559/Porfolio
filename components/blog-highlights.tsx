"use client";
import Link from "next/link";
import { useT } from "@/hooks/useT";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface BlogPost {
  title: string;
  excerpt: string;
  slug: string;
  type: "article" | "tutorial";
  tags: string[];
  date: string;
  gradient: string;
}

const FEATURED_POSTS: BlogPost[] = [
  {
    title: "React Hooks: Guía completa",
    excerpt: "Domina useState, useEffect, useContext y custom hooks con ejemplos prácticos y patrones avanzados.",
    slug: "react-hooks",
    type: "article",
    tags: ["React", "Hooks", "JavaScript"],
    date: "2024",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Next.js App Router",
    excerpt: "Todo sobre el nuevo App Router de Next.js 14: layouts, loading states y server components.",
    slug: "nextjs-app-router",
    type: "tutorial",
    tags: ["Next.js", "React"],
    date: "2024",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    title: "TypeScript Tips",
    excerpt: "10 trucos de TypeScript que mejorarán tu desarrollo y harán tu código más robusto.",
    slug: "typescript-tips",
    type: "article",
    tags: ["TypeScript", "Tips"],
    date: "2024",
    gradient: "from-emerald-500 to-teal-500",
  },
];

export default function BlogHighlights() {
  const { t } = useT();

  return (
    <section className="w-full">
      <div className="space-y-10">
        <ScrollReveal>
          <div className="text-center space-y-2">
            <p className="section-label">{t("sections.blog.badge")}</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ letterSpacing: "-0.03em" }}>
              {t("sections.blog.title")}
            </h2>
            <p className="text-[#6e6e73] dark:text-[#86868b] max-w-xl mx-auto text-sm">
              {t("sections.blog.desc")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURED_POSTS.map((post, idx) => (
            <ScrollReveal key={post.slug} delay={idx * 100}>
              <Link
                href={`/${post.type === "tutorial" ? "campus/tutoriales" : "blog/articulos"}/${post.slug}`}
                className="group block h-full no-underline"
              >
                <div className="h-full p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className={`w-full h-1 rounded-full bg-gradient-to-r ${post.gradient} mb-5 opacity-80`} />

                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      post.type === "tutorial"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    }`}>
                      {post.type}
                    </span>
                    <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">{post.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#6e6e73] dark:text-[#86868b] leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-black/6 dark:border-white/6">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/5 dark:bg-white/10 text-[#3d3d3d] dark:text-[#c0c0c5]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="flex justify-center">
            <Link
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] font-semibold text-sm hover:opacity-90 transition-opacity no-underline"
              href="/blog"
            >
              {t("sections.blog.viewAll")} →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
