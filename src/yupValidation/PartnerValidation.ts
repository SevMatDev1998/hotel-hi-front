// PartnerValidation.ts
import * as yup from 'yup';
import tv from '../helpers/tv';
import { LegalEntityType } from '../types';

export const PartnerSchema = yup.object({
    countryId: yup
      .number()
      .typeError(tv('required'))
      .required(tv('required')),
    tin: yup.number().typeError(tv('number')).required(tv('required')),
    name: yup.string().required(tv('required')),
    ltd: yup.string().required(tv('required')),
    legalEntityTypeId: yup
      .mixed<LegalEntityType>()
      .oneOf(Object.values(LegalEntityType) as LegalEntityType[], tv('required'))
      .required(tv('required')),
    email: yup
      .string()
      .email(tv('email'))
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, tv('email')) ,
    phone: yup.number().typeError(tv('number')).required(tv('required')),
    accountNumber: yup.string().required(tv('required')),
    director: yup.string().required(tv('required')),
  });

export type CreatePartnerFormData = yup.InferType<typeof PartnerSchema>;


export const EditPartnerSchema = yup.object({
    countryId: yup
      .number()
      .typeError(tv('required'))
      .required(tv('required')),
    tin: yup.string().required(tv('required')),
    name: yup.string().required(tv('required')),
    ltd: yup.string().required(tv('required')),
    legalEntityTypeId: yup
      .mixed<LegalEntityType>()
      .oneOf(Object.values(LegalEntityType) as LegalEntityType[], tv('typeError'))
      .required(tv('required')),
    email: yup
      .string()
      .email(tv('typeError'))
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, tv('email'))
      .required(tv('required')),
    phone: yup.number().typeError(tv('typeError')).required(tv('required')),
    accountNumber: yup.string().required(tv('required')),
    director: yup.string().required(tv('required')),
  });

export type EditPartnerFormData = yup.InferType<typeof EditPartnerSchema>;