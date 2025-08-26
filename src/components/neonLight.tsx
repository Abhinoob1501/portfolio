"use client";

import { useState, useEffect } from "react";

interface NeonLightProps {
  svg: string;
  color?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  flickering?: boolean;
  className?: string;
}

export default function NeonLight({
  svg,
  color = "pink",
  size = "lg",
  flickering = true,
  className = "",
}: NeonLightProps) {
  const [isFlickering, setIsFlickering] = useState(false);
  const [flickerIntensity, setFlickerIntensity] = useState(1);

  useEffect(() => {
    if (!flickering) return;

    const flickerInterval = setInterval(() => {
      const shouldFlicker = Math.random() < 0.8; // 80% chance for very frequent flickering
      setIsFlickering(shouldFlicker);
      
      if (shouldFlicker) {
        // Random flicker intensity for more realistic effect
        setFlickerIntensity(0.5 + Math.random() * 0.8);
        setTimeout(() => {
          setIsFlickering(false);
          setFlickerIntensity(1);
        }, 30 + Math.random() * 100);
      }
    }, 100 + Math.random() * 300); // Very frequent timing like real faulty lights

    return () => clearInterval(flickerInterval);
  }, [flickering]);

  const colorVariants = {
    pink: {
      main: "text-pink-300",
      glow: "#fce7f3",
      shadow: "#f9a8d4",
    },
    cyan: {
      main: "text-cyan-300", 
      glow: "#ecfeff",
      shadow: "#67e8f9",
    },
    orange: {
      main: "text-orange-300",
      glow: "#fff7ed", 
      shadow: "#fdba74",
    },
    green: {
      main: "text-green-300",
      glow: "#f0fdf4",
      shadow: "#86efac",
    },
    purple: {
      main: "text-purple-300",
      glow: "#faf5ff",
      shadow: "#d8b4fe",
    },
    red: {
      main: "text-red-300",
      glow: "#fef2f2",
      shadow: "#fca5a5",
    },
  };

  const sizeVariants = {
    xs: "w-48 h-12",
    sm: "w-64 h-16",
    md: "w-80 h-20",
    lg: "w-96 h-24",
    xl: "w-[32rem] h-32",
  };

  const currentColor = colorVariants[color as keyof typeof colorVariants] || colorVariants.pink;
  const currentOpacity = isFlickering ? flickerIntensity : 1;

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Background glow for depth */}
      <div 
        className={`absolute inset-0 ${currentColor.main} ${sizeVariants[size]} blur-xs`}
        style={{
          opacity: currentOpacity * 0.3,
          filter: `drop-shadow(0 0 4px ${currentColor.glow}) drop-shadow(0 0 8px ${currentColor.glow}) drop-shadow(0 0 12px ${currentColor.glow})`,
          transition: "opacity 0.05s ease-out",
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
        aria-hidden="true"
      />

      {/* Main neon SVG with pixel overlay */}
      <div className="relative">
        <div 
          className={`relative ${currentColor.main} ${sizeVariants[size]}`}
          style={{
            opacity: currentOpacity,
            filter: `drop-shadow(0 0 2px ${currentColor.glow}) drop-shadow(0 0 4px ${currentColor.glow}) drop-shadow(0 0 6px ${currentColor.glow}) drop-shadow(0 0 8px ${currentColor.shadow}) drop-shadow(0 0 10px ${currentColor.shadow}) ${isFlickering ? 'brightness(0.7) contrast(1.2)' : 'brightness(1)'}`,
            transition: "opacity 0.05s ease-out",
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        {/* Pixel flicker overlay only on main SVG */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.2) 50%)',
            backgroundSize: '100% 4px',
            zIndex: 2,
            animation: 'pixelFlicker 0.2s infinite alternate',
          }}
        />
      </div>

      {/* Subtle outer glow for Japanese neon effect */}
      <div 
        className={`absolute inset-0 ${currentColor.main} ${sizeVariants[size]} opacity-30`}
        style={{
          opacity: currentOpacity * 0.15,
          filter: `drop-shadow(0 0 10px ${currentColor.glow}) drop-shadow(0 0 16px ${currentColor.shadow})`,
          transition: "opacity 0.05s ease-out",
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
        aria-hidden="true"
      />

      {/* Add keyframe animation using a style tag */}
      <style jsx global>{`
        @keyframes pixelFlicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}