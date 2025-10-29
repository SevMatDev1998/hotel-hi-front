import * as Yup from 'yup';
import { HotelServiceHourlyAvailabilityType } from '../types';

const singleHotelServiceAvailabilitSchema = Yup.object().shape({
  isPaid: Yup.boolean().optional(),

  startMonth: Yup.string()
    .when('isPaid', {
      is: true,
      then: (schema) =>
        schema
          .required('Start month is required')
          .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date (YYYY-MM-DD)'),
      otherwise: (schema) => schema.notRequired(),
    }),

  endMonth: Yup.string()
    .when('isPaid', {
      is: true,
      then: (schema) =>
        schema
          .required('End month is required')
          .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date (YYYY-MM-DD)'),
      otherwise: (schema) => schema.notRequired(),
    }),

  hourlyAvailabilityTypeId: Yup.mixed().when('isPaid', {
    is: true,
    then: (schema) =>
      schema
        .oneOf(Object.values(HotelServiceHourlyAvailabilityType), 'Invalid availability type')
        .required('Availability type is required'),
    otherwise: (schema) => schema.notRequired(),
  }),

  startHour: Yup.string()
    .nullable()
    .when('isPaid', {
      is: true,
      then: (schema) =>
        schema
          .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Invalid time (HH:mm)')
          .optional(),
      otherwise: (schema) => schema.notRequired(),
    }),

  endHour: Yup.string()
    .nullable()
    .when('isPaid', {
      is: true,
      then: (schema) =>
        schema
          .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Invalid time (HH:mm)')
          .optional(),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const CreateHotelServiceAvailabilitySchema = Yup.object().shape({
  availabilities: Yup.array()
    .of(singleHotelServiceAvailabilitSchema)
    .test(
      'at-least-one-active',
      'At least one active availability is required',
      (availabilities = []) => availabilities.some((a) => a.isPaid === true)
    ),
});

export type CreateHotelServiceAvailabilityFormData = Yup.InferType<typeof CreateHotelServiceAvailabilitySchema>;
