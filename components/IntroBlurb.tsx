"use client";

import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { useInView } from "../lib/useInView";
import BlurText from "./BlurText";

export default function IntroBlurb() {
  const { lang } = useLang();
  const tr = translations[lang].introBlurb;
  const [ref, inView] = useInView<HTMLElement>(0.08);

  return (
    <section className="introblurb" ref={ref}>
      <div className="introblurb-inner">
        {inView && (
          <BlurText
            text={tr.title}
            className="introblurb-title"
            delayPerCharMs={22}
          />
        )}

        <p className={`introblurb-text reveal-up delay-2 ${inView ? "is-visible" : ""}`}>
          {tr.text}
        </p>

        <div className={`introblurb-cta reveal-up delay-3 ${inView ? "is-visible" : ""}`}>
          <Link href="/contact" className="introblurb-button">{tr.btn}</Link>
        </div>
      </div>
    </section>
  );
}
