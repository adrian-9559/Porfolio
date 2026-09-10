"use client";

export interface DesignColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface DesignStyle {
  id: string;
  labelKey: string;
  rx: number;
  baseOpacity: number;
  decorOpacity: number;
  strokeW: number;
}

export interface MockupVariant {
  id: string;
  labelKey: string;
  component: React.ComponentType<{ c: DesignColors; s: DesignStyle }>;
}

export interface MockupItem {
  id: string;
  labelKey: string;
  component: React.ComponentType<{ c: DesignColors; s: DesignStyle }>;
  variants: MockupVariant[];
}

/** Density helper — scales y-positions for compact/spacious layouts */
export function g(v: number, gap: number): number {
  return Math.round(v * gap);
}

export const STYLES: DesignStyle[] = [
  {
    id: "minimal",
    labelKey: "blog.designShowcase.style.minimal",
    rx: 0,
    baseOpacity: 0.04,
    decorOpacity: 0,
    strokeW: 0.5,
  },
  {
    id: "standard",
    labelKey: "blog.designShowcase.style.standard",
    rx: 8,
    baseOpacity: 0.08,
    decorOpacity: 0.15,
    strokeW: 1.5,
  },
  {
    id: "glass",
    labelKey: "blog.designShowcase.style.glass",
    rx: 18,
    baseOpacity: 0.06,
    decorOpacity: 0.1,
    strokeW: 1,
  },
];

// ── Web Mockups ───────────────────────────────────────────────────────────────

export function WebHero({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="32"
        opacity={s.baseOpacity}
        width="280"
        x="0"
        y="0"
      />
      <rect
        fill={c.primary}
        height="12"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="16"
        y="10"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.15"
        rx={s.rx > 0 ? 2 : 0}
        width="24"
        x="190"
        y="12"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.15"
        rx={s.rx > 0 ? 2 : 0}
        width="24"
        x="220"
        y="12"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.15"
        rx={s.rx > 0 ? 2 : 0}
        width="24"
        x="250"
        y="12"
      />
      <rect
        fill={c.text}
        height="14"
        opacity="0.8"
        rx={s.rx > 0 ? 3 : 0}
        width="168"
        x="56"
        y="64"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.2"
        rx={s.rx > 0 ? 2 : 0}
        width="120"
        x="80"
        y="86"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.12"
        rx={s.rx > 0 ? 2 : 0}
        width="88"
        x="96"
        y="100"
      />
      <rect
        fill={c.primary}
        height="20"
        rx={s.rx > 0 ? 10 : 0}
        width="64"
        x="108"
        y="120"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.9"
        rx={s.rx > 0 ? 2 : 0}
        width="44"
        x="118"
        y="126"
      />
      <circle
        cx="40"
        cy="158"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="14"
      />
      <circle
        cx="80"
        cy="158"
        fill={c.accent}
        opacity={s.decorOpacity}
        r="14"
      />
      <circle
        cx="120"
        cy="158"
        fill={c.primary}
        opacity={s.decorOpacity}
        r="14"
      />
    </svg>
  );
}

// WebHero variants
export function WebHeroSplit({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="32"
        opacity={s.baseOpacity}
        width="280"
        x="0"
        y="0"
      />
      <rect
        fill={c.primary}
        height="12"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="16"
        y="10"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.15"
        rx={s.rx > 0 ? 2 : 0}
        width="24"
        x="190"
        y="12"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.15"
        rx={s.rx > 0 ? 2 : 0}
        width="24"
        x="220"
        y="12"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.15"
        rx={s.rx > 0 ? 2 : 0}
        width="24"
        x="250"
        y="12"
      />
      <rect
        fill={c.text}
        height="14"
        opacity="0.8"
        rx={s.rx > 0 ? 3 : 0}
        width="120"
        x="16"
        y="56"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.2"
        rx={s.rx > 0 ? 2 : 0}
        width="100"
        x="16"
        y="78"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.12"
        rx={s.rx > 0 ? 2 : 0}
        width="80"
        x="16"
        y="94"
      />
      <rect
        fill={c.primary}
        height="20"
        rx={s.rx > 0 ? 10 : 0}
        width="64"
        x="16"
        y="114"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.9"
        rx={s.rx > 0 ? 2 : 0}
        width="44"
        x="26"
        y="120"
      />
      <rect
        fill={c.primary}
        height="100"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 12 : 0}
        width="104"
        x="160"
        y="44"
      />
      <circle
        cx="212"
        cy="84"
        fill={c.primary}
        opacity={s.decorOpacity}
        r="20"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="72"
        x="176"
        y="116"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="56"
        x="184"
        y="128"
      />
    </svg>
  );
}

export function WebHeroFull({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect
        fill={c.primary}
        height="180"
        opacity={s.baseOpacity}
        rx={s.rx}
        width="280"
      />
      <rect
        fill={c.primary}
        height="32"
        opacity={s.baseOpacity * 0.5}
        width="280"
        x="0"
        y="0"
      />
      <rect
        fill={c.primary}
        height="12"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="16"
        y="10"
      />
      <rect
        fill={c.text}
        height="16"
        opacity="0.8"
        rx={s.rx > 0 ? 3 : 0}
        width="160"
        x="60"
        y="60"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.25"
        rx={s.rx > 0 ? 2 : 0}
        width="104"
        x="88"
        y="84"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.15"
        rx={s.rx > 0 ? 2 : 0}
        width="72"
        x="104"
        y="102"
      />
      <rect
        fill={c.primary}
        height="22"
        rx={s.rx > 0 ? 11 : 0}
        width="64"
        x="108"
        y="124"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.9"
        rx={s.rx > 0 ? 2 : 0}
        width="44"
        x="118"
        y="131"
      />
      <rect
        fill={c.secondary}
        height="20"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 10 : 0}
        width="36"
        x="32"
        y="152"
      />
      <rect
        fill={c.accent}
        height="20"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 10 : 0}
        width="36"
        x="80"
        y="152"
      />
    </svg>
  );
}

export function WebHeroMinimal({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="32"
        opacity={s.baseOpacity}
        width="280"
        x="0"
        y="0"
      />
      <rect
        fill={c.primary}
        height="12"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="16"
        y="10"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.15"
        rx={s.rx > 0 ? 2 : 0}
        width="24"
        x="190"
        y="12"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.15"
        rx={s.rx > 0 ? 2 : 0}
        width="24"
        x="220"
        y="12"
      />
      <rect
        fill={c.text}
        height="14"
        opacity="0.8"
        rx={s.rx > 0 ? 3 : 0}
        width="168"
        x="56"
        y="68"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.2"
        rx={s.rx > 0 ? 2 : 0}
        width="120"
        x="80"
        y="90"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.12"
        rx={s.rx > 0 ? 2 : 0}
        width="88"
        x="96"
        y="106"
      />
      <rect
        fill={c.primary}
        height="20"
        rx={s.rx > 0 ? 10 : 0}
        width="64"
        x="108"
        y="128"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.9"
        rx={s.rx > 0 ? 2 : 0}
        width="44"
        x="118"
        y="134"
      />
    </svg>
  );
}

export function WebDashboard({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="180"
        opacity={s.baseOpacity * 0.75}
        width="60"
        x="0"
        y="0"
      />
      <rect
        fill={c.primary}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="40"
        x="10"
        y="12"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.12"
        rx={s.rx > 0 ? 1.5 : 0}
        width="36"
        x="10"
        y="30"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.12"
        rx={s.rx > 0 ? 1.5 : 0}
        width="36"
        x="10"
        y="44"
      />
      <rect
        fill={c.primary}
        height="5"
        opacity="0.2"
        rx={s.rx > 0 ? 1.5 : 0}
        width="36"
        x="10"
        y="58"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.12"
        rx={s.rx > 0 ? 1.5 : 0}
        width="36"
        x="10"
        y="72"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="196"
        x="72"
        y="12"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 6 : 0}
        width="60"
        x="72"
        y="32"
      />
      <rect
        fill={c.secondary}
        height="40"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 6 : 0}
        width="60"
        x="140"
        y="32"
      />
      <rect
        fill={c.accent}
        height="40"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 6 : 0}
        width="60"
        x="208"
        y="32"
      />
      <rect
        fill={c.primary}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1 : 0}
        width="20"
        x="80"
        y="40"
      />
      <rect
        fill={c.secondary}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1 : 0}
        width="20"
        x="148"
        y="40"
      />
      <rect
        fill={c.accent}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1 : 0}
        width="20"
        x="216"
        y="40"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.15"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="80"
        y="52"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.15"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="148"
        y="52"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.15"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="216"
        y="52"
      />
      <rect
        fill={c.text}
        height="84"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="196"
        x="72"
        y="84"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.2"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="82"
        y="94"
      />
      <rect
        fill={c.primary}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="176"
        x="82"
        y="108"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="176"
        x="82"
        y="118"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="176"
        x="82"
        y="128"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="140"
        x="82"
        y="138"
      />
      <rect
        fill={c.primary}
        height="4"
        opacity="0.3"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="82"
        y="152"
      />
    </svg>
  );
}

// WebDashboard variants
export function WebDashboardSidebarRight({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="32"
        opacity={s.baseOpacity * 0.5}
        width="220"
        x="0"
        y="0"
      />
      <rect
        fill={c.primary}
        height="10"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="48"
        x="16"
        y="10"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="72"
        y="12"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="108"
        y="12"
      />
      <rect
        fill={c.primary}
        height="44"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 6 : 0}
        width="100"
        x="12"
        y="44"
      />
      <rect
        fill={c.secondary}
        height="44"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 6 : 0}
        width="84"
        x="124"
        y="44"
      />
      <rect
        fill={c.primary}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1 : 0}
        width="36"
        x="20"
        y="54"
      />
      <rect
        fill={c.secondary}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1 : 0}
        width="36"
        x="132"
        y="54"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="20"
        y="66"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="132"
        y="66"
      />
      <rect
        fill={c.text}
        height="72"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="196"
        x="12"
        y="96"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.2"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="22"
        y="106"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="176"
        x="22"
        y="118"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="176"
        x="22"
        y="128"
      />
      <rect
        fill={c.primary}
        height="156"
        opacity={s.baseOpacity * 0.75}
        width="48"
        x="222"
        y="12"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.12"
        rx={s.rx > 0 ? 1.5 : 0}
        width="32"
        x="230"
        y="28"
      />
      <rect
        fill={c.primary}
        height="5"
        opacity="0.2"
        rx={s.rx > 0 ? 1.5 : 0}
        width="32"
        x="230"
        y="42"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.12"
        rx={s.rx > 0 ? 1.5 : 0}
        width="32"
        x="230"
        y="56"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.12"
        rx={s.rx > 0 ? 1.5 : 0}
        width="32"
        x="230"
        y="70"
      />
    </svg>
  );
}

export function WebDashboardNoSidebar({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="32"
        opacity={s.baseOpacity}
        width="280"
        x="0"
        y="0"
      />
      <rect
        fill={c.primary}
        height="10"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="48"
        x="16"
        y="10"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.2"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="72"
        y="12"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.2"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="108"
        y="12"
      />
      <rect
        fill={c.primary}
        height="44"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 6 : 0}
        width="80"
        x="16"
        y="44"
      />
      <rect
        fill={c.secondary}
        height="44"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 6 : 0}
        width="80"
        x="104"
        y="44"
      />
      <rect
        fill={c.accent}
        height="44"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 6 : 0}
        width="72"
        x="192"
        y="44"
      />
      <rect
        fill={c.primary}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1 : 0}
        width="20"
        x="24"
        y="54"
      />
      <rect
        fill={c.secondary}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1 : 0}
        width="20"
        x="112"
        y="54"
      />
      <rect
        fill={c.accent}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1 : 0}
        width="20"
        x="200"
        y="54"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="24"
        y="66"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="112"
        y="66"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="48"
        x="200"
        y="66"
      />
      <rect
        fill={c.text}
        height="72"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="248"
        x="16"
        y="96"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.2"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="26"
        y="106"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="228"
        x="26"
        y="118"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="228"
        x="26"
        y="128"
      />
    </svg>
  );
}

