"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/data/products";
import { getProductById } from "@/lib/products";
import { useAdminSession } from "@/lib/useAdminSession";
import { AdminHeader } from "./AdminHeader";
import { ProductForm } from "./ProductForm";

type LoadStatus = "loading" | "found" | "not-found" | "error";

export function EditProductView({ id }: { id: string }) {
  const { status, session } = useAdminSession();
  const [product, setProduct] = useState<Product | null>(null);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>("loading");

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    let isCancelled = false;

    async function load() {
      setLoadStatus("loading");
      const result = await getProductById(id);

      if (isCancelled) return;

      if (result.error) {
        setLoadStatus("error");
        return;
      }

      if (!result.product) {
        setLoadStatus("not-found");
        return;
      }

      setProduct(result.product);
      setLoadStatus("found");
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, [status, id]);

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
        Editar producto
      </h1>

      {loadStatus === "loading" && (
        <p className="text-sm text-slate-500">Cargando producto...</p>
      )}

      {loadStatus === "error" && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          No pudimos cargar el producto. Probá recargar la página.
        </p>
      )}

      {loadStatus === "not-found" && (
        <p className="text-sm text-slate-500">
          No encontramos ese producto. Puede que ya haya sido eliminado.
        </p>
      )}

      {loadStatus === "found" && product && (
        <ProductForm mode="edit" initialProduct={product} />
      )}
    </section>
  );
}
