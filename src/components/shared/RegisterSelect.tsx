import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  name: string;
  options: SelectOption[];
  register: UseFormRegister<any>; // or a more specific type if you know your form data interface
  error?: FieldError;
  required?: boolean;
}

export const RegisterSelect: React.FC<SelectProps> = ({
  label,
  name,
  options,
  register,
  error,
  required,
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
        className="
          appearance-none 
          relative 
          block 
          w-full
          px-3 
          py-2 
          border
          border-gray-300
          placeholder-gray-500
          text-gray-900 
          focus:outline-none
          focus:ring-indigo-500
          focus:border-indigo-500 
          focus:z-10 
          sm:text-sm 
          rounded-lg
        "
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
