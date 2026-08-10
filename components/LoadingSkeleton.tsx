'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface LoadingSkeletonProps {
  onComplete?: () => void;
}

// Hexagon icon wrapper with animated clockwise gradient border (#007AEC1F) & floating motion
function HexIcon({ src, style, delay = 0, className = '' }: { src: string; style: React.CSSProperties; delay?: number; className?: string }) {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        animation: 'hexFloat 4.5s ease-in-out infinite',
        animationDelay: `${delay}s`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {/* Outer Hexagonal Border container with clip-path */}
      <div
        style={{
          position: 'relative',
          width: '70px',
          height: '70px',
          clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
          filter: 'drop-shadow(0 0 10px rgba(0, 122, 236, 0.35))',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Continuous Clockwise Rotating Conic Gradient */}
        <div
          style={{
            position: 'absolute',
            width: '130px',
            height: '130px',
            background: 'conic-gradient(from 0deg, #007aec 0deg, rgba(0, 122, 236, 0.55) 120deg, #007aec1f 240deg, #007aec 360deg)',
            animation: 'hexSpin 4s linear infinite',
          }}
        />

        {/* Inner Dark Glass Surface */}
        <div
          style={{
            position: 'absolute',
            inset: '2px',
            clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
            background: 'rgba(5, 12, 28, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <Image
            src={src}
            alt=""
            width={60}
            height={60}
            style={{ width: '48px', height: '48px', objectFit: 'contain' }}
            priority
          />
        </div>
      </div>
    </div>
  );
}

// Canvas component dynamically generating the exact particle-wave glowing ring from Figma
function GlowingRingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    // Retina DPI scaling
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const displaySize = 260;
    canvas.width = displaySize * dpr;
    canvas.height = displaySize * dpr;
    ctx.scale(dpr, dpr);

    const cx = displaySize / 2;
    const cy = displaySize / 2;
    const baseRadius = 90;

    // Generate ring stardust particles
    const particleCount = 220;
    const particles = Array.from({ length: particleCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radialOffset = (Math.random() - 0.5) * 22;
      const speed = (0.003 + Math.random() * 0.008) * (Math.random() > 0.5 ? 1 : -1);
      const size = 0.6 + Math.random() * 1.5;
      const alpha = 0.2 + Math.random() * 0.7;
      const colorHue = Math.random() > 0.3 ? 200 + Math.random() * 20 : 220 + Math.random() * 30;
      return { angle, radialOffset, speed, size, alpha, colorHue };
    });

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, displaySize, displaySize);

      // 1. Ambient Outer Halo Glow
      const haloGradient = ctx.createRadialGradient(cx, cy, baseRadius - 20, cx, cy, baseRadius + 45);
      haloGradient.addColorStop(0, 'rgba(30, 144, 255, 0.05)');
      haloGradient.addColorStop(0.5, 'rgba(0, 102, 255, 0.25)');
      haloGradient.addColorStop(0.8, 'rgba(0, 180, 255, 0.1)');
      haloGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = haloGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius + 45, 0, Math.PI * 2);
      ctx.fill();

      // 2. Swirling Wave Threads
      const threadCount = 14;
      for (let i = 0; i < threadCount; i++) {
        const radius = baseRadius - 12 + i * 1.8;
        ctx.beginPath();

        const step = 0.05;
        for (let a = 0; a <= Math.PI * 2 + step; a += step) {
          const wave1 = Math.sin(a * 3 + time * 1.2 + i * 0.4) * 3.5;
          const wave2 = Math.cos(a * 5 - time * 0.8 + i * 0.2) * 2.0;
          const r = radius + wave1 + wave2;

          const px = cx + Math.cos(a) * r;
          const py = cy + Math.sin(a) * r;

          if (a === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }

        ctx.closePath();
        ctx.lineWidth = i % 3 === 0 ? 1.4 : 0.8;
        const threadAlpha = 0.15 + (Math.sin(time + i) + 1) * 0.15;
        ctx.strokeStyle = `rgba(56, 189, 248, ${threadAlpha})`;
        ctx.stroke();
      }

      // 3. Stardust Particle Cloud
      particles.forEach((p) => {
        p.angle += p.speed;
        const r = baseRadius + p.radialOffset + Math.sin(time * 2 + p.angle * 4) * 2;
        const px = cx + Math.cos(p.angle) * r;
        const py = cy + Math.sin(p.angle) * r;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.colorHue}, 90%, 75%, ${p.alpha})`;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.8)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4. Sharp Bright Electric Rim Arc
      const rimGradient = ctx.createConicGradient(time * 0.5, cx, cy);
      rimGradient.addColorStop(0.0, 'rgba(56, 189, 248, 0.9)');
      rimGradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.95)');
      rimGradient.addColorStop(0.5, 'rgba(37, 99, 235, 0.8)');
      rimGradient.addColorStop(0.75, 'rgba(14, 165, 233, 0.3)');
      rimGradient.addColorStop(1.0, 'rgba(56, 189, 248, 0.9)');

      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = rimGradient;
      ctx.shadowColor = 'rgba(56, 189, 248, 1)';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inner sharp edge
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius - 8, 0, Math.PI * 2);
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.4)';
      ctx.stroke();

      // 5. Dark Center Void
      const innerVoidGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius - 16);
      innerVoidGradient.addColorStop(0, 'rgba(5, 10, 26, 0.95)');
      innerVoidGradient.addColorStop(0.8, 'rgba(5, 10, 26, 0.7)');
      innerVoidGradient.addColorStop(1, 'rgba(5, 10, 26, 0)');

      ctx.fillStyle = innerVoidGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius - 14, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}

export default function LoadingSkeleton({ onComplete }: LoadingSkeletonProps) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setOpacity(1), 100);
    return () => clearTimeout(t1);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'linear-gradient(160deg, #050a1a 0%, #071228 40%, #07234a 70%, #0a3580 100%)',
        overflow: 'hidden',
        opacity,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* ---- Right-side electric blue glow ---- */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '65%',
          height: '85%',
          background: 'radial-gradient(ellipse at center, rgba(30,144,255,0.55) 0%, rgba(0,80,200,0.25) 35%, transparent 70%)',
          pointerEvents: 'none',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '-5%',
          width: '40%',
          height: '50%',
          background: 'radial-gradient(ellipse at center, rgba(5,30,80,0.6) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ---- Floating hexagon icon tiles (Responsive positioning) ---- */}
      <HexIcon src="/icons/icon-sparkles.png" delay={0} style={{ top: '6%', left: '8%' }} className="hidden sm:flex" />
      <HexIcon src="/icons/icon-inbox.png" delay={0.8} style={{ top: '26%', left: '4%' }} />
      <HexIcon src="/icons/icon-person.png" delay={1.6} style={{ top: '48%', left: '10%' }} className="hidden md:flex" />
      <HexIcon src="/icons/icon-person.png" delay={2.4} style={{ top: '5%', right: '6%' }} />
      <HexIcon src="/icons/icon-org.png" delay={1.2} style={{ top: '24%', right: '5%' }} />
      <HexIcon src="/icons/icon-sparkles.png" delay={2.0} style={{ top: '46%', right: '8%' }} className="hidden md:flex" />

      {/* ---- Main content area ---- */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '5vh',
          zIndex: 10,
          position: 'relative',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        {/* Dynamic Glowing Particle-Wave Portal Ring */}
        <div
          style={{
            position: 'relative',
            width: 'clamp(180px, 45vw, 240px)',
            height: 'clamp(180px, 45vw, 240px)',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <GlowingRingCanvas />
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: 'clamp(22px, 5vw, 36px)',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 10px',
            textAlign: 'center',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            padding: '0 16px',
          }}
        >
          Extracting Information...
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(12.5px, 3.5vw, 14.5px)',
            color: 'rgba(200,220,255,0.7)',
            textAlign: 'center',
            margin: 0,
            maxWidth: '340px',
            lineHeight: 1.55,
            padding: '0 20px',
          }}
        >
          We are extracting information from the above honey combs to your system
        </p>
      </div>

      {/* ---- Dashboard preview card below (Responsive layout) ---- */}

      {/* Desktop Preview Card (>=768px) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '85vw',
          maxWidth: '1100px',
          background: '#ffffff',
          borderRadius: '16px 16px 0 0',
          overflow: 'hidden',
          boxShadow: '0 -8px 48px rgba(0,80,255,0.18)',
          zIndex: 5,
        }}
        className="hidden md:block"
      >
        {/* Mini Navbar */}
        <div style={{ height: '44px', borderBottom: '1px solid #e5e7eb', background: '#ffffff', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginRight: '12px' }}>
            <div style={{ width: '22px', height: '22px', background: 'linear-gradient(135deg, #0284c7, #06b6d4)', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '9px' }}>B</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: '13px', color: '#0284c7' }}>BOXpad</span>
          </div>
          {['Inbox', 'Contacts', 'AI Employees', 'Workflows', 'Campaigns'].map((tab, i) => (
            <div key={tab} style={{ padding: '4px 8px', borderRadius: '5px', fontSize: '11px', fontWeight: i === 0 ? 600 : 400, color: i === 0 ? '#111827' : '#6b7280', background: i === 0 ? '#f3f4f6' : 'transparent', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {tab}
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontSize: '8px', fontWeight: 700 }}>M</span>
            </div>
            <span style={{ fontSize: '11px', color: '#374151', fontWeight: 500 }}>Michael Johnson</span>
          </div>
        </div>

        {/* Mini Dashboard body */}
        <div style={{ display: 'flex', height: '200px' }}>
          <div style={{ width: '150px', borderRight: '1px solid #f3f4f6', padding: '10px', flexShrink: 0 }}>
            <div style={{ fontWeight: 700, fontSize: '12px', color: '#111827', marginBottom: '8px', paddingLeft: '4px' }}>Inbox</div>
            {['My Inbox', 'All  28', 'Unassigned  5'].map((item) => (
              <div key={item} style={{ padding: '4px 8px', fontSize: '10px', color: '#374151', display: 'flex', justifyContent: 'space-between' }}>
                {item}
              </div>
            ))}
          </div>

          <div style={{ width: '220px', borderRight: '1px solid #f3f4f6', padding: '8px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#111827' }}>Michael Johnson</span>
            </div>
            <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '5px', padding: '4px 8px', fontSize: '10px', color: '#9ca3af', marginBottom: '6px' }}>🔍 Search Chat</div>
            {[
              { name: 'Olivia Mckinsey', time: '23:23', msg: "Oh my god 🤩 I'll try it ASAP, thank...", color: '#0891b2', init: 'O', selected: true },
              { name: 'Sara Williams', time: '23:16', msg: 'Good Evening, Emily! Hope yo...', color: '#6366f1', init: 'E', selected: false },
            ].map((conv) => (
              <div key={conv.name} style={{ display: 'flex', gap: '6px', padding: '6px', borderRadius: '4px', background: conv.selected ? '#f0f4ff' : 'transparent', borderLeft: conv.selected ? '2px solid #6366f1' : '2px solid transparent', marginBottom: '2px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: conv.color, color: 'white', fontSize: '9px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{conv.init}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: conv.selected ? '#4f46e5' : '#111827', display: 'block' }}>{conv.name}</span>
                  <span style={{ fontSize: '9px', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{conv.msg}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1, padding: '8px 12px', minWidth: 0 }}>
            <div style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '6px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>Olivia Mckinsey</span>
            </div>
            <div style={{ height: '10px', width: '60%', background: '#f3f4f6', borderRadius: '8px', marginBottom: '6px' }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '6px' }}>
              <div style={{ height: '24px', width: '55%', background: '#ede9fe', borderRadius: '8px' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Preview Card (<768px) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '92vw',
          maxWidth: '420px',
          background: '#ffffff',
          borderRadius: '16px 16px 0 0',
          overflow: 'hidden',
          boxShadow: '0 -8px 36px rgba(0,80,255,0.2)',
          zIndex: 5,
        }}
        className="block md:hidden"
      >
        <div style={{ height: '40px', borderBottom: '1px solid #e5e7eb', background: '#ffffff', display: 'flex', alignItems: 'center', padding: '0 14px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontWeight: 800, fontSize: '14px', color: '#0284c7' }}>BOX<span style={{ fontWeight: 600 }}>pad</span></span>
          </div>
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#ef4444', color: 'white', fontSize: '9px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>M</div>
        </div>
        <div style={{ padding: '10px 14px', height: '140px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ height: '28px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
          {[1, 2].map((i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '6px 8px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: i === 1 ? '#0891b2' : '#6366f1', flexShrink: 0 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ width: '60%', height: '10px', background: '#e5e7eb', borderRadius: '4px' }} />
                <div style={{ width: '85%', height: '8px', background: '#f3f4f6', borderRadius: '4px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes hexFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1.5deg); }
        }
        @keyframes hexSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
