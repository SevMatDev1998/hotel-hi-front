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
    getHotelAvailabilityDetail: build.query<any, { availabilityId: string }>({
      query: ({ availabilityId }) => ({
        url: `${ApiEnum.HOTEL_AVAILABILITY}/detail/${availabilityId}`,
      })
    }),
    addHotelAvailability: build.mutation<HotelAvailability, { body: HotelAvailability, hotelId: string }>({
      query: ({ body, hotelId }) => ({
        url: `${ApiEnum.HOTEL_AVAILABILITY}/create/${hotelId}`,
        method: "POST",
        body
      }),
    }),

    updateHotelAvailability: build.mutation<HotelAvailability, { body: any, availabilityId: string }>({
      query: ({ body, availabilityId }) => ({
        url: `${ApiEnum.HOTEL_AVAILABILITY}/${availabilityId}`,
        method: "PUT",
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
      }),
      providesTags: [ApiEnum.HOTEL_AVAILABILITY]
    }),



    updateHotelAvailabilitesWithDates: build.mutation<any, { hotelId: string, body: { availability: any, commissionDate: any } }>({
      query: ({ hotelId, body }) => ({
        url: `${ApiEnum.HOTEL_AVAILABILITY}/dates/${hotelId}`,
        method: "PUT",
        body
      }),
      invalidatesTags:[ApiEnum.HOTEL_AVAILABILITY]
    }),

    updateHotelAvailabilityDateCommissions: build.mutation<any, { hotelAvailabilityId: string, body: any[] }>({
      query: ({ hotelAvailabilityId, body }) => ({
        url: `${ApiEnum.HOTEL_AVAILABILITY_DATE_COMMISSIONS}/${hotelAvailabilityId}`,
        method: "PUT",
        body
      }),
      invalidatesTags:[ApiEnum.HOTEL_AVAILABILITY]
    }),
    
    deleteHotelAvailabilityDate: build.mutation<{ success: boolean; message: string }, { calendarId: string }>({
      query: ({ calendarId }) => ({
        url: `${ApiEnum.HOTEL_AVAILABILITY}/date/${calendarId}`,
        method: "DELETE",
      }),
      invalidatesTags:[ApiEnum.HOTEL_AVAILABILITY]
    }),

    deleteHotelAvailabilityDatesBatch: build.mutation<{ success: boolean; message: string; count: number }, { calendarIds: string[] }>({
      query: ({ calendarIds }) => ({
        url: `${ApiEnum.HOTEL_AVAILABILITY}/dates/batch`,
        method: "DELETE",
        body: { calendarIds },
      }),
      invalidatesTags:[ApiEnum.HOTEL_AVAILABILITY]
    }),
    
    deleteHotelAvailabilityDateCommissions: build.mutation<any, { hotelAvailabilityId: string }>({
      query: ({ hotelAvailabilityId }) => ({
        url: `${ApiEnum.HOTEL_AVAILABILITY_DATE_COMMISSIONS}/${hotelAvailabilityId}`,
        method: "DELETE",
      }),
      invalidatesTags:[ApiEnum.HOTEL_AVAILABILITY]
    }),
  }),
})

export const {
  useGetHotelAvailabilityQuery,
  useGetHotelAvailabilityDetailQuery,
  useAddHotelAvailabilityMutation,
  useUpdateHotelAvailabilityMutation,
  useGetHotelAgeAssessmentByHotelAvailabilityIdQuery,
  useGetHotelAvailabilityWithDatesQuery,

  //from modal to create table commision like new 
  useUpdateHotelAvailabilitesWithDatesMutation,

  //from modal to update table commision like edit
  useUpdateHotelAvailabilityDateCommissionsMutation,
  
  // delete single date
  useDeleteHotelAvailabilityDateMutation,
  
  // delete multiple dates (batch)
  useDeleteHotelAvailabilityDatesBatchMutation,
  
  useDeleteHotelAvailabilityDateCommissionsMutation
} = hotelAvailability;