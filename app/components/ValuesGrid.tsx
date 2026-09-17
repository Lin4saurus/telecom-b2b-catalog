type Value = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const values: Value[] = [
  {
    title: "Cercanía",
    description: "Atención directa y personalizada en cada consulta.",
    icon: (
      <path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 2.5 5 6 5c2 0 3.5 1.2 4 2.2.5-1 2-2.2 4-2.2 3.5 0 5.5 3.5 3.5 7.5C15 16.65 12 21 12 21Z" />
    ),
  },
  {
    title: "Claridad",
    description: "Información técnica y comercial sin letra chica.",
    icon: (
      <>
        <path d="M9 18h6M10 22h4" />
        <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2.05V17h6v-.25c0-.85.4-1.55 1-2.05A7 7 0 0 0 12 2Z" />
      </>
    ),
  },
  {
    title: "Confiabilidad",
    description: "Cumplimos lo que ofrecemos, con marcas que ya funcionan.",
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Especialización",
    description: "Nos enfocamos en fibra óptica y redes GPON, no en todo.",
    icon: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m20 20-4.3-4.3" />
      </>
    ),
  },
  {
    title: "Agilidad",
    description: "Respuestas rápidas para no frenar tus proyectos.",
    icon: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  },
  {
    title: "Evolución",
    description:
      "Sumamos marcas y soluciones a medida que el mercado avanza.",
    icon: (
      <>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
      </>
    ),
  },
];

export function ValuesGrid() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            Nuestros valores
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Lo que nos guía todos los días
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => {
            const isAccent = index % 2 === 1;
            return (
              <div
                key={value.title}
                className={`rounded-lg p-6 shadow-sm transition-shadow hover:shadow-md ${
                  isAccent
                    ? "bg-blue-700 text-white"
                    : "border border-slate-200 bg-white"
                }`}
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${
                    isAccent ? "bg-white/15 text-white" : "bg-blue-50 text-blue-700"
                  }`}
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    {value.icon}
                  </svg>
                </div>
                <h3
                  className={`text-lg font-semibold ${isAccent ? "text-white" : "text-slate-900"}`}
                >
                  {value.title}
                </h3>
                <p className={`mt-2 text-sm ${isAccent ? "text-blue-100" : "text-slate-600"}`}>
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
