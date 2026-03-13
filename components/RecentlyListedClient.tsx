"use client";

import Link from "next/link";
import PropertyCard from "./PropertyCard";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import type { Listing } from "../types/listing";

export default function RecentlyListedClient({ listings }: { listings: Listing[] }) {
  const { lang } = useLang();
  const tr = translations[lang].recentlyListed;

  return (
    <section className="recent">
      <div className="recent-inner">
        <h2 className="recent-title">{tr.title}</h2>

        <div className="recent-grid">
          {listings.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>

        <div className="recent-footer">
          <Link href="/buy" className="recent-viewall">
            {tr.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
