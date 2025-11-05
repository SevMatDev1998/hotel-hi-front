import { useForm } from 'react-hook-form';
import { SignUpFormType, signUpSchema } from '../../yupValidation/AuthValidation';
import { useSignUpMutation } from '../../services/auth/auth.service';
import RegisterInput from '../../components/shared/RegisterInput';
import { yupResolver } from '@hookform/resolvers/yup';
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

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormType>({
    resolver: yupResolver(signUpSchema),
  });

  useEffect(() => {
    signUpEffect(isSuccess, isError, navigate, t)
  }, [t, navigate, isError, isSuccess]);


  return (
    <div className='max-w-[400px]'>
      <form className="w-[100%] flex flex-col gap-5" onSubmit={handleSubmit(signUp)}>
        <div className='flex justify-between text-24'>
          <div>{t('auth.create_account')}</div>
          <a href={RouteEnum.LOGIN} className='underline text-dusty-teal' >{t('auth.login')}</a>
        </div>
        <div>
          {/* <Label className="block" text={t('auth.hotel_name')} /> */}
          <RegisterInput
            register={register}
            name="hotelName"
            type="text"
            errors={errors}
            label={t('auth.hotelName')}
            tr_name="auth"
          />
        </div>
        <div>
          <RegisterInput
            register={register}
            name="email"
            type="email"
            errors={errors}
            label={t('auth.email')}
            tr_name="auth"
          />
        </div>
        <div>
          <div className="relative">
            <RegisterInput
              register={register}
              name="password"
              type={showPassword ? "text" : "password"}
              errors={errors}
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
        </div>
        <div>
          <div className="relative">
            <RegisterInput
              register={register}
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className='rounded-none border !border-dusty-teal pr-10'
              errors={errors}
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
        </div>
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