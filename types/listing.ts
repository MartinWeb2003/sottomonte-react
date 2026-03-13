export type Listing = {
  id: string;
  slug: string;

  status: "for-sale" | "for-rent";
  propertyType:
    | "house-villa"
    | "apartment"
    | "land"
    | "business"
    | "hotel"
    | "investments"
    | "off-plan"
    | "new-build"
    | "luxury";

  region:
    | "all"
    | "zadarska"
    | "splitsko-dalmatinska"
    | "dubrovacko-neretvanska"
    | "sibensko-kninska"
    | "primorsko-goranska"
    | "istarska"
    | "licko-senjska"
    | "karlovacka"
    | "zagrebacka"
    | "grad-zagreb"
    | "krapinsko-zagorska"
    | "sisacko-moslavacka"
    | "varazdinska"
    | "koprivnicko-krizevacka"
    | "bjelovarsko-bilogorska"
    | "viroviticko-podravska"
    | "pozesko-slavonska"
    | "brodsko-posavska"
    | "osjecko-baranjska"
    | "vukovarsko-srijemska"
    | "medjimurska";

  city: string;
  locationText: string; // searchable string
  regionDisplay: string;

  title: string;
  priceEUR: number;
  bedrooms: number | null;

  features: Array<
    "sea-view" | "pool" | "newly-built" | "stone-house" | "luxury"
  >;

  imageUrl: string;
  images?: string[];

  listedAt: string; // ISO
  isPublished: boolean;

  coordinates?: { lat: number; lng: number };
};

export type AdminListing = Listing & {
  _sanityId: string;
  imageAssets: Array<{ _key: string; assetId: string; url: string }>;
};
