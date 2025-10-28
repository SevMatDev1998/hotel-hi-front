import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { HotelServiceAvailability, CreateAvailabilityDto } from "../../types";

const hotelServiceAvailability = ApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getHotelServiceAvailability: build.query<
      HotelServiceAvailability,
      { hotelServiceId: string }
    >({
      query: ({ hotelServiceId }) => ({
        url: `${ApiEnum.HOTEL_SERVICE_AVAILABILITY}/${hotelServiceId}`,
        method: "GET",
      }),
    }),

    // 🆕 Add new service (mutation)
    addHotelServiceAvailability: build.mutation<
      void, // response type (you can replace with your backend response DTO)
      { hotelServiceId: string; data: CreateAvailabilityDto[] } // request payload
    >({
      query: ({ hotelServiceId, data }) => ({
        url: `${ApiEnum.HOTEL_SERVICE_AVAILABILITY}/${hotelServiceId}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetHotelServiceAvailabilityQuery,
  useAddHotelServiceAvailabilityMutation, // 🧩 new hook
} = hotelServiceAvailability;
