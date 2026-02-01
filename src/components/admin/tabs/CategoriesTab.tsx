import { Trash2 } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { EmptyState } from '../EmptyState';
import { FormInput } from '../FormInput';
import type { StaticData, Category } from '../types';

interface CategoriesTabProps {
  data: StaticData;
  setData: (data: StaticData) => void;
  setUnsavedChanges: (val: boolean) => void;
}

export function CategoriesTab({ data, setData, setUnsavedChanges }: CategoriesTabProps) {
  const addCategory = () => {
    setData({
      ...data,
      categories: [
        {
          id: crypto.randomUUID(),
          name: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...data.categories,
      ],
    });
    setUnsavedChanges(true);
  };

  const updateCategory = (index: number, updates: Partial<Category>) => {
    const newCategories = [...data.categories];
    newCategories[index] = { ...newCategories[index], ...updates, updatedAt: new Date().toISOString() };
    setData({ ...data, categories: newCategories });
    setUnsavedChanges(true);
  };

  const deleteCategory = (index: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      const newCategories = data.categories.filter((_, i) => i !== index);
      setData({ ...data, categories: newCategories });
      setUnsavedChanges(true);
    }
  };

  return (
    <div>
      <SectionHeader title="Categories" count={data.categories.length} onAdd={addCategory} addLabel="Add Category" />

      {data.categories.length === 0 ? (
        <EmptyState message="No categories created yet." onAdd={addCategory} addLabel="Add Category" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.categories.map((category, index) => (
            <div key={category.id} className="group bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {category.name.charAt(0).toUpperCase() || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <FormInput
                    value={category.name}
                    onChange={val => updateCategory(index, { name: val })}
                    placeholder="Category name"
                    className="w-full font-medium text-gray-900 bg-transparent border-none outline-none placeholder:text-gray-400 focus:ring-0 p-0 dark:text-gray-900"
                  />
                </div>
                <button
                  onClick={() => deleteCategory(index)}
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
