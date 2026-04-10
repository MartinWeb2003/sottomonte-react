"use client";

import Image from "next/image";
import Link from "next/link";
import WhereToFindUs from "@/components/WhereToFindUs";
import Footer from "../../components/Footer";
import BlurText from "../../components/BlurText";
import { useLang } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";
import { useInView } from "../../lib/useInView";

export default function AboutPage() {
  const { lang } = useLang();
  const tr = translations[lang].aboutPage;

  const [heroRef,     heroVisible]     = useInView<HTMLElement>(0.06);
  const [storyRef,    storyVisible]    = useInView<HTMLElement>(0.06);
  const [benefitsRef, benefitsVisible] = useInView<HTMLDivElement>(0.04);
  const [splitRef,    splitVisible]    = useInView<HTMLElement>(0.06);
  const [ctaRef,      ctaVisible]      = useInView<HTMLElement>(0.12);

  return (
    <main className="aboutpage">

      {/* ── HERO ── */}
      <section className="aboutpage-hero" ref={heroRef}>
        <div className="aboutpage-hero-inner">
          <div className={`aboutpage-hero-left reveal-left ${heroVisible ? "is-visible" : ""}`}>
            {heroVisible ? (
              <BlurText as="h1" text={tr.heroTitle} className="aboutpage-title" delayPerCharMs={18} />
            ) : (
              <h1 className="aboutpage-title" style={{ opacity: 0 }}>{tr.heroTitle}</h1>
            )}
            <p className="aboutpage-lead">{tr.heroLead}</p>
            <div className="aboutpage-hero-actions">
              <Link href="/contact" className="aboutpage-btn">{tr.getInTouch}</Link>
              <Link href="/buy" className="aboutpage-link">{tr.viewOpportunities}</Link>
            </div>
          </div>

          <div className={`aboutpage-hero-right clip-reveal delay-2 ${heroVisible ? "is-visible" : ""}`} aria-hidden="true">
            <Image src="/about/about2.jpg" alt="Sottomonte" fill className="aboutpage-hero-img" sizes="(max-width: 900px) 100vw, 50vw" priority />
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="aboutpage-story" ref={storyRef}>
        <div className="aboutpage-story-inner">
          <h2 className={`aboutpage-h2 reveal-heading ${storyVisible ? "is-visible" : ""}`}>
            {tr.storyTitle}
          </h2>

          <div className="aboutpage-story-grid">
            <p className={`aboutpage-p reveal-left delay-2 ${storyVisible ? "is-visible" : ""}`}>{tr.storyP1}</p>
            <p className={`aboutpage-p reveal-right delay-2 ${storyVisible ? "is-visible" : ""}`}>{tr.storyP2}</p>
          </div>

          <div
            ref={benefitsRef}
            className={`aboutpage-benefits stagger-children ${benefitsVisible ? "is-visible" : ""}`}
          >
            <div className="aboutpage-benefit">
              <div className="benefit-label">{tr.benefit1Label}</div>
              <div className="benefit-title">{tr.benefit1Title}</div>
              <p className="benefit-text">{tr.benefit1Text}</p>
            </div>
            <div className="aboutpage-benefit">
              <div className="benefit-label">{tr.benefit2Label}</div>
              <div className="benefit-title">{tr.benefit2Title}</div>
              <p className="benefit-text">{tr.benefit2Text}</p>
            </div>
            <div className="aboutpage-benefit">
              <div className="benefit-label">{tr.benefit3Label}</div>
              <div className="benefit-title">{tr.benefit3Title}</div>
              <p className="benefit-text">{tr.benefit3Text}</p>
            </div>
            <div className="aboutpage-benefit">
              <div className="benefit-label">{tr.benefit4Label}</div>
              <div className="benefit-title">{tr.benefit4Title}</div>
              <p className="benefit-text">{tr.benefit4Text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPLIT ── */}
      <section className="aboutpage-split" ref={splitRef}>
        <div className="aboutpage-split-inner">
          <div className={`aboutpage-split-left reveal-left ${splitVisible ? "is-visible" : ""}`}>
            <h2 className={`aboutpage-h2 reveal-heading ${splitVisible ? "is-visible" : ""}`}>{tr.splitTitle}</h2>
            <p className="aboutpage-p">{tr.splitP1}</p>
            <p className="aboutpage-p">{tr.splitP2}</p>
            <Link href="/contact" className="aboutpage-btn">{tr.workBtn}</Link>
          </div>

          <div className={`aboutpage-split-right clip-reveal delay-2 ${splitVisible ? "is-visible" : ""}`} aria-hidden="true">
            <Image src="/about/about.jpg" alt="Sottomonte" fill className="aboutpage-split-img" sizes="(max-width: 900px) 0px, 50vw" />
          </div>
        </div>
      </section>

      <WhereToFindUs />

      {/* ── FINAL CTA ── */}
      <section className="aboutpage-cta" ref={ctaRef}>
        <div className={`aboutpage-cta-inner reveal-scale ${ctaVisible ? "is-visible" : ""}`}>
          <h2 className="aboutpage-cta-title">{tr.ctaTitle}</h2>
          <p className="aboutpage-cta-text">{tr.ctaText}</p>
          <Link href="/contact" className="aboutpage-btn">{tr.ctaBtn}</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
