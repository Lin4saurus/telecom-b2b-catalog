"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAdminSession } from "@/lib/useAdminSession";
import { getProducts } from "@/lib/products";
import { AdminHeader } from "./AdminHeader";

type DataStatus = "loading" | "success" | "error";

type TopProduct = {
  name: string;
  count: number;
};

type Metrics = {
  totalQuotes: number;
  newQuotes: number;
  totalContacts: number;
  totalProducts: number;
  topProducts: TopProduct[];
};

const EMPTY_METRICS: Metrics = {
  totalQuotes: 0,
  newQuotes: 0,
  totalContacts: 0,
  totalProducts: 0,
  topProducts: [],
};

export function AdminDashboard() {
  const { status, session } = useAdminSession();
  const [dataStatus, setDataStatus] = useState<DataStatus>("loading");
  const [metrics, setMetrics] = useState<Metrics>(EMPTY_METRICS);

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    let isCancelled = false;

    async function load() {
      setDataStatus("loading");

      const [contactsResult, quotesResult, productsResult] =
        await Promise.all([
          supabase.from("contacts").select("id", { count: "exact", head: true }),
          supabase
            .from("quotes")
            .select("status, product_name", { count: "exact" }),
          getProducts(),
        ]);

      if (isCancelled) return;

      if (contactsResult.error || quotesResult.error || productsResult.error) {
        setDataStatus("error");
        return;
      }

      const quoteRows = quotesResult.data ?? [];
      const newQuotes = quoteRows.filter(
        (row) => row.status === "Nueva"
      ).length;

      const counts = new Map<string, number>();
      for (const row of quoteRows) {
        const label = row.product_name || "Cotización general";
        counts.set(label, (counts.get(label) ?? 0) + 1);
      }

      const topProducts = Array.from(counts.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setMetrics({
        totalQuotes: quotesResult.count ?? quoteRows.length,
        newQuotes,
        totalContacts: contactsResult.count ?? 0,
        totalProducts: productsResult.products.length,
        topProducts,
      });
      setDataStatus("success");
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, [status]);

  if (status !== "authenticated") {
    return (
      <section className="mx-auto flex w-full max-w-2xl flex-1 items-center justify-center px-4 py-16 sm:px-6">
        <p className="text-slate-500">Cargando...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <AdminHeader session={session} />

      <h1 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
        Dashboard
      </h1>

      {dataStatus === "loading" && (
        <p className="text-sm text-slate-500">Cargando métricas...</p>
      )}

      {dataStatus === "error" && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          No pudimos cargar las métricas. Probá recargar la página.
        </p>
      )}

      {dataStatus === "success" && (
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <MetricCard
              label="Cotizaciones totales"
              value={metrics.totalQuotes}
            />
            <MetricCard
              label="Cotizaciones nuevas"
              value={metrics.newQuotes}
            />
            <MetricCard
              label="Contactos totales"
              value={metrics.totalContacts}
            />
            <MetricCard
              label="Productos en catálogo"
              value={metrics.totalProducts}
            />
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              Productos más solicitados
            </h2>
            {metrics.topProducts.length === 0 ? (
              <p className="text-sm text-slate-500">
                Todavía no hay cotizaciones para mostrar este gráfico.
              </p>
            ) : (
              <TopProductsChart items={metrics.topProducts} />
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <p className="text-3xl font-bold text-slate-900">
        {value.toLocaleString("es-AR")}
      </p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}

function TopProductsChart({ items }: { items: TopProduct[] }) {
  const max = Math.max(...items.map((item) => item.count));

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-6">
      {items.map((item) => (
        <div key={item.name} className="flex items-center gap-3">
          <span
            className="w-40 shrink-0 truncate text-sm text-slate-700"
            title={item.name}
          >
            {item.name}
          </span>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{ width: `${(item.count / max) * 100}%` }}
            />
          </div>
          <span className="w-6 shrink-0 text-right text-sm font-medium text-slate-600">
            {item.count}
          </span>
        </div>
      ))}
    </div>
  );
}
