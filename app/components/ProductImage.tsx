"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageProps = {
  src?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  objectFit?: "cover" | "contain";
};

function PlaceholderIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-8 w-8"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16.5V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2Zm0 0 5-5.5 3.5 3 4-5L20 15"
      />
      <circle cx="8.5" cy="8" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ProductImage({
  src,
  alt,
  className,
  imageClassName,
  objectFit = "cover",
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);
  const showPlaceholder = !src || hasError;

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      {showPlaceholder ? (
        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
          <PlaceholderIcon />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={`${objectFit === "contain" ? "object-contain" : "object-cover"} ${imageClassName ?? ""}`}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
