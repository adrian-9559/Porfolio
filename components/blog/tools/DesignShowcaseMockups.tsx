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
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="0" y="0" width="280" height="32" fill={c.primary} opacity={s.baseOpacity} />
      <rect x="16" y="10" width="60" height="12" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <rect x="190" y="12" width="24" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.15" />
      <rect x="220" y="12" width="24" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.15" />
      <rect x="250" y="12" width="24" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.15" />
      <rect x="56" y="64" width="168" height="14" rx={s.rx > 0 ? 3 : 0} fill={c.text} opacity="0.8" />
      <rect x="80" y="86" width="120" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.2" />
      <rect x="96" y="100" width="88" height="6" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.12" />
      <rect x="108" y="120" width="64" height="20" rx={s.rx > 0 ? 10 : 0} fill={c.primary} />
      <rect x="118" y="126" width="44" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.background} opacity="0.9" />
      <circle cx="40" cy="158" r="14" fill={c.secondary} opacity={s.decorOpacity} />
      <circle cx="80" cy="158" r="14" fill={c.accent} opacity={s.decorOpacity} />
      <circle cx="120" cy="158" r="14" fill={c.primary} opacity={s.decorOpacity} />
    </svg>
  );
}

// WebHero variants
export function WebHeroSplit({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="0" y="0" width="280" height="32" fill={c.primary} opacity={s.baseOpacity} />
      <rect x="16" y="10" width="60" height="12" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <rect x="190" y="12" width="24" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.15" />
      <rect x="220" y="12" width="24" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.15" />
      <rect x="250" y="12" width="24" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.15" />
      <rect x="16" y="56" width="120" height="14" rx={s.rx > 0 ? 3 : 0} fill={c.text} opacity="0.8" />
      <rect x="16" y="78" width="100" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.2" />
      <rect x="16" y="94" width="80" height="6" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.12" />
      <rect x="16" y="114" width="64" height="20" rx={s.rx > 0 ? 10 : 0} fill={c.primary} />
      <rect x="26" y="120" width="44" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.background} opacity="0.9" />
      <rect x="160" y="44" width="104" height="100" rx={s.rx > 0 ? 12 : 0} fill={c.primary} opacity={s.baseOpacity * 1.5} />
      <circle cx="212" cy="84" r="20" fill={c.primary} opacity={s.decorOpacity} />
      <rect x="176" y="116" width="72" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="184" y="128" width="56" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
    </svg>
  );
}

export function WebHeroFull({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.primary} opacity={s.baseOpacity} rx={s.rx} />
      <rect x="0" y="0" width="280" height="32" fill={c.primary} opacity={s.baseOpacity * 0.5} />
      <rect x="16" y="10" width="60" height="12" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <rect x="60" y="60" width="160" height="16" rx={s.rx > 0 ? 3 : 0} fill={c.text} opacity="0.8" />
      <rect x="88" y="84" width="104" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.25" />
      <rect x="104" y="102" width="72" height="6" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.15" />
      <rect x="108" y="124" width="64" height="22" rx={s.rx > 0 ? 11 : 0} fill={c.primary} />
      <rect x="118" y="131" width="44" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.background} opacity="0.9" />
      <rect x="32" y="152" width="36" height="20" rx={s.rx > 0 ? 10 : 0} fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="80" y="152" width="36" height="20" rx={s.rx > 0 ? 10 : 0} fill={c.accent} opacity={s.decorOpacity} />
    </svg>
  );
}

export function WebHeroMinimal({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="0" y="0" width="280" height="32" fill={c.primary} opacity={s.baseOpacity} />
      <rect x="16" y="10" width="60" height="12" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <rect x="190" y="12" width="24" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.15" />
      <rect x="220" y="12" width="24" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.15" />
      <rect x="56" y="68" width="168" height="14" rx={s.rx > 0 ? 3 : 0} fill={c.text} opacity="0.8" />
      <rect x="80" y="90" width="120" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.2" />
      <rect x="96" y="106" width="88" height="6" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.12" />
      <rect x="108" y="128" width="64" height="20" rx={s.rx > 0 ? 10 : 0} fill={c.primary} />
      <rect x="118" y="134" width="44" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.background} opacity="0.9" />
    </svg>
  );
}

export function WebDashboard({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="0" y="0" width="60" height="180" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="10" y="12" width="40" height="6" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.5" />
      <rect x="10" y="30" width="36" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.12" />
      <rect x="10" y="44" width="36" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.12" />
      <rect x="10" y="58" width="36" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.primary} opacity="0.2" />
      <rect x="10" y="72" width="36" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.12" />
      <rect x="72" y="12" width="196" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.6" />
      <rect x="72" y="32" width="60" height="40" rx={s.rx > 0 ? 6 : 0} fill={c.primary} opacity={s.baseOpacity * 1.5} />
      <rect x="140" y="32" width="60" height="40" rx={s.rx > 0 ? 6 : 0} fill={c.secondary} opacity={s.baseOpacity * 1.5} />
      <rect x="208" y="32" width="60" height="40" rx={s.rx > 0 ? 6 : 0} fill={c.accent} opacity={s.baseOpacity * 1.5} />
      <rect x="80" y="40" width="20" height="6" rx={s.rx > 0 ? 1 : 0} fill={c.primary} opacity="0.5" />
      <rect x="148" y="40" width="20" height="6" rx={s.rx > 0 ? 1 : 0} fill={c.secondary} opacity="0.5" />
      <rect x="216" y="40" width="20" height="6" rx={s.rx > 0 ? 1 : 0} fill={c.accent} opacity="0.5" />
      <rect x="80" y="52" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.15" />
      <rect x="148" y="52" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.15" />
      <rect x="216" y="52" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.15" />
      <rect x="72" y="84" width="196" height="84" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="82" y="94" width="80" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.2" />
      <rect x="82" y="108" width="176" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.primary} opacity="0.1" />
      <rect x="82" y="118" width="176" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
      <rect x="82" y="128" width="176" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
      <rect x="82" y="138" width="140" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
      <rect x="82" y="152" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.primary} opacity="0.3" />
    </svg>
  );
}

// WebDashboard variants
export function WebDashboardSidebarRight({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="0" y="0" width="220" height="32" fill={c.primary} opacity={s.baseOpacity * 0.5} />
      <rect x="16" y="10" width="48" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <rect x="72" y="12" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="108" y="12" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="12" y="44" width="100" height="44" rx={s.rx > 0 ? 6 : 0} fill={c.primary} opacity={s.baseOpacity * 1.5} />
      <rect x="124" y="44" width="84" height="44" rx={s.rx > 0 ? 6 : 0} fill={c.secondary} opacity={s.baseOpacity * 1.5} />
      <rect x="20" y="54" width="36" height="6" rx={s.rx > 0 ? 1 : 0} fill={c.primary} opacity="0.5" />
      <rect x="132" y="54" width="36" height="6" rx={s.rx > 0 ? 1 : 0} fill={c.secondary} opacity="0.5" />
      <rect x="20" y="66" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="132" y="66" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="12" y="96" width="196" height="72" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="22" y="106" width="60" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.2" />
      <rect x="22" y="118" width="176" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
      <rect x="22" y="128" width="176" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
      <rect x="222" y="12" width="48" height="156" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="230" y="28" width="32" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.12" />
      <rect x="230" y="42" width="32" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.primary} opacity="0.2" />
      <rect x="230" y="56" width="32" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.12" />
      <rect x="230" y="70" width="32" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.12" />
    </svg>
  );
}

export function WebDashboardNoSidebar({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="0" y="0" width="280" height="32" fill={c.primary} opacity={s.baseOpacity} />
      <rect x="16" y="10" width="48" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <rect x="72" y="12" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.2" />
      <rect x="108" y="12" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.2" />
      <rect x="16" y="44" width="80" height="44" rx={s.rx > 0 ? 6 : 0} fill={c.primary} opacity={s.baseOpacity * 1.5} />
      <rect x="104" y="44" width="80" height="44" rx={s.rx > 0 ? 6 : 0} fill={c.secondary} opacity={s.baseOpacity * 1.5} />
      <rect x="192" y="44" width="72" height="44" rx={s.rx > 0 ? 6 : 0} fill={c.accent} opacity={s.baseOpacity * 1.5} />
      <rect x="24" y="54" width="20" height="6" rx={s.rx > 0 ? 1 : 0} fill={c.primary} opacity="0.5" />
      <rect x="112" y="54" width="20" height="6" rx={s.rx > 0 ? 1 : 0} fill={c.secondary} opacity="0.5" />
      <rect x="200" y="54" width="20" height="6" rx={s.rx > 0 ? 1 : 0} fill={c.accent} opacity="0.5" />
      <rect x="24" y="66" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="112" y="66" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="200" y="66" width="48" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="16" y="96" width="248" height="72" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="26" y="106" width="60" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.2" />
      <rect x="26" y="118" width="228" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
      <rect x="26" y="128" width="228" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
    </svg>
  );
}

export function WebDashboardCompact({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="0" y="0" width="36" height="180" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="10" y="10" width="16" height="6" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.5" />
      <rect x="10" y="26" width="16" height="5" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="10" y="38" width="16" height="5" rx={s.rx > 0 ? 1 : 0} fill={c.primary} opacity="0.2" />
      <rect x="10" y="50" width="16" height="5" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="10" y="62" width="16" height="5" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="48" y="10" width="120" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.6" />
      <rect x="48" y="32" width="56" height="40" rx={s.rx > 0 ? 6 : 0} fill={c.primary} opacity={s.baseOpacity * 1.5} />
      <rect x="112" y="32" width="56" height="40" rx={s.rx > 0 ? 6 : 0} fill={c.secondary} opacity={s.baseOpacity * 1.5} />
      <rect x="176" y="32" width="88" height="40" rx={s.rx > 0 ? 6 : 0} fill={c.accent} opacity={s.baseOpacity * 1.5} />
      <rect x="56" y="42" width="16" height="6" rx={s.rx > 0 ? 1 : 0} fill={c.primary} opacity="0.5" />
      <rect x="120" y="42" width="16" height="6" rx={s.rx > 0 ? 1 : 0} fill={c.secondary} opacity="0.5" />
      <rect x="184" y="42" width="16" height="6" rx={s.rx > 0 ? 1 : 0} fill={c.accent} opacity="0.5" />
      <rect x="48" y="84" width="216" height="84" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="56" y="94" width="60" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.2" />
      <rect x="56" y="108" width="196" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
      <rect x="56" y="118" width="196" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
    </svg>
  );
}

