import { getAllListings } from "../lib/queries";
import RecentlyListedClient from "./RecentlyListedClient";

export default async function RecentlyListed() {
  const allListings = await getAllListings();

  const recent = allListings
    .sort((a, b) => new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime())
    .slice(0, 4);

  // Hide the section entirely if fewer than 4 listings exist
  if (recent.length < 4) return null;

  return <RecentlyListedClient listings={recent} />;
}
