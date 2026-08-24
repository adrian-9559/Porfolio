import { apiFetch } from "./apiClient";

export type ColumnType =
  | "text"
  | "number"
  | "boolean"
  | "date"
  | "email"
  | "url";

export interface DataTable {
  id: string;
  owner_id?: string;
  name: string;
  description: string;
  row_count: number;
  role: "owner" | "editor" | "viewer";
  created_at: string;
  updated_at: string;
}

export interface DataTableColumn {
  id: string;
  table_id?: string;
  name: string;
  type: ColumnType;
  position: number;
}

export interface DataTableRow {
  id: string;
  position: number;
  cells: Record<string, string>;
}

export interface DataTableMember {
  id: string;
  table_id?: string;
  user_id: string | null;
  invited_email: string;
  role: "owner" | "editor" | "viewer";
  status: "pending" | "accepted";
  created_at: string;
  profile?: { full_name: string | null; avatar_url: string | null } | null;
}

export interface ImportPreview {
  columns: { name: string; type: ColumnType; position: number }[];
  sampleRows: Record<string, string>[];
  totalRows: number;
}

const BASE = "/api/data-tables";

export const dataTableService = {
  // List tables
  list: () => apiFetch<DataTable[]>(BASE),

  // Get single table + columns
  getById: (id: string) =>
    apiFetch<{ table: DataTable; columns: DataTableColumn[] }>(`${BASE}/${id}`),

  // Get rows
  getRows: (
    id: string,
    params: {
      page?: number;
      pageSize?: number;
      sortColumn?: string;
      sortDirection?: string;
      search?: string;
    },
  ) => {
    const q = new URLSearchParams();

    if (params.page) q.set("page", String(params.page));
    if (params.pageSize) q.set("pageSize", String(params.pageSize));
    if (params.sortColumn) q.set("sortColumn", params.sortColumn);
    if (params.sortDirection) q.set("sortDirection", params.sortDirection);
    if (params.search) q.set("search", params.search);

    return apiFetch<{
      rows: DataTableRow[];
      total: number;
      page: number;
      pageSize: number;
    }>(`${BASE}/${id}/rows?${q}`);
  },

  // Update cells
  updateCells: (
    id: string,
    rowId: string,
    cells: { columnId: string; value: string }[],
  ) =>
    apiFetch<void>(`${BASE}/${id}/rows/${rowId}`, {
      method: "PATCH",
      body: JSON.stringify({ cells }),
    }),

  // Add row
  addRow: (id: string) =>
    apiFetch<DataTableRow>(`${BASE}/${id}/rows`, { method: "POST" }),

  // Delete row
  deleteRow: (id: string, rowId: string) =>
    apiFetch<void>(`${BASE}/${id}/rows/${rowId}`, { method: "DELETE" }),

  // Add column
  addColumn: (id: string, data: { name: string; type?: ColumnType }) =>
    apiFetch<DataTableColumn>(`${BASE}/${id}/columns`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Update column
  updateColumn: (
    id: string,
    columnId: string,
    data: { name?: string; type?: ColumnType },
  ) =>
    apiFetch<void>(`${BASE}/${id}/columns/${columnId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  // Delete column
  deleteColumn: (id: string, columnId: string) =>
    apiFetch<void>(`${BASE}/${id}/columns/${columnId}`, { method: "DELETE" }),

  // Update table metadata
  updateTable: (id: string, data: { name?: string; description?: string }) =>
    apiFetch<void>(`${BASE}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  // Delete table
  deleteTable: (id: string) =>
    apiFetch<void>(`${BASE}/${id}`, { method: "DELETE" }),

  // Members
  listMembers: (id: string) =>
    apiFetch<DataTableMember[]>(`${BASE}/${id}/members`),
  inviteMember: (
    id: string,
    data: { email: string; role: "editor" | "viewer" },
  ) =>
    apiFetch<DataTableMember>(`${BASE}/${id}/members`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateMemberRole: (id: string, memberId: string, role: "editor" | "viewer") =>
    apiFetch<void>(`${BASE}/${id}/members/${memberId}`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    }),
  removeMember: (id: string, memberId: string) =>
    apiFetch<void>(`${BASE}/${id}/members/${memberId}`, { method: "DELETE" }),
  acceptInvitation: (id: string) =>
    apiFetch<void>(`${BASE}/${id}/members/accept`, { method: "POST" }),
  rejectInvitation: (id: string) =>
    apiFetch<void>(`${BASE}/${id}/members/reject`, { method: "POST" }),

  // Import — FormData through the same-origin BFF proxy (apiFetch forces JSON)
  uploadCsv: async (
    endpoint: "preview" | "import",
    file: File,
    metadata?: { name?: string; typeOverrides?: Record<number, string> },
  ) => {
    const form = new FormData();

    form.append("file", file);
    if (metadata) form.append("metadata", JSON.stringify(metadata));
    const path =
      endpoint === "preview" ? `${BASE}/import/preview` : `${BASE}/import`;
    const res = await fetch(path, {
      method: "POST",
      body: form,
      credentials: "same-origin",
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));

      throw new Error((body as { error?: string })?.error ?? res.statusText);
    }
    const body = await res.json();

    return body.data;
  },
};
