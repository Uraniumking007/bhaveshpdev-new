/**
 * Admin Header Component
 *
 * Mobile header with hamburger menu and page title.
 * Only visible on mobile devices.
 */

import { Menu } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  onMenuClick: () => void;
}

export function AdminHeader({ title, onMenuClick }: AdminHeaderProps) {
  return (
    <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
      <button
        onClick={onMenuClick}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>
      <h1 className="font-semibold text-gray-900">{title}</h1>
    </header>
  );
}
