export interface HotelRoomPrice {
  id: number;
  hotelRoomId: number;
  hotelAvailabilityId?: number;
  price: number;
  dateFrom: Date;
  dateTo: Date;
  createdAt: Date;
  updatedAt: Date;
}
