import Link from "next/link";
import SellHeroBackgroundSlider from "../../components/SellHeroBackgroundSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SellPage() {
  return (
    <main className="sellPage">
      {/* HERO SLIDER */}
      <section className="sellHero">
        <SellHeroBackgroundSlider />

        <div className="sellHeroContent">
          <h1 className="sellHeroTitle">
            <span className="sellHeroTitleLine">A refined</span>
            <span className="sellHeroTitleLine">Approach to</span>
            <span className="sellHeroTitleLine">Selling.</span>
          </h1>
        </div>
      </section>

      {/* SELL INTRO (SEO + conversion) */}
      <section className="sellIntroSection">
        <div className="sellIntroInner">
          <h2 className="sellIntroHeadline">Looking to Sell Property on the Adriatic Coast?</h2>

          <p className="sellIntroSubtext">
            Our experienced team specializes in marketing and selling premium homes, villas, apartments, and land across
            Croatia’s most desirable coastal locations. From valuation to closing, we manage every detail discreetly and
            professionally.
          </p>

          <div className="sellIntroTrust" aria-label="Trust highlights">
            <div className="sellIntroTrustItem">
              <span className="sellIntroCheck" aria-hidden="true">✓</span>
              Local market expertise
            </div>
            <div className="sellIntroTrustItem">
              <span className="sellIntroCheck" aria-hidden="true">✓</span>
              Personalized service
            </div>
            <div className="sellIntroTrustItem">
              <span className="sellIntroCheck" aria-hidden="true">✓</span>
              Professional property marketing
            </div>
          </div>

          <div className="sellIntroChoices">
            <div className="sellIntroChoiceCard">
              <div className="sellIntroChoiceTop">
                <div className="sellIntroChoiceIcon" aria-hidden="true">
                  <FontAwesomeIcon icon={faHouse} />
                </div>
                <h3 className="sellIntroChoiceTitle">Sell Your Property</h3>
              </div>
              <p className="sellIntroChoiceText">
                Get a clear, data-driven valuation and a tailored marketing plan designed to attract qualified buyers.
              </p>
            </div>

            <div className="sellIntroChoiceCard sellIntroChoiceCardAlt">
              <div className="sellIntroChoiceTop">
                <div className="sellIntroChoiceIcon" aria-hidden="true">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <h3 className="sellIntroChoiceTitle">Looking to Buy?</h3>
              </div>
              <p className="sellIntroChoiceText">
                Explore curated listings across Croatia’s coastline — villas, apartments, and standout investment options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* READY TO GET STARTED */}
      <section className="sellReady">
        <div className="sellReadyInner">
          <h2 className="sellReadyTitle">Ready to get started?</h2>

          <p className="sellReadyText">
            Reach out to us directly, or take a look at what’s available now.
          </p>

          <div className="sellReadyButtons">
            <Link href="/contact" className="sellBtn sellBtnPrimary">
              Contact us
            </Link>

            <Link href="/buy" className="sellBtn sellBtnSecondary">
              Browse listings
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}