import clsx from "clsx";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

interface IRegisterInput {
  register: UseFormRegister<any>; // Replace 'any' with a specific type if possible
  label?: string;
  name: string;
  type?: string;
  errors?: Record<string, any>;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
}

const RegisterInput: FC<IRegisterInput> = ({ 
  register, 
  errors, 
  label = "", 
  name, 
  type = "text", 
  className,
  labelClassName, 
  disabled = false 
}) => {
  return (
    <div>
      <label htmlFor={name} className={clsx("sr-only", labelClassName)}>
        {label}
      </label>
      <input
        {...register(name, { required: `${label} is required` })}
        type={type}
        autoComplete={type === "password" ? "current-password" : "off"}
        className={clsx(
          "appearance-none block w-full px-3 py-2 border border-charcoal-gray placeholder-charcoal-gray text-charcoal-gray focus:outline-none",
          className
        )}
        placeholder={label}
        disabled={disabled}
      />
      {/* {errors[name] && (
        <p className="mt-1 ml-1 text-sm text-black">{errors[name].message}</p>
      )} */}
    </div>
  );
};

export default RegisterInput;
