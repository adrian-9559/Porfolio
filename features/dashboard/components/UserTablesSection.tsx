"use client";
import { useCallback, useEffect, useState } from "react";

import { DataTableList } from "./DataTableList";
import { DataTableGrid } from "./DataTableGrid";
import { CsvImportModal } from "./CsvImportModal";
import { DataTableMembersModal } from "./DataTableMembersModal";

import { dataTableService, type DataTable } from "@/services/dataTableService";

type View = "list" | "detail";

export function UserTablesSection() {
  const [view, setView] = useState<View>("list");
  const [tables, setTables] = useState<DataTable[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showImport, setShowImport] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

  const fetchTables = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataTableService.list();

      setTables(data);
    } catch (err: any) {
      setError(err?.message ?? "Error al cargar tablas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  const openTable = (id: string) => {
    setSelectedTableId(id);
    setView("detail");
  };

  const backToList = () => {
    setSelectedTableId(null);
    setView("list");
    fetchTables();
  };

  if (view === "detail" && selectedTableId) {
    return (
      <>
        <DataTableGrid
          tableId={selectedTableId}
          tables={tables}
          onBack={backToList}
          onShowMembers={() => setShowMembers(true)}
        />
        {showMembers && (
          <DataTableMembersModal
            tableId={selectedTableId}
            onClose={() => setShowMembers(false)}
          />
        )}
      </>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white">
          Tablas dinámicas
        </h2>
        <button
          className="apple-btn-primary text-sm py-1.5 px-3"
          onClick={() => setShowImport(true)}
        >
          + Nueva tabla
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm">
          {error}
          <button className="ml-2 underline" onClick={fetchTables}>
            Reintentar
          </button>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 rounded-xl bg-gray-100 dark:bg-[#1a1a1f] animate-pulse"
            />
          ))}
        </div>
      ) : (
        <DataTableList
          tables={tables}
          onOpen={openTable}
          onRefresh={fetchTables}
        />
      )}

      {showImport && (
        <CsvImportModal
          onClose={() => setShowImport(false)}
          onImported={(tableId) => {
            setShowImport(false);
            openTable(tableId);
          }}
        />
      )}
    </div>
  );
}
