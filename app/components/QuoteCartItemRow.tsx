import type { ChangeEvent } from "react";
import type { QuoteCartItem } from "@/lib/quoteCart";
import { ProductImage } from "./ProductImage";

type QuoteCartItemRowProps = {
  item: QuoteCartItem;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
};

export function QuoteCartItemRow({
  item,
  onQuantityChange,
  onRemove,
}: QuoteCartItemRowProps) {
  function handleQuantityInput(event: ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    onQuantityChange(item.productId, Number.isFinite(value) ? value : 1);
  }

  return (
    <div className="flex items-center gap-4 py-4">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md">
        <ProductImage
          src={item.image}
          alt={item.name}
          objectFit="contain"
          className="h-16 w-16 bg-slate-50"
          imageClassName="p-1.5"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900">
          {item.name}
        </p>
        <p className="text-xs text-slate-500">
          {item.brand}
          {item.sku ? ` · SKU: ${item.sku}` : ""}
        </p>
      </div>

      <div className="flex flex-col items-start gap-1">
        <label
          htmlFor={`quantity-${item.productId}`}
          className="text-xs text-slate-500"
        >
          Cantidad
        </label>
        <input
          id={`quantity-${item.productId}`}
          type="number"
          min={1}
          step={1}
          value={item.quantity}
          onChange={handleQuantityInput}
          className="w-20 rounded-md border border-slate-300 px-2 py-1.5 text-center text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
        />
      </div>

      <button
        type="button"
        onClick={() => onRemove(item.productId)}
        aria-label={`Quitar ${item.name} de la cotización`}
        title="Quitar"
        className="shrink-0 rounded-md p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M4 5h10M7.5 5V3.5h3V5M5.5 5l.6 9.2a1 1 0 0 0 1 .8h3.8a1 1 0 0 0 1-.8L12.5 5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>
    </div>
  );
}
