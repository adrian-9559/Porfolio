import Link from "next/link";

const GRADIENTS: [string, string][] = [
  ["#7c3aed", "#06b6d4"],
  ["#06b6d4", "#8b5cf6"],
  ["#ec4899", "#7c3aed"],
  ["#8b5cf6", "#06b6d4"],
  ["#00f5ff", "#7c3aed"],
  ["#ec4899", "#06b6d4"],
];

interface ThumbCardProps {
  href: string;
  title: string;
  meta?: string;
  seed?: number;
}

export default function ThumbCard({
  href,
  title,
  meta,
  seed = 0,
}: ThumbCardProps) {
  const [from, to] = GRADIENTS[Math.abs(seed) % GRADIENTS.length];

  return (
    <Link className="group block no-underline" href={href}>
      <div
        className="relative aspect-video rounded-xl overflow-hidden border border-[var(--border-default)] group-hover:border-[var(--border-hover)] group-hover:-translate-y-1 transition-all duration-200 flex items-center justify-center px-4 motion-safe:transition-all"
        style={{
          background: `linear-gradient(135deg, ${from}30 0%, var(--bg-card) 55%, ${to}30 100%)`,
        }}
      >
        <span
          className="text-center text-lg md:text-xl font-black text-[var(--text-primary)] leading-tight line-clamp-2"
          style={{ letterSpacing: "-0.02em" }}
        >
          {title}
        </span>
      </div>
      <h3 className="mt-3 text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug motion-safe:transition-colors">
        {title}
      </h3>
      {meta && (
        <p className="mt-0.5 text-sm text-[var(--text-muted)]">{meta}</p>
      )}
    </Link>
  );
}
