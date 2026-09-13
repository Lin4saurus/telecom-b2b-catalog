import type { Metadata } from "next";
import { ProductsAdminView } from "../../components/ProductsAdminView";

export const metadata: Metadata = {
  title: "Productos | Panel admin — Telesev Group",
  robots: { index: false, follow: false },
};

export default function AdminProductsPage() {
  return <ProductsAdminView />;
}