export function WebPricing({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="90" y="10" width="100" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.7" />
      <rect x="24" y="36" width="76" height="130" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="102" y="28" width="76" height="138" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.baseOpacity} />
      <rect x="102" y="28" width="76" height="20" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.decorOpacity} />
      <rect x="180" y="36" width="76" height="130" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="36" y="50" width="52" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <rect x="114" y="42" width="52" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.7" />
      <rect x="192" y="50" width="52" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <rect x="40" y="70" width="28" height="14" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.7" />
      <rect x="118" y="62" width="28" height="14" rx={s.rx > 0 ? 2 : 0} fill={c.primary} />
      <rect x="196" y="70" width="28" height="14" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.7" />
      <rect x="36" y="94" width="52" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="36" y="104" width="52" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="36" y="114" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="114" y="86" width="52" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="114" y="96" width="52" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="114" y="106" width="52" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="114" y="116" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="192" y="94" width="52" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="192" y="104" width="52" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="192" y="114" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="36" y="140" width="52" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity} />
      <rect x="114" y="132" width="52" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.primary} />
      <rect x="192" y="140" width="52" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity} />
    </svg>
  );
}

// WebPricing variants
export function WebPricing2Col({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="80" y="10" width="120" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.7" />
      <rect x="24" y="36" width="112" height="130" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="144" y="28" width="112" height="138" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.baseOpacity} />
      <rect x="144" y="28" width="112" height="20" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.decorOpacity} />
      <rect x="40" y="50" width="80" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <rect x="160" y="42" width="80" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.7" />
      <rect x="48" y="70" width="40" height="14" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.7" />
      <rect x="168" y="62" width="40" height="14" rx={s.rx > 0 ? 2 : 0} fill={c.primary} />
      <rect x="40" y="94" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="40" y="104" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="40" y="114" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="160" y="86" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="160" y="96" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="160" y="106" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="40" y="140" width="80" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="160" y="132" width="80" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.primary} />
    </svg>
  );
}

export function WebPricingHorizontal({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="90" y="8" width="100" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.7" />
      <rect x="16" y="30" width="248" height="38" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="16" y="76" width="248" height="38" rx={s.rx > 0 ? 6 : 0} fill={c.primary} opacity={s.baseOpacity} />
      <rect x="16" y="122" width="248" height="38" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="28" y="42" width="40" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <rect x="28" y="88" width="40" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.7" />
      <rect x="28" y="134" width="40" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <rect x="200" y="40" width="48" height="14" rx={s.rx > 0 ? 4 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="200" y="86" width="48" height="14" rx={s.rx > 0 ? 4 : 0} fill={c.primary} />
      <rect x="200" y="132" width="48" height="14" rx={s.rx > 0 ? 4 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="80" y="44" width="100" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="80" y="52" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
      <rect x="80" y="90" width="100" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="80" y="98" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
      <rect x="80" y="136" width="100" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="80" y="144" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
    </svg>
  );
}

export function WebPricingFeatured({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="90" y="6" width="100" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.7" />
      <rect x="16" y="40" width="76" height="120" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="102" y="24" width="76" height="144" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.baseOpacity * 1.5} />
      <rect x="102" y="24" width="76" height="20" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.decorOpacity} />
      <rect x="188" y="40" width="76" height="120" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="28" y="54" width="52" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <rect x="114" y="38" width="52" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.8" />
      <rect x="200" y="54" width="52" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <rect x="32" y="74" width="28" height="14" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.7" />
      <rect x="118" y="58" width="28" height="14" rx={s.rx > 0 ? 2 : 0} fill={c.primary} />
      <rect x="204" y="74" width="28" height="14" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.7" />
      <rect x="28" y="100" width="52" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="28" y="110" width="52" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="114" y="84" width="52" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="114" y="94" width="52" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="200" y="100" width="52" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="200" y="110" width="52" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="32" y="134" width="52" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="118" y="130" width="52" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.primary} />
      <rect x="204" y="134" width="52" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
    </svg>
  );
}

export function WebBlog({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="16" y="14" width="60" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <rect x="16" y="36" width="80" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.6" />
      <rect x="16" y="52" width="80" height="112" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <rect x="24" y="60" width="64" height="36" rx={s.rx > 0 ? 4 : 0} fill={c.primary} opacity={s.decorOpacity} />
      <rect x="24" y="104" width="56" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.5" />
      <rect x="24" y="116" width="64" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="24" y="126" width="64" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="24" y="140" width="32" height="16" rx={s.rx > 0 ? 4 : 0} fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="108" y="36" width="80" height="112" rx={s.rx > 0 ? 8 : 0} fill={c.secondary} opacity={s.baseOpacity * 0.75} />
      <rect x="116" y="44" width="64" height="36" rx={s.rx > 0 ? 4 : 0} fill={c.secondary} opacity={s.baseOpacity * 1.5} />
      <rect x="116" y="88" width="56" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.5" />
      <rect x="116" y="100" width="64" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="116" y="110" width="64" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="116" y="124" width="32" height="16" rx={s.rx > 0 ? 4 : 0} fill={c.accent} opacity={s.decorOpacity} />
      <rect x="200" y="36" width="64" height="112" rx={s.rx > 0 ? 8 : 0} fill={c.accent} opacity={s.baseOpacity * 0.75} />
      <rect x="208" y="44" width="48" height="36" rx={s.rx > 0 ? 4 : 0} fill={c.accent} opacity={s.baseOpacity * 1.5} />
      <rect x="208" y="88" width="40" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.5" />
      <rect x="208" y="100" width="48" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="208" y="110" width="48" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="208" y="124" width="32" height="16" rx={s.rx > 0 ? 4 : 0} fill={c.primary} opacity={s.decorOpacity} />
    </svg>
  );
}

