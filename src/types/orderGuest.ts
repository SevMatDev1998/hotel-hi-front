export interface OrderGuest {
  id: number;
  orderId: number;
  firstName: string;
  lastName: string;
  age?: number;
  createdAt: Date;
  updatedAt: Date;
}
