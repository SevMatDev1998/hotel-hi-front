import clsx from "clsx";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { useTranslation } from "../../hooks/useTranslation";

interface IRegisterInput {
  register: UseFormRegister<any>; // Replace 'any' with a specific type if possible
  label?: string;
  name: string;
  type?: string;
  errors?: Record<string, any>;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  tr_name?: string;
}

const RegisterInput: FC<IRegisterInput> = ({
  register,
  errors,
  label = "",
  name,
  type = "text",
  className,
  labelClassName,
  disabled = false,
  tr_name=''
}) => {

  const { t } = useTranslation();

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
          errors?.[name]
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-charcoal-gray",
          className
        )}
        placeholder={label}
        disabled={disabled}
      />
      {errors?.[name] && (
        <p className="mt-1 ml-1 text-sm text-red-700">
          {t(`${tr_name}.${name}`)} {t(`errors.${errors[name]?.type}`)} 
        </p>
      )}
    </div>
  );
};

export default RegisterInput;
