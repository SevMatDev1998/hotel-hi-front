import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { Partner } from "../../types";

const HotelPartnersService = ApiInstance.injectEndpoints({
  endpoints: build => ({


    getHotelPartner: build.query<Partner, { partnerId: string }>({
      query: ({ partnerId }) => ({
        url: `${ApiEnum.HOTEL_PARTNERS}/partners/${partnerId}`
      }),
    }),

    getHotelPartnerByTin: build.query<Partner | null, { tin: string }>({
      query: ({ tin }) => ({
        url: `${ApiEnum.HOTEL_PARTNERS}/tin/${tin}`
      }),
    }),

    getHotelPartners: build.query<Partner[], { hotelId: string, page?: string; search?: string }>({
      query: ({ hotelId, page, search }) => ({
        url: `${ApiEnum.HOTEL_PARTNERS}/hotels/${hotelId}`,
        params: {
          page: page || undefined,
          search: search || undefined,
        },
      }),
      providesTags: [ApiEnum.HOTEL_PARTNERS]
    }),

    addHotelPartner: build.mutation<Partner, { data: Partial<Partner>, hotelId: string }>({
      query: ({ data, hotelId }) => ({
        url: `${ApiEnum.HOTEL_PARTNERS}/${hotelId}`,
        method: "POST",
        body: data
      }),
      invalidatesTags: [ApiEnum.HOTEL_PARTNERS]

    })
  })
})

export const {
  useGetHotelPartnerQuery,
  useGetHotelPartnerByTinQuery,
  useLazyGetHotelPartnerByTinQuery,
  useGetHotelPartnersQuery,
  useAddHotelPartnerMutation
} = HotelPartnersService;