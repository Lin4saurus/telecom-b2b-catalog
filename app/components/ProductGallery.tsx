"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductImage } from "./ProductImage";

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

const MAX_IMAGES = 4;

// A partir de la imagen principal (p. ej. /images/products/foo.jpg) arma
// los candidatos foo-2.jpg, foo-3.jpg, foo-4.jpg. Son solo candidatos: la
// mayoría de los productos hoy no tienen esos archivos, y eso es esperado.
function getNumberedCandidates(baseUrl: string): string[] {
  const match = baseUrl.match(/^(.*)(\.[a-zA-Z0-9]+)$/);
  if (!match) return [];
  const [, prefix, extension] = match;
  return ["2", "3", "4"].map((suffix) => `${prefix}-${suffix}${extension}`);
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const baseImages = useMemo(() => images.slice(0, MAX_IMAGES), [images]);

  const candidateUrls = useMemo(() => {
    if (baseImages.length === 0) return [];
    const known = new Set(baseImages);
    return getNumberedCandidates(baseImages[0]).filter(
      (url) => !known.has(url)
    );
  }, [baseImages]);

  const [confirmedCandidates, setConfirmedCandidates] = useState<string[]>([]);

  // Los candidatos por convención de nombres pueden existir o no: los
  // "probamos" precargándolos en el navegador y solo nos quedamos con los
  // que efectivamente cargan. El resultado (setConfirmedCandidates) siempre
  // se aplica dentro del callback onload, nunca de forma síncrona en el
  // cuerpo del efecto (ProductGallery se monta con key={product.id} desde
  // la página, así que cada producto arranca con su propio estado limpio).
  useEffect(() => {
    if (candidateUrls.length === 0) return;

    let isCancelled = false;

    candidateUrls.forEach((url) => {
      const probe = new window.Image();
      probe.onload = () => {
        if (isCancelled) return;
        setConfirmedCandidates((current) =>
          current.includes(url) ? current : [...current, url]
        );
      };
      probe.onerror = () => {
        // El archivo no existe: no se agrega, sin miniaturas rotas ni huecos.
      };
      probe.src = url;
    });

    return () => {
      isCancelled = true;
    };
  }, [candidateUrls]);

  const galleryImages = useMemo(() => {
    const extra = candidateUrls.filter((url) =>
      confirmedCandidates.includes(url)
    );
    return [...baseImages, ...extra].slice(0, MAX_IMAGES);
  }, [baseImages, candidateUrls, confirmedCandidates]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const activeImage = galleryImages[activeIndex] ?? galleryImages[0];
  const hasMultiple = galleryImages.length > 1;

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setIsZoomed(true)}
        aria-label="Ampliar imagen"
        className="group block w-full cursor-zoom-in"
      >
        <ProductImage
          src={activeImage}
          alt={alt}
          objectFit="contain"
          className="aspect-square w-full rounded-lg bg-slate-50 sm:aspect-[4/3]"
          imageClassName="p-8 transition-transform duration-300 ease-out group-hover:scale-110"
        />
      </button>

      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {galleryImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Ver imagen ${index + 1} de ${alt}`}
              aria-current={index === activeIndex}
              className={`shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                index === activeIndex
                  ? "border-blue-600"
                  : "border-transparent hover:border-slate-300"
              }`}
            >
              <ProductImage
                src={image}
                alt=""
                objectFit="contain"
                className="h-16 w-16 bg-slate-50"
                imageClassName="p-1.5"
              />
            </button>
          ))}
        </div>
      )}

      {isZoomed && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Cerrar vista ampliada"
            onClick={() => setIsZoomed(false)}
            className="absolute inset-0 bg-slate-900/80"
          />
          <div className="relative mx-auto flex h-full max-w-3xl items-center p-6">
            <button
              type="button"
              onClick={() => setIsZoomed(false)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-md hover:bg-slate-100"
            >
              ✕
            </button>
            <ProductImage
              src={activeImage}
              alt={alt}
              objectFit="contain"
              className="relative h-[70vh] w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
