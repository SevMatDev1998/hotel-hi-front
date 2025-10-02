import clsx from 'clsx';
import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  label?: string;
  name: string;
  options: SelectOption[];
  register: UseFormRegister<any>; // or a more specific type if you know your form data interface
  error?: FieldError;
  required?: boolean;
  className?: string;

}

export const RegisterSelect: React.FC<SelectProps> = ({
  label,
  name,
  options,
  register,
  error,
  required,
  className,

  ...props
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <select
        id={name}
        className={clsx(
          "appearance-none relative block w-full px-3 py-2 border border-charcoal-gray placeholder-charcoal-gray text-charcoal-gray focus:outline-none bg-none",
          className
        )}
        {...register(name, { required: required ? `${label || 'This field'} is required` : false })}
        {...props}
      >
        <option value="">-- Select an option --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};
