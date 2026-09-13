import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/data/products";
import { QuoteForm } from "../components/QuoteForm";

export const metadata: Metadata = {
  title: "Solicitar cotización | Telesev Group",
  description:
    "Solicitá una cotización de equipamiento GPON, redes ópticas y fibra óptica a Telesev Group.",
};

export default async function QuotePage({
  searchParams,
}: PageProps<"/quote">) {
  const params = await searchParams;
  const productParam = params.product;
  const productId = Array.isArray(productParam)
    ? productParam[0]
    : productParam;
  const initialProduct = productId
    ? (products.find((product) => product.id === productId) ?? null)
    : null;

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <Link
        href={initialProduct ? `/catalog/${initialProduct.id}` : "/catalog"}
        className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800"
      >
        {initialProduct
          ? `← Volver a ${initialProduct.name}`
          : "← Volver al catálogo"}
      </Link>

      <div className="mb-10 mt-6">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
          Cotización
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Solicitá tu cotización
        </h1>
        <p className="mt-3 text-slate-600">
          {initialProduct
            ? `Contanos qué necesitás sobre ${initialProduct.name} y te enviamos una propuesta.`
            : "Contanos qué producto o solución te interesa y te enviamos una propuesta."}
        </p>
      </div>

      <QuoteForm initialProduct={initialProduct} />
    </section>
  );
}
