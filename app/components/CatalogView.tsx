"use client";

import { useMemo, useState } from "react";
import { brands, technologies, type Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

const ALL = "Todos";

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={value === option}
            className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
              value === option
                ? "border-blue-700 bg-blue-700 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CatalogView({ products }: { products: Product[] }) {
  const [brandFilter, setBrandFilter] = useState<string>(ALL);
  const [technologyFilter, setTechnologyFilter] = useState<string>(ALL);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesBrand = brandFilter === ALL || product.brand === brandFilter;
      const matchesTechnology =
        technologyFilter === ALL || product.technology === technologyFilter;
      return matchesBrand && matchesTechnology;
    });
  }, [products, brandFilter, technologyFilter]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-10">
        <FilterGroup
          label="Marca"
          options={[ALL, ...brands]}
          value={brandFilter}
          onChange={setBrandFilter}
        />
        <FilterGroup
          label="Tecnología"
          options={[ALL, ...technologies]}
          value={technologyFilter}
          onChange={setTechnologyFilter}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-sm text-slate-500">
          No hay productos que coincidan con los filtros seleccionados.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
