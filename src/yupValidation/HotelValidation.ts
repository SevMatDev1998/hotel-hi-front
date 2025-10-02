import * as yup from 'yup';

export const UpdateHotelBaseInfoSchema = yup.object({
  contactPerson: yup
    .string()
    .required('Contact person is required')
    .min(2, 'Contact person must be at least 2 characters')
    .max(100, 'Contact person must be less than 100 characters'),
  
  phoneCode: yup
    .number()
    .required('Phone code is required')
    .positive('Phone code must be a positive number')
    .min(1, 'Phone code must be at least 1 digit')
    .max(9999, 'Phone code must be less than 5 digits'),
  
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d+$/, 'Phone number must contain only digits')
    .min(6, 'Phone number must be at least 6 digits')
    .max(15, 'Phone number must be less than 16 digits'),
  
  countryId: yup
    .number()
    .required('Country is required')
    .positive('Country ID must be a positive number'),

  city: yup
    .string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters'),
  
  currencyId: yup
    .number()
    .required('Currency is required')
    .positive('Currency ID must be a positive number')
});


export const UpdateHotelLegalInfoSchema = yup.object({
  legalPerson: yup
    .string()
    .optional()
    .min(2, 'Legal person must be at least 2 characters')
    .max(100, 'Legal person must be less than 100 characters'),

  registerCountryId: yup
    .number()
    .optional()
    .positive('Country ID must be a positive number'),

  registerCity: yup
    .string()
    .optional()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters'),

  tinNumber: yup
    .string()
    .optional()
    .min(5, 'TIN number must be at least 5 characters')
    .max(50, 'TIN number must be less than 50 characters'),

  director: yup
    .string()
    .optional()
    .min(2, 'Director must be at least 2 characters')
    .max(100, 'Director must be less than 100 characters'),

    phoneNumber: yup
    .string()
    .optional(),

  priceSendEmail: yup
    .string()
    .optional()
    .email('Price send email must be a valid email')
});



export type UpdateHotelBaseInfoFormData = yup.InferType<typeof UpdateHotelBaseInfoSchema>;
export type UpdateHotelLegalInfoFormData = yup.InferType<typeof UpdateHotelLegalInfoSchema>;