// WebBlog variants
export function WebBlogList({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="16" y="14" width="60" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <rect x="16" y="36" width="80" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.6" />
      <rect x="16" y="56" width="248" height="30" rx={s.rx > 0 ? 6 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <rect x="24" y="62" width="48" height="18" rx={s.rx > 0 ? 4 : 0} fill={c.primary} opacity={s.decorOpacity} />
      <rect x="80" y="62" width="80" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.5" />
      <rect x="80" y="72" width="120" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="16" y="94" width="248" height="30" rx={s.rx > 0 ? 6 : 0} fill={c.secondary} opacity={s.baseOpacity * 0.75} />
      <rect x="24" y="100" width="48" height="18" rx={s.rx > 0 ? 4 : 0} fill={c.secondary} opacity={s.baseOpacity * 1.5} />
      <rect x="80" y="100" width="80" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.5" />
      <rect x="80" y="110" width="120" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="16" y="132" width="248" height="30" rx={s.rx > 0 ? 6 : 0} fill={c.accent} opacity={s.baseOpacity * 0.75} />
      <rect x="24" y="138" width="48" height="18" rx={s.rx > 0 ? 4 : 0} fill={c.accent} opacity={s.baseOpacity * 1.5} />
      <rect x="80" y="138" width="80" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.5" />
      <rect x="80" y="148" width="120" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
    </svg>
  );
}

export function WebBlogMasonry({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="16" y="14" width="60" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <rect x="16" y="36" width="80" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.6" />
      <rect x="16" y="54" width="120" height="58" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <rect x="24" y="62" width="104" height="28" rx={s.rx > 0 ? 4 : 0} fill={c.primary} opacity={s.decorOpacity} />
      <rect x="24" y="96" width="80" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.5" />
      <rect x="24" y="106" width="100" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="144" y="54" width="120" height="42" rx={s.rx > 0 ? 8 : 0} fill={c.secondary} opacity={s.baseOpacity * 0.75} />
      <rect x="152" y="62" width="60" height="22" rx={s.rx > 0 ? 4 : 0} fill={c.secondary} opacity={s.baseOpacity * 1.5} />
      <rect x="152" y="88" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="144" y="104" width="120" height="30" rx={s.rx > 0 ? 8 : 0} fill={c.accent} opacity={s.baseOpacity * 0.75} />
      <rect x="152" y="110" width="60" height="18" rx={s.rx > 0 ? 4 : 0} fill={c.accent} opacity={s.baseOpacity * 1.5} />
      <rect x="16" y="120" width="120" height="42" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="128" width="60" height="22" rx={s.rx > 0 ? 4 : 0} fill={c.text} opacity={s.baseOpacity} />
      <rect x="24" y="154" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="16" y="168" width="248" height="1" fill={c.text} opacity="0.06" />
    </svg>
  );
}

export function WebBlogFeatured({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="16" y="14" width="60" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <rect x="16" y="36" width="80" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.6" />
      <rect x="16" y="54" width="248" height="68" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <rect x="24" y="62" width="120" height="36" rx={s.rx > 0 ? 4 : 0} fill={c.primary} opacity={s.decorOpacity} />
      <rect x="24" y="104" width="100" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.5" />
      <rect x="160" y="62" width="96" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="160" y="74" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="160" y="84" width="90" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="160" y="94" width="70" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="16" y="130" width="76" height="42" rx={s.rx > 0 ? 6 : 0} fill={c.secondary} opacity={s.baseOpacity * 0.75} />
      <rect x="24" y="136" width="60" height="18" rx={s.rx > 0 ? 4 : 0} fill={c.secondary} opacity={s.baseOpacity * 1.5} />
      <rect x="24" y="158" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="100" y="130" width="76" height="42" rx={s.rx > 0 ? 6 : 0} fill={c.accent} opacity={s.baseOpacity * 0.75} />
      <rect x="108" y="136" width="60" height="18" rx={s.rx > 0 ? 4 : 0} fill={c.accent} opacity={s.baseOpacity * 1.5} />
      <rect x="108" y="158" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="184" y="130" width="80" height="42" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="192" y="136" width="60" height="18" rx={s.rx > 0 ? 4 : 0} fill={c.text} opacity={s.baseOpacity} />
      <rect x="192" y="158" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
    </svg>
  );
}

export function WebContact({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="16" y="16" width="100" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.7" />
      <rect x="16" y="36" width="120" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="16" y="58" width="108" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="132" y="58" width="108" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="16" y="80" width="224" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="16" y="102" width="224" height="32" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="110" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
      <rect x="24" y="120" width="160" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
      <rect x="16" y="146" width="80" height="18" rx={s.rx > 0 ? 9 : 0} fill={c.primary} />
      <rect x="104" y="146" width="60" height="18" rx={s.rx > 0 ? 9 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <circle cx="248" cy="155" r="12" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="240" y="151" width="16" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.secondary} opacity="0.3" />
    </svg>
  );
}

// WebContact variants
export function WebContactSplit({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="16" y="16" width="100" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.7" />
      <rect x="16" y="36" width="100" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="16" y="58" width="100" height="36" rx={s.rx > 0 ? 6 : 0} fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="24" y="66" width="60" height="5" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.15" />
      <rect x="24" y="78" width="40" height="5" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="16" y="104" width="100" height="28" rx={s.rx > 0 ? 6 : 0} fill={c.primary} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="112" width="50" height="5" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.15" />
      <rect x="24" y="122" width="70" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="140" y="16" width="124" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <rect x="140" y="36" width="124" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="140" y="58" width="124" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="140" y="80" width="124" height="32" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="148" y="88" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
      <rect x="148" y="98" width="100" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
      <rect x="140" y="122" width="56" height="18" rx={s.rx > 0 ? 9 : 0} fill={c.primary} />
      <rect x="208" y="122" width="48" height="18" rx={s.rx > 0 ? 9 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <circle cx="260" cy="160" r="10" fill={c.secondary} opacity={s.decorOpacity} />
    </svg>
  );
}

export function WebContact2Col({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="16" y="16" width="100" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.7" />
      <rect x="16" y="36" width="120" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="16" y="56" width="108" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="132" y="56" width="132" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="16" y="78" width="108" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="132" y="78" width="132" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="16" y="100" width="248" height="32" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="108" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
      <rect x="24" y="118" width="160" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
      <rect x="16" y="144" width="80" height="18" rx={s.rx > 0 ? 9 : 0} fill={c.primary} />
      <rect x="104" y="144" width="60" height="18" rx={s.rx > 0 ? 9 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <circle cx="248" cy="153" r="10" fill={c.secondary} opacity={s.decorOpacity} />
    </svg>
  );
}

export function WebContactMinimal({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="16" y="16" width="100" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.7" />
      <rect x="16" y="36" width="120" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="16" y="60" width="248" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="16" y="82" width="248" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="16" y="104" width="248" height="28" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="112" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
      <rect x="16" y="142" width="80" height="18" rx={s.rx > 0 ? 9 : 0} fill={c.primary} />
    </svg>
  );
}

export function WebProduct({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="16" y="16" width="248" height="80" rx={s.rx > 0 ? 10 : 0} fill={c.primary} opacity={s.baseOpacity} />
      <rect x="100" y="40" width="80" height="40" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.decorOpacity} />
      <circle cx="140" cy="60" r="12" fill={c.primary} opacity="0.3" />
      <rect x="16" y="106" width="120" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.6" />
      <rect x="16" y="122" width="80" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="16" y="134" width="60" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.1" />
      <rect x="16" y="152" width="60" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.primary} />
      <rect x="84" y="152" width="40" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.secondary} opacity={s.decorOpacity} />
      <circle cx="240" cy="160" r="10" fill={c.accent} opacity={s.decorOpacity} />
      <rect x="200" y="106" width="64" height="60" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="208" y="118" width="48" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.12" />
      <rect x="208" y="130" width="32" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.08" />
    </svg>
  );
}

// WebProduct variants
export function WebProductGallery({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="16" y="16" width="120" height="60" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <rect x="144" y="16" width="120" height="60" rx={s.rx > 0 ? 8 : 0} fill={c.secondary} opacity={s.baseOpacity * 0.75} />
      <rect x="16" y="84" width="120" height="60" rx={s.rx > 0 ? 8 : 0} fill={c.accent} opacity={s.baseOpacity * 0.75} />
      <rect x="144" y="84" width="120" height="60" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <circle cx="76" cy="46" r="10" fill={c.primary} opacity={s.decorOpacity} />
      <circle cx="204" cy="46" r="10" fill={c.secondary} opacity={s.decorOpacity} />
      <circle cx="76" cy="114" r="10" fill={c.accent} opacity={s.decorOpacity} />
      <rect x="16" y="152" width="120" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.6" />
      <rect x="144" y="152" width="80" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.15" />
      <rect x="144" y="164" width="56" height="6" rx={s.rx > 0 ? 2 : 0} fill={c.primary} />
    </svg>
  );
}

export function WebProductSplit({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="16" y="16" width="120" height="148" rx={s.rx > 0 ? 10 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <circle cx="76" cy="70" r="20" fill={c.primary} opacity={s.decorOpacity} />
      <rect x="152" y="16" width="112" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.7" />
      <rect x="152" y="36" width="80" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="152" y="50" width="60" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.1" />
      <rect x="152" y="68" width="52" height="14" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.7" />
      <rect x="152" y="90" width="112" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="152" y="100" width="112" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
      <rect x="152" y="110" width="112" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
      <rect x="152" y="130" width="56" height="18" rx={s.rx > 0 ? 8 : 0} fill={c.primary} />
      <rect x="216" y="130" width="40" height="18" rx={s.rx > 0 ? 8 : 0} fill={c.secondary} opacity={s.decorOpacity} />
      <circle cx="240" cy="165" r="8" fill={c.accent} opacity={s.decorOpacity} />
    </svg>
  );
}

export function WebProductFullScroll({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="0" y="0" width="280" height="70" fill={c.primary} opacity={s.baseOpacity} />
      <rect x="80" y="20" width="120" height="30" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.decorOpacity} />
      <circle cx="140" cy="35" r="10" fill={c.primary} opacity="0.3" />
      <rect x="16" y="82" width="100" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.6" />
      <rect x="16" y="96" width="80" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="16" y="110" width="248" height="28" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="118" width="40" height="6" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.15" />
      <rect x="72" y="118" width="40" height="6" rx={s.rx > 0 ? 1 : 0} fill={c.primary} opacity="0.2" />
      <rect x="120" y="118" width="40" height="6" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="16" y="148" width="80" height="18" rx={s.rx > 0 ? 8 : 0} fill={c.primary} />
      <rect x="104" y="148" width="60" height="18" rx={s.rx > 0 ? 8 : 0} fill={c.secondary} opacity={s.decorOpacity} />
    </svg>
  );
}

export function WebNavbar({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="0" y="0" width="280" height="32" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="16" y="10" width="48" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <rect x="80" y="12" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.2" />
      <rect x="116" y="12" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.2" />
      <rect x="152" y="12" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.primary} opacity="0.3" />
      <rect x="228" y="8" width="36" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.primary} />
      <rect x="0" y="44" width="280" height="28" fill={c.text} opacity={s.baseOpacity * 0.375} />
      <rect x="16" y="52" width="40" height="12" rx={s.rx > 0 ? 6 : 0} fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="64" y="52" width="40" height="12" rx={s.rx > 0 ? 6 : 0} fill={c.accent} opacity={s.decorOpacity} />
      <rect x="112" y="52" width="40" height="12" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="16" y="88" width="248" height="80" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.375} />
      <rect x="16" y="88" width="280" height="20" rx="0" fill={c.text} opacity={s.baseOpacity * 0.25} />
      <rect x="32" y="100" width="60" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="32" y="116" width="216" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
      <rect x="32" y="126" width="216" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
      <rect x="32" y="136" width="180" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
    </svg>
  );
}

// WebNavbar variants
export function WebNavbarLeft({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="0" y="0" width="280" height="32" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="16" y="10" width="48" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <rect x="72" y="12" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.2" />
      <rect x="108" y="12" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.2" />
      <rect x="144" y="12" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.primary} opacity="0.3" />
      <rect x="228" y="8" width="36" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.primary} />
      <rect x="0" y="44" width="280" height="28" fill={c.text} opacity={s.baseOpacity * 0.375} />
      <rect x="16" y="52" width="40" height="12" rx={s.rx > 0 ? 6 : 0} fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="64" y="52" width="40" height="12" rx={s.rx > 0 ? 6 : 0} fill={c.accent} opacity={s.decorOpacity} />
      <rect x="112" y="52" width="40" height="12" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="16" y="88" width="248" height="80" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.375} />
      <rect x="16" y="88" width="280" height="20" rx="0" fill={c.text} opacity={s.baseOpacity * 0.25} />
      <rect x="32" y="100" width="60" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="32" y="116" width="216" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
      <rect x="32" y="126" width="216" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
      <rect x="32" y="136" width="180" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
    </svg>
  );
}

