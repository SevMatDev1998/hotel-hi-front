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
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={name}
        className={clsx( 
          "appearance-none rounded-md block w-full px-3 py-2 border border-charcoal-gray placeholder-charcoal-gray text-charcoal-gray focus:outline-none bg-none",
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
     
    </div>
  );
};
