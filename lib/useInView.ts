"use client";
import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.12
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

/** Applies a background-position parallax to a background-image element */
export function useImageParallax<T extends HTMLElement = HTMLDivElement>(
  speed = 0.18
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // skip on touch devices
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const offset = ((rect.top + rect.height / 2) - window.innerHeight / 2) * speed;
      el.style.backgroundPosition = `center calc(50% + ${offset}px)`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [speed]);

  return ref;
}
