"use client";

import { useState } from "react";
import ListingGallery from "./ListingGallery";
import { useLang } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import type { Listing } from "../types/listing";

type Props = {
  listing: Listing;
  mapSrc: string;
};

type InquiryFields = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

type InquiryErrors = Partial<Record<keyof InquiryFields, string>>;

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function ListingDetail({ listing, mapSrc }: Props) {
  const { lang } = useLang();
  const tr = translations[lang].listingPage;

  const [fields, setFields] = useState<InquiryFields>({
    fullName: "",
    email: "",
    phone: "",
    message: tr.defaultMessage(listing.title, listing.city),
  });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (key: keyof InquiryFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((p) => ({ ...p, [key]: e.target.value }));
      if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
    };

  const validate = (): InquiryErrors => {
    const e: InquiryErrors = {};
    if (!fields.fullName.trim()) e.fullName = lang === "HR" ? "Ime je obavezno" : "Full name is required";
    if (!fields.email.trim() || !isValidEmail(fields.email))
      e.email = lang === "HR" ? "Unesite ispravnu email adresu" : "Enter a valid email address";
    if (!fields.phone.trim()) e.phone = lang === "HR" ? "Broj telefona je obavezan" : "Phone number is required";
    if (!fields.message.trim()) e.message = lang === "HR" ? "Poruka je obavezna" : "Message is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "inquiry",
          ...fields,
          listingTitle: listing.title,
          listingCity: listing.city,
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const labelStatus = (s: Listing["status"]) => {
    if (s === "for-sale") return tr.forSale;
    if (s === "for-rent") return tr.forRent;
    return s;
  };

  const labelType = (t: Listing["propertyType"]) => tr.propertyTypes[t] ?? t;
  const labelFeature = (f: string) => tr.features[f] ?? f;

  return (
    <main className="ld">
      <section className="ld-top">
        <div className="ld-top-inner">
          {/* Gallery */}
          <div className="ld-left">
            <div className="ld-badges">
              <span className="ld-badge">{labelStatus(listing.status)}</span>
              <span className="ld-badge ld-badge-dark">{labelType(listing.propertyType)}</span>
              {listing.features?.includes("newly-built") && (
                <span className="ld-badge ld-badge-blue">{tr.newBuildBadge}</span>
              )}
            </div>

            <ListingGallery images={listing.images ?? [listing.imageUrl]} title={listing.title} />
          </div>

          {/* Contact form */}
          <aside className="ld-right">
            <div className="ld-form">
              <h2 className="ld-form-title">{tr.formTitle}</h2>

              <form onSubmit={handleSubmit} noValidate>
                  <label className="ld-field">
                    <span>{tr.fullName}</span>
                    <input
                      value={fields.fullName}
                      onChange={set("fullName")}
                      placeholder={tr.fullName.replace("*", "").trim()}
                      className={errors.fullName ? "input-error" : ""}
                    />
                    {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                  </label>

                  <label className="ld-field">
                    <span>{tr.emailAddress}</span>
                    <input
                      type="email"
                      value={fields.email}
                      onChange={set("email")}
                      placeholder="Email"
                      className={errors.email ? "input-error" : ""}
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </label>

                  <label className="ld-field">
                    <span>{tr.contactNumber}</span>
                    <input
                      value={fields.phone}
                      onChange={set("phone")}
                      placeholder="Phone"
                      className={errors.phone ? "input-error" : ""}
                    />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </label>

                  <label className="ld-field">
                    <span>{tr.messageLabel}</span>
                    <textarea
                      rows={4}
                      value={fields.message}
                      onChange={set("message")}
                      className={errors.message ? "input-error" : ""}
                    />
                    {errors.message && <span className="field-error">{errors.message}</span>}
                  </label>

                  {status === "error" && (
                    <p className="form-send-error">
                      {lang === "HR"
                        ? "Slanje nije uspjelo. Molimo pokušajte ponovo."
                        : "Failed to send. Please try again."}
                    </p>
                  )}

                  {status === "success" && (
                    <p className="ld-success">
                      {lang === "HR"
                        ? "Hvala! Vaš upit je uspješno poslan."
                        : "Thank you! Your inquiry has been sent."}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="ld-submit"
                    disabled={status === "sending"}
                  >
                    {status === "sending"
                      ? lang === "HR" ? "Šalje se…" : "Sending…"
                      : tr.inquireNow}
                  </button>

                  <p className="ld-disclaimer">{tr.disclaimer}</p>
                </form>
            </div>
          </aside>
        </div>
      </section>

      {/* Info row */}
      <section className="ld-info">
        <div className="ld-info-inner">
          <div className="ld-summary">
            <div className="ld-statusdot" aria-hidden="true" />
            <div className="ld-status">{labelStatus(listing.status)}</div>

            <div className="ld-price">
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              }).format(listing.priceEUR)}
            </div>

            <div className="ld-meta">
              <span>
                <strong>{listing.bedrooms ?? 0}</strong> {tr.bedLabel}
              </span>
              <span className="ld-meta-sep">•</span>
              <span>
                <strong>{labelType(listing.propertyType)}</strong>
              </span>
            </div>

            <div className="ld-address">{listing.locationText}</div>
          </div>

          <div className="ld-mapcard">
            <div className="ld-map">
              <iframe
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="ld-mapfooter" />
          </div>
        </div>
      </section>

      {/* Facts grid */}
      <section className="ld-facts">
        <div className="ld-facts-inner">
          <div className="ld-fact">
            <FactIconHome />
            <div>
              <div className="ld-fact-top">{labelType(listing.propertyType)}</div>
              <div className="ld-fact-sub">{tr.propertyTypeLabel}</div>
            </div>
          </div>

          <div className="ld-fact">
            <FactIconBed />
            <div>
              <div className="ld-fact-top">{listing.bedrooms ?? "—"}</div>
              <div className="ld-fact-sub">{tr.bedroomsLabel}</div>
            </div>
          </div>

          <div className="ld-fact">
            <FactIconPin />
            <div>
              <div className="ld-fact-top">{listing.regionDisplay}</div>
              <div className="ld-fact-sub">{tr.regionLabel}</div>
            </div>
          </div>

          <div className="ld-fact">
            <FactIconTag />
            <div>
              <div className="ld-fact-top">{labelStatus(listing.status)}</div>
              <div className="ld-fact-sub">{tr.statusLabel}</div>
            </div>
          </div>

          <div className="ld-fact">
            <FactIconStar />
            <div>
              <div className="ld-fact-top">
                {listing.features?.length ? listing.features.map(labelFeature).join(", ") : "—"}
              </div>
              <div className="ld-fact-sub">{tr.featuresLabel}</div>
            </div>
          </div>

          <div className="ld-fact">
            <FactIconClock />
            <div>
              <div className="ld-fact-top">
                {listing.listedAt ? new Date(listing.listedAt).toLocaleDateString() : "—"}
              </div>
              <div className="ld-fact-sub">{tr.listedLabel}</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FactIconHome() {
  return (
    <svg className="ld-ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z" />
    </svg>
  );
}
function FactIconBed() {
  return (
    <svg className="ld-ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 10a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8h-2v-2H5v2H3v-8Z" />
      <path d="M5 10h6v4H5zM13 10h6v4h-6z" />
    </svg>
  );
}
function FactIconPin() {
  return (
    <svg className="ld-ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 22s7-5 7-12a7 7 0 1 0-14 0c0 7 7 12 7 12Z" />
      <path d="M12 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </svg>
  );
}
function FactIconTag() {
  return (
    <svg className="ld-ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 12V3h9l9 9-9 9-9-9Z" />
      <path d="M7.5 7.5h.01" />
    </svg>
  );
}
function FactIconStar() {
  return (
    <svg className="ld-ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6L12 2z" />
    </svg>
  );
}
function FactIconClock() {
  return (
    <svg className="ld-ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
