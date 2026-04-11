"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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

function clamp(v: number, lo: number, hi: number) {
  return Math.min(Math.max(v, lo), hi);
}

export type SearchProps = {
  location?: string;
  beds?: string;
  adv?: string;
  min?: string;
  max?: string;
};

export default function PropertySearch({
  location: initLocation = "",
  beds: initBeds = "all",
  adv: initAdv = "",
  min: initMin = "",
  max: initMax = "",
}: SearchProps) {
  const { lang } = useLang();
  const tr = translations[lang].propertySearch;
  const router = useRouter();

  const advantages: Option[] = useMemo(
    () => tr.advantageOptions,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );

  const initMinN = initMin ? clamp(Number(initMin), 0, MAX_PRICE) : 0;
  const initMaxN = initMax ? clamp(Number(initMax), 0, MAX_PRICE) : MAX_PRICE;
  const initAdvArr = initAdv ? initAdv.split(",").map((s) => s.trim()).filter(Boolean) : [];

  const [location, setLocation] = useState(initLocation);
  const [bedrooms, setBedrooms] = useState(initBeds);
  const [minSlider, setMinSlider] = useState(initMinN);
  const [maxSlider, setMaxSlider] = useState(initMaxN);
  const [minPrice, setMinPrice] = useState(initMin);
  const [maxPrice, setMaxPrice] = useState(initMax);
  const [priceTouched, setPriceTouched] = useState(initMin !== "" || initMax !== "");
  const [selectedAdvantages, setSelectedAdvantages] = useState<string[]>(initAdvArr);

  const resetAll = () => {
    setLocation("");
    setBedrooms("all");
    setMinSlider(0);
    setMaxSlider(MAX_PRICE);
    setMinPrice("");
    setMaxPrice("");
    setPriceTouched(false);
    setSelectedAdvantages([]);
    router.push("/buy");
  };

  const onMinSliderChange = (value: number) => {
    setPriceTouched(true);
    const next = clamp(value, 0, maxSlider);
    setMinSlider(next);
    setMinPrice(String(next));
  };

  const onMaxSliderChange = (value: number) => {
    setPriceTouched(true);
    const next = clamp(value, minSlider, MAX_PRICE);
    setMaxSlider(next);
    setMaxPrice(String(next));
  };

  const onSearch = () => {
    const params = new URLSearchParams();
    const loc = location.trim();
    if (loc) params.set("location", loc);
    if (selectedAdvantages.length > 0) params.set("adv", selectedAdvantages.join(","));
    if (bedrooms !== "all") params.set("beds", bedrooms);
    if (priceTouched) {
      if (Number(minPrice) > 0) params.set("min", minPrice);
      if (Number(maxPrice) > 0 && Number(maxPrice) < MAX_PRICE) params.set("max", maxPrice);
    }
    params.set("page", "1");
    router.push(`/buy?${params.toString()}`);
  };

  return (
    <section className="searchwrap">
      <div className="searchbox">
        <div className="searchgrid searchgrid--simple">
          <div className="field">
            <div className="label">{tr.locationLabel}</div>
            <input
              id="location"
              name="location"
              className="control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
              placeholder={tr.locationPlaceholder}
            />
          </div>

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

        <div className="advanced">
          <div className="advanced-grid">

            {/* Price range */}
            <div className="adv-block">
              <div className="label">{tr.priceRange}</div>
              <div className="sliderrow">
                <div
                  className="range"
                  style={{
                    // @ts-expect-error CSS custom properties
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
      </div>
    </section>
  );
}
