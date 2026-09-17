import { AboutIntroImage } from "./AboutIntroImage";

export function CompanyIntro() {
  return (
    <section
      id="quienes-somos"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6"
    >
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        <div>
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            Quiénes somos
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Un mayorista pensado para acompañar cada proyecto
          </h2>
          <div className="mt-6 flex flex-col gap-4 leading-relaxed text-slate-600">
            <p>
              Telesev Group selecciona y distribuye equipamiento de fibra
              óptica y redes GPON de fabricantes reconocidos, poniendo a
              disposición de operadores, integradores e ISPs un catálogo
              pensado para cada etapa de sus proyectos de despliegue.
            </p>
            <p>
              No fabricamos los equipos que comercializamos: los evaluamos,
              los integramos en soluciones completas y acompañamos a nuestros
              clientes desde la definición del proyecto hasta la puesta en
              marcha.
            </p>
            <p>
              Trabajamos como un socio técnico y no solo como un proveedor:
              asesoramos en la elección del equipamiento, resolvemos dudas
              técnicas y damos seguimiento a cada cotización.
            </p>
          </div>
        </div>

        <div>
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <AboutIntroImage />
          </div>
          <div className="mt-6 rounded-xl border-l-4 border-blue-600 bg-blue-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
              Nuestro enfoque
            </p>
            <p className="mt-2 text-lg font-medium text-slate-800">
              Elegimos representar marcas que ya cumplen, para que nuestros
              clientes no tengan que probar suerte con su próximo proyecto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
