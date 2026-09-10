"use client";

import type { CampusCertificate } from "@/services/campusService";

interface CertificateCardProps {
  certificate: CampusCertificate;
  userName?: string;
  guideTitle?: string;
}

export function CertificateCard({
  certificate,
  userName = "Usuario",
  guideTitle = "Curso",
}: CertificateCardProps) {
  return (
    <div
      id="certificate-card"
      className="relative w-full aspect-[1.414/1] max-w-2xl mx-auto overflow-hidden rounded-2xl border-2 border-[var(--accent)]/30 bg-gradient-to-br from-white via-purple-50/50 to-violet-50 dark:from-[#0B0C24] dark:via-[#0B0C24] dark:to-[#120E43]"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {/* Decorative border */}
      <div className="absolute inset-2 rounded-xl border border-[var(--accent)]/20 pointer-events-none" />

      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[var(--accent)]/40 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[var(--accent)]/40 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[var(--accent)]/40 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[var(--accent)]/40 rounded-br-lg" />

      <div className="relative flex flex-col items-center justify-center h-full p-8 md:p-12 text-center">
        {/* Header */}
        <div className="mb-2">
          <span className="text-3xl" aria-hidden="true">🎓</span>
        </div>
        <h2
          className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-[var(--accent)] mb-1"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          Certificado de Completación
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent mb-4" />

        {/* Body */}
        <p className="text-[10px] md:text-xs text-[var(--text-muted)] mb-1" style={{ fontFamily: "system-ui, sans-serif" }}>
          Otorgado a
        </p>
        <p className="text-lg md:text-2xl font-bold text-[var(--text-primary)] mb-3">
          {userName}
        </p>
        <p className="text-[10px] md:text-xs text-[var(--text-muted)] mb-1" style={{ fontFamily: "system-ui, sans-serif" }}>
          Por completar con éxito
        </p>
        <p className="text-sm md:text-lg font-bold text-[var(--accent)] mb-4">
          {guideTitle}
        </p>

        {/* Stats */}
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

        {/* Footer */}
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
  );
}
