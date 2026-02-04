"use client";

import { useState } from "react";

export default function InfoSections() {
  const [localQuery, setLocalQuery] = useState("");

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
          <h2 className="info-title">Need a home loan? Get pre-approved</h2>
          <p className="info-text">
            Find a lender who can offer competitive mortgage rates and help you
            with pre-approval.
          </p>

          <button type="button" className="info-button">
            Get pre-approved now
          </button>

          <button type="button" className="info-linklike">
            Advertising disclosure
          </button>
        </div>
      </div>

      {/* Part 2 */}
      <div className="info-row info-row--second">
        <div className="info-content">
          <h2 className="info-title">Get Local Info</h2>
          <p className="info-text">
            Does it have pet-friendly rentals? How are the schools? Get important
            local information on the area you&apos;re most interested in.
          </p>

          <div className="local-search">
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

            <button type="button" className="local-go" aria-label="Search">
              <span aria-hidden="true">🔍</span>
            </button>
          </div>
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
