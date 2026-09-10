export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 sm:px-6">
        <span className="text-lg font-bold text-white">
          Telesev <span className="text-blue-400">Group</span>
        </span>
        <p className="max-w-md text-sm text-slate-400">
          Mayorista B2B de soluciones de telecomunicaciones: fibra óptica, redes
          GPON y equipamiento para operadores.
        </p>
        <p className="mt-6 text-xs text-slate-500">
          © {year} Telesev Group. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
