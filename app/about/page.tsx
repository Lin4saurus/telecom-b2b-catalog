import type { Metadata } from "next";
import { StatsSection } from "../components/StatsSection";

export const metadata: Metadata = {
  title: "Nosotros | Telesev Group",
  description:
    "Conocé la historia, la misión y la cobertura de Telesev Group, mayorista B2B de telecomunicaciones especializado en fibra óptica y redes GPON.",
};

const coverage = ["Argentina", "Chile", "Uruguay", "Paraguay"];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
          Nosotros
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Quiénes somos
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Un mayorista B2B enfocado en darle a los operadores acceso rápido a
          equipamiento de fibra óptica y redes GPON.
        </p>

        <div className="mt-12 flex flex-col gap-10">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Nuestra historia
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              Telesev Group nació como un distribuidor local de equipamiento
              de redes y creció hasta convertirse en un mayorista regional de
              telecomunicaciones. Hoy proveemos a operadores, integradores y
              proveedores de servicios de internet equipamiento de marcas
              líderes como Kontron, Iskratel y C-Data, acompañando cada etapa
              de sus proyectos de despliegue de fibra óptica.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Nuestra misión
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              Facilitar el despliegue de redes ópticas confiables,
              ofreciéndoles a nuestros clientes stock disponible, marcas
              certificadas y asesoramiento técnico especializado en cada
              proyecto, sin importar su escala.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Cobertura
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              Despachamos equipamiento a operadores de toda la región:
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {coverage.map((country) => (
                <li
                  key={country}
                  className="rounded-md border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-700"
                >
                  {country}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <StatsSection />
    </>
  );
}
