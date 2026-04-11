"use client";

import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";

// Only the string fields we actually use
type StringField =
  | "locationLabel"
  | "locationPlaceholder"
  | "search"
  | "priceRange"
  | "bedroomsLabel"
  | "advantages"
  | "resetAll"
  | "all"
  | "advancedSearch";

export default function SearchTranslations({
  field,
  className,
}: {
  field: StringField;
  className?: string;
}) {
  const { lang } = useLang();
  const value = translations[lang].propertySearch[field] as string;

  if (className) {
    return <div className={className}>{value}</div>;
  }
  return <>{value}</>;
}
