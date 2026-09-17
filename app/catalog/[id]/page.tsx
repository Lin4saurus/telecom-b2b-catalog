import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Product } from "@/data/products";
import { getProductById, getProducts } from "@/lib/products";
import { ProductGallery } from "../../components/ProductGallery";
import { ProductBadge } from "../../components/ProductBadge";
import { ProductAvailability } from "../../components/ProductAvailability";
import { ProductSpecsTable } from "../../components/ProductSpecsTable";
import { ProductTabs, type ProductTab } from "../../components/ProductTabs";
import { RelatedProducts } from "../../components/RelatedProducts";
import { AddToQuoteButton } from "../../components/AddToQuoteButton";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/catalog/[id]">): Promise<Metadata> {
  const { id } = await params;
  const { product } = await getProductById(id);
  if (!product) return { title: "Producto no encontrado | Telesev Group" };
  return {
    title: `${product.name} | Telesev Group`,
    description: product.shortDescription,
  };
}

function getRelatedProducts(product: Product, allProducts: Product[]): Product[] {
  const others = allProducts.filter((item) => item.id !== product.id);

  if (product.relatedProductIds && product.relatedProductIds.length > 0) {
    const related = product.relatedProductIds
      .map((id) => others.find((item) => item.id === id))
      .filter((item): item is Product => Boolean(item));

    if (related.length > 0) {
      return related.slice(0, 4);
    }
  }

  const sameCategory = others.filter((item) => item.category === product.category);
  if (sameCategory.length > 0) {
    return sameCategory.slice(0, 4);
  }

  const sameTechnology = others.filter((item) =>
    item.technologies.some((tech) => product.technologies.includes(tech))
  );
  return sameTechnology.slice(0, 4);
}

function ProductApplications({ applications }: { applications: string[] }) {
  if (applications.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        Todavía no hay aplicaciones específicas cargadas para este producto.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {applications.map((application) => (
        <span
          key={application}
          className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
        >
          {application}
        </span>
      ))}
    </div>
  );
}

function ProductDocumentsList({ product }: { product: Product }) {
  const availableDocuments = (product.documents ?? []).filter((doc) => doc.url);

  if (availableDocuments.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
        <p className="text-sm text-slate-600">
          Todavía no tenemos documentación descargable cargada para este
          producto. Podemos enviártela directamente si nos escribís.
        </p>
        <Link
          href={`/quote?product=${product.id}`}
          className="mt-4 inline-flex items-center justify-center rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
        >
          Solicitar información
        </Link>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {availableDocuments.map((doc) => (
        <li key={doc.title}>
          <a
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-3 text-sm transition-colors hover:border-blue-300"
          >
            <span className="font-medium text-slate-900">{doc.title}</span>
            <span className="text-xs text-slate-500">
              {doc.type}
              {doc.size ? ` · ${doc.size}` : ""}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default async function ProductPage({
  params,
}: PageProps<"/catalog/[id]">) {
  const { id } = await params;
  const [{ product }, { products: allProducts }] = await Promise.all([
    getProductById(id),
    getProducts(),
  ]);

  if (!product) {
    notFound();
  }

  const images = [product.image, ...(product.gallery ?? [])].filter(
    (src, index, array): src is string =>
      Boolean(src) && array.indexOf(src) === index
  );

  const relatedProducts = getRelatedProducts(product, allProducts);

  const tabs: ProductTab[] = [
    {
      id: "description",
      label: "Descripción",
      content: (
        <p className="leading-relaxed text-slate-700">{product.description}</p>
      ),
    },
    {
      id: "specifications",
      label: "Especificaciones",
      content: <ProductSpecsTable specifications={product.specifications} />,
    },
    {
      id: "applications",
      label: "Aplicaciones",
      content: <ProductApplications applications={product.applications} />,
    },
    {
      id: "documents",
      label: "Documentación",
      content: <ProductDocumentsList product={product} />,
    },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <Link
        href="/catalog"
        className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800"
      >
        ← Volver al catálogo
      </Link>

      <nav
        aria-label="Breadcrumb"
        className="mt-3 mb-8 flex flex-wrap items-center gap-1.5 text-xs text-slate-500"
      >
        <Link href="/" className="hover:text-blue-700">
          Inicio
        </Link>
        <span aria-hidden="true">/</span>
        <Link href="/catalog" className="hover:text-blue-700">
          Catálogo
        </Link>
        <span aria-hidden="true">/</span>
        <span>{product.category}</span>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-slate-700">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery key={product.id} images={images} alt={product.name} />

        <div className="flex flex-col gap-4">
          {product.badge && (
            <ProductBadge badge={product.badge} className="w-fit" />
          )}
          <span className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            {product.brand}
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {product.name}
          </h1>
          {product.sku && (
            <p className="text-sm text-slate-500">SKU: {product.sku}</p>
          )}
          <ProductAvailability status={product.status} />
          <p className="text-lg text-slate-600">{product.shortDescription}</p>
          <p className="text-sm font-medium text-slate-500">
            {product.priceLabel ?? "Precio bajo consulta"}
          </p>

          <div className="mt-2 flex flex-col gap-3">
            <Link
              href={`/quote?product=${product.id}`}
              className="inline-flex items-center justify-center rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
            >
              Solicitar cotización
            </Link>

            <div className="flex gap-3">
              <AddToQuoteButton
                product={product}
                className="flex-1 rounded-md border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              />
              <button
                type="button"
                disabled
                title="Disponible próximamente"
                className="flex-1 cursor-not-allowed rounded-md border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-400"
              >
                Agregar a comparación
              </button>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Consultar a un especialista
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 rounded-lg border border-slate-200 bg-white p-6 sm:p-8">
        <ProductTabs tabs={tabs} />
      </div>

      <RelatedProducts products={relatedProducts} />
    </section>
  );
}
