import PropertyCard from "./PropertyCard";
import { recentProperties } from "../data/recentProperties";

export default function RecentlyListed() {
  return (
    <section className="recent">
      <div className="recent-inner">
        <h2 className="recent-title">Recently listed properties</h2>

        <div className="recent-grid">
          {recentProperties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>

        <div className="recent-footer">
          <button type="button" className="recent-viewall">
            View All Listings
          </button>
        </div>
      </div>
    </section>
  );
}
