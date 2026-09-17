"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  brands,
  technologies,
  categories,
  productStatuses,
  type Product,
  type ProductStatus,
} from "@/data/products";
import { ProductCard } from "./ProductCard";
import { ProductListItem } from "./ProductListItem";
import { ViewToggle, type ViewMode } from "./ViewToggle";
import { SearchInput } from "./SearchInput";
import { Pagination } from "./Pagination";
import { FilterBar, type SortOption } from "./FilterBar";
import { FilterDrawer } from "./FilterDrawer";
import { ActiveFilterChips, type ActiveFilter } from "./ActiveFilterChips";
import type { SelectOption } from "./SelectField";
import { EmptyState } from "./EmptyState";

const ALL = "Todos";
const PAGE_SIZE = 8;
const SEARCH_DEBOUNCE_MS = 300;

const CATEGORY_OPTIONS: SelectOption[] = [
  { value: ALL, label: "Todas" },
  ...categories.map((category) => ({ value: category, label: category })),
];

const BRAND_OPTIONS: SelectOption[] = [
  { value: ALL, label: "Todas" },
  ...brands.map((brand) => ({ value: brand, label: brand })),
];

const TECHNOLOGY_OPTIONS: SelectOption[] = [
  { value: ALL, label: "Todas" },
  ...technologies.map((technology) => ({
    value: technology,
    label: technology,
  })),
];

const STATUS_OPTIONS: SelectOption[] = [
  { value: ALL, label: "Todas" },
  ...productStatuses.map((status) => ({
    value: status.value,
    label: status.label,
  })),
];

const STATUS_PRIORITY: Record<ProductStatus, number> = {
  available: 0,
  backorder: 1,
  soon: 2,
  consult: 3,
};

function firstParamValue(
  params: { get(key: string): string | null },
  key: string,
  fallback: string
) {
  const raw = params.get(key);
  if (!raw) return fallback;
  return raw.split(",")[0] || fallback;
}

