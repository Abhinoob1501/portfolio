"use client";

import { useEffect, useRef } from "react";

interface VerticalRainProps {
  disable?: boolean;
  intensity?: number; // Number of impact points to spawn
  colors?: string[]; // Array of colors for the impact points
}

class RainImpact {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  rippleRadius: number;
  maxRippleRadius: number;
  rippleSpeed: number;
  fadeDelay: number;
  initialAlpha: number;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    // More realistic drop size distribution - most drops are small, few are large
    const sizeRandom = Math.random();
    if (sizeRandom < 0.7) {
      this.size = Math.random() * 1.5 + 0.5; // 70% small drops (0.5-2px)
    } else if (sizeRandom < 0.95) {
      this.size = Math.random() * 2 + 2; // 25% medium drops (2-4px)
    } else {
      this.size = Math.random() * 2 + 4; // 5% large drops (4-6px)
    }
    
    this.color = color;
    this.initialAlpha = Math.random() * 0.25 + 0.3; // 0.3-0.55 for more subtle natural look
    this.alpha = this.initialAlpha;
    
    // Ripple size should correlate with drop size for realism
    const sizeMultiplier = this.size / 3; // Normalize size to 0.17-2.0 range
    this.maxRippleRadius = (Math.random() * 60 + 40) * sizeMultiplier + 30; // 30-130 pixels based on drop size
    this.rippleSpeed = Math.random() * 0.2 + 0.5; // 0.5-0.7 more natural ripple expansion
    this.maxLife = Math.random() * 80 + 60 + (sizeMultiplier * 40); // Larger drops last longer
    this.life = this.maxLife;
    this.rippleRadius = 0;
    this.fadeDelay = Math.random() * 30 + 20 + (sizeMultiplier * 20); // Larger drops fade slower
  }

  update() {
    // Update life
    this.life--;
    const lifeRatio = this.life / this.maxLife;
    
    // More natural fade curve - slower at start, faster at end
    if (this.life < this.maxLife - this.fadeDelay) {
      const fadeProgress = 1 - ((this.life - (this.maxLife - this.fadeDelay)) / (this.maxLife - this.fadeDelay));
      // Exponential fade for more natural look
      const fadeMultiplier = Math.pow(fadeProgress, 1.5);
      this.alpha = Math.max(0, this.initialAlpha * (1 - fadeMultiplier));
    }
    
    // More realistic ripple expansion - starts slow, accelerates, then slows
    const progress = 1 - lifeRatio;
    const easedProgress = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 2) / 2; // Ease-in-out curve
    
    this.rippleRadius = Math.min(
      easedProgress * this.maxRippleRadius * this.rippleSpeed,
      this.maxRippleRadius
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.alpha;
    
    // Draw the main impact point with size-dependent intensity
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Subtle glow effect only for larger drops
    if (this.alpha > 0.2 && this.size > 2) {
      ctx.globalAlpha = this.alpha * 0.15;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw ripple effect with natural opacity curve - darker ripples
    if (this.rippleRadius > 1) {
      const rippleProgress = this.rippleRadius / this.maxRippleRadius;
      const rippleAlpha = this.alpha * (1 - rippleProgress * 0.6) * 0.9; // Even darker, more prominent ripples
      
      ctx.strokeStyle = this.color;
      ctx.lineWidth = Math.max(0.2, (1 - rippleProgress) * (this.size * 0.5 + 0.5)); // Size-dependent line width
      ctx.globalAlpha = rippleAlpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.rippleRadius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Secondary inner ripple for larger impacts only - also darker
      if (this.rippleRadius > 20 && this.size > 3) {
        const innerRippleAlpha = rippleAlpha * 0.75; // Increased from 0.6 to 0.75 for even darker inner ripple
        const innerRadius = this.rippleRadius * 0.65;
        ctx.globalAlpha = innerRippleAlpha;
        ctx.lineWidth = Math.max(0.1, (1 - rippleProgress) * 0.4);
        ctx.beginPath();
        ctx.arc(this.x, this.y, innerRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }

  isDead(): boolean {
    return this.life <= 0 || this.alpha <= 0.01;
  }
}

export default function VerticalRain({
  disable = false,
  intensity = 8, // Balanced intensity for natural rain
  colors = [
    "rgba(174, 194, 224, 1)", // Light blue
    "rgba(100, 200, 255, 1)", // Cyan
    "rgba(200, 220, 255, 1)", // Very light blue
    "rgba(150, 180, 255, 1)", // Blue
  ],
}: VerticalRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const impacts = useRef<RainImpact[]>([]);
  const lastSpawnTime = useRef<number>(0);
  const windOffset = useRef<number>(0);
  const rainIntensityModifier = useRef<number>(1);

  useEffect(() => {
    if (disable) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationStopped = false;

    function spawnImpacts(currentTime: number) {
      if (!canvas) return;
      
      // Simulate natural rain intensity variations - bursts and lulls
      const intensityWave = Math.sin(currentTime * 0.001) * 0.3 + 0.7; // 0.4-1.0 intensity wave
      const burstChance = Math.random();
      if (burstChance < 0.05) {
        rainIntensityModifier.current = Math.random() * 1.5 + 1.2; // 5% chance of rain burst
      } else if (burstChance < 0.15) {
        rainIntensityModifier.current = Math.random() * 0.4 + 0.3; // 10% chance of lull
      } else {
        rainIntensityModifier.current += (1 - rainIntensityModifier.current) * 0.02; // Gradual return to normal
      }
      
      // Simulate subtle wind effect
      windOffset.current += (Math.random() - 0.5) * 0.3;
      windOffset.current *= 0.98; // Wind dampening
      windOffset.current = Math.max(-30, Math.min(30, windOffset.current));
      
      // Natural rain timing with more variation
      const baseInterval = 70 + Math.sin(currentTime * 0.002) * 20; // 50-90ms with natural variation
      const randomVariation = Math.random() * 60; // 0-60ms additional variation
      const spawnInterval = (baseInterval + randomVariation) / rainIntensityModifier.current;
      
      if (currentTime - lastSpawnTime.current > spawnInterval) {
        // Natural clustering patterns - rain tends to come in sheets
        const naturalIntensity = intensity * intensityWave * rainIntensityModifier.current;
        let spawnCount = Math.floor(naturalIntensity);
        
        // Occasional bursts or clusters
        const clusterChance = Math.random();
        if (clusterChance < 0.2) {
          spawnCount = Math.floor(naturalIntensity * (Math.random() * 1.8 + 0.8)); // 20% chance for natural clustering
        }
        
        for (let i = 0; i < spawnCount; i++) {
          if (impacts.current.length < 120) { // Reasonable limit for natural rain
            let x, y;
            
            // More natural distribution patterns
            if (impacts.current.length > 0 && Math.random() < 0.2) {
              // 20% chance to spawn near existing impact (natural clustering)
              const nearbyImpact = impacts.current[Math.floor(Math.random() * Math.min(8, impacts.current.length))];
              const clusterRadius = Math.random() * 100 + 50; // 50-150px natural cluster radius
              const angle = Math.random() * Math.PI * 2;
              x = nearbyImpact.x + Math.cos(angle) * clusterRadius + windOffset.current;
              y = nearbyImpact.y + Math.sin(angle) * clusterRadius;
            } else {
              // Natural rain distribution across screen with wind effect
              x = Math.random() * canvas.width + windOffset.current;
              y = Math.random() * canvas.height;
            }
            
            // Ensure drops stay within screen bounds (accounting for wind)
            x = Math.max(-20, Math.min(canvas.width + 20, x));
            y = Math.max(0, Math.min(canvas.height, y));
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            impacts.current.push(new RainImpact(x, y, color));
          }
        }
        lastSpawnTime.current = currentTime;
      }
    }

    function animate(currentTime: number) {
      if (animationStopped || !canvas || !ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      // Spawn new impact points
      spawnImpacts(currentTime);

      // Update and draw impact points
      for (let i = impacts.current.length - 1; i >= 0; i--) {
        const impact = impacts.current[i];
        impact.update();

        // Remove dead impacts
        if (impact.isDead()) {
          impacts.current.splice(i, 1);
          continue;
        }

        impact.draw(ctx);
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      animationStopped = true;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
      impacts.current = [];
    };
  }, [disable, intensity, colors]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      style={{ background: "transparent" }}
    />
  );
}
