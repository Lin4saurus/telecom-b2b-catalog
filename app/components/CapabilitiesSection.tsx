import Link from "next/link";

const capabilities = [
  "Catálogo con fichas técnicas claras y actualizadas",
  "Cotizaciones para uno o varios productos en una sola solicitud",
  "Comparador de especificaciones entre equipos",
  "Asesoramiento técnico en la elección del equipamiento",
  "Seguimiento comercial de cada solicitud",
];

export function CapabilitiesSection() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
              Capacidades
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Más que un catálogo de productos
            </h2>
            <ul className="mt-6 flex flex-col gap-4">
              {capabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m5 13 4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span className="text-slate-700">{capability}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-blue-700 p-8 text-white shadow-lg sm:p-10">
            <h3 className="text-2xl font-bold tracking-tight">
              No se trata solo de comprar equipamiento
            </h3>
            <p className="mt-4 text-blue-100">
              Te acompañamos para que cada proyecto llegue a buen puerto:
              desde elegir el equipamiento correcto hasta resolver dudas
              técnicas en el camino.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm transition-colors hover:bg-blue-50"
            >
              Hablar con un especialista
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
