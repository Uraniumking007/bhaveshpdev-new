import { Plus } from 'lucide-react';

interface EmptyStateProps {
  message: string;
  onAdd: () => void;
  addLabel: string;
}

export function EmptyState({ message, onAdd, addLabel }: EmptyStateProps) {
  return (
    <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-200">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Plus className="text-gray-400" size={32} />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
      >
        <Plus size={18} />
        {addLabel}
      </button>
    </div>
  );
}
