import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";

const notificationsService = ApiInstance.injectEndpoints({
  endpoints: (build) => ({

    getAllNotifications: build.query<any, { hotelId: string }>({
      query: ({ hotelId }) => ({
        url: `${ApiEnum.NOTIFICATIONS}/${hotelId}`,
        method: "GET",
      }),
    }),

    getPartnerCommissions: build.query<any, { hotelId: string; partnerId: string }>({
      query: ({ hotelId, partnerId }) => ({
        url: `${ApiEnum.NOTIFICATIONS}/${hotelId}/${partnerId}/commissions`,
        method: "GET",
      }),
    }),

    savePartnerCommissions: build.mutation<any, { partnerId: number; availabilityIds: number[] }>({
      query: (body) => ({
        url: `${ApiEnum.NOTIFICATIONS}/partner-commissions`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useGetPartnerCommissionsQuery,
  useLazyGetPartnerCommissionsQuery,
  useSavePartnerCommissionsMutation,
} = notificationsService;


