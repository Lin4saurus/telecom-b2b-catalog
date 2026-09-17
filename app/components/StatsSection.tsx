import { AnimatedCounter } from "./AnimatedCounter";

const stats = [
  { target: 15, suffix: "+", label: "Años de trayectoria" },
  { target: 200, suffix: "+", label: "Clientes activos" },
  { target: 5000, suffix: "+", label: "Equipos desplegados" },
  { target: 4, suffix: "", label: "Países con cobertura" },
];

export function StatsSection() {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 px-4 sm:grid-cols-4 sm:px-6">
        {stats.map((stat) => (
          <AnimatedCounter key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