export function WebDashboardCompact({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="180"
        opacity={s.baseOpacity * 0.75}
        width="36"
        x="0"
        y="0"
      />
      <rect
        fill={c.primary}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="16"
        x="10"
        y="10"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="16"
        x="10"
        y="26"
      />
      <rect
        fill={c.primary}
        height="5"
        opacity="0.2"
        rx={s.rx > 0 ? 1 : 0}
        width="16"
        x="10"
        y="38"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="16"
        x="10"
        y="50"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="16"
        x="10"
        y="62"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="120"
        x="48"
        y="10"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 6 : 0}
        width="56"
        x="48"
        y="32"
      />
      <rect
        fill={c.secondary}
        height="40"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 6 : 0}
        width="56"
        x="112"
        y="32"
      />
      <rect
        fill={c.accent}
        height="40"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 6 : 0}
        width="88"
        x="176"
        y="32"
      />
      <rect
        fill={c.primary}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1 : 0}
        width="16"
        x="56"
        y="42"
      />
      <rect
        fill={c.secondary}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1 : 0}
        width="16"
        x="120"
        y="42"
      />
      <rect
        fill={c.accent}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1 : 0}
        width="16"
        x="184"
        y="42"
      />
      <rect
        fill={c.text}
        height="84"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="216"
        x="48"
        y="84"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.2"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="56"
        y="94"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="196"
        x="56"
        y="108"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="196"
        x="56"
        y="118"
      />
    </svg>
  );
}

export function WebPricing({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.text}
        height="10"
        opacity="0.7"
        rx={s.rx > 0 ? 2 : 0}
        width="100"
        x="90"
        y="10"
      />
      <rect
        fill={c.text}
        height="130"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="76"
        x="24"
        y="36"
      />
      <rect
        fill={c.primary}
        height="138"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 8 : 0}
        width="76"
        x="102"
        y="28"
      />
      <rect
        fill={c.primary}
        height="20"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 8 : 0}
        width="76"
        x="102"
        y="28"
      />
      <rect
        fill={c.text}
        height="130"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="76"
        x="180"
        y="36"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="52"
        x="36"
        y="50"
      />
      <rect
        fill={c.primary}
        height="8"
        opacity="0.7"
        rx={s.rx > 0 ? 2 : 0}
        width="52"
        x="114"
        y="42"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="52"
        x="192"
        y="50"
      />
      <rect
        fill={c.text}
        height="14"
        opacity="0.7"
        rx={s.rx > 0 ? 2 : 0}
        width="28"
        x="40"
        y="70"
      />
      <rect
        fill={c.primary}
        height="14"
        rx={s.rx > 0 ? 2 : 0}
        width="28"
        x="118"
        y="62"
      />
      <rect
        fill={c.text}
        height="14"
        opacity="0.7"
        rx={s.rx > 0 ? 2 : 0}
        width="28"
        x="196"
        y="70"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="52"
        x="36"
        y="94"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="52"
        x="36"
        y="104"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="36"
        y="114"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="52"
        x="114"
        y="86"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="52"
        x="114"
        y="96"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="52"
        x="114"
        y="106"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="114"
        y="116"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="52"
        x="192"
        y="94"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="52"
        x="192"
        y="104"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="192"
        y="114"
      />
      <rect
        fill={c.text}
        height="16"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 8 : 0}
        width="52"
        x="36"
        y="140"
      />
      <rect
        fill={c.primary}
        height="16"
        rx={s.rx > 0 ? 8 : 0}
        width="52"
        x="114"
        y="132"
      />
      <rect
        fill={c.text}
        height="16"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 8 : 0}
        width="52"
        x="192"
        y="140"
      />
    </svg>
  );
}

// WebPricing variants
export function WebPricing2Col({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.text}
        height="10"
        opacity="0.7"
        rx={s.rx > 0 ? 2 : 0}
        width="120"
        x="80"
        y="10"
      />
      <rect
        fill={c.text}
        height="130"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="112"
        x="24"
        y="36"
      />
      <rect
        fill={c.primary}
        height="138"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 8 : 0}
        width="112"
        x="144"
        y="28"
      />
      <rect
        fill={c.primary}
        height="20"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 8 : 0}
        width="112"
        x="144"
        y="28"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="80"
        x="40"
        y="50"
      />
      <rect
        fill={c.primary}
        height="8"
        opacity="0.7"
        rx={s.rx > 0 ? 2 : 0}
        width="80"
        x="160"
        y="42"
      />
      <rect
        fill={c.text}
        height="14"
        opacity="0.7"
        rx={s.rx > 0 ? 2 : 0}
        width="40"
        x="48"
        y="70"
      />
      <rect
        fill={c.primary}
        height="14"
        rx={s.rx > 0 ? 2 : 0}
        width="40"
        x="168"
        y="62"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="40"
        y="94"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="40"
        y="104"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="40"
        y="114"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="160"
        y="86"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="160"
        y="96"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="160"
        y="106"
      />
      <rect
        fill={c.text}
        height="16"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="80"
        x="40"
        y="140"
      />
      <rect
        fill={c.primary}
        height="16"
        rx={s.rx > 0 ? 8 : 0}
        width="80"
        x="160"
        y="132"
      />
    </svg>
  );
}

export function WebPricingHorizontal({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.text}
        height="10"
        opacity="0.7"
        rx={s.rx > 0 ? 2 : 0}
        width="100"
        x="90"
        y="8"
      />
      <rect
        fill={c.text}
        height="38"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="248"
        x="16"
        y="30"
      />
      <rect
        fill={c.primary}
        height="38"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 6 : 0}
        width="248"
        x="16"
        y="76"
      />
      <rect
        fill={c.text}
        height="38"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="248"
        x="16"
        y="122"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="40"
        x="28"
        y="42"
      />
      <rect
        fill={c.primary}
        height="8"
        opacity="0.7"
        rx={s.rx > 0 ? 2 : 0}
        width="40"
        x="28"
        y="88"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="40"
        x="28"
        y="134"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 4 : 0}
        width="48"
        x="200"
        y="40"
      />
      <rect
        fill={c.primary}
        height="14"
        rx={s.rx > 0 ? 4 : 0}
        width="48"
        x="200"
        y="86"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 4 : 0}
        width="48"
        x="200"
        y="132"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="100"
        x="80"
        y="44"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="80"
        y="52"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="100"
        x="80"
        y="90"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="80"
        y="98"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="100"
        x="80"
        y="136"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="80"
        y="144"
      />
    </svg>
  );
}

export function WebPricingFeatured({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.text}
        height="10"
        opacity="0.7"
        rx={s.rx > 0 ? 2 : 0}
        width="100"
        x="90"
        y="6"
      />
      <rect
        fill={c.text}
        height="120"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="76"
        x="16"
        y="40"
      />
      <rect
        fill={c.primary}
        height="144"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 8 : 0}
        width="76"
        x="102"
        y="24"
      />
      <rect
        fill={c.primary}
        height="20"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 8 : 0}
        width="76"
        x="102"
        y="24"
      />
      <rect
        fill={c.text}
        height="120"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="76"
        x="188"
        y="40"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="52"
        x="28"
        y="54"
      />
      <rect
        fill={c.primary}
        height="8"
        opacity="0.8"
        rx={s.rx > 0 ? 2 : 0}
        width="52"
        x="114"
        y="38"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="52"
        x="200"
        y="54"
      />
      <rect
        fill={c.text}
        height="14"
        opacity="0.7"
        rx={s.rx > 0 ? 2 : 0}
        width="28"
        x="32"
        y="74"
      />
      <rect
        fill={c.primary}
        height="14"
        rx={s.rx > 0 ? 2 : 0}
        width="28"
        x="118"
        y="58"
      />
      <rect
        fill={c.text}
        height="14"
        opacity="0.7"
        rx={s.rx > 0 ? 2 : 0}
        width="28"
        x="204"
        y="74"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="52"
        x="28"
        y="100"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="52"
        x="28"
        y="110"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="52"
        x="114"
        y="84"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="52"
        x="114"
        y="94"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="52"
        x="200"
        y="100"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="52"
        x="200"
        y="110"
      />
      <rect
        fill={c.text}
        height="16"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="52"
        x="32"
        y="134"
      />
      <rect
        fill={c.primary}
        height="16"
        rx={s.rx > 0 ? 8 : 0}
        width="52"
        x="118"
        y="130"
      />
      <rect
        fill={c.text}
        height="16"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="52"
        x="204"
        y="134"
      />
    </svg>
  );
}

export function WebBlog({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="16"
        y="14"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="80"
        x="16"
        y="36"
      />
      <rect
        fill={c.primary}
        height="112"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 8 : 0}
        width="80"
        x="16"
        y="52"
      />
      <rect
        fill={c.primary}
        height="36"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 4 : 0}
        width="64"
        x="24"
        y="60"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="56"
        x="24"
        y="104"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="64"
        x="24"
        y="116"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="64"
        x="24"
        y="126"
      />
      <rect
        fill={c.secondary}
        height="16"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 4 : 0}
        width="32"
        x="24"
        y="140"
      />
      <rect
        fill={c.secondary}
        height="112"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="80"
        x="108"
        y="36"
      />
      <rect
        fill={c.secondary}
        height="36"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 4 : 0}
        width="64"
        x="116"
        y="44"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="56"
        x="116"
        y="88"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="64"
        x="116"
        y="100"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="64"
        x="116"
        y="110"
      />
      <rect
        fill={c.accent}
        height="16"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 4 : 0}
        width="32"
        x="116"
        y="124"
      />
      <rect
        fill={c.accent}
        height="112"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="64"
        x="200"
        y="36"
      />
      <rect
        fill={c.accent}
        height="36"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 4 : 0}
        width="48"
        x="208"
        y="44"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="208"
        y="88"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="48"
        x="208"
        y="100"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="48"
        x="208"
        y="110"
      />
      <rect
        fill={c.primary}
        height="16"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 4 : 0}
        width="32"
        x="208"
        y="124"
      />
    </svg>
  );
}

// WebBlog variants
export function WebBlogList({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="16"
        y="14"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="80"
        x="16"
        y="36"
      />
      <rect
        fill={c.primary}
        height="30"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 6 : 0}
        width="248"
        x="16"
        y="56"
      />
      <rect
        fill={c.primary}
        height="18"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 4 : 0}
        width="48"
        x="24"
        y="62"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="80"
        y="62"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="120"
        x="80"
        y="72"
      />
      <rect
        fill={c.secondary}
        height="30"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="248"
        x="16"
        y="94"
      />
      <rect
        fill={c.secondary}
        height="18"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 4 : 0}
        width="48"
        x="24"
        y="100"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="80"
        y="100"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="120"
        x="80"
        y="110"
      />
      <rect
        fill={c.accent}
        height="30"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="248"
        x="16"
        y="132"
      />
      <rect
        fill={c.accent}
        height="18"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 4 : 0}
        width="48"
        x="24"
        y="138"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="80"
        y="138"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="120"
        x="80"
        y="148"
      />
    </svg>
  );
}

export function WebBlogMasonry({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="16"
        y="14"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="80"
        x="16"
        y="36"
      />
      <rect
        fill={c.primary}
        height="58"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 8 : 0}
        width="120"
        x="16"
        y="54"
      />
      <rect
        fill={c.primary}
        height="28"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 4 : 0}
        width="104"
        x="24"
        y="62"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="24"
        y="96"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="100"
        x="24"
        y="106"
      />
      <rect
        fill={c.secondary}
        height="42"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="120"
        x="144"
        y="54"
      />
      <rect
        fill={c.secondary}
        height="22"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 4 : 0}
        width="60"
        x="152"
        y="62"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="152"
        y="88"
      />
      <rect
        fill={c.accent}
        height="30"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="120"
        x="144"
        y="104"
      />
      <rect
        fill={c.accent}
        height="18"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 4 : 0}
        width="60"
        x="152"
        y="110"
      />
      <rect
        fill={c.text}
        height="42"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="120"
        x="16"
        y="120"
      />
      <rect
        fill={c.text}
        height="22"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 4 : 0}
        width="60"
        x="24"
        y="128"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="24"
        y="154"
      />
      <rect
        fill={c.text}
        height="1"
        opacity="0.06"
        width="248"
        x="16"
        y="168"
      />
    </svg>
  );
}

