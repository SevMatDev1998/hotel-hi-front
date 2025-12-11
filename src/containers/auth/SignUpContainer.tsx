import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/shared/Button';
import RegisterInput from '../../components/shared/RegisterInput';
import InputValidationLayout from '../../layouts/inputValidationLayout/InputValidationLayout';
import { useTranslation } from '../../hooks/useTranslation';
import { signUpEffect } from '../../services/auth/auth.effects';
import { useSignUpMutation } from '../../services/auth/auth.service';
import { SignUpFormType, signUpSchema } from '../../yupValidation/AuthValidation';
import RouteEnum from '../../enums/route.enum';

const SignUpContainer = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signUp, { isSuccess, error, isLoading }] = useSignUpMutation()

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormType>({
    resolver: yupResolver(signUpSchema),
  });

  useEffect(() => {
    signUpEffect(isSuccess, error, navigate, t)
  }, [t, navigate, error, isSuccess]);


  return (
    <div className='max-w-[400px]'>
      <form className="w-[100%] flex flex-col gap-5" onSubmit={handleSubmit(signUp)}>
        <div className='flex justify-between text-24'>
          <div>{t('auth.create_account')}</div>
          <p onClick={() => { navigate(RouteEnum.LOGIN) }} className='underline text-dusty-teal cursor-pointer' >{t('auth.login')}</p>
        </div>
        <InputValidationLayout errors={errors} name="hotelName">
          <RegisterInput
            register={register}
            name="hotelName"
            type="text"
            label={t('auth.hotelName')}
          />
        </InputValidationLayout>
        <InputValidationLayout errors={errors} name="email">
          <RegisterInput
            register={register}
            name="email"
            type="email"
            label={t('auth.email')}
          />      
        </InputValidationLayout>
        <InputValidationLayout errors={errors} name="password">
          <div className="relative">
            <RegisterInput
              register={register}
              name="password"
              type={showPassword ? "text" : "password"}
              label={t('auth.password')}
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
              label={t('auth.confirmPassword')}
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
            {t('auth.login')}
          </Button>
        </div>
        <div className='flex flex-col text-dusty-teal text-18'>
          <p onClick={() => { navigate(RouteEnum.RESET_PASSWORD) }} className='cursor-pointer' >{t('auth.forgotPassword')}</p>
          <div className='flex gap-1 '>
            <div className='text-18  text-charcoal-gray'>{t('auth.no_account')}:</div>
            <p onClick={() => { navigate(RouteEnum.LOGIN) }} className='font-semibold cursor-pointer' >{t('auth.register')}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpContainer;