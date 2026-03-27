import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page" onClick={() => navigate("/gallery")}>

      {/* CINEMA FRAME */}
      <div className="cinema-frame">

        {/* DARK OVERLAY */}
        <div className="home-overlay"></div>

        {/* RAIN INSIDE CINEMA */}
        <div className="rain">
          {Array.from({ length: 180 }).map((_, i) => (
            <span
              key={i}
              className="drop"
              style={{
                "--x": Math.random(),
                "--delay": Math.random() * 3
              }}
            />
          ))}
        </div>

        {/* SPLASHES */}
        <div className="splashes">
          {Array.from({ length: 35 }).map((_, i) => (
            <span
              key={i}
              className="splash"
              style={{ "--x": Math.random() }}
            />
          ))}
        </div>

        {/* LIGHTNING */}
        <div className="lightning"></div>

        {/* HERO IMAGE */}
        <img
          src="/images/rain2.png"
          alt="Rain scene"
          className="hero-image"
        />

     

      </div>

      {/* SOUND */}
      <audio autoPlay loop>
        <source src="/sounds/rain.mp3" type="audio/mpeg" />
      </audio>

    </div>
  );
}
