import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./gallery.css";

const FADE_DURATION = 2.0;
const DISPLAY_DURATION = 6000;

export default function Gallery() {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const images = [
    "/images/gallery/gallery1.png",
    "/images/gallery/gallery2.png",
    "/images/gallery/gallery3.png",
    "/images/gallery/gallery4.png",
    "/images/gallery/gallery5.png",
    "/images/gallery/gallery6.png",
  ];

  const overlayTexts = [
    "Gentle Care. Pure Comfort.",
    "Soft Moments for You & Baby.",
    "Calm, Clean, Beautiful.",
    "Nurture. Restore. Glow.",
    "Serene Touches, Happy Babies.",
    "Where Wellness Meets Cuteness."
  ];

  const sounds = [
    "/sounds/lonely-dance.mp3",
    "/sounds/love-at.mp3",
    "/sounds/you-hold-my-hand.mp3"
  ];

  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [ready, setReady] = useState(false);

  // preload
  useEffect(() => {
    const preload = async () => {
      await Promise.all(
        images.map(src => {
          return new Promise(res => {
            const img = new Image();
            img.src = src;
            img.onload = res;
          });
        })
      );
      setReady(true);
    };
    preload();
  }, []);

  // audio
  useEffect(() => {
    if (!ready) return;
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    audioRef.current.src = randomSound;
    audioRef.current.volume = 0.35;
    audioRef.current.play().catch(() => {});
  }, [ready]);

  // slideshow
  useEffect(() => {
    if (!ready) return;

    const interval = setInterval(() => {
      setPrevIndex(index);
      setIndex(i => (i + 1) % images.length);
    }, DISPLAY_DURATION);

    return () => clearInterval(interval);
  }, [ready, index, images.length]);

  const goToServices = () => {
    navigate("/services");
  };

  if (!ready) {
    return <div className="gallery-loading">Preparing your experience...</div>;
  }

  return (
    <>
      <div className="gallery-root" onClick={goToServices}>
        
        {/* IMAGE CROSSFADE */}
        <AnimatePresence>
          {prevIndex !== null && (
            <motion.div
              key={`prev-${prevIndex}-${index}`}
              className="gallery-layer"
              style={{ backgroundImage: `url(${images[prevIndex]})` }}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 1.03 }}
              exit={{ opacity: 0 }}
              transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
            />
          )}

          <motion.div
            key={`current-${index}`}
            className="gallery-layer"
            style={{ backgroundImage: `url(${images[index]})` }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* TEXT CROSSFADE (THIS FIXES SNAPPING) */}
        <div className="gallery-overlay">
          <div className="gallery-overlay-backdrop" />

          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="gallery-text"
            >
              {overlayTexts[index]}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>

      <audio ref={audioRef} loop />
    </>
  );
}