import Image from "next/image";
import Link from "next/link";
import SpotlightCard from "../../components/SpotlightCard";
import BlurText from "../../components/BlurText";
import WhereToFindUs from "@/components/WhereToFindUs";
import Footer from "../../components/Footer";


export default function AboutPage() {
  return (
    <main className="aboutpage">
      {/* HERO */}
      <section className="aboutpage-hero">
        <div className="aboutpage-hero-inner">
          <div className="aboutpage-hero-left">
            <h1 className="aboutpage-title">About Sottomonte</h1>

            <p className="aboutpage-lead">
              Sottomonte is a real estate team focused on Croatia’s most desirable
              coastal and lifestyle destinations. We combine local insight with a modern,
              transparent approach. With us every client feels confident, from the first call
              to the final signature.
            </p>

            <div className="aboutpage-hero-actions">
              <Link type="button" href="/contact" className="aboutpage-btn">
                Contact us
              </Link>

              <Link className="aboutpage-link" href="/buy">
                Browse listings
              </Link>
            </div>
          </div>

          <div className="aboutpage-hero-right" aria-hidden="true">
            {/* Add your image: public/about/about-hero.jpg */}
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
          <h2 className="aboutpage-h2">A modern approach to Croatian real estate</h2>

          <div className="aboutpage-story-grid">
            <p className="aboutpage-p">
              We built Sottomonte around three core principles: expert market knowledge,
              strategic pricing, and clear communication. Whether you’re buying your first home,
              upgrading, or investing, you deserve guidance that’s honest, responsive, and based
              on real data.
            </p>

            <p className="aboutpage-p">
              Our team works across key regions, carefully selecting
              properties, verifying details, and helping clients move quickly when the right
              opportunity appears. We handle the complex parts so the process feels simple.
            </p>
          </div>

          <div className="aboutpage-benefits">
  <SpotlightCard className="aboutpage-benefit aboutpage-benefit-a">
    <div className="benefit-top">
      <div className="benefit-label">Local Market</div>
    </div>

    <div className="benefit-title">Expert market knowledge</div>
    <p className="benefit-text">
      Neighborhood-level insights, true pricing context, and guidance shaped by what actually sells.
    </p>

  </SpotlightCard>

  <SpotlightCard className="aboutpage-benefit aboutpage-benefit-b">
    <div className="benefit-top">
      <div className="benefit-label">Pricing</div>
    </div>

    <div className="benefit-title">Strategic pricing</div>
    <p className="benefit-text">
      A data-backed approach to position your property competitively and maximize outcomes.
    </p>

  </SpotlightCard>

  <SpotlightCard className="aboutpage-benefit aboutpage-benefit-c">
    <div className="benefit-top">
      <div className="benefit-label">Updates</div>
    </div>

    <div className="benefit-title">Clear communication</div>
    <p className="benefit-text">
      Transparent updates, fast responses, and a simple process. You always know what’s next.
    </p>  
  </SpotlightCard>

  <SpotlightCard className="aboutpage-benefit aboutpage-benefit-d">
    <div className="benefit-top">
      <div className="benefit-label">Support</div>
    </div>

    <div className="benefit-title">End-to-end guidance</div>
    <p className="benefit-text">
      From viewings and negotiation to due diligence, we guide you through every step.
    </p>

  </SpotlightCard>
</div>

        </div>
      </section>


      {/* SPLIT */}
      <section className="aboutpage-split">
        <div className="aboutpage-split-inner">
          <div className="aboutpage-split-left">
            <h2 className="aboutpage-h2">Why clients choose Sottomonte</h2>

            <p className="aboutpage-p">
              We are a customer-first agency. We keep our focus directed so we can be fast, careful,
              and fully present for each client. In short, that means better support for you.
            </p>

            <p className="aboutpage-p">
              From viewings and negotiation down to the research, we will guide you through every step with
              clarity and confidence. Our goal is a smooth process and a result you will feel great about.
            </p>

            <Link type="button" href="/contact" className="aboutpage-btn">
              Work with us
            </Link>
          </div>

          <div className="aboutpage-split-right" aria-hidden="true">
            {/* Add your image: public/about/about-split.jpg */}
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
          <h2 className="aboutpage-cta-title">Ready to get started?</h2>
          <p className="aboutpage-cta-text">
            Contact us and let's find your own piece of paradise.
          </p>
          <Link type="button" href="/contact" className="aboutpage-btn">
            Contact us
          </Link>
        </div>
      </section>
      <Footer/>
    </main>
  );  
}