export function WebBlogFeatured({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="16"
        y="14"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="80"
        x="16"
        y="36"
      />
      <rect
        fill={c.primary}
        height="68"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 8 : 0}
        width="248"
        x="16"
        y="54"
      />
      <rect
        fill={c.primary}
        height="36"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 4 : 0}
        width="120"
        x="24"
        y="62"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="100"
        x="24"
        y="104"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="96"
        x="160"
        y="62"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="160"
        y="74"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="90"
        x="160"
        y="84"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="70"
        x="160"
        y="94"
      />
      <rect
        fill={c.secondary}
        height="42"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="76"
        x="16"
        y="130"
      />
      <rect
        fill={c.secondary}
        height="18"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 4 : 0}
        width="60"
        x="24"
        y="136"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="24"
        y="158"
      />
      <rect
        fill={c.accent}
        height="42"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="76"
        x="100"
        y="130"
      />
      <rect
        fill={c.accent}
        height="18"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 4 : 0}
        width="60"
        x="108"
        y="136"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="108"
        y="158"
      />
      <rect
        fill={c.text}
        height="42"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="80"
        x="184"
        y="130"
      />
      <rect
        fill={c.text}
        height="18"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 4 : 0}
        width="60"
        x="192"
        y="136"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="192"
        y="158"
      />
    </svg>
  );
}

export function WebContact({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.text}
        height="10"
        opacity="0.7"
        rx={s.rx > 0 ? 2 : 0}
        width="100"
        x="16"
        y="16"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="120"
        x="16"
        y="36"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="108"
        x="16"
        y="58"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="108"
        x="132"
        y="58"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="224"
        x="16"
        y="80"
      />
      <rect
        fill={c.text}
        height="32"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="224"
        x="16"
        y="102"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="24"
        y="110"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="160"
        x="24"
        y="120"
      />
      <rect
        fill={c.primary}
        height="18"
        rx={s.rx > 0 ? 9 : 0}
        width="80"
        x="16"
        y="146"
      />
      <rect
        fill={c.text}
        height="18"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 9 : 0}
        width="60"
        x="104"
        y="146"
      />
      <circle
        cx="248"
        cy="155"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="12"
      />
      <rect
        fill={c.secondary}
        height="8"
        opacity="0.3"
        rx={s.rx > 0 ? 2 : 0}
        width="16"
        x="240"
        y="151"
      />
    </svg>
  );
}

// WebContact variants
export function WebContactSplit({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.text}
        height="10"
        opacity="0.7"
        rx={s.rx > 0 ? 2 : 0}
        width="100"
        x="16"
        y="16"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="100"
        x="16"
        y="36"
      />
      <rect
        fill={c.primary}
        height="36"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="100"
        x="16"
        y="58"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.15"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="24"
        y="66"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="24"
        y="78"
      />
      <rect
        fill={c.primary}
        height="28"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="100"
        x="16"
        y="104"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.15"
        rx={s.rx > 0 ? 1 : 0}
        width="50"
        x="24"
        y="112"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="70"
        x="24"
        y="122"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="124"
        x="140"
        y="16"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="124"
        x="140"
        y="36"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="124"
        x="140"
        y="58"
      />
      <rect
        fill={c.text}
        height="32"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="124"
        x="140"
        y="80"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="148"
        y="88"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="100"
        x="148"
        y="98"
      />
      <rect
        fill={c.primary}
        height="18"
        rx={s.rx > 0 ? 9 : 0}
        width="56"
        x="140"
        y="122"
      />
      <rect
        fill={c.text}
        height="18"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 9 : 0}
        width="48"
        x="208"
        y="122"
      />
      <circle
        cx="260"
        cy="160"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="10"
      />
    </svg>
  );
}

export function WebContact2Col({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.text}
        height="10"
        opacity="0.7"
        rx={s.rx > 0 ? 2 : 0}
        width="100"
        x="16"
        y="16"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="120"
        x="16"
        y="36"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="108"
        x="16"
        y="56"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="132"
        x="132"
        y="56"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="108"
        x="16"
        y="78"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="132"
        x="132"
        y="78"
      />
      <rect
        fill={c.text}
        height="32"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="248"
        x="16"
        y="100"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="24"
        y="108"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="160"
        x="24"
        y="118"
      />
      <rect
        fill={c.primary}
        height="18"
        rx={s.rx > 0 ? 9 : 0}
        width="80"
        x="16"
        y="144"
      />
      <rect
        fill={c.text}
        height="18"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 9 : 0}
        width="60"
        x="104"
        y="144"
      />
      <circle
        cx="248"
        cy="153"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="10"
      />
    </svg>
  );
}

export function WebContactMinimal({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.text}
        height="10"
        opacity="0.7"
        rx={s.rx > 0 ? 2 : 0}
        width="100"
        x="16"
        y="16"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="120"
        x="16"
        y="36"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="248"
        x="16"
        y="60"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="248"
        x="16"
        y="82"
      />
      <rect
        fill={c.text}
        height="28"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="248"
        x="16"
        y="104"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="24"
        y="112"
      />
      <rect
        fill={c.primary}
        height="18"
        rx={s.rx > 0 ? 9 : 0}
        width="80"
        x="16"
        y="142"
      />
    </svg>
  );
}

export function WebProduct({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="80"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 10 : 0}
        width="248"
        x="16"
        y="16"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 8 : 0}
        width="80"
        x="100"
        y="40"
      />
      <circle cx="140" cy="60" fill={c.primary} opacity="0.3" r="12" />
      <rect
        fill={c.text}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="120"
        x="16"
        y="106"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="16"
        y="122"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.1"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="16"
        y="134"
      />
      <rect
        fill={c.primary}
        height="16"
        rx={s.rx > 0 ? 8 : 0}
        width="60"
        x="16"
        y="152"
      />
      <rect
        fill={c.secondary}
        height="16"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 8 : 0}
        width="40"
        x="84"
        y="152"
      />
      <circle
        cx="240"
        cy="160"
        fill={c.accent}
        opacity={s.decorOpacity}
        r="10"
      />
      <rect
        fill={c.text}
        height="60"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="64"
        x="200"
        y="106"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.12"
        rx={s.rx > 0 ? 1.5 : 0}
        width="48"
        x="208"
        y="118"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.08"
        rx={s.rx > 0 ? 1.5 : 0}
        width="32"
        x="208"
        y="130"
      />
    </svg>
  );
}

// WebProduct variants
export function WebProductGallery({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="60"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 8 : 0}
        width="120"
        x="16"
        y="16"
      />
      <rect
        fill={c.secondary}
        height="60"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="120"
        x="144"
        y="16"
      />
      <rect
        fill={c.accent}
        height="60"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="120"
        x="16"
        y="84"
      />
      <rect
        fill={c.text}
        height="60"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="120"
        x="144"
        y="84"
      />
      <circle
        cx="76"
        cy="46"
        fill={c.primary}
        opacity={s.decorOpacity}
        r="10"
      />
      <circle
        cx="204"
        cy="46"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="10"
      />
      <circle
        cx="76"
        cy="114"
        fill={c.accent}
        opacity={s.decorOpacity}
        r="10"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="120"
        x="16"
        y="152"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.15"
        rx={s.rx > 0 ? 2 : 0}
        width="80"
        x="144"
        y="152"
      />
      <rect
        fill={c.primary}
        height="6"
        rx={s.rx > 0 ? 2 : 0}
        width="56"
        x="144"
        y="164"
      />
    </svg>
  );
}

export function WebProductSplit({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="148"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 10 : 0}
        width="120"
        x="16"
        y="16"
      />
      <circle
        cx="76"
        cy="70"
        fill={c.primary}
        opacity={s.decorOpacity}
        r="20"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.7"
        rx={s.rx > 0 ? 2 : 0}
        width="112"
        x="152"
        y="16"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="152"
        y="36"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.1"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="152"
        y="50"
      />
      <rect
        fill={c.text}
        height="14"
        opacity="0.7"
        rx={s.rx > 0 ? 2 : 0}
        width="52"
        x="152"
        y="68"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="112"
        x="152"
        y="90"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="112"
        x="152"
        y="100"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="112"
        x="152"
        y="110"
      />
      <rect
        fill={c.primary}
        height="18"
        rx={s.rx > 0 ? 8 : 0}
        width="56"
        x="152"
        y="130"
      />
      <rect
        fill={c.secondary}
        height="18"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 8 : 0}
        width="40"
        x="216"
        y="130"
      />
      <circle
        cx="240"
        cy="165"
        fill={c.accent}
        opacity={s.decorOpacity}
        r="8"
      />
    </svg>
  );
}

export function WebProductFullScroll({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="70"
        opacity={s.baseOpacity}
        width="280"
        x="0"
        y="0"
      />
      <rect
        fill={c.primary}
        height="30"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 8 : 0}
        width="120"
        x="80"
        y="20"
      />
      <circle cx="140" cy="35" fill={c.primary} opacity="0.3" r="10" />
      <rect
        fill={c.text}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="100"
        x="16"
        y="82"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="16"
        y="96"
      />
      <rect
        fill={c.text}
        height="28"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="248"
        x="16"
        y="110"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.15"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="24"
        y="118"
      />
      <rect
        fill={c.primary}
        height="6"
        opacity="0.2"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="72"
        y="118"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="120"
        y="118"
      />
      <rect
        fill={c.primary}
        height="18"
        rx={s.rx > 0 ? 8 : 0}
        width="80"
        x="16"
        y="148"
      />
      <rect
        fill={c.secondary}
        height="18"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 8 : 0}
        width="60"
        x="104"
        y="148"
      />
    </svg>
  );
}

export function WebNavbar({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="32"
        opacity={s.baseOpacity * 0.75}
        width="280"
        x="0"
        y="0"
      />
      <rect
        fill={c.primary}
        height="10"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="48"
        x="16"
        y="10"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.2"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="80"
        y="12"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.2"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="116"
        y="12"
      />
      <rect
        fill={c.primary}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="152"
        y="12"
      />
      <rect
        fill={c.primary}
        height="16"
        rx={s.rx > 0 ? 8 : 0}
        width="36"
        x="228"
        y="8"
      />
      <rect
        fill={c.text}
        height="28"
        opacity={s.baseOpacity * 0.375}
        width="280"
        x="0"
        y="44"
      />
      <rect
        fill={c.secondary}
        height="12"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 6 : 0}
        width="40"
        x="16"
        y="52"
      />
      <rect
        fill={c.accent}
        height="12"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 6 : 0}
        width="40"
        x="64"
        y="52"
      />
      <rect
        fill={c.text}
        height="12"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="40"
        x="112"
        y="52"
      />
      <rect
        fill={c.text}
        height="80"
        opacity={s.baseOpacity * 0.375}
        rx={s.rx > 0 ? 8 : 0}
        width="248"
        x="16"
        y="88"
      />
      <rect
        fill={c.text}
        height="20"
        opacity={s.baseOpacity * 0.25}
        rx="0"
        width="280"
        x="16"
        y="88"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="32"
        y="100"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="216"
        x="32"
        y="116"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="216"
        x="32"
        y="126"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="180"
        x="32"
        y="136"
      />
    </svg>
  );
}