export function WebNavbarMega({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="0" y="0" width="280" height="32" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="16" y="10" width="48" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <rect x="72" y="12" width="48" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.2" />
      <rect x="128" y="12" width="48" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.2" />
      <rect x="228" y="8" width="36" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.primary} />
      <rect x="72" y="36" width="200" height="60" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="80" y="44" width="56" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.2" />
      <rect x="80" y="54" width="48" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="80" y="62" width="52" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="80" y="70" width="44" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="144" y="44" width="56" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.primary} opacity="0.3" />
      <rect x="144" y="54" width="48" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="144" y="62" width="52" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="216" y="44" width="48" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="216" y="54" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="16" y="108" width="248" height="64" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.375} />
      <rect x="32" y="120" width="60" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="32" y="136" width="216" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
      <rect x="32" y="146" width="216" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
    </svg>
  );
}

export function WebNavbarFloating({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="16" y="8" width="248" height="28" rx={s.rx > 0 ? 14 : 0} fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="28" y="16" width="48" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <rect x="88" y="18" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.2" />
      <rect x="124" y="18" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.2" />
      <rect x="220" y="14" width="36" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.primary} />
      <rect x="16" y="48" width="248" height="28" fill={c.text} opacity={s.baseOpacity * 0.375} />
      <rect x="28" y="56" width="40" height="12" rx={s.rx > 0 ? 6 : 0} fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="76" y="56" width="40" height="12" rx={s.rx > 0 ? 6 : 0} fill={c.accent} opacity={s.decorOpacity} />
      <rect x="16" y="88" width="248" height="80" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.375} />
      <rect x="32" y="100" width="60" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="32" y="116" width="216" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
      <rect x="32" y="126" width="216" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
      <rect x="32" y="136" width="180" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.06" />
    </svg>
  );
}

export function WebFooter({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="16" y="16" width="48" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <rect x="16" y="36" width="80" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="16" y="50" width="60" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.1" />
      <rect x="16" y="64" width="50" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.1" />
      <rect x="112" y="16" width="40" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="112" y="30" width="50" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="112" y="40" width="44" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="112" y="50" width="48" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="112" y="60" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="192" y="16" width="40" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="192" y="30" width="48" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="192" y="40" width="42" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="192" y="50" width="46" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="16" y="88" width="248" height="44" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="28" y="100" width="80" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="28" y="114" width="160" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="200" y="96" width="52" height="20" rx={s.rx > 0 ? 10 : 0} fill={c.primary} />
      <rect x="208" y="102" width="36" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.background} opacity="0.8" />
      <rect x="16" y="148" width="248" height="1" fill={c.text} opacity="0.06" />
      <rect x="16" y="158" width="100" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
      <circle cx="220" cy="160" r="6" fill={c.text} opacity={s.decorOpacity} />
      <circle cx="236" cy="160" r="6" fill={c.text} opacity={s.decorOpacity} />
      <circle cx="252" cy="160" r="6" fill={c.text} opacity={s.decorOpacity} />
    </svg>
  );
}

// WebFooter variants
export function WebFooterMinimal({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="90" y="20" width="100" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <rect x="80" y="38" width="120" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="16" y="60" width="248" height="1" fill={c.text} opacity="0.06" />
      <rect x="80" y="76" width="24" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="112" y="76" width="24" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="144" y="76" width="24" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="176" y="76" width="24" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="16" y="100" width="248" height="44" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="80" y="114" width="120" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="80" y="126" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="16" y="156" width="248" height="1" fill={c.text} opacity="0.06" />
      <rect x="90" y="164" width="100" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
    </svg>
  );
}

export function WebFooterCentered({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="90" y="12" width="100" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <rect x="80" y="30" width="120" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="80" y="44" width="120" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.1" />
      <rect x="80" y="58" width="120" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.1" />
      <rect x="56" y="80" width="168" height="44" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="80" y="92" width="120" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="80" y="104" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="104" y="114" width="72" height="18" rx={s.rx > 0 ? 9 : 0} fill={c.primary} />
      <rect x="114" y="119" width="52" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.background} opacity="0.8" />
      <rect x="16" y="140" width="248" height="1" fill={c.text} opacity="0.06" />
      <rect x="80" y="152" width="120" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
      <circle cx="108" cy="168" r="6" fill={c.text} opacity={s.decorOpacity} />
      <circle cx="132" cy="168" r="6" fill={c.text} opacity={s.decorOpacity} />
      <circle cx="156" cy="168" r="6" fill={c.text} opacity={s.decorOpacity} />
    </svg>
  );
}

export function WebFooterSplit({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.background} rx={s.rx} />
      <rect x="16" y="16" width="120" height="60" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="28" y="28" width="80" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="28" y="40" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="28" y="52" width="48" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.primary} />
      <rect x="36" y="56" width="32" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.background} opacity="0.8" />
      <rect x="144" y="16" width="48" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="144" y="30" width="44" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="144" y="40" width="48" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="144" y="50" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="144" y="60" width="48" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="196" y="16" width="48" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="196" y="30" width="44" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="196" y="40" width="48" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="196" y="50" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="16" y="88" width="248" height="44" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="28" y="100" width="80" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="28" y="114" width="160" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="16" y="144" width="248" height="1" fill={c.text} opacity="0.06" />
      <rect x="16" y="156" width="100" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
      <circle cx="220" cy="160" r="6" fill={c.text} opacity={s.decorOpacity} />
      <circle cx="236" cy="160" r="6" fill={c.text} opacity={s.decorOpacity} />
      <circle cx="252" cy="160" r="6" fill={c.text} opacity={s.decorOpacity} />
    </svg>
  );
}

// ── Mobile Mockups ────────────────────────────────────────────────────────────

export function MobileFeed({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="40" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="16" y="14" width="48" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <circle cx="136" cy="19" r="10" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="12" y="52" width="136" height="64" rx={s.rx > 0 ? 10 : 0} fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="20" y="60" width="60" height="32" rx={s.rx > 0 ? 4 : 0} fill={c.primary} opacity={s.baseOpacity * 1.5} />
      <rect x="20" y="100" width="80" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.5" />
      <rect x="20" y="112" width="100" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="12" y="128" width="136" height="56" rx={s.rx > 0 ? 10 : 0} fill={c.secondary} opacity={s.baseOpacity * 0.5} />
      <rect x="20" y="136" width="50" height="28" rx={s.rx > 0 ? 4 : 0} fill={c.secondary} opacity={s.baseOpacity * 1.25} />
      <rect x="20" y="172" width="70" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.5" />
      <rect x="20" y="184" width="90" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="12" y="196" width="136" height="56" rx={s.rx > 0 ? 10 : 0} fill={c.accent} opacity={s.baseOpacity * 0.5} />
      <rect x="20" y="204" width="50" height="28" rx={s.rx > 0 ? 4 : 0} fill={c.accent} opacity={s.baseOpacity * 1.25} />
      <rect x="20" y="240" width="60" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.5" />
      <rect x="20" y="252" width="100" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="0" y="264" width="160" height="16" fill={c.background} />
      <rect x="28" y="268" width="20" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.3" />
      <rect x="60" y="268" width="20" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.08" />
      <rect x="92" y="268" width="20" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.08" />
      <rect x="124" y="268" width="20" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.08" />
    </svg>
  );
}

