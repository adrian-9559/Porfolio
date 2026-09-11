"use client";

import { useState, useRef, useCallback, useEffect } from "react";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type Mode = "ai" | "manual";
type AiModel = "isnet" | "isnet_fp16" | "isnet_quint8";

const MODEL_OPTIONS: { value: AiModel; label: string; desc: string }[] = [
  {
    value: "isnet",
    label: "Alta calidad",
    desc: "Precisión máxima, más lento",
  },
  {
    value: "isnet_fp16",
    label: "Equilibrado",
    desc: "Buena calidad y velocidad",
  },
  { value: "isnet_quint8", label: "Rápido", desc: "Menor tamaño, más veloz" },
];

function colorDistance(
  r1: number,
  g1: number,
  b1: number,
  r2: number,
  g2: number,
  b2: number,
): number {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

function floodFillRemove(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  startX: number,
  startY: number,
  tolerance: number,
): void {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const visited = new Uint8Array(width * height);
  const stack = [startX, startY];
  const idx = (startY * width + startX) * 4;
  const tr = data[idx];
  const tg = data[idx + 1];
  const tb = data[idx + 2];

  while (stack.length > 0) {
    const y = stack.pop()!;
    const x = stack.pop()!;

    if (x < 0 || x >= width || y < 0 || y >= height) continue;

    const pi = y * width + x;

    if (visited[pi]) continue;
    visited[pi] = 1;

    const i = pi * 4;

    if (
      colorDistance(data[i], data[i + 1], data[i + 2], tr, tg, tb) > tolerance
    )
      continue;

    data[i + 3] = 0;

    stack.push(x + 1, y);
    stack.push(x - 1, y);
    stack.push(x, y + 1);
    stack.push(x, y - 1);
  }

  ctx.putImageData(imageData, 0, 0);
}

export default function BackgroundRemoverContent() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
  const [mode, setMode] = useState<Mode>("ai");
  const [aiModel, setAiModel] = useState<AiModel>("isnet_fp16");
  const [sensitivity, setSensitivity] = useState(50);
  const [manualTolerance, setManualTolerance] = useState(30);
  const [hasResult, setHasResult] = useState(false);
  const sourcePreviewUrlRef = useRef("");
  const resultUrlRef = useRef("");
  const lastManualPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    return () => {
      if (sourcePreviewUrlRef.current)
        URL.revokeObjectURL(sourcePreviewUrlRef.current);
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, []);

  const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

  const applySensitivity = useCallback(
    (blob: Blob, sens: number): Promise<Blob> => {
      return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
          const canvas = document.createElement("canvas");

          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d")!;

          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          const threshold = (sens / 100) * 255;

          for (let i = 3; i < data.length; i += 4) {
            if (data[i] < threshold) {
              data[i] = 0;
            }
          }

          ctx.putImageData(imageData, 0, 0);
          canvas.toBlob((b) => resolve(b ?? blob), "image/png");
        };

        img.src = URL.createObjectURL(blob);
      });
    },
    [],
  );

  const removeBackground = useCallback(
    async (file: File) => {
      setProcessing(true);
      setError("");
      setResultUrl("");
      setProgress(0);
      setHasResult(false);

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
          model: aiModel,
          progress: (key: string, current: number, total: number) => {
            if (key === "compute:inference" && total > 0) {
              setProgress(40 + Math.round((current / total) * 55));
            }
          },
        });

        setProgress(95);

        const finalBlob = await applySensitivity(blob, sensitivity);

        setProgress(100);

        if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
        const url = URL.createObjectURL(finalBlob);

        resultUrlRef.current = url;
        setResultUrl(url);
        setHasResult(true);
        setModelLoaded(true);
      } catch {
        setError("Error al procesar la imagen. Intenta con otro archivo.");
      } finally {
        setProcessing(false);
      }
    },
    [aiModel, sensitivity, applySensitivity],
  );

  const removeBackgroundManual = useCallback(
    (file: File, tolerance: number) => {
      setProcessing(true);
      setError("");
      setResultUrl("");
      setHasResult(false);

      const img = new Image();

      img.onload = () => {
        setOriginalWidth(img.naturalWidth);
        setOriginalHeight(img.naturalHeight);

        const canvas = document.createElement("canvas");

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d")!;

        ctx.drawImage(img, 0, 0);

        const cornerColors = [
          { x: 0, y: 0 },
          { x: img.naturalWidth - 1, y: 0 },
          { x: 0, y: img.naturalHeight - 1 },
          { x: img.naturalWidth - 1, y: img.naturalHeight - 1 },
        ];

        for (const corner of cornerColors) {
          floodFillRemove(
            ctx,
            canvas.width,
            canvas.height,
            corner.x,
            corner.y,
            tolerance,
          );
        }

        canvas.toBlob((b) => {
          if (!b) {
            setError("Error al procesar.");

            return;
          }

          if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
          const url = URL.createObjectURL(b);

          resultUrlRef.current = url;
          setResultUrl(url);
          setHasResult(true);
          setProcessing(false);
        }, "image/png");
      };

      img.onerror = () => {
        setError("Error al cargar la imagen.");
        setProcessing(false);
      };
      img.src = URL.createObjectURL(file);
    },
    [],
  );

  const processFile = (file: File) => {
    setError("");
    setResultUrl("");
    setHasResult(false);

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

    if (mode === "manual") {
      removeBackgroundManual(file, manualTolerance);
    }
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

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setResultUrl("");
    setHasResult(false);
  };

  const handleManualClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !sourceFile) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    lastManualPointRef.current = { x, y };
    setProcessing(true);

    const img = new Image();

    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;

      ctx.drawImage(img, 0, 0);
      floodFillRemove(ctx, canvas.width, canvas.height, x, y, manualTolerance);

      canvas.toBlob((b) => {
        if (!b) return;
        if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
        const url = URL.createObjectURL(b);

        resultUrlRef.current = url;
        setResultUrl(url);
        setHasResult(true);
        setProcessing(false);
      }, "image/png");
    };

    img.src = URL.createObjectURL(sourceFile);
  };

  const rerunManual = useCallback(() => {
    if (!sourceFile || !lastManualPointRef.current) return;
    const { x, y } = lastManualPointRef.current;

    setProcessing(true);

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;

      ctx.drawImage(img, 0, 0);
      floodFillRemove(ctx, canvas.width, canvas.height, x, y, manualTolerance);

      canvas.toBlob((b) => {
        if (!b) return;
        if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
        const url = URL.createObjectURL(b);

        resultUrlRef.current = url;
        setResultUrl(url);
        setHasResult(true);
        setProcessing(false);
      }, "image/png");
    };

    img.src = URL.createObjectURL(sourceFile);
  }, [sourceFile, manualTolerance]);

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
          Elimina el fondo de tus imágenes con IA o manualmente. Tus imágenes
          nunca salen de tu dispositivo. Descarga en PNG con transparencia a la
          resolución original.
        </p>
      </div>

      <div className="space-y-4">
        {/* Mode selector */}
        <div className="flex gap-2">
          <button
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              mode === "ai"
                ? "bg-violet-500 text-white"
                : "bg-black/8 dark:bg-white/8 text-[#1d1d1f] dark:text-white hover:bg-black/12 dark:hover:bg-white/12"
            }`}
            onClick={() => handleModeChange("ai")}
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                />
              </svg>
              IA automática
            </span>
          </button>
          <button
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              mode === "manual"
                ? "bg-violet-500 text-white"
                : "bg-black/8 dark:bg-white/8 text-[#1d1d1f] dark:text-white hover:bg-black/12 dark:hover:bg-white/12"
            }`}
            onClick={() => handleModeChange("manual")}
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                />
              </svg>
              Manual (color)
            </span>
          </button>
        </div>

        {/* AI mode options */}
        {mode === "ai" && (
          <div className="p-4 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                Modelo
              </p>
              <div className="flex gap-2">
                {MODEL_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    className={`flex-1 p-2.5 rounded-lg text-xs font-medium transition-colors ${
                      aiModel === opt.value
                        ? "bg-violet-500 text-white"
                        : "bg-black/5 dark:bg-white/5 text-[#1d1d1f] dark:text-white hover:bg-black/10 dark:hover:bg-white/10"
                    }`}
                    onClick={() => setAiModel(opt.value)}
                  >
                    <div>{opt.label}</div>
                    <div className="text-[10px] opacity-70 mt-0.5">
                      {opt.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {hasResult && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                    Sensibilidad
                  </p>
                  <span className="text-xs font-bold text-violet-600 dark:text-violet-400 tabular-nums">
                    {sensitivity}%
                  </span>
                </div>
                <p className="text-[11px] text-[#aeaeb2] dark:text-[#636366]">
                  Menos = más conservador (mantiene más). Más = más agresivo
                  (recorta más).
                </p>
                <input
                  className="w-full h-1.5 appearance-none bg-black/10 dark:bg-white/15 rounded-full outline-none cursor-pointer accent-violet-500"
                  max={100}
                  min={0}
                  type="range"
                  value={sensitivity}
                  onChange={(e) => setSensitivity(Number(e.target.value))}
                />
                <div className="flex justify-between text-[10px] text-[#aeaeb2] dark:text-[#636366]">
                  <span>Conservador</span>
                  <span>Agresivo</span>
                </div>
              </div>
            )}

            {sourceFile && !processing && (
              <button
                className="w-full py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-semibold text-sm transition-colors active:scale-[0.98]"
                onClick={() => removeBackground(sourceFile)}
              >
                {hasResult ? "Re-procesar" : "Procesar"}
              </button>
            )}
          </div>
        )}

        {/* Manual mode options */}
        {mode === "manual" && (
          <div className="p-4 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 space-y-3">
            <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
              Tolerancia de color
            </p>
            <div className="flex items-center gap-3">
              <input
                className="flex-1 h-1.5 appearance-none bg-black/10 dark:bg-white/15 rounded-full outline-none cursor-pointer accent-violet-500"
                max={100}
                min={5}
                type="range"
                value={manualTolerance}
                onChange={(e) => setManualTolerance(Number(e.target.value))}
                onMouseUp={rerunManual}
                onTouchEnd={rerunManual}
              />
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400 tabular-nums w-8 text-right">
                {manualTolerance}
              </span>
            </div>
            <p className="text-[11px] text-[#aeaeb2] dark:text-[#636366]">
              Haz clic en el color de fondo que quieres eliminar. Mayor
              tolerancia = elimina más tonos similares.
            </p>
          </div>
        )}

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
            {mode === "manual"
              ? "Sube una imagen y haz clic en el fondo a eliminar"
              : "Suelta tu imagen aquí"}
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

        {/* Source preview + manual canvas */}
        {sourcePreview && mode === "manual" && (
          <div className="p-3 rounded-xl bg-violet-50/60 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800/40">
            <p className="text-xs text-center text-[#6e6e73] dark:text-[#86868b] mb-2">
              {sourceFile?.name} · {formatSize(sourceFile?.size ?? 0)}
              {originalWidth > 0 && ` · ${originalWidth}×${originalHeight}px`}
            </p>
            {processing ? (
              <div className="flex items-center justify-center gap-2 py-8">
                <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-[#6e6e73] dark:text-[#86868b]">
                  Procesando...
                </span>
              </div>
            ) : (
              <canvas
                ref={canvasRef}
                className="max-h-64 mx-auto rounded-lg object-contain cursor-crosshair"
                style={{ maxWidth: "100%" }}
                onClick={handleManualClick}
              />
            )}
            {hasResult && (
              <p className="text-[11px] text-center text-violet-500 mt-2">
                Haz clic en otro color de fondo para seguir eliminando
              </p>
            )}
          </div>
        )}

        {/* Source preview (AI mode) */}
        {sourcePreview && mode === "ai" && (
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
        {processing && mode === "ai" && (
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

            {/* Checkerboard preview */}
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
