"use client";

import Link from "next/link";
import { useCompareList } from "@/lib/useCompareList";
import { ProductImage } from "./ProductImage";

export function CompareBar() {
  const { items, remove } = useCompareList();

  if (items.length === 0) {
    return null;
  }

  const compareHref = `/compare?ids=${items
    .map((item) => item.productId)
    .join(",")}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white shadow-[0_-4px_12px_rgba(15,23,42,0.08)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3 overflow-x-auto">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Comparar ({items.length}/4)
          </span>
          <div className="flex items-center gap-2">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex shrink-0 items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 py-1 pl-1 pr-2"
              >
                <div className="h-8 w-8 shrink-0 overflow-hidden rounded">
                  <ProductImage
                    src={item.image}
                    alt={item.name}
                    objectFit="contain"
                    className="h-8 w-8 bg-white"
                  />
                </div>
                <span className="max-w-[100px] truncate text-xs font-medium text-slate-700">
                  {item.name}
                </span>
                <button
                  type="button"
                  onClick={() => remove(item.productId)}
                  aria-label={`Quitar ${item.name} de comparación`}
                  className="ml-1 text-slate-400 transition-colors hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <Link
          href={compareHref}
          className="inline-flex shrink-0 items-center justify-center rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
        >
          Comparar ahora
        </Link>
      </div>
    </div>
  );
}
