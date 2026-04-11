"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";

type Option = { label: string; value: string };

const MAX_PRICE = 8_000_000;
const PRICE_STEP = 50_000;

const formatEUR = (n: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

function parseCSV(v: string | null) {
  if (!v) return [];
  return v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function toIntOrNull(v: string | null) {
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export default function PropertySearch() {
  const { lang } = useLang();
  const tr = translations[lang].propertySearch;

  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const advantages: Option[] = useMemo(
    () => tr.advantageOptions,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );

  // Main filters
  const [location, setLocation] = useState("");

  // Advanced
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [bedrooms, setBedrooms] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [minSlider, setMinSlider] = useState(0);
  const [maxSlider, setMaxSlider] = useState(MAX_PRICE);
  const [priceTouched, setPriceTouched] = useState(false);

  const [selectedAdvantages, setSelectedAdvantages] = useState<string[]>([]);

  // Hydrate state from URL
  useEffect(() => {
    const qLocation = sp.get("location") ?? "";
    const qAdv = parseCSV(sp.get("adv"));
    const qBeds = sp.get("beds") ?? "all";

    const qMin = sp.get("min") ?? "";
    const qMax = sp.get("max") ?? "";

    setLocation(qLocation);
    setSelectedAdvantages(qAdv);
    setBedrooms(qBeds);

    setMinPrice(qMin);
    setMaxPrice(qMax);

    const minN = toIntOrNull(sp.get("min"));
    const maxN = toIntOrNull(sp.get("max"));
    const safeMin = minN != null ? Math.min(Math.max(minN, 0), MAX_PRICE) : 0;
    const safeMax = maxN != null ? Math.min(Math.max(maxN, 0), MAX_PRICE) : MAX_PRICE;

    setMinSlider(Math.min(safeMin, safeMax));
    setMaxSlider(Math.max(safeMin, safeMax));

    setPriceTouched((qMin !== "" && Number(qMin) > 0) || (qMax !== "" && Number(qMax) > 0));

    const shouldOpenAdvanced =
      qBeds !== "all" || qMin !== "" || qMax !== "" || qAdv.length > 0;
    setAdvancedOpen(shouldOpenAdvanced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  const resetAll = () => {
    setLocation("");
    setAdvancedOpen(false);
    setBedrooms("all");
    setMinPrice("");
    setMaxPrice("");
    setMinSlider(0);
    setMaxSlider(MAX_PRICE);
    setPriceTouched(false);
    setSelectedAdvantages([]);

    router.push("/buy");
  };

  const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

  const onMinSliderChange = (value: number) => {
    setPriceTouched(true);
    const next = clamp(value, 0, maxSlider);
    setMinSlider(next);
    setMinPrice(String(next));
    if (!advancedOpen) setAdvancedOpen(true);
  };

  const onMaxSliderChange = (value: number) => {
    setPriceTouched(true);
    const next = clamp(value, minSlider, MAX_PRICE);
    setMaxSlider(next);
    setMaxPrice(String(next));
    if (!advancedOpen) setAdvancedOpen(true);
  };

  const onSearch = () => {
    const params = new URLSearchParams();

    const loc = location.trim();
    if (loc) params.set("location", loc);

    if (selectedAdvantages.length > 0) params.set("adv", selectedAdvantages.join(","));

    if (bedrooms !== "all") params.set("beds", bedrooms);

    const minClean = minPrice.trim();
    const maxClean = maxPrice.trim();

    if (priceTouched) {
      if (minClean && Number(minClean) > 0) params.set("min", String(Number(minClean)));
      if (maxClean && Number(maxClean) > 0) params.set("max", String(Number(maxClean)));
    }

    params.set("page", "1");

    router.push(`/buy?${params.toString()}`);
  };

  return (
    <section className="searchwrap">
      <div className="searchbox">
        <div className="searchgrid searchgrid--simple">
          {/* Location */}
          <div className="field">
            <div className="label">{tr.locationLabel}</div>
            <input
              className="control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
              placeholder={tr.locationPlaceholder}
            />
          </div>

          {/* Search button */}
          <div className="field field-searchbtn">
            <div className="label label-hidden">{tr.search}</div>
            <button type="button" className="searchbtn" onClick={onSearch}>
              <span className="searchicon" aria-hidden="true">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
              {tr.search}
            </button>
          </div>
        </div>

        {/* Advanced toggle */}
        <div className="advrow">
          <button
            type="button"
            className="advtoggle"
            onClick={() => setAdvancedOpen((p) => !p)}
            aria-expanded={advancedOpen}
          >
            {tr.advancedSearch}
            <svg
              className={`advchev ${advancedOpen ? "open" : ""}`}
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path d="M2 4.5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Advanced panel */}
        {advancedOpen && (
        <div className="advanced">
          <div className="advanced-grid">
            {/* Price range */}
            <div className="adv-block">
              <div className="label">{tr.priceRange}</div>
              <div className="sliderrow">
                <div
                  className="range"
                  style={{
                    // @ts-expect-error -- CSS custom properties
                    "--min": `${(minSlider / MAX_PRICE) * 100}%`,
                    "--max": `${(maxSlider / MAX_PRICE) * 100}%`,
                  }}
                >
                  <div className="range-track" aria-hidden="true" />
                  <input
                    id="price-min-slider"
                    name="price-min-slider"
                    type="range"
                    min={0}
                    max={MAX_PRICE}
                    step={PRICE_STEP}
                    value={minSlider}
                    onChange={(e) => onMinSliderChange(Number(e.target.value))}
                    className="range-input"
                    aria-label="Minimum price"
                  />
                  <input
                    id="price-max-slider"
                    name="price-max-slider"
                    type="range"
                    min={0}
                    max={MAX_PRICE}
                    step={PRICE_STEP}
                    value={maxSlider}
                    onChange={(e) => onMaxSliderChange(Number(e.target.value))}
                    className="range-input"
                    aria-label="Maximum price"
                  />
                </div>
                <div className="slider-value">
                  {formatEUR(minSlider)} / {formatEUR(maxSlider)}
                </div>
              </div>
              <div className="pricerow">
                <div className="moneyinput">
                  <span className="euro">€</span>
                  <input
                    id="price-min"
                    name="price-min"
                    value={minPrice}
                    onChange={(e) => {
                      setPriceTouched(true);
                      setMinPrice(e.target.value);
                      if (!advancedOpen) setAdvancedOpen(true);
                      const n = Number(e.target.value);
                      if (Number.isFinite(n)) setMinSlider(clamp(n, 0, maxSlider));
                    }}
                    placeholder="Enter min"
                    inputMode="numeric"
                  />
                </div>
                <div className="moneyinput">
                  <span className="euro">€</span>
                  <input
                    id="price-max"
                    name="price-max"
                    value={maxPrice}
                    onChange={(e) => {
                      setPriceTouched(true);
                      setMaxPrice(e.target.value);
                      const n = Number(e.target.value);
                      if (Number.isFinite(n)) setMaxSlider(clamp(n, minSlider, MAX_PRICE));
                    }}
                    placeholder="Enter max"
                    inputMode="numeric"
                  />
                </div>
              </div>
            </div>

            {/* Bedrooms */}
            <div className="adv-block">
              <div className="label">{tr.bedroomsLabel}</div>
              <select
                id="bedrooms"
                name="bedrooms"
                className="control"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              >
                <option value="all">{tr.all}</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            {/* Advantages */}
            <div className="adv-block">
              <div className="label">{tr.advantages}</div>
              <div className="adv-checks">
                {advantages.map((opt) => (
                  <label key={opt.value} className="checkrow">
                    <input
                      id={`adv-${opt.value}`}
                      name={`adv-${opt.value}`}
                      type="checkbox"
                      checked={selectedAdvantages.includes(opt.value)}
                      onChange={() =>
                        setSelectedAdvantages((prev) =>
                          prev.includes(opt.value)
                            ? prev.filter((v) => v !== opt.value)
                            : [...prev, opt.value]
                        )
                      }
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button type="button" className="reset" onClick={resetAll}>
            {tr.resetAll}
          </button>
        </div>
        )}
      </div>
    </section>
  );
}
