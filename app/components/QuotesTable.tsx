export type QuoteRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  product_id: string | null;
  product_name: string | null;
  quantity: number | null;
  details: string | null;
};

type QuotesTableProps = {
  status: "loading" | "success" | "error";
  rows: QuoteRow[];
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("es-AR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function QuotesTable({ status, rows }: QuotesTableProps) {
  if (status === "loading") {
    return <p className="text-sm text-slate-500">Cargando cotizaciones...</p>;
  }

  if (status === "error") {
    return (
      <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
        No pudimos cargar las cotizaciones. Probá recargar la página.
      </p>
    );
  }

  if (rows.length === 0) {
    return (
      <p className="text-sm text-slate-500">Todavía no hay cotizaciones.</p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Empresa</th>
            <th className="px-4 py-3">Producto</th>
            <th className="px-4 py-3">Cantidad</th>
            <th className="px-4 py-3">Detalles</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                {formatDate(row.created_at)}
              </td>
              <td className="px-4 py-3 font-medium text-slate-900">
                {row.name}
              </td>
              <td className="px-4 py-3 text-slate-600">{row.email}</td>
              <td className="px-4 py-3 text-slate-600">
                {row.company || "—"}
              </td>
              <td className="px-4 py-3 text-slate-600">
                {row.product_name || "Cotización general"}
              </td>
              <td className="px-4 py-3 text-slate-600">
                {row.quantity ?? "—"}
              </td>
              <td className="px-4 py-3 text-slate-600">
                {row.details || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
