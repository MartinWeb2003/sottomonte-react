"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";

export default function InfoSections() {
  const { lang } = useLang();
  const tr = translations[lang].infoSections;

  const [localQuery, setLocalQuery] = useState("");
  const router = useRouter();

  const runLocalSearch = () => {
    const loc = localQuery.trim();

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
          <h2 className="info-title">{tr.row1Title}</h2>
          <p className="info-text">{tr.row1Text}</p>

          <Link href="/contact" type="button" className="info-button">
            {tr.row1Btn}
          </Link>
        </div>
      </div>

      {/* Part 2 */}
      <div className="info-row info-row--second">
        <div className="info-content">
          <h2 className="info-title">{tr.row2Title}</h2>
          <p className="info-text">{tr.row2Text}</p>

          <form className="local-search" onSubmit={onSubmitLocalSearch}>
            <input
              className="local-input"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder={tr.row2Placeholder}
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
