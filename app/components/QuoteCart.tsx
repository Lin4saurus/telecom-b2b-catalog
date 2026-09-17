"use client";

import Link from "next/link";
import { useQuoteCart } from "@/lib/useQuoteCart";
import { QuoteCartItemRow } from "./QuoteCartItemRow";

export function QuoteCart() {
  const { items, updateQuantity, removeItem } = useQuoteCart();

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
        <p className="text-sm text-slate-600">
          Todavía no agregaste productos a tu solicitud. Podés seguir así
          para una consulta general, o volver al catálogo para elegir
          productos puntuales.
        </p>
        <Link
          href="/catalog"
          className="mt-4 inline-flex items-center justify-center rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Productos seleccionados ({items.length})
      </h2>
      <div className="mt-2 flex flex-col divide-y divide-slate-100">
        {items.map((item) => (
          <QuoteCartItemRow
            key={item.productId}
            item={item}
            onQuantityChange={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>
    </div>
  );
}
