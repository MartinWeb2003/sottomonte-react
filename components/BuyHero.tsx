"use client";

import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { useInView } from "../lib/useInView";

export default function BuyHero() {
  const { lang } = useLang();
  const tr = translations[lang].buyPage;
  const [ref, inView] = useInView<HTMLElement>(0.1);

  return (
    <section className="buy-hero" ref={ref}>
      <div className="buy-hero-inner">
        <h1 className={`buy-hero-title reveal-up ${inView ? "is-visible" : ""}`}>
          {tr.heroTitle}
        </h1>

        <p className={`buy-hero-text reveal-up delay-2 ${inView ? "is-visible" : ""}`}>
          {tr.heroText}
        </p>

        <Link
          href="/about"
          type="button"
          className={`buy-hero-btn reveal-up delay-3 ${inView ? "is-visible" : ""}`}
        >
          {tr.heroBtn}
        </Link>
      </div>
    </section>
  );
}
