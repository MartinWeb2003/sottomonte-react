"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Listing } from "../types/listing";

type Props = {
  property: Listing;
};

export default function PropertyCard({ property }: Props) {
  const [fav, setFav] = useState(false);

  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(property.priceEUR);
  }, [property.priceEUR]);

  return (
    <article className="pcard">
      <div className="pcard-media">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          className="pcard-image"
          sizes="(max-width: 900px) 100vw, 25vw"
        />

        <div className="pcard-tag">
          <span className="pcard-dot" aria-hidden="true" />
          For Sale
        </div>

      </div>

      <div className="pcard-body">
        <div className="pcard-loc">
          <span className="pcard-city">{property.city}</span>
          <span className="pcard-sep">–</span>
          <span className="pcard-region">{property.regionDisplay}</span>
        </div>

        <div className="pcard-title">{property.title}</div>

        <div className="pcard-bottom">
          <div className="pcard-price">{formattedPrice}</div>
          <Link className="pcard-details" href={`/listing/${property.slug}`}>
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ✨ Perfectly symmetrical heart */
function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "white" : "none"}
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.8 4.6c-1.6-1.5-4.2-1.4-5.7.2L12 8l-3.1-3.2C7.4 3.2 4.8 3.1 3.2 4.6c-1.8 1.7-1.8 4.6 0 6.3L12 20l8.8-9.1c1.8-1.7 1.8-4.6 0-6.3z" />
    </svg>
  );
}
