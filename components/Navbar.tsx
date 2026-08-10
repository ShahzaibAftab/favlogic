'use client';

import React, { useState } from 'react';

interface NavbarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onToggleLeftSidebar?: () => void;
  isLeftSidebarOpen?: boolean;
}

const InboxIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
  </svg>
);

const ContactsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const BotIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/>
    <line x1="8" y1="16" x2="8" y2="16"/>
    <line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
);

const WorkflowsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);

const CampaignsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

export default function Navbar({ activeTab = 'Inbox', onTabChange, onToggleLeftSidebar }: NavbarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = [
    { name: 'Inbox', icon: InboxIcon },
    { name: 'Contacts', icon: ContactsIcon },
    { name: 'AI Employees', icon: BotIcon },
    { name: 'Workflows', icon: WorkflowsIcon },
    { name: 'Campaigns', icon: CampaignsIcon },
  ];

  return (
    <header style={{
      height: '52px',
      borderBottom: '1px solid #e5e7eb',
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 12px',
      flexShrink: 0,
      position: 'relative',
      zIndex: 30,
    }}>
      {/* Left: Hamburger (Mobile/Tablet) + Logo + Nav tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
        {/* Hamburger Menu Toggle for Sidebar */}
        <button
          onClick={onToggleLeftSidebar}
          aria-label="Toggle Navigation Sidebar"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: 'none',
            background: 'transparent',
            color: '#374151',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <MenuIcon />
        </button>

        {/* BOXpad logo */}
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '6px', flexShrink: 0 }}>
          <span style={{ fontWeight: 800, fontSize: '18px', color: '#0284c7', letterSpacing: '-0.5px' }}>
            BOX<span style={{ fontWeight: 600 }}>pad</span>
          </span>
        </div>

        {/* Nav tabs (Hidden on mobile screens, accessible via mobile bottom nav or overflow) */}
        <nav
          aria-label="Main Navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            overflowX: 'auto',
          }}
          className="hidden md:flex"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => onTabChange?.(item.name)}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#111827' : '#4b5563',
                  background: isActive ? '#f3f4f6' : 'transparent',
                  border: isActive ? '1px solid #e5e7eb' : '1px solid transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                  height: '34px',
                }}
              >
                <Icon />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right: Settings + User Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <button
          aria-label="Settings"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '34px',
            height: '34px',
            borderRadius: '8px',
          }}
        >
          <SettingsIcon />
        </button>

        {/* User Profile Pill */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-label="User profile menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '2px 4px',
              borderRadius: '8px',
            }}
          >
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: '#e11d48',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 700,
              }}>
                M
              </div>
              {/* Online indicator badge */}
              <span style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#22c55e',
                border: '1.5px solid #ffffff',
              }} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }} className="hidden sm:inline">
              Michael Johnson
            </span>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '38px',
              width: '180px',
              background: '#ffffff',
              borderRadius: '10px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              padding: '6px',
              zIndex: 100,
            }} className="fade-in">
              <div style={{ padding: '8px', borderBottom: '1px solid #f3f4f6', marginBottom: '4px' }}>
                <div style={{ fontWeight: 600, fontSize: '12.5px', color: '#111827' }}>Michael Johnson</div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>michael@boxpad.com</div>
              </div>
              <button
                onClick={() => setShowProfileMenu(false)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '6px 8px',
                  borderRadius: '6px',
                  border: 'none',
                  background: 'none',
                  fontSize: '12px',
                  color: '#374151',
                  cursor: 'pointer',
                }}
              >
                Profile & Settings
              </button>
              <button
                onClick={() => setShowProfileMenu(false)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '6px 8px',
                  borderRadius: '6px',
                  border: 'none',
                  background: 'none',
                  fontSize: '12px',
                  color: '#ef4444',
                  cursor: 'pointer',
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
