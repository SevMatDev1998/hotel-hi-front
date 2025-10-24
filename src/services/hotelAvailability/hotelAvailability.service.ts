import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { HotelAvailability, } from "../../types";

const hotelAvailability = ApiInstance.injectEndpoints({
  endpoints: build => ({
    getHotelAvailability: build.query<HotelAvailability[], { hotelId: string }>({
      query: ({ hotelId }) => ({
        url: `${ApiEnum.HOTEL_AVAILABILITY}/${hotelId}`,
      })
    }),
    addHotelAvailability: build.mutation<HotelAvailability, { body: HotelAvailability, hotelId: string }>({
      query: ({ body, hotelId }) => ({
        url: `${ApiEnum.HOTEL_AVAILABILITY}/create/${hotelId}`,
        method: "POST",
        body
      }),
    }),
  }),
})

export const {
  useGetHotelAvailabilityQuery,
  useAddHotelAvailabilityMutation
} = hotelAvailability;