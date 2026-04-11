import PriceSlider from "./PriceSlider";
import AdvantagesCheckboxes from "./AdvantagesCheckboxes";
import SearchTranslations from "./SearchTranslations";
import LocationInput from "./LocationInput";

export type SearchProps = {
  location?: string;
  beds?: string;
  adv?: string;
  min?: string;
  max?: string;
};

export default function PropertySearch({
  location = "",
  beds = "all",
  adv = "",
  min = "",
  max = "",
}: SearchProps) {
  const initMin = min ? Math.min(Math.max(Number(min), 0), 8_000_000) : 0;
  const initMax = max ? Math.min(Math.max(Number(max), 0), 8_000_000) : 8_000_000;
  const initAdvArr = adv ? adv.split(",").map((s) => s.trim()).filter(Boolean) : [];

  return (
    <section className="searchwrap">
      <div className="searchbox">
        {/*
          Pure HTML GET form — the browser submits it as /buy?location=...&beds=...
          No JavaScript needed for the actual search. The server handles everything.
        */}
        <form method="GET" action="/buy">
          {/* Always reset to page 1 on a new search */}
          <input type="hidden" name="page" value="1" />

          {/* Top row: location + submit */}
          <div className="searchgrid searchgrid--simple">
            <div className="field">
              {/* Label rendered by client component for translations */}
              <SearchTranslations field="locationLabel" className="field label" />
              <LocationInput defaultValue={location} />
            </div>

            <div className="field field-searchbtn">
              <div className="label label-hidden">Search</div>
              <button type="submit" className="searchbtn">
                <span className="searchicon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </span>
                <SearchTranslations field="search" />
              </button>
            </div>
          </div>

          {/* Advanced filters — always visible */}
          <div className="advanced">
            <div className="advanced-grid">

              {/* Price range — client component for slider interactivity */}
              <div className="adv-block">
                <SearchTranslations field="priceRange" className="label" />
                <div className="sliderrow">
                  <PriceSlider initMin={initMin} initMax={initMax} />
                </div>
              </div>

              {/* Bedrooms — plain select, native form control */}
              <div className="adv-block">
                <SearchTranslations field="bedroomsLabel" className="label" />
                <select
                  id="bedrooms"
                  name="beds"
                  className="control"
                  defaultValue={beds}
                >
                  <option value="all">Sve</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Advantages — client component for checkbox state → hidden input */}
              <div className="adv-block">
                <SearchTranslations field="advantages" className="label" />
                <AdvantagesCheckboxes initAdv={initAdvArr} />
              </div>

            </div>

            {/* Reset: just navigates to bare /buy */}
            <a href="/buy" className="reset" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
              <SearchTranslations field="resetAll" />
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
