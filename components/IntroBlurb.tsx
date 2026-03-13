"use client";

import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";

export default function IntroBlurb() {
  const { lang } = useLang();
  const tr = translations[lang].introBlurb;

  return (
    <section className="introblurb">
      <div className="introblurb-inner">
        <h2 className="introblurb-title">{tr.title}</h2>

        <p className="introblurb-text">{tr.text}</p>

        <div className="introblurb-cta">
          <Link href="/contact" type="button" className="introblurb-button">
            {tr.btn}
          </Link>
        </div>
      </div>
    </section>
  );
}
