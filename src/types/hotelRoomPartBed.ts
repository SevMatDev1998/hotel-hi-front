import { BedType } from './enums';

export interface HotelRoomPartBed {
  id: number;
  hotelRoomPartId: number;
  bedType: BedType;
  roomBedSizeId?: number;
  roomBedTypeId?: number;
  // quantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
