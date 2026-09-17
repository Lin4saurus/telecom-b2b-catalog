"use client";

import Image from "next/image";
import { useState } from "react";

export function AboutHeroBackground() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }

  return (
    <Image
      src="/images/about-hero.jpg"
      alt=""
      fill
      priority
      sizes="100vw"
      className="object-cover"
      onError={() => setHasError(true)}
    />
  );
}
