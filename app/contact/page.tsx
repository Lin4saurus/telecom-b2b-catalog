import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto | Telesev Group",
  description:
    "Contactá a Telesev Group para consultas comerciales sobre equipamiento GPON, redes ópticas y fibra óptica.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <div className="mb-10">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
          Contacto
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Hablemos de tu proyecto
        </h1>
        <p className="mt-3 text-slate-600">
          Contanos qué necesitás y un especialista de Telesev Group se va a
          poner en contacto con vos.
        </p>
      </div>

      <ContactForm />
    </section>
  );
}
