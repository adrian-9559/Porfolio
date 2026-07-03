import type { DataTable } from "@/services/dataTableService";
import { useT } from "@/hooks/useT";

interface Props {
  tables: DataTable[];
  onOpen: (id: string) => void;
  onRefresh: () => void;
}

const ROLE_STYLES: Record<string, string> = {
  owner: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400",
  editor: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
  viewer: "bg-gray-100 dark:bg-gray-800/40 text-gray-500 dark:text-gray-400",
};

const ROLE_LABELS: Record<string, string> = {
  owner: "Propietario",
  editor: "Editor",
  viewer: "Espectador",
};

export function DataTableList({ tables, onOpen, onRefresh }: Props) {
  const { t } = useT();

  if (tables.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gray-100 dark:bg-[#1a1a1f] flex items-center justify-center text-[#6e6e73]">
          <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9M15 21V9" />
          </svg>
        </div>
        <p className="text-[#1d1d1f] dark:text-white font-medium mb-1">
          {t("dashboard.noTables")}
        </p>
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">
          {t("dashboard.noTablesHint")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tables.map((table) => (
        <button
          key={table.id}
          onClick={() => onOpen(table.id)}
          className="p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 text-left hover:border-blue-400 dark:hover:border-blue-600 transition-all active:scale-[0.98]"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-[#1d1d1f] dark:text-white truncate">
              {table.name}
            </h3>
            <span
              className={`shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full ${ROLE_STYLES[table.role] ?? ROLE_STYLES.viewer}`}
            >
              {ROLE_LABELS[table.role] ?? table.role}
            </span>
          </div>

          {table.description && (
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b] line-clamp-2 mb-3">
              {table.description}
            </p>
          )}

          <div className="flex items-center gap-3 text-xs text-[#6e6e73] dark:text-[#86868b]">
            <span className="flex items-center gap-1">
              <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 14 14" width="14">
                <rect x="1.5" y="2.5" width="11" height="9" rx="1" />
                <path d="M4.5 5.5h5M4.5 8h3" />
              </svg>
              {table.row_count} filas
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
