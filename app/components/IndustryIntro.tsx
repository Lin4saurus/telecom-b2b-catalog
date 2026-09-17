type Indicator = {
  label: string;
  icon: React.ReactNode;
};

const indicators: Indicator[] = [
  {
    label: "Escalabilidad",
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7h6v6" />
      </>
    ),
  },
  {
    label: "Disponibilidad",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
      </>
    ),
  },
  {
    label: "Compatibilidad",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 3h3a1 1 0 0 1 1 1v2.05a2 2 0 1 0 0 3.9V12a1 1 0 0 1-1 1h-2.05a2 2 0 1 1-3.9 0H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2.05a2 2 0 1 0 3.9 0V4a1 1 0 0 1 1-1Z"
      />
    ),
  },
  {
    label: "Soporte",
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

export function IndustryIntro() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          La solución correcta depende del contexto
        </h2>
        <p className="mt-4 leading-relaxed text-slate-600">
          Un ISP que despliega FTTH masivo no tiene las mismas prioridades
          que una empresa de energía con tendidos a la intemperie, un
          organismo público con varias sedes o una empresa que conecta sus
          propias oficinas. Por eso adaptamos el equipamiento y el
          asesoramiento a cada tipo de proyecto.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {indicators.map((indicator) => (
          <div
            key={indicator.label}
            className="flex flex-col items-center gap-3 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-700">
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                {indicator.icon}
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-900">
              {indicator.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
