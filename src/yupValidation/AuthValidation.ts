import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const signUpSchema = yup.object().shape({
  hotelName: yup
    .string()
    .required('Hotel name is required')
    .min(2, 'Hotel name must be at least 2 characters')
    .max(100, 'Hotel name must not exceed 100 characters'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
confirmPassword: yup
  .string()
  .notRequired()
  .when('password', (password, schema) =>
    password
      ? schema.oneOf([yup.ref('password')], 'Passwords must match')
      : schema
  )
  .strip(),


});

export const resetPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
});

export const newPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export type LoginFormType = yup.InferType<typeof loginSchema>;
export type SignUpFormType = yup.InferType<typeof signUpSchema>;
export type ResetPasswordRequestFormType = yup.InferType<typeof resetPasswordSchema>;
export type NewPasswordFormType = yup.InferType<typeof newPasswordSchema>;
