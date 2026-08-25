"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { useT } from "@/hooks/useT";

interface CompressedResult {
  originalSize: number;
  compressedSize: number;
  compressedBlob: Blob;
  compressedUrl: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ImageCompressorContent() {
  const { t } = useT();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourcePreview, setSourcePreview] = useState("");
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState<"webp" | "jpeg" | "png">("webp");
  const [result, setResult] = useState<CompressedResult | null>(null);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const sourcePreviewUrlRef = useRef("");
  const resultUrlRef = useRef("");

  useEffect(() => {
    return () => {
      if (sourcePreviewUrlRef.current) URL.revokeObjectURL(sourcePreviewUrlRef.current);
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, []);

  const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

  const compress = useCallback(
    async (file: File) => {
      setProcessing(true);
      setError("");
      setResult(null);

      try {
        const bitmap = await createImageBitmap(file);
        const canvas = document.createElement("canvas");

        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(bitmap, 0, 0);

        const mimeType =
          format === "webp" ? "image/webp" : format === "jpeg" ? "image/jpeg" : "image/png";
        const q = format === "png" ? undefined : quality / 100;

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => {
              if (b) resolve(b);
              else reject(new Error("Failed to compress"));
            },
            mimeType,
            q,
          );
        });

        if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
        const url = URL.createObjectURL(blob);
        resultUrlRef.current = url;
        setResult({
          originalSize: file.size,
          compressedSize: blob.size,
          compressedBlob: blob,
          compressedUrl: url,
        });
      } catch {
        setError(t("blog.imageCompressor.error"));
      } finally {
        setProcessing(false);
      }
    },
    [format, quality, t],
  );

  const processFile = (file: File) => {
    setError("");
    setResult(null);
    if (!ALLOWED.includes(file.type)) {
      setError(t("blog.imageCompressor.invalidType"));
      return;
    }
    setSourceFile(file);
    if (sourcePreviewUrlRef.current) URL.revokeObjectURL(sourcePreviewUrlRef.current);
    const url = URL.createObjectURL(file);
    sourcePreviewUrlRef.current = url;
    setSourcePreview(url);
    compress(file);
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

  const handleQualityChange = (v: number) => {
    setQuality(v);
    if (sourceFile) compress(sourceFile);
  };

  const handleFormatChange = (f: "webp" | "jpeg" | "png") => {
    setFormat(f);
    if (sourceFile) compress(sourceFile);
  };

  const download = () => {
    if (!result) return;
    const ext = format === "jpeg" ? "jpg" : format;
    const a = document.createElement("a");
    a.href = result.compressedUrl;
    a.download = `compressed.${ext}`;
    a.click();
  };

  const reduction = result
    ? Math.round((1 - result.compressedSize / result.originalSize) * 100)
    : 0;

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50">
            {t("blog.imageCompressor.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.imageCompressor.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.imageCompressor.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.imageCompressor.desc")}
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
            {t("blog.imageCompressor.dropHere")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">JPG, PNG, WebP</span>
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
          <div className="p-3 rounded-xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40">
            <img
              alt={sourceFile?.name}
              className="max-h-40 rounded-lg object-contain mx-auto"
              src={sourcePreview}
            />
            <p className="text-xs text-center text-[#6e6e73] dark:text-[#86868b] mt-2">
              {sourceFile?.name} · {formatSize(sourceFile?.size ?? 0)}
            </p>
          </div>
        )}

        {/* Controls */}
        {sourceFile && (
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 space-y-5">
            {/* Quality slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                  {t("blog.imageCompressor.quality")}
                </p>
                <span className="text-sm font-bold text-red-600 dark:text-red-400 tabular-nums">
                  {quality}%
                </span>
              </div>
              <input
                className="w-full h-1.5 appearance-none bg-black/10 dark:bg-white/15 rounded-full outline-none cursor-pointer accent-red-500"
                max={100}
                min={1}
                type="range"
                value={quality}
                onChange={(e) => handleQualityChange(Number(e.target.value))}
              />
              <div className="flex justify-between text-xs text-[#aeaeb2] dark:text-[#636366]">
                <span>1%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Format selector */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                {t("blog.imageCompressor.format")}
              </p>
              <div className="flex gap-2">
                {(["webp", "jpeg", "png"] as const).map((f) => (
                  <button
                    key={f}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      format === f
                        ? "bg-red-500 text-white"
                        : "bg-black/8 dark:bg-white/8 text-[#1d1d1f] dark:text-white hover:bg-black/12 dark:hover:bg-white/12"
                    }`}
                    onClick={() => handleFormatChange(f)}
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Processing */}
        {processing && (
          <div className="flex items-center gap-2 text-sm text-[#6e6e73] dark:text-[#86868b]">
            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            {t("blog.imageCompressor.processing")}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] text-center">
                <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mb-1">
                  {t("blog.imageCompressor.original")}
                </p>
                <p className="text-sm font-bold text-[#1d1d1f] dark:text-white">
                  {formatSize(result.originalSize)}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] text-center">
                <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mb-1">
                  {t("blog.imageCompressor.compressed")}
                </p>
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  {formatSize(result.compressedSize)}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] text-center">
                <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mb-1">
                  {t("blog.imageCompressor.reduction")}
                </p>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {reduction}%
                </p>
              </div>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Compressed"
              className="max-h-40 rounded-lg object-contain mx-auto"
              src={result.compressedUrl}
            />

            <button
              className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors active:scale-[0.98]"
              onClick={download}
            >
              {t("blog.imageCompressor.download")}
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