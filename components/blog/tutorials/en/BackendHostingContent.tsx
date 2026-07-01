import Link from "next/link";

import { getWebsiteImage } from "@/functions/getWebSiteInfo";

const platforms = [
  {
    name: "Railway",
    url: "https://railway.app",
    badge: "⭐ Recommended",
    badgeColor:
      "bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/50",
    plan: "$5/month free credit",
    planColor: "text-green-600 dark:text-green-400",
    description:
      "The most convenient backend platform in 2026. Deploy from GitHub in seconds, environment variables from the UI, and support for almost any stack: Node.js, Python, Rust, Go, Docker…",
    pros: [
      "1-click deploy from GitHub",
      "Environment variables in UI",
      "Built-in PostgreSQL/MySQL/Redis",
      "Real-time logs and metrics",
      "Auto-scaling",
    ],
    cons: [
      "Free plan has $5/month credit (runs out)",
      "No permanent free tier after the 2024 change",
    ],
  },
  {
    name: "Render",
    url: "https://render.com",
    badge: "Free tier",
    badgeColor:
      "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50",
    plan: "Free (with limits)",
    planColor: "text-green-600 dark:text-green-400",
    description:
      "Good alternative to Heroku. Offers web services, workers, cron jobs, and databases. The free plan includes web services that spin down after 15 min of inactivity.",
    pros: [
      "Free web services",
      "Free PostgreSQL (90 days)",
      "Built-in cron jobs",
      "Deploy from Docker or Git",
    ],
    cons: [
      "Free services spin down after inactivity (cold start ~30s)",
      "Free PostgreSQL expires after 90 days",
    ],
  },
  {
    name: "Fly.io",
    url: "https://fly.io",
    badge: "For Docker",
    badgeColor:
      "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50",
    plan: "Limited free",
    planColor: "text-green-600 dark:text-green-400",
    description:
      "Run Docker containers across multiple regions. Perfect for apps that need to be close to users worldwide. The free plan includes 3 small VMs.",
    pros: [
      "Multi-region deployment",
      "Persistent volumes",
      "3 always-free VMs",
      "Native SQLite + LiteFS support",
      "Very powerful flyctl CLI",
    ],
    cons: [
      "Steeper learning curve",
      "Requires Docker knowledge",
      "TOML-based configuration",
    ],
  },
  {
    name: "Koyeb",
    url: "https://koyeb.com",
    badge: "Generous free",
    badgeColor:
      "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/50",
    plan: "Generous free",
    planColor: "text-green-600 dark:text-green-400",
    description:
      "Rising alternative with a no-expiration free plan. Supports Node.js, Python, Go, and Docker. Doesn't sleep services like Render. Edge deployment in multiple regions.",
    pros: [
      "Free services without cold start",
      "No time limit on free plan",
      "Built-in edge functions",
      "Deploy from Git or Docker",
    ],
    cons: [
      "Smaller community and documentation",
      "Fewer integrations than Railway or Render",
    ],
  },
  {
    name: "DigitalOcean App Platform",
    url: "https://www.digitalocean.com/products/app-platform",
    badge: "Production",
    badgeColor:
      "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50",
    plan: "From $5/month",
    planColor: "text-amber-600 dark:text-amber-400",
    description:
      "The most robust option for serious production. Managed databases, load balancers, CDN, and auto-scaling. More expensive but more reliable for apps with real users.",
    pros: [
      "99.99% uptime SLA",
      "Managed databases (PostgreSQL, MySQL)",
      "Automatic horizontal scaling",
      "Global network with CDN",
      "Real technical support",
    ],
    cons: [
      "No real free plan",
      "More expensive than alternatives",
      "Overkill for personal projects",
    ],
  },
  {
    name: "Cloudflare Workers",
    url: "https://workers.cloudflare.com",
    badge: "Serverless",
    badgeColor:
      "bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/50",
    plan: "100k req/day free",
    planColor: "text-green-600 dark:text-green-400",
    description:
      "Cloudflare's edge computing. Runs JavaScript/TypeScript code on Cloudflare's network across 200+ locations. Ideal for ultra-fast APIs and global middleware.",
    pros: [
      "100,000 free requests/day",
      "<10ms latency worldwide",
      "KV Store, Durable Objects & R2",
      "Instant deployment",
      "Free for many real projects",
    ],
    cons: [
      "No native Node.js (custom runtime)",
      "Not a traditional server",
      "CPU limits (10ms per request on free)",
    ],
  },
];

