# BOXpod / Heyy - Front-End Assessment (Inbox Dashboard)

A modern, responsive, high-performance Inbox Dashboard built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**, based on the provided Figma design specs.

![BOXpod Inbox Dashboard Preview](https://raw.githubusercontent.com/vercel/next.js/canary/docs/public/favicon.ico)

---

## 🌟 Key Features

1. **Extraction Loading Skeleton**:
   - Animated initial loading screen with glowing blue spinner ring and dark glassmorphic preview backdrop.
   - Smooth sequence transition into the main populated dashboard.

2. **Top Navigation Bar**:
   - Custom brand header with BOXpod logo, main navigation tabs (`Inbox`, `Contacts`, `AI Employees`, `Workflows`, `Campaigns`), quick search bar, notification indicators, and user profile pill (`Michael Johnson`).

3. **Left Navigation Sidebar**:
   - Inbox view filters (`My Inbox`, `All`, `Unassigned`) with active unread counts.
   - Team channels (`Sales`, `Customer Support`) and live channel status (`WebChat`).

4. **Interactive Chat List**:
   - Filter by status (`All`, `Open`, `Closed`, `Unassigned`).
   - Sort by date (`Newest`, `Oldest`).
   - Real-time search by contact name, email, or message contents.
   - Avatar badges, active item highlight, and unread counters.

5. **Active Conversation Stream**:
   - Full recipient header with online status pill, assignee details, and call/video action buttons.
   - Incoming & outgoing styled message bubbles with timestamp separators.
   - Interactive message composer to send messages dynamically.
   - Toggle button for Contact Details side drawer.

6. **Contact Details Panel**:
   - Comprehensive contact details (First Name, Last Name, Email, Phone, Company, Role).
   - Interactive Tag/Label management: Add custom tags (`Interested`, `Chicago`, etc.) or remove existing ones.
   - Interactive Notes section: Add custom internal notes or delete existing ones.

---

## 🛠️ Tech Stack & Libraries

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🔌 API Integration

This application integrates live APIs with fallback resilience:
- **Live User Profiles**: Fetched dynamically from `https://dummyjson.com/users?limit=6`.
- **Live Fallbacks**: Structured fallback dataset (`lib/api.ts`) ensuring flawless offline/demo operation.

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js 18+** and **npm** installed on your system.

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone https://github.com/your-username/favlogic.git
cd favlogic
npm install
```

### 3. Running Development Server
Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
To create an optimized production build:
```bash
npm run build
npm run start
```

---

## 📝 Design Assumptions & Architecture

- **App Router**: Uses Next.js Client & Server Component separation for optimal UI speed and responsive state management.
- **State Flow**: Standard React state flow for active conversation selection, search inputs, tag additions, and note edits.
- **Responsive Layout**: Designed for mobile, tablet, and desktop views with responsive drawer collapsing.

---

## 📄 License
This project is completed as a Front-End Assessment for Favlogix.
