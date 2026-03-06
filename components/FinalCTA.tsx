import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="finalcta">
      <div className="finalcta-inner">
        <h2 className="finalcta-title">Ready to get started?</h2>

        <Link href="/contact" type="button" className="finalcta-button">
          Contact us
        </Link>
      </div>
    </section>
  );
}
