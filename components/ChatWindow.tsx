'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Conversation, Message } from '@/types';

interface ChatWindowProps {
  conversation: Conversation | null;
  onSendMessage: (text: string) => void;
  onToggleDetails: () => void;
  isDetailsOpen: boolean;
  onToggleLeftSidebar?: () => void;
  isLeftSidebarOpen?: boolean;
  onBackToList?: () => void;
  isMobile?: boolean;
}

const BackArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const SidebarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <line x1="9" y1="3" x2="9" y2="21"/>
  </svg>
);

const DetailsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <line x1="15" y1="3" x2="15" y2="21"/>
  </svg>
);

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

const DownArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <polyline points="19 12 12 19 5 12"/>
  </svg>
);

const EMOJI_LIST = ['😊', '👍', '🎉', '❤️', '🙏', '🚀', '🔥', '💡', '👋', '✅', '👏', '😍', '🙌', '⭐', '🤝', '⚡'];
const QUICK_REPLIES = ['Thanks!', "I'll check on this", 'Scheduled', 'Can you provide details?'];

export default function ChatWindow({
  conversation,
  onSendMessage,
  onToggleDetails,
  isDetailsOpen,
  onToggleLeftSidebar,
  onBackToList,
  isMobile = false,
}: ChatWindowProps) {
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  };

  useEffect(() => {
    scrollToBottom(true);
  }, [conversation?.messages?.length, conversation?.id]);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const isBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    setShowScrollBottom(!isBottom);
  };

  if (!conversation) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f9fafb', color: '#9ca3af', fontSize: '13px', padding: '24px' }}>
        <p style={{ margin: 0, fontWeight: 500 }}>Select a conversation to get started</p>
      </div>
    );
  }

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
    setShowEmojiPicker(false);
    
    // Toast confirmation feedback
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);

    setTimeout(() => scrollToBottom(true), 50);
  };

  const handleQuickReply = (text: string) => {
    onSendMessage(text);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
    setTimeout(() => scrollToBottom(true), 50);
  };

  const handleInsertEmoji = (emoji: string) => {
    setInputText((prev) => prev + emoji);
    inputRef.current?.focus();
  };

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#ffffff',
      minWidth: 0,
      borderRadius: isMobile ? '0' : '12px',
      border: isMobile ? 'none' : '1px solid #e2e8f0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Header */}
      <div style={{
        height: '52px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        flexShrink: 0,
        background: '#ffffff',
        zIndex: 10,
      }}>
        {/* Left Section: Back Button (Mobile) + Left Sidebar Toggle + Contact Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
          {isMobile && onBackToList && (
            <button
              onClick={onBackToList}
              aria-label="Back to chat list"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                borderRadius: '8px',
                background: '#f0f9ff',
                border: '1px solid #bae6fd',
                color: '#0284c7',
                fontWeight: 600,
                fontSize: '12.5px',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <BackArrowIcon />
              <span>Chats</span>
            </button>
          )}

          {onToggleLeftSidebar && !isMobile && (
            <button
              onClick={onToggleLeftSidebar}
              aria-label="Toggle navigation sidebar"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                color: '#6b7280',
                borderRadius: '6px',
              }}
            >
              <SidebarIcon />
            </button>
          )}

          <div style={{ minWidth: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: conversation.contact.avatarColor || '#0284c7',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12.5px',
              fontWeight: 700,
              flexShrink: 0,
            }}>
              {conversation.contact.initials}
            </div>
            <div style={{ minWidth: 0 }}>
              <h2 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {conversation.contact.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#6b7280' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Details Panel toggle + Action icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
          <button
            onClick={onToggleDetails}
            aria-label={isDetailsOpen ? 'Close contact details panel' : 'Open contact details panel'}
            style={{
              background: isDetailsOpen ? '#f3f4f6' : 'none',
              border: isDetailsOpen ? '1px solid #e5e7eb' : 'none',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              color: '#6b7280',
              borderRadius: '6px',
            }}
          >
            <DetailsIcon />
          </button>

          <button
            aria-label="More options"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', color: '#6b7280', borderRadius: '6px' }}
          >
            <MoreIcon />
          </button>

          {/* Moon & Lock Theme controls */}
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '4px' }}>
            <button
              aria-label="Toggle dark theme mode"
              style={{
                background: '#1e293b',
                border: 'none',
                cursor: 'pointer',
                padding: '5px 7px',
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                borderRadius: '6px 0 0 6px',
              }}
            >
              <MoonIcon />
            </button>
            <button
              aria-label="Privacy lock mode"
              style={{
                background: '#1e293b',
                border: 'none',
                cursor: 'pointer',
                padding: '5px 7px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '0 6px 6px 0',
                borderLeft: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <LockIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: isMobile ? '12px 14px' : '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
        className="touch-scroll"
      >
        {/* Date separator */}
        <div style={{ textAlign: 'center', margin: '4px 0 16px' }}>
          <span style={{
            fontSize: '11px',
            color: '#9ca3af',
            background: '#f3f4f6',
            padding: '3px 12px',
            borderRadius: '999px',
            fontWeight: 500,
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
                maxWidth: isMobile ? '82%' : '65%',
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

      {/* Scroll-to-Bottom Floating Button */}
      {showScrollBottom && (
        <button
          onClick={() => scrollToBottom(true)}
          aria-label="Scroll to bottom of chat thread"
          style={{
            position: 'absolute',
            bottom: '120px',
            right: '20px',
            background: '#0284c7',
            color: 'white',
            border: 'none',
            borderRadius: '999px',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            zIndex: 20,
          }}
          className="fade-in"
        >
          <DownArrowIcon />
          <span>Latest messages</span>
        </button>
      )}

      {/* Sent Message Toast Notification */}
      {showToast && (
        <div style={{
          position: 'absolute',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1e293b',
          color: '#ffffff',
          fontSize: '12px',
          fontWeight: 600,
          padding: '6px 14px',
          borderRadius: '999px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }} className="toast-slide-up">
          <span style={{ color: '#22c55e', fontWeight: 800 }}>✓</span> Message sent
        </div>
      )}

      {/* Quick Reply Chips Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        background: '#fafafa',
        borderTop: '1px solid #f3f4f6',
        overflowX: 'auto',
        flexShrink: 0,
      }} className="touch-scroll">
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', flexShrink: 0 }}>Quick:</span>
        {QUICK_REPLIES.map((reply) => (
          <button
            key={reply}
            onClick={() => handleQuickReply(reply)}
            style={{
              padding: '4px 10px',
              borderRadius: '999px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              fontSize: '11.5px',
              color: '#374151',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0284c7'; e.currentTarget.style.color = '#0284c7'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#374151'; }}
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Emoji Picker Popover overlay */}
      {showEmojiPicker && (
        <div style={{
          position: 'absolute',
          bottom: '64px',
          left: '12px',
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
          padding: '10px',
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: '6px',
          zIndex: 40,
        }} className="fade-in">
          {EMOJI_LIST.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleInsertEmoji(emoji)}
              aria-label={`Insert ${emoji} emoji`}
              style={{
                fontSize: '18px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '6px',
                lineHeight: 1,
              }}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Composer Section */}
      <div style={{
        borderTop: '1px solid #e5e7eb',
        background: '#ffffff',
        flexShrink: 0,
      }}>
        <form onSubmit={handleSend}>
          <div style={{ padding: '8px 12px 2px' }}>
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type something..."
              aria-label="Message composer input"
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: '13px',
                color: '#374151',
                background: 'transparent',
                padding: '4px 0',
              }}
            />
          </div>

          {/* Toolbar row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4px 10px 8px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <button type="button" aria-label="Attach image" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', color: '#6b7280', borderRadius: '4px' }}>
                <ImageIcon />
              </button>
              <button type="button" aria-label="Attach video" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', color: '#6b7280', borderRadius: '4px' }}>
                <VideoIcon />
              </button>
              <button type="button" aria-label="View templates" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', color: '#6b7280', borderRadius: '4px' }}>
                <GridIcon />
              </button>
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                aria-label="Open emoji picker"
                style={{
                  background: showEmojiPicker ? '#f3f4f6' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  color: showEmojiPicker ? '#0284c7' : '#6b7280',
                  borderRadius: '4px',
                }}
              >
                <EmojiIcon />
              </button>
              <button type="button" aria-label="Attach document" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', color: '#6b7280', borderRadius: '4px' }}>
                <AttachIcon />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button type="button" aria-label="Quick actions" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', color: '#6b7280', borderRadius: '4px' }}>
                <LightningIcon />
              </button>
              <button type="button" aria-label="Voice note" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', color: '#6b7280', borderRadius: '4px' }}>
                <MicIcon />
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputText.trim()}
                aria-label="Send message"
                style={{
                  background: inputText.trim() ? '#0284c7' : '#e5e7eb',
                  color: inputText.trim() ? '#ffffff' : '#9ca3af',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: inputText.trim() ? 'pointer' : 'default',
                  transition: 'all 0.15s ease',
                  marginLeft: '4px',
                }}
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