// WebNavbar variants
export function WebNavbarLeft({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="32"
        opacity={s.baseOpacity * 0.75}
        width="280"
        x="0"
        y="0"
      />
      <rect
        fill={c.primary}
        height="10"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="48"
        x="16"
        y="10"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.2"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="72"
        y="12"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.2"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="108"
        y="12"
      />
      <rect
        fill={c.primary}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="144"
        y="12"
      />
      <rect
        fill={c.primary}
        height="16"
        rx={s.rx > 0 ? 8 : 0}
        width="36"
        x="228"
        y="8"
      />
      <rect
        fill={c.text}
        height="28"
        opacity={s.baseOpacity * 0.375}
        width="280"
        x="0"
        y="44"
      />
      <rect
        fill={c.secondary}
        height="12"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 6 : 0}
        width="40"
        x="16"
        y="52"
      />
      <rect
        fill={c.accent}
        height="12"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 6 : 0}
        width="40"
        x="64"
        y="52"
      />
      <rect
        fill={c.text}
        height="12"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="40"
        x="112"
        y="52"
      />
      <rect
        fill={c.text}
        height="80"
        opacity={s.baseOpacity * 0.375}
        rx={s.rx > 0 ? 8 : 0}
        width="248"
        x="16"
        y="88"
      />
      <rect
        fill={c.text}
        height="20"
        opacity={s.baseOpacity * 0.25}
        rx="0"
        width="280"
        x="16"
        y="88"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="32"
        y="100"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="216"
        x="32"
        y="116"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="216"
        x="32"
        y="126"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="180"
        x="32"
        y="136"
      />
    </svg>
  );
}

export function WebNavbarMega({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="32"
        opacity={s.baseOpacity * 0.75}
        width="280"
        x="0"
        y="0"
      />
      <rect
        fill={c.primary}
        height="10"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="48"
        x="16"
        y="10"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.2"
        rx={s.rx > 0 ? 1.5 : 0}
        width="48"
        x="72"
        y="12"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.2"
        rx={s.rx > 0 ? 1.5 : 0}
        width="48"
        x="128"
        y="12"
      />
      <rect
        fill={c.primary}
        height="16"
        rx={s.rx > 0 ? 8 : 0}
        width="36"
        x="228"
        y="8"
      />
      <rect
        fill={c.text}
        height="60"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="200"
        x="72"
        y="36"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.2"
        rx={s.rx > 0 ? 1.5 : 0}
        width="56"
        x="80"
        y="44"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="48"
        x="80"
        y="54"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="52"
        x="80"
        y="62"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="44"
        x="80"
        y="70"
      />
      <rect
        fill={c.primary}
        height="5"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="56"
        x="144"
        y="44"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="48"
        x="144"
        y="54"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="52"
        x="144"
        y="62"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="48"
        x="216"
        y="44"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="216"
        y="54"
      />
      <rect
        fill={c.text}
        height="64"
        opacity={s.baseOpacity * 0.375}
        rx={s.rx > 0 ? 8 : 0}
        width="248"
        x="16"
        y="108"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="32"
        y="120"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="216"
        x="32"
        y="136"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="216"
        x="32"
        y="146"
      />
    </svg>
  );
}

export function WebNavbarFloating({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="28"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 14 : 0}
        width="248"
        x="16"
        y="8"
      />
      <rect
        fill={c.primary}
        height="10"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="48"
        x="28"
        y="16"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.2"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="88"
        y="18"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.2"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="124"
        y="18"
      />
      <rect
        fill={c.primary}
        height="16"
        rx={s.rx > 0 ? 8 : 0}
        width="36"
        x="220"
        y="14"
      />
      <rect
        fill={c.text}
        height="28"
        opacity={s.baseOpacity * 0.375}
        width="248"
        x="16"
        y="48"
      />
      <rect
        fill={c.secondary}
        height="12"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 6 : 0}
        width="40"
        x="28"
        y="56"
      />
      <rect
        fill={c.accent}
        height="12"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 6 : 0}
        width="40"
        x="76"
        y="56"
      />
      <rect
        fill={c.text}
        height="80"
        opacity={s.baseOpacity * 0.375}
        rx={s.rx > 0 ? 8 : 0}
        width="248"
        x="16"
        y="88"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="32"
        y="100"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="216"
        x="32"
        y="116"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="216"
        x="32"
        y="126"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.06"
        rx={s.rx > 0 ? 1 : 0}
        width="180"
        x="32"
        y="136"
      />
    </svg>
  );
}

export function WebFooter({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="10"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="48"
        x="16"
        y="16"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="16"
        y="36"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.1"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="16"
        y="50"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.1"
        rx={s.rx > 0 ? 1.5 : 0}
        width="50"
        x="16"
        y="64"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="112"
        y="16"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="50"
        x="112"
        y="30"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="44"
        x="112"
        y="40"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="48"
        x="112"
        y="50"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="112"
        y="60"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="192"
        y="16"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="48"
        x="192"
        y="30"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="42"
        x="192"
        y="40"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="46"
        x="192"
        y="50"
      />
      <rect
        fill={c.primary}
        height="44"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="248"
        x="16"
        y="88"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="28"
        y="100"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="160"
        x="28"
        y="114"
      />
      <rect
        fill={c.primary}
        height="20"
        rx={s.rx > 0 ? 10 : 0}
        width="52"
        x="200"
        y="96"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.8"
        rx={s.rx > 0 ? 2 : 0}
        width="36"
        x="208"
        y="102"
      />
      <rect
        fill={c.text}
        height="1"
        opacity="0.06"
        width="248"
        x="16"
        y="148"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="100"
        x="16"
        y="158"
      />
      <circle cx="220" cy="160" fill={c.text} opacity={s.decorOpacity} r="6" />
      <circle cx="236" cy="160" fill={c.text} opacity={s.decorOpacity} r="6" />
      <circle cx="252" cy="160" fill={c.text} opacity={s.decorOpacity} r="6" />
    </svg>
  );
}

// WebFooter variants
export function WebFooterMinimal({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="10"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="100"
        x="90"
        y="20"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="120"
        x="80"
        y="38"
      />
      <rect fill={c.text} height="1" opacity="0.06" width="248" x="16" y="60" />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="24"
        x="80"
        y="76"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="24"
        x="112"
        y="76"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="24"
        x="144"
        y="76"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="24"
        x="176"
        y="76"
      />
      <rect
        fill={c.primary}
        height="44"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="248"
        x="16"
        y="100"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="120"
        x="80"
        y="114"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="80"
        y="126"
      />
      <rect
        fill={c.text}
        height="1"
        opacity="0.06"
        width="248"
        x="16"
        y="156"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="100"
        x="90"
        y="164"
      />
    </svg>
  );
}

export function WebFooterCentered({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="10"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="100"
        x="90"
        y="12"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="120"
        x="80"
        y="30"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.1"
        rx={s.rx > 0 ? 1.5 : 0}
        width="120"
        x="80"
        y="44"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.1"
        rx={s.rx > 0 ? 1.5 : 0}
        width="120"
        x="80"
        y="58"
      />
      <rect
        fill={c.primary}
        height="44"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="168"
        x="56"
        y="80"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="120"
        x="80"
        y="92"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="80"
        y="104"
      />
      <rect
        fill={c.primary}
        height="18"
        rx={s.rx > 0 ? 9 : 0}
        width="72"
        x="104"
        y="114"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.8"
        rx={s.rx > 0 ? 2 : 0}
        width="52"
        x="114"
        y="119"
      />
      <rect
        fill={c.text}
        height="1"
        opacity="0.06"
        width="248"
        x="16"
        y="140"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="120"
        x="80"
        y="152"
      />
      <circle cx="108" cy="168" fill={c.text} opacity={s.decorOpacity} r="6" />
      <circle cx="132" cy="168" fill={c.text} opacity={s.decorOpacity} r="6" />
      <circle cx="156" cy="168" fill={c.text} opacity={s.decorOpacity} r="6" />
    </svg>
  );
}

export function WebFooterSplit({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 280 180">
      <rect fill={c.background} height="180" rx={s.rx} width="280" />
      <rect
        fill={c.primary}
        height="60"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="120"
        x="16"
        y="16"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="28"
        y="28"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="28"
        y="40"
      />
      <rect
        fill={c.primary}
        height="16"
        rx={s.rx > 0 ? 8 : 0}
        width="48"
        x="28"
        y="52"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.8"
        rx={s.rx > 0 ? 2 : 0}
        width="32"
        x="36"
        y="56"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="48"
        x="144"
        y="16"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="44"
        x="144"
        y="30"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="48"
        x="144"
        y="40"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="144"
        y="50"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="48"
        x="144"
        y="60"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="48"
        x="196"
        y="16"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="44"
        x="196"
        y="30"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="48"
        x="196"
        y="40"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="196"
        y="50"
      />
      <rect
        fill={c.text}
        height="44"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="248"
        x="16"
        y="88"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="28"
        y="100"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="160"
        x="28"
        y="114"
      />
      <rect
        fill={c.text}
        height="1"
        opacity="0.06"
        width="248"
        x="16"
        y="144"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="100"
        x="16"
        y="156"
      />
      <circle cx="220" cy="160" fill={c.text} opacity={s.decorOpacity} r="6" />
      <circle cx="236" cy="160" fill={c.text} opacity={s.decorOpacity} r="6" />
      <circle cx="252" cy="160" fill={c.text} opacity={s.decorOpacity} r="6" />
    </svg>
  );
}

// ── Mobile Mockups ────────────────────────────────────────────────────────────

export function MobileFeed({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.primary}
        height="10"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="48"
        x="16"
        y="14"
      />
      <circle
        cx="136"
        cy="19"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="10"
      />
      <rect
        fill={c.primary}
        height="64"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 10 : 0}
        width="136"
        x="12"
        y="52"
      />
      <rect
        fill={c.primary}
        height="32"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 4 : 0}
        width="60"
        x="20"
        y="60"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="20"
        y="100"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="100"
        x="20"
        y="112"
      />
      <rect
        fill={c.secondary}
        height="56"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 10 : 0}
        width="136"
        x="12"
        y="128"
      />
      <rect
        fill={c.secondary}
        height="28"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 4 : 0}
        width="50"
        x="20"
        y="136"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="70"
        x="20"
        y="172"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="90"
        x="20"
        y="184"
      />
      <rect
        fill={c.accent}
        height="56"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 10 : 0}
        width="136"
        x="12"
        y="196"
      />
      <rect
        fill={c.accent}
        height="28"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 4 : 0}
        width="50"
        x="20"
        y="204"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="20"
        y="240"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="100"
        x="20"
        y="252"
      />
      <rect fill={c.background} height="16" width="160" x="0" y="264" />
      <rect
        fill={c.primary}
        height="8"
        opacity="0.3"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="28"
        y="268"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.08"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="60"
        y="268"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.08"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="92"
        y="268"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.08"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="124"
        y="268"
      />
    </svg>
  );
}

// MobileFeed variants
export function MobileFeedCompact({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="36"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.primary}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="40"
        x="12"
        y="12"
      />
      <circle
        cx="140"
        cy="18"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="8"
      />
      <rect
        fill={c.primary}
        height="36"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="144"
        x="8"
        y="44"
      />
      <rect
        fill={c.primary}
        height="20"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 4 : 0}
        width="40"
        x="16"
        y="50"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="64"
        y="52"
      />
      <rect
        fill={c.text}
        height="3"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="64"
        y="62"
      />
      <rect
        fill={c.secondary}
        height="36"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="144"
        x="8"
        y="86"
      />
      <rect
        fill={c.secondary}
        height="20"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 4 : 0}
        width="40"
        x="16"
        y="92"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="64"
        y="94"
      />
      <rect
        fill={c.text}
        height="3"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="64"
        y="104"
      />
      <rect
        fill={c.accent}
        height="36"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="144"
        x="8"
        y="128"
      />
      <rect
        fill={c.accent}
        height="20"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 4 : 0}
        width="40"
        x="16"
        y="134"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="64"
        y="136"
      />
      <rect
        fill={c.text}
        height="3"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="64"
        y="146"
      />
      <rect
        fill={c.text}
        height="36"
        opacity={s.baseOpacity * 0.375}
        rx={s.rx > 0 ? 6 : 0}
        width="144"
        x="8"
        y="170"
      />
      <rect
        fill={c.text}
        height="20"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 4 : 0}
        width="40"
        x="16"
        y="176"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="64"
        y="178"
      />
      <rect
        fill={c.text}
        height="3"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="64"
        y="188"
      />
      <rect
        fill={c.primary}
        height="36"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="144"
        x="8"
        y="212"
      />
      <rect
        fill={c.primary}
        height="20"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 4 : 0}
        width="40"
        x="16"
        y="218"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="64"
        y="220"
      />
      <rect fill={c.background} height="22" width="160" x="0" y="258" />
      <rect
        fill={c.primary}
        height="8"
        opacity="0.3"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="24"
        y="262"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.08"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="56"
        y="262"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.08"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="88"
        y="262"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.08"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="120"
        y="262"
      />
    </svg>
  );
}

