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

  numbers: yup
    .string()
    .trim()
    .required('Room numbers are required')
    .matches(/^\d+(,\s*\d+)*$/, 'Room numbers must be comma-separated numbers (e.g., "101, 102, 103")'),

  area: yup
    .string()
    .trim()
    .required('Area is required'),
});


export type CreateHotelRoomFormData = yup.InferType<typeof CreateHotelRoomSchema>;