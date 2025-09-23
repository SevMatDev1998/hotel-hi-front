export interface OrderContactPerson {
  id: number;
  orderId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneCode: number;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}
