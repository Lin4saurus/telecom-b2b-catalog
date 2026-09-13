type Industry = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const industries: Industry[] = [
  {
    title: "ISPs",
    description:
      "Equipamiento GPON y OLT para desplegar y escalar redes de banda ancha residencial y corporativa.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20h.01M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 14 0M2 9.5a15 15 0 0 1 20 0"
      />
    ),
  },
  {
    title: "Energía y utilities",
    description:
      "Redes ópticas robustas para telemetría, monitoreo remoto y comunicaciones en infraestructura crítica.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
      />
    ),
  },
  {
    title: "Gobierno",
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
    title: "Empresas",
    description:
      "Conectividad dedicada y redes internas de alta velocidad para sedes corporativas y centros de datos.",
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

export function IndustrySolutions() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {industries.map((industry) => (
        <div
          key={industry.title}
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
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
              {industry.icon}
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            {industry.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {industry.description}
          </p>
        </div>
      ))}
    </div>
  );
}
