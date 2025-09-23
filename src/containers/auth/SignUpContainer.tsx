import AuthLayout from '../../layouts/auth/AuthLayout';
import { useForm } from 'react-hook-form';
import { SignUpFormType, signUpSchema } from '../../yupValidation/AuthValidation';
import { useLoginMutation } from '../../services/auth/auth.service';
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

  const [login, { isSuccess, isError, error, isLoading }] = useLoginMutation()

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormType>({
    resolver: yupResolver(signUpSchema),
  });
  const onSubmit = async (data: SignUpFormType) => {
    await login(data)
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
            errors={errors}
            name="hotelName"
            type="text"
            className='rounded-none border !border-dusty-teal'
          />
        </div>
        <div>
          <Label htmlFor="email" className="block" text={t('auth.email')} />
          <RegisterInput
            register={register}
            errors={errors}
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
              errors={errors}
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
              errors={errors}
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
        <div className='flex justify-center '>
          <Button className='justify-center w-full'>
            {t('auth.login')}
          </Button>
        </div>
        <div className='flex flex-col text-dusty-teal text-18'>
          <a href={RouteEnum.RESET_PASSWORD} className='font-400'>{t('auth.forgot_password')}</a>
          <div className='flex gap-1 '>
          <div className='text-18 font-400 text-charcoal-gray'>{t('auth.no_account')}:</div>
          <a href={RouteEnum.SIGN_UP} className='  font-600'>{t('auth.register')}</a>
          </div>
        </div>
      </form>
    </div>

    </AuthLayout>
  );
};

export default SignUpContainer;