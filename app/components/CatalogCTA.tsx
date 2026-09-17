import Link from "next/link";

type Benefit = {
  label: string;
  icon: React.ReactNode;
};

const benefits: Benefit[] = [
  {
    label: "Equipamiento para redes FTTH/GPON",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 12h4l2-4 4 8 2-4h4"
      />
    ),
  },
  {
    label: "Fichas técnicas completas",
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6M9 16.5h6" />
      </>
    ),
  },
  {
    label: "Cotización rápida y sin vueltas",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
      />
    ),
  },
  {
    label: "Soporte técnico especializado",
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 13v-1a8 8 0 0 1 16 0v1"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 13a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2Zm16 0a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2Z"
        />
      </>
    ),
  },
];

export function CatalogCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 py-20 text-white">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-10"
        aria-hidden="true"
      >
        <pattern
          id="catalog-cta-dots"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.5" fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#catalog-cta-dots)" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-blue-100">
            Catálogo B2B
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Todo el equipamiento que tu red necesita, en un solo lugar
          </h2>
          <p className="mt-4 text-blue-100">
            Explorá el catálogo completo de Telesev Group: OLTs, ONTs,
            splitters, cables, cajas de distribución y más, con fichas
            técnicas claras y cotización directa desde cada producto.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <li key={benefit.label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    {benefit.icon}
                  </svg>
                </span>
                <span className="text-sm font-medium text-white">
                  {benefit.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm transition-colors hover:bg-blue-50"
            >
              Explorar catálogo
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Solicitar asesoramiento
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
