import React from 'react';
import cls from '../../utils/cls';

interface SegmentedControlButtonProps {
  label: string;
  isActive?: boolean;
  onClick: () => void;
  className?: string;
}

export const SegmentedControlButton: React.FC<SegmentedControlButtonProps> = ({
  label,
  isActive,
  onClick,
  className,
}) => {
  
  return (
    <button
      onClick={onClick}
      className={cls(
        'flex items-center gap-3 px-3 py-1 rounded-lg border-2 transition-all duration-200',
        'hover:bg-teal-50',
        isActive
          ? 'border-teal-600 bg-white'
          : 'border-teal-600 bg-white',
        ...(className ? [className] : [])
      )}
    >
      <div
        className={cls(
          'w-3 h-3 rounded-full border-2 border-teal-600 flex items-center justify-center transition-all duration-200',
          isActive ? 'bg-white' : 'bg-white'
        )}
      >
        {isActive && (
          <div className="w-2 h-2 rounded-full bg-teal-600" />
        )}
      </div>
      <span className="text-teal-600 font-medium text-10">{label}</span>
    </button>
  );
};

export default SegmentedControlButton;
