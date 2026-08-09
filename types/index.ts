export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  initials: string;
  avatarColor: string;
  assignee: string;
  team: string;
  role?: string;
  company?: string;
}

export interface Message {
  id: string | number;
  senderId: number | 'me';
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  contact: Contact;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: 'open' | 'closed' | 'unassigned';
  category: 'my_inbox' | 'all' | 'unassigned';
  team: 'sales' | 'customer_support' | 'general';
  messages: Message[];
  labels: string[];
  notes: string[];
}

export type FilterStatus = 'all' | 'open' | 'closed' | 'unassigned';
export type FilterSort = 'newest' | 'oldest';
export type ActiveCategory = 'my_inbox' | 'all' | 'unassigned' | 'sales' | 'customer_support';
