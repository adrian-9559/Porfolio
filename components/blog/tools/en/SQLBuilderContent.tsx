"use client";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import { apiFetch } from "@/services/apiClient";

interface ColumnDef {
  name: string;
  type: string;
  isPk: boolean;
  fk?: { table: string; column: string };
}

interface TableDef {
  name: string;
  columns: ColumnDef[];
}

type ColumnRef = string;

interface HistoryItem {
  id: string;
  sql_text: string;
  schema_snapshot: Record<string, unknown> | null;
  created_at: string;
}

interface ExampleSchema {
  id: string;
  label: string;
  ddl: string;
  tables: string;
}

const EXAMPLE_SCHEMAS: ExampleSchema[] = [
  {
    id: "users-orders",
    label: "Users-Orders",
    tables: "usuarios, pedidos",
    ddl: `CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  edad INT,
  ciudad VARCHAR(100),
  creado_en TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id),
  producto VARCHAR(255) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  fecha DATE DEFAULT CURRENT_DATE
);`,
  },
  {
    id: "employees",
    label: "Employees-Departments",
    tables: "departamentos, empleados",
    ddl: `CREATE TABLE departamentos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  presupuesto DECIMAL(12,2)
);

CREATE TABLE empleados (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  salario DECIMAL(10,2),
  departamento_id INT REFERENCES departamentos(id),
  fecha_contratacion DATE
);`,
  },
];

const BADGE_STYLES = {
  blue: {
    active: "bg-blue-500 text-white shadow-sm",
    inactive: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30",
  },
  amber: {
    active: "bg-amber-500 text-white shadow-sm",
    inactive: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30",
  },
  green: {
    active: "bg-emerald-500 text-white shadow-sm",
    inactive: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30",
  },
  purple: {
    active: "bg-purple-500 text-white shadow-sm",
    inactive: "bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30",
  },
} as const;

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 3h5a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2V3Z" /><path d="M14 3H9a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h5V3Z" /><path d="M7 6H3.5M7 8H3.5" /></svg>);
}
function FolderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M1.5 4.5v7a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H8.5L7 3.5h-4a1 1 0 0 0-1 1Z" /></svg>);
}
function LinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6.5 9.5a4 4 0 0 0 5.66 0l2-2a4 4 0 0 0-5.66-5.66l-1 1" /><path d="M9.5 6.5a4 4 0 0 0-5.66 0l-2 2a4 4 0 1 0 5.66 5.66l1-1" /></svg>);
}
function DocumentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 1.5h5l3.5 3.5v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1Z" /><path d="M9 1.5V5h3.5" /></svg>);
}
function WarningIcon(props: React.SVGProps<SVGSVGElement>) {
  return (<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 1L1 14h14L8 1Z" /><path d="M8 6v3M8 12v.5" /></svg>);
}
function KeyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="6" cy="10" r="3.5" /><path d="M8.5 7.5L13 3" /><path d="M11 5l1.5-1.5" /></svg>);
}
function ClipboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3.5" y="2.5" width="9" height="12" rx="1" /><path d="M6 1.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5Z" /><path d="M5.5 6.5h5M5.5 9h5M5.5 11.5h3" /></svg>);
}
function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 3.5h12" /><path d="M5 3.5V2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v1.5" /><path d="M3.5 3.5l.72 9.36a1 1 0 0 0 .995.89h5.57a1 1 0 0 0 .995-.89L12.5 3.5" /></svg>);
}

