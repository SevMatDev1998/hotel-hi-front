import { FC } from "react";
import clsx from "clsx";
import { UseFormRegister } from "react-hook-form";

interface IRegisterInput {
  register: UseFormRegister<any>; // Replace 'any' with a specific type if possible
  label?: string;
  name: string;
  type?: string;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  isError?: boolean;
}

const RegisterInput: FC<IRegisterInput> = ({
  register,
  label = "",
  name,
  type = "text",
  className,
  labelClassName,
  disabled = false,
  isError = false,
}) => {


  return (
    <div>
      <label className={clsx("block mb-1", labelClassName)}>
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        autoComplete={type === "password" ? "current-password" : "off"}
        className={clsx(
          "appearance-none block w-full px-3 py-2 border placeholder-charcoal-gray text-charcoal-gray focus:outline-none",
          isError
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-charcoal-gray",
          className
        )}
        disabled={disabled}
      />
     
    </div>
  );
};

export default RegisterInput;
