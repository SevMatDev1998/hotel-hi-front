import { cloneElement,PropsWithChildren } from "react";
import { FieldErrors } from "react-hook-form";
import clsx from "clsx";

interface InputValidationLayoutProps<D extends object> extends PropsWithChildren {
  errors: FieldErrors<D>,
  name: keyof InputValidationLayoutProps<D>['errors'],
  className?: string,
  errorClassName?: string,
}

const InputValidationLayout = <D extends object>({ children, errors, name, className, errorClassName }: InputValidationLayoutProps<D>) => {
  
  const errorMessage = errors?.[name]?.message as string;
  
  return (
    <div className={clsx(className)}>
      {cloneElement(children as React.ReactElement, { isError: !!errorMessage })}
      {
        errorMessage && (
          <p className={clsx("mt-1 ml-1 text-sm text-red-700", errorClassName)}>
            {errorMessage}
          </p>
        )
      }
    </div>
  );
};

export default InputValidationLayout;