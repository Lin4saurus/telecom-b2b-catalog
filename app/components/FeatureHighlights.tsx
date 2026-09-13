type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    title: "Stock y logística ágil",
    description:
      "Entregamos a operadores de todo el país, con disponibilidad permanente de los equipos más solicitados.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 7.5V17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7.5m18 0-9-4.5-9 4.5m18 0-9 4.5m0 0L3 7.5m9 4.5V21"
      />
    ),
  },
  {
    title: "Marcas líderes certificadas",
    description:
      "Trabajamos con fabricantes reconocidos como Kontron, Iskratel y C-Data, con garantía y soporte oficial.",
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Soporte técnico especializado",
    description:
      "Acompañamos cada proyecto con asesoría técnica antes, durante y después de la instalación.",
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
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 17v1a3 3 0 0 1-3 3h-2"
        />
      </>
    ),
  },
  {
    title: "Cotizaciones a medida",
    description:
      "Armamos propuestas ajustadas al tamaño y las necesidades específicas de cada operador.",
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 13h6M9 16.5h6"
        />
      </>
    ),
  },
];

export function FeatureHighlights() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            Por qué Telesev Group
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Un mayorista pensado para operadores exigentes
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
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
                  {feature.icon}
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
