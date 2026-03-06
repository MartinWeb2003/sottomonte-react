import Link from "next/link";

export default function IntroBlurb() {
  return (
    <section className="introblurb">
      <div className="introblurb-inner">
        <h2 className="introblurb-title">
          Sottomonte – Your Trusted Partner for Croatian Real Estate
        </h2>

        <p className="introblurb-text">
          Welcome to Sottomonte, a premier Croatian real estate agency dedicated to
          the sale of prestigious properties and exceptional homes along the Adriatic
          coast. With deep local expertise and a passion for quality, we specialize
          in connecting discerning buyers with some of the finest opportunities in the
          region. Our commitment to professionalism, transparency, and personalized
          service ensures that every client receives unparalleled support throughout
          their property journey.
        </p>

        {/* NEW BUTTON */}
        <div className="introblurb-cta">
          <Link href="/contact" type="button" className="introblurb-button">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
