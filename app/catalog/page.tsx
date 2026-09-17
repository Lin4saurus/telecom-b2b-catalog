import type { Metadata } from "next";
import { getProducts } from "@/lib/products";
import { CatalogView } from "../components/CatalogView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Catálogo | Telesev Group",
  description:
    "Explorá el catálogo de productos y soluciones de Telesev Group: equipamiento GPON, redes ópticas y fibra óptica de Kontron, Iskratel y C-Data.",
};

export default async function CatalogPage() {
  const { products, error } = await getProducts();

  // Se convierte en una excepción real para que la capture app/catalog/error.tsx
  // (el mecanismo nativo de Next.js para estados de error), en vez de manejarlo
  // acá con un mensaje inline como antes del M28.
  if (error) {
    throw new Error("No se pudieron obtener los productos del catálogo.");
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
          Catálogo
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Equipamiento para redes ópticas y GPON
        </h1>
        <p className="mt-3 text-slate-600">
          Soluciones de Kontron, Iskratel y C-Data para operadores que
          despliegan y escalan redes de fibra óptica.
        </p>
      </div>

      <CatalogView products={products} />
    </section>
  );
}
