"use client";
import { useState, useRef, useEffect } from "react";
import { useT } from "@/hooks/useT";

interface FaviconSize {
  size: number;
  label: string;
  dataUrl: string;
}

const FAVICON_SIZES: { size: number; label: string }[] = [
  { size: 16, label: "16×16" },
  { size: 32, label: "32×32" },
  { size: 180, label: "180×180 (Apple)" },
  { size: 192, label: "192×192" },
  { size: 512, label: "512×512" },
];

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

export default function FaviconGeneratorContent() {
  const { t } = useT();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sourcePreview, setSourcePreview] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [favicons, setFavicons] = useState<FaviconSize[]>([]);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const sourcePreviewUrlRef = useRef("");

  useEffect(() => {
    return () => {
      if (sourcePreviewUrlRef.current) URL.revokeObjectURL(sourcePreviewUrlRef.current);
    };
  }, []);

  const generateFavicons = async (file: File) => {
    setProcessing(true);
    setError("");
    setFavicons([]);

    try {
      const bitmap = await createImageBitmap(file);
      const results: FaviconSize[] = [];

      for (const { size, label } of FAVICON_SIZES) {
        const canvas = document.createElement("canvas");

        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(bitmap, 0, 0, size, size);

        const dataUrl = canvas.toDataURL("image/png");

        results.push({ size, label, dataUrl });
      }

      setFavicons(results);
    } catch {
      setError(t("blog.faviconGenerator.error"));
    } finally {
      setProcessing(false);
    }
  };

  const processFile = (file: File) => {
    setError("");
    setFavicons([]);
    if (!file.type.startsWith("image/")) {
      setError(t("blog.faviconGenerator.invalidType"));
      return;
    }
    setSourceName(file.name);
    if (sourcePreviewUrlRef.current) URL.revokeObjectURL(sourcePreviewUrlRef.current);
    const url = URL.createObjectURL(file);
    sourcePreviewUrlRef.current = url;
    setSourcePreview(url);
    generateFavicons(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const downloadSingle = (fav: FaviconSize) => {
    const a = document.createElement("a");

    a.href = fav.dataUrl;
    a.download = `favicon-${fav.size}x${fav.size}.png`;
    a.click();
  };

  const downloadAll = () => {
    favicons.forEach((fav, i) => {
      setTimeout(() => {
        const a = document.createElement("a");

        a.href = fav.dataUrl;
        a.download = `favicon-${fav.size}x${fav.size}.png`;
        a.click();
      }, i * 200);
    });
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50">
            {t("blog.faviconGenerator.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.faviconGenerator.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.faviconGenerator.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.faviconGenerator.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Drop zone */}
        <div
          className={`relative w-full h-48 rounded-xl border-2 border-dashed transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 ${dragOver ? "border-red-400 bg-red-50/30 dark:bg-red-950/20" : "border-black/15 dark:border-white/15 hover:border-red-300 dark:hover:border-red-700"}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <svg
            className="w-8 h-8 text-[#aeaeb2] dark:text-[#636366]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 16V4m0 0L8 8m4-4l4 4"
            />
          </svg>
          <span className="text-sm text-[#6e6e73] dark:text-[#86868b]">
            {t("blog.faviconGenerator.dropHere")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            PNG, JPG, WebP — min 512×512 recommended
          </span>
          <input
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            type="file"
            onChange={handleFileChange}
          />
        </div>

        {/* Source preview */}
        {sourcePreview && (
          <div className="p-3 rounded-xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40">
            <img
              alt={sourceName}
              className="max-h-32 rounded-lg object-contain mx-auto"
              src={sourcePreview}
            />
            <p className="text-xs text-center text-[#6e6e73] dark:text-[#86868b] mt-2">
              {sourceName}
            </p>
          </div>
        )}

        {/* Processing */}
        {processing && (
          <div className="flex items-center gap-2 text-sm text-[#6e6e73] dark:text-[#86868b]">
            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            {t("blog.faviconGenerator.processing")}
          </div>
        )}

        {/* Results */}
        {favicons.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {favicons.map((fav) => (
                <div
                  key={fav.size}
                  className="p-4 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 flex flex-col items-center gap-3"
                >
                  <div className="w-full aspect-square rounded-lg bg-black/[0.03] dark:bg-white/[0.03] flex items-center justify-center p-2">
                    <img
                      alt={fav.label}
                      className="max-w-full max-h-full"
                      src={fav.dataUrl}
                      style={{ imageRendering: fav.size <= 32 ? "pixelated" : "auto" }}
                    />
                  </div>
                  <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
                    {fav.label}
                  </p>
                  <button
                    className="w-full px-2 py-1.5 rounded-lg text-xs font-semibold bg-black/8 dark:bg-white/8 text-[#1d1d1f] dark:text-white hover:bg-black/12 dark:hover:bg-white/12 transition-colors"
                    onClick={() => downloadSingle(fav)}
                  >
                    {t("blog.faviconGenerator.download")}
                  </button>
                </div>
              ))}
            </div>

            <button
              className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors active:scale-[0.98]"
              onClick={downloadAll}
            >
              {t("blog.faviconGenerator.downloadAll")}
            </button>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-sm text-red-700 dark:text-red-400">
            ⚠️ {error}
          </div>
        )}

        {/* Info */}
        <div className="mt-6 p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/8 dark:border-white/8 space-y-1.5">
          <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
            {t("blog.faviconGenerator.infoTitle")}
          </p>
          <ul className="text-xs text-[#6e6e73] dark:text-[#86868b] space-y-1">
            <li>• {t("blog.faviconGenerator.infoItem1")}</li>
            <li>• {t("blog.faviconGenerator.infoItem2")}</li>
          </ul>
        </div>
      </div>
    </article>
  );
}