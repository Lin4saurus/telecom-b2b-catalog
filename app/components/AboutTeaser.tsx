import Link from "next/link";

export function AboutTeaser() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
              Quiénes somos
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Más que un proveedor de equipamiento
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Telesev Group es un mayorista B2B especializado en fibra
              óptica y redes GPON. Seleccionamos y distribuimos equipamiento
              de marcas reconocidas, y acompañamos a operadores e
              integradores en cada etapa de sus proyectos, desde la elección
              del equipo hasta la puesta en marcha.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
            >
              Conócenos
            </Link>
          </div>

          <div className="rounded-xl border-l-4 border-blue-600 bg-blue-50 p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
              Nuestro compromiso
            </p>
            <p className="mt-3 text-xl font-medium leading-snug text-slate-800">
              Te acompañamos en cada decisión técnica, no solo en la venta
              del equipo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
