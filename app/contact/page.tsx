import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

export default function ContactPage() {
  return (
    <main className="contact">
      <section className="contact-inner">
        {/* LEFT */}
        <div className="contact-left">
          <h1 className="contact-title">Get in touch with us</h1>

          <p className="contact-text">
            We&apos;re here to help. Fill out the form and we&apos;ll get back to you as
            soon as possible.
          </p>

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
              <a href="tel:+385000000000">+385 00 000 000</a>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="contact-right">
          <form className="contact-form">
            <div className="contact-row2">
              <label className="contact-field">
                <span>First name*</span>
                <input required placeholder="First name" />
              </label>

              <label className="contact-field">
                <span>Last name*</span>
                <input required placeholder="Last name" />
              </label>
            </div>

            <label className="contact-field">
              <span>Email*</span>
              <input required type="email" placeholder="Email" />
            </label>

            <label className="contact-field">
              <span>Phone number (optional)</span>
              <input placeholder="Phone number" />
            </label>

            <label className="contact-field">
              <span>Message*</span>
              <textarea required rows={7} placeholder="Message" />
            </label>

            <button type="submit" className="contact-submit">
              SUBMIT
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}