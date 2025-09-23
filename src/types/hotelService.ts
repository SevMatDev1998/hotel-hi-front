import { CompletenessStatus } from './enums';

export interface HotelService {
  id: number;
  hotelId: number;
  serviceId: number;
  description?: string;
  statusId: CompletenessStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
