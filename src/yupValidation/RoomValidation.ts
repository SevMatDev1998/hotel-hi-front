import * as yup from 'yup';
import tv from '../helpers/tv';

export const CreateHotelRoomSchema = yup.object({
  roomClassId: yup
   .number()
    .typeError(tv('required'))
    .required(tv('required')),

  roomViewId: yup
    .number()
    .nullable()
    .transform((value, originalValue) => originalValue === '' || originalValue === null ? null : value)
    .optional(),

  area: yup 
    .number()
    .required(tv('required'))
    .min(1, tv('min', { min: 1 }))
    .typeError(tv('positive')),
 
  roomNumberQuantity: yup
    .number()
    .required(tv('required'))
    .min(1, tv('min', { min: 1 }))
    .integer(tv('integer'))
    .typeError(tv('positive')),
});

export const EditHotelRoomSchema = yup.object({
   roomClassId: yup
   .number()
    .typeError(tv('required'))
    .required(tv('required')),

  roomViewId: yup
    .number()
    .nullable()
    .transform((value, originalValue) => originalValue === '' || originalValue === null ? null : value)
    .optional(),

  area: yup 
    .number()
    .required(tv('required'))
    .min(1, tv('min', { min: 1 }))
    .typeError(tv('positive')),
 
  roomNumberQuantity: yup
    .number()
    .required(tv('required'))
    .min(1, tv('min', { min: 1 }))
    .integer(tv('integer'))
    .typeError(tv('positive')),
});


export type CreateHotelRoomFormData = yup.InferType<typeof CreateHotelRoomSchema>;
export type EditHotelRoomFormData = yup.InferType<typeof EditHotelRoomSchema>;
