import * as yup from 'yup';
import tv from '../helpers/tv';


export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export const signUpSchema = yup.object().shape({
  hotelName: yup
    .string()
    .required(tv('required'))
    .min(4, tv('min', {min: 4}))
    .max(100,tv('max', {max: 100})),
  email: yup
    .string()
    .email(tv('email'))
    .required(tv('required')),
  password: yup
    .string()
    .min(8,tv('min', {min: 8}))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      tv('password_including')
    )
    .required(tv('required')),
  confirmPassword: yup
    .string()
    .when('password', (password, schema) =>
      password
        ? schema.oneOf([yup.ref('password')], tv('password_mismatch'))
        : schema
    )
    .required(tv('required'))
});

export const resetPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

export const newPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
    )
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')])
    .required(),
});

export type LoginFormType = yup.InferType<typeof loginSchema>;
export type SignUpFormType = yup.InferType<typeof signUpSchema>;
export type ResetPasswordRequestFormType = yup.InferType<typeof resetPasswordSchema>;
export type NewPasswordFormType = yup.InferType<typeof newPasswordSchema>;
