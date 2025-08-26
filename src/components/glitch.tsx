"use client";

import { useEffect, useState } from "react";

interface FlickerTextProps {
  text: string;
  fontSize?: number;
  color?: string;
  flickerSpeed?: number; // in ms
}

export default function FlickerText({
  text,
  fontSize = 48,
  color = "#00ff99",
  flickerSpeed = 120,
}: FlickerTextProps) {
  const [opacity, setOpacity] = useState(1);
  const [jitter, setJitter] = useState(0);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Flicker opacity
      setOpacity(Math.random() > 0.8 ? 0.6 : 1);

      // Random jitter
      if (Math.random() > 0.9) {
        setJitter((Math.random() - 0.5) * 4); // shift between -2px to 2px
      } else {
        setJitter(0);
      }

      // Occasionally trigger glitch
      setGlitch(Math.random() > 0.92);
    }, flickerSpeed);

    return () => clearInterval(interval);
  }, [flickerSpeed]);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        fontFamily: "'Press Start 2P', monospace",
        fontSize,
        textTransform: "uppercase",
        opacity,
        transition:
          "opacity 0.1s ease-in-out, transform 0.05s ease-in-out",
        transform: `translateX(${jitter}px)`,
        color, // base color
      }}
    >
      {/* Base text */}
      <span
        style={{
          position: "relative",
          zIndex: 2,
          textShadow: "0 0 4px #0f0, 0 0 8px #0f0", // glow
        }}
      >
        {text}
      </span>

      {/* Glitch RGB layers */}
      {glitch && (
        <>
          <span
            style={{
              position: "absolute",
              top: 0,
              left: "2px",
              color: "red",
              zIndex: 1,
              opacity: 0.7,
            }}
          >
            {text}
          </span>
          <span
            style={{
              position: "absolute",
              top: 0,
              left: "-2px",
              color: "blue",
              zIndex: 1,
              opacity: 0.7,
            }}
          >
            {text}
          </span>
        </>
      )}

      {/* Scanline overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0px,
            rgba(0, 0, 0, 0) 2px,
            rgba(0, 0, 0, 0.25) 3px
          )`,
          pointerEvents: "none",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
