import {
  productStatuses,
  type ProductStatus,
} from "@/data/products";

const STATUS_LABELS: Record<ProductStatus, string> = Object.fromEntries(
  productStatuses.map((item) => [item.value, item.label])
) as Record<ProductStatus, string>;

const STATUS_STYLES: Record<ProductStatus, string> = {
  available: "text-green-700",
  backorder: "text-amber-700",
  soon: "text-blue-700",
  consult: "text-slate-500",
};

const STATUS_DOT_STYLES: Record<ProductStatus, string> = {
  available: "bg-green-500",
  backorder: "bg-amber-500",
  soon: "bg-blue-500",
  consult: "bg-slate-400",
};

export function ProductAvailability({ status }: { status: ProductStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_DOT_STYLES[status]}`}
        aria-hidden="true"
      />
      {STATUS_LABELS[status]}
    </span>
  );
}
