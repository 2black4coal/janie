import { useNavigate } from "react-router-dom";
import "./services.css";

export default function Services() {
  const navigate = useNavigate();

  const services = [
    { id: 1, name: "Deep Tissue Massage", description: "Relieves tension and stress", price: 120, duration: 60, image: "/images/services/sv1.jpg" },
    { id: 2, name: "Aromatherapy", description: "Relaxing essential oil treatment", price: 90, duration: 45, image: "/images/services/sv2.jpg" },
    { id: 3, name: "Hot Stone Massage", description: "Warm stones melt muscle tension", price: 140, duration: 75, image: "/images/services/sv3.jpg" },
    { id: 4, name: "Female Hair‑Do", description: "Elegant styling for every occasion", price: 85, duration: 60, image: "/images/services/sv4.jpg" },
    { id: 5, name: "Nail Care", description: "Polished, clean, and beautifully finished nails", price: 55, duration: 45, image: "/images/services/sv5.jpg" },
    { id: 6, name: "Infant Comfort Care", description: "Gentle, nurturing care for your little one", price: 70, duration: 40, image: "/images/services/sv6.jpg" }
  ];

  return (
    <main className="services-page">

      <div className="services-inner">

        {/* PAGE TITLE */}
        <div className="services-title-wrapper">
          <h1 className="services-title">Our Services</h1>
        </div>

        {/* SERVICES GRID */}
        <section className="services-grid">
          {services.map(service => (
            <article
              className="service-card"
              key={service.id}
              onClick={() =>
                navigate(`/confirmation/${service.id}`, { state: { service } })
              }
            >
              <img className="service-img" src={service.image} alt={service.name} />

              <h3 className="service-card-title">{service.name}</h3>

              <p className="service-desc">{service.description}</p>

              <p className="service-price">starting at ${service.price}</p>

              <button className="service-book-btn">Book Now</button>
            </article>
          ))}
        </section>

        {/* HOME BUTTON */}
        <div className="services-home-wrapper">
          <button className="services-home-btn" onClick={() => navigate("/")}>
            ⌂
          </button>
        </div>
<footer className="services-footer">
  <div className="footer-contacts">
    <span className="footer-phone">315‑507‑9215</span>
    <span className="footer-email">janiegreen@janiescare.com</span>
  </div>
  <div className="footer-copy">
    © Janie’s‑Care — All rights reserved 2026
  </div>
</footer>


      </div>
    </main>
  );
}
