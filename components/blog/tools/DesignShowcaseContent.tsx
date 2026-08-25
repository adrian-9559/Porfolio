"use client";
import { useState } from "react";

import { useT } from "@/hooks/useT";

import type { DesignColors, DesignStyle } from "./DesignShowcaseMockups";
import { STYLES } from "./DesignShowcaseMockups";
import {
  WebHero,
  WebDashboard,
  WebPricing,
  WebBlog,
  WebContact,
  WebProduct,
  WebNavbar,
  WebFooter,
  MobileFeed,
  MobileProfile,
  MobileLogin,
  MobileChat,
  MobileMap,
  MobileCheckout,
  MobilePlayer,
  MobileNotifications,
} from "./DesignShowcaseMockups";

const DEFAULT_COLORS: DesignColors = {
  primary: "#6366f1",
  secondary: "#ec4899",
  accent: "#8b5cf6",
  background: "#ffffff",
  text: "#1d1d1f",
};

const PRESETS: { name: string; colors: DesignColors }[] = [
  {
    name: "Ocean",
    colors: { primary: "#0ea5e9", secondary: "#06b6d4", accent: "#2563eb", background: "#f0f9ff", text: "#0c4a6e" },
  },
  {
    name: "Sunset",
    colors: { primary: "#f97316", secondary: "#ef4444", accent: "#eab308", background: "#fffbeb", text: "#7c2d12" },
  },
  {
    name: "Forest",
    colors: { primary: "#22c55e", secondary: "#14b8a6", accent: "#16a34a", background: "#f0fdf4", text: "#14532d" },
  },
  {
    name: "Neon",
    colors: { primary: "#a855f7", secondary: "#ec4899", accent: "#06b6d4", background: "#0f0f23", text: "#e2e8f0" },
  },
  {
    name: "Minimal",
    colors: { primary: "#18181b", secondary: "#71717a", accent: "#a1a1aa", background: "#ffffff", text: "#09090b" },
  },
  {
    name: "Warm",
    colors: { primary: "#e11d48", secondary: "#f59e0b", accent: "#7c3aed", background: "#fefce8", text: "#1c1917" },
  },
];

type Tab = "web" | "mobile";

interface MockupItem {
  id: string;
  labelKey: string;
  component: React.ComponentType<{ c: DesignColors; s: DesignStyle }>;
}

const WEB_MOCKUPS: MockupItem[] = [
  { id: "hero", labelKey: "blog.designShowcase.web.hero", component: WebHero },
  { id: "dashboard", labelKey: "blog.designShowcase.web.dashboard", component: WebDashboard },
  { id: "pricing", labelKey: "blog.designShowcase.web.pricing", component: WebPricing },
  { id: "blog", labelKey: "blog.designShowcase.web.blog", component: WebBlog },
  { id: "contact", labelKey: "blog.designShowcase.web.contact", component: WebContact },
  { id: "product", labelKey: "blog.designShowcase.web.product", component: WebProduct },
  { id: "navbar", labelKey: "blog.designShowcase.web.navbar", component: WebNavbar },
  { id: "footer", labelKey: "blog.designShowcase.web.footer", component: WebFooter },
];

const MOBILE_MOCKUPS: MockupItem[] = [
  { id: "feed", labelKey: "blog.designShowcase.mobile.feed", component: MobileFeed },
  { id: "profile", labelKey: "blog.designShowcase.mobile.profile", component: MobileProfile },
  { id: "login", labelKey: "blog.designShowcase.mobile.login", component: MobileLogin },
  { id: "chat", labelKey: "blog.designShowcase.mobile.chat", component: MobileChat },
  { id: "map", labelKey: "blog.designShowcase.mobile.map", component: MobileMap },
  { id: "checkout", labelKey: "blog.designShowcase.mobile.checkout", component: MobileCheckout },
  { id: "player", labelKey: "blog.designShowcase.mobile.player", component: MobilePlayer },
  { id: "notifications", labelKey: "blog.designShowcase.mobile.notifications", component: MobileNotifications },
];

const COLOR_KEYS: { key: keyof DesignColors; labelKey: string }[] = [
  { key: "primary", labelKey: "blog.designShowcase.primary" },
  { key: "secondary", labelKey: "blog.designShowcase.secondary" },
  { key: "accent", labelKey: "blog.designShowcase.accent" },
  { key: "background", labelKey: "blog.designShowcase.background" },
  { key: "text", labelKey: "blog.designShowcase.text" },
];

