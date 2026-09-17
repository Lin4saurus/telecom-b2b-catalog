type ProductSpecsTableProps = {
  specifications: Record<string, string>;
};

export function ProductSpecsTable({ specifications }: ProductSpecsTableProps) {
  const entries = Object.entries(specifications);

  if (entries.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        Todavía no hay especificaciones técnicas cargadas para este producto.
      </p>
    );
  }

  return (
    <dl className="divide-y divide-slate-100 overflow-hidden rounded-lg border border-slate-200">
      {entries.map(([label, value]) => (
        <div
          key={label}
          className="flex flex-col gap-1 bg-white px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4 sm:px-6"
        >
          <dt className="text-sm font-medium text-slate-500 sm:w-1/3 sm:shrink-0">
            {label}
          </dt>
          <dd className="text-sm font-semibold text-slate-900">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
