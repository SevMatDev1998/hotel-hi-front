import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/shared/Button';
import RegisterInput from '../../components/shared/RegisterInput';
import InputValidationLayout from '../../layouts/inputValidationLayout/InputValidationLayout';
import { useTranslation } from '../../hooks/useTranslation';
import { useResetPasswordMutation } from '../../services/auth';
import { ResetPasswordRequestFormType, resetPasswordSchema } from '../../yupValidation/AuthValidation';
import RouteEnum from '../../enums/route.enum';

const ResetPasswordContainer = () => {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordRequestFormType>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const [resetPassword, {isLoading }] = useResetPasswordMutation()

  return (
    <div className='max-w-[400px]'>
      <form className="w-[100%] flex flex-col gap-5" onSubmit={handleSubmit(resetPassword)}>
        <div className='flex justify-between text-24'>
          <div>{t('auth.reset_password')}</div>
          <p onClick={()=>{navigate(RouteEnum.SIGN_UP)}}  className='underline text-dusty-teal cursor-pointer' >{t('auth.create_account')}</p>
        </div>
        <InputValidationLayout errors={errors} name="email">
          <RegisterInput
            register={register}
            label={t('auth.email')}
            name="email"
            type="email"
            className='rounded-none border !border-dusty-teal'
          />
         
        </InputValidationLayout>
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