export function MobileFeedMagazine({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="36"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.primary}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="40"
        x="12"
        y="12"
      />
      <circle
        cx="140"
        cy="18"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="8"
      />
      <rect
        fill={c.primary}
        height="100"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 10 : 0}
        width="144"
        x="8"
        y="44"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 6 : 0}
        width="60"
        x="16"
        y="52"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="100"
        x="16"
        y="100"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="120"
        x="16"
        y="112"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="16"
        y="122"
      />
      <rect
        fill={c.secondary}
        height="52"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="70"
        x="8"
        y="152"
      />
      <rect
        fill={c.secondary}
        height="28"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 4 : 0}
        width="50"
        x="16"
        y="160"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.4"
        rx={s.rx > 0 ? 1 : 0}
        width="50"
        x="16"
        y="194"
      />
      <rect
        fill={c.accent}
        height="52"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="66"
        x="86"
        y="152"
      />
      <rect
        fill={c.accent}
        height="28"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 4 : 0}
        width="50"
        x="94"
        y="160"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.4"
        rx={s.rx > 0 ? 1 : 0}
        width="50"
        x="94"
        y="194"
      />
      <rect
        fill={c.text}
        height="40"
        opacity={s.baseOpacity * 0.375}
        rx={s.rx > 0 ? 8 : 0}
        width="144"
        x="8"
        y="212"
      />
      <rect
        fill={c.text}
        height="24"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 4 : 0}
        width="60"
        x="16"
        y="220"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="84"
        y="222"
      />
      <rect
        fill={c.text}
        height="3"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="84"
        y="232"
      />
      <rect fill={c.background} height="20" width="160" x="0" y="260" />
      <rect
        fill={c.primary}
        height="8"
        opacity="0.3"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="28"
        y="264"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.08"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="60"
        y="264"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.08"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="92"
        y="264"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.08"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="124"
        y="264"
      />
    </svg>
  );
}

export function MobileFeedFullImage({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="36"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.primary}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="40"
        x="12"
        y="12"
      />
      <circle
        cx="140"
        cy="18"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="8"
      />
      <rect
        fill={c.primary}
        height="80"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 10 : 0}
        width="144"
        x="8"
        y="44"
      />
      <circle
        cx="80"
        cy="74"
        fill={c.primary}
        opacity={s.decorOpacity}
        r="16"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="144"
        x="8"
        y="132"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="100"
        x="8"
        y="144"
      />
      <rect
        fill={c.secondary}
        height="60"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 10 : 0}
        width="144"
        x="8"
        y="160"
      />
      <circle
        cx="80"
        cy="180"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="12"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="144"
        x="8"
        y="228"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="8"
        y="240"
      />
      <rect fill={c.background} height="20" width="160" x="0" y="260" />
      <rect
        fill={c.primary}
        height="8"
        opacity="0.3"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="28"
        y="264"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.08"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="60"
        y="264"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.08"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="92"
        y="264"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.08"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="124"
        y="264"
      />
    </svg>
  );
}

export function MobileProfile({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="90"
        opacity={s.baseOpacity}
        width="160"
        x="0"
        y="0"
      />
      <circle
        cx="80"
        cy="50"
        fill={c.primary}
        opacity={s.decorOpacity}
        r="22"
      />
      <circle cx="80" cy="50" fill={c.primary} opacity="0.25" r="16" />
      <rect
        fill={c.text}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="56"
        x="52"
        y="80"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="48"
        x="56"
        y="94"
      />
      <rect
        fill={c.text}
        height="36"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 10 : 0}
        width="128"
        x="16"
        y="112"
      />
      <rect
        fill={c.primary}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="28"
        y="120"
      />
      <rect
        fill={c.secondary}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="66"
        y="120"
      />
      <rect
        fill={c.accent}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="104"
        y="120"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="24"
        x="28"
        y="132"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="24"
        x="66"
        y="132"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="24"
        x="104"
        y="132"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="160"
      />
      <rect
        fill={c.primary}
        height="10"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 3 : 0}
        width="10"
        x="24"
        y="164"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.25"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="40"
        y="167"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="182"
      />
      <rect
        fill={c.secondary}
        height="10"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 3 : 0}
        width="10"
        x="24"
        y="186"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.25"
        rx={s.rx > 0 ? 1.5 : 0}
        width="50"
        x="40"
        y="189"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="204"
      />
      <rect
        fill={c.accent}
        height="10"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 3 : 0}
        width="10"
        x="24"
        y="208"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.25"
        rx={s.rx > 0 ? 1.5 : 0}
        width="56"
        x="40"
        y="211"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="226"
      />
      <rect
        fill={c.text}
        height="10"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 3 : 0}
        width="10"
        x="24"
        y="230"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.25"
        rx={s.rx > 0 ? 1.5 : 0}
        width="44"
        x="40"
        y="233"
      />
    </svg>
  );
}

// MobileProfile variants
export function MobileProfileScrollable({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="70"
        opacity={s.baseOpacity}
        width="160"
        x="0"
        y="0"
      />
      <circle
        cx="80"
        cy="40"
        fill={c.primary}
        opacity={s.decorOpacity}
        r="20"
      />
      <circle cx="80" cy="40" fill={c.primary} opacity="0.25" r="14" />
      <rect
        fill={c.text}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="80"
        x="40"
        y="66"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="72"
        x="44"
        y="78"
      />
      <rect
        fill={c.text}
        height="28"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="128"
        x="16"
        y="92"
      />
      <rect
        fill={c.primary}
        height="5"
        opacity="0.5"
        rx={s.rx > 0 ? 1 : 0}
        width="24"
        x="28"
        y="100"
      />
      <rect
        fill={c.secondary}
        height="5"
        opacity="0.4"
        rx={s.rx > 0 ? 1 : 0}
        width="24"
        x="60"
        y="100"
      />
      <rect
        fill={c.accent}
        height="5"
        opacity="0.4"
        rx={s.rx > 0 ? 1 : 0}
        width="24"
        x="92"
        y="100"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="128"
      />
      <rect
        fill={c.primary}
        height="10"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 3 : 0}
        width="10"
        x="24"
        y="132"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.25"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="40"
        y="135"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="150"
      />
      <rect
        fill={c.secondary}
        height="10"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 3 : 0}
        width="10"
        x="24"
        y="154"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.25"
        rx={s.rx > 0 ? 1.5 : 0}
        width="50"
        x="40"
        y="157"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="172"
      />
      <rect
        fill={c.accent}
        height="10"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 3 : 0}
        width="10"
        x="24"
        y="176"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.25"
        rx={s.rx > 0 ? 1.5 : 0}
        width="56"
        x="40"
        y="179"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="194"
      />
      <rect
        fill={c.text}
        height="10"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 3 : 0}
        width="10"
        x="24"
        y="198"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.25"
        rx={s.rx > 0 ? 1.5 : 0}
        width="44"
        x="40"
        y="201"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="216"
      />
      <rect
        fill={c.primary}
        height="10"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 3 : 0}
        width="10"
        x="24"
        y="220"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.25"
        rx={s.rx > 0 ? 1.5 : 0}
        width="52"
        x="40"
        y="223"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="238"
      />
      <rect
        fill={c.secondary}
        height="10"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 3 : 0}
        width="10"
        x="24"
        y="242"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.25"
        rx={s.rx > 0 ? 1.5 : 0}
        width="48"
        x="40"
        y="245"
      />
    </svg>
  );
}

export function MobileProfileSettings({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.2"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="12"
        y="14"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="40"
        y="12"
      />
      <rect
        fill={c.text}
        height="44"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 10 : 0}
        width="128"
        x="16"
        y="52"
      />
      <circle
        cx="36"
        cy="74"
        fill={c.primary}
        opacity={s.decorOpacity}
        r="14"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="56"
        y="64"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="56"
        y="76"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="108"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.25"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="24"
        y="112"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="130"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.25"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="24"
        y="134"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="152"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.25"
        rx={s.rx > 0 ? 1.5 : 0}
        width="70"
        x="24"
        y="156"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="174"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.25"
        rx={s.rx > 0 ? 1.5 : 0}
        width="50"
        x="24"
        y="178"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="196"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.25"
        rx={s.rx > 0 ? 1.5 : 0}
        width="90"
        x="24"
        y="200"
      />
      <rect
        fill={c.primary}
        height="36"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="128"
        x="16"
        y="220"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="40"
        y="230"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="56"
        x="40"
        y="242"
      />
    </svg>
  );
}

export function MobileProfileBento({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.primary}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="40"
        x="12"
        y="14"
      />
      <circle
        cx="136"
        cy="19"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="8"
      />
      <rect
        fill={c.primary}
        height="44"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 8 : 0}
        width="60"
        x="16"
        y="52"
      />
      <circle
        cx="46"
        cy="74"
        fill={c.primary}
        opacity={s.decorOpacity}
        r="12"
      />
      <rect
        fill={c.secondary}
        height="44"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="60"
        x="84"
        y="52"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="92"
        y="62"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="20"
        x="92"
        y="74"
      />
      <rect
        fill={c.accent}
        height="32"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="128"
        x="16"
        y="104"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="24"
        y="112"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="24"
        y="122"
      />
      <rect
        fill={c.text}
        height="44"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="60"
        x="16"
        y="144"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="24"
        y="152"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="30"
        x="24"
        y="162"
      />
      <rect
        fill={c.primary}
        height="44"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="60"
        x="84"
        y="144"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="92"
        y="152"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="30"
        x="92"
        y="162"
      />
      <rect
        fill={c.text}
        height="32"
        opacity={s.baseOpacity * 0.375}
        rx={s.rx > 0 ? 8 : 0}
        width="128"
        x="16"
        y="196"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.25"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="24"
        y="204"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="24"
        y="214"
      />
      <rect
        fill={c.text}
        height="30"
        opacity={s.baseOpacity * 0.375}
        rx={s.rx > 0 ? 8 : 0}
        width="128"
        x="16"
        y="236"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.25"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="24"
        y="244"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="24"
        y="254"
      />
    </svg>
  );
}

export function MobileLogin({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="48"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 14 : 0}
        width="48"
        x="56"
        y="40"
      />
      <circle
        cx="80"
        cy="64"
        fill={c.primary}
        opacity={s.decorOpacity}
        r="14"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="80"
        x="40"
        y="102"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="64"
        x="48"
        y="118"
      />
      <rect
        fill={c.text}
        height="20"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="112"
        x="24"
        y="142"
      />
      <rect
        fill={c.text}
        height="8"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 2 : 0}
        width="16"
        x="32"
        y="148"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="54"
        y="150"
      />
      <rect
        fill={c.text}
        height="20"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="112"
        x="24"
        y="170"
      />
      <rect
        fill={c.text}
        height="8"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 2 : 0}
        width="16"
        x="32"
        y="176"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="50"
        x="54"
        y="178"
      />
      <rect
        fill={c.primary}
        height="22"
        rx={s.rx > 0 ? 11 : 0}
        width="112"
        x="24"
        y="202"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.8"
        rx={s.rx > 0 ? 2 : 0}
        width="48"
        x="56"
        y="209"
      />
      <rect
        fill={c.secondary}
        height="18"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 8 : 0}
        width="112"
        x="24"
        y="234"
      />
      <rect
        fill={c.secondary}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="64"
        x="48"
        y="240"
      />
    </svg>
  );
}

