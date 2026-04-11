"use client";

import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";

export default function LocationInput({ defaultValue }: { defaultValue: string }) {
  const { lang } = useLang();
  const placeholder = translations[lang].propertySearch.locationPlaceholder;

  return (
    <input
      id="location"
      name="location"
      className="control"
      defaultValue={defaultValue}
      placeholder={placeholder}
    />
  );
}
