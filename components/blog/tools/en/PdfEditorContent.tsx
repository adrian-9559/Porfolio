"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import * as pdfjs from "pdfjs-dist";

const PDFJS_VERSION = "6.1.200";
const WORKER = `https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

type Annotation = {
  type: "text" | "rect" | "circle" | "line";
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  color: string;
  fontSize: number;
  fillColor: string;
};

type PageMeta = { index: number; rotation: number };

const COLORS = [
  "#1d1d1f",
  "#e74c3c",
  "#e67e22",
  "#f1c40f",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#ffffff",
];
const FONT_SIZES = [10, 12, 14, 16, 18, 24, 32, 48];
const PREVIEW_SCALE = 0.6;
const EDIT_SCALE = 1.2;

function hexToRgb(hex: string) {
  const c = hex.replace("#", "");

  return {
    r: parseInt(c.slice(0, 2), 16) / 255,
    g: parseInt(c.slice(2, 4), 16) / 255,
    b: parseInt(c.slice(4, 6), 16) / 255,
  };
}

let uidCounter = 0;

function uid() {
  return ++uidCounter;
}

export default function PdfEditorContent() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState<PageMeta[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [editPreviews, setEditPreviews] = useState<string[]>([]);
  const [pdfPageSizes, setPdfPageSizes] = useState<{ w: number; h: number }[]>(
    [],
  );
  const [originalBytes, setOriginalBytes] = useState<ArrayBuffer | null>(null);
  const [error, setError] = useState("");
  const [mergeFiles, setMergeFiles] = useState<File[]>([]);
  const [editPageIdx, setEditPageIdx] = useState<number | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[][]>([]);
  const [tool, setTool] = useState<
    "select" | "text" | "rect" | "circle" | "line"
  >("select");
  const [selAnn, setSelAnn] = useState<{ p: number; a: number } | null>(null);
  const [color, setColor] = useState("#1d1d1f");
  const [fillColor, setFillColor] = useState("transparent");
  const [fontSize, setFontSize] = useState(16);
  const [editText, setEditText] = useState("");
  const [drag, setDrag] = useState<{
    type: "move" | "create";
    pi: number;
    ai: number | null;
    startX: number;
    startY: number;
    annX: number;
    annY: number;
  } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const mergeRef = useRef<HTMLInputElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = WORKER;
  }, []);

  const load = useCallback(async (bytes: ArrayBuffer) => {
    setLoading(true);
    setError("");
    try {
      const doc = await PDFDocument.load(bytes);
      const n = doc.getPageCount();

      setOriginalBytes(bytes);
      setPages(
        Array.from({ length: n }, (_, i) => ({ index: i, rotation: 0 })),
      );
      setAnnotations(Array.from({ length: n }, () => []));
      setEditPageIdx(null);

      const loadingTask = pdfjs.getDocument({ data: bytes.slice(0) });
      const pdf = await loadingTask.promise;
      const urls: string[] = [];
      const editUrls: string[] = [];
      const sizes: { w: number; h: number }[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const vp = page.getViewport({ scale: PREVIEW_SCALE });
        const canvas = document.createElement("canvas");

        canvas.width = vp.width;
        canvas.height = vp.height;
        await page.render({ canvas, viewport: vp }).promise;
        urls.push(canvas.toDataURL());

        const evp = page.getViewport({ scale: EDIT_SCALE });
        const ec = document.createElement("canvas");

        ec.width = evp.width;
        ec.height = evp.height;
        await page.render({ canvas: ec, viewport: evp }).promise;
        editUrls.push(ec.toDataURL());

        const orig = page.getViewport({ scale: 1 });

        sizes.push({ w: orig.width, h: orig.height });
      }
      setPreviews(urls);
      setEditPreviews(editUrls);
      setPdfPageSizes(sizes);
    } catch {
      setError(
        "Could not load the PDF. Make sure it is a valid PDF file.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFile = (f: File) => {
    if (f.type !== "application/pdf") {
      setError("Only PDF files are accepted.");

      return;
    }
    setFile(f);
    setMergeFiles([]);
    f.arrayBuffer().then(load);
  };

  const rotatePage = (idx: number, dir: 1 | -1) => {
    setPages((prev) =>
      prev.map((p, i) =>
        i === idx ? { ...p, rotation: (p.rotation + dir * 90 + 360) % 360 } : p,
      ),
    );
  };

  const removePage = (idx: number) => {
    setPages((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
    setEditPreviews((prev) => prev.filter((_, i) => i !== idx));
    setAnnotations((prev) => prev.filter((_, i) => i !== idx));
  };

  const movePage = (idx: number, dir: -1 | 1) => {
    const to = idx + dir;

    if (to < 0 || to >= pages.length) return;
    setPages((prev) => {
      const n = [...prev];

      [n[idx], n[to]] = [n[to], n[idx]];

      return n;
    });
    setPreviews((prev) => {
      const n = [...prev];

      [n[idx], n[to]] = [n[to], n[idx]];

      return n;
    });
    setEditPreviews((prev) => {
      const n = [...prev];

      [n[idx], n[to]] = [n[to], n[idx]];

      return n;
    });
    setAnnotations((prev) => {
      const n = [...prev];

      [n[idx], n[to]] = [n[to], n[idx]];

      return n;
    });
  };

  const handleMerge = async () => {
    if (mergeFiles.length === 0 || !originalBytes) return;
    setLoading(true);
    setError("");
    try {
      const merged = await PDFDocument.create();
      const allBytes = [
        originalBytes,
        ...(await Promise.all(mergeFiles.map((f) => f.arrayBuffer()))),
      ];
      const allDocs = await Promise.all(
        allBytes.map((b) => PDFDocument.load(b)),
      );

      for (const doc of allDocs) {
        const copied = await merged.copyPages(doc, doc.getPageIndices());

        copied.forEach((p) => merged.addPage(p));
      }
      const bytes = await merged.save();
      const mergedFile = new File([bytes], "merged.pdf", {
        type: "application/pdf",
      });

      setFile(mergedFile);
      await load(bytes);
    } catch {
      setError("Error merging PDFs.");
    } finally {
      setLoading(false);
    }
  };

  const download = async () => {
    if (!originalBytes || pages.length === 0) return;
    setLoading(true);
    setError("");
    try {
      const source = await PDFDocument.load(originalBytes.slice(0));
      const out = await PDFDocument.create();
      const helv = await out.embedFont("Helvetica");

      for (let pi = 0; pi < pages.length; pi++) {
        const p = pages[pi];
        const [copied] = await out.copyPages(source, [p.index]);

        if (p.rotation !== 0) {
          const orig = copied.getRotation();

          copied.setRotation({
            ...orig,
            angle: (orig.angle + p.rotation) % 360,
          });
        }
        out.addPage(copied);

        const pageAnns = annotations[pi] || [];
        const pdfW = pdfPageSizes[p.index]?.w || copied.getWidth();
        const pdfH = pdfPageSizes[p.index]?.h || copied.getHeight();

        for (const ann of pageAnns) {
          switch (ann.type) {
            case "text": {
              const col = hexToRgb(ann.color);

              copied.drawText(ann.content, {
                x: ann.x,
                y: pdfH - ann.y - ann.fontSize,
                size: ann.fontSize,
                color: rgb(col.r, col.g, col.b),
              });
              break;
            }
            case "rect": {
              const stroke = hexToRgb(ann.color);
              const opts: Record<string, unknown> = {
                x: ann.x,
                y: pdfH - ann.y - ann.height,
                width: ann.width,
                height: ann.height,
                borderColor: rgb(stroke.r, stroke.g, stroke.b),
                borderWidth: 1.5,
              };

              if (ann.fillColor && ann.fillColor !== "transparent") {
                const fill = hexToRgb(ann.fillColor);

                opts.color = rgb(fill.r, fill.g, fill.b);
              }
              copied.drawRectangle(opts);
              break;
            }
            case "circle": {
              const stroke = hexToRgb(ann.color);
              const cx = ann.x + ann.width / 2;
              const cy = pdfH - ann.y - ann.height / 2;
              const opts: Record<string, unknown> = {
                x: cx,
                y: cy,
                xScale: ann.width / 2,
                yScale: ann.height / 2,
                borderColor: rgb(stroke.r, stroke.g, stroke.b),
                borderWidth: 1.5,
              };

              if (ann.fillColor && ann.fillColor !== "transparent") {
                const fill = hexToRgb(ann.fillColor);

                opts.color = rgb(fill.r, fill.g, fill.b);
              }
              copied.drawEllipse(opts);
              break;
            }
            case "line": {
              const col = hexToRgb(ann.color);

              copied.drawLine({
                start: { x: ann.x, y: pdfH - ann.y },
                end: { x: ann.x + ann.width, y: pdfH - ann.y - ann.height },
                color: rgb(col.r, col.g, col.b),
                thickness: 1.5,
              });
              break;
            }
          }
        }
      }

      const bytes = await out.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = file!.name.replace(/\.pdf$/i, "") + "-edited.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Error generating PDF.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPages([]);
    setPreviews([]);
    setEditPreviews([]);
    setOriginalBytes(null);
    setMergeFiles([]);
    setEditPageIdx(null);
    setAnnotations([]);
    setTool("select");
    setSelAnn(null);
  };

  // ── Edit helpers ──

  const addAnnotation = (pi: number, ann: Annotation) => {
    setAnnotations((prev) => {
      const next = [...prev];

      next[pi] = [...next[pi], ann];

      return next;
    });
  };

  const updateAnnotation = (
    pi: number,
    ai: number,
    upd: Partial<Annotation>,
  ) => {
    setAnnotations((prev) => {
      const next = [...prev];

      next[pi] = next[pi].map((a, i) => (i === ai ? { ...a, ...upd } : a));

      return next;
    });
  };

  const deleteAnnotation = (pi: number, ai: number) => {
    setAnnotations((prev) => {
      const next = [...prev];

      next[pi] = next[pi].filter((_, i) => i !== ai);

      return next;
    });
    setSelAnn(null);
  };

  const getScale = useCallback(() => {
    if (editPageIdx === null) return 1;
    const rect = pageRef.current?.getBoundingClientRect();

    if (!rect) return 1;

    return (pdfPageSizes[editPageIdx]?.w || 612) / rect.width;
  }, [editPageIdx, pdfPageSizes]);

  const getCoords = (e: React.MouseEvent) => {
    const rect = pageRef.current?.getBoundingClientRect();

    if (!rect) return null;
    const s = getScale();

    return { x: (e.clientX - rect.left) * s, y: (e.clientY - rect.top) * s };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (editPageIdx === null) return;
    const coords = getCoords(e);

    if (!coords) return;
    const pid = editPageIdx;

    if (tool === "select") {
      e.stopPropagation();

      // Check if clicked on an annotation — handled by individual annotation handlers
      return;
    }

    if (tool === "text") {
      const id = uid();

      addAnnotation(pid, {
        type: "text",
        x: coords.x,
        y: coords.y,
        width: 140,
        height: 32,
        content: `Text ${id}`,
        color,
        fontSize,
        fillColor: "transparent",
      });

      return;
    }

    // Shapes: start drag to create
    const ann: Annotation =
      tool === "rect"
        ? {
            type: "rect",
            x: coords.x,
            y: coords.y,
            width: 0,
            height: 0,
            content: "",
            color,
            fontSize: 12,
            fillColor,
          }
        : tool === "circle"
          ? {
              type: "circle",
              x: coords.x,
              y: coords.y,
              width: 0,
              height: 0,
              content: "",
              color,
              fontSize: 12,
              fillColor,
            }
          : {
              type: "line",
              x: coords.x,
              y: coords.y,
              width: 0,
              height: 0,
              content: "",
              color,
              fontSize: 12,
              fillColor: "transparent",
            };
    const ai = annotations[pid].length;

    addAnnotation(pid, ann);
    setSelAnn({ p: pid, a: ai });
    setDrag({
      type: "create",
      pi: pid,
      ai,
      startX: coords.x,
      startY: coords.y,
      annX: coords.x,
      annY: coords.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!drag) return;
    const coords = getCoords(e);

    if (!coords) return;

    if (drag.type === "create" && drag.ai !== null) {
      const dx = coords.x - drag.startX;
      const dy = coords.y - drag.startY;
      const x = dx < 0 ? coords.x : drag.startX;
      const y = dy < 0 ? coords.y : drag.startY;

      updateAnnotation(drag.pi, drag.ai, {
        x,
        y,
        width: Math.abs(dx),
        height: Math.abs(dy),
      });
    } else if (drag.type === "move" && drag.ai !== null) {
      const dx = coords.x - drag.startX;
      const dy = coords.y - drag.startY;

      updateAnnotation(drag.pi, drag.ai, {
        x: drag.annX + dx,
        y: drag.annY + dy,
      });
    }
  };

  const handleMouseUp = () => {
    if (drag?.type === "create" && drag.ai !== null) {
      const ann = annotations[drag.pi]?.[drag.ai];

      if (ann && ann.width < 5 && ann.height < 5) {
        deleteAnnotation(drag.pi, drag.ai);
      }
    }
    setDrag(null);
  };

  const handleAnnMouseDown = (pi: number, ai: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tool !== "select") return;
    setSelAnn({ p: pi, a: ai });
    const coords = getCoords(e);

    if (!coords) return;
    setDrag({
      type: "move",
      pi,
      ai,
      startX: coords.x,
      startY: coords.y,
      annX: annotations[pi][ai].x,
      annY: annotations[pi][ai].y,
    });
  };

  // ── Render helpers ──

  const renderAnn = (ann: Annotation, pi: number, ai: number) => {
    const pageSize = pdfPageSizes[pi];
    const displayW = pageRef.current?.getBoundingClientRect().width || 300;
    const scale = displayW / (pageSize?.w || 612);
    const isSelected = selAnn?.p === pi && selAnn?.a === ai;

    const style: React.CSSProperties = {
      position: "absolute",
      left: ann.x * scale,
      top: ann.y * scale,
      width:
        ann.type === "line"
          ? Math.max(ann.width * scale, 2)
          : ann.width * scale,
      height:
        ann.type === "line"
          ? Math.max(ann.height * scale, 2)
          : ann.height * scale,
      cursor: tool === "select" ? "grab" : "crosshair",
      outline: isSelected ? "2px solid #f59e0b" : undefined,
      outlineOffset: 1,
      borderRadius: ann.type === "circle" ? "50%" : 4,
      background:
        ann.fillColor && ann.fillColor !== "transparent"
          ? ann.fillColor
          : ann.type === "text"
            ? "rgba(255,255,255,0.85)"
            : undefined,
      border:
        ann.type !== "text" && ann.type !== "circle"
          ? `1.5px solid ${ann.color}`
          : undefined,
      boxShadow: isSelected ? "0 0 0 3px rgba(245,158,11,0.25)" : undefined,
      touchAction: "none",
    };

    if (ann.type === "line") {
      style.transform = `rotate(${Math.atan2(ann.height, ann.width)}rad)`;
      style.transformOrigin = "0 0";
      style.border = "none";
      style.background = ann.color;
      style.height = 2;
      style.borderRadius = 1;
    }

    if (ann.type === "text") {
      style.border = isSelected ? `1.5px dashed ${ann.color}` : undefined;
    }

    return (
      <div
        key={ai}
        style={style}
        onMouseDown={(e) => handleAnnMouseDown(pi, ai, e)}
      >
        {ann.type === "text" && (
          <input
            style={{
              width: "100%",
              height: "100%",
              background: "transparent",
              border: "none",
              fontSize: ann.fontSize * scale,
              color: ann.color,
              fontFamily: "sans-serif",
              outline: "none",
              padding: 2,
              cursor: "text",
            }}
            value={ann.content}
            onChange={(e) =>
              updateAnnotation(pi, ai, { content: e.target.value })
            }
          />
        )}
        {isSelected && ann.type !== "line" && (
          <div
            style={{
              position: "absolute",
              right: -5,
              bottom: -5,
              width: 10,
              height: 10,
              background: "#f59e0b",
              borderRadius: "50%",
              cursor: "nwse-resize",
            }}
          />
        )}
      </div>
    );
  };

  // ── Edit page view ──

  if (editPageIdx !== null && editPreviews[editPageIdx]) {
    const pageAnns = annotations[editPageIdx] || [];
    const sel = selAnn?.p === editPageIdx ? selAnn.a : null;

    return (
      <article className="max-w-5xl">
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
              Editor
            </span>
            <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
              Free to use
            </span>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[#1d1d1f] dark:text-white">
                Page {editPageIdx + 1} of {pages.length}
              </h1>
              <div className="flex items-center gap-1">
                <button
                  className="p-1 rounded text-xs text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white disabled:opacity-30 transition-colors"
                  disabled={editPageIdx === 0}
                  title="Previous page"
                  onClick={() => {
                    setEditPageIdx(editPageIdx - 1);
                    setSelAnn(null);
                    setTool("select");
                  }}
                >
                  ◀
                </button>
                <button
                  className="p-1 rounded text-xs text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white disabled:opacity-30 transition-colors"
                  disabled={editPageIdx >= pages.length - 1}
                  title="Next page"
                  onClick={() => {
                    setEditPageIdx(editPageIdx + 1);
                    setSelAnn(null);
                    setTool("select");
                  }}
                >
                  ▶
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors disabled:opacity-40"
                disabled={loading}
                onClick={download}
              >
                Download PDF
              </button>
              <button
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/8 dark:bg-white/8 text-[#1d1d1f] dark:text-white hover:bg-black/12 dark:hover:bg-white/12 transition-colors"
                onClick={() => {
                  setEditPageIdx(null);
                  setSelAnn(null);
                }}
              >
                ← Back
              </button>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 mb-4">
          {(["select", "text", "rect", "circle", "line"] as const).map((t) => (
            <button
              key={t}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${tool === t ? "bg-white dark:bg-[#1c1c22] text-amber-600 dark:text-amber-400 shadow-sm" : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"}`}
              onClick={() => {
                setTool(t);
                setSelAnn(null);
              }}
            >
              {t === "select"
                ? "🖱 Move"
                : t === "text"
                  ? "T Text"
                  : t === "rect"
                    ? "▬ Rect"
                    : t === "circle"
                      ? "● Circle"
                      : "╱ Line"}
            </button>
          ))}
          <span className="w-px h-5 bg-black/8 dark:bg-white/8 mx-1" />
          {COLORS.map((c) => (
            <button
              key={c}
              className={`w-5 h-5 rounded-full border-2 transition-all ${color === c ? "border-amber-500 scale-110" : "border-transparent"}`}
              style={{
                background: c,
                outline: c === "#ffffff" ? "1px solid #ddd" : undefined,
              }}
              onClick={() => setColor(c)}
            />
          ))}
          <span className="w-px h-5 bg-black/8 dark:bg-white/8 mx-1" />
          {FONT_SIZES.map((s) => (
            <button
              key={s}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${fontSize === s ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"}`}
              onClick={() => setFontSize(s)}
            >
              {s}
            </button>
          ))}
          <span className="w-px h-5 bg-black/8 dark:bg-white/8 mx-1" />
          <div className="flex items-center gap-1 text-[10px] text-[#6e6e73] dark:text-[#86868b]">
            <span>Fill:</span>
            {["transparent", ...COLORS].slice(0, 5).map((c) => (
              <button
                key={c}
                className={`w-4 h-4 rounded-sm border ${fillColor === c ? "border-amber-500" : "border-black/20 dark:border-white/20"}`}
                style={{
                  background:
                    c === "transparent"
                      ? "repeating-linear-gradient(45deg,transparent,transparent 2px,rgba(0,0,0,0.1) 2px,rgba(0,0,0,0.1) 4px)"
                      : c,
                }}
                onClick={() => setFillColor(c)}
              />
            ))}
          </div>
        </div>

        {/* Page + overlay */}
        <div
          ref={pageRef}
          className="relative rounded-2xl overflow-hidden border border-black/8 dark:border-white/8 bg-white dark:bg-[#1c1c22] shadow-lg cursor-crosshair select-none"
          style={{ maxWidth: 800 }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={`Page ${editPageIdx + 1}`}
            className="w-full h-auto block pointer-events-none"
            draggable={false}
            src={editPreviews[editPageIdx]}
          />
          <div className="absolute inset-0">
            {pageAnns.map((ann, ai) => renderAnn(ann, editPageIdx, ai))}
          </div>
          {tool !== "select" && (
            <div className="absolute inset-0 border-2 border-dashed border-amber-400/30 rounded-2xl pointer-events-none" />
          )}
        </div>

        {/* Selected annotation panel */}
        {sel !== null && pageAnns[sel] && (
          <div className="mt-4 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/8 dark:border-white/8 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {pageAnns[sel].type === "text"
                ? "Text"
                : pageAnns[sel].type === "rect"
                  ? "Rectangle"
                  : pageAnns[sel].type === "circle"
                    ? "Circle"
                    : "Line"}
            </span>
            {pageAnns[sel].type === "text" && (
              <input
                className="flex-1 min-w-[120px] p-1.5 text-xs rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white"
                placeholder="Type the text..."
                value={pageAnns[sel].content}
                onChange={(e) =>
                  updateAnnotation(editPageIdx, sel, {
                    content: e.target.value,
                  })
                }
              />
            )}
            {COLORS.map((c) => (
              <button
                key={c}
                className={`w-4 h-4 rounded-full border-2 ${pageAnns[sel].color === c ? "border-amber-500" : "border-transparent"}`}
                style={{
                  background: c,
                  outline: c === "#ffffff" ? "1px solid #ddd" : undefined,
                }}
                onClick={() => updateAnnotation(editPageIdx, sel, { color: c })}
              />
            ))}
            <button
              className="px-2 py-1 rounded-lg text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors ml-auto"
              onClick={() => deleteAnnotation(editPageIdx, sel)}
            >
              Delete
            </button>
          </div>
        )}
      </article>
    );
  }

  // ── Grid (list pages) view ──

  return (
    <article className="max-w-5xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
            Tool
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            Free to use
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          PDF Editor
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          Upload a PDF to edit its pages: add text, shapes, rotation, and
          more. All in the browser.
        </p>
      </div>

      <div className="space-y-6">
        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {!file && (
          <div
            className="flex flex-col items-center justify-center gap-3 p-12 rounded-2xl border-2 border-dashed border-black/12 dark:border-white/12 hover:border-amber-400 dark:hover:border-amber-500 bg-black/[0.02] dark:bg-white/[0.02] cursor-pointer transition-colors"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files[0];

              if (f) handleFile(f);
            }}
          >
            <svg
              className="w-10 h-10 text-[#aeaeb2] dark:text-[#636366]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">
              Drop a PDF here or{" "}
              <span className="text-amber-600 dark:text-amber-400 font-semibold">
                select a file
              </span>
            </p>
            <input
              ref={inputRef}
              accept="application/pdf"
              className="hidden"
              type="file"
              onChange={(e) => {
                const f = e.target.files?.[0];

                if (f) handleFile(f);
              }}
            />
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center gap-2 py-8">
            <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-[#6e6e73] dark:text-[#86868b]">
              Processing PDF…
            </span>
          </div>
        )}

        {file && !loading && (
          <>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40">
                  <svg
                    className="w-5 h-5 text-amber-600 dark:text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                    {file.name}
                  </p>
                  <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                    {pages.length} page{pages.length !== 1 ? "s" : ""} — click
                    to edit
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  onClick={reset}
                >
                  Remove
                </button>
                <button
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors disabled:opacity-40"
                  disabled={pages.length === 0 || loading}
                  onClick={download}
                >
                  Download PDF
                </button>
              </div>
            </div>

            {/* Merge section */}
            <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/8 dark:border-white/8 space-y-3">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                Merge with another PDF
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/8 dark:bg-white/8 text-[#1d1d1f] dark:text-white hover:bg-black/12 dark:hover:bg-white/12 transition-colors"
                  onClick={() => mergeRef.current?.click()}
                >
                  + Add PDF
                </button>
                <input
                  ref={mergeRef}
                  accept="application/pdf"
                  className="hidden"
                  type="file"
                  onChange={(e) => {
                    const f = e.target.files?.[0];

                    if (f) setMergeFiles((prev) => [...prev, f]);
                  }}
                />
                {mergeFiles.length > 0 && (
                  <>
                    <span className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                      {mergeFiles.length} selected
                    </span>
                    <button
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors disabled:opacity-40"
                      disabled={loading}
                      onClick={handleMerge}
                    >
                      Merge
                    </button>
                  </>
                )}
              </div>
              {mergeFiles.length > 0 && (
                <div className="space-y-1">
                  {mergeFiles.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs text-[#6e6e73] dark:text-[#86868b]"
                    >
                      <span>{f.name}</span>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() =>
                          setMergeFiles((prev) =>
                            prev.filter((_, j) => j !== i),
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Page grid */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                Pages ({pages.length})
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {pages.map((p, i) => (
                  <div
                    key={i}
                    className="group relative rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#1c1c22] overflow-hidden cursor-pointer hover:border-amber-400 dark:hover:border-amber-500 transition-colors"
                    onClick={() => {
                      setEditPageIdx(i);
                      setSelAnn(null);
                    }}
                  >
                    <div className="aspect-[3/4] flex items-center justify-center bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden">
                      {previews[i] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          alt={`Page ${i + 1}`}
                          className="max-w-full max-h-full object-contain transition-transform"
                          src={previews[i]}
                          style={{ transform: `rotate(${p.rotation}deg)` }}
                        />
                      ) : (
                        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                          Loading…
                        </span>
                      )}
                    </div>
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-black/50 text-[10px] text-white font-semibold">
                      {i + 1}
                    </div>
                    {annotations[i]?.length > 0 && (
                      <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded-md bg-amber-500/80 text-[10px] text-white font-semibold">
                        {annotations[i].length}
                      </div>
                    )}
                    {p.rotation !== 0 && (
                      <div
                        className="absolute top-1 right-1 px-1.5 py-0.5 rounded-md bg-amber-500/80 text-[10px] text-white font-semibold"
                        style={{
                          top: annotations[i]?.length > 0 ? 22 : undefined,
                        }}
                      >
                        {p.rotation}°
                      </div>
                    )}
                    <div
                      className="flex items-center justify-center gap-0.5 p-1 bg-black/[0.03] dark:bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="p-1 rounded text-[10px] text-[#6e6e73] dark:text-[#86868b] hover:text-amber-600 dark:hover:text-amber-400 hover:bg-black/8 dark:hover:bg-white/8 transition-colors"
                        title="Rotate 90° left"
                        onClick={() => rotatePage(i, -1)}
                      >
                        ↺
                      </button>
                      <button
                        className="p-1 rounded text-[10px] text-[#6e6e73] dark:text-[#86868b] hover:text-amber-600 dark:hover:text-amber-400 hover:bg-black/8 dark:hover:bg-white/8 transition-colors"
                        title="Rotate 90° right"
                        onClick={() => rotatePage(i, 1)}
                      >
                        ↻
                      </button>
                      <button
                        className="p-1 rounded text-[10px] text-[#6e6e73] dark:text-[#86868b] hover:text-amber-600 dark:hover:text-amber-400 hover:bg-black/8 dark:hover:bg-white/8 transition-colors disabled:opacity-30"
                        disabled={i === 0}
                        title="Move up"
                        onClick={() => movePage(i, -1)}
                      >
                        ↑
                      </button>
                      <button
                        className="p-1 rounded text-[10px] text-[#6e6e73] dark:text-[#86868b] hover:text-amber-600 dark:hover:text-amber-400 hover:bg-black/8 dark:hover:bg-white/8 transition-colors disabled:opacity-30"
                        disabled={i === pages.length - 1}
                        title="Move down"
                        onClick={() => movePage(i, 1)}
                      >
                        ↓
                      </button>
                      <button
                        className="p-1 rounded text-[10px] text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        title="Delete page"
                        onClick={() => removePage(i)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