// MobileLogin variants
export function MobileLoginMinimal({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="80"
        x="40"
        y="80"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="64"
        x="48"
        y="98"
      />
      <rect
        fill={c.text}
        height="18"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="112"
        x="24"
        y="122"
      />
      <rect
        fill={c.text}
        height="6"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 2 : 0}
        width="16"
        x="32"
        y="128"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="54"
        y="130"
      />
      <rect
        fill={c.text}
        height="18"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="112"
        x="24"
        y="148"
      />
      <rect
        fill={c.text}
        height="6"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 2 : 0}
        width="16"
        x="32"
        y="154"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="50"
        x="54"
        y="156"
      />
      <rect
        fill={c.primary}
        height="22"
        rx={s.rx > 0 ? 11 : 0}
        width="112"
        x="24"
        y="178"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.8"
        rx={s.rx > 0 ? 2 : 0}
        width="48"
        x="56"
        y="185"
      />
    </svg>
  );
}

export function MobileLoginIllustration({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="80"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 16 : 0}
        width="96"
        x="32"
        y="30"
      />
      <circle
        cx="80"
        cy="60"
        fill={c.primary}
        opacity={s.decorOpacity}
        r="20"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="64"
        x="48"
        y="120"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="48"
        x="56"
        y="136"
      />
      <rect
        fill={c.text}
        height="18"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="112"
        x="24"
        y="160"
      />
      <rect
        fill={c.text}
        height="6"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 2 : 0}
        width="16"
        x="32"
        y="166"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="54"
        y="168"
      />
      <rect
        fill={c.text}
        height="18"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="112"
        x="24"
        y="186"
      />
      <rect
        fill={c.text}
        height="6"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 2 : 0}
        width="16"
        x="32"
        y="192"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="50"
        x="54"
        y="194"
      />
      <rect
        fill={c.primary}
        height="22"
        rx={s.rx > 0 ? 11 : 0}
        width="112"
        x="24"
        y="216"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.8"
        rx={s.rx > 0 ? 2 : 0}
        width="48"
        x="56"
        y="223"
      />
      <rect
        fill={c.secondary}
        height="16"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 8 : 0}
        width="112"
        x="24"
        y="248"
      />
      <rect
        fill={c.secondary}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="64"
        x="48"
        y="254"
      />
    </svg>
  );
}

export function MobileLoginOTP({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="48"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 14 : 0}
        width="48"
        x="56"
        y="50"
      />
      <circle
        cx="80"
        cy="74"
        fill={c.primary}
        opacity={s.decorOpacity}
        r="14"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="80"
        x="40"
        y="110"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="64"
        x="48"
        y="126"
      />
      <rect
        fill={c.text}
        height="24"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="20"
        x="28"
        y="152"
      />
      <rect
        fill={c.text}
        height="24"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="20"
        x="56"
        y="152"
      />
      <rect
        fill={c.text}
        height="24"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="20"
        x="84"
        y="152"
      />
      <rect
        fill={c.primary}
        height="24"
        rx={s.rx > 0 ? 6 : 0}
        width="20"
        x="112"
        y="152"
      />
      <rect
        fill={c.primary}
        height="22"
        rx={s.rx > 0 ? 11 : 0}
        width="112"
        x="24"
        y="190"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.8"
        rx={s.rx > 0 ? 2 : 0}
        width="48"
        x="56"
        y="197"
      />
      <rect
        fill={c.primary}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 2 : 0}
        width="80"
        x="40"
        y="222"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="64"
        x="48"
        y="236"
      />
    </svg>
  );
}

export function MobileChat({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.2"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="12"
        y="14"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="40"
        y="12"
      />
      <circle
        cx="136"
        cy="19"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="10"
      />
      <rect
        fill={c.primary}
        height="28"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 12 : 0}
        width="80"
        x="16"
        y="52"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.15"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="24"
        y="60"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="24"
        y="68"
      />
      <rect
        fill={c.text}
        height="28"
        opacity={s.baseOpacity * 0.625}
        rx={s.rx > 0 ? 12 : 0}
        width="80"
        x="64"
        y="90"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="72"
        y="98"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="48"
        x="72"
        y="106"
      />
      <rect
        fill={c.primary}
        height="28"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 12 : 0}
        width="80"
        x="16"
        y="128"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.15"
        rx={s.rx > 0 ? 1 : 0}
        width="56"
        x="24"
        y="136"
      />
      <rect
        fill={c.text}
        height="28"
        opacity={s.baseOpacity * 0.625}
        rx={s.rx > 0 ? 12 : 0}
        width="80"
        x="64"
        y="166"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="72"
        y="174"
      />
      <rect
        fill={c.secondary}
        height="28"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 12 : 0}
        width="80"
        x="16"
        y="210"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.15"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="24"
        y="218"
      />
      <rect
        fill={c.text}
        height="20"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 10 : 0}
        width="112"
        x="12"
        y="250"
      />
      <rect
        fill={c.primary}
        height="20"
        rx={s.rx > 0 ? 10 : 0}
        width="20"
        x="132"
        y="250"
      />
    </svg>
  );
}

// MobileChat variants
export function MobileChatFullWidth({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.2"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="12"
        y="14"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="40"
        y="12"
      />
      <circle
        cx="136"
        cy="19"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="10"
      />
      <rect
        fill={c.primary}
        height="28"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 10 : 0}
        width="144"
        x="8"
        y="52"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.15"
        rx={s.rx > 0 ? 1 : 0}
        width="100"
        x="16"
        y="60"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="16"
        y="68"
      />
      <rect
        fill={c.text}
        height="28"
        opacity={s.baseOpacity * 0.625}
        rx={s.rx > 0 ? 10 : 0}
        width="144"
        x="8"
        y="88"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="100"
        x="16"
        y="96"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="16"
        y="104"
      />
      <rect
        fill={c.primary}
        height="28"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 10 : 0}
        width="144"
        x="8"
        y="124"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.15"
        rx={s.rx > 0 ? 1 : 0}
        width="90"
        x="16"
        y="132"
      />
      <rect
        fill={c.text}
        height="28"
        opacity={s.baseOpacity * 0.625}
        rx={s.rx > 0 ? 10 : 0}
        width="144"
        x="8"
        y="160"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="100"
        x="16"
        y="168"
      />
      <rect
        fill={c.secondary}
        height="28"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 10 : 0}
        width="144"
        x="8"
        y="196"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.15"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="16"
        y="204"
      />
      <rect
        fill={c.text}
        height="20"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 10 : 0}
        width="120"
        x="8"
        y="240"
      />
      <rect
        fill={c.primary}
        height="20"
        rx={s.rx > 0 ? 10 : 0}
        width="20"
        x="132"
        y="240"
      />
    </svg>
  );
}

export function MobileChatTimeline({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.2"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="12"
        y="14"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="40"
        y="12"
      />
      <circle
        cx="136"
        cy="19"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="10"
      />
      <rect fill={c.text} height="200" opacity="0.06" width="4" x="76" y="52" />
      <circle cx="78" cy="64" fill={c.primary} opacity={s.decorOpacity} r="6" />
      <rect
        fill={c.primary}
        height="24"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 8 : 0}
        width="56"
        x="16"
        y="74"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.15"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="24"
        y="82"
      />
      <rect
        fill={c.text}
        height="24"
        opacity={s.baseOpacity * 0.625}
        rx={s.rx > 0 ? 8 : 0}
        width="56"
        x="88"
        y="104"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="96"
        y="112"
      />
      <circle
        cx="78"
        cy="148"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="6"
      />
      <rect
        fill={c.primary}
        height="24"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 8 : 0}
        width="56"
        x="16"
        y="158"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.15"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="24"
        y="166"
      />
      <rect
        fill={c.text}
        height="24"
        opacity={s.baseOpacity * 0.625}
        rx={s.rx > 0 ? 8 : 0}
        width="56"
        x="88"
        y="188"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="96"
        y="196"
      />
      <rect
        fill={c.text}
        height="20"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 10 : 0}
        width="120"
        x="8"
        y="240"
      />
      <rect
        fill={c.primary}
        height="20"
        rx={s.rx > 0 ? 10 : 0}
        width="20"
        x="132"
        y="240"
      />
    </svg>
  );
}

export function MobileChatMinimal({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.2"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="12"
        y="14"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="40"
        y="12"
      />
      <circle
        cx="136"
        cy="19"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="10"
      />
      <rect
        fill={c.primary}
        height="24"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 10 : 0}
        width="80"
        x="16"
        y="56"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.15"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="24"
        y="64"
      />
      <rect
        fill={c.text}
        height="24"
        opacity={s.baseOpacity * 0.625}
        rx={s.rx > 0 ? 10 : 0}
        width="80"
        x="64"
        y="92"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="72"
        y="100"
      />
      <rect
        fill={c.primary}
        height="24"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 10 : 0}
        width="80"
        x="16"
        y="128"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.15"
        rx={s.rx > 0 ? 1 : 0}
        width="56"
        x="24"
        y="136"
      />
      <rect
        fill={c.text}
        height="24"
        opacity={s.baseOpacity * 0.625}
        rx={s.rx > 0 ? 10 : 0}
        width="80"
        x="64"
        y="164"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="72"
        y="172"
      />
      <rect
        fill={c.text}
        height="20"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 10 : 0}
        width="120"
        x="8"
        y="240"
      />
      <rect
        fill={c.primary}
        height="20"
        rx={s.rx > 0 ? 10 : 0}
        width="20"
        x="132"
        y="240"
      />
    </svg>
  );
}

export function MobileMap({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="280"
        opacity={s.baseOpacity * 0.375}
        width="160"
        x="0"
        y="0"
      />
      <line
        opacity="0.06"
        stroke={c.text}
        strokeWidth={s.strokeW}
        x1="0"
        x2="160"
        y1="80"
        y2="80"
      />
      <line
        opacity="0.06"
        stroke={c.text}
        strokeWidth={s.strokeW}
        x1="0"
        x2="160"
        y1="160"
        y2="160"
      />
      <line
        opacity="0.06"
        stroke={c.text}
        strokeWidth={s.strokeW}
        x1="0"
        x2="160"
        y1="240"
        y2="240"
      />
      <line
        opacity="0.06"
        stroke={c.text}
        strokeWidth={s.strokeW}
        x1="50"
        x2="50"
        y1="0"
        y2="280"
      />
      <line
        opacity="0.06"
        stroke={c.text}
        strokeWidth={s.strokeW}
        x1="110"
        x2="110"
        y1="0"
        y2="280"
      />
      <line
        opacity={s.decorOpacity}
        stroke={c.primary}
        strokeWidth={s.strokeW * 1.33}
        x1="20"
        x2="140"
        y1="40"
        y2="120"
      />
      <line
        opacity={s.decorOpacity}
        stroke={c.primary}
        strokeWidth={s.strokeW * 1.33}
        x1="140"
        x2="60"
        y1="120"
        y2="200"
      />
      <circle
        cx="80"
        cy="130"
        fill={c.primary}
        opacity={s.baseOpacity * 1.5}
        r="18"
      />
      <circle cx="80" cy="130" fill={c.primary} opacity="0.25" r="10" />
      <circle cx="80" cy="130" fill={c.primary} opacity="0.5" r="4" />
      <rect
        fill={c.background}
        height="48"
        rx={s.rx > 0 ? 12 : 0}
        width="128"
        x="16"
        y="220"
      />
      <rect
        fill={c.text}
        height="48"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 12 : 0}
        width="128"
        x="16"
        y="220"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="50"
        x="28"
        y="230"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="28"
        y="242"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="28"
        y="252"
      />
      <rect
        fill={c.primary}
        height="20"
        rx={s.rx > 0 ? 10 : 0}
        width="24"
        x="112"
        y="236"
      />
    </svg>
  );
}

