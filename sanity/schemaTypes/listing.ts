import { defineType, defineField } from "sanity";

export const listingSchema = defineType({
  name: "listing",
  title: "Listing",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "isPublished",
      title: "Published?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "For Sale", value: "for-sale" },
          { title: "For Rent", value: "for-rent" },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "propertyType",
      title: "Property Type",
      type: "string",
      options: {
        list: [
          { title: "House / Villa", value: "house-villa" },
          { title: "Apartment", value: "apartment" },
          { title: "Land Plot", value: "land" },
          { title: "Business Premises", value: "business" },
          { title: "Hotel", value: "hotel" },
          { title: "Investments", value: "investments" },
          { title: "Off Plan", value: "off-plan" },
          { title: "New Build", value: "new-build" },
          { title: "Luxury", value: "luxury" },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "priceEUR",
      title: "Price (EUR)",
      type: "number",
      validation: (R) => R.required().min(0),
    }),
    defineField({
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "region",
      title: "Region (county key)",
      type: "string",
      description: "Used for filtering — must match the region key in code",
      options: {
        list: [
          { title: "Zadarska", value: "zadarska" },
          { title: "Splitsko-dalmatinska", value: "splitsko-dalmatinska" },
          { title: "Dubrovačko-neretvanska", value: "dubrovacko-neretvanska" },
          { title: "Šibensko-kninska", value: "sibensko-kninska" },
          { title: "Primorsko-goranska", value: "primorsko-goranska" },
          { title: "Istarska", value: "istarska" },
          { title: "Ličko-senjska", value: "licko-senjska" },
          { title: "Karlovačka", value: "karlovacka" },
          { title: "Zagrebačka", value: "zagrebacka" },
          { title: "Grad Zagreb", value: "grad-zagreb" },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "regionDisplay",
      title: "Region Display Name",
      type: "string",
      description: "Human-readable region shown on the listing card e.g. 'Dalmatia'",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "locationText",
      title: "Location Text",
      type: "string",
      description: "Full location string shown on the listing e.g. 'Makarska, Split-Dalmatia County'",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Sea View", value: "sea-view" },
          { title: "Swimming Pool", value: "pool" },
          { title: "Newly Built", value: "newly-built" },
          { title: "Stone House", value: "stone-house" },
          { title: "Luxury", value: "luxury" },
        ],
      },
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
          ],
        },
      ],
      validation: (R) => R.min(1).error("At least one image is required"),
    }),
    defineField({
      name: "coordinates",
      title: "Map Coordinates",
      type: "object",
      fields: [
        defineField({ name: "lat", title: "Latitude", type: "number" }),
        defineField({ name: "lng", title: "Longitude", type: "number" }),
      ],
    }),
    defineField({
      name: "listedAt",
      title: "Listed At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "images.0",
      status: "status",
      city: "city",
      price: "priceEUR",
    },
    prepare({ title, media, city, price }) {
      return {
        title,
        subtitle: `${city} — €${price?.toLocaleString() ?? "—"}`,
        media,
      };
    },
  },
});
