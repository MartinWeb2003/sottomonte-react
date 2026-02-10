import type { Listing } from "../types/listing";

export const listings: Listing[] = [
  {
    id: "p1",
    slug: "korcula-modern-villa-infinity-pool",
    status: "for-sale",
    propertyType: "house-villa",
    region: "dubrovacko-neretvanska",
    regionDisplay: "Dalmatia islands",
    city: "Korčula",
    locationText: "Korčula, Dalmatia islands",

    title: "Modern villa with an infinity pool and open views",
    priceEUR: 2000000,
    bedrooms: 4,

    features: ["sea-view", "pool", "luxury", "newly-built"],

    imageUrl: "/properties/p1.jpg",
    images: ["/properties/p1.jpg"],

    listedAt: "2024-12-01T10:00:00.000Z",
    isPublished: true,

    coordinates: { lat: 42.9602, lng: 17.1350 },
  },

  {
    id: "p2",
    slug: "korcula-luxury-villa-infinity-pool",
    status: "for-sale",
    propertyType: "house-villa",
    region: "dubrovacko-neretvanska",
    regionDisplay: "Dalmatia islands",
    city: "Korčula",
    locationText: "Korčula, Dalmatia islands",

    title: "Luxury villa with an infinity pool and open views",
    priceEUR: 2000000,
    bedrooms: 4,

    features: ["sea-view", "pool", "luxury"],

    imageUrl: "/properties/p2.jpg",
    images: ["/properties/p2.jpg"],

    listedAt: "2024-12-03T10:00:00.000Z",
    isPublished: true,

    coordinates: { lat: 42.9602, lng: 17.1350 },
  },

  {
    id: "p3",
    slug: "pula-luxury-villa-quiet-area",
    status: "for-sale",
    propertyType: "house-villa",
    region: "istarska",
    regionDisplay: "Istria and Kvarner",
    city: "Pula",
    locationText: "Pula, Istria and Kvarner",

    title: "Luxury villa with pool in a quiet part of Pula",
    priceEUR: 1225000,
    bedrooms: 4,

    features: ["pool", "luxury", "newly-built"],

    imageUrl: "/properties/p3.jpg",
    images: ["/properties/p3.jpg"],

    listedAt: "2024-12-05T10:00:00.000Z",
    isPublished: true,

    coordinates: { lat: 44.8666, lng: 13.8496 },
  },

  {
    id: "p4",
    slug: "rogoznica-apartment-house-sea-view",
    status: "for-sale",
    propertyType: "apartment",
    region: "sibensko-kninska",
    regionDisplay: "Dalmatia coast",
    city: "Rogoznica",
    locationText: "Rogoznica, Dalmatia coast",

    title: "Apartment house with swimming pool and panoramic sea view",
    priceEUR: 1300000,
    bedrooms: 12,

    features: ["sea-view", "pool"],

    imageUrl: "/properties/p4.jpg",
    images: ["/properties/p4.jpg"],

    listedAt: "2024-12-06T10:00:00.000Z",
    isPublished: true,

    coordinates: { lat: 43.5331, lng: 15.9676 },
  },
];
