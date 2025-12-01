import * as yup from 'yup';
import tv from '../helpers/tv';

export const CreateHotelAvailabilitySchema = yup.object({
  title: yup
    .string()
    .required(tv('required')),

  checkInTime: yup
    .string()
    .required(tv('required')),
  checkoutTime: yup
    .string()
    .required(tv('required')),

  hotelAgeAssignments: yup.array().of(
    yup.object({
      fromAge: yup
        .number()
        .typeError(tv('integer'))
        .min(2, tv('min', { min: 2 }))
        .required(tv('required')),
      toAge: yup
        .number()
        .typeError(tv('integer'))
        .moreThan(yup.ref('fromAge'), tv('max_greater_than_min'))
        .required(tv('required')),
      bedType: yup
        .number()
        .typeError(tv('required'))
        .required(tv('required')),
      // isActive: yup
      //   .boolean()
      //   .required('Active status is required'),
    })
  ).optional(), // Можно сделать обязательным, если нужно хотя бы одно правило
});

export type CreateHotelAvailabilityFormData = yup.InferType<typeof CreateHotelAvailabilitySchema>;
