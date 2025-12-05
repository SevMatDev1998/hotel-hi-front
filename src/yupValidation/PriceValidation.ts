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
    .test('no-gaps-overlaps', 'Между диапазонами не должно быть пропусков или пересечений', function (value) {
      if (value && value.length > 1) {
        for (let i = 1; i < value.length; i++) {
          const prevToAge = value[i - 1].toAge;
          const currentFromAge = value[i].fromAge;
          // Проверяем что текущий fromAge = предыдущий toAge + 1
          if (currentFromAge !== prevToAge + 1) {
            return this.createError({
              path: `hotelAgeAssignments[${i}].fromAge`,
              message: `Должен быть ${prevToAge + 1} (предыдущий диапазон заканчивается на ${prevToAge})`
            });
          }
        }
      }
      return true;
    })
});

export type CreateHotelAvailabilityFormData = yup.InferType<typeof CreateHotelAvailabilitySchema>;
