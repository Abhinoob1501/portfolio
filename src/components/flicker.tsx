"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";

interface FlickerTextProps {
  text: string;
  fontSize?: number; // px
  color?: string; // base text color
  flickerSpeed?: number; // ms between state changes
  jitterMax?: number; // px
}

/**
 * Pixel CRT-style flicker text with scanlines + RGB glitch.
 * - Text-only (no fullscreen flashes)
 * - Scanlines live *inside* the text and animate
 * - Random opacity flicker + horizontal jitter
 * - Occasional RGB split (red/blue ghosts)
 *
 * Drop-in for Next.js. Save as FlickerText.tsx
 */
export default function Flicker({
  text,
  fontSize = 64,
  color = "#00ff99",
  flickerSpeed = 120,
  jitterMax = 2,
}: FlickerTextProps) {
  const [dim, setDim] = useState(false);
  const [jitter, setJitter] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [scanOpacity, setScanOpacity] = useState(0.25);

  // unique id in case multiple instances exist on a page
  const uid = useId().replace(/[:]/g, "");

  // derive a soft glow color from the base color
  const glow = useMemo(() => color, [color]);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1) flicker brightness
      const isDim = Math.random() > 0.8;
      setDim(isDim);

      // make scanlines stronger when dimming
      setScanOpacity(isDim ? 0.4 : 0.22);

      // 2) horizontal jitter (CRT desync)
      if (Math.random() > 0.9) {
        setJitter((Math.random() * 2 - 1) * jitterMax); // ±jitterMax px
      } else {
        setJitter(0);
      }

      // 3) occasional RGB glitch split
      setGlitch(Math.random() > 0.92);
    }, flickerSpeed);

    return () => clearInterval(interval);
  }, [flickerSpeed, jitterMax]);

  // Inline styles for the container
  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
    fontFamily: "'Press Start 2P', monospace",
    fontSize,
    textTransform: "uppercase",
    color,
    transform: `translateX(${jitter}px)`,
    transition: "transform 40ms ease-out",
    // Subtle outer glow using text-shadow
    textShadow: `0 0 4px ${glow}, 0 0 8px ${glow}`,
    opacity: dim ? 0.7 : 1,
  };

  return (
    <div className={`crt-${uid}`} style={containerStyle}>
      {/* Base text */}
      <span className="text-layer">{text}</span>

      {/* RGB glitch ghosts (only shown when glitch=true) */}
      {glitch && (
        <>
          <span className="ghost red">{text}</span>
          <span className="ghost blue">{text}</span>
        </>
      )}

      {/* Scanline overlay clipped to text using ::after and mix with opacity */}
      <span className="scanline" aria-hidden="true" />

      {/* Component-scoped styles */}
      <style jsx>{`
        .crt-${uid} {
          position: relative;
        }
        .text-layer {
          position: relative;
          z-index: 2;
          will-change: opacity, transform;
        }
        .ghost {
          position: absolute;
          inset: 0 auto auto 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.7;
          filter: saturate(140%);
        }
        .ghost.red { color: #ff3b3b; transform: translateX(2px); }
        .ghost.blue { color: #4db2ff; transform: translateX(-2px); }

        /* Scanlines: repeating gradient that scrolls vertically */
        .scanline {
          position: absolute;
          pointer-events: none;
          inset: 0;
          z-index: 3;
          /* Use a semi-transparent dark stripe to simulate CRT lines */
          background: repeating-linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0px,
            rgba(0, 0, 0, 0) 2px,
            rgba(0, 0, 0, ${scanOpacity}) 3px
          );
          animation: scan-${uid} 4s linear infinite;
        }

        @keyframes scan-${uid} {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
}
