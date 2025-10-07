import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { HotelRoom, RoomClass, RoomView } from "../../types";

const RoomsService = ApiInstance.injectEndpoints({
  endpoints: build => ({
    getRooms: build.query<HotelRoom[], void>({
      query: () => ({
        url: `${ApiEnum.HOTEL_ROOMS}`,
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

    createRoom: build.mutation<HotelRoom, { id: number; data: Partial<HotelRoom> }>({
      query: ({ id, data }) => ({
        url: `${ApiEnum.HOTEL_ROOMS}/${id}`,
        method: 'POST',
        body: data
      })
    })
  }),
})


export const {
  useGetRoomsQuery,
  useGetRoomClassesQuery,
  useGetRoomViewsQuery,
  useCreateRoomMutation
} = RoomsService;