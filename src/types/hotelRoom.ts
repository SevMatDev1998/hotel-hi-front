import { CompletenessStatus,HotelRoomStatus } from './enums';
import { RoomClass } from './roomClass';
import { RoomPart } from './roomPart';
import { RoomView } from './roomView';

export interface HotelRoom {
  id: string;
  name: string;
  hotelId: number;
  roomClassId: number;
  roomViewId?: number;
  numbers: string;
  area: string;
  mainGuestQuantity: number;
  additionalGuestQuantity: number;
  status: HotelRoomStatus;
  roomNumberQuantity: number;
  completeness: CompletenessStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  roomClass?: RoomClass;
  roomView?: RoomView;
  roomParts?: RoomPart[]; 
}
