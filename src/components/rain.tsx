"use client";

import { useEffect, useRef } from "react";

interface RainEffectProps {
  disable?: boolean;
  withThunder?: boolean;
}

class RainDrop {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export default function RainEffect({
  disable = false,
  withThunder = false,
}: RainEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rainAudioRef = useRef<HTMLAudioElement>(null);
  const thunderAudioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number | null>(null);
  const rainDrops = useRef<RainDrop[]>([]);

  useEffect(() => {
    if (disable) return;

    const c = canvasRef.current;
    if (!c) return;

    const ctx = c.getContext("2d");
    if (!ctx) return;

    c.width = window.innerWidth;
    c.height = window.innerHeight;

    let rainStopped = false;
    let defaultLength = 50;
    let defaultSpeed = 27;
    let angle = (90 * Math.PI) / 180;
    let angleSin = Math.sin(angle);
    let angleCos = Math.cos(angle);

    function newDrop() {
      if (rainDrops.current.length > 350 || !c) return;
      rainDrops.current.push(new RainDrop(Math.random() * c.width, -40 - 100 * Math.random()));
    }

    // spawn drops
    const spawnInterval = setInterval(newDrop, 40);

    function updateRain() {
      if (rainStopped || !c || !ctx) return;
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.beginPath();

      for (let i = rainDrops.current.length - 1; i >= 0; i--) {
        const drop = rainDrops.current[i];
        drop.x += defaultSpeed * angleCos;
        drop.y += defaultSpeed * angleSin;

        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - defaultLength * angleCos, drop.y - defaultLength * angleSin);

        if (drop.y > c.height + 100) {
          rainDrops.current.splice(i, 1);
        }
      }

      ctx.strokeStyle = "rgba(174, 194, 224, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animationRef.current = requestAnimationFrame(updateRain);
    }

    // Thunder effect
    let thunderInterval: NodeJS.Timeout | null = null;
    
    if (withThunder) {
      function triggerThunder() {
        const thunderChance = Math.random();
        if (thunderChance < 0.1 && c) { // 2% chance every frame
          // Flash effect
          c.style.background = "rgba(255, 255, 255, 0.8)";
          setTimeout(() => {
            if (c) {
              c.style.background = "transparent";
            }
          }, 100);

          // Thunder sound would go here if you have audio files
          // if (thunderAudioRef.current) {
          //   thunderAudioRef.current.play();
          // }
        }
      }

      thunderInterval = setInterval(triggerThunder, 3000 + Math.random() * 7000);
    }

    updateRain();

    const handleResize = () => {
      if (!c) return;
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      rainStopped = true;
      clearInterval(spawnInterval);
      if (thunderInterval) {
        clearInterval(thunderInterval);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [disable, withThunder]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ background: "black" }}
      />
      {/* Audio elements for sound effects - you'll need to add audio files */}
      {/* <audio ref={rainAudioRef} loop>
        <source src="/rain-sound.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={thunderAudioRef}>
        <source src="/thunder-sound.mp3" type="audio/mpeg" />
      </audio> */}
    </>
  );
}
