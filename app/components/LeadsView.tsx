"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAdminSession } from "@/lib/useAdminSession";
import type { QuoteStatus } from "@/lib/quotes";
import { AdminHeader } from "./AdminHeader";
import { ContactsTable, type ContactRow } from "./ContactsTable";
import { QuotesTable, type QuoteRow } from "./QuotesTable";

type DataStatus = "loading" | "success" | "error";

export function LeadsView() {
  const { status, session } = useAdminSession();

  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [contactsStatus, setContactsStatus] = useState<DataStatus>("loading");

  const [quotes, setQuotes] = useState<QuoteRow[]>([]);
  const [quotesStatus, setQuotesStatus] = useState<DataStatus>("loading");

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    let isCancelled = false;

    async function loadContacts() {
      setContactsStatus("loading");
      const { data, error } = await supabase
        .from("contacts")
        .select("id, created_at, name, email, company, message")
        .order("created_at", { ascending: false });

      if (isCancelled) return;

      if (error) {
        setContactsStatus("error");
        return;
      }

      setContacts(data ?? []);
      setContactsStatus("success");
    }

    async function loadQuotes() {
      setQuotesStatus("loading");
      const { data, error } = await supabase
        .from("quotes")
        .select(
          "id, created_at, name, email, company, product_id, product_name, quantity, details, status"
        )
        .order("created_at", { ascending: false });

      if (isCancelled) return;

      if (error) {
        setQuotesStatus("error");
        return;
      }

      setQuotes(data ?? []);
      setQuotesStatus("success");
    }

    loadContacts();
    loadQuotes();

    return () => {
      isCancelled = true;
    };
  }, [status]);

  function handleQuoteStatusChange(id: string, newStatus: QuoteStatus) {
    setQuotes((prev) =>
      prev.map((quote) =>
        quote.id === id ? { ...quote, status: newStatus } : quote
      )
    );
  }

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

      <div className="flex flex-col gap-10">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Cotizaciones
          </h2>
          <QuotesTable
            status={quotesStatus}
            rows={quotes}
            onStatusChange={handleQuoteStatusChange}
          />
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Contactos
          </h2>
          <ContactsTable status={contactsStatus} rows={contacts} />
        </div>
      </div>
    </section>
  );
}
