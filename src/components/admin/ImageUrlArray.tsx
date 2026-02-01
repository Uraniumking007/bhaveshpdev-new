import { useState } from 'react';
import { Plus, X, Image as ImageIcon, ExternalLink } from 'lucide-react';

interface ImageUrlArrayProps {
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
  disabled?: boolean;
}

export function ImageUrlArray({
  images,
  onChange,
  label = 'Gallery Images',
  disabled = false,
}: ImageUrlArrayProps) {
  const [newUrl, setNewUrl] = useState('');
  const [previewError, setPreviewError] = useState<Record<number, boolean>>({});

  const handleAdd = () => {
    if (newUrl.trim() && !images.includes(newUrl.trim())) {
      onChange([...images, newUrl.trim()]);
      setNewUrl('');
    }
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
    setPreviewError(prev => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleImageError = (index: number) => {
    setPreviewError(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="url"
            value={newUrl}
            onChange={e => setNewUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            placeholder="https://example.com/image.jpg"
            className="
              flex-1 px-3 py-2 border border-gray-300 rounded-lg
              text-gray-900 text-sm
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              outline-none transition-all
              disabled:bg-gray-100
            "
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={disabled || !newUrl.trim()}
            className="
              px-4 py-2 bg-blue-600 text-white rounded-lg
              hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed
              transition-colors flex items-center gap-2
            "
          >
            <Plus size={16} />
            Add
          </button>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="group relative bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="aspect-square flex items-center justify-center bg-gray-100">
                  {previewError[index] ? (
                    <div className="text-center p-4">
                      <ImageIcon className="mx-auto mb-2 text-gray-400" size={24} />
                      <p className="text-xs text-gray-500 truncate max-w-full px-2">
                        {url.split('/').pop()}
                      </p>
                    </div>
                  ) : (
                    <img
                      src={url}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(index)}
                    />
                  )}
                </div>

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-colors"
                      title="View image"
                    >
                      <ExternalLink size={16} />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      disabled={disabled}
                      className="p-2 bg-white rounded-full text-gray-700 hover:text-red-600 transition-colors"
                      title="Remove image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {url}
                </div>
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && (
          <p className="text-sm text-gray-400 italic">No images added yet</p>
        )}
      </div>
    </div>
  );
}
