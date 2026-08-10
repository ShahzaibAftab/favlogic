'use client';

import React from 'react';

// Dedicated Full-Screen Mobile Chat Screen Skeleton Loader
export default function MobileDashboardSkeleton() {
  const skeletonBarStyle = (width: string, height: string = '12px', borderRadius: string = '6px') => ({
    width,
    height,
    borderRadius,
    background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      background: '#ffffff',
      overflow: 'hidden',
    }}>
      {/* Mobile Navbar Skeleton */}
      <header style={{
        height: '52px',
        borderBottom: '1px solid #e5e7eb',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        flexShrink: 0,
      }}>
        {/* Hamburger + Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#f3f4f6' }} />
          <span style={{ fontWeight: 800, fontSize: '18px', color: '#0284c7', letterSpacing: '-0.5px' }}>
            BOX<span style={{ fontWeight: 600 }}>pad</span>
          </span>
        </div>

        {/* Right Settings + Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#e5e7eb' }} />
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ef4444', color: 'white', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>M</div>
        </div>
      </header>

      {/* Mobile Chat List Body Skeleton */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#ffffff' }}>
        {/* Header title */}
        <div style={{ padding: '10px 14px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827' }}>Michael Johnson</span>
          <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#e5e7eb' }} />
        </div>

        {/* Search Bar Skeleton */}
        <div style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ height: '34px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
        </div>

        {/* Filter pills skeleton */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid #f3f4f6' }}>
          <div style={skeletonBarStyle('90px', '22px', '999px')} />
          <div style={skeletonBarStyle('70px', '22px', '999px')} />
        </div>

        {/* Chat Item Cards Skeleton */}
        <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              border: '1px solid #f1f5f9',
              borderRadius: '12px',
              background: '#ffffff',
            }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e5e7eb', flexShrink: 0, animation: 'shimmer 1.5s infinite' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={skeletonBarStyle('55%', '13px', '4px')} />
                  <div style={skeletonBarStyle('30px', '10px', '4px')} />
                </div>
                <div style={skeletonBarStyle('85%', '11px', '4px')} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Navigation Skeleton */}
      <footer style={{
        height: '56px',
        borderTop: '1px solid #e5e7eb',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexShrink: 0,
      }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#e5e7eb' }} />
            <div style={skeletonBarStyle('36px', '8px', '4px')} />
          </div>
        ))}
      </footer>
    </div>
  );
}
