'use client';

import React, { useRef, useEffect, ReactNode, useState } from 'react';

interface FastMarqueeProps {
  children: ReactNode;
  speed?: number; // pixels per second
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
  gradient?: boolean;
  gradientColor?: string;
}

const FastMarquee: React.FC<FastMarqueeProps> = ({
  children,
  speed = 50,
  direction = 'left',
  pauseOnHover = false,
  className = '',
  gradient = true,
  gradientColor = 'black'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    
    if (!container || !wrapper) return;

    // Clear any existing content
    wrapper.innerHTML = '';

    // Create the content element
    const contentElement = document.createElement('div');
    contentElement.className = 'marquee-content inline-block';
    contentElement.innerHTML = container.querySelector('.temp-content')?.innerHTML || '';
    
    // Clone for seamless loop
    const clone = contentElement.cloneNode(true) as HTMLElement;
    clone.className = 'marquee-content marquee-clone inline-block';

    wrapper.appendChild(contentElement);
    wrapper.appendChild(clone);

    const contentWidth = contentElement.offsetWidth;
    const duration = contentWidth / speed;

    // Set CSS custom properties for animation
    wrapper.style.setProperty('--marquee-duration', `${duration}s`);
    wrapper.style.setProperty('--content-width', `${contentWidth}px`);

    return () => {
      if (wrapper) {
        wrapper.innerHTML = '';
      }
    };
  }, [speed, direction, children]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsHovered(false);
    }
  };

  return (
    <div
      className={`relative overflow-hidden whitespace-nowrap ${className}`}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        maskImage: gradient 
          ? `linear-gradient(to right, transparent, ${gradientColor} 10%, ${gradientColor} 90%, transparent)`
          : undefined,
        WebkitMaskImage: gradient 
          ? `linear-gradient(to right, transparent, ${gradientColor} 10%, ${gradientColor} 90%, transparent)`
          : undefined,
      }}
    >
      {/* Hidden temp content for measurement */}
      <div className="temp-content absolute opacity-0 pointer-events-none">
        {children}
      </div>
      
      {/* Animated wrapper */}
      <div
        ref={wrapperRef}
        className={`marquee-wrapper ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{
          animationDuration: 'var(--marquee-duration)',
          animationPlayState: isHovered ? 'paused' : 'running',
        }}
      />
    </div>
  );
};

export default FastMarquee;