function Badge({
  active, color, onClick, label, children,
}: {
  active: boolean;
  color: keyof typeof BADGE_STYLES;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  const s = BADGE_STYLES[color];
  return (
    <button
      role="switch"
      aria-checked={active}
      aria-label={label}
      onClick={onClick}
      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer select-none leading-none ${active ? s.active : s.inactive} focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 dark:focus:ring-blue-600`}
    >
      {children}
    </button>
  );
}

function splitByCommaOutsideParens(sql: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of sql) {
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      if (current.trim()) parts.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

function extractBody(ddl: string, openIdx: number): string {
  let depth = 1;
  let i = openIdx;
  while (i < ddl.length && depth > 0) {
    i++;
    if (ddl[i] === "(") depth++;
    else if (ddl[i] === ")") depth--;
  }
  return ddl.slice(openIdx + 1, i);
}

function parseDDL(ddl: string): TableDef[] {
  const tables: TableDef[] = [];
  const tableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(/gi;
  let match: RegExpExecArray | null;
  while ((match = tableRegex.exec(ddl)) !== null) {
    const tableName = match[1];
    const body = extractBody(ddl, match.index + match[0].length - 1);
    const columns: ColumnDef[] = [];
    const pkCols = new Set<string>();
    const fkCols = new Map<string, { table: string; column: string }>();
    for (const part of splitByCommaOutsideParens(body)) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      const pkMatch = trimmed.match(/^PRIMARY\s+KEY\s*\(\s*(\w+)\s*\)/i);
      if (pkMatch) { pkCols.add(pkMatch[1]); continue; }
      const fkMatch = trimmed.match(/^FOREIGN\s+KEY\s*\(\s*(\w+)\s*\)\s*REFERENCES\s+(\w+)\s*\(\s*(\w+)\s*\)/i);
      if (fkMatch) { fkCols.set(fkMatch[1], { table: fkMatch[2], column: fkMatch[3] }); continue; }
      const colMatch = trimmed.match(/^(\w+)\s+(\w+(?:\s*\([^)]*\))?)\s*(.*)/i);
      if (colMatch) {
        const colName = colMatch[1], colType = colMatch[2], constraints = colMatch[3] ?? "";
        if (/primary\s+key/i.test(constraints)) pkCols.add(colName);
        const refMatch = constraints.match(/references\s+(\w+)\s*\((\w+)\)/i);
        if (refMatch) fkCols.set(colName, { table: refMatch[1], column: refMatch[2] });
        columns.push({ name: colName, type: colType, isPk: false });
      }
    }
    for (const col of columns) {
      if (pkCols.has(col.name)) col.isPk = true;
      const fk = fkCols.get(col.name);
      if (fk) col.fk = fk;
    }
    if (columns.length > 0) tables.push({ name: tableName, columns });
  }
  return tables;
}

function generateSQL(
  schema: TableDef[], selectCols: Set<ColumnRef>, whereCols: Map<ColumnRef, string>,
  orderByCols: Map<ColumnRef, "ASC" | "DESC">, groupByCols: Set<ColumnRef>,
): string {
  const tablesInvolved = new Set<string>();
  const collect = (ref: ColumnRef) => tablesInvolved.add(ref.split(".")[0]);
  selectCols.forEach(collect);
  whereCols.forEach((_, ref) => collect(ref));
  orderByCols.forEach((_, ref) => collect(ref));
  groupByCols.forEach(collect);
  if (tablesInvolved.size === 0) return "";
  const childLinks = new Map<string, { fromCol: string; parentTable: string; toCol: string }>();
  for (const table of schema) {
    if (!tablesInvolved.has(table.name)) continue;
    for (const col of table.columns) {
      if (col.fk && tablesInvolved.has(col.fk.table)) {
        childLinks.set(table.name, { fromCol: col.name, parentTable: col.fk.table, toCol: col.fk.column });
      }
    }
  }
  const childTables = new Set(childLinks.keys());
  const fromTable = Array.from(tablesInvolved).find((t) => !childTables.has(t)) ?? Array.from(tablesInvolved)[0];
  const lines: string[] = [];
  if (selectCols.size === 0) { lines.push("SELECT *"); }
  else { lines.push(`SELECT\n  ${Array.from(selectCols).sort().join(",\n  ")}`); }
  lines.push(`FROM ${fromTable}`);
  for (const [child, link] of childLinks) {
    if (child === fromTable) continue;
    lines.push(`JOIN ${child} ON ${child}.${link.fromCol} = ${link.parentTable}.${link.toCol}`);
  }
  const whereParts = Array.from(whereCols.entries()).filter(([, val]) => val.trim() !== "").map(([col, val]) => `${col} = '${val}'`);
  if (whereParts.length > 0) lines.push(`WHERE\n  ${whereParts.join("\n  AND ")}`);
  if (groupByCols.size > 0) lines.push(`GROUP BY ${Array.from(groupByCols).sort().join(", ")}`);
  if (orderByCols.size > 0) lines.push(`ORDER BY ${Array.from(orderByCols).map(([col, dir]) => `${col} ${dir}`).join(", ")}`);
  return lines.join("\n") + ";";
}

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffSec = Math.floor((now - then) / 1000);
  if (diffSec < 60) return "a few seconds ago";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDays = Math.floor(diffHr / 24);
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return new Date(dateStr).toLocaleDateString("en-US");
}

export default function SQLBuilderContentEn() {
  const { isAuthenticated } = useAuthStore();
  const outputRef = useRef<HTMLDivElement>(null);

  const [ddlInput, setDdlInput] = useState("");
  const [schema, setSchema] = useState<TableDef[]>([]);
  const [selectCols, setSelectCols] = useState<Set<ColumnRef>>(new Set());
  const [whereCols, setWhereCols] = useState<Map<ColumnRef, string>>(new Map());
  const [orderByCols, setOrderByCols] = useState<Map<ColumnRef, "ASC" | "DESC">>(new Map());
  const [groupByCols, setGroupByCols] = useState<Set<ColumnRef>>(new Set());
  const [activeSQL, setActiveSQL] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const clearSelections = useCallback(() => {
    setSelectCols(new Set());
    setWhereCols(new Map());
    setOrderByCols(new Map());
    setGroupByCols(new Set());
    setActiveSQL(null);
  }, []);

  useEffect(() => {
    const parsed = parseDDL(ddlInput);
    setSchema(parsed);
    clearSelections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ddlInput]);

  const generatedSQL = useMemo(
    () => generateSQL(schema, selectCols, whereCols, orderByCols, groupByCols),
    [schema, selectCols, whereCols, orderByCols, groupByCols],
  );

  const displaySQL = activeSQL ?? generatedSQL;

  const hasSchema = schema.length > 0;
  const parseError = ddlInput.trim() !== "" && !hasSchema;

  const toggleSelect = (ref: ColumnRef) => {
    setSelectCols((prev) => { const n = new Set(prev); if (n.has(ref)) n.delete(ref); else n.add(ref); return n; });
  };
  const toggleWhere = (ref: ColumnRef) => {
    setWhereCols((prev) => { const n = new Map(prev); if (n.has(ref)) n.delete(ref); else n.set(ref, ""); return n; });
  };
  const updateWhereValue = (ref: ColumnRef, value: string) => {
    setWhereCols((prev) => { const n = new Map(prev); n.set(ref, value); return n; });
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
    setGroupByCols((prev) => { const n = new Set(prev); if (n.has(ref)) n.delete(ref); else n.add(ref); return n; });
  };
  const orderLabel = (dir: "ASC" | "DESC") => dir === "ASC" ? "ORDER ↑" : "ORDER ↓";

  const loadExample = (example: ExampleSchema) => {
    setDdlInput(example.ddl);
    setShowExamples(false);
  };

  const handleCopy = async () => {
    const sql = displaySQL;
    if (!sql) return;
    try { await navigator.clipboard.writeText(sql); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (isAuthenticated) {
      try {
        await apiFetch("/api/sql-history", {
          method: "POST",
          body: JSON.stringify({ sql_text: sql, schema_snapshot: schema as unknown as Record<string, unknown> }),
        });
      } catch {}
    }
  };

  const loadHistory = useCallback(async () => {
    if (!isAuthenticated) return;
    setHistoryLoading(true);
    try { const data = await apiFetch<HistoryItem[]>("/api/sql-history"); setHistory(data ?? []); }
    catch { setHistory([]); }
    finally { setHistoryLoading(false); }
  }, [isAuthenticated]);

  const handleToggleHistory = () => {
    const next = !showHistory;
    setShowHistory(next);
    if (next) loadHistory();
  };

  const deleteHistoryItem = async (id: string) => {
    try { await apiFetch(`/api/sql-history/${id}`, { method: "DELETE" }); setHistory((p) => p.filter((h) => h.id !== id)); }
    catch {}
  };

  const loadHistoryItem = (item: HistoryItem) => {
    setActiveSQL(item.sql_text);
    setShowHistory(false);
  };

  return (
    <article className="max-w-4xl" aria-label="Interactive SQL Builder">
      {/* ── Header ── */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50">Tool</span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">Interactive</span>
        </div>
        <h1 className="text-4xl font-bold text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>SQL Builder</h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          Build <code className="font-semibold">SELECT</code> queries by clicking on tables and columns. No manual SQL required.
        </p>
      </div>

      {/* ── Docs toggle ── */}
      <div className="mb-4">
        <button
          aria-expanded={showDocs}
          aria-controls="sql-builder-docs"
          onClick={() => setShowDocs((v) => !v)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/5 dark:bg-white/10 text-[#1d1d1f] dark:text-white hover:bg-black/10 dark:hover:bg-white/15 transition-all"
        >
          {showDocs ? "▼" : "▶"} <BookIcon className="w-3.5 h-3.5" aria-hidden="true" /> How to use
        </button>
      </div>

      {showDocs && (
        <div
          id="sql-builder-docs"
          className="mb-6 p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-sm text-[#3a3a3c] dark:text-[#aeaeb2] space-y-3"
        >
          <p className="font-semibold text-[#1d1d1f] dark:text-white flex items-center gap-1.5"><BookIcon className="w-4 h-4" aria-hidden="true" /> Quick guide</p>
          <ol className="list-decimal pl-4 space-y-1.5">
            <li><strong>Paste your DDL</strong> into the textarea with <code>CREATE TABLE</code> statements, or click <strong><FolderIcon className="w-3.5 h-3.5 inline-block align-text-bottom" aria-hidden="true" /> Load examples</strong>" to use a prebuilt schema.</li>
            <li><strong>Click the badges</strong> on each column to add it to <code>SELECT</code>, <code>WHERE</code>, <code>ORDER BY</code>, or <code>GROUP BY</code>.</li>
            <li>For <code>WHERE</code>, type the filter value in the input that appears.</li>
            <li>For <code>ORDER BY</code>, each click cycles: <strong>OFF → ASC → DESC → OFF</strong>.</li>
          </ol>
          <p className="font-semibold text-[#1d1d1f] dark:text-white mt-3 flex items-center gap-1.5"><LinkIcon className="w-4 h-4" aria-hidden="true" /> Automatic JOINs</p>
          <p>If you select columns from tables related by foreign keys (<code>REFERENCES</code>), the JOIN is generated automatically. The table without a FK acts as the main <code>FROM</code>.</p>
          <p className="font-semibold text-[#1d1d1f] dark:text-white mt-3 flex items-center gap-1.5"><DocumentIcon className="w-4 h-4" aria-hidden="true" /> Expected DDL format</p>
          <p>Standard <code>CREATE TABLE</code> statements with columns, types, inline or standalone <code>PRIMARY KEY</code>, and <code>REFERENCES</code> for foreign keys.</p>
        </div>
      )}

      {/* ── DDL Input + Examples ── */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <label htmlFor="sql-ddl-input" className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            DDL
          </label>
          <button
            aria-expanded={showExamples}
            aria-controls="sql-examples-panel"
            onClick={() => setShowExamples((v) => !v)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-black/5 dark:bg-white/10 text-[#1d1d1f] dark:text-white hover:bg-black/10 dark:hover:bg-white/15 transition-all"
          >
            <FolderIcon className="w-3 h-3" aria-hidden="true" /> Load examples {showExamples ? "▲" : "▼"}
          </button>
        </div>
        <textarea
          id="sql-ddl-input"
          aria-describedby={parseError ? "ddl-parse-error" : undefined}
          aria-invalid={parseError}
          className="w-full h-28 p-3 text-sm font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:border-transparent transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
          placeholder="Paste your CREATE TABLE statements here&#10;CREATE TABLE users (&#10;  id SERIAL PRIMARY KEY,&#10;  name VARCHAR(100) NOT NULL&#10;);"
          value={ddlInput}
          onChange={(e) => setDdlInput(e.target.value)}
        />
        {parseError && (
          <p id="ddl-parse-error" role="alert" className="text-xs text-amber-600 dark:text-amber-400">
            <WarningIcon className="w-3.5 h-3.5 inline-block align-text-bottom" aria-hidden="true" /> Could not detect any tables. Check DDL syntax.
          </p>
        )}

        {showExamples && (
          <div id="sql-examples-panel" className="grid gap-2 sm:grid-cols-2">
            {EXAMPLE_SCHEMAS.map((ex) => (
              <button
                key={ex.id}
                onClick={() => loadExample(ex)}
                className="text-left p-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#111116] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 group"
              >
                <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{ex.label}</p>
                <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-0.5">Tables: {ex.tables}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Schema preview ── */}
      <div className="mb-6 space-y-3">
        <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">Schema</p>
        {!hasSchema ? (
          <div className="p-8 rounded-2xl border border-black/10 dark:border-white/10 text-center text-sm text-[#aeaeb2] dark:text-[#636366]">
            Paste CREATE TABLE statements or load an example to get started
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2" role="list" aria-label="Available tables">
            {schema.map((table) => (
              <div key={table.name} role="listitem" className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
                <div className="px-4 py-2.5 bg-black/[0.03] dark:bg-white/[0.03] border-b border-black/10 dark:border-white/10">
                  <h3 className="font-semibold text-sm text-[#1d1d1f] dark:text-white">{table.name}</h3>
                </div>
                <div className="px-4 py-2 divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                  {table.columns.map((col) => {
                    const ref = `${table.name}.${col.name}` as ColumnRef;
                    const selActive = selectCols.has(ref);
                    const whrActive = whereCols.has(ref);
                    const whrValue = whereCols.get(ref) ?? "";
                    const ordActive = orderByCols.has(ref);
                    const ordDir = orderByCols.get(ref);
                    const grpActive = groupByCols.has(ref);
                    return (
                      <div key={col.name} className="py-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            {col.isPk && <KeyIcon className="w-3 h-3 flex-shrink-0" aria-label="Primary key" />}
                            {col.fk && <LinkIcon className="w-3 h-3 flex-shrink-0" aria-label={`Foreign key to ${col.fk.table}.${col.fk.column}`} />}
                            <span className="font-mono text-sm text-[#1d1d1f] dark:text-white truncate">{col.name}</span>
                            <span className="text-xs text-[#aeaeb2] dark:text-[#636366] font-mono hidden sm:inline flex-shrink-0">{col.type}</span>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0 flex-wrap justify-end">
                            <Badge active={selActive} color="blue" onClick={() => toggleSelect(ref)} label={`Add ${ref} to SELECT`}>SELECT</Badge>
                            <Badge active={whrActive} color="amber" onClick={() => toggleWhere(ref)} label={`Add ${ref} to WHERE`}>WHERE</Badge>
                            <Badge active={ordActive} color="green" onClick={() => toggleOrderBy(ref)} label={`Add ${ref} to ORDER BY`}>
                              {ordActive && ordDir ? orderLabel(ordDir) : "ORDER"}
                            </Badge>
                            <Badge active={grpActive} color="purple" onClick={() => toggleGroupBy(ref)} label={`Add ${ref} to GROUP BY`}>GROUP BY</Badge>
                          </div>
                        </div>
                        {whrActive && (
                          <div className="flex items-center gap-1.5 mt-1.5 ml-5">
                            <span className="text-[10px] font-mono text-[#6e6e73] dark:text-[#86868b]" aria-hidden="true">=</span>
                            <input
                              aria-label={`Filter value for WHERE on ${ref}`}
                              className="w-28 px-2 py-0.5 rounded-md text-xs font-mono bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#1d1d1f] dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-600 focus:border-transparent transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
                              placeholder="value"
                              value={whrValue}
                              onChange={(e) => updateWhereValue(ref, e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── SQL output ── */}
      <div className="space-y-2 mb-6" ref={outputRef}>
        <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">Generated SQL</p>
        {!displaySQL ? (
          <div className="rounded-xl bg-[#0d1117] p-4 overflow-x-auto text-xs text-[#8b949e]">
            Select columns and clauses to generate a query…
          </div>
        ) : (
          <>
            <div role="region" aria-live="polite" aria-label="Generated SQL query">
              <pre className="rounded-xl bg-[#0d1117] p-4 overflow-x-auto text-xs leading-relaxed">
                <code className="text-[#e6edf3]">{displaySQL}</code>
              </pre>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleCopy}
                aria-label={copied ? "SQL copied" : "Copy SQL to clipboard"}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${copied ? "bg-emerald-500 text-white" : "bg-black/5 dark:bg-white/10 text-[#1d1d1f] dark:text-white hover:bg-black/10 dark:hover:bg-white/15"} focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 dark:focus:ring-blue-600`}
              >
                {copied ? "Copied!" : <><ClipboardIcon className="w-3.5 h-3.5" aria-hidden="true" /> Copy</>}
              </button>
              {isAuthenticated && (
                <button
                  onClick={handleToggleHistory}
                  aria-expanded={showHistory}
                  aria-controls="sql-history-panel"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/5 dark:bg-white/10 text-[#1d1d1f] dark:text-white hover:bg-black/10 dark:hover:bg-white/15 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 dark:focus:ring-blue-600"
                >
                  <ClipboardIcon className="w-3.5 h-3.5" aria-hidden="true" /> History
                </button>
              )}
              {activeSQL && (
                <button
                  onClick={() => setActiveSQL(null)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/5 dark:bg-white/10 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/10 dark:hover:bg-white/15 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 dark:focus:ring-blue-600"
                >
                  Back to editor
                </button>
              )}
              {copied && <span role="status" className="text-xs text-emerald-600 dark:text-emerald-400">Copied to clipboard</span>}
            </div>
          </>
        )}
      </div>

      {/* ── History panel ── */}
      {isAuthenticated && showHistory && (
        <div id="sql-history-panel" className="mb-6 rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
          <div className="px-4 py-2.5 bg-black/[0.03] dark:bg-white/[0.03] border-b border-black/10 dark:border-white/10">
            <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white">Query history</h3>
          </div>
          <div className="px-4 py-3 max-h-64 overflow-y-auto">
            {historyLoading ? (
              <div className="flex items-center justify-center py-6" aria-live="polite">
                <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">Loading…</span>
              </div>
            ) : history.length === 0 ? (
              <div className="py-6 text-center text-xs text-[#aeaeb2] dark:text-[#636366]">No saved queries</div>
            ) : (
              <ul className="space-y-2" role="list" aria-label="Saved queries">
                {history.map((item) => (
                  <li key={item.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                    <div className="flex-1 min-w-0">
                      <pre className="text-xs font-mono text-[#1d1d1f] dark:text-white truncate">{item.sql_text}</pre>
                      <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] mt-0.5">{relativeTime(item.created_at)}</p>
                    </div>
                    <button
                      onClick={() => loadHistoryItem(item)}
                      className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-black/5 dark:bg-white/10 text-[#1d1d1f] dark:text-white hover:bg-black/10 dark:hover:bg-white/15 transition-all flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
                      aria-label={`Load query: ${item.sql_text.slice(0, 60)}`}
                    >
                      Load
                    </button>
                    <button
                      onClick={() => deleteHistoryItem(item.id)}
                      className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-black/5 dark:bg-white/10 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600"
                      aria-label={`Delete query: ${item.sql_text.slice(0, 60)}`}
                    >
                      <TrashIcon className="w-3.5 h-3.5" aria-hidden="true" />
                      <span className="sr-only">Delete</span>
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