export function CatalogView({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(
    () => searchParams.get("q") ?? ""
  );
  const [debouncedSearch, setDebouncedSearch] = useState(searchInput);
  const isFirstSearchEffect = useRef(true);

  const [category, setCategory] = useState(() =>
    firstParamValue(searchParams, "category", ALL)
  );
  const [brand, setBrand] = useState(() =>
    firstParamValue(searchParams, "brand", ALL)
  );
  const [technology, setTechnology] = useState(() =>
    firstParamValue(searchParams, "technology", ALL)
  );
  const [status, setStatus] = useState(() =>
    firstParamValue(searchParams, "status", ALL)
  );
  const [sort, setSort] = useState<SortOption>(
    () => (searchParams.get("sort") as SortOption) || "name-asc"
  );
  const [page, setPage] = useState(
    () => Number(searchParams.get("page")) || 1
  );

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Debounce: el input responde al instante, pero el filtrado real (y la
  // sincronización con la URL) esperan a que el usuario deje de escribir.
  useEffect(() => {
    if (isFirstSearchEffect.current) {
      isFirstSearchEffect.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  // Refleja el estado en la URL usando la History API del navegador
  // directamente (no el router de Next): así recargar o compartir el link
  // mantiene el mismo resultado, sin disparar una nueva consulta a Supabase
  // en el servidor por cada tecleo o clic en un filtro.
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("q", debouncedSearch);
    if (category !== ALL) params.set("category", category);
    if (brand !== ALL) params.set("brand", brand);
    if (technology !== ALL) params.set("technology", technology);
    if (status !== ALL) params.set("status", status);
    if (sort !== "name-asc") params.set("sort", sort);
    if (page > 1) params.set("page", String(page));

    const query = params.toString();
    const url = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, [debouncedSearch, category, brand, technology, status, sort, page]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === ALL || product.category === category;
      const matchesBrand = brand === ALL || product.brand === brand;
      const matchesTechnology =
        technology === ALL ||
        product.technologies.includes(
          technology as (typeof product.technologies)[number]
        );
      const matchesStatus = status === ALL || product.status === status;
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        (product.sku ?? "").toLowerCase().includes(normalizedSearch) ||
        product.brand.toLowerCase().includes(normalizedSearch) ||
        product.technologies.some((tech) =>
          tech.toLowerCase().includes(normalizedSearch)
        );

      return (
        matchesCategory &&
        matchesBrand &&
        matchesTechnology &&
        matchesStatus &&
        matchesSearch
      );
    });
  }, [products, category, brand, technology, status, debouncedSearch]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];

    if (sort === "name-desc") {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === "availability") {
      list.sort((a, b) => {
        const diff = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
        return diff !== 0 ? diff : a.name.localeCompare(b.name);
      });
    } else {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [filteredProducts, sort]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function handleCategoryChange(value: string) {
    setCategory(value);
    setPage(1);
  }

  function handleBrandChange(value: string) {
    setBrand(value);
    setPage(1);
  }

  function handleTechnologyChange(value: string) {
    setTechnology(value);
    setPage(1);
  }

  function handleStatusChange(value: string) {
    setStatus(value);
    setPage(1);
  }

  function handleSortChange(value: SortOption) {
    setSort(value);
    setPage(1);
  }

  function handleClearAll() {
    setSearchInput("");
    setDebouncedSearch("");
    setCategory(ALL);
    setBrand(ALL);
    setTechnology(ALL);
    setStatus(ALL);
    setPage(1);
  }

  const activeFilters: ActiveFilter[] = [];

  if (debouncedSearch) {
    activeFilters.push({
      key: "search",
      label: `Búsqueda: "${debouncedSearch}"`,
      onRemove: () => {
        setSearchInput("");
        setDebouncedSearch("");
        setPage(1);
      },
    });
  }
  if (category !== ALL) {
    activeFilters.push({
      key: "category",
      label: `Categoría: ${category}`,
      onRemove: () => handleCategoryChange(ALL),
    });
  }
  if (brand !== ALL) {
    activeFilters.push({
      key: "brand",
      label: `Marca: ${brand}`,
      onRemove: () => handleBrandChange(ALL),
    });
  }
  if (technology !== ALL) {
    activeFilters.push({
      key: "technology",
      label: `Tecnología: ${technology}`,
      onRemove: () => handleTechnologyChange(ALL),
    });
  }
  if (status !== ALL) {
    const statusLabel =
      STATUS_OPTIONS.find((option) => option.value === status)?.label ??
      status;
    activeFilters.push({
      key: "status",
      label: `Disponibilidad: ${statusLabel}`,
      onRemove: () => handleStatusChange(ALL),
    });
  }

  const filterControlsProps = {
    categoryOptions: CATEGORY_OPTIONS,
    category,
    onCategoryChange: handleCategoryChange,
    brandOptions: BRAND_OPTIONS,
    brand,
    onBrandChange: handleBrandChange,
    technologyOptions: TECHNOLOGY_OPTIONS,
    technology,
    onTechnologyChange: handleTechnologyChange,
    statusOptions: STATUS_OPTIONS,
    status,
    onStatusChange: handleStatusChange,
    sort,
    onSortChange: handleSortChange,
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Buscar por nombre, SKU, marca o tecnología..."
        />
        <ViewToggle value={viewMode} onChange={setViewMode} />
      </div>

      <FilterBar
        {...filterControlsProps}
        activeCount={activeFilters.length}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      <FilterDrawer
        {...filterControlsProps}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onClearAll={handleClearAll}
        activeCount={activeFilters.length}
      />

      <ActiveFilterChips filters={activeFilters} onClearAll={handleClearAll} />

      {sortedProducts.length === 0 ? (
        <EmptyState
          title="No encontramos productos para esta búsqueda"
          description="Revisá la ortografía, probá con otro término o quitá algún filtro. También podés ver el catálogo completo."
          actions={[
            { label: "Limpiar búsqueda y filtros", onClick: handleClearAll },
          ]}
        />
      ) : (
        <>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {paginatedProducts.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </div>
          )}
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
