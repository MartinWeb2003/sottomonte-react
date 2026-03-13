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
      <div className="footer-inner">
        <div className="footer-col footer-brand">
          <div className="footer-brand-row">
            <div className="footer-logo">
              <Image
                src="/Sottomonte_wt.png"
                alt="Sottomonte"
                width={90}
                height={90}
              />
            </div>

            <p className="footer-desc">{tr.desc}</p>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">{tr.navHeading}</h4>
          <ul className="footer-links">
            <li><Link href="/buy">{tr.buy}</Link></li>
            <li><Link href="/sell">{tr.sell}</Link></li>
            <li><Link href="/about">{tr.about}</Link></li>
            <li><Link href="/contact">{tr.contact}</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">{tr.contactHeading}</h4>
          <ul className="footer-contact">
            <li>info@sottomonte.hr</li>
            <li>+385 98 589 235</li>
            <li>Orebic, Croatia</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Sottomonte Real Estate. All rights reserved.
      </div>
    </footer>
  );
}
