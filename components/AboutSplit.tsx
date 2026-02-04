import Image from "next/image";

export default function AboutSplit() {
  return (
    <section className="aboutsplit">
      <div className="aboutsplit-inner">
        <div className="aboutsplit-left">
          <h2 className="aboutsplit-title">About Sottomonte</h2>

          <p className="aboutsplit-lead">
            Sottomonte is built on local expertise, honest guidance, and a deep
            understanding of Croatia’s most desirable coastal and inland markets.
          </p>

          <p className="aboutsplit-text">
            We work closely with buyers, sellers, and investors to find the right
            opportunities and present them with clarity and confidence. From first
            conversations to final signatures, our team focuses on strong market
            insight, strategic positioning, and a seamless experience.
          </p>

          <p className="aboutsplit-text">
            Whether you’re looking for a luxury villa, a family home, or a smart
            investment, we combine careful selection with consistent communication
            so you always know what to expect — and what comes next.
          </p>

          <button type="button" className="aboutsplit-btn">
            LEARN MORE
          </button>
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
