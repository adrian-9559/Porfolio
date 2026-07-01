import Link from "next/link";

import { getWebsiteImage } from "@/functions/getWebSiteInfo";

const categories = [
  {
    id: "iconos",
    label: "UI Icons",
    emoji: "🎯",
    color:
      "bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/50",
    resources: [
      {
        name: "Icones",
        url: "https://icones.js.org",
        description:
          "Over 200,000 SVG icons from the best icon packs (Heroicons, Lucide, Tabler, Phosphor…) in one place. Direct integration with JS projects.",
        free: true,
      },
      {
        name: "Gravity UI Icons",
        url: "https://gravity-ui.com",
        description:
          "High-quality UI icon collection maintained by Yandex. Available as an npm package, perfect for React projects.",
        free: true,
      },
      {
        name: "Flaticon",
        url: "https://www.flaticon.com",
        description:
          "Millions of icons in SVG, PNG, and other formats. Free with attribution. One of the largest collections in the world.",
        free: true,
      },
      {
        name: "Iconfinder",
        url: "https://www.iconfinder.com",
        description:
          "High-quality icons platform, both free and paid. A good option for commercial use.",
        free: false,
      },
    ],
  },
  {
    id: "logos",
    label: "Brand Logos",
    emoji: "🏷️",
    color:
      "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/50",
    resources: [
      {
        name: "SVGL",
        url: "https://svgl.app",
        description:
          "The best source for SVG logos of well-known technologies and brands. Perfect for portfolios and tech stack pages. Constantly updated.",
        free: true,
      },
      {
        name: "Simple Icons",
        url: "https://simpleicons.org",
        description:
          "SVG logos of over 3,000 popular brands, all in the same style. Available as an npm package for easy integration.",
        free: true,
      },
      {
        name: "Brandfetch",
        url: "https://brandfetch.com",
        description:
          "Official brand logos in high quality. API available to integrate into your projects.",
        free: false,
      },
    ],
  },
  {
    id: "ilustraciones",
    label: "Illustrations",
    emoji: "🎨",
    color:
      "bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800/50",
    resources: [
      {
        name: "SVG Repo",
        url: "https://www.svgrepo.com",
        description:
          "Over 500,000 free SVGs for personal and commercial use. Includes icons, illustrations, and graphics. Great search functionality.",
        free: true,
      },
      {
        name: "unDraw",
        url: "https://undraw.co",
        description:
          "Minimalist SVG illustrations of people and scenes. You can customize the main color directly on the site.",
        free: true,
      },
      {
        name: "Storyset",
        url: "https://storyset.com",
        description:
          "Animated and customizable SVG illustrations by Freepik. Choose your style (flat, outline, amico…) and colors.",
        free: true,
      },
      {
        name: "Freepik",
        url: "https://www.freepik.com",
        description:
          "Graphic resources including SVG, vectors, and PSD. Free with attribution. Huge catalog.",
        free: false,
      },
    ],
  },
  {
    id: "patrones",
    label: "Patterns & Backgrounds",
    emoji: "🌀",
    color:
      "bg-cyan-100 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/50",
    resources: [
      {
        name: "Hero Patterns",
        url: "https://heropatterns.com",
        description:
          "High-quality repeatable SVG patterns for backgrounds. Generates ready-to-use CSS for your project.",
        free: true,
      },
      {
        name: "SVG Backgrounds",
        url: "https://www.svgbackgrounds.com",
        description:
          "Animated and static SVG backgrounds for websites. Customizable in color and intensity.",
        free: true,
      },
      {
        name: "Haikei",
        url: "https://haikei.app",
        description:
          "Unique SVG background generator: blobs, waves, gradients, and more. Export ready-to-use SVG.",
        free: true,
      },
    ],
  },
];

const tips = [
  {
    emoji: "⚖️",
    titulo: "Check the license",
    desc: "Each platform has its own terms. Some SVGs require attribution or only allow personal use. Always verify before using in commercial projects.",
  },
  {
    emoji: "🗜️",
    titulo: "Optimize before use",
    desc: "Use SVGO or svgomg.net to reduce file size. An unoptimized SVG can be 10x larger than necessary.",
  },
  {
    emoji: "⚡",
    titulo: "SVG inline vs img",
    desc: 'Use <img src="icon.svg"> for simple icons and inline SVG when you need to change color with CSS or animate.',
  },
  {
    emoji: "🎨",
    titulo: "currentColor for theming",
    desc: 'If the SVG uses fill="currentColor", it will inherit the text color. Perfect for icons that adapt to light/dark themes.',
  },
];

export default function SvgContent() {
  return (
    <article className="max-w-3xl">
      {/* Header */}
      <div className="space-y-3 mb-10">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
            SVG
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50">
            Resources
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            6 min read
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">·</span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            21 jun 2026
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          Best websites to find SVG
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          A curated selection of the best platforms to find icons, logos,
          illustrations, and SVG patterns. Organized by category so you can
          find what you need fast.
        </p>
      </div>

      {/* Intro */}
      <p className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed mb-8">
        SVGs are fundamental in modern web development: scalable, lightweight,
        and perfect for animations. Here are the platforms I regularly use,
        organized by resource type so you can find exactly what you need.
      </p>

      {/* Categories */}
      <div className="space-y-10">
        {categories.map((cat) => (
          <div key={cat.id}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{cat.emoji}</span>
              <h2 className="text-lg font-bold text-[#1d1d1f] dark:text-white">
                {cat.label}
              </h2>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cat.color}`}
              >
                {cat.resources.length} resources
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cat.resources.map((resource) => (
                <Link
                  key={resource.url}
                  className="group p-4 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-200 no-underline"
                  href={resource.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#1c1c22] border border-black/8 dark:border-white/8 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img
                        alt={resource.name}
                        className="w-5 h-5 object-contain"
                        loading="lazy"
                        src={getWebsiteImage(resource.url)}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <p className="font-semibold text-sm text-[#1d1d1f] dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
                        {resource.name}
                      </p>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${resource.free ? "bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400" : "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400"}`}
                      >
                        {resource.free ? "Free" : "Freemium"}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
                    {resource.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="mt-12">
        <h2 className="text-lg font-bold text-[#1d1d1f] dark:text-white mb-4">
          💡 Usage tips
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tips.map((tip) => (
            <div
              key={tip.titulo}
              className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/8 dark:border-white/8"
            >
              <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-1.5">
                {tip.emoji} {tip.titulo}
              </p>
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
