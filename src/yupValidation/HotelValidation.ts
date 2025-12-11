import * as yup from 'yup';
import tv from '../helpers/tv';

export const UpdateHotelBaseInfoSchema = yup.object({

  name: yup
    .string()
    .required(tv('required'))
    .min(2, tv('min', { min: 2 }))
    .max(100, tv('max', { max: 100 })),

  contactPerson: yup
    .string()
    .required(tv('required'))
    .min(2, tv('min', { min: 2 }))
    .max(100, tv('max', { max: 100 })),

  // phoneCode: yup
  //   .number()
  //   .required(tv('required'))
  //   .positive()
  //   .min(1 ,tv('min', {min: 1}))
  //   .max(9999,tv('max', {max: 9999})),

  phoneNumber: yup
    .string()
    .required(tv('required'))
    .matches(/^\+\d{11}$/, tv('phone_number'))
    .min(6, tv('min', { min: 6 }))
    .max(15, tv('max', { max: 15 })),

  countryId: yup
    .number()
    .typeError(tv('required'))
    .required(tv('required')),

  city: yup
    .string()
    .required(tv('required'))
    .min(2, tv('min', { min: 2 }))
    .max(50, tv('max', { max: 50 })),

  currencyId: yup
    .number()
    .typeError(tv('required'))
    .required(tv('required')),
});


export const UpdateHotelLegalInfoSchema = yup.object({
  legalPerson: yup
    .string()
    .required(tv('required'))
    .min(2, tv('min', { min: 2 }))
    .max(100, tv('max', { max: 100 })),

  registerCountryId: yup
    .number()
    .typeError(tv('required'))
    .required(tv('required')),

  registerCity: yup
    .string()
    .required(tv('required'))
    .min(2, tv('min', { min: 2 }))
    .max(100, tv('max', { max: 100 })),

  tinNumber: yup
    .string()
    .required(tv('required'))
    .matches(/^\d{8}$/, tv('exact_length', { length: 8 }))
    .length(8, tv('exact_length', { length: 8 })),

  director: yup
   .string()
    .required(tv('required'))
    .min(2, tv('min', { min: 2 }))
    .max(100, tv('max', { max: 100 })),

  bankPhoneNumber: yup
      .string()
    .required(tv('required'))
    .matches(/^\+\d{11}$/, tv('phone_number'))
    .min(6, tv('min', { min: 6 }))
    .max(15, tv('max', { max: 15 })),

    
  priceSendEmail: yup
    .string()
    .required(tv('required'))
    .email(tv('email')),
});



export type UpdateHotelBaseInfoFormData = yup.InferType<typeof UpdateHotelBaseInfoSchema>;
export type UpdateHotelLegalInfoFormData = yup.InferType<typeof UpdateHotelLegalInfoSchema>;