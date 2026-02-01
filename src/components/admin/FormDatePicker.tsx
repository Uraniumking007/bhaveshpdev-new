import type { ChangeEvent } from 'react';

interface FormDatePickerProps {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export function FormDatePicker({
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  className = '',
}: FormDatePickerProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onChange(new Date(e.target.value).toISOString());
    } else {
      onChange(null);
    }
  };

  const getDateValue = () => {
    if (!value) return '';
    try {
      return new Date(value).toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="date"
        value={getDateValue()}
        onChange={handleChange}
        required={required}
        disabled={disabled}
        className={`
          w-full px-3 py-2 border rounded-lg text-gray-900
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? 'border-red-300' : 'border-gray-300'}
        `}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
