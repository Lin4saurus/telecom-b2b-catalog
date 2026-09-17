import Link from "next/link";

type WhatWeDoItem = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon: React.ReactNode;
};

const items: WhatWeDoItem[] = [
  {
    title: "Equipamiento activo",
    description:
      "OLTs y ONTs para desplegar y escalar redes GPON de punta a punta.",
    href: "/catalog",
    linkLabel: "Ver equipamiento",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
        <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
      </>
    ),
  },
  {
    title: "Componentes pasivos",
    description:
      "Splitters, patch panels y cajas de distribución para armar la red física.",
    href: "/catalog",
    linkLabel: "Ver componentes",
    icon: (
      <>
        <path d="M4 12h4" />
        <path d="M8 12 14 6" />
        <path d="M8 12 14 18" />
        <path d="M14 6h6" />
        <path d="M14 18h6" />
      </>
    ),
  },
  {
    title: "Cables y microductos",
    description:
      "Cables de fibra óptica para tendidos aéreos, subterráneos e internos.",
    href: "/catalog",
    linkLabel: "Ver cables",
    icon: (
      <path d="M2 14c1.5-3 3-3 4.5 0s3 3 4.5 0 3-3 4.5 0 3 3 4.5 0" />
    ),
  },
  {
    title: "Herramientas y testing",
    description:
      "Empalmadoras, conectores y accesorios para instalación y mantenimiento.",
    href: "/catalog",
    linkLabel: "Ver herramientas",
    icon: (
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.1 2.1-2.83-2.83 2.1-2.1Z" />
    ),
  },
  {
    title: "Asesoramiento técnico",
    description:
      "Te ayudamos a elegir el equipamiento correcto según los requerimientos de tu proyecto.",
    href: "/contact",
    linkLabel: "Consultar",
    icon: (
      <>
        <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
        <path d="M4 13a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2Zm16 0a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2Z" />
        <path d="M18 17v1a3 3 0 0 1-3 3h-2" />
      </>
    ),
  },
  {
    title: "Soporte comercial",
    description:
      "Armamos propuestas y cotizaciones a medida para uno o varios productos.",
    href: "/quote",
    linkLabel: "Solicitar cotización",
    icon: (
      <>
        <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 16.5h6" />
      </>
    ),
  },
];

export function WhatWeDo() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
          Qué hacemos
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Todo lo que tu red necesita, de un solo proveedor
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="group relative flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                {item.icon}
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              <Link
                href={item.href}
                className="text-inherit no-underline after:absolute after:inset-0"
              >
                {item.title}
              </Link>
            </h3>
            <p className="mt-2 flex-1 text-sm text-slate-600">
              {item.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
              {item.linkLabel}
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