// MobileFeed variants
export function MobileFeedCompact({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="36" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="12" y="12" width="40" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <circle cx="140" cy="18" r="8" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="8" y="44" width="144" height="36" rx={s.rx > 0 ? 6 : 0} fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="16" y="50" width="40" height="20" rx={s.rx > 0 ? 4 : 0} fill={c.primary} opacity={s.baseOpacity * 1.5} />
      <rect x="64" y="52" width="60" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.5" />
      <rect x="64" y="62" width="80" height="3" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="8" y="86" width="144" height="36" rx={s.rx > 0 ? 6 : 0} fill={c.secondary} opacity={s.baseOpacity * 0.5} />
      <rect x="16" y="92" width="40" height="20" rx={s.rx > 0 ? 4 : 0} fill={c.secondary} opacity={s.baseOpacity * 1.25} />
      <rect x="64" y="94" width="60" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.5" />
      <rect x="64" y="104" width="80" height="3" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="8" y="128" width="144" height="36" rx={s.rx > 0 ? 6 : 0} fill={c.accent} opacity={s.baseOpacity * 0.5} />
      <rect x="16" y="134" width="40" height="20" rx={s.rx > 0 ? 4 : 0} fill={c.accent} opacity={s.baseOpacity * 1.25} />
      <rect x="64" y="136" width="60" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.5" />
      <rect x="64" y="146" width="80" height="3" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="8" y="170" width="144" height="36" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.375} />
      <rect x="16" y="176" width="40" height="20" rx={s.rx > 0 ? 4 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="64" y="178" width="60" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="64" y="188" width="80" height="3" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="8" y="212" width="144" height="36" rx={s.rx > 0 ? 6 : 0} fill={c.primary} opacity={s.baseOpacity * 0.5} />
      <rect x="16" y="218" width="40" height="20" rx={s.rx > 0 ? 4 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <rect x="64" y="220" width="60" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.5" />
      <rect x="0" y="258" width="160" height="22" fill={c.background} />
      <rect x="24" y="262" width="20" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.3" />
      <rect x="56" y="262" width="20" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.08" />
      <rect x="88" y="262" width="20" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.08" />
      <rect x="120" y="262" width="20" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.08" />
    </svg>
  );
}

export function MobileFeedMagazine({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="36" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="12" y="12" width="40" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <circle cx="140" cy="18" r="8" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="8" y="44" width="144" height="100" rx={s.rx > 0 ? 10 : 0} fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="16" y="52" width="60" height="40" rx={s.rx > 0 ? 6 : 0} fill={c.primary} opacity={s.baseOpacity * 1.5} />
      <rect x="16" y="100" width="100" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.5" />
      <rect x="16" y="112" width="120" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="16" y="122" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="8" y="152" width="70" height="52" rx={s.rx > 0 ? 8 : 0} fill={c.secondary} opacity={s.baseOpacity * 0.5} />
      <rect x="16" y="160" width="50" height="28" rx={s.rx > 0 ? 4 : 0} fill={c.secondary} opacity={s.baseOpacity * 1.25} />
      <rect x="16" y="194" width="50" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.4" />
      <rect x="86" y="152" width="66" height="52" rx={s.rx > 0 ? 8 : 0} fill={c.accent} opacity={s.baseOpacity * 0.5} />
      <rect x="94" y="160" width="50" height="28" rx={s.rx > 0 ? 4 : 0} fill={c.accent} opacity={s.baseOpacity * 1.25} />
      <rect x="94" y="194" width="50" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.4" />
      <rect x="8" y="212" width="144" height="40" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.375} />
      <rect x="16" y="220" width="60" height="24" rx={s.rx > 0 ? 4 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="84" y="222" width="60" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="84" y="232" width="40" height="3" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="0" y="260" width="160" height="20" fill={c.background} />
      <rect x="28" y="264" width="20" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.3" />
      <rect x="60" y="264" width="20" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.08" />
      <rect x="92" y="264" width="20" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.08" />
      <rect x="124" y="264" width="20" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.08" />
    </svg>
  );
}

export function MobileFeedFullImage({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="36" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="12" y="12" width="40" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <circle cx="140" cy="18" r="8" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="8" y="44" width="144" height="80" rx={s.rx > 0 ? 10 : 0} fill={c.primary} opacity={s.baseOpacity * 1.5} />
      <circle cx="80" cy="74" r="16" fill={c.primary} opacity={s.decorOpacity} />
      <rect x="8" y="132" width="144" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.5" />
      <rect x="8" y="144" width="100" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="8" y="160" width="144" height="60" rx={s.rx > 0 ? 10 : 0} fill={c.secondary} opacity={s.baseOpacity * 0.5} />
      <circle cx="80" cy="180" r="12" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="8" y="228" width="144" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.5" />
      <rect x="8" y="240" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="0" y="260" width="160" height="20" fill={c.background} />
      <rect x="28" y="264" width="20" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.3" />
      <rect x="60" y="264" width="20" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.08" />
      <rect x="92" y="264" width="20" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.08" />
      <rect x="124" y="264" width="20" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.08" />
    </svg>
  );
}

export function MobileProfile({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="90" fill={c.primary} opacity={s.baseOpacity} />
      <circle cx="80" cy="50" r="22" fill={c.primary} opacity={s.decorOpacity} />
      <circle cx="80" cy="50" r="16" fill={c.primary} opacity="0.25" />
      <rect x="52" y="80" width="56" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.6" />
      <rect x="56" y="94" width="48" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="16" y="112" width="128" height="36" rx={s.rx > 0 ? 10 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="28" y="120" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.primary} opacity="0.5" />
      <rect x="66" y="120" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.secondary} opacity="0.4" />
      <rect x="104" y="120" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.accent} opacity="0.4" />
      <rect x="28" y="132" width="24" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="66" y="132" width="24" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="104" y="132" width="24" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="16" y="160" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="164" width="10" height="10" rx={s.rx > 0 ? 3 : 0} fill={c.primary} opacity={s.decorOpacity} />
      <rect x="40" y="167" width="60" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.25" />
      <rect x="16" y="182" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="186" width="10" height="10" rx={s.rx > 0 ? 3 : 0} fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="40" y="189" width="50" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.25" />
      <rect x="16" y="204" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="208" width="10" height="10" rx={s.rx > 0 ? 3 : 0} fill={c.accent} opacity={s.decorOpacity} />
      <rect x="40" y="211" width="56" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.25" />
      <rect x="16" y="226" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="230" width="10" height="10" rx={s.rx > 0 ? 3 : 0} fill={c.text} opacity={s.baseOpacity} />
      <rect x="40" y="233" width="44" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.25" />
    </svg>
  );
}

// MobileProfile variants
export function MobileProfileScrollable({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="70" fill={c.primary} opacity={s.baseOpacity} />
      <circle cx="80" cy="40" r="20" fill={c.primary} opacity={s.decorOpacity} />
      <circle cx="80" cy="40" r="14" fill={c.primary} opacity="0.25" />
      <rect x="40" y="66" width="80" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.6" />
      <rect x="44" y="78" width="72" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="16" y="92" width="128" height="28" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="28" y="100" width="24" height="5" rx={s.rx > 0 ? 1 : 0} fill={c.primary} opacity="0.5" />
      <rect x="60" y="100" width="24" height="5" rx={s.rx > 0 ? 1 : 0} fill={c.secondary} opacity="0.4" />
      <rect x="92" y="100" width="24" height="5" rx={s.rx > 0 ? 1 : 0} fill={c.accent} opacity="0.4" />
      <rect x="16" y="128" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="132" width="10" height="10" rx={s.rx > 0 ? 3 : 0} fill={c.primary} opacity={s.decorOpacity} />
      <rect x="40" y="135" width="60" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.25" />
      <rect x="16" y="150" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="154" width="10" height="10" rx={s.rx > 0 ? 3 : 0} fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="40" y="157" width="50" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.25" />
      <rect x="16" y="172" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="176" width="10" height="10" rx={s.rx > 0 ? 3 : 0} fill={c.accent} opacity={s.decorOpacity} />
      <rect x="40" y="179" width="56" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.25" />
      <rect x="16" y="194" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="198" width="10" height="10" rx={s.rx > 0 ? 3 : 0} fill={c.text} opacity={s.baseOpacity} />
      <rect x="40" y="201" width="44" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.25" />
      <rect x="16" y="216" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="220" width="10" height="10" rx={s.rx > 0 ? 3 : 0} fill={c.primary} opacity={s.decorOpacity} />
      <rect x="40" y="223" width="52" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.25" />
      <rect x="16" y="238" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="242" width="10" height="10" rx={s.rx > 0 ? 3 : 0} fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="40" y="245" width="48" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.25" />
    </svg>
  );
}

export function MobileProfileSettings({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="40" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="12" y="14" width="20" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.2" />
      <rect x="40" y="12" width="60" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <rect x="16" y="52" width="128" height="44" rx={s.rx > 0 ? 10 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <circle cx="36" cy="74" r="14" fill={c.primary} opacity={s.decorOpacity} />
      <rect x="56" y="64" width="60" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="56" y="76" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="16" y="108" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="112" width="80" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.25" />
      <rect x="16" y="130" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="134" width="60" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.25" />
      <rect x="16" y="152" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="156" width="70" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.25" />
      <rect x="16" y="174" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="178" width="50" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.25" />
      <rect x="16" y="196" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="200" width="90" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.25" />
      <rect x="16" y="220" width="128" height="36" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="40" y="230" width="80" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="40" y="242" width="56" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
    </svg>
  );
}

export function MobileProfileBento({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="40" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="12" y="14" width="40" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.6" />
      <circle cx="136" cy="19" r="8" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="16" y="52" width="60" height="44" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <circle cx="46" cy="74" r="12" fill={c.primary} opacity={s.decorOpacity} />
      <rect x="84" y="52" width="60" height="44" rx={s.rx > 0 ? 8 : 0} fill={c.secondary} opacity={s.baseOpacity * 0.75} />
      <rect x="92" y="62" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="92" y="74" width="20" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="16" y="104" width="128" height="32" rx={s.rx > 0 ? 8 : 0} fill={c.accent} opacity={s.baseOpacity * 0.75} />
      <rect x="24" y="112" width="60" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="24" y="122" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="16" y="144" width="60" height="44" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="152" width="40" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="24" y="162" width="30" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="84" y="144" width="60" height="44" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.baseOpacity * 0.5} />
      <rect x="92" y="152" width="40" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="92" y="162" width="30" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="16" y="196" width="128" height="32" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.375} />
      <rect x="24" y="204" width="80" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.25" />
      <rect x="24" y="214" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="16" y="236" width="128" height="30" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.375} />
      <rect x="24" y="244" width="60" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.25" />
      <rect x="24" y="254" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
    </svg>
  );
}

export function MobileLogin({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="56" y="40" width="48" height="48" rx={s.rx > 0 ? 14 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <circle cx="80" cy="64" r="14" fill={c.primary} opacity={s.decorOpacity} />
      <rect x="40" y="102" width="80" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.6" />
      <rect x="48" y="118" width="64" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="24" y="142" width="112" height="20" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="32" y="148" width="16" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity={s.baseOpacity} />
      <rect x="54" y="150" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="24" y="170" width="112" height="20" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="32" y="176" width="16" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity={s.baseOpacity} />
      <rect x="54" y="178" width="50" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="24" y="202" width="112" height="22" rx={s.rx > 0 ? 11 : 0} fill={c.primary} />
      <rect x="56" y="209" width="48" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.background} opacity="0.8" />
      <rect x="24" y="234" width="112" height="18" rx={s.rx > 0 ? 8 : 0} fill={c.secondary} opacity={s.baseOpacity} />
      <rect x="48" y="240" width="64" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.secondary} opacity="0.4" />
    </svg>
  );
}

// MobileLogin variants
export function MobileLoginMinimal({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="40" y="80" width="80" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.6" />
      <rect x="48" y="98" width="64" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="24" y="122" width="112" height="18" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="32" y="128" width="16" height="6" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity={s.baseOpacity} />
      <rect x="54" y="130" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="24" y="148" width="112" height="18" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="32" y="154" width="16" height="6" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity={s.baseOpacity} />
      <rect x="54" y="156" width="50" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="24" y="178" width="112" height="22" rx={s.rx > 0 ? 11 : 0} fill={c.primary} />
      <rect x="56" y="185" width="48" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.background} opacity="0.8" />
    </svg>
  );
}

