import clsx from "clsx";
import { FC, useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface IPasswordInput {
  register: UseFormRegister<any>; // Replace 'any' with a specific type if possible
  label?: string;
  name: string;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
}

const PasswordInput: FC<IPasswordInput> = ({ 
  register, 
  label = "", 
  name, 
  className,
  labelClassName, 
  disabled = false 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <label htmlFor={name} className={clsx("sr-only", labelClassName)}>
        {label}
      </label>
      <input
        {...register(name, { required: `${label} is required` })}
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        className={clsx(
          "appearance-none relative block w-full px-3 py-2 pr-10 border border-charcoal-gray placeholder-charcoal-gray text-charcoal-gray focus:outline-none mt-2",
          className
        )}
        placeholder={label}
        disabled={disabled}
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-1"
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        <img 
          src="/images/icons/show-password.svg" 
          alt={showPassword ? "Hide password" : "Show password"}
          className={clsx(
            "w-5 h-5 transition-opacity duration-200",
            showPassword ? "opacity-100" : "opacity-60"
          )}
        />
      </button>
    </div>
  );
};

export default PasswordInput;
