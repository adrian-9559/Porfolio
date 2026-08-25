"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import { useT } from "@/hooks/useT";

import type { DesignColors, DesignStyle, MockupItem, MockupVariant } from "./DesignShowcaseMockups";
import { STYLES } from "./DesignShowcaseMockups";
import {
  WebHero, WebHeroSplit, WebHeroFull, WebHeroMinimal,
  WebDashboard, WebDashboardSidebarRight, WebDashboardNoSidebar, WebDashboardCompact,
  WebPricing, WebPricing2Col, WebPricingHorizontal, WebPricingFeatured,
  WebBlog, WebBlogList, WebBlogMasonry, WebBlogFeatured,
  WebContact, WebContactSplit, WebContact2Col, WebContactMinimal,
  WebProduct, WebProductGallery, WebProductSplit, WebProductFullScroll,
  WebNavbar, WebNavbarLeft, WebNavbarMega, WebNavbarFloating,
  WebFooter, WebFooterMinimal, WebFooterCentered, WebFooterSplit,
  MobileFeed, MobileFeedCompact, MobileFeedMagazine, MobileFeedFullImage,
  MobileProfile, MobileProfileScrollable, MobileProfileSettings, MobileProfileBento,
  MobileLogin, MobileLoginMinimal, MobileLoginIllustration, MobileLoginOTP,
  MobileChat, MobileChatFullWidth, MobileChatTimeline, MobileChatMinimal,
  MobileMap, MobileMapList, MobileMapSplit, MobileMapCard,
  MobileCheckout, MobileCheckoutMultiStep, MobileCheckoutSummary, MobileCheckoutMinimal,
  MobilePlayer, MobilePlayerMinimal, MobilePlayerList, MobilePlayerWaveform,
  MobileNotifications, MobileNotificationsCompact, MobileNotificationsGrouped, MobileNotificationsTimeline,
} from "./DesignShowcaseMockups";

const DEFAULT_COLORS: DesignColors = {
  primary: "#6366f1",
  secondary: "#ec4899",
  accent: "#8b5cf6",
  background: "#ffffff",
  text: "#1d1d1f",
};

const PRESETS: { name: string; colors: DesignColors }[] = [
  { name: "Ocean", colors: { primary: "#0ea5e9", secondary: "#06b6d4", accent: "#2563eb", background: "#f0f9ff", text: "#0c4a6e" } },
  { name: "Sunset", colors: { primary: "#f97316", secondary: "#ef4444", accent: "#eab308", background: "#fffbeb", text: "#7c2d12" } },
  { name: "Forest", colors: { primary: "#22c55e", secondary: "#14b8a6", accent: "#16a34a", background: "#f0fdf4", text: "#14532d" } },
  { name: "Neon", colors: { primary: "#a855f7", secondary: "#ec4899", accent: "#06b6d4", background: "#0f0f23", text: "#e2e8f0" } },
  { name: "Minimal", colors: { primary: "#18181b", secondary: "#71717a", accent: "#a1a1aa", background: "#ffffff", text: "#09090b" } },
  { name: "Warm", colors: { primary: "#e11d48", secondary: "#f59e0b", accent: "#7c3aed", background: "#fefce8", text: "#1c1917" } },
];

type Tab = "web" | "mobile";
type Density = "compact" | "comfortable" | "spacious";

const DENSITY_OPTIONS: { id: Density; labelKey: string }[] = [
  { id: "compact", labelKey: "blog.designShowcase.density.compact" },
  { id: "comfortable", labelKey: "blog.designShowcase.density.comfortable" },
  { id: "spacious", labelKey: "blog.designShowcase.density.spacious" },
];

