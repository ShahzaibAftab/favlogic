'use client';

import React, { useState } from 'react';
import { ActiveCategory } from '@/types';

interface SidebarUser {
  name: string;
  count?: number;
}

const USERS: SidebarUser[] = [
  { name: 'Sarah Williams', count: 2 },
  { name: 'Michael Johnson', count: 11 },
  { name: 'Emily Davis' },
  { name: 'Christopher Miller', count: 4 },
  { name: 'Amanda Garcia', count: 5 },
  { name: 'Joshua Martinez' },
  { name: 'Ashley Taylor', count: 1 },
  { name: 'Daniel Anderson' },
  { name: 'Jessica Thomas', count: 2 },
];

interface LeftSidebarProps {
  activeCategory: ActiveCategory;
  onSelectCategory: (category: ActiveCategory) => void;
}

export default function LeftSidebar({ activeCategory, onSelectCategory }: LeftSidebarProps) {
  const [teamsOpen, setTeamsOpen] = useState(true);
  const [usersOpen, setUsersOpen] = useState(false);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [channelsOpen, setChannelsOpen] = useState(true);

  const handleToggleUsers = () => {
    if (usersOpen) {
      setUsersOpen(false);
      setIsUsersLoading(false);
    } else {
      setUsersOpen(true);
      setIsUsersLoading(true);
      setTimeout(() => {
        setIsUsersLoading(false);
      }, 500);
    }
  };

  const menuItemStyle = (isActive: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 10px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    color: isActive ? '#111827' : '#374151',
    background: isActive ? '#f3f4f6' : 'transparent',
    boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.03)' : 'none',
    fontWeight: isActive ? 600 : 400,
    transition: 'all 0.15s ease',
    border: 'none',
    width: '100%',
    textAlign: 'left' as const,
    marginBottom: '2px',
  });

  const badgeStyle = {
    fontSize: '11px',
    color: '#6b7280',
    fontWeight: 400,
    minWidth: '16px',
    textAlign: 'right' as const,
  };

  const sectionHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '6px 10px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 600,
    color: '#111827',
    marginBottom: '2px',
    border: 'none',
    background: 'none',
    width: '100%',
    textAlign: 'left' as const,
  };

  const ChevronDown = ({ size = 14 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );

  const PersonIcon = ({ size = 14 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const UsersIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );

  const UnassignedIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
      <line x1="17" y1="11" x2="23" y2="11"/>
    </svg>
  );

  return (
    <aside style={{
      width: '180px',
      flexShrink: 0,
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
      padding: '12px 10px',
    }}>
      {/* Inbox section title */}
      <div style={{ padding: '4px 10px 8px', fontSize: '14px', fontWeight: 700, color: '#111827' }}>
        Inbox
      </div>

      {/* Main inbox views */}
      <button
        style={menuItemStyle(activeCategory === 'my_inbox')}
        onClick={() => onSelectCategory('my_inbox')}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PersonIcon />
          My Inbox
        </span>
      </button>

      <button
        style={menuItemStyle(activeCategory === 'all')}
        onClick={() => onSelectCategory('all')}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UsersIcon />
          All
        </span>
        <span style={badgeStyle}>28</span>
      </button>

      <button
        style={menuItemStyle(activeCategory === 'unassigned')}
        onClick={() => onSelectCategory('unassigned')}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UnassignedIcon />
          Unassigned
        </span>
        <span style={badgeStyle}>5</span>
      </button>

      {/* Teams */}
      <div style={{ marginTop: '8px' }}>
        <button style={sectionHeaderStyle} onClick={() => setTeamsOpen(!teamsOpen)}>
          Teams
          <span style={{ color: '#9ca3af', transform: teamsOpen ? 'rotate(0)' : 'rotate(-90deg)', transition: 'transform 0.2s' }}>
            <ChevronDown />
          </span>
        </button>

        {teamsOpen && (
          <>
            <button
              style={menuItemStyle(activeCategory === 'sales')}
              onClick={() => onSelectCategory('sales')}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
                Sales
              </span>
              <span style={badgeStyle}>7</span>
            </button>

            <button
              style={menuItemStyle(activeCategory === 'customer_support')}
              onClick={() => onSelectCategory('customer_support')}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1', flexShrink: 0 }} />
                Customer Support
              </span>
              <span style={badgeStyle}>16</span>
            </button>
          </>
        )}
      </div>

      {/* Users */}
      <div style={{ marginTop: '8px' }}>
        <button style={sectionHeaderStyle} onClick={handleToggleUsers}>
          Users
          <span style={{ color: '#9ca3af', transform: usersOpen ? 'rotate(0)' : 'rotate(-90deg)', transition: 'transform 0.2s' }}>
            <ChevronDown />
          </span>
        </button>

        {usersOpen && (
          isUsersLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '6px 8px' }}>
              {[80, 65, 85, 70, 60, 75].map((w, i) => (
                <div
                  key={i}
                  style={{
                    height: '20px',
                    borderRadius: '5px',
                    background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.2s infinite',
                    width: `${w}%`,
                  }}
                />
              ))}
            </div>
          ) : (
            USERS.map((user) => (
              <div
                key={user.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '5px 10px',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  color: '#374151',
                  borderRadius: '6px',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f9fafb')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '90px' }}>
                  {user.name}
                </span>
                {user.count !== undefined && (
                  <span style={badgeStyle}>{user.count}</span>
                )}
              </div>
            ))
          )
        )}
      </div>

      {/* Channels */}
      <div style={{ marginTop: '8px' }}>
        <button style={sectionHeaderStyle} onClick={() => setChannelsOpen(!channelsOpen)}>
          Channels
          <span style={{ color: '#9ca3af', transform: channelsOpen ? 'rotate(0)' : 'rotate(-90deg)', transition: 'transform 0.2s' }}>
            <ChevronDown />
          </span>
        </button>

        {channelsOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '2px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 8px',
              cursor: 'pointer',
              fontSize: '12.5px',
              color: '#374151',
              border: '1px solid #e5e7eb',
              borderRadius: '999px',
              background: '#ffffff',
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#22c55e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                flexShrink: 0,
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"/></svg>
              </div>
              Fit4Life
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 8px',
              cursor: 'pointer',
              fontSize: '12.5px',
              color: '#374151',
              border: '1px solid #e5e7eb',
              borderRadius: '999px',
              background: '#ffffff',
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                flexShrink: 0,
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              Fit4Life
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
