'use client';

import React from 'react';
import { Conversation } from '@/types';

interface ChatListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelectConversation: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: any) => void;
  sortFilter: string;
  onSortFilterChange: (sort: any) => void;
}

const SearchIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
    <line x1="12" y1="18" x2="12" y2="18"/>
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

export default function ChatList({
  conversations,
  selectedId,
  onSelectConversation,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortFilter,
  onSortFilterChange,
}: ChatListProps) {
  return (
    <div style={{
      width: '260px',
      flexShrink: 0,
      borderRight: '1px solid #e5e7eb',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      {/* Header with Michael Johnson + edit icon */}
      <div style={{
        padding: '10px 14px 8px',
        borderBottom: '1px solid #f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>Michael Johnson</span>
        </div>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex' }}>
          <EditIcon />
        </button>
      </div>

      {/* Search bar */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '7px',
          padding: '6px 10px',
        }}>
          <SearchIcon />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Chat"
            style={{
              flex: 1,
              border: 'none',
              background: 'none',
              outline: 'none',
              fontSize: '12.5px',
              color: '#374151',
            }}
          />
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: '#6b7280' }}>
            <FilterIcon />
          </button>
        </div>
      </div>

      {/* Filter row: Open dropdown + Newest dropdown */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 12px 8px',
        borderBottom: '1px solid #f3f4f6',
      }}>
        {/* Status dropdown */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12.5px',
            fontWeight: 500,
            color: '#374151',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '2px 0',
          }}
          onClick={() => {
            const next = statusFilter === 'all' ? 'open' : statusFilter === 'open' ? 'closed' : 'all';
            onStatusFilterChange(next);
          }}
        >
          {statusFilter === 'all' ? 'All' : statusFilter === 'open' ? 'Open' : statusFilter === 'closed' ? 'Closed' : 'Open'}
          <ChevronDown />
        </button>

        <div style={{ flex: 1 }} />

        {/* Sort dropdown */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12.5px',
            fontWeight: 500,
            color: '#374151',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '2px 0',
          }}
          onClick={() => onSortFilterChange(sortFilter === 'newest' ? 'oldest' : 'newest')}
        >
          {sortFilter === 'newest' ? 'Newest' : 'Oldest'}
          <ChevronDown />
        </button>
      </div>

      {/* Conversation list */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {conversations.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: '#9ca3af', fontSize: '12px' }}>
            No conversations found
          </div>
        ) : (
          conversations.map((conv) => {
            const isSelected = selectedId === conv.id;
            return (
              <div
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '10px 14px',
                  cursor: 'pointer',
                  background: isSelected ? '#f0f4ff' : 'transparent',
                  borderLeft: isSelected ? '3px solid #6366f1' : '3px solid transparent',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = '#f9fafb'; }}
                onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
              >
                {/* Avatar circle with initials */}
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: conv.contact.avatarColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: 600,
                  flexShrink: 0,
                }}>
                  {conv.contact.initials}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                    <span style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: isSelected ? '#4f46e5' : '#111827',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {conv.contact.name}
                    </span>
                    <span style={{ fontSize: '11px', color: '#9ca3af', flexShrink: 0, marginLeft: '4px' }}>
                      {conv.timestamp}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    margin: 0,
                  }}>
                    {conv.lastMessage}
                  </p>
                </div>

                {conv.unreadCount > 0 && (
                  <span style={{
                    flexShrink: 0,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#4f46e5',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2px',
                  }}>
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
