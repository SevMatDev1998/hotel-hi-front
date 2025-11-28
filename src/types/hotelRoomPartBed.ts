import { BedType } from './enums';

export interface HotelRoomPartBed {
  id?: string;
  hotelRoomPartId: string;
  bedType: BedType;
  roomBedSizeId?: string;
  roomBedTypeId?: string;
  rowIndex?: string;
  createdAt?: Date;
  updatedAt?: Date;
}




export interface BedConfigurationItem {
  bedType: BedType;
  roomBedSizeId: string;
  roomBedTypeId: string;
}

export interface HotelRoomPartBedMutation {
  hotelRoomPartId: string;
  bedConfigurations: BedConfigurationItem[];

}