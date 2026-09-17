"use client";

import { useState } from "react";
import Link from "next/link";
import { productStatuses, type Product } from "@/data/products";
import { ProductImage } from "./ProductImage";
import { AddToQuoteButton } from "./AddToQuoteButton";
import { useCompareList } from "@/lib/useCompareList";

type CompareTableProps = {
  initialProducts: Product[];
};

type CompareRow = {
  label: string;
  values: (string | undefined)[];
};

const STATUS_LABELS: Record<string, string> = Object.fromEntries(
  productStatuses.map((item) => [item.value, item.label])
);

function hasDifferences(values: (string | undefined)[]) {
  const defined = values.filter((value): value is string => Boolean(value));
  return new Set(defined).size > 1 || defined.length !== values.length;
}

export function CompareTable({ initialProducts }: CompareTableProps) {
  const [products, setProducts] = useState(initialProducts);
  const { remove } = useCompareList();

  function handleRemove(productId: string) {
    remove(productId);
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  }

  if (products.length === 0) {
    return (
      <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
        <p className="text-sm text-slate-600">
          Quitaste todos los productos de la comparación.
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

  const specKeys: string[] = [];
  const seenKeys = new Set<string>();
  for (const product of products) {
    for (const key of Object.keys(product.specifications)) {
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        specKeys.push(key);
      }
    }
  }

  const rows: CompareRow[] = [
    { label: "Marca", values: products.map((product) => product.brand) },
    {
      label: "Categoría",
      values: products.map((product) => product.category),
    },
    {
      label: "Tecnologías",
      values: products.map(
        (product) => product.technologies.join(", ") || undefined
      ),
    },
    {
      label: "Disponibilidad",
      values: products.map((product) => STATUS_LABELS[product.status]),
    },
    ...specKeys.map((key) => ({
      label: key,
      values: products.map((product) => product.specifications[key]),
    })),
  ];

  return (
    <div className="mt-8 overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead>
          <tr>
            <th
              scope="col"
              className="sticky left-0 z-10 w-40 min-w-40 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Producto
            </th>
            {products.map((product) => (
              <th
                key={product.id}
                scope="col"
                className="min-w-48 border-l border-slate-100 bg-slate-50 px-4 py-3 align-top font-normal"
              >
                <div className="flex flex-col items-start gap-2">
                  <button
                    type="button"
                    onClick={() => handleRemove(product.id)}
                    aria-label={`Quitar ${product.name} de la comparación`}
                    className="self-end text-xs text-slate-400 transition-colors hover:text-red-600"
                  >
                    ✕ Quitar
                  </button>
                  <div className="h-16 w-16 overflow-hidden rounded-md">
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      objectFit="contain"
                      className="h-16 w-16 bg-white"
                    />
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {product.name}
                  </p>
                  <Link
                    href={`/catalog/${product.id}`}
                    className="rounded-md bg-blue-700 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-800"
                  >
                    Ver producto
                  </Link>
                  <AddToQuoteButton
                    product={product}
                    className="rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => {
            const different = hasDifferences(row.values);
            return (
              <tr key={row.label} className={different ? "bg-amber-50/50" : undefined}>
                <th
                  scope="row"
                  className="sticky left-0 z-10 w-40 min-w-40 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700"
                >
                  {row.label}
                </th>
                {row.values.map((value, index) => (
                  <td
                    key={products[index].id}
                    className="min-w-48 border-l border-slate-100 px-4 py-3 text-sm text-slate-700"
                  >
                    {value ?? "N/D"}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
