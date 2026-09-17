type Pillar = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const pillars: Pillar[] = [
  {
    title: "Misión",
    description:
      "Facilitar el despliegue de redes ópticas confiables, poniendo a disposición de nuestros clientes equipamiento certificado, disponibilidad y asesoramiento técnico en cada etapa del proyecto.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      </>
    ),
  },
  {
    title: "Visión",
    description:
      "Ser el mayorista de referencia en fibra óptica y redes GPON para operadores e integradores de la región, reconocidos por la calidad de nuestro asesoramiento.",
    icon: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    title: "Propósito",
    description:
      "Acompañar el crecimiento de la conectividad en la región, ayudando a que cada operador acceda al equipamiento correcto para su proyecto.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m14.5 9.5-2 5-5 2 2-5 5-2Z" />
      </>
    ),
  },
];

export function MissionVisionPurpose() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
          Nuestros pilares
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Misión, visión y propósito
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-xl border-t-4 border-blue-600 bg-white p-6 shadow-sm"
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
                {pillar.icon}
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
