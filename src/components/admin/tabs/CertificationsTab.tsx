import { Award, Calendar, ExternalLink, Eye, EyeOff, ChevronDown, ChevronUp, Trash2, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { SectionHeader } from '../SectionHeader';
import { EmptyState } from '../EmptyState';
import { FormInput } from '../FormInput';
import { FormTextarea } from '../FormTextarea';
import { FormDatePicker } from '../FormDatePicker';
import type { StaticData, Certification } from '../types';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface CertificationsTabProps {
  data: StaticData;
  setData: (data: StaticData) => void;
}

export function CertificationsTab({ data, setData }: CertificationsTabProps) {
  const addCertification = () => {
    setData({
      ...data,
      certifications: [
        {
          id: crypto.randomUUID(),
          title: '',
          issuer: '',
          date: new Date().toISOString(),
          description: '',
          imageUrl: '',
          credentialUrl: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          pdfUrl: null,
          visible: true,
        },
        ...data.certifications,
      ],
    });
  };

  return (
    <div>
      <SectionHeader title="Certifications" count={data.certifications.length} onAdd={addCertification} addLabel="Add Certification" />

      {data.certifications.length === 0 ? (
        <EmptyState message="No certifications added yet." onAdd={addCertification} addLabel="Add Certification" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data.certifications.map((cert) => (
            <CertificationCard
              key={cert.id}
              certification={cert}
              onUpdate={(updates) => {
                const index = data.certifications.findIndex(c => c.id === cert.id);
                if (index !== -1) {
                  const newCertifications = [...data.certifications];
                  newCertifications[index] = { ...newCertifications[index], ...updates, updatedAt: new Date().toISOString() };
                  setData({ ...data, certifications: newCertifications });
                }
              }}
              onDelete={() => {
                const newCertifications = data.certifications.filter(c => c.id !== cert.id);
                setData({ ...data, certifications: newCertifications });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CertificationCard({
  certification,
  onUpdate,
  onDelete,
}: {
  certification: Certification;
  onUpdate: (updates: Partial<Certification>) => void;
  onDelete: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(!certification.title);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      const response = await fetch(`/api/admin/certifications/${certification.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(certification),
      });

      if (!response.ok) {
        throw new Error('Failed to save certification');
      }

      const result = await response.json();
      setSaveStatus('saved');
      onUpdate(result.certification);

      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error saving certification:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleFieldUpdate = (updates: Partial<Certification>) => {
    onUpdate(updates);
    setSaveStatus('idle');
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this certification?')) {
      try {
        const response = await fetch(`/api/admin/certifications/${certification.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete certification');
        }

        onDelete();
      } catch (error) {
        console.error('Error deleting certification:', error);
        alert('Failed to delete certification. Please try again.');
      }
    }
  };

  return (
    <div className={`bg-white rounded-xl border transition-all duration-200 ${certification.visible ? 'border-gray-200' : 'border-gray-200 opacity-75'}`}>
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Award className="text-white" size={28} />
          </div>

          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <input
                  value={certification.title}
                  onChange={e => handleFieldUpdate({ title: e.target.value })}
                  className="w-full font-semibold text-gray-900 bg-transparent border-none outline-none placeholder:text-gray-400 focus:ring-0 p-0 text-lg dark:text-gray-900"
                  placeholder="Certification Title"
                />
                <input
                  value={certification.issuer}
                  onChange={e => handleFieldUpdate({ issuer: e.target.value })}
                  className="w-full text-gray-600 bg-transparent border-none outline-none placeholder:text-gray-400 focus:ring-0 p-0 mt-1 dark:text-gray-600"
                  placeholder="Issuing Organization"
                />
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                aria-label={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>

            {isExpanded && (
              <>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={16} />
                    <FormDatePicker label="" value={certification.date} onChange={val => handleFieldUpdate({ date: val })} className="w-full" />
                  </div>
                  <button
                    onClick={() => handleFieldUpdate({ visible: !certification.visible })}
                    className={`inline-flex items-center gap-1 text-sm ${certification.visible ? 'text-green-600' : 'text-gray-400'}`}
                  >
                    {certification.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                    {certification.visible ? 'Visible' : 'Hidden'}
                  </button>
                </div>

                <div className="space-y-2">
                  <FormInput
                    value={certification.credentialUrl || ''}
                    onChange={val => handleFieldUpdate({ credentialUrl: val || null })}
                    placeholder="Credential URL"
                    type="url"
                    icon={<ExternalLink size={16} />}
                  />

                  <FormInput
                    value={certification.imageUrl}
                    onChange={val => handleFieldUpdate({ imageUrl: val })}
                    placeholder="Badge Image URL"
                    type="url"
                  />
                </div>

                <FormTextarea
                  value={certification.description}
                  onChange={val => handleFieldUpdate({ description: val })}
                  placeholder="Description..."
                  rows={2}
                />

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    {saveStatus === 'saved' && (
                      <span className="text-green-600 font-medium">Saved!</span>
                    )}
                    {saveStatus === 'error' && (
                      <span className="text-red-600 font-medium">Failed to save</span>
                    )}
                  </div>

                  <button
                    onClick={handleSave}
                    disabled={saveStatus === 'saving'}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      saveStatus === 'saving'
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : saveStatus === 'saved'
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {saveStatus === 'saving' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Saving...
                      </>
                    ) : saveStatus === 'saved' ? (
                      <>
                        <CheckCircle2 size={16} />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Save
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
