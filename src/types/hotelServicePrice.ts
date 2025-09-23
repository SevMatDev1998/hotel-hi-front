export interface HotelServicePrice {
  id: number;
  hotelServiceId: number;
  hotelAvailabilityId?: number;
  price: number;
  dateFrom: Date;
  dateTo: Date;
  createdAt: Date;
  updatedAt: Date;
}
