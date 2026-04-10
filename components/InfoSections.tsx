"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { useInView } from "../lib/useInView";

export default function InfoSections() {
  const { lang } = useLang();
  const tr = translations[lang].infoSections;
  const [localQuery, setLocalQuery] = useState("");
  const router = useRouter();

  const [row1Ref, row1Visible] = useInView<HTMLDivElement>(0.08);
  const [row2Ref, row2Visible] = useInView<HTMLDivElement>(0.08);

  const runLocalSearch = () => {
    const loc = localQuery.trim();
    if (!loc) { router.push("/buy"); return; }
    const params = new URLSearchParams();
    params.set("location", loc);
    params.set("page", "1");
    router.push(`/buy?${params.toString()}`);
  };

  return (
    <section className="infosections">
      {/* Row 1 */}
      <div className="info-row info-row--first" ref={row1Ref}>
        <div
          className="info-image info-image--loan"
          aria-hidden="true"
          role="presentation"
        />
        <div className={`info-content reveal-right ${row1Visible ? "is-visible" : ""}`}>
          <h2 className={`info-title reveal-heading ${row1Visible ? "is-visible" : ""}`}>
            {tr.row1Title}
          </h2>
          <p className="info-text">{tr.row1Text}</p>
          <Link href="/contact" className="info-button">{tr.row1Btn}</Link>
        </div>
      </div>

      {/* Row 2 */}
      <div className="info-row info-row--second" ref={row2Ref}>
        <div className={`info-content reveal-left ${row2Visible ? "is-visible" : ""}`}>
          <h2 className={`info-title reveal-heading ${row2Visible ? "is-visible" : ""}`}>
            {tr.row2Title}
          </h2>
          <p className="info-text">{tr.row2Text}</p>
          <form className="local-search" onSubmit={(e) => { e.preventDefault(); runLocalSearch(); }}>
            <input
              className="local-input"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder={tr.row2Placeholder}
            />
            <button type="button" className="local-clear" onClick={() => setLocalQuery("")} aria-label="Clear">×</button>
            <button type="submit" className="local-go" aria-label="Search">
              <span className="searchicon" aria-hidden="true"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
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
