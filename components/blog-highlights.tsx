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
    excerpt:
      "Domina useState, useEffect, useContext y custom hooks con ejemplos prácticos y patrones avanzados.",
    slug: "react-framework",
    type: "tutorial",
    tags: ["React", "Hooks", "JavaScript"],
    date: "2024",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Next.js App Router",
    excerpt:
      "Todo sobre el nuevo App Router de Next.js 14: layouts, loading states y server components.",
    slug: "nextjs-framework",
    type: "tutorial",
    tags: ["Next.js", "React"],
    date: "2024",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    title: "TypeScript Tips",
    excerpt:
      "10 trucos de TypeScript que mejorarán tu desarrollo y harán tu código más robusto.",
    slug: "typescript",
    type: "tutorial",
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
            <p className="ds-section-label">{t("sections.blog.badge")}</p>
            <h2
              className="text-3xl md:text-4xl font-black"
              style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
            >
              {t("sections.blog.title")}
            </h2>
            <p
              className="max-w-xl mx-auto text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("sections.blog.desc")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURED_POSTS.map((post, idx) => (
            <ScrollReveal key={post.slug} delay={idx * 100}>
              <Link
                className="group block h-full no-underline"
                href={`/${post.type === "tutorial" ? "campus/tutoriales" : "blog/articulos"}/${post.slug}`}
              >
                <div className="h-full p-6 rounded-2xl ds-card flex flex-col">
                  <div
                    className={`w-full h-1 rounded-full bg-gradient-to-r ${post.gradient} mb-5 opacity-80`}
                  />

                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        post.type === "tutorial"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      }`}
                    >
                      {post.type}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {post.date}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-bold mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {post.excerpt}
                  </p>

                  <div
                    className="flex flex-wrap gap-1.5 mt-4 pt-4"
                    style={{ borderTop: "1px solid var(--border-default)" }}
                  >
                    {post.tags.map((tag) => (
                      <span key={tag} className="ds-badge">
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
            <Link className="ds-btn-primary no-underline" href="/blog">
              {t("sections.blog.viewAll")} →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
