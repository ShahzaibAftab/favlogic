import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Heyy - Inbox Dashboard",
  description: "AI-powered customer support inbox by Heyy",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body style={{ margin: 0, padding: 0, height: '100vh', overflow: 'hidden' }}>
        {children}
      </body>
    </html>
  );
}
