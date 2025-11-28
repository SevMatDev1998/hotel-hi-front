import { FoodType, CompletenessStatus } from './enums';

export interface HotelFood {
  id: number;
  hotelId: number;
  name: string;
  description?: string;
  isFoodAvailable: boolean;
  foodType: FoodType;
  statusId: CompletenessStatus;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}



export interface AddHotelFoodDto {
  // hotelId: number;
  name?: string;
  description?: string;
  foodType: FoodType;
  startDate: string;
  endDate: string;
  cuisineIds: number[];
  foodOfferTypeIds: number[];
}
