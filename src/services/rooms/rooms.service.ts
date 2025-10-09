import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { HotelRoom, RoomClass, RoomView } from "../../types";

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
  useCreateRoomMutation
} = RoomsService;