'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import LeftSidebar from '@/components/LeftSidebar';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import DetailsPanel from '@/components/DetailsPanel';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import DashboardSkeleton from '@/components/DashboardSkeleton';
import { fetchConversations } from '@/lib/api';
import { Conversation, FilterStatus, FilterSort, ActiveCategory, Message } from '@/types';

export default function Home() {
  const [isExtracting, setIsExtracting] = useState(true);
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('open');
  const [sortFilter, setSortFilter] = useState<FilterSort>('newest');
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('my_inbox');
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Inbox');

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

      // 2. 1-second Light Dashboard Skeleton loading (1s) matching Figma screenshot!
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

  return (
    <>
      {/* 1. Initial Dark Extraction Screen */}
      {isExtracting && <LoadingSkeleton onComplete={() => { setIsExtracting(false); setIsDashboardLoading(true); setTimeout(() => setIsDashboardLoading(false), 1000); }} />}

      {/* 2. 1-second Dashboard Skeleton loading matching user's uploaded image */}
      {!isExtracting && isDashboardLoading && <DashboardSkeleton />}

      {/* 3. Main interactive app */}
      {!isExtracting && !isDashboardLoading && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          background: '#ffffff',
          overflow: 'hidden',
        }}>
          <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

          <div style={{
            display: 'flex',
            flex: 1,
            overflow: 'hidden',
            background: '#d9dad5',
            padding: '8px',
            gap: '8px',
          }}>
            <LeftSidebar
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />

          <ChatList
            conversations={filteredConversations}
            selectedId={selectedId}
            onSelectConversation={setSelectedId}
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
          />

          {isDetailsOpen && activeConversation && (
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
          )}
        </div>
      </div>
      )}
    </>
  );
}
