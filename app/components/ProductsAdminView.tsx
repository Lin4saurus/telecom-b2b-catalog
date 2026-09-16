"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/data/products";
import { getProducts, deleteProduct } from "@/lib/products";
import { useAdminSession } from "@/lib/useAdminSession";
import { AdminHeader } from "./AdminHeader";
import { SearchInput } from "./SearchInput";
import { Pagination } from "./Pagination";

type DataStatus = "loading" | "success" | "error";

const PAGE_SIZE = 5;

export function ProductsAdminView() {
  const { status, session } = useAdminSession();

  const [products, setProducts] = useState<Product[]>([]);
  const [dataStatus, setDataStatus] = useState<DataStatus>("loading");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    let isCancelled = false;

    async function load() {
      setDataStatus("loading");
      const { products: rows, error } = await getProducts();

      if (isCancelled) return;

      if (error) {
        setDataStatus("error");
        return;
      }

      setProducts(rows);
      setDataStatus("success");
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, [status]);

  async function handleDelete(id: string, name: string) {
    const confirmed = window.confirm(
      `¿Seguro que querés eliminar "${name}"? Esta acción no se puede deshacer.`
    );

    if (!confirmed) return;

    setDeleteError(null);
    setDeletingId(id);

    const { error } = await deleteProduct(id);

    setDeletingId(null);

    if (error) {
      setDeleteError(error);
      return;
    }

    setProducts((prev) => prev.filter((product) => product.id !== id));
  }

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE)
  );
  const currentPage = Math.min(page, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function handleSearchChange(value: string) {
    setSearchTerm(value);
    setPage(1);
  }

  if (status !== "authenticated") {
    return (
      <section className="mx-auto flex w-full max-w-2xl flex-1 items-center justify-center px-4 py-16 sm:px-6">
        <p className="text-slate-500">Cargando...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <AdminHeader session={session} />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Productos
        </h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center rounded-md bg-blue-700 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
        >
          Nuevo producto
        </Link>
      </div>

      {deleteError && (
        <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {deleteError}
        </p>
      )}

      {dataStatus === "loading" && (
        <p className="text-sm text-slate-500">Cargando productos...</p>
      )}

      {dataStatus === "error" && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          No pudimos cargar los productos. Probá recargar la página.
        </p>
      )}

      {dataStatus === "success" && products.length === 0 && (
        <p className="text-sm text-slate-500">Todavía no hay productos.</p>
      )}

      {dataStatus === "success" && products.length > 0 && (
        <div className="flex flex-col gap-4">
          <SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar productos..."
          />

          {filteredProducts.length === 0 ? (
            <p className="text-sm text-slate-500">
              No hay productos que coincidan con la búsqueda.
            </p>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Nombre</th>
                      <th className="px-4 py-3">Marca</th>
                      <th className="px-4 py-3">Tecnología</th>
                      <th className="px-4 py-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedProducts.map((product) => (
                      <tr key={product.id}>
                        <td className="px-4 py-3 font-medium text-slate-900">
                          {product.name}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {product.brand}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {product.technologies.join(", ")}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/admin/products/${product.id}/edit`}
                              className="text-sm font-medium text-blue-700 hover:text-blue-800"
                            >
                              Editar
                            </Link>
                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(product.id, product.name)
                              }
                              disabled={deletingId === product.id}
                              className="text-sm font-medium text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {deletingId === product.id
                                ? "Eliminando..."
                                : "Borrar"}
                            </button>
                          </div>
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
      )}
    </section>
  );
}
