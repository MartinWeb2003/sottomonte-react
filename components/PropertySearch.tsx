"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Option = { label: string; value: string };

const MAX_PRICE = 15_000_000;

const formatEUR = (n: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

export default function PropertySearch() {
  const regions: Option[] = useMemo(
    () => [
      { label: "All", value: "all" },
      { label: "Zadarska županija", value: "zadarska" },
      { label: "Splitsko-dalmatinska županija", value: "splitsko-dalmatinska" },
      { label: "Dubrovačko-neretvanska županija", value: "dubrovacko-neretvanska" },
      { label: "Šibensko-kninska županija", value: "sibensko-kninska" },
      { label: "Primorsko-goranska županija", value: "primorsko-goranska" },
      { label: "Istarska županija", value: "istarska" },
      { label: "Ličko-senjska županija", value: "licko-senjska" },
      { label: "Karlovačka županija", value: "karlovacka" },
      { label: "Zagrebačka županija", value: "zagrebacka" },
      { label: "Grad Zagreb", value: "grad-zagreb" },
      { label: "Krapinsko-zagorska županija", value: "krapinsko-zagorska" },
      { label: "Sisačko-moslavačka županija", value: "sisacko-moslavacka" },
      { label: "Varaždinska županija", value: "varazdinska" },
      { label: "Koprivničko-križevačka županija", value: "koprivnicko-krizevacka" },
      { label: "Bjelovarsko-bilogorska županija", value: "bjelovarsko-bilogorska" },
      { label: "Virovitičko-podravska županija", value: "viroviticko-podravska" },
      { label: "Požeško-slavonska županija", value: "pozesko-slavonska" },
      { label: "Brodsko-posavska županija", value: "brodsko-posavska" },
      { label: "Osječko-baranjska županija", value: "osjecko-baranjska" },
      { label: "Vukovarsko-srijemska županija", value: "vukovarsko-srijemska" },
      { label: "Međimurska županija", value: "medjimurska" },
    ],
    []
  );

  const propertyTypes: Option[] = useMemo(
    () => [
      { label: "House / Villa", value: "house-villa" },
      { label: "Apartment", value: "apartment" },
      { label: "Land plot", value: "land" },
      { label: "Business premises", value: "business" },
      { label: "Hotel", value: "hotel" },
      { label: "Investments", value: "investments" },
      { label: "Off Plan", value: "off-plan" },
      { label: "New build", value: "new-build" },
      { label: "Luxury", value: "luxury" },
    ],
    []
  );

  const advantages: Option[] = useMemo(
    () => [
      { label: "Sea view", value: "sea-view" },
      { label: "Swimming pool", value: "pool" },
      { label: "Newly built", value: "newly-built" },
      { label: "Stone house", value: "stone-house" },
      { label: "Luxury", value: "luxury" },
    ],
    []
  );

  // Main filters
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [region, setRegion] = useState("all");
  const [location, setLocation] = useState("");

  // Advanced
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [bedrooms, setBedrooms] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceSlider, setPriceSlider] = useState(0); // 0..15000000
  const [selectedAdvantages, setSelectedAdvantages] = useState<string[]>([]);

  // Property type dropdown
  const [typeOpen, setTypeOpen] = useState(false);
  const typeRef = useRef<HTMLDivElement | null>(null);

  // Draft selections (Apply/Clear)
  const [draftTypes, setDraftTypes] = useState<string[]>([]);
  const [draftAdvantages, setDraftAdvantages] = useState<string[]>([]);

  const propertyTypeDisplay =
    selectedTypes.length === 0
      ? "Select"
      : selectedTypes.length === 1
      ? propertyTypes.find((p) => p.value === selectedTypes[0])?.label ?? "Selected"
      : `${selectedTypes.length} selected`;

  // Close dropdown when clicking outside
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!typeOpen) return;
      if (typeRef.current && !typeRef.current.contains(e.target as Node)) {
        setTypeOpen(false);
        // revert draft to saved if they click away
        setDraftTypes(selectedTypes);
        setDraftAdvantages(selectedAdvantages);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [typeOpen, selectedTypes, selectedAdvantages]);

  const openTypeDropdown = () => {
    setDraftTypes(selectedTypes);
    setDraftAdvantages(selectedAdvantages);
    setTypeOpen(true);
  };

  const toggleDraftType = (value: string) => {
    setDraftTypes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleDraftAdvantage = (value: string) => {
    setDraftAdvantages((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const applyDropdown = () => {
    setSelectedTypes(draftTypes);
    setSelectedAdvantages(draftAdvantages);
    setTypeOpen(false);
  };

  const clearDropdown = () => {
    setDraftTypes([]);
    setDraftAdvantages([]);
  };

  const resetAll = () => {
    setSelectedTypes([]);
    setRegion("all");
    setLocation("");
    setAdvancedOpen(false);
    setBedrooms("all");
    setMinPrice("");
    setMaxPrice("");
    setPriceSlider(0);
    setSelectedAdvantages([]);
    setDraftTypes([]);
    setDraftAdvantages([]);
    setTypeOpen(false);
  };

  const onSearch = () => {
    // Later: route to /listings?filters=...
    console.log({
      selectedTypes,
      region,
      location,
      advancedOpen,
      bedrooms,
      minPrice,
      maxPrice,
      priceSlider,
      selectedAdvantages,
    });
  };

  return (
    <section className="searchwrap">
      <div className="searchbox">
        <div className="searchgrid">
          {/* Property type */}
          <div className="field" ref={typeRef}>
            <div className="label">Property type</div>

            <button
              type="button"
              className="control control-select"
              onClick={() => (typeOpen ? setTypeOpen(false) : openTypeDropdown())}
              aria-expanded={typeOpen}
            >
              <span className={selectedTypes.length === 0 ? "placeholder" : ""}>
                {propertyTypeDisplay}
              </span>
              <span className="chev" aria-hidden="true">
                ▾
              </span>
            </button>

            {typeOpen && (
              <div className="dropdown">
                <div className="dropdown-scroll">
                  <div className="dropdown-section-title">Property type</div>
                  {propertyTypes.map((opt) => (
                    <label key={opt.value} className="checkrow">
                      <input
                        type="checkbox"
                        checked={draftTypes.includes(opt.value)}
                        onChange={() => toggleDraftType(opt.value)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}

                  <div className="dropdown-section-title">Advantages</div>
                  {advantages.map((opt) => (
                    <label key={opt.value} className="checkrow">
                      <input
                        type="checkbox"
                        checked={draftAdvantages.includes(opt.value)}
                        onChange={() => toggleDraftAdvantage(opt.value)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>

                <div className="dropdown-actions">
                  <button type="button" className="btn-ghost" onClick={clearDropdown}>
                    Clear
                  </button>
                  <button type="button" className="btn-solid" onClick={applyDropdown}>
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Region */}
          <div className="field">
            <div className="label">
              Region <span className="muted">–</span>{" "}
              <button
                type="button"
                className="linklike"
                onClick={() => console.log("See map")}
              >
                See map
              </button>
            </div>
            <select
              className="control"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              {regions.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="field">
            <div className="label">Location</div>
            <input
              className="control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Type a city, island, neighborhood..."
            />
          </div>

          {/* Search button */}
          <div className="field field-searchbtn">
            <div className="label label-hidden">Search</div>
            <button type="button" className="searchbtn" onClick={onSearch}>
              <span className="searchicon" aria-hidden="true">
                🔍
              </span>
              Search
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
            <span className={`advchev ${advancedOpen ? "open" : ""}`} aria-hidden="true">
              ▾
            </span>
            Advanced search
          </button>
        </div>

        {/* Advanced panel */}
        {advancedOpen && (
          <div className="advanced">
            <div className="advanced-grid">
              {/* Price range */}
              <div className="adv-block">
                <div className="label">Price range</div>

                <div className="sliderrow">
                  <input
                    type="range"
                    min={0}
                    max={MAX_PRICE}
                    step={50_000}
                    value={priceSlider}
                    onChange={(e) => setPriceSlider(Number(e.target.value))}
                    className="slider"
                  />
                  <div className="slider-value">{formatEUR(priceSlider)}</div>
                </div>

                <div className="pricerow">
                  <div className="moneyinput">
                    <span className="euro">€</span>
                    <input
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="Enter min"
                      inputMode="numeric"
                    />
                  </div>
                  <div className="moneyinput">
                    <span className="euro">€</span>
                    <input
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="Enter max"
                      inputMode="numeric"
                    />
                  </div>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="adv-block">
                <div className="label">Number of bedrooms</div>
                <select
                  className="control"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Advantages */}
              <div className="adv-block">
                <div className="label">Advantages</div>
                <div className="adv-checks">
                  {advantages.map((opt) => (
                    <label key={opt.value} className="checkrow">
                      <input
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
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

