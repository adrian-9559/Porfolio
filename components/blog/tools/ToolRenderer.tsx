"use client";

import Link from "next/link";
import { useToolComponent } from "@/lib/blog/toolComponents";
import { getToolIcon } from "@/components/blog/tools/ToolIcons";
import { useT } from "@/hooks/useT";

export function ToolRenderer({ slug }: { slug: string }) {
  const { t } = useT();
  const ToolComponent = useToolComponent(slug);
  const Icon = getToolIcon(slug);

  return (
    <div className="ds-card p-6">
      {ToolComponent ? (
        <ToolComponent />
      ) : (
        <div className="text-center py-12">
          <p className="text-[var(--text-muted)]">
            Herramienta no disponible aún.
          </p>
          <Link
            className="ds-btn-primary mt-4 inline-flex no-underline text-[var(--accent-text)]"
            href="/tools"
          >
            {t("tools.backToTools")}
          </Link>
        </div>
      )}
    </div>
  );
}
