import { HotelRoomStatus, CompletenessStatus } from './enums';

export interface HotelRoom {
  id: number;
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
}
