"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useLang } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function ContactPage() {
  const { lang } = useLang();
  const tr = translations[lang].contactPage;

  const [fields, setFields] = useState<Fields>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((p) => ({ ...p, [key]: e.target.value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!fields.firstName.trim()) e.firstName = lang === "HR" ? "Ime je obavezno" : "First name is required";
    if (!fields.lastName.trim()) e.lastName = lang === "HR" ? "Prezime je obavezno" : "Last name is required";
    if (!fields.email.trim() || !isValidEmail(fields.email))
      e.email = lang === "HR" ? "Unesite ispravnu email adresu" : "Enter a valid email address";
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
        body: JSON.stringify({ type: "contact", ...fields }),
      });

      if (res.ok) {
        setStatus("success");
        setFields({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="contact">
      <section className="contact-inner">
        {/* LEFT */}
        <div className="contact-left">
          <h1 className="contact-title">{tr.title}</h1>

          <p className="contact-text">{tr.text}</p>

          <div className="contact-links">
            <div className="contact-link">
              <span className="contact-ico" aria-hidden="true">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <a href="mailto:hello@sottomonte.hr">hello@sottomonte.hr</a>
            </div>

            <div className="contact-link">
              <span className="contact-ico" aria-hidden="true">
                <FontAwesomeIcon icon={faPhone} />
              </span>
              <a href="tel:+385000000000">+385 98 589 235</a>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="contact-right">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-row2">
              <label className="contact-field">
                <span>{tr.firstName}</span>
                <input
                  value={fields.firstName}
                  onChange={set("firstName")}
                  placeholder={tr.firstNamePlaceholder}
                  className={errors.firstName ? "input-error" : ""}
                />
                {errors.firstName && <span className="field-error">{errors.firstName}</span>}
              </label>

              <label className="contact-field">
                <span>{tr.lastName}</span>
                <input
                  value={fields.lastName}
                  onChange={set("lastName")}
                  placeholder={tr.lastNamePlaceholder}
                  className={errors.lastName ? "input-error" : ""}
                />
                {errors.lastName && <span className="field-error">{errors.lastName}</span>}
              </label>
            </div>

            <label className="contact-field">
              <span>{tr.email}</span>
              <input
                type="email"
                value={fields.email}
                onChange={set("email")}
                placeholder={tr.emailPlaceholder}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </label>

            <label className="contact-field">
              <span>{tr.phone}</span>
              <input
                value={fields.phone}
                onChange={set("phone")}
                placeholder={tr.phonePlaceholder}
              />
            </label>

            <label className="contact-field">
              <span>{tr.message}</span>
              <textarea
                rows={7}
                value={fields.message}
                onChange={set("message")}
                placeholder={tr.messagePlaceholder}
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
              <p className="contact-success">
                {lang === "HR"
                  ? "Hvala! Vaša poruka je uspješno poslana. Javit ćemo vam se uskoro."
                  : "Thank you! Your message has been sent. We'll get back to you shortly."}
              </p>
            )}

            <button
              type="submit"
              className="contact-submit"
              disabled={status === "sending"}
            >
              {status === "sending"
                ? lang === "HR" ? "Šalje se…" : "Sending…"
                : tr.submit}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
