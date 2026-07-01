"use client";

import type { Selection } from "@heroui/react";

import { Dropdown, Label } from "@heroui/react";
import { useCallback } from "react";

import { useT } from "@/hooks/useT";
import { useLocaleStore } from "@/store/localeStore";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { t, locale } = useT();
  const setLocale = useLocaleStore((s) => s.setLocale);
  const hydrated = useLocaleStore((s) => s.hydrated);

  const selectedKeys = new Set([locale]);

  const onSelectionChange = useCallback(
    (keys: Selection) => {
      const value = Array.from(keys)[0] as string | undefined;

      if (value === "es" || value === "en") {
        setLocale(value);
      }
    },
    [setLocale],
  );

  if (!hydrated) {
    return <div aria-hidden className="w-8 h-8" />;
  }

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <span
          aria-label={t("common.language")}
          className={`w-8 h-8 rounded-lg inline-flex items-center justify-center text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/8 hover:text-[#1d1d1f] dark:hover:text-white transition-all duration-200 text-[11px] font-semibold uppercase tracking-wider cursor-pointer ${className ?? ""}`}
        >
          {locale}
        </span>
      </Dropdown.Trigger>
      <Dropdown.Popover className="min-w-[140px]">
        <Dropdown.Menu
          selectedKeys={selectedKeys}
          selectionMode="single"
          onSelectionChange={onSelectionChange}
        >
          <Dropdown.Item id="es" textValue="Español">
            <Dropdown.ItemIndicator />
            <Label>{t("common.spanish")}</Label>
          </Dropdown.Item>
          <Dropdown.Item id="en" textValue="English">
            <Dropdown.ItemIndicator />
            <Label>{t("common.english")}</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
