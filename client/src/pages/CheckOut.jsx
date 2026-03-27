import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./checkOut.css";

export default function CheckOut() {
  const navigate = useNavigate();
  const [bookings] = useState(() => JSON.parse(localStorage.getItem("myBookings")) || []);
  const total = bookings.reduce((sum, b) => sum + Number(b.price), 0);

  return (
    <div className="checkout-page">

      {bookings.length === 0 && (
        <div className="empty-state">
          <p>You have no bookings.</p>
          <button className="add-service-btn" onClick={() => navigate("/services")}>
            +
          </button>
        </div>
      )}

      {bookings.length > 0 && (
        <div className="checkout-card">

          {/* SUMMARY TABLE */}
          <table className="booking-table">
            <thead>
              <tr>
                <th >Service</th>  
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

          {/* TOTAL */}
          <div className="total-section">
            <h3>Total</h3>
            <p>${total.toFixed(2)}</p>
          </div>

          {/* NETLIFY FORM */}
          <form
            className="intake-form"
            name="checkout"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            action="/checkout-success"
          >
            {/* REQUIRED HIDDEN FIELDS */}
            <input type="hidden" name="form-name" value="checkout" />
            <input type="hidden" name="services" value={JSON.stringify(bookings)} />
            <input type="hidden" name="total" value={total.toFixed(2)} />

            {/* CUSTOMER FIELDS */}
            <input type="text" name="fullName" placeholder="Full Name" required />
            <input type="email" name="email" placeholder="Email Address" required />
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
  pattern="\d{5}"         // ✅ ensures exactly 5 digits
  inputMode="numeric"      // ✅ mobile keyboards show numbers
  onChange={(e) => {
    // remove anything that’s not a number
    e.target.value = e.target.value.replace(/\D/g, '');
  }}
/>
            </div>

            <textarea name="notes" placeholder="Notes (optional)" />

            {/* DIAMOND SUBMIT BUTTON — UNTOUCHED */}
            <button type="submit" className="services-home-btn">
              ⟡
            </button>
          </form>

          {/* PLUS BUTTON FLOATING BELOW FORM */}
          <div className="add-service-container">
            <button className="add-service-btn" onClick={() => navigate("/services")}>
              +
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
