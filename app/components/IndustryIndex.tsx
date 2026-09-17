type IndustryIndexItem = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const items: IndustryIndexItem[] = [
  {
    id: "isps-operadores",
    title: "ISPs y operadores",
    description:
      "Equipamiento GPON y OLT para desplegar y escalar redes de banda ancha.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20h.01M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 14 0M2 9.5a15 15 0 0 1 20 0"
      />
    ),
  },
  {
    id: "energia-utilities",
    title: "Energía y utilities",
    description:
      "Redes ópticas robustas para telemetría, monitoreo remoto y comunicaciones críticas.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
      />
    ),
  },
  {
    id: "gobierno-sector-publico",
    title: "Gobierno y sector público",
    description:
      "Conectividad para proyectos de acceso público y redes de fibra municipales.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 21h16M5 21V9l7-5 7 5v12M9 21v-6h6v6"
      />
    ),
  },
  {
    id: "empresas-instituciones",
    title: "Empresas e instituciones",
    description:
      "Conectividad dedicada y redes internas de alta velocidad para sedes corporativas.",
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 20V8a1 1 0 0 1 1-1h4V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v12"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 20v-4h6v4M4 20h16"
        />
      </>
    ),
  },
];

export function IndustryIndex() {
  return (
    <nav
      aria-label="Índice de industrias"
      className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                {item.icon}
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              <a
                href={`#${item.id}`}
                className="text-inherit no-underline after:absolute after:inset-0"
              >
                {item.title}
              </a>
            </h3>
            <p className="mt-2 flex-1 text-sm text-slate-600">
              {item.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
              Ver sección
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </span>
          </div>
        ))}
      </div>
    </nav>
  );
}
