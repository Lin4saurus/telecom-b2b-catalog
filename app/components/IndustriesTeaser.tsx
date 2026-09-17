import Link from "next/link";

type IndustryTeaserItem = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const industries: IndustryTeaserItem[] = [
  {
    id: "isps-operadores",
    title: "ISPs y operadores",
    description:
      "Redes GPON escalables para banda ancha residencial y corporativa.",
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
    description: "Redes ópticas robustas para infraestructura crítica.",
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
    description: "Conectividad para proyectos de acceso público.",
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
    description: "Redes internas y conectividad dedicada.",
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

export function IndustriesTeaser() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
              Industrias
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Industrias que atendemos
            </h2>
          </div>
          <Link
            href="/industries"
            className="inline-flex shrink-0 items-center justify-center rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-white"
          >
            Ver soluciones por industria
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <div
              key={industry.id}
              className="group relative rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  {industry.icon}
                </svg>
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                <Link
                  href={`/industries#${industry.id}`}
                  className="text-inherit no-underline after:absolute after:inset-0"
                >
                  {industry.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
