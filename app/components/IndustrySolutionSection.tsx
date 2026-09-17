import Link from "next/link";
import { IndustryImage } from "./IndustryImage";

export type IndustryBenefit = {
  title: string;
  description: string;
};

export type IndustrySolutionSectionProps = {
  id: string;
  index: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  challenges: string[];
  solutions: string[];
  benefits: IndustryBenefit[];
  ctaHref: string;
  ctaLabel: string;
  reversed?: boolean;
  className?: string;
};

export function IndustrySolutionSection({
  id,
  index,
  title,
  description,
  image,
  imageAlt,
  challenges,
  solutions,
  benefits,
  ctaHref,
  ctaLabel,
  reversed = false,
  className = "",
}: IndustrySolutionSectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className={reversed ? "lg:order-2" : ""}>
            <span className="text-sm font-bold tracking-wide text-blue-700">
              {index}
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              {description}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Desafíos principales
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {challenges.map((challenge) => (
                    <li
                      key={challenge}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"
                      />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Soluciones relevantes
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {solutions.map((solution) => (
                    <li
                      key={solution}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
                      />
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={reversed ? "lg:order-1" : ""}>
            <IndustryImage src={image} alt={imageAlt} />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-lg border border-slate-200 bg-white p-5"
            >
              <h4 className="text-base font-semibold text-slate-900">
                {benefit.title}
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
