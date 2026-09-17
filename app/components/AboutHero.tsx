import Link from "next/link";
import { AboutHeroBackground } from "./AboutHeroBackground";

export function AboutHero() {
  return (
    <section className="relative flex min-h-[70svh] items-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900">
      <div className="absolute inset-0">
        <AboutHeroBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-blue-950/60" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 py-24 sm:px-6">
        <span className="rounded-full bg-white/10 px-4 py-1 text-sm font-medium uppercase tracking-wide text-blue-100 ring-1 ring-inset ring-white/20 backdrop-blur">
          Sobre Telesev Group
        </span>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          Conectamos operadores con el equipamiento que necesitan para crecer
        </h1>
        <p className="max-w-xl text-lg text-blue-100/90">
          Somos un mayorista B2B de telecomunicaciones especializado en fibra
          óptica y redes GPON: seleccionamos, distribuimos e integramos
          equipamiento, y acompañamos cada proyecto de principio a fin.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="#quienes-somos"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition-colors hover:bg-blue-500"
          >
            Conocer más
          </a>
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            Explorar soluciones
          </Link>
        </div>
      </div>
    </section>
  );
}
