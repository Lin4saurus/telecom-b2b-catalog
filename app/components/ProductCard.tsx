import Link from "next/link";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/catalog/${product.id}`}
      className="group flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          {product.brand}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {product.technology}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700">
        {product.name}
      </h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">
        {product.shortDescription}
      </p>
      <span className="mt-4 text-sm font-medium text-blue-700">Ver más →</span>
    </Link>
  );
}
