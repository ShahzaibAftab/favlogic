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
  isMobile?: boolean;
  onToggleLeftSidebar?: () => void;
}

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
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
  isMobile = false,
}: ChatListProps) {
  const isFiltered = statusFilter !== 'all' || searchQuery.trim().length > 0;

  const handleResetFilters = () => {
    onStatusFilterChange('all');
    onSearchChange('');
  };

  return (
    <div style={{
      width: isMobile ? '100%' : '260px',
      flexShrink: 0,
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
    }}>
      {/* Header with User Name + Compose / Edit icon */}
      <div style={{
        padding: '10px 14px',
        borderBottom: '1px solid #f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: '#0284c7',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: 700,
          }}>
            M
          </div>
          <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827' }}>Michael Johnson</span>
        </div>
        <button
          aria-label="New chat message"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6b7280',
            display: 'flex',
            padding: '6px',
            borderRadius: '6px',
          }}
        >
          <EditIcon />
        </button>
      </div>

      {/* Search bar with clear X button */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6', flexShrink: 0 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '6px 10px',
        }}>
          <SearchIcon />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Chat..."
            aria-label="Search conversations"
            style={{
              flex: 1,
              border: 'none',
              background: 'none',
              outline: 'none',
              fontSize: '12.5px',
              color: '#374151',
            }}
          />
          {searchQuery ? (
            <button
              onClick={() => onSearchChange('')}
              aria-label="Clear search input"
              style={{
                background: '#e5e7eb',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                color: '#4b5563',
                padding: 0,
              }}
            >
              <XIcon />
            </button>
          ) : (
            <button
              aria-label="Filter options"
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: '#6b7280' }}
            >
              <FilterIcon />
            </button>
          )}
        </div>
      </div>

      {/* Filter controls row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 12px',
        borderBottom: '1px solid #f3f4f6',
        flexShrink: 0,
        gap: '6px',
      }}>
        {/* Status Filter Pill */}
        <button
          onClick={() => {
            const next = statusFilter === 'all' ? 'open' : statusFilter === 'open' ? 'closed' : 'all';
            onStatusFilterChange(next);
          }}
          aria-label={`Filter by status: currently ${statusFilter}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            fontWeight: 600,
            color: statusFilter !== 'all' ? '#0284c7' : '#4b5563',
            background: statusFilter !== 'all' ? '#f0f9ff' : '#f9fafb',
            border: statusFilter !== 'all' ? '1px solid #0284c7' : '1px solid #e5e7eb',
            borderRadius: '999px',
            padding: '3px 10px',
            cursor: 'pointer',
          }}
        >
          <span>Status: {statusFilter === 'all' ? 'All' : statusFilter === 'open' ? 'Open' : 'Closed'}</span>
          <ChevronDown />
        </button>

        {/* Sort Filter Dropdown */}
        <button
          onClick={() => onSortFilterChange(sortFilter === 'newest' ? 'oldest' : 'newest')}
          aria-label={`Sort by date: currently ${sortFilter}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            fontWeight: 500,
            color: '#4b5563',
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '999px',
            padding: '3px 10px',
            cursor: 'pointer',
          }}
        >
          <span>{sortFilter === 'newest' ? 'Newest' : 'Oldest'}</span>
          <ChevronDown />
        </button>

        {/* Reset filter text if filtered */}
        {isFiltered && (
          <button
            onClick={handleResetFilters}
            aria-label="Reset filters"
            style={{
              fontSize: '11px',
              color: '#ef4444',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
              padding: '2px 4px',
            }}
          >
            Reset
          </button>
        )}
      </div>

      {/* Conversation list */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
        className="touch-scroll"
      >
        {conversations.length === 0 ? (
          <div style={{ padding: '32px 16px', textAlign: 'center', color: '#9ca3af', fontSize: '12.5px' }}>
            No conversations match your filter criteria
          </div>
        ) : (
          conversations.map((conv) => {
            const isSelected = selectedId === conv.id;
            return (
              <div
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectConversation(conv.id);
                  }
                }}
                aria-label={`Conversation with ${conv.contact.name}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 12px',
                  minHeight: '62px',
                  cursor: 'pointer',
                  borderRadius: '12px',
                  background: isSelected ? '#f0f9ff' : '#ffffff',
                  boxShadow: isSelected ? '0 1px 3px rgba(2, 132, 199, 0.12)' : '0 1px 2px rgba(0,0,0,0.02)',
                  border: isSelected ? '1px solid #7dd3fc' : '1px solid #f1f5f9',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = '#f8fafc'; }}
                onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = '#ffffff'; }}
              >
                {/* Avatar circle with initials */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: conv.contact.avatarColor || '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 700,
                  }}>
                    {conv.contact.initials}
                  </div>
                  {/* Status indicator dot */}
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: conv.status === 'open' ? '#22c55e' : '#9ca3af',
                    border: '2px solid #ffffff',
                  }} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <span style={{
                      fontSize: '13.5px',
                      fontWeight: 700,
                      color: isSelected ? '#0369a1' : '#111827',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {conv.contact.name}
                    </span>
                    <span style={{ fontSize: '11px', color: '#9ca3af', flexShrink: 0, marginLeft: '6px' }}>
                      {conv.timestamp}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{
                      fontSize: '12px',
                      color: isSelected ? '#334155' : '#64748b',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      margin: 0,
                      maxWidth: '160px',
                    }}>
                      {conv.lastMessage}
                    </p>

                    {/* Unread badge */}
                    {conv.unreadCount > 0 && (
                      <span style={{
                        fontSize: '10.5px',
                        fontWeight: 700,
                        background: '#0284c7',
                        color: 'white',
                        padding: '2px 7px',
                        borderRadius: '999px',
                        flexShrink: 0,
                      }}>
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
