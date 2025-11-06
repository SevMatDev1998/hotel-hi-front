import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { SystemService, SystemServiceGroup, SystemServiceType } from "../../types";

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

    getHotelServices: build.query<SystemService[], { hotelId: number }>({
      query: ({ hotelId }) => ({
        url: `${ApiEnum.HOTEL_SERVICES}/hotels/${hotelId}`,
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
  }),

})

export const {
  useGetSystemServiceGroupsQuery,
  useGetSystemServiceTypesByGroupIdQuery,
  useGetSystemServicesByTypeIdQuery,
  useGetAdditionalServicesQuery,
  useGetHotelServicesQuery,
  useAddHotelServiceMutation,
  useDeleteHotelServiceMutation
} = HotelSericesService;

