import { FC } from "react";

  interface CheckBoxProps {
  options: { id: number; name: string };
  isChecked: boolean;
  toggleValue: () => void;
}

const CheckBox: FC<CheckBoxProps> = ({ options , isChecked, toggleValue }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={toggleValue}
        className="h-4 w-4"
      />
      <span className="text-gray-700">{options.name}</span>
    </label>
  );
};

export default CheckBox;