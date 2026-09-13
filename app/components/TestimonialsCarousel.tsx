"use client";

import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Trabajar con Telesev Group aceleró nuestro despliegue de fibra: encontramos stock disponible cuando otros proveedores tenían demoras de meses.",
    name: "Juan Pablo Ramírez",
    role: "Jefe de Infraestructura, operador de telecomunicaciones regional",
  },
  {
    quote:
      "El soporte técnico post-venta marcó la diferencia. Nos ayudaron a poner en marcha una OLT completa en tiempo récord.",
    name: "Carla Méndez",
    role: "Gerente de Redes, proveedor de internet local",
  },
  {
    quote:
      "La variedad de marcas y la asesoría técnica nos permitieron elegir el equipamiento correcto para nuestra expansión GPON.",
    name: "Diego Fernández",
    role: "Director de Operaciones, integrador de soluciones ópticas",
  },
];

const AUTOPLAY_INTERVAL = 6000;

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused]);

  const testimonial = testimonials[activeIndex];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
          Casos de éxito
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Operadores que confían en Telesev Group
        </h2>

        <div
          className="mt-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <blockquote className="flex min-h-[140px] items-center justify-center text-lg leading-relaxed text-slate-700 sm:text-xl">
            “{testimonial.quote}”
          </blockquote>
          <p className="mt-6 text-sm font-semibold text-slate-900">
            {testimonial.name}
          </p>
          <p className="text-sm text-slate-500">{testimonial.role}</p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() =>
                setActiveIndex(
                  (current) =>
                    (current - 1 + testimonials.length) % testimonials.length
                )
              }
              aria-label="Testimonio anterior"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-blue-300 hover:text-blue-700"
            >
              ←
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Ver testimonio de ${item.name}`}
                  aria-current={index === activeIndex}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === activeIndex ? "bg-blue-700" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                setActiveIndex(
                  (current) => (current + 1) % testimonials.length
                )
              }
              aria-label="Siguiente testimonio"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-blue-300 hover:text-blue-700"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
