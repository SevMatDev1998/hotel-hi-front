import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { HotelRoom, RoomClass, RoomPart, RoomView } from "../../types";

const RoomsService = ApiInstance.injectEndpoints({
  endpoints: build => ({
    getHotelRooms: build.query<HotelRoom[], {hotelId: number}>({
      query: ({ hotelId }) => ({
        url: `${ApiEnum.HOTEL_ROOMS}/${hotelId}`,
      })
    }),

    getRoomClasses: build.query<RoomClass[], void>({
      query: () => ({
        url: `${ApiEnum.ROOM_CLASSES}`,
      })
    }),

    getRoomViews: build.query<RoomView[], void>({
      query: () => ({
        url: `${ApiEnum.ROOM_VIEWS}`,
      })
    }),

    getRoomParts: build.query<RoomPart[], void>({
      query: () => ({
        url: `${ApiEnum.ROOM_PARTS}`,
      })
    }),

    getHotelRoomParts: build.query<RoomPart[], { hotelRoomId: number }>({
      query: ({ hotelRoomId }) => ({
        url: `${ApiEnum.HOTEL_ROOM_PARTS}/${hotelRoomId}`,
      })
    }),


    createRoom: build.mutation<HotelRoom, { hotelId: number; data: Partial<HotelRoom> }>({
      query: ({ hotelId, data }) => ({
        url: `${ApiEnum.HOTEL_ROOMS}/create/${hotelId}`,
        method: 'POST',
        body: data
      })
    })
  }),
})


export const {
  useGetHotelRoomsQuery,
  useGetRoomClassesQuery,
  useGetRoomViewsQuery,
  useGetRoomPartsQuery,
  useGetHotelRoomPartsQuery,
  useCreateRoomMutation,
} = RoomsService;