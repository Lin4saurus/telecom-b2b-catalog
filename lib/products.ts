import { supabase } from "@/lib/supabase";
import type { Product, ProductDocument } from "@/data/products";

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  sku: string | null;
  category: string;
  subcategory: string | null;
  technologies: string[] | null;
  applications: string[] | null;
  status: string;
  badge: string | null;
  image: string | null;
  gallery: string[] | null;
  short_description: string;
  description: string;
  highlights: string[] | null;
  specifications: Record<string, string> | null;
  documents: ProductDocument[] | null;
  related_product_ids: string[] | null;
  price_label: string | null;
};

export type ProductInput = {
  id: string;
  name: string;
  brand: string;
  technology: string;
  shortDescription: string;
  description: string;
};

const PRODUCT_COLUMNS =
  "id, name, slug, brand, sku, category, subcategory, technologies, applications, status, badge, image, gallery, short_description, description, highlights, specifications, documents, related_product_ids, price_label";

function mapRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    brand: row.brand as Product["brand"],
    sku: row.sku ?? undefined,
    category: row.category as Product["category"],
    subcategory: row.subcategory ?? undefined,
    technologies: (row.technologies ?? []) as Product["technologies"],
    applications: row.applications ?? [],
    status: row.status as Product["status"],
    badge: (row.badge as Product["badge"]) ?? undefined,
    image: row.image ?? undefined,
    gallery: row.gallery ?? undefined,
    shortDescription: row.short_description,
    description: row.description,
    highlights: row.highlights ?? [],
    specifications: row.specifications ?? {},
    documents: row.documents ?? undefined,
    relatedProductIds: row.related_product_ids ?? undefined,
    priceLabel: row.price_label ?? undefined,
  };
}

// El admin todavía crea/edita productos con el formulario simple (M16): un
// solo id/nombre/marca/tecnología y dos descripciones. Los campos nuevos del
// modelo ampliado (sku, category, specifications, etc.) no los completa ese
// formulario todavía, así que acá solo mandamos lo que sí sabemos; el resto
// de las columnas usa sus valores por defecto en la base (ver SQL del M22).
function toRow(input: ProductInput) {
  return {
    id: input.id,
    slug: input.id,
    name: input.name,
    brand: input.brand,
    technologies: [input.technology],
    short_description: input.shortDescription,
    description: input.description,
  };
}

export async function getProducts(): Promise<{
  products: Product[];
  error: boolean;
}> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .order("name", { ascending: true });

  if (error || !data) {
    return { products: [], error: true };
  }

  return { products: data.map(mapRow), error: false };
}

export async function getProductById(
  id: string
): Promise<{ product: Product | null; error: boolean }> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return { product: null, error: true };
  }

  return { product: data ? mapRow(data) : null, error: false };
}

export async function createProduct(
  input: ProductInput
): Promise<{ error: string | null }> {
  const { error } = await supabase.from("products").insert(toRow(input));

  if (error) {
    if (error.code === "23505") {
      return { error: "Ya existe un producto con ese identificador." };
    }
    return { error: "No pudimos crear el producto. Intentá nuevamente." };
  }

  return { error: null };
}

export async function updateProduct(
  id: string,
  input: ProductInput
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("products")
    .update(toRow(input))
    .eq("id", id);

  if (error) {
    return { error: "No pudimos guardar los cambios. Intentá nuevamente." };
  }

  return { error: null };
}

export async function deleteProduct(
  id: string
): Promise<{ error: string | null }> {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return { error: "No pudimos eliminar el producto. Intentá nuevamente." };
  }

  return { error: null };
}
