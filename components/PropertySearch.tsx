"use client";

import dynamic from "next/dynamic";

export type SearchProps = {
  location?: string;
  beds?: string;
  adv?: string;
  min?: string;
  max?: string;
};

const SearchClient = dynamic<SearchProps>(
  () => import("./PropertySearchClient"),
  {
    ssr: false,
    loading: () => (
      <section className="searchwrap">
        <div className="searchbox" style={{ minHeight: 220 }} />
      </section>
    ),
  }
);

export default function PropertySearch(props: SearchProps) {
  return <SearchClient {...props} />;
}
