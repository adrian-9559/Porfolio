"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import CampusLayout from "@/layouts/campus";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/hooks/useAuth";
import { useT } from "@/hooks/useT";
import { campusService } from "@/services/campusService";
import type { CampusCertificate } from "@/services/campusService";
import { CertificateCard } from "@/components/campus/CertificateCard";

export default function CertificadosPage() {
  const { t } = useT();
  const { isAuthenticated } = useAuth();
  const [certificates, setCertificates] = useState<CampusCertificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    campusService
      .getMyCertificates()
      .then((data) => setCertificates(data ?? []))
      .catch(() => setError(t("campus.certificates.error")))
      .finally(() => setIsLoading(false));
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <CampusLayout>
        <Head>
          <title>{`${t("campus.certificates.title")} | ${siteConfig.name}`}</title>
        </Head>
        <main className="max-w-4xl mx-auto px-4 py-10">
          <div className="py-20 text-center">
            <span className="text-4xl mb-4 block" aria-hidden="true">🔒</span>
            <h1 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              {t("campus.certificates.loginRequired")}
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              {t("campus.certificates.loginHint")}
            </p>
            <Link
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
              href="/campus/login"
            >
              {t("campus.certificates.loginButton")}
            </Link>
          </div>
        </main>
      </CampusLayout>
    );
  }

  return (
    <CampusLayout>
      <Head>
        <title>{`${t("campus.certificates.title")} | ${siteConfig.name}`}</title>
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-[var(--text-primary)]">
            {t("campus.certificates.title")}
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            {t("campus.certificates.subtitle")}
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-[var(--text-secondary)]">{t("campus.certificates.loading")}</p>
          </div>
        ) : error ? (
          <div className="py-20 text-center">
            <span className="text-3xl mb-3 block" aria-hidden="true">⚠️</span>
            <p className="text-sm text-red-500">{error}</p>
          </div>
        ) : certificates.length === 0 ? (
          <div className="py-20 text-center">
            <span className="text-4xl mb-4 block" aria-hidden="true">🎓</span>
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
              {t("campus.certificates.empty")}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              {t("campus.certificates.emptyHint")}
            </p>
            <Link
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
              href="/campus/cursos"
            >
              {t("campus.certificates.explore")}
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {certificates.map((cert) => (
              <div key={cert.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-[var(--text-primary)]">
                      {cert.guide_slug}
                    </h2>
                    <p className="text-xs text-[var(--text-muted)]">
                      {t("campus.certificates.issued", {
                        date: new Date(cert.issued_at).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }),
                      })}
                    </p>
                  </div>
                  <Link
                    className="text-xs font-bold text-[var(--accent)] hover:underline"
                    href={`/cert/${cert.certificate_code}`}
                    target="_blank"
                  >
                    {t("campus.certificates.verify")} →
                  </Link>
                </div>
                <CertificateCard certificate={cert} guideTitle={cert.guide_slug} />
              </div>
            ))}
          </div>
        )}
      </main>
    </CampusLayout>
  );
}
