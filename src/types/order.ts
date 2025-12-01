import { OrderCheckinType, OrderSource,OrderStatus } from './enums';

export interface Order {
  id: number;
  hotelId: number;
  statusId: OrderStatus;
  invoiceId?: number;
  orderNumber: string;
  paymentMethodId?: number;
  orderCheckinTypeId: OrderCheckinType;
  hotelPartnerId?: number;
  sourceId: OrderSource;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
