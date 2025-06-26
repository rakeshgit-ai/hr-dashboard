"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { usePathname } from "next/navigation";
import { CreateUserModalProvider, useCreateUserModal } from "@/context/CreateUserModalContext";
import CreateUserNavButton from "@/components/CreateUserNavButton";
import CreateUserModal from "@/components/CreateUserModal";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const departments = ["HR", "Engineering", "Sales", "Marketing", "Finance"];

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
        <CreateUserModalProvider>
          {/* Navigation Bar - only show if not on /login */}
          {pathname !== "/login" && (
            <nav className="sticky top-0 z-50 flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900">
              <div className="flex gap-4">
                <Link href="/" className="font-semibold hover:underline">Home</Link>
                <Link href="/bookmarks" className="font-semibold hover:underline">Bookmarks</Link>
                <Link href="/analytics" className="font-semibold hover:underline">Analytics</Link>
              </div>
              <div className="flex gap-2">
                <CreateUserNavButton />
                <button onClick={logout} className="btn btn-outline">Logout</button>
              </div>
            </nav>
          )}
          {/* Place the modal here so it's available everywhere */}
          <CreateUserModalWrapper departments={departments} />
          {children}
        </CreateUserModalProvider>
      </body>
    </html>
  );
}

// Add this inside your layout.tsx file (or import it)
function CreateUserModalWrapper({ departments }: { departments: string[] }) {
  const { show, close } = useCreateUserModal();
  const handleCreateUser = (user: any) => {
    // Add your user creation logic here if needed
    close();
  };
  return (
    <CreateUserModal
      open={show}
      onClose={close}
      onCreate={handleCreateUser}
      departments={departments}
    />
  );
}
