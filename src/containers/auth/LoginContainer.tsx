import AuthLayout from '../../layouts/auth/AuthLayout';
import { useForm } from 'react-hook-form';
import { LoginFormType, loginSchema } from '../../yupValidation/AuthValidation';
import { useLoginMutation } from '../../services/auth/auth.service';
import RegisterInput from '../../components/shared/RegisterInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import Label from '../../components/shared/label';

const LoginContainer = () => {


  const [login, { isSuccess, isError, error, isLoading }] = useLoginMutation()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormType) => {
    await login(data)
  };


  return (
    <AuthLayout>
      <form className="w-[100%] " onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="email" className="block" text="Email address" />
        <RegisterInput
          register={register}
          errors={errors}
          label="Email address"
          name="email"
          type="email"
          className='rounded-none border !border-dusty-teal'
          
        />
      </form>
    </AuthLayout>
  );
};

export default LoginContainer;