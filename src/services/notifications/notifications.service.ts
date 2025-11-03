import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { HotelServiceAvailability } from "../../types";

const notificationsService = ApiInstance.injectEndpoints({
  endpoints: (build) => ({

    getAllNotifications: build.query<void, { hotelId: string }>({
      query: ({ hotelId }) => ({
        url: `${ApiEnum.NOTIFICATIONS}/${hotelId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
} = notificationsService;