const WEB_MOCKUPS: MockupItem[] = [
  { id: "hero", labelKey: "blog.designShowcase.web.hero", component: WebHero, variants: [
    { id: "centered", labelKey: "blog.designShowcase.variant.centered", component: WebHero },
    { id: "split", labelKey: "blog.designShowcase.variant.split", component: WebHeroSplit },
    { id: "full", labelKey: "blog.designShowcase.variant.full", component: WebHeroFull },
    { id: "minimal", labelKey: "blog.designShowcase.variant.minimal", component: WebHeroMinimal },
  ]},
  { id: "dashboard", labelKey: "blog.designShowcase.web.dashboard", component: WebDashboard, variants: [
    { id: "sidebar-left", labelKey: "blog.designShowcase.variant.sidebarLeft", component: WebDashboard },
    { id: "sidebar-right", labelKey: "blog.designShowcase.variant.sidebarRight", component: WebDashboardSidebarRight },
    { id: "no-sidebar", labelKey: "blog.designShowcase.variant.noSidebar", component: WebDashboardNoSidebar },
    { id: "compact-sidebar", labelKey: "blog.designShowcase.variant.compactSidebar", component: WebDashboardCompact },
  ]},
  { id: "pricing", labelKey: "blog.designShowcase.web.pricing", component: WebPricing, variants: [
    { id: "3-columns", labelKey: "blog.designShowcase.variant.3columns", component: WebPricing },
    { id: "2-columns", labelKey: "blog.designShowcase.variant.2columns", component: WebPricing2Col },
    { id: "horizontal", labelKey: "blog.designShowcase.variant.horizontal", component: WebPricingHorizontal },
    { id: "featured", labelKey: "blog.designShowcase.variant.featured", component: WebPricingFeatured },
  ]},
  { id: "blog", labelKey: "blog.designShowcase.web.blog", component: WebBlog, variants: [
    { id: "grid", labelKey: "blog.designShowcase.variant.grid", component: WebBlog },
    { id: "list", labelKey: "blog.designShowcase.variant.list", component: WebBlogList },
    { id: "masonry", labelKey: "blog.designShowcase.variant.masonry", component: WebBlogMasonry },
    { id: "featured", labelKey: "blog.designShowcase.variant.featured", component: WebBlogFeatured },
  ]},
  { id: "contact", labelKey: "blog.designShowcase.web.contact", component: WebContact, variants: [
    { id: "centered", labelKey: "blog.designShowcase.variant.centered", component: WebContact },
    { id: "split", labelKey: "blog.designShowcase.variant.split", component: WebContactSplit },
    { id: "2-columns", labelKey: "blog.designShowcase.variant.2columns", component: WebContact2Col },
    { id: "minimal", labelKey: "blog.designShowcase.variant.minimal", component: WebContactMinimal },
  ]},
  { id: "product", labelKey: "blog.designShowcase.web.product", component: WebProduct, variants: [
    { id: "hero-top", labelKey: "blog.designShowcase.variant.heroTop", component: WebProduct },
    { id: "gallery", labelKey: "blog.designShowcase.variant.gallery", component: WebProductGallery },
    { id: "split", labelKey: "blog.designShowcase.variant.split", component: WebProductSplit },
    { id: "full-scroll", labelKey: "blog.designShowcase.variant.fullScroll", component: WebProductFullScroll },
  ]},
  { id: "navbar", labelKey: "blog.designShowcase.web.navbar", component: WebNavbar, variants: [
    { id: "centered-nav", labelKey: "blog.designShowcase.variant.centeredNav", component: WebNavbar },
    { id: "left-aligned", labelKey: "blog.designShowcase.variant.leftAligned", component: WebNavbarLeft },
    { id: "mega-menu", labelKey: "blog.designShowcase.variant.megaMenu", component: WebNavbarMega },
    { id: "floating", labelKey: "blog.designShowcase.variant.floating", component: WebNavbarFloating },
  ]},
  { id: "footer", labelKey: "blog.designShowcase.web.footer", component: WebFooter, variants: [
    { id: "multi-column", labelKey: "blog.designShowcase.variant.multiColumn", component: WebFooter },
    { id: "minimal", labelKey: "blog.designShowcase.variant.minimal", component: WebFooterMinimal },
    { id: "centered", labelKey: "blog.designShowcase.variant.centered", component: WebFooterCentered },
    { id: "split-newsletter", labelKey: "blog.designShowcase.variant.splitNewsletter", component: WebFooterSplit },
  ]},
];