// MobileMap variants
export function MobileMapList({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.2"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="12"
        y="14"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="40"
        y="12"
      />
      <rect
        fill={c.primary}
        height="60"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 10 : 0}
        width="128"
        x="16"
        y="52"
      />
      <circle
        cx="80"
        cy="82"
        fill={c.primary}
        opacity={s.baseOpacity * 1.5}
        r="14"
      />
      <circle cx="80" cy="82" fill={c.primary} opacity="0.25" r="8" />
      <rect
        fill={c.text}
        height="36"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="128"
        x="16"
        y="120"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="28"
        y="128"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="28"
        y="138"
      />
      <rect
        fill={c.text}
        height="36"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="128"
        x="16"
        y="164"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="28"
        y="172"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="28"
        y="182"
      />
      <rect
        fill={c.text}
        height="36"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="128"
        x="16"
        y="208"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="28"
        y="216"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="28"
        y="226"
      />
      <rect
        fill={c.primary}
        height="20"
        rx={s.rx > 0 ? 10 : 0}
        width="24"
        x="112"
        y="216"
      />
    </svg>
  );
}

export function MobileMapSplit({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.2"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="12"
        y="14"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="40"
        y="12"
      />
      <rect
        fill={c.primary}
        height="110"
        opacity={s.baseOpacity * 0.375}
        width="160"
        x="0"
        y="44"
      />
      <line
        opacity={s.decorOpacity}
        stroke={c.primary}
        strokeWidth={s.strokeW * 1.33}
        x1="20"
        x2="140"
        y1="60"
        y2="130"
      />
      <circle
        cx="80"
        cy="95"
        fill={c.primary}
        opacity={s.baseOpacity * 1.5}
        r="14"
      />
      <circle cx="80" cy="95" fill={c.primary} opacity="0.25" r="8" />
      <circle cx="80" cy="95" fill={c.primary} opacity="0.5" r="4" />
      <rect
        fill={c.text}
        height="36"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="128"
        x="16"
        y="162"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="28"
        y="170"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="28"
        y="180"
      />
      <rect
        fill={c.primary}
        height="20"
        rx={s.rx > 0 ? 10 : 0}
        width="24"
        x="112"
        y="170"
      />
      <rect
        fill={c.text}
        height="36"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="128"
        x="16"
        y="206"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="28"
        y="214"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="28"
        y="224"
      />
      <rect
        fill={c.primary}
        height="20"
        rx={s.rx > 0 ? 10 : 0}
        width="128"
        x="16"
        y="250"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.8"
        rx={s.rx > 0 ? 2 : 0}
        width="64"
        x="48"
        y="256"
      />
    </svg>
  );
}

export function MobileMapCard({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="280"
        opacity={s.baseOpacity * 0.375}
        width="160"
        x="0"
        y="0"
      />
      <circle
        cx="80"
        cy="120"
        fill={c.primary}
        opacity={s.baseOpacity * 1.5}
        r="20"
      />
      <circle cx="80" cy="120" fill={c.primary} opacity="0.25" r="12" />
      <circle cx="80" cy="120" fill={c.primary} opacity="0.5" r="5" />
      <rect
        fill={c.background}
        height="88"
        rx={s.rx > 0 ? 12 : 0}
        width="128"
        x="16"
        y="180"
      />
      <rect
        fill={c.text}
        height="88"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 12 : 0}
        width="128"
        x="16"
        y="180"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="50"
        x="28"
        y="192"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="80"
        x="28"
        y="204"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="28"
        y="214"
      />
      <rect
        fill={c.primary}
        height="20"
        rx={s.rx > 0 ? 10 : 0}
        width="24"
        x="112"
        y="200"
      />
      <rect
        fill={c.primary}
        height="18"
        rx={s.rx > 0 ? 8 : 0}
        width="128"
        x="16"
        y="252"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.8"
        rx={s.rx > 0 ? 2 : 0}
        width="64"
        x="48"
        y="256"
      />
    </svg>
  );
}

export function MobileCheckout({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.2"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="12"
        y="14"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="40"
        y="12"
      />
      <rect
        fill={c.text}
        height="48"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 10 : 0}
        width="128"
        x="16"
        y="52"
      />
      <rect
        fill={c.primary}
        height="32"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 6 : 0}
        width="40"
        x="24"
        y="60"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="56"
        x="72"
        y="64"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.12"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="72"
        y="76"
      />
      <rect
        fill={c.primary}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="24"
        x="72"
        y="88"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="112"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="24"
        y="116"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="108"
        y="116"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="134"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="50"
        x="24"
        y="138"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="108"
        y="138"
      />
      <rect
        fill={c.text}
        height="1"
        opacity="0.06"
        width="128"
        x="16"
        y="156"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="16"
        y="164"
      />
      <rect
        fill={c.primary}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="56"
        x="88"
        y="164"
      />
      <rect
        fill={c.primary}
        height="22"
        rx={s.rx > 0 ? 10 : 0}
        width="128"
        x="16"
        y="186"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.8"
        rx={s.rx > 0 ? 2 : 0}
        width="64"
        x="48"
        y="193"
      />
      <rect
        fill={c.secondary}
        height="14"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="218"
      />
      <rect
        fill={c.secondary}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="40"
        y="222"
      />
    </svg>
  );
}

// MobileCheckout variants
export function MobileCheckoutMultiStep({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.2"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="12"
        y="14"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="40"
        y="12"
      />
      <rect
        fill={c.primary}
        height="8"
        rx={s.rx > 0 ? 4 : 0}
        width="36"
        x="16"
        y="52"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.15"
        rx={s.rx > 0 ? 4 : 0}
        width="36"
        x="60"
        y="52"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.15"
        rx={s.rx > 0 ? 4 : 0}
        width="36"
        x="104"
        y="52"
      />
      <rect
        fill={c.text}
        height="48"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 10 : 0}
        width="128"
        x="16"
        y="72"
      />
      <rect
        fill={c.primary}
        height="32"
        opacity={s.baseOpacity * 1.25}
        rx={s.rx > 0 ? 6 : 0}
        width="40"
        x="24"
        y="80"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="56"
        x="72"
        y="84"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.12"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="72"
        y="96"
      />
      <rect
        fill={c.primary}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="24"
        x="72"
        y="108"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="128"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="24"
        y="132"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="108"
        y="132"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="150"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="50"
        x="24"
        y="154"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="108"
        y="154"
      />
      <rect
        fill={c.text}
        height="1"
        opacity="0.06"
        width="128"
        x="16"
        y="174"
      />
      <rect
        fill={c.primary}
        height="22"
        rx={s.rx > 0 ? 10 : 0}
        width="128"
        x="16"
        y="184"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.8"
        rx={s.rx > 0 ? 2 : 0}
        width="64"
        x="48"
        y="191"
      />
      <rect
        fill={c.secondary}
        height="14"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="206"
      />
      <rect
        fill={c.secondary}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="40"
        y="210"
      />
    </svg>
  );
}

export function MobileCheckoutSummary({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.2"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="12"
        y="14"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="40"
        y="12"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="52"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="24"
        y="56"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="108"
        y="56"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="72"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="50"
        x="24"
        y="76"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="108"
        y="76"
      />
      <rect fill={c.text} height="1" opacity="0.06" width="128" x="16" y="94" />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="16"
        y="104"
      />
      <rect
        fill={c.primary}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="56"
        x="88"
        y="104"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="16"
        y="118"
      />
      <rect
        fill={c.primary}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="56"
        x="88"
        y="118"
      />
      <rect
        fill={c.text}
        height="1"
        opacity="0.06"
        width="128"
        x="16"
        y="132"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="16"
        y="142"
      />
      <rect
        fill={c.primary}
        height="6"
        opacity="0.5"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="104"
        y="142"
      />
      <rect
        fill={c.primary}
        height="22"
        rx={s.rx > 0 ? 10 : 0}
        width="128"
        x="16"
        y="164"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.8"
        rx={s.rx > 0 ? 2 : 0}
        width="64"
        x="48"
        y="171"
      />
      <rect
        fill={c.secondary}
        height="14"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="196"
      />
      <rect
        fill={c.secondary}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="80"
        x="40"
        y="200"
      />
    </svg>
  );
}

export function MobileCheckoutMinimal({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.2"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="12"
        y="14"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="40"
        y="12"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="60"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="24"
        y="64"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="108"
        y="64"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="82"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="50"
        x="24"
        y="86"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="28"
        x="108"
        y="86"
      />
      <rect
        fill={c.primary}
        height="22"
        rx={s.rx > 0 ? 10 : 0}
        width="128"
        x="16"
        y="108"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.8"
        rx={s.rx > 0 ? 2 : 0}
        width="64"
        x="48"
        y="115"
      />
    </svg>
  );
}

export function MobilePlayer({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="280"
        opacity={s.baseOpacity * 0.5}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.primary}
        height="80"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 16 : 0}
        width="80"
        x="40"
        y="40"
      />
      <circle
        cx="80"
        cy="80"
        fill={c.primary}
        opacity={s.decorOpacity}
        r="20"
      />
      <circle cx="80" cy="80" fill={c.primary} opacity="0.35" r="8" />
      <rect
        fill={c.text}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="72"
        x="44"
        y="136"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="64"
        x="48"
        y="150"
      />
      <rect
        fill={c.text}
        height="3"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 1.5 : 0}
        width="96"
        x="32"
        y="172"
      />
      <rect
        fill={c.primary}
        height="3"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="32"
        y="172"
      />
      <circle cx="72" cy="173.5" fill={c.primary} r="5" />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="20"
        x="36"
        y="182"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="20"
        x="104"
        y="182"
      />
      <rect
        fill={c.text}
        height="16"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="16"
        x="56"
        y="200"
      />
      <rect
        fill={c.primary}
        height="24"
        rx={s.rx > 0 ? 12 : 0}
        width="24"
        x="80"
        y="196"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.8"
        rx={s.rx > 0 ? 1 : 0}
        width="8"
        x="88"
        y="204"
      />
      <rect
        fill={c.text}
        height="16"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="16"
        x="108"
        y="200"
      />
      <rect
        fill={c.secondary}
        height="28"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 10 : 0}
        width="112"
        x="24"
        y="240"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="36"
        y="248"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="36"
        y="258"
      />
      <rect
        fill={c.primary}
        height="16"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 4 : 0}
        width="20"
        x="108"
        y="250"
      />
    </svg>
  );
}

// MobilePlayer variants
export function MobilePlayerMinimal({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="80"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 16 : 0}
        width="80"
        x="40"
        y="40"
      />
      <circle
        cx="80"
        cy="80"
        fill={c.primary}
        opacity={s.decorOpacity}
        r="16"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="72"
        x="44"
        y="136"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="64"
        x="48"
        y="150"
      />
      <rect
        fill={c.text}
        height="3"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 1.5 : 0}
        width="96"
        x="32"
        y="172"
      />
      <rect
        fill={c.primary}
        height="3"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="32"
        y="172"
      />
      <circle cx="72" cy="173.5" fill={c.primary} r="5" />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="20"
        x="36"
        y="182"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="20"
        x="104"
        y="182"
      />
      <rect
        fill={c.text}
        height="16"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="16"
        x="56"
        y="200"
      />
      <rect
        fill={c.primary}
        height="24"
        rx={s.rx > 0 ? 12 : 0}
        width="24"
        x="80"
        y="196"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.8"
        rx={s.rx > 0 ? 1 : 0}
        width="8"
        x="88"
        y="204"
      />
      <rect
        fill={c.text}
        height="16"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="16"
        x="108"
        y="200"
      />
    </svg>
  );
}

export function MobilePlayerList({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="80"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 16 : 0}
        width="80"
        x="40"
        y="30"
      />
      <circle
        cx="80"
        cy="60"
        fill={c.primary}
        opacity={s.decorOpacity}
        r="16"
      />
      <rect
        fill={c.text}
        height="8"
        opacity="0.6"
        rx={s.rx > 0 ? 2 : 0}
        width="72"
        x="44"
        y="122"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.15"
        rx={s.rx > 0 ? 1.5 : 0}
        width="64"
        x="48"
        y="136"
      />
      <rect
        fill={c.text}
        height="3"
        opacity={s.baseOpacity}
        rx={s.rx > 0 ? 1.5 : 0}
        width="96"
        x="32"
        y="155"
      />
      <rect
        fill={c.primary}
        height="3"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="32"
        y="155"
      />
      <circle cx="72" cy="156.5" fill={c.primary} r="4" />
      <rect
        fill={c.primary}
        height="14"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="172"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="24"
        y="176"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.375}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="192"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="24"
        y="196"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.375}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="212"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="24"
        y="216"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.375}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="232"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="24"
        y="236"
      />
      <rect
        fill={c.text}
        height="14"
        opacity={s.baseOpacity * 0.375}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="252"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="24"
        y="256"
      />
    </svg>
  );
}

