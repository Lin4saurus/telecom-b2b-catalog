"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  target: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

export function AnimatedCounter({
  target,
  label,
  prefix = "",
  suffix = "",
  duration = 1500,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hasAnimatedRef.current) {
          return;
        }

        hasAnimatedRef.current = true;
        observer.disconnect();

        if (prefersReducedMotion) {
          setValue(target);
          return;
        }

        const startTime = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(target * eased));

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div ref={elementRef} className="flex flex-col items-center text-center">
      <span className="text-4xl font-bold text-white sm:text-5xl">
        {prefix}
        {value.toLocaleString("es-AR")}
        {suffix}
      </span>
      <span className="mt-2 text-sm font-medium text-blue-100/80 sm:text-base">
        {label}
      </span>
    </div>
  );
}
