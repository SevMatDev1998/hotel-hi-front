import React from 'react';
import { cn } from '../../utils/cn';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ 
  children, 
  text,
  className, 
  required = false,
  ...props 
}) => {
  return (
    <label
      className={cn(
        'text-12',
        'leading-none',
        'tracking-normal',
        'text-charcoal-gray',
        'font-armenian',
        className
      )}
      {...props}
    >
      {text || children}
      {required && <span className="text-brick-red ml-1">*</span>}
    </label>
  );
};

export default Label;