"use client";

import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { useInView } from "../lib/useInView";
import BlurText from "./BlurText";

export default function FinalCTA() {
  const { lang } = useLang();
  const tr = translations[lang].finalCTA;
  const [ref, inView] = useInView<HTMLElement>(0.12);

  return (
    <section className="finalcta" ref={ref}>
      <div className={`finalcta-inner reveal-scale ${inView ? "is-visible" : ""}`}>
        {inView && (
          <BlurText
            text={tr.title}
            className="finalcta-title"
            delayPerCharMs={28}
          />
        )}
        <Link
          href="/contact"
          className={`finalcta-button reveal-fade delay-4 ${inView ? "is-visible" : ""}`}
        >
          {tr.btn}
        </Link>
      </div>
    </section>
  );
}
