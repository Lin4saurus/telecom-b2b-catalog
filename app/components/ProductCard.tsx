import Link from "next/link";
import type { Product } from "@/data/products";
import { ProductImage } from "./ProductImage";
import { ProductBadge } from "./ProductBadge";
import { ProductAvailability } from "./ProductAvailability";
import { AddToQuoteButton } from "./AddToQuoteButton";

export function ProductCard({ product }: { product: Product }) {
  const highlights = product.highlights.slice(0, 4);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        {product.badge && (
          <ProductBadge
            badge={product.badge}
            className="pointer-events-none absolute left-3 top-3 z-10"
          />
        )}
        <ProductImage
          src={product.image}
          alt={product.name}
          objectFit="contain"
          className="aspect-[4/3] w-full bg-slate-50"
          imageClassName="p-6 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
            {product.brand}
          </span>
          {product.sku && (
            <span className="shrink-0 text-xs text-slate-400">
              SKU: {product.sku}
            </span>
          )}
        </div>

        <h3 className="mt-1 line-clamp-2 text-base font-semibold text-slate-900">
          <Link
            href={`/catalog/${product.id}`}
            className="text-inherit no-underline after:absolute after:inset-0"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
          {product.shortDescription}
        </p>

        {highlights.length > 0 && (
          <ul className="mt-3 flex flex-col gap-1">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-1.5 text-xs text-slate-600"
              >
                <span
                  className="mt-1 h-1 w-1 shrink-0 rounded-full bg-blue-600"
                  aria-hidden="true"
                />
                <span className="line-clamp-1">{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex items-center justify-between gap-2">
          <ProductAvailability status={product.status} />
          <span className="text-xs font-medium text-slate-500">
            {product.priceLabel ?? "Precio bajo consulta"}
          </span>
        </div>

        <div className="relative z-10 mt-auto flex gap-2 border-t border-slate-100 pt-4">
          <Link
            href={`/catalog/${product.id}`}
            className="flex-1 rounded-md bg-blue-700 px-3 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-800"
          >
            Ver producto
          </Link>
          <AddToQuoteButton
            product={product}
            className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-xs font-medium leading-tight text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
