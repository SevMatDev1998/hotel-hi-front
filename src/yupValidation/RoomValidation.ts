import * as yup from 'yup';

export const CreateHotelRoomSchema = yup.object({
  roomClassId: yup
    .number()
    .typeError('Room class ID must be a number')
    .integer('Room class ID must be an integer')
    .required('Room class ID is required'),

  roomViewId: yup
    .number()
    .typeError('Room view ID must be a number')
    .integer('Room view ID must be an integer')
    .optional(),

  roomNumberQuantity: yup
    .number()
    .required('Room numbers are required')
    .min(1, 'Room numbers must be at least 1')
    .typeError('Room numbers must be a number'),

  area: yup
    .string()
    .trim()
    .required('Area is required'),
});


export const EditHotelRoomSchema = yup.object({
  roomClassId: yup
    .number()
    .typeError('Room class ID must be a number')
    .integer('Room class ID must be an integer')
    .optional(),

  roomViewId: yup
    .number()
    .typeError('Room view ID must be a number')
    .integer('Room view ID must be an integer')
    .optional(),

  roomNumberQuantity: yup
    .number()
    .min(1, 'Room numbers must be at least 1')
    .typeError('Room numbers must be a number')
    .optional(),

  area: yup
    .string()
    .trim()
    .optional(),
});


export type CreateHotelRoomFormData = yup.InferType<typeof CreateHotelRoomSchema>;
export type EditHotelRoomFormData = yup.InferType<typeof EditHotelRoomSchema>;
