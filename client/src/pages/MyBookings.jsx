import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./myBookings.css";

export default function MyBookings() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [bookings, setBookings] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("myBookings")) || [];
    return saved;
  });

  // If a new booking was passed from Confirmation page → add it
  useEffect(() => {
    if (state?.booking) {
      const updated = [...bookings, state.booking];
      setBookings(updated);
      localStorage.setItem("myBookings", JSON.stringify(updated));
    }
  }, [state]);

  const deleteBooking = (index) => {
    const updated = bookings.filter((_, i) => i !== index);
    setBookings(updated);
    localStorage.setItem("myBookings", JSON.stringify(updated));
  };

  return (
   <div className="mybookings-page">

  <h1 className="glass-title">My Bookings</h1>

  {bookings.length === 0 ? (
    <div className="empty-state">
      <p className="service-desc">You have no bookings yet.</p>
      <button className="btn-primary" onClick={() => navigate("/services")}>
        Add a Service
      </button>
    </div>
  ) : (
    <>
      <div className="bookings-list">
        {bookings.map((b, index) => (
          <div className="booking-item" key={index}>
            <h3 className="service-title">{b.name}</h3>
            <p className="service-desc">
              {new Date(b.appointmentTime).toLocaleString()}
            </p>

            <button className="delete-btn" onClick={() => deleteBooking(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
<div className="booking-actions">
  <button className="btn-primary btn-plus" onClick={() => navigate("/services")}>
    <span className="icon">+</span>
  </button>

  <button className="btn-primary btn-summary" onClick={() => navigate("/checkout")}>
    <span className="icon">✨</span>
  </button>
</div>
    </>
  )}
</div>
  );
}

