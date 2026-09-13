"use client";

import Image from "next/image";
import { useState } from "react";

export function HeroBackgroundImage() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }

  return (
    <Image
      src="/images/hero-bg.jpg"
      alt=""
      fill
      priority
      sizes="100vw"
      className="object-cover"
      onError={() => setHasError(true)}
    />
  );
}
