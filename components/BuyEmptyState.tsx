"use client";

import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";

export default function BuyEmptyState() {
  const { lang } = useLang();
  const tr = translations[lang].buyPage;

  return (
    <div className="buy-empty">
      <h2 className="buy-empty-headline">{tr.emptyHeadline}</h2>
      <p className="buy-empty-subheadline">{tr.emptySubheadline}</p>
      <div className="buy-empty-body">
        {tr.emptyBody.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <Link href="/contact" className="buy-empty-cta">
        {tr.emptyCta}
      </Link>
    </div>
  );
}
