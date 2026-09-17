import Link from "next/link";

export function AboutCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 py-20 text-white">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-10"
        aria-hidden="true"
      >
        <pattern
          id="about-cta-dots"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.5" fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#about-cta-dots)" />
      </svg>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          ¿Listo para avanzar con tu próximo proyecto?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          Pedí una cotización o hablá con nuestro equipo para definir el
          equipamiento que necesita tu red.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/quote"
            className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm transition-colors hover:bg-blue-50"
          >
            Solicitar cotización
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Hablar con un especialista
          </Link>
        </div>
      </div>
    </section>
  );
}
