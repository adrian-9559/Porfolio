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
              className="text-xs text-muted hover:text-foreground transition-colors"
              href="/docs"
            >
              Docs
            </Link>
            <span className="text-xs text-muted/60">/</span>
            <span className="text-xs text-foreground font-medium">
              Base de datos
            </span>
          </div>
          <h1
            className="text-3xl font-bold text-foreground"
            style={{ letterSpacing: "-0.02em" }}
          >
            Base de datos
          </h1>
          <p className="text-sm text-muted mt-1">
            Esquema completo con diagrama interactivo: tablas, columnas, tipos y
            relaciones FK.
          </p>
        </div>

        <DatabaseDiagram />
      </div>
    </DefaultLayout>
  );
}
