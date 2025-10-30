import { useForm } from 'react-hook-form';
import { SignUpFormType, signUpSchema } from '../../yupValidation/AuthValidation';
import {  useSignUpMutation } from '../../services/auth/auth.service';
import RegisterInput from '../../components/shared/RegisterInput';
import { yupResolver } from '@hookform/resolvers/yup';
import Label from '../../components/shared/label';
import { Button } from '../../components/shared/Button';
import RouteEnum from '../../enums/route.enum';
import { useTranslation } from '../../hooks/useTranslation';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpEffect } from '../../services/auth/auth.effects';

const SignUpContainer = () => {
  const { t } = useTranslation();
  
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signUp, { isSuccess, isError, isLoading }] = useSignUpMutation()

  const { register, handleSubmit} = useForm<SignUpFormType>({
    resolver: yupResolver(signUpSchema),
  });
  
  useEffect(() => {
    signUpEffect(isSuccess, isError, navigate,t)
  }, [t, navigate, isError, isSuccess]);


  return (
      <div className='max-w-[400px]'>
      <form className="w-[100%] flex flex-col gap-5" onSubmit={handleSubmit(signUp)}>
        <div className='flex justify-between text-24'>
        <div>{t('auth.create_account')}</div>
        <a href={RouteEnum.LOGIN} className='underline text-dusty-teal' >{t('auth.login')}</a>
        </div>
         <div>
          <Label className="block" text={t('auth.hotel_name')} />
          <RegisterInput
            register={register}
            name="hotelName"
            type="text"
          />
        </div>
        <div>
          <Label  className="block" text={t('auth.email')} />
          <RegisterInput
            register={register}
            label="Email address"
            name="email"
            type="email"
          />
        </div>
        <div>
          <Label  className="block" text={t('auth.password')} />
          <div className="relative">
            <RegisterInput
              register={register}
              label="password"
              name="password"
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img 
                src="/images/icons/show-password.svg" 
                alt="Toggle password visibility"
                className="h-5 w-5 text-gray-400"
              />
            </button>
          </div>
        </div>
         <div>
          <Label className="block" text={t('auth.confirm_password')} />
          <div className="relative">
            <RegisterInput
              register={register}
              label="password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className='rounded-none border !border-dusty-teal pr-10'
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <img 
                src="/images/icons/show-password.svg" 
                alt="Toggle password visibility"
                className="h-5 w-5 text-gray-400"
              />
            </button>
          </div>
        </div>
        
        {/* Form Errors */}
    

        <div className='flex justify-center '>
          <Button className='justify-center w-full' isLoading={isLoading} type="submit">
            {t('auth.login')}
          </Button>
        </div>
        <div className='flex flex-col text-dusty-teal text-18'>
          <a href={RouteEnum.RESET_PASSWORD}>{t('auth.forgot_password')}</a>
          <div className='flex gap-1 '>
          <div className='text-18  text-charcoal-gray'>{t('auth.no_account')}:</div>
          <a href={RouteEnum.SIGN_UP} className='font-semibold'>{t('auth.register')}</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpContainer;