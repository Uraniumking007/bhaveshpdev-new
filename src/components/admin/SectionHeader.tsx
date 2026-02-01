import { Plus } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  count: number;
  onAdd: () => void;
  addLabel: string;
}

export function SectionHeader({ title, count, onAdd, addLabel }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-500 mt-1">
          {count} {title.toLowerCase()} total
        </p>
      </div>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
      >
        <Plus size={20} />
        {addLabel}
      </button>
    </div>
  );
}
