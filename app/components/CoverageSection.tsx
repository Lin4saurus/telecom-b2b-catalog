import { CoverageMap } from "./CoverageMap";

const countries = [
  {
    name: "Argentina",
    note: "Cobertura y atención a proyectos en todo el país.",
  },
  {
    name: "Chile",
    note: "Atención a operadores e integradores locales.",
  },
  {
    name: "Uruguay",
    note: "Proyectos de despliegue y ampliación de redes.",
  },
  {
    name: "Paraguay",
    note: "Asesoramiento y cotización de equipamiento.",
  },
];

export function CoverageSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
          Cobertura
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Presencia en el Cono Sur
        </h2>
        <p className="mt-3 text-slate-600">
          Damos cobertura y atención a proyectos de operadores e
          integradores en distintos países de la región.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 p-8">
          <CoverageMap />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {countries.map((country) => (
            <div
              key={country.name}
              className="rounded-lg border border-slate-200 bg-white p-5"
            >
              <h3 className="text-base font-semibold text-slate-900">
                {country.name}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{country.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
