"use client";

import Link from "next/link";
import PropertyCard from "./PropertyCard";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { useInView } from "../lib/useInView";
import type { Listing } from "../types/listing";

export default function RecentlyListedClient({ listings }: { listings: Listing[] }) {
  const { lang } = useLang();
  const tr = translations[lang].recentlyListed;
  const [ref, inView] = useInView<HTMLElement>(0.06);

  return (
    <section className="recent" ref={ref}>
      <div className="recent-inner">
        <h2 className={`recent-title reveal-heading ${inView ? "is-visible" : ""}`}>
          {tr.title}
        </h2>

        <div className={`recent-grid stagger-children ${inView ? "is-visible" : ""}`}>
          {listings.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>

        <div className={`recent-footer reveal-fade delay-5 ${inView ? "is-visible" : ""}`}>
          <Link href="/buy" className="recent-viewall">{tr.viewAll}</Link>
        </div>
      </div>
    </section>
  );
}
