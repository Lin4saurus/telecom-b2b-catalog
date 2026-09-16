import { productBadges, type ProductBadge as ProductBadgeValue } from "@/data/products";

const BADGE_LABELS: Record<ProductBadgeValue, string> = Object.fromEntries(
  productBadges.map((item) => [item.value, item.label])
) as Record<ProductBadgeValue, string>;

const BADGE_STYLES: Record<ProductBadgeValue, string> = {
  new: "bg-blue-600 text-white",
  featured: "bg-slate-900 text-white",
  "best-seller": "bg-amber-500 text-white",
  offer: "bg-red-600 text-white",
};

type ProductBadgeProps = {
  badge: ProductBadgeValue;
  className?: string;
};

export function ProductBadge({ badge, className }: ProductBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide shadow-sm ${BADGE_STYLES[badge]} ${className ?? ""}`}
    >
      {BADGE_LABELS[badge]}
    </span>
  );
}