export function MobileLoginIllustration({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="32" y="30" width="96" height="80" rx={s.rx > 0 ? 16 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <circle cx="80" cy="60" r="20" fill={c.primary} opacity={s.decorOpacity} />
      <rect x="48" y="120" width="64" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.6" />
      <rect x="56" y="136" width="48" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="24" y="160" width="112" height="18" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="32" y="166" width="16" height="6" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity={s.baseOpacity} />
      <rect x="54" y="168" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="24" y="186" width="112" height="18" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="32" y="192" width="16" height="6" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity={s.baseOpacity} />
      <rect x="54" y="194" width="50" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="24" y="216" width="112" height="22" rx={s.rx > 0 ? 11 : 0} fill={c.primary} />
      <rect x="56" y="223" width="48" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.background} opacity="0.8" />
      <rect x="24" y="248" width="112" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.secondary} opacity={s.baseOpacity} />
      <rect x="48" y="254" width="64" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.secondary} opacity="0.4" />
    </svg>
  );
}

export function MobileLoginOTP({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="56" y="50" width="48" height="48" rx={s.rx > 0 ? 14 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <circle cx="80" cy="74" r="14" fill={c.primary} opacity={s.decorOpacity} />
      <rect x="40" y="110" width="80" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.6" />
      <rect x="48" y="126" width="64" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="28" y="152" width="20" height="24" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="56" y="152" width="20" height="24" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="84" y="152" width="20" height="24" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="112" y="152" width="20" height="24" rx={s.rx > 0 ? 6 : 0} fill={c.primary} />
      <rect x="24" y="190" width="112" height="22" rx={s.rx > 0 ? 11 : 0} fill={c.primary} />
      <rect x="56" y="197" width="48" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.background} opacity="0.8" />
      <rect x="40" y="222" width="80" height="6" rx={s.rx > 0 ? 2 : 0} fill={c.primary} opacity="0.4" />
      <rect x="48" y="236" width="64" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
    </svg>
  );
}

export function MobileChat({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="40" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="12" y="14" width="20" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.2" />
      <rect x="40" y="12" width="60" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <circle cx="136" cy="19" r="10" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="16" y="52" width="80" height="28" rx={s.rx > 0 ? 12 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <rect x="24" y="60" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.15" />
      <rect x="24" y="68" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="64" y="90" width="80" height="28" rx={s.rx > 0 ? 12 : 0} fill={c.text} opacity={s.baseOpacity * 0.625} />
      <rect x="72" y="98" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="72" y="106" width="48" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
      <rect x="16" y="128" width="80" height="28" rx={s.rx > 0 ? 12 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <rect x="24" y="136" width="56" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.15" />
      <rect x="64" y="166" width="80" height="28" rx={s.rx > 0 ? 12 : 0} fill={c.text} opacity={s.baseOpacity * 0.625} />
      <rect x="72" y="174" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="16" y="210" width="80" height="28" rx={s.rx > 0 ? 12 : 0} fill={c.secondary} opacity={s.baseOpacity} />
      <rect x="24" y="218" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.15" />
      <rect x="12" y="250" width="112" height="20" rx={s.rx > 0 ? 10 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="132" y="250" width="20" height="20" rx={s.rx > 0 ? 10 : 0} fill={c.primary} />
    </svg>
  );
}

// MobileChat variants
export function MobileChatFullWidth({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="40" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="12" y="14" width="20" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.2" />
      <rect x="40" y="12" width="60" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <circle cx="136" cy="19" r="10" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="8" y="52" width="144" height="28" rx={s.rx > 0 ? 10 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <rect x="16" y="60" width="100" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.15" />
      <rect x="16" y="68" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="8" y="88" width="144" height="28" rx={s.rx > 0 ? 10 : 0} fill={c.text} opacity={s.baseOpacity * 0.625} />
      <rect x="16" y="96" width="100" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="16" y="104" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
      <rect x="8" y="124" width="144" height="28" rx={s.rx > 0 ? 10 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <rect x="16" y="132" width="90" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.15" />
      <rect x="8" y="160" width="144" height="28" rx={s.rx > 0 ? 10 : 0} fill={c.text} opacity={s.baseOpacity * 0.625} />
      <rect x="16" y="168" width="100" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="8" y="196" width="144" height="28" rx={s.rx > 0 ? 10 : 0} fill={c.secondary} opacity={s.baseOpacity} />
      <rect x="16" y="204" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.15" />
      <rect x="8" y="240" width="120" height="20" rx={s.rx > 0 ? 10 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="132" y="240" width="20" height="20" rx={s.rx > 0 ? 10 : 0} fill={c.primary} />
    </svg>
  );
}

export function MobileChatTimeline({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="40" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="12" y="14" width="20" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.2" />
      <rect x="40" y="12" width="60" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <circle cx="136" cy="19" r="10" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="76" y="52" width="4" height="200" fill={c.text} opacity="0.06" />
      <circle cx="78" cy="64" r="6" fill={c.primary} opacity={s.decorOpacity} />
      <rect x="16" y="74" width="56" height="24" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <rect x="24" y="82" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.15" />
      <rect x="88" y="104" width="56" height="24" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.625} />
      <rect x="96" y="112" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <circle cx="78" cy="148" r="6" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="16" y="158" width="56" height="24" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <rect x="24" y="166" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.15" />
      <rect x="88" y="188" width="56" height="24" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.625} />
      <rect x="96" y="196" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="8" y="240" width="120" height="20" rx={s.rx > 0 ? 10 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="132" y="240" width="20" height="20" rx={s.rx > 0 ? 10 : 0} fill={c.primary} />
    </svg>
  );
}

export function MobileChatMinimal({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="40" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="12" y="14" width="20" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.2" />
      <rect x="40" y="12" width="60" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <circle cx="136" cy="19" r="10" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="16" y="56" width="80" height="24" rx={s.rx > 0 ? 10 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <rect x="24" y="64" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.15" />
      <rect x="64" y="92" width="80" height="24" rx={s.rx > 0 ? 10 : 0} fill={c.text} opacity={s.baseOpacity * 0.625} />
      <rect x="72" y="100" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="16" y="128" width="80" height="24" rx={s.rx > 0 ? 10 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <rect x="24" y="136" width="56" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.15" />
      <rect x="64" y="164" width="80" height="24" rx={s.rx > 0 ? 10 : 0} fill={c.text} opacity={s.baseOpacity * 0.625} />
      <rect x="72" y="172" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="8" y="240" width="120" height="20" rx={s.rx > 0 ? 10 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="132" y="240" width="20" height="20" rx={s.rx > 0 ? 10 : 0} fill={c.primary} />
    </svg>
  );
}

export function MobileMap({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="280" fill={c.primary} opacity={s.baseOpacity * 0.375} />
      <line x1="0" y1="80" x2="160" y2="80" stroke={c.text} strokeWidth={s.strokeW} opacity="0.06" />
      <line x1="0" y1="160" x2="160" y2="160" stroke={c.text} strokeWidth={s.strokeW} opacity="0.06" />
      <line x1="0" y1="240" x2="160" y2="240" stroke={c.text} strokeWidth={s.strokeW} opacity="0.06" />
      <line x1="50" y1="0" x2="50" y2="280" stroke={c.text} strokeWidth={s.strokeW} opacity="0.06" />
      <line x1="110" y1="0" x2="110" y2="280" stroke={c.text} strokeWidth={s.strokeW} opacity="0.06" />
      <line x1="20" y1="40" x2="140" y2="120" stroke={c.primary} strokeWidth={s.strokeW * 1.33} opacity={s.decorOpacity} />
      <line x1="140" y1="120" x2="60" y2="200" stroke={c.primary} strokeWidth={s.strokeW * 1.33} opacity={s.decorOpacity} />
      <circle cx="80" cy="130" r="18" fill={c.primary} opacity={s.baseOpacity * 1.5} />
      <circle cx="80" cy="130" r="10" fill={c.primary} opacity="0.25" />
      <circle cx="80" cy="130" r="4" fill={c.primary} opacity="0.5" />
      <rect x="16" y="220" width="128" height="48" rx={s.rx > 0 ? 12 : 0} fill={c.background} />
      <rect x="16" y="220" width="128" height="48" rx={s.rx > 0 ? 12 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="28" y="230" width="50" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="28" y="242" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="28" y="252" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="112" y="236" width="24" height="20" rx={s.rx > 0 ? 10 : 0} fill={c.primary} />
    </svg>
  );
}

// MobileMap variants
export function MobileMapList({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="40" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="12" y="14" width="20" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.2" />
      <rect x="40" y="12" width="60" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <rect x="16" y="52" width="128" height="60" rx={s.rx > 0 ? 10 : 0} fill={c.primary} opacity={s.baseOpacity * 0.5} />
      <circle cx="80" cy="82" r="14" fill={c.primary} opacity={s.baseOpacity * 1.5} />
      <circle cx="80" cy="82" r="8" fill={c.primary} opacity="0.25" />
      <rect x="16" y="120" width="128" height="36" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="28" y="128" width="40" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="28" y="138" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="16" y="164" width="128" height="36" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="28" y="172" width="40" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="28" y="182" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="16" y="208" width="128" height="36" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="28" y="216" width="40" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="28" y="226" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="112" y="216" width="24" height="20" rx={s.rx > 0 ? 10 : 0} fill={c.primary} />
    </svg>
  );
}

export function MobileMapSplit({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="40" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="12" y="14" width="20" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.2" />
      <rect x="40" y="12" width="60" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <rect x="0" y="44" width="160" height="110" fill={c.primary} opacity={s.baseOpacity * 0.375} />
      <line x1="20" y1="60" x2="140" y2="130" stroke={c.primary} strokeWidth={s.strokeW * 1.33} opacity={s.decorOpacity} />
      <circle cx="80" cy="95" r="14" fill={c.primary} opacity={s.baseOpacity * 1.5} />
      <circle cx="80" cy="95" r="8" fill={c.primary} opacity="0.25" />
      <circle cx="80" cy="95" r="4" fill={c.primary} opacity="0.5" />
      <rect x="16" y="162" width="128" height="36" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="28" y="170" width="40" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="28" y="180" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="112" y="170" width="24" height="20" rx={s.rx > 0 ? 10 : 0} fill={c.primary} />
      <rect x="16" y="206" width="128" height="36" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="28" y="214" width="40" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="28" y="224" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="16" y="250" width="128" height="20" rx={s.rx > 0 ? 10 : 0} fill={c.primary} />
      <rect x="48" y="256" width="64" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.background} opacity="0.8" />
    </svg>
  );
}

export function MobileMapCard({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="280" fill={c.primary} opacity={s.baseOpacity * 0.375} />
      <circle cx="80" cy="120" r="20" fill={c.primary} opacity={s.baseOpacity * 1.5} />
      <circle cx="80" cy="120" r="12" fill={c.primary} opacity="0.25" />
      <circle cx="80" cy="120" r="5" fill={c.primary} opacity="0.5" />
      <rect x="16" y="180" width="128" height="88" rx={s.rx > 0 ? 12 : 0} fill={c.background} />
      <rect x="16" y="180" width="128" height="88" rx={s.rx > 0 ? 12 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="28" y="192" width="50" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="28" y="204" width="80" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="28" y="214" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="112" y="200" width="24" height="20" rx={s.rx > 0 ? 10 : 0} fill={c.primary} />
      <rect x="16" y="252" width="128" height="18" rx={s.rx > 0 ? 8 : 0} fill={c.primary} />
      <rect x="48" y="256" width="64" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.background} opacity="0.8" />
    </svg>
  );
}

export function MobileCheckout({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="40" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="12" y="14" width="20" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.2" />
      <rect x="40" y="12" width="60" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <rect x="16" y="52" width="128" height="48" rx={s.rx > 0 ? 10 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="60" width="40" height="32" rx={s.rx > 0 ? 6 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <rect x="72" y="64" width="56" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="72" y="76" width="40" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.12" />
      <rect x="72" y="88" width="24" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.primary} opacity="0.4" />
      <rect x="16" y="112" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="116" width="40" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="108" y="116" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="16" y="134" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="138" width="50" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="108" y="138" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="16" y="156" width="128" height="1" fill={c.text} opacity="0.06" />
      <rect x="16" y="164" width="60" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="88" y="164" width="56" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.primary} opacity="0.5" />
      <rect x="16" y="186" width="128" height="22" rx={s.rx > 0 ? 10 : 0} fill={c.primary} />
      <rect x="48" y="193" width="64" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.background} opacity="0.8" />
      <rect x="16" y="218" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.secondary} opacity={s.baseOpacity * 0.75} />
      <rect x="40" y="222" width="80" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.secondary} opacity="0.3" />
    </svg>
  );
}

// MobileCheckout variants
export function MobileCheckoutMultiStep({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="40" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="12" y="14" width="20" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.2" />
      <rect x="40" y="12" width="60" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <rect x="16" y="52" width="36" height="8" rx={s.rx > 0 ? 4 : 0} fill={c.primary} />
      <rect x="60" y="52" width="36" height="8" rx={s.rx > 0 ? 4 : 0} fill={c.text} opacity="0.15" />
      <rect x="104" y="52" width="36" height="8" rx={s.rx > 0 ? 4 : 0} fill={c.text} opacity="0.15" />
      <rect x="16" y="72" width="128" height="48" rx={s.rx > 0 ? 10 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="80" width="40" height="32" rx={s.rx > 0 ? 6 : 0} fill={c.primary} opacity={s.baseOpacity * 1.25} />
      <rect x="72" y="84" width="56" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="72" y="96" width="40" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.12" />
      <rect x="72" y="108" width="24" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.primary} opacity="0.4" />
      <rect x="16" y="128" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="132" width="40" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="108" y="132" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="16" y="150" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="154" width="50" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="108" y="154" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="16" y="174" width="128" height="1" fill={c.text} opacity="0.06" />
      <rect x="16" y="184" width="128" height="22" rx={s.rx > 0 ? 10 : 0} fill={c.primary} />
      <rect x="48" y="191" width="64" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.background} opacity="0.8" />
      <rect x="16" y="206" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.secondary} opacity={s.baseOpacity * 0.75} />
      <rect x="40" y="210" width="80" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.secondary} opacity="0.3" />
    </svg>
  );
}

export function MobileCheckoutSummary({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="40" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="12" y="14" width="20" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.2" />
      <rect x="40" y="12" width="60" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <rect x="16" y="52" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="56" width="40" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="108" y="56" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="16" y="72" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="76" width="50" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="108" y="76" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="16" y="94" width="128" height="1" fill={c.text} opacity="0.06" />
      <rect x="16" y="104" width="60" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="88" y="104" width="56" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.primary} opacity="0.5" />
      <rect x="16" y="118" width="60" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="88" y="118" width="56" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.primary} opacity="0.5" />
      <rect x="16" y="132" width="128" height="1" fill={c.text} opacity="0.06" />
      <rect x="16" y="142" width="80" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="104" y="142" width="40" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.primary} opacity="0.5" />
      <rect x="16" y="164" width="128" height="22" rx={s.rx > 0 ? 10 : 0} fill={c.primary} />
      <rect x="48" y="171" width="64" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.background} opacity="0.8" />
      <rect x="16" y="196" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.secondary} opacity={s.baseOpacity * 0.75} />
      <rect x="40" y="200" width="80" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.secondary} opacity="0.3" />
    </svg>
  );
}

