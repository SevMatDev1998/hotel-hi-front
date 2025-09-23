export interface HotelFoodPrice {
  id: number;
  hotelFoodId: number;
  hotelAvailabilityId?: number;
  price: number;
  dateFrom: Date;
  dateTo: Date;
  createdAt: Date;
  updatedAt: Date;
}
