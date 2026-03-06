"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function InfoSections() {
  const [localQuery, setLocalQuery] = useState("");
  const router = useRouter();

  const runLocalSearch = () => {
    const loc = localQuery.trim();

    // If empty, just go to /buy without a location filter
    if (!loc) {
      router.push("/buy");
      return;
    }

    const params = new URLSearchParams();
    params.set("location", loc);
    params.set("page", "1");

    router.push(`/buy?${params.toString()}`);
  };

  const onSubmitLocalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    runLocalSearch();
  };

  return (
    <section className="infosections">
      {/* Part 1 */}
      <div className="info-row info-row--first">
        <div
          className="info-image info-image--loan"
          aria-hidden="true"
          role="presentation"
        />
        <div className="info-content">
          <h2 className="info-title">Need property info? Get started</h2>
          <p className="info-text">
            Quality information provided to you, so you can make the smart choice.
          </p>

          <Link href="/buy" type="button" className="info-button">
            Get started
          </Link>
        </div>
      </div>

      {/* Part 2 */}
      <div className="info-row info-row--second">
        <div className="info-content">
          <h2 className="info-title">Get Local Info</h2>
          <p className="info-text">
            Get important local information on the area you&apos;re most interested
            in.
          </p>

          {/* Wrap in a form so Enter submits */}
          <form className="local-search" onSubmit={onSubmitLocalSearch}>
            <input
              className="local-input"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Type a location (e.g. Split, Zadar...)"
            />

            <button
              type="button"
              className="local-clear"
              onClick={() => setLocalQuery("")}
              aria-label="Clear"
              title="Clear"
            >
              ×
            </button>

            {/* Submit button triggers the same handler */}
            <button type="submit" className="local-go" aria-label="Search">
              <span className="searchicon" aria-hidden="true">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
            </button>
          </form>
        </div>

        <div
          className="info-image info-image--local"
          aria-hidden="true"
          role="presentation"
        />
      </div>
    </section>
  );
}
