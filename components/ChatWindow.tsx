'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Conversation, Message } from '@/types';

interface ChatWindowProps {
  conversation: Conversation | null;
  onSendMessage: (text: string) => void;
  onToggleDetails: () => void;
  isDetailsOpen: boolean;
}

const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const LockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="white" stroke="none">
    <path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" stroke="white" strokeWidth="2"/>
  </svg>
);

const ExpandIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
  </svg>
);

// Bottom toolbar icons
const ImageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const VideoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7"/>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
  </svg>
);

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const EmojiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);

const AttachIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>
);

const LightningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const MicIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

export default function ChatWindow({ conversation, onSendMessage, onToggleDetails, isDetailsOpen }: ChatWindowProps) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  };

  useEffect(() => {
    scrollToBottom(true);
  }, [conversation?.messages?.length, conversation?.id]);

  if (!conversation) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb', color: '#9ca3af', fontSize: '13px' }}>
        Select a conversation to get started
      </div>
    );
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
    setTimeout(() => scrollToBottom(true), 50);
  };

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#ffffff',
      minWidth: 0,
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
    }}>
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
        <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: 0 }}>
          {conversation.contact.name}
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', color: '#6b7280' }}>
            <MoreIcon />
          </button>
          {/* Moon button */}
          <button style={{
            background: '#1e293b',
            border: 'none',
            cursor: 'pointer',
            padding: '5px 7px',
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            borderRadius: '6px 0 0 6px',
          }}>
            <MoonIcon />
          </button>
          {/* Lock button */}
          <button style={{
            background: '#1e293b',
            border: 'none',
            cursor: 'pointer',
            padding: '5px 7px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '0 6px 6px 0',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
          }}>
            <LockIcon />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '0' }}>
        {/* Date separator */}
        <div style={{ textAlign: 'center', margin: '8px 0 16px' }}>
          <span style={{
            fontSize: '11.5px',
            color: '#9ca3af',
            background: '#f3f4f6',
            padding: '3px 12px',
            borderRadius: '999px',
          }}>
            28 August 2025
          </span>
        </div>

        {conversation.messages.map((msg: Message) => {
          const isMe = msg.isMe;

          return (
            <div
              key={msg.id}
              className="fade-in"
              style={{
                display: 'flex',
                justifyContent: isMe ? 'flex-end' : 'flex-start',
                alignItems: 'flex-end',
                gap: '8px',
                marginBottom: '12px',
                width: '100%',
              }}
            >
              {isMe && (
                <div style={{
                  fontSize: '11px',
                  color: '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap',
                  marginBottom: '2px',
                  flexShrink: 0,
                }}>
                  <span style={{ color: '#0284c7', fontSize: '12px', fontWeight: 700 }}>✓✓</span>
                  {msg.timestamp}
                </div>
              )}

              {/* Message Bubble */}
              <div style={{
                maxWidth: '65%',
                padding: '10px 14px',
                borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: isMe ? '#f3e8ff' : '#f1f5f9',
                color: '#1e293b',
                fontSize: '13px',
                lineHeight: '1.55',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              }}>
                {msg.text}
              </div>

              {!isMe && (
                <div style={{
                  fontSize: '11px',
                  color: '#9ca3af',
                  whiteSpace: 'nowrap',
                  marginBottom: '2px',
                  flexShrink: 0,
                }}>
                  {msg.timestamp}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Composer */}
      <div style={{
        borderTop: '1px solid #e5e7eb',
        background: '#ffffff',
        flexShrink: 0,
      }}>
        {/* Input row */}
        <form onSubmit={handleSend}>
          <div style={{ padding: '10px 16px 4px' }}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type something..."
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: '13px',
                color: '#374151',
                background: 'transparent',
              }}
            />
          </div>

          {/* Toolbar row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4px 12px 10px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', color: '#6b7280', borderRadius: '4px' }}>
                <ImageIcon />
              </button>
              <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', color: '#6b7280', borderRadius: '4px' }}>
                <VideoIcon />
              </button>
              <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', color: '#6b7280', borderRadius: '4px' }}>
                <GridIcon />
              </button>
              <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', color: '#6b7280', borderRadius: '4px' }}>
                <EmojiIcon />
              </button>
              <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', color: '#6b7280', borderRadius: '4px' }}>
                <AttachIcon />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', color: '#6b7280', borderRadius: '4px' }}>
                <LightningIcon />
              </button>
              <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', color: '#6b7280', borderRadius: '4px' }}>
                <MicIcon />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
