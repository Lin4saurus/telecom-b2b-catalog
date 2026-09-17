export type TimelineStep = {
  title: string;
  description: string;
};

type TimelineStepsProps = {
  steps: TimelineStep[];
  ringClassName?: string;
};

export function TimelineSteps({
  steps,
  ringClassName = "ring-white",
}: TimelineStepsProps) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute left-5 top-0 h-full w-px bg-blue-200 md:left-0 md:top-5 md:h-px md:w-full"
      />
      <ol className="relative flex flex-col gap-10 md:flex-row md:gap-6">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="relative flex flex-1 items-start gap-4 md:flex-col md:items-center md:text-center"
          >
            <span
              className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white ring-4 ${ringClassName}`}
            >
              {index + 1}
            </span>
            <div className="md:mt-4">
              <h3 className="text-base font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
