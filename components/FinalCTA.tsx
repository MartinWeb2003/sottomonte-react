"use client";

import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";

export default function FinalCTA() {
  const { lang } = useLang();
  const tr = translations[lang].finalCTA;

  return (
    <section className="finalcta">
      <div className="finalcta-inner">
        <h2 className="finalcta-title">{tr.title}</h2>

        <Link href="/contact" type="button" className="finalcta-button">
          {tr.btn}
        </Link>
      </div>
    </section>
  );
}
