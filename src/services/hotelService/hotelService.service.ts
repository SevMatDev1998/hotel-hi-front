import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { SystemService, SystemServiceGroup, SystemServiceType, PaidServiceGroup } from "../../types";

interface CreateServicePriceDto {
  hotelServiceId: number;
  hotelAvailabilityId: number;
  price: number;
  dateFrom: string;
  dateTo: string;
}

const HotelSericesService = ApiInstance.injectEndpoints({
  endpoints: build => ({
    getSystemServiceGroups: build.query<SystemServiceGroup[], void>({
      query: () => ({
        url: `${ApiEnum.SYSTEM_SERVICE_GROUPS}`,
      })
    }),
    getSystemServiceTypesByGroupId: build.query<SystemServiceType[], { groupId: number }>({
      query: ({ groupId }) => ({
        url: `${ApiEnum.SYSTEM_SERVICE_TYPES}/groups/${groupId}`,
      })
    }),
    getSystemServicesByTypeId: build.query<SystemService[], { typeId: number }>({
      query: ({ typeId }) => ({
        url: `${ApiEnum.SYSTEM_SERVICES}/types/${typeId}`,
      })
    }),

    getAdditionalServices: build.query<SystemService, void>({
      query: () => ({
        url: `${ApiEnum.SYSTEM_SERVICES}/additional-services`,
      }),
    }),

    getHotelServices: build.query<SystemService[], { hotelId: number, serviceTypeId: number }>({
      query: ({ hotelId, serviceTypeId }) => ({
        url: `${ApiEnum.HOTEL_SERVICES}/hotels/${hotelId}`,
        params: { serviceTypeId }

      }),
      providesTags: [ApiEnum.HOTEL_SERVICES]
    }),




    addHotelService: build.mutation<void, { hotelId: string, hotelServiceId: string }>({
      query: ({ hotelId, hotelServiceId }) => ({
        url: `${ApiEnum.HOTEL_SERVICES}/hotels`,
        method: "POST",
        params: { hotelId, hotelServiceId }
      }),
      invalidatesTags: [ApiEnum.HOTEL_SERVICES]
    }),

    deleteHotelService: build.mutation<void, { hotelServiceId: string }>({
      query: ({ hotelServiceId }) => ({
        url: `${ApiEnum.HOTEL_SERVICES}/hotels/${hotelServiceId}`,
        method: "DELETE",
      }),
      invalidatesTags: [ApiEnum.HOTEL_SERVICES]

    }),

    getPaidServicesByHotel: build.query<PaidServiceGroup[], { hotelId: number; availabilityId: number }>({
      query: ({ hotelId, availabilityId }) => ({
        url: `${ApiEnum.HOTEL_SERVICES}/paid-grouped/${hotelId}`,
        params: { availabilityId }
      }),
      providesTags: [ApiEnum.HOTEL_SERVICE_PRICES]
    }),

    createServicePrices: build.mutation<void, { prices: CreateServicePriceDto[] }>({
      query: ({ prices }) => ({
        url: `${ApiEnum.HOTEL_SERVICE_PRICES}/bulk`,
        method: "POST",
        body: { prices }
      }),
      invalidatesTags: [ApiEnum.HOTEL_SERVICE_PRICES]
    }),
  }),

})

export const {
  useGetSystemServiceGroupsQuery,
  useGetSystemServiceTypesByGroupIdQuery,
  useGetSystemServicesByTypeIdQuery,
  useGetAdditionalServicesQuery,
  useGetHotelServicesQuery,
  useAddHotelServiceMutation,
  useDeleteHotelServiceMutation,
  useGetPaidServicesByHotelQuery,
  useCreateServicePricesMutation
} = HotelSericesService;

