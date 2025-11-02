import * as yup from 'yup';

export const commissionSchema = yup.object().shape({
  roomFee: yup
    .number()
    .typeError("Room fee must be a number")
    .required("Room fee is required")
    .min(0, "Room fee cannot be negative"),
  foodFee: yup
    .number()
    .typeError("Food fee must be a number")
    .required("Food fee is required")
    .min(0, "Food fee cannot be negative"),
  additionalFee: yup
    .number()
    .typeError("Additional fee must be a number")
    .required("Additional fee is required")
    .min(0, "Additional fee cannot be negative"),
  serviceFee: yup
    .number()
    .typeError("Service fee must be a number")
    .required("Service fee is required")
    .min(0, "Service fee cannot be negative"),
});

export type CommissionFormType = yup.InferType<typeof commissionSchema>;