export function MobileCheckoutMinimal({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="40" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="12" y="14" width="20" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.2" />
      <rect x="40" y="12" width="60" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <rect x="16" y="60" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="64" width="40" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="108" y="64" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="16" y="82" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="86" width="50" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="108" y="86" width="28" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="16" y="108" width="128" height="22" rx={s.rx > 0 ? 10 : 0} fill={c.primary} />
      <rect x="48" y="115" width="64" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.background} opacity="0.8" />
    </svg>
  );
}

export function MobilePlayer({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="280" fill={c.primary} opacity={s.baseOpacity * 0.5} />
      <rect x="40" y="40" width="80" height="80" rx={s.rx > 0 ? 16 : 0} fill={c.primary} opacity={s.baseOpacity * 1.5} />
      <circle cx="80" cy="80" r="20" fill={c.primary} opacity={s.decorOpacity} />
      <circle cx="80" cy="80" r="8" fill={c.primary} opacity="0.35" />
      <rect x="44" y="136" width="72" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.6" />
      <rect x="48" y="150" width="64" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="32" y="172" width="96" height="3" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity={s.baseOpacity} />
      <rect x="32" y="172" width="40" height="3" rx={s.rx > 0 ? 1.5 : 0} fill={c.primary} opacity="0.4" />
      <circle cx="72" cy="173.5" r="5" fill={c.primary} />
      <rect x="36" y="182" width="20" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="104" y="182" width="20" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="56" y="200" width="16" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="80" y="196" width="24" height="24" rx={s.rx > 0 ? 12 : 0} fill={c.primary} />
      <rect x="88" y="204" width="8" height="8" rx={s.rx > 0 ? 1 : 0} fill={c.background} opacity="0.8" />
      <rect x="108" y="200" width="16" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="24" y="240" width="112" height="28" rx={s.rx > 0 ? 10 : 0} fill={c.secondary} opacity={s.baseOpacity * 0.75} />
      <rect x="36" y="248" width="40" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="36" y="258" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="108" y="250" width="20" height="16" rx={s.rx > 0 ? 4 : 0} fill={c.primary} opacity={s.decorOpacity} />
    </svg>
  );
}

// MobilePlayer variants
export function MobilePlayerMinimal({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="40" y="40" width="80" height="80" rx={s.rx > 0 ? 16 : 0} fill={c.primary} opacity={s.baseOpacity * 1.5} />
      <circle cx="80" cy="80" r="16" fill={c.primary} opacity={s.decorOpacity} />
      <rect x="44" y="136" width="72" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.6" />
      <rect x="48" y="150" width="64" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="32" y="172" width="96" height="3" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity={s.baseOpacity} />
      <rect x="32" y="172" width="40" height="3" rx={s.rx > 0 ? 1.5 : 0} fill={c.primary} opacity="0.4" />
      <circle cx="72" cy="173.5" r="5" fill={c.primary} />
      <rect x="36" y="182" width="20" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="104" y="182" width="20" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="56" y="200" width="16" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="80" y="196" width="24" height="24" rx={s.rx > 0 ? 12 : 0} fill={c.primary} />
      <rect x="88" y="204" width="8" height="8" rx={s.rx > 0 ? 1 : 0} fill={c.background} opacity="0.8" />
      <rect x="108" y="200" width="16" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
    </svg>
  );
}

export function MobilePlayerList({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="40" y="30" width="80" height="80" rx={s.rx > 0 ? 16 : 0} fill={c.primary} opacity={s.baseOpacity * 1.5} />
      <circle cx="80" cy="60" r="16" fill={c.primary} opacity={s.decorOpacity} />
      <rect x="44" y="122" width="72" height="8" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.6" />
      <rect x="48" y="136" width="64" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.15" />
      <rect x="32" y="155" width="96" height="3" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity={s.baseOpacity} />
      <rect x="32" y="155" width="40" height="3" rx={s.rx > 0 ? 1.5 : 0} fill={c.primary} opacity="0.4" />
      <circle cx="72" cy="156.5" r="4" fill={c.primary} />
      <rect x="16" y="172" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.primary} opacity={s.baseOpacity * 0.5} />
      <rect x="24" y="176" width="40" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="16" y="192" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.375} />
      <rect x="24" y="196" width="40" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="16" y="212" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.375} />
      <rect x="24" y="216" width="40" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="16" y="232" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.375} />
      <rect x="24" y="236" width="40" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="16" y="252" width="128" height="14" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.375} />
      <rect x="24" y="256" width="40" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
    </svg>
  );
}

