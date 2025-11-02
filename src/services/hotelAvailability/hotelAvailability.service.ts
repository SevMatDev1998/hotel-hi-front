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
        url: `${ApiEnum.HOTEL_AGE_ASSIGNMENTS}/hotelAvailability/${hotelAvailabilityId}`,
      })
    }),

    getHotelAvailabilityWithDates: build.query<HotelAvailability[], { hotelId: string }>({
      query: ({ hotelId }) => ({
        url: `${ApiEnum.HOTEL_AVAILABILITY}/dates/${hotelId}`,
      })
    }),

    updateHotelAvailabilitesWithDates: build.mutation<any, { hotelId: string, body: any[] }>({
      query: ({ hotelId, body }) => ({
        url: `${ApiEnum.HOTEL_AVAILABILITY}/dates/${hotelId}`,
        method: "PUT",
        body // ✅ исправлено
      }),
    }),

    updateHotelAvailabilityDateCommissions: build.mutation<any, { hotelAvailabilityId: string, body: any[] }>({
      query: ({ hotelAvailabilityId, body }) => ({
        url: `${ApiEnum.HOTEL_AVAILABILITY_DATE_COMMISSIONS}/${hotelAvailabilityId}`,
        method: "PUT",
        body
      }),
    }),
    deleteHotelAvailabilityDateCommissions: build.mutation<any, { hotelAvailabilityId: string }>({
      query: ({ hotelAvailabilityId }) => ({
        url: `${ApiEnum.HOTEL_AVAILABILITY_DATE_COMMISSIONS}/${hotelAvailabilityId}`,
        method: "DELETE",
      }),
    }),

  }),
})

export const {
  useGetHotelAvailabilityQuery,
  useAddHotelAvailabilityMutation,
  useGetHotelAgeAssessmentByHotelAvailabilityIdQuery,
  useGetHotelAvailabilityWithDatesQuery,
  useUpdateHotelAvailabilitesWithDatesMutation,
  useUpdateHotelAvailabilityDateCommissionsMutation,
  useDeleteHotelAvailabilityDateCommissionsMutation
} = hotelAvailability;