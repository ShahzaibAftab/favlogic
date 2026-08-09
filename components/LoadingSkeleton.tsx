'use client';

import React from 'react';

interface LoadingSkeletonProps {
  onComplete?: () => void;
}

export default function LoadingSkeleton({ onComplete }: LoadingSkeletonProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080F] text-white overflow-hidden select-none">
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Spinning ring */}
      <div style={{ position: 'relative', marginBottom: '32px' }}>
        <div
          style={{
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTop: '3px solid #06b6d4',
            borderRight: '3px solid #3b82f6',
            animation: 'spin 1s linear infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            border: '1px solid rgba(6,182,212,0.15)',
          }}
        />
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '8px' }}>
        Extracting Information...
      </h2>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', maxWidth: '320px', textAlign: 'center', lineHeight: '1.6' }}>
        We are extracting information from the above honey combs to your system
      </p>

      {/* Mini dashboard skeleton */}
      <div
        style={{
          marginTop: '40px',
          width: '880px',
          maxWidth: '92vw',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          height: '200px',
        }}
      >
        {/* Skeleton sidebar */}
        <div style={{ width: '160px', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '12px', flexShrink: 0 }}>
          {[40, 60, 50, 70, 55].map((w, i) => (
            <div key={i} className="skeleton" style={{ height: '10px', width: `${w}%`, marginBottom: '10px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', animation: 'none' }} />
          ))}
        </div>
        {/* Skeleton chat list */}
        <div style={{ width: '260px', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '12px', flexShrink: 0 }}>
          {[1,2,3,4].map((i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: '8px', width: '70%', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', marginBottom: '6px' }} />
                <div style={{ height: '8px', width: '90%', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }} />
              </div>
            </div>
          ))}
        </div>
        {/* Skeleton chat */}
        <div style={{ flex: 1, padding: '12px' }}>
          {[1,2,3].map((i) => (
            <div key={i} style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start', marginBottom: '12px' }}>
              <div style={{ height: '32px', width: `${40 + i * 15}%`, background: i % 2 === 0 ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.08)', borderRadius: '10px' }} />
            </div>
          ))}
        </div>
      </div>

      {onComplete && (
        <button
          onClick={onComplete}
          style={{
            marginTop: '24px',
            padding: '8px 24px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
            color: 'white',
            fontSize: '13px',
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Enter Dashboard →
        </button>
      )}
    </div>
  );
}
