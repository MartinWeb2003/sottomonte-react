"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";

export default function AboutSplit() {
  const { lang } = useLang();
  const tr = translations[lang].aboutSplit;

  return (
    <section className="aboutsplit">
      <div className="aboutsplit-inner">
        <div className="aboutsplit-left">
          <h2 className="aboutsplit-title">{tr.title}</h2>

          <p className="aboutsplit-lead">{tr.lead}</p>

          <p className="aboutsplit-text">{tr.text1}</p>

          <p className="aboutsplit-text">{tr.text2}</p>

          <Link href="/about" type="button" className="aboutsplit-btn">
            {tr.btn}
          </Link>
        </div>

        <div className="aboutsplit-right" aria-hidden="true">
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
