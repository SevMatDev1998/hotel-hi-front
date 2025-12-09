import * as yup from 'yup';
import tv from '../helpers/tv';

export const CreateHotelAvailabilitySchema = yup.object({
  title: yup
    .string()
    .required(tv('required')),

  checkInTime: yup
    .string()
    .required(tv('required'))
    .test('before-checkout', tv("min_greater_than_max"), function (value) {
      const { checkoutTime } = this.parent;
      if (!value || !checkoutTime) return true;
      return value > checkoutTime;
    }),
  checkoutTime: yup
    .string()
    .required(tv('required'))
    .test('after-checkin', tv("min_greater_than_max"), function (value) {
      const { checkInTime } = this.parent;
      if (!value || !checkInTime) return true;
      return value < checkInTime;
    }),

  hotelAgeAssignments: yup.array().of(
    yup.object({
      fromAge: yup
        .number()
        .typeError(tv('integer'))
        .required(tv('required')),
      toAge: yup
        .number()
        .typeError(tv('integer'))
        .moreThan(yup.ref('fromAge'), tv('max_greater_than_min'))
        .required(tv('required')),
      bedType: yup
        .string()
        .required(tv('required')),
    })
  ).min(1, tv('required')).required(tv('required'))
    .test('first-age', 'Первый элемент должен начинаться с 0', function (value) {
      if (value && value.length > 0) {
        return value[0].fromAge === 0;
      }
      return true;
    })
    .test('last-age', 'Последний элемент должен заканчиваться на 180', function (value) {
      if (value && value.length > 0) {
        return value[value.length - 1].toAge === 180;
      }
      return true;
    })
    .test('no-gaps-overlaps', 'Диапазоны должны идти непрерывно', function (value) {
      if (value && value.length > 1) {
        for (let i = 1; i < value.length; i++) {
          const prevToAge = value[i - 1].toAge;
          const currentFromAge = value[i].fromAge;
          if (currentFromAge !== prevToAge) {
            return this.createError({
              path: `hotelAgeAssignments[${i}].fromAge`,
              message: `Должен начинаться с ${prevToAge} (предыдущий диапазон заканчивается на ${prevToAge})`
            });
          }
        }
      }
      return true;
    })
});

export type CreateHotelAvailabilityFormData = yup.InferType<typeof CreateHotelAvailabilitySchema>;
