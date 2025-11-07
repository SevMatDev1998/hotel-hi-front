import React from 'react';
import { cn } from '../../utils/cn';

// Base button props interface
interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'base' | 'outline' | 'checkButton' | 'textUnderline';
  isLoading?: boolean;
  disabled?: boolean;
  checked?: boolean; // new
}

// Base button variant styles
const variantClasses = {
  base: 'p-[12px] bg-dusty-teal rounded-[8px] min-w-[164px] flex items-center justify-center text-xs text-white ',
  outline: 'p-[10px] border border-dusty-teal rounded-[8px] min-w-[164px] w-full flex items-center text-dusty-teal ',
  checkButton: 'w-[90px] h-[26px] items-center justify-center rounded-[5px] flex text-white border border-charcoal-gray text-charcoal-gray',
  textUnderline: 'underline bg-transparent border-none p-0 text-xs cursor-pointer' 

};
export const Button: React.FC<BaseButtonProps> = ({
  children,
  variant = 'base',
  isLoading = false,
  disabled = false,
  checked = false,
  color,
  className,
  ...props
}) => {
  const classes = cn(
    variantClasses[variant],
    variant === 'checkButton' && (checked && 'bg-dusty-teal border-none text-white'),
    className
  );

  return (
    <button
      className={classes}
      style={variant === 'textUnderline' && color ? { color } : undefined}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0
              c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        <>
          {variant === 'outline' && <img src="/images/icons/add-button-icon.svg" alt="add icon" className="mr-2" />}
          {children}
        </>
      )}
    </button>
  );
};

