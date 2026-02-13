export default function WhereToFindUs() {
  return (
    <section className="findus">
      <div className="findus-inner">
        {/* Left side */}
        <div className="findus-left">
          <h2 className="findus-title">Where to find us</h2>

          <p className="findus-text">
            Visit us at our office in the beautiful coastal town of Orebić. We welcome you to
            stop by and discuss your real estate plans in
            person.
          </p>

          <div className="findus-address">
            Ul. kralja Zvonimira 8<br />
            20250 Orebić<br />
            Croatia
          </div>
        </div>

        {/* Right side — Google Maps */}
        <div className="findus-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d358.60077805609495!2d17.187398570217425!3d42.97633579830295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2shr!4v1770810505296!5m2!1sen!2shr"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
