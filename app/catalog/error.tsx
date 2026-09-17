"use client";

import { useEffect } from "react";

type CatalogErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function CatalogError({ error, reset }: CatalogErrorProps) {
  useEffect(() => {
    console.error("Error cargando el catálogo:", error);
  }, [error]);

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <span className="rounded-full bg-red-50 px-4 py-1 text-sm font-medium text-red-700">
        Catálogo
      </span>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">
        No pudimos cargar el catálogo
      </h1>
      <p className="mt-3 text-slate-600">
        Ocurrió un problema al conectar con nuestro catálogo de productos.
        Probá nuevamente en unos instantes.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
      >
        Intentar nuevamente
      </button>
    </section>
  );
}
