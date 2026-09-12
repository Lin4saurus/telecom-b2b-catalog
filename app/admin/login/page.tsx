import type { Metadata } from "next";
import { LoginForm } from "../../components/LoginForm";

export const metadata: Metadata = {
  title: "Ingresar | Panel admin — Telesev Group",
};

export default function AdminLoginPage() {
  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16 sm:px-6">
      <div className="mb-8">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
          Panel admin
        </span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Ingresar
        </h1>
        <p className="mt-2 text-slate-600">
          Acceso exclusivo para el equipo de Telesev Group.
        </p>
      </div>

      <LoginForm />
    </section>
  );
}
