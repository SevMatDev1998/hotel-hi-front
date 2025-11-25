import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginFormType, loginSchema } from '../../yupValidation/AuthValidation';
import { useLoginMutation } from '../../services/auth/auth.service';
import RegisterInput from '../../components/shared/RegisterInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components/shared/Button';
import RouteEnum from '../../enums/route.enum';
import { useTranslation } from '../../hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { loginEffect } from '../../services/auth/auth.effects';
import ErrorMessage from '../../components/shared/ErrorMessage';
import InputValidationLayout from '../../layouts/inputValidationLayout/InputValidationLayout';

const LoginContainer = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isSuccess, isError, isLoading }] = useLoginMutation()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    loginEffect(isSuccess, isError, navigate, t)
  }, [t, navigate, isError, isSuccess]);

  return (
    <div className='max-w-[400px]'>
      <form className="w-[100%] flex flex-col gap-5" onSubmit={handleSubmit(login)}>
        <div className='flex justify-between text-24'>
          <div>{t('auth.login')}</div>
          <p onClick={() => { navigate(RouteEnum.SIGN_UP) }} className='underline text-dusty-teal cursor-pointer' >{t('auth.create_account')}</p>
        </div>

        <InputValidationLayout errors={errors} name="email">
          <RegisterInput
            register={register}
            label={`${t('auth.email')}*`}
            name="email"
            type="email"
            className='rounded-none border !border-dusty-teal'
          />
         
        </InputValidationLayout>
        <InputValidationLayout errors={errors} name="password">
          <div className="relative">
            <RegisterInput
              register={register}
              label={`${t('auth.password')}*`}
              name="password"
              className='rounded-none border !border-dusty-teal'
              type={showPassword ? "text" : "password"}
            />
            <ErrorMessage
              fieldName="password"
              error={errors.password}
              translationName="auth"
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
        <div className='flex justify-center '>
          <Button className='justify-center w-full' isLoading={isLoading} type="submit">
            {t('auth.login')}
          </Button>
        </div>
        <div className='flex flex-col text-dusty-teal text-18'>
          <p onClick={() => { navigate(RouteEnum.RESET_PASSWORD) }} className='cursor-pointer' >{t('auth.forgotPassword')}</p>
          <div className='flex gap-1 '>
            <div className='text-18 text-charcoal-gray'>{t('auth.no_account')}:</div>
          <p onClick={() => { navigate(RouteEnum.SIGN_UP) }} className='cursor-pointer font-semibold' >{t('auth.register')}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginContainer;