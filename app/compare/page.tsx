import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import { CompareTable } from "../components/CompareTable";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Comparar productos | Telesev Group",
  description:
    "Comparación lado a lado de especificaciones técnicas de productos Telesev Group.",
};

export default async function ComparePage({
  searchParams,
}: PageProps<"/compare">) {
  const params = await searchParams;
  const idsParam = params.ids;
  const idsValue = Array.isArray(idsParam) ? idsParam[0] : idsParam;
  const ids = idsValue ? idsValue.split(",").filter(Boolean) : [];

  const { products: allProducts } = await getProducts();
  const products = ids
    .map((id) => allProducts.find((product) => product.id === id))
    .filter((product): product is NonNullable<typeof product> =>
      Boolean(product)
    );

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <Link
        href="/catalog"
        className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800"
      >
        ← Volver al catálogo
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Comparar productos
      </h1>
      <p className="mt-2 text-slate-600">
        Especificaciones lado a lado de los productos que seleccionaste.
      </p>

      {products.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
          <p className="text-sm text-slate-600">
            No hay productos para comparar. Volvé al catálogo y agregá hasta
            4 productos con el botón de comparación.
          </p>
          <Link
            href="/catalog"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
          >
            Ver catálogo
          </Link>
        </div>
      ) : (
        <CompareTable initialProducts={products} />
      )}
    </section>
  );
}
