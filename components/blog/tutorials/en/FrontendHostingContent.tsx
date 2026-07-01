import Link from "next/link";

import { getWebsiteImage } from "@/functions/getWebSiteInfo";

const platforms = [
  {
    name: "Vercel",
    url: "https://vercel.com",
    badge: "⭐ Recommended",
    badgeColor:
      "bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/50",
    plan: "Generous free tier",
    planColor: "text-green-600 dark:text-green-400",
    description:
      "The platform created by the Next.js team. Automatic deployment from GitHub, preview deployments per PR, and global edge functions. It's the current standard for React and Next.js apps.",
    pros: [
      "Instant deploy from GitHub/GitLab",
      "Preview per Pull Request",
      "Edge Network in 70+ regions",
      "Built-in analytics",
      "Perfect for Next.js",
    ],
    cons: [
      "Free plan has 100GB/month bandwidth limit",
      "Slow builds on free plan",
    ],
  },
  {
    name: "Netlify",
    url: "https://netlify.com",
    badge: "Very popular",
    badgeColor:
      "bg-teal-100 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800/50",
    plan: "Generous free tier",
    planColor: "text-green-600 dark:text-green-400",
    description:
      "Pioneer in JAMstack. Excellent for static sites, Gatsby, Astro, and any framework. Includes forms, identity, and serverless functions.",
    pros: [
      "Free forms (100 submissions/month)",
      "Visual drag & drop deploy",
      "Built-in split testing",
      "Netlify Functions (serverless)",
    ],
    cons: [
      "Limited build minutes on free plan (300 min/month)",
      "Less optimized for Next.js than Vercel",
    ],
  },
  {
    name: "Cloudflare Pages",
    url: "https://pages.cloudflare.com",
    badge: "Most generous",
    badgeColor:
      "bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/50",
    plan: "Unlimited free",
    planColor: "text-green-600 dark:text-green-400",
    description:
      "The most generous free plan option. Unlimited requests, unlimited bandwidth, and access to Cloudflare's network. Workers for serverless logic.",
    pros: [
      "Unlimited free bandwidth",
      "Unlimited free requests",
      "Cloudflare global network (<50ms)",
      "Built-in Cloudflare Workers",
    ],
    cons: [
      "Less mature ecosystem for Next.js",
      "Somewhat more complex to configure",
    ],
  },
  {
    name: "GitHub Pages",
    url: "https://pages.github.com",
    badge: "Static only",
    badgeColor:
      "bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700/50",
    plan: "Free",
    planColor: "text-green-600 dark:text-green-400",
    description:
      "Static hosting directly from your GitHub repository. Ideal for portfolios, documentation, and open source projects. Does not support SSR.",
    pros: [
      "100% free forever",
      "Perfect GitHub integration",
      "Free github.io domain",
      "Ideal for open source projects",
    ],
    cons: [
      "Static sites only (no SSR/API routes)",
      "Slower builds",
      "No serverless functions",
    ],
  },
  {
    name: "Render",
    url: "https://render.com",
    badge: "Full-stack",
    badgeColor:
      "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50",
    plan: "Limited free",
    planColor: "text-amber-600 dark:text-amber-400",
    description:
      "Full platform that supports both static frontend and backend. Perfect when your app has frontend + API in the same project.",
    pros: [
      "Free Static Sites",
      "Integrates with backend on Render",
      "Configurable redirects and headers",
      "Auto-deploy from Git",
    ],
    cons: [
      "Free services spin down after inactivity",
      "No advanced Edge Network",
    ],
  },
  {
    name: "Surge",
    url: "https://surge.sh",
    badge: "Super simple",
    badgeColor:
      "bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800/50",
    plan: "Free",
    planColor: "text-green-600 dark:text-green-400",
    description:
      "The fastest way to publish a static site. One terminal command and you're done. Perfect for quick demos and prototypes.",
    pros: [
      "Single command: surge ./dist",
      "Free custom domain",
      "No registration required",
      "Ideal for quick demos",
    ],
    cons: [
      "Static sites only",
      "No native CI/CD",
      "No serverless functions",
    ],
  },
];

const comparativa = [
  {
    plataforma: "Vercel",
    next: "✅ Native",
    react: "✅",
    vue: "✅",
    angular: "✅",
    gratis: "100GB BW",
  },
  {
    plataforma: "Netlify",
    next: "✅",
    react: "✅",
    vue: "✅",
    angular: "✅",
    gratis: "100GB BW",
  },
  {
    plataforma: "CF Pages",
    next: "🔶 Partial",
    react: "✅",
    vue: "✅",
    angular: "✅",
    gratis: "Unlimited",
  },
  {
    plataforma: "GitHub Pages",
    next: "❌ Export only",
    react: "✅ Static",
    vue: "✅ Static",
    angular: "✅ Static",
    gratis: "1GB storage",
  },
  {
    plataforma: "Render",
    next: "✅",
    react: "✅",
    vue: "✅",
    angular: "✅",
    gratis: "Limited",
  },
];

