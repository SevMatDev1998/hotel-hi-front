import { useForm } from 'react-hook-form';
import RegisterInput from '../../components/shared/RegisterInput';
import { NewPasswordFormType, newPasswordSchema,  } from '../../yupValidation/AuthValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from '../../hooks/useTranslation';
import RouteEnum from '../../enums/route.enum';
import {  useSetNewPasswordMutation } from '../../services/auth';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from '../../components/shared/Button';
import InputValidationLayout from '../../layouts/inputValidationLayout/InputValidationLayout';

const NewPasswordContainer = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token: rawToken } = useParams();

  // Clean the token if it contains "token=" prefix
  const token = rawToken?.startsWith('token=') ? rawToken.substring(6) : rawToken;

  const { register, handleSubmit, formState: { errors } } = useForm<NewPasswordFormType>({
    resolver: yupResolver(newPasswordSchema),
  });

  const [setNewPassword, { isLoading }] = useSetNewPasswordMutation()

  const handleNewPasswordSubmit = (data: NewPasswordFormType) => {
    if (!token) {
      console.error('Token is missing');
      return;
    }
    setNewPassword({ token: rawToken, newPassword: data.password }).unwrap()
    navigate(RouteEnum.LOGIN);
  }

  return (
    <div className='max-w-[400px]'>
      <form className="w-[100%] flex flex-col gap-5" onSubmit={handleSubmit(handleNewPasswordSubmit)}>
        <InputValidationLayout errors={errors} name="password">
          <div className="relative">
            <RegisterInput
              register={register}
              name="password"
              type={showPassword ? "text" : "password"}
              label={t('auth.password')}
              tr_name="auth"
            />
            <button
              type="button"
              className="absolute bottom-2 right-0 pr-3 "
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src="/images/icons/show-password.svg"
                alt="Toggle password visibility"
              />
            </button>
          </div>
        </InputValidationLayout>
        <InputValidationLayout errors={errors} name="confirmPassword">
          <div className="relative">
            <RegisterInput
              register={register}
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className='rounded-none border !border-dusty-teal pr-10'
              label={t('auth.confirm_password')}
              tr_name="auth"
            />
            <button
              type="button"
              className="absolute bottom-2 right-0 pr-3 "
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <img
                src="/images/icons/show-password.svg"
                alt="Toggle password visibility"
              />
            </button>
          </div>
        </InputValidationLayout>
        <div className='flex justify-center '>
          <Button className='justify-center w-full' isLoading={isLoading} type="submit">
            {t('auth.set_new_password')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewPasswordContainer;