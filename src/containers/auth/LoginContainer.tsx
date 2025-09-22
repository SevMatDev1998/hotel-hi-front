import React from 'react';
import AuthLayout from '../../layouts/auth/AuthLayout';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { LoginFormType, loginSchema } from '../../yupValidation/AuthValidation';
import { useLoginMutation } from '../../services/auth/auth.service';
import RegisterInput from '../../components/shared/RegisterInput';



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
      <form className="w-[100%] space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <RegisterInput
          register={register}
          errors={errors}
          label="Email address"
          name="email"
          type="email"
          cl
        />
      </form>
    </AuthLayout>
  );
};

export default LoginContainer;