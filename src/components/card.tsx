"use client";

import { useState, useEffect } from "react";

interface CardProps {
  title: string;
  description: string;
  borderColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: string;
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  flickering?: boolean;
}

export default function Card({ 
  title, 
  description, 
  borderColor = 'border-green-600',
  titleColor = 'text-cyan-400',
  descriptionColor = 'text-green-300',
  size = 'md',
  className = '',
  icon,
  href,
  onClick,
  children,
  flickering = false
}: CardProps) {
  const sizeClasses = {
    sm: 'p-3 text-sm',
    md: 'p-4',
    lg: 'p-6 text-lg',
  };

  // Flicker effect state
  const [isFlickering, setIsFlickering] = useState(false);
  const [flickerIntensity, setFlickerIntensity] = useState(1);

  useEffect(() => {
    if (!flickering) return;

    const flickerInterval = setInterval(() => {
      const shouldFlicker = Math.random() < 0.8; // 80% chance for occasional flickering
      setIsFlickering(shouldFlicker);
      
      if (shouldFlicker) {
        // Random flicker intensity for more realistic effect
        setFlickerIntensity(0.1 + Math.random() * 0.2);
        setTimeout(() => {
          setIsFlickering(false);
          setFlickerIntensity(1);
        }, 30 + Math.random() * 100);
      }
    }, 100 + Math.random() * 300); // Random timing for natural flicker

    return () => clearInterval(flickerInterval);
  }, [flickering]);

  // Map border colors to glow colors
  const glowColorMap: { [key: string]: string } = {
    'border-green-600': '#10b981',
    'border-green-500': '#10b981', 
    'border-cyan-500': '#06b6d4',
    'border-purple-500': '#8b5cf6',
    'border-yellow-500': '#eab308',
    'border-red-500': '#ef4444',
    'border-blue-500': '#3b82f6',
    'border-pink-500': '#ec4899',
    // Light broken/faded neon colors
    'border-green-200': '#86efac',     // Faded light green
    'border-green-300': '#6ee7b7',     // Slightly faded green
    'border-cyan-200': '#a5f3fc',      // Faded light cyan
    'border-cyan-300': '#67e8f9',      // Slightly faded cyan
    'border-purple-200': '#e9d5ff',    // Faded light purple
    'border-purple-300': '#d8b4fe',    // Slightly faded purple
    'border-yellow-200': '#fef3c7',    // Faded light yellow
    'border-yellow-300': '#fde68a',    // Slightly faded yellow
    'border-red-200': '#fecaca',       // Faded light red
    'border-red-300': '#fca5a5',       // Slightly faded red
    'border-blue-200': '#bfdbfe',      // Faded light blue
    'border-blue-300': '#93c5fd',      // Slightly faded blue
    // Dull/broken neon colors for authentic retro look
    'border-green-800': '#065f46',     // Dull dark green
    'border-green-900': '#064e3b',     // Very dull green
    'border-cyan-800': '#155e75',      // Dull dark cyan
    'border-cyan-900': '#164e63',      // Very dull cyan
    'border-purple-800': '#6b21a8',    // Dull dark purple
    'border-purple-900': '#581c87',    // Very dull purple
    'border-yellow-800': '#92400e',    // Dull dark yellow/amber
    'border-yellow-900': '#78350f',    // Very dull yellow/amber
    'border-red-800': '#991b1b',       // Dull dark red
    'border-red-900': '#7f1d1d',       // Very dull red
    'border-blue-800': '#1e40af',      // Dull dark blue
    'border-blue-900': '#1e3a8a',      // Very dull blue
    'border-gray-600': '#4b5563',      // Dull gray
    'border-gray-700': '#374151',      // Darker dull gray
    'border-gray-800': '#1f2937',      // Very dark gray
    'border-orange-800': '#9a3412',    // Dull dark orange
    'border-orange-900': '#7c2d12',    // Very dull orange
  };

  const getGlowColor = (borderColor: string) => {
    return glowColorMap[borderColor] || '#10b981'; // Default to green
  };

  const glowColor = getGlowColor(borderColor);
  
  // Calculate current opacity based on flicker state
  const currentOpacity = flickering ? (isFlickering ? flickerIntensity : 1) : 1;
  
  // Enhanced glow values for better flicker visibility
  const getGlowStyle = () => ({
    boxShadow: `
      0 0 12px ${glowColor}${Math.round(100 * currentOpacity).toString(16).padStart(2, '0')},
      0 0 24px ${glowColor}${Math.round(80 * currentOpacity).toString(16).padStart(2, '0')},
      0 0 36px ${glowColor}${Math.round(60 * currentOpacity).toString(16).padStart(2, '0')},
      0 0 48px ${glowColor}${Math.round(40 * currentOpacity).toString(16).padStart(2, '0')},
      0 0 60px ${glowColor}${Math.round(20 * currentOpacity).toString(16).padStart(2, '0')},
      inset 0 0 12px ${glowColor}${Math.round(50 * currentOpacity).toString(16).padStart(2, '0')}
    `,
    transition: flickering ? "box-shadow 0.1s ease-out" : "none",
  });

  if (href) {
    return (
      <a href={href} className="block">
        <div 
          className={`border-4 ${borderColor} ${sizeClasses[size]} rounded bg-gray-900/50 pixelify-font ${className}`}
          style={getGlowStyle()}
        >
          <h3 className={`${titleColor} font-bold mb-2 flex items-center gap-2 pixelify-font tracking-wider`}>
            {icon && <span>{icon}</span>}
            {title}
          </h3>
          <p className={`${descriptionColor} ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'} pixelify-font leading-relaxed tracking-wide`}>
            {description}
          </p>
          {children && (
            <div className="mt-3 pixelify-font">
              {children}
            </div>
          )}
        </div>
      </a>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="block w-full text-left">
        <div 
          className={`border-4 ${borderColor} ${sizeClasses[size]} rounded bg-gray-900/50 pixelify-font ${className}`}
          style={getGlowStyle()}
        >
          <h3 className={`${titleColor} font-bold mb-2 flex items-center gap-2 pixelify-font tracking-wider`}>
            {icon && <span>{icon}</span>}
            {title}
          </h3>
          <p className={`${descriptionColor} ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'} pixelify-font leading-relaxed tracking-wide`}>
            {description}
          </p>
          {children && (
            <div className="mt-3 pixelify-font">
              {children}
            </div>
          )}
        </div>
      </button>
    );
  }

  return (
    <div 
      className={`border-4 ${borderColor} ${sizeClasses[size]} rounded bg-gray-900/50 pixelify-font ${className}`}
      style={getGlowStyle()}
    >
      <h3 className={`${titleColor} font-bold mb-2 flex items-center gap-2 pixelify-font tracking-wider`}>
        {icon && <span>{icon}</span>}
        {title}
      </h3>
      <p className={`${descriptionColor} ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'} pixelify-font leading-relaxed tracking-wide`}>
        {description}
      </p>
      {children && (
        <div className="mt-3 pixelify-font">
          {children}
        </div>
      )}
    </div>
  );
}
