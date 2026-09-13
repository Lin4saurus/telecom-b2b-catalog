import type { Metadata } from "next";
import { IndustrySolutions } from "../components/IndustrySolutions";

export const metadata: Metadata = {
  title: "Soluciones por industria | Telesev Group",
  description:
    "Soluciones de fibra óptica y redes GPON de Telesev Group para ISPs, energía y utilities, gobierno y empresas.",
};

export default function IndustriesPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
          Soluciones por industria
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Equipamiento adaptado a cada sector
        </h1>
        <p className="mt-3 text-slate-600">
          Trabajamos con distintos tipos de organizaciones que necesitan
          desplegar y mantener redes ópticas confiables.
        </p>
      </div>

      <IndustrySolutions />
    </section>
  );
}
