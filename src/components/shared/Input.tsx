import { FC } from "react";
import clsx from "clsx";

interface IInput {
  label: string;
  name?: string;
  type: string;
  className?: string;
  wrapperClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<IInput> = ({
  label,
  name = '',
  type,
  className = "",
  wrapperClassName = "",
  onChange,
}) => {
  return (
    <div className={wrapperClassName}>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        className={clsx(
          "appearance-none relative block w-full px-3 py-2 border-none  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-lg",
          className
        )}
        placeholder={label}
      />
    </div>
  );
};

export default Input;
