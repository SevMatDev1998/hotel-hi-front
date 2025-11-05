import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { HotelRoom, HotelRoomPart, HotelRoomPartBed, HotelRoomPartBedMutation, RoomBedSize, RoomBedType, RoomClass, RoomPart, RoomView } from "../../types";

const RoomsService = ApiInstance.injectEndpoints({
  endpoints: build => ({

    // get hotel rooms by hotel id
    getHotelRoomsByHotelId: build.query<HotelRoom[], { hotelId: string }>({
      query: ({ hotelId }) => ({
        url: `${ApiEnum.HOTEL_ROOMS}/hotel/${hotelId}`,
      }),
      providesTags: [ApiEnum.HOTEL_ROOMS]
      
    }),

    // get hotel room by room id
    getHotelRoomByRoomId: build.query<HotelRoom, { roomId: string }>({
      query: ({ roomId }) => ({
        url: `${ApiEnum.HOTEL_ROOMS}/room/${roomId}`,
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

    getHotelRoomParts: build.query<HotelRoomPart[], { hotelRoomId: number }>({
      query: ({ hotelRoomId }) => ({
        url: `${ApiEnum.HOTEL_ROOM_PARTS}/${hotelRoomId}`,
      }),
      providesTags: [ApiEnum.HOTEL_ROOM_PARTS]
    }),

    addHotelRoomParts: build.mutation<void, { hotelRoomId: number; roomParts: { roomPartId: number; quantity: number }[] }>({
      query: ({ hotelRoomId, roomParts }) => ({
        url: `${ApiEnum.HOTEL_ROOM_PARTS}/${hotelRoomId}`,
        method: 'POST',
        body: { roomParts }
      }),
      invalidatesTags: [ApiEnum.HOTEL_ROOM_PARTS]
    }),

    createRoom: build.mutation<HotelRoom, { hotelId: number; data: Partial<HotelRoom> }>({
      query: ({ hotelId, data }) => ({
        url: `${ApiEnum.HOTEL_ROOMS}/create/${hotelId}`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: [ApiEnum.HOTEL_ROOMS]
    }),

    editRoom: build.mutation<HotelRoom, { roomId: string; data: Partial<HotelRoom> }>({
      query: ({ roomId, data }) => ({
        url: `${ApiEnum.HOTEL_ROOMS}/edit/${roomId}`,
        method: 'PUT',
        body: data
      })
    }),

    getHotelRoomPartBedsByPartId: build.query<HotelRoomPartBed[], { roomPartId: string }>({
      query: ({ roomPartId }) => ({
        url: `${ApiEnum.HOTEL_ROOM_PART_BEDS}/${roomPartId}`,
      })
    }),

    editHotelRoomPartBeds: build.mutation<HotelRoomPartBed, HotelRoomPartBedMutation>({
      query: ( body ) => ({
        url: `${ApiEnum.HOTEL_ROOM_PART_BEDS}/edit`,
        method: 'PUT',
        body
      })
    }),

    getRoomBedTypes: build.query<RoomBedType[], void>({
      query: () => ({
        url: `${ApiEnum.ROOM_BED_TYPES}`,
      })
    }),


    getRoomBedSizes: build.query<RoomBedSize[], void>({
      query: () => ({
        url: `${ApiEnum.ROOM_BED_SIZES}`,
      })
    }),

  }),
})




export const {
  useGetHotelRoomsByHotelIdQuery,
  useGetHotelRoomByRoomIdQuery,
  useGetRoomClassesQuery,
  useGetRoomViewsQuery,
  useGetRoomPartsQuery,
  useGetHotelRoomPartsQuery,
  useAddHotelRoomPartsMutation,
  useCreateRoomMutation,
  useEditRoomMutation,
  useGetHotelRoomPartBedsByPartIdQuery,
  useGetRoomBedTypesQuery,
  useGetRoomBedSizesQuery,
  useEditHotelRoomPartBedsMutation
} = RoomsService;

export const { endpoints: { editRoom } } = RoomsService
