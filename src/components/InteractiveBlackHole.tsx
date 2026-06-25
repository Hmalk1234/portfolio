import React, { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  baseRadius: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
  opacity: number;
}

interface InteractiveBlackHoleProps {
  massMultiplier?: number;
  speedMultiplier?: number;
}

export default function InteractiveBlackHole({
  massMultiplier = 1.0,
  speedMultiplier = 1.0,
}: InteractiveBlackHoleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const [clickForce, setClickForce] = useState(false);

  // Dynamic values stored as high-performance refs to keep the render loop fluid without resetting particle array
  const massRef = useRef(massMultiplier);
  const speedRef = useRef(speedMultiplier);

  useEffect(() => {
    massRef.current = massMultiplier;
    speedRef.current = speedMultiplier;
  }, [massMultiplier, speedMultiplier]);

  // 3D rotation angles
  const rotX = useRef(0.5); // Tilt angle
  const rotY = useRef(0.2); // Spin angle
  const rotXVel = useRef(0);
  const rotYVel = useRef(0.015); // Constant auto-rotation velocity

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = 450);
    let height = (canvas.height = 450);

    // Particle pool
    const particles: Particle[] = [];
    const particleCount = 240;

    // Generate accretion disk particles
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 140 + 45; // Accretion disk span
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.015 + Math.random() * 0.02) * (1 - radius / 220); // Faster close to singularity
      
      // Black hole colors: orange, red, hot white, and cosmic violet
      let color = '255, 110, 40'; // Hot orange
      const rand = Math.random();
      if (rand < 0.25) {
        color = '255, 60, 60'; // Fire red
      } else if (rand < 0.5) {
        color = '255, 230, 180'; // Creamy hot white
      } else if (rand < 0.7) {
        color = '160, 80, 255'; // Deep violet
      }

      particles.push({
        x: 0,
        y: 0,
        z: 0,
        baseRadius: radius,
        angle: angle,
        speed: speed,
        size: Math.random() * 2.5 + 0.8,
        color: color,
        opacity: Math.random() * 0.6 + 0.4,
      });
    }

    // Handles container resize bounds safely
    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width * (window.devicePixelRatio || 1);
      height = canvas.height = rect.height * (window.devicePixelRatio || 1);
    };
    
    // Setup initial size
    handleResize();
    const resizeObserver = new ResizeObserver(() => handleResize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Interactive loops
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const singularityRadius = Math.min(width, height) * 0.09 * massRef.current;

      // Apply Inertia to Rotations
      rotX.current += rotXVel.current;
      rotY.current += rotYVel.current;

      // Friction / Drag slowing down rotation
      if (!isDragging.current) {
        rotXVel.current *= 0.94;
        rotYVel.current = rotYVel.current * 0.96 + 0.002; // return to slow resting spin
      } else {
        rotXVel.current *= 0.8;
        rotYVel.current *= 0.8;
      }

      // 1. Draw gravitational background lensing grid / Einstein Ring
      const ringGrad = ctx.createRadialGradient(cx, cy, singularityRadius * 0.9, cx, cy, singularityRadius * 2.3);
      ringGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      ringGrad.addColorStop(0.2, 'rgba(255, 120, 30, 0.75)'); // Intense photon ring
      ringGrad.addColorStop(0.4, 'rgba(180, 60, 255, 0.35)'); // Lensing refraction
      ringGrad.addColorStop(0.7, 'rgba(50, 20, 120, 0.1)');
      ringGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.save();
      // Apply slight perspective warp to background lens based on rotation X
      ctx.translate(cx, cy);
      ctx.scale(1.2, 1.0 + Math.sin(rotX.current) * 0.25);
      ctx.translate(-cx, -cy);
      ctx.beginPath();
      ctx.arc(cx, cy, singularityRadius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = ringGrad;
      ctx.fill();
      ctx.restore();

      // 2. Project and sort particles in 3D coordinate space for realistic occlusion
      const projectedParticles = particles.map((p) => {
        // Orbit update
        p.angle += p.speed * (isDragging.current ? 0.3 : 1.0) * speedRef.current;

        // Position in accretion disk flat plane (X-Z plane)
        const cosA = Math.cos(p.angle);
        const sinA = Math.sin(p.angle);
        const diskX = p.baseRadius * cosA;
        const diskZ = p.baseRadius * sinA;
        const diskY = Math.sin(p.angle * 2) * 5; // slight wave in the disk

        // Rotate around Y-axis (rotY)
        const cosY = Math.cos(rotY.current);
        const sinY = Math.sin(rotY.current);
        let rx1 = diskX * cosY - diskZ * sinY;
        let rz1 = diskX * sinY + diskZ * cosY;
        let ry1 = diskY;

        // Rotate around X-axis (rotX)
        const cosX = Math.cos(rotX.current);
        const sinX = Math.sin(rotX.current);
        const finalY = ry1 * cosX - rz1 * sinX;
        const finalZ = ry1 * sinX + rz1 * cosX;
        const finalX = rx1;

        // Perspective scale factor
        const perspective = 300 / (300 + finalZ);

        return {
          px: cx + finalX * perspective,
          py: cy + finalY * perspective,
          pz: finalZ,
          size: p.size * perspective * 1.2,
          opacity: p.opacity * (1.3 - (finalZ + 150) / 300), // dimmer in background
          color: p.color,
        };
      });

      // Sort by Z (depth) so background particles are drawn first (occlusion)
      projectedParticles.sort((a, b) => b.pz - a.pz);

      // 3. Draw particles
      projectedParticles.forEach((p) => {
        if (p.px < 0 || p.px > width || p.py < 0 || p.py > height) return;
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0.1, Math.min(1, p.opacity))})`;
        ctx.shadowColor = `rgb(${p.color})`;
        ctx.shadowBlur = p.size * 2;
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow for performance
      });

      // 4. Draw central Schwarzschild Singularity (Event Horizon - pure black abyss)
      const eventHorizonGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, singularityRadius);
      eventHorizonGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      eventHorizonGrad.addColorStop(0.85, 'rgba(0, 0, 0, 1)');
      eventHorizonGrad.addColorStop(1, 'rgba(10, 5, 20, 0.4)'); // slightly soft edge

      ctx.beginPath();
      ctx.arc(cx, cy, singularityRadius, 0, Math.PI * 2);
      ctx.fillStyle = eventHorizonGrad;
      ctx.fill();

      // Sharp shadow border on singularity
      ctx.beginPath();
      ctx.arc(cx, cy, singularityRadius * 0.94, 0, Math.PI * 2);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  // Interactivity Handlers: Mouse/Touch drag
  const handleStart = (clientX: number, clientY: number) => {
    isDragging.current = true;
    lastMousePos.current = { x: clientX, y: clientY };
    setClickForce(true);
    setTimeout(() => setClickForce(false), 200);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging.current) return;
    const dx = clientX - lastMousePos.current.x;
    const dy = clientY - lastMousePos.current.y;

    // Update speeds/inertia based on drag gesture
    rotYVel.current = dx * 0.005;
    rotXVel.current = dy * 0.005;

    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="relative group flex items-center justify-center w-full h-[300px] sm:h-[450px]">
      {/* Visual background ripple on hover/click */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 filter blur-3xl scale-75 group-hover:scale-100 transition-all duration-1000 ${clickForce ? 'opacity-40 animate-ping' : 'opacity-20'}`} />

      {/* Interactive canvas element */}
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[450px] max-h-[450px] cursor-grab active:cursor-grabbing touch-none select-none drop-shadow-[0_0_35px_rgba(255,100,50,0.15)]"
        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
        onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => {
          if (e.touches[0]) handleStart(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchMove={(e) => {
          if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchEnd={handleEnd}
      />

      {/* Instructions overlaid on the black hole */}
      <div className="absolute bottom-2 bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 text-[10px] text-zinc-400 font-mono tracking-widest px-3 py-1 rounded-full opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none uppercase">
        Drag to Spin / Putar Black Hole
      </div>
    </div>
  );
}
