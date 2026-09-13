"use client";

import Image from "next/image";
import { useState } from "react";

type PartnerLogoProps = {
  name: string;
  src: string;
};

export function PartnerLogo({ name, src }: PartnerLogoProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <span className="flex h-10 w-32 shrink-0 items-center justify-center text-center text-sm font-semibold uppercase tracking-wide text-slate-400 sm:h-12 sm:w-40">
        {name}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      width={160}
      height={48}
      className="h-10 w-32 shrink-0 object-contain sm:h-12 sm:w-40"
      onError={() => setHasError(true)}
    />
  );
}
