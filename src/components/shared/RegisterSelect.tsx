import React from 'react';
import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from '../../hooks/useTranslation';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  label?: string;
  name: string;
  options: SelectOption[];
  register: UseFormRegister<any>;
  className?: string;
  tr_name?: string;
  valueAsNumber?: boolean;
  isError?: boolean;
}

export const RegisterSelect: React.FC<SelectProps> = ({
  label,
  name,
  options,
  register,
  className,
  tr_name='',
  valueAsNumber = false,
  isError = false,

  ...props
}) => {

  const { t } = useTranslation();
  
  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={name}
          className={clsx( 
            "appearance-none rounded-md block w-full px-3 py-2 pr-10 border border-charcoal-gray placeholder-charcoal-gray text-charcoal-gray focus:outline-none bg-none",
             isError 
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-charcoal-gray",
            className
          )}
          {...register(name, { valueAsNumber })}
          {...props}
        >
          <option value=""></option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {tr_name ? t(`${tr_name}.${opt.label}`) : opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-charcoal-gray">
          <svg
            className={clsx(
              "h-5 w-5 transition-transform duration-200",
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
