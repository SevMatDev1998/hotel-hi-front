import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";

const notificationsService = ApiInstance.injectEndpoints({
  endpoints: (build) => ({

    getAllNotifications: build.query<any, { hotelId: string }>({
      query: ({ hotelId }) => ({
        url: `${ApiEnum.NOTIFICATIONS}/${hotelId}`,
        method: "GET",
      }),
      providesTags: [ApiEnum.NOTIFICATIONS],
    }),

    getPartnerCommissions: build.query<any, { hotelId: string; partnerId: string }>({
      query: ({ hotelId, partnerId }) => ({
        url: `${ApiEnum.NOTIFICATIONS}/${hotelId}/${partnerId}/commissions`,
        method: "GET",
      }),
      providesTags: ["getPartnerCommissions"],
    }),

    savePartnerCommissions: build.mutation<any, { partnerId: number; availabilityIds: number[] }>({
      query: (body) => ({
        url: `${ApiEnum.NOTIFICATIONS}/partner-commissions`,
        method: "POST",
        body,
      }),
      invalidatesTags:[ApiEnum.NOTIFICATIONS]
    }),

    sendPartnerNotification: build.mutation<
     void,
      { hotelId: string; partnerId: string }
    >({
      query: ({ hotelId, partnerId }) => ({
        url: `${ApiEnum.NOTIFICATIONS}/send-notification/${hotelId}/${partnerId}`,
        method: "POST",
      }),
      invalidatesTags:[ApiEnum.NOTIFICATIONS]
    }),

    updatePartnerCommission: build.mutation<
      any,
      {
        partnerId: number;
        hotelAvailabilityId: number;
        roomFee: number;
        foodFee: number;
        additionalFee: number;
        serviceFee: number;
      }
    >({
      query: (body) => ({
        url: `${ApiEnum.NOTIFICATIONS}/update-partner-commission`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["getPartnerCommissions"],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useGetPartnerCommissionsQuery,
  useLazyGetPartnerCommissionsQuery,
  useSavePartnerCommissionsMutation,
  useSendPartnerNotificationMutation,
  useUpdatePartnerCommissionMutation,
} = notificationsService;


