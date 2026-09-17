import { ProductCardSkeleton } from "../components/ProductCardSkeleton";

export default function CatalogLoading() {
  return (
    <section
      aria-busy="true"
      aria-label="Cargando catálogo"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6"
    >
      <div className="mb-10 max-w-2xl">
        <div className="h-6 w-24 animate-pulse rounded-full bg-blue-100" />
        <div className="mt-4 h-9 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200" />
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-10 w-full max-w-sm animate-pulse rounded-md bg-slate-200" />
        <div className="h-10 w-24 animate-pulse rounded-md bg-slate-200" />
      </div>

      <div className="mb-6 hidden h-10 w-full animate-pulse rounded-md bg-slate-100 md:block" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
