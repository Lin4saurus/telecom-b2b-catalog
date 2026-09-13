import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

const siteLinks = [
  { href: "/", label: "Inicio" },
  { href: "/catalog", label: "Catálogo" },
  { href: "/about", label: "Nosotros" },
  { href: "/industries", label: "Industrias" },
  { href: "/contact", label: "Contacto" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <span className="text-lg font-bold text-white">
            Telesev <span className="text-blue-400">Group</span>
          </span>
          <p className="mt-3 max-w-xs text-sm text-slate-400">
            Mayorista B2B de soluciones de telecomunicaciones: fibra óptica,
            redes GPON y equipamiento para operadores.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Navegación
          </h3>
          <ul className="mt-4 flex flex-col gap-2">
            {siteLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Contacto
          </h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-slate-300">
            <li>Buenos Aires, Argentina</li>
            <li>
              <a
                href="mailto:ventas@telesevgroup.com"
                className="transition-colors hover:text-white"
              >
                ventas@telesevgroup.com
              </a>
            </li>
            <li>
              <a
                href="tel:+541140000000"
                className="transition-colors hover:text-white"
              >
                +54 11 4000-0000
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Novedades
          </h3>
          <p className="mt-4 text-sm text-slate-400">
            Suscribite para recibir novedades de producto y disponibilidad de
            stock.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-slate-800 py-6">
        <p className="mx-auto max-w-6xl px-4 text-center text-xs text-slate-500 sm:px-6 sm:text-left">
          © {year} Telesev Group. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
