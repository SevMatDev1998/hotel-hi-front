import { FC } from "react";
import { FieldError } from "react-hook-form";
import { useTranslation } from "../../hooks/useTranslation";

interface IErrorMessage {
  fieldName: string;
  error?: FieldError;
  translationName?: string;
}

const ErrorMessage: FC<IErrorMessage> = ({ fieldName, error, translationName }) => {
  const { t } = useTranslation();

  if (!error) return null;

  // Получаем название поля на армянском
  const fieldLabel = t(`${translationName}.${fieldName}`);

  console.log(error);
  
  // Получаем текст ошибки
  const errorMessage = t(`errors.${error.type || 'required'}`)
  
  return (
    <p className="mt-1 ml-1 text-sm text-red-700">
      {error.message}
    </p>
  ); 
};

export default ErrorMessage;