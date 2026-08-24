"use client";
import { useState, useRef } from "react";
import { useT } from "@/hooks/useT";

interface ImageInfo {
  name: string;
  size: number;
  type: string;
  width: number;
  height: number;
  base64: string;
}

const ALLOWED = ["image/jpeg", "image/png", "image/gif", "image/svg+xml", "image/webp"];

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ImageToBase64Content() {
  const { t } = useT();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<ImageInfo | null>(null);
  const [decodeInput, setDecodeInput] = useState("");
  const [decodePreview, setDecodePreview] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const processFile = (file: File) => {
    setError("");
    if (!ALLOWED.includes(file.type)) {
      setError(t("blog.imageToBase64.invalidType"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const img = new Image();
      img.onload = () => {
        setImage({
          name: file.name,
          size: file.size,
          type: file.type,
          width: img.width,
          height: img.height,
          base64: result,
        });
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
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

  const handleDecode = () => {
    setError("");
    const trimmed = decodeInput.trim();
    if (!trimmed) return;
    try {
      const img = new Image();
      img.onload = () => setDecodePreview(trimmed);
      img.onerror = () => {
        setError(t("blog.imageToBase64.invalidBase64"));
        setDecodePreview("");
      };
      img.src = trimmed;
    } catch {
      setError(t("blog.imageToBase64.invalidBase64"));
    }
  };

  const copyBase64 = () => {
    if (!image) return;
    navigator.clipboard.writeText(image.base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const clear = () => {
    setImage(null);
    setDecodeInput("");
    setDecodePreview("");
    setError("");
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50">
            {t("blog.imageToBase64.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.imageToBase64.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.imageToBase64.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.imageToBase64.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Drop zone */}
        <div
          className={`relative w-full h-48 rounded-xl border-2 border-dashed transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 ${dragOver ? "border-red-400 bg-red-50/30 dark:bg-red-950/20" : "border-black/15 dark:border-white/15 hover:border-red-300 dark:hover:border-red-700"}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <svg className="w-8 h-8 text-[#aeaeb2] dark:text-[#636366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16V4m0 0L8 8m4-4l4 4" />
          </svg>
          <span className="text-sm text-[#6e6e73] dark:text-[#86868b]">
            {t("blog.imageToBase64.dropHere")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            JPG, PNG, GIF, SVG, WebP
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/svg+xml,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Image info */}
        {image && (
          <div className="space-y-3">
            <div className="flex items-center gap-4 text-xs text-[#6e6e73] dark:text-[#86868b]">
              <span>{image.name}</span>
              <span>{formatSize(image.size)}</span>
              <span>{image.width} × {image.height}</span>
              <span>{image.type.split("/")[1].toUpperCase()}</span>
            </div>

            {/* Preview */}
            <div className="p-3 rounded-xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40">
              <img
                src={image.base64}
                alt={image.name}
                className="max-h-48 rounded-lg object-contain mx-auto"
              />
            </div>

            {/* Base64 output */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                  Base64
                </p>
                <button
                  className="text-xs text-red-600 dark:text-red-400 hover:underline"
                  onClick={copyBase64}
                >
                  {copied ? t("blog.imageToBase64.copied") : t("blog.imageToBase64.copy")}
                </button>
              </div>
              <textarea
                readOnly
                className="w-full h-24 p-3 text-xs font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none"
                value={image.base64}
              />
            </div>
          </div>
        )}

        {/* Decode section */}
        <div className="pt-4 border-t border-black/8 dark:border-white/8 space-y-3">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            {t("blog.imageToBase64.decodeTitle")}
          </p>
          <textarea
            className="w-full h-24 p-3 text-xs font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:border-red-400 dark:focus:border-red-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
            placeholder={t("blog.imageToBase64.decodePlaceholder")}
            value={decodeInput}
            onChange={(e) => setDecodeInput(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-500 hover:bg-red-600 text-white transition-colors"
              onClick={handleDecode}
            >
              {t("blog.imageToBase64.decodeBtn")}
            </button>
            <button
              className="px-3 py-2 rounded-lg text-sm font-semibold bg-black/8 dark:bg-white/8 text-[#1d1d1f] dark:text-white hover:bg-black/12 dark:hover:bg-white/12 transition-colors"
              onClick={clear}
            >
              {t("blog.imageToBase64.clear")}
            </button>
          </div>
          {decodePreview && (
            <div className="p-3 rounded-xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40">
              <img
                src={decodePreview}
                alt="Decoded"
                className="max-h-48 rounded-lg object-contain mx-auto"
              />
            </div>
          )}
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-sm text-red-700 dark:text-red-400">
            ⚠️ {error}
          </div>
        )}

        {/* Info */}
        <div className="mt-6 p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/8 dark:border-white/8 space-y-1.5">
          <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
            {t("blog.imageToBase64.infoTitle")}
          </p>
          <ul className="text-xs text-[#6e6e73] dark:text-[#86868b] space-y-1">
            <li>• {t("blog.imageToBase64.infoItem1")}</li>
            <li>• {t("blog.imageToBase64.infoItem2")}</li>
            <li>• {t("blog.imageToBase64.infoItem3")}</li>
          </ul>
        </div>
      </div>
    </article>
  );
}
