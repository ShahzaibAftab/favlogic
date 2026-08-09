'use client';

import React, { useState } from 'react';
import { Contact } from '@/types';

interface DetailsPanelProps {
  contact: Contact | null;
  labels: string[];
  notes: string[];
  onAddLabel: (label: string) => void;
  onRemoveLabel: (label: string) => void;
  onAddNote: (note: string) => void;
  onRemoveNote: (index: number) => void;
  onClose: () => void;
}

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const PersonCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const ExpandIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const XIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

interface SectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Section({ title, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid #f3f4f6' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '12.5px',
          fontWeight: 600,
          color: '#111827',
        }}
      >
        {title}
        <span style={{ transform: open ? 'rotate(0)' : 'rotate(-90deg)', transition: 'transform 0.2s' }}>
          <ChevronDown />
        </span>
      </button>
      {open && <div style={{ padding: '0 14px 12px' }}>{children}</div>}
    </div>
  );
}

export default function DetailsPanel({
  contact,
  labels,
  notes,
  onAddLabel,
  onRemoveLabel,
  onAddNote,
  onRemoveNote,
  onClose,
}: DetailsPanelProps) {
  const [newLabelInput, setNewLabelInput] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newNoteInput, setNewNoteInput] = useState('');

  if (!contact) return null;

  const fieldRow = (label: string, value: string) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', gap: '8px' }}>
      <span style={{ fontSize: '12px', color: '#9ca3af', flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: '12.5px', color: '#374151', textAlign: 'right', fontWeight: 400 }}>{value}</span>
    </div>
  );

  const chatDataRow = (label: string, value: string) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', gap: '8px' }}>
      <span style={{ fontSize: '12px', color: '#9ca3af', flexShrink: 0 }}>{label}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', color: '#374151', fontWeight: 400 }}>
        <PersonCircleIcon />
        {value}
      </span>
    </div>
  );

  return (
    <aside style={{
      width: '272px',
      flexShrink: 0,
      borderLeft: '1px solid #e5e7eb',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{
        height: '52px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 14px',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Details</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex' }}>
          <ExpandIcon />
        </button>
      </div>

      {/* Chat Data */}
      <Section title="Chat Data">
        {chatDataRow('Assignee', contact.assignee)}
        {chatDataRow('Team', contact.team)}
      </Section>

      {/* Contact Data */}
      <Section title="Contact Data">
        {fieldRow('First Name', contact.firstName)}
        {fieldRow('Last Name', contact.lastName)}
        {fieldRow('Phone number', contact.phone)}
        {fieldRow('Email', contact.email)}
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#6366f1', padding: 0, marginTop: '4px' }}>
          See all
        </button>
      </Section>

      {/* Contact Labels */}
      <Section title="Contact Labels">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: isAddingTag ? '8px' : '0' }}>
          {labels.map((label) => (
            <span
              key={label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 8px',
                borderRadius: '999px',
                background: label === 'Closed Won' ? '#dbeafe' : '#d1fae5',
                color: label === 'Closed Won' ? '#1d4ed8' : '#065f46',
                fontSize: '11.5px',
                fontWeight: 500,
                border: label === 'Closed Won' ? '1px solid #bfdbfe' : '1px solid #a7f3d0',
              }}
            >
              {label}
              <button
                onClick={() => onRemoveLabel(label)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: 'inherit', opacity: 0.6 }}
              >
                <XIcon />
              </button>
            </span>
          ))}
          <button
            onClick={() => setIsAddingTag(!isAddingTag)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: '#f3f4f6',
              border: '1px solid #e5e7eb',
              cursor: 'pointer',
            }}
          >
            <PlusIcon />
          </button>
        </div>
        {isAddingTag && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newLabelInput.trim()) {
                onAddLabel(newLabelInput.trim());
                setNewLabelInput('');
                setIsAddingTag(false);
              }
            }}
            style={{ display: 'flex', gap: '6px' }}
          >
            <input
              type="text"
              value={newLabelInput}
              onChange={(e) => setNewLabelInput(e.target.value)}
              placeholder="Tag name..."
              autoFocus
              style={{
                flex: 1,
                fontSize: '12px',
                padding: '4px 8px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                outline: 'none',
              }}
            />
            <button type="submit" style={{ padding: '4px 10px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>
              Add
            </button>
          </form>
        )}
      </Section>

      {/* Notes */}
      <Section title="Notes">
        {/* "Add a note" input area */}
        <div style={{
          background: '#fef9c3',
          border: '1px solid #fde68a',
          borderRadius: '6px',
          padding: '8px 10px',
          marginBottom: '8px',
          fontSize: '12px',
          color: '#92400e',
          cursor: 'text',
        }}>
          <input
            type="text"
            value={newNoteInput}
            onChange={(e) => setNewNoteInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newNoteInput.trim()) {
                onAddNote(newNoteInput.trim());
                setNewNoteInput('');
              }
            }}
            placeholder="Add a note"
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              outline: 'none',
              fontSize: '12px',
              color: '#92400e',
            }}
          />
        </div>

        {notes.map((note, index) => (
          <div
            key={index}
            style={{
              background: '#fef9c3',
              border: '1px solid #fde68a',
              borderRadius: '6px',
              padding: '8px 10px',
              marginBottom: '6px',
              fontSize: '12px',
              color: '#92400e',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '6px',
            }}
          >
            <span style={{ flex: 1, lineHeight: '1.4' }}>{note}</span>
            <button
              onClick={() => onRemoveNote(index)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: '#b45309', opacity: 0.6, flexShrink: 0, padding: 0 }}
            >
              <XIcon />
            </button>
          </div>
        ))}
      </Section>

      {/* Other Chats */}
      <Section title="Other Chats" defaultOpen={true}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 0',
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '11px',
            fontWeight: 700,
            flexShrink: 0,
          }}>
            F
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#111827' }}>Fit4Life</span>
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>08/06/25</span>
            </div>
            <span style={{ fontSize: '11.5px', color: '#6b7280' }}>On my way!</span>
          </div>
        </div>
      </Section>
    </aside>
  );
}
