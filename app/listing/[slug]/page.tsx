import { notFound } from "next/navigation";
import ListingDetail from "../../../components/ListingDetail";
import { getListingBySlug, getAllPublishedSlugs } from "../../../lib/queries";

// Pre-generate all published listing pages at build time
export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const listing = await getListingBySlug(slug);
  if (!listing) return notFound();

  const mapSrc = listing.coordinates
    ? `https://www.google.com/maps?q=${listing.coordinates.lat},${listing.coordinates.lng}&z=13&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(listing.locationText)}&output=embed`;

  return <ListingDetail listing={listing} mapSrc={mapSrc} />;
}
