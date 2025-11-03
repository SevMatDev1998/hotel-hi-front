import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LoginFormType, loginSchema } from '../../yupValidation/AuthValidation';
import { useLoginMutation } from '../../services/auth/auth.service';
import RegisterInput from '../../components/shared/RegisterInput';
import { yupResolver } from '@hookform/resolvers/yup';
import Label from '../../components/shared/label';
import { Button } from '../../components/shared/Button';
import RouteEnum from '../../enums/route.enum';
import { useTranslation } from '../../hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { loginEffect } from '../../services/auth/auth.effects';

const LoginContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
          <a href={RouteEnum.SIGN_UP} className='underline text-dusty-teal' >{t('auth.create_account')}</a>
          <div>{t('auth.login')}</div>
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
          <RegisterInput
            register={register}
            errors={errors}
            label="password"
            name="password"
            type="password"
            className='rounded-none border !border-dusty-teal'
          />
        </div>
        <div className='flex justify-center '>
          <Button className='justify-center w-full' isLoading={isLoading} type="submit">
            {t('auth.login')}
          </Button>
        </div>
        <div className='flex flex-col text-dusty-teal text-18'>
          <a href={RouteEnum.RESET_PASSWORD} className=''>{t('auth.forgot_password')}</a>
          <div className='flex gap-1 '>
            <div className='text-18 text-charcoal-gray'>{t('auth.no_account')}:</div>
            <a href={RouteEnum.SIGN_UP} className='  font-semibold'>{t('auth.register')}</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginContainer;