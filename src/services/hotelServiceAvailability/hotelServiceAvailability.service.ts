import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { HotelServiceAvailability, } from "../../types";

const hotelServiceAvailability = ApiInstance.injectEndpoints({
  endpoints: build => ({
    getHotelServiceAvailability: build.query<HotelServiceAvailability, { hotelServiceId: string }>({
      query: ({ hotelServiceId }) => ({
        url: `${ApiEnum.HOTEL_SERVICE_AVAILABILITY}/${hotelServiceId}`,
      })
    }),
  }),
})

export const {
  useGetHotelServiceAvailabilityQuery,
} = hotelServiceAvailability;