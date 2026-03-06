"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export default function ListingGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const safeImages = useMemo(() => (images?.length ? images : ["/properties/p1.jpg"]), [images]);
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((p) => (p - 1 + safeImages.length) % safeImages.length);
  const next = () => setIdx((p) => (p + 1) % safeImages.length);

  return (
    <div className="ld-gallery">
      {/* Main */}
      <div className="ld-main">
        <Image
          src={safeImages[idx]}
          alt={title}
          fill
          className="ld-main-img"
          sizes="(max-width: 1100px) 100vw, 60vw"
          priority
        />

        <button className="ld-nav ld-nav-left" type="button" onClick={prev} aria-label="Previous">
          ‹
        </button>
        <button className="ld-nav ld-nav-right" type="button" onClick={next} aria-label="Next">
          ›
        </button>

        <div className="ld-counter">
          {idx + 1}/{safeImages.length}
        </div>
      </div>

      {/* Thumbs */}
      <div className="ld-thumbs">
        {safeImages.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            className={`ld-thumb ${i === idx ? "is-active" : ""}`}
            onClick={() => setIdx(i)}
            aria-label={`View image ${i + 1}`}
          >
            <Image src={src} alt="" fill className="ld-thumb-img" sizes="140px" />
          </button>
        ))}
      </div>
    </div>
  );
}