import { HotelRoomPartBed } from "./hotelRoomPartBed";
import { RoomPart } from "./roomPart";

export interface HotelRoomPart {
  id: string;
  hotelRoomId: number;
  roomPartId: number;
  createdAt: Date;
  updatedAt: Date;
  hotelRoomPartBeds?:HotelRoomPartBed[]
  roomPart?: RoomPart
}
