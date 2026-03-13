import { client } from "../sanity/lib/client";
import type { Listing, AdminListing } from "../types/listing";

// Shape returned by GROQ — images come back as URL strings
type SanityListing = Omit<Listing, "imageUrl" | "images"> & {
  imageUrl: string | null;
  images: string[];
};

const LISTING_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  isPublished,
  status,
  propertyType,
  priceEUR,
  bedrooms,
  city,
  region,
  regionDisplay,
  locationText,
  features,
  "imageUrl": images[0].asset->url,
  "images": images[].asset->url,
  coordinates,
  listedAt
`;

export async function getAllListings(): Promise<Listing[]> {
  const results: SanityListing[] = await client.fetch(
    `*[_type == "listing" && isPublished == true] | order(listedAt desc) { ${LISTING_FIELDS} }`,
    {},
    { next: { revalidate: 60 } }
  );

  return results.map(normalise);
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const result: SanityListing | null = await client.fetch(
    `*[_type == "listing" && slug.current == $slug && isPublished == true][0] { ${LISTING_FIELDS} }`,
    { slug },
    { next: { revalidate: 60 } }
  );

  return result ? normalise(result) : null;
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const results: { slug: string }[] = await client.fetch(
    `*[_type == "listing" && isPublished == true]{ "slug": slug.current }`,
    {},
    { next: { revalidate: 60 } }
  );
  return results.map((r) => r.slug);
}

// ── Admin queries (no cache, all listings) ──────────────────────────────────

const ADMIN_LISTING_FIELDS = `
  "id": _id,
  "_sanityId": _id,
  title,
  "slug": slug.current,
  isPublished,
  status,
  propertyType,
  priceEUR,
  bedrooms,
  city,
  region,
  regionDisplay,
  locationText,
  features,
  "imageUrl": images[0].asset->url,
  "images": images[].asset->url,
  "imageAssets": images[]{
    "_key": _key,
    "assetId": asset->_id,
    "url": asset->url
  },
  coordinates,
  listedAt
`;

type SanityAdminListing = Omit<AdminListing, "imageUrl" | "images" | "imageAssets"> & {
  imageUrl: string | null;
  images: string[] | null;
  imageAssets: Array<{ _key: string; assetId: string; url: string }> | null;
};

export async function getAllListingsAdmin(): Promise<AdminListing[]> {
  const results: SanityAdminListing[] = await client.fetch(
    `*[_type == "listing"] | order(listedAt desc) { ${ADMIN_LISTING_FIELDS} }`,
    {},
    { cache: "no-store" }
  );
  return results.map(normaliseAdmin);
}

function normaliseAdmin(l: SanityAdminListing): AdminListing {
  return {
    ...l,
    imageUrl: l.imageUrl ?? l.images?.[0] ?? "",
    images: l.images ?? [],
    features: l.features ?? [],
    bedrooms: l.bedrooms ?? null,
    imageAssets: (l.imageAssets ?? []).filter((a) => a.url),
  };
}

// ── Ensure imageUrl always falls back to the first image in the array ────────
function normalise(l: SanityListing): Listing {
  return {
    ...l,
    imageUrl: l.imageUrl ?? l.images?.[0] ?? "",
    images: l.images ?? [],
    features: l.features ?? [],
    bedrooms: l.bedrooms ?? null,
  };
}
