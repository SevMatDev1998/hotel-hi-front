import * as yup from 'yup';
import tv from '../helpers/tv';

export const UpdateHotelBaseInfoSchema = yup.object({

  name: yup
    .string()
    .required(tv('required'))
    .min(2, tv('min', {min: 2}))
    .max(100, tv('max', {max: 100})),

  contactPerson: yup
    .string()
    .required(tv('required'))
    .min(2, tv('min', {min: 2}) )
    .max(100, tv('max', {max: 100})),
  
  // phoneCode: yup
  //   .number()
  //   .required(tv('required'))
  //   .positive()
  //   .min(1 ,tv('min', {min: 1}))
  //   .max(9999,tv('max', {max: 9999})),
  
  phoneNumber: yup
    .string()
    .required(tv('required'))
    .matches(/^\d+$/)
    .min(6,tv('min', {min: 6}) )
    .max(15, tv('max', {max: 15})),
  
  countryId: yup
    .number()
    .required(tv('required'))
    .positive(),

  city: yup
    .string()
    .required(tv('required'))
    .min(2,tv('min', {min: 2}) )
    .max(50, tv('max', {max: 50})),
  
  currencyId: yup
    .number()
    .required(tv('required'))
    .positive()
});


export const UpdateHotelLegalInfoSchema = yup.object({
  legalPerson: yup
    .string()
    .optional()
    .min(2)
    .max(100),

  registerCountryId: yup
    .number()
    .optional()
    .positive(),

  registerCity: yup
    .string()
    .optional()
    .min(2)
    .max(50),

  tinNumber: yup
    .string()
    .optional()
    .min(5)
    .max(50),

  director: yup
    .string()
    .optional()
    .min(2)
    .max(100),

    phoneNumber: yup
    .string()
    .optional(),

  priceSendEmail: yup
    .string()
    .optional()
    .email()
});



export type UpdateHotelBaseInfoFormData = yup.InferType<typeof UpdateHotelBaseInfoSchema>;
export type UpdateHotelLegalInfoFormData = yup.InferType<typeof UpdateHotelLegalInfoSchema>;