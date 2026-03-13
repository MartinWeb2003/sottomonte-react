import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createHmac } from "crypto";
import { writeClient } from "../../../../sanity/lib/writeClient";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return false;
  const secret = process.env.ADMIN_SESSION_SECRET ?? "change-this-secret";
  const expected = createHmac("sha256", secret)
    .update(process.env.ADMIN_PASSWORD ?? "")
    .digest("hex");
  return token === expected;
}

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

// ── GET — return all listings for admin dashboard ─────────────────────────────
export async function GET() {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const listings = await writeClient.fetch(
      `*[_type == "listing"] | order(listedAt desc) { ${ADMIN_LISTING_FIELDS} }`,
      {},
      { cache: "no-store" } as RequestInit
    );
    return NextResponse.json(listings);
  } catch (err) {
    console.error("Sanity fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
  }
}

// ── POST — create a new listing ───────────────────────────────────────────────
export async function POST(request: Request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.SANITY_WRITE_TOKEN) {
    return NextResponse.json({ error: "SANITY_WRITE_TOKEN not configured" }, { status: 500 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const imageFiles = formData.getAll("images") as File[];
  const imageAssets = await Promise.all(
    imageFiles
      .filter((f) => f.size > 0)
      .map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return writeClient.assets.upload("image", buffer, {
          filename: file.name,
          contentType: file.type,
        });
      })
  );

  const slug = (formData.get("slug") as string).trim();
  const bedroomsRaw = formData.get("bedrooms") as string;
  const latRaw = formData.get("lat") as string;
  const lngRaw = formData.get("lng") as string;
  const features = formData.getAll("features") as string[];

  const doc = {
    _type: "listing",
    title: (formData.get("title") as string).trim(),
    slug: { _type: "slug", current: slug },
    isPublished: formData.get("isPublished") === "true",
    status: formData.get("status") as string,
    propertyType: formData.get("propertyType") as string,
    priceEUR: Number(formData.get("priceEUR")),
    bedrooms: bedroomsRaw ? Number(bedroomsRaw) : null,
    city: (formData.get("city") as string).trim(),
    region: formData.get("region") as string,
    regionDisplay: (formData.get("regionDisplay") as string).trim(),
    locationText: (formData.get("locationText") as string).trim(),
    features,
    images: imageAssets.map((asset) => ({
      _type: "image",
      _key: asset._id,
      asset: { _type: "reference", _ref: asset._id },
    })),
    ...(latRaw && lngRaw
      ? { coordinates: { lat: Number(latRaw), lng: Number(lngRaw) } }
      : {}),
    listedAt: new Date().toISOString(),
  };

  try {
    const created = await writeClient.create(doc);
    return NextResponse.json({ success: true, id: created._id, slug });
  } catch (err) {
    console.error("Sanity create error:", err);
    return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
  }
}

// ── PATCH — update an existing listing ────────────────────────────────────────
export async function PATCH(request: Request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const id = (formData.get("id") as string | null)?.trim();
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  // Upload any new images
  const imageFiles = formData.getAll("images") as File[];
  const newImageAssets = await Promise.all(
    imageFiles
      .filter((f) => f.size > 0)
      .map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return writeClient.assets.upload("image", buffer, {
          filename: file.name,
          contentType: file.type,
        });
      })
  );

  // Reconstruct kept images from the current Sanity document
  const keptKeysRaw = formData.get("keptImageKeys") as string | null;
  const keptKeys: string[] = keptKeysRaw ? JSON.parse(keptKeysRaw) : [];

  type SanityImageRef = { _key: string; _type: string; asset: { _type: string; _ref: string } };
  const currentDoc = await writeClient.getDocument<{ images?: SanityImageRef[] }>(id);
  const existingImages: SanityImageRef[] = currentDoc?.images ?? [];
  const keptImages = existingImages.filter((img) => keptKeys.includes(img._key));

  const newImages = newImageAssets.map((asset) => ({
    _type: "image",
    _key: asset._id,
    asset: { _type: "reference", _ref: asset._id },
  }));

  const allImages = [...keptImages, ...newImages];

  const slug = (formData.get("slug") as string).trim();
  const bedroomsRaw = formData.get("bedrooms") as string;
  const latRaw = formData.get("lat") as string;
  const lngRaw = formData.get("lng") as string;
  const features = formData.getAll("features") as string[];

  const patch: Record<string, unknown> = {
    title: (formData.get("title") as string).trim(),
    slug: { _type: "slug", current: slug },
    isPublished: formData.get("isPublished") === "true",
    status: formData.get("status") as string,
    propertyType: formData.get("propertyType") as string,
    priceEUR: Number(formData.get("priceEUR")),
    bedrooms: bedroomsRaw ? Number(bedroomsRaw) : null,
    city: (formData.get("city") as string).trim(),
    region: formData.get("region") as string,
    regionDisplay: (formData.get("regionDisplay") as string).trim(),
    locationText: (formData.get("locationText") as string).trim(),
    features,
    images: allImages,
  };

  if (latRaw && lngRaw) {
    patch.coordinates = { lat: Number(latRaw), lng: Number(lngRaw) };
  } else {
    patch.coordinates = null;
  }

  try {
    await writeClient.patch(id).set(patch).commit();
    return NextResponse.json({ success: true, slug });
  } catch (err) {
    console.error("Sanity patch error:", err);
    return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
  }
}

// ── DELETE — remove a listing ─────────────────────────────────────────────────
export async function DELETE(request: Request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { id: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  try {
    await writeClient.delete(body.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Sanity delete error:", err);
    return NextResponse.json({ error: "Failed to delete listing" }, { status: 500 });
  }
}
