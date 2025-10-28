
import * as Yup from 'yup';
import { HotelServiceHourlyAvailabilityType } from '../types';

const singleHotelServiceAvailabilitSchema = Yup.object().shape({
  isPaid: Yup.boolean().optional(),

  startMonth: Yup.string()
    .required('Start month is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date (YYYY-MM-DD)'),

  endMonth: Yup.string()
    .required('End month is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date (YYYY-MM-DD)'),

  hourlyAvailabilityTypeId: Yup.mixed()
    .oneOf(Object.values(HotelServiceHourlyAvailabilityType), 'Invalid availability type')
    .required('Availability type is required'),

  startHour: Yup.string()
    .nullable()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Invalid time (HH:mm)')
    .optional(),

  endHour: Yup.string()
    .nullable()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Invalid time (HH:mm)')
    .optional(),
});

export const CreateHotelServiceAvailabilitySchema = Yup.object().shape({
  availabilities: Yup.array()
    .of(singleHotelServiceAvailabilitSchema)
    .min(2, 'At least two availabilities are required'),
});


export type CreateHotelServiceAvailabilityFormData = Yup.InferType<typeof CreateHotelServiceAvailabilitySchema>;
