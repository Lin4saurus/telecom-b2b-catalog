import { supabase } from "@/lib/supabase";
import type { Product } from "@/data/products";

type ProductRow = {
  id: string;
  name: string;
  brand: string;
  technology: string;
  short_description: string;
  technical_description: string;
};

export type ProductInput = {
  id: string;
  name: string;
  brand: string;
  technology: string;
  shortDescription: string;
  technicalDescription: string;
};

const PRODUCT_COLUMNS =
  "id, name, brand, technology, short_description, technical_description";

function mapRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand as Product["brand"],
    technology: row.technology as Product["technology"],
    shortDescription: row.short_description,
    technicalDescription: row.technical_description,
  };
}

function toRow(input: ProductInput) {
  return {
    id: input.id,
    name: input.name,
    brand: input.brand,
    technology: input.technology,
    short_description: input.shortDescription,
    technical_description: input.technicalDescription,
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