export default function DesignShowcaseContent() {
  const { t } = useT();
  const [colors, setColors] = useState<DesignColors>(DEFAULT_COLORS);
  const [styleId, setStyleId] = useState<string>("standard");
  const [tab, setTab] = useState<Tab>("web");

  const activeStyle = STYLES.find((s) => s.id === styleId) ?? STYLES[1];
  const mockups = tab === "web" ? WEB_MOCKUPS : MOBILE_MOCKUPS;

  function updateColor(key: keyof DesignColors, value: string) {
    setColors((prev) => ({ ...prev, [key]: value }));
  }

  function applyPreset(preset: DesignColors) {
    setColors(preset);
  }

  function exportCSS() {
    const css = `:root {
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-accent: ${colors.accent};
  --color-background: ${colors.background};
  --color-text: ${colors.text};
}`;
    navigator.clipboard.writeText(css).catch(() => {});
  }

  return (
    <article className="max-w-3xl">
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
            <h3 className="text-sm font-semibold text-foreground">
              {t("blog.designShowcase.colors")}
            </h3>
            <button
              className="text-xs text-accent hover:text-accent-hover font-medium transition-colors"
              onClick={exportCSS}
              type="button"
            >
              {t("blog.designShowcase.exportCss")}
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {COLOR_KEYS.map(({ key, labelKey }) => (
              <label
                key={key}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] cursor-pointer"
              >
                <input
                  type="color"
                  value={colors[key]}
                  onChange={(e) => updateColor(key, e.target.value)}
                  className="w-5 h-5 rounded cursor-pointer border-0 p-0"
                />
                <span className="text-xs text-muted">{t(labelKey)}</span>
              </label>
            ))}
          </div>

          {/* Presets */}
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-black/8 dark:border-white/8 text-[11px] text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                onClick={() => applyPreset(p.colors)}
                type="button"
              >
                <span className="w-3 h-3 rounded-full border border-black/10 dark:border-white/10" style={{ background: `linear-gradient(135deg, ${p.colors.primary} 50%, ${p.colors.secondary} 50%)` }} />
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Style Selector */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">
            {t("blog.designShowcase.styleTitle")}
          </h3>
          <div className="flex gap-2">
            {STYLES.map((s) => (
              <button
                key={s.id}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                  styleId === s.id
                    ? "border-accent bg-accent/5 text-accent shadow-sm"
                    : "border-black/8 dark:border-white/8 text-muted hover:bg-black/5 dark:hover:bg-white/5"
                }`}
                onClick={() => setStyleId(s.id)}
                type="button"
              >
                <span
                  className={`w-4 h-4 rounded-sm border ${
                    styleId === s.id
                      ? "border-accent bg-accent/20"
                      : "border-black/15 dark:border-white/15"
                  }`}
                  style={{ borderRadius: s.rx > 12 ? "4px" : s.rx > 0 ? "2px" : "0" }}
                />
                {t(s.labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.04]">
          <button
            className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              tab === "web"
                ? "bg-white dark:bg-[#1d1d1f] text-foreground shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
            onClick={() => setTab("web")}
            type="button"
          >
            {t("blog.designShowcase.webTab")} (8)
          </button>
          <button
            className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              tab === "mobile"
                ? "bg-white dark:bg-[#1d1d1f] text-foreground shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
            onClick={() => setTab("mobile")}
            type="button"
          >
            {t("blog.designShowcase.mobileTab")} (8)
          </button>
        </div>

        {/* Mockup Grid */}
        <div className={`grid gap-4 ${tab === "web" ? "grid-cols-2" : "grid-cols-4"}`}>
          {mockups.map((m) => {
            const MockupComponent = m.component;

            return (
              <div key={m.id} className="space-y-2">
                <div className={`rounded-xl border border-black/8 dark:border-white/8 overflow-hidden bg-black/[0.02] dark:bg-white/[0.02] ${tab === "mobile" ? "p-2" : "p-3"}`}>
                  <MockupComponent c={colors} s={activeStyle} />
                </div>
                <p className="text-[11px] text-muted text-center font-medium">
                  {t(m.labelKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
