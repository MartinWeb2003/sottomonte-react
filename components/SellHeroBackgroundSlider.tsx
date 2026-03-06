"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function SellHeroBackgroundSlider() {
  const images = useMemo(
    () => ["/hero/zadar.jpg", "/hero/split.jpg", "/hero/dubrovnik.jpg", "/hero/viganj.jpg"],
    []
  );

  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((p) => (p + 1) % images.length);
    }, 3500);

    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <div className="sellHeroMedia" aria-hidden="true">
      {images.map((src, i) => (
        <div
          key={src}
          className={`sellHeroSlide ${i === active ? "isActive" : ""}`}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="sellHeroImg"
          />
        </div>
      ))}

      <div className="sellHeroOverlay" />
    </div>
  );
}