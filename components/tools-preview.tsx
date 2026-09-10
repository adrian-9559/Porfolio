import Link from "next/link";

import { useT } from "@/hooks/useT";

const TOOLS_CATEGORIES = [
  {
    key: "dev",
    label: "Desarrollo",
    icon: "code",
    count: 15,
    href: "/tools?cat=dev",
  },
  {
    key: "text",
    label: "Texto",
    icon: "text",
    count: 8,
    href: "/tools?cat=text",
  },
  {
    key: "image",
    label: "Imágenes",
    icon: "image",
    count: 5,
    href: "/tools?cat=image",
  },
  {
    key: "conversion",
    label: "Conversión",
    icon: "convert",
    count: 10,
    href: "/tools?cat=conversion",
  },
  {
    key: "security",
    label: "Seguridad",
    icon: "security",
    count: 4,
    href: "/tools?cat=security",
  },
  {
    key: "utilities",
    label: "Utilidades",
    icon: "util",
    count: 11,
    href: "/tools?cat=utilities",
  },
];

function ToolIcon({ icon }: { icon: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    code: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
    text: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path d="M4 7V4h16v3M9 20h6M12 4v16" />
      </svg>
    ),
    image: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <rect height="18" rx="2" width="18" x="3" y="3" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
    convert: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    ),
    security: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l8 4v6c0 5.25-3.5 8.75-8 10-4.5-1.25-8-4.75-8-10V6l8-4z" />
      </svg>
    ),
    util: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  };

  return iconMap[icon] || null;
}

export default function ToolsPreview() {
  const { t } = useT();

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
          {t("tools.title")}
        </h2>
        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
          {t("tools.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {TOOLS_CATEGORIES.map((cat) => (
          <Link
            key={cat.key}
            className="ds-card ds-card-compact ds-card-interactive group no-underline"
            href={cat.href}
          >
            <div className="w-9 h-9 rounded-lg bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-secondary)] mb-3 group-hover:text-[var(--accent)] transition-colors">
              <ToolIcon icon={cat.icon} />
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
              {cat.label}
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              {cat.count} {t("tools.toolsCount")}
            </p>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link className="ds-btn-secondary no-underline" href="/tools">
          {t("tools.viewAll")}
        </Link>
      </div>
    </section>
  );
}
