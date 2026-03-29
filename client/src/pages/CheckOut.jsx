
"use client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./checkOut.css";

export default function CheckOut() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(() =>
    JSON.parse(localStorage.getItem("myBookings")) || []
  );

  const total = bookings.reduce((sum, b) => sum + Number(b.price), 0);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const payload = {
        email: formData.get("email"),
        fullName: formData.get("fullName"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        city: formData.get("city"),
        state: formData.get("state"),
        zip: formData.get("zip"),
        notes: formData.get("notes"),
        total: formData.get("total"),
        services: formData.get("services"),
      };

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to send email");
      }

      // ✅ Clear bookings after successful submission
      localStorage.removeItem("myBookings");
      setBookings([]);

      // ✅ Navigate safely
      navigate("/checkout-success");
    } catch (err) {
      console.error(err);
      alert(
        "Something went wrong while submitting your booking. Please try again."
      );
    }
  }

  return (
    <div className="checkout-page">
      {bookings.length === 0 && (
        <div className="empty-state">
          <p>You have no bookings.</p>
          <button
            className="add-service-btn"
            onClick={() => navigate("/services")}
          >
            +
          </button>
        </div>
      )}

      {bookings.length > 0 && (
        <div className="checkout-card">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, index) => (
                <tr key={index}>
                  <td>{b.name}</td>
                  <td>{new Date(b.appointmentTime).toLocaleString()}</td>
                  <td>${b.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="total-section">
            <h3>Total</h3>
            <p>${total.toFixed(2)}</p>
          </div>

          <form className="intake-form" onSubmit={handleSubmit}>
            <input
              type="hidden"
              name="services"
              value={JSON.stringify(bookings)}
            />
            <input type="hidden" name="total" value={total.toFixed(2)} />

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />
            <input type="text" name="phone" placeholder="Phone Number" required />

            <div className="address-row">
              <input type="text" name="address" placeholder="Address" required />
              <input type="text" name="city" placeholder="City" required />
              <input
                type="text"
                name="state"
                placeholder="ST"
                required
                maxLength={2}
                autoCapitalize="characters"
                autoCorrect="off"
                className="state-input"
                onChange={(e) => {
                  e.target.value = e.target.value.toUpperCase();
                }}
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP"
                required
                maxLength={5}
                pattern="\d{5}"
                inputMode="numeric"
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
              />
            </div>

            <textarea name="notes" placeholder="Notes (optional)" />

            <button type="submit" className="services-home-btn">
              ⟡
            </button>
          </form>

          <div className="add-service-container">
            <button
              className="add-service-btn"
              onClick={() => navigate("/services")}
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}