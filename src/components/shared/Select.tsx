import clsx from 'clsx';
import React from 'react';
import { FieldError } from 'react-hook-form';
import { useTranslation } from '../../hooks/useTranslation';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  label?: string;
  name: string;
  options: SelectOption[];
  error?: FieldError;
  required?: boolean;
  className?: string;
  tr_name?: string;
  onSelect?: (value: string | number) => void;
  value?: string | number; 
}

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  error,
  className,
  tr_name,
  onSelect,
  value,
  ...props
}) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <select
        id={name}
        onChange={handleChange} // ✅ attach handler
        value={value ?? ''} // ✅ this is what was missing
        className={clsx(
          "appearance-none block w-full px-3 py-2 border border-charcoal-gray placeholder-charcoal-gray text-charcoal-gray focus:outline-none bg-none",
          className
        )}
        {...props}
      >
        <option value="">-- Select an option --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {tr_name ? t(`${tr_name}.${opt.label}`) : opt.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};
