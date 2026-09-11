"use client";

import { useState, useRef, useCallback, useEffect } from "react";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function BackgroundRemoverContent() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourcePreview, setSourcePreview] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [modelLoaded, setModelLoaded] = useState(false);
  const sourcePreviewUrlRef = useRef("");
  const resultUrlRef = useRef("");

  useEffect(() => {
    return () => {
      if (sourcePreviewUrlRef.current)
        URL.revokeObjectURL(sourcePreviewUrlRef.current);
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, []);

  const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

  const removeBackground = useCallback(async (file: File) => {
    setProcessing(true);
    setError("");
    setResultUrl("");
    setProgress(0);

    try {
      const { removeBackground: removeBg } = await import(
        "@imgly/background-removal"
      );

      setProgress(10);

      const bitmap = await createImageBitmap(file);

      setOriginalWidth(bitmap.width);
      setOriginalHeight(bitmap.height);

      setProgress(20);

      const blob = await removeBg(file, {
        progress: (key: string, current: number, total: number) => {
          if (key === "compute:inference" && total > 0) {
            setProgress(40 + Math.round((current / total) * 55));
          }
        },
      });

      setProgress(100);

      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
      const url = URL.createObjectURL(blob);

      resultUrlRef.current = url;
      setResultUrl(url);
      setModelLoaded(true);
    } catch {
      setError("Error al procesar la imagen. Intenta con otro archivo.");
    } finally {
      setProcessing(false);
    }
  }, []);

  const processFile = (file: File) => {
    setError("");
    setResultUrl("");

    if (!ALLOWED.includes(file.type)) {
      setError("Formato no soportado. Usa JPG, PNG o WebP.");

      return;
    }

    setSourceFile(file);

    if (sourcePreviewUrlRef.current)
      URL.revokeObjectURL(sourcePreviewUrlRef.current);
    const url = URL.createObjectURL(file);

    sourcePreviewUrlRef.current = url;
    setSourcePreview(url);
    removeBackground(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];

    if (file) processFile(file);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) processFile(file);
  };

  const download = () => {
    if (!resultUrl || !sourceFile) return;
    const a = document.createElement("a");

    a.href = resultUrl;
    const name = sourceFile.name.replace(/\.[^.]+$/, "");

    a.download = `${name}-sin-fondo.png`;
    a.click();
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50">
            Herramienta
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            100% en tu navegador
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          Eliminar fondo de imagen
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          Elimina el fondo de tus imágenes con IA directamente en el navegador.
          Tus imágenes nunca salen de tu dispositivo. Descarga en PNG con
          transparencia a la resolución original.
        </p>
      </div>

      <div className="space-y-4">
        {/* Drop zone */}
        <div
          className={`relative w-full h-48 rounded-xl border-2 border-dashed transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 ${dragOver ? "border-violet-400 bg-violet-50/30 dark:bg-violet-950/20" : "border-black/15 dark:border-white/15 hover:border-violet-300 dark:hover:border-violet-700"}`}
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onDragLeave={() => setDragOver(false)}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDrop={handleDrop}
          onKeyDown={handleKeyDown}
        >
          <svg
            className="w-8 h-8 text-[#aeaeb2] dark:text-[#636366]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 16V4m0 0L8 8m4-4l4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
            />
          </svg>
          <span className="text-sm text-[#6e6e73] dark:text-[#86868b]">
            Suelta tu imagen aquí
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            JPG, PNG, WebP — hasta 25 MB
          </span>
          <input
            ref={fileInputRef}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            type="file"
            onChange={handleFileChange}
          />
        </div>

        {/* Source preview */}
        {sourcePreview && (
          <div className="p-3 rounded-xl bg-violet-50/60 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800/40">
            {/* eslint-disable-next-line jsx-a11y/alt-text -- dynamic alt from filename */}
            <img
              className="max-h-40 rounded-lg object-contain mx-auto"
              src={sourcePreview}
            />
            <p className="text-xs text-center text-[#6e6e73] dark:text-[#86868b] mt-2">
              {sourceFile?.name} · {formatSize(sourceFile?.size ?? 0)}
              {originalWidth > 0 && ` · ${originalWidth}×${originalHeight}px`}
            </p>
          </div>
        )}

        {/* Processing */}
        {processing && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-[#6e6e73] dark:text-[#86868b]">
              <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
              {!modelLoaded
                ? "Descargando modelo de IA (~45 MB, primera vez)..."
                : "Procesando imagen..."}
            </div>
            <div className="w-full h-2 bg-black/10 dark:bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
              {progress < 30
                ? "Cargando modelo..."
                : progress < 95
                  ? "Eliminando fondo..."
                  : "Finalizando..."}
            </p>
          </div>
        )}

        {/* Result */}
        {resultUrl && (
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] text-center">
                <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mb-1">
                  Original
                </p>
                <p className="text-sm font-bold text-[#1d1d1f] dark:text-white">
                  {formatSize(sourceFile?.size ?? 0)}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] text-center">
                <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mb-1">
                  Resolución
                </p>
                <p className="text-sm font-bold text-violet-600 dark:text-violet-400">
                  {originalWidth}×{originalHeight}
                </p>
              </div>
            </div>

            {/* Checkerboard preview to show transparency */}
            <div
              className="rounded-lg overflow-hidden mx-auto"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                backgroundSize: "16px 16px",
                backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
              }}
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text -- static alt */}
              <img
                className="max-h-64 rounded-lg object-contain mx-auto"
                src={resultUrl}
              />
            </div>

            <button
              className="w-full py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-semibold text-sm transition-colors active:scale-[0.98]"
              onClick={download}
            >
              Descargar PNG sin fondo
            </button>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-sm text-red-700 dark:text-red-400">
            ⚠️ {error}
          </div>
        )}
      </div>
    </article>
  );
}
