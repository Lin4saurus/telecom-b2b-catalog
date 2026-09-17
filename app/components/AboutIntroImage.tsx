"use client";

import Image from "next/image";
import { useState } from "react";

export function AboutIntroImage() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-blue-700 to-blue-900">
        <span className="text-lg font-semibold text-blue-100">
          Telesev Group
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full">
      <Image
        src="/images/about-intro.jpg"
        alt="Equipo de Telesev Group asesorando un proyecto de red óptica"
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
