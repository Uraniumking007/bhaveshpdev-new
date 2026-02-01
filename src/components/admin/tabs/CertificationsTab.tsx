import { Award, Calendar, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { EmptyState } from '../EmptyState';
import { FormInput } from '../FormInput';
import { FormTextarea } from '../FormTextarea';
import { FormDatePicker } from '../FormDatePicker';
import { FormSelect } from '../FormSelect';
import type { StaticData, Certification } from '../types';

interface CertificationsTabProps {
  data: StaticData;
  setData: (data: StaticData) => void;
  setUnsavedChanges: (val: boolean) => void;
}

export function CertificationsTab({ data, setData, setUnsavedChanges }: CertificationsTabProps) {
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
    setUnsavedChanges(true);
  };

  const updateCertification = (index: number, updates: Partial<Certification>) => {
    const newCertifications = [...data.certifications];
    newCertifications[index] = { ...newCertifications[index], ...updates, updatedAt: new Date().toISOString() };
    setData({ ...data, certifications: newCertifications });
    setUnsavedChanges(true);
  };

  const deleteCertification = (index: number) => {
    if (confirm('Are you sure you want to delete this certification?')) {
      const newCertifications = data.certifications.filter((_, i) => i !== index);
      setData({ ...data, certifications: newCertifications });
      setUnsavedChanges(true);
    }
  };

  return (
    <div>
      <SectionHeader title="Certifications" count={data.certifications.length} onAdd={addCertification} addLabel="Add Certification" />

      {data.certifications.length === 0 ? (
        <EmptyState message="No certifications added yet." onAdd={addCertification} addLabel="Add Certification" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data.certifications.map((cert, index) => (
            <div key={cert.id} className={`bg-white rounded-xl border transition-all duration-200 ${cert.visible ? 'border-gray-200' : 'border-gray-200 opacity-75'}`}>
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="text-white" size={28} />
                  </div>

                  <div className="flex-1 min-w-0 space-y-3">
                    <div>
                      <input
                        value={cert.title}
                        onChange={e => updateCertification(index, { title: e.target.value })}
                        className="w-full font-semibold text-gray-900 bg-transparent border-none outline-none placeholder:text-gray-400 focus:ring-0 p-0 text-lg dark:text-gray-900"
                        placeholder="Certification Title"
                      />
                      <input
                        value={cert.issuer}
                        onChange={e => updateCertification(index, { issuer: e.target.value })}
                        className="w-full text-gray-600 bg-transparent border-none outline-none placeholder:text-gray-400 focus:ring-0 p-0 mt-1 dark:text-gray-600"
                        placeholder="Issuing Organization"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={16} />
                        <FormDatePicker label="" value={cert.date} onChange={val => updateCertification(index, { date: val })} className="w-full" />
                      </div>
                      <button
                        onClick={() => updateCertification(index, { visible: !cert.visible })}
                        className={`inline-flex items-center gap-1 text-sm ${cert.visible ? 'text-green-600' : 'text-gray-400'}`}
                      >
                        {cert.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                        {cert.visible ? 'Visible' : 'Hidden'}
                      </button>
                    </div>

                    <div className="space-y-2">
                      <FormInput value={cert.credentialUrl || ''} onChange={val => updateCertification(index, { credentialUrl: val || null })} placeholder="Credential URL" type="url" icon={<ExternalLink size={16} />} />

                      <FormInput value={cert.imageUrl} onChange={val => updateCertification(index, { imageUrl: val })} placeholder="Badge Image URL" type="url" />
                    </div>

                    <FormTextarea value={cert.description} onChange={val => updateCertification(index, { description: val })} placeholder="Description..." rows={2} />
                  </div>

                  <button
                    onClick={() => deleteCertification(index)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { Trash2 } from 'lucide-react';
