import Image from "next/image";
import { notFound } from "next/navigation";
import ListingGallery from "../../../components/ListingGallery";
import { listings } from "../../../data/listings";
import type { Listing } from "../../../types/listing";

function formatEUR(n: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

function labelStatus(status: Listing["status"]) {
  if (status === "for-sale") return "For sale";
  if (status === "for-rent") return "For rent";
  return status;
}

function labelType(t: Listing["propertyType"]) {
  const map: Record<string, string> = {
    "house-villa": "House / Villa",
    apartment: "Apartment",
    land: "Land plot",
    business: "Business premises",
    hotel: "Hotel",
    investments: "Investments",
    "off-plan": "Off plan",
    "new-build": "New build",
    luxury: "Luxury",
  };
  return map[t] ?? t;
}

function labelFeature(f: string) {
  const map: Record<string, string> = {
    "sea-view": "Sea view",
    pool: "Swimming pool",
    "newly-built": "Newly built",
    "stone-house": "Stone house",
    luxury: "Luxury",
  };
  return map[f] ?? f;
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const listing = listings.find((l) => l.slug === slug && l.isPublished);
  if (!listing) return notFound();

  const mapSrc = listing.coordinates
    ? `https://www.google.com/maps?q=${listing.coordinates.lat},${listing.coordinates.lng}&z=13&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(listing.locationText)}&output=embed`;

  return (
    <main className="ld">
      <section className="ld-top">
        <div className="ld-top-inner">
          {/* Gallery */}
          <div className="ld-left">
            <div className="ld-badges">
              <span className="ld-badge">{labelStatus(listing.status)}</span>
              <span className="ld-badge ld-badge-dark">{labelType(listing.propertyType)}</span>
              {listing.features?.includes("newly-built") && (
                <span className="ld-badge ld-badge-blue">New build</span>
              )}
            </div>

            <ListingGallery images={listing.images ?? [listing.imageUrl]} title={listing.title} />
          </div>

          {/* Contact form */}
          <aside className="ld-right">
            <div className="ld-form">
              <h2 className="ld-form-title">More about this property</h2>

              <label className="ld-field">
                <span>Full name*</span>
                <input placeholder="Full name" />
              </label>

              <label className="ld-field">
                <span>Email*</span>
                <input placeholder="Email" type="email" />
              </label>

              <label className="ld-field">
                <span>Phone*</span>
                <input placeholder="Phone" />
              </label>

              <label className="ld-field">
                <span>How can an agent help?</span>
                <textarea
                  rows={4}
                  defaultValue={`I am interested in ${listing.title} (${listing.city}).`}
                />
              </label>

              <button type="button" className="ld-submit">
                Email agent
              </button>

              <p className="ld-disclaimer">
                By proceeding, you consent to receive calls and texts related to your inquiry.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Info row */}
      <section className="ld-info">
        <div className="ld-info-inner">
          <div className="ld-summary">
            <div className="ld-statusdot" aria-hidden="true" />
            <div className="ld-status">{labelStatus(listing.status)}</div>

            <div className="ld-price">{formatEUR(listing.priceEUR)}</div>

            <div className="ld-meta">
              <span>
                <strong>{listing.bedrooms ?? 0}</strong> bed
              </span>
              <span className="ld-meta-sep">•</span>
              <span>
                <strong>{labelType(listing.propertyType)}</strong>
              </span>
            </div>

            <div className="ld-address">{listing.locationText}</div>
          </div>

          <div className="ld-mapcard">
            <div className="ld-map">
              <iframe
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="ld-mapfooter">
            </div>
          </div>
        </div>
      </section>

      {/* Facts grid (icons adapted to the info you actually have) */}
      <section className="ld-facts">
        <div className="ld-facts-inner">
          <div className="ld-fact">
            <FactIconHome />
            <div>
              <div className="ld-fact-top">{labelType(listing.propertyType)}</div>
              <div className="ld-fact-sub">Property type</div>
            </div>
          </div>

          <div className="ld-fact">
            <FactIconBed />
            <div>
              <div className="ld-fact-top">{listing.bedrooms ?? "—"}</div>
              <div className="ld-fact-sub">Bedrooms</div>
            </div>
          </div>

          <div className="ld-fact">
            <FactIconPin />
            <div>
              <div className="ld-fact-top">{listing.regionDisplay}</div>
              <div className="ld-fact-sub">Region</div>
            </div>
          </div>

          <div className="ld-fact">
            <FactIconTag />
            <div>
              <div className="ld-fact-top">{labelStatus(listing.status)}</div>
              <div className="ld-fact-sub">Status</div>
            </div>
          </div>

          <div className="ld-fact">
            <FactIconStar />
            <div>
              <div className="ld-fact-top">
                {listing.features?.length ? listing.features.map(labelFeature).join(", ") : "—"}
              </div>
              <div className="ld-fact-sub">Features</div>
            </div>
          </div>

          <div className="ld-fact">
            <FactIconClock />
            <div>
              <div className="ld-fact-top">
                {listing.listedAt ? new Date(listing.listedAt).toLocaleDateString() : "—"}
              </div>
              <div className="ld-fact-sub">Listed</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Simple icons (inline SVG) */
function FactIconHome() {
  return (
    <svg className="ld-ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z" />
    </svg>
  );
}
function FactIconBed() {
  return (
    <svg className="ld-ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 10a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8h-2v-2H5v2H3v-8Z" />
      <path d="M5 10h6v4H5zM13 10h6v4h-6z" />
    </svg>
  );
}
function FactIconPin() {
  return (
    <svg className="ld-ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 22s7-5 7-12a7 7 0 1 0-14 0c0 7 7 12 7 12Z" />
      <path d="M12 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </svg>
  );
}
function FactIconTag() {
  return (
    <svg className="ld-ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 12V3h9l9 9-9 9-9-9Z" />
      <path d="M7.5 7.5h.01" />
    </svg>
  );
}
function FactIconStar() {
  return (
    <svg className="ld-ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6L12 2z" />
    </svg>
  );
}
function FactIconClock() {
  return (
    <svg className="ld-ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}