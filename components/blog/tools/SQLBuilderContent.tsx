"use client";
import type {
  TableDef,
  ColumnRef,
  HistoryItem,
  ExampleSchema,
} from "./utils/sqlBuilder";

import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";

import {
  EXAMPLE_DDL_USERS_ORDERS,
  EXAMPLE_DDL_EMPLOYEES,
  parseDDL,
  generateSQL,
  relativeTime,
  getTypeColor,
} from "./utils/sqlBuilder";
import {
  BookIcon,
  LinkIcon,
  DocumentIcon,
  WarningIcon,
  KeyIcon,
  ClipboardIcon,
  TrashIcon,
  CheckIcon,
  PlusIcon,
  highlightSQL,
} from "./SQLBuilderIcons";
import { Badge } from "./SQLBuilderBadge";

import { apiFetch } from "@/services/apiClient";
import { useAuthStore } from "@/store/authStore";

const EXAMPLE_SCHEMAS: ExampleSchema[] = [
  {
    id: "users-orders",
    label: "Usuarios-Pedidos",
    tables: "usuarios, pedidos",
    ddl: EXAMPLE_DDL_USERS_ORDERS,
  },
  {
    id: "employees",
    label: "Empleados-Departamentos",
    tables: "departamentos, empleados",
    ddl: EXAMPLE_DDL_EMPLOYEES,
  },
];

