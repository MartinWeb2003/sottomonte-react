"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const [fading, setFading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("smLoaded")) return;
    sessionStorage.setItem("smLoaded", "1");

    setVisible(true);
    requestAnimationFrame(() => setTimeout(() => setEntered(true), 30));

    router.prefetch("/buy");
    router.prefetch("/sell");
    router.prefetch("/about");
    router.prefetch("/contact");

    const fadeTimer = setTimeout(() => setFading(true), 2600);
    const hideTimer = setTimeout(() => setVisible(false), 3200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [router]);

  if (!visible) return null;

  return (
    <div className={`ls${fading ? " ls--fade" : ""}`} aria-hidden="true">
      {/* Ambient glow */}
      <div className="ls-glow" />

      <div className={`ls-content${entered ? " ls-content--in" : ""}`}>
        {/* Logo */}
        <Image
          src="/Sottomonte_wt.png"
          alt="Sottomonte Real Estate"
          width={180}
          height={40}
          priority
          className="ls-logo"
        />

        {/* Tagline */}
        <p className="ls-tagline">Pelješac Peninsula · Real Estate</p>

        {/* Spinner */}
        <div className="ls-ring">
          <svg className="ls-svg" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" stroke="rgba(201,173,123,0.12)" strokeWidth="1.5" />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#c9ad7b"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="125.6"
              strokeDashoffset="94.2"
              className="ls-arc"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
