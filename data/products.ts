export type Brand = "Kontron" | "Iskratel" | "C-Data";

export type Technology = "GPON" | "Redes ópticas" | "Fibra óptica";

export type ProductCategory =
  | "OLT"
  | "ONT/ONU"
  | "Splitters"
  | "Cables y fibra"
  | "Cajas de distribución"
  | "Patch panels"
  | "Conectores y accesorios"
  | "Herramientas"
  | "Otros";

export type ProductStatus = "available" | "backorder" | "soon" | "consult";

export type ProductBadge = "new" | "featured" | "best-seller" | "offer";

export type ProductDocument = {
  title: string;
  type: string;
  size?: string;
  url?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  brand: Brand;
  sku?: string;
  category: ProductCategory;
  subcategory?: string;
  technologies: Technology[];
  applications: string[];
  status: ProductStatus;
  badge?: ProductBadge;
  image?: string;
  gallery?: string[];
  shortDescription: string;
  description: string;
  highlights: string[];
  specifications: Record<string, string>;
  documents?: ProductDocument[];
  relatedProductIds?: string[];
  priceLabel?: string;
};

export const brands: Brand[] = ["Kontron", "Iskratel", "C-Data"];

export const technologies: Technology[] = [
  "GPON",
  "Redes ópticas",
  "Fibra óptica",
];

export const categories: ProductCategory[] = [
  "OLT",
  "ONT/ONU",
  "Splitters",
  "Cables y fibra",
  "Cajas de distribución",
  "Patch panels",
  "Conectores y accesorios",
  "Herramientas",
  "Otros",
];

export const productStatuses: { value: ProductStatus; label: string }[] = [
  { value: "available", label: "Disponible" },
  { value: "backorder", label: "Bajo pedido" },
  { value: "soon", label: "Próximamente" },
  { value: "consult", label: "Consultar disponibilidad" },
];

export const productBadges: { value: ProductBadge; label: string }[] = [
  { value: "new", label: "Nuevo" },
  { value: "featured", label: "Destacado" },
  { value: "best-seller", label: "Más vendido" },
  { value: "offer", label: "Oferta" },
];
