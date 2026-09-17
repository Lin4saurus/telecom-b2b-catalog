"use client";

import Image from "next/image";
import { useState } from "react";

type IndustryImageProps = {
  src: string;
  alt: string;
};

export function IndustryImage({ src, alt }: IndustryImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-blue-900 shadow-lg">
        <span className="text-lg font-semibold text-blue-100">
          Telesev Group
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
