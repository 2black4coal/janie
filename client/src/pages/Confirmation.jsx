import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import "./confirmation.css";

export default function Confirmation() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const service = state?.service;
  const [appointmentTime, setAppointmentTime] = useState("");
  const pickerRef = useRef(null);

  /* ✅ ADD THIS */
  const getLocalDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  if (!service) return <p className="confirm-no-service">No service selected.</p>;

  const handleConfirm = (e) => {
    e.preventDefault();
    const booking = {
      serviceId: service._id,
      name: service.name,
      price: service.price,
      appointmentTime,
    };
    navigate("/my-bookings", { state: { booking } });
  };

  const openPicker = () => {
    if (!pickerRef.current) return;

    if (pickerRef.current.showPicker) {
      pickerRef.current.showPicker();
    } else {
      pickerRef.current.focus();
      pickerRef.current.click();
    }
  };

  return (
    <div className="confirm-page">
      <div className="confirm-card">
        <h3 className="confirm-title">{service.name}</h3>
        <p className="confirm-desc">{service.description}</p>

        <form className="confirm-form" onSubmit={handleConfirm}>
          <div className="confirm-picker-wrap">
            <input
              ref={pickerRef}
              type="datetime-local"
              className="confirm-input"
              value={appointmentTime}
              min={getLocalDateTime()}  
           
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
            />

            <span className="confirm-picker-icon" onClick={openPicker}>
              ♡
            </span>
          </div>

          <div className="confirm-actions">
            <button type="submit" className="confirm-btn">
              <span className="confirm-icon confirm-diamond">✧</span>
            </button>
          </div>
        </form>

        <div className="confirm-back-wrap">
          <button
            type="button"
            className="confirm-btn"
            onClick={() => navigate("/services")}
          >
            <span className="confirm-icon confirm-arrow">↶</span>
          </button>
        </div>
      </div>
    </div>
  );
}