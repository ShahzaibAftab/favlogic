'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import LeftSidebar from '@/components/LeftSidebar';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import DetailsPanel from '@/components/DetailsPanel';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import DashboardSkeleton from '@/components/DashboardSkeleton';
import MobileDashboardSkeleton from '@/components/MobileDashboardSkeleton';
import { fetchConversations } from '@/lib/api';
import { Conversation, FilterStatus, FilterSort, ActiveCategory, Message } from '@/types';

// Mobile Bottom Navigation Bar Icons
const InboxNavIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
  </svg>
);

const ContactsNavIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const BotNavIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/>
    <line x1="8" y1="16" x2="8" y2="16"/>
    <line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
);

const WorkflowsNavIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);

const CampaignsNavIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
);

export default function Home() {
  const [isExtracting, setIsExtracting] = useState(true);
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('open');
  const [sortFilter, setSortFilter] = useState<FilterSort>('newest');
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('my_inbox');
  const [activeTab, setActiveTab] = useState('Inbox');

  // Responsive state management
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1280);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState<boolean>(true);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(true);
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1200;
  const isDesktop = windowWidth >= 1200;

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setWindowWidth(w);
      if (w >= 1200) {
        // Desktop default: sidebar & details open embedded
        setIsLeftSidebarOpen(true);
        setIsDetailsOpen(true);
      } else {
        // Tablet / Mobile default: drawers closed until toggled
        setIsLeftSidebarOpen(false);
        setIsDetailsOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard Escape listener
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (isLeftSidebarOpen && !isDesktop) {
        setIsLeftSidebarOpen(false);
      } else if (isDetailsOpen && !isDesktop) {
        setIsDetailsOpen(false);
      } else if (isMobile && mobileView === 'chat') {
        setMobileView('list');
      }
    }
  }, [isLeftSidebarOpen, isDetailsOpen, isDesktop, isMobile, mobileView]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchConversations();
      setConversations(data);
      if (data.length > 0) {
        setSelectedId(data[0].id);
      }
    }
    loadData();

    // 1. Initial dark extraction loading (1.8s)
    const timer1 = setTimeout(() => {
      setIsExtracting(false);
      setIsDashboardLoading(true);

      // 2. Light Dashboard Skeleton loading (1s)
      setTimeout(() => {
        setIsDashboardLoading(false);
      }, 1000);
    }, 1800);

    return () => clearTimeout(timer1);
  }, []);

  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === selectedId) || null;
  }, [conversations, selectedId]);

  const filteredConversations = useMemo(() => {
    return conversations
      .filter((conv) => {
        if (activeCategory === 'my_inbox' && conv.category !== 'my_inbox') return false;
        if (activeCategory === 'unassigned' && conv.category !== 'unassigned') return false;
        if (activeCategory === 'sales' && conv.team !== 'sales') return false;
        if (activeCategory === 'customer_support' && conv.team !== 'customer_support') return false;

        if (statusFilter !== 'all' && statusFilter !== 'open') {
          if (conv.status !== statusFilter) return false;
        }

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            conv.contact.name.toLowerCase().includes(q) ||
            conv.lastMessage.toLowerCase().includes(q) ||
            conv.contact.email.toLowerCase().includes(q)
          );
        }
        return true;
      });
  }, [conversations, activeCategory, statusFilter, searchQuery]);

  const handleSelectConversation = (id: string) => {
    setSelectedId(id);
    if (isMobile) {
      setMobileView('chat');
    }
  };

  const handleSendMessage = (text: string) => {
    if (!selectedId) return;
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      senderName: 'Michael Johnson',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      status: 'sent',
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? { ...c, lastMessage: text, timestamp: 'Just now', messages: [...c.messages, newMessage] }
          : c
      )
    );
  };

  const handleAddLabel = (label: string) => {
    if (!selectedId) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId && !c.labels.includes(label)
          ? { ...c, labels: [...c.labels, label] }
          : c
      )
    );
  };

  const handleRemoveLabel = (label: string) => {
    if (!selectedId) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId ? { ...c, labels: c.labels.filter((l) => l !== label) } : c
      )
    );
  };

  const handleAddNote = (note: string) => {
    if (!selectedId) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId ? { ...c, notes: [...c.notes, note] } : c
      )
    );
  };

  const handleRemoveNote = (index: number) => {
    if (!selectedId) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId ? { ...c, notes: c.notes.filter((_, i) => i !== index) } : c
      )
    );
  };

  const mobileNavItems = [
    { name: 'Inbox', icon: InboxNavIcon },
    { name: 'Contacts', icon: ContactsNavIcon },
    { name: 'AI Employees', icon: BotNavIcon },
    { name: 'Workflows', icon: WorkflowsNavIcon },
    { name: 'Campaigns', icon: CampaignsNavIcon },
  ];

  return (
    <>
      {/* 1. Initial Dark Extraction Screen (Responsive for mobile, tablet & desktop) */}
      {isExtracting && (
        <LoadingSkeleton
          onComplete={() => {
            setIsExtracting(false);
            setIsDashboardLoading(true);
            setTimeout(() => setIsDashboardLoading(false), 1000);
          }}
        />
      )}

      {/* 2. Light Dashboard Skeleton loading: MobileDashboardSkeleton on Mobile, DashboardSkeleton on Desktop/Tablet */}
      {!isExtracting && isDashboardLoading && (
        isMobile ? <MobileDashboardSkeleton /> : <DashboardSkeleton />
      )}

      {/* 3. Main interactive app */}
      {!isExtracting && !isDashboardLoading && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '100vw',
          background: '#ffffff',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Top Navigation Bar */}
          <Navbar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onToggleLeftSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
            isLeftSidebarOpen={isLeftSidebarOpen}
          />

          {/* Core App Container */}
          <div style={{
            display: 'flex',
            flex: 1,
            overflow: 'hidden',
            background: isMobile ? '#ffffff' : '#d9dad5',
            padding: isMobile ? '0' : '8px',
            gap: '8px',
            position: 'relative',
          }}>

            {/* A. LEFT SIDEBAR - Desktop embedded OR Overlay Drawer */}
            {isDesktop ? (
              isLeftSidebarOpen && (
                <LeftSidebar
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                />
              )
            ) : (
              isLeftSidebarOpen && (
                <div style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 50,
                  display: 'flex',
                }}>
                  {/* Backdrop */}
                  <div
                    onClick={() => setIsLeftSidebarOpen(false)}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(15, 23, 42, 0.45)',
                      backdropFilter: 'blur(2px)',
                    }}
                    className="backdrop-fade-in"
                  />
                  {/* Drawer Content */}
                  <div style={{ position: 'relative', height: '100%', zIndex: 51 }} className="slide-in-left">
                    <LeftSidebar
                      activeCategory={activeCategory}
                      onSelectCategory={setActiveCategory}
                      isDrawer={true}
                      onCloseDrawer={() => setIsLeftSidebarOpen(false)}
                    />
                  </div>
                </div>
              )
            )}

            {/* B. MAIN MESSAGING WORKSPACE (ChatList & ChatWindow) */}

            {/* MOBILE (<768px): Single View Switching (List or Chat) */}
            {isMobile ? (
              mobileView === 'list' ? (
                <ChatList
                  conversations={filteredConversations}
                  selectedId={selectedId}
                  onSelectConversation={handleSelectConversation}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  statusFilter={statusFilter}
                  onStatusFilterChange={setStatusFilter}
                  sortFilter={sortFilter}
                  onSortFilterChange={setSortFilter}
                  isMobile={true}
                  onToggleLeftSidebar={() => setIsLeftSidebarOpen(true)}
                />
              ) : (
                <ChatWindow
                  conversation={activeConversation}
                  onSendMessage={handleSendMessage}
                  onToggleDetails={() => setIsDetailsOpen(!isDetailsOpen)}
                  isDetailsOpen={isDetailsOpen}
                  onBackToList={() => setMobileView('list')}
                  isMobile={true}
                />
              )
            ) : (
              /* TABLET & DESKTOP (>=768px): ChatList + ChatWindow rendered side-by-side */
              <>
                <ChatList
                  conversations={filteredConversations}
                  selectedId={selectedId}
                  onSelectConversation={handleSelectConversation}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  statusFilter={statusFilter}
                  onStatusFilterChange={setStatusFilter}
                  sortFilter={sortFilter}
                  onSortFilterChange={setSortFilter}
                />

                <ChatWindow
                  conversation={activeConversation}
                  onSendMessage={handleSendMessage}
                  onToggleDetails={() => setIsDetailsOpen(!isDetailsOpen)}
                  isDetailsOpen={isDetailsOpen}
                  onToggleLeftSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
                  isLeftSidebarOpen={isLeftSidebarOpen}
                />
              </>
            )}

            {/* C. DETAILS PANEL - Desktop embedded OR Overlay Drawer */}
            {isDesktop ? (
              isDetailsOpen && activeConversation && (
                <DetailsPanel
                  contact={activeConversation.contact}
                  labels={activeConversation.labels}
                  notes={activeConversation.notes}
                  onAddLabel={handleAddLabel}
                  onRemoveLabel={handleRemoveLabel}
                  onAddNote={handleAddNote}
                  onRemoveNote={handleRemoveNote}
                  onClose={() => setIsDetailsOpen(false)}
                />
              )
            ) : (
              isDetailsOpen && activeConversation && (
                <div style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 50,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}>
                  {/* Backdrop */}
                  <div
                    onClick={() => setIsDetailsOpen(false)}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(15, 23, 42, 0.45)',
                      backdropFilter: 'blur(2px)',
                    }}
                    className="backdrop-fade-in"
                  />
                  {/* Drawer Content */}
                  <div style={{ position: 'relative', height: '100%', zIndex: 51 }} className="slide-in-right">
                    <DetailsPanel
                      contact={activeConversation.contact}
                      labels={activeConversation.labels}
                      notes={activeConversation.notes}
                      onAddLabel={handleAddLabel}
                      onRemoveLabel={handleRemoveLabel}
                      onAddNote={handleAddNote}
                      onRemoveNote={handleRemoveNote}
                      onClose={() => setIsDetailsOpen(false)}
                      isDrawer={true}
                    />
                  </div>
                </div>
              )
            )}
          </div>

          {/* D. MOBILE BOTTOM NAVIGATION */}
          {isMobile && (
            <nav
              aria-label="Mobile Navigation Bar"
              style={{
                height: '56px',
                borderTop: '1px solid #e5e7eb',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexShrink: 0,
                zIndex: 30,
              }}
            >
              {mobileNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveTab(item.name);
                      if (mobileView === 'chat') {
                        setMobileView('list');
                      }
                    }}
                    aria-label={`Switch to ${item.name} tab`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '3px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: isActive ? '#0284c7' : '#64748b',
                      fontSize: '10px',
                      fontWeight: isActive ? 700 : 500,
                      padding: '4px 8px',
                    }}
                  >
                    <Icon />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      )}
    </>
  );
}
