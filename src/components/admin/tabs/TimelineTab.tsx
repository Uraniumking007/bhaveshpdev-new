import { Code2, Award, Calendar } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { EmptyState } from '../EmptyState';
import { FormInput } from '../FormInput';
import { FormTextarea } from '../FormTextarea';
import { FormCheckbox } from '../FormCheckbox';
import { FormSelect } from '../FormSelect';
import type { StaticData, TimelineItem } from '../types';

interface TimelineTabProps {
  data: StaticData;
  setData: (data: StaticData) => void;
  setUnsavedChanges: (val: boolean) => void;
}

export function TimelineTab({ data, setData, setUnsavedChanges }: TimelineTabProps) {
  const addTimelineItem = () => {
    setData({
      ...data,
      timeline: [
        {
          id: crypto.randomUUID(),
          title: '',
          description: '',
          yearStart: new Date().getFullYear().toString(),
          yearEnd: null,
          ongoing: false,
          type: 'work',
          visibility: 'public',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...data.timeline,
      ],
    });
    setUnsavedChanges(true);
  };

  const updateTimelineItem = (index: number, updates: Partial<TimelineItem>) => {
    const newTimeline = [...data.timeline];
    newTimeline[index] = { ...newTimeline[index], ...updates, updatedAt: new Date().toISOString() };
    setData({ ...data, timeline: newTimeline });
    setUnsavedChanges(true);
  };

  const deleteTimelineItem = (index: number) => {
    if (confirm('Are you sure you want to delete this timeline item?')) {
      const newTimeline = data.timeline.filter((_, i) => i !== index);
      setData({ ...data, timeline: newTimeline });
      setUnsavedChanges(true);
    }
  };

  return (
    <div>
      <SectionHeader title="Timeline" count={data.timeline.length} onAdd={addTimelineItem} addLabel="Add Event" />

      {data.timeline.length === 0 ? (
        <EmptyState message="No timeline events yet." onAdd={addTimelineItem} addLabel="Add Event" />
      ) : (
        <div className="space-y-4">
          {data.timeline.map((item, index) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200">
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.type === 'work' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
                  {item.type === 'work' ? <Code2 className="text-white" size={24} /> : <Award className="text-white" size={24} />}
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      value={item.title}
                      onChange={e => updateTimelineItem(index, { title: e.target.value })}
                      className="flex-1 font-semibold text-gray-900 bg-transparent border-none outline-none placeholder:text-gray-400 focus:ring-0 p-0 text-lg dark:text-gray-900"
                      placeholder="Title"
                    />
                    <FormSelect
                      label=""
                      value={item.type}
                      onChange={val => updateTimelineItem(index, { type: val as 'work' | 'education' })}
                      options={[
                        { value: 'work', label: 'Work' },
                        { value: 'education', label: 'Education' },
                      ]}
                      className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <input
                        type="number"
                        value={item.yearStart}
                        onChange={e => updateTimelineItem(index, { yearStart: e.target.value })}
                        className="w-20 px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
                        placeholder="Start"
                      />
                      <span className="text-gray-400">-</span>
                      <input
                        type="number"
                        value={item.yearEnd || ''}
                        onChange={e => updateTimelineItem(index, { yearEnd: e.target.value || null })}
                        className="w-20 px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
                        placeholder="End"
                      />
                    </div>
                    <FormCheckbox label="Ongoing" checked={item.ongoing} onChange={val => updateTimelineItem(index, { ongoing: val })} />
                  </div>

                  <FormTextarea value={item.description} onChange={val => updateTimelineItem(index, { description: val })} placeholder="Description..." rows={2} />
                </div>

                <button onClick={() => deleteTimelineItem(index)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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

import { Trash2 } from 'lucide-react';
