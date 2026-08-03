export interface ColumnDef {
  name: string;
  type: string;
  isPk: boolean;
  fk?: { table: string; column: string };
}

export interface TableDef {
  name: string;
  columns: ColumnDef[];
}

export type ColumnRef = string;

export interface HistoryItem {
  id: string;
  sql_text: string;
  schema_snapshot: Record<string, unknown> | null;
  created_at: string;
}

export interface ExampleSchema {
  id: string;
  label: string;
  ddl: string;
  tables: string;
}

export const EXAMPLE_DDL_USERS_ORDERS = `CREATE TABLE usuarios (
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
);`;

export const EXAMPLE_DDL_EMPLOYEES = `CREATE TABLE departamentos (
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
);`;

export function getTypeColor(type: string): string {
  const baseType = type
    .toLowerCase()
    .replace(/\(.*\)/, "")
    .trim();

  if (baseType === "uuid")
    return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300";
  if (["serial", "smallint", "integer", "bigint", "int"].includes(baseType))
    return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
  if (["character varying", "varchar", "char", "text"].includes(baseType))
    return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300";
  if (["decimal", "numeric", "real", "float", "double"].includes(baseType))
    return "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300";
  if (["boolean", "bool"].includes(baseType))
    return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300";
  if (["timestamp", "date", "time"].includes(baseType))
    return "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300";
  if (["jsonb", "json"].includes(baseType))
    return "bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300";

  return "bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400";
}

export function splitByCommaOutsideParens(sql: string): string[] {
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

export function extractBody(ddl: string, openIdx: number): string {
  let depth = 1;
  let i = openIdx;

  while (i < ddl.length && depth > 0) {
    i++;
    if (ddl[i] === "(") depth++;
    else if (ddl[i] === ")") depth--;
  }

  return ddl.slice(openIdx + 1, i);
}

export function parseDDL(ddl: string): TableDef[] {
  const tables: TableDef[] = [];
  const tableRegex =
    /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:[\w]+\.)?(\w+)\s*\(/gi;
  let match: RegExpExecArray | null;

  while ((match = tableRegex.exec(ddl)) !== null) {
    const tableName = match[1];
    const body = extractBody(ddl, match.index + match[0].length - 1);
    const columns: ColumnDef[] = [];
    const pkCols = new Set<string>();
    const fkCols = new Map<string, { table: string; column: string }>();

    for (const part of splitByCommaOutsideParens(body)) {
      let trimmed = part.trim();

      if (!trimmed) continue;
      const constraintPrefix = trimmed.match(/^CONSTRAINT\s+\w+\s+(.*)/i);

      if (constraintPrefix) trimmed = constraintPrefix[1];
      const pkMatch = trimmed.match(/^PRIMARY\s+KEY\s*\(\s*(\w+)\s*\)/i);

      if (pkMatch) {
        pkCols.add(pkMatch[1]);
        continue;
      }
      const fkMatch = trimmed.match(
        /^FOREIGN\s+KEY\s*\(\s*(\w+)\s*\)\s*REFERENCES\s+(?:[\w]+\.)?(\w+)\s*\(\s*(\w+)\s*\)/i,
      );

      if (fkMatch) {
        fkCols.set(fkMatch[1], { table: fkMatch[2], column: fkMatch[3] });
        continue;
      }
      const colMatch = trimmed.match(
        /^(\w+)\s+((?:\w+(?:\s*\([^)]*\))?)(?:\s+(?:WITH\s+)?(?:TIME\s+)?ZONE|(?:\s+VARYING)|(?:\s+PRECISION))?)\s*(.*)/i,
      );

      if (colMatch) {
        const colName = colMatch[1],
          colType = colMatch[2],
          constraints = colMatch[3] ?? "";

        if (/primary\s+key/i.test(constraints)) pkCols.add(colName);
        const refMatch = constraints.match(
          /references\s+(?:[\w]+\.)?(\w+)\s*\((\w+)\)/i,
        );

        if (refMatch)
          fkCols.set(colName, { table: refMatch[1], column: refMatch[2] });
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

export function generateSQL(
  schema: TableDef[],
  selectCols: Set<ColumnRef>,
  whereCols: Map<ColumnRef, string>,
  orderByCols: Map<ColumnRef, "ASC" | "DESC">,
  groupByCols: Set<ColumnRef>,
): string {
  const tablesInvolved = new Set<string>();
  const collect = (ref: ColumnRef) => tablesInvolved.add(ref.split(".")[0]);

  selectCols.forEach(collect);
  whereCols.forEach((_, ref) => collect(ref));
  orderByCols.forEach((_, ref) => collect(ref));
  groupByCols.forEach(collect);
  if (tablesInvolved.size === 0) return "";
  const childLinks = new Map<
    string,
    { fromCol: string; parentTable: string; toCol: string }
  >();

  for (const table of schema) {
    if (!tablesInvolved.has(table.name)) continue;
    for (const col of table.columns) {
      if (col.fk && tablesInvolved.has(col.fk.table)) {
        childLinks.set(table.name, {
          fromCol: col.name,
          parentTable: col.fk.table,
          toCol: col.fk.column,
        });
      }
    }
  }
  const childTables = new Set(childLinks.keys());
  const fromTable =
    Array.from(tablesInvolved).find((t) => !childTables.has(t)) ??
    Array.from(tablesInvolved)[0];
  const lines: string[] = [];

  if (selectCols.size === 0) {
    lines.push("SELECT *");
  } else {
    lines.push(`SELECT\n  ${Array.from(selectCols).sort().join(",\n  ")}`);
  }
  lines.push(`FROM ${fromTable}`);
  for (const [child, link] of childLinks) {
    if (child === fromTable) continue;
    lines.push(
      `JOIN ${child} ON ${child}.${link.fromCol} = ${link.parentTable}.${link.toCol}`,
    );
  }
  const whereParts = Array.from(whereCols.entries())
    .filter(([, val]) => val.trim() !== "")
    .map(([col, val]) => `${col} = '${val}'`);

  if (whereParts.length > 0)
    lines.push(`WHERE\n  ${whereParts.join("\n  AND ")}`);
  if (groupByCols.size > 0)
    lines.push(`GROUP BY ${Array.from(groupByCols).sort().join(", ")}`);
  if (orderByCols.size > 0)
    lines.push(
      `ORDER BY ${Array.from(orderByCols)
        .map(([col, dir]) => `${col} ${dir}`)
        .join(", ")}`,
    );

  return lines.join("\n") + ";";
}

export function relativeTime(
  dateStr: string,
  locale: "es" | "en" = "es",
): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffSec = Math.floor((now - then) / 1000);

  if (locale === "es") {
    if (diffSec < 60) return "hace unos segundos";
    const diffMin = Math.floor(diffSec / 60);

    if (diffMin < 60) return `hace ${diffMin} min`;
    const diffHr = Math.floor(diffMin / 60);

    if (diffHr < 24) return `hace ${diffHr}h`;
    const diffDays = Math.floor(diffHr / 24);

    if (diffDays < 30) return `hace ${diffDays} día${diffDays > 1 ? "s" : ""}`;

    return new Date(dateStr).toLocaleDateString("es-ES");
  }
  if (diffSec < 60) return "a few seconds ago";
  const diffMin = Math.floor(diffSec / 60);

  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);

  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDays = Math.floor(diffHr / 24);

  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  return new Date(dateStr).toLocaleDateString("en-US");
}
