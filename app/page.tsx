'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import LeftSidebar from '@/components/LeftSidebar';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import DetailsPanel from '@/components/DetailsPanel';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { fetchConversations } from '@/lib/api';
import { Conversation, FilterStatus, FilterSort, ActiveCategory, Message } from '@/types';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
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

    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
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
      {/* Loading Screen */}
      {isLoading && <LoadingSkeleton onComplete={() => setIsLoading(false)} />}

      {/* Main App - light theme */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: '#ffffff',
        overflow: 'hidden',
        visibility: isLoading ? 'hidden' : 'visible',
      }}>
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
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
    </>
  );
}
