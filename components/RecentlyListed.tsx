import Link from "next/link";

import PropertyCard from "./PropertyCard";
import { listings } from "../data/listings";

export default function RecentlyListed() {
  const recent = listings
    .filter((p) => p.isPublished)
    .sort(
      (a, b) => new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime()
    )
    .slice(0, 4);

  return (
    <section className="recent">
      <div className="recent-inner">
        <h2 className="recent-title">Recently listed properties</h2>

        <div className="recent-grid">
          {recent.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>

        <div className="recent-footer">
          <Link href="/buy" type="button" className="recent-viewall">
            View All Listings
          </Link>
        </div>
      </div>
    </section>
  );
}
