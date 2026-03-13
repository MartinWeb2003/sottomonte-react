"use client";

import Link from "next/link";
import SellHeroBackgroundSlider from "../../components/SellHeroBackgroundSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useLang } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";

export default function SellPage() {
  const { lang } = useLang();
  const tr = translations[lang].sellPage;

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

      {/* SELL INTRO (SEO + conversion) */}
      <section className="sellIntroSection">
        <div className="sellIntroInner">
          <h2 className="sellIntroHeadline">{tr.introHeadline}</h2>

          <p className="sellIntroSubtext">{tr.introSubtext}</p>

          <div className="sellIntroTrust" aria-label="Trust highlights">
            <div className="sellIntroTrustItem">
              <span className="sellIntroCheck" aria-hidden="true">✓</span>
              {tr.trust1}
            </div>
            <div className="sellIntroTrustItem">
              <span className="sellIntroCheck" aria-hidden="true">✓</span>
              {tr.trust2}
            </div>
            <div className="sellIntroTrustItem">
              <span className="sellIntroCheck" aria-hidden="true">✓</span>
              {tr.trust3}
            </div>
          </div>

          <div className="sellIntroChoices">
            <div className="sellIntroChoiceCard">
              <div className="sellIntroChoiceTop">
                <div className="sellIntroChoiceIcon" aria-hidden="true">
                  <FontAwesomeIcon icon={faHouse} />
                </div>
                <h3 className="sellIntroChoiceTitle">{tr.card1Title}</h3>
              </div>
              <p className="sellIntroChoiceText">{tr.card1Text}</p>
            </div>

            <div className="sellIntroChoiceCard sellIntroChoiceCardAlt">
              <div className="sellIntroChoiceTop">
                <div className="sellIntroChoiceIcon" aria-hidden="true">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <h3 className="sellIntroChoiceTitle">{tr.card2Title}</h3>
              </div>
              <p className="sellIntroChoiceText">{tr.card2Text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* READY TO GET STARTED */}
      <section className="sellReady">
        <div className="sellReadyInner">
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
