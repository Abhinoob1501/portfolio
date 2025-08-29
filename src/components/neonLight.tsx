"use client";

import { useState, useEffect } from "react";

interface NeonLightProps {
  svg: string;
  color?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "narrow" | "uniform" | "uniform-sm" | "uniform-lg";
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
    xs: "max-w-48 h-auto",
    sm: "max-w-64 h-auto",
    md: "max-w-80 h-auto",
    lg: "max-w-96 h-auto",
    xl: "max-w-[32rem] h-auto",
    narrow: "w-32 h-auto", // For narrow/tall SVGs like single letters
    uniform: "h-16 w-auto", // Uniform height for all SVGs (medium size)
    "uniform-sm": "h-12 w-auto", // Smaller uniform height
    "uniform-lg": "h-20 w-auto", // Larger uniform height
  };

  const currentColor = colorVariants[color as keyof typeof colorVariants] || colorVariants.pink;
  const currentOpacity = isFlickering ? flickerIntensity : 1;
  
  // For uniform sizing, we need to ensure SVG fills the container completely
  const isUniform = size?.includes('uniform');
  const svgClasses = isUniform 
    ? '[&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-none [&>svg]:max-h-none' 
    : '[&>svg]:w-full [&>svg]:h-auto';

  return (
    <div className={`relative inline-block ${sizeVariants[size]} ${className}`}>
      {/* Background glow for depth */}
      <div 
        className={`absolute inset-0 ${currentColor.main} blur-xs ${svgClasses}`}
        style={{
          opacity: currentOpacity * 0.3,
          filter: `drop-shadow(0 0 4px ${currentColor.glow}) drop-shadow(0 0 8px ${currentColor.glow}) drop-shadow(0 0 12px ${currentColor.glow})`,
          transition: "opacity 0.05s ease-out",
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
        aria-hidden="true"
      />

      {/* Main neon SVG with pixel overlay */}
      <div className="relative w-full h-full">
        <div 
          className={`relative ${currentColor.main} w-full h-full ${svgClasses}`}
          style={{
            opacity: currentOpacity,
            filter: `drop-shadow(0 0 2px ${currentColor.glow}) drop-shadow(0 0 4px ${currentColor.glow}) drop-shadow(0 0 6px ${currentColor.glow}) drop-shadow(0 0 8px ${currentColor.shadow}) drop-shadow(0 0 10px ${currentColor.shadow}) ${isFlickering ? 'brightness(0.7) contrast(1.2)' : 'brightness(1)'}`,
            transition: "opacity 0.05s ease-out",
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        {/* Horizontal scanline overlay for retro CRT effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 1px,
              rgba(0,0,0,0.1) 1px,
              rgba(0,0,0,0.1) 2px
            )`,
            backgroundSize: '100% 4px',
            zIndex: 2,
            opacity: isFlickering ? 0.6 : 0.3,
            animation: isFlickering ? 'pixelFlicker 0.1s infinite alternate' : 'none',
            transition: "opacity 0.05s ease-out",
          }}
        />
        {/* Additional glow enhancement */}
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-soft-light"
          style={{
            background: `linear-gradient(to bottom, transparent 30%, ${currentColor.shadow}10 50%, transparent 70%)`,
            opacity: isFlickering ? 0.4 : 0.2,
            transition: "opacity 0.05s ease-out",
          }}
        />
      </div>

      {/* Subtle outer glow for Japanese neon effect */}
      <div 
        className={`absolute inset-0 ${currentColor.main} opacity-30 ${svgClasses}`}
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
          0% { opacity: 1; }
          25% { opacity: 0.8; }
          50% { opacity: 0.9; }
          75% { opacity: 0.7; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}