export function MobilePlayerWaveform({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="280" fill={c.primary} opacity={s.baseOpacity * 0.5} />
      <rect x="32" y="40" width="96" height="96" rx={s.rx > 0 ? 16 : 0} fill={c.primary} opacity={s.baseOpacity * 1.5} />
      <circle cx="80" cy="88" r="20" fill={c.primary} opacity={s.decorOpacity} />
      <circle cx="80" cy="88" r="8" fill={c.primary} opacity="0.35" />
      <rect x="32" y="150" width="6" height="20" rx="3" fill={c.primary} opacity="0.3" />
      <rect x="42" y="145" width="6" height="30" rx="3" fill={c.primary} opacity="0.5" />
      <rect x="52" y="140" width="6" height="40" rx="3" fill={c.primary} opacity="0.7" />
      <rect x="62" y="142" width="6" height="36" rx="3" fill={c.primary} opacity="0.5" />
      <rect x="72" y="138" width="6" height="44" rx="3" fill={c.primary} opacity="0.8" />
      <rect x="82" y="144" width="6" height="32" rx="3" fill={c.primary} opacity="0.4" />
      <rect x="92" y="140" width="6" height="40" rx="3" fill={c.primary} opacity="0.6" />
      <rect x="102" y="146" width="6" height="28" rx="3" fill={c.primary} opacity="0.3" />
      <rect x="112" y="142" width="6" height="36" rx="3" fill={c.primary} opacity="0.5" />
      <rect x="122" y="148" width="6" height="24" rx="3" fill={c.primary} opacity="0.3" />
      <rect x="44" y="196" width="16" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="68" y="192" width="24" height="24" rx={s.rx > 0 ? 12 : 0} fill={c.primary} />
      <rect x="76" y="200" width="8" height="8" rx={s.rx > 0 ? 1 : 0} fill={c.background} opacity="0.8" />
      <rect x="100" y="196" width="16" height="16" rx={s.rx > 0 ? 8 : 0} fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="24" y="232" width="112" height="28" rx={s.rx > 0 ? 10 : 0} fill={c.secondary} opacity={s.baseOpacity * 0.75} />
      <rect x="36" y="240" width="40" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="36" y="250" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
    </svg>
  );
}

export function MobileNotifications({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="40" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="12" y="14" width="20" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.2" />
      <rect x="40" y="12" width="60" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <circle cx="136" cy="19" r="10" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="16" y="52" width="128" height="48" rx={s.rx > 0 ? 10 : 0} fill={c.primary} opacity={s.baseOpacity * 0.5} />
      <circle cx="36" cy="76" r="10" fill={c.primary} opacity={s.decorOpacity} />
      <rect x="52" y="64" width="72" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="52" y="76" width="56" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="52" y="86" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.primary} opacity={s.decorOpacity} />
      <rect x="16" y="108" width="128" height="48" rx={s.rx > 0 ? 10 : 0} fill={c.secondary} opacity={s.baseOpacity * 0.5} />
      <circle cx="36" cy="132" r="10" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="52" y="120" width="68" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="52" y="132" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="52" y="142" width="44" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="16" y="164" width="128" height="48" rx={s.rx > 0 ? 10 : 0} fill={c.accent} opacity={s.baseOpacity * 0.5} />
      <circle cx="36" cy="188" r="10" fill={c.accent} opacity={s.decorOpacity} />
      <rect x="52" y="176" width="72" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="52" y="188" width="52" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="52" y="198" width="36" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.accent} opacity={s.decorOpacity} />
      <rect x="16" y="220" width="128" height="48" rx={s.rx > 0 ? 10 : 0} fill={c.text} opacity={s.baseOpacity * 0.375} />
      <circle cx="36" cy="244" r="10" fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="52" y="232" width="64" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="52" y="244" width="48" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="52" y="254" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
    </svg>
  );
}

// MobileNotifications variants
export function MobileNotificationsCompact({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="40" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="12" y="14" width="20" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.2" />
      <rect x="40" y="12" width="60" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <circle cx="136" cy="19" r="10" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="16" y="52" width="128" height="36" rx={s.rx > 0 ? 6 : 0} fill={c.primary} opacity={s.baseOpacity * 0.5} />
      <circle cx="32" cy="70" r="8" fill={c.primary} opacity={s.decorOpacity} />
      <rect x="44" y="60" width="72" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="44" y="70" width="56" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="16" y="94" width="128" height="36" rx={s.rx > 0 ? 6 : 0} fill={c.secondary} opacity={s.baseOpacity * 0.5} />
      <circle cx="32" cy="112" r="8" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="44" y="102" width="68" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="44" y="112" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="16" y="136" width="128" height="36" rx={s.rx > 0 ? 6 : 0} fill={c.accent} opacity={s.baseOpacity * 0.5} />
      <circle cx="32" cy="154" r="8" fill={c.accent} opacity={s.decorOpacity} />
      <rect x="44" y="144" width="72" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="44" y="154" width="52" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="16" y="178" width="128" height="36" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.375} />
      <circle cx="32" cy="196" r="8" fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="44" y="186" width="64" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="44" y="196" width="48" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="16" y="220" width="128" height="36" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.375} />
      <circle cx="32" cy="238" r="8" fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="44" y="228" width="72" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="44" y="238" width="56" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <rect x="44" y="248" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.08" />
    </svg>
  );
}

export function MobileNotificationsGrouped({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="40" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="12" y="14" width="20" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.2" />
      <rect x="40" y="12" width="60" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <circle cx="136" cy="19" r="10" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="16" y="52" width="60" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="16" y="66" width="128" height="36" rx={s.rx > 0 ? 8 : 0} fill={c.primary} opacity={s.baseOpacity * 0.5} />
      <circle cx="36" cy="84" r="8" fill={c.primary} opacity={s.decorOpacity} />
      <rect x="52" y="74" width="72" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="52" y="84" width="56" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="52" y="94" width="40" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.primary} opacity={s.decorOpacity} />
      <rect x="16" y="110" width="60" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="16" y="124" width="128" height="36" rx={s.rx > 0 ? 8 : 0} fill={c.secondary} opacity={s.baseOpacity * 0.5} />
      <circle cx="36" cy="142" r="8" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="52" y="132" width="68" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="52" y="142" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="52" y="152" width="44" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="16" y="168" width="60" height="6" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.3" />
      <rect x="16" y="182" width="128" height="36" rx={s.rx > 0 ? 8 : 0} fill={c.accent} opacity={s.baseOpacity * 0.5} />
      <circle cx="36" cy="200" r="8" fill={c.accent} opacity={s.decorOpacity} />
      <rect x="52" y="190" width="72" height="5" rx={s.rx > 0 ? 1.5 : 0} fill={c.text} opacity="0.4" />
      <rect x="52" y="200" width="52" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <rect x="52" y="210" width="36" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.accent} opacity={s.decorOpacity} />
    </svg>
  );
}

export function MobileNotificationsTimeline({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 160 280" className="w-full h-full">
      <rect width="160" height="280" fill={c.background} rx={s.rx > 0 ? 16 : 0} />
      <rect x="0" y="0" width="160" height="40" fill={c.primary} opacity={s.baseOpacity * 0.75} />
      <rect x="12" y="14" width="20" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.2" />
      <rect x="40" y="12" width="60" height="10" rx={s.rx > 0 ? 2 : 0} fill={c.text} opacity="0.5" />
      <circle cx="136" cy="19" r="10" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="32" y="52" width="4" height="210" fill={c.text} opacity="0.06" />
      <circle cx="34" cy="66" r="8" fill={c.primary} opacity={s.decorOpacity} />
      <rect x="48" y="58" width="80" height="20" rx={s.rx > 0 ? 6 : 0} fill={c.primary} opacity={s.baseOpacity * 0.5} />
      <rect x="56" y="64" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.4" />
      <rect x="56" y="72" width="40" height="3" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <circle cx="34" cy="106" r="8" fill={c.secondary} opacity={s.decorOpacity} />
      <rect x="48" y="98" width="80" height="20" rx={s.rx > 0 ? 6 : 0} fill={c.secondary} opacity={s.baseOpacity * 0.5} />
      <rect x="56" y="104" width="60" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.4" />
      <rect x="56" y="112" width="48" height="3" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <circle cx="34" cy="146" r="8" fill={c.accent} opacity={s.decorOpacity} />
      <rect x="48" y="138" width="80" height="20" rx={s.rx > 0 ? 6 : 0} fill={c.accent} opacity={s.baseOpacity * 0.5} />
      <rect x="56" y="144" width="72" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.4" />
      <rect x="56" y="152" width="52" height="3" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
      <circle cx="34" cy="186" r="8" fill={c.text} opacity={s.baseOpacity * 0.75} />
      <rect x="48" y="178" width="80" height="20" rx={s.rx > 0 ? 6 : 0} fill={c.text} opacity={s.baseOpacity * 0.375} />
      <rect x="56" y="184" width="64" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.3" />
      <rect x="56" y="192" width="48" height="3" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.1" />
      <circle cx="34" cy="226" r="8" fill={c.primary} opacity={s.decorOpacity} />
      <rect x="48" y="218" width="80" height="20" rx={s.rx > 0 ? 6 : 0} fill={c.primary} opacity={s.baseOpacity * 0.5} />
      <rect x="56" y="224" width="56" height="4" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.4" />
      <rect x="56" y="232" width="40" height="3" rx={s.rx > 0 ? 1 : 0} fill={c.text} opacity="0.12" />
    </svg>
  );
}
