import type { Metadata } from "next";
import { NewProductView } from "../../../components/NewProductView";

export const metadata: Metadata = {
  title: "Nuevo producto | Panel admin — Telesev Group",
  robots: { index: false, follow: false },
};

export default function NewProductPage() {
  return <NewProductView />;
}
