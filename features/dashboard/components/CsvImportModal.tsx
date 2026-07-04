"use client";
import { useRef, useState } from "react";
import { Modal, Button } from "@heroui/react";
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
        // sampleRows keys are stringified column positions ("0","1",...), not names —
        // matches parseCsv()'s row shape in data-table-import.service.ts.
        const sampleRow = p.sampleRows[0];
        const rawValue = sampleRow?.[String(i)];
        if (rawValue !== undefined && rawValue !== null && rawValue !== "") {
          overrides[i] = guessType(String(rawValue));
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
    <Modal.Backdrop
      isDismissable={step !== "importing"}
      isOpen
      variant="blur"
      onOpenChange={(open) => { if (!open && step !== "importing") onClose(); }}
    >
      <Modal.Container size="lg">
        <Modal.Dialog className="max-h-[90vh] flex flex-col">
          {step !== "importing" && <Modal.CloseTrigger />}
          <Modal.Header>
            <Modal.Heading>
              {step === "upload"
                ? "Importar CSV"
                : step === "preview"
                  ? "Previsualizar datos"
                  : step === "importing"
                    ? "Importando..."
                    : step === "done"
                      ? "Importación completada"
                      : "Error"}
            </Modal.Heading>
          </Modal.Header>

          <Modal.Body className="flex flex-col flex-1 overflow-hidden">
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
                  ? "border-accent bg-accent/5"
                  : "border-border/30 hover:border-black/20 dark:hover:border-white/20"
              }`}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-default flex items-center justify-center text-muted">
                <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                  <path d="M12 16V4M8 8l4-4 4 4" />
                  <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                </svg>
              </div>
              <p className="text-foreground font-medium mb-1">
                Arrastra un CSV o haz clic para seleccionar
              </p>
              <p className="text-sm text-muted">
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
              <label className="text-xs font-semibold text-muted uppercase tracking-wider block mb-1">
                Nombre de la tabla
              </label>
              <input
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                className="w-full text-sm rounded-lg border border-border/30 bg-surface px-3 py-2 text-foreground"
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
                    className="flex-1 text-sm rounded-lg border border-border/30 bg-surface px-3 py-1.5 text-foreground"
                  />
                  <select
                    value={typeOverrides[i] ?? col.type}
                    onChange={(e) =>
                      setTypeOverrides((prev) => ({ ...prev, [i]: e.target.value }))
                    }
                    className="text-sm rounded-lg border border-border/30 bg-surface px-2 py-1.5 text-foreground"
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
            <p className="text-xs text-muted mb-2">
              Vista previa ({preview.sampleRows.length} de {preview.totalRows} filas)
            </p>
            <div className="overflow-auto rounded-xl border border-border max-h-64">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-default">
                    {preview.columns.map((col, i) => (
                      <th
                        key={i}
                        className="px-3 py-2 text-left text-xs font-semibold text-muted whitespace-nowrap border-b border-border"
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
                      className={ri % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-default/50"}
                    >
                      {preview.columns.map((col, ci) => (
                        <td
                          key={ci}
                          className="px-3 py-2 text-foreground whitespace-nowrap border-b border-black/5 dark:border-white/5"
                        >
                          {row[String(ci)] ?? ""}
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
            <div className="flex justify-between mt-5 pt-4 border-t border-border">
              <Button variant="secondary" size="sm" onPress={() => { setStep("upload"); setPreview(null); setErrMsg(""); }}>
                Volver
              </Button>
              <Button size="sm" isDisabled={!tableName.trim()} onPress={handleImport}>
                Importar {preview.totalRows} filas
              </Button>
            </div>
          </div>
        )}

        {/* ── Importing step ───────────────────────────────────────────── */}
        {step === "importing" && (
          <div className="py-12 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-accent/30 border-t-accent animate-spin mx-auto mb-4" />
            <p className="text-foreground font-medium">
              Importando datos...
            </p>
            <p className="text-sm text-muted mt-1">
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
            <p className="text-foreground font-medium mb-1">
              Datos importados correctamente
            </p>
            <div className="flex justify-center gap-3 mt-6">
              <Button variant="secondary" size="sm" onPress={onClose}>
                Cerrar
              </Button>
              <Button size="sm" onPress={() => { if (importResult) onImported(importResult); }}>
                Abrir tabla
              </Button>
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
            <p className="text-foreground font-medium mb-1">
              Error al importar
            </p>
            <p className="text-sm text-muted mt-1 mb-4">
              {errMsg}
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="secondary" size="sm" onPress={onClose}>
                Cerrar
              </Button>
              <Button size="sm" onPress={() => setStep("preview")}>
                Reintentar
              </Button>
            </div>
          </div>
        )}
          </Modal.Body>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
