import { TimelineSteps, type TimelineStep } from "./TimelineSteps";

const milestones: TimelineStep[] = [
  {
    title: "Experiencia inicial",
    description:
      "Comenzamos distribuyendo equipamiento de redes y ganando experiencia de primera mano con operadores locales.",
  },
  {
    title: "Especialización en fibra óptica",
    description:
      "Enfocamos el catálogo en fibra óptica y redes GPON, sumando marcas especializadas en despliegues de este tipo.",
  },
  {
    title: "Expansión regional",
    description:
      "Ampliamos nuestra atención a operadores e integradores de otros países del Cono Sur.",
  },
  {
    title: "Partner tecnológico",
    description:
      "Nos consolidamos como un socio técnico y comercial para proyectos de despliegue y ampliación de redes ópticas.",
  },
];

export function CompanyTimeline() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            Nuestra evolución
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Cómo llegamos hasta acá
          </h2>
          <p className="mt-3 text-slate-600">
            De distribuidor local a mayorista regional de fibra óptica y
            redes GPON.
          </p>
        </div>

        <div className="mt-14">
          <TimelineSteps steps={milestones} ringClassName="ring-slate-50" />
        </div>
      </div>
    </section>
  );
}
