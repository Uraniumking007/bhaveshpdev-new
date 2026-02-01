/**
 * Admin Sidebar Component
 *
 * Navigation sidebar with tab links and save button.
 * Shows count badges for each tab.
 */

import { LayoutDashboard, Save, CheckCircle2, AlertCircle, Loader2, ChevronRight } from 'lucide-react';
import { FolderGit2, Code2, Tags, Award, Clock } from 'lucide-react';
import type { TabType, StaticData } from './types';

interface AdminSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  data: StaticData;
  unsavedChanges: boolean;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  onSave: () => void;
  onCloseMobile?: () => void;
}

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'projects', label: 'Projects', icon: <FolderGit2 size={20} /> },
  { id: 'technologies', label: 'Technologies', icon: <Code2 size={20} /> },
  { id: 'categories', label: 'Categories', icon: <Tags size={20} /> },
  { id: 'certifications', label: 'Certifications', icon: <Award size={20} /> },
  { id: 'timeline', label: 'Timeline', icon: <Clock size={20} /> },
];

export function AdminSidebar({
  activeTab,
  setActiveTab,
  data,
  unsavedChanges,
  saveStatus,
  onSave,
  onCloseMobile,
}: AdminSidebarProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <LayoutDashboard className="text-white" size={20} />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">Admin</h1>
            <p className="text-xs text-gray-500">Portfolio Manager</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1" role="navigation" aria-label="Admin navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              onCloseMobile?.();
            }}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
              transition-all duration-200
              ${activeTab === tab.id
                ? 'bg-blue-50 text-blue-700 font-medium shadow-sm ring-1 ring-blue-200'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            <span className={activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}>
              {tab.icon}
            </span>
            <span className="flex-1">{tab.label}</span>
            {activeTab === tab.id && <ChevronRight size={16} className="text-blue-500" />}
            {/* Count badge */}
            <span
              className={`
              text-xs px-2 py-0.5 rounded-full
              ${activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}
            `}
            >
              {data[tab.id].length}
            </span>
          </button>
        ))}
      </nav>

      {/* Save Status */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onSave}
          disabled={!unsavedChanges || saveStatus === 'saving'}
          className={`
            w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg
            font-medium transition-all duration-200
            ${unsavedChanges
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
              : saveStatus === 'saved'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
          aria-busy={saveStatus === 'saving'}
        >
          {saveStatus === 'saving' ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              Saving...
            </>
          ) : saveStatus === 'saved' ? (
            <>
              <CheckCircle2 size={18} aria-hidden="true" />
              Saved!
            </>
          ) : (
            <>
              <Save size={18} aria-hidden="true" />
              {unsavedChanges ? 'Save Changes' : 'All Saved'}
            </>
          )}
        </button>
        {unsavedChanges && (
          <p className="text-center text-xs text-amber-600 mt-2 flex items-center justify-center gap-1">
            <AlertCircle size={12} aria-hidden="true" />
            Unsaved changes
          </p>
        )}
      </div>
    </div>
  );
}
