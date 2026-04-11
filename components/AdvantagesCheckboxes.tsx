"use client";

import { useState } from "react";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";

export default function AdvantagesCheckboxes({ initAdv }: { initAdv: string[] }) {
  const { lang } = useLang();
  const opts = translations[lang].propertySearch.advantageOptions;
  const [selected, setSelected] = useState<string[]>(initAdv);

  const toggle = (value: string) =>
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  return (
    <div className="adv-checks">
      {opts.map((opt) => (
        <label key={opt.value} className="checkrow">
          <input
            type="checkbox"
            id={`adv-${opt.value}`}
            checked={selected.includes(opt.value)}
            onChange={() => toggle(opt.value)}
          />
          <span>{opt.label}</span>
        </label>
      ))}
      {/* Single hidden input with comma-separated values — what the server reads */}
      <input type="hidden" name="adv" value={selected.join(",")} />
    </div>
  );
}
