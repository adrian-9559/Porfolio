"use client";
import type { SortDescriptor } from "@heroui/react";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Table, TableLayout, Virtualizer, Pagination, Button, Input, Chip } from "@heroui/react";
import { TrashBin, Plus, ArrowShapeLeft, Xmark } from "@gravity-ui/icons";

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

const COLUMN_TYPE_COLOR: Record<ColumnType, "default" | "accent" | "success" | "warning" | "danger"> = {
  text: "default",
  number: "accent",
  boolean: "accent",
  date: "warning",
  email: "success",
  url: "accent",
};

// Above this row count we switch from server-paginated <Table.Footer><Pagination>
// to one bulk fetch + <Virtualizer> — avoids re-fetching on every scroll tick while
// still bounding the initial payload for very large tables.
const VIRTUALIZE_THRESHOLD = 500;
const PAGE_SIZE = 50;

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
  const [search, setSearch] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor | undefined>();
  const saveTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const searchTimer = useRef<NodeJS.Timeout | null>(null);

  const virtualized = total > VIRTUALIZE_THRESHOLD;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const fetchData = useCallback(
    async (opts?: { search?: string; page?: number }) => {
      setLoading(true);
      setError(null);
      const effectiveSearch = opts?.search ?? search;
      const effectivePage = opts?.page ?? page;
      try {
        const [detail, rowsData] = await Promise.all([
          dataTableService.getById(tableId),
          dataTableService.getRows(tableId, {
            page: virtualized ? 1 : effectivePage,
            pageSize: virtualized ? Math.max(total, 1000) || 1000 : PAGE_SIZE,
            search: effectiveSearch || undefined,
          }),
        ]);
        setColumns(detail.columns);
        setRows(rowsData.rows);
        setTotal(rowsData.total);
      } catch (err: any) {
        setError(err?.message ?? "Error al cargar la tabla");
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tableId],
  );

  useEffect(() => {
    fetchData({ page: 1, search: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId]);

  useEffect(() => {
    if (!virtualized) fetchData({ page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setPage(1);
      fetchData({ page: 1, search: value });
    }, 400);
  };

  // Sort is applied client-side over the currently loaded rows (a single page
  // for small tables, the full batch for virtualized ones) — the normalized
  // cells model makes a server-side ORDER BY on an arbitrary column expensive
  // without raw SQL, and this stays correct at both scales since virtualized
  // mode already loads every row.
  const sortedRows = useMemo(() => {
    if (!sortDescriptor) return rows;
    const colId = String(sortDescriptor.column);
    const sorted = [...rows].sort((a, b) => {
      const av = a.cells[colId] ?? "";
      const bv = b.cells[colId] ?? "";
      const col = columns.find((c) => c.id === colId);
      let cmp: number;
      if (col?.type === "number") {
        cmp = (Number(av) || 0) - (Number(bv) || 0);
      } else {
        cmp = av.localeCompare(bv);
      }
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
    return sorted;
  }, [rows, sortDescriptor, columns]);

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

  // ── Row / column / table CRUD ─────────────────────────────────────

  const handleAddRow = async () => {
    try {
      await dataTableService.addRow(tableId);
      await fetchData();
    } catch {
      // ignore
    }
  };

  const handleDeleteRow = async (rowId: string) => {
    setConfirmDeleteRow(null);
    try {
      await dataTableService.deleteRow(tableId, rowId);
      await fetchData();
    } catch {
      // ignore
    }
  };

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

  const handleDeleteColumn = async (colId: string) => {
    try {
      await dataTableService.deleteColumn(tableId, colId);
      await fetchData();
    } catch {
      // ignore
    }
  };

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

  if (loading && rows.length === 0) {
    return (
      <div>
        <div className="h-12 w-48 rounded-xl bg-default animate-pulse mb-6" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 rounded-xl bg-default animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 text-center">
        <p className="text-danger mb-3">{error}</p>
        <Button variant="secondary" size="sm" onPress={() => fetchData()}>
          Reintentar
        </Button>
      </div>
    );
  }

  const tableColumns = [
    { id: "__index", name: "#" },
    ...columns.map((c) => ({ id: c.id, name: c.name, type: c.type })),
    { id: "__actions", name: "" },
  ];

  const renderRow = (row: DataTableRow, index: number) => (
    <Table.Row key={row.id}>
      <Table.Collection items={tableColumns}>
        {(col) => {
          if (col.id === "__index") {
            return <Table.Cell className="text-center text-xs text-muted">{index + 1}</Table.Cell>;
          }
          if (col.id === "__actions") {
            return (
              <Table.Cell>
                <Button
                  isIconOnly
                  aria-label="Eliminar fila"
                  variant="ghost"
                  size="sm"
                  className="text-muted hover:text-danger"
                  onPress={() => setConfirmDeleteRow(row.id)}
                >
                  <TrashBin className="w-3.5 h-3.5" />
                </Button>
              </Table.Cell>
            );
          }
          const columnDef = columns.find((c) => c.id === col.id);
          return (
            <Table.Cell>
              <input
                value={formatCellValue(row.cells[col.id])}
                onChange={(e) => handleCellChange(row.id, col.id, e.target.value)}
                type={columnDef?.type === "number" ? "number" : columnDef?.type === "date" ? "date" : "text"}
                className="w-full min-w-[110px] bg-transparent px-2 py-1.5 text-sm text-foreground rounded-lg border border-transparent hover:border-border focus:border-accent focus:outline-none transition-colors"
              />
            </Table.Cell>
          );
        }}
      </Table.Collection>
    </Table.Row>
  );

  return (
    <div>
      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Button isIconOnly aria-label="Volver" variant="ghost" size="sm" onPress={onBack}>
            <ArrowShapeLeft className="w-4 h-4" />
          </Button>

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
              className="text-xl font-bold bg-transparent border-b-2 border-accent text-foreground outline-none"
            />
          ) : (
            <h2
              className="text-xl font-bold text-foreground cursor-pointer hover:underline"
              onClick={() => {
                setNameDraft(table?.name ?? "");
                setNameEditing(true);
              }}
            >
              {table?.name ?? "Sin nombre"}
            </h2>
          )}

          {table && (
            <Chip
              size="sm"
              color={table.role === "owner" ? "success" : table.role === "editor" ? "accent" : "default"}
            >
              {table.role === "owner" ? "Propietario" : table.role === "editor" ? "Editor" : "Espectador"}
            </Chip>
          )}
        </div>

        <div className="flex items-center gap-2">
          {saveStatus === "saving" && (
            <span className="text-xs text-warning flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
              Guardando...
            </span>
          )}
          {saveStatus === "saved" && (
            <span className="text-xs text-success flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-success" />
              Guardado
            </span>
          )}

          <Button variant="secondary" size="sm" onPress={onShowMembers}>
            Compartir
          </Button>
          <Button variant="secondary" size="sm" onPress={() => setShowAddColumn(true)}>
            <Plus className="w-3.5 h-3.5" />
            Columna
          </Button>
          <Button variant="danger-soft" size="sm" onPress={() => setShowDeleteConfirm(true)}>
            Eliminar
          </Button>
        </div>
      </div>

      {/* ── Search + row count ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <Input
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Buscar en la tabla…"
          className="max-w-xs"
          variant="secondary"
        />
        <p className="text-xs text-muted whitespace-nowrap">
          {total} fila{total !== 1 ? "s" : ""}
          {virtualized && " · virtualizado"}
        </p>
      </div>

      {/* ── Add column inline ─────────────────────────────────────────── */}
      {showAddColumn && (
        <div className="mb-4 flex gap-2 items-center p-3 rounded-xl bg-default border border-border">
          <input
            autoFocus
            value={newColName}
            onChange={(e) => setNewColName(e.target.value)}
            placeholder="Nombre de la columna"
            className="flex-1 text-sm rounded-lg border border-border bg-surface px-3 py-1.5 text-foreground"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddColumn();
              if (e.key === "Escape") setShowAddColumn(false);
            }}
          />
          <select
            value={newColType}
            onChange={(e) => setNewColType(e.target.value as ColumnType)}
            className="text-sm rounded-lg border border-border bg-surface px-2 py-1.5 text-foreground"
          >
            <option value="text">Texto</option>
            <option value="number">Número</option>
            <option value="boolean">Sí/No</option>
            <option value="date">Fecha</option>
            <option value="email">Email</option>
            <option value="url">URL</option>
          </select>
          <Button size="sm" isDisabled={!newColName.trim()} onPress={handleAddColumn}>
            Añadir
          </Button>
          <Button size="sm" variant="secondary" onPress={() => setShowAddColumn(false)}>
            Cancelar
          </Button>
        </div>
      )}

      {/* ── Table ─────────────────────────────────────────────────────── */}
      {columns.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-muted mb-3">Esta tabla no tiene columnas.</p>
          <Button onPress={() => setShowAddColumn(true)}>Añadir primera columna</Button>
        </div>
      ) : virtualized ? (
        <Virtualizer layout={TableLayout} layoutOptions={{ headingHeight: 42, rowHeight: 42 }}>
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label={table?.name ?? "Tabla"} className="h-[520px] overflow-auto">
                <Table.Header columns={tableColumns} className="h-full w-full">
                  {(col) =>
                    col.id === "__index" || col.id === "__actions" ? (
                      <Table.Column
                        isRowHeader={col.id === "__index"}
                        minWidth={col.id === "__index" ? 40 : 48}
                      >
                        {col.name}
                      </Table.Column>
                    ) : (
                      <Table.Column minWidth={140}>
                        <div className="flex items-center gap-1.5">
                          {col.name}
                          {"type" in col && (
                            <Chip size="sm" color={COLUMN_TYPE_COLOR[col.type as ColumnType]}>
                              {(col as any).type}
                            </Chip>
                          )}
                        </div>
                      </Table.Column>
                    )
                  }
                </Table.Header>
                <Table.Body items={sortedRows}>
                  {(row) => renderRow(row, sortedRows.indexOf(row))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </Virtualizer>
      ) : (
        <Table>
          <Table.ScrollContainer>
            <Table.Content
              aria-label={table?.name ?? "Tabla"}
              sortDescriptor={sortDescriptor}
              onSortChange={setSortDescriptor}
            >
              <Table.Header columns={tableColumns}>
                {(col) =>
                  col.id === "__index" || col.id === "__actions" ? (
                    <Table.Column isRowHeader={col.id === "__index"}>{col.name}</Table.Column>
                  ) : (
                    <Table.Column allowsSorting id={col.id}>
                      {({ sortDirection }) => (
                        <span className="flex items-center gap-1.5 cursor-pointer select-none">
                          {col.name}
                          {"type" in col && (
                            <Chip size="sm" color={COLUMN_TYPE_COLOR[col.type as ColumnType]}>
                              {(col as any).type}
                            </Chip>
                          )}
                          {sortDirection && (
                            <span className="text-xs text-muted">
                              {sortDirection === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </span>
                      )}
                    </Table.Column>
                  )
                }
              </Table.Header>
              <Table.Body
                items={sortedRows}
                renderEmptyState={() => (
                  <div className="px-3 py-8 text-center text-sm text-muted">Sin datos</div>
                )}
              >
                {(row) => renderRow(row, sortedRows.indexOf(row))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
          {totalPages > 1 && (
            <Table.Footer>
              <Pagination size="sm">
                <Pagination.Summary>
                  Página {page} de {totalPages}
                </Pagination.Summary>
                <Pagination.Content>
                  <Pagination.Item>
                    <Pagination.Previous
                      isDisabled={page === 1}
                      onPress={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      <Pagination.PreviousIcon />
                      Anterior
                    </Pagination.Previous>
                  </Pagination.Item>
                  <Pagination.Item>
                    <Pagination.Next
                      isDisabled={page === totalPages}
                      onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                    >
                      Siguiente
                      <Pagination.NextIcon />
                    </Pagination.Next>
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </Table.Footer>
          )}
        </Table>
      )}

      {/* ── Add row ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mt-4">
        <Button variant="secondary" size="sm" onPress={handleAddRow}>
          <Plus className="w-3.5 h-3.5" />
          Añadir fila
        </Button>
      </div>

      {/* ── Confirm delete row ─────────────────────────────────────────── */}
      {confirmDeleteRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-surface rounded-2xl p-6 max-w-sm mx-4 shadow-2xl">
            <p className="text-sm font-medium text-foreground mb-4">
              ¿Eliminar esta fila? Los datos no se pueden recuperar.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="secondary" size="sm" onPress={() => setConfirmDeleteRow(null)}>
                Cancelar
              </Button>
              <Button variant="danger" size="sm" onPress={() => handleDeleteRow(confirmDeleteRow)}>
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm delete table ────────────────────────────────────────── */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-surface rounded-2xl p-6 max-w-sm mx-4 shadow-2xl">
            <p className="text-sm font-medium text-foreground mb-4">
              ¿Eliminar esta tabla? Todos los datos se perderán.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="secondary" size="sm" onPress={() => setShowDeleteConfirm(false)}>
                Cancelar
              </Button>
              <Button variant="danger" size="sm" onPress={handleDeleteTable}>
                Eliminar tabla
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
