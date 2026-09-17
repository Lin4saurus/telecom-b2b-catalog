import Link from "next/link";
import { TimelineSteps, type TimelineStep } from "./TimelineSteps";

const steps: TimelineStep[] = [
  {
    title: "Compartís el contexto",
    description:
      "Nos contás qué tipo de proyecto tenés y qué necesitás resolver.",
  },
  {
    title: "Identificamos prioridades",
    description:
      "Definimos qué es más importante para tu caso: costo, robustez, rapidez o documentación.",
  },
  {
    title: "Seleccionamos alternativas",
    description:
      "Te proponemos el equipamiento más adecuado según esas prioridades.",
  },
  {
    title: "Preparamos el siguiente paso",
    description:
      "Armamos una cotización o coordinamos una conversación técnica, según lo que necesites.",
  },
];

export function IndustryProcess() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            Cómo te acompañamos
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Un proceso de atención por industria
          </h2>
        </div>

        <div className="mt-14">
          <TimelineSteps steps={steps} ringClassName="ring-slate-50" />
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
          >
            Iniciar una conversación
          </Link>
        </div>
      </div>
    </section>
  );
}