export default function FrontendHostingContent() {
  return (
    <article className="max-w-3xl">
      {/* Header */}
      <div className="space-y-3 mb-10">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50">
            Frontend
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
            Hosting
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            8 min read
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">·</span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            25 jun 2026
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          Best platforms to host frontend
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          The best options to publish your React, Next.js, Vue, or any frontend
          framework. With free plans, comparisons, and when to use each one.
        </p>
      </div>

      {/* Intro */}
      <div className="prose prose-sm dark:prose-invert max-w-none mb-10">
        <p className="text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed">
          Choosing where to host your frontend makes a difference in
          performance, developer experience, and cost. In 2026 there are
          excellent options with very generous free plans. Here are the ones I
          use and recommend.
        </p>
        <div className="mt-4 p-4 rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800/40">
          <p className="text-sm font-semibold text-violet-800 dark:text-violet-300 mb-1">
            ⚡ Quick rule
          </p>
          <p className="text-sm text-violet-700 dark:text-violet-400">
            For Next.js → Vercel. For everything else static → Cloudflare
            Pages (unlimited free bandwidth). For quick demos → Surge.
          </p>
        </div>
      </div>

      {/* Platforms */}
      <div className="space-y-5 mb-12">
        {platforms.map((p) => (
          <div
            key={p.url}
            className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#1c1c22] border border-black/8 dark:border-white/8 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img
                      alt={p.name}
                      className="w-6 h-6 object-contain"
                      loading="lazy"
                      src={getWebsiteImage(p.url)}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        className="font-bold text-base text-[#1d1d1f] dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition-colors no-underline"
                        href={p.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {p.name}
                      </Link>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${p.badgeColor}`}
                      >
                        {p.badge}
                      </span>
                    </div>
                    <span className={`text-xs font-semibold ${p.planColor}`}>
                      {p.plan}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed mb-4">
                {p.description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase tracking-wider mb-1.5">
                    ✅ Pros
                  </p>
                  <ul className="space-y-1">
                    {p.pros.map((pro) => (
                      <li
                        key={pro}
                        className="text-xs text-[#3d3d3d] dark:text-[#c0c0c5]"
                      >
                        • {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-red-700 dark:text-red-400 uppercase tracking-wider mb-1.5">
                    ⚠️ Cons
                  </p>
                  <ul className="space-y-1">
                    {p.cons.map((con) => (
                      <li
                        key={con}
                        className="text-xs text-[#3d3d3d] dark:text-[#c0c0c5]"
                      >
                        • {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparativa */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white mb-4">
          Quick comparison
        </h2>
        <div className="overflow-x-auto rounded-xl border border-black/8 dark:border-white/8">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-black/3 dark:bg-white/3 border-b border-black/8 dark:border-white/8">
                {[
                  "Platform",
                  "Next.js",
                  "React",
                  "Vue/Angular",
                  "Free plan",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-3 py-2 text-left font-semibold text-[#1d1d1f] dark:text-white"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparativa.map((row, i) => (
                <tr
                  key={row.plataforma}
                  className={`border-b border-black/6 dark:border-white/6 last:border-0 ${i % 2 === 0 ? "" : "bg-black/[0.015] dark:bg-white/[0.015]"}`}
                >
                  <td className="px-3 py-2 font-semibold text-[#1d1d1f] dark:text-white">
                    {row.plataforma}
                  </td>
                  <td className="px-3 py-2 text-[#3d3d3d] dark:text-[#c0c0c5]">
                    {row.next}
                  </td>
                  <td className="px-3 py-2 text-[#3d3d3d] dark:text-[#c0c0c5]">
                    {row.react}
                  </td>
                  <td className="px-3 py-2 text-[#3d3d3d] dark:text-[#c0c0c5]">
                    {row.vue}
                  </td>
                  <td className="px-3 py-2 text-[#3d3d3d] dark:text-[#c0c0c5]">
                    {row.gratis}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tip final */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-950/20 dark:to-blue-950/20 border border-violet-200 dark:border-violet-800/40">
        <h3 className="font-bold text-[#1d1d1f] dark:text-white mb-2">
          💡 My personal recommendation
        </h3>
        <p className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed">
          For personal projects and portfolios I use <strong>Vercel</strong> if
          there's Next.js and <strong>Cloudflare Pages</strong> for everything else.
          Both have excellent DX and the free plan is more than enough
          for real projects.
        </p>
      </div>
    </article>
  );
}
