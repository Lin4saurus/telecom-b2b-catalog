"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/data/products";
import { useCompareList } from "@/lib/useCompareList";

type CompareToggleButtonProps = {
  product: Product;
  className?: string;
  variant?: "icon" | "button";
};

const LIMIT_MESSAGE_MS = 2200;

function CompareIcon({ active }: { active: boolean }) {
  if (active) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M3 8.2l3 3 7-7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="3.5" width="5.5" height="9" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="9" y="3.5" width="5.5" height="9" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function CompareToggleButton({
  product,
  className,
  variant = "icon",
}: CompareToggleButtonProps) {
  const { isSelected, toggle } = useCompareList();
  const selected = isSelected(product.id);
  const [limitMessage, setLimitMessage] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleClick() {
    const result = toggle(product);
    if (!result.added && result.reason === "limit") {
      setLimitMessage(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(
        () => setLimitMessage(false),
        LIMIT_MESSAGE_MS
      );
    }
  }

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={selected}
        className={`relative ${className ?? ""}`}
      >
        {selected ? "Quitar de comparación" : "Agregar a comparación"}
        {limitMessage && (
          <span
            role="status"
            className="absolute left-1/2 top-full z-20 mt-2 w-48 -translate-x-1/2 rounded-md bg-slate-900 px-3 py-2 text-xs font-normal normal-case text-white shadow-lg"
          >
            Podés comparar hasta 4 productos.
          </span>
        )}
      </button>
    );
  }

  // Variante "icon": no lleva su propio `relative` a propósito. Quien la usa
  // (ProductCard, ProductListItem) siempre le pasa `absolute` por afuera para
  // anclarla a una esquina de la tarjeta, y eso ya alcanza como contexto de
  // posicionamiento para el tooltip del límite. Agregar `relative` acá
  // duplicaría la propiedad `position` con la clase `absolute` externa y el
  // botón podía terminar sin posicionar (bug real: se veía en flujo normal,
  // pegado a la esquina superior izquierda en vez de anclado a su esquina).
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={selected}
      aria-label={
        selected
          ? `Quitar ${product.name} de comparación`
          : `Agregar ${product.name} a comparación`
      }
      title={selected ? "Quitar de comparación" : "Agregar a comparación"}
      className={`flex h-8 w-8 items-center justify-center rounded-full border shadow-sm transition-colors ${
        selected
          ? "border-blue-700 bg-blue-700 text-white"
          : "border-slate-300 bg-white text-slate-500 hover:border-blue-300 hover:text-blue-700"
      } ${className ?? ""}`}
    >
      <CompareIcon active={selected} />
      {limitMessage && (
        <span
          role="status"
          className="absolute right-0 top-9 z-20 w-44 rounded-md bg-slate-900 px-3 py-2 text-xs font-normal normal-case text-white shadow-lg"
        >
          Podés comparar hasta 4 productos.
        </span>
      )}
    </button>
  );
}
