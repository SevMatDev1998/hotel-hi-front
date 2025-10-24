import * as yup from 'yup';

export const CreateHotelAvailabilitySchema = yup.object({
  title: yup
    .string()
    .required('Availability title is required'),

  checkInTime: yup
    .string()
    .required('Start date of availability period is required'),

  checkoutTime: yup
    .string()
    .required('End date of availability period is required'),

  // 🔹 Добавляем ageThresholds
  ageThresholds: yup.array().of(
    yup.object({
      name: yup
        .string()
        .required('Age threshold title is required'),

      minAge: yup
        .number()
        .typeError('Minimum age must be a number')
        .min(0, 'Minimum age cannot be negative')
        .required('Minimum age is required'),

      maxAge: yup
        .number()
        .typeError('Maximum age must be a number')
        .moreThan(yup.ref('minAge'), 'Maximum age must be greater than minimum age')
        .required('Maximum age is required'),

      isActive: yup
        .boolean()
        .required('Active status is required'),
    })
  ).optional(), // Можно сделать обязательным, если нужно хотя бы одно правило
});

export type CreateHotelAvailabilityFormData = yup.InferType<typeof CreateHotelAvailabilitySchema>;
