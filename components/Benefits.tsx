import Image from "next/image";

type Benefit = {
  iconSrc: string;
  title: string;
  text: string;
};

export default function Benefits() {
  const benefits: Benefit[] = [
    {
      iconSrc: "/icons/icon1.png",
      title: "Expert market knowledge",
      text: "Local insight across Croatia’s key regions to help you make confident, well-informed decisions.",
    },
    {
      iconSrc: "/icons/icon2.png",
      title: "Strategic pricing",
      text: "Data-driven valuation and positioning to maximize interest and achieve the best possible outcome.",
    },
    {
      iconSrc: "/icons/icon3.png",
      title: "Clear & consistent communication",
      text: "Transparent updates and fast responses, so you always know what’s happening at every step.",
    },
  ];

  return (
    <section className="benefits-section">
      <div className="benefits-card">
        <h2 className="benefits-title">BENEFITS OF WORKING WITH US</h2>

        <div className="benefits-grid">
          {benefits.map((b) => (
            <div key={b.title} className="benefit">
              <div className="benefit-icon">
                <Image
                  src={b.iconSrc}
                  alt=""
                  width={80}
                  height={80}
                  priority={false}
                />
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
