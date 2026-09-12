import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/catalog/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    return { title: "Producto no encontrado | Telesev Group" };
  }

  return {
    title: `${product.name} | Telesev Group`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/catalog/[id]">) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <Link
        href="/catalog"
        className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800"
      >
        ← Volver al catálogo
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          {product.brand}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {product.technology}
        </span>
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {product.name}
      </h1>

      <p className="mt-4 text-lg text-slate-600">{product.shortDescription}</p>

      <Link
        href={`/quote?product=${product.id}`}
        className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
      >
        Solicitar cotización
      </Link>

      <div className="mt-10 rounded-lg border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Ficha técnica
        </h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          {product.technicalDescription}
        </p>
      </div>
    </section>
  );
}
