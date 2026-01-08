import { FC } from "react";
import { Check } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

interface CheckBoxProps {
  options: { id: number | string; name: string };
  isChecked: boolean;
  toggleValue: () => void;
  tr_name?: string;
}

const CheckBox: FC<CheckBoxProps> = ({ options, isChecked, toggleValue, tr_name }) => {
  const { t } = useTranslation()
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div className="relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={toggleValue}
          className="h-[14px] w-[14px] rounded border border-ash-gray appearance-none checked:bg-dusty-teal checked:border-dusty-teal cursor-pointer"
        />
        {isChecked && (
          <Check className="absolute top-[4px] left-[1px] w-3 h-3 text-white pointer-events-none" strokeWidth={3} />
        )}
      </div>
      <span className="text-11">{tr_name ? t(`${tr_name}.${options.name}`) : options.name}</span>
    </label>
  );
};

export default CheckBox;