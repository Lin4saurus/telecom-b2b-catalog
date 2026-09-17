import Link from "next/link";
import { getProducts } from "@/lib/products";
import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

const FEATURED_COUNT = 4;

function pickFeatured(products: Product[]): Product[] {
  const featured = products.filter(
    (product) => product.badge === "featured" || product.badge === "best-seller"
  );

  if (featured.length >= FEATURED_COUNT) {
    return featured.slice(0, FEATURED_COUNT);
  }

  const rest = products.filter((product) => !featured.includes(product));
  return [...featured, ...rest].slice(0, FEATURED_COUNT);
}

export async function FeaturedProducts() {
  const { products, error } = await getProducts();

  // Sección honesta: si falla la conexión con Supabase o no hay productos
  // todavía, se omite en vez de mostrar un error o datos inventados en la
  // landing.
  if (error || products.length === 0) {
    return null;
  }

  const featured = pickFeatured(products);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
              Productos destacados
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Lo más elegido por nuestros clientes
            </h2>
          </div>
          <Link
            href="/catalog"
            className="inline-flex shrink-0 items-center justify-center rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Ver catálogo completo
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
