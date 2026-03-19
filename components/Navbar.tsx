"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";

const MOBILE_BREAKPOINT = 900;

export default function Navbar() {
  const pathname = usePathname();
  const { lang, toggleLang } = useLang();
  const tr = translations[lang].navbar;

  if (pathname.startsWith("/tripunsm1")) return null;

  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  const [navHidden, setNavHidden] = useState(false);
  const lastYRef = useRef(0);

  const toggleMenu = () => setMenuOpen((p) => !p);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!menuOpen) return;
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > MOBILE_BREAKPOINT) setMenuOpen(false);
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastYRef.current;

      if (Math.abs(delta) < 6) return;

      if (delta > 0 && y > 80 && !menuOpen) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
      }

      lastYRef.current = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  const shouldRenderMobileMenu =
    menuOpen &&
    typeof window !== "undefined" &&
    window.innerWidth <= MOBILE_BREAKPOINT;

  return (
    <header className={`navbar ${navHidden ? "navbar--hidden" : ""} ${menuOpen ? "navbar--menu-open" : ""}`} ref={navRef}>
      <nav className={`navbar-inner ${menuOpen ? "navbar-inner--menu-open" : ""}`}>
        <Link href="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <Image
            src="/SottomonteB_RE1.png"
            alt="Sottomonte Real Estate"
            width={180}
            height={40}
            className="logo-full"
            priority
          />
        </Link>

        <div className="navbar-links">
          <Link href="/">{tr.home}</Link>
          <Link href="/buy">{tr.buy}</Link>
          <Link href="/sell">{tr.sell}</Link>
          <Link href="/about">{tr.about}</Link>
          <Link href="/contact">{tr.contact}</Link>
        </div>

        <div className="navbar-right">
          <button className="lang-toggle" onClick={toggleLang} type="button">
            <span className={lang === "EN" ? "lang-option lang-option--active" : "lang-option"}>EN</span>
            <span className="lang-divider">|</span>
            <span className={lang === "HR" ? "lang-option lang-option--active" : "lang-option"}>HR</span>
          </button>

          <button
            className="hamburger"
            onClick={toggleMenu}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {shouldRenderMobileMenu && (
        <div className="mobile-menu" id="mobile-menu">
          <Link href="/buy" onClick={() => setMenuOpen(false)}>{tr.buy}</Link>
          <Link href="/sell" onClick={() => setMenuOpen(false)}>{tr.sell}</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>{tr.about}</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>{tr.contact}</Link>
        </div>
      )}
    </header>
  );
}
