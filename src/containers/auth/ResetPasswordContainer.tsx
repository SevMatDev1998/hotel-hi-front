import { useForm } from 'react-hook-form';
import RegisterInput from '../../components/shared/RegisterInput';
import { ResetPasswordRequestFormType, resetPasswordSchema } from '../../yupValidation/AuthValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from '../../hooks/useTranslation';
import RouteEnum from '../../enums/route.enum';
import { useResetPasswordMutation } from '../../services/auth';
import { Button } from '../../components/shared/Button';

const ResetPasswordContainer = () => {

  const { t } = useTranslation();

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordRequestFormType>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const [resetPassword, {isLoading }] = useResetPasswordMutation()



  return (
    <div className='max-w-[400px]'>
      <form className="w-[100%] flex flex-col gap-5" onSubmit={handleSubmit(resetPassword)}>
        <div className='flex justify-between text-24'>
          <a href={RouteEnum.SIGN_UP} className='underline text-dusty-teal' >{t('auth.create_account')}</a>
          <div>{t('auth.login')}</div>
        </div>
        <div>
          <RegisterInput
            register={register}
            errors={errors}
            label="Email address"
            name="email"
            type="email"
            className='rounded-none border !border-dusty-teal'
          />
        </div>
        <div className='flex justify-center '>
          <Button className='justify-center w-full' isLoading={isLoading} type="submit">
            {t('auth.reset_password')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordContainer;