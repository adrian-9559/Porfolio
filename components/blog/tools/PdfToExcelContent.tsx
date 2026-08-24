"use client";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import * as pdfjs from "pdfjs-dist";
import { useT } from "@/hooks/useT";

const WORKER = "/pdf.worker.min.mjs";

type ParsedRow = string[];

export default function PdfToExcelContent() {
  const { t } = useT();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [rawText, setRawText] = useState("");
  const [copied, setCopied] = useState(false);
  const [delimiter, setDelimiter] = useState<"auto" | "tab" | "comma" | "pipe">("auto");
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [lastClicked, setLastClicked] = useState<{ r: number; c: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = WORKER;
  }, []);

  const parseTextToRows = useCallback(
    (text: string, delim: typeof delimiter): ParsedRow[] => {
      const lines = text.split("\n").filter((l) => l.trim());

      if (lines.length === 0) return [];

      const detectDelimiter = (firstLines: string[]): string => {
        const samples = firstLines.slice(0, 5);
        const counts = { tab: 0, comma: 0, pipe: 0, semicolon: 0 };

        for (const line of samples) {
          counts.tab += (line.match(/\t/g) || []).length;
          counts.comma += (line.match(/,/g) || []).length;
          counts.pipe += (line.match(/\|/g) || []).length;
          counts.semicolon += (line.match(/;/g) || []).length;
        }

        const max = Math.max(counts.tab, counts.comma, counts.pipe, counts.semicolon);

        if (max < 2) return "\t";
        if (counts.tab === max) return "\t";
        if (counts.pipe === max) return "|";
        if (counts.semicolon === max) return ";";
        return ",";
      };

      const d =
        delim === "auto"
          ? detectDelimiter(lines)
          : delim === "tab"
            ? "\t"
            : delim === "pipe"
              ? "|"
              : ",";

      return lines.map((line) => {
        const cells: string[] = [];
        let current = "";
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
          const ch = line[i];

          if (ch === '"') {
            inQuotes = !inQuotes;
          } else if (ch === d && !inQuotes) {
            cells.push(current.trim());
            current = "";
          } else {
            current += ch;
          }
        }
        cells.push(current.trim());

        return cells;
      });
    },
    [],
  );

  const load = useCallback(
    async (bytes: ArrayBuffer) => {
      setLoading(true);
      setError("");
      try {
        const pdf = await pdfjs.getDocument({ data: bytes.slice(0) }).promise;
        const allText: string[] = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageLines: string[] = [];
          let lastY = -1;

          for (const item of content.items) {
            if ("str" in item) {
              const y = item.transform[5];

              if (lastY !== -1 && Math.abs(y - lastY) > 5) {
                pageLines.push("\n");
              }
              pageLines.push(item.str);
              lastY = y;
            }
          }

          allText.push(pageLines.join(""));
        }

        const fullText = allText.join("\n\n");

        setRawText(fullText);
        const parsed = parseTextToRows(fullText, delimiter);

        setRows(parsed);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);

        console.error("PDF to Excel error:", e);
        setError(`${t("blog.pdfToExcel.loadError")}\n${msg}`);
      } finally {
        setLoading(false);
      }
    },
    [t, parseTextToRows, delimiter],
  );

  const handleFile = (f: File) => {
    const isPdf =
      f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setError(t("blog.pdfToExcel.onlyPdf"));

      return;
    }
    setFile(f);
    setError("");
    setRows([]);
    setRawText("");
    setSelectedCells(new Set());
    setLastClicked(null);
    f.arrayBuffer().then(load);
  };

  const handleDelimiterChange = (d: typeof delimiter) => {
    setDelimiter(d);
    if (rawText) {
      setRows(parseTextToRows(rawText, d));
    }
  };

  const paddedRows = useMemo(() => {
    const maxCols = rows.reduce((max, r) => Math.max(max, r.length), 0);

    return rows.map((r) => {
      const padded = [...r];

      while (padded.length < maxCols) padded.push("");

      return padded;
    });
  }, [rows]);

  const maxCols = paddedRows[0]?.length ?? 0;

  const cellKey = (r: number, c: number) => `${r}:${c}`;

  const handleCellClick = (r: number, c: number, e: React.MouseEvent) => {
    if (e.shiftKey && lastClicked) {
      const rMin = Math.min(lastClicked.r, r);
      const rMax = Math.max(lastClicked.r, r);
      const cMin = Math.min(lastClicked.c, c);
      const cMax = Math.max(lastClicked.c, c);
      const newSel = new Set(selectedCells);

      for (let ri = rMin; ri <= rMax; ri++) {
        for (let ci = cMin; ci <= cMax; ci++) {
          newSel.add(cellKey(ri, ci));
        }
      }
      setSelectedCells(newSel);
    } else if (e.metaKey || e.ctrlKey) {
      const key = cellKey(r, c);
      const newSel = new Set(selectedCells);

      if (newSel.has(key)) {
        newSel.delete(key);
      } else {
        newSel.add(key);
      }
      setSelectedCells(newSel);
      setLastClicked({ r, c });
    } else {
      setSelectedCells(new Set([cellKey(r, c)]));
      setLastClicked({ r, c });
    }
  };

  const selectRow = (r: number) => {
    const newSel = new Set<string>();

    for (let ci = 0; ci < maxCols; ci++) {
      newSel.add(cellKey(r, ci));
    }
    setSelectedCells(newSel);
    setLastClicked({ r, c: 0 });
  };

  const selectAll = () => {
    const newSel = new Set<string>();

    for (let ri = 0; ri < paddedRows.length; ri++) {
      for (let ci = 0; ci < maxCols; ci++) {
        newSel.add(cellKey(ri, ci));
      }
    }
    setSelectedCells(newSel);
  };

  const copySelected = useCallback(() => {
    if (selectedCells.size === 0) return;

    const cellArray = Array.from(selectedCells).map((k) => {
      const [r, c] = k.split(":").map(Number);

      return { r, c };
    });
    const rMin = Math.min(...cellArray.map((c) => c.r));
    const rMax = Math.max(...cellArray.map((c) => c.r));
    const cMin = Math.min(...cellArray.map((c) => c.c));
    const cMax = Math.max(...cellArray.map((c) => c.c));

    const lines: string[] = [];

    for (let ri = rMin; ri <= rMax; ri++) {
      const cells: string[] = [];

      for (let ci = cMin; ci <= cMax; ci++) {
        cells.push(paddedRows[ri]?.[ci] ?? "");
      }
      lines.push(cells.join("\t"));
    }

    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [selectedCells, paddedRows]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "c") {
        e.preventDefault();
        copySelected();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "a") {
        e.preventDefault();
        selectAll();
      }
      if (e.key === "Escape") {
        setSelectedCells(new Set());
        setLastClicked(null);
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [copySelected]);

  const copyAll = () => {
    selectAll();
    setTimeout(copySelected, 0);
  };

  const reset = () => {
    setFile(null);
    setRows([]);
    setRawText("");
    setError("");
    setSelectedCells(new Set());
    setLastClicked(null);
  };

  return (
    <article className="max-w-6xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50">
            {t("blog.pdfToExcel.badge")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.pdfToExcel.freeUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.pdfToExcel.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.pdfToExcel.description")}
        </p>
      </div>

      <div className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-sm text-red-700 dark:text-red-400 whitespace-pre-wrap">
            {error}
          </div>
        )}

        {!file && (
          <div
            className="flex flex-col items-center justify-center gap-4 p-16 rounded-2xl border-2 border-dashed border-black/12 dark:border-white/12 hover:border-red-400 dark:hover:border-red-500 bg-black/[0.02] dark:bg-white/[0.02] cursor-pointer transition-all hover:scale-[1.01]"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files[0];

              if (f) handleFile(f);
            }}
          >
            <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-500 dark:text-red-400"
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
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-1">
                {t("blog.pdfToExcel.dragHere")}
                <span className="text-red-600 dark:text-red-400">
                  {t("blog.pdfToExcel.selectFile")}
                </span>
              </p>
              <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                PDF
              </p>
            </div>
            <input
              ref={inputRef}
              accept="application/pdf,.pdf"
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
          <div className="flex flex-col items-center justify-center gap-4 py-16">
            <div className="relative">
              <div className="w-12 h-12 border-3 border-red-200 dark:border-red-800 rounded-full" />
              <div className="absolute inset-0 w-12 h-12 border-3 border-red-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <span className="text-sm text-[#6e6e73] dark:text-[#86868b]">
              {t("blog.pdfToExcel.processing")}
            </span>
          </div>
        )}

        {file && !loading && rows.length > 0 && (
          <>
            {/* Toolbar */}
            <div className="flex items-center justify-between flex-wrap gap-3 p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/6 dark:border-white/6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40">
                  <svg
                    className="w-4 h-4 text-red-600 dark:text-red-400"
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
                    {t("blog.pdfToExcel.rowsCount", { n: rows.length })}
                    {selectedCells.size > 0 && (
                      <span className="ml-2 text-red-500">
                        · {selectedCells.size} {t("blog.pdfToExcel.selected")}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Separator selector */}
                <div className="flex items-center bg-black/[0.04] dark:bg-white/[0.04] rounded-lg p-0.5">
                  {(["auto", "tab", "comma", "pipe"] as const).map((d) => (
                    <button
                      key={d}
                      className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${
                        delimiter === d
                          ? "bg-white dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-white shadow-sm"
                          : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
                      }`}
                      onClick={() => handleDelimiterChange(d)}
                    >
                      {d === "auto"
                        ? t("blog.pdfToExcel.auto")
                        : d === "tab"
                          ? "Tab"
                          : d === "comma"
                            ? ","
                            : "|"}
                    </button>
                  ))}
                </div>

                <div className="w-px h-5 bg-black/8 dark:bg-white/8" />

                <button
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
                  onClick={reset}
                >
                  {t("blog.pdfToExcel.remove")}
                </button>
                <button
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] hover:opacity-90 transition-opacity disabled:opacity-40"
                  onClick={copyAll}
                >
                  {copied ? t("blog.pdfToExcel.copied") : t("blog.pdfToExcel.copyAll")}
                </button>
              </div>
            </div>

            {/* Spreadsheet */}
            <div
              ref={tableRef}
              className="rounded-xl border border-black/8 dark:border-white/8 overflow-hidden bg-white dark:bg-[#1c1c1e]"
              tabIndex={0}
            >
              <div className="overflow-x-auto max-h-[520px] overflow-y-auto">
                <table className="w-full text-xs font-mono select-none">
                  <thead className="sticky top-0 z-10">
                    <tr>
                      <th className="w-10 px-0 py-0 border-b border-r border-black/8 dark:border-white/8 bg-[#f5f5f7] dark:bg-[#2c2c2e]">
                        <button
                          className="w-full h-8 flex items-center justify-center text-[#aeaeb2] dark:text-[#636366] hover:text-[#1d1d1f] dark:hover:text-white text-[10px]"
                          onClick={selectAll}
                          title="Select all"
                        >
                          #
                        </button>
                      </th>
                      {Array.from({ length: maxCols }, (_, i) => (
                        <th
                          key={i}
                          className="px-3 py-0 text-left font-semibold text-[#86868b] dark:text-[#636366] border-b border-r border-black/8 dark:border-white/8 bg-[#f5f5f7] dark:bg-[#2c2c2e] h-8 uppercase tracking-wider"
                        >
                          {String.fromCharCode(65 + i)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paddedRows.map((row, ri) => (
                      <tr key={ri}>
                        <td className="w-10 px-0 py-0 border-b border-r border-black/6 dark:border-white/6 bg-[#f5f5f7] dark:bg-[#2c2c2e]">
                          <button
                            className="w-full h-7 flex items-center justify-center text-[10px] font-medium text-[#aeaeb2] dark:text-[#636366] hover:text-[#1d1d1f] dark:hover:text-white"
                            onClick={() => selectRow(ri)}
                          >
                            {ri + 1}
                          </button>
                        </td>
                        {row.map((cell, ci) => {
                          const isSelected = selectedCells.has(cellKey(ri, ci));

                          return (
                            <td
                              key={ci}
                              className={`px-3 py-1 border-b border-r border-black/4 dark:border-white/4 whitespace-nowrap max-w-[280px] truncate cursor-cell transition-colors ${
                                isSelected
                                  ? "bg-red-50 dark:bg-red-950/30 text-[#1d1d1f] dark:text-white ring-1 ring-inset ring-red-300 dark:ring-red-700"
                                  : "text-[#1d1d1f] dark:text-white hover:bg-black/[0.02] dark:hover:bg-white/[0.04]"
                              }`}
                              title={cell || "—"}
                              onClick={(e) => handleCellClick(ri, ci, e)}
                            >
                              {cell || <span className="text-[#d1d1d6] dark:text-[#48484a]">—</span>}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Hints */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-[#aeaeb2] dark:text-[#636366]">
              <span>{t("blog.pdfToExcel.hintClick")}</span>
              <span>·</span>
              <span>{t("blog.pdfToExcel.hintShift")}</span>
              <span>·</span>
              <span>{t("blog.pdfToExcel.hintCtrl")}</span>
            </div>
          </>
        )}

        {file && !loading && rows.length === 0 && !error && (
          <div className="text-center py-16">
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">
              {t("blog.pdfToExcel.noData")}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
