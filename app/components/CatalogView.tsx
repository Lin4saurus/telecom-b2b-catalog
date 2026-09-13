"use client";

import { useMemo, useState } from "react";
import { brands, technologies, type Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { SearchInput } from "./SearchInput";
import { Pagination } from "./Pagination";

const ALL = "Todos";
const PAGE_SIZE = 6;

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
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesBrand =
        brandFilter === ALL || product.brand === brandFilter;
      const matchesTechnology =
        technologyFilter === ALL || product.technology === technologyFilter;
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.shortDescription.toLowerCase().includes(normalizedSearch);

      return matchesBrand && matchesTechnology && matchesSearch;
    });
  }, [products, brandFilter, technologyFilter, searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE)
  );
  const currentPage = Math.min(page, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function handleSearchChange(value: string) {
    setSearchTerm(value);
    setPage(1);
  }

  function handleBrandChange(value: string) {
    setBrandFilter(value);
    setPage(1);
  }

  function handleTechnologyChange(value: string) {
    setTechnologyFilter(value);
    setPage(1);
  }

  return (
    <div>
      <div className="mb-6">
        <SearchInput
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar por nombre o descripción..."
        />
      </div>

      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-10">
        <FilterGroup
          label="Marca"
          options={[ALL, ...brands]}
          value={brandFilter}
          onChange={handleBrandChange}
        />
        <FilterGroup
          label="Tecnología"
          options={[ALL, ...technologies]}
          value={technologyFilter}
          onChange={handleTechnologyChange}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-sm text-slate-500">
          No hay productos que coincidan con la búsqueda o los filtros
          seleccionados.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
