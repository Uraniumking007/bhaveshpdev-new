import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, Menu } from 'lucide-react';
import { AdminSidebar } from './admin/AdminSidebar';
import { ProjectsTab } from './admin/tabs/ProjectsTab';
import { TechnologiesTab } from './admin/tabs/TechnologiesTab';
import { CategoriesTab } from './admin/tabs/CategoriesTab';
import { CertificationsTab } from './admin/tabs/CertificationsTab';
import { TimelineTab } from './admin/tabs/TimelineTab';
import type { StaticData, TabType } from './admin/types';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export default function Admin({ title }: { title: string }) {
  const [data, setData] = useState<StaticData | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/admin/static-data');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setData(data);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/admin/static-data', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to save');
      setSaveStatus('saved');
      setUnsavedChanges(false);
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch {
      setSaveStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="animate-spin" size={24} />
          <span className="text-lg">Loading admin panel...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Data</h2>
          <p className="text-gray-500">Please refresh the page to try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white border-r border-gray-200
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSidebarOpen(false);
          }}
          data={data}
          unsavedChanges={unsavedChanges}
          saveStatus={saveStatus}
          onSave={handleSave}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="font-semibold text-gray-900">{title}</h1>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8 max-w-6xl">
          {activeTab === 'projects' && (
            <ProjectsTab
              data={data}
              setData={setData}
              setUnsavedChanges={setUnsavedChanges}
            />
          )}
          {activeTab === 'technologies' && (
            <TechnologiesTab
              data={data}
              setData={setData}
              setUnsavedChanges={setUnsavedChanges}
            />
          )}
          {activeTab === 'categories' && (
            <CategoriesTab
              data={data}
              setData={setData}
              setUnsavedChanges={setUnsavedChanges}
            />
          )}
          {activeTab === 'certifications' && (
            <CertificationsTab
              data={data}
              setData={setData}
              setUnsavedChanges={setUnsavedChanges}
            />
          )}
          {activeTab === 'timeline' && (
            <TimelineTab
              data={data}
              setData={setData}
              setUnsavedChanges={setUnsavedChanges}
            />
          )}
        </div>
      </main>
    </div>
  );
}
