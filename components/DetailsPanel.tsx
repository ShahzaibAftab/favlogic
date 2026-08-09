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
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', marginBottom: isAddingTag ? '8px' : '0' }}>
          {labels.map((label) => (
            <span
              key={label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '999px',
                background: '#f0f9ff',
                color: '#0284c7',
                fontSize: '11.5px',
                fontWeight: 600,
                border: '1px solid #0284c7',
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
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
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#ffffff',
              border: '1px solid #0284c7',
              color: '#0284c7',
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
            style={{ display: 'flex', gap: '6px', marginTop: '6px' }}
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
            <button type="submit" style={{ padding: '4px 10px', background: '#0284c7', color: 'white', border: 'none', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>
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
          borderRadius: '8px',
          padding: '8px 12px',
          marginBottom: '8px',
          fontSize: '12px',
          color: '#854d0e',
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
              color: '#854d0e',
            }}
          />
        </div>

        {notes.map((note, index) => (
          <div
            key={index}
            style={{
              background: '#fef08a',
              border: '1px solid #fde047',
              borderRadius: '8px',
              padding: '10px 12px',
              marginBottom: '6px',
              fontSize: '12.5px',
              fontWeight: 500,
              color: '#713f12',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '6px',
            }}
          >
            <span style={{ flex: 1, lineHeight: '1.4' }}>{note}</span>
            <button
              onClick={() => onRemoveNote(index)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: '#854d0e', opacity: 0.6, flexShrink: 0, padding: 0 }}
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
          gap: '10px',
          padding: '6px 0',
        }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0,
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#111827' }}>Fit4Life</span>
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>08/08/25</span>
            </div>
            <span style={{ fontSize: '11.5px', color: '#6b7280' }}>On my way!</span>
          </div>
        </div>
      </Section>
    </aside>
  );
}
