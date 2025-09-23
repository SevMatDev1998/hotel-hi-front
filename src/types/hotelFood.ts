import { FoodType, CompletenessStatus } from './enums';

export interface HotelFood {
  id: number;
  hotelId: number;
  name: string;
  description?: string;
  foodType: FoodType;
  statusId: CompletenessStatus;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
