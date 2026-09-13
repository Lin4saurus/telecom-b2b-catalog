"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Cotizaciones y contactos" },
  { href: "/admin/products", label: "Productos" },
];

function isAdminLinkActive(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminHeader({ session }: { session: Session | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            Panel admin
          </span>
          {session?.user.email && (
            <p className="mt-2 text-sm text-slate-500">
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

      <nav className="mt-6 flex gap-6 border-b border-slate-200">
        {adminLinks.map((link) => {
          const active = isAdminLinkActive(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                active
                  ? "border-blue-700 text-blue-700"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
