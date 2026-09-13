import type { Metadata } from "next";
import { LeadsView } from "../../components/LeadsView";

export const metadata: Metadata = {
  title: "Cotizaciones y contactos | Panel admin — Telesev Group",
  robots: { index: false, follow: false },
};

export default function AdminLeadsPage() {
  return <LeadsView />;
}
