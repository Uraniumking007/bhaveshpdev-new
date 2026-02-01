interface FormCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function FormCheckbox({ label, checked, onChange, disabled = false, className = '' }: FormCheckboxProps) {
  return (
    <label
      className={`
      inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg cursor-pointer
      hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
      ${className}
    `}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
      />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
}
