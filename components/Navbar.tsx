"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Lang = "HR" | "ENG";
const MOBILE_BREAKPOINT = 900;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("HR");
  const navRef = useRef<HTMLElement | null>(null);

  const [navHidden, setNavHidden] = useState(false);
  const lastYRef = useRef(0);

  const toggleLang = () => setLang((p) => (p === "HR" ? "ENG" : "HR"));
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
    <header className={`navbar ${navHidden ? "navbar--hidden" : ""}`} ref={navRef}>
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
          <Link href="/">Home</Link>
          <Link href="/buy">Buy</Link>
          <Link href="/sell">Sell</Link>
          <Link href="/about">About us</Link>
          <Link href="/contact">Contact us</Link>
        </div>

        <div className="navbar-right">
          <button className="lang-toggle" onClick={toggleLang} type="button">
            <span className="lang-full">{lang === "HR" ? "Hrvatski" : "Engleski"}</span>
            <span className="lang-short">{lang}</span>
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
          <Link href="/buy" onClick={() => setMenuOpen(false)}>Buy</Link>
          <Link href="/sell" onClick={() => setMenuOpen(false)}>Sell</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About us</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact us</Link>
        </div>
      )}
    </header>
  );
}