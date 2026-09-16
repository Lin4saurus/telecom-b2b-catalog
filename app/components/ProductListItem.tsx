import Link from "next/link";
import type { Product } from "@/data/products";
import { ProductImage } from "./ProductImage";
import { ProductBadge } from "./ProductBadge";
import { ProductAvailability } from "./ProductAvailability";

export function ProductListItem({ product }: { product: Product }) {
  const specEntries = Object.entries(product.specifications).slice(0, 3);

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center">
      <div className="relative w-full shrink-0 sm:w-36">
        {product.badge && (
          <ProductBadge
            badge={product.badge}
            className="absolute left-2 top-2 z-10"
          />
        )}
        <ProductImage
          src={product.image}
          alt={product.name}
          objectFit="contain"
          className="aspect-[4/3] w-full bg-slate-50"
          imageClassName="p-3"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
            {product.brand}
          </span>
          {product.sku && (
            <span className="text-xs text-slate-400">
              SKU: {product.sku}
            </span>
          )}
        </div>
        <h3 className="text-base font-semibold text-slate-900">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-slate-600">
          {product.shortDescription}
        </p>
      </div>

      {specEntries.length > 0 && (
        <dl className="grid shrink-0 grid-cols-1 gap-x-4 gap-y-1 text-xs sm:w-48">
          {specEntries.map(([key, value]) => (
            <div key={key} className="flex justify-between gap-2">
              <dt className="text-slate-400">{key}</dt>
              <dd className="font-medium text-slate-700">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="flex shrink-0 flex-row items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
        <div className="flex flex-col items-start gap-1 sm:items-end">
          <ProductAvailability status={product.status} />
          <span className="text-xs font-medium text-slate-500">
            {product.priceLabel ?? "Precio bajo consulta"}
          </span>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/catalog/${product.id}`}
            className="rounded-md bg-blue-700 px-3 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-800"
          >
            Ver producto
          </Link>
          <button
            type="button"
            disabled
            title="Disponible próximamente"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Agregar a cotización
          </button>
        </div>
      </div>
    </div>
  );
}
