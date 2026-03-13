"use client";

import { useState, useRef, useCallback } from "react";
import type { AdminListing } from "../../types/listing";

// ── helpers ──────────────────────────────────────────────────────────────────
const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const REGION_OPTIONS = [
  { value: "zadarska",               label: "Zadarska",               display: "Dalmatia – Zadar" },
  { value: "splitsko-dalmatinska",   label: "Splitsko-dalmatinska",   display: "Dalmatia – Split" },
  { value: "dubrovacko-neretvanska", label: "Dubrovačko-neretvanska", display: "Dalmatia – Dubrovnik" },
  { value: "sibensko-kninska",       label: "Šibensko-kninska",       display: "Dalmatia – Šibenik" },
  { value: "primorsko-goranska",     label: "Primorsko-goranska",     display: "Kvarner" },
  { value: "istarska",               label: "Istarska",               display: "Istria" },
  { value: "licko-senjska",          label: "Ličko-senjska",          display: "Lika" },
  { value: "karlovacka",             label: "Karlovačka",             display: "Karlovac County" },
  { value: "zagrebacka",             label: "Zagrebačka",             display: "Zagreb County" },
  { value: "grad-zagreb",            label: "Grad Zagreb",            display: "Zagreb" },
];

const PROPERTY_TYPES = [
  { value: "house-villa", label: "House / Villa" },
  { value: "apartment",   label: "Apartment" },
  { value: "land",        label: "Land Plot" },
  { value: "business",    label: "Business Premises" },
  { value: "hotel",       label: "Hotel" },
  { value: "investments", label: "Investments" },
  { value: "off-plan",    label: "Off Plan" },
  { value: "new-build",   label: "New Build" },
  { value: "luxury",      label: "Luxury" },
];

const FEATURES = [
  { value: "sea-view",    label: "Sea View" },
  { value: "pool",        label: "Swimming Pool" },
  { value: "newly-built", label: "Newly Built" },
  { value: "stone-house", label: "Stone House" },
  { value: "luxury",      label: "Luxury" },
];

type NewImage = { file: File; url: string };
type ExistingImage = { _key: string; url: string };

interface Props {
  editingListing?: AdminListing;
  onSuccess: (slug: string) => void;
  onCancel: () => void;
}