export function MobilePlayerWaveform({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="280"
        opacity={s.baseOpacity * 0.5}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.primary}
        height="96"
        opacity={s.baseOpacity * 1.5}
        rx={s.rx > 0 ? 16 : 0}
        width="96"
        x="32"
        y="40"
      />
      <circle
        cx="80"
        cy="88"
        fill={c.primary}
        opacity={s.decorOpacity}
        r="20"
      />
      <circle cx="80" cy="88" fill={c.primary} opacity="0.35" r="8" />
      <rect
        fill={c.primary}
        height="20"
        opacity="0.3"
        rx="3"
        width="6"
        x="32"
        y="150"
      />
      <rect
        fill={c.primary}
        height="30"
        opacity="0.5"
        rx="3"
        width="6"
        x="42"
        y="145"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity="0.7"
        rx="3"
        width="6"
        x="52"
        y="140"
      />
      <rect
        fill={c.primary}
        height="36"
        opacity="0.5"
        rx="3"
        width="6"
        x="62"
        y="142"
      />
      <rect
        fill={c.primary}
        height="44"
        opacity="0.8"
        rx="3"
        width="6"
        x="72"
        y="138"
      />
      <rect
        fill={c.primary}
        height="32"
        opacity="0.4"
        rx="3"
        width="6"
        x="82"
        y="144"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity="0.6"
        rx="3"
        width="6"
        x="92"
        y="140"
      />
      <rect
        fill={c.primary}
        height="28"
        opacity="0.3"
        rx="3"
        width="6"
        x="102"
        y="146"
      />
      <rect
        fill={c.primary}
        height="36"
        opacity="0.5"
        rx="3"
        width="6"
        x="112"
        y="142"
      />
      <rect
        fill={c.primary}
        height="24"
        opacity="0.3"
        rx="3"
        width="6"
        x="122"
        y="148"
      />
      <rect
        fill={c.text}
        height="16"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="16"
        x="44"
        y="196"
      />
      <rect
        fill={c.primary}
        height="24"
        rx={s.rx > 0 ? 12 : 0}
        width="24"
        x="68"
        y="192"
      />
      <rect
        fill={c.background}
        height="8"
        opacity="0.8"
        rx={s.rx > 0 ? 1 : 0}
        width="8"
        x="76"
        y="200"
      />
      <rect
        fill={c.text}
        height="16"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 8 : 0}
        width="16"
        x="100"
        y="196"
      />
      <rect
        fill={c.secondary}
        height="28"
        opacity={s.baseOpacity * 0.75}
        rx={s.rx > 0 ? 10 : 0}
        width="112"
        x="24"
        y="232"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="40"
        x="36"
        y="240"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="36"
        y="250"
      />
    </svg>
  );
}

export function MobileNotifications({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.2"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="12"
        y="14"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="40"
        y="12"
      />
      <circle
        cx="136"
        cy="19"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="10"
      />
      <rect
        fill={c.primary}
        height="48"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 10 : 0}
        width="128"
        x="16"
        y="52"
      />
      <circle
        cx="36"
        cy="76"
        fill={c.primary}
        opacity={s.decorOpacity}
        r="10"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="72"
        x="52"
        y="64"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="56"
        x="52"
        y="76"
      />
      <rect
        fill={c.primary}
        height="4"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="52"
        y="86"
      />
      <rect
        fill={c.secondary}
        height="48"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 10 : 0}
        width="128"
        x="16"
        y="108"
      />
      <circle
        cx="36"
        cy="132"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="10"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="68"
        x="52"
        y="120"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="52"
        y="132"
      />
      <rect
        fill={c.secondary}
        height="4"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 1 : 0}
        width="44"
        x="52"
        y="142"
      />
      <rect
        fill={c.accent}
        height="48"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 10 : 0}
        width="128"
        x="16"
        y="164"
      />
      <circle
        cx="36"
        cy="188"
        fill={c.accent}
        opacity={s.decorOpacity}
        r="10"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="72"
        x="52"
        y="176"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="52"
        x="52"
        y="188"
      />
      <rect
        fill={c.accent}
        height="4"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 1 : 0}
        width="36"
        x="52"
        y="198"
      />
      <rect
        fill={c.text}
        height="48"
        opacity={s.baseOpacity * 0.375}
        rx={s.rx > 0 ? 10 : 0}
        width="128"
        x="16"
        y="220"
      />
      <circle
        cx="36"
        cy="244"
        fill={c.text}
        opacity={s.baseOpacity * 0.75}
        r="10"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="64"
        x="52"
        y="232"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="48"
        x="52"
        y="244"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="52"
        y="254"
      />
    </svg>
  );
}

// MobileNotifications variants
export function MobileNotificationsCompact({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.2"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="12"
        y="14"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="40"
        y="12"
      />
      <circle
        cx="136"
        cy="19"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="10"
      />
      <rect
        fill={c.primary}
        height="36"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="52"
      />
      <circle cx="32" cy="70" fill={c.primary} opacity={s.decorOpacity} r="8" />
      <rect
        fill={c.text}
        height="5"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="72"
        x="44"
        y="60"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="56"
        x="44"
        y="70"
      />
      <rect
        fill={c.secondary}
        height="36"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="94"
      />
      <circle
        cx="32"
        cy="112"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="8"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="68"
        x="44"
        y="102"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="44"
        y="112"
      />
      <rect
        fill={c.accent}
        height="36"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="136"
      />
      <circle cx="32" cy="154" fill={c.accent} opacity={s.decorOpacity} r="8" />
      <rect
        fill={c.text}
        height="5"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="72"
        x="44"
        y="144"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="52"
        x="44"
        y="154"
      />
      <rect
        fill={c.text}
        height="36"
        opacity={s.baseOpacity * 0.375}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="178"
      />
      <circle
        cx="32"
        cy="196"
        fill={c.text}
        opacity={s.baseOpacity * 0.75}
        r="8"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="64"
        x="44"
        y="186"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="48"
        x="44"
        y="196"
      />
      <rect
        fill={c.text}
        height="36"
        opacity={s.baseOpacity * 0.375}
        rx={s.rx > 0 ? 6 : 0}
        width="128"
        x="16"
        y="220"
      />
      <circle
        cx="32"
        cy="238"
        fill={c.text}
        opacity={s.baseOpacity * 0.75}
        r="8"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="72"
        x="44"
        y="228"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="56"
        x="44"
        y="238"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.08"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="44"
        y="248"
      />
    </svg>
  );
}

export function MobileNotificationsGrouped({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.2"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="12"
        y="14"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="40"
        y="12"
      />
      <circle
        cx="136"
        cy="19"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="10"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="16"
        y="52"
      />
      <rect
        fill={c.primary}
        height="36"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="128"
        x="16"
        y="66"
      />
      <circle cx="36" cy="84" fill={c.primary} opacity={s.decorOpacity} r="8" />
      <rect
        fill={c.text}
        height="5"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="72"
        x="52"
        y="74"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="56"
        x="52"
        y="84"
      />
      <rect
        fill={c.primary}
        height="4"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="52"
        y="94"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="16"
        y="110"
      />
      <rect
        fill={c.secondary}
        height="36"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="128"
        x="16"
        y="124"
      />
      <circle
        cx="36"
        cy="142"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="8"
      />
      <rect
        fill={c.text}
        height="5"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="68"
        x="52"
        y="132"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="52"
        y="142"
      />
      <rect
        fill={c.secondary}
        height="4"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 1 : 0}
        width="44"
        x="52"
        y="152"
      />
      <rect
        fill={c.text}
        height="6"
        opacity="0.3"
        rx={s.rx > 0 ? 1.5 : 0}
        width="60"
        x="16"
        y="168"
      />
      <rect
        fill={c.accent}
        height="36"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 8 : 0}
        width="128"
        x="16"
        y="182"
      />
      <circle cx="36" cy="200" fill={c.accent} opacity={s.decorOpacity} r="8" />
      <rect
        fill={c.text}
        height="5"
        opacity="0.4"
        rx={s.rx > 0 ? 1.5 : 0}
        width="72"
        x="52"
        y="190"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="52"
        x="52"
        y="200"
      />
      <rect
        fill={c.accent}
        height="4"
        opacity={s.decorOpacity}
        rx={s.rx > 0 ? 1 : 0}
        width="36"
        x="52"
        y="210"
      />
    </svg>
  );
}

export function MobileNotificationsTimeline({
  c,
  s,
}: {
  c: DesignColors;
  s: DesignStyle;
}) {
  return (
    <svg className="w-full h-full" viewBox="0 0 160 280">
      <rect
        fill={c.background}
        height="280"
        rx={s.rx > 0 ? 16 : 0}
        width="160"
      />
      <rect
        fill={c.primary}
        height="40"
        opacity={s.baseOpacity * 0.75}
        width="160"
        x="0"
        y="0"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.2"
        rx={s.rx > 0 ? 2 : 0}
        width="20"
        x="12"
        y="14"
      />
      <rect
        fill={c.text}
        height="10"
        opacity="0.5"
        rx={s.rx > 0 ? 2 : 0}
        width="60"
        x="40"
        y="12"
      />
      <circle
        cx="136"
        cy="19"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="10"
      />
      <rect fill={c.text} height="210" opacity="0.06" width="4" x="32" y="52" />
      <circle cx="34" cy="66" fill={c.primary} opacity={s.decorOpacity} r="8" />
      <rect
        fill={c.primary}
        height="20"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="80"
        x="48"
        y="58"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.4"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="56"
        y="64"
      />
      <rect
        fill={c.text}
        height="3"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="56"
        y="72"
      />
      <circle
        cx="34"
        cy="106"
        fill={c.secondary}
        opacity={s.decorOpacity}
        r="8"
      />
      <rect
        fill={c.secondary}
        height="20"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="80"
        x="48"
        y="98"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.4"
        rx={s.rx > 0 ? 1 : 0}
        width="60"
        x="56"
        y="104"
      />
      <rect
        fill={c.text}
        height="3"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="48"
        x="56"
        y="112"
      />
      <circle cx="34" cy="146" fill={c.accent} opacity={s.decorOpacity} r="8" />
      <rect
        fill={c.accent}
        height="20"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="80"
        x="48"
        y="138"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.4"
        rx={s.rx > 0 ? 1 : 0}
        width="72"
        x="56"
        y="144"
      />
      <rect
        fill={c.text}
        height="3"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="52"
        x="56"
        y="152"
      />
      <circle
        cx="34"
        cy="186"
        fill={c.text}
        opacity={s.baseOpacity * 0.75}
        r="8"
      />
      <rect
        fill={c.text}
        height="20"
        opacity={s.baseOpacity * 0.375}
        rx={s.rx > 0 ? 6 : 0}
        width="80"
        x="48"
        y="178"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.3"
        rx={s.rx > 0 ? 1 : 0}
        width="64"
        x="56"
        y="184"
      />
      <rect
        fill={c.text}
        height="3"
        opacity="0.1"
        rx={s.rx > 0 ? 1 : 0}
        width="48"
        x="56"
        y="192"
      />
      <circle
        cx="34"
        cy="226"
        fill={c.primary}
        opacity={s.decorOpacity}
        r="8"
      />
      <rect
        fill={c.primary}
        height="20"
        opacity={s.baseOpacity * 0.5}
        rx={s.rx > 0 ? 6 : 0}
        width="80"
        x="48"
        y="218"
      />
      <rect
        fill={c.text}
        height="4"
        opacity="0.4"
        rx={s.rx > 0 ? 1 : 0}
        width="56"
        x="56"
        y="224"
      />
      <rect
        fill={c.text}
        height="3"
        opacity="0.12"
        rx={s.rx > 0 ? 1 : 0}
        width="40"
        x="56"
        y="232"
      />
    </svg>
  );
}
