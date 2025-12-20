// PartnerValidation.ts
import * as yup from 'yup';
import tv from '../helpers/tv';
import { LegalEntityType } from '../types';

export const PartnerSchema = yup.object({
  countryId: yup
    .number()
    .typeError(tv('required'))
    .required(tv('required')),

  tin: yup
    .string()
    .required(tv('required'))
    .matches(/^\d{8}$/, tv('exact_length', { length: 8 }))
    .length(8, tv('exact_length', { length: 8 })),

  name: yup.string().required(tv('required')),
  ltd: yup.string().required(tv('required')),
  legalEntityTypeId: yup
    .mixed<LegalEntityType>()
    .oneOf(Object.values(LegalEntityType) as LegalEntityType[], tv('required'))
    .required(tv('required')),
  email: yup
    .string()
    .email(tv('email'))
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, tv('email')),
  phone: yup
    .string()
    .required(tv('required'))
    .matches(/^\d{8}$/, tv('exact_length', { length: 8 })),


  accountNumber: yup.string().required(tv('required')),
  director: yup.string().required(tv('required')),
});

export type CreatePartnerFormData = yup.InferType<typeof PartnerSchema>;


export const EditPartnerSchema = yup.object({
  countryId: yup
    .number()
    .typeError(tv('required'))
    .required(tv('required')),

  tin: yup
    .string()
    .required(tv('required'))
    .matches(/^\d{8}$/, tv('exact_length', { length: 8 }))
    .length(8, tv('exact_length', { length: 8 })),


  name: yup.string().required(tv('required')),
  ltd: yup.string().required(tv('required')),
  legalEntityTypeId: yup
    .mixed<LegalEntityType>()
    .oneOf(Object.values(LegalEntityType) as LegalEntityType[], tv('required'))
    .required(tv('required')),
  email: yup
    .string()
    .email(tv('email'))
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, tv('email')),

  phone: yup
    .string()
    .required(tv('required'))
    .matches(/^\d{8}$/, tv('exact_length', { length: 8 })),

  accountNumber: yup.string().required(tv('required')),
  director: yup.string().required(tv('required')),
});

export type EditPartnerFormData = yup.InferType<typeof EditPartnerSchema>;