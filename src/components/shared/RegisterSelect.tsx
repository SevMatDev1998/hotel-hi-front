import clsx from 'clsx';
import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { useTranslation } from '../../hooks/useTranslation';

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
  tr_name: string;
}

export const RegisterSelect: React.FC<SelectProps> = ({
  label,
  name,
  options,
  register,
  error,
  required,
  className,
  tr_name,

  ...props
}) => {
  const { t } = useTranslation();

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
          "appearance-none block w-full px-3 py-2 border border-charcoal-gray placeholder-charcoal-gray text-charcoal-gray focus:outline-none bg-none",
          className
        )}
        {...register(name, { required: required ? `${label || 'This field'} is required` : false })}
        {...props}
      >
        <option value="">-- Select an option --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {t(`${tr_name}.${opt.label}`)}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};