export default function SQLBuilderContent() {
  const { isAuthenticated } = useAuthStore();
  const outputRef = useRef<HTMLDivElement>(null);

  const [ddlInput, setDdlInput] = useState(EXAMPLE_SCHEMAS[0].ddl);
  const [showCustomDDL, setShowCustomDDL] = useState(false);
  const [schema, setSchema] = useState<TableDef[]>([]);
  const [selectCols, setSelectCols] = useState<Set<ColumnRef>>(new Set());
  const [whereCols, setWhereCols] = useState<Map<ColumnRef, string>>(new Map());
  const [orderByCols, setOrderByCols] = useState<
    Map<ColumnRef, "ASC" | "DESC">
  >(new Map());
  const [groupByCols, setGroupByCols] = useState<Set<ColumnRef>>(new Set());
  const [activeSQL, setActiveSQL] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [collapsedTables, setCollapsedTables] = useState<Set<string>>(
    new Set(),
  );
  const [columnFilter, setColumnFilter] = useState("");

  const clearSelections = useCallback(() => {
    setSelectCols(new Set());
    setWhereCols(new Map());
    setOrderByCols(new Map());
    setGroupByCols(new Set());
    setActiveSQL(null);
  }, []);

  const toggleCollapse = useCallback((tableName: string) => {
    setCollapsedTables((prev) => {
      const n = new Set(prev);

      if (n.has(tableName)) n.delete(tableName);
      else n.add(tableName);

      return n;
    });
  }, []);

  const toggleSelectAll = useCallback((table: TableDef) => {
    setSelectCols((prev) => {
      const allRefs = table.columns.map(
        (col) => `${table.name}.${col.name}` as ColumnRef,
      );
      const allSelected = allRefs.every((ref) => prev.has(ref));
      const n = new Set(prev);

      if (allSelected) {
        allRefs.forEach((ref) => n.delete(ref));
      } else {
        allRefs.forEach((ref) => n.add(ref));
      }

      return n;
    });
  }, []);

  useEffect(() => {
    const parsed = parseDDL(ddlInput);

    setSchema(parsed);
    clearSelections();
  }, [ddlInput]);

  const generatedSQL = useMemo(
    () => generateSQL(schema, selectCols, whereCols, orderByCols, groupByCols),
    [schema, selectCols, whereCols, orderByCols, groupByCols],
  );

  useEffect(() => {
    if (generatedSQL && outputRef.current) {
      outputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [generatedSQL]);

  const displaySQL = activeSQL ?? generatedSQL;

  const hasSchema = schema.length > 0;
  const parseError = ddlInput.trim() !== "" && !hasSchema;

  const toggleSelect = (ref: ColumnRef) => {
    setSelectCols((prev) => {
      const n = new Set(prev);

      if (n.has(ref)) n.delete(ref);
      else n.add(ref);

      return n;
    });
  };
  const toggleWhere = (ref: ColumnRef) => {
    setWhereCols((prev) => {
      const n = new Map(prev);

      if (n.has(ref)) n.delete(ref);
      else n.set(ref, "");

      return n;
    });
  };
  const updateWhereValue = (ref: ColumnRef, value: string) => {
    setWhereCols((prev) => {
      const n = new Map(prev);

      n.set(ref, value);

      return n;
    });
  };
  const toggleOrderBy = (ref: ColumnRef) => {
    setOrderByCols((prev) => {
      const n = new Map(prev);

      if (!n.has(ref)) n.set(ref, "ASC");
      else if (n.get(ref) === "ASC") n.set(ref, "DESC");
      else n.delete(ref);

      return n;
    });
  };
  const toggleGroupBy = (ref: ColumnRef) => {
    setGroupByCols((prev) => {
      const n = new Set(prev);

      if (n.has(ref)) n.delete(ref);
      else n.add(ref);

      return n;
    });
  };
  const handleStartOver = () => {
    setDdlInput(EXAMPLE_SCHEMAS[0].ddl);
    clearSelections();
    setShowCustomDDL(false);
    setColumnFilter("");
  };

  const loadExample = (example: ExampleSchema) => {
    setDdlInput(example.ddl);
  };

  const handleCopy = async () => {
    const sql = displaySQL;

    if (!sql) return;
    try {
      await navigator.clipboard.writeText(sql);
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (isAuthenticated) {
      try {
        await apiFetch("/api/sql-history", {
          method: "POST",
          body: JSON.stringify({
            sql_text: sql,
            schema_snapshot: schema as unknown as Record<string, unknown>,
          }),
        });
      } catch {}
    }
  };

  const loadHistory = useCallback(async () => {
    if (!isAuthenticated) return;
    setHistoryLoading(true);
    try {
      const data = await apiFetch<HistoryItem[]>("/api/sql-history");

      setHistory(data ?? []);
    } catch {
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  }, [isAuthenticated]);

  const handleToggleHistory = () => {
    const next = !showHistory;

    setShowHistory(next);
    if (next) loadHistory();
  };

  const deleteHistoryItem = async (id: string) => {
    try {
      await apiFetch(`/api/sql-history/${id}`, { method: "DELETE" });
      setHistory((p) => p.filter((h) => h.id !== id));
    } catch {}
  };

  const loadHistoryItem = (item: HistoryItem) => {
    setActiveSQL(item.sql_text);
    setShowHistory(false);
  };

  return (
    <article aria-label="Constructor SQL interactivo" className="max-w-4xl">
      {/* ── Header ── */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50">
            Herramienta
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            Interactivo
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          Constructor SQL
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          Construye consultas <code className="font-semibold">SELECT</code>{" "}
          cliqueando tablas y columnas. Sin escribir SQL a mano.
        </p>
      </div>

      {/* ── Docs toggle ── */}
      <div className="mb-4">
        <button
          aria-controls="sql-builder-docs"
          aria-expanded={showDocs}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/5 dark:bg-white/10 text-[#1d1d1f] dark:text-white hover:bg-black/10 dark:hover:bg-white/15 transition-all"
          onClick={() => setShowDocs((v) => !v)}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            viewBox="0 0 16 16"
          >
            <path d={showDocs ? "M4 10l4-4 4 4" : "M6 4l4 4-4 4"} />
          </svg>{" "}
          <BookIcon aria-hidden="true" className="w-3.5 h-3.5" /> ¿Cómo usarlo?
        </button>
      </div>

      {showDocs && (
        <div
          className="mb-6 p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-sm text-[#3a3a3c] dark:text-[#aeaeb2] space-y-3"
          id="sql-builder-docs"
        >
          <p className="font-semibold text-[#1d1d1f] dark:text-white flex items-center gap-1.5">
            <BookIcon aria-hidden="true" className="w-4 h-4" /> Guía rápida
          </p>
          <ol className="list-decimal pl-4 space-y-1.5">
            <li>
              Haz clic en una columna para seleccionarla{" "}
              <svg
                aria-hidden="true"
                className="w-3.5 h-3.5 inline-block align-text-bottom text-emerald-500"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 16 16"
              >
                <path d="M3 8l3 3 7-7" />
              </svg>
              .
            </li>
            <li>
              Usa <strong>Filtrar</strong>, <strong>Ordenar</strong> o{" "}
              <strong>Agrupar</strong> en cada columna para armar tu consulta.
            </li>
            <li>
              En <strong>Filtrar</strong> escribe el valor después del{" "}
              <code>=</code>.
            </li>
            <li>
              En <strong>Ordenar</strong> cada clic cambia:{" "}
              <strong>
                OFF{" "}
                <svg
                  aria-hidden="true"
                  className="w-3 h-3 inline-block align-text-bottom"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 16 16"
                >
                  <path d="M9 3l4 4-4 4M13 7H3" />
                </svg>{" "}
                <svg
                  aria-hidden="true"
                  className="w-3 h-3 inline-block align-text-bottom"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 12V4M4 8l4-4 4 4" />
                </svg>{" "}
                ASC{" "}
                <svg
                  aria-hidden="true"
                  className="w-3 h-3 inline-block align-text-bottom"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4v8M4 8l4 4 4-4" />
                </svg>{" "}
                DESC{" "}
                <svg
                  aria-hidden="true"
                  className="w-3 h-3 inline-block align-text-bottom"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 16 16"
                >
                  <path d="M7 13l-4-4 4-4M3 9h10" />
                </svg>{" "}
                OFF
              </strong>
              .
            </li>
          </ol>
          <p className="font-semibold text-[#1d1d1f] dark:text-white mt-3 flex items-center gap-1.5">
            <LinkIcon aria-hidden="true" className="w-4 h-4" /> JOINs
            automáticos
          </p>
          <p>
            Si seleccionas columnas de tablas relacionadas por clave foránea (
            <code>REFERENCES</code>), el JOIN se genera automáticamente. La
            tabla sin FK actúa como <code>FROM</code> principal.
          </p>
          <p className="font-semibold text-[#1d1d1f] dark:text-white mt-3 flex items-center gap-1.5">
            <DocumentIcon aria-hidden="true" className="w-4 h-4" /> Formato DDL
            esperado
          </p>
          <p>
            Sentencias <code>CREATE TABLE</code> estándar con columnas, tipos,{" "}
            <code>PRIMARY KEY</code> inline o standalone, y{" "}
            <code>REFERENCES</code> para claves foráneas.
          </p>
        </div>
      )}

      {/* ── Schema preview ── */}
      <div className="mb-6 space-y-3">
        <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
          Tablas
        </p>
        {hasSchema && (
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#aeaeb2] dark:text-[#636366]"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              viewBox="0 0 16 16"
            >
              <circle cx="7" cy="7" r="4.5" />
              <path d="M10.5 10.5L14 14" />
            </svg>
            <input
              aria-label="Filtrar columnas"
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:border-transparent transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
              placeholder="Buscar columna…"
              type="text"
              value={columnFilter}
              onChange={(e) => setColumnFilter(e.target.value)}
            />
          </div>
        )}
        {!hasSchema ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {EXAMPLE_SCHEMAS.map((ex) => (
              <button
                key={ex.id}
                className="text-left p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#111116] hover:bg-blue-50/50 dark:hover:bg-blue-950/20 hover:border-blue-200 dark:hover:border-blue-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 group"
                onClick={() => loadExample(ex)}
              >
                <p className="font-semibold text-sm text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {ex.label}
                </p>
                <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1">
                  Tablas: {ex.tables}
                </p>
                <div className="flex gap-1.5 mt-2">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                    Empezar
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {schema.map((table) => {
              const filteredCount = columnFilter
                ? table.columns.filter((col) =>
                    col.name.toLowerCase().includes(columnFilter.toLowerCase()),
                  ).length
                : table.columns.length;
              const tableHasActive = table.columns.some((col) => {
                const ref = `${table.name}.${col.name}`;

                return (
                  selectCols.has(ref) ||
                  whereCols.has(ref) ||
                  orderByCols.has(ref) ||
                  groupByCols.has(ref)
                );
              });
              const allRefs = table.columns.map(
                (col) => `${table.name}.${col.name}` as ColumnRef,
              );
              const allSelected = allRefs.every((ref) => selectCols.has(ref));

              return (
                <div
                  key={table.name}
                  className="border border-black/10 dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-[#0a0a0f] shadow-sm"
                >
                  {/* Clickable header with collapse/expand */}
                  <div
                    className="px-4 py-2.5 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/20 dark:to-indigo-950/20 border-b border-black/10 dark:border-white/10 cursor-pointer hover:from-blue-50 dark:hover:from-blue-950/30 transition-colors"
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleCollapse(table.name)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleCollapse(table.name);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <svg
                          className={`w-3.5 h-3.5 text-[#6e6e73] dark:text-[#86868b] transition-transform flex-shrink-0 ${collapsedTables.has(table.name) ? "-rotate-90" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4 6l4 4 4-4" />
                        </svg>
                        <h3 className="font-semibold text-sm text-[#1d1d1f] dark:text-white tracking-tight truncate">
                          {table.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {tableHasActive && (
                          <div
                            aria-label="Cláusulas activas"
                            className="w-2 h-2 rounded-full bg-blue-500"
                          />
                        )}
                        <button
                          aria-label={
                            allSelected
                              ? `Deseleccionar todas las columnas de ${table.name}`
                              : `Seleccionar todas las columnas de ${table.name}`
                          }
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSelectAll(table);
                          }}
                        >
                          {allSelected ? "✕ ALL" : "SEL ALL"}
                        </button>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white/60 dark:bg-black/40 text-[#6e6e73] dark:text-[#86868b] border border-black/5 dark:border-white/10">
                          {columnFilter
                            ? `${filteredCount}/${table.columns.length}`
                            : table.columns.length}{" "}
                          col{table.columns.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Column rows */}
                  {!collapsedTables.has(table.name) && (
                    <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                      {table.columns
                        .filter(
                          (col) =>
                            !columnFilter ||
                            col.name
                              .toLowerCase()
                              .includes(columnFilter.toLowerCase()),
                        )
                        .map((col) => {
                          const ref = `${table.name}.${col.name}` as ColumnRef;
                          const selActive = selectCols.has(ref);
                          const whrActive = whereCols.has(ref);
                          const whrValue = whereCols.get(ref) ?? "";
                          const ordActive = orderByCols.has(ref);
                          const ordDir = orderByCols.get(ref);
                          const grpActive = groupByCols.has(ref);
                          const hasActive =
                            selActive || whrActive || ordActive || grpActive;

                          return (
                            <div key={col.name}>
                              <div
                                className="flex items-center gap-2 px-4 py-2 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors cursor-pointer group"
                                role="button"
                                tabIndex={0}
                                onClick={() => toggleSelect(ref)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    toggleSelect(ref);
                                  }
                                }}
                              >
                                {/* Selected checkmark */}
                                <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                                  {selActive ? (
                                    <CheckIcon
                                      aria-label="Seleccionada"
                                      className="w-4 h-4 text-emerald-500"
                                    />
                                  ) : (
                                    <div
                                      aria-hidden="true"
                                      className="w-4 h-4 rounded border-2 border-black/20 dark:border-white/20 group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-colors"
                                    />
                                  )}
                                </div>
                                {/* PK/FK icon */}
                                <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                                  {col.isPk && (
                                    <KeyIcon
                                      aria-label="Clave primaria"
                                      className="w-3.5 h-3.5 text-amber-500"
                                    />
                                  )}
                                  {col.fk && !col.isPk && (
                                    <LinkIcon
                                      aria-label={`Clave foránea a ${col.fk.table}.${col.fk.column}`}
                                      className="w-3.5 h-3.5 text-blue-400 dark:text-blue-500"
                                    />
                                  )}
                                </div>
                                {/* Column name */}
                                <span
                                  className={`font-mono text-sm truncate min-w-0 ${selActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-[#1d1d1f] dark:text-white"}`}
                                >
                                  {col.name}
                                </span>
                                {/* Type badge */}
                                <span
                                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded flex-shrink-0 ${getTypeColor(col.type)}`}
                                >
                                  {col.type}
                                </span>
                                {/* FK reference */}
                                {col.fk && (
                                  <span className="text-[10px] text-blue-500 dark:text-blue-400 font-mono flex-shrink-0 hidden sm:inline">
                                    → {col.fk.table}.{col.fk.column}
                                  </span>
                                )}
                                {/* Spacer */}
                                <div className="flex-1 min-w-2" />
                                {/* Toggle badges */}
                                <div
                                  aria-label={`Cláusulas para ${col.name}`}
                                  className="flex items-center gap-1 flex-shrink-0"
                                  role="group"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Badge
                                    active={whrActive}
                                    color="amber"
                                    label={`WHERE ${ref}`}
                                    onClick={() => toggleWhere(ref)}
                                  >
                                    Filtrar
                                  </Badge>
                                  <Badge
                                    active={ordActive}
                                    color="green"
                                    label={`ORDER BY ${ref}`}
                                    onClick={() => toggleOrderBy(ref)}
                                  >
                                    {ordActive && ordDir
                                      ? ordDir === "ASC"
                                        ? "↑"
                                        : "↓"
                                      : "Ordenar"}
                                  </Badge>
                                  <Badge
                                    active={grpActive}
                                    color="purple"
                                    label={`GROUP BY ${ref}`}
                                    onClick={() => toggleGroupBy(ref)}
                                  >
                                    Agrupar
                                  </Badge>
                                </div>
                              </div>
                              {/* WHERE value input */}
                              {whrActive && (
                                <div className="flex items-center gap-1.5 pb-2 pl-11 pr-4">
                                  <span
                                    aria-hidden="true"
                                    className="text-[10px] font-mono text-[#6e6e73] dark:text-[#86868b]"
                                  >
                                    =
                                  </span>
                                  <input
                                    aria-label={`Valor para filtro WHERE en ${ref}`}
                                    className="flex-1 max-w-32 px-2 py-0.5 rounded-md text-xs font-mono bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-600 focus:border-transparent transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
                                    placeholder="valor"
                                    value={whrValue}
                                    onChange={(e) =>
                                      updateWhereValue(ref, e.target.value)
                                    }
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Start over ── */}
      {selectCols.size > 0 && (
        <div className="mb-4 flex justify-center">
          <button
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={handleStartOver}
          >
            <TrashIcon aria-hidden="true" className="w-3.5 h-3.5" /> Empezar de
            nuevo
          </button>
        </div>
      )}

      {/* ── Custom DDL (collapsible) ── */}
      <div className="mb-6">
        <button
          aria-expanded={showCustomDDL}
          className="inline-flex items-center gap-1.5 text-xs text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors focus:outline-none"
          onClick={() => setShowCustomDDL((v) => !v)}
        >
          <PlusIcon
            aria-hidden="true"
            className={`w-3.5 h-3.5 transition-transform ${showCustomDDL ? "rotate-45" : ""}`}
          />
          ¿Tienes tus propias tablas?
        </button>
        {showCustomDDL && (
          <div className="mt-2 space-y-2">
            <textarea
              aria-describedby={parseError ? "ddl-parse-error" : undefined}
              aria-invalid={parseError}
              className="w-full h-24 p-3 text-sm font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:border-transparent transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
              id="sql-ddl-input"
              placeholder="Pega tus sentencias CREATE TABLE aquí&#10;CREATE TABLE usuarios (&#10;  id SERIAL PRIMARY KEY,&#10;  nombre VARCHAR(100) NOT NULL&#10;);"
              value={ddlInput}
              onChange={(e) => setDdlInput(e.target.value)}
            />
            {parseError && (
              <p
                className="text-xs text-amber-600 dark:text-amber-400"
                id="ddl-parse-error"
                role="alert"
              >
                <WarningIcon
                  aria-hidden="true"
                  className="w-3.5 h-3.5 inline-block align-text-bottom"
                />{" "}
                No se pudieron detectar tablas. Revisa la sintaxis.
              </p>
            )}
            <div className="flex gap-2 flex-wrap">
              {EXAMPLE_SCHEMAS.map((ex) => (
                <button
                  key={ex.id}
                  className="text-[10px] px-2 py-1 rounded-lg bg-black/5 dark:bg-white/10 text-[#1d1d1f] dark:text-white hover:bg-black/10 dark:hover:bg-white/15 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={() => loadExample(ex)}
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── SQL output ── */}
      <div ref={outputRef} className="sticky top-4 z-10 mb-6">
        <div className="space-y-2 bg-white dark:bg-[#0a0a0f] rounded-xl p-4 border border-black/10 dark:border-white/10 shadow-sm">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            Tu consulta
          </p>
          {!displaySQL ? (
            <div className="rounded-xl bg-[#0d1117] p-4 overflow-x-auto text-xs text-[#8b949e]">
              Selecciona columnas y cláusulas para generar una consulta…
            </div>
          ) : (
            <>
              <div
                aria-label="Consulta SQL generada"
                aria-live="polite"
                role="region"
              >
                <pre className="rounded-xl bg-[#0d1117] p-4 overflow-x-auto text-xs leading-relaxed">
                  {highlightSQL(displaySQL)}
                </pre>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  aria-label={
                    copied ? "SQL copiado" : "Copiar SQL al portapapeles"
                  }
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${copied ? "bg-emerald-500 text-white" : "bg-black/5 dark:bg-white/10 text-[#1d1d1f] dark:text-white hover:bg-black/10 dark:hover:bg-white/15"} focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 dark:focus:ring-blue-600`}
                  onClick={handleCopy}
                >
                  {copied ? (
                    "¡Copiado!"
                  ) : (
                    <>
                      <ClipboardIcon
                        aria-hidden="true"
                        className="w-3.5 h-3.5"
                      />{" "}
                      Copiar
                    </>
                  )}
                </button>
                {isAuthenticated && (
                  <button
                    aria-controls="sql-history-panel"
                    aria-expanded={showHistory}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/5 dark:bg-white/10 text-[#1d1d1f] dark:text-white hover:bg-black/10 dark:hover:bg-white/15 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 dark:focus:ring-blue-600"
                    onClick={handleToggleHistory}
                  >
                    <ClipboardIcon aria-hidden="true" className="w-3.5 h-3.5" />{" "}
                    Historial
                  </button>
                )}
                {activeSQL && (
                  <button
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/5 dark:bg-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/10 dark:hover:bg-white/15 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 dark:focus:ring-blue-600"
                    onClick={() => setActiveSQL(null)}
                  >
                    Volver al editor
                  </button>
                )}
                {copied && (
                  <span
                    className="text-xs text-emerald-600 dark:text-emerald-400"
                    role="status"
                  >
                    Copiado al portapapeles
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── History panel ── */}
      {isAuthenticated && showHistory && (
        <div
          className="mb-6 rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden"
          id="sql-history-panel"
        >
          <div className="px-4 py-2.5 bg-black/[0.03] dark:bg-white/[0.03] border-b border-black/10 dark:border-white/10">
            <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
              Historial de consultas
            </h3>
          </div>
          <div className="px-4 py-3 max-h-64 overflow-y-auto">
            {historyLoading ? (
              <div
                aria-live="polite"
                className="flex items-center justify-center py-6"
              >
                <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                  Cargando…
                </span>
              </div>
            ) : history.length === 0 ? (
              <div className="py-6 text-center text-xs text-[#aeaeb2] dark:text-[#636366]">
                No hay consultas guardadas
              </div>
            ) : (
              <ul
                aria-label="Consultas guardadas"
                className="space-y-2"
                role="list"
              >
                {history.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5"
                  >
                    <div className="flex-1 min-w-0">
                      <pre className="text-xs font-mono text-[#1d1d1f] dark:text-white truncate">
                        {item.sql_text}
                      </pre>
                      <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] mt-0.5">
                        {relativeTime(item.created_at, "es")}
                      </p>
                    </div>
                    <button
                      aria-label={`Cargar consulta: ${item.sql_text.slice(0, 60)}`}
                      className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-black/5 dark:bg-white/10 text-[#1d1d1f] dark:text-white hover:bg-black/10 dark:hover:bg-white/15 transition-all flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
                      onClick={() => loadHistoryItem(item)}
                    >
                      Cargar
                    </button>
                    <button
                      aria-label={`Eliminar consulta: ${item.sql_text.slice(0, 60)}`}
                      className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-black/5 dark:bg-white/10 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600"
                      onClick={() => deleteHistoryItem(item.id)}
                    >
                      <TrashIcon aria-hidden="true" className="w-3.5 h-3.5" />
                      <span className="sr-only">Eliminar</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
