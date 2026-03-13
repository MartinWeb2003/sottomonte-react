"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";

export default function HeroSlider() {
  const { lang } = useLang();
  const tr = translations[lang].hero;

  const slides = tr.slides.map((s, i) => ({
    ...s,
    imageSrc: ["/hero/zadar.jpg", "/hero/split.jpg", "/hero/dubrovnik.jpg", "/hero/viganj.jpg"][i],
    ctaHref: "/buy",
  }));

  const [active, setActive] = useState(0);
  const timerRef = useRef<number | null>(null);

  const slideCount = slides.length;

  const goTo = (index: number) => {
    const next = (index + slideCount) % slideCount;
    setActive(next);
  };

  const next = () => goTo(active + 1);
  const prev = () => goTo(active - 1);

  const restartTimer = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setActive((p) => (p + 1) % slideCount);
    }, 3000);
  };

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideCount]);

  const onUserNav = (fn: () => void) => {
    fn();
    restartTimer();
  };

  const current = slides[active];

  return (
    <section className="hero">
      <div className="hero-media">
        {slides.map((s, i) => (
          <div
            key={s.imageSrc}
            className={`hero-slide ${i === active ? "is-active" : ""}`}
            aria-hidden={i !== active}
          >
            <Image
              src={s.imageSrc}
              alt={`${s.town} hero`}
              fill
              priority={i === 0}
              className="hero-image"
              sizes="100vw"
            />
          </div>
        ))}
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <div className="hero-location">
          <LocationIcon />
          <span className="hero-town">{current.town}</span>
          <span className="hero-dash">—</span>
          <span className="hero-subtitle">{current.subtitle}</span>
        </div>

        <h1 className="hero-title">{current.title}</h1>

        <div className="hero-actions">
          <Link className="hero-cta" href={current.ctaHref}>
            {tr.viewMore}
          </Link>
        </div>
      </div>

      <div className="hero-controls" aria-label="Hero slider controls">
        <div className="hero-dots" role="tablist" aria-label="Slide selector">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === active ? "is-active" : ""}`}
              onClick={() => onUserNav(() => goTo(i))}
              aria-label={`Go to slide ${i + 1}`}
              aria-pressed={i === active}
              type="button"
            />
          ))}
        </div>

        <button
          className="hero-arrow"
          onClick={() => onUserNav(prev)}
          aria-label="Previous slide"
          type="button"
        >
          <ArrowLeft />
        </button>

        <button
          className="hero-arrow"
          onClick={() => onUserNav(next)}
          aria-label="Next slide"
          type="button"
        >
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}

function LocationIcon() {
  return (
    <svg
      className="hero-loc-icon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