const MOBILE_MOCKUPS: MockupItem[] = [
  { id: "feed", labelKey: "blog.designShowcase.mobile.feed", component: MobileFeed, variants: [
    { id: "cards", labelKey: "blog.designShowcase.variant.cards", component: MobileFeed },
    { id: "compact", labelKey: "blog.designShowcase.variant.compact", component: MobileFeedCompact },
    { id: "magazine", labelKey: "blog.designShowcase.variant.magazine", component: MobileFeedMagazine },
    { id: "full-image", labelKey: "blog.designShowcase.variant.fullImage", component: MobileFeedFullImage },
  ]},
  { id: "profile", labelKey: "blog.designShowcase.mobile.profile", component: MobileProfile, variants: [
    { id: "tabbed", labelKey: "blog.designShowcase.variant.tabbed", component: MobileProfile },
    { id: "scrollable", labelKey: "blog.designShowcase.variant.scrollable", component: MobileProfileScrollable },
    { id: "settings", labelKey: "blog.designShowcase.variant.settings", component: MobileProfileSettings },
    { id: "bento", labelKey: "blog.designShowcase.variant.bento", component: MobileProfileBento },
  ]},
  { id: "login", labelKey: "blog.designShowcase.mobile.login", component: MobileLogin, variants: [
    { id: "social-first", labelKey: "blog.designShowcase.variant.socialFirst", component: MobileLogin },
    { id: "minimal", labelKey: "blog.designShowcase.variant.minimal", component: MobileLoginMinimal },
    { id: "illustration", labelKey: "blog.designShowcase.variant.illustration", component: MobileLoginIllustration },
    { id: "otp", labelKey: "blog.designShowcase.variant.otp", component: MobileLoginOTP },
  ]},
  { id: "chat", labelKey: "blog.designShowcase.mobile.chat", component: MobileChat, variants: [
    { id: "bubbles-right", labelKey: "blog.designShowcase.variant.bubblesRight", component: MobileChat },
    { id: "full-width", labelKey: "blog.designShowcase.variant.fullWidth", component: MobileChatFullWidth },
    { id: "timeline", labelKey: "blog.designShowcase.variant.timeline", component: MobileChatTimeline },
    { id: "minimal", labelKey: "blog.designShowcase.variant.minimal", component: MobileChatMinimal },
  ]},
  { id: "map", labelKey: "blog.designShowcase.mobile.map", component: MobileMap, variants: [
    { id: "full-map", labelKey: "blog.designShowcase.variant.fullMap", component: MobileMap },
    { id: "list-map", labelKey: "blog.designShowcase.variant.listMap", component: MobileMapList },
    { id: "split", labelKey: "blog.designShowcase.variant.split", component: MobileMapSplit },
    { id: "card-overlay", labelKey: "blog.designShowcase.variant.cardOverlay", component: MobileMapCard },
  ]},
  { id: "checkout", labelKey: "blog.designShowcase.mobile.checkout", component: MobileCheckout, variants: [
    { id: "single-step", labelKey: "blog.designShowcase.variant.singleStep", component: MobileCheckout },
    { id: "multi-step", labelKey: "blog.designShowcase.variant.multiStep", component: MobileCheckoutMultiStep },
    { id: "summary", labelKey: "blog.designShowcase.variant.summary", component: MobileCheckoutSummary },
    { id: "minimal", labelKey: "blog.designShowcase.variant.minimal", component: MobileCheckoutMinimal },
  ]},
  { id: "player", labelKey: "blog.designShowcase.mobile.player", component: MobilePlayer, variants: [
    { id: "full-visual", labelKey: "blog.designShowcase.variant.fullVisual", component: MobilePlayer },
    { id: "minimal", labelKey: "blog.designShowcase.variant.minimal", component: MobilePlayerMinimal },
    { id: "list-view", labelKey: "blog.designShowcase.variant.listView", component: MobilePlayerList },
    { id: "waveform", labelKey: "blog.designShowcase.variant.waveform", component: MobilePlayerWaveform },
  ]},
  { id: "notifications", labelKey: "blog.designShowcase.mobile.notifications", component: MobileNotifications, variants: [
    { id: "card-list", labelKey: "blog.designShowcase.variant.cardList", component: MobileNotifications },
    { id: "compact", labelKey: "blog.designShowcase.variant.compact", component: MobileNotificationsCompact },
    { id: "grouped", labelKey: "blog.designShowcase.variant.grouped", component: MobileNotificationsGrouped },
    { id: "timeline", labelKey: "blog.designShowcase.variant.timeline", component: MobileNotificationsTimeline },
  ]},
];

const COLOR_KEYS: { key: keyof DesignColors; labelKey: string }[] = [
  { key: "primary", labelKey: "blog.designShowcase.primary" },
  { key: "secondary", labelKey: "blog.designShowcase.secondary" },
  { key: "accent", labelKey: "blog.designShowcase.accent" },
  { key: "background", labelKey: "blog.designShowcase.background" },
  { key: "text", labelKey: "blog.designShowcase.text" },
];