// ── component ─────────────────────────────────────────────────────────────────
export default function AdminForm({ editingListing, onSuccess, onCancel }: Props) {
  const isEditing = !!editingListing;

  // Resolve initial region value (fall back if not in options)
  const initialRegion =
    REGION_OPTIONS.find((r) => r.value === editingListing?.region)?.value ??
    "splitsko-dalmatinska";
  const initialRegionDisplay =
    editingListing?.regionDisplay ??
    REGION_OPTIONS.find((r) => r.value === initialRegion)?.display ??
    "Dalmatia – Split";

  // ── form state ───────────────────────────────────────────────────────────
  const [title, setTitle]             = useState(editingListing?.title ?? "");
  const [slug, setSlug]               = useState(editingListing?.slug ?? "");
  const [slugManual, setSlugManual]   = useState(isEditing);
  const [status, setStatus]           = useState<"for-sale" | "for-rent">(editingListing?.status ?? "for-sale");
  const [propertyType, setPropertyType] = useState(editingListing?.propertyType ?? "house-villa");
  const [price, setPrice]             = useState(editingListing?.priceEUR?.toString() ?? "");
  const [bedrooms, setBedrooms]       = useState(editingListing?.bedrooms?.toString() ?? "");
  const [city, setCity]               = useState(editingListing?.city ?? "");
  const [region, setRegion]           = useState(initialRegion);
  const [regionDisplay, setRegionDisplay] = useState(initialRegionDisplay);
  const [locationText, setLocationText] = useState(editingListing?.locationText ?? "");
  const [features, setFeatures]       = useState<string[]>(editingListing?.features ?? []);
  const [lat, setLat]                 = useState(editingListing?.coordinates?.lat?.toString() ?? "");
  const [lng, setLng]                 = useState(editingListing?.coordinates?.lng?.toString() ?? "");
  const [isPublished, setIsPublished] = useState(editingListing?.isPublished ?? false);

  // Existing images (from Sanity, can be removed)
  const [existingImages, setExistingImages] = useState<ExistingImage[]>(
    editingListing?.imageAssets.map((a) => ({ _key: a._key, url: a.url })) ?? []
  );
  // New images (files to upload)
  const [newImages, setNewImages]     = useState<NewImage[]>([]);
  const [dragging, setDragging]       = useState(false);

  // submit state
  const [submitting, setSubmitting]   = useState(false);
  const [progress, setProgress]       = useState("");
  const [error, setError]             = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── handlers ──────────────────────────────────────────────────────────────
  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!slugManual) setSlug(slugify(v));
  };

  const handleRegionChange = (v: string) => {
    setRegion(v);
    const found = REGION_OPTIONS.find((r) => r.value === v);
    if (found) setRegionDisplay(found.display);
  };

  const toggleFeature = (val: string) =>
    setFeatures((prev) =>
      prev.includes(val) ? prev.filter((f) => f !== val) : [...prev, val]
    );

  const addFiles = useCallback((files: FileList | File[]) => {
    const previews: NewImage[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => ({ file, url: URL.createObjectURL(file) }));
    setNewImages((prev) => [...prev, ...previews]);
  }, []);

  const removeNewImage = (idx: number) => {
    setNewImages((prev) => {
      URL.revokeObjectURL(prev[idx].url);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const removeExistingImage = (key: string) => {
    setExistingImages((prev) => prev.filter((img) => img._key !== key));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const totalImages = existingImages.length + newImages.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim())        return setError("Title is required.");
    if (!slug.trim())         return setError("Slug is required.");
    if (!price || isNaN(Number(price))) return setError("A valid price is required.");
    if (!city.trim())         return setError("City is required.");
    if (!locationText.trim()) return setError("Location text is required.");
    if (totalImages === 0)    return setError("At least one image is required.");

    setSubmitting(true);
    setProgress("Uploading images…");

    const fd = new FormData();

    if (isEditing) {
      fd.append("id", editingListing!._sanityId);
      fd.append("keptImageKeys", JSON.stringify(existingImages.map((img) => img._key)));
    }

    fd.append("title", title.trim());
    fd.append("slug", slug.trim());
    fd.append("isPublished", String(isPublished));
    fd.append("status", status);
    fd.append("propertyType", propertyType);
    fd.append("priceEUR", price);
    if (bedrooms) fd.append("bedrooms", bedrooms);
    fd.append("city", city.trim());
    fd.append("region", region);
    fd.append("regionDisplay", regionDisplay.trim());
    fd.append("locationText", locationText.trim());
    features.forEach((f) => fd.append("features", f));
    if (lat && lng) { fd.append("lat", lat); fd.append("lng", lng); }
    newImages.forEach((img) => fd.append("images", img.file));

    try {
      setProgress(isEditing ? "Saving changes…" : "Creating listing…");
      const res = await fetch("/api/admin/listing", {
        method: isEditing ? "PATCH" : "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unknown error");
      newImages.forEach((img) => URL.revokeObjectURL(img.url));
      onSuccess(data.slug);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
      setProgress("");
    }
  };

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <form className="adm-form" onSubmit={handleSubmit} noValidate>

      {/* ── SECTION: Basic Info ── */}
      <section className="adm-section">
        <h2 className="adm-section-title">Basic Information</h2>

        <div className="adm-field">
          <label className="adm-label">Title *</label>
          <input className="adm-input" value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. Stone Villa with Sea View, Makarska" />
        </div>

        <div className="adm-field">
          <label className="adm-label">
            Slug *
            <span className="adm-label-hint">used in the URL: /listing/your-slug</span>
          </label>
          <input className="adm-input adm-input-mono" value={slug}
            onChange={(e) => { setSlug(slugify(e.target.value)); setSlugManual(true); }}
            placeholder="auto-generated from title" />
        </div>

        <div className="adm-row2">
          <div className="adm-field">
            <label className="adm-label">Status *</label>
            <div className="adm-radios">
              {(["for-sale", "for-rent"] as const).map((s) => (
                <label key={s} className={`adm-radio ${status === s ? "adm-radio-active" : ""}`}>
                  <input type="radio" name="status" value={s}
                    checked={status === s} onChange={() => setStatus(s)} />
                  {s === "for-sale" ? "For Sale" : "For Rent"}
                </label>
              ))}
            </div>
          </div>

          <div className="adm-field">
            <label className="adm-label">Property Type *</label>
            <select className="adm-select" value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}>
              {PROPERTY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="adm-row2">
          <div className="adm-field">
            <label className="adm-label">Price (EUR) *</label>
            <input className="adm-input" type="number" min="0" value={price}
              onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 850000" />
          </div>

          <div className="adm-field">
            <label className="adm-label">Bedrooms</label>
            <input className="adm-input" type="number" min="0" value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)} placeholder="e.g. 4" />
          </div>
        </div>

        <div className="adm-field">
          <label className="adm-publish-toggle">
            <span className="adm-label">Publish immediately</span>
            <button type="button"
              className={`adm-toggle ${isPublished ? "adm-toggle-on" : ""}`}
              onClick={() => setIsPublished((p) => !p)}>
              <span className="adm-toggle-knob" />
            </button>
            <span className="adm-toggle-label">{isPublished ? "Live on site" : "Draft – hidden"}</span>
          </label>
        </div>
      </section>

      {/* ── SECTION: Location ── */}
      <section className="adm-section">
        <h2 className="adm-section-title">Location</h2>

        <div className="adm-row2">
          <div className="adm-field">
            <label className="adm-label">City *</label>
            <input className="adm-input" value={city}
              onChange={(e) => setCity(e.target.value)} placeholder="e.g. Makarska" />
          </div>

          <div className="adm-field">
            <label className="adm-label">Region *</label>
            <select className="adm-select" value={region} onChange={(e) => handleRegionChange(e.target.value)}>
              {REGION_OPTIONS.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="adm-field">
          <label className="adm-label">
            Region Display Name *
            <span className="adm-label-hint">shown on listing cards</span>
          </label>
          <input className="adm-input" value={regionDisplay}
            onChange={(e) => setRegionDisplay(e.target.value)}
            placeholder="e.g. Dalmatia – Split" />
        </div>

        <div className="adm-field">
          <label className="adm-label">
            Location Text *
            <span className="adm-label-hint">full address shown on the listing page</span>
          </label>
          <input className="adm-input" value={locationText}
            onChange={(e) => setLocationText(e.target.value)}
            placeholder="e.g. Makarska, Split-Dalmatia County" />
        </div>

        <div className="adm-row2">
          <div className="adm-field">
            <label className="adm-label">
              Latitude
              <span className="adm-label-hint">optional — right-click in Google Maps</span>
            </label>
            <input className="adm-input adm-input-mono" value={lat}
              onChange={(e) => setLat(e.target.value)} placeholder="e.g. 43.2967" />
          </div>
          <div className="adm-field">
            <label className="adm-label">Longitude</label>
            <input className="adm-input adm-input-mono" value={lng}
              onChange={(e) => setLng(e.target.value)} placeholder="e.g. 17.0175" />
          </div>
        </div>
      </section>

      {/* ── SECTION: Features ── */}
      <section className="adm-section">
        <h2 className="adm-section-title">Features</h2>
        <div className="adm-checkboxes">
          {FEATURES.map((f) => (
            <label key={f.value}
              className={`adm-checkbox ${features.includes(f.value) ? "adm-checkbox-active" : ""}`}>
              <input type="checkbox" checked={features.includes(f.value)}
                onChange={() => toggleFeature(f.value)} />
              {f.label}
            </label>
          ))}
        </div>
      </section>

      {/* ── SECTION: Images ── */}
      <section className="adm-section">
        <h2 className="adm-section-title">Images *</h2>
        <p className="adm-section-hint">First image will be used as the listing thumbnail.</p>

        {/* Existing images (edit mode) */}
        {existingImages.length > 0 && (
          <div className="adm-existing-images">
            <p className="adm-existing-label">Current images — click ✕ to remove</p>
            <div className="adm-previews">
              {existingImages.map((img, idx) => (
                <div key={img._key} className="adm-preview">
                  {idx === 0 && newImages.length === 0 && (
                    <span className="adm-preview-badge">Main</span>
                  )}
                  <img
                    src={img.url + "?w=120&h=90&fit=crop&auto=format"}
                    alt=""
                    className="adm-preview-img"
                  />
                  <button type="button" className="adm-preview-remove"
                    onClick={() => removeExistingImage(img._key)} aria-label="Remove image">✕</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drop zone for new images */}
        <div
          className={`adm-dropzone ${dragging ? "adm-dropzone-active" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}>
          <input ref={fileInputRef} type="file" multiple accept="image/*" className="adm-file-hidden"
            onChange={(e) => e.target.files && addFiles(e.target.files)} />
          <div className="adm-dropzone-icon">🖼</div>
          <p className="adm-dropzone-text">
            {dragging ? "Drop images here" : "Click to select or drag & drop images"}
          </p>
          <p className="adm-dropzone-sub">JPG, PNG, WebP — multiple supported</p>
        </div>

        {/* New image previews */}
        {newImages.length > 0 && (
          <div className="adm-previews">
            {newImages.map((img, idx) => (
              <div key={idx} className="adm-preview">
                {idx === 0 && existingImages.length === 0 && (
                  <span className="adm-preview-badge">Main</span>
                )}
                <img src={img.url} alt="" className="adm-preview-img" />
                <button type="button" className="adm-preview-remove"
                  onClick={() => removeNewImage(idx)} aria-label="Remove image">✕</button>
                <p className="adm-preview-name">{img.file.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Submit / Cancel ── */}
      {error && <p className="adm-msg adm-msg-error">{error}</p>}

      <div className="adm-form-actions">
        <button type="button" className="adm-cancel" onClick={onCancel} disabled={submitting}>
          ← Back
        </button>
        <button type="submit" className="adm-submit" disabled={submitting}>
          {submitting
            ? progress || "Submitting…"
            : isEditing
            ? "Save Changes"
            : "Publish Listing"}
        </button>
      </div>
    </form>
  );
}
