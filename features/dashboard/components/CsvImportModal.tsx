"use client";
import { useRef, useState } from "react";
import { dataTableService, type ImportPreview } from "@/services/dataTableService";

interface Props {
  onClose: () => void;
  onImported: (tableId: string) => void;
}

type Step = "upload" | "preview" | "importing" | "done" | "error";

const COLUMN_TYPES = [
  { value: "text", label: "Texto" },
  { value: "number", label: "Número" },
  { value: "boolean", label: "Sí/No" },
  { value: "date", label: "Fecha" },
  { value: "email", label: "Email" },
  { value: "url", label: "URL" },
];

function guessType(sample: string): string {
  if (/^-?\d+(\.\d+)?$/.test(sample)) return "number";
  if (/^\d{4}-\d{2}-\d{2}/.test(sample)) return "date";
  if (sample === "true" || sample === "false" || sample === "TRUE" || sample === "FALSE") return "boolean";
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sample)) return "email";
  if (/^https?:\/\//.test(sample)) return "url";
  return "text";
}

export function CsvImportModal({ onClose, onImported }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [tableName, setTableName] = useState("");
  const [typeOverrides, setTypeOverrides] = useState<Record<number, string>>({});
  const [columnNames, setColumnNames] = useState<string[]>([]);
  const [errMsg, setErrMsg] = useState("");
  const [importResult, setImportResult] = useState<string | null>(null);

  const handleFile = (f: File) => {
    if (f.size > 10 * 1024 * 1024) {
      setErrMsg("El archivo no puede superar los 10 MB");
      return;
    }
    if (!f.name.endsWith(".csv")) {
      setErrMsg("Solo archivos .csv");
      return;
    }
    setErrMsg("");
    setFile(f);
    setStep("preview");
    loadPreview(f);
  };

  const loadPreview = async (f: File) => {
    try {
      const data = await dataTableService.uploadCsv("preview", f);
      const p = data as ImportPreview;
      setPreview(p);
      setColumnNames(p.columns.map((c) => c.name));
      setTableName(f.name.replace(/\.csv$/i, ""));
      // Guess types
      const overrides: Record<number, string> = {};
      p.columns.forEach((col, i) => {
        const sampleRow = p.sampleRows[0];
        if (sampleRow && sampleRow[col.name] !== undefined && sampleRow[col.name] !== null) {
          overrides[i] = guessType(String(sampleRow[col.name]));
        } else {
          overrides[i] = col.type;
        }
      });
      setTypeOverrides(overrides);
    } catch (err: any) {
      setErrMsg(err?.message ?? "Error al previsualizar el archivo");
      setStep("upload");
    }
  };

  const handleImport = async () => {
    if (!file) return;
    setStep("importing");
    try {
      const result = await dataTableService.uploadCsv("import", file, {
        name: tableName || undefined,
        typeOverrides,
      });
      setImportResult((result as { tableId: string }).tableId);
      setStep("done");
    } catch (err: any) {
      setErrMsg(err?.message ?? "Error al importar");
      setStep("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => {
        if (e.target === e.currentTarget && step !== "importing") onClose();
      }}
    >
      <div className="bg-white dark:bg-[#1a1a1f] rounded-2xl p-6 w-full max-w-3xl mx-4 border border-black/8 dark:border-white/8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white">
            {step === "upload"
              ? "Importar CSV"
              : step === "preview"
                ? "Previsualizar datos"
                : step === "importing"
                  ? "Importando..."
                  : step === "done"
                    ? "Importación completada"
                    : "Error"}
          </h3>
          <button
            onClick={onClose}
            className="text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white p-1"
            disabled={step === "importing"}
          >
            <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 20 20" width="20">
              <path d="M5 5l10 10M15 5l-10 10" />
            </svg>
          </button>
        </div>

        {/* ── Upload step ───────────────────────────────────────────────── */}
        {step === "upload" && (
          <div>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
                dragOver
                  ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20"
                  : "border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20"
              }`}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gray-100 dark:bg-[#111116] flex items-center justify-center text-[#6e6e73]">
                <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                  <path d="M12 16V4M8 8l4-4 4 4" />
                  <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                </svg>
              </div>
              <p className="text-[#1d1d1f] dark:text-white font-medium mb-1">
                Arrastra un CSV o haz clic para seleccionar
              </p>
              <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">
                .csv · Máximo 10 MB
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
            {errMsg && (
              <p className="mt-3 text-sm text-red-500">{errMsg}</p>
            )}
          </div>
        )}

        {/* ── Preview step ─────────────────────────────────────────────── */}
        {step === "preview" && preview && (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Table name input */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider block mb-1">
                Nombre de la tabla
              </label>
              <input
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                className="w-full text-sm rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#111116] px-3 py-2 text-[#1d1d1f] dark:text-white"
                placeholder="Nombre de la tabla"
              />
            </div>

            {/* Column config */}
            <div className="space-y-2 mb-4">
              {preview.columns.map((col, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={columnNames[i] ?? col.name}
                    onChange={(e) => {
                      const next = [...columnNames];
                      next[i] = e.target.value;
                      setColumnNames(next);
                    }}
                    className="flex-1 text-sm rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#111116] px-3 py-1.5 text-[#1d1d1f] dark:text-white"
                  />
                  <select
                    value={typeOverrides[i] ?? col.type}
                    onChange={(e) =>
                      setTypeOverrides((prev) => ({ ...prev, [i]: e.target.value }))
                    }
                    className="text-sm rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#111116] px-2 py-1.5 text-[#1d1d1f] dark:text-white"
                  >
                    {COLUMN_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Preview rows */}
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mb-2">
              Vista previa ({preview.sampleRows.length} de {preview.totalRows} filas)
            </p>
            <div className="overflow-auto rounded-xl border border-black/8 dark:border-white/8 max-h-64">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#111116]">
                    {preview.columns.map((col, i) => (
                      <th
                        key={i}
                        className="px-3 py-2 text-left text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] whitespace-nowrap border-b border-black/8 dark:border-white/8"
                      >
                        {columnNames[i] ?? col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.sampleRows.map((row, ri) => (
                    <tr
                      key={ri}
                      className={ri % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-gray-50/50 dark:bg-[#0d0d10]"}
                    >
                      {preview.columns.map((col, ci) => (
                        <td
                          key={ci}
                          className="px-3 py-2 text-[#1d1d1f] dark:text-white whitespace-nowrap border-b border-black/5 dark:border-white/5"
                        >
                          {row[col.name] ?? ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {errMsg && (
              <p className="mt-3 text-sm text-red-500">{errMsg}</p>
            )}

            {/* Actions */}
            <div className="flex justify-between mt-5 pt-4 border-t border-black/8 dark:border-white/8">
              <button
                onClick={() => { setStep("upload"); setPreview(null); setErrMsg(""); }}
                className="apple-btn-secondary text-sm py-2 px-4"
              >
                Volver
              </button>
              <button
                onClick={handleImport}
                disabled={!tableName.trim()}
                className="apple-btn-primary text-sm py-2 px-4"
              >
                Importar {preview.totalRows} filas
              </button>
            </div>
          </div>
        )}

        {/* ── Importing step ───────────────────────────────────────────── */}
        {step === "importing" && (
          <div className="py-12 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-[#1d1d1f] dark:text-white font-medium">
              Importando datos...
            </p>
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">
              Esto puede tardar unos segundos
            </p>
          </div>
        )}

        {/* ── Done step ────────────────────────────────────────────────── */}
        {step === "done" && (
          <div className="py-12 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-[#1d1d1f] dark:text-white font-medium mb-1">
              Datos importados correctamente
            </p>
            <div className="flex justify-center gap-3 mt-6">
              <button onClick={onClose} className="apple-btn-secondary text-sm py-2 px-4">
                Cerrar
              </button>
              <button
                onClick={() => { if (importResult) onImported(importResult); }}
                className="apple-btn-primary text-sm py-2 px-4"
              >
                Abrir tabla
              </button>
            </div>
          </div>
        )}

        {/* ── Error step ───────────────────────────────────────────────── */}
        {step === "error" && (
          <div className="py-12 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
              <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </div>
            <p className="text-[#1d1d1f] dark:text-white font-medium mb-1">
              Error al importar
            </p>
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1 mb-4">
              {errMsg}
            </p>
            <div className="flex justify-center gap-3">
              <button onClick={onClose} className="apple-btn-secondary text-sm py-2 px-4">
                Cerrar
              </button>
              <button
                onClick={() => setStep("preview")}
                className="apple-btn-primary text-sm py-2 px-4"
              >
                Reintentar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
