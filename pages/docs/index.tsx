import Link from "next/link";

import DefaultLayout from "@/layouts/default";

const sections = [
  {
    href: "/docs/database",
    emoji: "🗄️",
    title: "Base de datos",
    description:
      "Esquema completo con diagrama interactivo: tablas, columnas, tipos y relaciones FK.",
    badge: "29 tablas",
    color: "from-indigo-400 to-violet-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    border: "border-indigo-200 dark:border-indigo-800/50",
    text: "text-indigo-700 dark:text-indigo-400",
  },
];

export default function DocsPage() {
  return (
    <DefaultLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1
            className="text-3xl font-bold text-[#1d1d1f] dark:text-white"
            style={{ letterSpacing: "-0.02em" }}
          >
            Documentación
          </h1>
          <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-2">
            Referencia técnica del proyecto: esquemas, APIs y arquitectura.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sections.map((s) => (
            <Link
              key={s.href}
              className={`group p-5 rounded-2xl border ${s.bg} ${s.border} hover:shadow-md transition-all no-underline`}
              href={s.href}
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-xl mb-3`}
              >
                {s.emoji}
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className={`text-base font-bold ${s.text}`}>{s.title}</h2>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s.bg} ${s.border} ${s.text}`}
                >
                  {s.badge}
                </span>
              </div>
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
                {s.description}
              </p>
              <p
                className={`text-xs font-semibold mt-3 ${s.text} opacity-0 group-hover:opacity-100 transition-opacity`}
              >
                Ver documentación →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
