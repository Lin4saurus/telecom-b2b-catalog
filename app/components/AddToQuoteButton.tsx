"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/data/products";
import { useQuoteCart } from "@/lib/useQuoteCart";

type AddToQuoteButtonProps = {
  product: Product;
  className?: string;
};

const CONFIRMATION_MS = 1500;

export function AddToQuoteButton({ product, className }: AddToQuoteButtonProps) {
  const { addItem } = useQuoteCart();
  const [justAdded, setJustAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleClick() {
    addItem(product, 1);
    setJustAdded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setJustAdded(false), CONFIRMATION_MS);
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {justAdded ? "Agregado ✓" : "Agregar a cotización"}
    </button>
  );
}
