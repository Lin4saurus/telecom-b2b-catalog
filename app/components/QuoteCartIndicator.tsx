"use client";

import Link from "next/link";
import { useQuoteCart } from "@/lib/useQuoteCart";

export function QuoteCartIndicator() {
  const { totalCount } = useQuoteCart();

  return (
    <Link
      href="/quote"
      aria-label={
        totalCount > 0
          ? `Cotización, ${totalCount} producto${totalCount === 1 ? "" : "s"}`
          : "Cotización"
      }
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-slate-700 transition-colors hover:bg-slate-100"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 4h2l1.2 9.6a2 2 0 0 0 2 1.7h7.6a2 2 0 0 0 2-1.6L19 8H6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="19" r="1.4" fill="currentColor" />
        <circle cx="16" cy="19" r="1.4" fill="currentColor" />
      </svg>
      {totalCount > 0 && (
        <span
          aria-hidden="true"
          className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-700 px-1 text-[11px] font-semibold text-white"
        >
          {totalCount}
        </span>
      )}
    </Link>
  );
}
