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

export function WebFooter({ c, s }: { c: DesignColors; s: DesignStyle }) {
  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      <rect width="280" height="180" fill={c.text} opacity={s.baseOpacity * 0.5} rx={s.rx} />
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
