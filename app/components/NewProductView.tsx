"use client";

import Link from "next/link";
import { useAdminSession } from "@/lib/useAdminSession";
import { AdminHeader } from "./AdminHeader";
import { ProductForm } from "./ProductForm";

export function NewProductView() {
  const { status, session } = useAdminSession();

  if (status !== "authenticated") {
    return (
      <section className="mx-auto flex w-full max-w-2xl flex-1 items-center justify-center px-4 py-16 sm:px-6">
        <p className="text-slate-500">Cargando...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
      <AdminHeader session={session} />

      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800"
      >
        ← Volver a productos
      </Link>

      <h1 className="mt-4 mb-6 text-2xl font-bold tracking-tight text-slate-900">
        Nuevo producto
      </h1>

      <ProductForm mode="create" />
    </section>
  );
}
