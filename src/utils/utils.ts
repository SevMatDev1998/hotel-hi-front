import { HotelRoom } from "../types";

export const divideAndRoundUp = (num: number): number => {
  return Math.ceil(num / 10);
}

export const calculateTotalNumberOfRooms = (roomData?: HotelRoom[]): number => {
  return roomData?.reduce((total, room) => {
    return total + (room.hotelRoomParts?.length || 0);
  }, 0) || 0;
}