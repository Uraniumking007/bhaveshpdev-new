import { useState, useRef, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Select items...',
  label,
  disabled = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const handleRemove = (value: string) => {
    onChange(selected.filter(v => v !== value));
  };

  const selectedLabels = selected.map(
    value => options.find(opt => opt.value === value)?.label || value
  );

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          min-h-[38px] px-3 py-2 border rounded-lg cursor-pointer
          bg-white hover:border-gray-400 transition-colors
          flex flex-wrap gap-1 items-center
          ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}
          ${isOpen ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300'}
        `}
      >
        {selectedLabels.length === 0 ? (
          <span className="text-gray-400 text-sm">{placeholder}</span>
        ) : (
          selectedLabels.map((label, index) => (
            <span
              key={selected[index]}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
            >
              {label}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(selected[index]);
                }}
                className="hover:bg-blue-100 rounded-full p-0.5"
              >
                <X size={12} />
              </button>
            </span>
          ))
        )}
        <ChevronDown
          size={16}
          className={`ml-auto text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-auto">
          {options.length === 0 ? (
            <div className="p-3 text-sm text-gray-500 text-center">
              No options available
            </div>
          ) : (
            options.map(option => {
              const isSelected = selected.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => handleToggle(option.value)}
                  className={`
                    w-full px-3 py-2 text-left text-sm transition-colors
                    hover:bg-gray-50 flex items-center gap-2
                    ${isSelected ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}
                  `}
                >
                  <div
                    className={`
                      w-4 h-4 rounded border flex items-center justify-center
                      ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}
                    `}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  {option.label}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
