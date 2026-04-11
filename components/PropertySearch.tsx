"use client";

import dynamic from "next/dynamic";

const PropertySearchInner = dynamic(() => import("./PropertySearchInner"), { ssr: false });

export default function PropertySearch() {
  return <PropertySearchInner />;
}
