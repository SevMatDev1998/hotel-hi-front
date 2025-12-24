import { BedType } from './enums';
import { RoomBedType } from './roomBedType';
import { RoomBedSize } from './roomBedSize';

export interface HotelRoomPartBed {
  id?: string;
  hotelRoomPartId: string;
  bedType: BedType;
  roomBedSizeId?: string;
  roomBedTypeId?: string;
  rowIndex?: string;
  createdAt?: Date;
  updatedAt?: Date;
  roomBedType?: RoomBedType;
  roomBedSize?: RoomBedSize;
}




export interface BedConfigurationItem {
  bedType: BedType;
  roomBedSizeId: number;
  roomBedTypeId: number;
}

export interface HotelRoomPartBedMutation {
  hotelRoomPartId: number;
  bedConfigurations: BedConfigurationItem[];

}