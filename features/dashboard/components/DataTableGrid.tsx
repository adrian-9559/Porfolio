"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  dataTableService,
  type DataTable,
  type DataTableColumn,
  type DataTableRow,
  type ColumnType,
} from "@/services/dataTableService";

interface Props {
  tableId: string;
  tables: DataTable[];
  onBack: () => void;
  onShowMembers: () => void;
}

const COLUMN_TYPE_BADGES: Record<ColumnType, string> = {
  text: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  number: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  boolean: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  date: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  email: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  url: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400",
};

function formatCellValue(val: string | undefined | null): string {
  if (val === null || val === undefined) return "";
  return String(val);
}

type SaveStatus = "idle" | "saving" | "saved";

export function DataTableGrid({ tableId, tables, onBack, onShowMembers }: Props) {
  const table = tables.find((t) => t.id === tableId) ?? null;

  const [columns, setColumns] = useState<DataTableColumn[]>([]);
  const [rows, setRows] = useState<DataTableRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nameEditing, setNameEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState(table?.name ?? "");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [newColName, setNewColName] = useState("");
  const [newColType, setNewColType] = useState<ColumnType>("text");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [confirmDeleteRow, setConfirmDeleteRow] = useState<string | null>(null);
  const saveTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [detail, rowsData] = await Promise.all([
        dataTableService.getById(tableId),
        dataTableService.getRows(tableId, { page, pageSize }),
      ]);
      setColumns(detail.columns);
      setRows(rowsData.rows);
      setTotal(rowsData.total);
    } catch (err: any) {
      setError(err?.message ?? "Error al cargar la tabla");
    } finally {
      setLoading(false);
    }
  }, [tableId, page, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ── Table name edit ────────────────────────────────────────────────

  const saveTableName = useCallback(
    async (name: string) => {
      try {
        await dataTableService.updateTable(tableId, { name });
      } catch {
        // ignore
      }
    },
    [tableId],
  );

  const handleNameBlur = () => {
    setNameEditing(false);
    if (nameDraft !== table?.name) {
      saveTableName(nameDraft);
    }
  };

  // ── Cell editing ───────────────────────────────────────────────────

  const debouncedSaveCell = (rowId: string, columnId: string, value: string) => {
    const key = `${rowId}-${columnId}`;
    const existing = saveTimers.current.get(key);
    if (existing) clearTimeout(existing);

    setSaveStatus("saving");
    const timer = setTimeout(async () => {
      try {
        await dataTableService.updateCells(tableId, rowId, [{ columnId, value }]);
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 1500);
      } catch {
        setSaveStatus("idle");
      }
    }, 600);
    saveTimers.current.set(key, timer);
  };

  const handleCellChange = (rowId: string, columnId: string, value: string) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === rowId ? { ...r, cells: { ...r.cells, [columnId]: value } } : r,
      ),
    );
    debouncedSaveCell(rowId, columnId, value);
  };

  // ── Add row ────────────────────────────────────────────────────────

  const handleAddRow = async () => {
    try {
      await dataTableService.addRow(tableId);
      await fetchData();
    } catch {
      // ignore
    }
  };

  // ── Delete row ─────────────────────────────────────────────────────

  const handleDeleteRow = async (rowId: string) => {
    setConfirmDeleteRow(null);
    try {
      await dataTableService.deleteRow(tableId, rowId);
      await fetchData();
    } catch {
      // ignore
    }
  };

  // ── Add column ─────────────────────────────────────────────────────

  const handleAddColumn = async () => {
    if (!newColName.trim()) return;
    try {
      await dataTableService.addColumn(tableId, {
        name: newColName.trim(),
        type: newColType,
      });
      setNewColName("");
      setNewColType("text");
      setShowAddColumn(false);
      await fetchData();
    } catch {
      // ignore
    }
  };

  // ── Delete column ──────────────────────────────────────────────────

  const handleDeleteColumn = async (colId: string) => {
    try {
      await dataTableService.deleteColumn(tableId, colId);
      await fetchData();
    } catch {
      // ignore
    }
  };

  // ── Delete table ───────────────────────────────────────────────────

  const handleDeleteTable = async () => {
    setShowDeleteConfirm(false);
    try {
      await dataTableService.deleteTable(tableId);
      onBack();
    } catch {
      // ignore
    }
  };

  // ── Render ─────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div>
        <div className="h-12 w-48 rounded-xl bg-gray-100 dark:bg-[#1a1a1f] animate-pulse mb-6" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 rounded-xl bg-gray-100 dark:bg-[#1a1a1f] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 text-center">
        <p className="text-red-500 mb-3">{error}</p>
        <button onClick={fetchData} className="apple-btn-primary text-sm py-2 px-4">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path d="M19 12H5m7-7l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {nameEditing ? (
            <input
              autoFocus
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              onBlur={handleNameBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleNameBlur();
                if (e.key === "Escape") { setNameDraft(table?.name ?? ""); setNameEditing(false); }
              }}
              className="text-xl font-bold bg-transparent border-b-2 border-blue-500 text-[#1d1d1f] dark:text-white outline-none"
            />
          ) : (
            <h2
              className="text-xl font-bold text-[#1d1d1f] dark:text-white cursor-pointer hover:underline"
              onClick={() => {
                setNameDraft(table?.name ?? "");
                setNameEditing(true);
              }}
            >
              {table?.name ?? "Sin nombre"}
            </h2>
          )}

          {table && (
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                table.role === "owner"
                  ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                  : table.role === "editor"
                    ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                    : "bg-gray-100 dark:bg-gray-800/40 text-gray-500 dark:text-gray-400"
              }`}
            >
              {table.role === "owner"
                ? "Propietario"
                : table.role === "editor"
                  ? "Editor"
                  : "Espectador"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Save indicator */}
          {saveStatus === "saving" && (
            <span className="text-xs text-amber-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Guardando...
            </span>
          )}
          {saveStatus === "saved" && (
            <span className="text-xs text-emerald-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Guardado
            </span>
          )}

          <button onClick={onShowMembers} className="apple-btn-secondary text-sm py-1.5 px-3">
            Compartir
          </button>
          <button
            onClick={() => setShowAddColumn(true)}
            className="apple-btn-secondary text-sm py-1.5 px-3"
          >
            + Columna
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-sm py-1.5 px-3 rounded-full border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Row count */}
      <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mb-3">
        {total} fila{total !== 1 ? "s" : ""}
      </p>

      {/* ── Add column inline ─────────────────────────────────────────── */}
      {showAddColumn && (
        <div className="mb-4 flex gap-2 items-center p-3 rounded-xl bg-gray-50 dark:bg-[#111116] border border-black/8 dark:border-white/8">
          <input
            autoFocus
            value={newColName}
            onChange={(e) => setNewColName(e.target.value)}
            placeholder="Nombre de la columna"
            className="flex-1 text-sm rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1f] px-3 py-1.5 text-[#1d1d1f] dark:text-white"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddColumn();
              if (e.key === "Escape") setShowAddColumn(false);
            }}
          />
          <select
            value={newColType}
            onChange={(e) => setNewColType(e.target.value as ColumnType)}
            className="text-sm rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1f] px-2 py-1.5 text-[#1d1d1f] dark:text-white"
          >
            <option value="text">Texto</option>
            <option value="number">Número</option>
            <option value="boolean">Sí/No</option>
            <option value="date">Fecha</option>
            <option value="email">Email</option>
            <option value="url">URL</option>
          </select>
          <button
            onClick={handleAddColumn}
            disabled={!newColName.trim()}
            className="apple-btn-primary text-sm py-1.5 px-3"
          >
            Añadir
          </button>
          <button
            onClick={() => setShowAddColumn(false)}
            className="apple-btn-secondary text-sm py-1.5 px-3"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* ── Table ─────────────────────────────────────────────────────── */}
      {columns.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-[#6e6e73] dark:text-[#86868b] mb-3">
            Esta tabla no tiene columnas.
          </p>
          <button
            onClick={() => setShowAddColumn(true)}
            className="apple-btn-primary text-sm py-2 px-4"
          >
            Añadir primera columna
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-black/8 dark:border-white/8">
          <table className="w-full text-sm">
            {/* Thead */}
            <thead>
              <tr className="bg-gray-50 dark:bg-[#111116]">
                <th className="w-10 px-2 py-2 text-center text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] border-b border-black/8 dark:border-white/8">
                  #
                </th>
                {columns.map((col) => (
                  <th
                    key={col.id}
                    className="px-3 py-2 text-left text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] whitespace-nowrap border-b border-black/8 dark:border-white/8"
                  >
                    <div className="flex items-center gap-2">
                      <span>{col.name}</span>
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                          COLUMN_TYPE_BADGES[col.type] ?? COLUMN_TYPE_BADGES.text
                        }`}
                      >
                        {col.type}
                      </span>
                      {table?.role === "owner" && columns.length > 1 && (
                        <button
                          onClick={() => handleDeleteColumn(col.id)}
                          className="text-[#6e6e73] hover:text-red-500 opacity-0 group-hover:opacity-100"
                          title="Eliminar columna"
                        >
                          <svg fill="none" height="12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 12 12" width="12">
                            <path d="M2 3h8M4.5 3V2a1 1 0 011-1h1a1 1 0 011 1v1M9 3v6a1 1 0 01-1 1H4a1 1 0 01-1-1V3" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </th>
                ))}
                <th className="w-12 px-2 py-2 border-b border-black/8 dark:border-white/8" />
              </tr>
            </thead>

            {/* Tbody */}
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 2}
                    className="px-3 py-8 text-center text-sm text-[#6e6e73] dark:text-[#86868b]"
                  >
                    Sin datos
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-black/5 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-[#0d0d10] transition-colors"
                  >
                    <td className="px-2 py-1.5 text-center text-xs text-[#6e6e73]">
                      {row.position}
                    </td>
                    {columns.map((col) => (
                      <td key={col.id} className="px-2 py-1">
                        <input
                          value={formatCellValue(row.cells[col.id])}
                          onChange={(e) =>
                            handleCellChange(row.id, col.id, e.target.value)
                          }
                          type={col.type === "number" ? "number" : col.type === "date" ? "date" : "text"}
                          className="w-full min-w-[100px] bg-transparent px-2 py-1.5 text-sm text-[#1d1d1f] dark:text-white rounded-lg border border-transparent hover:border-black/10 dark:hover:border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </td>
                    ))}
                    <td className="px-2 py-1 text-center">
                      <button
                        onClick={() => setConfirmDeleteRow(row.id)}
                        className="text-[#6e6e73] hover:text-red-500 p-1 opacity-0 hover:opacity-100 transition-opacity"
                        title="Eliminar fila"
                      >
                        <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 14 14" width="14">
                          <path d="M2 3.5h10M5 3.5V2a1 1 0 011-1h2a1 1 0 011 1v1.5M11 3.5v8a1.5 1.5 0 01-1.5 1.5h-5A1.5 1.5 0 013 11.5v-8" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Add row + Pagination ────────────────────────────────────────── */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handleAddRow}
          className="apple-btn-secondary text-sm py-1.5 px-3"
        >
          + Añadir fila
        </button>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="apple-btn-secondary text-sm py-1 px-3 disabled:opacity-40"
            >
              Anterior
            </button>
            <span className="text-xs text-[#6e6e73] dark:text-[#86868b]">
              Página {page} de {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="apple-btn-secondary text-sm py-1 px-3 disabled:opacity-40"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      {/* ── Confirm delete row ─────────────────────────────────────────── */}
      {confirmDeleteRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-[#1a1a1f] rounded-2xl p-6 max-w-sm mx-4 shadow-2xl">
            <p className="text-sm font-medium text-[#1d1d1f] dark:text-white mb-4">
              ¿Eliminar esta fila? Los datos no se pueden recuperar.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteRow(null)}
                className="apple-btn-secondary text-sm py-2 px-4"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteRow(confirmDeleteRow)}
                className="apple-btn-primary text-sm py-2 px-4 !bg-red-500 hover:!bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm delete table ────────────────────────────────────────── */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-[#1a1a1f] rounded-2xl p-6 max-w-sm mx-4 shadow-2xl">
            <p className="text-sm font-medium text-[#1d1d1f] dark:text-white mb-4">
              ¿Eliminar esta tabla? Todos los datos se perderán.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="apple-btn-secondary text-sm py-2 px-4"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteTable}
                className="apple-btn-primary text-sm py-2 px-4 !bg-red-500 hover:!bg-red-600"
              >
                Eliminar tabla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
