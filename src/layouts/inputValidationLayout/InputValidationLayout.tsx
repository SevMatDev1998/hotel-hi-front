import { PropsWithChildren, cloneElement } from "react";
import { FieldErrors } from "react-hook-form";

interface InputValidationLayoutProps<D extends object> extends PropsWithChildren {
  errors: FieldErrors<D>,
  name: keyof InputValidationLayoutProps<D>['errors'],
}

const InputValidationLayout = <D extends object>({ children, errors, name }: InputValidationLayoutProps<D>) => {

  const errorMessage = errors?.[name]?.message as string;

  return (
    <div>
      {cloneElement(children as React.ReactElement, { isError: !!errorMessage })}
      {
        errorMessage && (
          <p className="mt-1 ml-1 text-sm text-red-700">
            {errorMessage}
          </p>
        )
      }
    </div>
  );
};

export default InputValidationLayout;