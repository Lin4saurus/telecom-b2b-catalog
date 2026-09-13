"use client";

import { useMemo, useState } from "react";
import { SearchInput } from "./SearchInput";
import { Pagination } from "./Pagination";

export type ContactRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
};

type ContactsTableProps = {
  status: "loading" | "success" | "error";
  rows: ContactRow[];
};

const PAGE_SIZE = 5;

function formatDate(value: string) {
  return new Date(value).toLocaleString("es-AR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function ContactsTable({ status, rows }: ContactsTableProps) {
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
        row.message.toLowerCase().includes(term)
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

  if (status === "loading") {
    return <p className="text-sm text-slate-500">Cargando contactos...</p>;
  }

  if (status === "error") {
    return (
      <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
        No pudimos cargar los contactos. Probá recargar la página.
      </p>
    );
  }

  if (rows.length === 0) {
    return <p className="text-sm text-slate-500">Todavía no hay contactos.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <SearchInput
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar contactos..."
      />

      {filteredRows.length === 0 ? (
        <p className="text-sm text-slate-500">
          No hay contactos que coincidan con la búsqueda.
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
                  <th className="px-4 py-3">Empresa</th>
                  <th className="px-4 py-3">Mensaje</th>
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
                      {row.company || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {row.message}
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
