import { BedType } from './enums';

export interface HotelRoomPartBed {
  id?: string;
  hotelRoomPartId: number;
  bedType: BedType;
  roomBedSizeId?: number;
  roomBedTypeId?: number;
  // quantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}




export interface BedConfigurationItem {
  bedType: BedType;
  roomBedSizeId: number;
  roomBedTypeId: number;
}

export interface HotelRoomPartBedMutation {
  hotelRoomPartId: string;
  bedConfigurations: BedConfigurationItem[];

}