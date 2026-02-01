import { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { AdminLayout } from './admin/AdminLayout';
import { AdminSidebar } from './admin/AdminSidebar';
import { AdminMain } from './admin/AdminMain';
import { ProjectsTab } from './admin/tabs/ProjectsTab';
import { TechnologiesTab } from './admin/tabs/TechnologiesTab';
import { CategoriesTab } from './admin/tabs/CategoriesTab';
import { CertificationsTab } from './admin/tabs/CertificationsTab';
import { TimelineTab } from './admin/tabs/TimelineTab';
import type { TabType, SaveStatus, StaticData } from './admin/types';

interface AdminProps {
  title: string;
}

export default function Admin({ title }: AdminProps) {
  const [data, setData] = useState<StaticData | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch('/api/admin/static-data')
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
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
      if (res.ok) {
        setSaveStatus('saved');
        setUnsavedChanges(false);
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        setSaveStatus('error');
      }
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
    <AdminLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} title={title}>
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        data={data}
        unsavedChanges={unsavedChanges}
        saveStatus={saveStatus}
        onSave={handleSave}
        onCloseMobile={() => setSidebarOpen(false)}
      />

      <AdminMain title={title} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        {activeTab === 'projects' && <ProjectsTab data={data} setData={setData} setUnsavedChanges={setUnsavedChanges} />}

        {activeTab === 'technologies' && <TechnologiesTab data={data} setData={setData} setUnsavedChanges={setUnsavedChanges} />}

        {activeTab === 'categories' && <CategoriesTab data={data} setData={setData} setUnsavedChanges={setUnsavedChanges} />}

        {activeTab === 'certifications' && <CertificationsTab data={data} setData={setData} setUnsavedChanges={setUnsavedChanges} />}

        {activeTab === 'timeline' && <TimelineTab data={data} setData={setData} setUnsavedChanges={setUnsavedChanges} />}
      </AdminMain>
    </AdminLayout>
  );
}
