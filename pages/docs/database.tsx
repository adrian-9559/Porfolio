import Link from "next/link";

import DefaultLayout from "@/layouts/default";
import { DatabaseDiagram } from "@/components/docs/DatabaseDiagram";

export default function DatabaseDocsPage() {
  return (
    <DefaultLayout>
      <div className="max-w-[1700px] mx-auto px-2 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              className="text-xs text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
              href="/docs"
            >
              Docs
            </Link>
            <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
              /
            </span>
            <span className="text-xs text-[#1d1d1f] dark:text-white font-medium">
              Base de datos
            </span>
          </div>
          <h1
            className="text-3xl font-bold text-[#1d1d1f] dark:text-white"
            style={{ letterSpacing: "-0.02em" }}
          >
            Base de datos
          </h1>
          <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">
            Esquema completo con diagrama interactivo: tablas, columnas, tipos y
            relaciones FK.
          </p>
        </div>

        <DatabaseDiagram />
      </div>
    </DefaultLayout>
  );
}
