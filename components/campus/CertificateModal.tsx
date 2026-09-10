"use client";

import { useState, useCallback, useRef, useEffect } from "react";

import { campusService } from "@/services/campusService";
import type { CampusCertificate } from "@/services/campusService";
import { CertificateCard } from "./CertificateCard";

interface CertificateModalProps {
  guideSlug: string;
  guideTitle: string;
  onClose: () => void;
}

export function CertificateModal({
  guideSlug,
  guideTitle,
  onClose,
}: CertificateModalProps) {
  const [certificate, setCertificate] = useState<CampusCertificate | null>(null);
  const [userName, setUserName] = useState("Usuario");
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  // Generate or fetch certificate on mount
  useEffect(() => {
    (async () => {
      try {
        const result = await campusService.generateCertificate(guideSlug);
        setCertificate(result.certificate);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Error al generar certificado");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [guideSlug]);

  const handleDownloadPDF = useCallback(async () => {
    if (!certRef.current) return;
    setDownloading(true);

    try {
      // Dynamic import for html2canvas and jspdf
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`certificado-${guideSlug}.pdf`);
    } catch {
      setError("Error al descargar el PDF");
    } finally {
      setDownloading(false);
    }
  }, [guideSlug]);

  const handleShare = useCallback(() => {
    if (!certificate) return;
    const url = `${window.location.origin}/cert/${certificate.certificate_code}`;
    if (navigator.share) {
      navigator.share({
        title: `Certificado: ${guideTitle}`,
        text: `Obtuve el certificado de completación de "${guideTitle}" en Campus Graphify`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
    }
  }, [certificate, guideTitle]);

  return (
    <div
      aria-label="Certificado"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--bg-card)] rounded-2xl border border-[var(--border-default)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          aria-label="Cerrar"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[var(--bg-surface)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          type="button"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="p-6">
          {isLoading || isGenerating ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm text-[var(--text-secondary)]">
                {isGenerating ? "Generando certificado..." : "Cargando..."}
              </p>
            </div>
          ) : error ? (
            <div className="py-16 text-center">
              <span className="text-3xl mb-3 block" aria-hidden="true">⚠️</span>
              <p className="text-sm text-red-500">{error}</p>
              <button
                className="mt-4 px-4 py-2 rounded-lg text-xs font-semibold text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--border-hover)] transition-colors"
                type="button"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          ) : certificate ? (
            <div className="space-y-4">
              <div ref={certRef}>
                <CertificateCard
                  certificate={certificate}
                  guideTitle={guideTitle}
                  userName={userName}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3">
                <button
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--border-hover)] transition-colors disabled:opacity-50"
                  disabled={downloading}
                  type="button"
                  onClick={handleDownloadPDF}
                >
                  {downloading ? "Descargando..." : "📄 Descargar PDF"}
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--border-hover)] transition-colors"
                  type="button"
                  onClick={handleShare}
                >
                  🔗 Compartir
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
