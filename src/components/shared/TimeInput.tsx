import { FC } from "react";
import clsx from "clsx";

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const TimeInput: FC<TimeInputProps> = ({ value, onChange, disabled, className }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = ['00', '30'];

  const [hour = '00', minute = '00'] = value ? value.split(':') : [];

  const handleHourChange = (newHour: string) => {
    onChange(`${newHour}:${minute}`);
  };

  const handleMinuteChange = (newMinute: string) => {
    onChange(`${hour}:${newMinute}`);
  };

  return (
    <div className={clsx("flex items-center gap-1", className)}>
      <div>
        <select
          value={hour}
          onChange={(e) => handleHourChange(e.target.value)}
          disabled={disabled}
          className="pl-2 py-1  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {hours.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </div>
      <span>:</span>
      <div>
        <select
          value={minute}
          onChange={(e) => handleMinuteChange(e.target.value)}
          disabled={disabled}
          className="pr-2 py-1  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {minutes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimeInput;
