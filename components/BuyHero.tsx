"use client";

import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";

export default function BuyHero() {
  const { lang } = useLang();
  const tr = translations[lang].buyPage;

  return (
    <section className="buy-hero">
      <div className="buy-hero-inner">
        <h1 className="buy-hero-title">{tr.heroTitle}</h1>

        <p className="buy-hero-text">{tr.heroText}</p>

        <Link href="/about" type="button" className="buy-hero-btn">
          {tr.heroBtn}
        </Link>
      </div>
    </section>
  );
}
