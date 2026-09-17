export function ProductCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
    >
      <div className="aspect-[4/3] w-full animate-pulse bg-slate-200" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-12 animate-pulse rounded bg-slate-200" />
        </div>
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-slate-200" />
        <div className="mt-4 h-3 w-1/3 animate-pulse rounded bg-slate-200" />
        <div className="mt-auto flex gap-2 border-t border-slate-100 pt-4">
          <div className="h-9 flex-1 animate-pulse rounded-md bg-slate-200" />
          <div className="h-9 flex-1 animate-pulse rounded-md bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
