import * as yup from 'yup';
import tv from '../helpers/tv';

export const commissionSchema = yup.object().shape({
  roomFee: yup
    .number()
    .typeError(tv('required'))
    .required(tv('required'))
    .min(0, tv('min', { min: 0 }))
    .max(100, tv('max', { max: 100 })),

  foodFee: yup
    .number()
    .typeError(tv('required'))
    .required(tv('required'))
    .min(0, tv('min', { min: 0 }))
    .max(100, tv('max', { max: 100 })),

  additionalFee: yup
    .number()
    .typeError(tv('required'))
    .required(tv('required'))
    .min(0, tv('min', { min: 0 }))
    .max(100, tv('max', { max: 100 })),

  serviceFee: yup
    .number()
    .typeError(tv('required'))
    .required(tv('required'))
    .min(0, tv('min', { min: 0 }))
    .max(100, tv('max', { max: 100 })),

});

export type CommissionFormType = yup.InferType<typeof commissionSchema>;

