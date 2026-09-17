type ComparisonRow = {
  label: string;
  values: [string, string, string, string];
};

const columns = [
  "ISPs y operadores",
  "Energía y utilities",
  "Gobierno y sector público",
  "Empresas e instituciones",
];

const rows: ComparisonRow[] = [
  {
    label: "Escalabilidad",
    values: ["Alta", "Media", "Media", "Media"],
  },
  {
    label: "Cobertura geográfica",
    values: [
      "Zonas residenciales extensas",
      "Tendidos de larga distancia",
      "Múltiples sedes",
      "Un edificio o campus",
    ],
  },
  {
    label: "Prioridad",
    values: [
      "Costo por abonado",
      "Robustez y continuidad",
      "Documentación y planificación",
      "Rapidez de implementación",
    ],
  },
  {
    label: "Productos frecuentes",
    values: [
      "OLT, ONT, splitters",
      "Cables para exteriores, gabinetes",
      "Equipamiento con fichas técnicas completas",
      "Patch panels, cables internos",
    ],
  },
  {
    label: "Soporte requerido",
    values: [
      "Asesoramiento en diseño de red",
      "Asesoramiento técnico en instalación",
      "Cotizaciones por etapas",
      "Cotización rápida",
    ],
  },
];

export function IndustryComparisonTable() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            Comparativa
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            ¿Qué necesita cada tipo de proyecto?
          </h2>
        </div>

        <div className="mt-12 overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="sticky left-0 z-10 w-44 min-w-44 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Criterio
                </th>
                {columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="min-w-48 border-l border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr key={row.label}>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 w-44 min-w-44 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700"
                  >
                    {row.label}
                  </th>
                  {row.values.map((value, columnIndex) => (
                    <td
                      key={columns[columnIndex]}
                      className="min-w-48 border-l border-slate-100 px-4 py-3 text-sm text-slate-600"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
