import { Code2, Award, Calendar, ChevronDown, ChevronUp, Trash2, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { SectionHeader } from '../SectionHeader';
import { EmptyState } from '../EmptyState';
import { FormInput } from '../FormInput';
import { FormTextarea } from '../FormTextarea';
import { FormCheckbox } from '../FormCheckbox';
import { FormSelect } from '../FormSelect';
import type { StaticData, TimelineItem } from '../types';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface TimelineTabProps {
  data: StaticData;
  setData: (data: StaticData) => void;
}

export function TimelineTab({ data, setData }: TimelineTabProps) {
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
  };

  return (
    <div>
      <SectionHeader title="Timeline" count={data.timeline.length} onAdd={addTimelineItem} addLabel="Add Event" />

      {data.timeline.length === 0 ? (
        <EmptyState message="No timeline events yet." onAdd={addTimelineItem} addLabel="Add Event" />
      ) : (
        <div className="space-y-4">
          {data.timeline.map((item) => (
            <TimelineItemCard
              key={item.id}
              item={item}
              onUpdate={(updates) => {
                const index = data.timeline.findIndex(t => t.id === item.id);
                if (index !== -1) {
                  const newTimeline = [...data.timeline];
                  newTimeline[index] = { ...newTimeline[index], ...updates, updatedAt: new Date().toISOString() };
                  setData({ ...data, timeline: newTimeline });
                }
              }}
              onDelete={() => {
                const newTimeline = data.timeline.filter(t => t.id !== item.id);
                setData({ ...data, timeline: newTimeline });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TimelineItemCard({
  item,
  onUpdate,
  onDelete,
}: {
  item: TimelineItem;
  onUpdate: (updates: Partial<TimelineItem>) => void;
  onDelete: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(!item.title);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      const response = await fetch(`/api/admin/timeline/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error('Failed to save timeline item');
      }

      const result = await response.json();
      setSaveStatus('saved');
      onUpdate(result.timelineItem);

      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error saving timeline item:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleFieldUpdate = (updates: Partial<TimelineItem>) => {
    onUpdate(updates);
    setSaveStatus('idle');
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this timeline item?')) {
      try {
        const response = await fetch(`/api/admin/timeline/${item.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete timeline item');
        }

        onDelete();
      } catch (error) {
        console.error('Error deleting timeline item:', error);
        alert('Failed to delete timeline item. Please try again.');
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200">
      <div className="flex gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.type === 'work' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
          {item.type === 'work' ? <Code2 className="text-white" size={24} /> : <Award className="text-white" size={24} />}
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <input
              value={item.title}
              onChange={e => handleFieldUpdate({ title: e.target.value })}
              className="flex-1 font-semibold text-gray-900 bg-transparent border-none outline-none placeholder:text-gray-400 focus:ring-0 p-0 text-lg dark:text-gray-900"
              placeholder="Title"
            />
            <FormSelect
              label=""
              value={item.type}
              onChange={val => handleFieldUpdate({ type: val as 'work' | 'education' })}
              options={[
                { value: 'work', label: 'Work' },
                { value: 'education', label: 'Education' },
              ]}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
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
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  <input
                    type="number"
                    value={item.yearStart}
                    onChange={e => handleFieldUpdate({ yearStart: e.target.value })}
                    className="w-20 px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
                    placeholder="Start"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    value={item.yearEnd || ''}
                    onChange={e => handleFieldUpdate({ yearEnd: e.target.value || null })}
                    className="w-20 px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
                    placeholder="End"
                  />
                </div>
                <FormCheckbox label="Ongoing" checked={item.ongoing} onChange={val => handleFieldUpdate({ ongoing: val })} />
              </div>

              <FormTextarea
                value={item.description}
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
  );
}
