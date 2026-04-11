export const dynamic = "force-dynamic";

import PropertySearch from "../../components/PropertySearch";
import PropertyCard from "../../components/PropertyCard";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";
import BuyHero from "../../components/BuyHero";
import BuyEmptyState from "../../components/BuyEmptyState";
import { getAllListings } from "../../lib/queries";
import type { Listing } from "../../types/listing";

const PER_PAGE = 20; // 4 per row * 5 rows

type Feature = Listing["features"][number];

function parseCSV(v: string | undefined) {
  if (!v) return [];
  return v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function toNum(v: string | undefined) {
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export default async function BuyPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    region?: string;
    location?: string;
    type?: string;
    adv?: string;
    beds?: string;
    min?: string;
    max?: string;
  }>;
}) {
  const sp = await searchParams;

  const page = Math.max(1, Number(sp.page ?? "1") || 1);

  const region = sp.region ?? "all";
  const location = (sp.location ?? "").trim().toLowerCase();

  const types = parseCSV(sp.type);
  const adv = parseCSV(sp.adv);

  const bedsMin = sp.beds && sp.beds !== "all" ? Number(sp.beds) : null;

  const minPrice = toNum(sp.min ?? undefined);
  const maxPrice = toNum(sp.max ?? undefined);

  // Fetch all published for-sale listings from Sanity
  const allListings = await getAllListings();

  // Filter
  const filtered = allListings
    .filter((l) => l.status === "for-sale")
    .filter((l) => (region === "all" ? true : l.region === region))
    .filter((l) => {
      if (!location) return true;
      const hay = `${l.locationText} ${l.city} ${l.regionDisplay}`.toLowerCase();
      return hay.includes(location);
    })
    .filter((l) => (types.length === 0 ? true : types.includes(l.propertyType)))
    .filter((l) => {
      if (adv.length === 0) return true;
      // listing must include all selected advantages
      return adv.every((a) => l.features.includes(a as Feature));
    })
    .filter((l) => {
      if (bedsMin == null) return true;
      if (l.bedrooms == null) return false;
      return l.bedrooms >= bedsMin;
    })
    .filter((l) => (minPrice == null ? true : l.priceEUR >= minPrice))
    .filter((l) => (maxPrice == null ? true : l.priceEUR <= maxPrice));

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const end = start + PER_PAGE;

  const propertiesForPage = filtered.slice(start, end);

  return (
    <main className="buy">
      <BuyHero />

      <PropertySearch
        key={`${sp.location ?? ""}-${sp.beds ?? ""}-${sp.adv ?? ""}-${sp.min ?? ""}-${sp.max ?? ""}`}
        location={sp.location}
        beds={sp.beds}
        adv={sp.adv}
        min={sp.min}
        max={sp.max}
      />

      <section className="buy-grid-section">
        <div className="buy-grid-inner">
          {propertiesForPage.length === 0 ? (
            <BuyEmptyState />
          ) : (
            <>
              <div className="buy-grid">
                {propertiesForPage.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>

              <Pagination
                page={safePage}
                totalPages={totalPages}
                totalItems={total}
                from={total === 0 ? 0 : start + 1}
                to={Math.min(end, total)}
                basePath="/buy"
                query={{
                  region: sp.region,
                  location: sp.location,
                  type: sp.type,
                  adv: sp.adv,
                  beds: sp.beds,
                  min: sp.min,
                  max: sp.max,
                }}
              />
            </>
          )}
        </div>
      </section>
      <Footer/>
    </main>
  );
}
