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
    .test('first-age', tv('first_element_start_zero'), function (value) {
      if (value && value.length > 0 && value[0].fromAge !== 0) {
        return this.createError({
          path: 'hotelAgeAssignments[0].fromAge',
          message: tv('first_element_start_zero')
        });
      }
      return true;
    })
    .test('last-age', tv('last_element_end_180'), function (value) {
      if (value && value.length > 0 && value[value.length - 1].toAge !== 180) {
        return this.createError({
          path: `hotelAgeAssignments[${value.length - 1}].toAge`,
          message: tv('last_element_end_180')
        });
      }
      return true;
    })
    .test('no-gaps-overlaps', tv('age_ranges_continuous'), function (value) {
      if (value && value.length > 1) {
        for (let i = 1; i < value.length; i++) {
          const prevToAge = value[i - 1].toAge;
          const currentFromAge = value[i].fromAge;
          if (currentFromAge !== prevToAge) {
            return this.createError({
              path: `hotelAgeAssignments[${i}].fromAge`,
              message: tv('must_start_from', { value: prevToAge })
            });
          }
        }
      }
      return true;
    })
});


export const EditHotelAvailabilitySchema = yup.object({
  title: yup.string().required(tv('required')),
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
});

export type EditFormData = yup.InferType<typeof EditHotelAvailabilitySchema>;

export type CreateHotelAvailabilityFormData = yup.InferType<typeof CreateHotelAvailabilitySchema>;
