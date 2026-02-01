/**
 * Admin Main Content Component
 *
 * Main content area wrapper for admin pages.
 * Handles mobile header and content container.
 */

import type { ReactNode } from 'react';

interface AdminMainProps {
  children: ReactNode;
  title: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function AdminMain({ children, title, sidebarOpen, setSidebarOpen }: AdminMainProps) {
  return (
    <main className="flex-1 min-w-0">
      {/* Mobile Header */}
      <AdminHeader title={title} onMenuClick={() => setSidebarOpen(true)} />

      {/* Content */}
      <div className="p-4 lg:p-8 max-w-6xl">{children}</div>
    </main>
  );
}

import { AdminHeader } from './AdminHeader';
