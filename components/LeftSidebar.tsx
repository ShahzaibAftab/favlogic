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
  const [usersOpen, setUsersOpen] = useState(true);
  const [channelsOpen, setChannelsOpen] = useState(true);

  const menuItemStyle = (isActive: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '6px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    color: isActive ? '#111827' : '#374151',
    background: isActive ? '#f3f4f6' : 'transparent',
    fontWeight: isActive ? 500 : 400,
    transition: 'background 0.1s',
    border: 'none',
    width: '100%',
    textAlign: 'left' as const,
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
      width: '155px',
      flexShrink: 0,
      borderRight: '1px solid #e5e7eb',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflowY: 'auto',
      padding: '12px 8px',
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
        <button style={sectionHeaderStyle} onClick={() => setUsersOpen(!usersOpen)}>
          Users
          <span style={{ color: '#9ca3af', transform: usersOpen ? 'rotate(0)' : 'rotate(-90deg)', transition: 'transform 0.2s' }}>
            <ChevronDown />
          </span>
        </button>

        {usersOpen && USERS.map((user) => (
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
        ))}
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
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 10px', cursor: 'pointer', fontSize: '12.5px', color: '#374151' }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: 'white', fontSize: '9px', fontWeight: 700 }}>F</span>
              </div>
              Fit4Life
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 10px', cursor: 'pointer', fontSize: '12.5px', color: '#374151' }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: 'white', fontSize: '9px', fontWeight: 700 }}>F</span>
              </div>
              Fit4Life
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
