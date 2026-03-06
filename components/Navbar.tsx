"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Lang = "HR" | "ENG";
const MOBILE_BREAKPOINT = 900;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("HR");
  const menuRef = useRef<HTMLDivElement | null>(null);

  // ✅ NEW: hide/show on scroll direction
  const [navHidden, setNavHidden] = useState(false);
  const lastYRef = useRef(0);

  const toggleLang = () => setLang((p) => (p === "HR" ? "ENG" : "HR"));
  const toggleMenu = () => setMenuOpen((p) => !p);

  // Close menu on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!menuOpen) return;
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [menuOpen]);

  // Close menu on resize to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth > MOBILE_BREAKPOINT) setMenuOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ✅ NEW: scroll direction detection
  useEffect(() => {
    lastYRef.current = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastYRef.current;

      // ignore tiny movements
      if (Math.abs(delta) < 6) return;

      // if scrolling down and not at the very top => hide
      if (delta > 0 && y > 80) {
        setNavHidden(true);
      } else {
        // scrolling up => show
        setNavHidden(false);
      }

      lastYRef.current = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Only render mobile menu on mobile widths
  const shouldRenderMobileMenu =
    menuOpen && typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT;

  return (
    <header className={`navbar ${navHidden ? "navbar--hidden" : ""}`}>
      <nav className="navbar-inner">
        {/* LEFT: Logo */}
        <Link href="/" className="navbar-logo">
          <Image
            src="/logo-full.png"
            alt="Sottomonte Real Estate"
            width={180}
            height={40}
            className="logo-full"
            priority
          />
          <span className="brand-text">
            <span className="brand-top">SOTTOMONTE</span>
            <span className="brand-bottom">REAL ESTATE CROATIA</span>
          </span>
        </Link>

        {/* CENTER links (desktop) */}
        <div className="navbar-links">
          <Link href="/">Home</Link>
          <Link href="/buy">Buy</Link>
          <Link href="/sell">Sell</Link>
          <Link href="/about">About us</Link>
          <Link href="/contact">Contact us</Link>
        </div>

        {/* RIGHT: Favorites + Language + Hamburger */}
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
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {shouldRenderMobileMenu && (
        <div className="mobile-menu" id="mobile-menu" ref={menuRef}>
          <Link href="/buy" onClick={() => setMenuOpen(false)}>Buy</Link>
          <Link href="/sell" onClick={() => setMenuOpen(false)}>Sell</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About us</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact us</Link>
        </div>
      )}
    </header>
  );
}
