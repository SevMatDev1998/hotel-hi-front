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

    getHotelAgeAssessmentByHotelAvailabilityId: build.query<any, { hotelAvailabilityId: string }>({
      query: ({ hotelAvailabilityId }) => ({
        url: `${ApiEnum.HOTEL_AGE_ASSIGNMENTS }/hotelAvailability/${hotelAvailabilityId}`,
      })
    }),
  }),
})

export const {
  useGetHotelAvailabilityQuery,
  useAddHotelAvailabilityMutation,
  useGetHotelAgeAssessmentByHotelAvailabilityIdQuery
} = hotelAvailability;