'use client';

import React from 'react';

// Full-screen Light Theme Dashboard Skeleton matching the exact screenshot layout
export default function DashboardSkeleton() {
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
      {/* Top Navbar */}
      <header style={{
        height: '52px',
        borderBottom: '1px solid #e5e7eb',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        flexShrink: 0,
      }}>
        {/* Left Brand + Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '6px',
            }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '10px' }}>B</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: '14px', color: '#1e40af' }}>BOXpad</span>
          </div>

          {/* Active Inbox Tab */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '5px 12px',
            borderRadius: '6px',
            fontSize: '12.5px',
            fontWeight: 600,
            color: '#111827',
            background: '#f3f4f6',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
            Inbox
          </div>

          {['Contacts', 'AI Employees', 'Workflows', 'Campaigns'].map((tab) => (
            <div key={tab} style={{ padding: '5px 10px', fontSize: '12.5px', color: '#6b7280' }}>
              {tab}
            </div>
          ))}
        </div>

        {/* Right User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#d1d5db' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ef4444', color: 'white', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>M</div>
            <span style={{ fontSize: '12.5px', fontWeight: 500, color: '#111827' }}>Michael Johnson</span>
          </div>
        </div>
      </header>

      {/* Dashboard Main Grid */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', background: '#d9dad5', padding: '8px', gap: '8px' }}>
        
        {/* 1. Left Sidebar Skeleton Container */}
        <aside style={{
          width: '180px',
          flexShrink: 0,
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          background: '#ffffff',
          padding: '12px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          height: '100%',
          overflowY: 'auto',
        }}>
          <div style={{ fontWeight: 700, fontSize: '14px', color: '#111827', padding: '4px 10px' }}>Inbox</div>
          
          {/* Main items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#b0b3ab' }} />
              <span style={{ fontSize: '13px', color: '#374151' }}>My Inbox</span>
            </div>
            <div style={{ padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#374151' }}>All</span>
              <span style={{ fontSize: '11px', color: '#6b7280' }}>28</span>
            </div>
            <div style={{ padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#374151' }}>Unassigned</span>
              <span style={{ fontSize: '11px', color: '#6b7280' }}>5</span>
            </div>
          </div>

          {/* Teams */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', fontWeight: 600, fontSize: '13px', color: '#111827' }}>
              Teams <span style={{ color: '#9ca3af' }}>∨</span>
            </div>
            <div style={{ padding: '4px 10px', display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#374151' }}>
              <span>Sales</span> <span style={{ fontSize: '11px', color: '#6b7280' }}>7</span>
            </div>
            <div style={{ padding: '4px 10px', display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#374151' }}>
              <span>Customer Support</span> <span style={{ fontSize: '11px', color: '#6b7280' }}>16</span>
            </div>
          </div>

          {/* Users Skeleton Block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
            <div style={skeletonBarStyle('100%', '28px', '8px')} />
            {[80, 65, 75, 60, 70, 85].map((w, i) => (
              <div key={i} style={skeletonBarStyle(`${w}%`, '12px', '6px')} />
            ))}
          </div>
        </aside>

        {/* 2. Chat List Skeleton Column (Rounded Card) */}
        <div style={{
          width: '260px',
          flexShrink: 0,
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          background: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>Michael Johnson</span>
            <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: '#d1d5db' }} />
          </div>
          {/* Search bar */}
          <div style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ height: '30px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '7px' }} />
          </div>
          {/* Filter dropdown skeleton pills */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid #f3f4f6' }}>
            <div style={skeletonBarStyle('55px', '16px', '12px')} />
            <div style={skeletonBarStyle('60px', '16px', '12px')} />
          </div>

          {/* Chat List Skeleton Cards */}
          <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px',
                border: '1px solid #f3f4f6',
                borderRadius: '10px',
                background: '#ffffff',
              }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e5e7eb', flexShrink: 0, animation: 'shimmer 1.5s infinite' }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={skeletonBarStyle('65%', '13px', '4px')} />
                  <div style={skeletonBarStyle('90%', '10px', '4px')} />
                </div>
                <div style={skeletonBarStyle('16px', '8px', '4px')} />
              </div>
            ))}
          </div>
        </div>

        {/* 3. Active Chat Window Skeleton Column (Rounded Card) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff', minWidth: 0, borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{
            height: '52px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Olivia Mckinsey</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <div style={{ width: '28px', height: '22px', background: '#1e293b', borderRadius: '6px 0 0 6px' }} />
              <div style={{ width: '22px', height: '22px', background: '#1e293b', borderRadius: '0 6px 6px 0' }} />
            </div>
          </div>

          {/* Message Thread Skeleton */}
          <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
            <div style={{ alignSelf: 'center', ...skeletonBarStyle('90px', '20px', '999px') }} />

            {/* Msg 1 Left */}
            <div style={{ alignSelf: 'flex-start', width: '55%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={skeletonBarStyle('40px', '10px')} />
              <div style={{ padding: '14px', border: '1px solid #e5e7eb', ...skeletonBarStyle('100%', '42px', '4px 14px 14px 14px') }} />
            </div>

            {/* Msg 2 Right */}
            <div style={{ alignSelf: 'flex-end', width: '55%', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
              <div style={skeletonBarStyle('40px', '10px')} />
              <div style={{ padding: '14px', border: '1px solid #e5e7eb', ...skeletonBarStyle('100%', '52px', '14px 4px 14px 14px') }} />
            </div>

            {/* Msg 3 Left */}
            <div style={{ alignSelf: 'flex-start', width: '45%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={skeletonBarStyle('40px', '10px')} />
              <div style={{ padding: '14px', border: '1px solid #e5e7eb', ...skeletonBarStyle('100%', '36px', '4px 14px 14px 14px') }} />
            </div>

            {/* Msg 4 Right */}
            <div style={{ alignSelf: 'flex-end', width: '60%', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
              <div style={skeletonBarStyle('40px', '10px')} />
              <div style={{ padding: '14px', border: '1px solid #e5e7eb', ...skeletonBarStyle('100%', '64px', '14px 4px 14px 14px') }} />
            </div>
          </div>

          {/* Composer Input Skeleton */}
          <div style={{ borderTop: '1px solid #e5e7eb', padding: '14px 16px', background: '#ffffff', flexShrink: 0 }}>
            <div style={{ height: '40px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#9ca3af' }}>Type something....</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ width: '14px', height: '14px', background: '#d1d5db', borderRadius: '3px' }} />
                <div style={{ width: '14px', height: '14px', background: '#d1d5db', borderRadius: '3px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Right Details Panel Skeleton Column (Rounded Card) */}
        <aside style={{
          width: '272px',
          flexShrink: 0,
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          background: '#ffffff',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          overflow: 'hidden',
        }}>
          <div style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>Details</div>

          {/* Chat Data */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontWeight: 600, fontSize: '12.5px', color: '#111827' }}>Chat Data</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={skeletonBarStyle('55px', '12px')} />
              <div style={skeletonBarStyle('75px', '12px')} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={skeletonBarStyle('45px', '12px')} />
              <div style={skeletonBarStyle('65px', '12px')} />
            </div>
          </div>

          {/* Contact Data */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontWeight: 600, fontSize: '12.5px', color: '#111827' }}>Contact Data</div>
            <div style={skeletonBarStyle('70%', '12px')} />
            <div style={skeletonBarStyle('60%', '12px')} />
            <div style={skeletonBarStyle('80%', '12px')} />
            <div style={skeletonBarStyle('90%', '12px')} />
            <span style={{ fontSize: '12px', color: '#6366f1', fontWeight: 600 }}>See all</span>
          </div>

          {/* Contact Labels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={skeletonBarStyle('85px', '26px', '999px')} />
              <div style={skeletonBarStyle('70px', '26px', '999px')} />
            </div>
          </div>

          {/* Notes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontWeight: 600, fontSize: '12.5px', color: '#111827' }}>Notes</div>
            <div style={skeletonBarStyle('100%', '32px', '6px')} />
            <div style={skeletonBarStyle('100%', '42px', '6px')} />
          </div>
        </aside>

      </div>
    </div>
  );
}
