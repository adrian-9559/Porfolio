import Link from "next/link";

import { getWebsiteImage } from "@/functions/getWebSiteInfo";

const categories = [
  {
    id: "iconos",
    label: "Iconos UI",
    emoji: "🎯",
    color:
      "bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/50",
    resources: [
      {
        name: "Icones",
        url: "https://icones.js.org",
        description:
          "Más de 200.000 iconos SVG de los mejores icon packs (Heroicons, Lucide, Tabler, Phosphor…) en un solo sitio. Integración directa con proyectos JS.",
        free: true,
      },
      {
        name: "Gravity UI Icons",
        url: "https://gravity-ui.com",
        description:
          "Colección de iconos UI de alta calidad mantenida por Yandex. Disponible como paquete npm, perfecta para proyectos React.",
        free: true,
      },
      {
        name: "Flaticon",
        url: "https://www.flaticon.com",
        description:
          "Millones de iconos en SVG, PNG y otros formatos. Gratuito con atribución. Una de las colecciones más grandes del mundo.",
        free: true,
      },
      {
        name: "Iconfinder",
        url: "https://www.iconfinder.com",
        description:
          "Plataforma con iconos de alta calidad, tanto gratuitos como de pago. Buena opción para uso comercial.",
        free: false,
      },
    ],
  },
  {
    id: "logos",
    label: "Logos de marcas",
    emoji: "🏷️",
    color:
      "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/50",
    resources: [
      {
        name: "SVGL",
        url: "https://svgl.app",
        description:
          "La mejor fuente para logos SVG de tecnologías y marcas conocidas. Perfecta para portfolios y páginas de tech stack. Actualizada constantemente.",
        free: true,
      },
      {
        name: "Simple Icons",
        url: "https://simpleicons.org",
        description:
          "Logos SVG de más de 3.000 marcas populares, todos con el mismo estilo. Disponible como paquete npm para fácil integración.",
        free: true,
      },
      {
        name: "Brandfetch",
        url: "https://brandfetch.com",
        description:
          "Logos oficiales de marcas en alta calidad. API disponible para integrar en tus proyectos.",
        free: false,
      },
    ],
  },
  {
    id: "ilustraciones",
    label: "Ilustraciones",
    emoji: "🎨",
    color:
      "bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800/50",
    resources: [
      {
        name: "SVG Repo",
        url: "https://www.svgrepo.com",
        description:
          "Más de 500.000 SVGs gratuitos para uso personal y comercial. Incluye iconos, ilustraciones y gráficos. Muy buena búsqueda.",
        free: true,
      },
      {
        name: "unDraw",
        url: "https://undraw.co",
        description:
          "Ilustraciones SVG minimalistas de personas y escenas. Puedes personalizar el color principal directamente en el sitio.",
        free: true,
      },
      {
        name: "Storyset",
        url: "https://storyset.com",
        description:
          "Ilustraciones SVG animadas y personalizables de Freepik. Puedes elegir estilo (flat, outline, amico…) y colores.",
        free: true,
      },
      {
        name: "Freepik",
        url: "https://www.freepik.com",
        description:
          "Recursos gráficos incluyendo SVG, vectores y PSD. Gratis con atribución. Enorme catálogo.",
        free: false,
      },
    ],
  },
  {
    id: "patrones",
    label: "Patrones y fondos",
    emoji: "🌀",
    color:
      "bg-cyan-100 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/50",
    resources: [
      {
        name: "Hero Patterns",
        url: "https://heropatterns.com",
        description:
          "Patrones SVG repetibles de alta calidad para fondos. Genera el CSS listo para usar en tu proyecto.",
        free: true,
      },
      {
        name: "SVG Backgrounds",
        url: "https://www.svgbackgrounds.com",
        description:
          "Fondos SVG animados y estáticos para webs. Personalizables en color e intensidad.",
        free: true,
      },
      {
        name: "Haikei",
        url: "https://haikei.app",
        description:
          "Generador de fondos SVG únicos: blobs, waves, gradientes y más. Exporta SVG listo para usar.",
        free: true,
      },
    ],
  },
];

const tips = [
  {
    emoji: "⚖️",
    titulo: "Revisa la licencia",
    desc: "Cada plataforma tiene sus propias condiciones. Algunos SVGs requieren atribución o solo permiten uso personal. Siempre verifica antes de usar en proyectos comerciales.",
  },
  {
    emoji: "🗜️",
    titulo: "Optimiza antes de usar",
    desc: "Usa SVGO o svgomg.net para reducir el tamaño. Un SVG sin optimizar puede ser 10x más grande que necesario.",
  },
  {
    emoji: "⚡",
    titulo: "SVG inline vs img",
    desc: 'Usa <img src="icon.svg"> para iconos simples y SVG inline para los que necesitas cambiar color con CSS o animar.',
  },
  {
    emoji: "🎨",
    titulo: "currentColor para tematizar",
    desc: 'Si el SVG usa fill="currentColor", heredará el color del texto. Perfecto para iconos que cambian con el tema claro/oscuro.',
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
            Recursos
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            6 min de lectura
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
          Mejores páginas para encontrar SVG
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          Una selección curada de las mejores plataformas para encontrar iconos,
          logos, ilustraciones y patrones SVG. Organizadas por categoría para
          encontrar lo que necesitas rápido.
        </p>
      </div>

      {/* Intro */}
      <p className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed mb-8">
        Los SVGs son fundamentales en el desarrollo web moderno: escalables,
        ligeros y perfectos para animaciones. Aquí tienes las plataformas que
        uso habitualmente, organizadas por tipo de recurso para que encuentres
        exactamente lo que necesitas.
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
                {cat.resources.length} recursos
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
                        {resource.free ? "Gratis" : "Freemium"}
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
          💡 Consejos de uso
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
