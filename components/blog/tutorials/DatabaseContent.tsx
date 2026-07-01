import Link from "next/link";

import { getWebsiteImage } from "@/functions/getWebSiteInfo";

const databases = [
  {
    name: "Supabase",
    url: "https://supabase.com",
    price: "Gratis / De pago",
    description:
      "La alternativa open source a Firebase. Ofrece base de datos PostgreSQL en tiempo real, autenticación, storage y Edge Functions.",
    features: [
      "PostgreSQL en tiempo real",
      "Autenticación integrada",
      "Storage de archivos",
      "API REST y GraphQL",
      "Panel de administración visual",
    ],
  },
  {
    name: "Firebase",
    url: "https://firebase.google.com",
    price: "Gratis / De pago",
    description:
      "La plataforma de Google para apps web y móviles. Firestore, autenticación, hosting y Cloud Functions en un solo lugar.",
    features: [
      "Firestore en tiempo real",
      "Autenticación OAuth",
      "Hosting gratuito",
      "Cloud Functions",
      "Analítica integrada",
    ],
  },
  {
    name: "MongoDB Atlas",
    url: "https://www.mongodb.com/cloud/atlas",
    price: "Gratis / De pago",
    description:
      "Base de datos NoSQL en la nube de MongoDB. Perfecta para datos semiestructurados y proyectos que escalan rápido.",
    features: [
      "Cluster gratuito en la nube",
      "Escalabilidad automática",
      "Full-text search",
      "Múltiples regiones",
      "Charts y analítica",
    ],
  },
];

export default function DatabaseContent() {
  return (
    <article className="max-w-3xl">
      {/* Header */}
      <div className="space-y-3 mb-10">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
            Database
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            5 min de lectura
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
          Mejores plataformas para hostear bases de datos
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          Opciones modernas y accesibles para alojar tu base de datos en la
          nube, desde proyectos personales hasta aplicaciones en producción.
        </p>
      </div>

      {/* Intro */}
      <div className="mb-10">
        <p className="text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed text-sm">
          Elegir dónde alojar tu base de datos es una decisión crítica. Estas
          plataformas ofrecen planes gratuitos generosos para empezar, con
          opciones de escalado cuando lo necesites.
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-5">
        {databases.map((db) => (
          <div
            key={db.url}
            className="p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1c1c22] border border-black/8 dark:border-white/8 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    alt={db.name}
                    className="w-7 h-7 object-contain"
                    loading="lazy"
                    src={getWebsiteImage(db.url)}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div>
                  <h2 className="font-bold text-[#1d1d1f] dark:text-white">
                    {db.name}
                  </h2>
                  <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                    {db.price}
                  </span>
                </div>
              </div>
              <Link
                className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors no-underline flex-shrink-0"
                href={db.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                Visitar →
              </Link>
            </div>
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-4">
              {db.description}
            </p>
            <ul className="space-y-1.5">
              {db.features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-xs text-[#3d3d3d] dark:text-[#c0c0c5]"
                >
                  <svg
                    className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                    />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}
