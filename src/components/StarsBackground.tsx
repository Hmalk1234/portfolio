import React, { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  pulseSpeed: number;
}

interface Comet {
  id: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
}

export default function StarsBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [comets, setComets] = useState<Comet[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate 150 randomized stars for richer starry vault
    const generatedStars: Star[] = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      pulseSpeed: Math.random() * 4 + 2, // pulsing duration in seconds
    }));
    setStars(generatedStars);

    // Generate comets
    const generatedComets: Comet[] = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      top: Math.random() * 50,
      left: Math.random() * 80,
      delay: Math.random() * 20,
      duration: Math.random() * 4 + 4,
    }));
    setComets(generatedComets);

    // Track mouse to perform smooth interactive nebula parallax
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 35, // scale factor for smooth movement
        y: (e.clientY / window.innerHeight - 0.5) * 35,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#020203] select-none pointer-events-none">
      {/* Tactical Deep-Space Grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)] opacity-30" 
      />

      {/* Dynamic Cosmic Nebular Dust Gradients (Parallax Responsive) */}
      <div 
        className="absolute top-1/4 left-1/4 w-[70vw] h-[70vw] max-w-[850px] rounded-full filter blur-[140px] opacity-25 transition-transform duration-1000 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(147,197,253,0.12) 0%, rgba(139,92,246,0.04) 50%, rgba(0,0,0,0) 75%)',
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[75vw] h-[75vw] max-w-[950px] rounded-full filter blur-[170px] opacity-20 transition-transform duration-1000 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(251,146,60,0.08) 0%, rgba(236,72,153,0.03) 45%, rgba(0,0,0,0) 70%)',
          transform: `translate(${-mousePos.x * 0.8}px, ${-mousePos.y * 0.8}px)`,
        }}
      />

      {/* Star Field */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white transition-opacity"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `pulse ${star.pulseSpeed}s infinite ease-in-out`,
          }}
        />
      ))}

      {/* Shooting Stars / Comets */}
      {comets.map((comet) => (
        <div
          key={comet.id}
          className="absolute w-[120px] h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent rotate-[-35deg]"
          style={{
            top: `${comet.top}%`,
            left: `${comet.left}%`,
            animation: `shoot ${comet.duration}s infinite linear`,
            animationDelay: `${comet.delay}s`,
            opacity: 0,
          }}
        />
      ))}

      {/* Ambient scanning light beams */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent animate-scan z-0" />

      {/* Extra Twinkling and Shooting Stars CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 0.95; transform: scale(1.2); }
        }
        @keyframes shoot {
          0% {
            transform: translate(-100px, -100px) rotate(-35deg);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          10% {
            transform: translate(250px, 175px) rotate(-35deg);
            opacity: 0;
          }
          100% {
            transform: translate(250px, 175px) rotate(-35deg);
            opacity: 0;
          }
        }
        @keyframes scan {
          0% { top: -10%; }
          50% { top: 110%; }
          100% { top: -10%; }
        }
        .animate-scan {
          animation: scan 16s infinite linear;
        }
      `}</style>
    </div>
  );
}
