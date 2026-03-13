"use client";

import Image from "next/image";
import Link from "next/link";
import SpotlightCard from "../../components/SpotlightCard";
import WhereToFindUs from "@/components/WhereToFindUs";
import Footer from "../../components/Footer";
import { useLang } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";

export default function AboutPage() {
  const { lang } = useLang();
  const tr = translations[lang].aboutPage;

  return (
    <main className="aboutpage">
      {/* HERO */}
      <section className="aboutpage-hero">
        <div className="aboutpage-hero-inner">
          <div className="aboutpage-hero-left">
            <h1 className="aboutpage-title">{tr.heroTitle}</h1>

            <p className="aboutpage-lead">{tr.heroLead}</p>

            <div className="aboutpage-hero-actions">
              <Link type="button" href="/contact" className="aboutpage-btn">
                {tr.getInTouch}
              </Link>

              <Link className="aboutpage-link" href="/buy">
                {tr.viewOpportunities}
              </Link>
            </div>
          </div>

          <div className="aboutpage-hero-right" aria-hidden="true">
            <Image
              src="/about/about2.jpg"
              alt="Sottomonte"
              fill
              className="aboutpage-hero-img"
              sizes="(max-width: 900px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="aboutpage-story">
        <div className="aboutpage-story-inner">
          <h2 className="aboutpage-h2">{tr.storyTitle}</h2>

          <div className="aboutpage-story-grid">
            <p className="aboutpage-p">{tr.storyP1}</p>

            <p className="aboutpage-p">{tr.storyP2}</p>
          </div>

          <div className="aboutpage-benefits">
            <SpotlightCard className="aboutpage-benefit aboutpage-benefit-a">
              <div className="benefit-top">
                <div className="benefit-label">{tr.benefit1Label}</div>
              </div>
              <div className="benefit-title">{tr.benefit1Title}</div>
              <p className="benefit-text">{tr.benefit1Text}</p>
            </SpotlightCard>

            <SpotlightCard className="aboutpage-benefit aboutpage-benefit-b">
              <div className="benefit-top">
                <div className="benefit-label">{tr.benefit2Label}</div>
              </div>
              <div className="benefit-title">{tr.benefit2Title}</div>
              <p className="benefit-text">{tr.benefit2Text}</p>
            </SpotlightCard>

            <SpotlightCard className="aboutpage-benefit aboutpage-benefit-c">
              <div className="benefit-top">
                <div className="benefit-label">{tr.benefit3Label}</div>
              </div>
              <div className="benefit-title">{tr.benefit3Title}</div>
              <p className="benefit-text">{tr.benefit3Text}</p>
            </SpotlightCard>

            <SpotlightCard className="aboutpage-benefit aboutpage-benefit-d">
              <div className="benefit-top">
                <div className="benefit-label">{tr.benefit4Label}</div>
              </div>
              <div className="benefit-title">{tr.benefit4Title}</div>
              <p className="benefit-text">{tr.benefit4Text}</p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* SPLIT */}
      <section className="aboutpage-split">
        <div className="aboutpage-split-inner">
          <div className="aboutpage-split-left">
            <h2 className="aboutpage-h2">{tr.splitTitle}</h2>

            <p className="aboutpage-p">{tr.splitP1}</p>

            <p className="aboutpage-p">{tr.splitP2}</p>

            <Link type="button" href="/contact" className="aboutpage-btn">
              {tr.workBtn}
            </Link>
          </div>

          <div className="aboutpage-split-right" aria-hidden="true">
            <Image
              src="/about/about.jpg"
              alt="Sottomonte"
              fill
              className="aboutpage-split-img"
              sizes="(max-width: 900px) 0px, 50vw"
            />
          </div>
        </div>
      </section>

      <WhereToFindUs />

      {/* FINAL CTA */}
      <section className="aboutpage-cta">
        <div className="aboutpage-cta-inner">
          <h2 className="aboutpage-cta-title">{tr.ctaTitle}</h2>
          <p className="aboutpage-cta-text">{tr.ctaText}</p>
          <Link type="button" href="/contact" className="aboutpage-btn">
            {tr.ctaBtn}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
