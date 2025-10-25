// PartnerValidation.ts
import * as yup from 'yup';
import { LegalEntityType } from '../types';
import { TFunction } from 'i18next';

export const CreatePartnerSchema = (t: TFunction) =>
  yup.object({

countryId: yup
  .mixed()
  .required(t('errors.required')), // 👈 will provide the 


    tin: yup.string().required(t('errors.required')),
    name: yup.string().required(t('errors.required')),
    ltd: yup.string().required(t('errors.required')),
    legalEntityTypeId: yup
      .mixed<LegalEntityType>()
      .oneOf(Object.values(LegalEntityType) as LegalEntityType[], t('errors.typeError'))
      .required(t('errors.required')),
    email: yup
      .string()
      .email(t('errors.typeError'))
      .required(t('errors.required')),
    phone: yup.number().typeError(t('errors.typeError')).required(t('errors.required')),
    accountNumber: yup.string().required(t('errors.required')),
    director: yup.string().required(t('errors.required')),
  });

export type CreatePartnerFormData = yup.InferType<ReturnType<typeof CreatePartnerSchema>>;
