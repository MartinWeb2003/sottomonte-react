import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* LEFT */}
        <div className="footer-col footer-brand">
          <div className="footer-logo">
            <Image
              src="/logo-full.png"
              alt="Sottomonte"
              width={46}
              height={46}
            />
            <div className="footer-brand-text">
              <span className="footer-brand-top">SOTTOMONTE</span>
              <span className="footer-brand-bottom">
                REAL ESTATE CROATIA
              </span>
            </div>
          </div>

          <p className="footer-desc">
            Sottomonte connects buyers and sellers with exceptional properties
            across Croatia’s most desirable coastal and inland locations.
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="footer-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-links">
            <li><Link href="/buy">Buy</Link></li>
            <li><Link href="/sell">Sell</Link></li>
            <li><Link href="/about">About us</Link></li>
            <li><Link href="/contact">Contact us</Link></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div className="footer-col">
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links">
            <li><Link href="#">Property valuation</Link></li>
            <li><Link href="#">Property marketing</Link></li>
            <li><Link href="#">Investment consulting</Link></li>
            <li><Link href="#">Buyer representation</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h4 className="footer-heading">Contact</h4>
          <ul className="footer-contact">
            <li>info@sottomonte.hr</li>
            <li>+385 00 000 000</li>
            <li>Zadar, Croatia</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Sottomonte Real Estate. All rights reserved.
      </div>
    </footer>
  );
}
