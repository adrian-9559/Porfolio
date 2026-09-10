import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { campusService } from "@/services/campusService";
import type { CampusCertificate } from "@/services/campusService";
import { IconCross, IconGraduation } from "@/components/ui/Icons";

interface CertPageProps {
  certificate: (CampusCertificate & { userName: string }) | null;
  error: string | null;
}

export default function CertPage({ certificate, error }: CertPageProps) {
  return (
    <>
      <Head>
        <title>
          {certificate
            ? `Certificado: ${certificate.guide_slug} | ${siteConfig.name}`
            : `Certificado no encontrado | ${siteConfig.name}`}
        </title>
        <meta
          name="description"
          content={
            certificate
              ? `Certificado de completación de ${certificate.guide_slug} otorgado a ${certificate.userName}`
              : "Certificado no encontrado"
          }
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {error ? (
            <div className="text-center py-16">
              <span className="text-5xl mb-4 block text-red-500" aria-hidden="true"><IconCross className="w-12 h-12 mx-auto" /></span>
              <h1 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                Certificado no encontrado
              </h1>
              <p className="text-sm text-[var(--text-secondary)] mb-6">{error}</p>
              <Link
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[var(--accent)] text-white hover:opacity-90 transition-opacity no-underline"
                href="/campus"
              >
                Volver a Campus
              </Link>
            </div>
          ) : certificate ? (
            <div className="space-y-6">
              {/* Verification badge */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm font-bold mb-4">
                  <span aria-hidden="true">✓</span>
                  Certificado Verificado
                </div>
                <h1 className="text-2xl font-black text-[var(--text-primary)]">
                  Certificado de Completación
                </h1>
              </div>

              {/* Certificate card */}
              <div className="relative w-full aspect-[1.414/1] overflow-hidden rounded-2xl border-2 border-[var(--accent)]/30 bg-gradient-to-br from-white via-purple-50/50 to-violet-50 dark:from-[#0B0C24] dark:via-[#0B0C24] dark:to-[#120E43]">
                {/* Decorative border */}
                <div className="absolute inset-2 rounded-xl border border-[var(--accent)]/20 pointer-events-none" />

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[var(--accent)]/40 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[var(--accent)]/40 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[var(--accent)]/40 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[var(--accent)]/40 rounded-br-lg" />

                <div className="relative flex flex-col items-center justify-center h-full p-8 md:p-12 text-center" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  <div className="mb-2">
                    <span className="text-3xl text-[var(--accent)]" aria-hidden="true"><IconGraduation className="w-8 h-8 mx-auto" /></span>
                  </div>
                  <h2
                    className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-[var(--accent)] mb-1"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Certificado de Completación
                  </h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent mb-4" />

                  <p className="text-[10px] md:text-xs text-[var(--text-muted)] mb-1" style={{ fontFamily: "system-ui, sans-serif" }}>
                    Otorgado a
                  </p>
                  <p className="text-lg md:text-2xl font-bold text-[var(--text-primary)] mb-3">
                    {certificate.userName}
                  </p>
                  <p className="text-[10px] md:text-xs text-[var(--text-muted)] mb-1" style={{ fontFamily: "system-ui, sans-serif" }}>
                    Por completar con éxito
                  </p>
                  <p className="text-sm md:text-lg font-bold text-[var(--accent)] mb-4">
                    {certificate.guide_slug}
                  </p>

                  <div className="flex items-center gap-4 md:gap-6 mb-4 text-center">
                    <div>
                      <p className="text-lg md:text-xl font-bold text-[var(--text-primary)]">
                        {certificate.tutorial_slugs.length}
                      </p>
                      <p className="text-[9px] md:text-[10px] text-[var(--text-muted)]" style={{ fontFamily: "system-ui, sans-serif" }}>
                        Tutoriales
                      </p>
                    </div>
                    <div className="w-px h-8 bg-[var(--border-default)]" />
                    <div>
                      <p className="text-lg md:text-xl font-bold text-[var(--text-primary)]">
                        {certificate.exercises_passed}/{certificate.total_exercises}
                      </p>
                      <p className="text-[9px] md:text-[10px] text-[var(--text-muted)]" style={{ fontFamily: "system-ui, sans-serif" }}>
                        Ejercicios
                      </p>
                    </div>
                    <div className="w-px h-8 bg-[var(--border-default)]" />
                    <div>
                      <p className="text-lg md:text-xl font-bold text-[var(--text-primary)]">
                        {certificate.avg_score}%
                      </p>
                      <p className="text-[9px] md:text-[10px] text-[var(--text-muted)]" style={{ fontFamily: "system-ui, sans-serif" }}>
                        Promedio
                      </p>
                    </div>
                  </div>

                  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent mb-3" />
                  <p className="text-[9px] md:text-[10px] text-[var(--text-muted)] mb-1" style={{ fontFamily: "system-ui, sans-serif" }}>
                    Fecha:{" "}
                    {new Date(certificate.issued_at).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-[9px] md:text-[10px] text-[var(--text-muted)]" style={{ fontFamily: "system-ui, sans-serif" }}>
                    Código:{" "}
                    <span className="font-mono font-bold text-[var(--accent)]">
                      {certificate.certificate_code}
                    </span>
                  </p>
                </div>
              </div>

              {/* Footer info */}
              <p className="text-center text-xs text-[var(--text-muted)]">
                Este certificado fue generado automáticamente por Campus Graphify.
              </p>
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<CertPageProps> = async (ctx) => {
  const code = ctx.params?.code as string | undefined;

  if (!code) {
    return { props: { certificate: null, error: "Código de certificado no proporcionado" } };
  }

  try {
    const certificate = await campusService.verifyCertificate(code);
    return { props: { certificate, error: null } };
  } catch {
    return { props: { certificate: null, error: "Certificado no encontrado o inválido" } };
  }
};
