"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { useInView } from "../lib/useInView";

export default function AboutSplit() {
  const { lang } = useLang();
  const tr = translations[lang].aboutSplit;
  const [ref, inView] = useInView<HTMLElement>(0.08);

  return (
    <section className="aboutsplit" ref={ref}>
      <div className="aboutsplit-inner">
        <div className={`aboutsplit-left reveal-left ${inView ? "is-visible" : ""}`}>
          <h2 className={`aboutsplit-title reveal-heading ${inView ? "is-visible" : ""}`}>
            {tr.title}
          </h2>
          <p className="aboutsplit-lead">{tr.lead}</p>
          <p className="aboutsplit-text">{tr.text1}</p>
          <p className="aboutsplit-text">{tr.text2}</p>
          <Link href="/about" className="aboutsplit-btn">{tr.btn}</Link>
        </div>

        <div
          className={`aboutsplit-right clip-reveal delay-2 ${inView ? "is-visible" : ""}`}
          aria-hidden="true"
        >
          <Image
            src="/about/about.jpg"
            alt="About Sottomonte"
            fill
            className="aboutsplit-img"
            sizes="(max-width: 900px) 0px, 50vw"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
