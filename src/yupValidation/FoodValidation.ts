import * as yup from 'yup';
import tv from '../helpers/tv';

export const foodFormSchema = yup.object().shape({
  startDate: yup
    .string()
    .required(tv('required')),
  endDate: yup
    .string()
    .required(tv('required'))
    .test('is-after-start', tv('end_time_after_start'), function (value) {
      const { startDate } = this.parent;
      if (!startDate || !value) return true;

      // Преобразуем время в минуты для сравнения
      const [startHour, startMin] = startDate.split(':').map(Number);
      const [endHour, endMin] = value.split(':').map(Number);

      const startTimeInMinutes = startHour * 60 + startMin;
      const endTimeInMinutes = endHour * 60 + endMin;

      return endTimeInMinutes > startTimeInMinutes;
    }),
  foodOfferTypeIds: yup
    .array()
    .of(yup.number().required())
    .min(1, tv('min_one_selection'))
    .required(tv('required')),
  cuisineIds: yup
    .array()
    .of(yup.number().required())
    .min(1, tv('min_one_selection'))
    .required(tv('required')),
});

export type FoodFormType = yup.InferType<typeof foodFormSchema>;
