import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { Hotel } from "../../types";

const HotelService = ApiInstance.injectEndpoints({
  endpoints: build => ({
    getHotelBaseInformation: build.query<Partial<Hotel>, { hotelId: string }>({
      query: ({ hotelId }) => ({
        url: `${ApiEnum.HOTEL}/${hotelId}/base-information`,
      })
    }),
    updateHotelBaseInformation: build.mutation<Partial<Hotel>, { id: string; data: Partial<Hotel> }>({
      query: ({ id, data }) => ({
        url: `${ApiEnum.HOTEL}/${id}/base-information`,
        method: "POST",
        body: data
      })
    }),
      getHotelLegalInformation: build.query<Partial<Hotel>, { hotelId: number }>({
      query: ({ hotelId }) => ({
        url: `${ApiEnum.HOTEL}/${hotelId}/legal-information`,
      })
    }),
    updateHotelLegalInformation: build.mutation<Partial<Hotel>, { id: string; data: Partial<Hotel> }>({
      query: ({ id, data }) => ({
        url: `${ApiEnum.HOTEL}/${id}/legal-information`,
        method: "POST",
        body: data
      })
    }),
  })
})

export const {
  useGetHotelBaseInformationQuery,
  useUpdateHotelBaseInformationMutation,
  useGetHotelLegalInformationQuery,
  useUpdateHotelLegalInformationMutation
} = HotelService;