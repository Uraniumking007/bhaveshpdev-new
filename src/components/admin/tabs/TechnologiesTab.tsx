import { Trash2 } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { EmptyState } from '../EmptyState';
import { FormInput } from '../FormInput';
import type { StaticData, Technology } from '../types';

interface TechnologiesTabProps {
  data: StaticData;
  setData: (data: StaticData) => void;
  setUnsavedChanges: (val: boolean) => void;
}

export function TechnologiesTab({ data, setData, setUnsavedChanges }: TechnologiesTabProps) {
  const addTechnology = () => {
    setData({
      ...data,
      technologies: [
        {
          id: crypto.randomUUID(),
          name: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...data.technologies,
      ],
    });
    setUnsavedChanges(true);
  };

  const updateTechnology = (index: number, updates: Partial<Technology>) => {
    const newTechnologies = [...data.technologies];
    newTechnologies[index] = { ...newTechnologies[index], ...updates, updatedAt: new Date().toISOString() };
    setData({ ...data, technologies: newTechnologies });
    setUnsavedChanges(true);
  };

  const deleteTechnology = (index: number) => {
    if (confirm('Are you sure you want to delete this technology?')) {
      const newTechnologies = data.technologies.filter((_, i) => i !== index);
      setData({ ...data, technologies: newTechnologies });
      setUnsavedChanges(true);
    }
  };

  return (
    <div>
      <SectionHeader title="Technologies" count={data.technologies.length} onAdd={addTechnology} addLabel="Add Technology" />

      {data.technologies.length === 0 ? (
        <EmptyState message="No technologies added yet." onAdd={addTechnology} addLabel="Add Technology" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.technologies.map((tech, index) => (
            <div key={tech.id} className="group bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <FormInput
                    value={tech.name}
                    onChange={val => updateTechnology(index, { name: val })}
                    placeholder="Technology name"
                    className="w-full font-medium text-gray-900 bg-transparent border-none outline-none placeholder:text-gray-400 focus:ring-0 p-0 dark:text-gray-900"
                  />
                  <p className="text-xs text-gray-400 mt-1">Updated {new Date(tech.updatedAt).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => deleteTechnology(index)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
