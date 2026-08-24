"use client";
import { Input, TextArea } from "@heroui/react";
import { useState } from "react";

import { useT } from "@/hooks/useT";
import { contactService } from "@/services/notificationService";
import { ApiError } from "@/services/apiClient";
import { siteConfig } from "@/config/site";

export default function ContactForm() {
  const { t } = useT();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const fullMessage = subject ? `[${subject}]\n\n${message}` : message;
      await contactService.submit({ name, email, message: fullMessage });
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof ApiError ? err.message : "Error al enviar el mensaje");
    }
  };

  const handleEmail = () => {
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${t("contact.mailSubject")}&body=${t("contact.formBody")}`;
  };

  return (
    <div className="lg:col-span-2">
      <div className="group relative p-8 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-pink-500 opacity-80" />
        <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-br from-violet-500/10 to-pink-500/5 blur-2xl group-hover:opacity-20 transition-opacity" />

        <div className="relative mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white">
                {t("contact.formTitle")}
              </h2>
              <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">
                {t("contact.formSubtitle")}
              </p>
            </div>
          </div>
        </div>

        {status === "success" && (
          <div className="relative mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-sm text-emerald-700 dark:text-emerald-400 font-medium">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
              {t("contact.formSuccess")}
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="relative mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 text-sm text-red-700 dark:text-red-400 font-medium">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
              {errorMsg}
            </div>
          </div>
        )}

        <form className="relative space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {t("contact.name")}
              </label>
              <Input
                required
                className="w-full"
                disabled={status === "loading"}
                placeholder={t("contact.namePlaceholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {t("contact.email")}
              </label>
              <Input
                required
                className="w-full"
                disabled={status === "loading"}
                placeholder={t("contact.emailPlaceholder")}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              disabled={status === "loading"}
              placeholder={t("contact.subjectPlaceholder")}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("contact.message")}
            </label>
            <TextArea
              required
              className="w-full min-h-[120px]"
              disabled={status === "loading"}
              placeholder={t("contact.messagePlaceholder")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              className="flex-1 justify-center text-sm py-3 px-6 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold hover:from-violet-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={status === "loading"}
              type="submit"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Enviando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                  {t("contact.sendBtn")}
                </span>
              )}
            </button>
            <button
              className="flex-1 justify-center text-sm py-3 px-6 rounded-full bg-black/5 dark:bg-white/10 text-[#1d1d1f] dark:text-white font-semibold hover:bg-black/10 dark:hover:bg-white/15 transition-all duration-300 inline-flex items-center gap-2"
              type="button"
              onClick={handleEmail}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
              {t("contact.openEmailBtn")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
