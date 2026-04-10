"use client";

import Link from "next/link";
import SellHeroBackgroundSlider from "../../components/SellHeroBackgroundSlider";
import { useLang } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";
import { useInView } from "../../lib/useInView";

export default function SellPage() {
  const { lang } = useLang();
  const tr = translations[lang].sellPage;

  const [introRef, introVisible] = useInView<HTMLElement>(0.08);
  const [marketRef, marketVisible] = useInView<HTMLElement>(0.06);
  const [faqRef, faqVisible] = useInView<HTMLElement>(0.06);
  const [readyRef, readyVisible] = useInView<HTMLElement>(0.15);

  return (
    <main className="sellPage">
      {/* HERO SLIDER */}
      <section className="sellHero">
        <SellHeroBackgroundSlider />
        <div className="sellHeroContent">
          <h1 className="sellHeroTitle">
            <span className="sellHeroTitleLine">{tr.heroTitle}</span>
          </h1>
        </div>
      </section>

      {/* SELL INTRO */}
      <section className="sellIntroSection" ref={introRef}>
        <div className="sellIntroInner">

          <div className={`sellIntroHeader reveal-up ${introVisible ? "is-visible" : ""}`}>
            <p className="sellIntroEyebrow">{tr.introEyebrow}</p>
            <h2 className="sellIntroHeadline">{tr.introHeadline}</h2>
          </div>

          <p className={`sellIntroSubtext reveal-up delay-1 ${introVisible ? "is-visible" : ""}`}>
            {tr.introSubtext}
          </p>

          <div className={`sellIntroSteps stagger-children ${introVisible ? "is-visible" : ""}`}>
            <div className="sellIntroStep">
              <span className="sellIntroStepNum">01</span>
              <div className="sellIntroStepBody">
                <h3 className="sellIntroStepTitle">{tr.step1Title}</h3>
                <p className="sellIntroStepText">{tr.step1Text}</p>
              </div>
            </div>
            <div className="sellIntroStep">
              <span className="sellIntroStepNum">02</span>
              <div className="sellIntroStepBody">
                <h3 className="sellIntroStepTitle">{tr.step2Title}</h3>
                <p className="sellIntroStepText">{tr.step2Text}</p>
              </div>
            </div>
            <div className="sellIntroStep">
              <span className="sellIntroStepNum">03</span>
              <div className="sellIntroStepBody">
                <h3 className="sellIntroStepTitle">{tr.step3Title}</h3>
                <p className="sellIntroStepText">{tr.step3Text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL MARKET */}
      <section className="sellMarket" ref={marketRef}>
        <div className="sellMarketInner">
          <div className={`sellMarketText reveal-left ${marketVisible ? "is-visible" : ""}`}>
            <p className="sellMarketEyebrow">{tr.marketEyebrow}</p>
            <h2 className="sellMarketTitle">{tr.marketTitle}</h2>
            <p className="sellMarketBody">{tr.marketBody}</p>
          </div>

          <div className={`sellMarketStats stagger-children ${marketVisible ? "is-visible" : ""}`}>
            <div className="sellMarketStat">
              <span className="sellMarketStatNum">{tr.marketStat1Num}</span>
              <span className="sellMarketStatLabel">{tr.marketStat1Label}</span>
            </div>
            <div className="sellMarketStat">
              <span className="sellMarketStatNum">{tr.marketStat2Num}</span>
              <span className="sellMarketStatLabel">{tr.marketStat2Label}</span>
            </div>
            <div className="sellMarketStat">
              <span className="sellMarketStatNum">{tr.marketStat3Num}</span>
              <span className="sellMarketStatLabel">{tr.marketStat3Label}</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sellFaq" ref={faqRef}>
        <div className="sellFaqInner">
          <div className={`sellFaqHeader reveal-up ${faqVisible ? "is-visible" : ""}`}>
            <p className="sellFaqEyebrow">{tr.faqEyebrow}</p>
            <h2 className="sellFaqTitle">{tr.faqTitle}</h2>
          </div>

          <div className={`sellFaqList stagger-children ${faqVisible ? "is-visible" : ""}`}>
            {tr.faqs.map((item, i) => (
              <details key={i} className="sellFaqItem">
                <summary className="sellFaqQuestion">{item.q}</summary>
                <p className="sellFaqAnswer">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* READY TO GET STARTED */}
      <section className="sellReady" ref={readyRef}>
        <div className={`sellReadyInner reveal-scale ${readyVisible ? "is-visible" : ""}`}>
          <h2 className="sellReadyTitle">{tr.readyTitle}</h2>
          <p className="sellReadyText">{tr.readyText}</p>
          <div className="sellReadyButtons">
            <Link href="/contact" className="sellBtn sellBtnPrimary">
              {tr.bookBtn}
            </Link>
            <Link href="/buy" className="sellBtn sellBtnSecondary">
              {tr.browseBtn}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
