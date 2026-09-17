"use client";

import { useMemo, useState } from "react";
import {
  QUOTE_STATUSES,
  updateQuoteStatus,
  type QuoteStatus,
} from "@/lib/quotes";
import { SearchInput } from "./SearchInput";
import { Pagination } from "./Pagination";

export type QuoteItemSummary = {
  productName: string;
  quantity: number;
};

export type QuoteRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  country: string | null;
  city: string | null;
  project_type: string | null;
  product_id: string | null;
  product_name: string | null;
  quantity: number | null;
  details: string | null;
  status: QuoteStatus;
  items: QuoteItemSummary[];
};

function formatProducts(row: QuoteRow) {
  if (row.items.length > 0) {
    return row.items
      .map((item) => `${item.quantity}× ${item.productName}`)
      .join(", ");
  }
  if (row.product_name) {
    return row.quantity
      ? `${row.quantity}× ${row.product_name}`
      : row.product_name;
  }
  return "Cotización general";
}

function formatLocation(row: QuoteRow) {
  const parts = [row.city, row.country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "—";
}

type QuotesTableProps = {
  status: "loading" | "success" | "error";
  rows: QuoteRow[];
  onStatusChange?: (id: string, newStatus: QuoteStatus) => void;
};

const PAGE_SIZE = 5;

const STATUS_TEXT_COLOR: Record<QuoteStatus, string> = {
  Nueva: "text-blue-700",
  "En proceso": "text-amber-700",
  Respondida: "text-green-700",
  Cerrada: "text-slate-500",
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("es-AR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function QuotesTable({
  status: loadStatus,
  rows,
  onStatusChange,
}: QuotesTableProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [rowError, setRowError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return rows;

    return rows.filter(
      (row) =>
        row.name.toLowerCase().includes(term) ||
        row.email.toLowerCase().includes(term) ||
        (row.company ?? "").toLowerCase().includes(term) ||
        (row.product_name ?? "").toLowerCase().includes(term) ||
        row.items.some((item) =>
          item.productName.toLowerCase().includes(term)
        )
    );
  }, [rows, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function handleSearchChange(value: string) {
    setSearchTerm(value);
    setPage(1);
  }

  async function handleStatusChange(id: string, newStatus: QuoteStatus) {
    setRowError(null);
    setUpdatingId(id);

    const { error } = await updateQuoteStatus(id, newStatus);

    setUpdatingId(null);

    if (error) {
      setRowError(error);
      return;
    }

    onStatusChange?.(id, newStatus);
  }

  if (loadStatus === "loading") {
    return <p className="text-sm text-slate-500">Cargando cotizaciones...</p>;
  }

  if (loadStatus === "error") {
    return (
      <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
        No pudimos cargar las cotizaciones. Probá recargar la página.
      </p>
    );
  }

  if (rows.length === 0) {
    return (
      <p className="text-sm text-slate-500">Todavía no hay cotizaciones.</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {rowError && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {rowError}
        </p>
      )}

      <SearchInput
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar cotizaciones..."
      />

      {filteredRows.length === 0 ? (
        <p className="text-sm text-slate-500">
          No hay cotizaciones que coincidan con la búsqueda.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Teléfono</th>
                  <th className="px-4 py-3">Empresa</th>
                  <th className="px-4 py-3">Ubicación</th>
                  <th className="px-4 py-3">Tipo de proyecto</th>
                  <th className="px-4 py-3">Productos</th>
                  <th className="px-4 py-3">Mensaje</th>
                  <th className="px-4 py-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedRows.map((row) => (
                  <tr key={row.id}>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                      {formatDate(row.created_at)}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{row.email}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {row.phone || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {row.company || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatLocation(row)}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {row.project_type || "—"}
                    </td>
                    <td className="max-w-xs px-4 py-3 text-slate-600">
                      {formatProducts(row)}
                    </td>
                    <td className="max-w-xs px-4 py-3 text-slate-600">
                      {row.details || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={row.status}
                        disabled={updatingId === row.id}
                        onChange={(event) =>
                          handleStatusChange(
                            row.id,
                            event.target.value as QuoteStatus
                          )
                        }
                        className={`rounded-md border border-slate-300 bg-white px-2 py-1 text-sm font-medium outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:opacity-60 ${STATUS_TEXT_COLOR[row.status]}`}
                      >
                        {QUOTE_STATUSES.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