function exportSVG(svgEl: SVGSVGElement, filename: string) {
  const clone = svgEl.cloneNode(true) as SVGSVGElement;
  clone.removeAttribute("class");
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const blob = new Blob([clone.outerHTML], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.svg`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── MockupModal ──────────────────────────────────────────────────────────────
function MockupModal({
  mockup,
  currentVariantId,
  colors,
  style,
  darkPreview,
  onApply,
  onClose,
}: {
  mockup: MockupItem;
  currentVariantId: string;
  colors: DesignColors;
  style: DesignStyle;
  darkPreview: boolean;
  onApply: (variantId: string) => void;
  onClose: () => void;
}) {
  const { t } = useT();
  const [selected, setSelected] = useState(currentVariantId);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="w-full max-w-4xl mb-16 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/8 dark:border-white/8">
          <h2 className="text-lg font-bold text-foreground">{t(mockup.labelKey)}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-muted transition-colors" type="button">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Variant grid 2x2 */}
        <div className="p-6 grid grid-cols-2 gap-4">
          {mockup.variants.map((v) => {
            const VC = v.component;
            const isSelected = selected === v.id;
            return (
              <button
                key={v.id}
                className={`group text-left rounded-xl border-2 transition-all overflow-hidden ${
                  isSelected
                    ? "border-accent shadow-md shadow-accent/10"
                    : "border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15"
                }`}
                onClick={() => setSelected(v.id)}
                type="button"
              >
                <div className={`p-2 ${darkPreview ? "bg-[#0a0a0a]" : "bg-black/[0.02] dark:bg-white/[0.02]"}`}>
                  <VC c={colors} s={style} />
                </div>
                <div className="px-3 py-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">{t(v.labelKey)}</span>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-black/8 dark:border-white/8">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-medium text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors" type="button">
            {t("blog.designShowcase.modal.close")}
          </button>
          <button
            onClick={() => onApply(selected)}
            className="px-5 py-2 rounded-xl text-xs font-medium bg-accent text-white hover:bg-accent/90 transition-colors"
            type="button"
          >
            {t("blog.designShowcase.modal.apply")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function DesignShowcaseContent() {
  const { t } = useT();
  const [colors, setColors] = useState<DesignColors>(DEFAULT_COLORS);
  const [styleId, setStyleId] = useState<string>("standard");
  const [tab, setTab] = useState<Tab>("web");
  const [density, setDensity] = useState<Density>("comfortable");
  const [darkPreview, setDarkPreview] = useState(false);
  const [variantMap, setVariantMap] = useState<Record<string, string>>({});
  const [modalMockup, setModalMockup] = useState<MockupItem | null>(null);

  const activeStyle = STYLES.find((s) => s.id === styleId) ?? STYLES[1];
  const mockups = tab === "web" ? WEB_MOCKUPS : MOBILE_MOCKUPS;

  function updateColor(key: keyof DesignColors, value: string) {
    setColors((prev) => ({ ...prev, [key]: value }));
  }

  function applyPreset(preset: DesignColors) {
    setColors(preset);
  }

  function exportCSS() {
    const radius = activeStyle.rx;
    const css = `:root {
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-accent: ${colors.accent};
  --color-background: ${colors.background};
  --color-text: ${colors.text};
  --border-radius: ${radius}px;
}`;
    navigator.clipboard.writeText(css).catch(() => {});
  }

  const getActiveComponent = useCallback((m: MockupItem) => {
    const vid = variantMap[m.id];
    if (!vid) return m.component;
    return m.variants.find((v) => v.id === vid)?.component ?? m.component;
  }, [variantMap]);

  function handleApplyVariant(variantId: string) {
    if (!modalMockup) return;
    setVariantMap((prev) => ({ ...prev, [modalMockup.id]: variantId }));
    setModalMockup(null);
  }

  return (
    <article className="w-full">
      {/* Header */}
      <div className="space-y-3 mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-semibold tracking-wide">
          {t("blog.designShowcase.badge")}
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          {t("blog.designShowcase.title")}
        </h1>
        <p className="text-muted leading-relaxed">
          {t("blog.designShowcase.description")}
        </p>
      </div>

      {/* Tool Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 space-y-6">
        {/* Color Pickers */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">{t("blog.designShowcase.colors")}</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkPreview(!darkPreview)}
                className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-muted transition-colors"
                title={t("blog.designShowcase.darkPreview")}
                type="button"
              >
                {darkPreview ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
                )}
              </button>
              <button
                className="text-xs text-accent hover:text-accent-hover font-medium transition-colors"
                onClick={exportCSS}
                type="button"
              >
                {t("blog.designShowcase.exportCss")}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {COLOR_KEYS.map(({ key, labelKey }) => (
              <label key={key} className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] cursor-pointer">
                <input type="color" value={colors[key]} onChange={(e) => updateColor(key, e.target.value)} className="w-5 h-5 rounded cursor-pointer border-0 p-0" />
                <span className="text-xs text-muted">{t(labelKey)}</span>
              </label>
            ))}
          </div>

          {/* Presets */}
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button key={p.name} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-black/8 dark:border-white/8 text-[11px] text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors" onClick={() => applyPreset(p.colors)} type="button">
                <span className="w-3 h-3 rounded-full border border-black/10 dark:border-white/10" style={{ background: `linear-gradient(135deg, ${p.colors.primary} 50%, ${p.colors.secondary} 50%)` }} />
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Style + Density row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">{t("blog.designShowcase.styleTitle")}</h3>
            <div className="flex gap-2">
              {STYLES.map((s) => (
                <button key={s.id} className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium border transition-all ${styleId === s.id ? "border-accent bg-accent/5 text-accent shadow-sm" : "border-black/8 dark:border-white/8 text-muted hover:bg-black/5 dark:hover:bg-white/5"}`} onClick={() => setStyleId(s.id)} type="button">
                  <span className={`w-4 h-4 rounded-sm border ${styleId === s.id ? "border-accent bg-accent/20" : "border-black/15 dark:border-white/15"}`} style={{ borderRadius: s.rx > 12 ? "4px" : s.rx > 0 ? "2px" : "0" }} />
                  {t(s.labelKey)}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">{t("blog.designShowcase.density.title")}</h3>
            <div className="flex gap-2">
              {DENSITY_OPTIONS.map((d) => (
                <button key={d.id} className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all ${density === d.id ? "border-accent bg-accent/5 text-accent shadow-sm" : "border-black/8 dark:border-white/8 text-muted hover:bg-black/5 dark:hover:bg-white/5"}`} onClick={() => setDensity(d.id)} type="button">
                  {t(d.labelKey)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.04]">
          <button className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${tab === "web" ? "bg-white dark:bg-[#1d1d1f] text-foreground shadow-sm" : "text-muted hover:text-foreground"}`} onClick={() => setTab("web")} type="button">
            {t("blog.designShowcase.webTab")} (8)
          </button>
          <button className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${tab === "mobile" ? "bg-white dark:bg-[#1d1d1f] text-foreground shadow-sm" : "text-muted hover:text-foreground"}`} onClick={() => setTab("mobile")} type="button">
            {t("blog.designShowcase.mobileTab")} (8)
          </button>
        </div>

        {/* Mockup Grid */}
        <div className={`grid gap-4 ${tab === "web" ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-3 lg:grid-cols-4"}`}>
          {mockups.map((m) => {
            const ActiveComponent = getActiveComponent(m);
            return (
              <div key={m.id} className="space-y-2 group">
                <button
                  className={`w-full text-left rounded-xl border border-black/8 dark:border-white/8 overflow-hidden bg-black/[0.02] dark:bg-white/[0.02] ${tab === "mobile" ? "p-2" : "p-3"} hover:border-accent/40 transition-colors relative`}
                  onClick={() => setModalMockup(m)}
                  type="button"
                >
                  <ActiveComponent c={colors} s={activeStyle} />
                  {/* Hover overlay with variants hint + export */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors rounded-xl flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <span className="px-2.5 py-1 rounded-lg bg-black/70 text-white text-[10px] font-medium backdrop-blur-sm">
                      {m.variants.length} {t("blog.designShowcase.modal.variants")}
                    </span>
                    <button
                      className="px-2 py-1 rounded-lg bg-accent text-white text-[10px] font-medium backdrop-blur-sm hover:bg-accent/90 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        const svgEl = e.currentTarget.closest("button")?.querySelector("svg");
                        if (svgEl) exportSVG(svgEl as SVGSVGElement, `design-showcase-${m.id}`);
                      }}
                      type="button"
                    >
                      SVG
                    </button>
                  </div>
                </button>
                <p className="text-[11px] text-muted text-center font-medium">{t(m.labelKey)}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {modalMockup && (
        <MockupModal
          mockup={modalMockup}
          currentVariantId={variantMap[modalMockup.id] ?? modalMockup.variants[0].id}
          colors={colors}
          style={activeStyle}
          darkPreview={darkPreview}
          onApply={handleApplyVariant}
          onClose={() => setModalMockup(null)}
        />
      )}
    </article>
  );
}
