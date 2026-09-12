"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { ContactsTable, type ContactRow } from "./ContactsTable";
import { QuotesTable, type QuoteRow } from "./QuotesTable";

type AuthStatus = "checking" | "authenticated" | "unauthenticated";
type DataStatus = "loading" | "success" | "error";

export function AdminDashboard() {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [session, setSession] = useState<Session | null>(null);

  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [contactsStatus, setContactsStatus] = useState<DataStatus>("loading");

  const [quotes, setQuotes] = useState<QuoteRow[]>([]);
  const [quotesStatus, setQuotesStatus] = useState<DataStatus>("loading");

  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthStatus(data.session ? "authenticated" : "unauthenticated");
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setAuthStatus(newSession ? "authenticated" : "unauthenticated");
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (authStatus !== "unauthenticated") {
      return;
    }
    router.replace("/admin/login");
  }, [authStatus, router]);

  useEffect(() => {
    if (authStatus !== "authenticated") {
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
          "id, created_at, name, email, company, product_id, product_name, quantity, details"
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
  }, [authStatus]);

  async function handleSignOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (authStatus === "checking" || authStatus === "unauthenticated") {
    return (
      <section className="mx-auto flex w-full max-w-2xl flex-1 items-center justify-center px-4 py-16 sm:px-6">
        <p className="text-slate-500">Cargando...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            Panel admin
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Cotizaciones y contactos
          </h1>
          {session?.user.email && (
            <p className="mt-1 text-sm text-slate-500">
              Sesión iniciada como {session.user.email}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {signingOut ? "Cerrando sesión..." : "Cerrar sesión"}
        </button>
      </div>

      <div className="flex flex-col gap-10">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Cotizaciones
          </h2>
          <QuotesTable status={quotesStatus} rows={quotes} />
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
