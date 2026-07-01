"use client";
import { Input, TextArea } from "@heroui/react";
import { useState } from "react";
import { useT } from "@/hooks/useT";

import { siteConfig } from "@/config/site";

export default function ContactForm() {
  const { t } = useT();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleEmail = () => {
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${t("contact.mailSubject")}&body=${t("contact.formBody")}`;
  };

  return (
    <div className="lg:col-span-2">
      <div className="p-8 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white">
            {t("contact.formTitle")}
          </h2>
          <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">
            {t("contact.formSubtitle")}
          </p>
        </div>

        {submitted && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-sm text-emerald-700 dark:text-emerald-400 font-medium">
            {t("contact.formSuccess")}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {t("contact.name")}
              </label>
              <Input required className="w-full" placeholder={t("contact.namePlaceholder")} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {t("contact.email")}
              </label>
              <Input
                required
                className="w-full"
                placeholder={t("contact.emailPlaceholder")}
                type="email"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("contact.subject")}
            </label>
            <Input
              required
              className="w-full"
              placeholder={t("contact.subjectPlaceholder")}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("contact.message")}
            </label>
            <TextArea
              required
              className="w-full min-h-[120px]"
              placeholder={t("contact.messagePlaceholder")}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              className="apple-btn-primary flex-1 justify-center text-sm py-3"
              type="submit"
            >
              {t("contact.sendBtn")}
            </button>
            <button
              className="apple-btn-secondary flex-1 justify-center text-sm py-3 inline-flex items-center gap-2"
              type="button"
              onClick={handleEmail}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              {t("contact.openEmailBtn")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
