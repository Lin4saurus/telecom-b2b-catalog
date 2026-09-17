import Link from "next/link";
import { HeroBackgroundImage } from "./HeroBackgroundImage";

export function Hero() {
  return (
    <section className="relative flex min-h-[420px] items-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 sm:min-h-[480px] lg:min-h-[560px]">
      <div className="absolute inset-0">
        <HeroBackgroundImage />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/75 to-blue-950/50" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 py-24 sm:px-6">
        <span className="rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-blue-100 ring-1 ring-inset ring-white/20 backdrop-blur">
          Mayorista de telecomunicaciones
        </span>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Soluciones mayoristas de fibra óptica y redes GPON para operadores
        </h1>
        <p className="max-w-xl text-lg text-blue-100/90 sm:text-xl">
          Equipamiento y tecnología para desplegar redes ópticas confiables,
          con marcas líderes del sector.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition-colors hover:bg-blue-500"
          >
            Ver catálogo
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            Solicitar cotización
          </Link>
        </div>
      </div>
    </section>
  );
}