const casos = [
  {
    caso: "Hobby/portfolio REST API",
    recomendacion: "Railway or Koyeb",
    razon: "Easy to use, generous free tier",
  },
  {
    caso: "App with many users (>10k/month)",
    recomendacion: "DigitalOcean / Railway paid",
    razon: "SLA, scaling, and support",
  },
  {
    caso: "Global low-latency API",
    recomendacion: "Cloudflare Workers + Fly.io",
    razon: "Edge computing",
  },
  {
    caso: "Microservice or workers",
    recomendacion: "Cloudflare Workers",
    razon: "100k req/day free",
  },
  {
    caso: "Full app (frontend + backend)",
    recomendacion: "Railway",
    razon: "Everything in one place",
  },
  {
    caso: "Quick demo or PoC",
    recomendacion: "Render (free tier)",
    razon: "Fast to set up",
  },
];

export default function BackendHostingContent() {
  return (
    <article className="max-w-3xl">
      {/* Header */}
      <div className="space-y-3 mb-10">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
            Backend
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
          Best platforms to host backend
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          Where to host your API, Node.js server, Python, Go, or any backend
          in 2026. With free plans, honest analysis, and guidance on when to use
          each one.
        </p>
      </div>

      {/* Intro */}
      <div className="prose prose-sm dark:prose-invert max-w-none mb-10">
        <p className="text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed">
          Choosing where to host your backend is more critical than the frontend: it affects
          latency, availability, and scaling cost. The market has
          changed a lot: Heroku is no longer the obvious choice and there are better
          alternatives for almost every use case.
        </p>
        <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
          <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
            ⚡ Quick rule
          </p>
          <p className="text-sm text-emerald-700 dark:text-emerald-400">
            For personal projects → Railway (best DX). For serious
            production → DigitalOcean. For ultra-fast global APIs → Cloudflare
            Workers.
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
                        className="font-bold text-base text-[#1d1d1f] dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors no-underline"
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

      {/* Casos de uso */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white mb-4">
          Which one to use for your case?
        </h2>
        <div className="overflow-x-auto rounded-xl border border-black/8 dark:border-white/8">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-black/3 dark:bg-white/3 border-b border-black/8 dark:border-white/8">
                {["Use case", "Recommendation", "Why"].map((h) => (
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
              {casos.map((row, i) => (
                <tr
                  key={row.caso}
                  className={`border-b border-black/6 dark:border-white/6 last:border-0 ${i % 2 === 0 ? "" : "bg-black/[0.015] dark:bg-white/[0.015]"}`}
                >
                  <td className="px-3 py-2 text-[#1d1d1f] dark:text-white font-medium">
                    {row.caso}
                  </td>
                  <td className="px-3 py-2 font-semibold text-emerald-700 dark:text-emerald-400">
                    {row.recomendacion}
                  </td>
                  <td className="px-3 py-2 text-[#6e6e73] dark:text-[#86868b]">
                    {row.razon}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tip final */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 border border-emerald-200 dark:border-emerald-800/40">
        <h3 className="font-bold text-[#1d1d1f] dark:text-white mb-2">
          💡 My personal recommendation
        </h3>
        <p className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed">
          For personal projects I use <strong>Railway</strong>: the best
          developer experience, deploy in seconds, and everything in one panel. For
          APIs that need to scale globally,{" "}
          <strong>Cloudflare Workers</strong> is unbeatable in price and
          performance.
        </p>
      </div>
    </article>
  );
}
