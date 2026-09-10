import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-20 sm:px-6 sm:py-28">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
          Mayorista de telecomunicaciones
        </span>
        <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          Soluciones mayoristas de fibra óptica y redes GPON para operadores
        </h1>
        <p className="max-w-xl text-lg text-slate-600">
          Equipamiento y tecnología para desplegar redes ópticas confiables,
          con marcas líderes del sector.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center justify-center rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
        >
          Ver catálogo
        </Link>
      </div>
    </section>
  );
}
