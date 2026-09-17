"use client";

import Image from "next/image";
import { useState } from "react";

export function IndustriesHeroBackground() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }

  return (
    <Image
      src="/images/industries-hero.jpg"
      alt=""
      fill
      priority
      sizes="100vw"
      className="object-cover"
      onError={() => setHasError(true)}
    />
  );
}
