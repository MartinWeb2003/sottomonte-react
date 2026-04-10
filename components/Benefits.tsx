"use client";

import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { useInView } from "../lib/useInView";

const iconSrcs = ["/icons/icon1.png", "/icons/icon2.png", "/icons/icon3.png"];

export default function Benefits() {
  const { lang } = useLang();
  const tr = translations[lang].benefits;
  const [ref, inView] = useInView<HTMLElement>(0.08);

  return (
    <section className="benefits-section" ref={ref}>
      <div className="benefits-card">
        <h2 className={`benefits-title reveal-heading ${inView ? "is-visible" : ""}`}>
          {tr.sectionTitle}
        </h2>

        <div className={`benefits-grid stagger-children ${inView ? "is-visible" : ""}`}>
          {tr.items.map((b, i) => (
            <div key={b.title} className="benefit">
              <div className="benefit-icon">
                <Image src={iconSrcs[i]} alt="" width={80} height={80} priority={false} />
              </div>
              <h3 className="benefit-heading">{b.title}</h3>
              <p className="benefit-text">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
