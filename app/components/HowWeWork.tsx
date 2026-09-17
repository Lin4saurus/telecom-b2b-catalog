import { TimelineSteps, type TimelineStep } from "./TimelineSteps";

const steps: TimelineStep[] = [
  {
    title: "Entendemos el desafío",
    description:
      "Escuchamos el proyecto: qué red hay que desplegar, con qué alcance y qué restricciones.",
  },
  {
    title: "Evaluamos alternativas",
    description:
      "Comparamos marcas y modelos disponibles para encontrar la combinación más adecuada.",
  },
  {
    title: "Armamos la propuesta",
    description:
      "Preparamos una cotización clara, con el equipamiento y las cantidades que necesitás.",
  },
  {
    title: "Acompañamos la implementación",
    description:
      "Seguimos disponibles durante la instalación y la puesta en marcha del proyecto.",
  },
];

export function HowWeWork() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            Cómo trabajamos
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Un proceso claro, de principio a fin
          </h2>
        </div>

        <div className="mt-14">
          <TimelineSteps steps={steps} ringClassName="ring-slate-50" />
        </div>
      </div>
    </section>
  );
}
