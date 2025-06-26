"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logout = useAuthStore((state) => state.logout);
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Navigation Bar - only show if not on /login */}
        {pathname !== "/login" && (
          <nav className="flex gap-4 p-4 bg-gray-100 dark:bg-gray-900">
            <Link href="/" className="font-semibold hover:underline">Home</Link>
            <Link href="/bookmarks" className="font-semibold hover:underline">Bookmarks</Link>
            <Link href="/analytics" className="font-semibold hover:underline">Analytics</Link>
            <button onClick={logout} className="btn btn-outline">Logout</button>
          </nav>
        )}
        {children}
      </body>
    </html>
  );
}