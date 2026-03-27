import { useNavigate } from "react-router-dom";
import "./checkoutSuccess.css";

export default function CheckoutSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <div className="success-content">

        {/* HERO ICON */}
        <div className="success-hero">✧</div>

        {/* TEXT */}
        <h2 className="success-title">Thank You</h2>
        <p className="success-message">
          Your booking has been confirmed
        </p>

        {/* ACTION ICONS */}
        <div className="success-actions">
          <button onClick={() => navigate("/")}>
            <span className="icon">⌂</span>
          </button>

          <button onClick={() => navigate("/services")}>
            <span className="icon">＋</span>
          </button>
        </div>

      </div>
    </div>
  );
}