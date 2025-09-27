import AuthLayout from '../../layouts/auth/AuthLayout';
import { useForm } from 'react-hook-form';
import { SignUpFormType, signUpSchema } from '../../yupValidation/AuthValidation';
import {  useSignUpMutation } from '../../services/auth/auth.service';
import RegisterInput from '../../components/shared/RegisterInput';
import { yupResolver } from '@hookform/resolvers/yup';
import Label from '../../components/shared/label';
import { Button } from '../../components/shared/Button';
import RouteEnum from '../../enums/route.enum';
import { useTranslation } from '../../hooks/useTranslation';
import { useState } from 'react';

const SignUpContainer = () => {
  const { t } = useTranslation();
  
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signUp, { isSuccess, isError, error, isLoading }] = useSignUpMutation()

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormType>({
    resolver: yupResolver(signUpSchema),
  });
  const onSubmit = async (data: SignUpFormType) => {
    await signUp(data)
  };

  return (
    <AuthLayout>
      <div className='max-w-[400px]'>
      <form className="w-[100%] flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-between text-24'>
        <div>{t('auth.create_account')}</div>
        <a href={RouteEnum.LOGIN} className='underline text-dusty-teal' >{t('auth.login')}</a>
        </div>
         <div>
          <Label htmlFor="hotelName" className="block" text={t('auth.hotel_name')} />
          <RegisterInput
            register={register}
            name="hotelName"
            type="text"
            className='rounded-none border !border-dusty-teal'
          />
        </div>
        <div>
          <Label htmlFor="email" className="block" text={t('auth.email')} />
          <RegisterInput
            register={register}
            label="Email address"
            name="email"
            type="email"
            className='rounded-none border !border-dusty-teal'
          />
        </div>
        <div>
          <Label htmlFor="password" className="block" text={t('auth.password')} />
          <div className="relative">
            <RegisterInput
              register={register}
              label="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className='rounded-none border !border-dusty-teal pr-10'
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
          <Label htmlFor="confirmPassword" className="block" text={t('auth.confirm_password')} />
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
        {Object.keys(errors).length > 0 && (
          <div className="flex flex-col gap-2">
            {Object.entries(errors).map(([field, error], index) => {
              // Map error messages to translation keys
              const getErrorTranslationKey = (fieldName: string, errorMessage: string) => {
                if (errorMessage?.includes('required')) {
                  return `auth.errors.${fieldName}_required`;
                }
                if (errorMessage?.includes('Invalid email')) {
                  return 'auth.errors.email_invalid';
                }
                if (errorMessage?.includes('Password must be at least')) {
                  return 'auth.errors.password_min';
                }
                if (errorMessage?.includes('Passwords must match')) {
                  return 'auth.errors.passwords_not_match';
                }
                // Fallback
                return `auth.errors.${fieldName}_required`;
              };

              const translationKey = getErrorTranslationKey(field, error?.message || '');
              
              return (
                <div key={field} className="flex items-center gap-2 text-red-500 text-sm">
                  <span className="flex items-center justify-center w-6 h-6 bg-red-100 rounded-full text-red-600 font-semibold text-xs">
                    {index + 1}
                  </span>
                  <span>{t(translationKey)}</span>
                </div>
              );
            })}
          </div>
        )}

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

    </AuthLayout>
  );
};

export default SignUpContainer;