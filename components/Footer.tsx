"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";

export default function Footer() {
  const { lang } = useLang();
  const tr = translations[lang].footer;

  return (
    <footer className="footer">

      {/* ── MAIN CONTENT ── */}
      <div className="footer-main">
        <div className="footer-brand-col">
          <Link href="/" className="footer-logo-link">
            <Image
              src="/Sottomonte_wt.png"
              alt="Sottomonte"
              width={120}
              height={120}
              className="footer-logo-img"
            />
          </Link>
          <p className="footer-tagline">The Pelješac Specialists</p>
          <p className="footer-desc">{tr.desc}</p>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-col-heading">{tr.navHeading}</h4>
          <ul className="footer-nav">
            <li><Link href="/buy">{tr.buy}</Link></li>
            <li><Link href="/sell">{tr.sell}</Link></li>
            <li><Link href="/about">{tr.about}</Link></li>
            <li><Link href="/contact">{tr.contact}</Link></li>
          </ul>
        </div>

        <div className="footer-contact-col">
          <h4 className="footer-col-heading">{tr.contactHeading}</h4>
          <ul className="footer-contact-list">
            <li>
              <a href="mailto:info@sottomonte.hr">info@sottomonte.hr</a>
            </li>
            <li>
              <a href="tel:+38598589235">+385 98 589 235</a>
            </li>
            <li>Orebić, Pelješac</li>
          </ul>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="footer-bottom-bar">
        <span className="footer-copyright">
          © {new Date().getFullYear()} Sottomonte Real Estate
        </span>
        <span className="footer-bottom-location">Orebić, Croatia</span>
      </div>

    </footer>
  );
}
