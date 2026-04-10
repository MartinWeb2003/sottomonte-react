"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";

const MOBILE_BREAKPOINT = 900;

export default function Navbar() {
  const pathname = usePathname();
  const { lang, toggleLang } = useLang();
  const tr = translations[lang].navbar;

  const [menuOpen, setMenuOpen] = useState(false);
  const [itemsVisible, setItemsVisible] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const [navHidden, setNavHidden] = useState(false);
  const lastYRef = useRef(0);

  const openMenu = () => {
    setMenuOpen(true);
    requestAnimationFrame(() => setTimeout(() => setItemsVisible(true), 30));
  };

  const closeMenu = () => {
    setItemsVisible(false);
    setTimeout(() => setMenuOpen(false), 380);
  };

  const toggleMenu = () => (menuOpen ? closeMenu() : openMenu());

  // No outside-click close — the overlay is fullscreen via portal,
  // so there is nothing "outside" to click. Links handle their own closeMenu.

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > MOBILE_BREAKPOINT) closeMenu();
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
      if (delta > 0 && y > 80 && !menuOpen) setNavHidden(true);
      else setNavHidden(false);
      lastYRef.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  if (pathname.startsWith("/tripunsm1")) return null;

  const navLinks = [
    { href: "/", label: tr.home },
    { href: "/buy", label: tr.buy },
    { href: "/sell", label: tr.sell },
    { href: "/about", label: tr.about },
    { href: "/contact", label: tr.contact },
    { href: "https://www.visit-eva-orebic.com", label: tr.accommodation, external: true },
  ];

  const overlay = (
    <div
      className={`nav-overlay ${itemsVisible ? "nav-overlay--visible" : ""}`}
      id="mobile-menu"
    >
      <div className="nav-overlay-inner">
        <nav className="nav-overlay-links">
          {navLinks.map((l, i) => (
            <div
              key={l.href}
              className={`nav-overlay-item ${itemsVisible ? "nav-overlay-item--in" : ""}`}
              style={{ transitionDelay: `${0.05 + i * 0.07}s` }}
            >
              {l.external ? (
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-overlay-link"
                  onClick={closeMenu}
                >
                  {l.label}
                </a>
              ) : (
                <Link href={l.href} className="nav-overlay-link" onClick={closeMenu}>
                  {l.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div
          className={`nav-overlay-footer ${itemsVisible ? "nav-overlay-item--in" : ""}`}
          style={{ transitionDelay: "0.47s" }}
        >
          <button className="nav-overlay-lang" onClick={toggleLang} type="button">
            <span className={lang === "EN" ? "nav-overlay-lang-opt nav-overlay-lang-opt--active" : "nav-overlay-lang-opt"}>EN</span>
            <span className="nav-overlay-lang-div">|</span>
            <span className={lang === "HR" ? "nav-overlay-lang-opt nav-overlay-lang-opt--active" : "nav-overlay-lang-opt"}>HR</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header
        className={`navbar ${navHidden ? "navbar--hidden" : ""} ${menuOpen ? "navbar--menu-open" : ""}`}
        ref={navRef}
      >
        <nav className={`navbar-inner ${menuOpen ? "navbar-inner--menu-open" : ""}`}>
          <Link href="/" className="navbar-logo" onClick={() => menuOpen && closeMenu()}>
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
            {navLinks.map((l) =>
              l.external ? (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
              ) : (
                <Link key={l.href} href={l.href}>{l.label}</Link>
              )
            )}
          </div>

          <div className="navbar-right">
            <button className="lang-toggle" onClick={toggleLang} type="button">
              <span className={lang === "EN" ? "lang-option lang-option--active" : "lang-option"}>EN</span>
              <span className="lang-divider">|</span>
              <span className={lang === "HR" ? "lang-option lang-option--active" : "lang-option"}>HR</span>
            </button>

            <button
              className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
              onClick={toggleMenu}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </nav>
      </header>

      {/* Render overlay via portal so it's not clipped by header's transform */}
      {menuOpen && createPortal(overlay, document.body)}
    </>
  );
}
